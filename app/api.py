from typing import Dict, List, Tuple, Union
from datetime import datetime
from flask import (
    Blueprint, 
    jsonify,
    request
)

from flask.wrappers import JSONMixin

from app.shema.models import Notes, db

from sqlalchemy.sql import text

api = Blueprint('api', __name__)


@api.route('/', methods=['GET'])
def index():
    return "OK", 200

@api.route('/notes', methods=['GET'])
@api.route('/notes/<note_id>', methods=['GET'])
def get_notes(note_id: Union[str, None] = None) -> JSONMixin:
    """Return notes

    Args:
        note_id (Union[int, Tuple[int], List[int]], optional): if None func return all notes. Defaults to None.

    Returns:
        Union[List[Dict[str, Union[int, str]]], Dict[str, Union[int, str]]]: List of Dict or single Dict
    """
    if note_id is None:
        notes: Tuple[Notes] = Notes.query.all()
        return jsonify(tuple({'id': i.id, 'note': i.note} for i in notes))

    elif note_id.isdecimal():
        note: Tuple[Notes] = Notes.query.filter_by(id=int(note_id)).first()

        if note is None:
            return jsonify()

        return jsonify({'id': note.id, 'note': note.note, 'description': note.description})
    elif note_id:
        print(note_id)
        notes: Tuple[Notes] = db.session.query(Notes).filter(Notes.note.op("~")(note_id)).all()
        return jsonify(tuple({'id': note.id, 'note': note.note, 'description': note.description} for note in notes))



@api.route('/notes', methods=['POST'])
def post_notes():
    data: Dict[str, Union[int, str]] = request.get_json()

    """Insert new note"""
    new_note = Notes(data['note'], data['description'])
    db.session.add(new_note)
    db.session.flush()
    db.session.refresh(new_note)
    db.session.commit()
    return jsonify({'id': new_note.id}), 201

@api.route('/notes/<int:note_id>', methods=['DELETE'])
def del_notes(note_id: int):
    row = Notes.query.filter_by(id=note_id).first()
    if row is not None:
        db.session.delete(row)
        db.session.commit()
        return jsonify(), 200
    else:
        return jsonify(), 404
        

@api.route('/notes/<int:note_id>', methods=['PUT'])
def put_notes(note_id: id):
    """Update note by id"""
    data: Dict[str, Union[int, str]] = request.get_json()

    row = {}
    if data.get('note'):
        row.update({'note': data.get('note')})
    if data.get('description'):
        row.update({'description': data.get('description')})
    note = Notes.query.filter_by(id=note_id).update(row)
    if note:
        db.session.commit()
        return jsonify(), 200
    else:
        return jsonify(), 404

