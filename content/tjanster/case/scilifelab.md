---
title: "En flexibel och säker molntjänst för livsvetenskaplig forskning"
language: "Se"
date: 2019-01-07T13:58:58+01:00
draft: false
darkmode: "off"
section: "User case"
intro: "Läs om Safesprings leverans av en molnbaserad VM- och lagringstjänst till SciLifeLab, Sveriges största forskningsinfrastruktur för livsvetenskap. Tjänsten möter höga krav på prestanda, säkerhet och användarvänlighet och stöder forskning inom proteinveckning och analys av bilddata."
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
---
## 
{{< ingress >}}
Safespring levererar en molnbaserad VM- och lagringstjänst till SciLifeLab, den största nationella forskningsinfrastrukturen för livsvetenskap i Sverige. 
{{< /ingress >}}

Tjänsten möter höga krav på prestanda, nätverk, säkerhet och lagring för att möta SciLifeLabs specifika behov. Safespring arbetar tillsammans med SciLifeLab för att leverera en flexibel och dynamisk infrastruktur som är lättanvänd för vanliga forskare.

{{% accordion title="Prestanda och nätverk" %}}
Safespring erbjuder en rad olika VM-flavorer på en flexibel IaaS-plattform som enkelt kan anpassas efter kundernas krav. VM-flavorerna sträcker sig från 1VCPU till 128 VCPUs och från 1 GB till 256 GB RAM. Safespring har även möjlighet att lägga till nya VM-flavorer allt eftersom kundernas krav förändras över tid. 

För att förbättra prestanda och stabilitet använder Safespring en Calico-nätverksplugin för OpenStack, vilket ger förstklassig separation mellan kundens infrastrukturer och minskar belastningen på nätverket. Detta ökar också säkerheten för känsliga data som ofta används inom bioinformatik.

Calico möjliggör hantering av allt nätverkstrafik på layer-3 med hjälp av datacenter BGP. Detta minskar belastningen och komplexiteten jämfört med traditionell layer-2-bridging och ger optimal nätverksprestanda. Safespring tillämpar också standard säkerhetsgrupper för virtuella maskiner och erbjuder optimal nätverksprestanda för att säkerställa att kundernas känsliga data är säkra.
{{% /accordion %}}

{{% accordion title="Lagring och säkerhet" %}}
Safespring levererar molnbaserad lagring för att möta SciLifeLabs behov av hög lagringskapacitet för deras datahanterings- och AI-modellhanteringssystem. Safespring använder S3-objektlagring som standard för att möjliggöra lagring av stora mängder data i en skalbar och säker miljö. SciLifeLab använder också Safespring lagring som en byggsten för att bygga forskningsmiljöer.

Safespring upprätthåller en detaljerad Service-baserad SLA och övervakar teknisk prestanda och servicenivåer för sina system och tjänster 24/7. Safespring använder ITIL4-kompatibla processer, procedurer, uppgifter och checklista för att uppnå detta. All övervaknings- och serviceanalysdata är transparent och tillgänglig för kunden på begäran. 

Safespring svarar också på alla supportärenden inom en arbetsdag, vilket garanterar att forskare kan utföra sina arbetsuppgifter utan distraktion. Safespring tillhandahåller regelbundna rapporter till kunderna om deras nuvarande tekniska leveransstatus mot SLA och om utvecklingen av nya/uppdaterade tjänstefunktioner.
{{% /accordion %}}

## Forskning som bedrivs på Safesprings molnplattform

SciLifeLab har flera forskningsprogram som är beroende av högpresterande databehandling och stora datalagringar för att skapa en högre nivå av forskningsmiljöer och plattformar. Safesprings VM-tjänster möjliggör även att forskarna själva kan efterfråga VM-resurser på ett enkelt sätt och tillgodose sina specifika behov för att driva sina forskningsprojekt på ett effektivt sätt. 

Två stora forskningsmiljöer och plattformar som SciLifeLab bygger på Safesprings infrastruktur är dataleveransprojektet DDS och AI-projektet Bigpicture. 

{{% accordion title="Dataleveransprojektet DDS" %}}
DDS står för Data Delivery System och är en central lösning för SciLifeLab som en komplex infrastruktur som producerar forskningsdata. Det är en enhetlig transportlösning för att leverera livsvetenskapsdata från data-producerande tekniska plattformar, såsom DNA-sekvensering, avbildning och proteomik, till forskare över hela Sverige. DDS utnyttjar Safesprings virtuella maskiner och lagringslösningar för att hantera flödet av data mellan producenter och forskare, förväntas nå 3 petabyte under 2023.
{{% /accordion %}}

{{% accordion title="AI-projektet BigPicture" %}}
BigPicture är ett Horizon2020-projekt där SciLifeLab och ELIXIR-SE har gått samman med många andra europeiska partners för att leverera en patologidatarepositorium. Det är avsett att stödja utvecklingen av artificiell intelligens inom livsvetenskap. Safesprings VM- och lagringstjänster utgör en nyckelkomponent i detta projekt genom att möjliggöra skapandet av en skalbar infrastruktur som uppfyller projektets krav på datahantering och prestanda. SciLifeLab har kunnat utveckla BigPicture-projektet på ett snabbt sätt genom att använda Safesprings plattform för virtuella maskiner och lagring.
{{% /accordion %}}

### Relevant för EOSC
EOSC står för European Open Science Cloud och är en planerad molnbaserad plattform som syftar till att ge forskare och andra användare en enkel och säker tillgång till forskningsdata, verktyg och infrastruktur över hela Europa.

