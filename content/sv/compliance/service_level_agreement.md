---
title: "Service Level Agreement"
date: 2026-04-15
draft: false
intro: "Om drifttid och hjälp. Förklarar tillgänglighetsmål, incidenthantering, responsförväntningar och vilken åtgärd som gäller om mål missas."
documentimage: "safespring_card_21.jpg"
sidebarlinkname: ""
sidebarlinkicon: ""
sidebarlinkurl: ""
general: "yes"
toc: "Innehåll"
language: "sv"
noindex: "x"
ai: true
aliases:
  - /document/service_level_agreement/
---


Under avtalets löptid enligt vilket Safespring har gått med på att tillhandahålla sina
tjänster till kunden ("Avtalet"), kommer varje Täckt tjänst att tillhandahålla en
månatlig tillgänglighetsprocent till kunden enligt tabellerna nedan ("Servicenivåmålet"
eller "SLO").

Om Safespring inte uppfyller SLO, och om kunden uppfyller sina skyldigheter enligt denna
SLA, kommer kunden att vara berättigad att ta emot de finansiella krediterna som
beskrivs nedan. Detta SLA anger kundens enda och exklusiva gottgörelse för Safesprings
underlåtenhet att uppfylla SLO.

## 1. Servicenivåmål

Mål för månatlig drifttid i procent sätts per täckt tjänst. Varje tjänst mäts oberoende
på en kalendermånadsbasis.

| Täckt tjänst | Månatlig drifttid % |
|---|---|
| **Compute (IaaS), Network, Block Storage** | **99,99 %** |
| **Kubernetes (kontrollplan)** | **99,95 %** |
| **Objektlagring (S3)** | **99,95 %** |
| **Säkerhetskopieringstjänst** | **99,9 %** |

**Obs!** Kubernetes SLO gäller endast kontrollplanet. Arbetarnod
tillgänglighet styrs av den underliggande Compute SLO.

## 2. Latensmål

Förutom tillgänglighet har följande tjänster fördröjningsmål som mäts vid 95:e
percentilen (p95) under en kalendermånad.

| Tjänst | Mätvärde | Min | Genomsnittlig (p50) | Max (p95) |
|---|---|---|---|---|
| **Nätverk (intra-site)** | Tur och retur | [TBD] | [TBD] | [TBD] |
| **Blocklagring (läs)** | IOPS-latens | [TBD] | [TBD] | [TBD] |
| **Blocklagring (skriv)** | IOPS-latens | [TBD] | [TBD] | [TBD] |
| **Objektlagring (S3)** | Första byte | [TBD] | [TBD] | [TBD] |

**Obs!** Latensmål är informativa och omfattas inte av
Finansiella krediter. Ihållande intrång kan rapporteras till Safesprings support för
utredning.

## 3. Definitioner

Följande definitioner gäller för SLA:

### Täckt tjänst

- **BERÄKNA**
Safespring Compute-tjänst inklusive virtuella maskiner, lokal lagring och
blocklagringsvolymer.
- **NÄTVERK**
Nätverksanslutningen mellan kundinstanser inom en Safespring-webbplats och till externa
slutpunkter.
- **BLOCKERA LAGRING**
Beständiga blocklagringsvolymer kopplade till Compute-instanser.
- **KUBERNETES**
Kubernetes API och kontrollplan tillhandahålls av Safesprings hanterade
Kubernetes-erbjudande.
- **OBJEKTFÖRVARING**
Safesprings S3-kompatibla objektlagringstjänst.
- **SÄKERHETSKOPIERING**
Safesprings molnsäkerhetstjänst.

### Driftstopp

Driftstopp definieras per Täckt tjänst enligt följande:

- **BERÄKNA**
En virtuell maskin blir oåtkomlig, kraschar eller förlorar åtkomst till sin anslutna
blocklagring, vilket påverkar instanser över två eller flera fysiska värdar. Ett enskilt
värdfel utesluts (se avsnitt 5).
- **NÄTVERK**
Fullständig förlust av nätverksanslutning på platsnivå som påverkar alla kunder.
- **BLOCKERA LAGRING**
Oförmåga att utföra läs- eller skriv-I/O-operationer på tillhandahållna volymer.
- **KUBERNETES**
Kubernetes API går inte att nå eller kan inte behandla förfrågningar för alla kluster.
Fel på enskilda arbetarnoder eller poddar anses inte vara driftstopp och omfattas av
Compute SLO.
- **OBJEKTFÖRVARING**
S3 API går inte att nå eller kan inte behandla läs-, skriv- eller listförfrågningar.
- **SÄKERHETSKOPIERING**
Säkerhetskopieringstjänsten går inte att nå och klienter kan inte starta eller slutföra
säkerhetskopiering eller återställning.

