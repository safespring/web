---
section: "Safespring skyplattform"
language: "No"
title: "Prisliste og kalkulator"
date: "2023-07-31"
draft: false
tags: ""
showthedate: false
pageimage: ""
intro: "Sammen skaper vi en tryggere og mer kostnadseffektiv digital infrastruktur."
toc: "På denne siden"
nosidebar: ""
---

{{< icon-block-container >}}
    {{< icon-block icon="fa-solid fa-table" text="Prisliste med kalkulator" link="/pricelist/NOK/safespring-price-list-nok.xlsx" color="#32cd32">}}
    {{< icon-block icon="fa-solid fa-file-pdf" text="Prisliste som PDF" link="/pricelist/NOK/safespring-price-list-nok.pdf" color="#195F8C">}}
    {{< icon-block icon="fa-solid fa-file-csv" text="Prisliste som CSV (kommer)" link="" color="#EBEBEB">}}
{{< /icon-block-container >}}

{{< distance >}}

{{< ingress >}}
Se våre priser lenger ned på denne siden eller last ned pris-kalkulatoren til din datamaskin. Kalkulatoren er en Excel-fil med innebygd logikk for å beregne månedskostnaden basert på dine valg.
{{< /ingress >}}

Det er mange fordeler med infrastruktur som en tjeneste. I tillegg til økt ytelse til lavere kostnader, unngår du å investere i ny maskinvare og betaler kun for de ressursene du tildeler.

Last ned vår pris-kalkulator og bygg opp din nåværende miljø for å se hvor mye du kan spare ved å flytte til Safespring. Prisen inkluderer høy sikkerhet både fysisk, logisk og juridisk. Du får også 24/7 support og tilgang til vår selvbetjeningssportal der du kan administrere dine instanser etter behov.

## Ingen trafikkostnad

Safespring tar ikke betalt for datatrafikk til eller fra våre tjenester. Trafikkostnader, eller "Egress cost" som det også kalles, er en vanlig låsemekanisme. Safespring er bygget på åpne standarder, og dette er en del av vår filosofi. Les mer om Egress og Ingress cost i vårt [blogginnlegg om trafikkostnader](/blogg/2023/2023-03-egress-cost/).

{{< distance >}}

## Safespring Compute

{{< ingress >}}
En "Flavor" er en forhåndskonfigurert instans av en virtuell maskin med en spesifikk kombinasjon av CPU, RAM og lagring.
{{< /ingress >}}

### Flavors med lokal NVMe-disk
Oppdag vårt utvalg av kraftige virtuelle servere med opptil 32 vCPU og 64 GB RAM, med NVMe-lagring opptil 1 000 GB - priset fra kun 0,67 kr per time eller 480 kr per 30 dager!

| Produkt ID               | vCPU | RAM (GB) |           Lokal disk (GB) |                  Per time |           Per 30 dager |
|--------------------------|:----:|:--------:|--------------------------:|--------------------------:|-----------------------:|
| FLAVOR-l2. c2 r4. 100    |   2  |     4    |                      100  |                  0,67 kr  |                480 kr  |
| FLAVOR-l2. c2 r4. 500    |   2  |     4    |                      500  |                  1,22 kr  |                880 kr  |
| FLAVOR-l2. c2 r4. 1000   |   2  |     4    |                    1 000  |                  1,92 kr  |              1 380 kr  |
| FLAVOR-l2. c4 r8. 100    |   4  |     8    |                      100  |                  1,19 kr  |                860 kr  |
| FLAVOR-l2. c4 r8. 500    |   4  |     8    |                      500  |                  1,75 kr  |              1 260 kr  |
| FLAVOR-l2. c4 r8. 1000   |   4  |     8    |                    1 000  |                  2,44 kr  |              1 760 kr  |
| FLAVOR-l2. c8 r16. 100   |   8  |    16    |                      100  |                  2,25 kr  |              1 620 kr  |
| FLAVOR-l2. c8 r16. 500   |   8  |    16    |                      500  |                  2,81 kr  |              2 020 kr  |
| FLAVOR-l2. c8 r16. 1000  |   8  |    16    |                    1 000  |                  3,50 kr  |              2 520 kr  |
| FLAVOR-l2. c16 r32. 100  |  16  |    32    |                      100  |                  4,36 kr  |              3 140 kr  |
| FLAVOR-l2. c16 r32. 500  |  16  |    32    |                      500  |                  4,92 kr  |              3 540 kr  |
| FLAVOR-l2. c16 r32. 1000 |  16  |    32    |                    1 000  |                  5,61 kr  |              4 040 kr  |
| FLAVOR-l2. c16 r64. 500  |  16  |    64    |                      500  |                  7,36 kr  |              5 300 kr  |
| FLAVOR-l2. c32 r64.1000  |  32  |    64    |                    1 000  |                  9,83 kr  |              7 080 kr  |


