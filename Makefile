PWD:=$(dir $(abspath $(firstword $(MAKEFILE_LIST))))
SHELL = /bin/zsh

all: install

start:
	source $(PWD).venv/bin/activate
	cd $(PWD)docker && docker-compose up -d
	sleep 5
	cd $(PWD) && ./app.py db migrate && ./app.py db upgrade
	cd $(PWD)react-view && (npm run start&)
	$(PWD)app.py runserver

install:
	sudo pacman -S python python-virtualenv  --noconfirm
	python -m virtualenv $(PWD).venv
	source $(PWD).venv/bin/activate
	$(PWD).venv/bin/python -m pip install --upgrade pip
	pip install -r $(PWD)requirements.txt
	$(PWD)app.py db init

stop:
	cd $(PWD)/docker && docker-compose down

uninstall:
	cd $(PWD)/docker && docker-compose down
	sudo rm -rf $(PWD)__pycache__ $(PWD).venv $(PWD)migrations $(PWD)docker/postgres $(PWD)docker/rabbitmq $(PWD)react-view/build $(PWD)react-view/node_modules

