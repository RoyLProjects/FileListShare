before pushing:

- generate prismaclient pnpm --filter backend run generate:all
- migrations //npx prisma migrate dev --name init_db
- generate openAPI.json
- update frontend client

docker compose -f "C:\Users\gebruiker\source\repos\FileListShare\infra\docker\docker-compose.yml" up --build -d

before start run:

//todo
methode maken voor tussentijdse wegvallen database, op een moment moet hij wel gaan crashen.

Frontend
updaing composefile secrets(match env and make sure to read system vars)
