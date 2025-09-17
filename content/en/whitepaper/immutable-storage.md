---
ai: true
title: "Safespring immutable object storage"
date: "2021-04-12"
draft: false
author: "Gabriel Paues"
section: "Solution Brief"
dokumentnamn: ""
socialmedia: "/blogg/socialmedia/safespring_social_38.gif"
intro: "With immutable objects, Safespring Storage is an excellent way to create a secure, reliable offsite backup."
sidebarlinkname: ""
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: ""
card: "safespring_card_38.jpg"
eventbild: "safespring_background_38.jpg"
socialmediabild: "safespring_social_38.gif"
toc: "Table of Contents"
language: "en"
aliases:
  - /no/whitepaper/immutable-storage/
---
{{< ingress >}}
In this solution brief, we walk through the Safespring Storage service based on S3 object storage. With immutable objects, Safespring Storage is an excellent way to create a secure and reliable offsite backup.
{{< /ingress >}}

Backing up your data is important in every IT environment. Most modern backup systems are feature-rich and handle human errors or disasters well. But attack surfaces are evolving, making solutions that were sufficient a while back no longer adequate for current threats. Testing the backup system to ensure it performs as expected can be costly, but it is always a necessary routine.

By using the solution described in this brief, your organization can achieve these benefits:

- A modern, comprehensive backup solution that is easy to manage.
- Secure offsite storage for critical backup data.
- A cost-efficient solution that meets all security requirements of a demanding organization.

## The 3-2-1 rule

There are many ways to design a backup solution, but most agree that the 3-2-1 rule is a good principle. It means you should have three copies of your data, on two different media, with one copy stored offsite. The traditional way to achieve this was to use a tape library with a rotation scheme, transporting full-backup tapes to another location at recurring intervals.

With the introduction of standardized, cloud-based storage solutions like S3 (which—although originally an Amazon product—has become a widely adopted standard), more efficient alternatives to physically transporting tapes have emerged. Instead, offsite backups are sent over an encrypted channel to another location. Since cloud-based storage solutions are very cost-efficient, they offer automation and reliability at a low cost.

## Automatic – but no air gap

Despite its popularity, storing offsite backups in the cloud has a drawback: there is no air gap. The manual process of physically moving tapes may be cumbersome, but it adds a layer of security by ensuring attackers cannot reach the location where offsite backups are stored. Even if the entire environment is compromised, the offsite tapes remain safe at the other location unless the attacker gains physical access. Those copies can be used to restore the whole environment if needed, albeit time-consuming.

Attackers are getting more sophisticated and understand that to extort victims with a crypto locker, the backups must be removed as well. Increasingly, attackers target the backup server specifically to delete all backups before deploying a crypto locker to encrypt data. This means they will try to delete everything reachable, including offsite backups stored in the cloud. Once that is done, the victim may be forced to pay the attackers to get the data back.

Since many companies use the same software, some modern crypto lockers can even delete cloud-based offsite backups automatically, making cloud-only solutions less attractive compared to old-school tape-based backups.

## Object locking or immutable objects

Most cloud-based storage services are object storage. An object represents the uploaded file plus associated metadata, such as upload time, size, and file type. To prevent malicious deletion of stored objects, a capability called object locking (also known as immutable objects) has been introduced. This allows you to preconfigure rules that control how and when objects can be deleted. For instance, an administrator can configure that no objects may be deleted until thirty days have passed since upload; the storage system will then deny deletion requests until that time.

> Object locking and immutable objects are two terms for the same capability.

This functionality has proven very useful for backup solutions because it creates a virtual air gap. Even if attackers gain access to the offsite backup location, they cannot delete the backups.

### Support in backup software

As the problem of crypto lockers erasing offsite backups has become more common, backup software has added support for object locking. Below, we describe how to enable it in Veeam, a popular backup solution.

S3 organizes data into buckets and objects. A bucket contains objects and is the entity configured in the backup software as the target for backups. When creating the bucket, enable object locking and configure the retention period—that is, how long objects should remain locked. We won’t go into the details here, but this step is required.

When that is done, create an “Object Storage Repository” in Veeam.

![Make the S3 bucket an immutable object](/img/whitepapers/make_S3_bucket_an_immutable_object.png)

In the configuration wizard, on the Bucket step, select the option “Make recent backups immutable for…”. Here you also set the number of days the objects should be immutable, and it’s important to use the same value that was configured on the bucket.

Once that’s done, complete the wizard. The feature is now enabled on the object repository. Next, configure a backup policy that tells Veeam which data should be sent to the repository.

## Conclusion

We’ve explained the importance of offsite backups and why object locking is a key feature. Using it can prevent disasters while also shortening recovery time (RTO), since restoring from tapes can take a long time. With object locking, you get the best of both worlds.

<div class="flexcontainer-shortcode" style="">

{{< services >}}

</div>