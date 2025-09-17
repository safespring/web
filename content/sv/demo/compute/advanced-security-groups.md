---
ai: true
title: "Bemästra säkerhetsgrupper i OpenStack"
section: ""
episode: "7"
series: "true"
language: "sv"
date: "2024-04-19"
draft: false
tags: ["English"]
card: "/img/webinar/thumbnails/demo-episode-7.webp"
eventbild: ""
socialmediabild: ""
intro: "Lär dig hur du konfigurerar och använder säkerhetsgrupper i OpenStack för att hantera åtkomst och förenkla säkerhetsarbetet över flera instanser på ett effektivt sätt."
sidebarlinkurl: "https://next.safespring.com/index.php/apps/appointments/embed/VOZl8W1TrMMEFQ%3D%3D/form"
sidebarlinkname: "Schemalägg ett videosamtal"
sidebarlinkicon: "fa fa-external-link"
sidebarlinkurl2: ""
sidebarlinkname2: ""
nosidebar: "ingen"
sidebarimage: ""
videoURL: "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-demo-episode-7-advanced-security-groups/master.m3u8"
thumbnail: "/img/webinar/thumbnails/demo-episode-7.webp"
chaptersTitle: "I det här avsnittet"
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
Den här handledningen ger en djupgående genomgång av hur man konfigurerar och hanterar säkerhetsgrupper i OpenStack, vilket är avgörande för att kontrollera åtkomst till instanser i olika nätverkskonfigurationer.
{{< /ingress >}}

Med en inledande översikt över säkerhetsgruppernas roll i att definiera vad som får interagera i OpenStack-miljön, guidar videon tittarna genom att skapa och tillämpa säkerhetsgrupperna "frontend" och "backend" för att hantera webb- respektive databasservrar.

Sessionen visar hur du konfigurerar säkerhetsregler som tillåter HTTPS- och MySQL-trafik, genom att utnyttja möjligheten att referera till andra säkerhetsgrupper i stället för specifika IP-adresser för bättre skalbarhet och enklare administration.

Detta tillvägagångssätt gör det inte bara enklare att lägga till nya instanser i befintliga grupper, utan säkerställer också att alla relaterade instanser har konsekventa kommunikationsbehörigheter.

I slutet av den här handledningen kommer användarna att förstå hur man utnyttjar säkerhetsgrupper för att skapa en säker, skalbar och lättadministrerad nätverksinfrastruktur i sin OpenStack-plattform.