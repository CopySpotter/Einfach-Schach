#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")/app"

if [ ! -f src/data/users.json ]; then
  cp src/data/users.example.json src/data/users.json
fi

if [ ! -d node_modules ]; then
  echo "Installiere die benoetigten Bausteine. Das ist nur beim ersten Start noetig..."
  npm ci --legacy-peer-deps
fi

echo "Starte Einfach-Schach..."
npm run dev