### Flavors uten lokal disk	
Safespring tilbyr et utvalg kostnadseffektive virtuelle maskiner med variert vCPU og RAM. Sentral blokk-lagring kan kjøpes til instansene.

| Produkt ID         | vCPU | RAM (GB) | Lokal disk (GB) |                  Per time |            Per 30 dager |
|--------------------|:----:|:--------:|----------------:|--------------------------:|------------------------:|
| FLAVOR-b2. c1 r2   |   1  |     2    |        0        |                  0,26 kr  |                 190 kr  |
| FLAVOR-b2. c1 r4   |   1  |     4    |        0        |                  0,42 kr  |                 300 kr  |
| FLAVOR-b2. c2 r4   |   2  |     4    |        0        |                  0,53 kr  |                 380 kr  |
| FLAVOR-b2. c2 r8   |   2  |     8    |        0        |                  0,83 kr  |                 600 kr  |
| FLAVOR-b2 .c4 r8   |   4  |     8    |        0        |                  1,06 kr  |                 760 kr  |
| FLAVOR-b2. c4 r16  |   4  |    16    |        0        |                  1,67 kr  |               1 200 kr  |
| FLAVOR-b2. c8 r16  |   8  |    16    |        0        |                  2,11 kr  |               1 520 kr  |
| FLAVOR-b2. c8 r32  |   8  |    32    |        0        |                  3,33 kr  |               2 400 kr  |
| FLAVOR-b2. c16 r32 |  16  |    32    |        0        |                  4,22 kr  |               3 040 kr  |
| FLAVOR-b2. c16 r64 |  16  |    64    |        0        |                  6,67 kr  |               4 800 kr  |


### Sentral blokk-lagring		
Sentral blokk-lagring gir tre kopier av dataen spredt over en robust CEPH-klynge. Få rask og pålitelig lagring med Safespring fra kun 1,20 kr per GB per 30 dager.

| Produkt ID      | Beskrivelse               |       Per timme      |             Per 30 dagar |
|-----------------|---------------------------|:--------------------:|-------------------------:|
| VOLUME-large    | HDD-backed 3-replica Ceph |          0,00167 kr  |                 1,20 kr  |
| VOLUME-fast     | SSD-backed 3-replica Ceph |          0,00500 kr  |                3,60 kr   |
| VOLUME-snapshot | Snapshot of image         |          0,00167 kr  |                 1,20 kr  |

{{< distance >}}


## Safespring Storage (S3)

{{< ingress >}}
Safespring tilbyr to tilpassede S3-produkter for ulike lagringsbehov: S3-archive for større volumer over lengre tid og S3-storage for applikasjoner som aktivt bruker S3-protokollen.
{{< /ingress >}}

| Produkt ID |                                                               |       Per TB i 30 dager |
|------------|---------------------------------------------------------------|------------------------:|
| S3-archive | Tilpasset for større lagringsvolum over lengre tid.           |                 350 kr  |
| S3-storage | Tilpasset for applikasjoner som aktivt bruker S3-protokollet. |                 500 kr  |

{{< distance >}}



## Safespring Backup

{{< ingress >}}
Safespring tilbyr tre forskjellige backupløsninger. Prisene per GB starter så lavt som 0,92 kr, noe som gir deg høykvalitetsbackup til en overkommelig pris.
{{< /ingress >}}

