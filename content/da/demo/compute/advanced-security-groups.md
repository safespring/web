---
ai: true
title: "Sådan mestrer du sikkerhedsgrupper i OpenStack"
section: ""
episode: "7"
series: "true"
language: "da"
date: "2024-04-19"
draft: false
tags: ["English"]
card: "/img/webinar/thumbnails/demo-episode-7.webp"
eventbild: ""
socialmediabild: ""
intro: "Lær at konfigurere og anvende sikkerhedsgrupper i OpenStack til effektivt at administrere adgang og strømligne sikkerheden på tværs af flere instanser."
sidebarlinkurl: "https://next.safespring.com/index.php/apps/appointments/embed/VOZl8W1TrMMEFQ%3D%3D/form"
sidebarlinkname: "Planlæg en videochat"
sidebarlinkicon: "fa fa-external-link"
sidebarlinkurl2: ""
sidebarlinkname2: ""
nosidebar: "ingen"
sidebarimage: ""
videoURL: "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-demo-episode-7-advanced-security-groups/master.m3u8"
thumbnail: "/img/webinar/thumbnails/demo-episode-7.webp"
chaptersTitle: "I denne episode"
chapters:
  - title: "Create Security groups"
    time: 84
    timeFormatted: "1:24"
  - title: "Edit instances"
    time: 312
    timeFormatted: "5:12"
  - title: "Allow SSH"
    time: 384
    timeFormatted: "6:24"
aliases:
  - /demo/compute/advanced-security-groups/
---
{{< ingress >}}
Denne vejledning giver et dybdegående indblik i opsætning og administration af sikkerhedsgrupper i OpenStack, hvilket er afgørende for at kontrollere adgangen til instanser på tværs af forskellige netværkskonfigurationer.
{{< /ingress >}}

Med udgangspunkt i et overblik over sikkerhedsgruppernes rolle i at definere, hvad der kan interagere i OpenStack-miljøet, guider videoen seerne gennem oprettelse og anvendelse af sikkerhedsgrupperne "frontend" og "backend" til at styre henholdsvis web- og databaseservere.

Sessionen demonstrerer, hvordan man konfigurerer sikkerhedsregler, der tillader HTTPS- og MySQL-trafik, ved at udnytte muligheden for at referere til andre sikkerhedsgrupper i stedet for specifikke IP-adresser for at opnå skalerbarhed og nemmere administration.

Denne tilgang gør det ikke blot nemmere at tilføje nye instanser til eksisterende grupper, men sikrer også, at alle relaterede instanser bevarer ensartede kommunikationstilladelser.

Ved afslutningen af denne vejledning vil brugerne forstå, hvordan man kan udnytte sikkerhedsgrupper til at skabe en sikker, skalerbar og let administrerbar netværksinfrastruktur i deres OpenStack-platform.