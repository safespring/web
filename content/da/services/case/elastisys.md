---
ai: true
title: "Elastisys bygger Welkin på Safespring Compute"
language: "da"
date: 2023-09-18
draft: false
section: "Anvendelsestilfælde"
intro: "Welkin er Elastisys' Kubernetes-platform til miljøer, hvor sikkerhed, sporbarhed og compliance skal kunne gennemgås. På Safespring Compute kører den oven på nordisk IaaS."
background: "/safespring-elastisys.svg"
card: ""
socialmedia: ""
sidebarlinkname: ""
sidebarlinkurl: ""
sidebarlinkname2: ""
sidebarlinkurl2: ""
sidebarsection: ""
sidebarimage: "saas_elastisys.svg"
sidebartext: "Safespring leverer IaaS-laget: compute, lagring, netværk og datacenterplacering. Elastisys driver Welkin-laget ovenpå og har ansvar for kundernes Kubernetes-platform."
service: "Safespring Compute"
saas: ""
sidebarwhitepaper: ""
aliases:
  - /en/services/case/elastisys/
  - /losningsfaktablad/welkin-hos-safespring/
  - /solution-brief/compliant-kubernetes/
---

{{< ingress >}}
Denne side viser, hvordan ansvaret fordeles, når Welkin kører på Safespring Compute. Kunden bygger sin tjeneste oven på Elastisys' Kubernetes-platform, mens Safespring har ansvar for den underliggende infrastruktur.
{{< /ingress >}}

I løsningen leverer Safespring Compute-infrastrukturen, datacenterplaceringen, lagringen og netværket. Elastisys driver Kubernetes-platformen og de kundevendte tjenester. Det gør leverandørkæden mulig at beskrive med afgrænset ansvar for hver part.

![Ansvarsfordeling mellem kunde, Elastisys og Safespring](/img/saas/elastisys-safespring-compliant-kubernetes-pyramid.svg)

_Billedet viser ansvarsfordelingen. Safespring leverer infrastrukturen, Elastisys driver Welkin-laget, og kunden har ansvar for tjeneste og team._

## Hvad er Welkin?

Welkin er en Kubernetes-platform fra Elastisys til organisationer, der vil køre containeriserede applikationer i miljøer, hvor sikkerhed, sporbarhed og compliance skal være med fra starten. Platformen bygger på Kubernetes og open source-komponenter og omfatter drift, sikkerhedshærdning, monitorering og livscyklushåndtering.

For kunderne betyder det, at de kan bygge og driftsætte applikationer uden selv at skulle eje hele Kubernetes-stakken. Welkin bruges i sammenhænge, hvor spørgsmål om GDPR, patientdata, revisioner, adgangskontrol og leverandørrisiko skal kunne besvares.

Welkin er CNCF-certificeret som Kubernetes-distribution og indeholder kontroller for sikkerhed i containeriserede miljøer. Eksempler er indbrudsdetektering med Falco, policykontrol med Open Policy Agent/Gatekeeper, automatisk certifikathåndtering med cert-manager, containerregister med sikkerhedsscanning og støtte til CI/CD-flow som ArgoCD.

I en sikkerhedsgennemgang skal det derfor være muligt at følge, hvordan netværkssegmentering, rollebaseret adgang, håndtering af hemmeligheder, sårbarhedsscanning, logning og opdateringer håndteres. Kontrollerne skal kunne dokumenteres i den løbende drift, ikke kun når klyngen tages i brug.

Den svære del er ikke kun at starte en Kubernetes-klynge, men at drive den med reelle workloads over tid. For regulerede miljøer skal platformen håndtere opgraderinger, test, patching, CVE-opfølgning, backup og støttetjenester til logging og monitorering uden at gøre ansvarsfordelingen uklar.

Det betyder, at Welkin kan bruges gennem hele softwarelivscyklussen: udvikling, pakning, test, udrulning, drift og revision. Safesprings rolle er at levere den lokale Compute-infrastruktur, datacenterplaceringen, lagringen og netværket, som platformen kan køre på.

## Hvordan Elastisys bruger Safespring

Safespring Compute giver Elastisys den infrastruktur, som Welkin har brug for til svenske og nordiske kunder. Det handler om virtuelle servere, lagring, netværk, datacenterplacering og adgang til en cloudplatform, der bygger på åbne standarder.

Elastisys kan lægge sit arbejde på Kubernetes-platformen, sikkerhedskontrollerne, driftsmodellen og kundernes applikationsmiljøer. Safespring står for den lokale infrastrukturbasis og kan levere materiale til spørgsmål, der ofte kommer op i udbud, sikkerhedsgennemgange og tekniske vurderinger.

