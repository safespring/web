---
title: "Elastisys bygger Welkin på Safespring Compute"
language: "sv"
date: 2023-09-18
draft: false
section: "Use case"
intro: "Welkin är Elastisys Kubernetes-plattform för miljöer där säkerhet, spårbarhet och regelefterlevnad behöver kunna granskas. På Safespring Compute körs den ovanpå nordisk IaaS."
background: "/safespring-elastisys.svg"
card: ""
socialmedia: ""
sidebarlinkname: ""
sidebarlinkurl: ""
sidebarlinkname2: ""
sidebarlinkurl2: ""
sidebarsection: ""
sidebarimage: "saas_elastisys.svg"
sidebartext: "Safespring levererar IaaS-lagret: compute, lagring, nätverk och datacenterplacering. Elastisys driver Welkin-lagret ovanpå och ansvarar för kundernas Kubernetes-plattform."
saas: ""
sidebarwhitepaper: ""
service: "Safespring Compute"
aliases:
  - /tjanster/case/elastisys/
  - /losningsfaktablad/welkin-pa-safespring/
  - /solution-brief/compliant-kubernetes/
---

{{< ingress >}}
På den här sidan visar vi hur ansvarsfördelningen ser ut när Welkin körs på Safespring Compute. Kunden bygger sin tjänst ovanpå Elastisys Kubernetes-plattform, medan Safespring ansvarar för den underliggande infrastrukturen.
{{< /ingress >}}

I lösningen levererar Safespring Compute-infrastrukturen, datacenterplaceringen, lagringen och nätverket. Elastisys driver Kubernetes-plattformen och kundnära tjänster. Det gör att leverantörskedjan kan beskrivas med avgränsat ansvar för varje part.

![Ansvarsfördelning mellan kund, Elastisys och Safespring](/img/saas/elastisys-safespring-compliant-kubernetes-pyramid.svg)

_Bilden visar ansvarsfördelningen. Safespring levererar infrastrukturen, Elastisys driver Welkin-lagret och kunden ansvarar för tjänst och team._

## Vad är Welkin?

Welkin är en Kubernetes-plattform från Elastisys för organisationer som vill köra containeriserade applikationer i miljöer där säkerhet, spårbarhet och regelefterlevnad behöver ingå från början. Plattformen bygger på Kubernetes och open source-komponenter och innehåller drift, säkerhetshärdning, monitorering och livscykelhantering.

För kunderna innebär det att de kan bygga och driftsätta applikationer utan att själva behöva äga hela Kubernetes-stacken. Welkin används i sammanhang där frågor om GDPR, patientdata, revisioner, åtkomstkontroll och leverantörsrisk behöver kunna besvaras.

Welkin är CNCF-certifierad som Kubernetes-distribution och innehåller kontroller för säkerhet i containeriserade miljöer. Exempel är intrångsdetektering med Falco, policykontroll med Open Policy Agent/Gatekeeper, automatisk certifikathantering med cert-manager, containerregister med säkerhetsskanning och stöd för CI/CD-flöden som ArgoCD.

Vid en säkerhetsgranskning behöver det därför gå att följa hur nätverkssegmentering, rollbaserad åtkomst, hemlighetshantering, sårbarhetsskanning, loggning och uppdateringar hanteras. Kontrollerna behöver kunna visas i den löpande driften, inte bara när klustret tas i bruk.

Den svåra delen är inte bara att starta ett Kubernetes-kluster, utan att drifta det med verkliga laster över tid. För reglerade miljöer behöver plattformen hantera uppgraderingar, testning, patchning, CVE-uppföljning, backup samt stödjande tjänster för loggning och monitorering utan att ansvarsfördelningen blir otydlig.

Det gör att Welkin kan användas genom hela mjukvarulivscykeln: utveckling, paketering, test, driftsättning, drift och revision. Safesprings roll är att ge den lokala Compute-infrastrukturen, datacenterplaceringen, lagringen och nätverket som plattformen kan köras på.

## Hur Elastisys använder Safespring

Safespring Compute ger Elastisys den infrastruktur som Welkin behöver för svenska och nordiska kunder. Det handlar om virtuella servrar, lagring, nätverk, datacenterplacering och åtkomst till en molnplattform som bygger på öppna standarder.

Elastisys kan lägga sitt arbete på Kubernetes-plattformen, säkerhetskontrollerna, driftmodellen och kundernas applikationsmiljöer. Safespring står för den lokala infrastrukturbasen och kan lämna underlag i frågor som ofta kommer upp i upphandlingar, säkerhetsgranskningar och tekniska genomlysningar.

