import copy
import logging
import re
from difflib import SequenceMatcher

import pandas as pd
import scrapy
import scrapy.crawler as crawler
import vk
from goose3 import Goose
from scrapy.linkextractors.lxmlhtml import LxmlLinkExtractor

logging.getLogger('scrapy').propagate = False


class Scraper(object):

    def __init__(self, data: pd.DataFrame, reject: list = [],
                 vk_token: str = '') -> None:
        '''
        Инициализатор класса.
        data --- датафрейм с колонкой 'Сайт'
        reject --- стоп-слова; url, их содержащие не обрабатывются
        vk_token --- token для vk_api
        '''

        for i in range(data['Сайт'].size):
            if 'http' not in str(data['Сайт'][i]):
                data['Сайт'][i] = 'http://' + str(data['Сайт'][i])

        # обрабатываемы адреса
        self.urls = data['Сайт']
        # исходный датафрейм
        self.data = data
        # стоп-слова
        self.reject = reject
        # token vk_api
        self.vk_token = vk_token
        
        # словарь результатов
        self.results = dict()

        # инициализация словаря
        for url in self.urls:
            # каждый scrapy.Spider добавляет в словарь results вида 'адрес сайта': curr_result
            curr_result = dict({'email': [],
                                'vk.com': [],
                                'instagram.com': [],
                                'facebook.com': [],
                                'ok.ru': [],
                                'phone': [],
                                'image_source': [],
                                'schedule': [],
                                'title': []})
            self.results[url] = curr_result

    def inspect(self) -> None:
        '''
        Функция запуска обработчика сайтов
        '''

        crawle = crawler.CrawlerProcess()

        for url in self.urls:
            # инициалищация scrapy.Spider для каждого сайта
            crawle.crawl(self.DataSpider, start_urls=[url],
                         path=self.results, reject=self.reject)
        crawle.start()

    def process_vk_page(self, link: str) -> dict:
        '''
        Функция обработки страницы vk.
        link --- ссылка на страницу vk
        Возвращает --- dict({'address': '',
                       'metro_station': '',
                       'image_source': ''}
        '''
        output = dict({'address': '',
                       'metro_station': '',
                       'image_source': ''})

        if not self.vk_token:
            return output

        try:
            # инициализация vk_api сессии
            session = vk.Session(access_token=self.vk_token)
            vk_api = vk.API(session)

            # получение названия группы vk
            group_name = link.split('/')[-1]
            info = vk_api.groups.getById(v=6.0, group_id=group_name)[0]

            # id группы для получения информации о ней
            group_id = info['id']
            
            #  получение фото со страницы
            if ('photo_200' in info.keys()):
                output['image_source'] = info['photo_200']

            # получение адреса группы
            address_info = vk_api.groups.getAddresses(
                v=6.0, group_id=group_id)['items']

            if address_info:
                if('address' in address_info[0].keys()):
                    output['address'] = address_info[0]['address']

                if('metro_station_id' in address_info[0].keys()):
                    metro_station_id = address_info[0]['metro_station_id']
                    metro_station = vk_api.database.getMetroStationsById(v=6.0,
                                                                         station_ids=metro_station_id)
                    output['metro_station'] = metro_station[0]['name']

        except vk.exceptions.VkAPIError:
            print('vk api error')

        return output

    def process_output(self) -> pd.DataFrame:
        '''
        Функция вывода обработанной информации.
        Возвращает --- pandas.dataframe
        c колонками ['url', 'email', 'phone', 'vk.com', 'instagram.com',
        'facebook.com', 'image_source', 'schedule', 'title']
        '''

        columns = ['url', 'email', 'phone', 'vk.com', 'instagram.com', 'facebook.com',
                   'image_source', 'schedule', 'title']

        # инициализация возвращаемого датафрейма
        self.output_df = pd.DataFrame(columns=columns)
        results = copy.deepcopy(self.results)

        # обработка словаря рещультатов
        for i, res in enumerate(results):
            for elem in columns[1:]:
                results[res][elem] = list(set(results[res][elem]))

                # среди всех email, найденных scrapy.Spider, выбираем наиболее похожий на адрес сайта
                if elem == 'email':
                    max_ratio = 0
                    if results[res][elem]:

                        answer = results[res][elem][0]
                        for email in results[res][elem]:
                            if SequenceMatcher(None, email, res).ratio() > max_ratio:
                                max_ratio = SequenceMatcher(
                                    None, email, res).ratio()
                                answer = email

                        results[res][elem] = [answer]

            curr_row = results[res].copy()

            # если обработчик нашёл несколько значений для какого-либо поля, то выводим первое
            for key in curr_row:
                if len(curr_row[key]) > 0:
                    curr_row[key] = curr_row[key][0]
                else:
                    curr_row[key] = ''


            curr_row['url'] = res
            curr_row['address'] = ''
            curr_row['metro_station'] = ''

            # результаты обработки страницы vk
            if curr_row['vk.com']:
                vk_parser_result = self.process_vk_page(curr_row['vk.com'])
                curr_row['address'] = vk_parser_result['address']
                curr_row['metro_station'] = vk_parser_result['metro_station']
                curr_row['image_source'] += ' ' + \
                    vk_parser_result['image_source']

            # полученный датафрем
            self.output_df = pd.concat([self.output_df,
                                        pd.DataFrame(curr_row, index=[0])])

        return self.output_df

    class DataSpider(scrapy.Spider):
        # наименование спайдера
        name = 'data_spider'

        # регулярные выражения для обработки номера телефона и email
        email_pattern = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}"
        phone_pattern = "[+]*\d{1}[(\- ]{0,2}[0-9]{3}[\- )]{0,2}[0-9]{3}[ -]{1,3}[0-9]{2}[ -]{1,3}[0-9]{2}"

        # ключевые слова для поиска расписания и списка цен
        key_links = ['ceny', 'Ceny', 'schedule', 'Schedule', 'tseny',
                     'tseny', 'Calendar', 'raspisanie', 'calendar',
                     'Raspisanie']

        # инициализация обработчика для получения изображений
        goose = Goose({'browser_user_agent': 'Mozilla',
                       'parser_class': 'soup',
                       'enable_image_fetching': True,
                       'strict': False})

        # ключевые слова для поиска адресов социальных сетей (их спайдер обрабатывать не должен)
        key_words = ['vk.com', 'instagram.com', 'facebook.com',
                     'ok.ru']

        def get_image(self, response):
            '''
            Функция получения предполагаемого изображения компании c использованием goose.
            response --- объект, хранящий информацию о страницы - url и html-код
            '''

            img = self.goose.extract(url=str(response.url)).top_image

            if img:
                self.path[self.start_urls[0]]['image_source'].append(img.src)

        def get_title(self, response):
            '''
            Функция получения предполагаемого наименования компании c использованием goose.
            response --- объект, хранящий информацию о страницы - url и html-код
            '''
            
            title = self.goose.extract(url=str(response.url)).title
            self.path[self.start_urls[0]]['title'].append(title)

        def parse(self, response):
            '''
            Основная функция, обрабатывающая главную страницу сайта.
            response --- объект, хранящий информацию о страницы - url и html-код
            '''

            # получение изображения и наименования
            self.get_image(response)
            self.get_title(response)

            #  получение всех ссылок со страницы
            links = LxmlLinkExtractor(allow=()).extract_links(response)
            links = [str(link.url) for link in links]
            links.append(str(response.url))

            # ссылки на страницы, html код которых нужно обрабатывать
            corr_links = []

            # обработка ссылок
            for link in links:
                for word in self.key_words:
                    if word in link:
                        self.path[self.start_urls[0]][word].append(link)

                if 't.me' not in link:
                    corr_links.append(link)

            corr_links = list(tuple(corr_links))

            # запуск парснга кода страниц
            for link in corr_links:
                yield scrapy.Request(url=link, callback=self.parse_link)

        def parse_link(self, response):
            '''
            Функция, обрабатывающая html код страницы.
            response --- объект, хранящий информацию о страницы - url и html-код
            '''

            # проверка ссылки на содержание стоп-слов
            for word in self.reject + self.key_words:
                if word in str(response.url):
                    return

            # получение html-кода
            html_text = str(response.text)

            schedule_list = []

            # ссылки на страницы с расписанием
            for key_link in self.key_links:
                if key_link in str(response.url):
                    schedule_list.append(str(response.url))

            # строки, соответствующие решулярным выражениям для поиска номера телефона или email
            mail_list = re.findall(self.email_pattern, html_text)
            phone_list = re.findall(self.phone_pattern, html_text)

            self.path[self.start_urls[0]]['email'] += mail_list
            self.path[self.start_urls[0]]['phone'] += phone_list
            self.path[self.start_urls[0]]['schedule'] += schedule_list
