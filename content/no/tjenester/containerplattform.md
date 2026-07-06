---
title: "Safespring Kubernetes Engine"
section: "Platform"
sectionhighlight: ""
cardtitle: "Kubernetes"
cardintro: "Administrert kontrollplan, tydelige grenser og digital suverenitet."
cardicon: "fa-solid fa-container-storage"
cardcolor: "#3C9BCD"
cardorder: "3"
metatitle: "Kubernetes med administrert kontrollplan i Sverige og EU | Safespring Kubernetes Engine"
card: "safespring_card_12.svg"
date: 2026-04-01
draft: false
intro: "En Kubernetes-tjeneste som kombinerer selvbetjent provisjonering, administrert kontrollplan, moderne nettverkshåndtering og digital suverenitet for virksomheter som trenger både fart og kontroll."
background: ""
sidebarlinkname: "Kontakt oss"
sidebarlinkurl: "/no/kontakt/"
sidebarimage: "safespring-fredric.webp"
sidebartext: "Vil du snakke om tjenesten? Ta gjerne kontakt hvis du har spørsmål."
sidebarphone: "+46 76-629 25 02"
sidebarmail: "hello@safespring.com"
sidebarlinkname2: "Teknisk fordypning"
sidebarlinkurl2: "/blogg/2026/2026-03-what-to-compare-managed-kubernetes-vs-self-managed/"
showthedate: false
banner: "blue-hover-tech"
fontawesomebundle: "containerplatform"
language: "No"
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
    {{< icon-block icon="fas fa-lock" text="Digital suverenitet" link="/no/gdpr/" color="#FA690F">}}
    {{< icon-block icon="fas fa-leaf" text="100% fornybar energi" link="" color="#417DA5">}}
    {{< icon-block icon="fas fa-sliders" text="Du har kontrollen" link="" color="#3C9BCD">}}
{{< /icon-block-container >}}

## Arkitektur og tjenestegrense

Safespring Kubernetes Engine setter tjenestegrensen før det første clusteret opprettes. Safespring drifter kontrollplanet. Deres team oppretter clustere i portalen og eier deretter workloads og applikasjonskonfigurasjon inne i clusteret. API-basert clusterprovisionering er under utvikling.

{{% custom-card image="/img/graphics/safespring-image.svg" cardtitle="Hva dette betyr i praksis" %}}
Tjenesten inneholder:

- clusteropprettelse gjennom Safesprings portal
- API-basert clusterprovisionering, som er under utvikling
- et administrert kontrollplan
- Talos Linux som operativsystem for noder
- Cilium, Gateway API og Traefik-støtte for nettverk og trafikkhåndtering
- en dokumentert ansvarsdeling mellom Safesprings plattformansvar og deres applikasjonsansvar
{{% /custom-card %}}

{{< distance >}}

## Tekniske egenskaper

{{< icon-block-horisontal color="#195F8C" icon="fa-solid fa-rocket" text="Opprett clustere i portalen" description="Team oppretter clustere i Safesprings portal. API-basert clusterprovisionering er under utvikling. Safespring drifter kontrollplanet som en del av tjenesten. Det reduserer det interne plattformarbeidet som trengs før et Kubernetes-miljø kan tas i bruk." >}}
{{< icon-block-horisontal color="#32cd32" icon="fa-solid fa-shield-check" text="Fundamentet reduserer driftsavvik" description="Talos Linux gir et immutabelt, Kubernetes-fokusert nodefundament. OIDC-basert tilgang, Cilium-nettverk og en definert tjenestegrense gjør plattformen enklere å gjennomgå og drifte." >}}
{{< icon-block-horisontal color="#3C9BCD" icon="fa-solid fa-arrow-up-right-dots" text="Workloads kan bruke lagring, trafikkhåndtering og GPU-noder" description="Cinder CSI gir persistente volumer. Cilium Gateway API og Traefik støtter trafikkhåndtering. GPU-kapable workernoder finnes for workloads som trenger det." >}}

Tjenesten leveres fra Safesprings datasentre i Sverige og Norge og drives med 100% fornybar energi. Den er for virksomheter som trenger kontroll over jurisdiksjon, dataplacering og leverandøravhengigheter.

## Fordyp deg når du vil ha detaljene

Hvis du vil forstå tjenesten mer teknisk, er dette de mest nyttige neste lesningene:

- [Hva du får fra dag én](/blogg/2026/2026-03-what-to-compare-managed-kubernetes-vs-self-managed/#what-you-get-on-day-one) for de dokumenterte plattformstandardene
- [Tjenestegrensen i praksis](/blogg/2026/2026-03-what-to-compare-managed-kubernetes-vs-self-managed/#the-service-boundary-in-practice) for ansvarsdelingen
- [Kom i gang i den offisielle dokumentasjonen](https://docs.safespring.com/kubernetes/getting-started/) for provisjonering, kontrollplanoppsett og komponentstøtte
- [Trafikkhåndtering](https://docs.safespring.com/kubernetes/manage-traffic/) for Gateway API og Traefik-relaterte trafikkmønstre
- [Portaloversikt](https://docs.safespring.com/kubernetes/portal-overview/) for selvbetjeningsflyten og clustertilgang
- [Persistente volumer](https://docs.safespring.com/kubernetes/persistent-volumes/) for lagringsatferd og klasser
- [Logging og overvåking](https://docs.safespring.com/kubernetes/security-compliance/logging-monitoring/) for dagens observability-grense

{{< distance >}}

## Snakk med oss om deres behov

{{% custom-card image="/img/card/safespring-fredric.webp" cardtitle="Kontakt oss" alt="Fredric Wallsten på Safespring" %}}
Har du spørsmål om hvordan denne tjenesten kan støtte modernisering, styring, bærekraft eller digital suverenitet? Kontakt oss for en første samtale om behov, målbildet og neste steg.

{{< inline "Ring" >}} [+46 76-629 25 02](tel:+46766292502)  
{{< inline "E-post" >}} [hello@safespring.com](mailto:hello@safespring.com)
{{% /custom-card %}}
