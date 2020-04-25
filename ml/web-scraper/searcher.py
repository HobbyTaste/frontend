import argparse
import copy
import errno
import logging
import os
import re
from difflib import SequenceMatcher
from typing import List

import pandas as pd
import scrapy
import scrapy.crawler as crawler
import vk
from goose3 import Goose
from scrapy.linkextractors.lxmlhtml import LxmlLinkExtractor
from tqdm import tqdm


def ask_user(question: str) -> bool:
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


def search_vk_groups(request: str, vk_token: str, stop_urls: List[str] = []) -> List[str]:
    session = vk.Session(access_token=vk_token)
    vk_api = vk.API(session)

    count = 500
    moscow_id = 1
    res = vk_api.groups.search(v=6.0, q=request,
                               type='group',
                               city_id=moscow_id,
                               count=count)

    urls = []
    for item in res['items'][:min(count, res['count'])]:
        group_id = item['id']

        info = vk_api.groups.getById(v=6.0, group_id=group_id, fields=['links', 'site'])[0]

        if 'site' in list(info.keys()):
            if info['site'] != '':
                is_rejected = False
                for url in stop_urls:
                    if url in info['site']:
                        is_rejected = True
                        break
                
                if not is_rejected:
                    urls.append(info['site'])

    return urls


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

    stop_words = ['yandex', 'twitter', 'youtube',
              'zoon', 'zoom', 'news', 'vk.com', 'facebook',
              'vkontakte.ru',
              'instagram', 'tripadvisor', 'fb', 'avito',
              'pikabu', 'pinterest', 'ebay']

    key_words = ['', 'школа', 'секция', 'хобби', 'студия',
             'уроки', 'занятия', 'учёба', 'обучение',
             'тренировки', 'тренинг', 'мастер класс', 'класс', 
             'тренер']


    args = parser.parse_args()

    vk_token = args.vk_token
    categories = pd.read_csv(args.input)

    urls = []
    for category in tqdm(categories.categ):
        for key_word in key_words:
            request = category + ' ' + key_word
            urls += search_vk_groups(request, vk_token, stop_words)

    urls = list(set(urls))

    print(len(urls))
    urls = pd.DataFrame(urls, columns=['urls'])

    create_file(args.output)
    urls.to_csv(args.output)