Safespring Backup tilbyr datareduksjonsteknologi <sup>1</sup> i tjenesten som vanligvis reduserer datamengden mellom 45% - 90%. Prisen er fast per beskyttet GB på klienten og per lagret GB i tjenesten etter duplisering og komprimering. I tillegg er 1TB inkludert i den faste månedsprisen for BAAS-small.

{{% accordion title="Hvilken plan er best?" %}}

<table class="width100" style="margin-bottom:40px;">
    <thead>
        <tr>
            <th>Dataforbruk (GB)</th>
            <th>Mest kostnadseffektive tjeneste</th>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td>0 - 5000</td>
        <td>Backup ved behov</td>
    </tr>
    <tr>
        <td>5001 - 7000</td>
        <td>Backup Small</td>
    </tr>
    <tr>
        <td>>7001</td>
        <td>Backup Large</td>
    </tr>
</tbody>
</table>

{{% /accordion %}}
{{< accordion-script >}}

| Produkt ID       | Fast månedlig pris      | Per GB i 30 dager  |
|------------------|------------------------:|-------------------:|
| BAAS-on.demand <sup>2</sup> |                     N/A | 2,45 kr            |
| BAAS-small <sup>3</sup>     |               5 500 kr  | 1,75 kr            |
| BAAS-large <sup>4</sup>     |               9 500 kr  | 0,92 kr            |



## Nettverk og Programvare

{{< ingress >}}
Safespring tilbyr en rekke programvare og lisenser som kan kjøre på toppen av Safesprings skyplattform.
{{< /ingress >}}

### Nettverk
Safespring tilbyr IPv4 og IPv6 offentlige IP-adresser, datatrafikk (innkommende og utgående) uten ekstra kostnad, Reverse DNS-navn og Bring Your Own IP-prefixes. I tillegg kan kunder be om tilbud for deres håndterte lastbalanser som krever egne servere.

| Produkt ID   | Type                       | Beskrivelse                           | Fakturering pr | Per måned |
|--------------|----------------------------|---------------------------------------|----------------|----------:|
| NET-publicv4 | IPv4                       | Public                                | IP-adress      |     25 kr |
| NET-publicv6 | IPv6                       | Public                                | N/A            |   0,00 kr |
| NET-ingress  | Datatrafikk                |                                       | GB             |   0,00 kr |
| NET-egress   | Datatrafikk                |                                       | GB             |   0,00 kr |
| NET-mgn.slb  | Managed SLB                | Lastbalansere som krever egne servere | Instans        |    Tilbud |
<!--| NET-rdns     | Reverse DNS names          |                                       | N/A            |   0,00 kr |
| NET-byoip    | Bring your own IP prefixes |                                       | N/A            |   0,00 kr |-->

### Programvare og Lisenser
Maksimer infrastrukturen din med programvare som kjører optimalt på Safesprings plattform.

| Produkt ID        | Beskrivelse                     | Fakturering pr | Per måned |
|-------------------|---------------------------------|----------------|----------:|
| SW-win.ser.2022   | Microsoft Windows Server        | vCPU           |    175 kr |
| SW-ms.sql.ser     | Microsoft SQL Server standard   | vCPU           |  1 229 kr |
| SW-ms.sql.ser.ent | Microsoft SQL Server Enterprise | vCPU           |  4 766 kr |
| SW-nextcloud      | Nextcloud Hub                   | N/A            |   Tillbud |
| SW-suse.linux     | SUSE Linux Enterprise Server    | N/A            |   Tillbud |

### Plattformtjenester
Vi tilbyr komplett administrasjon av Kubernetes-miljøene dine, inkludert overholdelse av regler, med Compliant Kubernetes. I tillegg tilbys Managed Elasticsearch, NATS, MariaDB og Redis. Be om tilbud i dag for å få tilgang til disse tjenestene!

| Produkt ID            | Beskrivelse                                           | Per måned |
|-----------------------|-------------------------------------------------------|----------:|
| PAAS-man.kubernetes24 | Managed Compliant Kubernetes 24/7                     |    Tilbud |
| PAAS-man.kubernetes8  | Managed Compliant Kubernetes 8/5                      |    Tilbud |
| PAAS-man.opensearch   | Managed Opensearch (inkludert i Compliant Kubernetes) |    Tilbud |
| PAAS-openshift        | Ingen support                                         |    Tilbud |
| PAAS-man.nats         | Managed NATS                                          |    Tilbud |
| PAAS-man.mariadb      | Managed MariaDB                                       |    Tilbud |
| PAAS-man.redis        | Managed Redis                                         |    Tilbud |

