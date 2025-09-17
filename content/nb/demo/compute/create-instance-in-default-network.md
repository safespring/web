---
ai: true
title: "Forståelse av nettverkskonfigurasjoner i OpenStack"
section: ""
episode: "5"
series: "true"
language: "nb"
date: "2024-04-19"
draft: false
tags: ["English"]
card: "/img/webinar/thumbnails/demo-episode-5.webp"
eventbild: ""
socialmediabild: ""
intro: "Utforsk nettverksarkitekturen i Safe Spring OpenStack-plattformen, og lær hvordan du setter opp instanser på tvers av ulike nettverkstyper."
sidebarlinkurl: "https://next.safespring.com/index.php/apps/appointments/embed/VOZl8W1TrMMEFQ%3D%3D/form"
sidebarlinkname: "Planlegg en videosamtale"
sidebarlinkicon: "fa fa-external-link"
sidebarlinkurl2: ""
sidebarlinkname2: ""
nosidebar: "ingen"
sidebarimage: ""
videoURL: "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-demo-episode-5-create-instance-in-default-network/master.m3u8"
thumbnail: "/img/webinar/thumbnails/demo-episode-5.webp"
chaptersTitle: "I denne episoden"
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
Denne veiledningsvideoen gir en detaljert oversikt over nettverkskonfigurasjonene som er tilgjengelige på Safespring OpenStack-plattformen.
{{< /ingress >}}

Denne veiledningen demonstrerer praktisk bruk av en bastion (jump‑host) for sikker tilgang til instanser som ikke er direkte tilgjengelige fra eksterne nettverk.

Med utgangspunkt i et oppsett som inkluderer instanser i både public- og default-nettverkene, viser videoen trinn for trinn hvordan du overfører nødvendige SSH-nøkler til en bastion (jump‑host) i det offentlige nettverket, slik at du kan koble deg sikkert via SSH til en backend‑instans som ligger i et mer utilgjengelig nettverk.

Guiden understreker rollen til sikkerhetsgrupper og nettverksinnstillinger for å sikre trygg og kontrollert tilkobling på tvers av ulike nettverkslag. Ved å følge denne guiden får brukere en tydelig forståelse av hvordan man håndterer sikre tilkoblinger og nettverkskonfigurasjoner i et OpenStack-oppsett med flere instanser.

Denne sesjonen er viktig for administratorer og utviklere som må opprettholde robuste sikkerhetsprotokoller samtidig som de sikrer operasjonell fleksibilitet i skymiljøene sine.