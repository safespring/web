---
ai: true
title: "Plattform som tjänst"
language: "sv"
cardtitle: "Plattformstjänster"
cardicon: "fa-solid fa-container-storage"
cardcolor: "#195F8C"
cardorder: "08"
date: "2025-01-20"
draft: false
intro: "Safespring tillhandahåller flera plattformstjänster ovanpå Compute-plattformen, med containrar för att driftsätta moderna och molnnativa applikationer."
cardintro: "Safespring erbjuder flera plattformstjänster ovanpå IaaS-plattformen."
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tillbaka till alla kategorier"
sidebarlinkurl: "/geant/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "OCRE 2024-ramverket"
socialmedia: "/safespring-start.jpg"
toc: "På den här sidan"
noindex: "x"
aliases:
- /geant/service-catalogue/platform/
---
## Hanterad Compliant Kubernetes

Den hanterade plattformen Compliant Kubernetes inkluderar följande funktioner och möjligheter:

### Säkerhet och regelefterlevnad

- Privat containerregister
- Intrångsdetekteringssystem (IDS) som larmar vid intrång
- Automatiserad sårbarhetsskanning av containeravbildningar
- Integration med autentiseringsleverantörer såsom Active Directory, SAML och OIDC, t.ex. Google-autentisering
- Granskningsloggning i Kubernetes API-servern för att spåra aktiviteter i klustret
- Rollbaserad åtkomstkontroll (RBAC)
- Tillämpning av efterlevnadspolicyer
- Hantering av Secrets
- Automatiserad certifikathantering
- Nätverkssegregering (nätverkszoner och isolering av öst–väst-trafik)
- Nätverksisolering och restriktiva brandväggar som endast släpper igenom tillåten nätverkstrafik till plattformen. Inkommande trafik till klustret hanteras säkert med Nginx Ingress Controller

### Plattformens observabilitet

- Övervakning av resursanvändning i Compliant Kubernetes-plattformen
- Larm baserade på övervakningsdata
- Loggaggregering
- Analys baserad på insamlade loggar

### Automatisering och hantering

- Löpande uppdateringar/patchar av Kubernetes-plattformen
- Löpande uppdateringar/patchar av Cluster Services och External Services
- Säkerhetskopior och katastrofåterställning
- Företagsanpassat gränssnitt (UI) för att kontrollera klustret och integrera med andra tjänster

## Hanterad OpenSearch

### Uppdateringar och uppgraderingar

- OpenSearch- och Kibana-instanser hålls uppdaterade med säkerhetspatchar och nya versioner.

### Säkerhetskopior och katastrofåterställning

- En fullständig säkerhetskopia av databasen tas varje dag. Utöver detta möjliggörs återställning till en specifik tidpunkt (point-in-time) via en Write-Ahead-Log.
- Katastrofåterställning ska slutföras inom fyra timmar.

### Loggaggregering

- Alla loggar lagras i OpenSearch och kan visas i Kibana.
- Loggar sparas i högst 30 dagar (GDPR-efterlevnad) eller upp till 50 GB, beroende på vilket som inträffar först.

## Hanterad NATS

### Uppdateringar och uppgraderingar

- NATS hålls uppdaterat med säkerhetspatchar och nya versioner.

### Säkerhetskopior och katastrofåterställning

- En fullständig säkerhetskopia tas varje dag.
- Katastrofåterställning ska slutföras inom fyra timmar.

### Loggaggregering

- Alla loggar lagras i OpenSearch och kan visas i Kibana.
- Loggar sparas i högst 30 dagar (GDPR-efterlevnad) eller upp till 50 GB, beroende på vilket som inträffar först.

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Kontakta Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Försäljning:" >}} +46855107370 eller sales@safespring.se
{{% /custom-card %}}