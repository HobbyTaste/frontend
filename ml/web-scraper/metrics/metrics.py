import numpy as np
import pandas as pd

from typing import List, Dict, Set
from copy import copy
import math

from preprocessor import Preprocessor

def isna(x):
    return (x is None) \
            or (x == 'None') \
            or (x == 'nan') \
            or (type(x) == float and math.isnan(x))


"""
Recall - доля правильных ответов среди всех ответов парсера
Precision - доля правильных ответов среди ненановских ответов парсера 
В обоих случаях учитываются только те объекты, 
у которых образцовый ответ - не njne
"""
class Metric:
    def __init__(self, name: str, save_history=False):
        assert name in {'precision', 'recall'}
        self.name = name
        self.save_history = save_history
        if save_history:
            self.history = []

    def _is_right(self, yp, yt: Set):
        return yp in yt

    def _is_wrong(self, yp, yt: Set):
        if self.name == 'recall':
            return not np.all([isna(y) for y in yt]) \
                   and yp not in yt
        elif self.name == 'precision':
            return not np.all([isna(y) for y in yt]) \
                   and yp not in yt \
                   and not isna(yp)
        else:
            raise RuntimeError('Unknown metric type')

    def calc(self, y_pred: List, y_true: List[Set])->float:
        right, wrong = 0, 0

        for yp, yt in zip(y_pred, y_true):
            if self._is_right(yp, yt):
                right += 1
                loc_res = 'Right'
            elif self._is_wrong(yp, yt):
                wrong += 1
                loc_res = 'Wrong'
            else:
                loc_res = 'Skipped'

            if self.save_history:
                self.history.append((loc_res, yp, yt))

        if right + wrong == 0:
            return np.nan
        else:
            return right / (right + wrong)


def calc_metrics(data_pred: pd.DataFrame, data_true: pd.DataFrame,
                 key: str, columns: List[str],
                 metrics: List[str], preprocs: Dict[str, str],
                 save_history=False):
    data_pred = copy(data_pred)
    data_true = copy(data_true)

    def do_all_preprocs(data):
        for col in preprocs:
            cur_prep = Preprocessor(preprocs[col])
            data[col] = data[col].apply(
                lambda x: cur_prep.do_prep(x))

    do_all_preprocs(data_pred)
    do_all_preprocs(data_true)

    result = pd.DataFrame(
        data=np.zeros((len(metrics), len(columns))),
        index=metrics, columns=columns,
    )

    if save_history:
        history = {}

    for col in columns:
        y_pred = data_pred[col]
        y_true = [set(data_true[data_true[key] == k][col])
                  for k in data_pred[key]]

        for metric_name in metrics:
            metric = Metric(metric_name, save_history)
            result[col][metric_name] = metric.calc(y_pred, y_true)
            if save_history:
                history[(col, metric_name)] = metric.history

    if save_history:
        return result, history
    else:
        return result
