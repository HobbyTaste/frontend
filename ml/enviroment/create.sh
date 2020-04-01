#!/usr/bin/env bash

sudo apt install python3.6
python3.6 -m venv env
./env/bin/pip install -r requirements.txt
./env/bin/python -m ipykernel install --user --name python3-env-hobby-taste-ml --display-name "Hobby Taste ML"
