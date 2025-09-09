# # Docker 이미지 최적화를 위해 multi-stage 빌드 사용
# ## [1] build stage
# FROM node:alpine AS builder
# RUN apk add --no-cache libc6-compat
# RUN apk update
# # Set working directory
# WORKDIR /app
# RUN npm install -g turbo
# COPY . .
# RUN turbo prune --scope=web --docker
 
# # Add lockfile and package.json's of isolated subworkspace
# FROM node:alpine AS installer
# RUN apk add --no-cache libc6-compat
# RUN apk update
# RUN npm install -g turbo
# WORKDIR /app
 
# # First install the dependencies (as they change less often)
# COPY .gitignore .gitignore
# COPY --from=builder /app/out/json/ .
# COPY --from=builder /app/out/json/package.json ./package.json
# COPY --from=builder /app/out/json/package-lock.json ./package-lock.json
# RUN npm install
 
# # Build the project
# COPY --from=builder /app/out/full/ .
# COPY turbo.json turbo.json
# RUN turbo run build --filter=web...
 
# # [2] Run Stage
# FROM node:alpine AS runner
# WORKDIR /app
 
# # Don't run production as root
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# USER nextjs
 
# COPY --from=installer /app/apps/web/next.config.js .
# COPY --from=installer /app/apps/web/package.json .
 
# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
# COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
 
# CMD node apps/web/server.js





# Multi-stage build for Next.js monorepo app
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install turbo globally
RUN npm install -g turbo

# Dependency extraction stage
FROM base AS pruner
COPY . .
RUN turbo prune --scope=web --docker

# Install dependencies only
FROM base AS installer
# Copy package files
COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/json/package.json ./package.json
COPY --from=pruner /app/out/json/package-lock.json ./package-lock.json

# Install dependencies with clean cache
RUN npm ci --only=production && npm cache clean --force

# Build stage
FROM base AS builder
# Copy dependency files
COPY .gitignore .gitignore
COPY --from=pruner /app/out/full/ .
COPY --from=pruner /app/out/json/package.json ./package.json
COPY --from=pruner /app/out/json/package-lock.json ./package-lock.json
COPY turbo.json turbo.json

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Build the application
RUN turbo run build --filter=web

# Final runtime stage - minimal image
FROM node:18-alpine AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only necessary files for runtime
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

# Copy public files if they exist
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
# HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
#     CMD node --version || exit 1

# Start the application
CMD ["node", "apps/web/server.js"]