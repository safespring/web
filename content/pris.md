---
section: "Safespring molnplattform"
language: "Se"
title: "Prislista och kalkylator"
date: "2022-04-30"
draft: false
tags: ""
showthedate: false
pageimage: ""
intro: "Tillsammans skapar vi en säkrare, och mer kostnadseffektiv digital infrastruktur."
toc: "På denna sida"
nosidebar: ""
---

{{< icon-block-container >}}
    {{< icon-block icon="fa-solid fa-table" text="Prislista med kalkylator" link="/pricelist/SEK/safespring-price-list-sek.xlsx" color="#32cd32">}}
    {{< icon-block icon="fa-solid fa-file-pdf" text="Prislista som PDF" link="/pricelist/SEK/safespring-price-list-sek.pdf" color="#195F8C">}}
    {{< icon-block icon="fa-solid fa-file-csv" text="Prislista som CSV (kommer)" link="" color="#EBEBEB">}}
{{< /icon-block-container >}}

{{< distance >}}

{{< ingress >}}
Se våra priser längre ner på den här sidan eller få priskalkylatorn nedladdad till din dator. Priskalkylatorn är en Excel-fil med inbyggd logik för att räkna ut en månadskostnad baserad på dina val.
{{< /ingress >}}

Det finns många fördelar med infrastruktur som tjänst. Förutom ökad prestanda till längre kostnad slipper du investeria i ny hårdvara och betala för utrymme som inte utnyttjas. Hos oss betalar du endast för de resurser du allokerar.

Ladda ner vår priskalkulator och bygg upp din nuvarande miljö för att se vad du sparar på att flytta till Safespring. I priset ingår hög säkerhet såväl fysisk, logisk och juridisk. Du får även 24/7 support och tillgång till vår självbetjäsningsportal där du kan managera dina instanser efter behov.

## Ingen trafikkostnad

Safespring tar inte ut någon trafikkostnad för den data som skickas till eller från våra tjänster. Trafikkostnad, eller Egress cost som det också kallas är en vanligt inlåsningsmekanism. Safespring är byggt på öppna standarder och det är en del av vår filosofi. Läs mer om Egress och Ingress cost i vårt [blogginlägg om trafikkostnader](/blogg/2023/2023-03-egress-cost/).

{{< distance >}}

## Safespring Compute

{{< ingress >}}
Flavor är en förkonfigurerad instans av en virtuell maskin med en specifik kombination av CPU, RAM och lagring.
{{< /ingress >}}

### Flavors med lokal NVMe-disk
Upptäck vårt sortiment av kraftfulla virtuella servrar, med upp till 32 vCPU och 64 GB RAM, med NVMe lagring upp till 1 000 GB - prissatta från endast 0,67 kr per timme eller 480 kr per 30 dagar!

| Produkt   ID          | vCPU | RAM (GB) | Lokal disk (GB) | Per timme | Per 30 dagar |
|-----------------------|:----:|:--------:|:---------------:|----------:|-------------:|
| FLAVOR-l2.c2r4.100    |   2  |     4    |       100       |   0,67 kr |       480 kr |
| FLAVOR-l2.c2r4.500    |   2  |     4    |       500       |   1,22 kr |       880 kr |
| FLAVOR-l2.c2r4.1000   |   2  |     4    |      1 000      |   1,92 kr |     1 380 kr |
| FLAVOR-l2.c4r8.100    |   4  |     8    |       100       |   1,19 kr |       860 kr |
| FLAVOR-l2.c4r8.500    |   4  |     8    |       500       |   1,75 kr |     1 260 kr |
| FLAVOR-l2.c4r8.1000   |   4  |     8    |      1 000      |   2,44 kr |     1 760 kr |
| FLAVOR-l2.c8r16.100   |   8  |    16    |       100       |   2,25 kr |     1 620 kr |
| FLAVOR-l2.c8r16.500   |   8  |    16    |       500       |   2,81 kr |     2 020 kr |
| FLAVOR-l2.c8r16.1000  |   8  |    16    |      1 000      |   3,50 kr |     2 520 kr |
| FLAVOR-l2.c16r32.100  |  16  |    32    |       100       |   4,36 kr |     3 140 kr |
| FLAVOR-l2.c16r32.500  |  16  |    32    |       500       |   4,92 kr |     3 540 kr |
| FLAVOR-l2.c16r32.1000 |  16  |    32    |      1 000      |   5,61 kr |     4 040 kr |
| FLAVOR-l2.c16r64.500  |  16  |    64    |       500       |   7,36 kr |     5 300 kr |
| FLAVOR-l2.c32r64.1000 |  32  |    64    |      1 000      |   9,83 kr |     7 080 kr |


### Flavors utan lokal disk	
Safesprings erbjuder en rad kostnadseffektiva virtuella maskiner med varierande vCPU och RAM. Central blocklagring kan köpas till instanserna.

