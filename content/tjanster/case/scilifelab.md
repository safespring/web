---
title: "En flexibel och säker molntjänst för life science forskning"
language: "Se"
date: 2023-06-01
draft: false
darkmode: "off"
section: "User case"
intro: "Läs om hur Safespring levererade molnbaserade VM- och lagringstjänster till SciLifeLab, för att stödja deras avancerade life science-forskning och hantering av stora datamängder."
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
aliases:
toc: "I denna artikel"
service: "Safespring Private Cloud"
---

## 
{{< ingress >}}
Safespring levererar en molnbaserad VM- och lagringstjänst till SciLifeLab, den största nationella forskningsinfrastrukturen för life science i Sverige. 
{{< /ingress >}}

{{< readfile "Vad är Life Science?" "/content/read-more/lifescience.md" >}}

Safesprings virtuella maskiner och lagring går att automatisera genom API. Det ger SciLifeLab flexibilitet att anpassa resurserna vid varje givet tillfälle och optimerar kostnader och prestanda i realtid.

SciLifeLabs har höga krav på [prestanda och nätverk](#prestanda) samt [lagring och säkerhet](#sakerhet) för att möta deras specifika behov. Safespring arbetar tillsammans med SciLifeLab för att leverera en flexibel och dynamisk infrastruktur som är lättanvänd för vanliga forskare.

{{% accordion title="Prestanda och nätverk" id="prestanda" %}}
Safespring erbjuder en rad olika VM-flavors på en flexibel IaaS-plattform som enkelt kan anpassas efter kundernas krav. VM-flavors sträcker sig från 1 vCPU till 128 vCPU och RAM från 1 GB till 256 GB. Safespring har även möjlighet att lägga till nya VM-flavors allt eftersom kundernas krav förändras över tid. 

För att förbättra prestanda och stabilitet använder Safespring en Calico-nätverksplugin för OpenStack, vilket ger förstklassig separation mellan kundens infrastrukturer och minskar belastningen på nätverket. Detta ökar också säkerheten för känsliga data som ofta används inom bioinformatik.

Calico möjliggör hantering av all nätverkstrafik på layer-3 med hjälp av det väletablerade BGP-protokollet. Detta minskar belastningen och komplexiteten jämfört med traditionell layer-2-bridging och ger optimal nätverksprestanda. Safespring tillämpar också security groups (virtuella brandväggsregler) per virtuell maskin för att skydda kundernas känsliga data.
{{% /accordion %}}

{{% accordion title="Lagring och säkerhet" id="sakerhet" %}}
Safespring levererar molnbaserad lagring för att möta SciLifeLabs behov av hög lagringskapacitet för deras datahanterings- och AI-modellhanteringssystem. Safespring använder S3-objektlagring som standard för att möjliggöra lagring av stora mängder data i en skalbar och säker miljö. SciLifeLab använder också Safespring lagring som en byggsten för att bygga forskningsmiljöer.

Safespring upprätthåller ett detaljerat Service-baserat SLA och övervakar teknisk prestanda och servicenivåer för sina system och tjänster 24/7. Safespring använder ITIL4-kompatibla processer, procedurer, uppgifter och checklista för att uppnå detta. All övervaknings- och serviceanalysdata är transparent och tillgänglig för kunden på begäran. 

Safespring svarar snabbt på alla supportärenden, vilket garanterar att forskare kan utföra sina arbetsuppgifter utan distraktion. Safespring tillhandahåller regelbundna rapporter till kunderna om deras nuvarande tekniska leveransstatus mot SLA och om utvecklingen av nya/uppdaterade tjänstefunktioner.
{{% /accordion %}}

## Forskning som bedrivs på Safesprings molnplattform

SciLifeLab har flera forskningsprogram som är beroende av högpresterande databehandling och stora datalagringar för att skapa en högre nivå av forskningsmiljöer och plattformar. Safesprings VM-tjänster möjliggör även att forskarna själva kan efterfråga VM-resurser på ett enkelt sätt och tillgodose sina specifika behov för att driva sina forskningsprojekt på ett effektivt sätt. 

Två stora forskningsmiljöer och plattformar som SciLifeLab bygger på Safesprings infrastruktur är dataleveransprojektet DDS och AI-projektet Bigpicture. 

{{% accordion title="Dataleveransprojektet DDS" %}}
DDS står för Data Delivery System och är en central lösning för SciLifeLab som en komplex infrastruktur som producerar forskningsdata. Det är en enhetlig transportlösning för att leverera life science-data från data-producerande tekniska plattformar, såsom DNA-sekvensering, avbildning och proteomik, till forskare över hela Sverige. DDS utnyttjar Safesprings virtuella maskiner och lagringslösningar för att hantera flödet av data mellan producenter och forskare, förväntas nå 3 petabyte under 2023.

[Läs mer om DDS](https://delivery.scilifelab.se)
{{% /accordion %}}

{{% accordion title="AI-projektet BigPicture" %}}
BigPicture är ett Horizon2020-projekt där SciLifeLab och ELIXIR-SE har gått samman med många andra europeiska partners för att leverera en patologidata-repository. BigPicture är avsett att stödja utvecklingen av artificiell intelligens inom life science. 

Safesprings VM- och lagringstjänster utgör en nyckelkomponent i detta projekt genom att möjliggöra skapandet av en skalbar infrastruktur som uppfyller projektets krav på datahantering och prestanda. SciLifeLab har kunnat utveckla BigPicture-projektet på ett snabbt sätt genom att använda Safespring.

[Läs mer om BigPicture](https://bigpicture.eu)
{{% /accordion %}}

### Relevant för EOSC
EOSC står för European Open Science Cloud och är en planerad molnbaserad plattform som syftar till att ge forskare och andra användare en enkel och säker tillgång till forskningsdata, verktyg och infrastruktur över hela Europa.

Safesprings tjänster stöder SciLifeLabs projekt för att leverera life science till forskare över hela Sverige. Forskare kan använda virtuella maskiner och lagring direkt, samt bygga virtuella forskningsmiljöer på SciLifeLab. Safespring har också nyligen börjat utveckla [GPU](#gpu)-backade virtuella maskiner för Protein Folding och analys av bilddata.

EOSC-plattformen kommer att underlätta samarbete och delning av data mellan forskare och institutioner i olika länder och discipliner, vilket förväntas leda till ökad innovation och upptäckt av nya insikter. EOSC kommer att bestå av olika tjänster och verktyg som tillhandahålls av både offentliga och privata organisationer, och kommer att följa principerna om FAIR (Findable, Accessible, Interoperable, Reusable) datahantering. EOSC förväntas vara fullt operationellt år 2025.

{{% accordion title="Vad är GPU?" id="gpu"%}}
GPU står för Graphics Processing Unit och är en processor som är specialdesignad för att hantera grafiskt intensiva uppgifter, som till exempel datorspel och bild- eller videoredigering.
I detta sammanhang används GPU:er för Protein Folding och analys av bilddata inom forskning.
{{% /accordion %}}

## Strategiska mål
{{< ingress >}}
Safespring och SciLifeLab har gemensamt skapat en plan för tjänsteleverans genom flera övergripande kravsessioner för att finjustera tjänsten och möta SciLifeLabs specifika behov. 
{{< /ingress >}}


### Digital suveränitet
Safespring erbjuder en rad fördelar som gör det till en pålitlig molntjänstleverantör för compliance, öppna standarder och digital suveränitet. I detta avsnitt kommer vi att titta närmare på dessa tre aspekter och förklara varför Safespring är en säker partner för organisationer som vill ha en molntjänstleverantör som kan hantera deras behov på ett tillförlitligt sätt. Vi kommer att titta närmare på Safesprings åtagande för att följa regelverk som är relevanta för molntjänster, deras stöd för öppna standarder och deras lösningar för att säkerställa digital suveränitet för sina kunder.

{{% accordion title="Compliance" %}}
Safespring är en molntjänstleverantör som är medveten om vikten av att uppfylla regler och standarder för att skydda kundernas data och säkerhet. Genom att följa regler och standarder kan Safespring garantera att deras molntjänster uppfyller de högsta säkerhetsstandarderna. Safespring är också en del av det europeiska Gaia-X-initiativet som är en molninfrastruktur som är oberoende av andra molninfrastrukturer och garanterar europeisk digital suveränitet. Genom att använda Safesprings molntjänster kan forskare vara säkra på att deras data lagras och hanteras på ett säkert sätt i enlighet med högsta standarder och överensstämmelsekrav.
{{% /accordion %}}

{{% accordion title="Öppna standarder" %}}
Safespring stödjer öppna standarder som OpenStack och Kubernetes vilket garanterar att deras molntjänster är öppna, skalbara och kompatibla med andra molnplattformar och tekniker. Öppna standarder ger också forskare flexibilitet och valfrihet i att välja teknologi som passar deras specifika forskningsbehov. Safesprings öppna standarder ger också fördelen att forskare kan använda molntjänster som är förenliga med deras befintliga IT-infrastruktur.
{{% /accordion %}}

{{% accordion title="Digital suveränitet" %}}
Safespring är en svensk molntjänstleverantör som inte påverkas av amerikansk lagstiftning som FISA 702 och CLOUD Act. Detta innebär att Safespring inte behöver dela kundernas data med amerikanska myndigheter, utan att kunden behåller full kontroll över sin data och information. Dessutom är Safespring en del av det europeiska Gaia-X-initiativet, vilket garanterar europeisk digital suveränitet och självbestämmande över datahantering. Genom att använda Safesprings molntjänster kan forskare vara säkra på att deras data är säkra och skyddade mot övervakning och intrång.
{{% /accordion %}}

### Kontinuerlig förbättring

För att hantera relationen med SciLifeLab och säkerställa att deras affärsbehov möts och att serviceleveransnivåerna uppfylls, har Safespring och SciLifeLab regelbundna operativa möten där man diskuterar öppna ärenden, nya funktioner och funktionella förbättringar, utnyttjande av tjänster, planerade projekt och andra affärsrelaterade frågor. Dessa möten möjliggör en god kvalitet i leveransen av molntjänster och ger Safespring möjlighet att samarbeta med SciLifeLab för att identifiera och planera tekniska förändringsbegäran som stöder deras affärsbehov.

Safespring har också en process för att kontinuerligt förbättra våra tjänster och serviceleveransnivåer genom att lära av incidenter och att identifiera möjligheter till förbättringar. Vi implementerar förändringar som stödjer kundernas affärsbehov.

## Allt köpts in genom ramavtal
{{< ingress >}}
Safespring har ett ramvatal genom Open Clouds for Research Environments (OCRE) som forsknings- och utbildningsinstitutioner kan avropa. 
{{< /ingress >}}

SciLifeLab köper in tjänster från Safespring genom Sunet och genom OCRE-avtalet. Safespring är direkt ansluten till Sunets nätverk vilket ger hög tillgänglighet och snabb förbindelse.

Ett av huvudsyftena med [OCRE](#ocre) är att förenkla och standardisera processen för att skaffa molntjänster, vilket i sin tur kan leda till ökad produktivitet och effektivitet inom forskningssamhället. Genom att tillhandahålla en enda portal för forskare att få tillgång till molntjänster, strävar OCRE efter att göra det lättare för forskare att använda dessa tjänster i sin forskning.

{{% accordion title="Vad är OCRE?" id="ocre"%}}
Open Clouds for Research Environments (OCRE) är ett EU-finansierat projekt som syftar till att främja användningen av molntjänster och Earth Observation (EO) tjänster inom forskningssamhället. OCRE-projektet strävar efter att underlätta och påskynda användningen av kommersiella molntjänster inom forskning genom att fungera som en brygga mellan forskningssamhället och molntjänstleverantörerna.

Läs mer om [OCRE](https://www.ocre-project.eu/services/cloud-suppliers/).
{{% /accordion %}}

{{% accordion title="Vad är GÉANT?" %}}
GÉANT är en europeisk forsknings- och utbildningsnätverksorganisation som sammanför Europas nationella forsknings- och utbildningsnätverk (NRENs). GÉANT stödjer forskning och utbildning över hela Europa genom att tillhandahålla infrastruktur, tjänster och lösningar för datadelning, kommunikation och samarbete.

I sammanhanget med OCRE är GÉANT en av huvudparterna i OCRE-projektet. GÉANT, tillsammans med andra partners, arbetar för att underlätta tillgången till och användningen av molntjänster för forskningssamhället genom OCRE.

GÉANTs roll inom OCRE innebär att de hjälper till att förhandla fram avtal med molntjänstleverantörer, tillhandahålla en plattform för tillgång till dessa tjänster, och stödja forskningssamhället i att utnyttja dessa resurser på bästa sätt. GÉANTs breda nätverk och erfarenhet inom forskning och utbildning gör dem till en viktig partner i OCRE-projektet.
{{% /accordion %}}

## Ge ditt projekt kraft från molnet
Storskalig lagring och compute-kapacitet är det många som efterfrågar. Safespring har länge jobbat med den akademiska sektorn för att se till att digital infrastruktur, lagring och backup efterlever Sunets krav.

{{% custom-card image="/img/card/safespring-daniel.webp" cardtitle="Daniel Melin" %}}
Jag är affärsutvecklare för Safespring i Sverige och hjälper dig gärna att komma igång.

{{< inline "Ring" >}} +46855107370
daniel.melin@safespring.com
{{% /custom-card %}}

{{< accordion-script >}}