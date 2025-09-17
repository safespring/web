---
ai: true
title: "OpenStack-portens preserve_on_delete-tilstand"
date: "2022-08-22"
intro: "Veksling av preserve_on_delete-flagget på aktive OpenStack-porter."
draft: true
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
author: "Jarle Bjørgeengen"
section: "blogg"
language: "nb"
toc: ""
aliases:
  - /blogg/2022-08-openstack-port-preserve_on_delete
  - /blogg/2022/2022-08-openstack-port-preserve_on_delete/
---
{{< ingress >}}
Det finnes ingen måte å retroaktivt hindre OpenStack i å slette en nettverksport ved frakobling, men i dette blogginnlegget går vi gjennom en mulig løsning.
{{< /ingress >}}

En nettverksport som legges til automatisk på en instans, enten ved opprettelsen av instansen eller via alternativet «Attach Interface -> by Network», blir automatisk slettet og får IP-adressen frigjort når grensesnittet kobles fra eller instansen slettes.

Dette kan unngås ved å opprette porten manuelt før du oppretter instansen eller kobler til grensesnittet. Men hvis porten allerede er opprettet automatisk, finnes det ingen måte å i ettertid hindre OpenStack i å slette den ved frakobling.

## Bakgrunn

Etter en ganske hastig migrering til Safesprings nyere OpenStack-plattform endte noen av instansene opp på et annet datastore enn det som ville vært optimalt for disse instansene. For å fikse dette ville vi normalt bare ta et snapshot av instansen og opprette en ny instans basert på snapshotet på ønsket datastore.

Dette ville imidlertid medføre at de tildelte IP-adressene gikk tapt, siden disse ble lagt til ved opprettelsen av instansene. Å håndtere endringer i IP-adresser ville gi en del nedetid i det som burde være en ganske enkel og rask migrering, så vi bestemte oss for å bruke litt tid på å finne ut hvordan vi kunne unngå å miste de opprinnelige IP-adressene.

## Undersøkelser

Både i GUI-et (Horizon) og via CLI ser det ikke ut til å finnes noen måte å vite om porten kommer til å bli slettet ved frakobling eller ikke, annet enn å sammenligne opprettelsestidspunktet for porten (via CLI) med opprettelsestidspunktet for instansen. Hvis porten er eldre enn instansen, er det en god sjanse for at den ikke blir slettet ved frakobling. Dette er likevel ikke en 100 % pålitelig metode, ettersom det også er mulig å opprette en port etter at en instans er opprettet og koble den til manuelt.

Siden vi ikke fant noen måte fra bruker- (og admin-)siden å avgjøre om et grensesnitt blir slettet eller ikke, men likevel så en tydelig forskjell i håndteringen av automatisk vs. manuelt opprettede porter, var det på tide å se på hvordan prosessen håndteres i kode.

### Dypdykk i koden

Med en kvalifisert gjetning var det gode muligheter for at et eller annet flagg ble satt når en port ble koblet til en instans. Etter en del graving fant vi dette i [neutron(v2)-koden][1].

Det ser ut til at hvis porten allerede finnes ved tilkobling, settes flagget `preserve_on_delete` til `true`; hvis den ikke fantes, settes flagget til `false`.

Så... tilsynelatende bør det finnes en `preserve_on_delete`-verdi et sted i databasen. I stedet for å grave mer i koden dumpet jeg hele nova-databasen og kjørte grep over den i håp om å finne et felt som inneholdt denne verdien.

Databasedumpen inneholdt verdien i en litt mer komplisert form enn jeg hadde håpet.

I Safesprings versjon av OpenStack lagres disse dataene i en JSON-blob (i praksis en lang streng) sammen med en hel del annen nettverksinfo i feltet `network_info` i tabellen `instance_info_caches`.

Jeg er ikke sikker på hva hensikten er med dette. Jeg har sett det før – for eksempel lagres flavor-data for hver instans ved opprettelsestidspunktet på denne måten. Min gjetning er at dette er ment å lagre informasjon som var sann på tidspunktet den ble lagret.

Uansett inneholder feltet (blant annet) strengen `preserve_on_delete=true` eller `preserve_on_delete=false` for hver port som er registrert på en instans.

[1]: https://github.com/openstack/nova/blob/stable/train/nova/network/neutronv2/api.py#L2945-L2955

## Konklusjon

Å endre `preserve_on_delete`-delen av strengen for relevant `instance_uuid` i feltet `network_info` i tabellen `instance_info_caches` i `nova`-databasen gjør at porten blir bevart `true` eller slettet `false` ved frakobling.

Dette ser ut til å løse problemet vårt.