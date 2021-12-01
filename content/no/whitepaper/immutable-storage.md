---
title: "Safespring immutable object storage"
date: "2021-04-12"
draft: false
author: "Gabriel Paues"
section: "Solution Brief"
dokumentnamn: ""
socialmedia: "/blogg/socialmedia/safespring_social_38.gif"
intro: "With immutable objects, Safespring Storage is a great way of creating an offside backup that is secure and reliable."
sidebarlinkname: ""
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: ""
card: "safespring_card_38.jpg"
eventbild: "safespring_background_38.jpg"
socialmediabild: "safespring_social_38.gif"
toc: "Table of Contents"
Language: "No"
---


{{< ingress >}}
In this solution brief, we'll walk through the Safespring Storage service based on S3 object storage. With immutable objects, Safespring Storage is a great way of creating an offside backup that is secure and reliable.
{{< /ingress >}}

To backup your data is important in all IT environments. Most modern backup systems are rich in features and are good at handling human errors or disasters. But the attack surfaces are changing which makes solutions that were sufficient a while back not up to date with the current threats. Testing the backup system to ensure that it does what we think it does could be costly but is always a needed routine.

By using the solution described in this brief, the organization can achieve these benefits:

* A modern and complete backup solution that is easy to manage.
* A secure off-site storage for critical backup data.
* A cost efficient solution that meet all security requirements from a demanding organisation.

## The 3-2-1 rule

There are a number of ways to design a backup solution but most seem to agree that the 3-2-1 rule is a good principle. It means that one should have three copies of the data, on two separate media out of which one of the copies should be stored offsite. The traditional solution to cater for this was to use a tape robot with a rolling scheme where tapes with complete backups where transported to a different location at reoccurring times.

With the introduction of standardized, cloud based storage solutions like S3 (which even though originally being and Amazon product now is an open standard), more efficient alternatives to physical transportation of tapes has arisen. Instead, the offsite backups are sent over an encrypted channel to another location. With cloud based storage solutions being very cost efficent, these solutions offer both automation and reliability to a low cost.

## Automatic – but no air gap

Even being popular, there is a problem with storing the offsite backup in a cloud solution and that is that there is no air gap. The manual process of moving the data physically with tapes might have been cumbersome but adds the extra layer of security that the attacker can not reach the location where the offsite backups are stored. Even with the whole environment being compromised, the offsite tapes would be safe at the other location unless the attacker would gain physical access. These copies could be used to restore the whole solution if needed, even though time consuming.

Attackers are getting more sophisticated and understands that in order to exercise blackmail with with a crypto locker, the backups need to be removed too. More and more attackers specifically attack the backup server in order to remove all backups before using a crypto locker to encrypt the data. This means they will also try to remove everything reachable which includes the offsite backups stored in the cloud solution. Once that is done, the victim might be forced to pay up to the attackers to get the data back.

Since many companies use the same software, some modern crypto lockers even remove the cloud based offsite backups automatically which makes the cloud based solution less attractive compared to the old school tape based backup.

## Object locking or Immutable objects

Most cloud based storage solutions are object storage solutions. An object represents the uploaded file plus associated meta data, like when the file was uploaded, its size and file type. To mitigate malicious attackers from removing the stored objects a new function has been introduced: Object locking or immutable objects as it is also referred to. This means that it is possible to at beforehand configure rules for how and when objects stored in the solution can be removed. For instance, the administrator can configure that no objects can be removed until thirty days have passed since they where uploaded which will make it impossible to do so since the storage solution will deny such a request.

> Object locking and Immutable objects are two terms describing the same thing.

This functionality has proven being very useful for backup solutions since it creates a virtual air gap. Even though the attackers gain access to the location where the offsite backups are stored they can not remove the backups even how hard they try.

### Support in backup software

Since the problem with crypto lockers erasing offsite backups has become more common, support for object locking has been introduced in the backup software. We will in the following section describe how to enable it in Veeam, that is a popular backup solution.

S3 organizes files in objects and buckets. A bucket may contain files and is the entity configured in the backup software to send the backups to. When creating the bucket, object locking is enabled and variables for retention time, which means how long the objects should be locked, is configured. We will not go into the details here but it is important to understand that this step is needed.

When that is done you create an “Object Storage Repository” in Veeam.

![Make S3 bucket an immutable object](/img/whitepapers/make_S3_bucket_an_immutable_object.png)

In the configuration wizard, under the step Bucket, one should check the option “Make recent backups immutable for…”. Here you also configure the number of days the objects should be immutable and it is important to configure the same value that was configured on the bucket.

When that is done you finish the wizard and now the function is enabled on the object repository. Now it is time to configure a backup schema which tells Veeam which files that should be sent to the repository.

## Conclusion

We have explained the importance of offsite backups and why object locking is an important feature. By using it disasters can be avoided at the same time as recovery time (RTO) can be shortened since a restore from tapes can take a long time. With object locking, the best from two worlds can be achieved.

<div class="flexcontainer-shortcode" style="background: var(--text-color);">

{{< services >}}

</div>
