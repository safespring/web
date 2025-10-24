---
title: "Backup as a service"
language: "en"
cardtitle: "Backup"
cardicon: "fa-solid fa-cloud-arrow-up"
cardcolor: "#195F8C"
cardorder: "06"
date: "2025-01-20"
draft: false
intro: "The backup service comes in three subscription models depening on your need."
cardintro: ""
background: "safespring-compute-background.svg"
form: "no"
sidebarlinkname: "Back to all categories"
sidebarlinkurl: "/geant/service-catalogue"
sidebarlinkname2: "See price for compute"
sidebarlinkurl2: "/geant/price/#safespring-backup"
section: "OCRE 2024 framework"
socialmedia: "/safespring-start.jpg"
toc: "On this page"
noindex: "x"
aliases:
  - /geant/service-catalogue/backup/
---

{{< ingress >}}
Agent base cloud backup services with deduplication and secure off-site storage.
{{< /ingress >}}

## Backup Service

The backup service comes in three subscription models depending on the users needs.

### Prerequisites

None.

### Configurations

| Product Code   | Service                                                |
| -------------- | ------------------------------------------------------ |
| BAAS-on.demand | Subscription suitable for small sized on-demand needs. |
| BAAS-small     | Subscription suitable for medium sized needs.          |
| BAAS-large     | Subscription suitable for large sized needs.           |

### Backup for applications and file systems

The software needed for backing up file systems can be complimented with application aware agents for secure backup of different flavors of databases..

The backup service is based on IBM’s Spectrum Protect and is offered in three different flavours based on how much data the customer expects to back up. Safespring has developed its own API which orchestrates the matching between clients and the fleet of backup servers.

Spectrum Protect is primarily a file-based backup system with an incremental forever backup strategy, meaning files are only backed up if they have changed. This drastically reduces the amount of data managed by the backup server. Additionally, compression is applied to most data backed up, for non-client encrypted data together with deduplication. Client-encrypted data is not deduplicated in order to guarantee maximum security for the customer’s data. All data is stored using data-at-rest encryption and the backup network traffic is encrypted using strong AES-256 cipher suites.

Encryption is only as secure as the encryption key management, and the backup options have the following three variants:

- Shared encryption, keys owned by the provider
- Shared encryption, keys owned by customer
- Encryption per host, keys owned by customer/end-user

For all levels it is possible to schedule up to four backups per day. There are several predefined start times to choose from (every second hour). The backup service is referred to as BAAS.backup in the price list.

The backups can be set up with the following schemes:

- Incremental forever. Incremental backup of file systems. One schedule every two hours to choose from.
- Full backup. Full backup of the application. One schedule every two hours to choose from.
- Incremental / Log backup. Incremental or log backup depending of application. One schedule every one hour to choose from.

### Retention policies

In addition to the standard retention policies, we offer a number of version limited policies. They do keep backup for the number of days specified, but each file will be kept only at the maximum numbers of versions specified.

These policies have the advantage of offering a price cap. For example, if a five-version policy is chosen the amount stored (and billed) will never exceed five times the client size. In most cases the amount stored will be less, since only changed files are backed up. A file that never changes will still only be one version in the backup system.

| Retention | Description                                                                |
| --------- | -------------------------------------------------------------------------- |
| 30 days   | Keeps all backup data for 30 days, up to five versions per file are kept.  |
| 30 days   | Keeps all backup data for 30 days, up to ten versions per file are kept.   |
| 90 days   | Keeps all backup data for 90 days, up to five versions per file are kept.  |
| 90 days   | Keeps all backup data for 90 days, up to ten versions per file are kept.   |
| 365 days  | Keeps all backup data for 365 days, up to five versions per file are kept. |
| 365 days  | Keeps all backup data for 365 days, up to ten versions per file are kept.  |

It is possible to request other version limited policies if needed (e.g. 17 or 42 versions).

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Get in contact with Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Sales:" >}} +46855107370 or sales@safespring.se
{{% /custom-card %}}
