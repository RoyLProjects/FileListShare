before pushing:

- generate prismaclient pnpm --filter backend run generate:all
- migrations //npx prisma migrate dev --name init_db
- generate openAPI.json
- update frontend client

docker compose -f "C:\Users\gebruiker\source\repos\FileListShare\infra\docker\docker-compose.yml" up --build -d

