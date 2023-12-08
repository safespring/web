---
title: "En fleksibel og sikker skyløsning for forskning innen livsvitenskap "
language: "No"
date: 2023-06-01
draft: false
darkmode: "off"
section: "Brukercase"
intro: "Les om Safesprings leveranse av en skybasert compute- og lagringstjeneste til SciLifeLab, Sveriges største forskningsinfrastruktur for life science. Tjenesten støtter SciLifeLabs behov for integrasjon med høyteknologiske analysemetoder, håndtering av store mengder forskningsdata og tverrfaglige samarbeid."
background: "/safespring-scilifelab.webp"
card: ""
socialmedia: ""
sidebarlinkname: ""
sidebarlinkurl: ""
sidebarlinkname2: ""
sidebarlinkurl2: ""
sidebarsection: ""
sidebarimage: "scilifelab.svg"
saas: ""
sidebarwhitepaper: ""
service: "Safespring Private Cloud"
aliases:
toc: "I denne artikkelen"
---

##

{{< ingress >}}

Safespring leverer en skybasert compute- og lagringstjeneste til SciLifeLab, den største nasjonale forskningsinfrastrukturen for livsvitenskap i Sverige.

{{< /ingress >}}

Safesprings virtuelle maskiner og lagring kan automatiseres gjennom API. Dette gir SciLifeLab fleksibiliteten til å tilpasse ressursene på ethvert gitt tidspunkt, og optimalisere kostnader og ytelse i sanntid.

SciLifeLab har høye krav til ytelse og nettverk samt lagring og sikkerhet for å møte deres spesifikke behov. Safespring samarbeider med SciLifeLab for å levere en fleksibel og dynamisk infrastruktur som er lett å bruke for vanlige forskere.

{{% accordion title="Ytelse og nettverk" id="prestanda" %}}

Safespring tilbyr en rekke forskjellige compute-flavors på en fleksibel IaaS-plattform som enkelt kan tilpasses etter kundenes krav. Compute-flavors strekker seg fra 1 vCPU til 128 vCPU og RAM fra 1 GB til 256 GB. Safespring har også mulighet til å legge til nye compute-flavors etter hvert som kundenes krav endrer seg over tid.

For å forbedre ytelse og stabilitet  nettverket benytter Safespring Calico nettverksplugin for OpenStack, noe som gir førsteklasses separasjon mellom kundens infrastrukturer og reduserer belastningen på nettverket. Dette øker også sikkerheten for sensitive data som ofte brukes innen bioinformatikk.

Calico gjør det mulig å håndtere all nettverkstrafikk på lag 3 ved hjelp av den veletablerte BGP-protokollen, som også benyttes til å gjøre kjernen av internett robust og redundant. Dette reduserer belastningen og kompleksiteten sammenlignet med tradisjonell lag 2-bridging og gir optimal nettverksytelse. Safespring tilbyr også security groups (virtuelle brannmurregler) som kan benyttes til å styre nettverkstilgang mot grupper av kundens compute instanser, noe som igjen er et lag i perimeter-sikringen av kundens data.

{{% /accordion %}}

{{% accordion title="Lagring og sikkerhet" id="sakerhet" %}}

Safespring leverer skybasert lagring for å møte SciLifeLabs behov for høy lagringskapasitet for deres datahåndterings- og AI-modellhåndteringssystemer modelleringssystemer. Safespring bruker S3 objektlagring som standard for å muliggjøre lagring av store mengder data i et skalerbart og sikkert miljø. SciLifeLab bruker også Safesprings lagring som en byggestein for å bygge forskningsmiljøer.

Safespring opprettholder en detaljert tjenestebasert SLA og overvåker teknisk ytelse og tjenestenivåer for sine systemer og tjenester 24/7. Safespring bruker Dev(Sec)Ops-metodikk samt ITIL4-kompatible prosesser, prosedyrer, oppgaver og sjekklister for å oppnå dette. All overvåknings- og tjenesteanalyse data er transparent og tilgjengelig for kunden på forespørsel.

