# Notes backend

```bash
git clone https://github.com/powersemmi/notes
cd notes
python -m venv venv
source venv/bin/activate

# For funning server use
./app.py runserver --help

# For using posgres use docker-compose what place in docker directory
cd docker & docker-compose up -d cd ../

# Then use migrations for create tables
./app.py db init & ./app.py db migrate & ./app.py db upgrade

# cli client place in './client'
cd client
# ./client.py command print help
./client.py <command> <args>

# For loading test use:
locust -f load_test.py
```
