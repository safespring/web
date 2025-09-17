---
ai: true
title: "OpenStack-portens preserve_on_delete-tilstand"
date: "2022-08-22"
intro: "Skifte preserve_on_delete-flaget for aktive OpenStack-porte."
draft: true
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
author: "Jarle Bjørgeengen"
section: "blog"
language: "da"
toc: ""
aliases:
  - /blogg/2022-08-openstack-port-preserve_on_delete
  - /blogg/2022/2022-08-openstack-port-preserve_on_delete/
---
{{< ingress >}}
Der er ingen måde med tilbagevirkende kraft at forhindre OpenStack i at slette en netværksport ved frakobling, men i dette blogindlæg gennemgår vi en mulig løsning.
{{< /ingress >}}

En netværksport, der tilføjes automatisk til en instans, enten ved oprettelsen af instansen eller via valget "Attach Interface -> by Network", bliver automatisk slettet og får sin IP-adresse frigivet, når interfacet frakobles eller instansen slettes.

Dette kan undgås ved at oprette porten manuelt før oprettelse af instansen eller før du tilkobler interfacet. Men hvis porten allerede er oprettet automatisk, er der ingen måde med tilbagevirkende kraft at forhindre OpenStack i at slette den ved frakobling.

## Baggrund

Efter en ret hastig migrering til Safesprings nyere OpenStack-platform endte nogle af instanserne på et andet datalager end det, der ville være optimalt for disse instanser. For at løse dette ville vi typisk bare tage et snapshot af instansen og oprette en ny instans baseret på snapshot’et på det ønskede datalager.

Dette ville dog medføre, at de tildelte IP-adresser går tabt, da disse blev tilføjet ved oprettelsen af instanserne. Håndtering af IP-adresseændringer ville tilføje en del nedetid til noget, der burde være en ret enkel og hurtig migrering, så vi besluttede at bruge lidt tid på at undersøge, hvordan vi undgår at miste de oprindelige IP-adresser.

## Undersøgelser

Når man kigger på både GUI'en (horizon) og CLI-siden, ser der ikke ud til at være nogen måde at vide, om porten bliver slettet ved frakobling eller ej, andet end at sammenligne oprettelsesdatoen for porten (via CLI) med oprettelsesdatoen for instansen. Hvis porten er ældre end instansen, er der en god chance for, at den ikke bliver slettet ved frakobling. Dette er dog ikke en 100 % sikker måde at afgøre, om den bliver slettet eller ej, da det også er muligt at oprette en port efter, at en instans er oprettet, og tilkoble den manuelt.

Da der ikke fandtes nogen måde fra bruger- (og admin-)siden at afgøre, om et interface bliver slettet eller ej, men det samtidig var tydeligt, at automatisk tilføjede porte håndteres anderledes end manuelt tilføjede porte, var det tid til at se på, hvordan processen håndteres i koden.

### Dyk ned i koden

Med et kvalificeret gæt var der en god chance for, at der blev sat et flag, når en port blev tilknyttet en instans. Efter at have gravet en del fandt vi dette i [neutron(v2)-koden][1].

Det lader til, at hvis porten allerede eksisterer ved tilslutning, får den flaget `preserve_on_delete` sat til `true`; hvis den ikke eksisterede, sættes flaget til `false`.

Så... tilsyneladende bør der være en `preserve_on_delete`-værdi et eller andet sted i databasen. I stedet for at grave mere i koden dumpede jeg hele nova-databasen og greppede igennem den i håb om at finde et felt, der indeholder denne værdi.

Database-dumpet indeholdt værdien i en lidt mere kompliceret form, end jeg havde håbet.

I Safesprings version af OpenStack lagres disse data i en JSON-blob (grundlæggende en lang streng) sammen med en masse anden netværksinfo i feltet `network_info` i tabellen `instance_info_caches`.

Jeg er ikke sikker på begrundelsen for dette. Jeg har set det før – for eksempel gemmes flavor-data for hver instans på oprettelsestidspunktet på denne måde. Mit gæt er, at dette er tænkt til at gemme info, der var sand på det tidspunkt, det blev gemt.

Under alle omstændigheder indeholder feltet (blandt andet) strengen `preserve_on_delete=true` eller `preserve_on_delete=false` for hver port, der er registreret på en instans.

[1]: https://github.com/openstack/nova/blob/stable/train/nova/network/neutronv2/api.py#L2945-L2955

## Konklusion

Hvis man ændrer `preserve_on_delete`-delen af strengen for den relevante `instance_uuid` i feltet `network_info` i tabellen `instance_info_caches` i `nova`-databasen, bliver porten bevaret `true` eller slettet `false` ved frakobling.

Det ser ud til at løse vores problem.