Safespring svarer raskt på alle support henvendelser, noe som sikrer at forskere kan utføre sine arbeidsoppgaver uten distraksjon. Safespring gir regelmessige rapporter til kundene om deres nåværende tekniske leveransestatus mot SLA og om utviklingen av nye/oppdaterte tjenestefunksjoner.

{{% /accordion %}}

{{< distance >}}

## Forskning som utføres på Safesprings skyplattform

{{< ingress >}}
SciLifeLab har flere forskningsprogrammer som er avhengige av høy-ytelse databehandling og lagring av store datamengder for å bygge egne forskningsplattformer på Safesprings elastiske infrastruktur. 
{{< /ingress >}}

Safesprings compute tjeneste gjør også at forskerne selv kan be om ressurser på en enkel måte og tilfredsstille deres spesifikke behov for å drive forskningsprosjektene sine på en effektiv måte.

To store forskningsmiljøer og plattformer som SciLifeLab bygger på Safesprings infrastruktur er datadelingsprosjektet DDS og AI-prosjektet Bigpicture.

{{% accordion title="Datadelingsprosjektet DDS" %}}

DDS står for Data Delivery System og er en sentral løsning for SciLifeLab som en kompleks infrastruktur som produserer forskningsdata. Det er en enhetlig transportløsning for å levere life-science data fra data-produserende tekniske plattformer, slik som DNA-sekvensering, avbildning og proteomikk, til forskere over hele Sverige. DDS utnytter Safesprings virtuelle maskiner og lagringsløsninger for å håndtere flyten av data mellom produsenter og forskere, og forventes å nå 3 petabyte i 2023.

