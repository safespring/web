---
title: "Creating an open-source backup client library"
date: "2023-04-21"
publishDate: "2023-04-23"
intro: "Explore our open-source Cloutility API client library for simplifying backup client enrollment and management."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Tech update"
author: "Daniel de Oquiñena"
language: "En"
toc: ""
sidebarlinkname: "Cloutility-api-client Repository"
sidebarlinkurl: "https://github.com/safespring-community/cloutility-api-client"
sidebarlinkname2: ""
sidebarlinkurl2: ""
---

{{< ingress >}}
At Safespring, we are passionate about open source technologies. Our platform relies on multiple open source products, and we are committed to giving back to the community whenever possible. 
{{< /ingress >}}

Sometimes, however, we find ourselves in need of a solution that does not yet exist. As was the case when we wanted to create a tool to simplify the enrollment process for backup clients to our backup solution.

Safesprings backup solution is based on IBM Spectrum Protect fronted by Auwau's Cloutility software. This combination provides a powerful enterprise-grade backup solution and Cloutility provides both customer portal and a rich API. However, we were unable to find an existing client library that could be used to consume the Cloutility API.

Consequently, we decided to take on the challenge ourself in the hope of benefiting not only Safespring, but also other organizations and users that utilize a similar setup. Which is why, a few weeks ago, we began working on the project "cloutility-api-client". The library is far from feature-complete but allows for consumption of the Cloutility API and includes around 15 methods for working with business-units, consumers, and nodes. These methods provide the ability to perform tasks such as creating and deleting business-units and consumers, as well as managing nodes and their associated data.

In addition, we also wrote a simple CLI tool that can be used for generic purposes, allowing operators to quickly and easily interact with the Cloutility API, implementing all methods currently available in the cloutapi-package. 

However, the power of a library lies in its ability to be extended with custom tools and integrations and we hope to see tools created by the community that can further simplify the enrollment process and improve the life-cycle management of backup-nodes.

As such, we welcome contributions from the community to expand the available features and provide specialized tools that meet specific needs. Our goal, as always, is to create a robust and flexible solution that can be easily adapted to different environments and use cases and hope that our work on the Cloutility API client will allow for this.

{{% note "Recommended reading" %}}
Dive deeper into the world of open-source backup client management by checking out our recent article on [Automating backup node enrollment with Cloutility API-client.](/blogg/2023/2023-04-using-cloutility-api-client-to-auto-enroll-backup-clients/)  Happy reading!
{{% /note %}}

## Understanding Key Terms 

Explore a concise guide that explains essential terminology found in our article on the open-source Cloutility API client library. Gain a deeper understanding of the concepts and technologies discussed to better appreciate their significance in backup client management and enrollment.

{{% accordion title="Open-source" %}}
Open-source refers to software or projects whose source code is made available to the public, allowing anyone to view, use, modify, and distribute the code. This fosters collaboration, innovation, and transparency, as well as encourages the sharing of knowledge and resources within the developer community.
{{% /accordion %}}

{{% accordion title="Backup client" %}}
A backup client is a software application or tool that runs on a device (such as a computer or server) and is responsible for sending data to a backup server or system. The purpose of a backup client is to protect and preserve data by creating copies or backups, which can be restored in case of data loss, corruption, or other issues.
{{% /accordion %}}

{{% accordion title="API" %}}
API, short for Application Programming Interface, is a set of rules and protocols that enables different software applications to communicate and share data with each other. APIs define the way information is requested, sent, and received between software systems, making it possible for developers to build applications that leverage the features and data of other services.
{{% /accordion %}}

{{% accordion title="IBM Spectrum Protect" %}}
IBM Spectrum Protect, formerly known as Tivoli Storage Manager (TSM), is a data protection and recovery solution that helps organizations manage and safeguard their critical data. It offers centralized, automated data backup and recovery management, supporting a wide range of platforms, storage devices, and applications. IBM Spectrum Protect helps ensure data integrity, minimizes downtime, and reduces operational costs.
{{% /accordion %}}

{{% accordion title="Auwau's Cloutility" %}}
Auwau's Cloutility is a software solution that provides a user-friendly customer portal and API for managing backup and recovery services. It acts as a front-end interface for enterprise-grade backup solutions like IBM Spectrum Protect, making it easier for users to manage and monitor their backups. Cloutility streamlines the backup process and enhances the overall user experience.
{{% /accordion %}}

{{% accordion title="CLI tool" %}}
CLI, short for Command Line Interface, is a text-based interface that allows users to interact with a computer program or operating system by typing commands, rather than using a graphical user interface (GUI). A CLI tool is a software utility that uses a command line interface for performing tasks or operations, offering a quick and efficient way for experienced users to interact with a system.
{{% /accordion %}}

{{< accordion-script >}}
