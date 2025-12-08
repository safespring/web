# Build stage - Hugo
FROM ghcr.io/gohugoio/hugo:latest AS builder

WORKDIR /src

# Copy static assets first (large, rarely change) - separate layer for caching
COPY --chown=1000:1000 static/ static/

# Copy everything else (content, layouts, config - change more often)
COPY --chown=1000:1000 archetypes/ archetypes/
COPY --chown=1000:1000 assets/ assets/
COPY --chown=1000:1000 content/ content/
COPY --chown=1000:1000 data/ data/
COPY --chown=1000:1000 i18n/ i18n/
COPY --chown=1000:1000 layouts/ layouts/
COPY --chown=1000:1000 hugo.toml .

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
    done && \
    # Separate static media from site content for layer optimization
    mkdir -p /src/static-media /src/site-content && \
    mv /src/public/sv/img /src/static-media/ && \
    mv /src/public/sv/fonts /src/static-media/ && \
    mv /src/public/sv/documents /src/static-media/ && \
    mv /src/public/sv/marketing /src/static-media/ && \
    mv /src/public/sv/publications /src/static-media/ && \
    mv /src/public/sv/pricelist /src/static-media/ && \
    mv /src/public/sv/services /src/static-media/ && \
    mv /src/public/* /src/site-content/

# Runtime stage - nginx
FROM nginx:stable-alpine

# Layer 1: Static media (large, ~370MB total, rarely changes)
COPY --from=builder /src/static-media/img /usr/share/nginx/html/sv/img
COPY --from=builder /src/static-media/fonts /usr/share/nginx/html/sv/fonts
COPY --from=builder /src/static-media/documents /usr/share/nginx/html/sv/documents
COPY --from=builder /src/static-media/marketing /usr/share/nginx/html/sv/marketing
COPY --from=builder /src/static-media/publications /usr/share/nginx/html/sv/publications
COPY --from=builder /src/static-media/pricelist /usr/share/nginx/html/sv/pricelist
COPY --from=builder /src/static-media/services /usr/share/nginx/html/sv/services

# Layer 2: Site content (HTML, CSS, JS, symlinks - changes frequently, but small ~30MB)
COPY --from=builder /src/site-content /usr/share/nginx/html

# Copy nginx config
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8081 8082 8083 8084