[Les mer om DDS](https://delivery.scilifelab.se/)

{{% /accordion %}}

{{% accordion title="AI-prosjektet BigPicture" %}}

BigPicture er et Horizon2020-prosjekt der SciLifeLab og ELIXIR-SE har gått sammen med mange andre europeiske partnere for å levere et patologidata-repository. BigPicture er designet for å støtte utviklingen av kunstig intelligens innen livsvitenskap.

Safesprings compute- og lagringstjenester utgjør en nøkkelkomponent i dette prosjektet ved å muliggjøre etableringen av en skalerbar infrastruktur som møter prosjektets krav til datahåndtering og ytelse. SciLifeLab har kunnet utvikle BigPicture-prosjektet på en rask måte ved hjelp av Safespring.

[Les mer om BigPicture](https://bigpicture.eu/)

{{% /accordion %}}

### Relevant for EOSC

EOSC står for European Open Science Cloud og er en planlagt skybasert plattform som sikter på å gi forskere og andre brukere enkel og sikker tilgang til forskningsdata, verktøy og infrastruktur over hele Europa.

Safesprings tjenester støtter SciLifeLabs prosjekter for å levere livsvitenskap til forskere over hele Sverige. Forskere kan bruke virtuelle maskiner og lagring direkte, samt bygge virtuelle forskningsmiljøer på SciLifeLab. Safespring har også nylig begynt å utvikle [GPU](#gpu)-støttede virtuelle maskiner for Protein Folding og analyse av bildedata.

EOSC-plattformen vil lette samarbeid og deling av data mellom forskere og institusjoner i forskjellige land og disipliner, noe som forventes å føre til økt innovasjon og oppdagelse av nye innsikter. EOSC vil bestå av forskjellige tjenester og verktøy som leveres av både offentlige og private organisasjoner, og vil følge prinsippene om FAIR (Findable, Accessible, Interoperable, Reusable) datahåndtering. EOSC forventes å være fullt operativt i 2025.

{{% accordion title="Hva er en GPU?" id="gpu"%}}

GPU står for Graphics Processing Unit og er en prosessor som er spesialdesignet for å håndtere grafikkintensive oppgaver, som for eksempel dataspill og bilde- eller videoredigering, men benyttes også til andre prosesserings-intensive oppgaver.

I denne sammenhengen brukes GPUer for Protein Folding og analyse av bildedata innen forskning.

{{% /accordion %}}

## Strategiske mål

{{< ingress >}}

Safespring og SciLifeLab har sammen laget en plan for tjenesteleveranse gjennom flere runder med tilpasninger for å finjustere tjenesten og møte SciLifeLabs spesifikke behov.

{{< /ingress >}}

### Digital suverenitet

Safespring tilbyr en rekke fordeler som gjør det til en pålitelig skytjenesteleverandør for overholdelse av sikkerhets- og personvernstandarder og tilbyr grensesnitt basert på åpne standarder og digital suverenitet. I dette avsnittet vil vi se nærmere på disse tre aspektene og forklare hvorfor Safespring er en sikker partner for organisasjoner som ønsker en skytjenesteleverandør som kan håndtere deres behov på en pålitelig måte. Vi vil se nærmere på Safesprings engasjement for å følge regelverk som er relevante for skytjenester.

{{% accordion title="Compliance" %}}

Safespring er en skytjenesteleverandør som er klar over viktigheten av å oppfylle regler og standarder for å beskytte kundenes data og sikkerhet. Ved å følge regler og standarder sørger Safespring for at deres skytjenester oppfyller kundense krav til sikkerhet og personvern. Safespring er også en del av det europeiske Gaia-X-initiativet, som er en sammenslutning (federation) av tjenestetilbydere innenfor europeisk skyinfrastruktur som binder sammen disse og arbeider for europeisk digital suverenitet. Ved å bruke Safesprings skytjenester kan forskere være trygge på at deres data lagres og håndteres i samsvar med kunders behov for sikkerhet, personvern og digital suverenitet.

{{% /accordion %}}

{{% accordion title="Åpne standarder" %}}

Safespring støtter og benytter åpne standarder (fri programvare) som OpenStack og Kubernetes, noe som sørger for at skytjenester bygges som åpne, skalerbare og kompatible med andre skyplattformer og teknologier. Åpne standarder gir også forskere fleksibilitet og valgfrihet i å velge teknologi som passer deres spesifikke forskningsbehov og øker sannsynligheten for kompabilitet med eksisterende tjenester og data.

{{% /accordion %}}

{{% accordion title="Digital suverenitet" %}}

Safespring er en nordisk skytjenesteleverandør, med datasentre i Sverige og Norge, som ikke er påvirket av amerikansk lovgivning som FISA 702 og CLOUD Act. Dette betyr at Safespring ikke trenger å dele kundenes data med amerikanske myndigheter, og kunden beholder full kontroll over sin data og informasjon. I tillegg er Safespring en del av det europeiske Gaia-X-initiativet, en samling tjenestetilbyder som arbeider for europeisk digital suverenitet og selvbestemmelse over datahåndtering. Ved å bruke Safesprings skytjenester kan forskere sikre at deres data er sikre og beskyttet mot overvåkning og inntrengning.

{{% /accordion %}}

### Kontinuerlig forbedring

For å håndtere forholdet til SciLifeLab og sikre at deres forretningsbehov blir møtt og at servicenivåene overholdes, har Safespring og SciLifeLab regelmessige driftsmøter der de diskuterer åpne saker, nye funksjoner og funksjonelle forbedringer, utnyttelse av tjenester, planlagte prosjekter og andre forretningsrelaterte spørsmål. Disse møtene muliggjør god kvalitet i levering av skytjenester og gir Safespring mulighet til å samarbeide med SciLifeLab for å identifisere og planlegge tekniske endringsforespørsler som støtter deres forretningsbehov.

Safespring har også en prosess for å kontinuerlig forbedre våre tjenester og servicenivåer ved å lære fra hendelser og identifisere og implementere muligheter for forbedring. 

## Alle tjenestene er kjøpt inn gjennom rammeavtaler

{{< ingress >}}

Safespring har en rammeavtale gjennom Open Clouds for Research Environments (OCRE) som forsknings- og utdanningsinstitusjoner i hele Europa kan benytte seg av.

{{< /ingress >}}

SciLifeLab kjøper tjenester fra Safespring gjennom Sunet og gjennom OCRE-avtalen. Safespring er direkte koblet til Sunets nettverk, noe som gir høy tilgjengelighet og rask tilkobling.

Et av hovedmålene med OCRE er å forenkle og standardisere prosessen for å skaffe skytjenester, noe som igjen kan føre til økt produktivitet og effektivitet innen forskningssamfunnet. Ved å tilby en enkelt portal for forskere for å få tilgang til skytjenester, sikter OCRE mot å gjøre det enklere for forskere å bruke disse tjenestene i sin forskning.

{{% accordion title="Hva er OCRE?" id="ocre"%}}

Open Clouds for Research Environments (OCRE) er et EU-finansiert prosjekt som har som mål å fremme bruken av skytjenester og Earth Observation (EO) tjenester innen forskningssamfunnet. OCRE-prosjektet sikter mot å lette og aksellerere bruken av kommersielle skytjenester innen forskning ved å fungere som en bro mellom forskningssamfunnet og skytjenesteleverandørene.

[Les mer om OCRE](/no/bransjer/utdanning-og-forskning/).

{{% /accordion %}}

{{% accordion title="Hva er GÉANT?" %}}

GÉANT er en europeisk forsknings- og utdanningsnettverksorganisasjon som samler Europas nasjonale forsknings- og utdanningsnettverk (NRENs). GÉANT støtter forskning og utdanning over hele Europa ved å tilby infrastruktur, tjenester og løsninger for datadeling, kommunikasjon og samarbeid.

I sammenheng med OCRE er GÉANT en av hovedpartene i OCRE-prosjektet. GÉANT, sammen med andre partnere, jobber for å lette tilgangen til og bruken av skytjenester for forskningssamfunnet gjennom OCRE.

GÉANTs rolle innen OCRE innebærer at de hjelper til med å forhandle fram avtaler med skytjenesteleverandører, tilbyr en plattform for tilgang til disse tjenestene, og støtter forskningssamfunnet i å utnytte disse ressursene på best mulig måte. GÉANTs brede nettverk og erfaring innen forskning og utdanning gjør dem til en viktig partner i OCRE-prosjektet.

{{% /accordion %}}

{{% custom-card image="/img/card/safespring-petter.jpg" cardtitle="Petter Hylin" %}}
Jeg er din kontakt i Norge og hjelper deg med å bruke våre tjenester.

{{< inline "Ring" >}} +46 (0)73 533 65 21
petter.hylin@safespring.com

{{% /custom-card %}}


## Ordliste

Her er en liste over ord og begreper som blir forklart i teksten om Safespring og deres tjenesteleveranse til SciLifeLab. For å hjelpe til med å forstå teksten bedre og for å skape et mer komplett bilde av hva Safespring og SciLifeLab gjør sammen.

{{% accordion title="Virtuell Maskin (VM)" id="vm"%}}

VM står for virtuell maskin. Det er en programvare som simulerer en datamaskin og lar flere operativsystemer kjøre samtidig på samme fysiske maskinvare.

{{% /accordion %}}

{{% accordion title="Service Level Agreement (SLA)" id="sla"%}}

SLA står for Service Level Agreement og er en avtale mellom to parter om hvilket nivå av tjeneste som skal leveres og hvordan den skal måles og rapporteres.

I denne sammenhengen er det en avtale mellom Safespring og SciLifeLab om hvilket nivå av ytelse og tjeneste som skal leveres for skytjenesten.

{{% /accordion %}}

{{< accordion-script >}}