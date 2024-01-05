---
title: "Safespring: Omfattande GDPR-skydd utöver tredjelands­överföring"
language: "Se"
date: 2024-01-01T13:58:58+01:00
draft: false
section: "Boka demo"
intro: "Här ger vi en djupgående översikt över hur vår svenska publika molnplattform inte bara uppfyller de stränga kraven i GDPR, men också går ett steg längre för att säkerställa ditt företags dataskydd. Med Safespring får du inte bara en lösning som skyddar mot dataöverföring till tredjeland, utan en omfattande strategi som täcker fler aspekter av dataskydd och säkerhet. "
background: "safespring-blue-fade2.svg"
darkmode: "off"
socialmedia: ""
sidebarlinkname: "Boka demo"
sidebarlinkurl: "/demo"
sidebarlinkname2: "Kontaka Safespring"
sidebarlinkurl2: "/kontakt"
saas: ""
aliases: ""
TOC: "På denna sida"
---

{{< icon-block-container >}}
    {{< icon-block icon="fa-solid fa-file-alt" text="White Paper Schrems II" link="/whitepaper/schrems-ii/" color="#32cd32">}}
    {{< icon-block icon="fa-solid fa-video" text="Webcastserie om GDPR" link="/webinar/gdpr-fireside-chat/" color="#195F8C">}}
    {{< icon-block icon="fa-solid fa-database" text="Om våra datacenter" link="/om-safespring/datacenter/" color="#3C9BCD">}}
    {{< icon-block icon="fa-solid fa-user-shield" text="Personuppgifts-policy" link="/dokument/personuppgiftshantering/" color="#3C9BCD">}}
    {{< icon-block icon="fa-solid fa-shield-alt" text="Externa dataskydds­åtgärder" link="#externa-dataskyddsåtgärder" color="#FA690F">}}
    {{< icon-block icon="fa-solid fa-lock" text="Interna dataskydds­åtgärder" link="#interna-dataskyddsåtgärder" color="#195F8C">}}
{{< /icon-block-container >}}



## Externa dataskyddsåtgärder

Safesprings skyldighet som ert personuppgiftsbiträde är att aktivt bistå med er regelefterlevnad. (enligt artikel 28.3). Vi är här för att göra ert arbete enklare och mer effektivt när det kommer till att uppfylla de strikta dataskyddskraven. Vår molnplattform säkerställer att ni, som personuppgiftsansvariga, alltid kan leva upp till de krav som GDPR ställer på er.

Vi tolkar detta som en positiv skyldighet att inte bara själva implementera säkerhetsåtgärder i våra egna system utan även informera våra kunder om vilka möjligheter vår infrastruktur ger dem att anpassa dataskydd efter behov. Här nedan följer en lista på tekniska säkerhetsfunktioner som kan bidra till högre processuell säkerhet och som vi antingen direkt tillhandahåller eller kan ge god rådvigning kring.





{{% accordion title="Logghantering och säkerhetsåtgärder" id="1" %}}

Skydd mot intern och extern aktiv/aggressiv expertis: Safespring har för närvarande effektiv debug och systemloggning.  

#### Safesprings rekommendation till våra kunder 
Vår rekommendation är att använda etablerade branschverktyg för intrångsdetektering och granskningsloggning. Lagra loggar både lokalt och centralt, samt att använda verktyg för att identifiera normala loggmönster.  

#### Detta bidrar till att upprätthålla GDPR:s krav på
  - integritet (A5.1.f),
  - konfidentialitet (A5.1.f) och
  - ansvarsskyldighet (A5.2), samt
  - säkerhetsåtgärder för konfidentialitet och integritet (32.1.b).
{{% /accordion %}}








{{% accordion title="Användarhantering och åtkomstkontroll" id="2" %}}

Skydd mot intern Passiv/Neutral Expert: För att hantera risker associerade med anställdas misstag eller rolländringar, hanterar Safespring användaråtkomst noggrant. Alla konton måste vara individuella.

#### Safesprings rekommendation till våra kunder
Vår rekommendation är att  ta bort individuella konton när anställda slutar eller byter roller. Detta inkluderar användning av tidsbestämda behörigheter för applikationer och möjligheten att tvinga lagring av data på en server man ansluter till säkert för att undvika att känsliga filer lagras lokalt på användarens arbetsstation.

#### Detta bidrar till att upprätthålla GDPR:s krav på
  - korrekthet (A5.1.d),
  - lagringsminimering (A5.1.e),
  - integritet (A5.1.f) och
  - säkerhetsåtgärder för åtkomst (A32.1.b).
{{% /accordion %}}







{{% accordion title="Datakryptering" id="3" %}}

Safespring implementerar "encryption at rest" genom att använda diskkryptering på alla diskar i sina datacenter, vilket bidrar till att hjälpa kunden att säkra personuppgifter som de lagrar i plattformen enligt GDPR. Kryptering vid vila och transport är viktigt för att säkerställa att data hålls säker. Safespring tillämpar minst "TLS 1.2" vid kommunikation till och från alla tjänster.

#### Safesprings rekommendation till våra kunder 
Vår rekommendation är att upprätta en "zero-knowledge" arkitektur, där data krypteras innan det skickas till Safesprings plattform, i de fall det är tillämpligt. Safesprings Backup-tjänst har den här funktionaliteten inbyggd som ett val som gör krypteringen automatiskt. Vid lagring av mindre känslig data kan kunden också lita på Safesprings inbyggda kryptering vid vila.

