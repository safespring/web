---
title: "GPU-ressurser for AI og maskinlæring"
metatitle: "GPU-instanser for AI og maskinlæring"
section: "Public Cloud"
language: "nb"
cardtitle: "GPU for AI og ML"
megamenulisttitle: "GPU (AI/ML)"
cardicon: "fa-solid fa-microchip-ai"
cardcolor: "#195F8C"
cardorder: "6"
date: 2019-04-30T08:58:58+01:00
draft: false
intro: "Kjør inferens, modelltrening, videokoding og andre GPU-akselererte arbeidslaster i Safesprings skyinfrastruktur."
cardintro: "GPU-instanser med A2 og H100 NVL for beregningsintensive arbeidslaster."
form: ""
background: "safespring-ai-background.svg"
sidebarlinkname: "Se priser"
sidebarlinkurl: "/pris/#gpu-varianter"
sidebarlinkname2: "Kontakt Safespring"
sidebarlinkurl2: "/kontakt/"
sidebarimage: "safespring-fredric.webp"
sidebartext: "Vil du snakke om GPU-ressurser? Jeg heter Fredric Wallsten. Ta gjerne kontakt hvis du har spørsmål."
sidebarphone: "+46855107370"
sidebarmail: "hello@safespring.com"
socialmedia: ""
slug: "ai-ml"
aliases:
  - /no/tjenester/machine-learning/
---

## GPU-instanser i Safespring Compute

{{< ingress >}}
Safespring Compute tilbyr GPU-flavors for inferens, modelltrening, videokoding og kjøring av store språkmodeller.
{{< /ingress >}}

GPU-ressursene leveres som flavors, det vil si forhåndsdefinerte ressursprofiler. Hver GPU-flavor har en fast kombinasjon av GPU, vCPU og RAM. Flavors i l2-serien har i tillegg lokal disk. Aktuelle konfigurasjoner og priser finnes i prislisten.

A2 passer for inferens, lettere trening og videokoding. A2-flavors er tilgjengelige i STO2 og aktiveres for prosjektet via support. H100 NVL tilbys i STO1 på forespørsel og er optimalisert for inferens med store språkmodeller. Kortet har 94 GB HBM3-minne, PCIe 5.0 x16 og passiv kjøling.

{{< gpu-comparison >}}

{{< distance >}}

## Velg mellom lokal og sentral lagring

l2-flavors har lokal NVMe-lagring på compute-noden. Rotdisken følger instansens livssyklus og slettes sammen med instansen. Safespring kan ikke gjenopprette dataene hvis den lokale disken svikter. Bruk derfor l2 for tilstandsløse eller kortvarige arbeidslaster, eller sørg for at dataene sikkerhetskopieres.

b2-flavors har ingen lokal disk og starter fra et vedvarende volum i den sentrale blokklagringen. Volumet består uavhengig av instansen og kan være av typen `fast` eller `large`.

{{< distance >}}

## GPU-noder for Kubernetes

GPU-støtte i Safespring Kubernetes Engine er tilgjengelig i STO2 for workernoder med A2-flavors der navnet slutter på `gA2`. Den dokumenterte SKE-støtten omfatter ikke H100 NVL. Det administrerte kontrollplanet og Compute-instansene som brukes som workernoder, faktureres separat.

{{< distance >}}

## Dokumentasjon og eksempler om GPU og maskinlæring

Les teknisk dokumentasjon om GPU-instanser, en praktisk veiledning for å kjøre en lokal språkmodell og et eksempel på maskinlæring i Safesprings infrastruktur.

{{< manual-document-table matomoAction="GPU Resources Deep Dive" >}}
  {{< manual-document-row
    title="A2-flavors i Safespring Compute"
    href="https://docs.safespring.com/compute/gpu/"
    icon="fa-solid fa-microchip"
    label="Dokumentasjon"
    description="NVIDIA A2, navn på flavors, begrensninger og installasjon av NVIDIA-drivere."
  >}}
  {{< manual-document-row
    title="Kjør GPU-arbeidslaster i Kubernetes"
    href="https://docs.safespring.com/kubernetes/gpu/"
    icon="fa-solid fa-dharmachakra"
    label="Veiledning"
    description="Verifiser NVIDIA-kjøremiljøet og kjør GPU-jobber og vLLM-inferens i Safespring Kubernetes Engine."
  >}}
  {{< manual-document-row
    title="Kjør en lokal språkmodell med Ollama"
    href="/blogg/2025/2025-12-run-llm-in-safespring-container-platform/"
    icon="fa-solid fa-terminal"
    label="Blogg"
    description="Installer NVIDIA-drivere, Ollama og Open-WebUI på en GPU-instans med Ubuntu."
  >}}
  {{< manual-document-row
    title="Velg lagring for GPU-instansen"
    href="https://docs.safespring.com/compute/volume/"
    icon="fa-solid fa-hard-drive"
    label="Veiledning"
    description="Sammenlign lokal lagring med vedvarende volumer, og les om volumtypene fast og large."
  >}}
  {{< manual-document-row
    title="Føderert maskinlæring med Scaleout"
    href="/tjenester/case/scaleout/"
    icon="fa-solid fa-people-group"
    label="Kundecase"
    description="Scaleout forteller om føderert maskinlæring, databeskyttelse og arbeidet sitt i Safesprings infrastruktur."
  >}}
{{< /manual-document-table >}}

{{< distance >}}

## Konfigurasjoner og priser

I [prislisten for GPU-instanser](/pris/#gpu-varianter) finner du aktuelle konfigurasjoner med vCPU, RAM, lokal disk, GPU-modell samt pris per time og per 30 dager.

Hvis du er usikker på hvilken flavor eller lagringsløsning som passer arbeidslasten din, kan du [kontakte Safespring](/kontakt/) for å gå gjennom kravene.
