---
ai: true
title: "Bruk av hoppverter for sikker tilgang i OpenStack"
section: ""
episode: "6"
series: "true"
language: "nb"
date: "2024-04-19"
draft: false
tags: ["English"]
card: "/img/webinar/thumbnails/demo-episode-6.webp"
eventbild: ""
socialmediabild: ""
intro: "Lær hvordan du på en sikker måte kobler til instanser i private og standardnettverk ved hjelp av jump hosts i OpenStack-miljøet."
sidebarlinkurl: "https://next.safespring.com/index.php/apps/appointments/embed/VOZl8W1TrMMEFQ%3D%3D/form"
sidebarlinkname: "Planlegg en videosamtale"
sidebarlinkicon: "fa fa-external-link"
sidebarlinkurl2: ""
sidebarlinkname2: ""
nosidebar: "ingen"
sidebarimage: ""
videoURL: "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-demo-episode-6-use-instance-in-public-as-jumphost_final/master.m3u8"
thumbnail: "/img/webinar/thumbnails/demo-episode-6.webp"
chaptersTitle: "I denne episoden"
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
Denne veiledningen demonstrerer praktisk bruk av jump-hosts for å få sikker tilgang til instanser som ikke er direkte tilgjengelige fra eksterne nettverk.
{{< /ingress >}}

Med utgangspunkt i et oppsett som inkluderer instanser i både offentlige og standard nettverk, viser videoen trinn for trinn hvordan nødvendige SSH-nøkler overføres til en offentlig jump-host, slik at man får sikker shell-tilgang til en backend-instans i et mindre tilgjengelig nettverk.

Guiden fremhever rollen til sikkerhetsgrupper og nettverksinnstillinger for å sikre trygg og kontrollert tilkobling på tvers av ulike nettverkslag.

Ved å følge denne veiledningen får brukerne en klar forståelse av hvordan man håndterer sikre tilkoblinger og nettverkskonfigurasjoner i et OpenStack-oppsett med flere instanser. Denne økten er avgjørende for administratorer og utviklere som må opprettholde robuste sikkerhetsprotokoller og samtidig sikre operasjonell fleksibilitet i skymiljøene sine.