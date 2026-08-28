---
section: "Safespring molnplattform"
language: "Se"
title: "Prislista och kalkylator"
date: "2022-04-30"
draft: false
tags: ""
showthedate: false
pageimage: ""
intro: "Tillsammans skapar vi en säkrare och mer kostnadseffektiv digital infrastruktur."
toc: "På denna sida"
nosidebar: ""
---

## Ladda ner priskalkylator
Bygg upp din nuvarande miljö för att se vad du sparar på att flytta till Safespring. Priskalkylatorn är en Excel-fil med inbyggd logik för att räkna ut en månadskostnad baserad på dina val.


{{< price-list >}}

{{< distance >}}

I priset ingår hög säkerhet, såväl fysisk som logisk och juridisk. Du får även 24/7-support och tillgång till vår självbetjäningsportal där du kan hantera dina instanser efter behov.

### Ingen trafikkostnad

Safespring tar inte ut någon trafikkostnad för den data som skickas till eller från våra tjänster. Trafikkostnad, eller egress cost som det också kallas, är en vanlig inlåsningsmekanism. Safespring är byggt på öppna standarder och det är en del av vår filosofi. Läs mer om egress och ingress cost i vårt [blogginlägg om trafikkostnader](/blogg/2023/2023-03-egress-cost/).

{{< distance >}}

## Safespring Kubernetes Engine

{{< ingress >}}
Safespring Kubernetes Engine ger ett managerat kontrollplan för Kubernetes på Safesprings infrastruktur.
{{< /ingress >}}

Priset nedan gäller Safesprings hantering av kontrollplanet. Compute-instanserna för kontrollplansnoder och worker-noder tillkommer och debiteras enligt valda flavors.

| Produkt ID            | Beskrivning                                      |    Per månad |
|-----------------------|--------------------------------------------------|-------------:|
| PAAS-man-controlplane | Managerat kontrollplan                          |     4 900 kr |
| PAAS-controlplane     | Omanagerat kontrollplan                         |      0,00 kr |

{{< distance >}}

## Safespring Compute

{{< ingress >}}
Flavor är en förkonfigurerad instans av en virtuell maskin med en specifik kombination av CPU, RAM och lagring.
{{< /ingress >}}


### Flavors med lokal NVMe-disk
Flavors med lokal NVMe-disk kombinerar 2–32 vCPU och 4–64 GB RAM med 100–1 000 GB lokal lagring. Priserna börjar på 0,67 kr per timme eller 480 kr per 30 dagar.

| Produkt ID               | vCPU | RAM (GB) |           Lokal disk (GB) |                 Per timme |           Per 30 dagar |
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


### Flavors utan lokal disk	
Safespring erbjuder en rad kostnadseffektiva virtuella maskiner med varierande vCPU och RAM. Central blocklagring kan köpas till instanserna.

| Produkt ID         | vCPU | RAM (GB) | Lokal disk (GB) |                 Per timme |            Per 30 dagar |
|--------------------|:----:|:--------:|:---------------:|--------------------------:|------------------------:|
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


### Flavors med GPU
GPU-instanser är avsedda för arbetslaster som behöver beräkningsacceleration, exempelvis AI, maskininlärning och dataanalys. Utbudet omfattar flavors med A2 och H100 NVL, med eller utan lokal NVMe-lagring. Läs mer om [GPU-resurser för AI och maskininlärning](/tjanster/machine-learning/).

| Produkt ID               | vCPU | RAM (GB) | Lokal disk (GB) | GPU   | Per timme | Per 30 dagar |
|--------------------------|:----:|:--------:|----------------:|:-----:|----------:|-------------:|
| FLAVOR-l2.c4r16.125.gA2  | 4    | 16       |             125 | A2    | 4,65 kr   | 3 345 kr     |
| FLAVOR-l2.c8r32.250.gA2  | 8    | 32       |             250 | A2    | 6,49 kr   | 4 670 kr     |
| FLAVOR-b2.c4r8.gA2       | 4    | 8        |               0 | A2    | 3,86 kr   | 2 780 kr     |
| FLAVOR-b2.c8r16.gA2      | 8    | 16       |               0 | A2    | 4,92 kr   | 3 540 kr     |
| FLAVOR-b2.c32.r192.gH100 | 32   | 192      |               0 | H100 NVL | 32,91 kr  | 24 024 kr    |