| Produkt   ID       | vCPU | RAM (GB) | Lokal disk (GB) | Per timme | Per 30 dagar |
|--------------------|:----:|:--------:|:---------------:|----------:|-------------:|
| FLAVOR-b2. c1 r2   |   1  |     2    |        0        |   0,26 kr |       190 kr |
| FLAVOR-b2. c1 r4   |   1  |     4    |        0        |   0,42 kr |       300 kr |
| FLAVOR-b2. c2 r4   |   2  |     4    |        0        |   0,53 kr |       380 kr |
| FLAVOR-b2. c2 r8   |   2  |     8    |        0        |   0,83 kr |       600 kr |
| FLAVOR-b2 .c4 r8   |   4  |     8    |        0        |   1,06 kr |       760 kr |
| FLAVOR-b2. c4 r16  |   4  |    16    |        0        |   1,67 kr |     1 200 kr |
| FLAVOR-b2. c8 r16  |   8  |    16    |        0        |   2,11 kr |     1 520 kr |
| FLAVOR-b2. c8 r32  |   8  |    32    |        0        |   3,33 kr |     2 400 kr |
| FLAVOR-b2. c16 r32 |  16  |    32    |        0        |   4,22 kr |     3 040 kr |
| FLAVOR-b2. c16 r64 |  16  |    64    |        0        |   6,67 kr |     4 800 kr |


### Central blocklagring		
Central blocklagring ger tre kopior av datat utspritt i ett robust CEPH-kluster. Få snabb och pålitlig lagring med Safesprings från endast 1,20 kr per GB per 30 dagar.

| Produkt   ID    | Beskrivning               | Per GB/timme | Per GB/30 dagar |
|-----------------|---------------------------|-------------:|----------------:|
| VOLUME-large    | HDD-backed 3-replica Ceph |   0,00167 kr |         1,20 kr |
| VOLUME-fast     | SSD-backed 3-replica Ceph |   0,00500 kr |         3,60 kr |

{{< distance >}}

## Safespring Storage (S3)

{{< ingress >}}
Safespring erbjuder två anpassade S3-produkter för olika lagringsbehov: S3-archive för större volymer över längre tid och S3-storage för applikationer som aktivt använder S3-protokollet.
{{< /ingress >}}

| Produkt   ID | Förklaring                                                       |       Per TB i 30 dagar |
|--------------|------------------------------------------------------------------|------------------------:|
| S3-archive   | Anpassad för större   lagringsvolymer över längre tid.           |                 350 kr  |
| S3-storage   | Anpassad för applikationer som aktivt använder S3-protokollet.   |                 500 kr  |

{{< distance >}}

## Safespring Backup

{{< ingress >}}
Safespring erbjuder tre olika backuplösningar. Priserna per GB börjar så lågt som 0,92 kr, vilket ger dig högkvalitativ backup till ett överkomligt pris.
{{< /ingress >}}

Safespring Backup erbjuder datareduktionsteknik i tjänsten som vanligtvis minskar datamängden mellan 45%-90%. Priset är fastställt per skyddad GB på klienten och per lagrad GB i tjänsten efter deduplicering och komprimering. Dessutom ingår 1TB i det fasta månadspriset för BAAS-small.

{{% accordion title="Vilken plan är bäst?" %}}

<table class="width100" style="margin-bottom:40px;">
    <thead>
        <tr>
            <th>Data Usage (GB)</th>
            <th>Most Cost-effective Service</th>
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
        <td>7 001</td>
        <td>Backup Large</td>
    </tr>
</tbody>
</table>

{{% /accordion %}}
{{< accordion-script >}}

| Produkt   ID   | Fast   månadspris | Per   GB i 30 dagar |
|----------------|-------------------|--------------------:|
| BAAS-on.demand | N/A               | 2,45 kr             |
| BAAS-small     | 5 500 kr          | 1,75 kr             |
| BAAS-large     | 9 500 kr          | 0,92 kr             |


## Nätverk och Mjukvara

{{< ingress >}}
Safespring erbjuder en del mjukvaror och licenser som kan köra ovanpå Safesprings molnplattform.
{{< /ingress >}}

### Nätverk
Safespring erbjuder IPv4 och IPv6 publika IP-adresser, datatrafik (ingress och egress) utan extra kostnad, Reverse DNS-names och Bring Your Own IP-prefixes. Dessutom kan kunder begära en offert för deras hanterade lastbalanserare som kräver egna servrar.
| Produkt   ID | Typ                        | Beskrivning                             | Debitering per | Per månad    |
|--------------|----------------------------|-----------------------------------------|----------------|-------------:|
| NET-publicv4 | IPv4                       | Publik                                  | IP-adress      | 25 kr        |
| NET-publicv6 | IPv6                       | Publik                                  | N/A            | 0,00 kr      |
| NET-ingress  | Datatrafik                 |                                         | GB             | 0,00 kr      |
| NET-egress   | Datatrafik                 |                                         | GB             | 0,00 kr      |
| NET-mgn.slb  | Managed SLB                | Lastbalanserare som kräver egna servrar | Instans        | Begär offert |


