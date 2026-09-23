---
ai: true
section: "Safespring Cloud Platform"
language: "da"
title: "Prisliste og prisberegner"
date: "2023-12-01"
draft: false
tags: ""
showthedate: false
pageimage: ""
intro: "Sammen skaber vi en sikrere og mere omkostningseffektiv digital infrastruktur."
toc: "På denne side"
nosidebar: ""
sidebarlinkname: "Se demo"
sidebarlinkurl: "/demo/compute/"
sidebarlinkname2: "Kontakt os"
sidebarlinkurl2: "/contact.md"
aliases:
  - /en/price/
---
<!--
{{< icon-block-container >}}
{{< icon-block icon="fa-solid fa-table" text="Prisliste med beregner" link="/pricelist/EUR/safespring-price-list-eur.xlsx" color="#32cd32">}}
{{< icon-block icon="fa-solid fa-file-pdf" text="Prisliste som PDF" link="/pricelist/EUR/safespring-price-list-eur.pdf" color="#195F8C">}}
{{< icon-block icon="fa-solid fa-file-csv" text="Prisliste som CSV (kommer snart)" link="" color="#EBEBEB">}}
{{< /icon-block-container >}}
-->

## Download prisberegneren
Opsæt dit nuværende miljø for at se, hvor meget du sparer ved at flytte til Safespring. Prisberegneren er en Excel-fil med indbygget logik, der beregner en månedlig omkostning baseret på dine valg.

{{< price-list language="en" >}}

{{< distance >}}

{{< ingress >}}
Se vores priser længere nede på siden, eller download prisberegneren til din computer. Prisberegneren er en Excel-fil med indbygget logik, der beregner en månedlig omkostning baseret på dine valg.
{{< /ingress >}}

Prisen inkluderer høj sikkerhed – fysisk, logisk og juridisk. Du får også 24/7-support og adgang til vores selvbetjeningsportal, hvor du kan administrere dine instanser efter behov.

## Ingen trafikomkostninger

Safespring opkræver ingen trafikomkostninger for data sendt til eller fra vores tjenester. Trafikomkostning, eller egress-omkostning som det også kaldes, er en almindelig lock-in-mekanisme. Safespring er bygget på åbne standarder, og det er en del af vores filosofi.

{{< distance >}}

## Safespring Kubernetes Engine

{{< ingress >}}
Safespring Kubernetes Engine leverer et administreret Kubernetes-kontrolplan på Safesprings infrastruktur.
{{< /ingress >}}

Prisen nedenfor dækker Safesprings administration af kontrolplanet. Compute-instanser til kontrolplansnoder og workernoder kommer derudover og faktureres efter de valgte flavors.

| Produkt-ID            | Beskrivelse                 | Pr. måned |
|-----------------------|-----------------------------|----------:|
| PAAS-man-controlplane | Administreret kontrolplan   | 436,10 € |
| PAAS-controlplane     | Ikke-administreret kontrolplan | 0,00 € |

{{< distance >}}

## Safespring Compute

{{< ingress >}}
En flavor er en prækonfigureret instans af en virtuel maskine med en bestemt kombination af CPU, RAM og lager.
{{< /ingress >}}

### Flavors med lokal NVMe-disk

Udforsk vores udvalg af kraftfulde virtuelle servere med op til 32 vCPU'er og 64 GB RAM, med NVMe-lager op til 1.000 GB – til priser fra kun 0,060 € pr. time eller 42,72 € pr. 30 dage!

