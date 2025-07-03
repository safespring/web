---
title: "Database som service med høj tilgængelighed"
language: "da"
cardtitle: "Database service"
cardicon: "fa-solid fa-database"
cardcolor: "#5C509D"
cardorder: "4"
date: "2025-05-23"
draft: false
section: "DBaaS"
toplogo: "severalninses-logo.png"
intro: "Med blot nogle få klik kan du implementere et fuldt administreret, lastbalanceret, højtilgængeligt databasekluster til MySQL, MariaDB eller PostgreSQL, der leverer ydeevne, oppetid og enkelhed."
cardintro: "Med nogle få klik kan du implementere et fuldt administreret databasekluster."
background: "safespring-background-dbaas.svg"
card: ""
socialmedia: "safespring_social_01.jpg"
sidebarlinkname: "Se demo"
sidebarlinkurl: "/demo/compute/"
sidebarlinkname2: "Kontakt Safespring"
sidebarlinkurl2: "/da/kontakt"
sidebarsection: ""
sidebarimage: "safespring-petter.webp"
sidebartext: "Vil du tale om tjenesten? Mit navn er Petter Hylin, kontakt mig venligst, hvis du har spørgsmål."
sidebarphone: "+46 73-533 65 21"
sidebarmail: "hello@safespring.com"
darkmode: "off"
logo: "/img/logos/dbaas-logos.svg"
logomobile: "/img/logos/dbaas-logos-mobile.svg"
aliases:
  - /da/tjenester/database-as-a-service/
---

{{< icon-block-container >}}
{{< icon-block icon="fa-solid fa-arrows-rotate" text="Automatiserede operationer" link="" color="#3C9BCD">}}
{{< icon-block icon="fa-solid fa-gauge" text="Høj tilgængelighed" link="" color="#32cd32">}}
{{< icon-block icon="fa-solid fa-sliders" text="Avanceret trafikkontrol" link="" color="#195F8C">}}
{{< icon-block icon="fa-solid fa-unlock" text="Åbne standarder" link="" color="#f4670f">}}
{{< icon-block icon="fa-kit fa-safespring-icon" text="Safespring infrastruktur" link="" color="#417DA5">}}
{{< icon-block icon="fa-solid fa-clock-rotate-left" text="Automatiserede backups" link="" color="#3C9BCD">}}
{{< /icon-block-container >}}

{{< ingress >}}
Database-som-service tager sig af alt og giver dig tilgængelige databaser med høj ydeevne til dine applikationer.
{{</ ingress >}}

Tjenesten bygges af vores partner Severalnines på Safespring. At administrere et komplekst, klustret databasemiljø er tidskrævende og ofte skræmmende. Med blot nogle få enkle klik kan du implementere et fuldt administreret, lastbalanceret, højtilgængeligt databasekluster til MySQL, MariaDB eller PostgreSQL, der leverer ydeevne, oppetid og enkelhed.

{{< 2calltoaction "Book demo" "/demo" "Kontakt os" "/da/kontakt" >}}

{{< distance >}}

### Automatiserede ops med ClusterControl

CCX bygger på ClusterControl, en afprøvet platform til at automatisere og administrere højtilgængelige MySQL-, MariaDB- og PostgreSQL-implementeringer. Forestil dig din egen virtuelle DBA, der arbejder 24x7 for at sikre, at dine klynger altid er tilgængelige og fungerer optimalt, med backup-administration for at beskytte dine data.

### Avanceret trafikkontrol

CCX implementerer databasebevidste lastbalancere for at give dig fuld kontrol over at dirigere forespørgsler på anmodning, optimere forbindelseshåndtering, muliggøre throttling og meget mere. Den har evnen til at cache forespørgsler, hvilket gør dine applikationer mere responsive og giver en bedre slutbrugeroplevelse.

### Høj tilgængelighed

CCX tilbyder meget tilgængelige implementeringer til MySQL og MariaDB ved hjælp af multi-master Galera-klynging. Funktionerne inkluderer flere skrivbare masters, stærkt konsistente data på tværs af servere, sømløs skalering og hurtig failover.

## Pris

{{< ingress >}}
Prissætningen er forbrugsbaseret. Du betaler kun per time for det, du bruger.
{{< /ingress >}}

Priskomponenterne er antallet af server-vCPU'er og tilhørende RAM, mængden af forbrugt lagerplads og dataoutput-type (udgående eller mellem AZ) og mængde.

| Instance | vCPU   | RAM (GB) | Disk (GB) | Pris per node per time |
| -------- | ------ | -------- | --------- | ---------------------- |
| Tiny     | 2vCPU  | 4GB      | 100       | 2,085 DKK              |
| Small    | 8vCPU  | 8GB      | 100       | 3,746 DKK              |
| Medium   | 8vCPU  | 16GB     | 100       | 7,045 DKK              |
| Large    | 16vCPU | 32GB     | 100       | 13,609 DKK             |
| X-Large  | 16vCPU | 32GB     | 500       | 15,266 DKK             |
| XX-Large | 16vCPU | 32GB     | 1000      | 17,417 DKK             |

| Data Egress   | Månedspris  |
| ------------- | ----------- |
| Første 1024GB | GRATIS      |
| Over 1024 GB  | 0,95 DKK/GB |

{{% horisontal-card image="/img/graphics/safespring-image.svg" link="/da/tjenester/safespring-compute/" linktext="Læs mere" cardtitle="Safespring Compute er kernen i Database as a service" text="Safespring kører i datacentre i Europa og påvirkes ikke af udenlandsk lovgivning som CLOUD Act eller FISA 702." %}}
