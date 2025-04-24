---
title: "Platform as a service – PaaS"
language: "En"
cardtitle: "Platform services"
cardicon: "fa-solid fa-container-storage"
cardcolor: "#195F8C"
cardorder: "07"
date: 2023-02-28
draft: false
intro: "Safespring provides several platform services on top of the IaaS platform."
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
- /service-catalogue/platform/
---

{{< ingress >}}
Safespring provides several platform services on top of the IaaS platform. 
{{< /ingress >}}

<table class="width100">
  <thead>
    <tr>
      <th>Product Code</th>
      <th>Service</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>PAAS-man.kubernetes</td>
      <td>Managed Kubernetes</td>
    </tr>
    <tr>
      <td>PAAS-man.postgresql</td>
      <td>Managed PostgreSQL</td>
    </tr>
    <tr>
      <td>PAAS-man.mariadb</td>
      <td>Managed MariaDB</td>
    </tr>
    <tr>
      <td>PAAS-man.elasticsearch</td>
      <td>Managed Elasticsearch</td>
    </tr>
    <tr>
      <td>PAAS-man.redis</td>
      <td>Managed Redis</td>
    </tr>
    <tr>
      <td>PAAS-man.nats</td>
      <td>Managed NATS</td>
    </tr>
  </tbody>
</table>


## Managed Kubernetes
The managed Compliant Kubernetes platform includes the following features and capabilities:

{{% accordion title="Security and compliance" %}}

- Private container registry
- Intrusion detection systems (IDS) for alerting in case of breaches
- Automated image vulnerability scanning
- Integration with authentication providers such as Active Directory, SAML, and OIDC, e.g. Google authentication
- Audit logging in the Kubernetes API server to track activities in the cluster
- Role based access control (RBAC)
- Compliance policy enforcement
- Secret management
- Automated certificate handling
- Network segregation (network zones and isolation east-west traffic)
- Network isolation and restrictive firewalls, allowing only permitted network traffic into the platform. Inbound traffic to the cluster is securely handled using the Nginx ingress controller

{{% /accordion %}}

{{% accordion title="Platform observability" %}}

- Monitoring of Compliant Kubernetes platform resource usage
- Alerting based on monitoring data
- Log aggregation
- Analytics based on collected logs
{{% /accordion %}}
{{% accordion title="Automation and management" %}}

- Continuous updates/patches of the Kubernetes platform
- Continuous updates/patches of Cluster Services and External Services
- Backups and disaster recovery
- Enterprise UI to control the cluster and integrate with other services
{{% /accordion %}}

### Prerequisites
Safespring IaaS.

### Managed Kubernetes – overview
Safespring’s managed Kubernetes service is built on Compliant Kubernetes (CK8s). Compliant Kubernetes is a proven, stable and secure Kubernetes platform built on open source cloud-native components. In addition to what is included in a standard “vanilla” managed Kubernetes service, Compliant Kubernetes brings the following value:

- Worry-free container operations with platform managed "twenty-four hours a day, seven days a week" in ISO certified, European data centers.
- Pre-configured best practice security tooling to reduce compliance burden for frameworks such as ISO-27001, GDPR and PCI-DSS.
- Makes it easier to stay secure and compliant over time by enforcing policies across the whole software development lifecycle without restricting developers.
- Lessens the audit burden by providing detailed and easy to access audit trails.
- Makes applications easier to manage from an operations, compliance and security perspective by providing an enterprise UI that acts as a single point of entry to all relevant tools, policies, and configuration.
- Decreases the operational burden by managing all additional components required for a secure and compliant Kubernetes environment such as observability (logging, monitoring, auditing), authentication, secret management, intrusion detection, vulnerability scanning and a private container registry.

### Managed Kubernetes – Service description
![Safespring Managed Kubernetes service Description](/img/graphics/safespring-openshift-2024.png)

### Managed Kubernetes – SLA
The service come with support ”twenty-four hours a day, seven days a week” and has a 99.9 percent availability SLA.

## PaaS – Managed PostgreSQL
The Managed PostgreSQL service offers regular updates, daily backups, point-in-time recovery, and log storage in Elasticsearch for up to 30 days or 50 GB.

{{% accordion title="Updates and upgrades" %}}

PostgreSQL is kept up to date with security patches and new versions. This includes the operating system and the database application.

{{% /accordion %}}

{{% accordion title="Backups and disaster recovery" %}}

A full backup of the database is taken every day. In addition to this, point-in-time recovery is provided by means of a Write-Ahead-Log.

Disaster recovery is committed to be completed within 4 hours.

{{% /accordion %}}

