---
ai: true
title: "Licenser til tredjepartssoftware"
language: "da"
cardtitle: "Software"
cardicon: "fa-solid fa-code"
cardcolor: "#195F8C"
cardorder: "08"
date: 2023-02-28
draft: false
intro: "Safespring tilbyder en række softwarelicenser fra tredjeparter til brug på vores IaaS-platforme"
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tilbage til alle kategorier"
sidebarlinkurl: "/service-catalogue"
section: "Safespring Servicekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
nosidebar: ""
aliases:
  - /service-catalogue/third-party-software-licenses/
---

{{< ingress >}}
Safespring tilbyder flere tredjepartssoftwarelicenser til brug på vores IaaS-platforme.
{{< /ingress >}}

<table class="width100">
  <thead>
    <tr>
      <th>Produktkode</th>
      <th>Software</th>
      <th>Partner</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>SW-win.ser.2016</td>
      <td>Windows Server 2016 Datacenter</td>
      <td>Microsoft</td>
    </tr>
    <tr>
      <td>SW-win.ser.2019</td>
      <td>Windows Server 2019 Datacenter</td>
      <td>Microsoft</td>
    </tr>
    <tr>
      <td>SW-SLES</td>
      <td>SUSE Linux Enterprise Server</td>
      <td>SUSE</td>
    </tr>
    <tr>
      <td>SW-CAAS</td>
      <td>SUSE Container-as-a-Service</td>
      <td>SUSE</td>
    </tr>
    <tr>
      <td>SW-Nextcloud</td>
      <td>Nextcloud Hub</td>
      <td>Nextcloud</td>
    </tr>
    <tr>
      <td>SW-STACKn</td>
      <td>STACKn (Machine Learning)</td>
      <td>Scaleout Systems</td>
    </tr>
    <tr>
      <td>SW-clustercontrol</td>
      <td>Cluster Control</td>
      <td>Severalnines</td>
    </tr>
    <tr>
      <td>SW-backupninja</td>
      <td>Backup Ninja</td>
      <td>Severalnines</td>
    </tr>
    <tr>
      <td>SW-ms.sql.ser</td>
      <td>Microsft SQL Server</td>
      <td>Microsoft</td>
    </tr>
  </tbody>
</table>

## Microsoft Windows Server 2016 – Datacenter

Windows Server 2016 er den forrige serverversion af Windows. Safespring tilbyder den i Datacenter-udgaven for at give kunderne hele funktionssættet.

## Microsoft Windows Server 2019 – Datacenter

Windows Server 2019 er den nyeste version af Windows Server. Safespring tilbyder den i Datacenter-udgaven for at give kunderne hele funktionssættet.

## SUSE Linux Enterprise Server – Standard

Safespring tilbyder SUSE Linux Enterprise Server med Standard-support direkte via platformen. Den licenseres pr. kerne i den virtuelle instans.

## SUSE Container-as-a-Service

Safespring tilbyder SUSE Container-as-a-Service (CAAS) via platformen.

## Nextcloud Hub

Safespring tilbyder produktivitetsplatformen Nextcloud, Nextcloud Hub, hostet på Safesprings offentlige eller administrerede private cloud-implementeringer. Nextcloud Hub på Safespring opfylder GDPR-krav og overholder udelukkende europæisk lovgivning. Nextcloud Hub indeholder forskellige Enterprise-samarbejdsfunktioner såsom fildeling (Nextcloud Files), møder (Nextcloud Talk) samt kalender, kontakter og mail (Nextcloud Groupware).

## STACKn (Maskinlæring)

STACKn er et meget fleksibelt, open source, cloud-native åbent toolkit til full-stack datavidenskabsprojekter og hele maskinlæringslivscyklussen.

Applikationen dækker alle faser fra dataindlæsning og transformation, feature-ekstraktion, modeldefinition, træning og evaluering til udrulning, inferens og overvågning med infrastrukturautomatisering oven på Kubernetes. Den er bygget til at bringe maskinlæring i produktion i enhver skala.

Vigtige fordele:

- Kontinuerlig analyse
- Ende-til-ende orkestrering af arbejdsgange
- Simpel udrulning
- Open source (Apache2)
- Intuitiv brugerflade

STACKn tilbyder en ressourcestærk og agil tilgang til at udvikle, drive og udrulle maskinlæringsmodeller og gør det muligt for enkeltpersoner og organisationer hurtigt at komme i gang med maskinlæring og AI-praksis gennem Scaleouts open source ende-til-ende-løsning.

### Agnostisk over for maskinlæringsrammeværk

