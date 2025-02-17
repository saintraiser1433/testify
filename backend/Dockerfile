# ===== Stage 1: Build Stage =====
FROM node:20.16-alpine3.20 AS builder

WORKDIR /usr/src/db

# Copy package.json and install dependencies (cached separately)
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Generate Prisma client and build the project
RUN npx prisma generate && npm run build
RUN npm prune --production

# ===== Stage 2: Runtime Stage =====
FROM node:20.16-alpine3.20 AS runner

WORKDIR /usr/src/db
RUN addgroup -S db && adduser -S -G db db

COPY --from=builder /usr/src/db/node_modules ./node_modules
COPY --from=builder /usr/src/db/dist ./dist
COPY --from=builder /usr/src/db/prisma ./prisma
COPY --from=builder /usr/src/db/package*.json ./


RUN chown -R db:db /usr/src/db
USER db

EXPOSE 4000