## Støtte og Konsulenttjenester

{{< ingress >}}
Vi tilbyr ulike nivåer av støtte for skyinfrastrukturen. I tillegg tilbyr vi erfarne konsulenter og prosjektledere til konkurransedyktige priser.
{{< /ingress >}}


### Support
Få tilgang til dedikert support og teknisk chat gjennom SUPPORT-standard, mens SUPPORT-premium tilbyr en dedikert servicekontakt og kvartalsvise driftsmøter. SUPPORT-base er helt gratis.

| Produkt ID       | Beskrivelse                                       | Fakturering pr |                 Pris |
|------------------|---------------------------------------------------|----------------|---------------------:|
| SUPPORT-base     | Support til Safesprings tjenester                 | N/A            |              0,00 kr |
| SUPPORT-standard | Tilgang til chatte-rom med support og tekniker    | Total volum    | 3 % av total volum <sup>5</sup> |
| SUPPORT-premium  | Dedikert servicesjef med kvartalsvise driftsmøter | Timme          |               Tilbud |

### Konsulenttjenester
Få tilgang til våre erfarne konsulenter og prosjektledere for å optimalisere din skyinfrastruktur til konkurransedyktige priser, med junior eksperter som starter på 1 127 kr/time og senior eksperter som når opp til 1 374 kr/time.

| Produkt ID       | Beskrivelse                                                       | Fakturering pr |   |     Pris |
|------------------|-------------------------------------------------------------------|----------------|---|---------:|
| PS-consult.jun   | Cloud Infrastructure Consultant, junior expertise level           | Timme          |   | 1 127 kr |
| PS-consult.sen   | Cloud infrastructure Consultant, senior expertise level           | Timme          |   | 1 374 kr |
| PS-cloudarch.jun | Cloud Infrastructure Architect Consultant, junior expertise level | Timme          |   | 1 277 kr |
| PS-cloudarch.sen | Cloud Infrastructure Architect Consultant, senior expertise level | Timme          |   | 1 374 kr |
| PS-pm.jun        | Project Manager, junior expertise level                           | Timme          |   | 1 139 kr |
| PS-pm.sen        | Project Manager, senior expertise level                           | Timme          |   | 1 374 kr |

### Opplæring
Lær alt om moderne IT-tjenester med Safesprings kurspakke, inkludert introduksjoner til "infrastruktur som en tjeneste" og skyinfrastrukturteknologi, samt dypdykkende kurs om skystrategi og moderne DevOps med "microservices". Be om tilbud i dag for å ta virksomheten din til neste nivå!

| Produkt ID                  | Beskrivelse                                      | Varighet   | Fakturering pr |   Pris |
|-----------------------------|--------------------------------------------------|------------|----------------|-------:|
| COURSE-intro.iaas           | Introduksjon til "infrastruktur som en tjeneste" | En dag     | Stykk          | Tilbud |
| COURSE-cxo.strategy         | Cloud-strategi for ledergrupper                  | En dag     | Stykk          | Tilbud |
| COURSE-intro.cloud          | Introduksjon til cloud-infrastrukturteknologi    | Fire dager | Stykk          | Tilbud |
| COURSE-devops.microservices | Moderne DevOps og "microservices"                | Fire dager | Stykk          | Tilbud |
___
Notes


1. Dedup er en datareduksjon gjort i tjenesten. Avhengig av dataene varierer det normalt mellom 45 % - 90 %                  
2. Prisen er per beskyttet GB på klienten.                   
3. Prisen er per lagret GB i tjenesten etter deduplisering og komprimering. 1000 GB er inkludert i den faste månedsprisen.                   
4. Prisen er per lagret GB i tjenesten etter deduplisering og komprimering.                  
5. Supportavgiften er 3 % av det totale volumet, med en minimumsavgift på 1500 NOK per måned.                    