Understøtter de fleste maskinlæringsrammeværk direkte, og med åbne API’er kan det udvides med yderligere rammeværk.

### Ende til ende orkestrering af arbejdsgange

Automatisér dine arbejdsgange til at håndtere opgaver som grid-søgninger eller active learning-pipelines. Understøttelse af at automatisere pipelines fra dataindlæsning til modeludrulning og overvågning.

### Agnostisk over for cloudinfrastruktur

Opsæt og kør hvor som helst, Kubernetes kan køre. Ingen leverandørlåsning, fuld fleksibilitet til at køre i cloud, hybrid, on-prem eller bare-metal opsætninger.

### Simpel udrulning

Kører hvor som helst, du kan køre Kubernetes – hosted, on-prem, i skyen eller på din laptop.

### Open source

Vores løsning er open source og bygger oven på de bedste tilgængelige open source-værktøjer og -komponenter, uden lock-in-effekter eller skjulte dagsordener.

### Nøglefærdig

Udrul stakken hvor som helst, du kan køre Kubernetes. Kom i gang på din laptop eller workstation med Minikube eller minik8s, eller kør fuldskala produktionssystemer på Kubernetes eller OpenShift.

### Værktøjer og biblioteker

STACKn bygger oven på de bedste tilgængelige open source-værktøjer og -komponenter. Den håndterer kompleksiteten ved at integrere open source toolchains til maskinlæring og DevOps i en fuld stack datavidenskabsløsning. STACKn vil fortsætte med at udvikle sig sammen med open source DevOps- og ML-fællesskabet og gennem aktiv udvikling af Scaleout og partnere.

Eksempler på open source-software, der bruges: Docker, Kubernetes, K3s, Kn, Jupyterhub, Grafana, Keycloack, Minio, Prometheus, OpenFaaS, Istio, Juju, Argo, Rancher, Rancher Kubernetes Engine (RKE), Gitea, Elasticsearch.

### Forudsætninger

- Safespring IaaS
- Udrullet Kubernetes-klynge i IaaS (såsom PAAS-man.kubernetes eller kundens egen).

## Cluster Control

Platform til administration og automatisering af open source-databaser. Fås enten med community-support eller leverandørsupport, som er beskrevet her og tilbydes gennem vores servicekatalog.

ClusterControl er det altomfattende open source-databaseadministrationssystem til brugere med enkeltstående eller blandede miljøer, som fjerner behovet for at sammenstykke flere administrationsværktøjer. Kernen i ClusterControl er dens automatiseringsfunktionalitet, som lader brugerne automatisere mange af de databaseopgaver, der udføres regelmæssigt, såsom at udrulle nye klynger, tilføje og skalere nye noder, køre backups og opgraderinger og meget mere.

### Understøttede databaseteknologier

- Udrulning og skalering
  - Agile og effektive operationer med standardiseret HA-system
- Overvågning og alarmering
  - Højere oppetid
  - Effektiv hændelseshåndtering
- Backuphåndtering
  - Planlægning og verifikation af backups
  - Opbevaringspolitikker for compliance
  - Lavere RPO
  - Automatisk data-kryptering
- Automatisk genopretning og reparation
  - Højere serviceoppetid og lavere gennemsnitlig reparationstid
  - Automatisk failover og promovering af slaves til master i tilfælde af fejl
  - Genopretningsprocedurer udføres automatisk
- Konfigurationsstyring
- Ydelsesstyring
  - Automatiserede performance-rådgivere
- Opgraderinger og patching
- Operationel rapportering
- Sikkerhed og compliance

### Forudsætninger for Cluster Control

- Safespring IaaS
  - Arkitektur: kun x86_64
  - RAM: >2 GB
  - CPU: >2 kerner
  - Diskplads: >20 GB

#### Understøttede operativsystemer

- ClusterControl er testet på følgende operativsystemer:
  - Red Hat Enterprise Linux 6.x/7.x/8.x
  - CentOS 6.x/7.x/8.x
  - Ubuntu 12.04/14.04/16.04/18.04 LTS
  - Debian 7.x/8.x/9.x/10.x
- For de overvågede noder er udrulningsfunktionen testet på følgende operativsystemer:
  - Red Hat Enterprise Linux 6.x/7.x
  - CentOS 6.x/7.x/8.x
  - Ubuntu 12.04/14.04/16.04/18.04 LTS
  - Debian 7.x/8.x/9.x/10.x
- Følgende virker ikke:
  - CentOS 5.4 og tidligere
  - Fedora Core 16 og tidligere

### Cluster Control – Understøttede databaser

