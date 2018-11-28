---
title: "Moving data to offsite storage using Commvault"
date: "2018-10-29T14:46:36+01:00"
draft: false
author: "Gabriel Paues"
dokumentnamn: ""
huvudbildnamn: "Safespring_WhitePaper_Commvault_web.jpg"
socialmediabild: "Safespring_WhitePaper_Commvault_social-media.jpg"
intro: "This whitepaper describes how to configure Safespring Storage as a “Disk Library” in Commvault."
---

## Introduction
This white paper describes how to configure Safespring Storage as a “Disk Library” in Commvault. The only prerequisite is that you have a storage account at Safespring and a running Commvault solution. With that  you will be able to be up and running with a disaster backup solution in minutes.

There are a number of backup solutions in the market that will handle local backups of your data very well. The most common solution is to have a backup server with a dedicated storage cluster to make sure that the backups are available if the main environments breaks for some reason. When talking about backups it is very common that one refers to the 3-2-1 rule which means that you should have three copies on two different media with one offsite. The local backup solution does only cater for two of the three requirements: you might have three backups and with the separate storage solution for the backup server you will also have two backups stored on different media. But what about the last one - that you should have one copy offsite? This has before been the hardest requirement to fulfill but the the advent of standardized storage protocols and cloud service providers delivering their services of those protocols - the task to make the offsite copy has been greatly simplified.

S3 (Simple Storage Service) is from the beginning a protocol developed by Amazon. The protocol makes it easy to upload and download files securely  over standardized and encrypted HTTPS protocol. Even if the protocol itself was developed by Amazon it has become an open standard on how to send and store files over the Internet. Safespring's storage solution is S3-compatible which makes it compatible to all other S3-compatible solutions on the market, for instance Commvault’s backup software. By using standardized protocols, the work of integrating the two solutions has become a child’s play.

### A local cloud provider could be more suitable

If using an Amazon protocol, why not use Amazon as the storage backend, you might wonder. There are a number of reasons why a local cloud provider which is compatible could be a more suitable solution:

1. **Compliance**. By placing your data in a local provider it will be much easier to comply to local laws and regulations. Surprises of where your data really is eliminated

2. **Local support**. In the setup phase I can be good to be able to speak with the personnel on the  other side in your own language.

3. **Performance**. Fewer bottlenecks with your data closer to you. Dependent on how you’re connected.

Commvault can use a number of storage solutions as a “Disk Library” to use for primary or secondary offsite backups. The latter is especially interesting if you are running a Commvault solutions since no investments in further infrastructure is needed to get a fully functional offsite backup of your data. Safespring has an object storage solution with local data centers in Sweden and Norway which makes it possible to add a compliant disaster recovery solution to your existing Commvault solution.  You will only pay for the used storage in Safespring's solution but will be able to sleep better at night knowing that a secondary backup is safe in Safespring's storage platform.

### Use case: Moving Data to offsite storage - Safespring
What Data, What Tools -> Would it be nice if every application provided native a secure, efficient manner to upload to your cloud choice.

(Image 1 - Commvault in Safespring’s platform)

## Configuring Commvault in Safespring’s platform
To configuring your Commvault solution to use your storage account as a target follow these instructions.

### 1. Open the configuration of your Cloud Storage from Safespring
Expand your Storage Resource and right click Libraries > Add > Cloud Storage Library…
That will bring you to the configuration of your Cloud Storage from Safespring.

(Image 2 - Step one, open the configuration window)

### 2. Fill in your information
Fill in your information as below:

1. **Name** is your preferred Name of this Storage Device. Spaces is allowed.

1. **Type** is Amazon S3 which is Safespring type of storage.

1. **Media Agent** is the server that should be writing and reading to the Storage.

1. **Authentication** is Access & Secret Keys.

1. **Service Host** is the endpoint-url you get in your on-boarding email from Safespring. In this case -  s3.sto1.safedc.net
(without https://).

1. **Access Key ID** is your access_key from your on-boarding email.

1. **Secret Access Key** is your secret_key which you have received through sms reply during on-boarding.

1. **Verify Secret Access Key** is the same as the secret_key that you received through sms reply during on-boarding..

1. **Bucket** is your preferred name of the folder you want to write to.

1. **Storage Class** is Standard.

 (Image 3 - Step two, fill in your information)

## Final words
By following the steps above, you will have added another backup of your data to a local cloud provider. If something bad would happen at your main site you can rest assured that the data still will be reachable at Safespring. By setting up a new Commvault server (if the original one is broken) you can read back the backups from Safespring Storage. Depending on your needs for RPO and RTO the solution could be complemented with synchronization set up more often or a cold standby Commvault solution and mirrored site (hosted by you or Safespring) which could be connected to Safespring Storage. With such a setup you will be able to recover from a crash in the main site even more rapidly.
