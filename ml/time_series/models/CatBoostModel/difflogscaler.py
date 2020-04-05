import numpy as np


class DiffLogScaler:
    def fit_transform(
        self,
        X: np.ndarray
    ) -> np.ndarray:
        """
        X : [num_samples, dimension]
        строит новый ряд z_{i} = ln(y_{i} / y_{i-1})
        """
        self.X_0 = np.log(X)[0, ]
        return np.diff(np.log(X), axis=0)

    def inverse_transform(
        self,
        X: np.ndarray
    ) -> np.ndarray:
        return np.exp(
            np.concatenate(
                ([self.X_0], X)
            ).cumsum(axis=0)
        )
