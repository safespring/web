#!/usr/bin/env sh
set -eu

# Caddy's repo watcher should call this script after pulling updates.
# It rebuilds compliance PDFs from the current Git checkout before Hugo publishes.

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
root=$(CDPATH= cd -- "$script_dir/.." && pwd)

rm -rf -- "$root/public"
FORCE_NPM_CI=1 exec "$script_dir/build-site.sh" --cleanDestinationDir --minify "$@"
