`create.sh` - создать виртуальное окружение

`destroy.sh` - удалить виртуальное окружение

`update.sh` - обновить список библиотек в соответсвтии с `requirements.txt`

`run_jupyter.sh` - запустить jupyter notebook из-под виртуального окружения

Все команды нужно выполнять находясь в этой папке

### Как добавить библиотеки

Вписать их с уточнением версии в requirements.txt. В идеале оставлять небольшой комментарий про то, кто и зачем добавил библиотеку.

[Тут](https://pip.pypa.io/en/stable/reference/pip_install/#example-requirements-file) исчерпывающий пример про то, как вписывать библиотеки.

### Как связать с PyCharm

1. Заходим в File -> Settings -> Project: <Название проекта> -> Project Interpreter
2. Нажимаем на выпадающую вкладку -> Show All -> Add
3. В настройках выбираем Existing enviroment
4. Указываем путь до интерпретатора: <эта папка>/env/bin/python
