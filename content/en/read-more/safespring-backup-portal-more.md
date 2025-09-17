---
language: "en"
ai: true
---
#

{{< author-gabriel >}}

## Safespring Backup: A complete overhaul of the user portal

<div class="ingress">
	<p>
Safespring Backup is based on IBM’s well-established Spectrum Protect solution. It has many strengths, such as high security, excellent scalability, and automated data lifecycle management. 
</p></div>

Spectrum Protect can protect an unlimited number of terabytes of data with minimal administrative effort.

Backups are encrypted in transit with TLS 1.2, but can also be configured to be automatically encrypted client-side for even higher security.

As a proven solution for large enterprises, Spectrum Protect can handle the scale of large providers’ deployments like Safespring’s. However, Spectrum Protect lacks flexible administration with user account management and role assignments. Since backup is often managed by a designated team in a large organization, this drawback is shared by many other backup solutions on the market and is therefore not specific to Spectrum Protect.

## Easier administration with the new portal

To address this, Safespring has developed a user portal and API bridge for our Backup service. The old portal served its purpose well by adding self-service to set up new nodes and generate key tokens for automatic provisioning of multiple nodes without direct human interaction.

Although the old portal was functional, it lacked status dashboards and the ability for customers to add their own user accounts. Users could not create their own hierarchies to simplify management of different groups of servers being backed up.

![Safespring’s new backup portal](/img/safespring-backup-portal.webp)

## New features and benefits

With our relaunch of Safespring Backup, we’re introducing a complete redesign of the user interface. The solution is built on Auwau Cloutility and includes features such as:

- Self-service with the ability to create new users without contacting Safespring and assign roles and privileges to them.
- Multi-tenancy with the ability to create hierarchies and users with role-based access to different parts of the hierarchy. This allows an administrator to delegate different servers to different parts of the organization.
- Provisioning where the administrator can define the process with default settings to let users easily handle their own backup activation.
- An advanced (yet easy-to-use) reporting engine that makes it possible to track the status of all running backups. It’s also possible to set schedules to send reports at specific intervals to specific email addresses.
- A REST API that lets you do everything you can do in the web UI via API calls to automate your deployment even further.

### Protection against ransomware

Safespring Backup uses a locking mechanism on each node that registers to use the service. This mechanism is designed to prevent the backup agent from deleting backups before a preset retention period has elapsed. This retention period is set to a certain number of days, during which the backups are kept extra secure.

By implementing this mechanism, we can ensure that even in the event of a ransomware attack, the attacker would not be able to delete all backups from the server before encrypting the data locally. This is because the backups are locked and cannot be deleted until the retention period has passed.

In addition, the mechanism provides an extra layer of protection to ensure data recovery in the event of an attack. By keeping multiple backup copies available, we can restore data to a point in time before the attack occurred, minimizing the impact on our customers.

Overall, using this mechanism helps us deliver a more secure and reliable backup service for our customers, and is an important step in defending against the growing ransomware threat landscape.

## Conclusion

With our relaunch of Safespring Backup, Safespring is taking a big step forward in improving the user experience and ease of managing your backups with Safespring. With the reliability of Spectrum Protect combined with a fully developed self-service portal to run your backups, it’s never been easier. With a comprehensive REST API, automation of various administrative tasks is possible.

With Safespring Backup, you get a secure (yet easy-to-use) solution to manage all your backups.