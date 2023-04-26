---
title: "Safespring On-Premise Cloud"
language: "Se"
date: 2019-01-07T13:58:58+01:00
draft: false
intro: "Få hjälp med att sätta upp din egen miljö som vi underhåller. Då får du kraften från molnet - i ditt- eller vårt datacenter."
background: ""
form: ""
socialmedia: "safespring-private-cloud.jpg"
aliases:
    - /private-cloud/
    - /tjanster/managed-private-cloud/
section: "Private Cloud"
toc: "På denna sida"
---

{{< ingress >}}
Safespring On-Premise Cloud är en säker och anpassningsbar privat molnlösning, speciellt utformad för att möta kraven från myndigheter och större organisationer. 
{{< /ingress >}}

Tjänsten erbjuder en kombination av molnteknikens flexibilitet och kontrollen över en lokal, on-premise infrastruktur. Safespring On-Premise Cloud är en idealisk lösning för de som vill dra nytta av molnteknikens många fördelar samtidigt som de behåller full kontroll över sin data och infrastruktur.

{{< icon-block-container >}}
    {{< icon-block icon="fa-solid fa-user-lock" text="Digital suveränitet" link="#sakerhetsatgarder" color="#32cd32">}}
    {{< icon-block icon="fa-solid fa-headset" text="Professionell support" link="#support" color="#195F8C">}}
    {{< icon-block icon="fa-solid fa-shield-alt" text="Säkerhet/ efterlevnad" link="#sakerhetsatgarder" color="#3C9BCD">}}
    {{< icon-block icon="fa-solid fa-tachometer-alt" text="Hög tillgänglighet" link="#tillg%C3%A4nglighet" color="#3C9BCD">}}
    {{< icon-block icon="fa-solid fa-expand-arrows-alt" text="Flexibel skalbarhet" link="#skalning-av-resurser" color="#FA690F">}}
    {{< icon-block icon="fa-solid fa-users-cog" text="Tekniskt kontoansvarig" link="#technical-account-manager-tam" color="#32cd32">}}
{{< /icon-block-container >}}

{{< distance >}}

## Fördelar med Safespring On-Premise Cloud
När du väljer Safespring On-premise Cloud får du en rad fördelar som hjälper din organisation att utnyttja förmånerna med molnteknologi samtidigt som du behåller kontroll över dina resurser och data.

{{% accordion title="Lagra och hantera data" %}}
Safespring On-Premise Cloud erbjuder säker och skalbar lagring för er data, inklusive dokument, databaser och applikationsfiler. Tjänsten ger er möjlighet att snabbt och enkelt lagra, hämta och säkerhetskopiera data.
{{% /accordion %}}

{{% accordion title="Driftsätta och köra applikationer" %}}
Ni kan snabbt och enkelt driftsätta era applikationer, oavsett om det gäller interna system, webbapplikationer eller andra programvara som krävs för att driva er verksamhet. Safespring Compute erbjuder kapacitet för att köra virtuella maskiner, containrar och andra arbetsbelastningar.
{{% /accordion %}}

{{% accordion title="Skalning av resurser" id="skalning-av-resurser" %}}
Safespring On-Premise Cloud ger er möjlighet att enkelt skalera er infrastruktur både vertikalt och horisontellt, vilket innebär att ni kan anpassa resurserna efter era behov och krav utan att påverka prestanda eller säkerhet.
{{% /accordion %}}

{{% accordion title="Automatisering och resurshantering" %}}
Med Safespring On-Premise Cloud kan ni automatisera rutinmässiga uppgifter, som att skapa nya instanser, säkerhetskopiera data eller övervaka resursanvändning. Ni får också tillgång till API-tjänster för att integrera Safespring On-Premise Cloud med era befintliga system och verktyg.
{{% /accordion %}}

{{% accordion title="Säkerhetsåtgärder och efterlevnad" id="sakerhetsatgarder" %}}
Safespring On-Premise Cloud är utformad med fokus på säkerhet och efterlevnad, vilket innebär att ni kan känna er trygga i att er data och infrastruktur är skyddad mot interna och externa hot. Safespring är ett svenskt bolag utan koppling till ägare utanför Sverige.
{{% /accordion %}}

{{% accordion title="Tekniskt stöd och teknisk kontoansvarig" %}}
Ni får tillgång till snabb och professionell support samt möjlighet att lägga till en Technical Account Manager (TAM) som en extra tjänst. TAM:en hjälper er med kapacitetsplanering, incidentrapportering och ger insikt i Safesprings nuvarande och kommande produktutbud.
{{% /accordion %}}

## Tillgänglighet

{{< ingress >}}
Safespring OnPrem Cloud erbjuder ett Service Level Agreement (SLA) med tillgänglighet på 99,9% för Compute och Storage Service API.
{{< /ingress >}}

För Safespring Compute Service gäller en tillgänglighet på 99,9% för varje fysisk compute host. SLA:n täcker dock inte tillgänglighetsproblem som orsakas av hårdvaruproblem för instanser som kör lokala diskinstanser.