| Produkt-ID                | vCPU | RAM (GB) | Lokal disk (GB) | Timepris |  30 dage |
| ------------------------ | :--: | :------: | --------------: | -------: | -------: |
| FLAVOR-l2. c2 r4. 100    |  2   |    4     |             100 |  0,06 €  |  42,72 € |
| FLAVOR-l2. c2 r4. 500    |  2   |    4     |             500 |  0,11 €  |  78,32 € |
| FLAVOR-l2. c2 r4. 1000   |  2   |    4     |           1 000 |  0,17 €  | 122,82 € |
| FLAVOR-l2. c4 r8. 100    |  4   |    8     |             100 |  0,11 €  |  76,54 € |
| FLAVOR-l2. c4 r8. 500    |  4   |    8     |             500 |  0,16 €  | 112,14 € |
| FLAVOR-l2. c4 r8. 1000   |  4   |    8     |           1 000 |  0,22 €  | 156,64 € |
| FLAVOR-l2. c8 r16. 100   |  8   |    16    |             100 |  0,20 €  | 144,18 € |
| FLAVOR-l2. c8 r16. 500   |  8   |    16    |             500 |  0,25 €  | 179,78 € |
| FLAVOR-l2. c8 r16. 1000  |  8   |    16    |           1 000 |  0,31 €  | 224,28 € |
| FLAVOR-l2. c16 r32. 100  |  16  |    32    |             100 |  0,39 €  | 279,46 € |
| FLAVOR-l2. c16 r32. 500  |  16  |    32    |             500 |  0,44 €  | 315,06 € |
| FLAVOR-l2. c16 r32. 1000 |  16  |    32    |           1 000 |  0,50 €  | 359,56 € |
| FLAVOR-l2. c16 r64. 500  |  16  |    64    |             500 |  0,66 €  | 471,70 € |
| FLAVOR-l2. c32 r64.1000  |  32  |    64    |           1 000 |  0,88 €  | 630,12 € |

### Flavors uden lokal disk

Safespring tilbyder en række omkostningseffektive virtuelle maskiner med varierende antal vCPU'er og RAM. Centralt bloklager kan købes til instanserne.

| Produkt-ID         | vCPU | RAM (GB) | Lokal disk (GB) | Timepris |  30 dage |
| ------------------ | :--: | :------: | --------------: | -------: | -------: |
| FLAVOR-b2. c1 r2   |  1   |    2     |               0 |  0,02 €  |  16,91 € |
| FLAVOR-b2. c1 r4   |  1   |    4     |               0 |  0,04 €  |  26,70 € |
| FLAVOR-b2. c2 r4   |  2   |    4     |               0 |  0,05 €  |  33,82 € |
| FLAVOR-b2. c2 r8   |  2   |    8     |               0 |  0,07 €  |  53,40 € |
| FLAVOR-b2 .c4 r8   |  4   |    8     |               0 |  0,09 €  |  67,64 € |
| FLAVOR-b2. c4 r16  |  4   |    16    |               0 |  0,15 €  | 106,80 € |
| FLAVOR-b2. c8 r16  |  8   |    16    |               0 |  0,19 €  | 135,28 € |
| FLAVOR-b2. c8 r32  |  8   |    32    |               0 |  0,30 €  | 213,60 € |
| FLAVOR-b2. c16 r32 |  16  |    32    |               0 |  0,38 €  | 270,56 € |
| FLAVOR-b2. c16 r64 |  16  |    64    |               0 |  0,59 €  | 427,20 € |


### GPU-flavors

GPU-instanser er beregnet til workloads, der kræver beregningsacceleration, for eksempel AI, maskinlæring og dataanalyse. Udvalget omfatter flavors med A2 og H100 NVL, med eller uden lokal NVMe-lagring. Læs mere om [GPU-ressourcer til AI og maskinlæring](/tjenester/ai-ml/).

| Produkt-ID | vCPU | RAM (GB) | Lokal disk (GB) | GPU | Pr. time | Pr. 30 dage |
|------------|:----:|:--------:|----------------:|-----|---------:|------------:|
| FLAVOR-l2.c4r16.125.gA2 | 4 | 16 | 125 | A2 | 0,41 € | 297,71 € |
| FLAVOR-l2.c8r32.250.gA2 | 8 | 32 | 250 | A2 | 0,58 € | 415,63 € |
| FLAVOR-b2.c4r8.gA2 | 4 | 8 | 0 | A2 | 0,34 € | 247,42 € |
| FLAVOR-b2.c8r16.gA2 | 8 | 16 | 0 | A2 | 0,44 € | 315,06 € |
| FLAVOR-b2.c32.r192.gH100 | 32 | 192 | 0 | H100 NVL | 2,93 € | 2 138,14 € |

### Central bloklagring

