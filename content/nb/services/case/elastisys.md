---
ai: true
title: "Elastisys bygger Welkin på Safespring Compute"
language: "nb"
date: 2023-09-18
draft: false
section: "Brukercase"
intro: "Welkin er Elastisys' Kubernetes-plattform for miljøer der sikkerhet, sporbarhet og etterlevelse må kunne vurderes. På Safespring Compute kjører den på nordisk IaaS."
background: "/safespring-elastisys.svg"
card: ""
socialmedia: ""
sidebarlinkname: ""
sidebarlinkurl: ""
sidebarlinkname2: ""
sidebarlinkurl2: ""
sidebarsection: ""
sidebarimage: "saas_elastisys.svg"
sidebartext: "Safespring leverer IaaS-laget: compute, lagring, nettverk og datasenterplassering. Elastisys drifter Welkin-laget oppå og har ansvar for kundenes Kubernetes-plattform."
saas: ""
sidebarwhitepaper: ""
service: "Safespring Compute"
aliases:
  - /no/tjenester/case/elastisys/
  - /losningsfaktablad/welkin-hos-safespring/
  - /solution-brief/compliant-kubernetes/
---

{{< ingress >}}
Denne siden viser hvordan ansvaret fordeles når Welkin kjører på Safespring Compute. Kunden bygger sin tjeneste på Elastisys' Kubernetes-plattform, mens Safespring har ansvar for den underliggende infrastrukturen.
{{< /ingress >}}

I løsningen leverer Safespring Compute-infrastrukturen, datasenterplasseringen, lagringen og nettverket. Elastisys drifter Kubernetes-plattformen og kundevendte tjenester. Det gjør at leverandørkjeden kan beskrives med avgrenset ansvar for hver part.

![Ansvarsfordeling mellom kunde, Elastisys og Safespring](/img/saas/elastisys-safespring-compliant-kubernetes-pyramid.svg)

_Bildet viser ansvarsfordelingen. Safespring leverer infrastrukturen, Elastisys drifter Welkin-laget og kunden har ansvar for tjeneste og team._

## Hva er Welkin?

Welkin er en Kubernetes-plattform fra Elastisys for organisasjoner som vil kjøre containeriserte applikasjoner i miljøer der sikkerhet, sporbarhet og etterlevelse må være med fra starten. Plattformen bygger på Kubernetes og open source-komponenter og inkluderer drift, sikkerhetsherding, monitorering og livssyklushåndtering.

For kundene betyr det at de kan bygge og drifte applikasjoner uten selv å måtte eie hele Kubernetes-stacken. Welkin brukes i sammenhenger der spørsmål om GDPR, pasientdata, revisjoner, tilgangskontroll og leverandørrisiko må kunne besvares.

Welkin er CNCF-sertifisert som Kubernetes-distribusjon og inneholder kontroller for sikkerhet i containeriserte miljøer. Eksempler er inntrengingsdeteksjon med Falco, policykontroll med Open Policy Agent/Gatekeeper, automatisk sertifikathåndtering med cert-manager, containerregister med sikkerhetsskanning og støtte for CI/CD-flyter som ArgoCD.

I en sikkerhetsgjennomgang må det derfor være mulig å følge hvordan nettverkssegmentering, rollebasert tilgang, hemmelighetshåndtering, sårbarhetsskanning, logging og oppdateringer håndteres. Kontrollene må kunne dokumenteres i den løpende driften, ikke bare når klyngen tas i bruk.

Den vanskelige delen er ikke bare å starte en Kubernetes-klynge, men å drifte den med reelle arbeidslaster over tid. For regulerte miljøer må plattformen håndtere oppgraderinger, testing, patching, CVE-oppfølging, backup og støttetjenester for logging og monitorering uten at ansvarsfordelingen blir uklar.

Det gjør at Welkin kan brukes gjennom hele programvarelivssyklusen: utvikling, pakking, test, utrulling, drift og revisjon. Safesprings rolle er å gi den lokale Compute-infrastrukturen, datasenterplasseringen, lagringen og nettverket som plattformen kan kjøre på.

## Hvordan Elastisys bruker Safespring

Safespring Compute gir Elastisys infrastrukturen Welkin trenger for svenske og nordiske kunder. Det handler om virtuelle servere, lagring, nettverk, datasenterplassering og tilgang til en skyplattform som bygger på åpne standarder.

Elastisys kan konsentrere arbeidet om Kubernetes-plattformen, sikkerhetskontrollene, driftsmodellen og kundenes applikasjonsmiljøer. Safespring står for den lokale infrastrukturbasen og kan levere underlag i spørsmål som ofte kommer opp i anbud, sikkerhetsgjennomganger og tekniske vurderinger.