{{% accordion title="Information om driftstopp" %}}
Kunder informeras om både planerade driftstopp för underhållsarbete och oplanerade driftstopp på en privat statussida. Kunderna får ett antal konton för statussidan och kan ställa in notifikationer via e-post eller en webhook. Detta säkerställer att ni alltid är uppdaterade om eventuella ändringar i er Safespring On-Premise Clouds tillgänglighet och kan vidta lämpliga åtgärder vid behov.

Otillgänglighet för en tjänst mäts från det att tjänsten avbryts tills den åter accepterar kundlast. För Compute Service anses en datorvärd vara tillgänglig när de instanser som kördes när tjänsten blev otillgänglig har utfärdat startkommandot eller, vid nätverksavbrott, när de åter kan ta emot och skicka nätverkstrafik.
{{% /accordion %}}

För att SLA:n ska gälla krävs det att det finns tillräckliga resurser i projektet enligt tabellen nedan:

| Tjänst  | Minsta hårdvara                                           | Maximal användning                                          |
|---------|-----------------------------------------------------------|-------------------------------------------------------------|
| Compute | 6 fysiska hosts                                           | Ledig kapacitet i klustret motsvarande minst en fysisk host |
| Storage | 12 fysiska hosts, med minst 8 drives per host             | Kluster fyllt till mindre än 70% av maxkapacitet            |
| API     | 3 fysiska hosts för backend som körs i 3 separata chassin |                                                             |



## Technical Account Manager (TAM)

{{< ingress >}}
Safespring erbjuder en Technical Account Manager som en tilläggstjänst för att ge ytterligare stöd och insikter till din myndighet eller organisation.
{{< /ingress >}}

Genom att anlita en Technical Account Manager får ni en personlig kontaktpunkt och experthjälp för att säkerställa att Safespring On-Premise Cloud presterar optimalt och möter era myndighets- eller organisationsbehov.

Er Technical Account Manager kommer att hålla ett månatlig statusmöte med er, där följande punkter diskuteras:

{{% accordion title="Supportärenden" %}}
Rapport och återkoppling på föregående månads supportärenden, inklusive en översikt över ärenden och eventuella lärdomar som kan dras från dem.
{{% /accordion %}}

{{% accordion title="Kapacitetsplanering" %}}
Granskning av användning och tillgänglig kapacitet på platsen för att hjälpa er att planera och skala er infrastruktur på ett effektivt sätt.
{{% /accordion %}}

{{% accordion title="SLA-rapport" %}}
Rapport om hur väl Safespring uppfyller de avtalade servicenivåerna (SLA) och diskussion kring eventuella åtgärder för att förbättra prestanda och tillgänglighet.
{{% /accordion %}}

{{% accordion title="Incidentgranskning" %}}
Genomgång av eventuella incidenter på plattformen, orsakerna bakom dem och förslag på förbättringar som kan implementeras för att minimera framtida risker.
{{% /accordion %}}

{{% accordion title="Produktutveckling" %}}
Presentation och diskussion kring Safesprings aktuella och planerade produktutveckling, inklusive icke-offentliga vägkartor som kräver att ett sekretessavtal (NDA) undertecknas med Safespring.
{{% /accordion %}}

## Support
{{< ingress >}}
Vi på Safespring förstår att tillgänglig och effektiv support är avgörande för att säkerställa en smidig användning av vår On-Premise Cloud-tjänst. 
{{< /ingress >}}

För att erbjuda högkvalitativ support och ge er trygghet har vi utvecklat en supportstruktur som innefattar snabba svarstider, tillgång till nödsupport dygnet runt och ett tydligt stöd i avtalen för att möta era behov. Här är en översikt över de supporttjänster vi erbjuder:

{{% accordion title="Snabba svarstider" %}}
Vi erbjuder en svarstid på supportärenden inom fyra timmar under arbetstid (08:00 till 16:00 CEST). Supportärenden kan skickas via e-post till support@safespring.com. Svarstiden mäts från det att Safespring tar emot e-postmeddelandet tills den första responsen från en ingenjör skickas till kunden.
{{% /accordion %}}

{{% accordion title="Nödsupport dygnet runt" %}}
Kunder har tillgång till ett telefonnummer för nödsupport utanför arbetstid. Detta innebär att vi finns tillgängliga för att snabbt hjälpa er om det uppstår några kritiska problem.
{{% /accordion %}}

{{% accordion title="Inkluderad och extra nödsupport" %}}
Nödsupport som täcks av tillgänglighets-SLA ingår i supportavtalet. Om nödsupport inte täcks av SLA debiteras 2 000 SEK per ärende samt 2 000 SEK per arbetstimme.
{{% /accordion %}}

Med Safesprings engagerade supportteam kan du känna dig trygg i att få snabb och professionell hjälp när du behöver det mest, vilket säkerställer en problemfri användning av Safespring On-Premise Cloud.


{{< accordion-script >}}
