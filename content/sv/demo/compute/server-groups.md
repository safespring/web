---
ai: true
title: "Implementera servergrupper i OpenStack"
section: ""
episode: "8"
series: "true"
language: "sv"
date: "2024-04-19"
draft: false
tags: ["English"]
card: "/img/webinar/thumbnails/demo-episode-8.webp"
eventbild: ""
socialmediabild: ""
intro: "Utforska hur du använder servergrupper i OpenStack för att genomdriva anti-affinitetsregler för förbättrad redundans och driftsäkerhet i din molninfrastruktur."
sidebarlinkurl: "https://next.safespring.com/index.php/apps/appointments/embed/VOZl8W1TrMMEFQ%3D%3D/form"
sidebarlinkname: "Schemalägg ett videosamtal"
sidebarlinkicon: "fa fa-external-link"
sidebarlinkurl2: ""
sidebarlinkname2: ""
nosidebar: "inget"
sidebarimage: ""
videoURL: "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-demo-episode-8-server-groups-2/master.m3u8"
thumbnail: "/img/webinar/thumbnails/demo-episode-8.webp"
chaptersTitle: "I det här avsnittet"
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
Den här videoguiden fördjupar sig i konceptet servergrupper i OpenStack, en avgörande funktion för att säkerställa att instanser, särskilt i lösningar för hög tillgänglighet som databaskluster, inte körs på samma fysiska hårdvara. {{< /ingress >}}

Safesprings molnarkitekt, Gabriel, förklarar skillnaden mellan olika principer som affinity, anti-affinity, soft affinity och soft anti-affinity och betonar vikten av anti-affinity för scenarier som kräver verklig redundans.

Genom att gå igenom hur man skapar en servergrupp med namnet 'DB Cluster' med en anti-affinity-princip visar videon hur man konfigurerar och driftsätter instanser som garanterat körs på separata compute-noder.

Denna konfiguration är avgörande för att upprätthålla tjänsternas tillgänglighet även om en av compute-noderna fallerar, vilket gör den idealisk för kritiska applikationer som databaser och meddelandesystem.

Sessionen ger praktiska insikter i hur man utnyttjar OpenStacks servergrupper för att förbättra feltoleransen i molninstallationer.