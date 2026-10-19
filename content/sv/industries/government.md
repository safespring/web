---
language: "sv"
title: "Molntjänster för svenska myndigheter"
metatitle: "Molntjänster för myndigheter i Sverige | Safespring"
cardtitle: "Myndigheter"
date: 2022-03-03T10:47:25+01:00
card: "safespring_card_31.svg"
draft: false
intro: "Svenska molntjänster för myndigheter. Se dataplacering, ansvar, säkerhetsunderlag och vad ni behöver kontrollera inför upphandling."
background: "safespring-government-background.svg"
sidebarlinkname2: "Läs om Cloud Act"
sidebarlinkurl2: "/vitbok/cloud-act-fisa-702-och-gdpr-for-svenska-molntjanster/"
aliases:
  - /myndighet/
  - /branscher/myndigheter/
  - /branscher/myndigheter/daniel.melin@safespring.com
  - /branscher/kommuner/
slug: "myndigheter"
sidebarlinkurl: "/kontakt/"
sidebarlinkname: "Prata med Fredric"
banner: "blue-hover-blogg"
cardicon: "fa-solid fa-building-columns"
cardcolor: "#417DA5"
cardintro: "Molntjänster för myndigheter med underlag om dataplacering, säkerhet och upphandling."
TOC: "På denna sida"
---

{{< icon-block-container >}}
{{< icon-block icon="fa-solid fa-location-dot" text="Datacenter" link="#dataplacering" color="#195F8C">}}
{{< icon-block icon="fa-solid fa-balance-scale" text="Ansvar och säkerhet" link="#juridisk-sakerhet" color="#195F8C">}}
{{< icon-block icon="fa-solid fa-file-signature" text="Ramavtal" link="#ramavtal" color="#FA690F">}}
{{< icon-block icon="fa-solid fa-code-branch" text="Öppna standarder" link="#oppna-standarder" color="#3C9BCD">}}
{{< icon-block icon="fa-solid fa-leaf" text="Hållbarhet" link="#hallbarhet" color="#32cd32">}}
{{< icon-block icon="fa-solid fa-phone" text="Kontakt" link="#kontakt" color="#3C9BCD">}}
{{< /icon-block-container >}}

## Svenska molntjänster

{{< ingress >}}
Safespring levererar molntjänster från datacenter i Sverige och Norge. Plattformen bygger på öppen källkod och öppna standarder. Här hittar ni underlag för att bedöma om tjänsterna passar er myndighets krav på dataplacering, säkerhet och drift.
{{< /ingress >}}

Vill ni först jämföra tjänsterna? I [tjänsteöversikten]({{< relref "services/_index.md" >}}) hittar ni bland annat virtuella servrar, Kubernetes och objektlagring.

## Underlag för er utvärdering

### Dataplacering {#dataplacering}

Våra [datacenter]({{< relref "data-centers.md" >}}) finns i Stockholm och Oslo. Stäm av vilken tjänst och region ni behöver inför beställning. Om era krav innebär att uppgifter ska stanna i Sverige behöver ni även klargöra var säkerhetskopior och loggar lagras och varifrån eventuell supportåtkomst sker.

### Ansvar och säkerhet {#juridisk-sakerhet}

Utgå från vilka uppgifter ni ska behandla och vilket skydd de behöver. Myndigheten behöver bedöma den tänkta användningen mot bland annat dataskyddsförordningen och offentlighets- och sekretesslagen. Svensk dataplacering ersätter inte den bedömningen.

Använd följande underlag i granskningen:

- **Personuppgifter:** vårt [personuppgiftsbiträdesavtal](/compliance/data_processing_agreement/) beskriver behandling på kundens uppdrag, säkerhetsåtgärder och villkor för underbiträden. Enligt avtalet är kunden personuppgiftsansvarig och Safespring personuppgiftsbiträde för denna behandling.
- **Informationssäkerhet:** Safesprings ledningssystem är certifierat enligt SS-EN ISO/IEC 27001:2023. Läs [certifikatets omfattning och giltighet]({{< relref "compliance/iso-27001.md" >}}) som en del av er utvärdering.
- **Drift och återställning:** gå igenom ansvar för behörigheter, uppdateringar, säkerhetskopiering och återställning för de tjänster ni väljer. I [dokumentationen för Compute](https://docs.safespring.com/compute/security-compliance/data-management/) finns exempel på gränsen mellan infrastrukturen och kundens miljö.

<span id="politisk-sakerhet"></span>
Bedöm också leverantörsberoenden och vilka lagar som kan påverka behandlingen. [eSams vägledning om att analysera molntjänster](https://www.esamverka.se/publikationer/sakerhet/2025-04-15-att-analysera-molntjanster---nagra-utgangspunkter.html) kan ge stöd i myndighetens utredning.

## Ramavtal

Statens inköpscentral har ramavtalen [Informationsförsörjning](https://www.avropa.se/ramavtal/ramavtalsomraden/programvaror-och-tjanster/Programvaror-och-tjanster/informationsforsorjning/) och [Programvarulösningar](https://www.avropa.se/ramavtal/ramavtalsomraden/programvaror-och-tjanster/Programvaror-och-tjanster/programvarulosningar/). Båda använder förnyad konkurrensutsättning.

Kontrollera på Avropa att er organisation är avropsberättigad och att behovet ryms inom det aktuella ramavtalet. Kontakta oss för att stämma av om Safesprings tjänster kan ingå i ert avrop, genom vilken ramavtalsleverantör och med vilken ansvarsfördelning. Avtalspart och omfattning behöver vara klara inför avropet.

## Prata med oss om era krav {#kontakt}

{{% custom-card image="/img/kontakt/fredric-wallsten-2023.webp" cardtitle="Fredric Wallsten" %}}
Jag är CCO på Safespring. Kontakta mig för att gå igenom era behov, relevant tjänstedokumentation och möjliga vägar till upphandling.

[Ring +46 (0)76 629 25 02](tel:+46766292502)<br>
[fredric.wallsten@safespring.com](mailto:fredric.wallsten@safespring.com)
{{% /custom-card %}}

## Öppen teknik och hållbarhet

### Öppen källkod {#oppen-kallkod}

Safesprings plattform bygger på öppen källkod, bland annat OpenStack för virtuella servrar.

### Öppna standarder {#oppna-standarder}

Med OpenStack-API och S3-kompatibel objektlagring kan ni använda verktyg som stöder dessa gränssnitt. Kontrollera kompatibilitet och planera hur data och applikationer ska kunna flyttas när behoven förändras.

### Hållbarhet {#hallbarhet}

Våra datacenter i Sverige och Norge använder el från förnybara energikällor. I Stockholm Norr återvinns överskottsvärme till fjärrvärmenätet. Läs mer om respektive anläggning på [datacentersidan]({{< relref "data-centers.md" >}}).

### Kollektivavtal

Vi erbjuder kollektivavtal i Sverige och jämförbara villkor utanför Sverige.
