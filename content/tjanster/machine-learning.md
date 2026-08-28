---
title: "GPU-resurser för AI och maskininlärning"
metatitle: "GPU-instanser för AI och maskininlärning"
section: "Public Cloud"
language: "Se"
cardtitle: "GPU för AI och ML"
megamenulisttitle: "GPU (AI/ML)"
cardicon: "fa-solid fa-microchip-ai"
cardcolor: "#195F8C"
cardorder: "2"
date: 2025-03-13
draft: false
intro: "Kör inferens, modellträning, videokodning och andra GPU-accelererade arbetslaster i Safesprings molninfrastruktur."
cardintro: "GPU-instanser med A2 och H100 NVL för beräkningsintensiva arbetslaster."
form: ""
background: "safespring-ai-background.svg"
sidebarlinkname: "Se priser"
sidebarlinkurl: "/pris/#flavors-med-gpu"
sidebarlinkname2: "Kontakta Safespring"
sidebarlinkurl2: "/kontakt"
sidebarimage: "safespring-fredric.webp"
sidebartext: "Vill du prata om GPU-resurser? Jag heter Fredric Wallsten. Kontakta mig gärna om du har frågor."
sidebarphone: "+46855107370"
sidebarmail: "hello@safespring.com"
socialmedia: ""
---

## GPU-instanser i Safespring Compute

{{< ingress >}}
Safespring Compute erbjuder GPU-flavors för inferens, modellträning, videokodning och drift av stora språkmodeller.
{{< /ingress >}}

GPU-resurserna finns som flavors, det vill säga fördefinierade resursprofiler. Varje GPU-flavor har en bestämd kombination av GPU, vCPU och RAM. Flavors i l2-serien har dessutom lokal disk. Aktuella konfigurationer och priser finns i prislistan.

A2 passar för inferens, lättare träning och videokodning. A2-flavors finns i STO2 och aktiveras för projektet via supporten. H100 NVL erbjuds i STO1 på förfrågan och är optimerad för inferens med stora språkmodeller. Kortet har 94 GB HBM3-minne, PCIe 5.0 x16 och passiv kylning.

{{< gpu-comparison >}}

{{< distance >}}

## Välj mellan lokal och central lagring

l2-flavors har lokal NVMe-lagring på compute-noden. Rotdisken följer instansens livscykel och raderas tillsammans med instansen. Safespring kan inte återställa informationen om den lokala disken går sönder. Använd därför l2 för tillståndslösa eller kortlivade arbetslaster, eller se till att informationen säkerhetskopieras.

b2-flavors har ingen lokal disk och startas från en beständig volym i den centrala blocklagringen. Volymen finns kvar oberoende av instansen och kan vara av typen `fast` eller `large`.

{{< distance >}}

## GPU-noder för Kubernetes

GPU-stöd i Safespring Kubernetes Engine är tillgängligt i STO2 för worker-noder med A2-flavors vars namn slutar på `gA2`. Det dokumenterade SKE-stödet omfattar inte H100 NVL. Det managerade kontrollplanet och Compute-instanserna som används som worker-noder debiteras separat.

{{< distance >}}

## Dokumentation och exempel om GPU och maskininlärning

Läs teknisk dokumentation om GPU-instanser, en praktisk guide till att köra en lokal språkmodell och exempel på maskininlärning i Safesprings infrastruktur.

{{< manual-document-table matomoAction="GPU Resources Deep Dive" >}}
  {{< manual-document-row
    title="A2-flavors i Safespring Compute"
    href="https://docs.safespring.com/compute/gpu/"
    icon="fa-solid fa-microchip"
    label="Dokumentation"
    description="NVIDIA A2, namn på flavors, begränsningar och installation av NVIDIA-drivrutiner."
  >}}
  {{< manual-document-row
    title="Kör GPU-arbetslaster i Kubernetes"
    href="https://docs.safespring.com/kubernetes/gpu/"
    icon="fa-solid fa-dharmachakra"
    label="Guide"
    description="Verifiera NVIDIA-körmiljön och kör GPU-jobb och vLLM-inferens i Safespring Kubernetes Engine."
  >}}
  {{< manual-document-row
    title="Kör en lokal språkmodell med Ollama"
    href="/blogg/2025/2025-12-run-llm-in-safespring-container-platform/"
    icon="fa-solid fa-terminal"
    label="Blogg"
    description="Installera NVIDIA-drivrutiner, Ollama och Open-WebUI på en GPU-instans som kör Ubuntu."
  >}}
  {{< manual-document-row
    title="Välj lagring för GPU-instansen"
    href="https://docs.safespring.com/compute/volume/"
    icon="fa-solid fa-hard-drive"
    label="Guide"
    description="Jämför lokal lagring med beständiga volymer och läs om volymtyperna fast och large."
  >}}
  {{< manual-document-row
    title="Federerad maskininlärning med Scaleout"
    href="/tjanster/case/scaleout/"
    icon="fa-solid fa-people-group"
    label="Kundcase"
    description="Scaleout berättar om federerad maskininlärning, dataskydd och sitt arbete i Safesprings infrastruktur."
  >}}
  {{< manual-document-row
    title="AI nära oss: innovation och ansvar"
    href="/webinar/eforvaltningsdagarna-2023/"
    icon="fa-solid fa-circle-play"
    label="Seminarium"
    description="Ett inspelat samtal om AI, dataskydd och att träna modeller utan att flytta data."
  >}}
  {{< manual-document-row
    title="Maskininlärning från idé till produktion"
    href="/webinar/safespring-partner-webinar-scaleout-1/"
    icon="fa-solid fa-diagram-project"
    label="Webbinarium"
    description="Scaleout visar hur ett maskininlärningsprojekt går från pilot till produktion."
  >}}
{{< /manual-document-table >}}

{{< distance >}}

## Konfigurationer och priser

På [prislistan för GPU-instanser](/pris/#flavors-med-gpu) finns aktuella konfigurationer med vCPU, RAM, lokal disk, GPU-modell samt pris per timme och för 30 dagar.

Om du är osäker på vilken flavor eller lagringslösning som passar din arbetslast kan du [kontakta Safespring](/kontakt) för att gå igenom kraven.
