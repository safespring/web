---
title: "Introduksjon til Safespring Kubernetes Engine"
section: ""
episode: "1"
series: "false"
language: "nb"
date: "2026-06-20"
draft: false
tags: ["Norsk"]
card: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-demo-1.webp"
eventbild: ""
socialmediabild: ""
intro: "Opprett en Kubernetes-klynge i Safesprings selvbetjeningsportal, skaler worker-noder, last ned kubeconfig, autentiser med datasenterets IDP og koble til med kubectl."
sidebarlinkurl: "/kontakt/#contact-form"
sidebarlinkname: "Kontakt oss"
sidebarlinkicon: "fa fa-external-link"
sidebarlinkurl2: ""
sidebarlinkname2: ""
nosidebar: "none"
sidebarimage: ""
videoURL: "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/demo-safespring-kubernetes-engine-intro/master.m3u8"
thumbnail: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-demo-1.webp"
subtitles:
  - src: "/subtitles/demo-kubernetes/demo-safespring-kubernetes-engine-intro-no.vtt"
    srclang: "no"
    label: "Norsk"
  - src: "/subtitles/demo-kubernetes/demo-safespring-kubernetes-engine-intro-en.vtt"
    srclang: "en"
    label: "English"
  - src: "/subtitles/demo-kubernetes/demo-safespring-kubernetes-engine-intro-sv.vtt"
    srclang: "sv"
    label: "Svenska"
chaptersTitle: "I denne episoden"
chapters:
  - title: "Logg inn i portalen"
    time: 0
    timeFormatted: "0:00"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-01.webp"
  - title: "Miljøer"
    time: 46
    timeFormatted: "0:46"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-02.webp"
  - title: "Legg til klynge"
    time: 80
    timeFormatted: "1:20"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-03.webp"
  - title: "Mer om klyngekonfigurasjon"
    time: 248
    timeFormatted: "4:08"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-04.webp"
  - title: "Gjennomgang av klyngen"
    time: 365
    timeFormatted: "6:05"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-06.webp"
  - title: "Skaler opp worker-noder"
    time: 430
    timeFormatted: "7:10"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-05.webp"
  - title: "Innhold i kubeconfig"
    time: 615
    timeFormatted: "10:15"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-02.webp"
  - title: "Autentiseringsnivåer"
    time: 635
    timeFormatted: "10:35"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-05.webp"
  - title: "Slett miljø"
    time: 724
    timeFormatted: "12:04"
    image: "/img/webinar/thumbnails/demo-safespring-kubernetes-engine-chapter-01.webp"
---

{{< ingress >}}
Denne demoen går gjennom hele førstegangsflyten for en klynge i Safespring Kubernetes Engine: fra innlogging i portalen og opprettelse av klynge til tilkobling med kubectl og sletting av demoklyngen når den ikke lenger trengs.
{{< /ingress >}}

Gjennomgangen starter i Safesprings selvbetjeningsportal, der miljøer brukes til å gruppere ressurser. Fra et tomt miljø oppretter demoen en ny Kubernetes-klynge og viser valgene som gjøres under provisjonering, inkludert datasenter, størrelse på control plane og størrelse på worker-noder.

Klyngen opprettes i Stockholm 2 som eksempel. Konfigurasjonsgjennomgangen viser valgt datasenter, klyngenavn, control plane-noder, worker-noder og den nedlastbare konfigurasjonen før bestillingen sendes inn.

Under provisjoneringen forklarer demoen hva Safespring setter opp rundt klyngen: administrert control plane, worker-noder, API-endepunkt, automatisk provisjonert DNS for ingress og Talos Linux som base for nodene. Den dekker også hvordan Kubernetes-oppgraderinger håndteres, inkludert når endringer må koordineres med applikasjonsteamet.

Når klyngen er aktiv, viser oversiktssiden region, Kubernetes-versjon, Talos-versjon, nettverksdetaljer, API-endepunkt, ingressens CNAME-mål og antall worker-noder. Demoen skalerer deretter worker-poolen fra tre til fire noder direkte i portalen.

Den andre halvdelen handler om tilgang. Kubeconfig inneholder klyngens certificate authority-data, API-serverens endepunkt og innloggingskonfigurasjon for datasenterets identitetsleverandør. Portaltilgang og klyngetilgang er bevisst adskilt, slik at administratorer kan opprette eller slette klynger mens klyngebrukere autentiserer mot datasenteret uten å ha rett til å slette infrastruktur.

Til slutt logger demoen inn med kubectl, lister noder og kontrollerer podder i namespace kube-system. Gjennomgangen peker ut komponenter som Cilium, CoreDNS og CSI Cinder før demoklyngen slettes.