### Central blocklagring		
Central blocklagring ger tre kopior av data utspridda i ett robust Ceph-kluster. Få snabb och pålitlig lagring hos Safespring från endast 1,20 kr per GB per 30 dagar.

| Produkt ID      | Beskrivning               |       Per timme      |             Per 30 dagar |
|-----------------|---------------------------|:--------------------:|-------------------------:|
| VOLUME-large    | HDD-backed 3-replica Ceph |          0,00167 kr  |                 1,20 kr  |
| VOLUME-fast     | SSD-backed 3-replica Ceph |          0,00500 kr  |                3,60 kr   |
| VOLUME-snapshot | Snapshot of image         |          0,00167 kr  |                 1,20 kr  |

{{< distance >}}

## Safespring Storage (S3)

{{< ingress >}}
Safespring erbjuder två anpassade S3-produkter för olika lagringsbehov: S3-archive för större volymer över längre tid och S3-storage för applikationer som aktivt använder S3-protokollet.
{{< /ingress >}}

| Produkt ID |                                                                |       Per TB i 30 dagar |
|------------|----------------------------------------------------------------|------------------------:|
| S3-archive | Anpassad för större lagringsvolymer över längre tid.           |                 350 kr  |
| S3-storage | Anpassad för applikationer som aktivt använder S3-protokollet. |                 500 kr  |

{{< distance >}}

## Safespring Backup

{{< ingress >}}
Safespring erbjuder tre olika backuplösningar. Priserna per GB börjar så lågt som 0,92 kr, vilket ger dig högkvalitativ backup till ett överkomligt pris.
{{< /ingress >}}

Safespring Backup erbjuder datareduktionsteknik <sup>1</sup> i tjänsten som vanligtvis minskar datamängden mellan 45%-90%. Priset är fastställt per skyddad GB på klienten och per lagrad GB i tjänsten efter deduplicering och komprimering. Dessutom ingår 1 TB i det fasta månadspriset för BAAS-small.

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

| Produkt ID       | Fast månadspris        | Per GB i 30 dagar |
|------------------|------------------------|-------------------|
| BAAS-on.demand <sup>2</sup> |                    N/A | 2,45 kr           |
| BAAS-small <sup>3</sup>     |              5 500 kr  | 1,75 kr           |
| BAAS-large <sup>4</sup>     |              9 500 kr  | 0,92 kr           |


## Nätverk och mjukvara

{{< ingress >}}
Safespring erbjuder en del mjukvaror och licenser som kan köra ovanpå Safesprings molnplattform.
{{< /ingress >}}

### Nätverk
Safespring erbjuder publika IPv4- och IPv6-adresser, datatrafik (ingress och egress) utan extra kostnad, Reverse DNS-namn och Bring Your Own IP-prefix. Dessutom kan kunder begära offert på en hanterad lastbalanserare som kräver egna servrar.

| Produkt ID   |  Typ                       | Beskrivning                             | Debitering per |    Per månad |
|--------------|----------------------------|-----------------------------------------|----------------|-------------:|
| NET-publicv4 | IPv4                       | Publik                                  | IP-adress      |        25 kr |
| NET-publicv6 | IPv6                       | Publik                                  | N/A            |      0,00 kr |
| NET-ingress  | Datatrafik                 |                                         | GB             |      0,00 kr |
| NET-egress   | Datatrafik                 |                                         | GB             |      0,00 kr |
| NET-mgn.slb  | Managed SLB                | Lastbalanserare som kräver egna servrar | Instans        | Begär offert |
| NET-rdns     | Reverse DNS names          |                                         | N/A            |      0,00 kr |
| NET-byoip    | Bring your own IP prefixes |                                         | N/A            |      0,00 kr |