| Databasetype                         | Klyngetype                                    | Version                                                                    | Minimum anbefalede noder                                                         |
| ------------------------------------ | --------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| MySQL / MariaDB                      | MySQL Cluster (NDB)                           | 7.1 og nyere                                                               | 5 værter (2 datanoder + 2 API/mgmd-noder + 1 ClusterControl-node)                |
|                                      | MySQL/MariaDB-replikering                     | 5.1/5.5/5.6/5.7/8.0 (MySQL/Percona) 5.5/10.0/10.1/10.2/10.3/10.4 (MariaDB) | 3 værter (1 master-node + 1 standby master/slave + 1 ClusterControl-node)        |
|                                      | Percona XtraDB Cluster MariaDB Galera Cluster | 5.5/5.6/5.7 (MySQL/Percona) 5.5/10.0/10.1/10.2/10.3/10.4 (MariaDB)         | 4 værter (3 Galera-noder + 1 ClusterControl-node)                                |
|                                      | Single Instance                               | 5.5/5.6/5.7/8.0 (MySQL/Percona) 5.5/10.0/10.1/10.2/10.3/10.4 (MariaDB)     | 2 værter (1 database-node + 1 ClusterControl-node)                               |
| MongoDB / Percona Server for MongoDB | Sharded cluster                               | 3.4/3.6/4.0/4.2                                                            | 4 værter (3 config-servere / 3 shard-servere / 2 mongos + 1 ClusterControl-node) |
|                                      | Replica set                                   |                                                                            | 4 værter (3 replika-servere + 1 ClusterControl-node)                             |
| PostgreSQL                           | Single Instance                               | >9.6/10.x/11.x/12.x                                                        | 2 værter (1 PostgreSQL-node + 1 ClusterControl-node)                             |
|                                      | Streaming Replication                         |                                                                            | 3 værter (1 master-node + 1 slave-node + 1 ClusterControl                        |
| TimeScaleDB                          | Single Instance                               | >9.6/10.x/11.x/12.x                                                        | 2 værter (1 TimeScaleDB-node + 1 ClusterControl-node)                            |
|                                      | Streaming Replication                         |                                                                            | 3 værter (1 master-node + 1 slave-node + 1 ClusterControl-node)                  |

## Backup Ninja

Backup Ninja er en databasebackup-tjeneste, der automatiserer oprettelse af backups, planlægning, notifikationer og meget mere med enkle trin-for-trin-konfigurationsguides, der hjælper brugere med at oprette sikre databasebackups, som kan gemmes on-premises eller i offentlig eller privat cloud.

I stedet for at bruge specialiserede værktøjer og produkter til hver databaseteknologi kan brugere administrere alle open source-databasebackups for både fysiske og virtuelle servere fra ét praktisk dashboard med Backup Ninja.

Backup Ninja giver brugeren ét sted at administrere backups for flere databaser med forskellige databaseleverandører og backupmetoder. Brugere med en bred vifte af databaser kan drage fordel af den samlede tilgang, Backup Ninja tilbyder, til at beskytte og administrere hele database-miljøet. Den har indbygget integration med flere cloud-lagringsudbydere til at gemme backups. Brugeren skal blot angive cloud-legitimationsoplysninger, hvorefter den vil være tilgængelig som en af backup-destinationerne, når en backup planlægges.

### Forudsætninger

- Safespring IaaS
- Backup Ninja agent-tjenesten skal installeres med superbruger-privilegier (root eller sudo sudo-bruger). Når databaseadgang sættes op for Backup Ninja-agenten, skal de angivne kommandoer udføres af en databasebruger, der har mulighed for at oprette bruger, rolle og give rettigheder, f.eks. root-bruger.
- Understøttet operativsystem:
  - Backup Ninja er testet på følgende operativsystemer (kun x86_64-arkitektur):
    - CentOS 6/7
    - Red Hat Enterprise Linux 6/7
    - Ubuntu Server 12.04/14.04/16.04/18.04 LTS
    - Debian 7/8/9
    - Windows

### Understøttede databaser

| Databasetype             | Understøttede backups              | Databaseversion |
| ------------------------ | ---------------------------------- | --------------- |
| MySQL                    | Logiske backups og fysiske backups | 5.6, 5.7, 8.x   |
| MariaDB                  | Fysiske backups                    | 10.x            |
| Percona Server for MySQL | Fysiske backups                    | 5.6, 5.7, 8.x   |
| PostgreSQL               | Logiske backups og fysiske backups | 9.4, 10.x, 11.x |
| TimescaleDB              | Logiske backups og fysiske backups | 9.4, 10.x, 11.x |
| MongoDB                  | Logiske backups                    | 4.x             |
