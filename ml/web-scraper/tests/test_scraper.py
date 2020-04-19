import pandas as pd
import numpy as np
from scrapy.http import Request
from typing import List

from scraper import Scraper


vk_token = ''

def test_scraper_vk():
    scraper = Scraper(
        data=pd.DataFrame([['tipaurl.com']], columns=['Сайт']),
        vk_token=vk_token
    )

    res = scraper.process_vk_page('https://vk.com/kocherga_club')
    assert type(res) == dict
    assert res['address'] == 'Дорогомиловская Б. ул., д.5к2'
    assert res['metro_station'] == 'Киевская (линия 5)'
    assert res['image_source'] == 'https://sun9-51.userapi.com/c622920/v622920156/4ece1/ykksWy-fvBk.jpg?ava=1'

def wrapped_scraper(urls: List[str], reject: List[str] = [])->pd.DataFrame:
    data = pd.DataFrame(np.reshape(urls, (-1, 1)), columns=['Сайт'])
    scraper = Scraper(data, reject, vk_token)
    scraper.inspect()
    return scraper.process_output()

def test_scraper_some_page():
    urls = ['https://kocherga-club.ru']
    res = wrapped_scraper(urls)
    print(res)
    assert res == 42
