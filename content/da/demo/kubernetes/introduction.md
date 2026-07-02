---
title: "Introduktion til Safespring Kubernetes Engine"
section: ""
episode: "1"
series: "false"
language: "da"
date: "2026-06-20"
draft: false
tags: ["Dansk"]
card: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-demo-1.webp"
eventbild: ""
socialmediabild: ""
intro: "Opret en Kubernetes-klynge i Safesprings selvbetjeningsportal, skalér worker-noder, download kubeconfig, autentificér med datacenterets IDP og forbind med kubectl."
sidebarlinkurl: "/kontakt/#contact-form"
sidebarlinkname: "Kontakt os"
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
chaptersTitle: "I dette afsnit"
chapters:
  - title: "Log ind i portalen"
    time: 0
    timeFormatted: "0:00"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-01.webp"
  - title: "Miljøer"
    time: 46
    timeFormatted: "0:46"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-02.webp"
  - title: "Tilføj klynge"
    time: 80
    timeFormatted: "1:20"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-03.webp"
  - title: "Mere om klyngekonfiguration"
    time: 248
    timeFormatted: "4:08"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-04.webp"
  - title: "Gennemgang af klyngen"
    time: 365
    timeFormatted: "6:05"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-06.webp"
  - title: "Skalér worker-noder op"
    time: 430
    timeFormatted: "7:10"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-05.webp"
  - title: "Indhold i kubeconfig"
    time: 615
    timeFormatted: "10:15"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-02.webp"
  - title: "Autentificeringsniveauer"
    time: 635
    timeFormatted: "10:35"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-05.webp"
  - title: "Slet miljø"
    time: 724
    timeFormatted: "12:04"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-01.webp"
---

{{< ingress >}}
Denne demo gennemgår hele første-klynge-flowet i Safespring Kubernetes Engine: fra login i portalen og oprettelse af klynge til forbindelse med kubectl og sletning af demoklyngen, når den ikke længere er nødvendig.
{{< /ingress >}}

Gennemgangen starter i Safesprings selvbetjeningsportal, hvor miljøer bruges til at gruppere ressourcer. Fra et tomt miljø opretter demoen en ny Kubernetes-klynge og viser de valg, der foretages under provisionering, herunder datacenter, størrelse på control plane og størrelse på worker-noder.

Klyngen oprettes i Stockholm 2 som eksempel. Konfigurationsgennemgangen viser valgt datacenter, klyngenavn, control plane-noder, worker-noder og den downloadbare konfiguration, før bestillingen sendes ind.

Under provisioneringen forklarer demoen, hvad Safespring sætter op omkring klyngen: administreret control plane, worker-noder, API-endpoint, automatisk provisioneret DNS til ingress og Talos Linux som base for noderne. Den dækker også, hvordan Kubernetes-opgraderinger håndteres, herunder hvornår ændringer skal koordineres med applikationsteamet.

Når klyngen er aktiv, viser oversigtssiden region, Kubernetes-version, Talos-version, netværksdetaljer, API-endpoint, ingressens CNAME-mål og antal worker-noder. Demoen skalerer derefter worker-poolen fra tre til fire noder direkte i portalen.

Anden halvdel fokuserer på adgang. Kubeconfig indeholder klyngens certificate authority-data, API-serverens endpoint og login-konfiguration for datacenterets identitetsleverandør. Portaladgang og klyngeadgang er bevidst adskilt, så administratorer kan oprette eller slette klynger, mens klyngebrugere autentificerer mod datacenteret uden at skulle have ret til at slette infrastruktur.

Til sidst logger demoen ind med kubectl, lister noder og kontrollerer pods i namespace kube-system. Gennemgangen peger på komponenter som Cilium, CoreDNS og CSI Cinder, før demoklyngen slettes.
