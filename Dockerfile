# Build stage - Hugo
FROM ghcr.io/gohugoio/hugo:latest AS builder

WORKDIR /src
COPY --chown=1000:1000 . .

RUN hugo --minify -d /src/public && \
    # Deduplicate static assets across language directories (sv is default, others symlink to it)
    for lang in da nb en; do \
      rm -rf /src/public/$lang/img && ln -s ../sv/img /src/public/$lang/img; \
      rm -rf /src/public/$lang/fonts && ln -s ../sv/fonts /src/public/$lang/fonts; \
      rm -rf /src/public/$lang/marketing && ln -s ../sv/marketing /src/public/$lang/marketing; \
      rm -rf /src/public/$lang/publications && ln -s ../sv/publications /src/public/$lang/publications; \
      rm -rf /src/public/$lang/pricelist && ln -s ../sv/pricelist /src/public/$lang/pricelist; \
      rm -rf /src/public/$lang/documents && ln -s ../sv/documents /src/public/$lang/documents; \
      rm -rf /src/public/$lang/services && ln -s ../sv/services /src/public/$lang/services; \
    done

# Runtime stage - nginx
FROM nginx:stable-alpine

# Copy built site
COPY --from=builder /src/public /usr/share/nginx/html

# Copy nginx config
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8081 8082 8083 8084
