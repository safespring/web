---
ai: true
title: "Att skapa ett bibliotek med öppen källkod för säkerhetskopieringsklienter"
date: "2023-04-21"
publishDate: "2023-04-23"
intro: "Utforska vårt öppna källkodsbaserade Cloutility API-klientbibliotek för att förenkla registrering och hantering av backupklienter."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknikuppdatering"
author: "Daniel de Oquiñena"
language: "sv"
toc: ""
sidebarlinkname: "Cloutility-api-client repo"
sidebarlinkurl: "https://github.com/safespring-community/cloutility-api-client"
sidebarlinkname2: ""
sidebarlinkurl2: ""
aliases:
  - /blogg/2023/2023-04-creating-an-opensource-backup-client-library/
---
{{< ingress >}}
På Safespring brinner vi för open source-teknik. Vår plattform bygger på flera open source-produkter, och vi är måna om att ge tillbaka till communityt närhelst det är möjligt.
{{< /ingress >}}

Ibland behöver vi dock en lösning som ännu inte finns. Så var fallet när vi ville skapa ett verktyg för att förenkla registreringsprocessen för backupklienter till vår backuplösning.

Safesprings backuplösning bygger på IBM Spectrum Protect och frontas av programvaran Auwau's Cloutility. Denna kombination ger en kraftfull backuplösning i företagsklass och Cloutility tillhandahåller både kundportal och ett rikligt API. Vi kunde dock inte hitta något befintligt klientbibliotek som kunde användas för att anropa Cloutility-API:t.

Därför bestämde vi oss för att anta utmaningen själva i hopp om att gynna inte bara Safespring, utan också andra organisationer och användare med en liknande uppsättning. För några veckor sedan började vi därför arbeta med projektet "cloutility-api-client". Biblioteket är långt ifrån funktionskomplett, men gör det möjligt att anropa Cloutility-API:t och innehåller omkring 15 metoder för arbete med affärsenheter (business-units), konsumenter (consumers) och noder. Med dessa metoder kan man till exempel skapa och ta bort affärsenheter och konsumenter samt hantera noder och deras tillhörande data.

Utöver detta skrev vi även ett enkelt CLI-verktyg för generella ändamål som gör att operatörer snabbt och enkelt kan interagera med Cloutility-API:t och som implementerar alla metoder som för närvarande finns tillgängliga i cloutapi-package.

Styrkan i ett bibliotek ligger dock i möjligheten att utökas med skräddarsydda verktyg och integrationer, och vi hoppas få se verktyg skapade av communityt som ytterligare kan förenkla registreringsprocessen och förbättra livscykelhanteringen av backupnoder.

Därför välkomnar vi bidrag från communityt för att utöka de tillgängliga funktionerna och ta fram specialiserade verktyg som uppfyller specifika behov. Vårt mål, som alltid, är att skapa en robust och flexibel lösning som enkelt kan anpassas till olika miljöer och användningsfall, och vi hoppas att vårt arbete med Cloutility API-klienten möjliggör detta.

{{% note "Rekommenderad läsning" %}}
Fördjupa dig i världen av öppen källkod för hantering av backupklienter genom att läsa vår senaste artikel om [Automatisera registrering av backupnoder med Cloutility API-klienten.](/blogg/2023/2023-04-using-cloutility-api-client-to-auto-enroll-backup-clients/) Trevlig läsning!
{{% /note %}}

## Förstå viktiga begrepp

Utforska en kortfattad guide som förklarar centrala termer i vår artikel om det öppna Cloutility API-klientbiblioteket. Få en djupare förståelse för de begrepp och tekniker som diskuteras för att bättre uppskatta deras betydelse för hantering och registrering av backupklienter.

{{% accordion title="Öppen källkod" %}}
Öppen källkod avser programvara eller projekt vars källkod görs tillgänglig för allmänheten, vilket gör att vem som helst kan granska, använda, modifiera och distribuera koden. Detta främjar samarbete, innovation och transparens samt uppmuntrar till delning av kunskap och resurser inom utvecklarcommunityt.
{{% /accordion %}}

{{% accordion title="Backupklient" %}}
En backupklient är ett program eller verktyg som körs på en enhet (till exempel en dator eller server) och ansvarar för att skicka data till en backupserver eller ett backuplösning. Syftet med en backupklient är att skydda och bevara data genom att skapa säkerhetskopior som kan återställas vid dataförlust, korruption eller andra problem.
{{% /accordion %}}

{{% accordion title="API" %}}
API, kort för Application Programming Interface, är en uppsättning regler och protokoll som gör det möjligt för olika program att kommunicera och dela data med varandra. API:er definierar hur information begärs, skickas och tas emot mellan system, vilket gör det möjligt för utvecklare att bygga applikationer som drar nytta av andra tjänsters funktioner och data.
{{% /accordion %}}

{{% accordion title="IBM Spectrum Protect" %}}
IBM Spectrum Protect, tidigare känt som Tivoli Storage Manager (TSM), är en lösning för dataskydd och återställning som hjälper organisationer att hantera och skydda sin kritiska data. Den erbjuder centraliserad, automatiserad hantering av backup och återställning och stödjer en rad plattformar, lagringsenheter och applikationer. IBM Spectrum Protect bidrar till att säkerställa dataintegritet, minimera driftstopp och sänka driftskostnader.
{{% /accordion %}}

{{% accordion title="Auwau's Cloutility" %}}
Auwau's Cloutility är en programvarulösning som erbjuder en användarvänlig kundportal och ett API för att hantera backup- och återställningstjänster. Den fungerar som ett frontend-gränssnitt för backuplösningar i företagsklass som IBM Spectrum Protect, vilket gör det enklare för användare att hantera och övervaka sina säkerhetskopior. Cloutility strömlinjeformar backupflödet och förbättrar den övergripande användarupplevelsen.
{{% /accordion %}}

{{% accordion title="CLI-verktyg" %}}
CLI, kort för Command Line Interface, är ett textbaserat gränssnitt som låter användare interagera med ett datorprogram eller operativsystem genom att skriva kommandon, i stället för att använda ett grafiskt användargränssnitt (GUI). Ett CLI-verktyg är ett program som använder kommandoraden för att utföra uppgifter, och erbjuder ett snabbt och effektivt sätt för erfarna användare att interagera med ett system.
{{% /accordion %}}

{{< accordion-script >}}