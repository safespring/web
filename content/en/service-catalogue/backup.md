---
title: "Backup as a service – BaaS"
language: "en"
cardtitle: "Backup"
cardicon: "fa-solid fa-cloud-arrow-up"
cardcolor: "#195F8C"
cardorder: "04"
date: 2023-02-28
draft: false
intro: "The backup service is based on IBM’s Spectrum Protect with three different flavors."
cardintro: ""
background: "safespring-compute-background.svg"
form: "no"
sidebarlinkname: "Back to all categories"
sidebarlinkurl: "/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "Safespring Service Catalogue"
socialmedia: "/safespring-start.jpg"
toc: ""
aliases:
- /service-catalogue/backup/
---

{{< ingress >}}
Cloud backup services contains the following categories:
{{< /ingress >}}

1. Backup for file systems
1. Backup for applications
1. Client backup

## Backup for application and file systems

The software needed for backing up file systems, Microsoft SQL, Microsoft Exchange, Oracle, DB2 and basic support for MySQL is included in the service. Additionally, the software needed to backup VMware vSphere clusters is included in the service.

### Prerequisites

None.

### Service descriptions

The backup service is based on IBM’s Spectrum Protect and is offered in three different flavors based on how much data the customer expects to back up. Safespring has developed its own API which orchestrates the matching between clients and the fleet of backup servers. Spectrum Protect (formerly known as TSM) is primarily a file-based backup system with an incremental forever backup strategy, meaning files are only backed up if they have changed. This drastically reduces the amount of data managed by the backup server. Additionally, compression is applied to most data backed up, for non-client encrypted data together with deduplication. Client-encrypted data is not deduplicated in order to guarantee maximum security for the customer’s data. All data is stored using data-at-rest encryption and the backup network traffic is encrypted using strong AES-256 cipher suites.

Encryption is only as secure as the encryption key management, and the backup options have the following three variants:

1. Shared encryption, keys owned by the provider
1. Shared encryption, keys owned by customer
1. Encryption per host, keys owned by customer/end-user

For all levels it is possible to schedule up to four (4) backups per day. There are several predefined start times to choose from (every second hour).

| Product Code   | Type     | Site | Version                |
| -------------- | -------- | ---- | ---------------------- |
| BAAS-on.demand | OnDemand | STO1 | Spectrum Protect 7 & 8 |
| BAAS-small     | Small    | STO1 | Spectrum Protect 7 & 8 |
| BAAS-large     | Large    | STO1 | Spectrum Protect 7 & 8 |

#### Schedule (file systems)

| Schedule            | Description                                                                          |
| ------------------- | ------------------------------------------------------------------------------------ |
| Incremental forever | Incremental backup of file systems. One schedule every two (2) hours to choose from. |

#### Schedule (application)

| Schedule                | Description                                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------------------- |
| Full backup             | Full backup of the application. One schedule every two (2) hours to choose from.                    |
| Incremental/ Log backup | Incremental or log backup depending of application. One schedule every one (1) hour to choose from. |

### Option to the Backup service

In addition to the standard retention policies, we offer a number of version limited policies. They do keep backup for the number of days specified, but each file will be kept only at the maximum numbers of versions specified.

These policies have the advantage of offering a price cap. For example. if a five-version policy is chosen the amount stored (and billed) will never exceed five (5) times the client size. In most cases the amount stored will be less, since only changed files are backed up. A file that never changes will still only be one version in the backup system.

| Retention | Description                                                                    |
| --------- | ------------------------------------------------------------------------------ |
| 30 days   | Keeps all backup data for 30 days, up to five (5) versions per file are kept.  |
| 30 days   | Keeps all backup data for 30 days, up to ten (10) versions per file are kept.  |
| 90 days   | Keeps all backup data for 90 days, up to ten (10) versions per file are kept.  |
| 365 days  | Keeps all backup data for 365 days, up to five (5) versions per file are kept. |
| 365 days  | Keeps all backup data for 365 days, up to ten (10) versions per file are kept. |

It is possible to request other version limited policies if needed (e.g. 17 or 42 versions).

## Snapshot (image) backup for virtual servers

The same encryption and scheduling policies applies to snapshots for virtual servers.

### Retention Policy

| Retention | Description                                                                                                 |
| --------- | ----------------------------------------------------------------------------------------------------------- |
| 14 days   | Keeps all backup data for 14 days, all versions are kept. This is the equivalent of ten (10) business days. |

## BaaS Professional Services

### General Backup Consultancy

A professional consultancy service offering is available. This service can be delivered on-site, or remotely depending on the work to be done. This service can be used for, but not limited to:

- Design of more complex backup/restore scenarios
- Implementation of more complex backup/restore installations such as large MS Exchange server or MS SharePoint
- Implementation of TSM for Virtual Environment
- Assistance with backup/restore of other applications
- On-site training
- On-site assistance during disaster recovery
- Restore testing

| Product Code               | Professional Service                                                             |
| -------------------------- | -------------------------------------------------------------------------------- |
| BAASPS-generic.consultancy | General backup consultancy service to configure certain applications and similar |
| BAASPS-migration           | Backup migration and validation service                                          |
| BAASPS-offsite             | Offsite backup target services                                                   |
| BAASPS-restore.test        | Restore test services                                                            |
| BAASPS-onboarding          | Backup onboarding program                                                        |
| BAASPS-feature             | Backup Feature and Services additions                                            |
| BAASPS-exit                | Exit backup services                                                             |

### Backup Migration and Validation Services

Safespring will assist the Customer in converting data from old/existing backup systems to Safespring's cloud backup service. After backups are migrated Safespring assists the Customer in validation of all transferred data.

### Offsite Backup Target Services

Safespring will assist the Customer in setting up off-site equipment and mobile devices to make backup to Safespring's backup service BaaS.

### Restore Test Services

Safespring assist the customers to verify that all test restoration jobs work as they should. Safespring uses restore testing software to restore any type of machine into a virtual machine just to verify.

### Backup Onboarding Program

General consultant assistance helping the customers with onboarding processes, and how they migrate to Safespring's cloud services. Safespring assists the customer according to customers own competence and demands.

### Backup Feature and Services Additions

General consultant assistance helping the customers to understand how to add new features or services to existing cloud services.

### Exit Backup Services

Safespring will assist the Customer with transferring stored backup data from Safespring to the Customer after expiring of contract.
