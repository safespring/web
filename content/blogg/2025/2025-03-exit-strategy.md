---
title: "When you want, need or are forced to leave an American cloud provider"
date: 2025-03-26
intro: "No matter why you leave, you are faced with the Exit-dilemma."
draft: false
tags: ["English"]
showthedate: true
card: "safespring_card_54.svg"
eventbild: ""
socialmediabild: ""
language: "En"
sectiontext: "Blog"
section: "blogg"
author: "Daniel Melin"
---

{{< ingress >}}
In today’s geopolitical landscape where USA quickly tries to become more like China and Russia, customers to American cloud providers are faced with difficult decisions.
{{< /ingress >}}


**Do you want to leave?** Maybe you feel that USA is too far gone destroying their democracy, or that things in general are going haywire.

**Do you need to leave?** Maybe your customer demands that your service is free from American connections or your employees refuse to work with American cloud providers or the Trans-Atlantic Data Privacy Framework disappears. If you are in the public sector or primarily sell to the public sector then you may need to reassess whether you can store and process personal data and/or secret information.

**Are you forced to leave?** Maybe Trump decided that your organization, your country or your continent is VERY BAD and therefore will not have access to American cloud services any longer or that tariffs make the cloud services too expensive to use.

No matter why you leave, you are faced with the Exit-dilemma.

{{% note "Exit process" %}}
Here is a list of some of the things you could consider in the Exit process:

1. Document which American cloud services you use.
2. Document which kind of services you buy. IaaS, PaaS, SaaS or other XaaS?
3. Document what kind of data is stored and processed in the services.
4. Try to read the contract(s). They are often very long, very complex, very unfriendly to the customer and not always complete though. 
    1. What kinds of rights do you have to your data and metadata? 
    1. Can you extract everything? 
    1. In which formats can you get the data and metadata? 
    1. Is it possible to reuse the data and metadata without loss?
5. If you use compute instances and S3 storage, the process should be quite straightforward and there should not be any data loss.
6. If you use Kubernetes and containers, there are some pitfalls, but you should be able to migrate without data loss.
7. If you are the developer behind a SaaS that uses someone else’s Iaas/PaaS then your mileage will vary a lot depending on how locked in you are to functions only available from one cloud provider. In this case it might be necessary to change your application so that it can run in any standard cloud environment. This will be beneficial for you in the long run anyway. :)
8. Networking is key. When migrating between platforms it is important to be able to handle the transition. That could be done by setting up an overlay network that spans both the platforms. In this way each function can be migrated with minimal impact.

{{% /note %}}

No matter your situation, talk to us at Safespring and we will guide you through your Exit.


{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Daniel Melin" %}}
I'm Safespring's Business Development Manager. Whether you’re interested in procuring our services or learn more about initiatives like EuroStack, I’m here to help you navigate and leverage our offerings.

{{< inline "Call" >}} +46 (0)76 868 00 59 
[daniel.melin@safespring.com](mailto:daniel.melin@safespring.com)
{{% /custom-card %}}




