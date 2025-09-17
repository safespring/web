---
ai: true
title: "Relevance in a new adequacy decision?"
date: "2023-04-17"
intro: "This text analyzes the European Commission’s adequacy decision regarding data transfers to the United States and its impact on European organizations and citizens’ rights. We also discuss strategies to ensure digital sovereignty and long-term sustainability in IT environments for European companies and public authorities."
draft: true
tags: ["Svenska"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "blog"
author: "Fredric Wallsten"
author_image: "firm"
language: "en"
toc: ""
sidebarlinkname: ""
sidebarlinkurl: ""
sidebarlinkname2: ""
sidebarlinkurl2: ""
aliases:
  - /blogg/2023/2023-04-adekvansbeslut-1/
---
{{< ingress >}}
On 13 December 2022, the President of the European Commission, Ursula von der Leyen, announced a draft so-called adequacy decision for data transfers to the United States under the General Data Protection Regulation, a measure the European Commission can take to guarantee the lawfulness of processing personal data on a third country’s (in this case the USA’s) territory.
{{< /ingress >}}

The new draft is an update of the earlier [adequacy decision](#ordlista), [Privacy Shield](#ordlista) (the Data Shield), which the Court of Justice of the European Union found to be in conflict with European data protection law. But is it also an upgrade?

Safespring has previously published two white papers analyzing the technical and legal security of data transfers to the United States. One reviews US law enforcement and intelligence legislation and the [General Data Protection Regulation](#ordlista), and another examines the technical and legal effects of the CJEU’s so-called “[Schrems II](#ordlista)” case, which invalidated the Privacy Shield, with recommendations for public-sector actors.

One of our core ideas is that European organizations can avoid the need for unfortunate, costly, yet predictable operational overhauls if, already at an early stage of planning their IT infrastructure, they think through issues such as [digital sovereignty](#ordlista), open standards, and counteracting [lock-in effects](#ordlista). These strategies are good for the nation, for Europe, for our local and regional technical capabilities, and they encourage competition and choice. They require engagement from the buyer side of the IT market, as well as a thirst for knowledge, but the benefits are substantial.

The risk is high that yet another adequacy decision from the European Commission will not be an upgrade on the previous one. As the European Data Protection Board (EDPB) observed in its [Opinion 5/2023](https://edpb.europa.eu/system/files/2023-02/edpb_opinion52023_eu-us_dpf_en.pdf) of 28 February 2023, there is still a long way to go before the European essential guarantees for individuals’ rights are met. Under the current draft text, the European Commission cannot guarantee that the US government will set aside its own national security for the sake of European citizens.

At the same time, the CJEU says that the European Commission, and EU Member States, may not set aside their own citizens’ rights for the sake of another country’s national security either. “Europe cannot be ashamed of its fundamental principles,” according to Koen Lenaerts, President of the CJEU since 2015.

The IT environment of a company or public authority in the EU should remain lawful, maintainable, refinable, adaptable, and developable even after the European Commission’s adequacy decision has been tested in court. For both employees and citizens, it is damaging to trust in the long term to see investments made in IT systems that only hold up as long as they are not scrutinized. There are more sustainable ways forward.

Our principles and recommendations for the procurement of IT systems and IT infrastructure are good tools for public authorities and private actors to rely on, regardless of what is happening at the highest political level.

## Glossary

{{< ingress >}}
The following concepts are important for understanding the EU’s data protection legislation and its impact on data transfers to third countries such as the United States.
{{< /ingress >}}

{{% accordion title="Adequacy decision" %}}
An adequacy decision is a term used under the EU’s General Data Protection Regulation.
It is a decision the European Commission can adopt to determine that a third country’s data protection laws are essentially equivalent to the EU’s General Data Protection Regulation.
The purpose of an adequacy decision is to facilitate international data transfers and protect the rights of data subjects.
The US Privacy Shield arrangement was previously an adequacy decision, but it was invalidated by the CJEU in 2020.
{{% /accordion %}}
{{% accordion title="General Data Protection Regulation (GDPR)" %}}
The General Data Protection Regulation (GDPR) is an EU regulation governing how personal data must be handled within the EU.
The regulation took effect in 2018 and replaced the previous Data Protection Directive.
Its purpose is to protect personal data and give individuals greater control over how their data is used.
All organizations processing personal data within the EU must comply with the GDPR’s provisions.
{{% /accordion %}}
{{% accordion title="Privacy Shield" %}}
Privacy Shield was an arrangement between the EU and the United States governing how personal data could be transferred from the EU to the US.
The arrangement was signed in 2016 and replaced the earlier Safe Harbor framework, which had also been invalidated by the CJEU.
Privacy Shield was struck down in 2020 after the CJEU found it violated the EU’s data protection framework.
{{% /accordion %}}
{{% accordion title="Schrems II" %}}
Schrems II is a legal case concerning the transfer of personal data from the EU to the US.
The case is named after Maximilian Schrems, an Austrian lawyer who sued Facebook following Edward Snowden’s revelations about surveillance by US authorities.
In July 2020, the CJEU ruled that the Privacy Shield arrangement was invalid and that the European Commission must ensure that US authorities’ access to personal data is limited to protect the rights of EU citizens.
{{% /accordion %}}
{{% accordion title="Digital sovereignty" %}}
Digital sovereignty is a concept concerning an organization’s independence and autonomy in its use of digital technology. It means an organization should have full control over its digital infrastructure and data, without being locked in by technologies or services from other countries or companies.

An important aspect of digital sovereignty is ensuring that data and information collected and processed within a service provider remain within the EU’s borders and cannot become accessible to other countries or companies without authorization. This is particularly important in areas such as national security and personal data protection.

To achieve digital sovereignty, an organization can invest in local technology and security systems and promote the use of open standards. Another crucial measure is to avoid lock-in effects by not becoming overly dependent on specific technology vendors or platforms.

Digital sovereignty is an important issue within the EU, which seeks to ensure a common digital single market while protecting Member States’ sovereignty and autonomy. The concept is also relevant in global discussions on data protection and digital security.
{{% /accordion %}}
{{% accordion title="Lock-in effects" %}}
Lock-in effects is a term used to describe situations where an organization becomes dependent on a specific technology vendor or platform.
This can make it difficult for the organization to switch providers. [Read more about egress-cost](/blogg/2023/2023-03-egress-cost/), which is a common lock-in mechanism.
{{% /accordion %}}

{{< accordion-script >}}

{{% note "Read more" %}}

1. [White paper on US law enforcement and intelligence legislation and the General Data Protection Regulation.](/whitepaper/cloudact/)
2. [White paper on the technical and legal effects of the CJEU’s so-called “Schrems II” case, in which the Privacy Shield was invalidated, with recommendations for public-sector actors.](/whitepaper/schrems-ii/)

{{% /note %}}

<script type="text/javascript">
var scrollLinks = document.querySelectorAll('a');

scrollLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    var target = document.querySelector(this.getAttribute('href'));
    var targetTop = target.offsetTop;
    
    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });
    
    target.classList.add('scroll-animation');
    setTimeout(function() {
      target.classList.remove('scroll-animation');
    }, 1000);
  });
});
</script>