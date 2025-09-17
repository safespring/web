---
ai: true
title: "Säkerhetsmeddelande om den kritiska Log4j-sårbarheten"
intro: "En liten intern modul som hanterar loggning för Java-program kan påverka din applikation."
date: "2021-12-13"
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "sv"
section: "Teknisk uppdatering"
aliases:
  - /blogg/security-advisory-2021
  - /blogg/2021/2021-12-security-advisory-2021/
---
{{% ingress %}}
En sårbarhet i {{< tooltip "Log4j" >}}Log4j är en liten intern modul som hanterar loggning för Java-program.{{< /tooltip >}} tillkännagavs den 10 december 2021. Rapporter världen över visar att sårbarheten används aktivt och framgångsrikt i attacker.
{{% / ingress %}}

Log4j är ett Java-baserat loggningsverktyg som används i stor utsträckning i populära programvarusystem.

### Viktigaste punkterna

- Detta får inga konsekvenser för Safesprings system.
- Safesprings kunder bör stoppa de tjänster som kan vara påverkade.

<div style="margin-bottom:50px;"></div>

## Vad vi har gjort hittills

{{% ingress %}}
Som tur är får detta inga konsekvenser för våra system och inga tjänster är nere.
{{% /ingress %}}

Vi måste dock påpeka att vi varken har – och inte heller ska ha – kunskap om vilka applikationer våra kunder kör och hur de påverkas av detta.

### Rekommendationer till våra kunder

- Stoppa alla tjänster som kan vara påverkade
- Gå igenom alla loggar och leta efter försök, och eventuellt lyckade försök, att utnyttja sårbarheten
- Rotera omedelbart nycklar och andra hemligheter som en kompromettering kan ha läckt
- Uppgradera till en säker version av Log4j eller tillämpa mitigeringar för Log4j-sårbarheten

<div style="margin-bottom:50px;"></div>

Om du tror att du inte är sårbar, kontrollera en gång till för säkerhets skull.

Observera att Log4j är inbäddat i många andra loggningsverktyg och i tjänster som använder dessa verktyg. Det finns en växande lista över påverkade (och opåverkade) tekniker.

{{< 2calltoaction "Påverkade tekniker" "https://gist.github.com/SwitHak/b66db3a06c2955a9cb71a8718970c592" "Läs CVE-notisen" "https://nvd.nist.gov/vuln/detail/CVE-2021-44228" >}}

<div style="margin-bottom:50px;"></div>

Om vi på Safespring får indikationer på att tjänster eller instanser i vår infrastruktur påverkas av Log4j-sårbarheten och aktivt används i attacker, kommer vi att larma kunden, och om kunden inte agerar måste vi stänga ned dessa instanser så snart som möjligt för att förhindra ytterligare skada.

Vi övervakar inte aktivt detta, men andra kan komma att meddela oss. Det är tjänsteägarens ansvar att utreda situationen vidare i sådana fall.