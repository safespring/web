---
ai: true
title: "Implementering af servergrupper i OpenStack"
section: ""
episode: "8"
series: "true"
language: "da"
date: "2024-04-19"
draft: false
tags: ["English"]
card: "/img/webinar/thumbnails/demo-episode-8.webp"
eventbild: ""
socialmediabild: ""
intro: "Udforsk, hvordan du bruger servergrupper i OpenStack til at håndhæve anti-affinitetsregler for at forbedre redundans og pålidelighed i din cloud-infrastruktur."
sidebarlinkurl: "https://next.safespring.com/index.php/apps/appointments/embed/VOZl8W1TrMMEFQ%3D%3D/form"
sidebarlinkname: "Planlæg en videochat"
sidebarlinkicon: "fa fa-external-link"
sidebarlinkurl2: ""
sidebarlinkname2: ""
nosidebar: "ingen"
sidebarimage: ""
videoURL: "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-demo-episode-8-server-groups-2/master.m3u8"
thumbnail: "/img/webinar/thumbnails/demo-episode-8.webp"
chaptersTitle: "I denne episode"
chapters:
  - title: "Set up Server Groups"
    time: 59
    timeFormatted: "0:59"
  - title: "Affinity Policy"
    time: 68
    timeFormatted: "1:08"
  - title: "Create instance"
    time: 155
    timeFormatted: "2:35"
aliases:
  - /demo/compute/server-groups/
---
{{< ingress >}}
Denne videotutorial går i dybden med konceptet servergrupper i OpenStack, en afgørende funktion til at sikre, at instanser—især i højtilgængelighedsopsætninger som databaseklynger—ikke kører på den samme fysiske hardware. {{< /ingress >}}

Safespring Cloud-arkitekt Gabriel forklarer forskellen mellem politikker som "affinity", "anti-affinity", "soft affinity" og "soft anti-affinity" og understreger vigtigheden af "anti-affinity" i scenarier, der kræver reel redundans.

Ved at gennemgå oprettelsen af en servergruppe med navnet "DB Cluster" med en "anti-affinity"-politik demonstrerer videoen, hvordan man konfigurerer og udruller instanser, der er garanteret at køre på separate compute-noder.

Denne opsætning er essentiel for at opretholde tjenestetilgængeligheden, selv hvis en af compute-noderne fejler, hvilket gør den ideel til kritiske applikationer som databaser og meddelelsessystemer.

Sessionen giver praktiske indblik i at udnytte OpenStacks servergrupper til at øge fejltolerancen i cloud-udrulninger.