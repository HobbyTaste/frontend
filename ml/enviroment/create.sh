#!/usr/bin/env bash

sudo apt install python3.6
python3.6 -m venv env
./env/bin/pip install -r requirements.txt
