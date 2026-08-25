FROM node:24-alpine AS deps

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile


FROM node:24-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY --from=deps /app/node_modules ./node_modules
COPY . .

#Build Time ENV only
ARG CONTENTFUL_SPACE_ID
ARG CONTENTFUL_ENVIRONMENT=master
ARG CONTENTFUL_DELIVERY_TOKEN
ARG NEXT_PUBLIC_BASE_URL=http://localhost:3000

ENV CONTENTFUL_SPACE_ID=$CONTENTFUL_SPACE_ID
ENV CONTENTFUL_ENVIRONMENT=$CONTENTFUL_ENVIRONMENT
ENV CONTENTFUL_DELIVERY_TOKEN=$CONTENTFUL_DELIVERY_TOKEN
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

RUN pnpm build


FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

COPY --from=builder --chown=nextjs:nextjs /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]