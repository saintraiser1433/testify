# ===== Stage 1: Build Stage =====
FROM node:20.16-alpine3.20 AS builder

WORKDIR /usr/src/apps

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build
RUN npm prune --production

# ===== Stage 2: Runtime Stage =====
FROM node:20.16-alpine3.20 AS runner

WORKDIR /usr/src/apps


RUN addgroup -S apps && adduser -S -G apps apps
# Copy only necessary files from builder stage
COPY --from=builder /usr/src/apps/node_modules ./node_modules
COPY --from=builder /usr/src/apps/.output .output
COPY --from=builder /usr/src/apps/package*.json ./


RUN chown -R apps:apps /usr/src/apps
USER apps


EXPOSE 3000
# CMD ["npm", "run", "start"] -- use only for testing 1 container
