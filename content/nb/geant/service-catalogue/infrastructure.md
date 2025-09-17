---
ai: true
title: "Skytjeneste for databehandling"
language: "nb"
cardtitle: "Databehandling i skyen"
cardicon: "fa-solid fa-server"
cardcolor: "#195F8C"
cardorder: "01"
date: "2025-01-20"
draft: false
intro: "På denne siden finner du informasjon om våre tjenester for beregning i skyen under Infrastruktur som en tjeneste (IaaS), inkludert detaljerte konfigurasjoner og kategorier av tilgjengelige beregningstjenester."
cardintro: "Med IaaS kan du skalere infrastrukturen din opp eller ned etter behov."
background: "safespring-compute-background.svg"
form: "nei"
sidebarlinkname: "Tilbake til alle kategorier"
sidebarlinkurl: "/geant/service-catalogue"
sidebarlinkname2: "Se pris på datakraft"
sidebarlinkurl2: "/geant/price/#safespring-compute"
socialmedia: "safespring-compute.jpg"
section: "OCRE 2024-rammeverk"
socialmedia: "/safespring-start.jpg"
toc: "På denne siden"
noindex: "x"
aliases:
- /geant/service-catalogue/infrastructure/
---
{{< ingress >}}
På denne siden finner du informasjon om våre Infrastructure as a Service (IaaS) compute-tjenester i skyen, inkludert detaljerte konfigurasjoner og kategorier av tilgjengelige compute-tjenester.
{{< /ingress >}}

Cloud compute-tjenester omfatter følgende kategorier (OpenStack flavors):

- Compute med lokal NVMe-lagring («**L2**»)
- Compute («**B2**»)

Grunn­disker er standard rotdiskstørrelser med mindre et volum med en annen størrelse angis når et image rulles ut. Midlertidige disker er ekstra lokale lagringsenheter som er tilgjengelige for en virtuell maskin på en spesifikk hypervisor, for flavor-typer der det er aktuelt.

## Compute med lokal NVMe-lagring

Compute-profilen med lokal NVMe-disk har både 1:2 og 1:4 vCPU:RAM-forhold. Den leveres med valg av lokal, midlertidig NVMe-lagring. Begrepet «midlertidig» betyr at lagringen har samme levetid som instansen og bare lagres med én kopi på den lokale disken på compute-noden der instansen kjører. Dette gjør instanser godt egnet for automatisert klargjøring, eller som klyngemedlemmer for databaser eller Kubernetes worker-noder.

### Forutsetninger

Ingen.

### Konfigurasjoner

| Produktkode             | vCPU | Minne | Midlertidig disk |
| ----------------------- | ---- | ----- | ---------------- |
| FLAVOR-l2. c2 r4. 100   | 2    | 4 GiB | 100 GB           |
| FLAVOR-l2. c2 r4. 500   | 2    | 4 GiB | 500 GB           |
| FLAVOR-l2. c2 r4. 1000  | 2    | 4 GiB | 1000 GB          |
| FLAVOR-l2. c4 r8. 100   | 4    | 8 GiB | 100 GB           |
| FLAVOR-l2. c4 r8. 500   | 4    | 8 GiB | 500 GB           |
| FLAVOR-l2. c4 r8. 1000  | 4    | 8 GiB | 1000 GB          |
| FLAVOR-l2. c8 r16. 100  | 8    | 16 GiB| 100 GB           |
| FLAVOR-l2. c8 r16. 500  | 8    | 16 GiB| 500 GB           |
| FLAVOR-l2. c8 r16. 1000 | 8    | 16 GiB| 1000 GB          |
| FLAVOR-l2. c16 r32. 100 | 16   | 32 GiB| 100 GB           |
| FLAVOR-l2. c16 r32. 500 | 16   | 32 GiB| 500 GB           |
| FLAVOR-l2. c16 r32. 1000| 16   | 32 GiB| 1000 GB          |
| FLAVOR-l2. c16 r64. 500 | 16   | 64 GiB| 500 GB           |
| FLAVOR-l2. c32 r64. 1000| 32   | 64 GiB| 1000 GB          |

### Compute uten lokal lagring

Den grunnleggende compute-profilen har både 1:2 og 1:4 vCPU:RAM-forhold. Den har ikke midlertidig lagring og må opprettes med et underliggende volum fra den sentrale lagringstjenesten.

#### Forutsetninger

Ingen.

#### Konfigurasjon

| Produktkode         | vCPU | Minne |
| ------------------- | ---- | ----- |
| FLAVOR-b2. c1 r2    | 1    | 2 GiB |
| FLAVOR-b2. c1 r4    | 1    | 4 GiB |
| FLAVOR-b2. c2 r4    | 2    | 4 GiB |
| FLAVOR- b2. c2 r8   | 2    | 8 GiB |
| FLAVOR- b2. c4 r8   | 4    | 8 GiB |
| FLAVOR- b2. c4 r16  | 4    | 16 GiB|
| FLAVOR- b2. c8 r16  | 8    | 16 GiB|
| FLAVOR- b2. c8 r32  | 8    | 32 GiB|
| FLAVOR- b2. c16 r32 | 16   | 32 GiB|
| FLAVOR- b2. c16 r64 | 16   | 64 GiB|

### Sentral blokklagring

Sentral blokklagring leveres av Ceph HDD- og SSD-klynger.

#### Forutsetninger

Serverinstans å feste volum til, inkludert som et rotdiskvolum.

#### Konfigurasjoner

| Produktkode     | Egenskaper                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| VOLUME-large    | HDD-basert 3-replika Ceph                                                                                     |
| VOLUME-fast     | SSD-basert 3-replika Ceph                                                                                     |
| VOLUME-snapshot | SSD eller HDD basert på kilde. Copy on write, som bare lagrer forskjellen fra tidspunktet snapshotet ble tatt.|

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Kom i kontakt med Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Salg:" >}} +46855107370 eller sales@safespring.se
{{% /custom-card %}}