{{% accordion title="Log aggregation" %}}

All logs are stored in Elasticsearch and can be viewed in Kibana. 

Logs are kept for a maximum of 30 days (GDPR compliance) or up to 50 GB, whichever comes first.

{{% /accordion %}}

### Prerequisites
Safespring IaaS.

### Managed PostgreSQL – overview
PostgreSQL is the most popular open source relational databases for enterprise workloads. Safespring provides a fully managed PostgreSQL service optimized for performance and reliability.

### Managed PostgreSQL – SLA
The service come with support ”twenty-four hours a day, seven days a week” and has a 99.9 percent availability SLA.

## PaaS – Managed Elasticsearch
Managed Elasticsearch offers regular updates, daily backups with point-in-time recovery, and disaster recovery with a 4-hour commitment. Logs are stored in Elasticsearch and viewable in Kibana, with a maximum retention period of 30 days or 50 GB.

{{% accordion title="Updates and upgrades" %}}

Elasticsearch and Kibana instances are kept up to date with security patches and new versions.

{{% /accordion %}}

{{% accordion title="Backups and disaster recovery" %}}

A full backup of the database is taken every day. In addition to this, point-in-time recovery is provided by means of a Write-Ahead-Log.

Disaster recovery is committed to be completed within four (4) hours.

{{% /accordion %}}

{{% accordion title="Log aggregation" %}}

All logs are stored in Elasticsearch and can be viewed in Kibana.

Logs are kept for a maximum of 30 days (GDPR compliance) or up to 50 GB, whichever comes first.

{{% /accordion %}}

### Prerequisites
Safespring IaaS.

### Managed Elasticsearch – overview
Safespring provides a fully managed Elasticsearch service which makes it easy to deploy and operate Elasticsearch with best of breed security, at cloud scale, with zero (0) down time. As part of the service customers also get access to one and more managed Kibana instances enabling customers to search, run analytics and visualize data in real time. 

### Managed Elasticsearch – SLA
The service come with support ”twenty-four hours a day, seven days a week” and has a 99.9 percent availability SLA.

## PaaS – Managed Redis
This section provides information about the managed Redis service offered as a part of the PaaS solution. The service includes regular updates and upgrades, daily backups with point-in-time recovery, and log aggregation with retention for up to 30 days or 50 GB, whichever comes first. Read on for more details.

{{% accordion title="Updates and upgrades" %}}

The database is kept up to date with security patches and new versions. This includes the operating system and the database application.

{{% /accordion %}}

{{% accordion title="Backups and disaster recovery" %}}

A full backup of the database is taken every day. In addition to this, point-in-time recovery is provided by means of a Write-Ahead-Log.

Disaster recovery is committed to be completed within four (4) hours.

{{% /accordion %}}

{{% accordion title="Log aggregation" %}}

All logs are stored in Elasticsearch and can be viewed in Kibana.

Logs are kept for a maximum of 30 days (GDPR compliance) or up to 50 GB, whichever comes first.

{{% /accordion %}}


### Prerequisites
Safespring IaaS.

### Managed Redis– overview
Redis is an open source, in-memory data store and an extremely popular choice as a database, cache or message broker. Safespring operates a fully managed Redis service which brings all the benefits of the world's leading in-memory, key-value store without the complexity of database management, upgrades and backups.

### Managed Redis – SLA
The service come with support ”twenty-four hours a day, seven days a week” and has a 99.9 percent availability SLA.

## PaaS – Managed NATS
This section provides information about the managed NATS service offered as a part of the PaaS solution. The service includes regular updates and upgrades, daily backups with fast disaster recovery, and log aggregation with retention for up to 30 days or 50 GB, whichever comes first. Read on for more details.

{{% accordion title="Updates and upgrades" %}}

- NATS is kept up to date with security patches and new versions.

{{% /accordion %}}

{{% accordion title="Backups and disaster recovery" %}}

- A full backup is taken every day.
- Disaster recovery is committed to be completed within four (4) hours.

{{% /accordion %}}

{{% accordion title="Log aggregation" %}}

- All logs are stored in Elasticsearch and can be viewed in Kibana.
- Logs are kept for a maximum of 30 days (GDPR compliance) or up to 50 GB, whichever comes first.

{{% /accordion %}}


### Prerequisites
Safespring IaaS.

### Managed NATS – overview
Safespring operates a fully managed NATS service that allows you to get the benefits of a modern, cloud native messaging system. 

### Managed NATS – SLA
The service come with support ”twenty-four hours a day, seven days a week” and has a 99.9 percent availability SLA.

{{% accordion-script %}}
