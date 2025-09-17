---
ai: true
title: "Oföränderlig objektlagring från Safespring"
date: "2021-04-12"
draft: false
author: "Gabriel Paues"
section: "Lösningsöversikt"
dokumentnamn: ""
socialmedia: "/blogg/socialmedia/safespring_social_38.gif"
intro: "Med oföränderliga objekt är Safespring Storage ett utmärkt sätt att skapa en offsite-säkerhetskopia som är säker och tillförlitlig."
sidebarlinkname: ""
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: ""
card: "safespring_card_38.jpg"
eventbild: "safespring_background_38.jpg"
socialmediabild: "safespring_social_38.gif"
toc: "Innehållsförteckning"
language: "sv"
aliases:
  - /no/whitepaper/immutable-storage/
---
{{< ingress >}}
I den här lösningsbeskrivningen går vi igenom Safespring Storage-tjänsten baserad på S3-objektlagring. Med oföränderliga objekt är Safespring Storage ett utmärkt sätt att skapa en offsite-backup som är säker och tillförlitlig.
{{< /ingress >}}

Att säkerhetskopiera sina data är viktigt i alla IT-miljöer. De flesta moderna backuplösningar är funktionsrika och bra på att hantera mänskliga fel eller katastrofer. Men angreppsytorna förändras, vilket gör att lösningar som var tillräckliga för ett tag sedan inte längre är uppdaterade i förhållande till dagens hot. Att testa backuplösningen för att säkerställa att den gör det vi tror att den gör kan vara kostsamt men är alltid en nödvändig rutin.

Genom att använda lösningen som beskrivs i denna översikt kan organisationen uppnå följande fördelar:

- En modern och komplett backuplösning som är lätt att hantera.
- Ett säkert offsite-lager för kritiska backupdata.
- En kostnadseffektiv lösning som uppfyller alla säkerhetskrav från en krävande organisation.

## 3-2-1-regeln

Det finns flera sätt att designa en backuplösning men de flesta verkar vara överens om att 3-2-1-regeln är en bra princip. Den innebär att man ska ha tre kopior av data, på två separata media varav en av kopiorna ska förvaras offsite. Den traditionella lösningen för detta var att använda en bandrobot med ett rullande schema där band med fullständiga säkerhetskopior transporterades till en annan plats med återkommande intervall.

Med introduktionen av standardiserade, molnbaserade lagringslösningar som S3 (som, även om det ursprungligen var en Amazon-produkt, numera är en öppen standard) har effektivare alternativ till fysisk transport av band dykt upp. I stället skickas offsite-backuper över en krypterad kanal till en annan plats. Eftersom molnbaserade lagringslösningar är mycket kostnadseffektiva erbjuder de både automatisering och tillförlitlighet till låg kostnad.

## Automatiskt – men utan luftgap

Även om det är populärt finns ett problem med att lagra offsite-backup i en molnlösning och det är att det saknas luftgap. Den manuella processen att flytta data fysiskt på band kan ha varit omständlig, men den tillför ett extra säkerhetslager eftersom angriparen inte kan nå platsen där offsite-backuperna förvaras. Även om hela miljön komprometteras skulle offsite-banden vara säkra på den andra platsen, såvida angriparen inte får fysisk tillgång. Dessa kopior kan användas för att återställa hela lösningen vid behov, även om det tar tid.

Angripare blir allt mer sofistikerade och förstår att för att kunna utpressa med ransomware (crypto‑locker) måste även säkerhetskopiorna tas bort. Allt fler angripare riktar in sig specifikt på backupservern för att radera alla backuper innan de använder en crypto‑locker för att kryptera data. Det innebär att de också försöker ta bort allt som är åtkomligt, inklusive offsite-backuperna som lagras i molnlösningen. När det väl är gjort kan offret tvingas betala angriparna för att få tillbaka sina data.

Eftersom många företag använder samma programvara tar vissa moderna crypto‑lockers till och med bort de molnbaserade offsite-backuperna automatiskt, vilket gör den molnbaserade lösningen mindre attraktiv jämfört med den gamla hederliga bandbaserade backupen.

## Object locking eller oföränderliga objekt

De flesta molnbaserade lagringslösningar är objektlagring. Ett objekt representerar den uppladdade filen samt tillhörande metadata, till exempel när filen laddades upp, dess storlek och filtyp. För att förhindra att illvilliga aktörer raderar lagrade objekt har en ny funktion introducerats: Object locking, eller oföränderliga (immutable) objekt. Det innebär att man i förväg kan konfigurera regler för hur och när objekt som lagras i lösningen får tas bort. Administratören kan till exempel ställa in att inga objekt får raderas förrän trettio dagar har gått sedan de laddades upp. Då blir radering omöjlig eftersom lagringslösningen nekar en sådan begäran.

> Object locking och oföränderliga (immutable) objekt är två termer som beskriver samma sak.

Denna funktion har visat sig vara mycket användbar för backuplösningar eftersom den skapar ett virtuellt luftgap. Även om angriparna får åtkomst till platsen där offsite-backuperna lagras kan de inte radera säkerhetskopiorna, hur mycket de än försöker.

### Stöd i backupprogramvara

Eftersom problemet med att crypto‑lockers raderar offsite-backuper blivit vanligare har stöd för object locking införts i backupprogramvaran. I följande avsnitt beskriver vi hur man aktiverar det i Veeam, som är en populär backuplösning.

S3 organiserar filer i objekt och buckets. En bucket kan innehålla filer och är den enhet som konfigureras i backupprogramvaran som mål för säkerhetskopiorna. När man skapar bucketen aktiveras object locking och man konfigurerar parametrar för retentionstid, det vill säga hur länge objekten ska vara låsta. Vi går inte in på detaljerna här, men det är viktigt att förstå att detta steg behövs.

När det är gjort skapar du ett “Object Storage Repository” i Veeam.

![Gör S3-bucket till ett oföränderligt objekt](/img/whitepapers/make_S3_bucket_an_immutable_object.png)

I konfigurationsguiden, under steget Bucket, ska du markera alternativet “Make recent backups immutable for…”. Här anger du också antalet dagar som objekten ska vara oföränderliga, och det är viktigt att ställa in samma värde som konfigurerades på bucketen.

När detta är klart slutför du guiden och funktionen är nu aktiverad på objektarkivet. Sedan är det dags att konfigurera ett backupschema som talar om för Veeam vilka filer som ska skickas till arkivet.

## Slutsats

Vi har förklarat vikten av offsite-backuper och varför object locking är en viktig funktion. Genom att använda den kan katastrofer undvikas samtidigt som återställningstiden (RTO) kan kortas, eftersom återläsning från band kan ta lång tid. Med object locking får man det bästa av två världar.

<div class="flexcontainer-shortcode" style="">

{{< services >}}

</div>