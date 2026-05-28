#!/usr/bin/env sh
set -eu

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
root=$(CDPATH= cd -- "$script_dir/.." && pwd)
cd "$root"

if [ "${SKIP_NPM_CI:-0}" != "1" ]; then
  if [ "${FORCE_NPM_CI:-0}" = "1" ] || [ ! -d node_modules ]; then
    npm ci
  fi
fi

if [ "${SKIP_PLAYWRIGHT_INSTALL:-0}" != "1" ]; then
  npm run pdf:setup
fi

npm run pdf:compliance
hugo "$@"