For slutkunden bliver leverandørkæden enklere at beskrive. Applikationerne kører på en Kubernetes-platform fra Elastisys, oven på Safesprings nordiske IaaS-infrastruktur. Kunden kan se, hvor data behandles, hvilke leverandører der indgår, og hvilken del af driften hver part har ansvar for.

## Hvorfor infrastrukturen spiller en rolle

For virksomheder, der bygger egne platforme, SaaS-tjenester eller tjenester til regulerede brancher, skal infrastrukturen kunne beskrives for kunder, jurister, sikkerhedsteam og indkøbere.

Når produktet håndterer følsomme data, kommer spørgsmål om dataplacering, tredjelandsrisici, supportveje, adgang, aftaler og underleverandører ofte op før aftale eller produktionsstart. En lokal infrastrukturbasis reducerer ikke behovet for eget sikkerhedsarbejde, men den giver konkrete oplysninger, der kan bruges, når sådanne spørgsmål skal besvares.

For Elastisys er Safespring en måde at tilbyde Welkin på en infrastruktur, der passer til kunder, som vil have europæisk drift, åbne tekniske grænseflader og en nordisk leverandør med erfaring fra regulerede miljøer.

{{% note "Når denne model er relevant" %}}

Dette setup er relevant for virksomheder, der:

- bygger en egen platform eller SaaS-tjeneste oven på cloudinfrastruktur
- sælger til kunder, der vurderer dataplacering, jurisdiktion og underleverandører
- har brug for Kubernetes og open source-komponenter uden at låse produktet til et hyperscaler-økosystem
- skal svare på spørgsmål fra offentlig sektor, medtech, healthtech, finans eller andre regulerede miljøer
- har brug for en infrastrukturpartner, der kan deltage i tekniske og sikkerhedsrelaterede spørgsmål, når salgsprocessen kræver det

{{% /note %}}

## Hvad Safespring bidrager med

Safespring er ikke en erstatning for Elastisys' produkt. Vores bidrag er infrastrukturen, som Welkin kører på. Det omfatter Safespring Compute, lagring, netværk, nordisk datacenterplacering og en arbejdsform, hvor tekniske spørgsmål kan håndteres tæt på de teams, der bygger tjenesten.

{{< icon-block-horisontal color="#195F8C" icon="fa-solid fa-layer-group" text="En infrastrukturbasis, der kan forklares" description="Compute, lagring, netværk og datacenterplacering er tydeligt afgrænset fra Kubernetes-platformen. Det gør ansvarsfordelingen lettere at beskrive for kunder, revisorer og sikkerhedsteam." >}}
{{< icon-block-horisontal color="#32cd32" icon="fa-solid fa-location-dot" text="Nordisk drift til følsomme tjenester" description="Safespring giver et lokalt IaaS-grundlag til kunder, der har brug for kontrol over, hvor data behandles, hvilken jurisdiktion der gælder, og hvilke leverandører der indgår i kæden." >}}
{{< icon-block-horisontal color="#3C9BCD" icon="fa-solid fa-code-branch" text="Kubernetes og open source-komponenter" description="Welkin bygger på Kubernetes og open source-komponenter oven på Safespring Compute. Tjenesten behøver ikke at blive bygget på leverandørspecifikke cloudtjenester." >}}

Det er også relevant for andre platformsvirksomheder. Hvis I bygger en platform til kunder med dokumentations- og granskningskrav, skal infrastrukturdelen kunne beskrives som en del af jeres tilbud.

## Bygger I en tjeneste, der ligner Welkin?

Hvis I udvikler en platform, SaaS-tjeneste eller et produkt til regulerede kunder, skal infrastrukturen kunne granskes og beskrives. Safespring Compute kan bruges, når I skal kombinere cloudinfrastruktur med dataplacering i Norden, åbne standarder og en nordisk leverandør.

Tal med os om jeres mål, kundekrav og hvilken del af infrastrukturen I selv vil eje. Så kan vi gennemgå, om Safespring Compute passer til jeres produkt, og hvordan ansvaret mellem jer, Safespring og eventuelle platformspartnere bør beskrives.

{{% custom-card image="/img/card/safespring-fredric.webp" cardtitle="Fredric Wallsten" %}}
Kontakt mig, hvis I vil diskutere infrastruktur til jeres tjeneste.

{{< inline "Ring" >}} [+46 76-629 25 02](tel:+46766292502)

{{< inline "E-mail" >}} [hello@safespring.com](mailto:hello@safespring.com)
{{% /custom-card %}}
