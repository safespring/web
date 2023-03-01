#

<div class="author-container">
  <div class="author-image" style="background-image: url(/img/author/gabriel-paues.jpg)"></div>
  <div class="author-info">
    <p class="author-name">Gabriel Paues</p>
    <p class="author-title">Cloud Architect</p>
  </div>
</div>

## Safespring Backup: En fullständig uppdatering av användarportalen

<div class="ingress">
	<p>
Safespring Backup bygger på den mycket väl etablerade lösningen Spectrum Protect från IBM. Den har många styrkor, som hög säkerhet, utmärkt skalbarhet och livscykelautomatisering av data. 
</p></div>

Spectrum Protect kan skydda obegränsat antal Terabyte av data med minimal administrativ ansträngning.

Säkerhetskopier är krypterade under transit med TLS 1.2, men kan också konfigureras för att automatiskt vara krypterade client-side för ännu högre säkerhet.

Som en mycket beprövad lösning för stora företag, kan Spectrum Protect hantera skalan för stora leverantörers uppställningar som Safesprings. Däremot saknar Spectrum Protect flexibel administration med hantering av användarkonton och rolltilldelningar. Eftersom Backup ofta hanteras av en utsedd grupp i en stor organisation, är denna nackdel något som delas med många andra säkerhetskopieringslösningar på marknaden och därför inte ett specifikt problem för Spectrum Protect.

## Enklare administration med ny portal

För att lösa detta har Safespring tagit fram en användarportal och API-bro för vår Backup-tjänst. Den gamla portalen har tjänat sitt syfte väl genom att lägga till självbetjäning för att ställa upp nya noder och generering av nyckel-tokens för automatisk uppställning av flera noder utan direkt mänsklig interaktion.

Även om den gamla portalen var funktionsduglig, saknade den dashboards för status och möjligheten för kunder att lägga till sina egna användarkonton. Användare kunde inte skapa sina egna hierarkier för att förenkla hanteringen av olika grupper av servrar som säkerhetskopieras.

![Safesprings nya backup-portal](/img/safespring-backup-portal.webp)

## Nyheter och fördelar

Med vår relansering av Safespring Backup introducerar vi en fullständig omarbetning av användargränssnittet. Lösningen bygger på Auwau Cloutility med funktioner som:

- Självbetjäning med möjlighet att skapa nya användare utan att kontakta Safespring och tilldela roller och privilegier till dem.
- Multi-tenancy med möjlighet att skapa hierarkier och användare med rollbaserad åtkomst till olika delar av hierarkin. Detta gör det möjligt för en administratör att delegera olika servrar till olika delar av organisationen.
- Provisioning där administratören kan definiera processen med standardinställningar för att låta användare hantera sin egen aktivering av säkerhetskopiering enkelt.
- Avancerad (men enkel att använda) rapportmotor som gör det möjligt att följa upp statusen för alla säkerhetskopieringar som körs. Det är också möjligt att ställa in scheman för att skicka rapporter vid specifika intervaller till specifika e-postadresser.
- REST API gör det möjligt att göra allt du kan göra i webbanvändargränssnittet med API-anrop för att automatisera din uppställning ännu mer.

### Skydd mot ransomware

Safespring Backup använder en låsningsmekanism på varje nod som registrerar sig för att använda tjänsten. Denna mekanism är designad för att förhindra att säkerhetskopieringsagenten tar bort säkerhetskopieringar innan en förinställd behållningstid har gått. Denna behållningstid är inställd på ett visst antal dagar, under vilka säkerhetskopieringarna hålls extra säkra.

Genom att implementera denna mekanism kan vi säkerställa att även vid en ransomwareattack skulle angriparen inte kunna ta bort alla säkerhetskopieringar från servern innan den krypterar datan lokalt. Detta beror på att säkerhetskopieringarna är låsta och inte kan tas bort förrän behållningstiden har passerat.

Förutom detta tillhandahåller mekanismen också en ytterligare skyddsskikt för att säkerställa dataåterställning vid en attack. Genom att hålla flera säkerhetskopior tillgängliga kan vi återställa data till en punkt innan angreppet inträffade, vilket minimerar påverkan av angreppet på våra kunder.

Sammantaget hjälper användningen av denna mekanism oss att erbjuda en säkrare och mer pålitlig säkerhetskopieringstjänst för våra kunder, och är ett viktigt steg i skydd mot den växande hotbilden från ransomwareangrepp.

## Slutsats

Med vår relansering av Safespring Backup tar Safespring ett jättesteg framåt för att förbättra användarupplevelsen och användarvänligheten för att hantera dina säkerhetskopieringar med Safespring. Med pålitligheten i Spectrum Protect kombinerat med en fullt utvecklad självbetjäningsportal för att köra dina säkerhetskopieringar har det aldrig varit enklare. Med en fullständig REST API är automatisering av olika administrativa uppgifter möjlig.

Med Safespring Backup får du en säker lösning (men enkel att använda) för att hantera alla dina säkerhetskopieringar.


