# Step 0: Set up base with pnpm
FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && apk add --no-cache libc6-compat


# Step 1: Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/socket-server/package.json ./apps/socket-server/package.json
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY . .
COPY .env ./apps/socket-server/.env
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/socket-server/node_modules ./apps/socket-server/node_modules
RUN pnpm --filter ./apps/socket-server... build

# 3. Install only production deps
FROM base AS prod-deps
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/socket-server/package.json ./apps/socket-server/
RUN pnpm install --prod --filter ./apps/socket-server

# use alpine as the thinest image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Don't run production as root
RUN addgroup --system --gid 1001 express
RUN adduser --system --uid 1001 express
USER express

COPY --from=builder /app/apps/socket-server/dist ./apps/socket-server/dist
COPY --from=prod-deps /app/apps/socket-server/node_modules ./apps/socket-server/node_modules
COPY --from=prod-deps /app/node_modules ./node_modules

CMD ["node", "apps/socket-server/dist/index.js"]