Central bloklagring giver tre kopier af data fordelt i et robust CEPH-klynge. Få hurtig og pålidelig lagring med Safespring fra kun 0,107 € pr. GB pr. 30 dage.

| Produkt-ID   | Beskrivelse               |      Timepris      |  30 dage |
| ------------ | ------------------------- | :---------------: | -------: | -------- | --- |
| VOLUME-large | HDD-baseret 3-replica Ceph |     0,0001 €      | 0,1068 € |
| VOLUME-fast  | SSD-baseret 3-replica Ceph |     0,0004 €      | 0,3204 € |
| <!--         | VOLUME-snapshot           | Snapshot of image | 0,0001 € | 0,1068 € | --> |

{{< distance >}}

## Safespring Storage (S3)

{{< ingress >}}
Safespring tilbyder to skræddersyede S3-produkter til forskellige lagringsbehov: S3-archive til større mængder over længere perioder og S3-storage til applikationer, der aktivt bruger S3-protokollen.
{{< /ingress >}}

| Produkt-ID | Beskrivelse                                                     | Pr. TB i 30 dage |
| ---------- | ---------------------------------------------------------------- | ---------------: |
| S3-archive | Skræddersyet til større lagringsmængder over længere perioder.  |          31,15 € |
| S3-storage | Skræddersyet til applikationer, der aktivt bruger S3-protokollen.|          44,50 € |

{{< distance >}}

## Safespring Backup

{{< ingress >}}
Safespring tilbyder tre forskellige backup-løsninger. Priser pr. GB starter helt ned på 0,082 €, så du får backup i høj kvalitet til en overkommelig pris.
{{< /ingress >}}

Safespring Backup tilbyder datareduktionsteknologi <sup>1</sup> i tjenesten, som typisk reducerer datamængden mellem 45 % og 90 %. Prisen fastsættes pr. beskyttet GB på klienten og pr. lagret GB i tjenesten efter deduplikering og komprimering. Derudover er 1 TB inkluderet i den faste månedlige pris for BAAS-small.

{{% accordion title="Hvilken plan er bedst?" %}}

<table class="width100" style="margin-bottom:40px;">
    <thead>
        <tr>
            <th>Dataforbrug (GB)</th>
            <th>Mest omkostningseffektive tjeneste</th>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td>0 - 5 000</td>
        <td>Backup on Demand</td>
    </tr>
    <tr>
        <td>5 001 - 7 000</td>
        <td>Backup Small</td>
    </tr>
    <tr>
        <td>7 001+</td>
        <td>Backup Large</td>
    </tr>
</tbody>
</table>

{{% /accordion %}}

| Produkt-ID                   | Fast månedlig pris | Pr. GB / 30 dage |
| --------------------------- | -----------------: | ---------------: |
| BAAS-on.demand <sup>2</sup> |                N/A |           0,22 € |
| BAAS-small <sup>3</sup>     |               490 € |           0,16 € |
| BAAS-large <sup>4</sup>     |               846 € |           0,08 € |

## Netværk og software

{{< ingress >}}
Safespring tilbyder forskellige software og licenser, der kan køre oven på Safesprings cloudplatform.
{{< /ingress >}}

### Netværk

Safespring tilbyder offentlige IPv4- og IPv6-adresser, datatrafik (ingress og egress) uden ekstra omkostninger, Reverse DNS-navne samt Bring Your Own IP-præfikser. Derudover kan kunder få et tilbud på administrerede loadbalancere, som kræver deres egne servere.

| Produkt-ID   | Type                       | Beskrivelse                                   | Fakturering pr. |         Månedligt |
| ------------ | -------------------------- | --------------------------------------------- | --------------- | ----------------: | ------ |
| NET-publicv4 | IPv4                       | Offentlig                                     | IP-adresse      |           2,23 € |
| NET-publicv6 | IPv6                       | Offentlig                                     | N/A             |           0,00 € |
| NET-ingress  | Datatransfer               |                                               | GB              |           0,00 € |
| NET-egress   | Datatransfer               |                                               | GB              |           0,00 € |
| NET-mgn.slb  | Administreret SLB          | Loadbalancere, der kræver egne servere        | Instans         | Anmod om et tilbud |
| <!--         | NET-rdns                   | Reverse DNS names                             |             |             N/A | 0,00 € |
| NET-byoip    | Bring your own IP prefixes |                                               | N/A         |          0,00 € | -->    |

