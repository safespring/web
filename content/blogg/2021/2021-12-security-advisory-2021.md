---
title: "Security advisory regarding the Log4j critical vulnerability"
intro: "A a small internal module that handles logging for Java programs may affect your application."
date: "2021-12-13"
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "en"
section: "Tech update"
aliases:
    - /blogg/security-advisory-2021
---

{{% ingress %}}
A vulnerability in {{< tooltip "Log4j" >}}Log4j is a small internal module that handles logging for Java programs.{{< /tooltip >}} was announced on the 10th of December 2021. Reports worldwide show that the vulnerability is used actively and successfully in attacks.
{{% / ingress %}}

 Log4j is a Java-based logging utility widely used in popular software systems.

### Key Takeaways

- This has no consequences for Safesprings systems.
- Safespring customers should stop their services that might be affected.

<div style="margin-bottom:50px;"></div>


## What we've done so far

{{% ingress %}}
Fortunately, this has no consequences for our systems, and no services are down.
{{% /ingress %}}

However, we must point out that we do not have, and should not have, any knowledge of which applications our customers run and how they are affected by this.

### Recommendations to our customers

- Stop any services that might be affected
- Go through all logs looking for attempts and possible successful attempts using this exploit
- Immediately rotate secrets that a compromise might have leaked
- Upgrade to the safe version of Log4j or apply mitigations for the Log4j exploit

<div style="margin-bottom:50px;"></div>


If you think you are not vulnerable, please check to be on the safe side one more time.

Please note that Log4j is embedded in many other logging tools and services using those logging tools. There is a growing list of affected (and non-affected).

{{< 2calltoaction "Affected technologies" "https://gist.github.com/SwitHak/b66db3a06c2955a9cb71a8718970c592" "Read CVE announcement" "https://nvd.nist.gov/vuln/detail/CVE-2021-44228" >}}

<div style="margin-bottom:50px;"></div>

Suppose we at Safespring have indications that services or instances in our infrastructure are affected by the Log4j vulnerability and actively used in attacks. In that case, we will alert the customer, and if that customer doesn't take action, we will have to shut down those instances as soon as possible to prevent further damage.

We don't actively monitor for this, but others might notify us. It is the responsibility of the service owner to investigate the situation further in such cases.
