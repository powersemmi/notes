from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql.sqltypes import TIMESTAMP, INTEGER, VARCHAR

db = SQLAlchemy()

class BaseModel(db.Model):
    __abstract__ = True

    id = Column(INTEGER, nullable=False, unique=True, primary_key=True, autoincrement=True)
    created_at = Column(TIMESTAMP, nullable=False, default=db.func.current_timestamp())
    updated_at = Column(TIMESTAMP, nullable=False, default=db.func.current_timestamp(),
                                                   onupdate=db.func.current_timestamp())

    def __repr__(self):
        return "<{0.__class__.__name__}(id={0.id!r})>".format(self)
