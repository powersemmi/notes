from sqlalchemy import Column, String
from datetime import datetime

from .base import BaseModel

class Notes(BaseModel):
    __tablename__ = 'notes'

    note = Column(String(120), nullable=False)
    description = Column(String(1024), nullable=False)

    def __init__(self, note, description) -> None:
        super().__init__()

        self.note = note
        self.description = description