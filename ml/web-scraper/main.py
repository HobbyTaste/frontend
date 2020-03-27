from scraper import Scraper
import pandas as pd
import os


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


if __name__ == "__main__":
    data = pd.read_excel('data.xlsx')
    data = data.head(100)
    
    scraper = Scraper(data=data, reject=['youtube', 'twitter', 'wiki', 'zoom', 
                                         'kudago', 't.me', 'telegram'])

    scraper.inspect()
    
    output = scraper.process_output()
    create_file('./result.csv')
    output.to_csv('./result.csv')