#### Detta överensstämmer med GDPR:s krav på
  - inbyggt integritetsskydd (A25.2),
  - konfidentialitet (A5.1.f).
{{% /accordion %}}







{{% accordion title="Backup och återställning" id="4" %}}

Skydd mot fysisk och teknisk incidenthantering: Safespring implementerar viktiga åtgärder för att säkerställa tillgänglighet och återställning av kunddata. Vi erbjuder en robust backup-lösning för våra interna tjänster och miljöer, men det är viktigt att notera att vi inte säkerhetskopierar kundinmatad data. Kunder uppmanas att själva säkerställa säkerhetskopiering av sitt data för att kunna återställa tillgängligheten och tillgången till personuppgifter vid behov. Vår backup-tjänst är ett värdefullt tillval som underlättar för kunder att uppfylla denna rekommendation.

#### Safesprings rekommendationer till våra kunder 
Vår rekommendation är att aktivt hantera säkerhetskopiering och redundans av sina data. Genom att använda vår backup-tjänst och dra nytta av vår robusta blocklagring, kan kunder säkerställa hög tillgänglighet och snabb återställning av sina data.

#### Detta överensstämmer med GDPR:s krav på
  - tillgänglighet, 
  - återställningsbarhet och 
  - motståndskraft hos behandlingssystemen och tjänsterna (A32.1.c).

{{% /accordion %}}







{{% accordion title="Säkerhetsrevision och policy uppdatering" id="5" %}}

Policydokument och revisioner: Safespring har flera policydokument och säkerhetsguider, vilket gör  att vi regelbundet uppdaterar och reviderar våra säkerhetspolicyer.

#### Safesprings rekommendationer till våra kunder 
Vår rekommendation är att regelbundet uppdatera och reviderar sina egna säkerhetspolicyer för att säkerställa att de upprättade rutinerna följs eller för att uppdatera rutinerna så att de speglar verksamheten i praktiken.

#### Detta överensstämmer med GDPR:s krav på
  - att regelbundet testa, undersöka och utvärdera effektiviteten hos tekniska och organisatoriska åtgärder för att säkerställa behandlingens säkerhet (Artikel 32).
{{% /accordion %}}







{{% accordion title="Redundans" id="6" %}}

Skydd mot fysisk och tekniskt haveri eller ransomware

Central blocklagring för ökad redundans: Som en del av vår tjänst erbjuder vi central blocklagring till Safespring Compute, där data lagras i tre kopior över ett kluster, vilket minimerar beroendet av specifika hårddiskar. Denna åtgärd är avgörande för att säkerställa dataåtkomst och återställning vid tekniskt haveri.

#### Detta överensstämmer med GDPR:s krav på
  - motståndskraft hos behandlingssystemen och -tjänsterna (32.1c)

{{% /accordion %}}
{{< accordion-script >}}





{{< horisontal-card image="/img/card/safespring-scaleut_use-case-ebba.webp" cardtitle="Federerad maskininlärning" link="/tjanster/case/scaleout/" linktext="Läs Use Case" text="“Eftersom maskininlärning och AI-initiativ av detta slaget kräver hantering av stora mängder känslig data, är det viktigt att företag har kontroll och kan förlita sig på en pålitlig leverantör med hög datasäkerhet och integritet.”" >}}





## Interna dataskyddsåtgärder

Interna dataskyddsåtgärder är sådana som Safespring implementerar för personuppgifter vi själva ansvarar för. Vi är ett molnbolag som är verksamma mot andra företag. Vår kommersiella verksamhet omfattar personuppgifter i ytterst begränsad omfattning. I produktion hanteras endast användarnamn och lösenord till användare i plattformen.

### Administrativ datahantering

Inom det administrativa området är det framför allt vid hantering av fakturor, administration av personal, genom vår webbsida och vid vissa typer av informationsutskick i marknadsföringssyfte som vi hanterar kontaktuppgifter eller aggregerad statistik.

För alla typer av bokföringsåtgärder är vi bundna av aktiebolagslagen, bokföringslagen, skattelagstiftningen och riktlinjer om god revisionssed. Kvittenser, avtal, fakturor (ingående och utgående) eller information om sjukersättningsbetalningar bevaras i sju år för att tillgodose behovet av efterhandskontroller av vår bokföring. Efter det gallras uppgifterna i enlighet med vår policy för dataskydd vid personalhantering.

### Marknadsföringsåtgärder och samtycke

För marknadsföring utöver webbanalys gäller att man interagerar med Safespring baserat på samtycke eller vår berättigade intresse. Det kan exempelvis vara att en person i någon social media markerat sig som intresserad av molntjänster och därför, till följd, antas av oss vara intresserad av Safespring även om man inte personligen tagit kontakt med vår CMO. I andra fall får vi del av kontaktuppgifter när personer anmäler sig till event och seminarier.

Vid webbanalys samlar vi in aggregerade uppgifter som hanteras via ett lokalt verktyg (Matomo) efter att en person som besöker vår webbplats markerat att den godkänner sådan uppgiftsinsamling. Vidare information finns på vår webbplats.