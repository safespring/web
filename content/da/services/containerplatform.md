---
title: "Safespring Kubernetes Engine"
section: "Platform"
sectionhighlight: ""
cardtitle: "Kubernetes"
megamenutitle: "Kubernetes"
cardintro: "Administreret kontrolplan, tydelige grænser og digital suverænitet."
cardicon: "fa-solid fa-container-storage"
cardcolor: "#3C9BCD"
cardorder: "3"
metatitle: "Kubernetes med administreret kontrolplan i Sverige og EU | Safespring Kubernetes Engine"
card: "safespring_card_12.svg"
date: 2026-04-01
draft: false
intro: "Kubernetes til organisationer, der har brug for kontrol, compliance og europæisk drift."
background: ""
sidebarlinkname: "Kontakt os"
sidebarlinkurl: "/kontakt/"
sidebarimage: "safespring-fredric.webp"
sidebartext: "Vil du tale om tjenesten? Kontakt os gerne, hvis du har spørgsmål."
sidebarphone: "+46 76-629 25 02"
sidebarmail: "hello@safespring.com"
sidebarlinkname2: "Teknisk fordybelse"
sidebarlinkurl2: "/deep-dive/forsta-safespring-kubernetes-engine-hvis-du-normalt-korer-kubernetes-selv/"
showthedate: false
banner: "blue-hover-tech"
fontawesomebundle: "containerplatform"
language: "da"
slug: "kubernetes"
aliases:
  - /tjenester/containerplatform/
  - /da/tjenester/containerplatform/
---

{{< ingress >}}
Safespring Kubernetes Engine kører containeriserede workloads på Safesprings infrastruktur i Sverige og Norge. Tjenesten omfatter selvbetjent provisionering og et administreret kontrolplan.
{{< /ingress >}}

Tjenesten bruges, når dataplacering, jurisdiktion og operationelle grænser skal være tydelige, for eksempel ved krav til GDPR, compliance og digital suverænitet.

Udviklingsteamet får et Kubernetes-miljø uden selv at drive kontrolplanet. Organisationen bevarer beslutninger om jurisdiktion, sikkerhedsprofil og platformens retning i sin egen styring.

{{< icon-block-container >}}
    {{< icon-block icon="fas fa-rocket" text="Udrul hvor som helst" link="" color="#195F8C">}}
    {{< icon-block icon="fas fa-link-slash" text="Ingen vendor lock-in" link="" color="#417DA5">}}
    {{< icon-block icon="fas fa-layer-group" text="Cloud native-teknologi" link="" color="#32CD32">}}
    {{< icon-block icon="fas fa-lock" text="Digital suverænitet" link="/gdpr/" color="#FA690F">}}
    {{< icon-block icon="fas fa-leaf" text="100% vedvarende energi" link="" color="#417DA5">}}
    {{< icon-block icon="fas fa-sliders" text="Du har kontrollen" link="" color="#3C9BCD">}}
{{< /icon-block-container >}}

{{% note "Passer det til jer?" %}}

Safespring Kubernetes Engine passer særligt godt, når I:

- vil køre Kubernetes uden selv at eje hele kontrolplanet
- har krav til GDPR, dataplacering eller digital suverænitet
- har brug for en tydeligere grænse mellem platformteams og applikationsteams
- vil undgå langsigtet indlåsning i hyperscaler-specifikke tjenester
- har brug for en nordisk partner snarere end blot en global cloudplatform
{{% /note %}}

## Når Safespring er et bedre valg end hyperscaler Kubernetes

| Behov | Safespring Kubernetes Engine |
|---|---|
| Data i Norden/EU | Drift fra Safesprings svenske og norske datacentre |
| Tydelig platformsgrænse | Administreret kontrolplan og dokumenteret ansvar |
| Mindre indlåsning | Kubernetes og åbne komponenter i stedet for proprietære økosystemer |
| Compliance-dialog | Svensk/nordisk leverandør med erfaring fra regulerede miljøer |

## Arkitektur og tjenestegrænse

Safespring Kubernetes Engine fastlægger tjenestegrænsen, før det første cluster oprettes. Safespring driver kontrolplanet. Jeres team opretter clustre i portalen og har derefter ansvaret for workloads og applikationskonfiguration i clustret. API-baseret clusterprovisionering er under udvikling.

{{< custom-card-logo image="/img/graphics/safespring-cloud.webp" logo="/img/graphics/safespring-byline-blue.svg" logoAlt="Safespring-logo" cardtitle="Hvad det betyder i praksis" >}}
Tjenesten omfatter:

- oprettelse af clustre via Safesprings portal
- API-baseret clusterprovisionering, som er under udvikling
- et administreret kontrolplan
- Talos Linux som operativsystem til noderne
- Cilium, Gateway API og Traefik-understøttelse til netværk og trafikhåndtering
- en dokumenteret fordeling mellem Safesprings platformansvar og jeres teams applikationsansvar
{{< /custom-card-logo >}}

{{< distance >}}

