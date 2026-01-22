# Meal Suggestions

[![Deployment pipeline](https://github.com/amandahamynen/what-to-eat/actions/workflows/pipeline.yml/badge.svg)](https://github.com/amandahamynen/what-to-eat/actions/workflows/pipeline.yml)

An app that randomly selects a meal from a database to help users quickly decide what to eat when they’re unsure

## Starting the application locally

Make sure you have Docker and Docker Compose installed

```bash
docker --version
docker compose version
```

Clone the repository
```bash
git clone git@github.com:amandahamynen/Meal-Suggestions.git
cd Meal-Suggestions
```

Start containers
```bash
docker compose -f docker-compose.dev.yml up    
```

Access the app:
- Frontend http://localhost:5173
- Backend http://localhost:8080

You can stop containers from the active console with ``CTRL + C`` or from other console with command 
```bash
docker compose down
```

Remove containers and volumes created by Docker Compose:
```bash
docker compose -f docker-compose.dev.yml down
```

