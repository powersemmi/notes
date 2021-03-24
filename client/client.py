import requests as req
import sys

host = '127.0.0.1:5000'

def get_note(query=None):
    """Get all notes."""
    if query is not None:
        print(req.get(f'http://{host}/notes/{query}').json())
    else:
        print(req.get(f'http://{host}/notes').json())

def new_note(note, description):
    """Insert new notes."""
    print(req.post(f'http://{host}/notes', json={'note': note, 'description': description}).status_code)

def update_note(note_id, note, description):
    """Update note by id"""
    print(req.put(f'http://{host}/notes/{note_id}', json={'note': note, 'description': description}).status_code)

def delete_note(note_id):
    """Delete note by id"""
    print(req.delete(f'http://{host}/notes/{note_id}').status_code)

if __name__ == '__main__':

    args = sys.argv[1:]
    if args:
        if args[0] == 'get_note':
            if len(args) > 1:
                get_note(args[1])
            else:
                get_note()
        elif args[0] == 'new_note':
            if len(args) > 2:
                new_note(args[1], args[2])
            else:
                print('Example: ./client.py ')
        elif args[0] == 'update_note':
            if len(args) > 3:
                update_note(args[1], args[2], args[3])
            else:
                print('Example: ./client.py update_note 1 "note" "description')
        elif args[0] == 'delete_note':
            if len(args) > 1:
                delete_note(args[1])
            else:
                print('Example: ./client.py delete_note 1')
    else:
        print("Allowed comands: get_note, new_note, update_note, delete_note")

    # print('ALL', get_note().json())
    # print('BY ID', get_note(1).json())
    # print('BY REGEX', get_note('.*').json())
    # res = new_note('INSERT', '123121212')
    # print('INSERT', res.json(), res.status_code)
    # res = res.json()
    # print('UPDATE', update_note(res['id'], 'UPDATE', '123121212').status_code)
    # print('DELITE', delete_note(res['id']).status_code)