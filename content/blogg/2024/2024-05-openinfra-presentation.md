---
title: "Self-Service Access to Open Source Infrastructure using NATS & Huma"
date: "2024-05-24"
intro: "Our session, titled 'Using NATS and Huma to Enhance Open Source Infrastructure', was designed to empower both B2B and European research communities with robust self-service access."
section: "Tech update"
draft: false
author: "Jon Ander Novella de Miguel"
tags: ["English"]
showthedate: true
card: "safespring_card_52.webp"
eventbild: ""
socialmediabild: ""
language: "En"
TOC: ""
sidebarlinkname: "Presentation"
sidebarlinkurl: ""
sidebarlinkicon: ""
sidebarimage: "jon-openinfra-2024.webp"
aliases:
- /blogg/2024/2024-05-openinfra-presentation/
---

{{< ingress >}}
I recently had the opportunity to present at OpenInfra Day Sweden 2024, and I'm excited to share the insights and developments from our team at Safespring. 
{{< /ingress >}}

Over the past three months, we've been working on a new tool designed to enhance self-service access to open source infrastructure for our B2B and European research community customers. This tool leverages the power of NATS and Huma technologies.

{{< inline "Safespring’s Mission" >}} Safespring aims to become the platform of choice for European cloud computing. We are dedicated to providing secure, compliant cloud services across multiple data centers in the Nordics, including Oslo, Stockholm, and Luleå. Our offerings adhere to GDPR and European security standards, ensuring top-notch security for our users.

{{< distance >}}

{{< streamed-video "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/safespring-open-infra-days-2024/master.m3u8" >}}

{{< icon-block-horisontal icon="fa-solid fa-download" color="#3C9BCD" description="Click here to download the presentation as a PDF." text="Download presentation" link="/publications/2024-safespring-nats-and-huma-presentation-openinfra-gothenburg.pdf" >}}


{{< distance >}}

### Project Overview
Our project addresses the need for automated provisioning of resources such as projects, users, networks, and access control lists across multiple open stack installations. We developed a self-service API using two key technologies:

1. **NATS** - A messaging system for microservices.
2. **Huma** - An HTTP framework in Golang that facilitates the creation of OpenAPI specifications.

### Goals of the Self-Service API

1. **Distributed Management**: Enable efficient distributed management of customer resources, reducing operational costs and allowing customers to provision projects on demand.
2. **Infrastructure Federation**: Support infrastructure federation for projects involving multiple organizations, such as our ongoing collaboration with the European Commission.
3. **Controlled Resource Provisioning**: Implement a control layer to manage customer requests for resources, ensuring compliance with predefined quotas and access levels.

### Technical Details

{{% accordion title="Huma Framework" %}}

- Compatibility with popular routers.
- Use of generic HTTP handler signatures for maintainability.
- Annotated struct types for input and output models, facilitating automatic OpenAPI specification generation.

Huma, the HTTP framework we chose, is integrated into the Golang ecosystem.
{{% /accordion %}}

{{% accordion title="NATS Microservices" %}}

- **Fire and Forget Messaging**: Efficient message publishing without awaiting responses.
- **Subject-Based Messaging**: Allowing targeted communication with multiple services simultaneously.
- **Built-In Load Balancing**: Ensuring high availability and efficient resource distribution.

To overcome the limitations of HTTP in dynamic service discovery and load balancing, we incorporated NATS for message middleware.
{{% /accordion %}}

### Architecture
Our architecture comprises:
1. **Self-Service HTTP API**: The main interface for user interactions.
2. **NATS Microservices**: Distributed across various data centers, listening to subjects and performing operations like creating projects and users.
3. **Central Services**: Including a quota and ACL controller to manage resource allocation and access control.

### Messaging Patterns
We implemented several NATS messaging patterns, including:
- **Fan-In and Fan-Out**: Distributing messages from the self-service API to multiple services.
- **Scatter and Gather**: Aggregating responses from multiple services to provide comprehensive results to the client.

### Challenges and Solutions
1. **Unified API for OKD and OpenStack**: Developing an abstraction that works across different platforms while managing user and group complexities.
2. **Integration Testing**: Ensuring robust testing against recyclable OpenStack and OKD environments, despite challenges with nested virtualization.

### Conclusion
This project represents a significant step forward in providing scalable, self-service access to open source infrastructure for our customers. By leveraging NATS and Huma, we have created a robust, efficient, and secure tool that meets the growing demands of our B2B and European research communities.

Feel free to reach out if you have any questions or would like more detailed information about our project!

{{< accordion-script >}}