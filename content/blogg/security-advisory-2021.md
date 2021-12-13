---
title: "Security advisory regarding the log4j critical vulnerability"
date: "2021-12-13"
draft: false
tags: [""]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "en"
---

{{% ingress %}}
A vulnerability in {{< tooltip "Log4j" >}}Log4j is a small internal module that handles logging for Java programs.{{< /tooltip >}} was announced on the 10th of December 2021.
{{% / ingress %}}

Reports worldwide show that the vulnerability is actively and successfully used in attacks. Log4j is a Java based logging utility widely used in popular software systems.

{{< inline_rubrik >}}Key Takeaways{{< /inline_rubrik >}}

- Safespring has temporarily disabled all affected services.
- This has no consequences for Safesprings systems.
- Safespring customers should stop their services that might be affected.

<div style="margin-bottom:50px;"></div>


### What Safespring has done so far

We at Safespring have gone through our systems and temporarily disabled all affected services.

Fortunately, this has no consequences for our systems, and no services are down. However, we must point out that we do not have, and should not have, any knowledge of which applications our customers run and how they are affected by this.

### Our recomendations to our customers

- Stop any services that might be affected
- Go through all logs looking for attempts and possible successful attempts using this exploit
- Immediately rotate secrets that a compromise might have leaked
- Upgrade to the safe version of log4j or apply mitigations for the log4j exploit

<div style="margin-bottom:50px;"></div>


If you think you are not vulnerable, please check to be on the safe side one more time.

Please note that log4j is embedded in many other logging tools and services using those logging tools. There are a growing list of affected (and non-affected) technologies published here.

{{< 2calltoaction "Affected technologies" "https://gist.github.com/SwitHak/b66db3a06c2955a9cb71a8718970c592" "Contact Safespring" "/en/contact/" >}}

<div style="margin-bottom:50px;"></div>

If we at Safespring have indications that services/instances in our infrastructure are taken and actively used in attacks, we will alert the customer, and if action is not taken, we will have to shut down those instances as soon as possible to prevent further damage.

We don't actively monitor for this but we might get notified by others. It is the responsibility of the service owner to investigate the situation further in such cases.
