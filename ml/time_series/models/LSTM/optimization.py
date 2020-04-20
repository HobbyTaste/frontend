import numpy as np
import torch


class Optimization:
    """
    Класс-помощник для обучение, предсказаний, оценки.
    """

    def __init__(
        self,
        model,
        loss_fn,
        optimizer
    ):
        self.model = model
        self.loss_function = loss_fn
        self.optimizer = optimizer

    @staticmethod
    def preprocess_data(
        input_data: torch.FloatTensor, 
        train_horizon: int = 30
    ):
        inout_seq = []
        L = len(input_data)
        for i in np.arange(L - train_horizon):
            train_seq = input_data[i:i+train_horizon]
            train_target = input_data[i+train_horizon:i+train_horizon+1]
            inout_seq.append((train_seq, train_target))
        return inout_seq

    def train(
        self,
        train_inout_data,
        x_val=None,
        y_val=None,
        num_epochs: int = 30
    ):
        for i in np.arange(num_epochs):
            for seq, labels in train_inout_data:
                self.optimizer.zero_grad()
                self.model.hidden_cell = (torch.zeros(1, 1, self.model.hidden_layer_size),
                                          torch.zeros(1, 1, self.model.hidden_layer_size))

                y_pred = self.model(seq)

                single_loss = self.loss_function(y_pred, labels)
                single_loss.backward()
                self.optimizer.step()

            print(f'epoch: {i:3} loss: {single_loss.item():10.8f}')

        print(f'epoch: {i:3} loss: {single_loss.item():10.10f}')

    def predict(
        self,
        test_inputs,
        pred_horizon: int,
        train_horizon: int,
    ):
        self.model.eval()
        for i in range(pred_horizon):
            seq = torch.FloatTensor(test_inputs[-train_horizon:])
            with torch.no_grad():
                self.model.hidden = (torch.zeros(1, 1, self.model.hidden_layer_size),
                                     torch.zeros(1, 1, self.model.hidden_layer_size))
                test_inputs.append(self.model(seq).item())
        return test_inputs[train_horizon:]

    def plot_losses(
        self
    ):
        pass
