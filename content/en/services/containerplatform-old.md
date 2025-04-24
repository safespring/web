---
title: "Run Kubernetes and Open Shift on Optimized Servers"
language: "en"
date: 2019-01-07T13:58:58+01:00
draft: true
section: "Public Cloud"
intro: "Lightning-fast NVMe storage and optimized network design tailored for containers. Manage them yourself or buy as a managed service."
background: "safespring-kubernetes-background.svg"
card: ""
socialmedia: "safespring_social_01.jpg"
sidebarlinkname: "Watch demo"
sidebarlinkurl: "/demo/compute/"
sidebarlinkname2: "Prices"
sidebarlinkurl2: "/en/price/"
aliases:
  - /en/services/containerplatform-old/
---

{{< icon-block-container >}}
{{< icon-block icon="fa-solid fa-user-lock" text="Data Sovereignty" link="" color="#32cd32">}}
{{< icon-block icon="fa-kit fa-lock-ip" text="Elastic IP for Load Balancers" link="" color="#195F8C">}}
{{< icon-block icon="fa-kit fa-nvme" text="Fast Local Disk for ETCD" link="" color="#3C9BCD">}}
{{< icon-block icon="fa-kit fa-api" text="Powerful Automation" link="" color="#3C9BCD">}}
{{< icon-block icon="fa-solid fa-network-wired" text="Stable Network" link="" color="#FA690F">}}
{{< icon-block icon="fa-kit fa-safespring" text="Safespring Infrastructure" link="" color="#3C9BCD">}}
{{< /icon-block-container >}}

## Powerful Virtual Servers with NVMe

{{< ingress >}}
NVMe is a high-speed storage interface offering faster access times and lower latency compared to traditional storage technologies.
{{< /ingress >}}

It's an excellent choice for use in etcd, a distributed and consistent key-value store that's fundamental to Kubernetes. Etcd is used to store data across a cluster of machines and is useful for storing and retrieving configuration data, service coordination, and storing metadata.

Using NVMe storage for etcd improves performance and reliability in the system, enabling it to handle large amounts of data and traffic with ease while supporting Kubernetes' powerful container management.

{{< distance >}}

{{% custom-card image="/img/card/elastisys-rob.png" cardtitle="Use Case: Elastisys Welkin" %}}
Rob McCuaig shares insights into Elastisys' collaboration with Safespring and the importance of data processing within the EU.

{{< 2calltoaction "Read Use Case" "/en/services/case/elastisys" "More about the service" "/en/services/compliant-kubernetes">}}
{{% /custom-card %}}

{{< distance >}}

## Safespring's Network Model is Optimal for Container Platforms

Safespring is a product that offers an efficient and highly available network stack using BGP (Border Gateway Protocol). This enables Safespring to offer efficient load balancing using Equal cost multipath routing and Elastic IP (ECMP).

Another advantage of Safespring is its scalable network implementation, where there are no central control nodes. This makes the network more robust and reliable.

Safespring also offers Layer 3 IP-to-IP connectivity, which means there's the possibility for a direct connection between two IP addresses. This makes it easier to build a robust network solution without a "single point of failure."

Thanks to Elastic IP, Safespring serves as a base function for building load balancers. Moreover, Safespring provides the tools to build highly available solutions, where there is no single weak point in the network.

In summary, Safespring has an efficient network stack, scalable network implementation, IP-to-IP connectivity, and provides tools for building highly available solutions, making it an attractive product for those looking to build robust and reliable networks.

## Run Kubernetes as a Service on Safespring

With the strength of Safespring's infrastructure, our partners have built powerful managed services. Let your technicians manage your services and let us focus on the infrastructure and platform layer.

{{< custom-card image="/img/graphics/compliant-kubernetes-on-safespring.svg" text="Run Kubernetes as a service. With comprehensive security mechanisms, Welkin is a complete solution for securely managing your Kubernetes needs." cardtitle="Welkin as a Managed Service on Safespring" linktext="Get Started!" link="/en/services/compliant-kubernetes/" >}}{{< /custom-card >}}
