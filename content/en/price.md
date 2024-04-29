---
section: "Safespring Cloud Platform"
language: "En"
title: "Price List and Calculator"
date: "2023-12-01"
draft: false
tags: ""
showthedate: false
pageimage: ""
intro: "Together we create a safer, and more cost-effective digital infrastructure."
toc: "On this page"
nosidebar: ""
sidebarlinkname: "Watch demo"
sidebarlinkurl: "/demo/compute/"
sidebarlinkname2: "Contact us"
sidebarlinkurl2: "/en/contact"
---

{{< icon-block-container >}}
    {{< icon-block icon="fa-solid fa-table" text="Price list with calculator" link="/pricelist/EUR/safespring-price-list-eur.xlsx" color="#32cd32">}}
    {{< icon-block icon="fa-solid fa-file-pdf" text="Price list as PDF" link="/pricelist/EUR/safespring-price-list-eur.pdf" color="#195F8C">}}
    {{< icon-block icon="fa-solid fa-file-csv" text="Price list as CSV (coming soon)" link="" color="#EBEBEB">}}
{{< /icon-block-container >}}

{{< distance >}}

{{< ingress >}}
See our prices further down on this page or download the price calculator to your computer. The price calculator is an Excel file with built-in logic to calculate a monthly cost based on your choices.
{{< /ingress >}}

There are many advantages to infrastructure as a service. In addition to increased performance for lower cost, you avoid investing in new hardware and paying for space that is not utilized. With us, you only pay for the resources you allocate.

Download our price calculator and build your current environment to see what you save by moving to Safespring. The price includes high security, both physical, logical, and legal. You also get 24/7 support and access to our self-service portal where you can manage your instances as needed.

## No Traffic Cost

Safespring does not charge any traffic cost for data sent to or from our services. Traffic cost, or Egress cost as it is also called, is a common lock-in mechanism. Safespring is built on open standards and it is part of our philosophy.

{{< distance >}}

## Safespring Compute

{{< ingress >}}
Flavor is a pre-configured instance of a virtual machine with a specific combination of CPU, RAM, and storage.
{{< /ingress >}}

### Flavors with local NVMe disk
Discover our range of powerful virtual servers, with up to 32 vCPUs and 64 GB RAM, with NVMe storage up to 1,000 GB - priced from only €0.060 per hour or €42.72 per 30 days!

| Product ID        | vCPU | RAM (GB) | Local disk (GB) | Per hour     | Per 30 days |
|-------------------|:----:|:--------:|:---------------:|-------------:|------------:|
| FLAVOR-l2.c2r4.100|   2  |     4    |       100       | €0.060       | €42.72      |
| FLAVOR-l2.c2r4.500|   2  |     4    |       500       | €0.109       | €78.32      |
| FLAVOR-l2.c2r4.1000|  2  |     4    |      1000       | €0.171       | €122.82     |
| FLAVOR-l2.c4r8.100|   4  |     8    |       100       | €0.106       | €76.44      |
| FLAVOR-l2.c4r8.500|   4  |     8    |       500       | €0.156       | €112.04     |
| FLAVOR-l2.c4r8.1000|  4  |     8    |      1000       | €0.217       | €156.64     |
| FLAVOR-l2.c8r16.100|  8  |    16    |       100       | €0.200       | €144.18     |
| FLAVOR-l2.c8r16.500|  8  |    16    |       500       | €0.250       | €179.78     |
| FLAVOR-l2.c8r16.1000| 8  |    16    |      1000       | €0.312       | €224.38     |
| FLAVOR-l2.c16r32.100|16  |    32    |       100       | €0.388       | €278.96     |
| FLAVOR-l2.c16r32.500|16  |    32    |       500       | €0.438       | €314.56     |
| FLAVOR-l2.c16r32.1000|16 |    32    |      1000       | €0.499       | €359.16     |
| FLAVOR-l2.c16r64.500|16  |    64    |       500       | €0.656       | €471.00     |
| FLAVOR-l2.c32r64.1000|32 |    64    |      1000       | €0.875       | €628.64     |

### Flavors without local disk
Safespring offers a range of cost-effective virtual machines with varying vCPUs and RAM. Central block storage can be purchased for the instances.

