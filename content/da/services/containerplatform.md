---
title: "Safespring On-demand Kubernetes"
section: "Platform"
sectionhighlight: ""
cardtitle: "Containers"
cardintro: "Administreret Kubernetes med kontrol, tydelige grænser og digital suverænitet."
cardicon: "fa-solid fa-container-storage"
cardcolor: "#3C9BCD"
cardorder: "3"
metatitle: "Administreret Kubernetes i Sverige og EU | Safespring On-demand Kubernetes"
card: "safespring_card_12.svg"
date: 2026-04-01
draft: false
intro: "En administreret Kubernetes-tjeneste, der kombinerer self-service-provisionering, administreret kontrolplan, moderne netværkshåndtering og digital suverænitet for organisationer, der har brug for både tempo og kontrol."
background: ""
sidebarlinkname: "Kontakt os"
sidebarlinkurl: "/kontakt/"
sidebarimage: "safespring-fredric.webp"
sidebartext: "Vil du tale om tjenesten? Kontakt os gerne, hvis du har spørgsmål."
sidebarphone: "+46 76-629 25 02"
sidebarmail: "hello@safespring.com"
sidebarlinkname2: "Teknisk fordybelse"
sidebarlinkurl2: "/blogg/2026/2026-03-what-to-compare-managed-kubernetes-vs-self-managed/"
showthedate: false
banner: "blue-hover-tech"
fontawesomebundle: "containerplatform"
language: "da"
slug: "containerplatform"
aliases:
  - /da/tjenester/containerplatform/
---

{{< ingress >}}
Safespring On-demand Kubernetes er en administreret Kubernetes-tjeneste til at køre containeriserede applikationer på Safesprings infrastruktur med self-service-provisionering og administreret kontrolplan.
{{< /ingress >}}

Tjenesten er designet til organisationer, der har brug for stærkere kontrol over dataplacering, jurisdiktion og operationelle grænser, herunder miljøer med krav til GDPR, compliance og digital suverænitet.

Den praktiske værdi er, at engineering-teams får en platform, der er klar til brug, samtidig med at organisationen bevarer kontrol over jurisdiktion, sikkerhedsprofil og langsigtet platformretning uden selv at skulle eje hvert lag af platformdriften internt.

{{< icon-block-container >}}
    {{< icon-block icon="fas fa-rocket" text="Udrul hvor som helst" link="" color="#195F8C">}}
    {{< icon-block icon="fas fa-link-slash" text="Ingen vendor lock-in" link="" color="#417DA5">}}
    {{< icon-block icon="fas fa-layer-group" text="Cloud native-teknologi" link="" color="#32CD32">}}
    {{< icon-block icon="fas fa-lock" text="Digital suverænitet" link="/gdpr/" color="#FA690F">}}
    {{< icon-block icon="fas fa-leaf" text="100% vedvarende energi" link="" color="#417DA5">}}
    {{< icon-block icon="fas fa-sliders" text="Du har kontrollen" link="" color="#3C9BCD">}}
{{< /icon-block-container >}}

## Hvorfor arkitekturen betyder noget

Den vigtigste tekniske fordel er ikke en enkelt funktion. Det er, at tjenesten er udformet som en brugbar platformsgrænse fra dag ét. Det betyder noget, fordi platformteams sjældent går i stå ved at oprette et cluster. De går i stå ved at gøre clustret konsistent, supportbart, sikkert og klart til produktion.

{{% custom-card image="/img/graphics/safespring-image.svg" cardtitle="Hvad det betyder i praksis" %}}
Arkitekturen er designet til at give jer:

- en self-service-model via portal og API i stedet for manuel clusteradministration
- en administreret kontrolplan, så teamet ikke selv skal eje alle kontrolplansspørgsmål internt
- et immutable operativsystemfundament med Talos Linux, som reducerer driftsafvigelser og angrebsflade
- en moderne netværks- og trafikmodel baseret på Cilium, Gateway API og understøttelse af Traefik
- en tydeligere ansvarsfordeling mellem det, Safespring driver, og det jeres eget team fortsat ejer
{{% /custom-card %}}

{{< distance >}}

## Tekniske fordele, forklaret enkelt

{{< icon-block-horisontal color="#195F8C" icon="fa-solid fa-rocket" text="Provisionering og kontrol er allerede defineret" description="Klynger oprettes via portal og API, og kontrolplanet er administreret som en del af tjenesten. Det forkorter tiden til produktion og reducerer mængden af platformarbejde, som jeres eget team ellers skulle gentage for hvert nyt miljø." >}}
{{< icon-block-horisontal color="#32cd32" icon="fa-solid fa-shield-check" text="Fundamentet er designet til lavere operationel risiko" description="Talos Linux giver et immutable, Kubernetes-fokuseret nodefundament, mens OIDC-baseret adgang, moderne netværkshåndtering og en tydelig tjenestegrænse gør platformen lettere at styre og lettere at forstå." >}}
{{< icon-block-horisontal color="#3C9BCD" icon="fa-solid fa-arrow-up-right-dots" text="Tjenesten understøtter reelle workloads, ikke kun clusteroprettelse" description="Persistente volumener via Cinder CSI, trafikhåndtering via Cilium Gateway API og Traefik-understøttelse samt GPU-kompatible workernoder betyder, at platformen kan bære produktionsapplikationer med forskellige kørselsbehov." >}}

Det er også her, digital suverænitet bliver praktisk i stedet for abstrakt. Platformen leveres fra Safesprings datacentre i Sverige og Norge, drives med 100% vedvarende energi og er bygget til organisationer, der ønsker stærkere kontrol over jurisdiktion, dataplacering og langsigtet uafhængighed fra hyperscaler-lock-in.

## Fordyb dig, når du vil have detaljerne

Hvis du vil forstå tjenesten mere teknisk, er dette de mest nyttige næste læsninger:

{{< manual-document-table >}}
  {{< manual-document-row
    title="Hvad du får fra dag ét"
    href="/blogg/2026/2026-03-what-to-compare-managed-kubernetes-vs-self-managed/#what-you-get-on-day-one"
    icon="fa-solid fa-list-check"
    label="Blog"
    description="De dokumenterede platformstandarder fra start."
  >}}
  {{< manual-document-row
    title="Tjenestegrænsen i praksis"
    href="/blogg/2026/2026-03-what-to-compare-managed-kubernetes-vs-self-managed/#the-service-boundary-in-practice"
    icon="fa-solid fa-people-arrows"
    label="Blog"
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
    title="Trafikhåndtering"
    href="https://docs.safespring.com/kubernetes/manage-traffic/"
    icon="fa-solid fa-route"
    label="Guide"
    description="Gateway API, Traefik og hvordan trafikflow håndteres i platformen."
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
{{< /manual-document-table >}}

{{< distance >}}

## Tal med os om jeres behov

{{% custom-card image="/img/card/safespring-fredric.webp" cardtitle="Kontakt os" alt="Fredric Wallsten på Safespring" %}}
Har du spørgsmål om, hvordan denne tjeneste kan understøtte jeres modernisering, styring, bæredygtighed eller digitale suverænitet? Kontakt os for en første dialog om behov, målbilledet og næste skridt.

{{< inline "Ring" >}} [+46 76-629 25 02](tel:+46766292502)  
{{< inline "E-mail" >}} [hello@safespring.com](mailto:hello@safespring.com)
{{% /custom-card %}}
