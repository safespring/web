---
ai: true
title: "KubeCon + CloudNativeCon Europe 2026 — Amsterdam Recap"
date: "2026-04-02"
intro: "KubeCon + CloudNativeCon Europe 2026 fant sted på Amsterdam RAI fra 23.–26. mars, og samlet over 13 500 deltakere fra 100+ land og 3000+ organisasjoner over nesten 900 økter – den største KubeCon til dags dato."
draft: false
sectiontext: "Blogg"
section: "blogg"
tags: ["container", "events"]
showthedate: true
card: "2026-kubecon-amsterdam-card.webp"
eventbild: ""
socialmediabild: ""
language: "nb"
author: ""
---



{{< ingress >}}
Det sentrale temaet for årets KubeCon var umiskjennelig: skybasert infrastruktur er
AI-infrastruktur, og økosystemet omorganiserer seg rundt den virkeligheten. Selvfølgelig var
Safespring på stedet og nøt det siste fra bransjen.
{{< /ingress >}}

![Amsterdam RAI-inngang under KubeCon + CloudNativeCon Europe 2026.](/img/blogg/2026-kubecon-amsterdam-venue.webp)

## Keynote-høydepunkter

De innledende hovedtonene satte tonen med en klar makroprognose: i 2023 gikk omtrent to
tredjedeler av AI-beregningen til trening og en tredjedel til konklusjon. Ved utgangen av
2026 forventes dette forholdet å snu, og etterspørselen etter slutningsdata forventes å nå
93,3 gigawatt innen tiårets slutt. Meldingen var direkte - Kubernetes er i ferd med å bli
kontrollplanet for AI-infrastruktur, og CNCF-økosystemet posisjonerer seg for å eie det
laget. Og kanskje til slutt operativsystemet til datasenteret.

**NVIDIA**, donerte sin DRA GPU-driver til Kubernetes SIG Node som en
referanseimplementering for den leverandørnøytrale Dynamic Resource Allocation (DRA) API.


**Prosjektmilepæler** fra konferansen: Kyverno og Dragonfly ble uteksaminert; Fluid og
Tekton flyttet til inkubasjon; LLMD, et distribuert slutningssystem bygget for Kubernetes,
ble annonsert som et nytt CNCF-sandkasseprosjekt.

![Safespring på utstillingsområdet KubeCon + CloudNativeCon Europe 2026 i Amsterdam.](/img/blogg/2026-kubecon-showcase.webp)

---

## Fluxcon og FluxCD

FluxCon Europe 2026 kjørte som et samlokalisert arrangement 23. mars, øktene varierte fra
bedriftsutrullinger til å visualisere GitOps i stor skala ved hjelp av det nye Flux UI.

En viktig faktor er arbeidet som prosjektet har lagt inn i skreddersydd
Claude-agentkompetanse for å virkelig passe det FluxCD driver med.

Og det har blitt ganske SRE for GitOps-rørledningen din.

---

## CiliumCon og Cilium

CiliumCon kom tilbake til Amsterdam for sin syvende iterasjon 23. mars – og det passet godt,
da dette markerte **Ciliums 10-årsjubileum**. Arrangementet kom kort tid etter utgivelsen av
Cilium v1.19.

CiliumCon-agendaen reflekterte et modent økosystem. Samtalene gikk forbi "hvordan adopterer
vi Cilium?" og inn i "hvordan kjører vi det i skala med avanserte funksjoner?" – inkludert
Tetragon policy-skalering, multi-cluster-nettverk på tvers av hundrevis av klynger, og
erstatning av eldre maskinvarelastbalansere.

En sterk sikkerhetstråd gikk gjennom dagen, fra Tetragon-basert håndhevelse av
retningslinjer per arbeidsbelastning til maskinvareakselererte sikkerhetspolicyer på DPU-er.
Prosjektet posisjonerer seg også som nettverksdataplanet for AI-arbeidsbelastninger, en
naturlig tilpasning gitt dens eBPF-baserte ytelsesprofil.

---

![Besøksmøte på KodeKloud-standen under KubeCon + CloudNativeCon Europe 2026.](/img/blogg/2026-kubecon-kodekloud.webp)

## Sammendrag

Da vi gikk ut av Amsterdam etter fire dager, var det som stakk mest, ikke en enkelt
kunngjøring – det var skiftet i hvordan folk snakket. For et år siden føltes AI på KubeCon i
London fast, alle gjorde det og alle hadde en MCP-server for deres bruk, arbeidsmengde eller
applikasjon. Denne gangen ble det gjort mer med vilje på alle områder – sikkerhet, nettverk,
GitOps, observerbarhet, planlegging, alt mulig. Cilium og Flux var to eksempler på
prosjekter som lenet seg inn i det, men det samme var praktisk talt alle andre hjørner av
økosystemet. Og AI er ikke et tillegg til tjenesten eller applikasjonen – det er noe du
skreddersyr for. Uavhengig av å virtualisere et helt rack med GPU-noder og bruke nvlink for
å gjøre dem til "en" eller om du stryker ferdigheter/plugins spesifikt for å passe
applikasjonen din, er AI der.

Og i motsetning til året før, var dette ikke bare hype og MCP-er overalt. AI brukes i
produksjon og gapet mellom dette fungerer i en demo og det som fungerer i produksjon er
egentlig ikke der lenger. AI har modnet.

---

![Safespring-teammedlemmer utenfor Amsterdam RAI under KubeCon + CloudNativeCon Europe 2026.](/img/blogg/2026-kubecon-team.webp)

## Anders’ takeaways:
1. AI alle gjør det. På alle nivåer av stabelen.
Hvis det skreddersyr apparatet til ditt behov eller tilpasser orkestratoren for å passe
arbeidsmengden din - du gjør det!
2. KubeVirt modnes - takk for de nylige endringene av lisensiering av populær plattform og oppfordringen til en AI-orkestrator.
3. Takket være AI ser det ut til at MultiCluster/ClusterMesh er på vei oppover. Ser på hva solo.io gjør med kagent, agentgateway, kgateway for å nevne noen.
## Ahmets takeaways:
1. AI er overalt akkurat nå, men mange ting kan fortsatt bare løses med et enkelt skript uten alle de ekstra kostnadene og kompleksiteten.
2. Digital suverenitet ble et stort tema, spesielt ettersom flere team ønsker kontroll over infrastrukturen og dataene deres.
3. Observerbarhet føles som om den treffer en vegg, det er allerede så mye data og den vanskelige delen er å finne ut hva som faktisk er nyttig.
## Anands takeaways:
1. Et av hovedhøydepunktene for meg på KubeCon var Project Pavilion, hvor jeg kunne snakke direkte med CNCF-prosjektets vedlikeholdere og kjernebidragsytere. Det er sjelden å få den typen tilgang til folk som bygger noe virkelig effektfullt.
2. For første gang føltes det virkelig som åpen kildekode setter retningen, ikke bare de store skyleverandørene eller store selskaper, men et globalt fellesskap som samarbeider om å forme det neste.
3. På den tekniske siden elsket jeg å se KubeVirt få virkelig fart, AI omforme observerbarheten fra bare å samle inn signaler til å faktisk tolke dem, og suverenitet bygges inn ved design. Det er spennende å være en del av et fellesskap der vi ikke bare kjører systemer lenger, men bygger fremtiden.
