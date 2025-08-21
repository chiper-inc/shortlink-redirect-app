# Install dependencies only when needed
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install

# Build the app
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY ./secrets/chiper-fcm-staging.json /app/secrets/chiper-fcm-staging.json
RUN npm run build

# Production image, copy built assets and run
FROM node:20-alpine AS runner
WORKDIR /app

# If you use .env.production, copy it here
# COPY .env.production .env.production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 80
ENV PORT=80
CMD ["npm", "start"]
