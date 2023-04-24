---
title: "Creating an open-source backup client library"
date: "2023-04-21"
publishDate: "2023-04-25"
intro: ""
draft: true
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Tech update"
language: "En"
toc: ""
sidebarlinkname: "Cloutility-api-client Repository"
sidebarlinkurl: "https://github.com/safespring-community/cloutility-api-client"
sidebarlinkname2: ""
sidebarlinkurl2: ""
---

{{< author-daniel >}}

{{< ingress >}}
At Safespring, we are passionate about open source technologies. Our platform relies on multiple open source products, and we are committed to giving back to the community whenever possible. Sometimes, however, we find ourselves in need of a solution that does not yet exist . As was the case when we wanted to create a tool to simplify the enrollment process for backup clients to our backup solution.
{{< /ingress >}}

Safesprings backup solution is based on IBM Spectrum Protect fronted by Auwau's Cloutility software. This combination provides a powerful enterprise-grade backup solution and Cloutility provides both customer portal and a rich API. However, we were unable to find an existing client library that could be used to consume the Cloutility API.

Consequently, we decided to take on the challenge ourself in the hope of benefiting not only Safespring, but also other organizations and users that utilize a similar setup. Which is why, a few weeks ago, we began working on the project "cloutility-api-client". The library is far from feature-complete but allows for consumption of the Cloutility API and includes around 15 methods for working with business-units, consumers, and nodes. These methods provide the ability to perform tasks such as creating and deleting business-units and consumers, as well as managing nodes and their associated data.

In addition, we also wrote a simple CLI tool that can be used for generic purposes, allowing operators to quickly and easily interact with the Cloutility API, implementing all methods currently available in the cloutapi-package. 

However, the power of a library lies in its ability to be extended with custom tools and integrations and we hope to see tools created by the community that can further simplify the enrollment process and improve the life-cycle management of backup-nodes.

As such, we welcome contributions from the community to expand the available features and provide specialized tools that meet specific needs. Our goal, as always, is to create a robust and flexible solution that can be easily adapted to different environments and use cases and hope that our work on the Cloutility API client will allow for this.
