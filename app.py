#!/bin/env python3
from flask import Flask

from flask_cors import CORS
from flask_script import Manager, Command
from flask_migrate import Migrate, MigrateCommand

from app import db, api
from app.shema.models import *
from config import Config, make_celery


app = Flask(__name__, template_folder='app/templates')
app.config.from_object(Config)
CORS(app)

celery = make_celery(app)
app.celery = celery

db.init_app(app)

app.register_blueprint(api)

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)
# manager.add_command('run', RunApp)

if __name__ == '__main__':
    manager.run()