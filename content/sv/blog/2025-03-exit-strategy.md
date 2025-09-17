---
ai: true
title: "När du vill, behöver eller tvingas lämna en amerikansk molnleverantör"
date: 2025-03-26
intro: "Oavsett varför du lämnar, ställs du inför Exit-dilemmat."
draft: false
tags: ["English"]
showthedate: true
card: "safespring_card_54.svg"
eventbild: ""
socialmediabild: ""
language: "sv"
sectiontext: "Blogg"
section: "blogg"
author: "Daniel Melin"
aliases:
  - /blogg/2025/2025-03-exit-strategy/
---
{{< ingress >}}
I dagens geopolitiska landskap, där USA snabbt försöker bli mer likt Kina och Ryssland, ställs kunder hos amerikanska molnleverantörer inför svåra beslut.
{{< /ingress >}}

**Vill du lämna?** Kanske tycker du att USA har gått för långt i att rasera sin demokrati, eller att saker och ting i allmänhet håller på att spåra ur.

**Behöver du lämna?** Kanske kräver din kund att din tjänst är fri från amerikanska kopplingar, eller så vägrar dina medarbetare att arbeta med amerikanska molnleverantörer, eller så försvinner Trans-Atlantic Data Privacy Framework. Om du är i offentlig sektor eller främst säljer till offentlig sektor kan du behöva ompröva om du kan lagra och behandla personuppgifter och/eller sekretessbelagd information.

**Är du tvungen att lämna?** Kanske har Trump beslutat att din organisation, ditt land eller din kontinent är MYCKET DÅLIG och därför inte längre ska ha tillgång till amerikanska molntjänster, eller så gör tullar att molntjänsterna blir för dyra att använda.

Oavsett varför du lämnar står du inför Exit-dilemmat.

{{% note "Exitprocessen" %}}
Här är en lista över sådant du kan överväga i Exitprocessen:

1. Dokumentera vilka amerikanska molntjänster du använder.
2. Dokumentera vilka typer av tjänster du köper. IaaS, PaaS, SaaS eller annan XaaS?
3. Dokumentera vilken typ av data som lagras och behandlas i tjänsterna.
4. Försök att läsa avtalet/avtalen. De är ofta mycket långa, mycket komplexa, mycket kundovänliga och inte alltid kompletta.
   1. Vilka rättigheter har du till din data och metadata?
   1. Kan du extrahera allt?
   1. I vilka format kan du få ut data och metadata?
   1. Går det att återanvända data och metadata utan förlust?
5. Om du använder compute-instanser och S3-lagring bör processen vara ganska okomplicerad och det bör inte ske någon dataförlust.
6. Om du använder Kubernetes och containrar finns det vissa fallgropar, men du bör kunna migrera utan dataförlust.
7. Om du är utvecklaren bakom en SaaS som använder någon annans IaaS/PaaS kommer utfallet att variera mycket beroende på hur låst du är till funktioner som bara finns hos en enda molnleverantör. I det här fallet kan det vara nödvändigt att ändra din applikation så att den kan köras i vilken standardiserad molnmiljö som helst. Det kommer att vara fördelaktigt för dig i längden ändå. :)
8. Nätverk är nyckeln. Vid migrering mellan plattformar är det viktigt att kunna hantera övergången. Det kan göras genom att sätta upp ett overlay-nätverk som spänner över båda plattformarna. På så sätt kan varje funktion migreras med minimal påverkan.

{{% /note %}}

Oavsett din situation, prata med oss på Safespring så guidar vi dig genom din Exit.

{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Daniel Melin" %}}
Jag är Safesprings Business Development Manager. Oavsett om du är intresserad av att upphandla våra tjänster eller vill lära dig mer om initiativ som EuroStack, finns jag här för att hjälpa dig att navigera och dra nytta av våra erbjudanden.

{{< inline "Ring" >}} +46 (0)76 868 00 59
[daniel.melin@safespring.com](mailto:daniel.melin@safespring.com)
{{% /custom-card %}}