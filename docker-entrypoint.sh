#!/bin/sh
set -e

DB_PATH="/data/custom.db"

echo ">>> Initializing database from seed..."
mkdir -p /data
cp /app/db/custom.db "$DB_PATH"
echo ">>> Database initialized at $DB_PATH"

exec "$@"
