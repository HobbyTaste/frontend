import argparse
import errno
import os

import pandas as pd

from scraper import Scraper


def ask_user(question: str) -> bool:
    '''
    Функция взаимодествия с пользователем.
    question --- строка вопроса к пользователю.
    Возвращает --- bool (ответ пользоватля - да/нет)
    '''

    response = input(question + ' y/n' + '\n')
    return response == 'y'


def create_file(path: str) -> None:
    '''
    Функция создания выходного файла
    path --- путь к файлу.
    '''

    response = False
    try:
        os.makedirs(path, mode=0o777)
    except OSError as error:
        # если файл существует, то спросить пользователя, иначе - проборосить исключение
        if error.errno != errno.EEXIST:
            raise
        response = ask_user('File already exists, replace?')
        if response:
            with open(path, 'wb') as file:
                file.close()


if __name__ == "__main__":
    # парсинг аргументов командной строки
    parser = argparse.ArgumentParser(
        description='Parsing data from given sites')

    # Путь к входной excel таблице, содержащей колонку 'Сайт'
    parser.add_argument('input', type=str, help='Input data with urls column\
     named \"Сайт\"')

    # Путь к выходной csv таблице
    parser.add_argument('output', type=str, help='Filename for output data')

    # Задание токена vk_api
    parser.add_argument(
        '-t',
        '--vk_token',
        default='',
        help='VK token for parsing data from https://vk.com/'
    )

    args = parser.parse_args()

    # чтение данных
    data = pd.read_excel(args.input)

    # Инициализация парсера
    scraper = Scraper(data=data, reject=['youtube', 'twitter', 'wiki', 'zoom',
                                         'kudago', 't.me', 'telegram'],
                      vk_token=args.vk_token)

    # Запуск парсера
    scraper.inspect()

    # Вывод результатов
    output_df = scraper.process_output()
    create_file(args.output)
    output_df.to_csv(args.output)