| Product ID        | vCPU | RAM (GB) | Local disk (GB) | Per hour     | Per 30 days |
|-------------------|:----:|:--------:|:---------------:|-------------:|------------:|
| FLAVOR-b2. c1 r2  |   1  |     2    |        0        | €0.023       | €16.91      |
| FLAVOR-b2. c1 r4  |   1  |     4    |        0        | €0.037       | €26.70      |
| FLAVOR-b2. c2 r4  |   2  |     4    |        0        | €0.047       | €33.82      |
| FLAVOR-b2. c2 r8  |   2  |     8    |        0        | €0.074       | €53.40      |
| FLAVOR-b2 .c4 r8  |   4  |     8    |        0        | €0.094       | €67.64      |
| FLAVOR-b2. c4 r16 |   4  |    16    |        0        | €0.149       | €106.80     |
| FLAVOR-b2. c8 r16 |   8  |    16    |        0        | €0.188       | €135.28     |
| FLAVOR-b2. c8 r32 |   8  |    32    |        0        | €0.297       | €213.60     |
| FLAVOR-b2. c16 r32|  16  |    32    |        0        | €0.376       | €270.56     |
| FLAVOR-b2. c16 r64|  16  |    64    |        0        | €0.594       | €427.20     |

### Central Block Storage
Central block storage provides three copies of data spread out in a robust CEPH cluster. Get fast and reliable storage with Safespring from only €0.107 per GB per 30 days.

| Product ID     | Description                 | Per GB/hour   | Per GB/30 days |
|----------------|-----------------------------|--------------:|---------------:|
| VOLUME-large   | HDD-backed 3-replica Ceph   | €0.00015      | €0.107         |
| VOLUME-fast    | SSD-backed 3-replica Ceph   | €0.00045      | €0.320         |
<!--| VOLUME-snapshot | Snapshot of image            | €0.00015      | €0.107         |-->

{{< distance >}}


## Safespring Storage (S3)

{{< ingress >}}
Safespring offers two tailored S3 products for different storage needs: S3-archive for larger volumes over longer periods and S3-storage for applications that actively use the S3 protocol.
{{< /ingress >}}

| Product ID  | Explanation                                                    | Per TB in 30 days |
|-------------|----------------------------------------------------------------|------------------:|
| S3-archive  | Tailored for larger storage volumes over longer periods.       | €31.15            |
| S3-storage  | Tailored for applications that actively use the S3 protocol.   | €44.50            |

{{< distance >}}



## Safespring Backup

{{< ingress >}}
Safespring offers three different backup solutions. Prices per GB start as low as €0.082, providing you with high-quality backup at an affordable price.
{{< /ingress >}}

Safespring Backup offers data reduction technology in the service which typically reduces the data volume between 45%-90%. The price is set per protected GB on the client and per stored GB in the service after deduplication and compression. Additionally, 1TB is included in the fixed monthly price for BAAS-small.

{{% accordion title="Which plan is best?" %}}

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

| Product ID       | Fixed Monthly Price | Per GB in 30 days |
|------------------|---------------------|------------------:|
| BAAS-on.demand   | N/A                 | €0.22             |
| BAAS-small       | €489.50             | €0.16             |
| BAAS-large       | €845.50             | €0.08             |



## Network and Software

{{< ingress >}}
Safespring offers various software and licenses that can run on top of Safespring's cloud platform.
{{< /ingress >}}

### Network
Safespring offers IPv4 and IPv6 public IP addresses, data traffic (ingress and egress) at no extra cost, Reverse DNS names, and Bring Your Own IP prefixes. In addition, customers can request a quote for their managed load balancers which require their own servers.

| Product ID    | Type                         | Description                              | Billing per    | Per month      |
|---------------|------------------------------|------------------------------------------|----------------|---------------:|
| NET-publicv4  | IPv4                         | Public                                   | IP address     | €2.23          |
| NET-publicv6  | IPv6                         | Public                                   | N/A            | €0.00          |
| NET-ingress   | Data traffic                 |                                          | GB             | €0.00          |
| NET-egress    | Data traffic                 |                                          | GB             | €0.00          |
| NET-mgn.slb   | Managed SLB                  | Load balancers requiring their own servers | Instance     | Request quote  |

