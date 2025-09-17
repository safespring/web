---
ai: true
title: "Safespring Backup: En fullstendig overhaling av brukerportalen"
date: 2023-01-12T13:58:58+01:00
draft: false
tags: ["English"]
intro: "Safespring har utviklet en brukerportal og en API-bro i forbindelse med lanseringen av vår Safespring Backup-tjeneste."
background: "safespring-compute.jpg"
sidebarlinkname: "Til tjenesten"
sidebarlinkurl: "/services/backup"
sidebarlinkname2: "Kom i gang"
sidebarlinkurl2: "/demo"
socialmedia: ""
devops: ""
card: "safespring-backup.svg"
sidebarimage: "safespring-backup.svg"
background: "safespring-backup.svg"
socialmediabild: ""
form: ""
toc: "I denne artikkelen"
language: "nb"
author: "Gabriel Paues"
section: "Løsningsoversikt"
aliases:
- /solution-brief/safespring-backup-portal-en/
---
## Introduksjon

{{< ingress >}}
Safespring Backup er basert på det veletablerte Spectrum Protect fra IBM. Løsningen har mange styrker, som høy sikkerhet, utmerket skalerbarhet og automatisering av datalivssyklusen.
{{< /ingress >}}

Spectrum Protect kan beskytte utallige terabyte med data med minimalt administrasjonsarbeid.

Sikkerhetskopier krypteres under overføring med TLS 1.2, men kan også konfigureres til å krypteres på klientsiden automatisk for enda høyere sikkerhet.

Som en velprøvd løsning for store virksomheter kan Spectrum Protect definitivt håndtere skalaen til store tjenesteleverandøroppsett som Safesprings. Der den i noen grad kommer til kort, er fleksibel administrasjon av brukerkontoer og rolletildelinger. Siden sikkerhetskopier som regel håndteres av et dedikert team i en stor organisasjon, er denne ulempen noe den deler med mange andre backup‑løsninger på markedet, og er derfor ikke et spesifikt problem for Spectrum Protect.

## Problemstilling

For å løse dette utviklet Safespring en brukerportal og en API‑bro da vi lanserte vår Backup‑tjeneste. Portalen har gjort nytten ved å tilby selvbetjening for oppsett av nye noder og generering av nøkkeltokener for automatisk klargjøring av flere noder uten direkte menneskelig inngripen.

Selv om den var funksjonell, manglet det gamle brukergrensesnittet dashbord for status og muligheten for kunder til å legge til egne brukerkontoer. Brukere kunne ikke opprette egne hierarkier for å forenkle administrasjonen av ulike grupper med servere som sikkerhetskopieres.

![Safesprings nye backup-portal](/img/safespring-backup-portal.png)

## Oversikt over løsningen

Med relanseringen av Safespring Backup introduserer vi en fullstendig overhaling av brukergrensesnittet. Løsningen er basert på produktet Auwau Cloutility, med funksjoner som:

- Selvbetjening for sluttbrukere med mulighet til å opprette nye brukere uten å kontakte Safespring, og til å tildele roller og rettigheter til brukerne.
- Multi‑tenant-arkitektur med mulighet til å opprette hierarkier og brukere med rollebasert tilgang til ulike deler av hierarkiet. Dette gjør det mulig for én administrator å delegere ulike servere til forskjellige deler av organisasjonen.
- Klargjøring der administrator kan definere prosessen med standardinnstillinger slik at brukerne enkelt kan aktivere sine egne sikkerhetskopier.
- Avansert, men brukervennlig, rapportmotor som gjør det enkelt å følge opp statusen på alle sikkerhetskopier som kjører. Det er også mulig å sette opp tidsplaner for å sende rapporter med bestemte intervaller til angitte e‑postadresser.
- REST API gjør det mulig å gjøre alt du kan gjøre i det webbaserte brukergrensesnittet via API‑kall for å automatisere oppsettet ditt ytterligere.

### Beskyttelse mot ransomware

Safespring Backup benytter en låsemekanisme på hver node som registrerer seg for å bruke tjenesten. Mekanismen er utformet for å hindre at backup‑agenten sletter sikkerhetskopier før en forhåndsdefinert oppbevaringsperiode har utløpt. Denne oppbevaringsperioden settes til et visst antall dager, i løpet av hvilke sikkerhetskopiene holdes trygge og sikre.

Ved å implementere denne mekanismen sikrer vi at selv ved et ransomware‑angrep vil ikke angriperen kunne fjerne alle sikkerhetskopier fra serveren før dataene krypteres lokalt. Dette er fordi sikkerhetskopiene er låst og ikke kan slettes før oppbevaringsperioden har gått ut.

I tillegg gir mekanismen et ekstra beskyttelseslag for å sikre datagjenoppretting ved et angrep. Ved å beholde flere sikkerhetskopier tilgjengelige kan vi gjenopprette data til et tidspunkt før angrepet inntraff, noe som minimerer konsekvensene for kundene våre.

Alt i alt bidrar denne mekanismen til at vi kan tilby en tryggere og mer pålitelig backup‑tjeneste, og er et viktig tiltak mot den økende trusselen fra ransomware‑angrep.

## Konklusjon

Med relanseringen av Safespring Backup tar Safespring et stort steg for å forbedre brukeropplevelsen og gjøre det enklere å håndtere sikkerhetskopiene dine hos Safespring. Med påliteligheten til Spectrum Protect kombinert med en fullverdig selvbetjeningsportal har det aldri vært enklere å kjøre sikkerhetskopier. Med et komplett REST API er det mulig å automatisere ulike administrative oppgaver.

Med Safespring Backup får du en sikker, men likevel brukervennlig løsning for å håndtere alle sikkerhetskopiene dine.

{{< horisontal-card image="/img/card/safespring-backup.svg" cardtitle="Les mer om Safespring Backup" text="Safespring Backup er en neste generasjons løsning for sikkerhetskopiering og gjenoppretting av data som utnytter påliteligheten og skalerbarheten til IBM Spectrum Protect. Safespring Backup er en neste generasjons løsning for sikkerhetskopiering og gjenoppretting av data som utnytter påliteligheten og skalerbarheten til IBM Spectrum Protect." linktext="Til tjenesten" link="/services/backup">}}