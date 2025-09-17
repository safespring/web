---
ai: true
title: "Slik mestrer du sikkerhetsgrupper i OpenStack"
section: ""
episode: "7"
series: "true"
language: "nb"
date: "2024-04-19"
draft: false
tags: ["English"]
card: "/img/webinar/thumbnails/demo-episode-7.webp"
eventbild: ""
socialmediabild: ""
intro: "Lær hvordan du konfigurerer og bruker sikkerhetsgrupper i OpenStack for å administrere tilgang og strømlinjeforme sikkerheten på tvers av flere instanser."
sidebarlinkurl: "https://next.safespring.com/index.php/apps/appointments/embed/VOZl8W1TrMMEFQ%3D%3D/form"
sidebarlinkname: "Planlegg en videosamtale"
sidebarlinkicon: "fa fa-external-link"
sidebarlinkurl2: ""
sidebarlinkname2: ""
nosidebar: "ingen"
sidebarimage: ""
videoURL: "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-demo-episode-7-advanced-security-groups/master.m3u8"
thumbnail: "/img/webinar/thumbnails/demo-episode-7.webp"
chaptersTitle: "I denne episoden"
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
Denne veiledningen gir en dyptgående gjennomgang av hvordan man setter opp og administrerer sikkerhetsgrupper i OpenStack, noe som er avgjørende for å kontrollere tilgang til instanser på tvers av ulike nettverkskonfigurasjoner.
{{< /ingress >}}

Den begynner med en oversikt over hvilken rolle sikkerhetsgrupper har i å definere hva som kan samhandle i OpenStack-miljøet, og videoen viser deretter hvordan man oppretter og tar i bruk sikkerhetsgruppene «frontend» og «backend» for å håndtere henholdsvis web- og databaseservere.

Økten demonstrerer hvordan man konfigurerer sikkerhetsregler som tillater HTTPS- og MySQL-trafikk, ved å bruke muligheten til å referere til andre sikkerhetsgrupper i stedet for spesifikke IP-adresser for skalerbarhet og enklere administrasjon.

Denne tilnærmingen gjør det ikke bare enklere å legge til nye instanser i eksisterende grupper, men sikrer også at alle relaterte instanser beholder konsistente tillatelser for kommunikasjon.

Når veiledningen er fullført, vil brukerne forstå hvordan de kan utnytte sikkerhetsgrupper til å skape en sikker, skalerbar og lett administrerbar nettverksinfrastruktur i OpenStack-plattformen sin.