### Software and Licenses
Maximize your infrastructure with software optimized to run on Safespring's platform.

| Product ID         | Description                               | Billing per | Per month    |
|--------------------|-------------------------------------------|-------------|-------------:|
| SW-win.ser      | Windows Server                             | vCPU            | €15.58        |
| SW-ms.sql.ser   | Windows SQL Server standard                | vCPU (min 4vcpu)| €109.38      |
| SW-nextcloud       | Nextcloud Filesharing                     | N/A         | Request quote|
| SW-suse.linux      | SUSE Linux Enterprise Server, 12x5 Support| N/A         | Request quote|

### Platform Services
We offer complete management of your Kubernetes environments, including regulatory compliance, with Compliant Kubernetes. Additionally, Managed Elasticsearch, NATS, MariaDB, and Redis are offered. Request a quote today to access these services!

| Product ID            | Description                                         | Per month     |
|-----------------------|-----------------------------------------------------|--------------:|
| PAAS-man.kubernetes24 | Managed Compliant Kubernetes 24/7                   | Request quote |
| PAAS-man.kubernetes8  | Managed Compliant Kubernetes 8/5                    | Request quote |
| PAAS-man.elasticsearch| Managed Elasticsearch (included in Compliant Kubernetes)| Request quote|
| PAAS-openshift        | No support                                          | Request quote |
| PAAS-man.nats         | Managed NATS                                        | Request quote |
| PAAS-man.mariadb      | Managed MariaDB                                     | Request quote |
| PAAS-man.redis        | Managed Redis                                       | Request quote |

## Support and Consulting Services

{{< ingress >}}
We offer various levels of support for cloud infrastructure. In addition, we offer experienced consultants and project managers at competitive prices.
{{< /ingress >}}

| Product ID        | Description                                                   | Billing per   | Price           |
|-------------------|---------------------------------------------------------------|---------------|----------------:|
| SUPPORT-base      | Support for Safespring's services                              | N/A           | €0.00           |
| SUPPORT-standard  | Access to backchannel chat room with support and engineering  | Total volume  | 3% of total volume |
| SUPPORT-premium   | Dedicated Service Manager with quarterly operations meetings  | Hour          | Request quote   |

### Consulting Services
Access our experienced consultants and project managers to optimize your cloud infrastructure at competitive prices, with junior experts starting at €100.43 per hour and senior experts reaching up to €122.38 per hour.

| Product ID        | Description                                                     | Billing per | Price       |
|-------------------|-----------------------------------------------------------------|-------------|------------:|
| PS-consult.jun    | Cloud Infrastructure Consultant, junior expertise level         | Hour        | €100.43    |
| PS-consult.sen    | Cloud Infrastructure Consultant, senior expertise level         | Hour        | €122.38    |
| PS-cloudarch.jun  | Cloud Infrastructure Architect Consultant, junior expertise level| Hour        | €113.55    |
| PS-cloudarch.sen  | Cloud Infrastructure Architect Consultant, senior expertise level| Hour        | €122.38    |
| PS-pm.jun         | Project Manager, junior expertise level                         | Hour        | €101.23    |
| PS-pm.sen         | Project Manager, senior expertise level                         | Hour        | €122.38    |

### Training
Learn all about modern IT services with Safespring's course packages, including introductions to "infrastructure as a service" and cloud infrastructure technology, as well as in-depth courses on cloud strategy and modern DevOps with "microservices". Request a quote today to take your business to the next level!

| Product ID             | Description                                  | Length     | Billing per | Price        |
|------------------------|----------------------------------------------|------------|-------------|-------------:|
| COURSE-intro.iaas      | Introduction to "infrastructure as a service"| One day    | Occasion    | Request quote|
| COURSE-cxo.strategy    | Cloud strategy for management teams,         | One day    | Occasion    | Request quote|
| COURSE-intro.cloud     | Introduction to cloud infrastructure technology, | Four days | Occasion   | Request quote|
| COURSE-devops.microservices | Modern DevOps and "microservices"       | Four days  | Occasion    | Request quote|