---
title: "Stockholms universitet skaffar offsite backup med några klick"
date: 2019-03-14T12:56:40+01:00
draft: false
intro: "Vid en utvärdering kom IT-avdelningen fram till att det vore önskvärt att kunna lagra kopior av backuperna utanför universitetets lokaler."
background: "safespring_stockholm-universitet.jpg"
socialmedia: "safespring_stockholm-universitet.jpg"
---

<div class="ingress"><p>Stockholms universitet är ett lärosäte med ungefär 27&nbsp;000 studerande och runt 5&nbsp;000 anställda. IT-avdelningen hanterar ett stort antal system och hundratals servrar.</p></div>

Stockholms universitet hade sedan förut en backuplösning från Commvault för att göra backuper på alla servrar i miljön. Commvault-lösningen stod lokalt i Stockholm Universitets miljö. Vid en utvärdering kom IT-avdelningen fram till att det vore önskvärt att kunna lagra kopior av backuperna utanför universitetets lokaler för att lägga till geografisk diversitet och skydda sig för katastrofhändelser i driftmiljön. Safesprings Storage-lösning visade sig vara ett utmärkt komplement till den befintliga backuplösningen eftersom Commvault har stöd för protokollet S3 vilket används av Safesprings Storage-lösning.

### Lokalt backupsystem
Precis som för Stockholms Universitet kommer de flesta organisationer väldigt långt med ett lokalt backupsystem. Som administratör har du full kontroll över hur backuperna tas och eftersom att trafiken endast går i den interna miljön så får användarna i allmänhet god prestanda vid backuper och återläsningar. De flesta backupsystem förutsätter också att de körs i den interna miljön vilket gör att metoder för inloggning och rättighetshantering förutsätter att backupanvändaren har stora rättigheter i de system som backuperna tas på. Avsaknad av geografisk diversitet resulterar i en mindre säker lösning som i längden kan medföra att all data går förlorad om den lokala lösningen förstörs.

### Traditionell offsite-backup
Även om ett lokalt backupsystem är väldigt smidigt så ger det inte skydd om en större händelse som slår ut hela den lokala miljön skulle ske. För att lösa detta historiskt så har en vanlig lösning varit att använda sig av en bandrobot som lagrar kopior av backuperna på band som sedan fraktas till ett annat ställe. En sådan lösning är dyr eftersom att den kräver manuella rutiner och därför är svår att automatisera. En modernare metod är att sätta upp en speglad backupserver på en annan site men det medför stora kostnader eftersom lagringslösningen på den andra siten måste uppfylla samma villkor som den primära vad det gäller lagringsvolym och licenser.

### Safesprings lösning
Safespring bygger sina lösningar på öppen källkod och öppna standarder vilket gör integrationer med andra leverantörers lösningar enklare. I det här fallet använder Stockholms Universitet Commvault som är kompatibel med Safesprings Storage-lösning genom det öppna protokollet S3. Det gjorde att universitetet kunde slå på replikering av sina backuper en gång i veckan till Safesprings lösning med bara några få klick i Commvaults administrationsgränssnitt. Safesprings Storage-lösning är byggd för storskalig lagring vilket medför ett lågt pris för det utrymme som Stockholms universitet använder i tjänsten. Dessutom är är allt trafik till och från tjänsten krypterad och ligger säkert bakom inloggning i Safesprings svenska site, vilket gör hantering av GDPR och Cloud Act enklare.

Stockholms universitet skickar en offsite kopia från sin backupmiljö på  5 TB i veckan och behåller de senaste 8 kopiorna. Operationen för att skicka över 5 TB till Safespring tar ungefär 8 timmar.

Så - med en minimal arbetsinsats kunde universitetet slå på en säker offsite-backup, som är helt automatiserad, till ett väldigt förmånligt pris. Dessutom slipper de helt trafikavgifter eftersom att de sitter på SUNETs nät tillsammans med Safespring. En kostnadseffektiv lösning som ger mycket mervärde och trygghet för Stockholm universitets driftorganisation.

{{< 2calltoaction "Safespring Storage" "/tjanster/safespring-storage/" "Kontakta oss" "/kontakt" >}}


<br><br>
*Foto: Eva Dalin / Stockholms universitet*