## Tekniske egenskaber

{{< icon-block-horisontal color="#195F8C" icon="fa-solid fa-rocket" text="Opret clustre i portalen" description="Teams opretter clustre i Safesprings portal. API-baseret clusterprovisionering er under udvikling. Safespring driver kontrolplanet som en del af tjenesten. Det reducerer det interne platformarbejde, der er nødvendigt, før et Kubernetes-miljø kan tages i brug." >}}
{{< icon-block-horisontal color="#32cd32" icon="fa-solid fa-shield-check" text="Grundlaget reducerer driftsafvigelser" description="Talos Linux giver et immutable, Kubernetes-fokuseret grundlag for noderne. OIDC-baseret adgang, Cilium-netværk og en defineret tjenestegrænse gør platformen lettere at gennemgå og drive." >}}
{{< icon-block-horisontal color="#3C9BCD" icon="fa-solid fa-arrow-up-right-dots" text="Workloads kan bruge lagring, trafikhåndtering og GPU-noder" description="Cinder CSI giver persistente volumener. Cilium Gateway API og Traefik understøtter trafikhåndtering. GPU-kompatible workernoder er tilgængelige til workloads, der har brug for dem." >}}

Tjenesten leveres fra Safesprings datacentre i Sverige og Norge og drives med 100% vedvarende energi. Den er til organisationer, der har brug for kontrol over jurisdiktion, dataplacering og leverandørafhængigheder.

## Fordyb dig før teknisk evaluering

Når du vil validere arkitektur, ansvarsfordeling og driftsmodel, er dette de mest nyttige næste skridt.

{{< manual-document-table matomoAction="Container Platform Deep Dive" >}}
  {{< manual-document-row
    title="Hvad du får fra dag ét"
    href="/deep-dive/forsta-safespring-kubernetes-engine-hvis-du-normalt-korer-kubernetes-selv/#hvad-du-far-pa-dag-et"
    icon="fa-solid fa-list-check"
    label="Deep Dives"
    description="De dokumenterede platformstandarder fra start."
  >}}
  {{< manual-document-row
    title="Tjenestegrænsen i praksis"
    href="/deep-dive/forsta-safespring-kubernetes-engine-hvis-du-normalt-korer-kubernetes-selv/#tjenestegraensen-i-praksis"
    icon="fa-solid fa-people-arrows"
    label="Deep Dives"
    description="Hvordan ansvar og operationelle grænser er fordelt mellem Safespring og jeres team."
  >}}
  {{< manual-document-row
    title="Kom i gang i den officielle dokumentation"
    href="https://docs.safespring.com/kubernetes/getting-started/"
    icon="fa-solid fa-book-open"
    label="Docs"
    description="Provisionering, kontrolplanslayouts og understøttede komponenter."
  >}}
  {{< manual-document-row
    title="Portaloversigt"
    href="https://docs.safespring.com/kubernetes/portal-overview/"
    icon="fa-solid fa-table-columns"
    label="Guide"
    description="Self-service-flowet, clusteroverblik og hvordan adgang fungerer i portalen."
  >}}
  {{< manual-document-row
    title="Persistente volumener"
    href="https://docs.safespring.com/kubernetes/persistent-volumes/"
    icon="fa-solid fa-hard-drive"
    label="Guide"
    description="Lagringsadfærd, volumetyper og tilgængelige klasser."
  >}}
  {{< manual-document-row
    title="Logging og overvågning"
    href="https://docs.safespring.com/kubernetes/security-compliance/logging-monitoring/"
    icon="fa-solid fa-chart-line"
    label="Guide"
    description="Den nuværende observability-grænse for logs, metrics og opfølgning."
  >}}
  {{< manual-document-row
    title="Trafikhåndtering"
    href="https://docs.safespring.com/kubernetes/manage-traffic/"
    icon="fa-solid fa-route"
    label="Guide"
    description="Gateway API, Traefik og hvordan trafikflow håndteres i platformen."
  >}}
{{< /manual-document-table >}}

{{< distance >}}

## Estimér et Safespring Kubernetes Engine-miljø

Brug beregneren som startpunkt for en dimensioneringsdialog. Den samler administreret kontrolplan, worker-noder og central bloklagring, før I går videre med teknisk vurdering.

{{< container-price-calculator >}}

{{< distance >}}

<div id="get-started"></div>

## Vil du se, hvordan platformen fungerer i praksis?

Kontakt os for en kort gennemgang med en cloud architect. Vi kan vise, hvordan clusters oprettes, hvordan ansvarsfordelingen ser ud, og hvordan tjenesten passer til jeres krav til drift, sikkerhed og compliance.

{{% custom-card image="/img/card/safespring-fredric.webp" cardtitle="Kontakt os" alt="Fredric Wallsten på Safespring" %}}

{{< inline "Ring" >}} [+46 76-629 25 02](tel:+46766292502)  
{{< inline "E-mail" >}} [hello@safespring.com](mailto:hello@safespring.com)
{{% /custom-card %}}
