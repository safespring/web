---
title: "Introduktion till Safespring Kubernetes Engine"
section: ""
episode: "1"
series: "false"
language: "sv"
date: "2026-06-20"
draft: false
tags: ["Svenska"]
card: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-demo-1.webp"
eventbild: ""
socialmediabild: ""
intro: "Skapa ett Kubernetes-kluster i Safesprings självserviceportal, skala worker-noder, ladda ner kubeconfig, autentisera med datacentrets IDP och anslut med kubectl."
sidebarlinkurl: "/kontakt/#contact-form"
sidebarlinkname: "Kontakta oss"
sidebarlinkicon: "fa fa-external-link"
sidebarlinkurl2: ""
sidebarlinkname2: ""
nosidebar: "none"
sidebarimage: ""
videoURL: "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/demo-safespring-kubernetes-engine-intro/master.m3u8"
thumbnail: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-demo-1.webp"
subtitles:
  - src: "/subtitles/demo-kubernetes/demo-safespring-kubernetes-engine-intro-sv.vtt"
    srclang: "sv"
    label: "Svenska"
  - src: "/subtitles/demo-kubernetes/demo-safespring-kubernetes-engine-intro-en.vtt"
    srclang: "en"
    label: "English"
  - src: "/subtitles/demo-kubernetes/demo-safespring-kubernetes-engine-intro-no.vtt"
    srclang: "no"
    label: "Norsk"
chaptersTitle: "I det här avsnittet"
chapters:
  - title: "Logga in i portalen"
    time: 0
    timeFormatted: "0:00"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-01.webp"
  - title: "Miljöer"
    time: 46
    timeFormatted: "0:46"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-02.webp"
  - title: "Lägg till kluster"
    time: 80
    timeFormatted: "1:20"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-03.webp"
  - title: "Mer om klusterkonfiguration"
    time: 248
    timeFormatted: "4:08"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-04.webp"
  - title: "Genomgång av klustret"
    time: 365
    timeFormatted: "6:05"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-06.webp"
  - title: "Skala upp worker-noder"
    time: 430
    timeFormatted: "7:10"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-05.webp"
  - title: "Innehåll i kubeconfig"
    time: 615
    timeFormatted: "10:15"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-02.webp"
  - title: "Autentiseringsnivåer"
    time: 635
    timeFormatted: "10:35"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-05.webp"
  - title: "Ta bort miljö"
    time: 724
    timeFormatted: "12:04"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-01.webp"
---

{{< ingress >}}
Den här demon går igenom hela flödet för ett första kluster i Safespring Kubernetes Engine: från inloggning i portalen och skapande av kluster till anslutning med kubectl och borttagning av demoklustret när det inte längre behövs.
{{< /ingress >}}

Genomgången börjar i Safesprings självserviceportal, där miljöer används för att samla resurser. Från en tom miljö skapar demon ett nytt Kubernetes-kluster och visar de val som görs vid provisionering, inklusive datacenter, storlek på control plane och storlek på worker-noder.

Klustret skapas i Stockholm 2 som exempel. Konfigurationsgranskningen visar valt datacenter, klusternamn, control plane-noder, worker-noder och den nedladdningsbara konfigurationen innan beställningen skickas in.

Under provisioneringen förklarar demon vad Safespring sätter upp runt klustret: hanterat control plane, worker-noder, API-endpoint, automatiskt provisionerad DNS för ingress och Talos Linux som bas för noderna. Den går också igenom hur Kubernetes-uppgraderingar hanteras, inklusive när ändringar behöver koordineras med applikationsteamet.

När klustret är aktivt visar översiktssidan region, Kubernetes-version, Talos-version, nätverksdetaljer, API-endpoint, ingressens CNAME-mål och antal worker-noder. Demon skalar sedan worker-poolen från tre till fyra noder direkt i portalen.

Den andra halvan fokuserar på åtkomst. Kubeconfig innehåller klustrets certificate authority-data, API-serverns endpoint och inloggningskonfiguration för datacentrets identitetsleverantör. Portalåtkomst och klusteråtkomst är avsiktligt separerade, så administratörer kan skapa eller ta bort kluster medan klusteranvändare autentiserar mot datacentret utan att behöva rätt att ta bort infrastruktur.

Till sist loggar demon in med kubectl, listar noder och kontrollerar poddar i namespace kube-system. Genomgången pekar ut komponenter som Cilium, CoreDNS och CSI Cinder innan demoklustret tas bort.
