import matplotlib.pyplot as plt
import numpy as np


from catboost import CatBoostRegressor
from sklearn.multioutput import MultiOutputRegressor
from torch.utils.data import TensorDataset, DataLoader


class CatBoost_model:
    """
    CatBoost модель 
    для работы с временными рядами
    """

    def __init__(
        self,
        use_gpu=True,
        device=None,
        loss_function='RMSE',
        multi_target=False,
        params=None
    ):
        if params is not None:
            if use_gpu:
                if multi_target:
                    raise ValueError(
                        "Catboost does not support multitarget on GPU yet")
                self.cbr = CatBoostRegressor(
                    loss_function=loss_function,
                    task_type="GPU",
                    devices='cuda:0',
                    verbose=100,
                    **params,
                )
            else:
                if multi_target:
                    self.cbr = CatBoostRegressor(
                        loss_function='MultiRMSE',
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
                if multi_target:
                    raise ValueError(
                        "Catboost does not support multitarget on GPU yet")
                self.cbr = CatBoostRegressor(
                    loss_function=loss_function,
                    task_type="GPU",
                    devices='cuda:0',
                    verbose=100,
                )
            else:
                if multi_target:
                    self.cbr = CatBoostRegressor(
                        loss_function='MultiRMSE',
                        verbose=100,
                    )
                else:
                    self.cbr = CatBoostRegressor(
                        loss_function=loss_function,
                        verbose=100,
                    )
        self.train_horizon_union = None
        self.row_ind_union = None
        self.train_horizon_multi = None
        self.pred_horizon_multi = None

    def train_union(
        self,
        x_train,
        y_train,
        train_horizon: int,
        row_ind: int = 0,
    ):
        self.train_horizon_union = train_horizon
        self.row_ind_union = row_ind
        self.cbr.fit(
            x_train[:, -self.train_horizon_union:,
                    :].reshape(len(x_train), -1),
            y_train[:, 0, self.row_ind_union],
        )

    def train_multi(
        self,
        x_train,
        y_train,
        train_horizon: int,
    ):
        self.train_horizon_multi = train_horizon
        self.cbr.fit(
            x_train[:, -self.train_horizon_multi:,
                    :].reshape(len(x_train), -1),
            y_train[:, 0, :].reshape(len(y_train), -1),
        )

    def pred_union(
        self,
        x_data,
        y_data,
        horizon_pred_out: int = 1,
    ):
        assert horizon_pred_out >= 1
        output = [
            self.cbr.predict(
                x_data[:, -self.train_horizon_union:,
                       :].reshape(len(x_data), -1),
            )
        ]
        additional_x = np.copy(y_data)
        for i in range(1, horizon_pred_out):
            additional_x[:, i-1, self.row_ind_union] = output[-1]
            if x_data.shape[1] > i:
                output.append(
                    self.cbr.predict(
                        np.concatenate(
                            (
                                x_data[:, -self.train_horizon_union+i:, :],
                                additional_x[:, :i, :],
                            ),
                            axis=1,
                        ).reshape(len(x_data), -1)
                    )
                )
            else:
                output.append(
                    self.cbr.predict(
                        additional_x[:, :i, :],
                    ).reshape(len(x_data), -1)
                )

        output = list(
            map(lambda x: x[::-1], np.array(output).reshape(x_data.shape[0], -1)))
        return (
            np.array(output).reshape(-1, horizon_pred_out),
            y_data[:, :horizon_pred_out, self.row_ind_union]
        )

    def pred_multi(
        self,
        x_data,
        horizon_pred_out: int = 1
    ):
        assert horizon_pred_out >= 1
        x = x_data[:, -self.train_horizon_multi:, :]
        output = [
            self.cbr.predict(
                x.reshape(len(x), -1),
            )
        ]
        for _ in range(1, horizon_pred_out):
            x = np.concatenate(
                (
                    x[:, -self.train_horizon_multi+1:, :],
                    np.array(output[-1])[:, np.newaxis, :]
                ),
                axis=1
            )
            output.append(
                self.cbr.predict(
                    x.reshape(len(x), -1)
                )
            )
        if horizon_pred_out == 1:
            return np.array(output).reshape(len(x_data), -1)
        return np.array(output).reshape(len(x_data), horizon_pred_out, -1)
