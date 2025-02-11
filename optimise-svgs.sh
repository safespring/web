find static/img/ -type f -name '*.svg' -print0 | xargs -0 -n 1 -P 6 npx svgo --config=svgo.config.js
