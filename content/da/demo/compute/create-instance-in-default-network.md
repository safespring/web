---
ai: true
title: "Forståelse af netværkskonfigurationer i OpenStack"
section: ""
episode: "5"
series: "true"
language: "da"
date: "2024-04-19"
draft: false
tags: ["English"]
card: "/img/webinar/thumbnails/demo-episode-5.webp"
eventbild: ""
socialmediabild: ""
intro: "Udforsk netværksarkitekturen i Safe Spring OpenStack-platformen, og lær, hvordan du opretter instanser på tværs af forskellige netværkstyper."
sidebarlinkurl: "https://next.safespring.com/index.php/apps/appointments/embed/VOZl8W1TrMMEFQ%3D%3D/form"
sidebarlinkname: "Planlæg et videoopkald"
sidebarlinkicon: "fa fa-external-link"
sidebarlinkurl2: ""
sidebarlinkname2: ""
nosidebar: "ingen"
sidebarimage: ""
videoURL: "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-demo-episode-5-create-instance-in-default-network/master.m3u8"
thumbnail: "/img/webinar/thumbnails/demo-episode-5.webp"
chaptersTitle: "I denne episode"
chapters:
  - title: "Network Topology"
    time: 17
    timeFormatted: "0:17"
  - title: "Public Network"
    time: 51
    timeFormatted: "0:51"
  - title: "Private Network"
    time: 83
    timeFormatted: "1:23"
  - title: "Default Network"
    time: 143
    timeFormatted: "2:23"
  - title: "Instance - Default NW"
    time: 169
    timeFormatted: "2:49"
aliases:
  - /demo/compute/create-instance-in-default-network/
---
{{< ingress >}}
Denne instruktionsvideo giver et detaljeret overblik over de netværkskonfigurationer, der er tilgængelige på Safespring OpenStack-platformen.
{{< /ingress >}}

Denne tutorial demonstrerer den praktiske brug af jump hosts til sikker adgang til instanser, der ikke kan nås direkte fra eksterne netværk.

Med udgangspunkt i en opsætning med instanser i både public- og default-netværk viser videoen trin for trin, hvordan de nødvendige SSH-nøgler overføres til en public jump host, så der kan etableres SSH-adgang til en backend-instans i et mindre tilgængeligt netværk.

Guiden understreger rollen, som security groups og netværksindstillinger spiller, i at sikre sikker og kontrolleret forbindelse på tværs af forskellige netværkslag. Ved at følge denne guide får brugerne en klar forståelse af, hvordan man håndterer sikre forbindelser og netværkskonfigurationer i en OpenStack-opsætning med flere instanser.

Denne session er afgørende for administratorer og udviklere, der skal opretholde robuste sikkerhedsprotokoller og samtidig sikre operationel fleksibilitet i deres cloud-miljøer.