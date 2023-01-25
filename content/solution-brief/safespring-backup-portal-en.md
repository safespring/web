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

{{< author-gabriel >}}


## Introduction

{{< ingress >}} 
Safespring Backup is based on the very well-established Spectrum Protect from IBM. It has many strengths, such as high security, excellent scalability and data lifecycle automation. 
{{< /ingress >}}

Spectrum Protect can protect countless Terabytes of data with minimal administration effort.

Backups are encrypted in transit with TLS 1.2 but can also be configured to be encrypted client side for even higher security automatically.

Being a well-proven solution for large enterprises, Spectrum Protect definitely can handle the scale of large service provider setups such as Safespring's. Where it somewhat lacks is flexible administration with the handling of user accounts and role assignments. Since backups generally are handled by a designated team in a large organisation, this drawback is something that is shared with many other backup solutions on the market and, therefore, not a specific problem for Spectrum Protect.

## Problem Statement

To solve this, Safespring developed a user portal and API bridge when launching our Backup service. The portal has served its purpose well by adding self-service for setting up new nodes and the generation of key-tokens for the automatic setup of multiple nodes without direct human interaction.

Even though being functional, the old user interface lacked dashboards for status and the ability for customers to add their own user accounts. Users could not create their own hierarchies to simplify the management of different groups of servers that are being backed up.

![Safespring's new backup portal](/img/safespring-backup-portal.png)

## Solution Overview

With our relaunch of Safespring Backup, we introduce a complete rehaul of the user interface. The solution is based on the Auwau Cloutility product with features such as:

- End-user self-service with the ability to create new users without contacting Safespring and assigning roles and privileges to the users.
- Multi-tenancy with the ability to create hierarchies and users with role-based access to different parts of the hierarchy. This makes it possible for one administrator to delegate different servers to different parts of the organisation.
- Provisioning where the administrator can define the process with standard settings to let the users handle their own activation of backups with ease.
- Advanced, but easy to use, report engine that makes it simple to follow up the status of all the backups running. It is also possible to set up schedules for sending reports at specific intervals to particular email addresses.
- REST API makes it possible to do everything you can do in the web user interface with API calls to automate your setup even further.

### Protection against ransomware

Safespring Backup utilizes a locking mechanism on each node that registers to use the service. This mechanism is designed to prevent the backup agent from deleting backups before a preset retention period has passed. This retention period is set to a certain number of days, during which the backups are kept safe and secure.

By implementing this mechanism, we are able to ensure that even in the event of a ransomware attack, the attacker would not be able to remove all backups from the server before encrypting the data locally. This is because the backups are locked and cannot be deleted until the retention period has passed.

In addition to this, the mechanism also provides an additional layer of protection to ensure data recovery in case of an attack. By keeping multiple backups available, we are able to restore data to a point before the attack occurred, minimizing the impact of the attack on our customers.

Overall, the use of this mechanism helps us to provide a more secure and reliable backup service for our customers, and is an important step in protecting against the growing threat of ransomware attacks.

## Conclusion

With our relaunch of Safespring Backup, Safespring takes a giant leap forward to improve the user experience and ease of use to handle your backups with Safespring. With the reliability of Spectrum Protect combined with a fully-fledged self-service portal running your backups has never been easier. With a complete REST API, automation of different administrative tasks is possible.

With Safespring Backup you will get a secure yet easy-to-use solution for handling all your backups.

{{< horisontal-card image="/img/card/safespring-backup.svg" cardtitle="Read more about Safespring Backup" text="Safespring Backup is a next-generation data backup and recovery solution that leverages the reliability and scalability of IBM Spectrum Protect.Safespring Backup is a next-generation data backup and recovery solution that leverages the reliability and scalability of IBM Spectrum Protect." linktext="To the service" link="/en/services/backup">}}




