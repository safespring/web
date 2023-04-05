---
title: "Infrastructure as a service (IaaS)"
language: "En"
cardtitle: "Infrastructure"
cardicon: "fa-solid fa-server"
cardcolor: "#195F8C"
cardorder: "01"
date: 2023-02-28
draft: false
intro: "With IaaS you can scale your infrastructure up or down as needed."
cardintro: ""
background: "safespring-compute-background.svg"
form: "no"
sidebarlinkname: "Back to all categories"
sidebarlinkurl: "/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "Safespring Service Catalogue"
socialmedia: "/safespring-start.jpg"
toc: ""
---


{{< ingress >}}
On this page, you'll find information about our Infrastructure as a Service (IaaS) cloud compute services, including detailed configurations and categories of compute services available.
{{< /ingress >}}

Cloud compute services contains the following categories (OpenStack flavors):

1. [Basic compute](#1-basic-compute)
1. [Memory Optimized compute](#2-memory-optimized-compute)
1. [Basic compute with local NVMe disk](#3-basic-compute-with-local-nvme-disk)
1. [Memory Optimized compute with GPU and local NVMe disk](#5-memory-optimized-compute-with-gpu-and-local-nvme-disk)
1. [Bare Metal Compute](#6-bare-metal-compute)

Base disks are default root disk sizes unless a volume with a different size is specified when deploying an image. Ephemeral disks are extra local storage devices accessible to a virtual machine on a specific hypervisor, for flavor types where applicable.

{{% note "Larger flavors" %}}
If you haven't found the ideal flavor for your service, don't worry! We offer a range of larger flavors that are not currently available on the platform. To learn more, please reach out to Safespring at [hello@safespring.com](mailto:hello@safespring.com).
{{% /note %}}

## 1. Basic Compute
The basic compute profile offers a 1:2 vCPU to RAM ratio, which means that for every virtual CPU allocated, there are two gigabytes of RAM available. This profile has HyperThreading disabled on the hypervisors and does not include ephemeral storage. Additionally, the CPU oversubscription ratio is limited to a maximum of 1:4, ensuring that there is no more than four times the number of virtual CPUs than physical CPUs available on the host.

### 1.1. Prerequisites
None.

### 1.2. Configurations

| Produkt Code         | vCPU | RAM (GB) | Local disk (GB) |
|--------------------|------|----------|-----------------|
| FLAVOR-b2. c1 r2   | 1    | 2        | 0               |
| FLAVOR-b2. c2 r4   | 2    | 4        | 0               |
| FLAVOR-b2 .c4 r8   | 4    | 8        | 0               |
| FLAVOR-b2. c8 r16  | 8    | 16       | 0               |
| FLAVOR-b2. c16 r32 | 16   | 32       | 0               |

## 2. Memory Optimized Compute
The memory optimized compute profile provides a 1:4 vCPU to RAM ratio, which means that for every virtual CPU allocated, there are four gigabytes of RAM available. This profile also has HyperThreading disabled on the hypervisors and does not include ephemeral storage. In addition, the CPU oversubscription ratio is limited to a maximum of 1:6, ensuring that there are no more than six times the number of virtual CPUs than physical CPUs available on the host.

### 2.1. Prerequisites
None.

### 2.2. Configurations

| Produkt Code         | vCPU | RAM (GB) | Local disk (GB) |
|--------------------|------|----------|-----------------|
| FLAVOR-b2. c1 r4   | 1    | 4        | 0               |
| FLAVOR-b2. c2 r8   | 2    | 8        | 0               |
| FLAVOR-b2. c4 r16  | 4    | 16       | 0               |
| FLAVOR-b2. c8 r32  | 8    | 32       | 0               |
| FLAVOR-b2. c16 r64 | 16   | 64       | 0               |

## 3. Basic Compute with local NVMe disk
The basic compute with local NVMe disk profile offers a 1:2 vCPU to RAM ratio, meaning that for every virtual CPU allocated, there are two gigabytes of RAM available. This profile includes local ephemeral NVMe storage options. The CPU oversubscription ratio is set to a maximum of 1:3, meaning that there can be up to three virtual CPUs for every physical CPU available on the host.

### 3.1. Prerequisites
None.

### 3.2. Configurations

| Produkt Code             | vCPU | RAM (GB) | Local disk (GB)           |
|--------------------------|------|----------|---------------------------|
| FLAVOR-l2. c2 r4. 100    | 2    | 4        |                      100  |
| FLAVOR-l2. c2 r4. 500    | 2    | 4        |                     500   |
| FLAVOR-l2. c2 r4. 1000   | 2    | 4        |                  1 000    |
| FLAVOR-l2. c4 r8. 100    | 4    | 8        |                      100  |
| FLAVOR-l2. c4 r8. 500    | 4    | 8        |                     500   |
| FLAVOR-l2. c4 r8. 1000   | 4    | 8        |                  1 000    |
| FLAVOR-l2. c8 r16. 100   | 8    | 16       |                      100  |
| FLAVOR-l2. c8 r16. 500   | 8    | 16       |                     500   |
| FLAVOR-l2. c8 r16. 1000  | 8    | 16       |                  1 000    |
| FLAVOR-l2. c16 r32. 100  | 16   | 32       |                      100  |
| FLAVOR-l2. c16 r32. 500  | 16   | 32       |                     500   |
| FLAVOR-l2. c16 r32. 1000 | 16   | 32       |                  1 000    |
| FLAVOR-l2. c32 r64.1000  | 32   | 64       |                  1 000    |


## 4. Memory Optimized Compute with GPU and local NVMe disk
The memory optimized compute with local NVMe disk profile provides a 1:2 vCPU to RAM ratio, which means that for every virtual CPU allocated, there are two gigabytes of RAM available. This profile includes local ephemeral NVMe storage, which is provisioned with IOPS. The CPU oversubscription ratio is set to 1:1, meaning that there can be no more virtual CPUs than physical CPUs available on the host.

### 4.1. Prerequisites
None.

### 4.2. Configurations

| Product Code            | Instance type  | vCPU | Memory  | Base Disk | Extra disk | Provisioned IOPs (R/W) |
|-------------------------|----------------|------|---------|-----------|------------|------------------------|
| FLAVOR-glm.large.1d   | glm.large.1d   | 4    | 16 GB  | 80 GB     | 170 GB     | 4k/8k, 8.5k/17k        |
| FLAVOR-glm.xlarge.2d  | glm.xlarge.2d  | 8    | 32 GB  | 80 GB     | 420 GB     | 4k/8k, 21k/42k         |
| FLAVOR-glm.2xlarge.4d | glm.2xlarge.4d | 16   | 64 GB  | 80 GB     | 920 GB     | 4k/8k, 46k/92k         |
| FLAVOR-glm.4xlarge.8d | glm.4xlarge.8d | 32   | 128 GB | 80 GB     | 1920 GB    | 4k/8k, 96k/192k        |

## 5. Bare Metal Compute
The bare metal compute type is a physical server that is provisioned for your exclusive use. Only the provided OS images are fully supported, but documentation is available to assist in preparing an OS image for use with the bare metal server. If the order exceeds the available capacity, the delivery time will depend on the hardware delivery times of our suppliers.

### 5.1. Prerequisites
None.

### 5.2. Configurations

| Product Code            | Instance type  | CPU (p)core | Memory  | NVMe Disk  |
|-------------------------|----------------|-------------|---------|------------|
| FLAVOR-p1.2xlarge.16d | p1.2xlarge.16d | 16          | 128 GB | 3,8 TB     |
| FLAVOR-p1.4xlarge.16d | p1.4xlarge.16d | 32          | 256 GB | 3,8 TB     |
| FLAVOR-p1.8xlarge.32d | p1.8xlarge.32d | 2 x 32      | 512 GB | 2 x 3,8 TB |

## 6. Volumes Storage
We provide volume storage through Ceph clusters consisting of both HDD and SSD storage.

### 6.1. Prerequisites
You can attach a volume to a server instance, including as a root disk volume.

### 6.2. Configurations

| Product Code | Volume type | Site  | Characteristics              |
|--------------|-------------|-------|------------------------------|
| VOLUME-fast  | Fast        | osl1  | SSD-backed 3-replica Ceph    |
| VOLUME-large | Large       | osl1  | HDD-backed 3-replica Ceph    |
| VOLUME-fast  | Fast        | sto1  | SSD-backed 3-replica Ceph    |
| VOLUME-large | Large       | sto1  | HDD-backed 3-replica Ceph    |
| VOLUME-snapshot	| Snapshot of image | - | - |


