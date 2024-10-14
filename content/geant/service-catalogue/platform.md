---
title: "Platform as a service"
language: "En"
cardtitle: "Platform services"
cardicon: "fa-solid fa-container-storage"
cardcolor: "#195F8C"
cardorder: "08"
date: 2024-10-10
draft: false
intro: "Safespring provides several platform services on top of the Compute platform with containers for deploying modern and cloud native applications"
cardintro: "Safespring provides several platform services on top of the IaaS platform."
background: "safespring-compute-background.svg"
form: "no"
sidebarlinkname: "Back to all categories"
sidebarlinkurl: "/geant/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "Safespring Service Catalogue"
socialmedia: "/safespring-start.jpg"
toc: "On this page"
noindex: "x"
---

## Managed Compliant Kubernetes
The managed Compliant Kubernetes platform includes the following features and capabilities:

### Security and compliance
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

### Platform observability
- Monitoring of Compliant Kubernetes platform resource usage
- Alerting based on monitoring data
- Log aggregation
- Analytics based on collected logs

### Automation and management
- Continuous updates/patches of the Kubernetes platform
- Continuous updates/patches of Cluster Services and External Services
- Backups and disaster recovery
- Enterprise UI to control the cluster and integrate with other services

## Managed OpenSearch

### Updates and upgrades
- OpenSearch and Kibana instances are kept up to date with security patches and new versions.

### Backups and disaster recovery
- A full backup of the database is taken every day. In addition to this, point-in-time recovery is provided by means of a Write-Ahead-Log.
- Disaster recovery is committed to be completed within four hours.

### Log aggregation
- All logs are stored in OpenSearch and can be viewed in Kibana. 
- Logs are kept for a maximum of 30 days (GDPR compliance) or up to 50 GB, whichever comes first.

## Managed NATS

### Updates and upgrades
- NATS is kept up to date with security patches and new versions. 

### Backups and disaster recovery
- A full backup is taken every day. 
- Disaster recovery is committed to be completed within four hours.

### Log aggregation
- All logs are stored in OpenSearch and can be viewed in Kibana. 
- Logs are kept for a maximum of 30 days (GDPR compliance) or up to 50 GB, whichever comes first.

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Get in contact with Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Sales:" >}} +46855107370 or sales@safespring.se
{{% /custom-card %}}

