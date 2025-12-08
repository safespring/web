# Build stage - Hugo
FROM ghcr.io/gohugoio/hugo:latest AS builder

WORKDIR /src
COPY --chown=1000:1000 . .

RUN hugo --minify -d /src/public

# Runtime stage - nginx
FROM nginx:stable-alpine

# Copy built site
COPY --from=builder /src/public /usr/share/nginx/html

# Copy nginx config
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8081 8082 8083 8084
