import numpy as np
import pandas as pd

def url_preproc(url: str):
    # Убираем http в начале
    url = url.replace('http://', '')
    url = url.replace('https://', '')

    # Убираем '/' в конце
    if list(url)[-1] == '/':
        url = "".join(list(url)[:-1])

    return url



def calc_accuracy(data: pd.DataFrame, res: pd.DataFrame,
                  col_in_data: str, col_in_res: str,
                  key_in_data='Сайт', key_in_res='url',
                  preproc=None, print_wrong_answers=False):

    if preproc is None:
        preproc = lambda x: x


    # Содержательная часть кода начинается тут
    right_ans = 0
    for i in res.index:
        url = res[key_in_res][i]
        prediction = res[col_in_res][i]
        correct_answers = data[col_in_data][data[key_in_data] == url]
        if np.any([preproc(prediction) == preproc(ans) for ans in correct_answers]):
            right_ans += 1
        elif print_wrong_answers:
            print(f'Pred = {prediction}')
            print(f'Correct = {correct_answers}')
            print('')

    return right_ans / len(res)
