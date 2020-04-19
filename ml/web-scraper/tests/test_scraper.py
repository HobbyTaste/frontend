import pandas as pd
import numpy as np
from scrapy.http import Request
from typing import List

from scraper import Scraper


def get_token():
    with open('vk_token.txt', 'r') as file:
        return file.read()

def test_scraper_vk():
    vk_token = get_token()
    scraper = Scraper(
        data=pd.DataFrame([['tipaurl.com']], columns=['Сайт']),
        vk_token=vk_token
    )

    res = scraper.process_vk_page('https://vk.com/kocherga_club')
    assert type(res) == dict
    assert res['address'] == 'Дорогомиловская Б. ул., д.5к2'
    assert res['metro_station'] == 'Киевская (линия 5)'
    assert res['image_source'] == 'https://sun9-51.userapi.com/c622920/v622920156/4ece1/ykksWy-fvBk.jpg?ava=1'
