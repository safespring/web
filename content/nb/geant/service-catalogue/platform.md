---
ai: true
title: "Plattform som en tjeneste"
language: "nb"
cardtitle: "Plattformtjenester"
cardicon: "fa-solid fa-container-storage"
cardcolor: "#195F8C"
cardorder: "08"
date: "2025-01-20"
draft: false
intro: "Safespring tilbyr flere plattformtjenester på toppen av Compute-plattformen, med containere for å rulle ut moderne og cloud-native applikasjoner."
cardintro: "Safespring tilbyr en rekke plattformtjenester på toppen av IaaS-plattformen."
background: "safespring-compute-background.svg"
form: "nei"
sidebarlinkname: "Tilbake til alle kategorier"
sidebarlinkurl: "/geant/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "Rammeverk for OCRE 2024"
socialmedia: "/safespring-start.jpg"
toc: "På denne siden"
noindex: "x"
aliases:
- /geant/service-catalogue/platform/
---
## Administrert Compliant Kubernetes

Den administrerte Compliant Kubernetes-plattformen inkluderer følgende funksjoner og muligheter:

### Sikkerhet og etterlevelse

- Privat containerregister
- Inntrengingsdeteksjonssystemer (IDS) for varsling ved brudd
- Automatisert sårbarhetsskanning av container-images
- Integrasjon med autentiseringsleverandører som Active Directory, SAML og OIDC, f.eks. Google-autentisering
- Revisjonslogging i Kubernetes API-server for å spore aktiviteter i klyngen
- Rollebasert tilgangskontroll (RBAC)
- Håndheving av etterlevelsesregler
- Håndtering av secrets
- Automatisert sertifikathåndtering
- Nettverkssegregering (nettverkssoner og isolering av øst–vest-trafikk)
- Nettverksisolasjon og restriktive brannmurer som kun tillater tillatt nettverkstrafikk inn i plattformen. Inngående trafikk til klyngen håndteres sikkert ved hjelp av Nginx ingress controller

### Plattformobservabilitet

- Overvåking av ressursbruk i Compliant Kubernetes-plattformen
- Varsling basert på overvåkingsdata
- Loggaggregering
- Analyse basert på innsamlede logger

### Automatisering og administrasjon

- Kontinuerlige oppdateringer/patcher av Kubernetes-plattformen
- Kontinuerlige oppdateringer/patcher av Cluster Services og External Services
- Sikkerhetskopier og katastrofegjenoppretting
- Enterprise-grensesnitt for å styre klyngen og integrere med andre tjenester

## Administrert OpenSearch

### Oppdateringer og oppgraderinger

- OpenSearch- og Kibana-instanser holdes oppdatert med sikkerhetspatcher og nye versjoner.

### Sikkerhetskopier og katastrofegjenoppretting

- En full sikkerhetskopi av databasen tas hver dag. I tillegg tilbys gjenoppretting til et bestemt tidspunkt ved hjelp av en Write-Ahead-Log.
- Katastrofegjenoppretting forpliktes fullført innen fire timer.

### Loggaggregering

- Alle logger lagres i OpenSearch og kan vises i Kibana.
- Logger beholdes i maks 30 dager (GDPR-etterlevelse) eller opptil 50 GB, avhengig av hva som kommer først.

## Administrert NATS

### Oppdateringer og oppgraderinger

- NATS holdes oppdatert med sikkerhetspatcher og nye versjoner.

### Sikkerhetskopier og katastrofegjenoppretting

- En full sikkerhetskopi tas hver dag.
- Katastrofegjenoppretting forpliktes fullført innen fire timer.

### Loggaggregering

- Alle logger lagres i OpenSearch og kan vises i Kibana.
- Logger beholdes i maks 30 dager (GDPR-etterlevelse) eller opptil 50 GB, avhengig av hva som kommer først.

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Get in contact with Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Sales:" >}} +46855107370 or sales@safespring.se
{{% /custom-card %}}