### Mjukvara och Licenser
Maximera er infrastruktur med mjukvara som kör optimerat på Safesprings plattform.

| Produkt   ID    | Beskrivning                                | Debitering per  | Per månad    |
|-----------------|--------------------------------------------|-----------------|-------------:|
| SW-win.ser      | Windows Server                             | vCPU            | 175 kr       |
| SW-ms.sql.ser   | Windows SQL Server standard                | vCPU (min 4vcpu)| 1 229 kr     |
| SW-nextcloud    | Nextcloud Filesharing                      | N/A             | Begär offert |
| SW-suse.linux   | SUSE Linux Enterprise Server, 12x5 Support | N/A             | Begär offert |

### Plattformstjänster
Vi erbjuder en komplett hantering av dina Kubernetes-miljöer, inklusive regelefterlevnad, med Compliant Kubernetes. Dessutom erbjuds Managed Elasticsearch, NATS, MariaDB och Redis. Begär en offert idag för att få tillgång till dessa tjänster!

| Produkt   ID           | Beskrivning                                            | Per månad    |
|------------------------|--------------------------------------------------------|-------------:|
| PAAS-man.kubernetes24  | Managed Compliant Kubernetes 24/7                      | Begär offert |
| PAAS-man.kubernetes8   | Managed Compliant Kubernetes 8/5                       | Begär offert |
| PAAS-man.elasticsearch | Managed Elasticsearch (ingår i Compliant Kubernetes)   | Begär offert |
| PAAS-openshift         | Ingen suport                                           | Begär offert |
| PAAS-man.nats          | Managed NATS                                           | Begär offert |
| PAAS-man.mariadb       | Managed MariaDB                                        | Begär offert |
| PAAS-man.redis         | Managed Redis                                          | Begär offert |

## Support och konsulttjänster

{{< ingress >}}
Vi erbjuder olika nivåer av support för molninfrastruktur. Dessutom erbjuder vi erfarna konsulter och projektledare till konkurrenskraftiga priser.
{{< /ingress >}}

<!--### Support
### Support
Få tillgång till dedikerad support och teknisk chat genom SUPPORT-standard, medan SUPPORT-premium erbjuder en dedikerad servicekontakt och kvartalsvisa driftsmöten. SUPPORT-base är helt gratis.-->

| Produkt   ID     | Beskrivning                                                  | Debitering per | Pris                 |
|------------------|--------------------------------------------------------------|----------------|---------------------:|
| SUPPORT-base     | Support för Safesprings tjänster                             | N/A            | 0,00 kr              |
| SUPPORT-standard | Access to backchannel chat room with support and engineering | Total volym    | 3 % av total volym   |
| SUPPORT-premium  | Dedicated Service Manager with quarterly operations meetings | Timme          | Begär offert         |

### Konsulttjänster
Få tillgång till våra erfarna konsulter och projektledare för att optimera din molninfrastruktur till konkurrenskraftiga priser, med juniora experter som börjar på 1 127 kr/timme och seniora experter som når upp till 1 374 kr/timme.

| Produkt   ID     | Beskrivning                                                       | Debitering per | Pris     |
|------------------|-------------------------------------------------------------------|----------------|---------:|
| PS-consult.jun   | Cloud Infrastructure Consultant, junior expertise level           | Timme          | 1 127 kr |
| PS-consult.sen   | Cloud infrastructure Consultant, senior expertise level           | Timme          | 1 374 kr |
| PS-cloudarch.jun | Cloud Infrastructure Architect Consultant, junior expertise level | Timme          | 1 277 kr |
| PS-cloudarch.sen | Cloud Infrastructure Architect Consultant, senior expertise level | Timme          | 1 374 kr |
| PS-pm.jun        | Project Manager, junior expertise level                           | Timme          | 1 139 kr |
| PS-pm.sen        | Project Manager, senior expertise level                           | Timme          | 1 374 kr |

### Utbildningar
Lär dig allt om moderna IT-tjänster med Safesprings kurspaket, inklusive introduktioner till "infrastruktur som tjänst" och moln-infrastrukturteknik, samt fördjupade kurser om molnstrategi och modern DevOps med "microservices". Begär offert idag för att ta din verksamhet till nästa nivå!

| Produkt   ID                | Beskrivning                                  | Längd      | Debitering per | Pris         |
|-----------------------------|----------------------------------------------|------------|----------------|-------------:|
| COURSE-intro.iaas           | Introduktion till "infrastruktur som tjänst" | En dag     | Tillfälle      | Begär offert |
| COURSE-cxo.strategy         | Molnstrategi för ledningsgrupper,            | En dag     | Tillfälle      | Begär offert |
| COURSE-intro.cloud          | Introduktion till moln-infrastrukturteknik,  | Fyra dagar | Tillfälle      | Begär offert |
| COURSE-devops.microservices | Modern DevOps och "microservices"            | Fyra dagar | Tillfälle      | Begär offert |



