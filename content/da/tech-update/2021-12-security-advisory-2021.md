---
ai: true
title: "Sikkerhedsadvarsel om den kritiske Log4j-sårbarhed"
intro: "Et lille internt modul, der håndterer logning for Java-programmer, kan påvirke din applikation."
date: "2021-12-13"
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "da"
section: "Teknisk opdatering"
aliases:
  - /blogg/security-advisory-2021
  - /blogg/2021/2021-12-security-advisory-2021/
---
{{% ingress %}}
En sårbarhed i {{< tooltip "Log4j" >}}Log4j er et lille internt modul, der håndterer logning for Java-programmer.{{< /tooltip >}} blev offentliggjort den 10. december 2021. Rapporter fra hele verden viser, at sårbarheden anvendes aktivt og med succes i angreb.
{{% / ingress %}}

Log4j er et Java-baseret logningsbibliotek, der er udbredt i mange populære softwaresystemer.

### Vigtigste pointer

- Dette har ingen konsekvenser for Safesprings systemer.
- Safesprings kunder bør stoppe de tjenester, der kan være berørt.

<div style="margin-bottom:50px;"></div>

## Hvad vi har gjort indtil videre

{{% ingress %}}
Heldigvis har dette ingen konsekvenser for vores systemer, og ingen tjenester er nede.
{{% /ingress %}}

Vi må dog påpege, at vi ikke har – og ikke bør have – kendskab til, hvilke applikationer vores kunder kører, og hvordan de påvirkes af dette.

### Anbefalinger til vores kunder

- Stop alle tjenester, der kan være berørt
- Gennemgå alle logfiler for forsøg og eventuelle vellykkede forsøg på at udnytte denne sårbarhed
- Skift straks nøgler, adgangskoder og andre hemmeligheder, som et kompromis kan have lækket
- Opgrader til en sikker version af Log4j, eller anvend afbødende foranstaltninger for Log4j-sårbarheden

<div style="margin-bottom:50px;"></div>

Hvis du mener, at du ikke er sårbar, så tjek for en sikkerheds skyld én gang til.

Bemærk, at Log4j er indlejret i mange andre logningsværktøjer og i tjenester, der bruger disse værktøjer. Der findes en stadig voksende liste over berørte (og ikke-berørte).

{{< 2calltoaction "Berørte teknologier" "https://gist.github.com/SwitHak/b66db3a06c2955a9cb71a8718970c592" "Læs CVE-meddelelsen" "https://nvd.nist.gov/vuln/detail/CVE-2021-44228" >}}

<div style="margin-bottom:50px;"></div>

Hvis vi hos Safespring har indikationer på, at tjenester eller instanser i vores infrastruktur er berørt af Log4j-sårbarheden og aktivt bliver brugt i angreb, vil vi alarmere kunden, og hvis kunden ikke handler, bliver vi nødt til at lukke disse instanser hurtigst muligt for at forhindre yderligere skade.

Vi overvåger ikke aktivt for dette, men andre kan gøre os opmærksomme på det. Det er tjenesteejerens ansvar at undersøge situationen nærmere i sådanne tilfælde.