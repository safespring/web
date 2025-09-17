---
ai: true
title: "Utvikle et klientbibliotek med åpen kildekode for sikkerhetskopiering"
date: "2023-04-21"
publishDate: "2023-04-23"
intro: "Utforsk vårt Cloutility API-klientbibliotek med åpen kildekode for å forenkle registrering og administrasjon av backup-klienter."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknologioppdatering"
author: "Daniel de Oquiñena"
language: "nb"
toc: ""
sidebarlinkname: "Cloutility-api-client-repositoriet"
sidebarlinkurl: "https://github.com/safespring-community/cloutility-api-client"
sidebarlinkname2: ""
sidebarlinkurl2: ""
aliases:
  - /blogg/2023/2023-04-creating-an-opensource-backup-client-library/
---
{{< ingress >}}
Hos Safespring brenner vi for teknologi med åpen kildekode. Plattformen vår bygger på flere open source-produkter, og vi er opptatt av å gi tilbake til fellesskapet når det er mulig.
{{< /ingress >}}

Noen ganger trenger vi likevel en løsning som ennå ikke finnes. Det var tilfellet da vi ønsket å lage et verktøy som forenkler registreringsprosessen for backup-klienter til vår backup-løsning.

Safesprings backup-løsning er basert på IBM Spectrum Protect, frontet av Auwau's Cloutility-programvare. Denne kombinasjonen gir en kraftig backup-løsning i enterprise-klassen, og Cloutility tilbyr både kundeportal og et rikt API. Vi klarte imidlertid ikke å finne et eksisterende klientbibliotek som kunne brukes for å benytte Cloutility-API-et.

Derfor bestemte vi oss for å ta utfordringen selv, i håp om å gagne ikke bare Safespring, men også andre organisasjoner og brukere som benytter et lignende oppsett. For noen uker siden begynte vi derfor å jobbe med prosjektet "cloutility-api-client". Biblioteket er langt fra funksjonskomplett, men gjør det mulig å benytte Cloutility-API-et og inkluderer rundt 15 metoder for å arbeide med forretningsenheter, konsumenter og noder. Disse metodene gjør det mulig å utføre oppgaver som å opprette og slette forretningsenheter og konsumenter, samt å administrere noder og tilhørende data.

I tillegg skrev vi også et enkelt CLI-verktøy som kan brukes til generelle formål, slik at operatører raskt og enkelt kan samhandle med Cloutility-API-et, og som implementerer alle metodene som for øyeblikket er tilgjengelige i cloutapi-package.

Styrken i et bibliotek ligger imidlertid i muligheten til å utvides med skreddersydde verktøy og integrasjoner, og vi håper å se verktøy fra fellesskapet som ytterligere kan forenkle registreringsprosessen og forbedre livssyklusstyringen av backup-noder.

Vi ønsker derfor bidrag fra fellesskapet velkommen for å utvide tilgjengelig funksjonalitet og tilby spesialiserte verktøy som dekker konkrete behov. Målet vårt er som alltid å lage en robust og fleksibel løsning som lett kan tilpasses ulike miljøer og brukstilfeller, og vi håper at arbeidet vårt med Cloutility API-klienten vil bidra til dette.

{{% note "Anbefalt lesing" %}}
Fordyp deg i verden av åpen kildekode for administrasjon av backup-klienter ved å lese vår ferske artikkel om [Automatisere registrering av backup-noder med Cloutility API-klienten.](/blogg/2023/2023-04-using-cloutility-api-client-to-auto-enroll-backup-clients/) God lesing!
{{% /note %}}

## Forstå viktige begreper

Utforsk en kortfattet guide som forklarer essensiell terminologi i artikkelen vår om det åpne Cloutility API-klientbiblioteket. Få bedre forståelse av begrepene og teknologiene som diskuteres, slik at du lettere ser deres betydning for administrasjon og registrering av backup-klienter.

{{% accordion title="Åpen kildekode" %}}
Åpen kildekode refererer til programvare eller prosjekter der kildekoden gjøres tilgjengelig for allmennheten, slik at alle kan se, bruke, endre og distribuere koden. Dette fremmer samarbeid, innovasjon og transparens, og oppmuntrer til deling av kunnskap og ressurser i utviklermiljøet.
{{% /accordion %}}

{{% accordion title="Backup-klient" %}}
En backup-klient er et program som kjører på en enhet (som en datamaskin eller server) og har ansvar for å sende data til en backupserver eller et backupsystem. Hensikten er å beskytte og bevare data ved å lage kopier eller sikkerhetskopier som kan gjenopprettes ved datatap, korrupsjon eller andre problemer.
{{% /accordion %}}

{{% accordion title="API" %}}
API, kort for Application Programming Interface, er et sett med regler og protokoller som gjør det mulig for ulike programvareapplikasjoner å kommunisere og dele data med hverandre. API-er definerer hvordan informasjon forespørres, sendes og mottas mellom systemer, slik at utviklere kan bygge applikasjoner som utnytter funksjoner og data fra andre tjenester.
{{% /accordion %}}

{{% accordion title="IBM Spectrum Protect" %}}
IBM Spectrum Protect, tidligere kjent som Tivoli Storage Manager (TSM), er en løsning for databeskyttelse og gjenoppretting som hjelper organisasjoner med å håndtere og sikre kritiske data. Den tilbyr sentralisert, automatisert administrasjon av sikkerhetskopiering og gjenoppretting, med støtte for et bredt spekter av plattformer, lagringsenheter og applikasjoner. IBM Spectrum Protect bidrar til å sikre dataintegritet, minimere nedetid og redusere driftskostnader.
{{% /accordion %}}

{{% accordion title="Auwau's Cloutility" %}}
Auwau's Cloutility er en programvareløsning som tilbyr en brukervennlig kundeportal og et API for å administrere backup- og gjenopprettingstjenester. Den fungerer som et frontend-grensesnitt for backup-løsninger i enterprise-klassen, som IBM Spectrum Protect, og gjør det enklere å administrere og overvåke sikkerhetskopier. Cloutility strømlinjeformer backup-prosessen og forbedrer den totale brukeropplevelsen.
{{% /accordion %}}

{{% accordion title="CLI-verktøy" %}}
CLI, kort for Command Line Interface, er et tekstbasert grensesnitt som lar brukere samhandle med et program eller operativsystem ved å skrive kommandoer, i stedet for å bruke et grafisk grensesnitt (GUI). Et CLI-verktøy er et hjelpeprogram som bruker kommandolinjen for å utføre oppgaver eller operasjoner, og gir erfarne brukere en rask og effektiv måte å samhandle med et system på.
{{% /accordion %}}

{{< accordion-script >}}