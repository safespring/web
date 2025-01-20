---
title: "A Flexible and Secure Cloud Service for Life Science Research"
language: "En"
date: 2023-06-01
draft: false
darkmode: "off"
section: "User case"
intro: "Discover how Safespring delivered cloud-based VM and storage services to SciLifeLab, supporting their advanced life science research and management of large data volumes."
background: "/safespring-scilifelab.webp"
card: ""
socialmedia: ""
sidebarlinkname: ""
sidebarlinkurl: ""
sidebarlinkname2: ""
sidebarlinkurl2: ""
sidebarsection: ""
sidebarimage: "scilifelab.svg"
saas: ""
sidebarwhitepaper: ""
aliases:
toc: "In this article"
service: "Safespring Private Cloud"
---

## 
{{< ingress >}}
Safespring delivers a cloud-based VM and storage service to SciLifeLab, Sweden's largest national research infrastructure for life sciences. 
{{< /ingress >}}

Safespring's virtual machines and storage can be automated through APIs, providing SciLifeLab with the flexibility to adjust resources as needed and optimize costs and performance in real time.

SciLifeLab has high demands for [performance and network](#performance) as well as [storage and security](#security) to meet their specific needs. Safespring works with SciLifeLab to deliver a flexible and dynamic infrastructure that is easy for researchers to use.

{{% accordion title="Performance and Network" id="performance" %}}
Safespring offers a range of VM flavors on a flexible IaaS platform that can easily be adapted to customer requirements. VM flavors range from 1 vCPU to 128 vCPU and RAM from 1 GB to 256 GB. Safespring can also add new VM flavors as customer requirements change over time.

To improve performance and stability, Safespring uses a Calico network plugin for OpenStack, providing top-tier separation between customer infrastructures and reducing network load. This also enhances the security of sensitive data often used in bioinformatics.

Calico enables management of all network traffic at layer-3 using the established BGP protocol, reducing load and complexity compared to traditional layer-2 bridging and providing optimal network performance. Safespring also applies security groups (virtual firewall rules) per virtual machine to protect customers' sensitive data.
{{% /accordion %}}

{{% accordion title="Storage and Security" id="security" %}}
Safespring delivers cloud-based storage to meet SciLifeLab's needs for high storage capacity for their data management and AI modeling systems. Safespring uses S3 object storage as standard to enable storage of large volumes of data in a scalable and secure environment. SciLifeLab also uses Safespring storage as a building block for creating research environments.

Safespring maintains a detailed Service-based SLA and monitors technical performance and service levels of its systems and services 24/7. Safespring uses ITIL4-compatible processes, procedures, tasks, and checklists to achieve this. All monitoring and service analysis data are transparent and available to the customer upon request.

Safespring responds promptly to all support cases, ensuring that researchers can perform their tasks without distraction. Safespring provides regular reports to customers on their current technical delivery status against SLA and on the development of new/updated service features.
{{% /accordion %}}

## Research Conducted on Safespring's Cloud Platform

SciLifeLab runs several research programs that depend on high-performance computing and large data storage to create higher levels of research environments and platforms. Safespring's VM services also allow researchers to easily request VM resources themselves and meet their specific needs to efficiently drive their research projects.

Two major research environments and platforms built on Safespring's infrastructure are the data delivery project DDS and the AI project Bigpicture.

{{% accordion title="The Data Delivery Project DDS" %}}
DDS stands for Data Delivery System and is a central solution for SciLifeLab as a complex infrastructure that produces research data. It is a unified transport solution for delivering life science data from data-producing technical platforms, such as DNA sequencing, imaging, and proteomics, to researchers across Sweden. DDS leverages Safespring's virtual machines and storage solutions to manage the flow of data between producers and researchers, expected to reach 3 petabytes in 2023.

[Read more about DDS](https://delivery.scilifelab.se)
{{% /accordion %}}

{{% accordion title="The AI Project BigPicture" %}}
BigPicture is a Horizon2020 project where SciLifeLab and ELIXIR-SE have teamed up with many other European partners to deliver a pathology data repository. BigPicture is intended to support the development of artificial intelligence in life science.

Safespring's VM and storage services form a key component in this project by enabling the creation of a scalable infrastructure that meets the project's data management and performance requirements. SciLifeLab has been able to develop the BigPicture project quickly by using Safespring.

[Read more about BigPicture](https://bigpicture.eu)
{{% /accordion %}}

### Relevant for EOSC
EOSC stands for European Open Science Cloud and is a planned cloud-based platform aimed at providing researchers and other users with simple and secure access to research data, tools, and infrastructure across Europe.

Safespring's services support SciLifeLab's projects to deliver life science to researchers across Sweden. Researchers can use virtual machines and storage directly, as well as build virtual research environments at SciLifeLab. Safespring has also recently begun developing [GPU](#gpu)-backed virtual machines for Protein Folding and image data analysis.

The EOSC platform will facilitate collaboration and data sharing among researchers and institutions in different countries and disciplines, expected to lead to increased innovation and the discovery of new insights. EOSC will consist of various services and tools provided by both public and private organizations and will adhere to FAIR (Findable, Accessible, Interoperable, Reusable) data management principles. EOSC is expected to be fully operational by 2025.

{{% accordion title="What is a GPU?" id="gpu"%}}
GPU stands for Graphics Processing Unit and is a processor designed specifically for handling graphically intensive tasks, such as computer games and image or video editing.
In this context, GPUs are used for Protein Folding and image data analysis in research.
{{% /accordion %}}

## Strategic Goals
{{< ingress >}}
Safespring and SciLifeLab have jointly created a plan for service delivery through several overarching requirement sessions to fine-tune the service and meet SciLifeLab's specific needs. 
{{< /ingress >}}


### Digital Sovereignty
Safespring offers several advantages that make it a reliable cloud service provider for compliance, open standards, and digital sovereignty. In this section, we will take a closer look at these three aspects and explain why Safespring is a secure partner for organizations looking for a cloud service provider that can reliably handle their needs. We will examine Safespring's commitment to following regulations relevant to cloud services, their support for open standards, and their solutions for ensuring digital sovereignty for their customers.

{{% accordion title="Compliance" %}}
Safespring is a cloud service provider that recognizes the importance of meeting regulations and standards to protect customer data and security. By complying with regulations and standards, Safespring can guarantee that their cloud services meet the highest security standards. Safespring is also part of the European Gaia-X initiative, an independent cloud infrastructure that guarantees European digital sovereignty. By using Safespring's cloud services, researchers can be confident that their data is stored and managed securely in accordance with the highest standards and compliance requirements.
{{% /accordion %}}

{{% accordion title="Open Standards" %}}
Safespring supports open standards like OpenStack and Kubernetes, ensuring that their cloud services are open, scalable, and compatible with other cloud platforms and technologies. Open standards also provide researchers with flexibility and freedom of choice in selecting technology that suits their specific research needs. Safespring's open standards also offer the advantage of researchers using cloud services that are compatible with their existing IT infrastructure.
{{% /accordion %}}

{{% accordion title="Digital Sovereignty" %}}
Safespring is a Swedish cloud service provider unaffected by US legislation such as FISA 702 and the CLOUD Act. This means that Safespring does not need to share customer data with US authorities, and the customer retains full control over their data and information. Additionally, Safespring is part of the European Gaia-X initiative, guaranteeing European digital sovereignty and self-determination over data management. By using Safespring's cloud services, researchers can be sure that their data is secure and protected against surveillance and intrusion.
{{% /accordion %}}

### Continuous Improvement

To manage the relationship with SciLifeLab and ensure their business needs are met and service delivery levels are achieved, Safespring and SciLifeLab have regular operational meetings to discuss open cases, new features and functional improvements, service utilization, planned projects, and other business-related issues. These meetings enable high quality in the delivery of cloud services and give Safespring the opportunity to collaborate with SciLifeLab to identify and plan technical change requests that support their business needs.

Safespring also has a process for continuously improving our services and service delivery levels by learning from incidents and identifying opportunities for improvement. We implement changes that support customer business needs.

## Everything is Purchased Through Framework Agreements
{{< ingress >}}
Safespring has a framework agreement through Open Clouds for Research Environments (OCRE) that research and educational institutions can use.
{{< /ingress >}}

SciLifeLab acquires services from Safespring through Sunet and the OCRE agreement. Safespring is directly connected to Sunet's network, which provides high availability and fast connection.

One of the main purposes of [OCRE](#ocre) is to simplify and standardize the process of acquiring cloud services, which in turn can lead to increased productivity and efficiency within the research community. By providing a single portal for researchers to access cloud services, OCRE aims to make it easier for researchers to use these services in their research.

{{% accordion title="What is OCRE?" id="ocre"%}}
Open Clouds for Research Environments (OCRE) is an EU-funded project that aims to promote the use of cloud services and Earth Observation (EO) services within the research community. The OCRE project strives to facilitate and accelerate the use of commercial cloud services in research by acting as a bridge between the research community and cloud service providers.

Learn more about [OCRE](https://www.ocre-project.eu/services/cloud-suppliers/).
{{% /accordion %}}

{{% accordion title="What is GÉANT?" %}}
GÉANT is a European research and education networking organization that brings together Europe's national research and education networks (NRENs). GÉANT supports research and education across Europe by providing infrastructure, services, and solutions for data sharing, communication, and collaboration.

In the context of OCRE, GÉANT is one of the main parties in the OCRE project. GÉANT, along with other partners, works to facilitate access to and use of cloud services for the research community through OCRE.

GÉANT's role within OCRE involves helping to negotiate agreements with cloud service providers, providing a platform for access to these services, and supporting the research community in utilizing these resources effectively. GÉANT's extensive network and experience in research and education make them a key partner in the OCRE project.
{{% /accordion %}}

## Power Your Project from the Cloud
Large-scale storage and computing capacity are in high demand. Safespring has long worked with the academic sector to ensure that digital infrastructure, storage, and backup meet Sunet's requirements.

{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Daniel Melin" %}}
I am the Business Development Manager for the academic and public sectors and can assist you in using our services already procured under the OCRE agreement.

{{< inline "Call" >}} +46 (0)76 868 00 59 
[daniel.melin@safespring.com](mailto:daniel.melin@safespring.com)
{{% /custom-card %}}

{{< accordion-script >}}
