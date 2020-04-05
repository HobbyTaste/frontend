import matplotlib.pyplot as plt
import numpy as np
import torch

from difflogscaler import DiffLogScaler
from torch.utils.data import TensorDataset, DataLoader
from tqdm.notebook import tqdm


class Preprocessor:
    def __init__(
        self,
        dataset: np.ndarray,
        max_pred_horizon: int = 28,
        max_train_horizon: int = 30,
        D_size: int = 5,
        device=None,
    ):
        """
        dataset = [num_samples, dimentions]
        """
        self.dataset = dataset[:, :D_size]
        self.raw_dataset = dataset[:, :D_size]
        self.max_pred_horizon = max_pred_horizon
        self.max_train_horizon = max_train_horizon
        self.D_size = D_size
        self.device = device
        self.scaler = None
        self.train_size = None
        self.val_size = None
        self.test_size = None
        self.X_train = None
        self.y_train = None
        self.X_val = None
        self.y_val = None
        self.X_test = None
        self.y_test = None
        self.batch_size = None

    def scale(
        self,
        scaler=DiffLogScaler,
    ):
        """
        Scaler needs to be smth like sklearn transformer
        """
        self.scaler = scaler()
        self.dataset = self.scaler.fit_transform(self.dataset)

    def get_scaled_back(
        self,
        dataset: np.ndarray,
    ) -> np.ndarray:
        if self.scaler is not None:
            return self.scaler.inverse_transform(dataset)
        return dataset

    def _plot_row(
        self,
        row: int,
    ):
        plt.figure(figsize=(12, 8))
        plt.title('{} row'.format(str(row)))
        if self.scaler is None:
            plt.plot(self.dataset[:, row])
        else:
            plt.plot(self.scaler.inverse_transform(self.dataset)[:, row])
        if self.train_size is not None:
            plt.axvline(x=self.train_size)
        if self.val_size is not None:
            plt.axvline(x=self.train_size+self.val_size)
        plt.show()

    def plot_dataset(
        self,
        row: int = None,
    ):
        if row is None:
            for i in range(self.dataset.shape[1]):
                self._plot_row(row=i)
        else:
            self._plot_row(row=row)

    def get_data(
        self,
        name: str,
        torch_tensor=True,
        to_device=True,
    ) -> torch.Tensor:
        if name not in [
            'X_train', 'X_val', 'X_test',
            'y_train', 'y_val', 'y_test',
        ]:
            raise "Private field cannot be accessed"
        else:
            if torch_tensor:
                return torch.Tensor(getattr(self, name)).to(self.device)
            return getattr(self, name)

    def get_dataloader(
        self,
        name: str,
        batch_size=128,
    ) -> torch.utils.data.DataLoader:
        self.batch_size = batch_size
        if name not in [
            'train', 'val', 'test',
        ]:
            raise "Incorrect type"
        X = torch.Tensor(getattr(self, 'X_'+name)).to(self.device)
        y = torch.Tensor(getattr(self, 'y_'+name)).to(self.device)
        if X is None:
            raise "Doesn't have the field of this type"
        if name == 'train':
            return DataLoader(
                TensorDataset(X, y),
                shuffle=True,
                batch_size=batch_size,
            )
        return DataLoader(
            TensorDataset(X, y),
            shuffle=False,
            batch_size=batch_size,
        )

    def _make_X_part(
        self,
        begin: int,
        end: int,
        use_tqdm: bool = True,
    ) -> np.ndarray:
        """
        X = [num_samples, max_train_horizon, D_size]
        """
        X = self.dataset[begin:begin+self.max_train_horizon,
                         :][np.newaxis, :, :]
        if use_tqdm:
            for i in tqdm(range(begin+1, end)):
                new_elem = self.dataset[i:i+self.max_train_horizon,
                                        :][np.newaxis, :, :]
                X = np.concatenate((X, new_elem))
        else:
            for i in range(begin+1, end):
                new_elem = self.dataset[i:i+self.max_train_horizon,
                                        :][np.newaxis, :, :]
                X = np.concatenate((X, new_elem))
        return X

    def _make_y_part(
        self,
        begin: int,
        end: int,
        use_tqdm: bool = True,
    ) -> np.ndarray:
        """
        y = [num_samples, max_pred_horizon, D_size]
        """
        y = self.dataset[begin+self.max_train_horizon:begin +
                         self.max_train_horizon+self.max_pred_horizon,
                         :][np.newaxis, :, :]
        if use_tqdm:
            for i in tqdm(range(begin+1+self.max_train_horizon,
                                end+self.max_train_horizon)):
                new_elem = self.dataset[i:i+self.max_pred_horizon,
                                        :][np.newaxis, :, :]
                y = np.concatenate((y, new_elem))
        else:
            for i in range(begin+1+self.max_train_horizon,
                           end+self.max_train_horizon):
                new_elem = self.dataset[i:i+self.max_pred_horizon,
                                        :][np.newaxis, :, :]
                y = np.concatenate((y, new_elem))
        return y

    def train_test_split(
        self,
        train_size: int,
        use_tqdm: bool = True,
    ):
        self.val_size = None
        self.X_val, self.y_val = None, None
        self.train_size = train_size
        self.test_size = self.dataset.shape[0] - self.max_train_horizon -\
            self.max_pred_horizon - self.train_size
        self.X_train = self._make_X_part(
            begin=0,
            end=train_size,
            use_tqdm=use_tqdm
        )
        self.y_train = self._make_y_part(
            begin=0,
            end=train_size,
            use_tqdm=use_tqdm
        )
        self.X_test = self._make_X_part(
            begin=train_size,
            end=self.dataset.shape[0]-self.max_train_horizon
            - self.max_pred_horizon,
            use_tqdm=use_tqdm
        )
        self.y_test = self._make_y_part(
            begin=train_size,
            end=self.dataset.shape[0]-self.max_train_horizon
            - self.max_pred_horizon,
            use_tqdm=use_tqdm
        )

    def train_val_test_split(
        self,
        train_size: int,
        val_size: int,
        use_tqdm: bool = True,
    ):
        self.train_size = train_size
        self.val_size = val_size
        self.test_size = self.dataset.shape[0] - self.max_train_horizon -\
            self.max_pred_horizon - train_size - val_size
        self.X_train = self._make_X_part(
            begin=0,
            end=train_size,
            use_tqdm=use_tqdm
        )
        self.y_train = self._make_y_part(
            begin=0,
            end=train_size,
            use_tqdm=use_tqdm
        )
        self.X_val = self._make_X_part(
            begin=train_size,
            end=train_size+val_size,
            use_tqdm=use_tqdm
        )
        self.y_val = self._make_y_part(
            begin=train_size,
            end=train_size+val_size,
            use_tqdm=use_tqdm
        )
        self.X_test = self._make_X_part(
            begin=train_size+val_size,
            end=self.dataset.shape[0]-self.max_train_horizon
            - self.max_pred_horizon,
            use_tqdm=use_tqdm
        )
        self.y_test = self._make_y_part(
            begin=train_size+val_size,
            end=self.dataset.shape[0]-self.max_train_horizon
            - self.max_pred_horizon,
            use_tqdm=use_tqdm
        )
