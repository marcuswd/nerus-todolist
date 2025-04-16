#!/bin/sh

until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "⏳ Banco ainda não está pronto. Aguardando 2s..."
  sleep 2
done

npx prisma generate

npx prisma migrate deploy

node dist/server.js
