---
title: "Safespring Kubernetes Engine"
section: "Platform"
sectionhighlight: ""
cardtitle: "Kubernetes"
megamenutitle: "Kubernetes"
cardintro: "Administrert kontrollplan, tydelige grenser og digital suverenitet."
cardicon: "fa-solid fa-container-storage"
cardcolor: "#3C9BCD"
cardorder: "3"
metatitle: "Kubernetes med administrert kontrollplan i Sverige og EU | Safespring Kubernetes Engine"
card: "safespring_card_12.svg"
date: 2026-04-01
draft: false
intro: "Kubernetes for organisasjoner som trenger kontroll, etterlevelse og europeisk drift."
background: ""
sidebarlinkname: "Kontakt oss"
sidebarlinkurl: "/kontakt/"
sidebarimage: "safespring-fredric.webp"
sidebartext: "Vil du snakke om tjenesten? Ta gjerne kontakt hvis du har spørsmål."
sidebarphone: "+46 76-629 25 02"
sidebarmail: "hello@safespring.com"
sidebarlinkname2: "Teknisk fordypning"
sidebarlinkurl2: "/deep-dive/forsta-safespring-kubernetes-engine-hvis-du-vanligvis-kjorer-kubernetes-selv/"
showthedate: false
banner: "blue-hover-tech"
fontawesomebundle: "containerplatform"
language: "nb"
aliases:
  - /tjenester/containerplattform/
  - /no/tjenester/containerplattform/
slug: "kubernetes"
---

{{< ingress >}}
Safespring Kubernetes Engine kjører containeriserte applikasjoner på Safesprings infrastruktur i Sverige og Norge. Tjenesten inneholder selvbetjent provisjonering og et administrert kontrollplan.
{{</ ingress >}}

Tjenesten brukes når dataplacering, jurisdiksjon og operative grenser må være tydelige, for eksempel ved krav til GDPR, compliance og digital suverenitet.

Ingeniørteamet får et Kubernetes-miljø uten å drifte kontrollplanet. Virksomheten beholder beslutninger om jurisdiksjon, sikkerhetsprofil og plattformretning i egen styring.

{{< icon-block-container >}}
    {{< icon-block icon="fas fa-rocket" text="Deploy hvor som helst" link="" color="#195F8C">}}
    {{< icon-block icon="fas fa-link-slash" text="Ingen vendor lock-in" link="" color="#417DA5">}}
    {{< icon-block icon="fas fa-layer-group" text="Cloud native-teknologi" link="" color="#32CD32">}}
    {{< icon-block icon="fas fa-lock" text="Digital suverenitet" link="/gdpr/" color="#FA690F">}}
    {{< icon-block icon="fas fa-leaf" text="100% fornybar energi" link="" color="#417DA5">}}
    {{< icon-block icon="fas fa-sliders" text="Du har kontrollen" link="" color="#3C9BCD">}}
{{< /icon-block-container >}}

{{% note "Passer dette for dere?" %}}

Safespring Kubernetes Engine passer spesielt godt når dere:

- vil kjøre Kubernetes uten selv å eie hele kontrollplanet
- har krav til GDPR, dataplassering eller digital suverenitet
- trenger en tydeligere grense mellom plattformteam og applikasjonsteam
- vil unngå langsiktig innlåsing i hyperscaler-spesifikke tjenester
- trenger en nordisk partner i stedet for bare en global skyplattform
{{% /note %}}

## Når Safespring er et bedre valg enn hyperscaler Kubernetes

| Behov | Safespring Kubernetes Engine |
|---|---|
| Data innen Norden/EU | Drift fra Safesprings svenske og norske datasentre |
| Tydelig plattformgrense | Administrert kontrollplan og dokumentert ansvar |
| Mindre innlåsing | Kubernetes og åpne komponenter i stedet for proprietære økosystemer |
| Compliance-dialog | Svensk/nordisk leverandør med erfaring fra regulerte miljøer |

## Arkitektur og tjenestegrense

Safespring Kubernetes Engine setter tjenestegrensen før det første clusteret opprettes. Safespring drifter kontrollplanet. Deres team oppretter clustere i portalen og eier deretter workloads og applikasjonskonfigurasjon inne i clusteret. API-basert clusterprovisionering er under utvikling.

{{< custom-card-logo image="/img/graphics/safespring-cloud.webp" logo="/img/graphics/safespring-byline-blue.svg" logoAlt="Safespring-logo" cardtitle="Hva dette betyr i praksis" >}}
Tjenesten inneholder:

- clusteropprettelse gjennom Safesprings portal
- API-basert clusterprovisionering, som er under utvikling
- et administrert kontrollplan
- Talos Linux som operativsystem for noder
- Cilium, Gateway API og Traefik-støtte for nettverk og trafikkhåndtering
- en dokumentert ansvarsdeling mellom Safesprings plattformansvar og deres applikasjonsansvar
{{< /custom-card-logo >}}

{{< distance >}}

## Tekniske egenskaper

