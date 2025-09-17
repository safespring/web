---
ai: true
title: "En fleksibel og sikker skytjeneste til livsvidenskabelig forskning"
language: "da"
date: 2023-06-01
draft: false
darkmode: "fra"
section: "Brugsscenarie"
intro: "Opdag, hvordan Safespring leverede cloud-baserede VM- og lagringstjenester til SciLifeLab, som understøtter deres avancerede life science-forskning og håndtering af store datamængder."
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
toc: "I denne artikel"
service: "Safespring Privat Cloud"
aliases:
  - /en/services/case/scilifelab/
---
##
{{< ingress >}}
Safespring leverer en skybaseret VM- og lagringstjeneste til SciLifeLab, Sveriges største nationale forskningsinfrastruktur for life science.
{{< /ingress >}}

Safesprings virtuelle maskiner og lagring kan automatiseres via API’er, hvilket giver SciLifeLab fleksibilitet til at justere ressourcer efter behov og optimere omkostninger og ydeevne i realtid.

SciLifeLab har høje krav til [ydeevne og netværk](#performance) samt [lagring og sikkerhed](#security) for at imødekomme deres specifikke behov. Safespring arbejder sammen med SciLifeLab om at levere en fleksibel og dynamisk infrastruktur, der er let for forskere at bruge.

{{% accordion title="Ydeevne og netværk" id="performance" %}}
Safespring tilbyder en række VM-varianter på en fleksibel IaaS-platform, der nemt kan tilpasses kundekrav. VM-varianter spænder fra 1 vCPU til 128 vCPU og RAM fra 1 GB til 256 GB. Safespring kan også tilføje nye VM-varianter, efterhånden som kundekrav ændrer sig over tid.

For at forbedre ydeevne og stabilitet bruger Safespring et Calico-netværksplugin til OpenStack, som giver førsteklasses adskillelse mellem kunders infrastrukturer og reducerer netværksbelastningen. Dette øger også sikkerheden for de følsomme data, der ofte bruges i bioinformatik.

Calico muliggør håndtering af al netværkstrafik på lag 3 ved hjælp af den etablerede BGP-protokol, hvilket reducerer belastning og kompleksitet sammenlignet med traditionel lag 2-bro og giver optimal netværksydelse. Safespring anvender også sikkerhedsgrupper (virtuelle firewall-regler) pr. virtuel maskine for at beskytte kundernes følsomme data.
{{% /accordion %}}

{{% accordion title="Lagring og sikkerhed" id="security" %}}
Safespring leverer skybaseret lagring for at opfylde SciLifeLabs behov for høj lagerkapacitet til deres datastyrings- og AI-modelleringssystemer. Safespring bruger S3-objektlagring som standard for at muliggøre lagring af store datamængder i et skalerbart og sikkert miljø. SciLifeLab bruger også Safesprings lagring som byggesten til at skabe forskningsmiljøer.

Safespring vedligeholder en detaljeret servicebaseret SLA og overvåger teknisk ydeevne og serviceniveauer for sine systemer og tjenester døgnet rundt. Safespring bruger ITIL4-kompatible processer, procedurer, opgaver og tjeklister for at opnå dette. Al overvågning og serviceanalysedata er gennemsigtige og tilgængelige for kunden efter anmodning.

Safespring reagerer hurtigt på alle supporthenvendelser og sikrer, at forskere kan udføre deres arbejde uden forstyrrelser. Safespring giver regelmæssige rapporter til kunder om deres aktuelle tekniske leveringsstatus i forhold til SLA og om udviklingen af nye/opdaterede servicefunktioner.
{{% /accordion %}}

## Forskning udført på Safesprings cloudplatform

SciLifeLab driver flere forskningsprogrammer, der er afhængige af højtydende databehandling og stor datalagring for at skabe mere avancerede forskningsmiljøer og -platforme. Safesprings VM-tjenester gør det også let for forskere selv at bestille VM-ressourcer og imødekomme deres specifikke behov for effektivt at drive deres forskningsprojekter frem.

To store forskningsmiljøer og -platforme bygget på Safesprings infrastruktur er dataleveringsprojektet DDS og AI-projektet BigPicture.

<div class="safespring-horisontal-card-container bg-white shadow-1 safespring-horisontal-card-row">
    <div class="safespring-horisontal-card-col safespring-horisontal-card-image" style="background-color: #f2f0f7; display: flex;justify-content: center; align-items: center;" alt="">
        <img src="/img/logos/bigpicture.svg" style="max-width: 80%; min-width: 20%; min-height: 30px;">
    </div>
<div class="safespring-horisontal-card-col safespring-horisontal-card-content">
    <p>BigPicture har til formål at understøtte udviklingen af kunstig intelligens inden for life science. I dette Horizon2020-projekt har SciLifeLab og ELIXIR-SE slået sig sammen med mange andre europæiske partnere for at levere et patologidatabibliotek.
</p>
<p>Safespring leverer en skalerbar infrastruktur, der opfylder projektets store krav til datastyring og høj ydeevne. SciLifeLab har kunnet udvikle BigPicture-projektet hurtigt ved at bruge Safesprings cloudtjenester.
</p><br><br>
<a class="button" href="https://bigpicture.eu">BigPicture-websted</a>
</div>
</div>
<br>
<div class="safespring-horisontal-card-container bg-white shadow-1 safespring-horisontal-card-row">
    <div class="safespring-horisontal-card-col safespring-horisontal-card-image" style="background-color: #eef6e4; display: flex;justify-content: center; align-items: center;" alt="">
        <img src="/img/logos/scilifelab-symbol.svg" style="max-width: 80%; min-width: 20%; min-height: 30px;">
    </div>
<div class="safespring-horisontal-card-col safespring-horisontal-card-content">
    <p>DDS står for Data Delivery System og er en central løsning for SciLifeLab som en kompleks infrastruktur, der producerer forskningsdata. Det er en samlet transportløsning til levering af life science-data fra dataproducerende tekniske platforme, såsom DNA-sekventering, billeddannelse og proteomik, til forskere i hele Sverige. </p>
<p>DDS udnytter Safesprings virtuelle maskiner og lagringsløsninger til at håndtere flowet af over 3 petabyte data mellem producenter og forskere.</p>
<br><br>
<a class="button" href="https://delivery.scilifelab.se">DDS-websted</a>
</div>
</div>

## Relevant for EOSC

EOSC står for [Europæisk Open Science Cloud](/eosc) og er en skybaseret platform, der har til formål at give forskere og andre brugere enkel og sikker adgang til forskningsdata, værktøjer og infrastruktur på tværs af Europa.

Safesprings tjenester understøtter SciLifeLabs projekter med at levere life science til forskere over hele Sverige. Forskere kan bruge virtuelle maskiner og lagring direkte samt bygge virtuelle forskningsmiljøer hos SciLifeLab. Safespring er for nylig også begyndt at udvikle [GPU](#gpu)-understøttede virtuelle maskiner til proteinfoldning og analyse af billeddata.

EOSC-platformen vil lette samarbejde og datadeling mellem forskere og institutioner i forskellige lande og discipliner, hvilket forventes at føre til øget innovation og opdagelsen af nye indsigter. EOSC vil bestå af forskellige tjenester og værktøjer leveret af både offentlige og private organisationer og vil følge FAIR-principperne for datastyring (Findable, Accessible, Interoperable, Reusable).

{{% accordion title="Hvad er en GPU?" id="gpu"%}}
GPU står for Graphics Processing Unit og er en processor, der er designet specifikt til at håndtere grafisk tunge opgaver, såsom computerspil og redigering af billeder eller video.
I denne sammenhæng bruges GPU’er til proteinfoldning og analyse af billeddata i forskning.
{{% /accordion %}}

## Strategiske mål

{{< ingress >}}
Safespring og SciLifeLab har i fællesskab udarbejdet en plan for serviceleverance gennem flere overordnede kravsessioner for at finjustere tjenesten og imødekomme SciLifeLabs specifikke behov.
{{< /ingress >}}

### Digital suverænitet

Safespring tilbyder flere fordele, der gør det til en pålidelig cloududbyder inden for compliance, åbne standarder og digital suverænitet. I dette afsnit ser vi nærmere på disse tre aspekter og forklarer, hvorfor Safespring er en sikker partner for organisationer, der søger en cloududbyder, som pålideligt kan håndtere deres behov. Vi gennemgår Safesprings efterlevelse af regler, der er relevante for cloudtjenester, deres støtte til åbne standarder og deres løsninger til at sikre digital suverænitet for deres kunder.

{{% accordion title="Compliance" %}}
Safespring er en cloududbyder, der anerkender vigtigheden af at efterleve regler og standarder for at beskytte kundedata og sikkerhed. Ved at overholde regler og standarder kan Safespring garantere, at deres cloudtjenester opfylder de højeste sikkerhedsstandarder. Safespring er også en del af det europæiske Gaia-X-initiativ, en uafhængig cloudinfrastruktur, der garanterer europæisk digital suverænitet. Ved at bruge Safesprings cloudtjenester kan forskere være trygge ved, at deres data lagres og håndteres sikkert i overensstemmelse med de højeste standarder og compliancekrav.
{{% /accordion %}}

{{% accordion title="Åbne standarder" %}}
Safespring understøtter åbne standarder som OpenStack og Kubernetes, hvilket sikrer, at deres cloudtjenester er åbne, skalerbare og kompatible med andre cloudplatforme og teknologier. Åbne standarder giver også forskere fleksibilitet og valgfrihed i valget af teknologi, der passer til deres specifikke forskningsbehov. Safesprings åbne standarder giver desuden den fordel, at forskere kan bruge cloudtjenester, der er kompatible med deres eksisterende it-infrastruktur.
{{% /accordion %}}

{{% accordion title="Digital suverænitet" %}}
Safespring er en svensk cloududbyder, der ikke er omfattet af amerikansk lovgivning såsom FISA 702 og CLOUD Act. Det betyder, at Safespring ikke behøver at dele kundedata med amerikanske myndigheder, og at kunden bevarer fuld kontrol over sine data og informationer. Derudover er Safespring en del af det europæiske Gaia-X-initiativ, som garanterer europæisk digital suverænitet og selvbestemmelse over datastyring. Ved at bruge Safesprings cloudtjenester kan forskere være sikre på, at deres data er trygge og beskyttet mod overvågning og indgreb.
{{% /accordion %}}

### Kontinuerlig forbedring

For at håndtere relationen med SciLifeLab og sikre, at deres forretningsbehov opfyldes, og at serviceniveauer nås, holder Safespring og SciLifeLab regelmæssige driftsmøder for at drøfte åbne sager, nye funktioner og funktionsforbedringer, serviceudnyttelse, planlagte projekter og andre forretningsrelaterede spørgsmål. Disse møder muliggør høj kvalitet i leveringen af cloudtjenester og giver Safespring mulighed for at samarbejde med SciLifeLab om at identificere og planlægge tekniske ændringsanmodninger, der understøtter deres forretningsbehov.

Safespring har også en proces for løbende at forbedre vores tjenester og serviceniveauer ved at lære af hændelser og identificere forbedringsmuligheder. Vi implementerer ændringer, der understøtter kundernes forretningsbehov.

## Alt købes via rammeaftaler

{{< ingress >}}
Safespring har en rammeaftale gennem Open Clouds for Research Environments (OCRE), som forsknings- og uddannelsesinstitutioner kan bruge.
{{< /ingress >}}

SciLifeLab køber tjenester fra Safespring gennem Sunet og OCRE-aftalen. Safespring er direkte forbundet til Sunets netværk, hvilket giver høj tilgængelighed og hurtig forbindelse.

Et af hovedformålene med [OCRE](#ocre) er at forenkle og standardisere processen med at anskaffe cloudtjenester, hvilket igen kan føre til øget produktivitet og effektivitet i forskningsmiljøet. Ved at tilbyde en enkelt portal, hvor forskere kan få adgang til cloudtjenester, har OCRE til formål at gøre det lettere for forskere at bruge disse tjenester i deres forskning.

{{% accordion title="Hvad er OCRE?" id="ocre"%}}
Open Clouds for Research Environments (OCRE) er et EU-finansieret projekt, der har til formål at fremme brugen af cloudtjenester og Earth Observation (EO)-tjenester i forskningsmiljøet. OCRE-projektet stræber efter at lette og accelerere brugen af kommercielle cloudtjenester i forskningen ved at fungere som bro mellem forskningsmiljøet og cloududbydere.

Lær mere om [OCRE](/ocre/).
{{% /accordion %}}

{{% accordion title="Hvad er GÉANT?" %}}
GÉANT er en europæisk forsknings- og uddannelsesnetværksorganisation, der samler Europas nationale forsknings- og uddannelsesnetværk (NREN’er). GÉANT understøtter forskning og uddannelse i hele Europa ved at levere infrastruktur, tjenester og løsninger til datadeling, kommunikation og samarbejde.

I OCRE-sammenhæng er GÉANT en af hovedparterne i OCRE-projektet. GÉANT arbejder sammen med andre partnere på at lette adgangen til og brugen af cloudtjenester for forskningsmiljøet gennem OCRE.

GÉANTs rolle i OCRE indebærer at hjælpe med at forhandle aftaler med cloududbydere, levere en platform for adgang til disse tjenester og støtte forskningsmiljøet i at udnytte disse ressourcer effektivt. GÉANTs omfattende netværk og erfaring inden for forskning og uddannelse gør dem til en nøglepartner i OCRE-projektet.
{{% /accordion %}}

## Sæt strøm til dit projekt fra skyen

Der er stor efterspørgsel efter lagring og regnekraft i stor skala. Safespring har længe arbejdet sammen med den akademiske sektor for at sikre, at digital infrastruktur, lagring og backup opfylder Sunets krav.

{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Daniel Melin" %}}
Jeg er Business Development Manager for den akademiske og offentlige sektor og kan hjælpe dig med at bruge vores tjenester, som allerede er indkøbt under OCRE-aftalen.

{{< inline "Ring" >}} +46 (0)76 868 00 59
[daniel.melin@safespring.com](mailto:daniel.melin@safespring.com)
{{% /custom-card %}}

{{< accordion-script >}}