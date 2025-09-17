---
ai: true
title: "Er det mulig å erstatte VMware? Det kan være..."
date: 2025-02-20
intro: "VMware er utformet for drift og administrasjon av interne IT-systemer, mens Safespring leverer tjenester for å kjøre applikasjoner og systemer i skyen. Begge har sine tydelige styrker og svakheter."
draft: false
tags: ["English"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "nb"
sectiontext: "Blogg"
section: "Teknologioppdatering"
author: "Gabriel Paues"
TOC: "I dette innlegget"
aliases:
  - /blogg/2025/2025-02-vmware-exit/
---
{{< ingress >}}
Med Broadcoms oppkjøp av VMware har mange virksomheter og organisasjoner som har bygget infrastrukturen sin på VMware fått en ubehagelig overraskelse: en ny abonnementsbasert modell og generelt høyere priser.
{{< /ingress >}}

{{% accordion title="Kort oppsummert" %}}

1. Broadcoms oppkjøp av VMware har skapt bekymring for abonnementsbasert prising og høyere kostnader.
2. Mens VMware er svært sterk på lokal virtualisering, tilbyr Safespring et sky-native alternativ basert på OpenStack (virtualisering), Ceph (lagring) og containere.
3. Det er ikke en direkte «drop-in»-erstatning; i stedet muliggjør Safespring modernisering av IT-infrastrukturen med verktøy for nettverkssikkerhet, robuste tjenester (via Elastic IP-er og Server Groups) og fleksible VPN-alternativer som WireGuard.
4. Bygget på åpen kildekode unngår Safesprings løsninger leverandørlåsing, gir administratorer praktisk kontroll og sikrer forutsigbar og transparent prising over tid.

{{< localbutton text="La oss ta en prat" link="#conclusion" >}}

{{% /accordion %}}
{{< accordion-script >}}

## Tilbudet fra VMware

I over 20 år har VMware vært den mest suksessrike aktøren i markedet for virtualiseringsløsninger. VMware har tilbudt fleksibilitet (gjennom virtualisering) og andre funksjoner og produkter som forenkler hverdagen til systemadministratorer. Gjennom gode designvalg har mange kunder kunnet migrere gamle fysiske systemer direkte inn i VMware. Med robust overvåking, backend-lagring og programvaredefinert nettverk (SDN) har VMware muliggjort oppsett av systemer på en robust og redundant måte, med minimale endringer i selve systemenes programvarekonfigurasjon. I tillegg har VMware innebygde nettverkssikkerhetsfunksjoner.

Denne funksjonaliteten har gjort det mulig for systemadministratorer å håndtere komplekse IT-miljøer med minimalt merarbeid. IT-administratorer har også sluppet å gå i detalj på hvordan man bygger robusthet og redundans, ettersom plattformen tar seg av disse oppgavene.

## Tilbudet fra Safespring

Safespring tilbyr en skybasert virtualiserings- og lagringsløsning bygget på OpenStack og Ceph. I tillegg leverer Safespring en containerplattform basert på OKD og en S3-kompatibel objektlagring.

{{< quote "Gabriel Paues (Cloud-arkitekt)" >}}
Det er viktig å merke seg at Safesprings tilbud ikke er en «drop-in»-erstatning for VMware. VMware er designet for hosting og drift av interne IT-systemer, mens Safespring tilbyr tjenester for å kjøre applikasjoner og systemer i skyen.
{{< /quote >}}

Begge har sine styrker og svakheter.

Når det er sagt, finnes det flere måter kunder kan modernisere applikasjonsutrullingen på for å passe inn i et skymiljø, og dermed fjerne avhengigheter til den underliggende virtualiseringsplattformen.

### Nettverkssikkerhet

Systemer som kjører på en VMware-plattform er ofte organisert i interne og eksterne nettverkssoner. Eksterne tjenester plasseres i en ekstern sone med strengere sikkerhetskrav, mens interne tjenester opererer i en intern sone med mer lempelige retningslinjer. I et slikt oppsett stoler mange systemadministratorer på plattformen for nettverkssikkerhet i stedet for å implementere den direkte på hvert system.

Retningslinjer for sikkerhetsoppdateringer er ofte strengere for den eksterne sonen enn for den interne. For eksempel kan systemer i den interne sonen ikke være pålagt å bruke kryptering, mens systemer i den eksterne sonen er det.

### Mer fleksibelt enn VPN-tunneler

Mange systemintegratorer bruker VPN-tunneler for å koble seg eksternt til systemer som driftes andre steder. Den vanligste løsningen er IPSec, som er sikker, men har utfordringer ved oppsett og interoperabilitet. IPSec er primært designet for site-til-site- eller klient-til-site-tilkoblinger og kan være tungvint å konfigurere for system-til-system-kommunikasjon.

IPSec bruker én kanal for kryptering og en annen for overføring av kryptert data, noe som gjør det utfordrende å passere brannmurer. Derfor termineres IPSec-tunneler ofte direkte i brannmuren.

Når man skal koble ressurser sikkert i en tradisjonell hosting-leverandør, er tilnærmingen å sette opp en IPSec-tunnel mellom kundens interne miljø og leverandøren, og samle all trafikk gjennom disse to punktene.

Moderne VPN-løsninger som WireGuard tilbyr imidlertid en mer fleksibel tilnærming. WireGuard er tilstandsløs og krypterer hver pakke separat, noe som forenkler passering gjennom ulike IT-miljøer. Den bygger på UDP for ytelse, og lar innkapslede TCP-økter håndtere retransmisjoner og pakkeintegritet.

Siden Safesprings nettverksstakk bygger på IP-til-IP-tilkobling, er den tradisjonelle site-til-site-metoden mindre optimal. I stedet oppfordres kunder til å bygge et overlay-nettverk som spenner over både det interne miljøet og skyen. WireGuards tilstandsløse natur gjør den ideell for slike oppsett. I stedet for å koble alle systemer via én sentral IPSec-tunnel, kan kundene etablere et mesh-nettverk der hvert system kobler seg direkte til andre ved behov. Prosjekter med åpen kildekode, som [Netbird](https://netbird.io/), kan forenkle konfigurasjonen av slike løsninger.

### Robusthet

Robusthet kan oppnås på ulike måter. Organisasjoner som er vant til VMware, stoler ofte på verktøy som lastbasert automatisk live-migrering (DRS) og integrert programvaredefinert nettverk (SDN) for å sikre at tjenester forblir tilgjengelige. I slike tilfeller håndterer virtualiseringsplattformen robusthet, og applikasjonene krever minimale tilpasninger.

Safesprings OpenStack-løsning tilbyr verktøy for å oppnå tilsvarende robusthet:

{{< icon-block-horisontal color="#417DA5" icon="fas fa-network-wired" text="Elastic IP" description="Disse kan brukes sammen med produkter som HAProxy og Traefik for lastbalansering og nettverksrobusthet." link="" >}}
{{< icon-block-horisontal color="#417DA5" icon="fas fa-server" text="Server Groups" description="Disse sørger for at klyngemedlemmer i en tjeneste kjører på ulike maskinvare-noder innenfor plattformen." link="" >}}

Ved å bruke disse verktøyene kan tjenester konfigureres med redundans og robusthet. For eksempel kan en tjeneste kjøre på flere klyngemedlemmer distribuert på ulike maskinvare-noder ved hjelp av Server Groups. Elastic IP-er kan fordele trafikk mellom klyngemedlemmene samtidig som en felles IP-adresse opprettholdes.

Selv om denne tilnærmingen krever manuelt oppsett, gir den administratorer en bedre forståelse av løsningen, noe som skaper trygghet.

## Konklusjon

Safesprings tjenester setter organisasjoner i stand til å transformere intern IT til moderne skybaserte løsninger, samtidig som sikkerhet, tilgjengelighet og robusthet opprettholdes. I stedet for å lene seg på at en plattform håndterer dette automatisk, får administratorer kunnskapen og verktøyene til å håndtere potensielle problemer.

Safesprings løsninger er bygget på åpne standarder, og prinsippene som brukes er overførbare til andre tjenester. I tillegg, ved å være basert på produkter med åpen kildekode, sikres det at det ikke kommer uventede kostnadsendringer som følge av endrede lisensmodeller.

{{% custom-card image="/img/card/safespring-move-from-vmware.svg" cardtitle="Vil du migrere VMware‑arbeidslaster til Safespring?" %}}
Safespring tilbyr en gratis kartleggingstjeneste som hjelper deg å migrere arbeidslaster fra VMware til plattformen vår, tilpasset dine behov.

{{< localbutton text="Start kartleggingen" link="https://next.safespring.com/apps/forms/s/miJx5AFAb988X5EjwCLF5LGd" >}}

{{% /custom-card %}}