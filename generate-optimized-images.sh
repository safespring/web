#!/bin/bash

# This script generates optimized images in webp and avif formats
# install avif using `sudo apt install libavif-bin` or `brew install joedrago/repo/avifenc`
# install webp using `sudo apt install webp` or `brew install webp`

find ./ -type f \( -iname '*.png' -o -iname '*.jpg' \) -print0 | xargs -0 -n 1 -P 4 -I {} sh -c '
  f="{}"
  avifenc --min 10 --max 30 "$f" "${f%.*}.avif"
  cwebp "$f" -o "${f%.*}.webp"
'