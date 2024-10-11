---
title: "Cloud Compute Service"
language: "En"
cardtitle: "Cloud Compute"
cardicon: "fa-solid fa-server"
cardcolor: "#195F8C"
cardorder: "01"
date: 2024-10-10
draft: false
intro: "On this page, you'll find information about our Infrastructure as a Service (IaaS) cloud compute services, including detailed configurations and categories of compute services available."
cardintro: "With IaaS you can scale your infrastructure up or down as needed."
background: "safespring-compute-background.svg"
form: "no"
sidebarlinkname: "Back to all categories"
sidebarlinkurl: "/geant/service-catalogue"
sidebarlinkname2: "See price for compute"
sidebarlinkurl2: "/geant/price/#safespring-compute"
socialmedia: "safespring-compute.jpg"
section: "Safespring Service Catalogue"
socialmedia: "/safespring-start.jpg"
toc: "On this page"
noindex: "x"
---


{{< ingress >}}
On this page, you'll find information about our Infrastructure as a Service (IaaS) cloud compute services, including detailed configurations and categories of compute services available.
{{< /ingress >}}


Cloud compute services contains the following categories (OpenStack flavors):

- Compute with local NVMe storage (‘**L2**’)
- Compute (‘**B2**’)

Base disks are default root disk sizes unless a volume with a different size is specified when deploying an image. Ephemeral disks are extra local storage devices accessible to a virtual machine on a specific hypervisor, for flavour types where applicable.

## Compute with local NVMe storage

The compute with local NVMe disk profile has both 1:2 and 1:4 vCPU:RAM ratio profiles. It comes with choices of local ephemeral NVMe storage.  The term ephemeral means that the storage has the life time of the instance and is only stored with one copy on the local disk on the compute node where the instance is running. This makes the instances well suited for automated setup, where a loss of a separate instance is easily handled with provisioning or cluster member for databases or Kubernetes worker nodes.

### Prerequisites
None.

### Configurations

| Product Code             | vCPU | Memory | Ephemeral disk |
|--------------------------|------|--------|----------------|
| FLAVOR-l2. c2 r4. 100    | 2    | 4 GiB  | 100 GB         |
| FLAVOR-l2. c2 r4. 500    | 2    | 4 GiB  | 500 GB         |
| FLAVOR-l2. c2 r4. 1000   | 2    | 4 GiB  | 1000 GB        |
| FLAVOR-l2. c4 r8. 100    | 4    | 8 GiB  | 100 GB         |
| FLAVOR-l2. c4 r8. 500    | 4    | 8 GiB  | 500 GB         |
| FLAVOR-l2. c4 r8. 1000   | 4    | 8 GiB  | 1000 GB        |
| FLAVOR-l2. c8 r16. 100   | 8    | 16 GiB | 100 GB         |
| FLAVOR-l2. c8 r16. 500   | 8    | 16 GiB | 500 GB         |
| FLAVOR-l2. c8 r16. 1000  | 8    | 16 GiB | 1000 GB        |
| FLAVOR-l2. c16 r32. 100  | 16   | 32 GiB | 100 GB         |
| FLAVOR-l2. c16 r32. 500  | 16   | 32 GiB | 500 GB         |
| FLAVOR-l2. c16 r32. 1000 | 16   | 32 GiB | 1000 GB        |
| FLAVOR-l2. c16 r64. 500  | 16   | 64 GiB | 500 GB         |
| FLAVOR-l2. c32 r64. 1000 | 32   | 64 GiB | 1000 GB        |

### Compute without local storage

The basic compute profile comes with both 1:2 and 1:4 vCPU:RAM ratio profiles. It does not have ephemeral storage and must be created with a backing volume from the central storage service.  

#### Prerequisites
None.

#### Configuration

| Product Code        | vCPU | Memory |
|---------------------|------|--------|
| FLAVOR-b2. c1 r2    | 1    | 2 GiB  |
| FLAVOR-b2. c1 r4    | 1    | 4 GiB  |
| FLAVOR-b2. c2 r4    | 2    | 4 GiB  |
| FLAVOR- b2. c2 r8   | 2    | 8 GiB  |
| FLAVOR- b2. c4 r8   | 4    | 8 GiB  |
| FLAVOR- b2. c4 r16  | 4    | 16 GiB |
| FLAVOR- b2. c8 r16  | 8    | 16 GiB |
| FLAVOR- b2. c8 r32  | 8    | 32 GiB |
| FLAVOR- b2. c16 r32 | 16   | 32 GiB |
| FLAVOR- b2. c16 r64 | 16   | 64 GiB |

### Central block storage

Central block storage is provided by Ceph HDD and SSD clusters.

#### Prerequisites
Server instance to attach volume to, including as a root disk volume.

#### Configurations

| Product Code    | Characteristics                                                                                                  |
|-----------------|------------------------------------------------------------------------------------------------------------------|
| VOLUME-large    | HDD-backed 3-replica Ceph                                                                                        |
| VOLUME-fast     | SSD-backed 3-replica Ceph                                                                                        |
| VOLUME-snapshot | SDD or HDD based on source.   Copy on write, which only saves the difference from when the snapshot was   taken. |

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Get in contact with Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Sales:" >}} +46855107370 or sales@safespring.se
{{% /custom-card %}}

