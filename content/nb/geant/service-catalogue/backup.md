---
ai: true
title: "Sikkerhetskopiering som en tjeneste"
language: "nb"
cardtitle: "Sikkerhetskopi"
cardicon: "fa-solid fa-cloud-arrow-up"
cardcolor: "#195F8C"
cardorder: "06"
date: "2025-01-20"
draft: false
intro: "Backup-tjenesten tilbys i tre abonnementsmodeller, avhengig av dine behov."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nei"
sidebarlinkname: "Tilbake til alle kategorier"
sidebarlinkurl: "/geant/service-catalogue"
sidebarlinkname2: "Se prisen på databehandling"
sidebarlinkurl2: "/geant/price/#safespring-backup"
section: "OCRE 2024-rammeverk"
socialmedia: "/safespring-start.jpg"
toc: "På denne siden"
noindex: "x"
aliases:
  - /geant/service-catalogue/backup/
---

{{< ingress >}}
Agentbaserte skybackup-tjenester med deduplisering og sikker, ekstern lagring.
{{< /ingress >}}

## Backup-tjeneste

Backup-tjenesten leveres i tre abonnementsmodeller avhengig av kundens behov.

### Forutsetninger

Ingen.

### Konfigurasjoner

| Produktkode    | Tjeneste                                   |
| -------------- | ------------------------------------------ |
| BAAS-on.demand | Abonnement egnet for små, on-demand-behov. |
| BAAS-small     | Abonnement egnet for mellomstore behov.    |
| BAAS-large     | Abonnement egnet for store behov.          |

### Sikkerhetskopiering for applikasjoner og filsystemer

Programvaren som trengs for å sikkerhetskopiere filsystemer kan kompletteres med applikasjonsbevisste agenter for sikker sikkerhetskopiering av ulike typer databaser.

Backup-tjenesten er basert på IBMs Spectrum Protect og tilbys i tre ulike varianter basert på hvor mye data kunden forventer å sikkerhetskopiere. Safespring har utviklet et eget API som orkestrerer matchingen mellom klienter og flåten av backup-servere.

Spectrum Protect er primært et filbasert backup-system med en «incremental forever»-strategi, noe som betyr at filer bare sikkerhetskopieres hvis de er endret. Dette reduserer kraftig datamengden som håndteres av backup-serveren. I tillegg komprimeres det meste av dataene som sikkerhetskopieres; for data som ikke er klientkryptert brukes også deduplisering. Klientkrypterte data dedupliseres ikke for å garantere maksimal sikkerhet for kundens data. All data lagres med kryptering i ro (data-at-rest), og backup-nettverkstrafikken krypteres med sterke AES-256-chiffersuiter.

Kryptering er bare så sikker som nøkkelhåndteringen, og backup-alternativene har følgende tre varianter:

- Delt kryptering, nøkler eies av leverandøren
- Delt kryptering, nøkler eies av kunden
- Kryptering per vert, nøkler eies av kunden/sluttbrukeren

For alle nivåer kan man planlegge opptil fire sikkerhetskopier per dag. Det finnes flere forhåndsdefinerte starttidspunkter å velge mellom (annenhver time). Tjenesten omtales som BAAS.backup i prislisten.

Sikkerhetskopieringen kan settes opp med følgende oppsett:

- Incremental forever. Inkrementell sikkerhetskopiering av filsystemer. Én kjøreplan tilgjengelig annenhver time.
- Full sikkerhetskopiering. Full sikkerhetskopiering av applikasjonen. Én kjøreplan tilgjengelig annenhver time.
- Inkrementell-/loggsikkerhetskopiering. Inkrementell eller loggsikkerhetskopiering avhengig av applikasjon. Én kjøreplan tilgjengelig hver time.

### Oppbevaringsregler

I tillegg til standard oppbevaringsregler tilbyr vi en rekke versjonsbegrensede regler. De beholder sikkerhetskopier i det angitte antallet dager, men hver fil beholdes bare opptil det maksimale antallet versjoner som er angitt.

Disse reglene har fordelen at de gir et pristak. For eksempel, hvis en fem-versjoners regel velges vil mengden lagret (og fakturert) aldri overstige fem ganger klientstørrelsen. I de fleste tilfeller vil mengden som lagres være mindre, siden bare endrede filer sikkerhetskopieres. En fil som aldri endres vil fortsatt bare være én versjon i backup-systemet.

| Oppbevaring | Beskrivelse                                                                 |
| ----------- | --------------------------------------------------------------------------- |
| 30 dager    | Beholder alle sikkerhetskopidata i 30 dager, opptil fem versjoner per fil.  |
| 30 dager    | Beholder alle sikkerhetskopidata i 30 dager, opptil ti versjoner per fil.   |
| 90 dager    | Beholder alle sikkerhetskopidata i 90 dager, opptil fem versjoner per fil.  |
| 90 dager    | Beholder alle sikkerhetskopidata i 90 dager, opptil ti versjoner per fil.   |
| 365 dager   | Beholder alle sikkerhetskopidata i 365 dager, opptil fem versjoner per fil. |
| 365 dager   | Beholder alle sikkerhetskopidata i 365 dager, opptil ti versjoner per fil.  |

Det er mulig å be om andre versjonsbegrensede regler ved behov (f.eks. 17 eller 42 versjoner).

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Ta kontakt med Safespring" %}}
{{< inline "Brukerstøtte:" >}} support@safespring.com  
{{< inline "Salg:" >}} +46855107370 eller sales@safespring.se
{{% /custom-card %}}
