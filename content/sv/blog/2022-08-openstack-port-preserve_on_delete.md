---
ai: true
title: "OpenStack-portens preserve_on_delete-status"
date: "2022-08-22"
intro: "Växla preserve_on_delete-flaggan för aktiva OpenStack-portar."
draft: true
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
author: "Jarle Bjørgeengen"
section: "blogg"
language: "sv"
toc: ""
aliases:
  - /blogg/2022-08-openstack-port-preserve_on_delete
  - /blogg/2022/2022-08-openstack-port-preserve_on_delete/
---
{{< ingress >}}
Det går inte att i efterhand hindra OpenStack från att radera en nätverksport vid frånkoppling, men i det här blogginlägget går vi igenom en möjlig lösning.
{{< /ingress >}}

En nätverksport som läggs till automatiskt på en instans, antingen vid skapandet av instansen eller via alternativet ”Koppla gränssnitt -> via nätverk”, kommer automatiskt att raderas och dess IP-adress frigöras när gränssnittet kopplas från eller instansen raderas.

Detta kan undvikas genom att skapa porten manuellt innan du skapar instansen eller kopplar gränssnittet. Men om porten redan har skapats automatiskt finns det inget sätt att i efterhand hindra OpenStack från att radera den vid frånkoppling.

## Bakgrund

Efter en ganska hastig migrering till Safesprings nyare OpenStack-plattform hamnade några av instanserna på en annan datastore än vad som vore optimalt för dem. För att åtgärda detta brukar vi normalt ta en ögonblicksbild av instansen och skapa en ny instans baserad på den ögonblicksbilden på önskad datastore.

Detta skulle dock göra att de tilldelade IP-adresserna går förlorade eftersom de lades till vid skapandet av instanserna. Att hantera IP-adressbyten skulle innebära en hel del driftstopp i något som egentligen borde vara en ganska enkel och snabb migrering, så vi valde att lägga lite tid på att undersöka hur vi kunde undvika att förlora de ursprungliga IP-adresserna.

## Undersökningar

Sett till både GUI:t (Horizon) och CLI-sidan verkar det inte finnas något sätt att veta om porten kommer att raderas vid frånkoppling eller inte, annat än att jämföra portens skapandedatum (via CLI) med instansens skapandedatum. Om porten är äldre än instansen finns goda chanser att den inte raderas vid frånkoppling. Det är dock inte ett vattentätt sätt att avgöra detta, eftersom det också är möjligt att skapa en port efter att en instans har skapats och koppla in den manuellt.

När vi inte hittade något sätt att avgöra om ett gränssnitt raderas eller inte från användar- (och admin-)sidan, men såg att det finns en märkbar skillnad i hanteringen av automatiskt tillagda kontra manuellt tillagda portar, var det dags att titta på hur processen hanteras i koden.

### Djupdykning i koden

Med en kvalificerad gissning fanns det goda skäl att tro att någon flagga sattes när en port kopplades till en instans. Efter en hel del grävande hittades detta i [neutron(v2)-koden][1].

Det verkar som att om porten redan finns vid anslutning sätts flaggan `preserve_on_delete` till `true`; om den inte fanns sätts flaggan till `false`.

Så... uppenbarligen borde det finnas ett värde `preserve_on_delete` någonstans i databasen. I stället för att gräva mer i koden dumpade jag hela nova-databasen och grepade igenom den i hopp om att hitta ett fält som innehöll detta värde.

Databasedumpen innehöll värdet i en lite mer komplicerad form än jag hade hoppats.

I Safesprings version av OpenStack lagras dessa data i en JSON-blob (i praktiken en lång sträng) tillsammans med en massa annan nätverksinformation i fältet `network_info` i tabellen `instance_info_caches`.

Jag är inte säker på resonemanget bakom detta. Jag har sett det tidigare – till exempel lagras flavor-data för varje instans vid skapandet på det här sättet. Min gissning är att detta är tänkt att spara information som var sann vid tiden då den sparades.

Hur som helst innehåller fältet (bland annat) strängen `preserve_on_delete=true` eller `preserve_on_delete=false` för varje port som är registrerad till en instans.

[1]: https://github.com/openstack/nova/blob/stable/train/nova/network/neutronv2/api.py#L2945-L2955

## Slutsats

Att ändra delen `preserve_on_delete` av strängen för relevant `instance_uuid` i fältet `network_info` i tabellen `instance_info_caches` i `nova`-databasen gör att porten bevaras (`true`) eller raderas (`false`) vid frånkoppling.

Detta verkar lösa vårt problem.