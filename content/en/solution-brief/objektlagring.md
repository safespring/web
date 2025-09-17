---
ai: true
title: "Object storage with the S3 protocol offers unlimited flexibility"
language: "en"
date: 2018-06-20
draft: false
author: ""
tags: ["Svenska"]
documentation: "Storage"
dokumentnamn: "Safespring_White-Paper_Att-tanka-pa-i-och-med-inforandet-av-GDPR-och-CLOUD-act.pdf"
intro: "This solution brief walks through the S3 storage standard and gives you four examples of how it can be used today. You’ll learn how to use it in various ways across your organization—securely and with modern practices—without your data ever leaving the country."
card: "safespring-s3.svg"
sidebarimage: "safespring-s3.svg"
background: "safespring-storage.png"
socialmediabild: "safespring_social_27.gif"
socialmedia: "/blogg/socialmedia/safespring_social_27.gif"
toc: "Table of contents"
section: "Solution Brief"
aliases:
  - /solution-brief/objektlagring/
---
{{< ingress >}}
This solution brief walks through the S3 storage standard and gives you four examples of how it can be used today.
{{< /ingress >}}

You will learn how to use object storage in different ways in your organization—securely and with modern practices—without your data having to leave the country.

## What is S3?

S3 (Simple Storage Service) is an open-source protocol developed by Amazon for their service of the same name.

The protocol was launched in the US on March 14, 2006, and came to Europe on November 17 the following year. The fundamental storage units in S3 are objects organized into so-called “buckets.” Each object is identified by a unique key that the user has assigned.

> Companies that use the S3 protocol include Netflix, Dropbox, Tumblr, Pinterest, to name just a few.

Today the protocol is open for any provider to use and makes it easy to upload and download files securely over HTTPS. Many backup solutions such as Veeam, Commvault, Backup Exec, and more support S3 directly in the application, which makes it easy to set up. Standardized protocols make integration between different solutions a breeze.

### Example use cases

There are many ways to leverage the flexibility and security of S3. In our operations and among our customers, we see several examples; below are four use cases we think are strong implementations of S3.

## Example 1 - Offsite backup

Taking backups is a given today—but taking backups that can withstand your entire primary site going down is harder.

The solution is to have a system in place that sends an offsite copy to another location. With such a setup, you’re far better prepared if something happens to your primary site. The solution is simple and cost-effective because you use your existing backup system.

### Immutable objects

When object storage is used for offsite backup, it’s important that the data cannot be tampered with or deleted. That’s why the “immutable objects” feature is a good way to protect stored data. The user can set a time window during which the data is completely protected from external influence. This makes backup safer and more cost-effective than before with Safespring Storage. [Read our solution brief on immutable objects](/solution-brief/immutable-storage/).

### The importance of offsite backup

Storing copies in another location is invaluable if a disaster occurs. The main reasons for such a solution are:

- Secure data from attacks in the primary environment.
- Keep an offsite copy if your primary site is affected by a major disaster (fire, flood, or e.g., power outage).

The strength of object storage is that it’s generic and works with existing solutions. The backup can be managed just as before, with the major difference that there’s also a copy in another location.

### The 3-2-1 rule

There are a number of backup solutions on the market that can handle your local backup very well.

The most common setup is to have a backup server with a dedicated storage solution attached, ensuring fast restores if a server is hit by something unexpected. When we talk about backup, it’s common to refer to the 3-2-1 rule, which means you should have three copies of your data, on two different media types, with one copy offsite.

The local backup solution only solves the first two requirements: you probably have three backups on two different storage media, but none of them is offsite. Traditionally, offsite backup meant physically transporting, for example, tapes to another location, but that is expensive and requires procedures. Now that standardized storage solutions that can be accessed over the internet with encryption are available, that step is greatly simplified.

## Example 2 - Backend storage for e-archiving

Data volumes are constantly growing everywhere, both because more information is being digitized and because the data we store—such as video and high-resolution scans—takes up more space.

Many companies and public agencies have archiving responsibilities that extend further and further back in time. Taken together, these factors make data grow more and more, which makes it difficult to find cost-effective solutions over time.

Traditionally, companies have divided stored data into that which must be accessible relatively quickly and archived data that doesn’t need to be as readily available, and stored it on cheaper storage media. Before the digitization wave, microfilm was used, and after digitization, most often tape backup. The problem with these methods has been access, since both involve manual processes to reach the archived data. In addition, they have been costly in terms of infrastructure and very difficult to ensure that the archived data is truly intact.

