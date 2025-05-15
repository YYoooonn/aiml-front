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
COPY pnpm-lock.yaml package.json ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter socket-server build

# use alpine as the thinest image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Don't run production as root
RUN addgroup --system --gid 1001 express
RUN adduser --system --uid 1001 express
USER express

COPY --from=builder /app .

CMD ["node", "apps/socket-server/dist/index.js"]