from configs.config import *
from functools import reduce
from models.MTNet import *
from operator import mul
from preprocess.get_data import *
from tensorflow.python import debug as tf_debug


import math
import numpy as np
import os
import tensorflow as tf


# GPU setting
# os.environ['CUDA_DEVICE_ORDER'] = 'PCI_BUS_ID'
# os.environ['CUDA_VISIBLE_DEVICES'] = '1'
SCORE_TYPES = [['MAE', 'RMSE'], ['CORR', 'RSE']]


CONFIG = NasdaqConfig
DS_HANDLER = NasdaqDataset

score_type_index = 0

is_train = True

MODEL_DIR = os.path.join('logs', 'checkpoints')
LOG_DIR = os.path.join('logs', 'graphs')


def get_num_params():
    num_params = 0
    for variable in tf.trainable_variables():
        shape = variable.get_shape()
        num_params += reduce(mul, [dim.value for dim in shape], 1)
    return num_params


def make_config_string(config):
    return "T%s_W%s_n%s_hw%s_dropin%s_cnn%s_rnn%s" % \
           (config.T, config.W, config.n, config.highway_window, config.input_keep_prob,
            config.en_conv_hidden_size, config.en_rnn_hidden_sizes)


def make_log_dir(config, ds_handler):
    return os.path.join(LOG_DIR, ds_handler.name, 'horizon' + str(config.horizon), make_config_string(config))


def make_model_path(config, ds_handler):
    dir = os.path.join(MODEL_DIR, ds_handler.name,
                       'horizon' + str(config.horizon))
    if not os.path.exists(dir):
        os.makedirs(dir)
    return os.path.join(dir, make_config_string(config), 'mtnet.ckpt')


def calc_rse(y_real_list, y_pred_list):
    rse_numerator = np.sum(np.subtract(y_pred_list, y_real_list) ** 2)
    rse_denominator = np.sum(np.subtract(
        y_real_list, np.mean(y_real_list)) ** 2)
    rse = np.sqrt(np.divide(rse_numerator, rse_denominator))
    return rse


def calc_corr(y_real_list, y_pred_list):
    y_real_mean = np.mean(y_real_list, axis=0)
    y_pred_mean = np.mean(y_pred_list, axis=0)

    numerator = np.sum((y_real_list - y_real_mean) *
                       (y_pred_list - y_pred_mean), axis=0)
    denominator_real = np.sqrt(
        np.sum((y_real_list - y_real_mean) ** 2, axis=0))
    denominator_pred = np.sqrt(
        np.sum((y_pred_list - y_pred_mean) ** 2, axis=0))
    denominator = denominator_real * denominator_pred
    corr = np.mean(numerator / denominator)

    return corr


def run_one_epoch(sess, model, batch_data, summary_writer, ds_handler, epoch_num, is_train=True):
    # reset statistics variables
    sess.run(model.reset_statistics_vars)

    if is_train:
        run_func = model.train
    else:
        run_func = model.predict

    y_pred_list = []
    y_real_list = []
    loss_list = []

    for ds in batch_data:
        loss, pred = run_func(ds, sess)

        y_pred_list.append(pred)
        y_real_list.append(ds[-1])
        loss_list.append(loss)

    y_pred_list = np.reshape(y_pred_list, [-1, model.config.K])
    y_real_list = np.reshape(y_real_list, [-1, model.config.K])

    y_pred_list = ds_handler.inverse_transform(y_pred_list)
    y_real_list = ds_handler.inverse_transform(y_real_list)

    loss = np.mean(loss_list)

    summary = sess.run(model.merged_summary)
    summary_writer.add_summary(summary, epoch_num)

    if score_type_index == 0:
        mae = np.mean(abs(np.subtract(y_pred_list, y_real_list)))
        rmse = np.sqrt(np.mean(np.subtract(y_pred_list, y_real_list) ** 2))

        real_mae_summary = tf.Summary()
        real_mae_summary.value.add(tag='real_mae', simple_value=mae)
        summary_writer.add_summary(real_mae_summary, epoch_num)

        real_rmse_summary = tf.Summary()
        real_rmse_summary.value.add(tag='real_rmse', simple_value=rmse)
        summary_writer.add_summary(real_rmse_summary, epoch_num)
        return loss, mae, rmse
    else:
        rse = calc_rse(y_real_list, y_pred_list)
        corr = calc_corr(y_real_list, y_pred_list)

        real_rse_summary = tf.Summary()
        real_rse_summary.value.add(tag='real_rse', simple_value=rse)
        summary_writer.add_summary(real_rse_summary, epoch_num)

        real_corr_summary = tf.Summary()
        real_corr_summary.value.add(tag='real_corr', simple_value=corr)
        summary_writer.add_summary(real_corr_summary, epoch_num)
        return loss, corr, rse


def run_one_config(config):
    epochs = 300

    max_lr = 0.003
    min_lr = 0.0001
    decay_epochs = 60

    with tf.Session() as sess:
        #sess = tf_debug.LocalCLIDebugWrapperSession(sess)
        model = MTNet(config)
        saver = tf.train.Saver()

        ds_handler = DS_HANDLER(config)
        train_batch_data = ds_handler.get_all_batch_data(config, 'T')
        valid_batch_data = ds_handler.get_all_batch_data(config, 'V')

        log_path = make_log_dir(config, ds_handler)
        model_path = make_model_path(config, ds_handler)

        train_writer = tf.summary.FileWriter(
            os.path.join(log_path, 'train'), sess.graph)
        test_writer = tf.summary.FileWriter(os.path.join(log_path, 'test'))

        print('----------Train Config:',
              make_config_string(config), '. Total epochs:', epochs)
        print('Trainable parameter count:', get_num_params())

        sess.run(tf.global_variables_initializer())

        best_score = float('inf')

        score1_name, score2_name = SCORE_TYPES[score_type_index]

        for i in range(epochs):

            config.lr = min_lr + (max_lr - min_lr) * math.exp(-i/decay_epochs)

            run_one_epoch(sess, model, train_batch_data,
                          train_writer, ds_handler, i, True)
            if i % 5 == 0:
                loss, scope1, score2 = run_one_epoch(
                    sess, model, valid_batch_data, test_writer, ds_handler, i, False)
                if best_score > score2:
                    best_score = score2

                    saver.save(sess, model_path)
                    print('Epoch', i, 'Test Loss:', loss, score1_name,
                          ':', scope1, score2_name, ':', score2)

        print('---------Best score:', score2_name, ':', best_score)

    tf.reset_default_graph()


if __name__ == '__main__':
    config = CONFIG()
    for en_conv_hidden_size in [32, 64]:
        config.en_conv_hidden_size = en_conv_hidden_size
        for en_rnn_hidden_sizes in [[32, 32], [32, 64]]:
            config.en_rnn_hidden_sizes = en_rnn_hidden_sizes
            run_one_config(config)
