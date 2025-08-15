---
title: "Important update regarding the EOL of the legacy platform in STO1"
date: "2023-04-18"
publishDate: "2023-04-18"
intro: "We would like to inform you that our legacy platform in STO1 will be shut down on May 1st 2023"
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Tech update"
language: "en"
toc: ""
sidebarlinkname: "How to migrate"
sidebarlinkurl: "https://docs.safespring.com/new/migrate-from-legacy/"
sidebarlinkname2: "Contact support"
sidebarlinkurl2: "mailto:support@safespring.com"
aliases:
  - /blogg/2023/2023-04-updates-to-legacy-platform/
---

{{< ingress >}}
As the legacy platform in STO1 is reaching its end of life, we hope that you're getting along with the migration to the new platform.
{{< /ingress >}}

According to our project tracking, most of you have already migrated to the new platform or are in the progress of doing so.

For those who haven't started yet, we would like to encourage you to do so as soon as possible and get in touch with us if you need any assistance. All steps necessary to migrate your instances can be found in our [migration guide](https://docs.safespring.com/new/migrate-from-legacy/).

For those of you struggling to meet the May 1 deadline, rest assured that we will not delete any data without your consent. We've been in touch with all customers to set up a migration plan and we will continue to do so in the coming weeks.

Several customers have provided us with a list of instances that should not be migrated or need to be marked for deletion. These instances will be shutoff on May 1 and continue to exist in the legacy platform for a grace period of 30 days, after which they will be deleted.

## Frequently Asked Questions

### We would like to keep our instances for a longer period of time. Is this possible?

Generally, we will not extend the deadline for the migration. However, if you are in progress of migrating your instances and need more time, please get in touch if you haven't already and we will try to accommodate your request.

### We would like migrate but have challenges with the new platform. What can we do?

The main difference in the new platform are the new networking model, and some customers have expressed concerns about this. We've written extensively about the topic in this blog post as well as in our end-user documentation and believe that most of the concerns can be addressed by reading these. If you need any assistance or consultation, please get in touch with us.

### We're trying to migrate a volume but nothing happens

The most common issue we've seen is that the `migrate_to` tag is set on a volume instead of a volume snapshot. Please make sure that you've created a snapshot of the volume you want to migrate and that the migrate_to tag is set on that snapshot. However, if you're sure that you've done this correctly, please get in touch with us, the batch jobs might have failed for some reason.

### We have several large local disk instances we need to migrate and your migration guide is too time consuming. Is there a faster way?

If you have several large local disk instances and are migrating to a local flavor in the new platform, there may be some edge cases where it is much faster to migrate directly between the image services. If you find yourself in this situation, please get in touch with us and we will help you out.
