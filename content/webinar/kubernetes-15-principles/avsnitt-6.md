---
title: "Säkerhet och begränsningar för Pods och nätverk"
section: "Design och driftsättning av skalbara applikationer på Kubernetes"
episode: "6"
series: "true"
language: "Se"
date: "2023-09-18"
draft: false
tags: ["Svenska"]
card: "/img/webinar/thumbnails/kubernetes-prinicples-series-avsnitt-6.jpeg"
eventbild: ""
socialmediabild: ""
intro: 'Vi diskuterar vikten av att begränsa behörigheter och åtkomst för Pods, hur du hanterar nätverkspolicyer och förbättrar säkerheten för dina applikationer.'
sidebarlinkurl: "https://github.com/elastisys/kubernetes-principles-webinar-series"
sidebarlinkname: "Till gitrepo"
sidebarlinkurl2: "/demo"
sidebarlinkname2: "Boka demo"
nosidebar: "none"
sidebarimage: ""
videoURL: "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-elastisys_webcast_episode_6/master.m3u8"
thumbnail: "/img/webinar/thumbnails/kubernetes-prinicples-series-avsnitt-6.jpeg"
chaptersTitle: "I detta avsnitt"
chapters:
  - title: "Om detta avsnitt"
    time: 26
    timeFormatted: "0:26"
  - title: "Säkerhetsaspekter"
    time: 45
    timeFormatted: "0:45"
  - title: "Nätverkspolicyer"
    time: 155
    timeFormatted: "2:35"
  - title: "Säkerhet på infrastrukturen"
    time: 241
    timeFormatted: "4:01"
  - title: "Security context"
    time: 360
    timeFormatted: "6:00"
  - title: "Sårbarhetsskaning"
    time: 632
    timeFormatted: "10:32"
  - title: "Zero-day-attack"
    time: 776
    timeFormatted: "12:56"
---

## Avsnitt 6
### Säkerhet och begränsningar för Pods och nätverk
I det här avsnittet undersöker Gabriel Paues från Safespring och Lars Larsson från Elastisys säkerhetsaspekter av att köra applikationer på Kubernetes. Du kommer att lära dig om vikten av att begränsa behörigheter och åtkomst för Pods, hur du hanterar nätverkspolicyer och förbättrar säkerheten för dina applikationer genom att följa bästa praxis.

{{< inline "Princip 14" >}} Restrict permissions  
{{< inline "Princip 15" >}} Limit attack surface