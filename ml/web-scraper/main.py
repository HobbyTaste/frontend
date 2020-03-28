from scraper import Scraper
import pandas as pd
import os
import numpy as np


def ask_user(question):
    response = input(question + ' y/n' + '\n')
    if response == 'y':
        return True
    else:
        return False


def create_file(path):
    response = False
    if os.path.exists(path):
        response = ask_user('File already exists, replace?')
        if response == False:
            return

    with open(path, 'wb') as file:
        file.close()

def request_token():
    return input('Введите vk токен для запросов к api \n')


if __name__ == "__main__":
    '''data = pd.read_excel('data.xlsx')
    data = data.head(100)
    
    scraper = Scraper(data=data, reject=['youtube', 'twitter', 'wiki', 'zoom', 
                                         'kudago', 't.me', 'telegram'])

    scraper.inspect()
    
    output = scraper.process_output()
    create_file('./result.csv')
    output.to_csv('./result.csv')'''


    token = request_token()

    input_data = pd.read_excel('data.xlsx')

    scraper = Scraper(data=input_data, reject=['youtube', 'twitter', 'wiki', 'zoom', 
                                         'kudago', 't.me', 'telegram'], 
                      vk_token=token)

    data = pd.read_csv('result.csv')

    for url in data['vk.com'].dropna():
        print(url)
        print(str(scraper.process_vk_page(url)))
