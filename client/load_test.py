from locust import HttpUser, between, task
import requests as req


class WebsiteUser(HttpUser):
    
    def on_start(self):
        self.host = '127.0.0.1:5000'
    
    @task
    def get_note(self):
        self.client.get(f'http://{self.host}/notes/1')
    
    @task
    def get_note_regex(self):
        self.client.get(f'http://{self.host}/notes/?regex=.*')
    
    @task
    def get_all_notes(self):
        self.client.get(f'http://{self.host}/notes')

    @task
    def new_note(self):
        note, description = "test", "testtest"
        self.client.post(f'http://{self.host}/notes', json={'note': note, 'description': description})

    @task
    def update_note(self):
        note_id, note, description = 18, "test", "testtest"
        self.client.put(f'http://{self.host}/notes/{note_id}', json={'note': note, 'description': description})

    @task
    def delete_note(self):
        note_id = 18
        self.client.delete(f'http://{self.host}/notes/{note_id}')
