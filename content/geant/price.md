---
section: "OCRE IaaS+ 2024"
language: "En"
title: "Géant Price List and Calculator"
date: "2023-12-01"
draft: false
tags: ""
showthedate: false
pageimage: ""
intro: "Together we create a safer, and more cost-effective digital infrastructure."
toc: "On this page"
nosidebar: ""
sidebarlinkname: "Download price list"
sidebarlinkurl: "/pricelist/geant/geant_safespring_pricelist.xlsx"
sidebarlinkname2: "Service Catalogue"
sidebarlinkurl2: "/geant/service-catalogue/"
noindex: "x"
---

All prices are in EUR, excluding VAT. For price lists in other currencies, please [download the price list in Excel format](/pricelist/geant/geant_safespring_pricelist.xlsx).

## Safespring Compute

{{< ingress >}}
Infrastructure as a service can run on an open source license or with a Windows license.
{{< /ingress >}}

### Flavors with local NVMe disk
Central block storage can be purchased for the instances. See "Central block storage" in the price list.
See configurations for flavors with local NVMe disk in the [service catalogue](/geant/service-catalogue/infrastructure/#configurations).

| Product   ID             | vCPU | RAM (GB) | Local disc (GB) | Hourly | 30 days  |
|--------------------------|------|----------|-----------------|--------|----------|
| FLAVOR-l2. c2 r4. 100    | 2    | 4        | 100             | 0,06 € | 42,72 €  |
| FLAVOR-l2. c2 r4. 500    | 2    | 4        | 500             | 0,11 € | 78,32 €  |
| FLAVOR-l2. c2 r4. 1000   | 2    | 4        | 1 000           | 0,17 € | 122,82 € |
| FLAVOR-l2. c4 r8. 100    | 4    | 8        | 100             | 0,11 € | 76,54 €  |
| FLAVOR-l2. c4 r8. 500    | 4    | 8        | 500             | 0,16 € | 112,14 € |
| FLAVOR-l2. c4 r8. 1000   | 4    | 8        | 1 000           | 0,22 € | 156,64 € |
| FLAVOR-l2. c8 r16. 100   | 8    | 16       | 100             | 0,20 € | 144,18 € |
| FLAVOR-l2. c8 r16. 500   | 8    | 16       | 500             | 0,25 € | 179,78 € |
| FLAVOR-l2. c8 r16. 1000  | 8    | 16       | 1 000           | 0,31 € | 224,28 € |
| FLAVOR-l2. c16 r32. 100  | 16   | 32       | 100             | 0,39 € | 279,46 € |
| FLAVOR-l2. c16 r32. 500  | 16   | 32       | 500             | 0,44 € | 315,06 € |
| FLAVOR-l2. c16 r32. 1000 | 16   | 32       | 1 000           | 0,50 € | 359,56 € |
| FLAVOR-l2. c16 r64. 500  | 16   | 64       | 500             | 0,66 € | 471,70 € |
| FLAVOR-l2. c32 r64. 1000 | 32   | 64       | 1 000           | 0,88 € | 630,12 € |

### Flavors without local disk
Central block storage can be purchased for the instances. See "Central block storage" in the price list.
See configurations for flavors without local disk in the [service catalogue](/geant/service-catalogue/infrastructure/#compute-without-local-storage).

| Product ID         | vCPU | RAM (GB) | Local disc (GB) | Hourly | 30 days  |
|--------------------|------|----------|-----------------|--------|----------|
| FLAVOR-b2. c1 r2   | 1    | 2        | 0               | 0,02 € | 16,91 €  |
| FLAVOR-b2. c1 r4   | 1    | 4        | 0               | 0,04 € | 26,70 €  |
| FLAVOR-b2. c2 r4   | 2    | 4        | 0               | 0,05 € | 33,82 €  |
| FLAVOR-b2. c2 r8   | 2    | 8        | 0               | 0,07 € | 53,40 €  |
| FLAVOR-b2 .c4 r8   | 4    | 8        | 0               | 0,09 € | 67,64 €  |
| FLAVOR-b2. c4 r16  | 4    | 16       | 0               | 0,15 € | 106,80 € |
| FLAVOR-b2. c8 r16  | 8    | 16       | 0               | 0,19 € | 135,28 € |
| FLAVOR-b2. c8 r32  | 8    | 32       | 0               | 0,30 € | 213,60 € |
| FLAVOR-b2. c16 r32 | 16   | 32       | 0               | 0,38 € | 270,56 € |
| FLAVOR-b2. c16 r64 | 16   | 64       | 0               | 0,59 € | 427,20 € |

### Central Block Storage
Central block storage provides three copies of the data distributed in a robust CEPH cluster.
See configurations in the [service catalogue](/geant/service-catalogue/infrastructure/#central-block-storage).

| Product ID      | Description               | Hourly   | 30 days  |
|-----------------|---------------------------|----------|----------|
| VOLUME-large    | HDD-backed 3-replica Ceph | 0,0001 € | 0,1068 € |
| VOLUME-fast     | SSD-backed 3-replica Ceph | 0,0004 € | 0,3204 € |
| VOLUME-snapshot | Snapshot of image         | 0,0001 € | 0,1068 € |

{{< distance >}}


## Safespring Storage (S3)

{{< ingress >}}
Contact us for discounts on larger storage quantities. Pricing model based on the number of stored TB per month.
{{< /ingress >}}

See configurations for object storage in the [service catalogue](/geant/service-catalogue/storage/#configurations).

| Product ID | Per TB for 30 days |
|------------|--------------------|
| S3-archive | 31,15 €            |
| S3-storage | 44,50 €            |

{{< distance >}}



## Safespring Backup

{{< ingress >}}
Cloud backup solution for on-prem or cloud servers based on Spectrum Protect (TSM).
{{< /ingress >}}

Safespring Backup offers data reduction technology[^1] in the service which typically reduces the data volume between 45%-90%. The price is set per protected GB on the client and per stored GB in the service after deduplication and compression. Additionally, 1TB is included in the fixed monthly price for BAAS-small.

See configurations for backup in the [service catalogue](/geant/service-catalogue/backup/#configurations).

{{% accordion title="Which plan is best?" %}}

| Data Usage (GB) | Most Cost-effective Service |
|-----------------|-----------------------------|
| 0 - 5 000       | Backup on Demand            |
| 5 001 - 7 000   | Backup Small                |
| 7 001           | Backup Large                |

{{% /accordion %}}
{{< accordion-script >}}

| Product ID       | Fixed monthly price | Per GB / 30 days |
|------------------|---------------------|------------------|
| BAAS-on.demand[^2] | N/A                 | 0,22 €           |
| BAAS-small[^3]     | 490 €               | 0,16 €           |
| BAAS-large[^4]     | 846 €               | 0,08 €           |



## Network and Software

{{< ingress >}}
Safespring offers various software and licenses that can run on top of Safespring's cloud platform.
{{< /ingress >}}

### Network
Safespring offers several network services.  
See network alternatives in the [service catalogue](/geant/service-catalogue/network/).

| Product ID   | Type                       | Description                             | Billing per | Monthly  |
|--------------|----------------------------|-----------------------------------------|-------------|----------|
| NET-publicv4 | IPv4                       | Public                                  | IP-address  | 2,23 €   |
| NET-publicv6 | IPv6                       | Public                                  | N/A         | 0,00 €   |
| NET-ingress  | Data transfer              |                                         | N/A         | 0,00 €   |
| NET-egress   | Data transfer              |                                         | N/A         | 0,00 €   |
| NET-mgn.slb  | Managed SLB                | Load balancer based on two `l2.c4.r8.100` | Instance    | 186,00 € |
| NET-rdns     | Reverse DNS names          |                                         | N/A         | 0,00 €   |
| NET-byoip    | Bring your own IP prefixes |                                         | N/A         | 0,00 €   |

### Software and Licenses
Safespring offers several software and licenses.  
See third-party software licenses in the [service catalogue](/geant/service-catalogue/third-party-software-licenses/).

| Product ID        | Description                     | Billing per | Monthly  |
|-------------------|---------------------------------|-------------|----------|
| SW-win.ser.2022   | Microsoft Windows Server        | vCPU        | 15,58 €  |
| SW-ms.sql.ser     | Microsoft SQL Server Standard   | vCPU        | 109,38 € |
| SW-ms.sql.ser.ent | Microsoft SQL Server Enterprise | vCPU        | 424,17 € |
| SW-nextcloud      | Nextcloud Hub                   | Account     | 6,00 €   |

<!--## Platform Services
We offer complete management of your Kubernetes environments, including regulatory compliance, with Compliant Kubernetes. Additionally, Managed Elasticsearch, NATS, MariaDB, and Redis are offered. Request a quote today to access these services!

| Product ID            | Description                                           |         Monthly |
|-----------------------|-------------------------------------------------------|----------------:|
| PAAS-man.kubernetes24 | Managed Compliant Kubernetes 24/7                     | Request a quote |
| PAAS-man.kubernetes8  | Managed Compliant Kubernetes 8/5                      | Request a quote |
| PAAS-man.opensearch   | Managed Opensearch (included in Compliant Kubernetes) | Request a quote |
| PAAS-openshift        | No support                                            | Request a quote |
| PAAS-man.nats         | Managed NATS                                          | Request a quote |
| PAAS-man.mariadb      | Managed MariaDB                                       | Request a quote |
| PAAS-man.redis        | Managed Redis                                         | Request a quote |
-->

## Support and Consulting Services

{{< ingress >}}
Support applies to Safespring Compute, Safespring Storage and Safespring Backup.
{{< /ingress >}}

See support alternatives in the [service catalogue](/service-catalogue/support/).

| Product ID       | Description                                                  | Billing per  | Monthly               |
|------------------|--------------------------------------------------------------|--------------|-----------------------|
| SUPPORT-base     | Support for Safespring's services                            | N/A          | 0,00 €                |
| SUPPORT-standard | Access to chat room with support and engineering             | Total volume | 3 % of total volume [5] |
| SUPPORT-premium  | Dedicated Service Manager with quarterly operations meetings | Month        | 2 140,00 €            |

<!--### Consulting Services
Access our experienced consultants and project managers to optimize your cloud infrastructure at competitive prices, with junior experts starting at €100.43 per hour and senior experts reaching up to €122.38 per hour.

| Product ID       | Description                                                       | Billing per |  Monthly |
|------------------|-------------------------------------------------------------------|-------------|---------:|
| PS-consult.jun   | Cloud Infrastructure Consultant, junior expertise level           | Hour        | 100,30 € |
| PS-consult.sen   | Cloud infrastructure Consultant, senior expertise level           | Hour        | 122,29 € |
| PS-cloudarch.jun | Cloud Infrastructure Architect Consultant, junior expertise level | Hour        | 113,65 € |
| PS-cloudarch.sen | Cloud Infrastructure Architect Consultant, senior expertise level | Hour        | 122,29 € |
| PS-pm.jun        | Project Manager, junior expertise level                           | Hour        | 101,37 € |
| PS-pm.sen        | Project Manager, senior expertise level                           | Hour        | 122,29 € |
-->

### Educations
Safespring offers several courses in IaaS and cloud services.  
Read the course descriptions in the [service catalogue](/geant/service-catalogue/courses/).

| Product ID                  | Description                                     | Duration  | Billing per | Price      |
|-----------------------------|-------------------------------------------------|-----------|-------------|------------|
| COURSE-intro.iaas           | Introduction to "infrastructure as a service"   | One day   | Occasion    | 560,00 €   |
| COURSE-cxo.strategy         | Cloud strategy for management teams             | One day   | Occasion    | 560,00 €   |
| COURSE-intro.cloud          | Introduction to cloud infrastructure technology | Four days | Occasion    | 2 230,00 € |
| COURSE-devops.microservices | Modern DevOps and "microservices"               | Four days | Occasion    | 2 230,00 € |

___

### Notes

[^1]: Deduplication is a data reduction done in the service. Depending on the data, it usually varies between 45% -90%.
[^2]: The price is per protected GB on the client.
[^3]: The price is per GB stored in the service after deduplication and compression.
[^4]: The price is per GB stored in the service after deduplication and compression. The service includes 1000 GB in the fixed monthly price.
[^5]: The support fee is charged at 3 % of the total volume with a minimum fee of 150 EUR per month.