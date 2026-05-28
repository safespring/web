#!/usr/bin/env sh
set -eu

# Caddy's repo watcher should call this script after pulling updates.
# It rebuilds compliance PDFs from the current Git checkout before Hugo publishes.

FORCE_NPM_CI=1 exec "$(dirname -- "$0")/build-site.sh" --minify "$@"
