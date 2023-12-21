---
title: "Testsida för GDPR beyond data transfer"
language: "Se"
date: 2019-01-07T13:58:58+01:00
draft: false
section: "Boka demo"
intro: "Safespring är den svenska publika molnplattformen som uppfyller europeiska dataskyddslagar. Vi är glada över att kunna erbjuda en säker och pålitlig plattform för våra kunder och deras data."
background: "safespring-blue-fade2.svg"
darkmode: "off"
socialmedia: ""
sidebarlinkname: "Boka demo"
sidebarlinkurl: "/demo"
sidebarlinkname2: "Kontaka Safespring"
sidebarlinkurl2: "/kontakt"
saas: ""
aliases: ""
---

# Externa dataskyddsåtgärder

En av Safesprings [Testlänk 1](#1) skyldigheter som personuppgiftsbiträde är att bistå personuppgiftsansvariga som använder våra tjänster med deras compliance-arbete (A28.3). Vi ska alltid göra det enklare, inte svårare, att uppfylla dataskyddskrav som träffar aktörer längre ned i värdekedjan. Vi tolkar detta som en positiv skyldighet att inte bara själva implementera säkerhetsåtgärder i våra egna system utan även informera våra kunder om vilka möjligheter vår infrastruktur ger dem att anpassa dataskydd efter behov. Här nedan följer en lista på tekniska säkerhetsfunktioner som kan bidra till högre processuell säkerhet och som vi antingen direkt tillhandahåller eller kan ge god rådvigning kring.

{{% accordion title="1. Logghantering och Säkerhetsåtgärder" id="1" %}}

Skydd mot intern och extern aktiv/aggressiv expertis: Safespring har för närvarande effektiv debug och systemloggning.  

Safesprings rekommendation till våra kunder är att använda etablerade branschverktyg för intrångsdetektering och granskningsloggning. Lagra loggar både lokalt och centralt, samt att använda verktyg för att identifiera normala loggmönster.  

Detta bidrar till att upprätthålla GDPR:s krav på
  - integritet (A5.1.f),
  - konfidentialitet (A5.1.f) och
  - ansvarsskyldighet (A5.2), samt
  - säkerhetsåtgärder för konfidentialitet och integritet (32.1.b).

{{% /accordion %}}
{{% accordion title="2. Användarhantering och Åtkomstkontroll" id="2" %}}

- **Skydd mot intern Passiv/Neutral Expert**: För att hantera risker associerade med anställdas misstag eller rolländringar, hanterar Safespring användaråtkomst noggrant. Alla konton måste vara individuella.
- **Safesprings rekommendation** till våra kunder är att  ta bort individuella konton när anställda slutar eller byter roller. Detta inkluderar användning av tidsbestämda behörigheter för applikationer och möjligheten att tvinga lagring av data på en server man ansluter till säkert för att undvika att känsliga filer lagras lokalt på användarens arbetsstation.
- **Detta bidrar till att upprätthålla GDPR:s krav på** 
  - korrekthet (A5.1.d),
  - lagringsminimering (A5.1.e),
  - integritet (A5.1.f) och
  - säkerhetsåtgärder för åtkomst (A32.1.b).
{{% /accordion %}}
  {{% accordion title="3. Datakryptering" id="3" %}}

- Safespring implementerar "encryption at rest" genom att använda diskkryptering på alla diskar i sina datacenter, vilket bidrar till att hjälpa kunden att säkra personuppgifter som de lagrar i plattformen enligt GDPR. Kryptering vid vila och transport är viktigt för att säkerställa att data hålls säker. Safespring tillämpar minst "TLS 1.2" vid kommunikation till och från alla tjänster.
- **Safesprings rekommendation** till våra kunder är att upprätta en "zero-knowledge" arkitektur, där data krypteras innan det skickas till Safesprings plattform, i de fall det är tillämpligt. Safesprings Backup-tjänst har den här funktionaliteten inbyggd som ett val som gör krypteringen automatiskt. Vid lagring av mindre känslig data kan kunden också lita på Safesprings inbyggda kryptering vid vila.
- **Detta överensstämmer med GDPR:s krav på att** 
  - inbyggt integritetsskydd (A25.2),
  - konfidentialitet (A5.1.f).
{{% /accordion %}}
  {{% accordion title="4. Backup och Återställning" id="4" %}}

- **Skydd mot fysisk och teknisk incidenthantering**: Safespring implementerar viktiga åtgärder för att säkerställa tillgänglighet och återställning av kunddata. Vi erbjuder en robust backup-lösning för våra interna tjänster och miljöer, men det är viktigt att notera att vi inte säkerhetskopierar kundinmatad data. Kunder uppmanas att själva säkerställa säkerhetskopiering av sitt data för att kunna återställa tillgängligheten och tillgången till personuppgifter vid behov. Vår backup-tjänst är ett värdefullt tillval som underlättar för kunder att uppfylla denna rekommendation.
- **Safesprings rekommendationer** till våra kunder är att aktivt hantera säkerhetskopiering och redundans av sina data. Genom att använda vår backup-tjänst och dra nytta av vår robusta blocklagring, kan kunder säkerställa hög tillgänglighet och snabb återställning av sina data.
- **GDPR-överensstämmelse**: Genom dessa åtgärder uppfyller vi GDPR:s krav på att säkerställa tillgänglighet, återställningsbarhet och motståndskraft hos behandlingssystemen och tjänsterna (A32.1.c).

{{% /accordion %}}
  {{% accordion title="5. Säkerhetsrevision och Policy Uppdatering" id="5" %}}

- **Policydokument och Revisioner**: Safespring har flera policydokument och säkerhetsguider, vilket gör  att vi regelbundet uppdaterar och reviderar våra säkerhetspolicyer.
- **Safesprings rekommendationer** till våra kunder är att regelbundet uppdatera och reviderar sina egna säkerhetspolicyer för att säkerställa att de upprättade rutinerna följs eller för att uppdatera rutinerna så att de speglar verksamheten i praktiken.
- **Detta är i linje med GDPR:s krav på**: 
  - att regelbundet testa, undersöka och utvärdera effektiviteten hos tekniska och organisatoriska åtgärder för att säkerställa behandlingens säkerhet (Artikel 32).
{{% /accordion %}}
  {{% accordion title="6. Redundans" id="6" %}}

- **Skydd mot fysisk och tekniskt haveri eller ransomware** 
- **Central blocklagring för ökad redundans**: Som en del av vår tjänst erbjuder vi central blocklagring till Safespring Compute, där data lagras i tre kopior över ett kluster, vilket minimerar beroendet av specifika hårddiskar. Denna åtgärd är avgörande för att säkerställa dataåtkomst och återställning, och stärker vår position i överensstämmelse med GDPR Art 32.1.c.
- **GDPR**
  - motståndskraft hos behandlingssystemen och -tjänsterna (32.1c)

{{% /accordion %}}
{{< accordion-script >}}

# Interna dataskyddsåtgärder

Interna dataskyddsåtgärder är sådana som Safespring implementerar för personuppgifter vi själva ansvarar för. Vi är ett molnbolag som är verksamma mot andra företag. Vår kommersiella verksamhet omfattar personuppgifter i ytterst begränsad omfattning. I produktion hanteras endast användarnamn och lösenord till användare i plattformen.

Inom det administrativa området är det framför allt vid hantering av fakturor, administration av personal, genom vår webbsida och vid vissa typer av informationsutskick i marknadsföringssyfte som vi hanterar kontaktuppgifter eller aggregerad statistik.

För alla typer av bokföringsåtgärder är vi bundna av aktiebolagslagen, bokföringslagen, skattelagstiftningen och riktlinjer om god revisionssed. Kvittenser, avtal, fakturor (ingående och utgående) eller information om sjukersättningsbetalningar bevaras i sju år för att tillgodose behovet av efterhandskontroller av vår bokföring. Efter det gallras uppgifterna i enlighet med vår policy för dataskydd vid personalhantering.

För marknadsföring utöver webbanalys gäller att man interagerar med Safespring baserat på samtycke eller vår berättigade intresse. Det kan exempelvis vara att en person i någon social media markerat sig som intresserad av molntjänster och därför, till följd, antas av oss vara intresserad av Safespring även om man inte personligen tagit kontakt med vår CMO. I andra fall får vi del av kontaktuppgifter när personer anmäler sig till event och seminarier.

Vid webbanalys samlar vi in aggregerade uppgifter som hanteras via ett lokalt verktyg (Matomo) efter att en person som besöker vår webbplats markerat att den godkänner sådan uppgiftsinsamling. Vidare information finns på vår webbplats.