An object storage service with S3 can solve these problems. By using an S3 service, all data stored in the archive can be stored in the same, cost-effective way. It doesn’t matter whether the user needs to retrieve a file that was archived yesterday or ten years ago. The e-archive solution keeps track of metadata and references but stores all data in S3, making it accessible and cost-effective. Because Safespring’s services are produced in Sweden, no one needs to worry about which legislation applies, since the customer and the provider are subject to the same laws.

## Example 3 - Affordable internal collaboration services

With its simplicity, S3 enables use with many different applications. This makes it possible to extend functionality in combination with the cost-effective storage S3 offers. Many times, higher security is required, and there are several alternatives with similar features.

### Nextcloud

One such application is Nextcloud, a server software based on open source that lets you set up your own private service similar to, for example, Dropbox. The interface is web-based, but there are also synchronization clients for both desktops running Windows, macOS, or Linux and smartphones, so the data is always easy to access.

Nextcloud supports S3 as storage, which makes it easy to set up an affordable storage service for the company’s files. Nextcloud also supports features for temporarily sharing files with external parties, both with passwords and time limits. These features aren’t built into S3 itself but provide significant added value for users.

Read more on Nextcloud’s website:
https://nextcloud.com

## Example 4 - Private S3 service with Minio

Safespring’s S3 service is designed with high security and flexibility in focus. There are cases, however, where you may need even greater possibilities.

The Minio initiative is an open-source project with which you can set up your very own private installation of an S3-compatible service. To ensure access and availability, it works very well to deploy it in [Safespring’s Compute service](/services/safespring-compute).

The advantages of such a solution are that you get full control over all settings for the S3 service and that it is private to your company. You can control policies for access, authentication, and storage yourself. The files stored in the service are placed on Safespring’s Compute service of the “Large” type, which results in a somewhat higher cost, but on the other hand, you can control absolutely everything yourself.

Minio is used as a reference installation for S3 by many vendors that build S3 support into their products, which increases the likelihood that integrations with other solutions will work.

Learn more about Minio:
https://min.io

## Why a local cloud services provider?

If you use an Amazon protocol, why not use Amazon as the storage solution? There are a number of reasons why a local provider of an S3-compatible service can be a better choice:

{{% inline "Regulatory compliance (Compliance)" %}} By placing your data with a local provider, it becomes much easier to comply with local laws and regulations. With the introduction of, for example, the U.S. CLOUD Act, it doesn’t really matter where the data is stored but which country the company is headquartered in. Legal experts at eSam consider information stored in a U.S. service to be regarded as disclosed, regardless of which country the data center is located in. Because Safespring is a Swedish company, we are not subject to the CLOUD Act.

{{% inline "Local support" %}} When you’re getting started with a new provider, it can feel reassuring that the support organization is based in the same country as you—and speaks your language.

{{% inline "Increased capacity" %}} Closer placement of the data and fewer bottlenecks deliver higher capacity for uploading and downloading data.

Most backup solutions can use a cloud-based S3 solution as a secondary storage pool. With only configuration in the existing backup solution and no additional investments, you can obtain an offsite copy of your data. Safespring Storage is produced in Sweden, which means you don’t need to worry about foreign laws and regulations. It also supports the S3 protocol, making it easy to integrate with existing backup solutions on the market.

## Safespring is a sustainable platform for secure cloud services

Safespring delivers secure, fast, and flexible cloud and IT infrastructure services based on open source and open standards.

We produce all services locally ourselves, which makes it easier for you to comply with laws and regulations and feel confident! Safespring is a Swedish company with locally produced cloud services in Sweden and Norway.

Cloud services are a modern and efficient way to deliver IT, but questions that are always discussed are whether it’s secure and where your data is. That’s something we’ve focused on when creating Safespring and our services—with us, you should feel secure! Your data never leaves the country.

The fact that we are a Swedish company also means that we are not covered by the CLOUD Act, so we cannot be forced to disclose your data. We have created our services with the highest security in focus; we produce them locally so that you know which laws and regulations apply and where your data is stored! We are experts at what we do and are happy to help you find the best solution for you.

{{% inline "Open Source" %}} Our services are based on open source. The past decades have shown that open source provides an incredibly powerful ecosystem of companies and organizations that largely share the same needs while still needing tailored solutions.

Because the source code is public, it is easy to audit and improve. Open source makes you independent of platform and vendor, which increases both security and flexibility. In addition, there are no license fees.