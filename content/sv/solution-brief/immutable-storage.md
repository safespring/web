---
ai: true
title: "Safesprings oföränderliga objektlagring"
date: "2021-04-12"
draft: false
tags: ["English"]
author: "Gabriel Paues"
dokumentnamn: ""
socialmedia: "/blogg/socialmedia/safespring_social_38.gif"
intro: "Med oföränderliga objekt är Safespring Storage ett utmärkt sätt att skapa en offsite-säkerhetskopia som är säker och tillförlitlig."
sidebarlinkname: ""
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: ""
card: "safespring-storage.svg"
background: "safespring-storage.png"
sidebarimage: "safespring-storage.svg"
socialmediabild: "safespring_social_38.gif"
toc: "Innehållsförteckning"
language: "sv"
section: "Lösningsöversikt"
aliases:
  - /whitepaper/immutable-storage/
  - /solution-brief/immutable-storage/
  - /en/whitepaper/immutable-storage/
---
{{< ingress >}}
I den här lösningsöversikten går vi igenom Safespring Storage-tjänsten som bygger på S3-objektlagring. Med oföränderliga objekt är Safespring Storage ett utmärkt sätt att skapa en säker och tillförlitlig offsite-säkerhetskopiering.
{{< /ingress >}}

Att säkerhetskopiera sina data är viktigt i alla IT-miljöer. De flesta moderna säkerhetskopieringssystem är funktionsrika och bra på att hantera mänskliga misstag och katastrofer. Men attackytorna förändras, vilket gör att lösningar som tidigare var tillräckliga inte längre möter dagens hot. Att testa säkerhetskopieringssystemet för att säkerställa att det gör det vi tror att det gör kan vara kostsamt, men är alltid en nödvändig rutin.

Med lösningen som beskrivs i denna översikt kan organisationen uppnå följande fördelar:

- En modern och komplett säkerhetskopieringslösning som är enkel att hantera.
- Ett säkert offsite-lagringsutrymme för kritiska backupdata.
- En kostnadseffektiv lösning som uppfyller alla säkerhetskrav från en krävande organisation.

## 3-2-1-regeln

Det finns flera sätt att utforma en säkerhetskopieringslösning, men de flesta tycks vara överens om att 3-2-1-regeln är en bra princip. Den innebär att man ska ha tre kopior av data, på två separata media, varav en kopia ska lagras offsite. Den traditionella lösningen var att använda en bandrobot med ett rullande schema där band med kompletta säkerhetskopior transporterades till en annan plats med jämna mellanrum.

Med införandet av standardiserade, molnbaserade lagringslösningar som S3 (som, även om det ursprungligen var en Amazon-produkt, nu är en öppen standard) har effektivare alternativ till fysisk transport av band vuxit fram. I stället skickas offsite-säkerhetskopior över en krypterad kanal till en annan plats. Eftersom molnbaserad lagring är mycket kostnadseffektiv erbjuder dessa lösningar både automatisering och tillförlitlighet till låg kostnad.

## Automatiskt – men inget luftgap

Trots populariteten finns det ett problem med att lagra offsite-säkerhetskopian i en molnlösning, nämligen att det saknas ett luftgap. Den manuella processen att flytta data fysiskt på band kan vara besvärlig men ger ett extra säkerhetslager: angriparen kan inte nå platsen där offsite-säkerhetskopiorna förvaras. Även om hela miljön komprometteras skulle offsite-banden vara säkra på den andra platsen, såvida inte angriparen får fysisk åtkomst. Dessa kopior kan användas för att återställa hela lösningen vid behov, även om det är tidskrävande.

Angripare blir allt mer sofistikerade och förstår att för att kunna utpressa med ransomware (kryptolås) måste säkerhetskopiorna också tas bort. Allt fler angripare attackerar specifikt säkerhetskopieringsservern för att radera alla säkerhetskopior innan de använder ransomware för att kryptera data. Det innebär att de även försöker ta bort allt som är åtkomligt, inklusive de offsite-säkerhetskopior som lagras i molnlösningen. När det väl är gjort kan offret tvingas betala angriparna för att få tillbaka sina data.

Eftersom många företag använder samma programvara kan vissa moderna ransomware till och med automatiskt radera de molnbaserade offsite-säkerhetskopiorna, vilket gör molnbaserade lösningar mindre attraktiva jämfört med säkerhetskopiering på band enligt gammal modell.

## Objektlåsning eller oföränderliga objekt

De flesta molnbaserade lagringslösningar är objektlagringslösningar. Ett objekt representerar den uppladdade filen samt associerad metadata, som när filen laddades upp, dess storlek och filtyp. För att förhindra att illvilliga angripare raderar lagrade objekt har en ny funktion införts: objektlåsning, eller oföränderliga objekt som det också kallas. Det innebär att man i förväg kan konfigurera regler för hur och när objekt som lagras i lösningen får tas bort. Administratören kan till exempel konfigurera att inga objekt får raderas förrän trettio dagar har gått sedan de laddades upp, vilket gör det omöjligt att radera dem eftersom lagringslösningen kommer att neka en sådan begäran.

> Object locking och Immutable objects är två termer för samma sak.

Denna funktionalitet har visat sig mycket användbar för säkerhetskopieringslösningar eftersom den skapar ett virtuellt luftgap. Även om angripare får åtkomst till platsen där offsite-säkerhetskopiorna lagras kan de inte ta bort säkerhetskopiorna, hur mycket de än försöker.

### Stöd i säkerhetskopieringsprogram

Eftersom problemet med att ransomware raderar offsite-säkerhetskopior blivit vanligare har stöd för objektlåsning införts i säkerhetskopieringsprogrammen. I nästa avsnitt beskriver vi hur du aktiverar det i Veeam, en populär säkerhetskopieringslösning.

S3 organiserar filer i objekt och buckets. En bucket kan innehålla filer och är den enhet du konfigurerar i säkerhetskopieringsprogrammet som mål för säkerhetskopiorna. När du skapar bucketen aktiverar du object locking och ställer in parametrar för retentionsperioden, det vill säga hur länge objekten ska vara låsta. Vi går inte in på detaljer här, men det är viktigt att förstå att detta steg behövs.

Därefter skapar du ett “Object Storage Repository” i Veeam.

![Gör S3-bucket till ett oföränderligt objekt](/img/whitepapers/make_S3_bucket_an_immutable_object.png)

I konfigurationsguiden, under steget Bucket, markerar du alternativet “Make recent backups immutable for…”. Här anger du också antal dagar som objekten ska vara oföränderliga, och det är viktigt att ange samma värde som konfigurerats för bucketen.

När det är gjort slutför du guiden och funktionen är nu aktiverad på Object Storage Repository. Nu är det dags att konfigurera ett säkerhetskopieringsschema som talar om för Veeam vilka filer som ska skickas till lagringsplatsen.

## Slutsats

Vi har förklarat vikten av offsite-säkerhetskopior och varför objektlåsning är en viktig funktion. Genom att använda den kan katastrofer undvikas samtidigt som återställningstiden (RTO) kan förkortas, eftersom återläsning från band kan ta lång tid. Med objektlåsning får man det bästa av två världar.