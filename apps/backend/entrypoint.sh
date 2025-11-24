#!/bin/sh
set -e

echo "Starting entrypoint for migrations..."

# --------------------------------------------------------------------
# 0) Resolve DB host:port for app and auth DBs
#    Env is already host:port, so we don't split it here except for pg_isready.
# --------------------------------------------------------------------
APP_DB_HOSTPORT="${DATABASE_HOST:-postgres:5432}"
AUTH_DB_HOSTPORT="${AUTH_DATABASE_HOST:-postgres:5432}"

echo "App DB host:port  = ${APP_DB_HOSTPORT}"
echo "Auth DB host:port = ${AUTH_DB_HOSTPORT}"

# --------------------------------------------------------------------
# 1) Wait for Postgres to be ready (accepting connections)
#    pg_isready needs host and port separately.
#    Use the fixed migrator user: app_migrator
# --------------------------------------------------------------------
MIGRATOR_USER="app_migrator"
# Prefer MIGRATOR_DB_PASSWORD, fall back to MIGRATOR_PASSWORD, then DATABASE_PASSWORD
MIGRATOR_PW="${MIGRATOR_DB_PASSWORD:-${MIGRATOR_PASSWORD:-$DATABASE_PASSWORD}}"

# Wait for APP DB host
until pg_isready -h "${APP_DB_HOSTPORT%%:*}" -p "${APP_DB_HOSTPORT##*:}" -U "${MIGRATOR_USER}"; do
  echo "Waiting for Postgres (APP DB) at ${APP_DB_HOSTPORT}..."
  sleep 1
done

# If auth DB host is different, wait for that too
if [ "${AUTH_DB_HOSTPORT}" != "${APP_DB_HOSTPORT}" ]; then
  until pg_isready -h "${AUTH_DB_HOSTPORT%%:*}" -p "${AUTH_DB_HOSTPORT##*:}" -U "${MIGRATOR_USER}"; do
    echo "Waiting for Postgres (AUTH DB) at ${AUTH_DB_HOSTPORT}..."
    sleep 1
  done
fi

echo "Postgres is ready, running migrations..."

# --------------------------------------------------------------------
# 2) Run migrations with fixed migrator user: app_migrator
# --------------------------------------------------------------------
export DATABASE_URL_CUSTOM="postgresql://${MIGRATOR_USER}:${MIGRATOR_PW}@${APP_DB_HOSTPORT}/${APP_DB_Name}"
export DATABASE_URL_AUTH="postgresql://${MIGRATOR_USER}:${MIGRATOR_PW}@${AUTH_DB_HOSTPORT}/${AUTH_DB_Name}"

echo "Running pnpm migrate:all:prod"

pnpm --filter backend migrate:all:prod

# --------------------------------------------------------------------
# 3) Switch to least-privilege runtime users
#    usernames: custom_app / auth_app
# --------------------------------------------------------------------
CUSTOM_PW="${CUSTOM_APP_PASSWORD:-${APP_DB_PASSWORD:-}}"
AUTH_APP_PW="${AUTH_APP_PASSWORD:-${AUTH_DB_PASSWORD:-}}"

export DATABASE_URL_CUSTOM="postgresql://custom_app:${CUSTOM_PW}@${APP_DB_HOSTPORT}/${APP_DB_Name}"
export DATABASE_URL_AUTH="postgresql://auth_app:${AUTH_APP_PW}@${AUTH_DB_HOSTPORT}/${AUTH_DB_Name}"

echo "Migrations done. Using runtime DB URLs:"

# --------------------------------------------------------------------
# 4) Start the app
# --------------------------------------------------------------------
echo "Starting app..."
exec pnpm --filter backend start
