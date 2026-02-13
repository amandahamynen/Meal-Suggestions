# Meal Suggestions

[![Deployment pipeline](https://github.com/amandahamynen/what-to-eat/actions/workflows/pipeline.yml/badge.svg)](https://github.com/amandahamynen/what-to-eat/actions/workflows/pipeline.yml)

An app that suggests random meals from a database to make choosing what to eat easier.

## Starting the application locally

Make sure you have **Docker** and **Docker Compose** installed:

```bash
docker --version
docker compose version
```

Clone the repository:
```bash
git clone git@github.com:amandahamynen/Meal-Suggestions.git
cd Meal-Suggestions
```

Start development containers:
```bash
docker compose -f docker-compose.dev.yml up    
```

Access the app:
- Frontend http://localhost:5173
- Backend http://localhost:8080

You can stop containers from the active console with ``CTRL + C``

## Running Robot tests

Make sure you have Python (3.10+) installed and then run
```bash
pip install robotframework robotframework-browser robotframework-requests
```

After installing ```robotframework-browser```, initialize the Browser library
```bash
rfbrowser init
```

Start test containers:
```bash
docker compose -f docker-compose.test.yml up
```
Run tests
```bash
robot --outputdir frontend/robot/results frontend/robot/tests
```

## Cleanup

Remove containers and volumes created by Docker Compose:
```bash
docker compose -f docker-compose.dev.yml down --volumes
```

