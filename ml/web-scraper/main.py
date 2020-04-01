import argparse
import errno
import os

import pandas as pd

from scraper import Scraper


def ask_user(question: str) -> str:
    response = input(question + ' y/n' + '\n')
    return response == 'y'


def create_file(path: str) -> None:
    response = False
    try:
        os.makedirs(path, mode=0o777)
    except OSError as error:
        if error.errno != errno.EEXIST:
            raise
        response = ask_user('File already exists, replace?')
        if response:
            with open(path, 'wb') as file:
                file.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description='Parsing data from given sites')
    parser.add_argument('input', type=str, help='Input data with urls column\
     named \"Сайт\"')
    parser.add_argument('output', type=str, help='Filename for output data')
    parser.add_argument(
        '-t',
        '--vk_token',
        default='',
        help='VK token for parsing data from https://vk.com/'
    )

    args = parser.parse_args()

    data = pd.read_excel(args.input)

    scraper = Scraper(data=data, reject=['youtube', 'twitter', 'wiki', 'zoom',
                                         'kudago', 't.me', 'telegram'],
                      vk_token=args.vk_token)

    scraper.inspect()

    output_df = scraper.process_output()
    create_file(args.output)
    output_df.to_csv(args.output)
