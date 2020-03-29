import numpy as np
import matplotlib.pyplot as plt
from tqdm import tqdm


class Preprocessor:
    """
    Класс для препроцессинга данных для использования модели 

    """

    def __init__(
        self,
        data:np.ndarray,
        max_train_horizon:int=30,
        D_size:int=None,
    ):
        """
        data : временной ряд, [num_samples, dimentions]

        p: период времени, 
        на основе значений которого будет строиться прогноз(порядок 
        для модели авторегресии)

        D_size : размерность временного ряда(кол-ва компонент)

        train_size : размери тренировочной выборки

        train_data : временной ряд для обучения

        test_data : временной ряд для тестирования

        X_test : периоды времени для тестирования,
        формат [[p, D_size], ... ]

        y_test : значения временного ряда для X_test, формат [[D_size], ..]

        scaler: TODO
        """
        self.data = data[:, :D_size]
        self.max_train_horizon=max_train_horizon
        self.D_size = D_size
        self.scaler = None
        self.train_size = None
        self.train_data = None
        self.test_data = None
        self.X_test = None
        self.y_test = None


    def _plot_row(
        self,
        row:int=0,
        title:str='title'
    ):
        plt.figure(figsize=(10, 4))
        plt.title(title)
        plt.plot(self.data[:,row])
        if self.train_size is not None:
            plt.axvline(x=self.train_size, color='green')
        plt.show()


    def plot_data(
        self,
        titles:list=None,
        rows:list=None
    ):
        if rows is None:
            for i in np.arange(self.data.shape[1]):
                self._plot_row(row=i, 
                               title=titles[i])
        else:
            for i, row in enumerate(rows):
                self._plot_row(row=row,
                               title=titles[i])


    def train_test_split(
        self,
        train_size:int,
    ):  
        self.train_size = train_size
        self.test_size = self.data.shape[0]-self.train_size
        self.train_data = self.data[:train_size, :]
        self.test_data = self.data[train_size:, :]
        X_test = self.data[train_size:train_size+self.max_train_horizon,
                         :][np.newaxis, :, :]
        y_test = self.data[train_size+self.max_train_horizon:train_size+
                         self.max_train_horizon+1,
                         :][np.newaxis, :, :]                 
        for i in tqdm(np.arange(train_size+1, 
                           self.data.shape[0]-self.max_train_horizon)):
            new_elem = self.data[i:i+self.max_train_horizon,
                                        :][np.newaxis, :, :]
            X_test = np.concatenate((X_test, new_elem))
            new_elem = self.data[i:i+1,:][np.newaxis, :, :]
            y_test = np.concatenate((y_test, new_elem))
        self.X_test = X_test
        self.y_test = y_test
    