---
title: "Storage as a service – STaaS"
language: "En"
cardtitle: "Object Storage"
cardicon: "fa-solid fa-database"
cardcolor: "#195F8C"
cardorder: "04"
date: 2023-02-28
draft: false
intro: "Storage service based on the Ceph object storage cluster using S3-API."
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
The IaaS platform contains a storage service based on the Ceph object storage cluster, providing object-storage as a service using an S3-API compatible interface.
{{< /ingress >}}

## S3-API-compatible Storage Service
Safespring provides Storage-as-a-Service using object-based storage, provided by the Ceph Rados Gateway. Safespring provides the S3 API-compatible as of the Ceph versions depicted below. Exact API support level can be read on the relevant documentation page, see references below. 

### Prerequisites
None.

### Ceph Versions

<table class="width100">
  <thead>
    <tr>
      <th>Product Code</th>
      <th>Type</th>
      <th>Site</th>
      <th>Version</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>S3-standard</td>
      <td>S3-storage</td>
      <td>OSL1</td>
      <td>v10.2.11 (Jewel)</td>
    </tr>
    <tr>
      <td>S3-standard</td>
      <td>S3-storage</td>
      <td>STO1</td>
      <td>v10.2.11 (Jewel)</td>
    </tr>
    <tr>
      <td>S3-standard</td>
      <td>S3-storage</td>
      <td>STO2</td>
      <td>v13.2.10 (Mimic)</td>
    </tr>
  </tbody>
</table>


## Direct RADOS-integration of application
Safespring supports the direct integration of applications onto the RADOS layer, when performed and deployed by Safespring in a controlled manner. 

It is not possible for users to directly access this storage layer. The integration will be done by Safespring at professional service-based pricing, and a subsequent maintenance charge will apply. The exact pricing depends on the scope of the project and is therefore evaluated on a case by case basis.

### Prerequisites
None.
