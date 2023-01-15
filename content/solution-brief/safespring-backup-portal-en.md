---
title: "Safespring Backup: A complete rehaul of the user portal"
date: 2023-01-12T13:58:58+01:00
draft: false
tags: ["English"]
intro: "Safespring has developed a user portal and API bridge when launching our Safespring Backup service"
background: "safespring-compute.jpg"
sidebarlinkname: "To the service"
sidebarlinkurl: "/en/services/backup"
sidebarlinkname2: "Get started"
sidebarlinkurl2: "/en/demo"
socialmedia: ""
devops: ""
card: "safespring-backup.svg"
sidebarimage: "safespring-backup.svg"
background: "safespring-backup.svg"
socialmediabild: ""
form: ""
toc: "In this article"
language: "En"
---

## Introduction

Safespring Backup is based on the very well-established Spectrum Protect from IBM. It has many strengths, such as high security, excellent scalability and data lifecycle automation. Spectrum Protect can protect countless Terabytes of data with minimal administration effort.

Backups are encrypted in transit with TLS 1.2 but can also be configured to be encrypted client side for even higher security automatically.

Being a well-proven solution for large enterprises, it definitely can handle the scale of large service provider setups such as Safespring's. Where it somewhat lacks is flexible administration with the handling of user accounts and role assignments. Since backups generally are handled by a designated team in a large organisation, this drawback is something that is shared with many other backup solutions on the market and, therefore, not a specific problem for Spectrum Protect.

## Problem Statement

To solve this, Safespring developed a user portal and API bridge when launching our Safespring Backup service. The portal has served its purpose well by adding self-service for setting up new nodes and the generation of key-tokens for the automatic setup of multiple nodes without direct human interaction.

Even though being functional, the old solution lacked dashboards for status and the ability for customers to add their own user accounts and create their own hierarchy to simplify the management of different groups of servers that are being backed up.

![Safespring's new backup portal](/img/safespring-backup-portal.png)

## Solution Overview

With Safespring Backup 2.0, we introduce a complete rehaul of the user portal. The solution is based on the Auwau Cloutility product with features such as:

- End-user self-service with the ability to create new users without contacting Safespring and assigning roles and privileges to the users.
- Multi-tenancy with the ability to create hierarchies and users with role-based access to different parts of the hierarchy. This makes it possible for one administrator to delegate different servers to different parts of the organisation.
- Provisioning where the administrator can define the process and standard settings to let the users handle their own activation of backups with ease.
- Advanced, but easy to use, report engine that makes it simple to follow up the status of all the backups running. It is also possible to set up schedules for sending reports at specific intervals to particular email addresses.
- REST API makes it possible to do everything you can do in the web portal with API calls to automate your setup even further.

## Conclusion

Introducing Safespring Backup 2.0 Safespring takes a giant leap forward to improve the user experience and ease of use to handle your backups with Safespring. With the reliability of Spectrum Protect combined with a fully-fledged self-service portal running your backups has never been easier. With a complete REST API, automation of different administrative tasks is possible.

With Safespring Backup 2.0, you will get a secure yet easy-to-use solution for handling all your backups.

{{< horisontal-card image="/img/card/safespring-backup.svg" cardtitle="Read more about Safespring Backup" text="Safespring Backup is a next-generation data backup and recovery solution that leverages the reliability and scalability of IBM Spectrum Protect.Safespring Backup is a next-generation data backup and recovery solution that leverages the reliability and scalability of IBM Spectrum Protect." linktext="To the service" link="/en/services/backup">}}