### Software og licenser

Maksimer din infrastruktur med software, der er optimeret til at køre på Safesprings platform.

| Produkt-ID         | Beskrivelse                      | Fakturering pr. |         Månedligt |
| ----------------- | -------------------------------- | --------------- | ----------------: |
| SW-win.ser.2022   | Microsoft Windows Server         | vCPU            |          15,58 € |
| SW-ms.sql.ser     | Microsoft SQL Server Standard    | vCPU            |         109,38 € |
| SW-ms.sql.ser.ent | Microsoft SQL Server Enterprise  | vCPU            |         424,17 € |

### Platformtjenester

Safesprings partnere tilbyder [database som en tjeneste](/tjenester/database/) til PostgreSQL, MariaDB og Redis. Derudover findes administrerede tjenester til Elasticsearch og NATS. Tjenesterne kører på Safesprings infrastruktur og koster fra 0,18 € pr. time.

| Produkt-ID | Beskrivelse | Fra pr. time |
|------------|-------------|-------------:|
| PAAS-man.postgresql | Managed PostgreSQL | 0,18 € |
| PAAS-man.mariadb | Managed MariaDB | 0,18 € |
| PAAS-man.elasticsearch | Managed Elasticsearch | 0,18 € |
| PAAS-man.redis | Managed Redis | 0,18 € |
| PAAS-man.nats | Managed NATS | 0,18 € |

## Support- og konsulentydelser

{{< ingress >}}
Vi tilbyder forskellige niveauer af support til cloudinfrastruktur. Derudover tilbyder vi erfarne konsulenter og projektledere til konkurrencedygtige priser.
{{< /ingress >}}

| Produkt-ID       | Beskrivelse                                                   | Fakturering pr. |                           Månedligt |
| ---------------- | ------------------------------------------------------------- | --------------- | ----------------------------------: |
| SUPPORT-base     | Support til Safesprings tjenester                             | N/A             |                            0,00 €  |
| SUPPORT-standard | Adgang til chatrum med support og engineering                 | Samlet forbrug  | 3 % af det samlede forbrug <sup>5</sup> |
| SUPPORT-premium  | Dedikeret Service Manager med kvartalsvise driftsmøder        | Time            |                   Anmod om et tilbud |

### Konsulentydelser

Få adgang til vores erfarne konsulenter og projektledere for at optimere din cloudinfrastruktur til konkurrencedygtige priser, med junior-eksperter fra 100,43 € pr. time og senior-eksperter op til 122,38 € pr. time.

| Produkt-ID       | Beskrivelse                                                        | Fakturering pr. |  Månedligt |
| ---------------- | ------------------------------------------------------------------ | --------------- | ---------: |
| PS-consult.jun   | Cloud-infrastrukturkonsulent, juniorniveau                         | Time            |   100,30 € |
| PS-consult.sen   | Cloud-infrastrukturkonsulent, seniorniveau                         | Time            |   122,29 € |
| PS-cloudarch.jun | Cloud-infrastrukturarkitekt, konsulent, juniorniveau               | Time            |   113,65 € |
| PS-cloudarch.sen | Cloud-infrastrukturarkitekt, konsulent, seniorniveau               | Time            |   122,29 € |
| PS-pm.jun        | Projektleder, juniorniveau                                         | Time            |   101,37 € |
| PS-pm.sen        | Projektleder, seniorniveau                                         | Time            |   122,29 € |

---

Noter

1. Deduplikering er en datareduktion, der udføres i tjenesten. Afhængigt af data varierer den typisk mellem 45 % og 90 %.
2. Prisen er pr. beskyttet GB på klienten.
3. Prisen er pr. GB lagret i tjenesten efter deduplikering og komprimering.
4. Prisen er pr. GB lagret i tjenesten efter deduplikering og komprimering. Tjenesten inkluderer 1.000 GB i den faste månedlige pris.
5. Supportgebyret opkræves med 3 % af det samlede forbrug med et minimumsgebyr på 150 EUR pr. måned.
