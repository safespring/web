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
toc: "On this page"
aliases:
- /service-catalogue/infrastructure/
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


## 4. Compute with GPU and local NVME disk
The memory optimized compute with local NVME disk profile has a 1:4 vCPU:RAM ratio profile. It comes with local ephemeral NVME storage. The CPU oversubscription ratio is 1:1. The local storage is IOPS provisioned.

### 4.1. Prerequisites
None.

### 4.2. Configurations

| Product Code         | Instance type  | vCPU | Memory | Base Disk | Provisioned IOPs (R/W)  |
|----------------------|----------------|------|--------|-----------|-------------------------|
| FLAVOR-g2 .c4 r8. 100   | g2.c4r8.100    | 4    | 16 GiB | 100 GB    | 4k/8k, 8.5k/17k         |
| FLAVOR-g2 .c8 r32. 500  | g2.c8r32.500   | 8    | 32 GiB | 500 GB    | 4k/8k, 21k/42k          |
| FLAVOR-g2 .c16 r64. 1000| g2.c16r64.1000 | 16   | 64 GiB | 1000 GB   | 4k/8k, 46k/92k          |


## 5. Bare Metal Compute
The bare metal compute type is a provisioned physical server. Only the provided OS images are fully supported, although documentation on how to prepare an OS image for the bare metal server are also provided. If order exceed available capacity, lead times in delivery depend on supplier hardware delivery times.

### 5.1. Prerequisites
None.

### 5.2. Configurations

| Product Code             | Instance type    | CPU (p)core | Memory | NVME Disk   |
|--------------------------|------------------|-------------|--------|-------------|
| FLAVOR-p1. c16 r128. 4000| p1.c16r128.4000  | 16          | 128 GiB| 3,8 TB      |
| FLAVOR-p1. c32 r256. 4000| p1.c32r256.4000  | 32          | 256 GiB| 3,8 TB      |
| FLAVOR-p1. c64 r512. 8000| p1.c64r512.8000  | 2 x 32      | 512 GiB| 2 x 3,8 TB  |


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


