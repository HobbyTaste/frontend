import numpy as np


class DiffLogScaler:
    def fit_transform(
        self,
        x: np.ndarray
    ) -> np.ndarray:
        """
        x : [num_samples, dimension]
        строит новый ряд z_{i} = ln(y_{i} / y_{i-1})
        """
        self.x_0 = np.log(x)[0, ]
        return np.diff(np.log(x), axis=0)

    def inverse_transform(
        self,
        x: np.ndarray
    ) -> np.ndarray:
        return np.exp(
            np.concatenate(
                ([self.x_0], x)
            ).cumsum(axis=0)
        )
