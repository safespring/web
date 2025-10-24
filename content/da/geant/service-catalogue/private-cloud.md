---
ai: true
title: "Privat sky"
language: "da"
cardtitle: "Privat cloud"
cardicon: "fa-solid fa-shield-check"
cardcolor: "#195F8C"
cardorder: "07"
date: "2025-01-20"
draft: false
cardintro: "Komplet tilbud, der omfatter hardware, drift og softwarevedligeholdelse."
intro: "Omfattende private cloud-løsninger, herunder hardware, drift og softwarevedligeholdelse, skræddersyet til fuld kontrol og skalerbarhed i en dedikeret kundeejet infrastruktur."
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tilbage til alle kategorier"
sidebarlinkurl: "/geant/service-catalogue"
section: "OCRE 2024-rammeværk"
socialmedia: "/safespring-start.jpg"
toc: "På denne side"
noindex: "x"
aliases:
  - /geant/service-catalogue/private-cloud/
---

{{< ingress >}}
Komplet tilbud til implementering af Private Cloud, inkl. hardware, drift og softwarevedligeholdelse. Hardwaren ejes af kunden, som også stiller datacenter-rackplads til rådighed til installationen.
{{< /ingress >}}

Compute-basispakken omfatter Control Plane og Compute Service med kun lokal instanslagring.

Tilvalg omfatter Elastic Block Storage (Ceph-klynge) og accelererede compute-noder (typisk GPU).

Storage-basispakken omfatter Control Plane og lagernoder af enten HDD- eller NVMe-type.

Lagergrænseflader omfatter RADOS, S3 via Rados Gateway, Rados Block Device eller iSCSI/NFS via en storage-proxy.

Hvis behovet opstår, kan kunden overtage driften af installationen og fortsætte med selv at hoste tjenesten. Dette sikrer servicekontinuitet, hvis kundens behov ændrer sig over tid, og kan faciliteres med kontrolleret vidensoverførsel fra Safespring til kunden.

## Private Cloud – Compute Base

Basis-konfigurationen, Compute Base, er til implementering i et dedikeret rack med gerne plads til at vokse. ToR-switchene kan skalere op til 24 compute- eller lagernoder, da 4 porte er reserveret til Control Plane, 2 til interswitch-links og 2 til uplinks.

Ved multi-rack-implementering kræves ekstra porte til krydsforbindelser. Compute-nodekonfiguration (CPU, RAM, lokal NVMe) efter kundens specifikationer.

### Præmisser

Ingen.

## Private Cloud – Volume Storage Option

Compute Volumes-tilvalget tilføjer flere lagerfunktioner til Compute Base-implementeringen. NVMe til lokal, flygtig lagring på de compute-noder, hvor instanserne kører, samt HDD-baseret lagring til vedvarende behov i en delt Ceph-klynge. Det genbruger switchene og Control Plane fra Private Cloud-implementeringen. ToR-switchene er 32×100 Gbps og kan skalere til 24 compute- eller lagernoder, da fire porte er reserveret til Control Plane, to til interswitch-links og to til uplinks.

Ved multi-rack-implementering kræves ekstra porte til krydsforbindelser. Lagergrænsefladen er Rados Block Device (RBD) til compute-noderne. HDD-lagernode har plads til 12×3,5”, maksimal kapacitet pr. disk afhænger af markedstilgængelighed, og der anvendes en Optane-disk til DB. NVMe-lagernode har plads til 10×2,5” NVMe; skriveudholdenhed og kapacitet afhænger af markedstilgængelighed og kundens præferencer.

### Præmisser

Compute Base-konfiguration.

## Private Cloud – S3 Storage Option

Private Cloud kan implementeres med et stort, skalerbart objektlager med et S3-kompatibelt API. Dette giver kunden en omkostningseffektiv og standardiseret måde at lagre store mængder data på i platformen.

I kombination med bloklager-tilvalget, der er forbundet til compute-noderne, kan data lagres i S3-objektlager og derefter kopieres til bloklager under behandlingen. Denne kombination af S3-objektlager og bloklager giver et meget omkostningseffektivt, men stadig produktivt miljø til at lagre og bearbejde store datamængder.

S3 Storage-tilvalget er en separat løsning i forhold til Compute Base og kan etableres uafhængigt.

### Præmisser

Ingen.

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Kom i kontakt med Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Salg:" >}} +46855107370 or sales@safespring.se
{{% /custom-card %}}
