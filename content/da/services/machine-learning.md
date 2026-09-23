---
ai: true
title: "GPU-ressourcer til AI og maskinlæring"
metatitle: "GPU-instanser til AI og maskinlæring"
section: "Public Cloud"
language: "da"
cardtitle: "GPU til AI og ML"
megamenulisttitle: "GPU (AI/ML)"
cardicon: "fa-solid fa-microchip-ai"
cardcolor: "#195F8C"
cardorder: "6"
date: "2025-05-23"
draft: false
intro: "Kør inferens, modeltræning, videokodning og andre GPU-accelererede workloads på Safesprings cloudinfrastruktur."
cardintro: "GPU-instanser med A2 og H100 NVL til beregningstunge workloads."
form: ""
background: "safespring-ai-background.svg"
sidebarlinkname: "Se priser"
sidebarlinkurl: "/price/#gpu-flavors"
sidebarlinkname2: "Kontakt Safespring"
sidebarlinkurl2: "/contact.md"
sidebarimage: "safespring-fredric.webp"
sidebartext: "Vil du tale om GPU-ressourcer? Jeg hedder Fredric Wallsten. Kontakt mig gerne, hvis du har spørgsmål."
sidebarphone: "+46855107370"
sidebarmail: "hello@safespring.com"
socialmedia: ""
slug: "ai-ml"
aliases:
  - /tjenester/fodereret-ai-med-fedn-pa-safespring/
  - /da/tjenester/machine-learning/
---

## GPU-instanser i Safespring Compute

{{< ingress >}}
Safespring Compute tilbyder GPU-flavors til inferens, modeltræning, videokodning og drift af store sprogmodeller.
{{< /ingress >}}

GPU-ressourcer leveres som flavors, som er foruddefinerede ressourceprofiler. Hver GPU-flavor har en fast kombination af GPU, vCPU og RAM. Flavors i l2-serien inkluderer også lokal lagring. Aktuelle konfigurationer og priser findes på prissiden.

A2 er velegnet til inferens, lettere træning og videokodning. A2-flavors er tilgængelige i STO2 og aktiveres for projektet via supporten. H100 NVL tilbydes i STO1 på forespørgsel og er optimeret til inferens med store sprogmodeller. Kortet har 94 GB HBM3-hukommelse, PCIe 5.0 x16 og passiv køling.

{{< gpu-comparison >}}

{{< distance >}}

## Vælg mellem lokal og central lagring

l2-flavors inkluderer lokal NVMe-lagring på compute-noden. Roddisken følger instansens livscyklus og slettes sammen med instansen. Safespring kan ikke gendanne dataene, hvis den lokale disk fejler. Brug l2 til stateless eller kortvarige workloads, eller sørg for, at dataene er sikkerhedskopieret.

b2-flavors har ingen lokal disk og starter fra et persistent volumen i central bloklagring. Volumenet består uafhængigt af instansen og kan være af typen `fast` eller `large`.

{{< distance >}}

## GPU-noder til Kubernetes

GPU-understøttelse i Safespring Kubernetes Engine er tilgængelig i STO2 til workernoder med A2-flavors, hvis navne slutter på `gA2`. Den dokumenterede SKE-understøttelse omfatter ikke H100 NVL. Det administrerede kontrolplan og Compute-instanserne, der bruges som workernoder, faktureres separat.

{{< distance >}}

## Dokumentation og eksempler om GPU og maskinlæring

Læs den tekniske dokumentation om GPU-instanser, en praktisk vejledning til at køre en lokal sprogmodel og et eksempel på maskinlæring på Safesprings infrastruktur.

{{< manual-document-table matomoAction="GPU Resources Deep Dive" >}}
  {{< manual-document-row
    title="A2-flavors i Safespring Compute"
    href="https://docs.safespring.com/compute/gpu/"
    icon="fa-solid fa-microchip-ai"
    label="Dokumentation"
    description="NVIDIA A2, navngivning af flavors, begrænsninger og installation af NVIDIA-drivere."
  >}}
  {{< manual-document-row
    title="Kør GPU-workloads i Kubernetes"
    href="https://docs.safespring.com/kubernetes/gpu/"
    icon="fa-solid fa-server"
    label="Vejledning"
    description="Kontrollér NVIDIA-runtime, og kør GPU-jobs og vLLM-inferens i Safespring Kubernetes Engine."
  >}}
  {{< manual-document-row
    title="Kør en lokal sprogmodel med Ollama"
    href="/deep-dive/2025-12-run-llm-in-safespring-container-platform/"
    icon="fa-solid fa-terminal"
    label="Blog"
    description="Installér NVIDIA-drivere, Ollama og Open-WebUI på en Ubuntu-instans med GPU."
  >}}
  {{< manual-document-row
    title="Vælg lagring til GPU-instansen"
    href="https://docs.safespring.com/compute/volume/"
    icon="fa-solid fa-hard-drive"
    label="Vejledning"
    description="Sammenlign lokal lagring med persistente volumener, og læs om volumentyperne fast og large."
  >}}
  {{< manual-document-row
    title="Fødereret maskinlæring med Scaleout"
    href="/tjenester/scaleout-systems-leverer-gdpr-sikker-maskinlaering-med-safespring/"
    icon="fa-solid fa-people-arrows"
    label="Kundecase"
    description="Scaleout fortæller om fødereret maskinlæring, databeskyttelse og sit arbejde på Safesprings infrastruktur."
  >}}
{{< /manual-document-table >}}

{{< distance >}}

## Konfigurationer og priser

I [prislisten for GPU-instanser](/price/#gpu-flavors) finder du aktuelle konfigurationer med vCPU, RAM, lokal lagring, GPU-model samt pris pr. time og pr. 30 dage.

Hvis du er i tvivl om, hvilken flavor eller lagringsløsning der passer til dit workload, kan du [kontakte Safespring]({{% relref "/contact.md" %}}) for at gennemgå dine behov.