For sluttkunden blir leverandørkjeden enklere å beskrive. Applikasjonene kjører på en Kubernetes-plattform fra Elastisys, på Safesprings nordiske IaaS-infrastruktur. Kunden kan se hvor data behandles, hvilke leverandører som inngår og hvilken del av driften hver part har ansvar for.

## Hvorfor infrastrukturen spiller en rolle

For selskaper som bygger egne plattformer, SaaS-tjenester eller tjenester for regulerte bransjer, må infrastrukturen kunne beskrives for kunder, jurister, sikkerhetsteam og innkjøpere.

Når produktet håndterer sensitive data, kommer spørsmål om dataplassering, tredjelandsrisiko, supportveier, tilgang, avtaler og underleverandører ofte opp før avtale eller produksjonsstart. En lokal infrastrukturbas reduserer ikke behovet for eget sikkerhetsarbeid, men den gir konkrete opplysninger som kan brukes når slike spørsmål skal besvares.

For Elastisys er Safespring en måte å tilby Welkin på en infrastruktur som passer kunder som vil ha europeisk drift, åpne tekniske grensesnitt og en nordisk leverandør med erfaring fra regulerte miljøer.

{{% note "Når denne modellen er relevant" %}}

Dette oppsettet er relevant for selskaper som:

- bygger en egen plattform eller SaaS-tjeneste på skyinfrastruktur
- selger til kunder som vurderer dataplassering, jurisdiksjon og underleverandører
- trenger Kubernetes og open source-komponenter uten å låse produktet til et hyperscaler-økosystem
- må svare på spørsmål fra offentlig sektor, medtech, healthtech, finans eller andre regulerte miljøer
- trenger en infrastrukturpartner som kan delta i tekniske og sikkerhetsrelaterte spørsmål når salgsprosessen krever det

{{% /note %}}

## Hva Safespring bidrar med

Safespring er ikke en erstatning for Elastisys' produkt. Vårt bidrag er infrastrukturen Welkin kjører på. Det omfatter Safespring Compute, lagring, nettverk, nordisk datasenterplassering og en arbeidsmåte der tekniske spørsmål kan håndteres tett på teamene som bygger tjenesten.

{{< icon-block-horisontal color="#195F8C" icon="fa-solid fa-layer-group" text="En infrastrukturbas som kan forklares" description="Compute, lagring, nettverk og datasenterplassering er tydelig avgrenset fra Kubernetes-plattformen. Det gjør ansvarsfordelingen enklere å beskrive for kunder, revisorer og sikkerhetsteam." >}}
{{< icon-block-horisontal color="#32cd32" icon="fa-solid fa-location-dot" text="Nordisk drift for sensitive tjenester" description="Safespring gir et lokalt IaaS-grunnlag for kunder som trenger kontroll over hvor data behandles, hvilken jurisdiksjon som gjelder og hvilke leverandører som inngår i kjeden." >}}
{{< icon-block-horisontal color="#3C9BCD" icon="fa-solid fa-code-branch" text="Kubernetes og open source-komponenter" description="Welkin bygger på Kubernetes og open source-komponenter på Safespring Compute. Tjenesten trenger ikke å bygges på leverandørspesifikke skytjenester." >}}

Dette er relevant også for andre plattformselskaper. Hvis dere bygger en plattform for kunder med dokumentasjons- og granskningskrav, må infrastrukturdelen kunne beskrives som en del av tilbudet deres.

## Bygger dere en tjeneste som ligner Welkin?

Hvis dere utvikler en plattform, SaaS-tjeneste eller et produkt for regulerte kunder, må infrastrukturen kunne granskes og beskrives. Safespring Compute kan brukes når dere trenger å kombinere skyinfrastruktur med dataplassering i Norden, åpne standarder og en nordisk leverandør.

Snakk med oss om målbildet deres, kundekravene og hvilken del av infrastrukturen dere vil eie selv. Da kan vi gå gjennom om Safespring Compute passer for produktet deres, og hvordan ansvaret mellom dere, Safespring og eventuelle plattformspartnere bør beskrives.

{{% custom-card image="/img/card/safespring-fredric.webp" cardtitle="Fredric Wallsten" %}}
Kontakt meg hvis dere vil diskutere infrastruktur for tjenesten deres.

{{< inline "Ring" >}} [+46 76-629 25 02](tel:+46766292502)

{{< inline "E-post" >}} [hello@safespring.com](mailto:hello@safespring.com)
{{% /custom-card %}}
