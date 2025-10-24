---
ai: true
title: "OpenShift kører problemfrit på Safesprings platform"
date: 2021-12-07T13:58:58+01:00
draft: false
tags: ["English"]
intro: "Med OKD-community-installationsprogrammet kan du hurtigt få en OpenShift-klynge op at køre."
sidebarlinkname: "Kontakt os"
sidebarlinkurl: "/contact"
socialmedia: "safespring-compute.jpg"
devops: ""
card: "safespring-openshift.svg"
sidebarimage: "safespring-openshift.svg"
background: "safespring-openshift.png"
socialmediabild: "safespring_social_21.gif"
form: "ja"
toc: "Indholdsfortegnelse"
language: "da"
section: "Løsningsoversigt"
aliases:
  - /solution-brief/openshift-en/
---

![Safespring OpenShift-fordele](/img/safespring_key-points-openshift-3.svg)

{{% ingress %}}
Containere kræver fleksibilitet. Safesprings platform er skabt til skalerbarhed, høj sikkerhed og er optimeret til OpenShift-klyngers ressourcekrav.
{{% /ingress %}}

Safesprings Compute-tjeneste giver dig alle de ressourcer, du behøver for at køre OKD, open source-udgaven af Kubernetes baseret på Red Hat OpenShift.

Kører du OpenShift on-prem i dag? Med en svensk cloud-tjeneste som fundament for din OKD-klynge får du både skalerbarheden og sikkerheden fra en administreret infrastrukturplatform. Lad dine udviklere fokusere på OpenShift og betal kun for de ressourcer, du bruger.

<div style="margin-bottom:50px;"></div>

<script data-theme="solarized-dark" id="asciicast-J98pWS97p1zAHM8L1VFmB7Bre" src="https://asciinema.org/a/J98pWS97p1zAHM8L1VFmB7Bre.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

## Installer OKD med community-installationsprogrammet

{{% ingress %}}
Lær alt, hvad der er nødvendigt for at sætte Red Hat OpenShift (OKD) op på Safesprings cloud-platform.
{{% /ingress %}}

Med disse værktøjer kan du levere en OKD-klynge på cirka en time. Installationen opretter en minimal OKD-klynge med tre control-plane-noder og to worker-noder med den mindste instansstørrelse. Klyngen kan skalere op og ned baseret på ændrede inputparametre og ved at køre Ansible-playbooken igen.

På Safesprings OpenStack-baserede infrastrukturplatform kan du hurtigt udrulle en OKD-klynge med vores [værktøjer til at oprette klynger][1].

{{< 2calltoaction "Download OKD-installationsprogrammet" "https://github.com/safespring-community/utilities/tree/main/okd" >}}

### Det skal du bruge for at komme i gang

- Et projekt på [Safespring Compute](/services/compute/) med følgende ressourcer:
  - Hukommelse: 60 GB
  - vCPU'er: 16
  - Regler for sikkerhedsgrupper: 40
  - Lageradgang til S3 på STO2-lokationen
  - Et liveDNS-domæne hos gandi.net
  - En API-nøgle til din gandi.net-bruger

### Terraform-modulet

Kernen i det værktøj, vi har udviklet, er Terraform-modulet, som stiller alle de nødvendige ressourcer til rådighed, som en OKD-klynge behøver for at samle sig selv, dvs. compute-noder med forskellige roller (boot, control plane, worker), bloklager, sikkerhed, grupper, netværk, DNS-poster, nøglepar osv. Modulet er så generelt, som det kan være. Installationsværktøjerne bruger Terraform-modulet til al infrastruktur-provisionering. Modulet tilgås direkte på GitHub i installationsværktøjerne, i skabelonen til klyngekonfiguration `cluster.tf.js`.

### Inputparametre

Opsætningen af klyngen kræver mange inputparametre. Du kan selv angive parametrene, så de passer til dine behov, men vi har skabt et abstraktionslag med fornuftige standardværdier for mange af dem for at gøre det så nemt som muligt. Det værktøj, vi har udviklet, sikrer, at du har alle afhængigheder på plads og foretager den nødvendige konfiguration ud fra skabeloner.

Værktøjet tager nogle få inputs såsom klyngenavn, DNS-domæne, S3-bucket (til den store ignition-fil til startnoden) og omsætter dem til nyttige parametre for Terraform-modulet. En skabelongenereret `cluster.tf` indeholder disse parametre og referencer til modulet. Filen `cluster.tf` bruges til provisioneringen.

## Resultatet

Installationen opretter en minimal OKD-klynge med control-plane-noder og to worker-noder med den mindste instansstørrelse. Du kan tilsidesætte instansstørrelsen og andre parametre (såsom antallet af de forskellige noder) via filen `settings.yml`.

{{< 2calltoaction "Download OKD-installationsprogrammet" "https://github.com/safespring-community/utilities/tree/main/okd" >}}

[1]: https://github.com/safespring-community/utilities/tree/main/okd
