#!/bin/bash

cd static/img/
find . -type f \( -iname "*.jpg" -o -iname "*.png" \) -exec magick mogrify -format avif {} +
