---
title: "Embracing change: A Glimpse into Safespring's Engineering plans for 2025"
date: 2025-02-17
intro: ""
draft: false
tags: ["English"]
showthedate: true
card: "safespring_card_53.webp"
sidebarimage: "safespring_card_53.webp"
eventbild: ""
socialmediabild: ""
language: "En"
sectiontext: "Blog"
section: "blogg"
author: "Rob Haverkamp"
TOC: "In this post"
aliases:
    - /blogg/2025/2024-02-engineering-plans/
    - /blogg/2025/2025-02-engineering-plans/
---


Hello everyone,

I'm thrilled to share some exciting updates from Safespring's engineering department. Since becoming Head of Engineering during September 2024, I've had the privilege of leading our teams that have been working tirelessly to enhance our infrastructure and capabilities. 

It’s now almost 6 months since I took this role and I’m incredibly happy to share many exciting announcements and insights today!

{{% accordion title="TL;DR" %}}
So you want the short version? Safespring’s engineering team is making big moves in 2025! 
- After a major transition from Red Hat to Ubuntu, the migration in STO1 is nearly complete. 
- STO2 is also evolving from a backup site into a full compute center, supporting new GPU capabilities with Nvidia A2 GPUs launching in April. 
- Safespring is also developing a scalable Kubernetes PaaS on Talos Linux, set for a 2026 release, with alpha testing coming soon.  

These upgrades reinforce Safespring’s commitment to open, sovereign, and compliant cloud solutions.
{{% /accordion %}}
{{< accordion-script >}}


### **STO1 - lessons learned**

Historically Safespring has been a large user of the RedHat ecosystem. All our cloud solutions had been build on top of RedHat or CentOS systems. We've been hurt badly by the decisions from redhat[^1], and are still feeling the consequences of this.

We've been gradually migrating our cloud solutions to the Ubuntu ecosystem, it's taken a large toll to maintain two versions of our solutions in parallel and migrate. So far we've had 6 maintenance windows scheduled for one of our datacenter in Stockholm (STO1) this year. This week there are two more events scheduled, and after that we've completely shifted away from the RedHat ecosystem. 


### **Cleaning Up and Scaling in Stockholm**

One of our major initiatives has been the cleanup of legacy infrastructure in our second datacenter in Stockholm (STO2). This isn't just about cleaning up; it's about laying a robust foundation for future growth. We're clearing out two full racks of hardware and approximately 450 HDDs, making way for our new compute platform. Additionally, we're adding a new public network with 2x10GbE capacity, further enhancing our connectivity and performance.

This work is needed, for the first exciting announcement. We’re building a second compute site in Stockholm. Historically STO1 has been our compute site with STO2 being our archive and backup site. Very soon this will not be the case anymore though!


### **Enhancing our GPU and AI capabilities** 

Safespring is a large partner in the European Open Science Cloud (EOSC) initiative [^2]. Together with PSNC we are the infrastructure and PaaS providers. During 2024 we introduced Nvidia H100 capabilities, specifically for EOSC.

There has been an incredible demand for this. We’ve listened to our customers and are making large investments to keep up with demand. 

{{< quote "Rob – Head of Engineer" >}}I am thrilled to announce that we're adding Nvidia A2 GPUs to our infrastructure, enabling advanced computational tasks such as machine learning and data analytics. {{< /quote >}}

These GPUs will be available starting in early April in our new compute site STO2. Throughout 2025 we will continue expanding these capabilities by introducing them into STO1 and our datacenter in Oslo (OSL2).

### **Building a Scalable Kubernetes PaaS**

We're not just stopping at infrastructure. We're also developing a [highly scalable Kubernetes Platform-as-a-Service (PaaS)](/en/services/containerplatform/) on top of Talos Linux[^3]. This initiative will empower customers to deploy, manage, and scale containerized applications with ease. Talos Linux, known for its security and efficiency, will provide a solid base for our Kubernetes offerings, ensuring that our PaaS is both powerful and secure.

One of our key features is that we can offer this in our public cloud sites as well as in our private cloud sites that we maintain for customers.

We're aiming to launch this platform in 2026, but we're already on the lookout for alpha testers soon. If you're interested in getting early access and helping us shape the future of this platform, stay tuned for more information on how to get involved[^4].

### **Looking Ahead** 

I'm incredibly proud to be working for a company with such diverse and meaningful customers. 2025 is a year of large investments and challenging projects for Safespring. I'm looking forward to working through it together with our incredibly skilled teams and ensure to deliver the best Open, Sovereign and Compliant cloud solutions for our customers.

## Links
Deep-dive in more information with these links.

[^1]: **Red Hat.** *CentOS Linux End of Life (EOL*). Red Hat explains the transition away from CentOS Linux, what it means for users, and alternative options moving forward. Retrieved February 17, 2025, from [redhat.com](https://www.redhat.com/en/topics/linux/centos-linux-eol).
[^2]: **Safespring and EOSC.** Brief look at Safespring’s involvement in the European Open Science Cloud. Retrieved February 17, 2025, from https://www.safespring.com/eosc/.
[^3]: **Talos Linux.** *A Modern Secure Kubernetes OS.* Talos Linux is a minimal, immutable operating system designed for Kubernetes, focusing on security and automation. Retrieved February 17, 2025, from https://www.talos.dev/.
[^4]: **Safespring Container platform.** Service description of our container platform. Retrieved February 17, 2025, from [safespring.com/containerplatform](/en/services/containerplatform/)