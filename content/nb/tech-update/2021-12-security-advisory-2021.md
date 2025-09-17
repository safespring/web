---
ai: true
title: "Sikkerhetsvarsel om kritisk Log4j-sårbarhet"
intro: "En liten intern modul som håndterer logging for Java-programmer kan påvirke applikasjonen din."
date: "2021-12-13"
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "nb"
section: "Teknisk oppdatering"
aliases:
  - /blogg/security-advisory-2021
  - /blogg/2021/2021-12-security-advisory-2021/
---
{{% ingress %}}
En sårbarhet i {{< tooltip "Log4j" >}}Log4j er en liten intern modul som håndterer loggføring for Java-programmer.{{< /tooltip >}} ble kunngjort 10. desember 2021. Rapporter fra hele verden viser at sårbarheten brukes aktivt og med hell i angrep.
{{% / ingress %}}

Log4j er et Java-basert loggeverktøy som er mye brukt i populære programvaresystemer.

### Viktige punkter

- Dette har ingen konsekvenser for Safesprings systemer.
- Safespring-kunder bør stoppe sine tjenester som kan være berørt.

<div style="margin-bottom:50px;"></div>

## Hva vi har gjort så langt

{{% ingress %}}
Heldigvis har dette ingen konsekvenser for systemene våre, og ingen tjenester er nede.
{{% /ingress %}}

Vi må likevel påpeke at vi ikke har, og heller ikke skal ha, kunnskap om hvilke applikasjoner kundene våre kjører og hvordan de påvirkes av dette.

### Anbefalinger til kundene våre

- Stopp alle tjenester som kan være berørt
- Gå gjennom alle logger på jakt etter forsøk og eventuelle vellykkede forsøk på å utnytte denne sårbarheten
- Bytt umiddelbart ut hemmeligheter som et kompromiss kan ha lekket
- Oppgrader til en sikker versjon av Log4j eller ta i bruk avbøtende tiltak for Log4j-sårbarheten

<div style="margin-bottom:50px;"></div>

Hvis du mener at du ikke er sårbar, vennligst kontroller én gang til for sikkerhets skyld.

Vær oppmerksom på at Log4j er innebygd i mange andre loggeverktøy og i tjenester som bruker disse verktøyene. Det finnes en stadig voksende liste over berørte (og ikke-berørte).

{{< 2calltoaction "Berørte teknologier" "https://gist.github.com/SwitHak/b66db3a06c2955a9cb71a8718970c592" "Les CVE-kunngjøringen" "https://nvd.nist.gov/vuln/detail/CVE-2021-44228" >}}

<div style="margin-bottom:50px;"></div>

Dersom vi i Safespring får indikasjoner på at tjenester eller instanser i vår infrastruktur er berørt av Log4j-sårbarheten og aktivt brukes i angrep, vil vi varsle kunden, og hvis kunden ikke iverksetter tiltak, må vi stenge disse instansene så snart som mulig for å forhindre ytterligere skade.

Vi overvåker ikke aktivt for dette, men andre kan varsle oss. Det er tjenesteeiers ansvar å undersøke situasjonen nærmere i slike tilfeller.