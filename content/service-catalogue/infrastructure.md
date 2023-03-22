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

{{% note "Update" %}}
Please note that the information on this page is currently being updated. For the most up-to-date information, please contact Safespring at [hello@safespring.com](mailto:hello@safespring.com).
{{% /note %}}


{{< ingress >}}
This page provides information about Infrastructure as a Service (IaaS) cloud compute services. In this page, we will provide details on the different categories of compute services and their configurations.
{{< /ingress >}}

Cloud compute services contains the following categories (OpenStack flavors):

1. [Basic compute](#1-basic-compute)
1. [Memory Optimized compute](#2-memory-optimized-compute)
1. [Basic compute with local NVMe disk](#3-basic-compute-with-local-nvme-disk)
1. [Memory Optimized compute with GPU and local NVMe disk](#5-memory-optimized-compute-with-gpu-and-local-nvme-disk)
1. [Bare Metal Compute](#6-bare-metal-compute)

Base disks are default root disk sizes unless a volume with a different size is specified when deploying an image. Ephemeral disks are extra local storage devices accessible to a virtual machine on a specific hypervisor, for flavor types where applicable.

## 1. Basic Compute
The basic compute profile is a 1:2 vCPU:RAM ratio profile. Hypervisors have HyperThreading disabled. It does not have ephemeral storage. The CPU oversubscription ratio is maximum 1:4.

### 1.1. Prerequisites
None.

### 1.2. Configurations

| Product Code         | vCPU | Memory | Base Disk |
|----------------------|------|--------|-----------|
| INSTANCE-b2. c1 r2   | 1    | 2 GiB  | 0         |
| INSTANCE-b2. c2 r4   | 2    | 4 GiB  | 0         |
| INSTANCE-b2. c4 r8   | 4    | 8 GiB  | 0         |
| INSTANCE-b2. c8 r16  | 8    | 16 GiB | 0         |
| INSTANCE-b2. c16 r32 | 16   | 32 GiB | 0         |


## 2. Memory Optimized Compute
The memory optimized compute profile is a 1:4 vCPU:RAM ratio profile. Hypervisors have HyperThreading disabled. It does not have ephemeral storage. The CPU oversubscription ratio is maximum 1:6.

### 2.1. Prerequisites
None.

### 2.2. Configurations

| Product Code         | vCPU | Memory | Base Disk |
|----------------------|------|--------|-----------|
| INSTANCE-b2. c1 r4   | 1    | 4 GiB  | 0         |
| INSTANCE-b2. c2 r8   | 2    | 8 GiB  | 0         |
| INSTANCE-b2. c4 r16  | 4    | 16 GiB | 0         |
| INSTANCE-b2. c8 r32  | 8    | 32 GiB | 0         |
| INSTANCE-b2. c16 r64 | 16   | 64 GiB | 0         |

## 3. Basic Compute with local NVMe disk
The basic compute with local NVMe disk profile has a 1:2 vCPU:RAM ratio profile. It comes with choices of local ephemeral NVMe storage. The CPU oversubscription ratio (vCPU:pCPU) is 1:3.

### 3.1. Prerequisites
None.

### 3.2. Configurations

| Product Code               | vCPU | Memory | Base Disk |
|----------------------------|------|--------|-----------|
| INSTANCE-l2. c2 r4. 100    | 2    | 4 GiB  | 100       |
| INSTANCE-l2. c2 r4. 500    | 2    | 4 GiB  | 500       |
| INSTANCE-l2. c2 r4. 1000   | 2    | 4 GiB  | 1 000     |
| INSTANCE-l2. c4 r8. 100    | 4    | 8 GiB  | 100       |
| INSTANCE-l2. c4 r8. 500    | 4    | 8 GiB  | 500       |
| INSTANCE-l2. c4 r8. 1000   | 4    | 8 GiB  | 1 000     |
| INSTANCE-l2. c8 r16. 100   | 8    | 16 GiB | 100       |
| INSTANCE-l2. c8 r16. 500   | 8    | 16 GiB | 500       |
| INSTANCE-l2. c8 r16. 1000  | 8    | 16 GiB | 1 000     |
| INSTANCE-l2. c16 r32. 100  | 16   | 32 GiB | 100       |
| INSTANCE-l2. c16 r32. 500  | 16   | 32 GiB | 500       |
| INSTANCE-l2. c16 r32. 1000 | 16   | 32 GiB | 1 000     |


## 4. Memory Optimized Compute with GPU and local NVMe disk
The memory optimized compute with local NVMe disk profile has a 1:2 vCPU:RAM ratio profile. It comes with local ephemeral NVMe storage. The CPU oversubscription ratio is 1:1. The local storage is IOPS provisioned.

### 4.1. Prerequisites
None.

### 4.2. Configurations

| Product Code            | Instance type  | vCPU | Memory  | Base Disk | Extra disk | Provisioned IOPs (R/W) |
|-------------------------|----------------|------|---------|-----------|------------|------------------------|
| INSTANCE-glm.large.1d   | glm.large.1d   | 4    | 16 GiB  | 80 GB     | 170 GB     | 4k/8k, 8.5k/17k        |
| INSTANCE-glm.xlarge.2d  | glm.xlarge.2d  | 8    | 32 GiB  | 80 GB     | 420 GB     | 4k/8k, 21k/42k         |
| INSTANCE-glm.2xlarge.4d | glm.2xlarge.4d | 16   | 64 GiB  | 80 GB     | 920 GB     | 4k/8k, 46k/92k         |
| INSTANCE-glm.4xlarge.8d | glm.4xlarge.8d | 32   | 128 GiB | 80 GB     | 1920 GB    | 4k/8k, 96k/192k        |

## 5. Bare Metal Compute
The bare metal compute type is a provisioned physical server. Only the provided OS images are fully supported, although documentation on how to prepare an OS image for the bare metal server are also provided. If order exceed available capacity, lead times in delivery depend on supplier hardware delivery times.

### 5.1. Prerequisites
None.

### 5.2. Configurations

| Product Code            | Instance type  | CPU (p)core | Memory  | NVMe Disk  |
|-------------------------|----------------|-------------|---------|------------|
| INSTANCE-p1.2xlarge.16d | p1.2xlarge.16d | 16          | 128 GiB | 3,8 TB     |
| INSTANCE-p1.4xlarge.16d | p1.4xlarge.16d | 32          | 256 GiB | 3,8 TB     |
| INSTANCE-p1.8xlarge.32d | p1.8xlarge.32d | 2 x 32      | 512 GiB | 2 x 3,8 TB |

## 6. Volumes Storage
Volume storage is provided by Ceph HDD and SSD clusters.

### 6.1. Prerequisites
Server instance to attach volume to, including as a root disk volume.

### 6.2. Configurations

| Product Code | Volume type | Site  | Characteristics              |
|--------------|-------------|-------|------------------------------|
| VOLUME-fast  | Fast        | osl1  | SSD-backed 3-replica Ceph    |
| VOLUME-large | Large       | osl1  | HDD-backed 3-replica Ceph    |
| VOLUME-fast  | Fast        | sto1  | SSD-backed 3-replica Ceph    |
| VOLUME-large | Large       | sto1  | HDD-backed 3-replica Ceph    |
| VOLUME-snapshot	| Snapshot of image | - | - |


