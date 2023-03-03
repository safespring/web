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
This page provides information about Infrastructure as a Service (IaaS) cloud compute services. In this page, we will provide details on the different categories of compute services and their configurations.
{{< /ingress >}}

Cloud compute services contains the following categories (OpenStack flavors):

1. [Basic compute](#1-basic-compute)
1. [Memory Optimized compute](#2-memory-optimized-compute)
1. [Basic compute with local NVMe disk](#3-basic-compute-with-local-nvme-disk)
1. [Memory Optimized compute with local NVMe disk](#4-memory-optimized-compute-with-local-nvme-disk)
1. [Memory Optimized compute with GPU and local NVMe disk](#5-memory-optimized-compute-with-gpu-and-local-nvme-disk)
1. [Bare Metal Compute](#6-bare-metal-compute)

Base disks are default root disk sizes unless a volume with a different size is specified when deploying an image. Ephemeral disks are extra local storage devices accessible to a virtual machine on a specific hypervisor, for flavor types where applicable.

## 1. Basic Compute
The basic compute profile is a 1:2 vCPU:RAM ratio profile. Hypervisors have HyperThreading disabled. It does not have ephemeral storage. The CPU oversubscription ratio is maximum 1:4.

### 1.1. Prerequisites
None.

### 1.2. Configurations

| Product Code       | Instance type | vCPU | Memory | Base Disk |
|--------------------|---------------|------|--------|-----------|
| INSTANCE-b.tiny    | b.tiny        | 1    | 1 GiB  | 40 GB     |
| INSTANCE-b.small   | b.small       | 1    | 2 GiB  | 40 GB     |
| INSTANCE-b.medium  | b.medium      | 2    | 4 GiB  | 40 GB     |
| INSTANCE-b.large   | b.large       | 4    | 8 GiB  | 40 GB     |
| INSTANCE-b.xlarge  | b.xlarge      | 8    | 16 GiB | 40 GB     |
| INSTANCE-b.2xlarge | b.2xlarge     | 16   | 32 GiB | 40 GB     |


## 2. Memory Optimized Compute
The memory optimized compute profile is a 1:4 vCPU:RAM ratio profile. Hypervisors have HyperThreading disabled. It does not have ephemeral storage. The CPU oversubscription ratio is maximum 1:6.

### 2.1. Prerequisites
None.

### 2.2. Configurations

| Product Code       | Instance type | vCPU | Memory | Base Disk | Ephemeral disk |
|--------------------|---------------|------|--------|-----------|----------------|
| INSTANCE-m.small   | m.small       | 1    | 4 GiB  | 40 GB     | -              |
| INSTANCE-m.medium  | m.medium      | 2    | 8 GiB  | 40 GB     | -              |
| INSTANCE-m.large   | m.large       | 4    | 16 GiB | 40 GB     | -              |
| INSTANCE-m.xlarge  | m.xlarge      | 8    | 32 GiB | 40 GB     | -              |
| INSTANCE-m.2xlarge | m.2xlarge     | 16   | 64 GiB | 40 GB     | -              |

## 3. Basic Compute with local NVMe disk
The basic compute with local NVMe disk profile has a 1:2 vCPU:RAM ratio profile. It comes with choices of local ephemeral NVMe storage. The CPU oversubscription ratio (vCPU:pCPU) is 1:3.

### 3.1. Prerequisites
None.

### 3.2. Configurations

| Product Code           | Instance type | vCPU | Memory | Base Disk | Extra disk |
|------------------------|---------------|------|--------|-----------|------------|
| INSTANCE-lb.tiny       | lb.tiny       | 1    | 1 GiB  | 80 GB     | -          |
| INSTANCE-lb.large.1d   | lb.large.1d   | 4    | 8 GiB  | 80 GB     | 170 GB     |
| INSTANCE-lb.xlarge.1d  | lb.xlarge.1d  | 8    | 16 GiB | 80 GB     | 170 GB     |
| INSTANCE-lb.2xlarge.1d | lb.2xlarge.1d | 16   | 32 GiB | 80 GB     | 170 GB     |
| INSTANCE-lb.2xlarge.2d | lb.2xlarge.2d | 16   | 32 GiB | 80 GB     | 420 GB     |
| INSTANCE-lb.2xlarge.4d | lb.2xlarge.4d | 16   | 32 GiB | 80 GB     | 920 GB     |
| INSTANCE-lb.4xlarge.1d | lb.4xlarge.1d | 32   | 64 GiB | 80 GB     | 170 GB     |
| INSTANCE-lb.4xlarge.2d | lb.4xlarge.2d | 32   | 64 GiB | 80 GB     | 420 GB     |
| INSTANCE-lb.4xlarge.4d | lb.4xlarge.4d | 32   | 64 GiB | 80 GB     | 920 GB     |

## 4. Memory Optimized Compute with local NVMe disk
The memory optimized compute with local NVMe disk profile has a 1:2 vCPU:RAM ratio profile. It comes with choices of local ephemeral NVMe storage. The CPU oversubscription ratio (vCPU:pCPU) is 1:3.

### 4.1. Prerequisites
None.

### 4.2. Configurations

| Product Code           | Instance type | vCPU | Memory  | Base Disk | Extra disk |
|------------------------|---------------|------|---------|-----------|------------|
| INSTANCE-lm.large.1d   | lm.large.1d   | 4    | 16 GiB  | 80 GB     | 170 GB     |
| INSTANCE-lm.xlarge.1d  | lm.xlarge.1d  | 8    | 32 GiB  | 80 GB     | 170 GB     |
| INSTANCE-lm.xlarge.2d  | lm.xlarge.2d  | 8    | 32 GiB  | 80 GB     | 420 GB     |
| INSTANCE-lm.xlarge.4d  | lm.xlarge.4d  | 8    | 32 GiB  | 80 GB     | 920 GB     |
| INSTANCE-lm.2xlarge.1d | lm.2xlarge.1d | 16   | 64 GiB  | 80 GB     | 170 GB     |
| INSTANCE-lm.2xlarge.2d | lm.2xlarge.2d | 16   | 64 GiB  | 80 GB     | 420 GB     |
| INSTANCE-lm.2xlarge.4d | lm.2xlarge.4d | 16   | 64 GiB  | 80 GB     | 920 GB     |
| INSTANCE-lm.4xlarge.1d | lm.4xlarge.1d | 32   | 128 GiB | 80 GB     | 170 GB     |
| INSTANCE-lm.4xlarge.2d | lm.4xlarge.2d | 32   | 128 GiB | 80 GB     | 420 GB     |
| INSTANCE-lm.4xlarge.4d | lm.4xlarge.4d | 32   | 128 GiB | 80 GB     | 920 GB     |

## 5. Memory Optimized Compute with GPU and local NVMe disk
The memory optimized compute with local NVMe disk profile has a 1:2 vCPU:RAM ratio profile. It comes with local ephemeral NVMe storage. The CPU oversubscription ratio is 1:1. The local storage is IOPS provisioned.

### 5.1. Prerequisites
None.

### 5.2. Configurations

| Product Code            | Instance type  | vCPU | Memory  | Base Disk | Extra disk | Provisioned IOPs (R/W) |
|-------------------------|----------------|------|---------|-----------|------------|------------------------|
| INSTANCE-glm.large.1d   | glm.large.1d   | 4    | 16 GiB  | 80 GB     | 170 GB     | 4k/8k, 8.5k/17k        |
| INSTANCE-glm.xlarge.2d  | glm.xlarge.2d  | 8    | 32 GiB  | 80 GB     | 420 GB     | 4k/8k, 21k/42k         |
| INSTANCE-glm.2xlarge.4d | glm.2xlarge.4d | 16   | 64 GiB  | 80 GB     | 920 GB     | 4k/8k, 46k/92k         |
| INSTANCE-glm.4xlarge.8d | glm.4xlarge.8d | 32   | 128 GiB | 80 GB     | 1920 GB    | 4k/8k, 96k/192k        |

## 6. Bare Metal Compute
The bare metal compute type is a provisioned physical server. Only the provided OS images are fully supported, although documentation on how to prepare an OS image for the bare metal server are also provided. If order exceed available capacity, lead times in delivery depend on supplier hardware delivery times.

### 6.1. Prerequisites
None.

### 6.2. Configurations

| Product Code            | Instance type  | CPU (p)core | Memory  | NVMe Disk  |
|-------------------------|----------------|-------------|---------|------------|
| INSTANCE-p1.2xlarge.16d | p1.2xlarge.16d | 16          | 128 GiB | 3,8 TB     |
| INSTANCE-p1.4xlarge.16d | p1.4xlarge.16d | 32          | 256 GiB | 3,8 TB     |
| INSTANCE-p1.8xlarge.32d | p1.8xlarge.32d | 2 x 32      | 512 GiB | 2 x 3,8 TB |

## 7. Volumes Storage
Volume storage is provided by Ceph HDD and SSD clusters.

### 7.1. Prerequisites
Server instance to attach volume to, including as a root disk volume.

### 7.2. Configurations

| Product Code | Volume type | Site  | Characteristics              |
|--------------|-------------|-------|------------------------------|
| VOLUME-fast  | Fast        | osl1  | SSD-backed 3-replica Ceph    |
| VOLUME-large | Large       | osl1  | HDD-backed 3-replica Ceph    |
| VOLUME-fast  | Fast        | sto1  | SSD-backed 3-replica Ceph    |
| VOLUME-large | Large       | sto1  | HDD-backed 3-replica Ceph    |


