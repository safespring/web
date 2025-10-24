---
ai: true
title: "Safespring Backup: en total omarbetning av användarportalen"
date: 2023-01-12T13:58:58+01:00
draft: false
tags: ["English"]
intro: "Safespring har utvecklat en användarportal och en API-brygga i samband med lanseringen av vår tjänst Safespring Backup."
sidebarlinkname: "Till tjänsten"
sidebarlinkurl: "/services/backup"
sidebarlinkname2: "Kom igång"
sidebarlinkurl2: "/demo"
socialmedia: ""
devops: ""
card: "safespring-backup.svg"
sidebarimage: "safespring-backup.svg"
background: "safespring-backup.svg"
socialmediabild: ""
form: ""
toc: "I den här artikeln"
language: "sv"
author: "Gabriel Paues"
section: "Lösningsöversikt"
aliases:
  - /solution-brief/safespring-backup-portal-en/
---

## Introduktion

{{< ingress >}}
Safespring Backup bygger på det väletablerade Spectrum Protect från IBM. Det har många styrkor, såsom hög säkerhet, utmärkt skalbarhet och automatisering av datalivscykeln.
{{< /ingress >}}

Spectrum Protect kan skydda oräkneliga terabyte data med minimalt administrativt arbete.

Säkerhetskopior krypteras under överföring med TLS 1.2 men kan också konfigureras att krypteras på klientsidan för ännu högre säkerhet, automatiskt.

Som en väl beprövad lösning för stora företag kan Spectrum Protect utan tvekan hantera skalan hos stora tjänsteleverantörers miljöer som Safesprings. Där det brister något är i flexibel administration av användarkonton och rolltilldelningar. Eftersom säkerhetskopiering i regel hanteras av ett dedikerat team i en större organisation delas denna nackdel med många andra backuplösningar på marknaden och är därför inget specifikt problem för Spectrum Protect.

## Problembeskrivning

För att lösa detta utvecklade Safespring en användarportal och en API-brygga när vi lanserade vår Backup-tjänst. Portalen har fyllt sin funktion väl genom att tillföra självbetjäning för att sätta upp nya noder samt generering av nyckeltokens för automatisk installation av flera noder utan direkt mänsklig inblandning.

Även om den var funktionsduglig saknade den gamla användargränssnittet instrumentpaneler för status och möjligheten för kunder att lägga till egna användarkonton. Användare kunde inte skapa egna hierarkier för att förenkla hanteringen av olika grupper av servrar som säkerhetskopieras.

![Safesprings nya backup-portal](/img/safespring-backup-portal.png)

## Lösningsöversikt

Med vår relansering av Safespring Backup introducerar vi en total omarbetning av användargränssnittet. Lösningen bygger på produkten Auwau Cloutility med funktioner som:

- Självbetjäning för slutanvändare med möjlighet att skapa nya användare utan att kontakta Safespring och tilldela roller och behörigheter till användarna.
- Multi-tenant-stöd med möjlighet att skapa hierarkier och användare med rollbaserad åtkomst till olika delar av hierarkin. Detta gör det möjligt för en administratör att delegera olika servrar till olika delar av organisationen.
- Provisionering där administratören kan definiera processen med standardinställningar så att användarna enkelt kan hantera sin egen aktivering av säkerhetskopieringar.
- Avancerad men lättanvänd rapportmotor som gör det enkelt att följa upp status för alla pågående säkerhetskopieringar. Det är också möjligt att schemalägga utskick av rapporter vid särskilda intervall till angivna e-postadresser.
- REST API gör det möjligt att göra allt du kan göra i webbgränssnittet med API-anrop för att automatisera din konfiguration ytterligare.

### Skydd mot ransomware

Safespring Backup använder en låsmekanism på varje nod som registreras för att använda tjänsten. Mekanismen är utformad för att förhindra att backup-agenten raderar säkerhetskopior innan en förinställd bevarandetid har passerat. Denna bevarandetid sätts till ett visst antal dagar, under vilka säkerhetskopiorna hålls trygga och säkra.

Genom att införa denna mekanism kan vi säkerställa att även vid ett ransomware-angrepp kan angriparen inte ta bort alla säkerhetskopior från servern innan data krypteras lokalt. Detta eftersom säkerhetskopiorna är låsta och inte kan raderas förrän bevarandetiden har passerat.

Utöver detta ger mekanismen ett extra skyddslager för att säkerställa återställning av data vid ett angrepp. Genom att hålla flera säkerhetskopior tillgängliga kan vi återställa data till en tidpunkt före angreppet, vilket minimerar påverkan på våra kunder.

Sammantaget hjälper användningen av denna mekanism oss att leverera en säkrare och mer tillförlitlig backup-tjänst till våra kunder och är ett viktigt steg för att skydda mot det växande hotet från ransomware-attacker.

## Slutsats

Med vår relansering av Safespring Backup tar Safespring ett jättekliv framåt för att förbättra användarupplevelsen och göra det enklare att hantera dina säkerhetskopior hos Safespring. Med tillförlitligheten i Spectrum Protect kombinerad med en fullfjädrad självbetjäningsportal har det aldrig varit enklare att köra dina säkerhetskopior. Med ett komplett REST API är det möjligt att automatisera olika administrativa uppgifter.

Med Safespring Backup får du en säker men ändå lättanvänd lösning för att hantera alla dina säkerhetskopior.

{{< horisontal-card image="/img/card/safespring-backup.svg" cardtitle="Läs mer om Safespring Backup" text="Safespring Backup är en nästa generations lösning för säkerhetskopiering och återställning av data som utnyttjar tillförlitligheten och skalbarheten i IBM Spectrum Protect. Safespring Backup är en nästa generations lösning för säkerhetskopiering och återställning av data som utnyttjar tillförlitligheten och skalbarheten i IBM Spectrum Protect." linktext="Till tjänsten" link="/services/backup">}}
