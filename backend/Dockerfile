# Build
FROM node:23-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate && npm run build

# Runtime
FROM node:23-slim

RUN apt-get update -y && apt-get install -y openssl netcat-openbsd dos2unix

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/start.sh ./start.sh
RUN dos2unix ./start.sh && chmod +x ./start.sh
RUN chmod +x ./start.sh

ENV PORT=3001
EXPOSE 3001

CMD ["./start.sh"]