För slutkunden blir leverantörskedjan enklare att beskriva. Applikationerna körs på en Kubernetes-plattform från Elastisys, ovanpå Safesprings nordiska IaaS-infrastruktur. Kunden kan se var data behandlas, vilka leverantörer som ingår och vilken del av driften varje part ansvarar för.

## Varför infrastrukturen spelar roll

För bolag som bygger egna plattformar, SaaS-tjänster eller tjänster för reglerade branscher behöver infrastrukturen kunna beskrivas för kunder, jurister, säkerhetsteam och inköpare.

När produkten hanterar känsliga data kommer frågor om dataplacering, tredjelandsrisker, supportvägar, åtkomst, avtal och underleverantörer ofta upp innan avtal eller driftstart. En lokal infrastrukturbas minskar inte behovet av eget säkerhetsarbete, men den ger konkreta uppgifter att använda när sådana frågor ska besvaras.

För Elastisys är Safespring ett sätt att erbjuda Welkin på en infrastruktur som passar kunder som vill ha europeisk drift, öppna tekniska gränssnitt och en nordisk leverantör med vana av reglerade miljöer.

{{% note "När den här modellen är relevant" %}}

Det här upplägget är relevant för bolag som:

- bygger en egen plattform eller SaaS-tjänst ovanpå molninfrastruktur
- säljer till kunder som granskar dataplacering, jurisdiktion och underleverantörer
- behöver Kubernetes och open source-komponenter utan att låsa produkten till ett hyperscaler-ekosystem
- behöver svara på frågor från offentlig sektor, medtech, healthtech, finans eller andra reglerade miljöer
- behöver en infrastrukturell partner som kan delta i tekniska och säkerhetsrelaterade frågor när affären kräver det

{{% /note %}}

## Vad Safespring bidrar med

Safespring är inte en ersättning för Elastisys produkt. Vårt bidrag är infrastrukturen som Welkin körs på. Det omfattar Safespring Compute, lagring, nätverk, nordisk datacenterplacering och ett arbetssätt där tekniska frågor kan hanteras nära de team som bygger tjänsten.

{{< icon-block-horisontal color="#195F8C" icon="fa-solid fa-layer-group" text="En infrastrukturbas som går att förklara" description="Compute, lagring, nätverk och datacenterplacering är tydligt avgränsade från Kubernetes-plattformen. Det gör ansvarsfördelningen lättare att beskriva för kunder, revisorer och säkerhetsteam." >}}
{{< icon-block-horisontal color="#32cd32" icon="fa-solid fa-location-dot" text="Nordisk drift för känsliga tjänster" description="Safespring ger en lokal IaaS-grund för kunder som behöver kontroll över var data behandlas, vilken jurisdiktion som gäller och vilka leverantörer som ingår i kedjan." >}}
{{< icon-block-horisontal color="#3C9BCD" icon="fa-solid fa-code-branch" text="Kubernetes och open source-komponenter" description="Welkin bygger på Kubernetes och open source-komponenter ovanpå Safespring Compute. Tjänsten behöver inte byggas på leverantörsspecifika molntjänster." >}}

Det är relevant även för andra plattformsbolag. Om ni bygger en plattform för kunder med dokumentations- och granskningskrav behöver infrastrukturdelen kunna beskrivas som en del av ert erbjudande.

## Bygger ni en tjänst som liknar Welkin?

Om ni utvecklar en plattform, SaaS-tjänst eller produkt för reglerade kunder behöver infrastrukturen kunna granskas och beskrivas. Safespring Compute kan användas när ni behöver kombinera molninfrastruktur med dataplacering i Norden, öppna standarder och en nordisk leverantör.

Prata med oss om er målbild, era kundkrav och vilken del av infrastrukturen ni vill äga själva. Då kan vi gå igenom om Safespring Compute passar er produkt, och hur ansvaret mellan er, Safespring och eventuella plattformspartners bör beskrivas.

{{% custom-card image="/img/card/safespring-fredric.webp" cardtitle="Fredric Wallsten" %}}
Kontakta mig om ni vill diskutera infrastruktur för er tjänst.

{{< inline "Ring" >}} [+46 76-629 25 02](tel:+46766292502)

{{< inline "E-post" >}} [hello@safespring.com](mailto:hello@safespring.com)
{{% /custom-card %}}
