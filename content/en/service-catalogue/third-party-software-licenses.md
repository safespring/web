---
title: "Third-party software licenses"
language: "en"
cardtitle: "Software"
cardicon: "fa-solid fa-code"
cardcolor: "#195F8C"
cardorder: "08"
date: 2023-02-28
draft: false
intro: "Safespring provides several third-party software licenses for use on our IaaS platforms"
cardintro: ""
background: "safespring-compute-background.svg"
form: "no"
sidebarlinkname: "Back to all categories"
sidebarlinkurl: "/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "Safespring Service Catalogue"
socialmedia: "/safespring-start.jpg"
toc: ""
nosidebar: ""
aliases:
- /service-catalogue/third-party-software-licenses/
---

{{< ingress >}}
Safespring provides several third-party software licenses for use on our IaaS platforms.
{{< /ingress >}}

<table class="width100">
  <thead>
    <tr>
      <th>Product Code</th>
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

Windows Server 2016 is the previous server version of Windows. Safespring offers this in the Datacenter version to provide customers with the full feature set.

## Microsoft Windows Server 2019 – Datacenter

Windows Server 2019 is the most recent version of Windows Server. Safespring offers this in the Datacenter edition to provide customers with the full feature set.

## SUSE Linux Enterprise Server – Standard

Safespring offers SUSE Linux Enterprise Server with Standard support directly via the platform. It’s licensed per core of the virtual instance.

## SUSE Container-as-a-Service

Safespring offers SUSE Container-as-a-Service (CAAS) via the platform.

## Nextcloud Hub

Safespring offers the Nextcloud productivity platform, Nextcloud Hub, hosted on Safesprings public or managed private cloud deployments. Nextcloud Hub on Safespring satisfies GDPR requirements and strictly adheres to European law alone. Nextcloud Hub contains various Enterprise collaboration functions such as filesharing (Nextcloud Files), meeting (Nextcloud Talk) and calendar, contact and mail (Nextcloud Groupware).

## STACKn (Machine Learning)

STACKn is a highly flexible, open-source, cloud-native open toolkit for full-stack data science projects, and the entire machine learning lifecycle.

The application covers all stages from data ingestion and transformation, feature extraction, model definition, training, and evaluation, to deployment, inference and monitoring with infrastructure automation on top of Kubernetes. It is built to take machine learning to production at any scale.

Key benefits:

- Continuous Analytics
- End-to-end workflow orchestration
- Simple deployment
- Open source (Apache2)
- Intuitive UI

STACKn offers a resourceful and agile approach to develop, operate and deploy machine learning models and enables individuals and organisations to quickly get started with machine learning and AI practices through Scaleout’s open source end to end solution.

### Machine Learning Framework Agnostic

Supports most machine learning frameworks out of the box and with open APIs support extension for additional frameworks.

### End to End Workflow Orchestration

Automate your workflows to handle tasks such as grid searches or active learning pipelines. Support for automating pipelines from data ingestion to model deployment and monitoring.

### Cloud Infrastructure Agnostic

Setup and run anywhere Kubernetes can run. No lock-in, full flexibility to run on cloud, hybrid, on-prem or bare-metal setups.

### Simple Deployment

It runs anywhere you can run Kubernetes – hosted, on-prem, in the cloud or on your laptop.

### Open Source

Our solution is open source and is building on top of the best available open source tools and components, with no lock-in effects or hidden agendas.

### Turnkey Ready

Deploy the stack anywhere you can run Kubernetes. Get started on your laptop or workstation with Minikube or minik8s or run full-scale production systems on Kubernetes or OpenShift.

### Tools and Libraries

STACKn is building on top of the best available open source tools and components. It deals with the complexity of integrating open source toolchains for machine learning and DevOps into a full stack data science solution. STACKn will continue to evolve with the open source DevOps and ML community, and through active development by Scaleout and partners.

Example of open source software that is used: Docker, Kubernetes, K3s, Kn, Jupyterhub, Grafana, Keycloack, Minio, Prometheus, OpenFaaS, Istio, Juju, Argo, Rancher, Rancher Kubernetes Engine (RKE), Gitea, Elasticsearch.

### Prerequisites

- Safespring IaaS
- Deployed Kubernetes cluster in the IaaS (such as PAAS-man.kubernetes, or customers own.)

## Cluster Control

Platform for Management & Automation of Open Source Database. Available either with community support or vendor support, which is described here and offered through our service catalogue.

ClusterControl is the all-inclusive open source database management system for users with single or mixed environments that removed the need to cobble together multiple management tools. At the core of ClusterControl is its automation functionality that lets users automate many of the database tasks performed regularly such as deploying new clusters, adding and scaling new nodes, running backups and upgrades, and more.

### Supported database technologies

- Deployment and Scaling
  - Agile and efficient operations with standardized HA system
- Monitoring & Alerting
  - Higher uptime
  - Powerful incident management
- Backup Management
  - Backup scheduling and verification of backups
  - Retention policies for compliance
  - Lower RPO
  - Automatic data encryption
- Automatic Recovery and Repair
  - Higher service uptime and lower mean time to repair
  - Automatic failover and promotion of slaves to master in the event of failure
  - Recovery procedures performed automatically
