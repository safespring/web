---
ai: true
title: "Implementering av servergrupper i OpenStack"
section: ""
episode: "8"
series: "true"
language: "nb"
date: "2024-04-19"
draft: false
tags: ["English"]
card: "/img/webinar/thumbnails/demo-episode-8.webp"
eventbild: ""
socialmediabild: ""
intro: "Utforsk hvordan du kan bruke servergrupper i OpenStack til å håndheve anti-affinitetsregler for bedre redundans og pålitelighet i skyinfrastrukturen din."
sidebarlinkurl: "https://next.safespring.com/index.php/apps/appointments/embed/VOZl8W1TrMMEFQ%3D%3D/form"
sidebarlinkname: "Planlegg en videosamtale"
sidebarlinkicon: "fa fa-external-link"
sidebarlinkurl2: ""
sidebarlinkname2: ""
nosidebar: "ingen"
sidebarimage: ""
videoURL: "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-demo-episode-8-server-groups-2/master.m3u8"
thumbnail: "/img/webinar/thumbnails/demo-episode-8.webp"
chaptersTitle: "I denne episoden"
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
Denne videoveiledningen går i dybden på konseptet med servergrupper i OpenStack, en kritisk funksjon for å sikre at instanser, særlig i høytilgjengelighetsoppsett som databaseklynger, ikke kjører på samme fysiske maskinvare. {{< /ingress >}}

Cloud-arkitekt i Safespring, Gabriel, forklarer forskjellen mellom ulike policyer som affinity, anti-affinity, soft affinity og soft anti-affinity, og understreker hvor viktig anti-affinity er i scenarier som krever reell redundans.

Ved å gå gjennom hvordan man oppretter en servergruppe kalt «DB Cluster» med en anti-affinity-policy, viser videoen hvordan du konfigurerer og ruller ut instanser som er garantert å kjøre på separate compute-noder.

Dette oppsettet er avgjørende for å opprettholde tjenestetilgjengelighet selv om en av compute-nodene feiler, noe som gjør det ideelt for kritiske applikasjoner som databaser og meldingssystemer.

Økten gir praktiske innsikter i å bruke OpenStacks servergrupper for å øke feiltoleransen i utrullinger i skyen.