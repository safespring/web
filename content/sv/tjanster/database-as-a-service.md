---
title: "Databas som tjänst med hög tillgänglighet"
language: "sv"
cardtitle: "Databas som tjänst"
cardicon: "fa-solid fa-database"
cardcolor: "#5C509D"
cardorder: "4"
date: 2022-04-29T11:58:58+01:00
draft: false
section: "DBaaS"
toplogo: "severalninses-logo.png"
intro: "Med bara några enkla klick kan du distribuera ett fullt hanterat, lastbalanserat, högtillgängligt databaskluster för MySQL, MariaDB eller PostgreSQL som ger prestanda, drifttid och enkelhet. "
cardintro: "Med några få klick kan du distribuera ett fullt hanterat, databaskluster."
background: "safespring-background-dbaas.svg"
card: ""
socialmedia: "safespring_social_01.jpg"
sidebarlinkname: "Se demo"
sidebarlinkurl: "/demo/compute/"
sidebarlinkname2: "Kontakta Safespring"
sidebarlinkurl2: "/kontakt"
sidebarsection: ""
sidebarimage: "safespring-dbaas.svg"
sidebartitle: ""
sidebartext: ""
sidebardate: ""
sidebarknapp: ""
sidebarlink: ""
saas: ""
sidebarwhitepaper: ""
darkmode: "off"
logo: "/img/logos/dbaas-logos.svg"
logomobile: "/img/logos/dbaas-logos-mobile.svg"
aliases:
  - /tjanster/database-as-a-service/
---

{{< icon-block-container >}}
{{< icon-block icon="fa-solid fa-arrows-rotate" text="Automated Operations" link="" color="#3C9BCD">}}
{{< icon-block icon="fa-solid fa-gauge" text="High Availability" link="" color="#32cd32">}}
{{< icon-block icon="fa-solid fa-sliders" text="Advanced Traffic Control" link="" color="#195F8C">}}
{{< icon-block icon="fa-solid fa-unlock" text="Open Standards" link="" color="#f4670f">}}
{{< icon-block icon="fa-kit fa-safespring-icon" text="Safespring Infrastructure" link="" color="#417DA5">}}
{{< icon-block icon="fa-solid fa-clock-rotate-left" text="Automated Backups" link="" color="#3C9BCD">}}
{{< /icon-block-container >}}

{{< ingress >}}
Databas-som-tjänst tar hand om allt, vilket ger dig tillgängliga databaser med hög prestanda för dina applikationer.
{{</ ingress >}}

Tjänsten byggs av vår partner Severalnines på Safespring. Att hantera en komplex, klustrad databasmiljö är en tidskrävande och ofta skrämmande uppgift. Med bara några enkla klick kan du distribuera ett fullt hanterat, lastbalanserat, högtillgängligt databaskluster för MySQL, MariaDB eller PostgreSQL som ger prestanda, drifttid och enkelhet.

{{< 2calltoaction "Boka demo" "/demo" "Kontakta oss" "/kontakt" >}}

{{< distance >}}

### Automatiserade ops med ClusterControl

CCX bygger på ClusterControl, en beprövad plattform för att automatisera och hantera högt tillgängliga MySQL-, MariaDB- och PostgreSQL-distributioner. Föreställ dig din egen virtuella DBA som arbetar 24x7 för att säkerställa att dina kluster alltid är tillgängliga och fungerar optimalt, med backup-hantering för att skydda dina data.

### Avancerad trafikkontroll

CCX distribuerar databasmedvetna lastbalanserare för att ge dig full kontroll över att dirigera queries på begäran, optimera anslutningshanteringen, möjliggöra throttling och mycket mer. Den har förmågan att cache queries, vilket gör dina applikationer mer responsiva och ger en bättre slutanvändarupplevelse.

### Hög tillgänglighet

CCX erbjuder mycket tillgängliga distributioner för MySQL och MariaDB med hjälp av multi-master Galera-klustring. Funktionerna inkluderar flera skrivbara masters, starkt konsekventa data över servrar, sömlös skalning och snabb failover.

## Pris

{{< ingress >}}
Prissättningen är förbrukningsbaserad. Du betalar per timme bara för det du använder.
{{< /ingress >}}

Prissättningskomponenter är antalet server-vCPU:er och tillhörande RAM, mängden förbrukad lagring och datautgångstyp (utgående eller mellan AZ) och mängd.

| Instance | vCPU   | RAM (GB) | Disk (GB) | Pris per nod i timmen |
| -------- | ------ | -------- | --------- | --------------------- |
| Tiny     | 2vCPU  | 4GB      | 100       | 2,085 SEK             |
| Small    | 8vCPU  | 8GB      | 100       | 3,746 SEK             |
| Medium   | 8vCPU  | 16GB     | 100       | 7,045 SEK             |
| Large    | 16vCPU | 32GB     | 100       | 13,609 SEK            |
| X-Large  | 16vCPU | 32GB     | 500       | 15,266 SEK            |
| XX-Large | 16vCPU | 32GB     | 1000      | 17,417 SEK            |

| Data Egress   | Månadspris  |
| ------------- | ----------- |
| Första 1024GB | GRATIS      |
| Över 1024 GB  | 0,95 SEK/GB |

{{% horisontal-card image="/img/graphics/safespring-image.svg" link="/tjanster/safespring-compute/" linktext="Läs mer" cardtitle="Safespring Compute är kärnan av Database as a service" text="Safespring körs i datacenter inom Europa och berörs inte av utländsk lagstiftning som CLOUD Act eller FISA 702." %}}
