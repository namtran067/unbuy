#!/bin/sh
set -e

DB_PATH="/data/custom.db"

if [ ! -f "$DB_PATH" ]; then
  echo ">>> Initializing database from seed..."
  mkdir -p /data
  cp /app/db/custom.db "$DB_PATH"
  echo ">>> Database initialized at $DB_PATH"
else
  echo ">>> Database already exists at $DB_PATH"
fi

exec "$@"
