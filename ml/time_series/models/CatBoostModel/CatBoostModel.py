import matplotlib.pyplot as plt
import numpy as np

from catboost import CatBoostRegressor
from sklearn.multioutput import MultiOutputRegressor
from torch.utils.data import TensorDataset, DataLoader


class CatBoost_model:
    """
    CatBoost модель 
    для работы с ременными рядами
    """

    def __init__(
        self,
        use_gpu=True,
        device=None,
        loss_function='MAE',
        multi_target=False,
        params=None
    ):
        if params is not None:
            if use_gpu:
                self.cbr = CatBoostRegressor(
                    loss_function=loss_function,
                    task_type="GPU",
                    devices='cuda:0',
                    verbose=100,
                    **params,
                )
            else:
                self.cbr = CatBoostRegressor(
                    loss_function=loss_function,
                    verbose=100,
                    **params,
                )
        else:
            if use_gpu:
                self.cbr = CatBoostRegressor(
                    loss_function=loss_function,
                    task_type="GPU",
                    devices='cuda:0',
                    verbose=100,
                )
            else:
                self.cbr = CatBoostRegressor(
                    loss_function=loss_function,
                    verbose=100,
                )
        if multi_target:
            self.cbr = MultiOutputRegressor(self.cbr)
        self.train_horizon_union = None
        self.row_ind_union = None
        self.train_horizon_multi = None
        self.pred_horizon_multi = None

    def train_union(
        self,
        X_train,
        y_train,
        train_horizon: int,
        row_ind: int = 0,
    ):
        self.train_horizon_union = train_horizon
        self.row_ind_union = row_ind
        self.cbr.fit(
            X_train[:, -self.train_horizon_union:,
                    :].reshape(len(X_train), -1),
            y_train[:, 0, self.row_ind_union],
        )

    def train_multi(
        self,
        X_train,
        y_train,
        train_horizon: int,
        pred_horizon: int,
    ):
        self.train_horizon_multi = train_horizon
        self.pred_horizon_multi = pred_horizon
        self.cbr.fit(
            X_train[:, -self.train_horizon_multi:,
                    :].reshape(len(X_train), -1),
            y_train[:, :self.pred_horizon_multi, :].reshape(len(y_train), -1),
        )

    def pred_union(
        self,
        X_data,
        y_data,
        horizon_pred_out: int = 1,
    ):
        assert horizon_pred_out >= 1
        output = [
            self.cbr.predict(
                X_data[:, -self.train_horizon_union:,
                       :].reshape(len(X_data), -1),
            )
        ]
        additional_X = np.copy(y_data)
        for i in range(1, horizon_pred_out):
            additional_X[:, i-1, self.row_ind_union] = output[-1]
            if X_data.shape[1] > i:
                output.append(
                    self.cbr.predict(
                        np.concatenate(
                            (
                                X_data[:, -self.train_horizon_union+i:, :],
                                additional_X[:, :i, :],
                            ),
                            axis=1,
                        ).reshape(len(X_data), -1)
                    )
                )
            else:
                output.append(
                    self.cbr.predict(
                        additional_X[:, :i, :],
                    ).reshape(len(X_data), -1)
                )
        # TODO
        output = list(
            map(lambda x: x[::-1], np.array(output).reshape(X_data.shape[0], -1)))
        return (
            np.array(output).reshape(-1, horizon_pred_out),
            y_data[:, :horizon_pred_out, self.row_ind_union]
        )

    def pred_multi(
        self,
        X_pred,
    ):
        # TODO
        return self.pred_union(
            X_pred[:, -self.train_horizon_multi:, :].reshape(len(X_train), -1),
        )
