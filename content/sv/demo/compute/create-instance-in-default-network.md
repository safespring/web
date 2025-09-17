---
ai: true
title: "Förstå nätverkskonfigurationer i OpenStack"
section: ""
episode: "5"
series: "true"
language: "sv"
date: "2024-04-19"
draft: false
tags: ["English"]
card: "/img/webinar/thumbnails/demo-episode-5.webp"
eventbild: ""
socialmediabild: ""
intro: "Utforska nätverksarkitekturen i Safe Spring OpenStack-plattformen och lär dig hur du konfigurerar instanser i olika nätverkstyper."
sidebarlinkurl: "https://next.safespring.com/index.php/apps/appointments/embed/VOZl8W1TrMMEFQ%3D%3D/form"
sidebarlinkname: "Boka ett videosamtal"
sidebarlinkicon: "fa fa-external-link"
sidebarlinkurl2: ""
sidebarlinkname2: ""
nosidebar: "ingen"
sidebarimage: ""
videoURL: "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-demo-episode-5-create-instance-in-default-network/master.m3u8"
thumbnail: "/img/webinar/thumbnails/demo-episode-5.webp"
chaptersTitle: "I det här avsnittet"
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
Denna instruktionsvideo ger en detaljerad översikt över de nätverkskonfigurationer som finns tillgängliga på Safespring OpenStack-plattformen.
{{< /ingress >}}

Denna genomgång visar hur man praktiskt använder jump hosts för att på ett säkert sätt nå instanser som inte är direkt åtkomliga från externa nätverk.

Med utgångspunkt i en uppsättning som inkluderar instanser i både public- och default-nätverk visar videon steg för steg hur man överför nödvändiga SSH-nycklar till en publik jump host, vilket möjliggör SSH-åtkomst till en backend-instans som ligger i ett mindre lättillgängligt nätverk.

Guiden betonar säkerhetsgruppernas och nätverksinställningarnas roll för att säkerställa säker och kontrollerad anslutning mellan olika nätverkslager. Genom att följa denna guide får användare en tydlig förståelse för hur man hanterar säkra anslutningar och nätverkskonfigurationer i en OpenStack-uppsättning med flera instanser.

Denna session är avgörande för administratörer och utvecklare som behöver upprätthålla robusta säkerhetsprotokoll samtidigt som de säkerställer operativ flexibilitet i sina molnmiljöer.