### Driftstopp

"Nedtidsperiod" betyder en period av fem eller fler minuter i följd av stillestånd.
Intermittent driftstopp under en period på mindre än fem minuter kommer inte att räknas
in i några stilleståndsperioder.

### Månatlig drifttid i procent

"Monthly Uptime Procent" betyder det totala antalet minuter i en kalendermånad, minus
antalet minuter av driftstopp som drabbats av alla driftstoppsperioder under den
månaden, dividerat med det totala antalet minuter i månaden.

### Schemalagd driftstopp

"Schemalagd driftstopp" betyder driftstopp som är ett resultat av att Safespring utför
underhåll under ett förkommunicerat underhållsfönster. Schemalagd driftstopp utesluts
från beräkningen av månadsvis drifttid.

### Underhållsfönster

En tidsperiod under vilken Safespring utför planerat underhåll på en Täckt tjänst.
Underhåll Windows ska meddelas minst 5 arbetsdagar i förväg. Ett underhållsfönster per
service och månad är standard. I undantagsfall som involverar externa säkerhetshot kan
ytterligare underhållsfönster meddelas med så mycket varsel som möjligt.

## 4. Finansiella krediter

Finansiella krediter bestäms på kalendermånadsbasis per Täckt tjänst.

- **MUP** månatlig drifttid i procent
- **PMB** Andel av månatlig räkning för respektive Täckt
Berörd tjänst som inte uppfyllde SLO som kommer att krediteras till kundens framtida
månatliga räkningar.

### Beräkna, nätverk och blocklagring

| **MUP** | **PMB** |
|---|---|
| 99,00 % till < 99,99 % | 10 % |
| 95,00 % till < 99,00 % | 25 % |
| < 95,00 % | 50 % |

### Kubernetes och objektlagring

| **MUP** | **PMB** |
|---|---|
| 99,00 % till < 99,95 % | 10 % |
| 95,00 % till < 99,00 % | 25 % |
| < 95,00 % | 50 % |

### Säkerhetskopiering

| **MUP** | **PMB** |
|---|---|
| 99,00 % till < 99,90 % | 10 % |
| 95,00 % till < 99,00 % | 25 % |
| < 95,00 % | 50 % |

### Kunden måste begära finansiell kredit

För att ta emot någon av de finansiella krediterna som beskrivs ovan måste kunden
meddela Safespring inom trettio dagar från det att kunden blir berättigad att få en
finansiell kredit. Kunden måste också tillhandahålla loggfiler eller övervakningsdata
som visar tjänstens otillgänglighet och datum och tider som dessa fel inträffade.

### Maximal finansiell kredit

Det sammanlagda maximala antalet finansiella krediter som ska utfärdas av Safespring
till kunden för alla stilleståndsperioder som inträffar under en enda faktureringsmånad
kommer inte att överstiga 50 % av det belopp som kunden ska betala för den berörda
täckta tjänsten för den aktuella månaden. Finansiella krediter kommer att göras i form
av en monetär kredit som tillämpas för framtida användning av Tjänsten och kommer att
tillämpas inom 60 dagar efter att den finansiella krediten begärdes.

## 5. SLA-undantag

Denna SLA gäller inte för någon:

(a) Schemalagd driftstopp eller förkommunicerade underhållsfönster;

(b) Hårdvarufel som påverkar enskilda datorvärdar;

(c) Funktioner betecknade som beta;

(d) Fel orsakade av faktorer utanför Safesprings rimliga kontroll;

(e) Fel som härrör från kundens mjukvara, hårdvara eller tredje parts mjukvara eller
hårdvara;

(f) Fel som härrör från missbruk eller andra beteenden som bryter mot avtalet eller
policyn för acceptabel användning;

(g) Fel orsakade av kvoter eller resursbegränsningar som anges i
självbetjäningsportalen.

## 6. Mätning och övervakning

Tillgänglighet mäts vid anslutningspunkten (leveranspunkten) med hjälp av Safesprings
infrastrukturövervakningssystem i datacentret.

Kunden ansvarar för att övervaka sina egna instanser och se till att tjänsterna körs
efter ett avbrott.

Kunder uppmuntras att prenumerera på statussidan på https://status.safespring.com för
incidentuppdateringar i realtid.
