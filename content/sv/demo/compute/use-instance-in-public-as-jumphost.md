---
ai: true
title: "Användning av jumpservrar för säker åtkomst i OpenStack"
section: ""
episode: "6"
series: "true"
language: "sv"
date: "2024-04-19"
draft: false
tags: ["English"]
card: "/img/webinar/thumbnails/demo-episode-6.webp"
eventbild: ""
socialmediabild: ""
intro: "Lär dig hur du säkert ansluter till instanser i privata och standardnätverk med hjälp av bastionvärdar i OpenStack-miljön."
sidebarlinkurl: "https://next.safespring.com/index.php/apps/appointments/embed/VOZl8W1TrMMEFQ%3D%3D/form"
sidebarlinkname: "Boka ett videosamtal"
sidebarlinkicon: "fa fa-external-link"
sidebarlinkurl2: ""
sidebarlinkname2: ""
nosidebar: "ingen"
sidebarimage: ""
videoURL: "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-demo-episode-6-use-instance-in-public-as-jumphost_final/master.m3u8"
thumbnail: "/img/webinar/thumbnails/demo-episode-6.webp"
chaptersTitle: "I det här avsnittet"
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
Den här guiden visar praktisk användning av hoppservrar för att på ett säkert sätt nå instanser som inte är direkt åtkomliga från externa nätverk.
{{< /ingress >}}

Med en konfiguration som inkluderar instanser i både publika och standardnätverk visar videon steg för steg hur man överför nödvändiga SSH-nycklar till en publik hoppserver, vilket möjliggör SSH-åtkomst till en backend-instans i ett mindre åtkomligt nätverk.

Guiden betonar säkerhetsgruppers och nätverksinställningars roll för att säkerställa säker och kontrollerad anslutning över olika nätverkslager.

Genom att följa den här guiden får användare en tydlig förståelse för hur man hanterar säkra anslutningar och nätverkskonfigurationer i en OpenStack-miljö med flera instanser. Den här sessionen är avgörande för administratörer och utvecklare som behöver upprätthålla robusta säkerhetsprotokoll samtidigt som de säkerställer operativ flexibilitet i sina molnmiljöer.