Safesprings tjänster stöder SciLifeLabs projekt för att leverera livsvetenskapsdata till forskare över hela Sverige. Forskare kan konsumera VM:er och lagring direkt samt bygga virtuella forskningsmiljöer på SciLifeLab. Safespring har också nyligen börjat utveckla GPU-backade VM:er för proteinveckning och analys av bilddata.

EOSC-plattformen kommer att underlätta samarbete och delning av data mellan forskare och institutioner i olika länder och discipliner, vilket förväntas leda till ökad innovation och upptäckt av nya insikter. EOSC kommer att bestå av olika tjänster och verktyg som tillhandahålls av både offentliga och privata organisationer, och kommer att följa principerna om FAIR (Findable, Accessible, Interoperable, Reusable) datahantering. EOSC förväntas vara fullt operationellt år 2025.

## Strategiska mål
{{< ingress >}}
Safespring och SciLifeLab har gemensamt skapat en plan för tjänsteleverans genom flera övergripande kravsessioner för att finjustera tjänsten och möta SciLifeLabs specifika behov. 
{{< /ingress >}}

Safespring erbjuder en lättanvänd portal för självbetjäning av VM:er så att forskare kan anpassa sina virtuella maskiner efter specifika krav.

Safespring har ett detaljerat Service Level Agreement (SLA) för att säkerställa att alla krav på prestanda och service uppfylls. De övervakar och analyserar prestanda kontinuerligt och ger SciLifeLab en kvartalsvis översikt över tjänstens tekniska prestanda samt eventuella nya/uppgraderade funktioner. Safespring erbjuder också en enkel och lättanvänd statussida för daglig användning samt en supportportal där forskare kan registrera individuella supportförfrågningar som följs upp av Safesprings supportteam.

### Digital suveränintet
Safespring erbjuder en rad fördelar som gör det till en pålitlig molntjänstleverantör för organisationer som kräver höga standarder för compliance, öppna standarder och digital suveränitet. I detta avsnitt kommer vi att titta närmare på dessa tre aspekter och förklara varför Safespring är en säker partner för organisationer som vill ha en molntjänstleverantör som kan hantera deras behov på ett tillförlitligt sätt. Vi kommer att titta närmare på Safesprings åtagande för att följa regelverk som är relevanta för molntjänster, deras stöd för öppna standarder och deras lösningar för att säkerställa digital suveränitet för sina kunder.

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
Safespring använder ITIL4 för att säkerställa effektiva processer och rutiner för hantering av kundrelationer samt stödja en kontinuerlig förbättring av deras tjänster och serviceleverans.

{{% accordion title="Vad är ITIL4?" %}}
ITIL4 är en förkortning av Information Technology Infrastructure Library version 4 och är en ramverk för IT-servicehantering.
ITIL4 beskriver en uppsättning bästa praxis för att planera, leverera, supportera och förbättra IT-tjänster.
I detta sammanhang används ITIL4 för att säkerställa att Safesprings processer och rutiner för hantering av kundrelationer är effektiva och för att stödja en kontinuerlig förbättring av deras tjänster och serviceleverans.
{{% /accordion %}}

För att hantera relationen med SciLifeLab och säkerställa att deras affärsbehov möts och att serviceleveransnivåerna uppfylls, har Safespring och SciLifeLab regelbundna operativa möten där man diskuterar öppna ärenden, nya funktioner och funktionella förbättringar, utnyttjande av tjänster, planerade projekt och andra affärsrelaterade frågor. Dessa möten möjliggör en god kvalitet i leveransen av molntjänster och ger Safespring möjlighet att samarbeta med SciLifeLab för att identifiera och planera tekniska förändringsbegäran som stöder deras affärsbehov.

Safespring har också en process för att kontinuerligt förbättra deras tjänster och serviceleveransnivåer genom att lära av incidenter och använda ITIL4-ramverket för att identifiera möjligheter till förbättringar och för att implementera förändringar som stödjer deras kunders affärsbehov. Genom att följa ITIL4-ramverket kan Safespring säkerställa att deras processer och rutiner för hantering av kundrelationer är effektiva och stöder en kontinuerlig förbättring av deras tjänster och serviceleverans.

## Ordlista
Här är en lista över ord och begrepp som förklaras i texten om Safespring och deras tjänsteleverans till SciLifeLab. För att hjälpa till att förstå texten bättre och för att skapa en mer komplett bild av vad Safespring och SciLifeLab gör tillsammans.


{{% accordion title="Virtuell Maskin (VM)" %}}
VM står för virtuell maskin. Det är en programvara som simulerar en dator och låter flera operativsystem köras samtidigt på samma fysiska hårdvara.
{{% /accordion %}}

{{% accordion title="Service Level Agreement (SLA)" %}}
SLA står för Service Level Agreement och är en överenskommelse mellan två parter om vilken nivå av service som ska levereras och hur den ska mätas och rapporteras.
I detta sammanhang är det en överenskommelse mellan Safespring och SciLifeLab om vilken nivå av prestanda och service som ska levereras för molntjänsten.
{{% /accordion %}}

{{% accordion title="Graphics Processing Unit (GPU)" %}}
GPU står för Graphics Processing Unit och är en processor som är specialdesignad för att hantera grafiskt intensiva uppgifter, som till exempel datorspel och bild- eller videoredigering.
I detta sammanhang används GPU:er för proteinveckning och analys av bilddata inom forskning.
{{% /accordion %}}

{{< accordion-script >}}
