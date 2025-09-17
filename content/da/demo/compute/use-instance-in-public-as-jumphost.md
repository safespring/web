---
ai: true
title: "Brug af jump-hosts til sikker adgang i OpenStack"
section: ""
episode: "6"
series: "true"
language: "da"
date: "2024-04-19"
draft: false
tags: ["English"]
card: "/img/webinar/thumbnails/demo-episode-6.webp"
eventbild: ""
socialmediabild: ""
intro: "Lær, hvordan du sikkert opretter forbindelse til instanser i private og standardnetværk ved hjælp af jump hosts i OpenStack-miljøet."
sidebarlinkurl: "https://next.safespring.com/index.php/apps/appointments/embed/VOZl8W1TrMMEFQ%3D%3D/form"
sidebarlinkname: "Planlæg en videosamtale"
sidebarlinkicon: "fa fa-external-link"
sidebarlinkurl2: ""
sidebarlinkname2: ""
nosidebar: "ingen"
sidebarimage: ""
videoURL: "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-demo-episode-6-use-instance-in-public-as-jumphost_final/master.m3u8"
thumbnail: "/img/webinar/thumbnails/demo-episode-6.webp"
chaptersTitle: "I denne episode"
chapters:
  - title: "Copy prive key"
    time: 72
    timeFormatted: "1:12"
  - title: "Check IP address"
    time: 133
    timeFormatted: "2:13"
  - title: "Access the instance"
    time: 205
    timeFormatted: "3:25"
aliases:
  - /demo/compute/use-instance-in-public-as-jumphost/
---
{{< ingress >}}
Denne vejledning demonstrerer den praktiske brug af jump hosts til sikkert at få adgang til instanser, der ikke kan nås direkte fra eksterne netværk.
{{< /ingress >}}

Med udgangspunkt i et setup, der omfatter instanser i både public- og default-netværk, viser videoen trin for trin, hvordan man overfører de nødvendige SSH-nøgler til en public jump host, så der kan etableres SSH-adgang til en backend-instans i et mindre tilgængeligt netværk.

Guiden fremhæver sikkerhedsgruppernes og netværksindstillingernes rolle i at muliggøre sikre og kontrollerede forbindelser på tværs af forskellige netværkslag.

Ved at følge denne guide får brugerne en klar forståelse af, hvordan man håndterer sikre forbindelser og netværkskonfigurationer i et OpenStack-setup med flere instanser. Denne session er afgørende for administratorer og udviklere, der skal opretholde robuste sikkerhedsprotokoller og samtidig sikre driftsmæssig fleksibilitet i deres cloud-miljøer.