{{< icon-block-horisontal color="#195F8C" icon="fa-solid fa-rocket" text="Opprett clustere i portalen" description="Team oppretter clustere i Safesprings portal. API-basert clusterprovisionering er under utvikling. Safespring drifter kontrollplanet som en del av tjenesten. Det reduserer det interne plattformarbeidet som trengs før et Kubernetes-miljø kan tas i bruk." >}}
{{< icon-block-horisontal color="#32cd32" icon="fa-solid fa-shield-check" text="Fundamentet reduserer driftsavvik" description="Talos Linux gir et immutabelt, Kubernetes-fokusert nodefundament. OIDC-basert tilgang, Cilium-nettverk og en definert tjenestegrense gjør plattformen enklere å gjennomgå og drifte." >}}
{{< icon-block-horisontal color="#3C9BCD" icon="fa-solid fa-arrow-up-right-dots" text="Workloads kan bruke lagring, trafikkhåndtering og GPU-noder" description="Cinder CSI gir persistente volumer. Cilium Gateway API og Traefik støtter trafikkhåndtering. GPU-kapable workernoder finnes for workloads som trenger det." >}}

Tjenesten leveres fra Safesprings datasentre i Sverige og Norge og drives med 100% fornybar energi. Den er for virksomheter som trenger kontroll over jurisdiksjon, dataplacering og leverandøravhengigheter.

## Fordyp deg før teknisk evaluering

Når du vil validere arkitektur, ansvarsfordeling og driftsmodell, er dette de mest nyttige neste stegene.

{{< manual-document-table matomoAction="Container Platform Deep Dive" >}}
  {{< manual-document-row
    title="Hva du får fra dag én"
    href="/deep-dive/forsta-safespring-kubernetes-engine-hvis-du-vanligvis-kjorer-kubernetes-selv/#hva-du-far-pa-dag-en"
    icon="fa-solid fa-list-check"
    label="Deep Dives"
    description="De dokumenterte plattformstandardene fra start."
  >}}
  {{< manual-document-row
    title="Tjenestegrensen i praksis"
    href="/deep-dive/forsta-safespring-kubernetes-engine-hvis-du-vanligvis-kjorer-kubernetes-selv/#tjenestegrensen-i-praksis"
    icon="fa-solid fa-people-arrows"
    label="Deep Dives"
    description="Hvordan ansvar og operative grenser er fordelt mellom Safespring og teamet deres."
  >}}
  {{< manual-document-row
    title="Kom i gang i den offisielle dokumentasjonen"
    href="https://docs.safespring.com/kubernetes/getting-started/"
    icon="fa-solid fa-book-open"
    label="Docs"
    description="Provisjonering, kontrollplanoppsett og komponentstøtte."
  >}}
  {{< manual-document-row
    title="Portaloversikt"
    href="https://docs.safespring.com/kubernetes/portal-overview/"
    icon="fa-solid fa-table-columns"
    label="Guide"
    description="Selvbetjeningsflyten, clusteroversikt og hvordan tilgang fungerer i portalen."
  >}}
  {{< manual-document-row
    title="Persistente volumer"
    href="https://docs.safespring.com/kubernetes/persistent-volumes/"
    icon="fa-solid fa-hard-drive"
    label="Guide"
    description="Lagringsatferd, volumtyper og tilgjengelige klasser."
  >}}
  {{< manual-document-row
    title="Logging og overvåking"
    href="https://docs.safespring.com/kubernetes/security-compliance/logging-monitoring/"
    icon="fa-solid fa-chart-line"
    label="Guide"
    description="Den nåværende observability-grensen for logger, metrics og oppfølging."
  >}}
  {{< manual-document-row
    title="Trafikkhåndtering"
    href="https://docs.safespring.com/kubernetes/manage-traffic/"
    icon="fa-solid fa-route"
    label="Guide"
    description="Gateway API, Traefik og hvordan trafikkflyt håndteres i plattformen."
  >}}
{{< /manual-document-table >}}

{{< distance >}}

## Estimer et Safespring Kubernetes Engine-miljø

Bruk kalkulatoren som startpunkt for en dimensjoneringsdialog. Den summerer administrert kontrollplan, worker-noder og sentral blokklagring før dere går videre med teknisk vurdering.

{{< container-price-calculator >}}

{{< distance >}}

<div id="get-started"></div>

## Vil du se hvordan plattformen fungerer i praksis?

Kontakt oss for en kort gjennomgang med en cloud architect. Vi kan vise hvordan cluster opprettes, hvordan ansvarsfordelingen ser ut, og hvordan tjenesten passer kravene deres til drift, sikkerhet og compliance.

{{% custom-card image="/img/card/safespring-fredric.webp" cardtitle="Kontakt oss" alt="Fredric Wallsten på Safespring" %}}

{{< inline "Ring" >}} [+46 76-629 25 02](tel:+46766292502)  
{{< inline "E-post" >}} [hello@safespring.com](mailto:hello@safespring.com)
{{% /custom-card %}}
