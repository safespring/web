---
ai: true
title: "Platform som en tjeneste"
language: "da"
cardtitle: "Platformtjenester"
cardicon: "fa-solid fa-container-storage"
cardcolor: "#195F8C"
cardorder: "08"
date: "2025-01-20"
draft: false
intro: "Safespring leverer en række platformtjenester oven på Compute-platformen med containere til udrulning af moderne og cloud-native applikationer."
cardintro: "Safespring tilbyder flere platformtjenester oven på IaaS-platformen."
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tilbage til alle kategorier"
sidebarlinkurl: "/geant/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "OCRE 2024-rammeværk"
socialmedia: "/safespring-start.jpg"
toc: "På denne side"
noindex: "x"
aliases:
- /geant/service-catalogue/platform/
---
## Administreret Compliant Kubernetes

Den administrerede Compliant Kubernetes-platform omfatter følgende funktioner og muligheder:

### Sikkerhed og compliance

- Privat containerregister
- Indtrængningsdetekteringssystemer (IDS) til alarmering i tilfælde af sikkerhedsbrud
- Automatiseret sårbarhedsscanning af container-images
- Integration med autentificeringsudbydere såsom Active Directory, SAML og OIDC, f.eks. Google-autentificering
- Revisionslogning i Kubernetes API-serveren til at spore aktiviteter i klyngen
- Rollebaseret adgangskontrol (RBAC)
- Håndhævelse af compliance-politikker
- Håndtering af secrets
- Automatiseret certifikathåndtering
- Netværkssegregering (netværkszoner og isolation af øst-vest-trafik)
- Netværksisolering og restriktive firewalls, der kun tillader autoriseret netværkstrafik ind i platformen. Indgående trafik til klyngen håndteres sikkert ved hjælp af Nginx ingress controller

### Observabilitet for platformen

- Overvågning af ressourceforbrug på Compliant Kubernetes-platformen
- Alarmering baseret på overvågningsdata
- Logaggregering
- Analyser baseret på indsamlede logfiler

### Automatisering og administration

- Løbende opdateringer/patches af Kubernetes-platformen
- Løbende opdateringer/patches af Cluster Services og External Services
- Sikkerhedskopiering og gendannelse efter katastrofe
- Enterprise-brugerflade til at styre klyngen og integrere med andre tjenester

## Administreret OpenSearch

### Opdateringer og opgraderinger

- OpenSearch- og Kibana-instanser holdes ajour med sikkerhedsrettelser og nye versioner.

### Sikkerhedskopiering og gendannelse efter katastrofe

- Der tages en fuld sikkerhedskopi af databasen hver dag. Derudover muliggøres point-in-time-gendannelse via en Write-Ahead-Log.
- Disaster recovery forpligter vi os til at gennemføre inden for fire timer.

### Logaggregering

- Alle logfiler lagres i OpenSearch og kan vises i Kibana.
- Logfiler opbevares i maksimalt 30 dage (GDPR-overholdelse) eller op til 50 GB, alt efter hvad der kommer først.

## Administreret NATS

### Opdateringer og opgraderinger

- NATS holdes ajour med sikkerhedsrettelser og nye versioner.

### Sikkerhedskopiering og gendannelse efter katastrofe

- Der tages en fuld sikkerhedskopi hver dag.
- Disaster recovery forpligter vi os til at gennemføre inden for fire timer.

### Logaggregering

- Alle logfiler lagres i OpenSearch og kan vises i Kibana.
- Logfiler opbevares i maksimalt 30 dage (GDPR-overholdelse) eller op til 50 GB, alt efter hvad der kommer først.

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Kontakt Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Salg:" >}} +46855107370 eller sales@safespring.se
{{% /custom-card %}}