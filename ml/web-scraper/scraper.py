import logging
import os
import pandas as pd
import re
import scrapy
import scrapy.crawler as crawler
import numpy as np
from scrapy.linkextractors.lxmlhtml import LxmlLinkExtractor
from goose3 import Goose
from difflib import SequenceMatcher
import copy

from googlesearch import search

from multiprocessing import Process, Queue
from twisted.internet import reactor
from threading import Thread

logging.getLogger('scrapy').propagate = False

class Scraper(object):

    def __init__(self, data, reject):
        for i in range(data['Сайт'].size):
            if not 'http' in str(data['Сайт'][i]):
                data['Сайт'][i] = 'http://' + str(data['Сайт'][i])

        self.urls = data['Сайт']
        self.data = data
        self.reject = reject

        self.results = dict()
        for url in self.urls:
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

    def inspect(self):
        crawle = crawler.CrawlerProcess({'USER_AGENT': 'Mozilla/5.0'})

        for url in self.urls:
            crawle.crawl(self.DataSpider, start_urls=[url],
                         path=self.results, reject=self.reject)
        crawle.start()

    def process_output(self):
        columns = ['url', 'email', 'phone', 'vk.com', 'instagram.com', 'facebook.com',
           'image_source', 'schedule', 'title']

        self.output_df = pd.DataFrame(columns=columns)
        results = copy.deepcopy(self.results)
        
        for i, res in enumerate(results):
            for elem in columns[1:]:
                results[res][elem] = list(set(results[res][elem]))

                if elem == 'email':
                    max_ratio = 0
                    if results[res][elem]:

                        answer = results[res][elem][0]
                        for email in results[res][elem]:
                            if SequenceMatcher(None, email, res).ratio() > max_ratio:
                                max_ratio = SequenceMatcher(None, email, res).ratio()
                                answer = email

                        results[res][elem] = [answer]

            curr_row = results[res].copy()
            for key in curr_row:
                if len(curr_row[key]) > 0:
                    curr_row[key] = curr_row[key][0]
                else:
                    curr_row[key] = np.nan

            curr_row['url'] = res

            self.output_df = pd.concat([self.output_df,
                                       pd.DataFrame(curr_row, index=[0])])

        return self.output_df



    class DataSpider(scrapy.Spider):

        name = 'data_spider'

        email_pattern = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}"
        phone_pattern = "[+]*\d{1}[(\- ]{0,2}[0-9]{3}[\- )]{0,2}[0-9]{3}[ -]{1,3}[0-9]{2}[ -]{1,3}[0-9]{2}"

        key_links = ['ceny', 'Ceny', 'schedule', 'Schedule', 'tseny',
                     'tseny', 'Calendar', 'raspisanie', 'calendar',
                     'Raspisanie']
        goose = Goose({'browser_user_agent': 'Mozilla',
                       'parser_class': 'soup',
                       'enable_image_fetching': True,
                       'strict': False})

        key_words = ['vk.com', 'instagram.com', 'facebook.com',
                     'ok.ru']

        def get_image(self, response):
            img = self.goose.extract(url=str(response.url)).top_image

            if img:
                self.path[self.start_urls[0]]['image_source'].append(img.src)

            return

        def get_title(self, response):
            title = self.goose.extract(url=str(response.url)).title
            self.path[self.start_urls[0]]['title'].append(title)

        def parse(self, response):
            self.get_image(response)
            self.get_title(response)

            links = LxmlLinkExtractor(allow=()).extract_links(response)
            links = [str(link.url) for link in links]
            links.append(str(response.url))

            corr_links = []

            for link in links:
                for word in self.key_words:
                    if word in link:
                        self.path[self.start_urls[0]][word].append(link)

                if not 't.me' in link:
                    corr_links.append(link)

            corr_links = list(tuple(corr_links))

            for link in corr_links:
                yield scrapy.Request(url=link, callback=self.parse_link)

        def parse_link(self, response):

            for word in self.reject + self.key_words:
                if word in str(response.url):
                    return

            html_text = str(response.text)

            schedule_list = []

            for key_link in self.key_links:
                if key_link in str(response.url):
                    schedule_list.append(str(response.url))

            mail_list = re.findall(self.email_pattern, html_text)
            phone_list = re.findall(self.phone_pattern, html_text)

            self.path[self.start_urls[0]]['email'] += mail_list
            self.path[self.start_urls[0]]['phone'] += phone_list
            self.path[self.start_urls[0]]['schedule'] += schedule_list