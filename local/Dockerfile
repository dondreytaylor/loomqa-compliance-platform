# syntax=docker/dockerfile:1

# Multi-stage Docker build for a production Next.js server.
#
# Why multi-stage?
# - Keeps the final image small (only runtime assets)
# - Avoids shipping build tools in production

FROM node:22-alpine AS base
WORKDIR /app

# Avoid sending telemetry from CI/build environments.
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps

# Install dependencies based on the lockfile for reproducible builds.
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder

# Reuse node_modules from deps stage.
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application code.
COPY . .

# Build the Next.js app.
RUN npm run build

FROM base AS runner

ENV NODE_ENV=production

# Only copy what we need to run `next start`.
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# `npm start` is configured to bind on 0.0.0.0:3000 for Docker.
CMD ["npm", "start"]
