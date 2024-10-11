---
title: "Network services"
language: "En"
cardtitle: "Network"
cardicon: "fa-solid fa-network-wired"
cardcolor: "#195F8C"
cardorder: "03"
date: 2024-10-10
draft: false
intro: "Comprehensive network services for seamless connectivity and control, including public/private IP addresses, secure traffic management, load balancing, and advanced options for large-scale users."
cardintro: "Comprehensive network services for seamless connectivity and control."
background: "safespring-compute-background.svg"
form: "no"
sidebarlinkname: "Back to all categories"
sidebarlinkurl: "/geant/service-catalogue"
sidebarlinkname2: "See price for network"
sidebarlinkurl2: "/geant/price/#network"
socialmedia: "safespring-compute.jpg"
section: "Safespring Service Catalogue"
socialmedia: "/safespring-start.jpg"
toc: "On this page"
noindex: "x"
---


{{< ingress >}}
Mandatory and optional network services when using the IaaS platforms.
{{< /ingress >}}

The network design of the Compute platform is based on L3 (IP) and hardware-based routing. Virtual routers or L2 overlay networks are not used. This ensures maximum network performance and operational simplicity at all scales. Security is based on sets of L3 IP address access control lists. If a customer requires overlay networks, they are free to deploy them – at less overhead and at higher performance than in competing provider solutions.

Safespring has peering with the National Research and Education Networks (NREN) with redundant connections to SUNET in Sweden and redundant connections to SIKT in Norway.

These NREN:s are connected with Nordunet which gives a fast connection for customers connected to NREN:s in the whole of Europe.

Safespring supports both {{< inline "SAML2" >}} and {{< inline "OIDC" >}} for federated identity handling and authorization to the platform.

- Public IPv4 and IPv6 addresses directly assigned to network interface.
- Private addresses for site-internal communication.
- Ingress / Egress traffic controlled by API driven ACL.
- Managed SLB (based on BGP and haproxy).
- Bring your own IP prefixes (for large customers).
- Reverse DNS names (for large customers, own prefixes).



| Product Code | Description                                                    |
|--------------|----------------------------------------------------------------|
| NET-publicv4 | Public IPv4 address                                            |
| NET-publicv6 | Public IPv6 address                                            |
| NET-ingress  | Ingress traffic into an   instance from outside the datacenter |
| NET-egress   | Egress traffic from an instance to outside the datacenter      |
| NET-mgn.slb  | Service to cater for load   balancing applications             |
| NET-rdns     | Reverse DNS records (PTR)                                      |
| NET-byoip    | Bring your own IP prefixes                                     |

## Public IP addresses
Safespring provides public IPv4 and IPv6 addresses to the services. By default, each instance receives one of each.
## Ingress and egress traffic
Safespring measures ingress and egress traffic for each customer instance at the network border of each datacenter. Safespring does not bill for ingress or egress traffic. Safespring is directly connected to SUNET, SIKT and NORDUNET networks.
## Load balancing
Safespring offers functionality to give the customer means to set up load balancers in the platform. The solution is based on iBGP with anycast routing functionality that enables a secure and stable load balancing solution.
## Reverse DNS names
Safespring can configure, on a case-by-case basis, reverse DNS names of its public IP addresses for customers hosting for example SMTP servers or other services where the reverse DNS name (PTR record) is important.
## Bring your own IP prefix(es)
Customers can allocate their own IPv4 prefixes to the platform for their own use in the platform (minimum size /24). Safespring configures these prefixes in the platform and announce them to its peers using BGP.


{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Get in contact with Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Sales:" >}} +46855107370 or sales@safespring.se
{{% /custom-card %}}

