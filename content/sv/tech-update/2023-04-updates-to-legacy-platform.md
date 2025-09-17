---
ai: true
title: "Viktig uppdatering om EOL för legacyplattformen i STO1"
date: "2023-04-18"
publishDate: "2023-04-18"
intro: "Vi vill informera om att vår äldre plattform i STO1 kommer att stängas ned den 1 maj 2023."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknikuppdatering"
language: "sv"
toc: ""
sidebarlinkname: "Så här migrerar du"
sidebarlinkurl: "https://docs.safespring.com/new/migrate-from-legacy/"
sidebarlinkname2: "Kontakta supporten"
sidebarlinkurl2: "mailto:support@safespring.com"
aliases:
  - /blogg/2023/2023-04-updates-to-legacy-platform/
---
{{< ingress >}}
Eftersom legacyplattformen i STO1 närmar sig slutet av sin livscykel hoppas vi att migreringen till den nya plattformen går bra för er.
{{< /ingress >}}

Enligt vår projekthantering har de flesta av er redan migrerat till den nya plattformen eller är i full gång med att göra det.

För er som inte har startat ännu vill vi uppmuntra er att göra det så snart som möjligt och höra av er om ni behöver hjälp. Alla steg som behövs för att migrera era instanser finns i vår [migreringsguide](https://docs.safespring.com/new/migrate-from-legacy/).

För er som har svårt att hinna till deadlinen den 1 maj kan vi försäkra att vi inte kommer att radera någon data utan ert medgivande. Vi har varit i kontakt med samtliga kunder för att ta fram en migrationsplan och kommer att fortsätta med detta de kommande veckorna.

Flera kunder har gett oss en lista över instanser som inte ska migreras eller som behöver markeras för radering. Dessa instanser kommer att stängas av den 1 maj och finnas kvar på legacyplattformen under en respitperiod på 30 dagar, därefter raderas de.

## Vanliga frågor

### Vi vill behålla våra instanser under en längre tid. Är det möjligt?

Generellt förlänger vi inte deadlinen för migreringen. Men om ni håller på att migrera era instanser och behöver mer tid, hör av er om ni inte redan gjort det så försöker vi tillmötesgå er begäran.

### Vi vill migrera men har utmaningar med den nya plattformen. Vad kan vi göra?

Den största skillnaden i den nya plattformen är den nya nätverksmodellen, och vissa kunder har uttryckt oro kring detta. Vi har skrivit utförligt om ämnet i ett blogginlägg samt i vår slutanvändardokumentation och bedömer att de flesta farhågor kan hanteras genom att läsa dessa. Om ni behöver hjälp eller rådgivning, kontakta oss.

### Vi försöker migrera en volym men inget händer

Det vanligaste problemet vi sett är att `migrate_to`-taggen satts på en volym i stället för på en volymsnapshot. Säkerställ att ni har skapat en snapshot av volymen ni vill migrera och att migrate_to-taggen är satt på den snapshoten. Om ni däremot är säkra på att allt detta är gjort korrekt, kontakta oss – batchjobben kan av någon anledning ha misslyckats.

### Vi har flera stora instanser med lokala diskar som vi behöver migrera och er migreringsguide tar för lång tid. Finns det ett snabbare sätt?

Om ni har flera stora instanser med lokala diskar och migrerar till en lokal flavor i den nya plattformen kan det i vissa specialfall gå betydligt snabbare att migrera direkt mellan image-tjänsterna. Om ni hamnar i en sådan situation, hör av er till oss så hjälper vi er.