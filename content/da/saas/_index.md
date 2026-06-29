---
language: "da"
title: "Cloudinfrastruktur til SaaS-virksomheder, der håndterer kundedata"
date: 2025-02-20
draft: false
intro: "Safespring tilbyder cloudinfrastruktur fra svenske og norske datacentre til SaaS-virksomheder, der skal kunne beskrive dataplacering, informationssikkerhed, support og leverandørkæde i kundegennemgange."
background: ""
card: "safespring_2019-10-24_fredric-wallsten_03-small_fotograf-marcus-boberg.jpg"
socialmedia: "safespring_social_01.jpg"
saas: "yes"
sidebarwhitepaper: "yes"
nolist: "n"
ai: true
aliases:
  - /en/saas/
---

![Safespring-pyramiden](/img/graphics/safespring-pyramid-2025.svg)

{{< ingress >}}
Når jeres SaaS-tjeneste sælges til organisationer med formelle krav, skal I kunne svare på spørgsmål om data, drift og ansvar. Jeres kunder skal forstå, hvor data behandles, hvem der har adgang, og hvilke leverandører der indgår.
{{< /ingress >}}

Mange SaaS-tjenester behandler personoplysninger. Når kunderne har egne sikkerhedsteams, jurister, udbudsprocesser og tilbagevendende leverandørgennemgange, er det ikke nok, at tjenesten fungerer teknisk. I skal kunne beskrive behandling, ansvar, adgang, supportveje og leverandørkæde.

Safespring er en svensk cloudleverandør med datacentre i Sverige og Norge. For SaaS-virksomheder, der sælger forretningskritiske tjenester, giver det et infrastrukturlag, hvor digital suverænitet, dataplacering, aftaler, adgang og underleverandører kan beskrives uden at bygge tjenesten på amerikanske cloudleverandører.

{{% note title="Når dette spiller en rolle" icon="fa-solid fa-file-shield" color="green" %}}

Dette er relevant, når jeres kunder spørger om dataplacering, ISO 27001, adgang, supportmodel, drift, underleverandører, tredjelandsrisici eller fortrolige oplysninger.

{{% /note %}}

## Juridisk kontekst

I og Safespring indgår i en tillidskæde. Jeres kunder gennemgår funktionerne i jeres SaaS-tjeneste, men også hvordan tjenesten driftes, hvor data behandles, og hvilke aktører der kan få adgang til oplysningerne.

Når amerikanske cloudleverandører indgår, skal I ofte håndtere spørgsmål om tredjelandsoverførsler, aftaler og adgang. Med Safespring får I en anden leverandørkæde at beskrive: nordisk infrastruktur, datacentre i Sverige og Norge, ISO 27001-certificering, support fra Safesprings tekniske organisation og tjenester bygget på åbne standarder.

Digital suverænitet bliver dermed et praktisk spørgsmål. Hvor behandles data? Hvilken jurisdiktion gælder? Hvem kan få adgang til miljøet? Hvordan håndteres support- og driftssager? De svar skal ofte være tydelige, før en kunde kan godkende en SaaS-tjeneste.

Hvis jeres SaaS-tjeneste håndterer fortrolige oplysninger, skal I kunne beskrive, hvordan fortroligheden beskyttes. Det kan gælde oplysninger omfattet af offentligheds- og tavshedsregler, advokatfortrolighed eller kommerciel fortrolighed.

{{< icon-block-horisontal color="#195F8C" icon="fa-solid fa-location-dot" text="Dataplacering, der kan beskrives" description="Safespring driver infrastruktur i Sverige og Norge. Det giver et konkret svar på, hvor data behandles, og hvilke leverandører der indgår." >}}

{{< icon-block-horisontal color="#32CD32" icon="fa-solid fa-shield-check" text="Digital suverænitet i praksis" description="Safespring giver et nordisk infrastrukturlag til tjenester, hvor kunder spørger om jurisdiktion, adgang, dataplacering og afhængigheder i leverandørkæden." >}}

{{< icon-block-horisontal color="#3C9BCD" icon="fa-solid fa-certificate" text="ISO 27001 og teknisk support" description="Safespring er ISO 27001-certificeret og har en supportorganisation for cloudplatformen. Det giver mere konkrete svar i sikkerhedsgennemgange, revisioner og driftsspørgsmål." >}}

{{% question question="Hvor behandles vores kunders data?" %}}
Safespring driver infrastruktur i Sverige og Norge. For en SaaS-leverandør giver det en dataplacering og leverandørkæde, der kan beskrives for kunder, jurister og sikkerhedsteams.
{{% /question %}}

{{% question question="Hvad skal vi kunne vise i en kundegennemgang?" %}}
I skal ofte kunne beskrive, hvor data behandles, hvilke underleverandører der indgår, hvordan adgang håndteres, hvilken supportmodel der gælder, og hvilken del af driften hver part har ansvar for.
{{% /question %}}

{{% question question="Hvilket materiale kan vi bruge i en sikkerhedsgennemgang?" %}}
I kan beskrive Safesprings datacentre i Sverige og Norge, ISO 27001-certificering, supportmodel, åbne standarder og ansvarsfordeling mellem jeres SaaS-tjeneste og den underliggende infrastruktur.
{{% /question %}}

{{% question question="Kan vi bygge uden at låse tjenesten til en hyperscaler?" %}}
Ja. Safespring bygger på åbne standarder for compute, lagring og netværk. Det gør, at applikationer og platforme kan bygges uden at være afhængige af leverandørspecifikke cloudtjenester.
{{% /question %}}

{{< accordion-script >}}

## Teknologien

Safespring kan bruges som infrastrukturlag for SaaS-tjenester, der kører på virtuelle maskiner, containerplatforme eller en kombination af begge. Platformen indeholder compute, lagring, netværk og backup. For tjenester bygget med Kubernetes findes Safespring Container Platform.

{{< icon-block-horisontal color="#195F8C" icon="fa-solid fa-server" text="Compute og OpenStack" description="Safespring Compute giver adgang til virtuelle servere og instanstyper, der kan tilpasses applikationens behov. Platformen bygger på OpenStack." >}}

{{< icon-block-horisontal color="#32CD32" icon="fa-solid fa-database" text="Lagring til forskellige datatyper" description="Safespring tilbyder lokal NVMe-lagring til hurtig dataadgang og Ceph-baseret central lagring til andre datamængder, for eksempel logfiler, filer og backup." >}}

{{< icon-block-horisontal color="#3C9BCD" icon="fa-solid fa-cubes" text="Containerbaserede tjenester" description="For SaaS-virksomheder, der kører containerbaserede applikationer, kan infrastrukturen kombineres med Kubernetes og åbne komponenter." >}}

## Næste skridt

Hvis I sælger en SaaS-tjeneste til kunder med udbud, sikkerhedsgennemgange eller tilbagevendende leverandørrevisioner, kan vi gennemgå, hvilke dele af infrastrukturen I vil eje selv, og hvilke dele der bør ligge hos Safespring. Det begynder ofte med dataplacering, driftsmodel, adgang, backup, supportveje og hvilke oplysninger jeres kunder skal bruge i deres gennemgang.

{{% custom-card image="/img/card/safespring-fredric.webp" cardtitle="Fredric Wallsten" %}}
Kontakt mig, hvis I vil diskutere infrastruktur til jeres SaaS-tjeneste.

{{< inline "Ring" >}} [+46 76-629 25 02](tel:+46766292502)

{{< inline "E-mail" >}} [hello@safespring.com](mailto:hello@safespring.com)
{{% /custom-card %}}
