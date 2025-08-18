# 1. Prune unnecessary packages using turbo
FROM node:lts-alpine AS pruner

WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=api --docker


# 2. Install only necessary dependencies with npm
FROM node:lts-alpine AS installer

WORKDIR /app
COPY --from=pruner /app/out/json .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
COPY --from=pruner /app/turbo.json ./turbo.json
RUN npm ci

# 3. Build the application
FROM node:lts-alpine AS builder

WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full .
RUN npm run build

# 4. Create lightweight runner image
FROM node:lts-alpine AS runner

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
RUN echo $NODE_ENV

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN echo $DATABASE_URL

ARG DIRECT_URL
ENV DIRECT_URL=$DIRECT_URL
RUN echo $DIRECT_URL

ARG SUPABASE_JWT_SECRET
ENV SUPABASE_JWT_SECRET=$SUPABASE_JWT_SECRET
RUN echo $SUPABASE_JWT_SECRET

ARG SUPABASE_URL
ENV SUPABASE_URL=$SUPABASE_URL
RUN echo $SUPABASE_URL

ARG SUPABASE_ANON_KEY
ENV SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
RUN echo $SUPABASE_ANON_KEY


COPY --from=builder /app/ .

CMD ["node", "apps/api/dist/main"]

