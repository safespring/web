---
title: "{{ replace .Name "-" " " | title }}"
date: "{{ .Date }}"
draft: true
author: ""
dokumentnamn: ".pdf"
huvudbildnamn: ".jpg"
socialmedia-bild: ""
intro: ""
---

## author
your name (or the authors name)
a photo of the author should be places in the img/whitepapers folder

## dokumentnamn
The file name (including the .pdf) of the PDF located in /marketing/whitepapers

## huvudbildnamn
The name of the image that is shown as a header (including the .jpg, or other file extension)
The file should be located in img/whitepapers

## socialmedia-bild
The file name of the image that will show up when you share the link to the white paper in social media
(will be the "huvudbildnamn" if you don't specify it)

## intro
Is a small summery that is shown under the authors name
