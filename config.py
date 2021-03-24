from os import environ, path
from dotenv import load_dotenv

from itertools import chain
from celery import Celery
from celery.app.control import Inspect

load_dotenv()

basedir = path.abspath(path.dirname(__file__))


# Соединяемся с базой данных
class Config(object):
    DEBUG = False
    SECRET_KEY = environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = (environ.get('DATABASE_URL') or
                               'sqlite:///' + path.join(basedir, 'app.sqlite') + '?check_same_thread=False') 
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # silence the deprecation warning
    CELERY_RESULT_BACKEND = environ.get('CELERY_RESULT_BACKEND'),
    CELERY_BROKER_URL = environ.get('CELERY_BROKER_URL')

def make_celery(app):
    celery = Celery('flask-celery-app', backend=app.config['CELERY_RESULT_BACKEND'],
                    broker=app.config['CELERY_BROKER_URL'],
                    include=['celery_tasks.app_tasks'])
    TaskBase = celery.Task
    class ContextTask(TaskBase):
        abstract = True
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return TaskBase.__call__(self, *args, **kwargs)
    celery.Task = ContextTask
    return celery
