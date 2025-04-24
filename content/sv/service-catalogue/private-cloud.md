---
title: "Private Cloud"
language: "en"
cardtitle: "Private Cloud"
cardicon: "fa-solid fa-shield-check"
cardcolor: "#195F8C"
cardorder: "06"
date: 2023-02-28
draft: false
intro: "Complete offer including hardware, operations and software maintenance."
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
- /service-catalogue/private-cloud/
---

{{< ingress >}}
Complete offer for Private Cloud deployment, including hardware, operations and software maintenance.
{{< /ingress >}}

IaaS base offer includes Control Plane and Compute Service with local instance storage only.
Options include Elastic Block Storage (Ceph cluster) and accelerated compute nodes (typically GPU).
STaaS base offer includes Control Plane and storage nodes of either HDD or NVME type.

Storage interfaces include RADOS, S3 via Rados Gateway, Rados Block Device or iSCSI/NFS via storage proxy.

## Private Cloud – IaaS

The IaaS base configuration is for deployment in a dedicated rack space, preferably with room to grow. The ToR switches are based on 32x100 Gbps and scale to 24 compute or storage nodes due to 4 interfaces being reserved for control plane, 2 for interswitch-links, 2 for uplinks.

If multi-rack deployment additional ports required for cross-connect. Compute Node configuration (CPU, RAM, local NVME) per customer specification.

### Prerequisites

None.

### Private Cloud – IaaS Base configuration

<table class="width100">
  <thead>
    <tr>
      <th>Node type</th>
      <th>Nodes</th>
      <th>Rack Units/item</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Top-of-Rack switch</td>
      <td>2</td>
      <td>1</td>
    </tr>
    <tr>
      <td>Management switch</td>
      <td>2</td>
      <td>1</td>
    </tr>
    <tr>
      <td>Control Plane (4 server / 2RU)</td>
      <td>3</td>
      <td>2</td>
    </tr>
    <tr>
      <td>Compute Node</td>
      <td>3</td>
      <td>2</td>
    </tr>
  </tbody>
</table>

### Private Cloud – IaaS Base product components

| Product Code              | Component                                     | Rack Units |
| ------------------------- | --------------------------------------------- | ---------- |
| PRIVATECLOUD-compute.base | IaaS Compute Base configuration               | 12         |
| PRIVATECLOUD-compute.add  | IaaS Compute Additional nodes (4 per chassis) | 2          |

## Private Cloud – IaaS Volumes Option

The IaaS Volumes option adds NVME, HDD or both elastic storage to the Private IaaS deployment. It reuses the switches and control plane of the Private IaaS deployment. The ToR switches are based on 32x100 Gbps and scale to 24 compute or storage nodes due to four (4) interfaces being reserved for control plane, two (2) for interswitch-links, two (2) for uplinks.

If multi-rack deployment additional ports required for cross-connect. Storage interface is Rados Block Device (RBD) to compute hypervisor. HDD Storage Node fits 12x3.5”, maximum size per drive depends on market availability and uses Optane drive for DB. NVME Storage Node fits 10x2.5” NVME, drive write endurance and size depends on market availability and customer preference.

### Prerequisites

IaaS Base configuration.

### Private Cloud – IaaS Volumes Option

| Node type            | Nodes    | Rack Units                             |
| -------------------- | -------- | -------------------------------------- |
| Top-of-Rack switch   | 2        | 0 (re-use of IaaS ToR)                 |
| Management switch    | 2        | 0 (re-use of IaaS Mgm switch)          |
| Control Plane        | 3        | 0 (collocated with IaaS Control Plane) |
| Storage Nodes – NVME | 0 / 6..n | 0 / 6..n                               |
| Storage Nodes – HDD  | 0 / 6..n | 0 / 12..2n                             |

### Private Cloud IaaS Volume product components

| Product Code                  | Component                                   | Rack Units |
| ----------------------------- | ------------------------------------------- | ---------- |
| PRIVATECLOUD-volume.nvme.base | IaaS Volumes Base configuration, NVME class | 6          |
| PRIVATECLOUD-volume.nvme.add  | IaaS Additional storage node, NVME class    | 1          |
| PRIVATECLOUD-volume.hdd.base  | IaaS Volumes Base configuration, HDD class  | 12         |
| PRIVATECLOUD-volume.hdd.add   | IaaS Additional storage node, HDD class     | 2          |

### Private Cloud – STaaS

The STaaS service provides NVME, HDD or both elastic storage. The ToR switches are based on 32x100 Gbps and scale to 24 compute or storage nodes due to 4 interfaces being reserved for control plane, two (2) for interswitch-links, two (2) for uplinks. If multi-rack deployment additional ports required for cross-connect. Storage interfaces include RADOS, S3 via Rados Gateway, Rados Block Device (RBD) or iSCSI/NFS via storage proxy.

HDD Storage Node fits 12x3.5”, maximum size per drive depends on market availability and uses Optane drive for DB. NVME Storage Node fits 10x2.5” NVME, drive write endurance and size depends on market availability and customer preference.

### Prerequisites

None.

### Private Cloud – STaaS Base configuration

| Node type           | Nodes    | Rack Units/item |
| ------------------- | -------- | --------------- |
| Top-of-Rack switch  | 2        | 1               |
| Management switch   | 2        | 1               |
| Control Plane       | 3        | 2               |
| Storage Node – NVME | 0 / 4..n | 1               |
| Storage Node – HDD  | 0 / 4..n | 2               |

### Private Cloud STaaS product components

| Product Code                 | Component                              | Rack Units |
| ---------------------------- | -------------------------------------- | ---------- |
| PRIVATECLOUD-staas.base      | STaaS Base configuration               | 6          |
| PRIVATECLOUD-staas.nvme.base | STaaS Base storage cluster, NVME class | 4          |
| PRIVATECLOUD-staas.nvme.add  | STaaS storage cluster, NVME class      | 1          |
| PRIVATECLOUD-staas.hdd.base  | STaaS Base storage cluster, HDD class  | 8          |
| PRIVATECLOUD-staas.hdd.add   | STaaS storage cluster, HDD class       | 2          |
