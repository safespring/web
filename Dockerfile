# Build stage - Hugo
FROM ghcr.io/gohugoio/hugo:latest AS builder

WORKDIR /src
COPY . .

RUN hugo --minify -d /site

# Runtime stage - nginx
FROM nginx:stable-alpine

# Copy built site
COPY --from=builder /site /usr/share/nginx/html

# Copy nginx config
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8081 8082 8083 8084

