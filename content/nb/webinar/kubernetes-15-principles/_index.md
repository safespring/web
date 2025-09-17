---
ai: true
title: "Design og idriftssetting av skalerbare applikasjoner på Kubernetes"
language: "nb"
date: "2023-09-18"
publishDate: "2023-09-18"
draft: false
tags: ["Svenska"]
card: "safespring-gabriel-lars.jpg"
eventbild: ""
socialmediabild: ""
intro: "I denne nettserien skal vi utforske hvordan man designer og driftssetter skalerbare applikasjoner på Kubernetes."
partner: ""
audience: "SaaS"
explorer: ""
sidebarlinkurl: ""
sidebarlinkname: ""
sidebarimage: ""
nosidebar: "usynlig"
toc: "Avsnitt"
section: "Nettseminar"
aliases:
  - /kubernetes-webcast
  - /webinar/kubernetes-15-principles/
---
{{< ingress >}}
I denne nettserien skal vi gå gjennom Elastisys prinsipper for å få mest mulig ut av Kubernetes og utnytte fordelene fullt ut.
{{< /ingress >}}

Hvert avsnitt tar for seg spesifikke temaer og gir deg innsikt i hvordan du kan forbedre DevOps-prosessene dine og skape en mer robust og skalerbar arkitektur. Vi har gruppert de 15 prinsippene etter hvordan de passer inn i avsnittene. Vil du lese mer om prinsippene, går Elastisys gjennom dem i rekkefølge i sin artikkel her.

Alle kodeeksemplene som vises i denne serien er tilgjengelige på GitHub under elastisys/kubernetes-principles-webinar-series.

{{% note "Prinsippene i korte trekk" %}}

{{% column-two %}}

1. Stateful vs. stateless-kontroller
2. Secrets vs. ikke-secrets
3. Autoskalering
4. Livssyklusstyring
5. Prober
6. Signalhåndtering
7. Feil hardt, raskt og tydelig
8. Forbered applikasjonen
9. Ressursforespørsler og -grenser
10. Reservasjon og prioritering
11. Planleggingskrav
12. Pod Disruption Budget
13. Strategier > stop the world
14. Begrens tillatelser
15. Begrens angrepsflaten

{{% /column-two %}}

{{% /note %}}

{{< distance >}}

## Episode 1

### Introduksjon til skybaserte applikasjoner og Kubernetes

I denne episoden med Gabriel Paues fra Safespring og Lars Larsson fra Elastisys får du en oversikt over skybaserte applikasjoner og en introduksjon til Kubernetes. Du lærer om nøkkelkomponentene, hvordan de samvirker for å skape en skalerbar og pålitelig infrastruktur, og hva disse komponentene tilsvarer i AWS.

{{< distance >}}

## Episode 2

### Håndtering av Pods, Deployments og StatefulSets

Gabriel Paues fra Safespring og Lars Larsson fra Elastisys gir deg en dypere forståelse av hvordan Pods, Deployments og StatefulSets fungerer, og hvordan du kan bruke dem til å bygge og skalere applikasjonene dine på Kubernetes. Etter å ha sett denne episoden vil du ha et solid grunnlag i å håndtere applikasjoner som involverer både tilstandsløse og tilstandsbaserte komponenter.

{{< inline "Princip 01" >}} Bruk controllere for Pods  
{{< inline "Princip 11" >}} Tving samslokalisering eller spredning av Pods ved behov

{{< distance >}}

## Episode 3

### Konfigurasjon, skalering og containerlivssyklus

I denne episoden fokuserer Gabriel Paues fra Safespring og Lars Larsson fra Elastisys på konfigurasjon og livssyklusstyring av containere i Kubernetes. Du lærer om viktigheten av å skille hemmelig og ikke-hemmelig konfigurasjon, samt hvordan du forbereder en komponent på å både skalere ut og ned på en kontrollert og god måte.