- Configuration Management
- Performance Management
  - Automated performance advisors
- Upgrades and Patching
- Operational Reporting
- Security and Compliance

### Cluster Control Prerequisites

- Safespring IaaS
  - Architecture: x86_64 only
  - RAM: >2 GB
  - CPU: >2 cores
  - Disk space: >20 GB

#### Supported Operating Systems

- ClusterControl has been tested on the following operating systems:
  - Red Hat Enterprise Linux 6.x/7.x/8.x
  - CentOS 6.x/7.x/8.x
  - Ubuntu 12.04/14.04/16.04/18.04 LTS
  - Debian 7.x/8.x/9.x/10.x
- For the monitored nodes, the deployment feature has been tested on the following operating systems:
  - Red Hat Enterprise Linux 6.x/7.x
  - CentOS 6.x/7.x/8.x
  - Ubuntu 12.04/14.04/16.04/18.04 LTS
  - Debian 7.x/8.x/9.x/10.x
- The following do not work:
  - CentOS 5.4 and earlier
  - Fedora Core 16 and earlier

### Cluster Control – Supported Databases

| Database Type                        | Cluster Type                                  | Version                                                                    | Minimum Recommended Nodes                                                       |
| ------------------------------------ | --------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| MySQL / MariaDB                      | MySQL Cluster (NDB)                           | 7.1 and later                                                              | 5 hosts (2 data nodes + 2 API/mgmd nodes + 1 ClusterControl node)               |
|                                      | MySQL/MariaDB replication                     | 5.1/5.5/5.6/5.7/8.0 (MySQL/Percona) 5.5/10.0/10.1/10.2/10.3/10.4 (MariaDB) | 3 hosts (1 master node + 1 standby master/slave + 1 ClusterControl node)        |
|                                      | Percona XtraDB Cluster MariaDB Galera Cluster | 5.5/5.6/5.7 (MySQL/Percona) 5.5/10.0/10.1/10.2/10.3/10.4 (MariaDB)         | 4 hosts (3 Galera nodes + 1 ClusterControl node)                                |
|                                      | Single Instance                               | 5.5/5.6/5.7/8.0 (MySQL/Percona) 5.5/10.0/10.1/10.2/10.3/10.4 (MariaDB)     | 2 hosts (1 database node + 1 ClusterControl node)                               |
| MongoDB / Percona Server for MongoDB | Sharded cluster                               | 3.4/3.6/4.0/4.2                                                            | 4 hosts (3 config servers / 3 shard servers / 2 mongos + 1 ClusterControl node) |
|                                      | Replica set                                   |                                                                            | 4 hosts (3 replica servers + 1 ClusterControl node)                             |
| PostgreSQL                           | Single Instance                               | >9.6/10.x/11.x/12.x                                                        | 2 hosts (1 PostgreSQL node + 1 ClusterControl node)                             |
|                                      | Streaming Replication                         |                                                                            | 3 hosts (1 master node + 1 slave node + 1 ClusterControl                        |
| TimeScaleDB                          | Single Instance                               | >9.6/10.x/11.x/12.x                                                        | 2 hosts (1 TimeScaleDB node + 1 ClusterControl node)                            |
|                                      | Streaming Replication                         |                                                                            | 3 hosts (1 master node + 1 slave node + 1 ClusterControl node)                  |

## Backup Ninja

Backup Ninja is a database backup service that automates database backup creation, scheduling, notification and much more with simple step-by-step configuration wizards to help users create secure database backups that can be stored on-premises, or on the public or private cloud.

Rather than using specialized tools and products for every database technology, users can manage all open-source database backups for both physical and virtual servers from a single convenient dashboard with Backup Ninja.

Backup Ninja provides the user with a single location to manage backups for multiple databases with different database vendors and backup methods. Users with a variety of databases can benefit from the unified approach Backup Ninja provides to protect and manage the entire database environment. It has built-in integration with multiple cloud storage providers to store backups. The user just needs to provide the cloud credentials and it will be available as one of the backup destinations when scheduling a backup.

### Prerequisites

- Safespring IaaS
- The Backup Ninja agent service must be installed with super-user privilege (root or sudo sudo user). When setting up database access for Backup Ninja agent, the provided commands must be executed by a database user that has the ability to create user, role and grant privileges e.g, root user.
- Supported Operating System:
  - Backup Ninja has been tested on the following operating systems (x86_64 architecture only):
    - CentOS 6/7
    - Red Hat Enterprise Linux 6/7
    - Ubuntu Server 12.04/14.04/16.04/18.04 LTS
    - Debian 7/8/9
    - Windows

### Supported Databases

| Database Type            | Supported Backups                    | Database Version |
| ------------------------ | ------------------------------------ | ---------------- |
| MySQL                    | Logical Backups and Physical Backups | 5.6, 5.7, 8.x    |
| MariaDB                  | Physical Backups                     | 10.x             |
| Percona Server for MySQL | Physical Backups                     | 5.6, 5.7, 8.x    |
| PostgreSQL               | Logical Backups and Physical Backups | 9.4, 10.x, 11.x  |
| TimescaleDB              | Logical Backups and Physical Backups | 9.4, 10.x, 11.x  |
| MongoDB                  | Logical Backups                      | 4.x              |
