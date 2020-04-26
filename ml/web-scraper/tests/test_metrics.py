import pytest
import numpy as np
import pandas as pd
import math
import random as rnd

from pytest import approx
from typing import Set

from metrics import Metric, isna

class MetricTester:
    def __init__(self, metric):
        self.metric = metric

    def check_wrong(self, pred, ans):
        assert self.metric.calc([pred], [ans]) == approx(0.)

    def check_right(self, pred, ans):
        assert self.metric.calc([pred], [ans]) == approx(1.)

    def check_skip(self, pred, ans):
        assert isna(self.metric.calc([pred], [ans]))

def test_isna():
    assert isna(None)
    assert isna('None')
    assert isna('nan')
    assert isna(math.inf - math.inf)
    assert isna(np.nan)

def test_metrics_calculations():
    metric_precision = Metric('precision')
    metric_recall = Metric('recall')

    y_true = [{1}, {2}, {3}, {4}, {5}, {6}, {7}]
    y_pred = [np.nan, 1, 2, 4, 5, 6, 7]

    assert metric_precision.calc(y_pred, y_true) == approx(4/6)
    assert metric_recall.calc(y_pred, y_true) == approx(4/7)

def test_precision_cases():
    tester = MetricTester(Metric('precision'))

    tester.check_right(7, {7})
    tester.check_right(4, {4, 5, 6})
    tester.check_right(7, {np.nan, 7})

    tester.check_wrong(4, {5, 6, 7})
    tester.check_wrong(4, {5, np.nan})
    tester.check_skip(np.nan, {5, 6, 7})

    tester.check_skip(4, {np.nan})
    tester.check_skip(4, set())
    tester.check_skip(np.nan, set())

def test_recall_cases():
    tester = MetricTester(Metric('recall'))

    tester.check_right(7, {7})
    tester.check_right(4, {4, 5, 6})
    tester.check_right(7, {np.nan, 7})

    tester.check_wrong(4, {5, 6, 7})
    tester.check_wrong(4, {5, np.nan})
    tester.check_wrong(np.nan, {5, 6, 7})

    tester.check_skip(4, {np.nan})
    tester.check_skip(4, set())
    tester.check_skip(np.nan, set())

###########################################################################

# Not a uniform distribution, but it's not important
def random_subset(big_set : set)->set:
    k = rnd.randint(0, len(big_set))
    as_list = list(big_set)
    rnd.shuffle(as_list)
    return set(as_list[0:k])

@pytest.fixture
def prepare_two_arrays(size=300):
    values = [np.nan, 1, 2, 3]

    y_pred = [rnd.choice(values) for _ in range(size)]
    y_true = [random_subset(values) for _ in range(size)]
    return y_pred, y_true

def eq(x, y):
    return x == y or (isna(x) and isna(y))

def test_metric_history(prepare_two_arrays):
    y_pred, y_true = prepare_two_arrays

    metric = Metric('recall', save_history=True)
    tester = MetricTester(metric)
    metric.calc(*prepare_two_arrays)

    hist = metric.history
    assert type(hist) == list and len(hist) == len(y_pred)
    for hi, yp, yt in zip(hist, y_pred, y_true):
        assert hi[0] in {'Right', 'Wrong', 'Skipped'}
        assert eq(hi[1], yp)
        assert eq(hi[2], yt)

        if hi[0] == 'Right':
            tester.check_right(yp, yt)
        elif hi[0] == 'Wrong':
            tester.check_wrong(yp, yt)
        elif hi[0] == 'Skipped':
            tester.check_skip(yp, yt)
