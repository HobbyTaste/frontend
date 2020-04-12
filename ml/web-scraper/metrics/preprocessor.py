import numpy as np
import pandas as pd

from typing import AnyStr, Union, List

class Preprocessor:
    def __init__(self, preproc_name):
        self.preproc_name = preproc_name

    def do_prep(self, data):
        if self.preproc_name == 'url':
            return Preprocessor._url_preproc(data)
        elif self.preproc_name == 'phone':
            return Preprocessor._phone_number_preproc(data)
        else:
            raise RuntimeError('Unknown preprocessor name')

    @staticmethod
    def _url_preproc(url: AnyStr) -> str:
        url  = str(url)

        # Убираем http и https в начале
        url = url.replace('http://', '')
        url = url.replace('https://', '')

        # Убираем '/' в конце
        if list(url)[-1] == '/':
            url = "".join(list(url)[:-1])

        return url

    @staticmethod
    def _phone_number_preproc(number: Union[int, str]) -> str:
        number = str(number)

        # Убираем вспомогательные символы
        number = number.replace(' ', '')
        number = number.replace('-', '')
        number = number.replace('(', '')
        number = number.replace(')', '')
        number = number.replace('+', '')

        # Заменяем +7 на 8 в начале номера
        if len(number) == 11 and number[0] == '7':
            asl = list(number)
            asl[0] = '8'
            number = "".join(asl)

        return number
