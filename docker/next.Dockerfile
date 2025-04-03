FROM node:18-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# COPY . /app

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Step 1. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 빌드시에 전달 되어야 한다
ARG NEXT_PUBLIC_HOSTNAME
ENV NEXT_PUBLIC_HOSTNAME=${NEXT_PUBLIC_HOSTNAME}
ARG BACKEND_API_BASE
ENV BACKEND_API_BASE = ${BACKEND_API_BASE}

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# ?? Build for custom server
# RUN pnpm tsc --project tsconfig.server.json
# COPY ./dist ./dist
# RUN node ./dist/install.js ./dist/server.js ./dist

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/required-server-files.json ./.next/required-server-files.json

# Custom server
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
# FIXME 필요 모듈만 가져온다 하더라도 socket.io가 제대로 작동하지 않음 -> 서버없이 nextjs 라우터 안에서 소켓 실행하는 방법 고민
# COPY --from=builder --chown=nextjs:nodejs /app/node_modules/socket.io ./node_modules/socket.io
# COPY --from=builder --chown=nextjs:nodejs /app/node_modules/dotenv ./node_modules/dotenv
# COPY --from=builder --chown=nextjs:nodejs /app/node_modules/next ./node_modules/next

# Note: Don't expose ports here, Compose will handle that for us
CMD ["node", "./dist/server.js"]