{{< inline "Princip 02" >}} Skille hemmelig fra ikke-hemmelig konfigurasjon  
{{< inline "Princip 14" >}} Aktivere automatisk skalering  
{{< inline "Princip 15" >}} Utnytte livssyklus-hooks for containere

{{< distance >}}

## Episode 4

### Automatisering og overvåking av applikasjoner

Denne episoden lærer deg viktigheten av å forberede applikasjonen din for observerbarhet og hvordan du implementerer automatisering for å lette drift og skalering. Gabriel Paues fra Safespring og Lars Larsson fra Elastisys dekker temaer som overvåking, logging og sporing, samt hvordan du kan bruke disse innsiktene til å ta beslutninger om skalering og ressursstyring.

{{< inline "Princip 5" >}} Bruk prober riktig  
{{< inline "Princip 6" >}} Bruk signalhåndtering riktig  
{{< inline "Princip 7" >}} Feile hardt, raskt og tydelig  
{{< inline "Princip 8" >}} Forbered applikasjonen din for observerbarhet

{{< distance >}}

## Episode 5

### Avanserte utrullingsstrategier og høy tilgjengelighet

Denne episoden tar for seg avanserte utrullingsstrategier, som blue/green og canary deployments. Gabriel Paues fra Safespring og Lars Larsson fra Elastisys lærer deg hvordan disse strategiene bidrar til å minimere nedetid og risiko under oppdateringer, samt hvordan du kan sikre høy tilgjengelighet for applikasjonen din ved å bruke Pod Disruption Budgets og andre teknikker.

{{< inline "Princip 9" >}} Sette ressursforespørsler og -grenser for Pods  
{{< inline "Princip 10" >}} Reservere kapasitet og prioritere Pods  
{{< inline "Princip 12" >}} Pod Disruption Budget
{{< inline "Princip 13" >}} Strategier > stop the world

{{< distance >}}

## Episode 6

### Sikkerhet og begrensninger for Pods og nettverk

I denne episoden undersøker Gabriel Paues fra Safespring og Lars Larsson fra Elastisys sikkerhetsaspekter ved å kjøre applikasjoner på Kubernetes. Du vil lære om viktigheten av å begrense tillatelser og tilgang for Pods, hvordan du håndterer nettverkspolicyer og forbedrer sikkerheten for applikasjonene dine ved å følge beste praksis.

{{< inline "Princip 14" >}} Begrens tillatelser
{{< inline "Princip 15" >}} Begrens angrepsflaten

{{< distance >}}

## Episode 7

### Oppsummering og neste steg

I den siste episoden oppsummerer Gabriel Paues fra Safespring og Lars Larsson fra Elastisys alt materialet fra nettserien og diskuterer ytterligere ressurser og anbefalinger for å fortsette å forbedre Kubernetes- og skybaserte applikasjoner. Vi dekker viktige lærdommer og tips som hjelper deg å lykkes i den videre reisen med å designe, bygge og driftssette skalerbare og robuste applikasjoner på Kubernetes. Vi går også gjennom hva vi mener er gode neste steg for å øke kunnskapen din innen området.

{{< distance >}}

{{% note "Ikke nøl med å kontakte oss" %}}
Vi håper at denne nettserien, laget sammen med Elastisys, har gitt deg innsikt og verktøy som gjør deg tryggere på å bruke Kubernetes til å bygge og håndtere skybaserte applikasjoner.

Enten du er nybegynner eller erfaren bruker av Kubernetes, er det alltid nye ting å lære og nye teknikker å utforske. Vi oppfordrer deg til å se hele nettserien og dele den med kolleger og venner.

Sammen kan vi fortsette å utvikle og forbedre ferdighetene våre for å skape fremtidens skybaserte applikasjoner.

{{< 2calltoaction "Ta kontakt" "/demo" "Les mer om Kubernetes hos Safespring" "/services/compliant-kubernetes" >}}
{{% /note %}}