### Mjukvara och licenser
Maximera er infrastruktur med mjukvara som är optimerad för Safesprings plattform.

| Produkt ID        | Beskrivning                     | Debitering per |    Per månad |
|-------------------|---------------------------------|----------------|-------------:|
| SW-win.ser.2022   | Microsoft Windows Server        | vCPU           |       175 kr |
| SW-ms.sql.ser     | Microsoft SQL Server standard   | vCPU           |     1 229 kr |
| SW-ms.sql.ser.ent | Microsoft SQL Server Enterprise | vCPU           |     4 766 kr |

### Plattformstjänster
Safesprings partner erbjuder [databas som tjänst](/tjanster/database-as-a-service/) för PostgreSQL, MariaDB och Redis. Därutöver finns managerade tjänster för Elasticsearch och NATS. Tjänsterna körs på Safesprings infrastruktur och kostar från 2 kr per timme.

| Produkt ID               | Beskrivning           | Från per timme |
|--------------------------|-----------------------|---------------:|
| PAAS-man.postgresql      | Managed PostgreSQL    |        2,00 kr |
| PAAS-man.mariadb         | Managed MariaDB       |        2,00 kr |
| PAAS-man.elasticsearch   | Managed Elasticsearch |        2,00 kr |
| PAAS-man.redis           | Managed Redis         |        2,00 kr |
| PAAS-man.nats            | Managed NATS          |        2,00 kr |

## Support och konsulttjänster

{{< ingress >}}
Vi erbjuder olika nivåer av support för molninfrastruktur. Dessutom erbjuder vi erfarna konsulter och projektledare till konkurrenskraftiga priser.
{{< /ingress >}}

### Support
Få tillgång till dedikerad support och teknisk chatt genom SUPPORT-standard, medan SUPPORT-premium erbjuder en dedikerad servicekontakt och kvartalsvisa driftsmöten. SUPPORT-base är helt gratis.

| Produkt ID       | Beskrivning                                        | Debitering per |                 Pris |
|------------------|----------------------------------------------------|----------------|---------------------:|
| SUPPORT-base     | Support för Safesprings tjänster                   | N/A            |              0,00 kr |
| SUPPORT-standard | Tillgång till chattrum med support och tekniker    | Total volym    | 3 % av total volym <sup>5</sup> |
| SUPPORT-premium  | Dedikerad servicechef med kvartalsvisa driftsmöten | Timme          |         Begär offert |

### Konsulttjänster
Få tillgång till våra erfarna konsulter och projektledare för att optimera din molninfrastruktur till konkurrenskraftiga priser, med juniora experter som börjar på 1 127 kr/timme och seniora experter som når upp till 1 374 kr/timme.

| Produkt ID       | Beskrivning                                                       | Debitering per |     Pris |
|------------------|-------------------------------------------------------------------|----------------|---------:|
| PS-consult.jun   | Cloud Infrastructure Consultant, junior expertise level           | Timme          | 1 127 kr |
| PS-consult.sen   | Cloud infrastructure Consultant, senior expertise level           | Timme          | 1 374 kr |
| PS-cloudarch.jun | Cloud Infrastructure Architect Consultant, junior expertise level | Timme          | 1 277 kr |
| PS-cloudarch.sen | Cloud Infrastructure Architect Consultant, senior expertise level | Timme          | 1 374 kr |
| PS-pm.jun        | Project Manager, junior expertise level                           | Timme          | 1 139 kr |
| PS-pm.sen        | Project Manager, senior expertise level                           | Timme          | 1 374 kr |

___

Anteckningar

1. Dedup är en datareduktion som görs i tjänsten. Beroende på data varierar det normalt mellan 45 % - 90 %.
2. Priset är per skyddad GB på klienten. 
3. Priset är per lagrad GB i tjänsten efter deduplicering och komprimering. Det ingår 1 000 GB i det fasta månadspriset.
4. Priset är per lagrad GB i tjänsten efter deduplicering och komprimering. 
5. Supportavgiften debiteras med 3 % av den totala volymen med en lägsta avgift på 1 500 SEK per månad.
