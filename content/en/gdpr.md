---
title: "Safespring: Comprehensive GDPR Protection Beyond Third-Country Transfer"
language: "En"
date: 2024-01-01T13:58:58+01:00
draft: false
section: "Compliance"
intro: "Here we provide an in-depth overview of how our Swedish public cloud platform not only meets the strict requirements of GDPR, but also goes a step further to ensure your company's data protection. With Safespring, you get not just a solution that protects against data transfer to third countries, but a comprehensive strategy that covers more aspects of data protection and security."
background: "safespring-blue-fade2.svg"
darkmode: "off"
socialmedia: ""
sidebarlinkname: "Watch demo"
sidebarlinkurl: "/demo/compute/"
sidebarlinkname2: "Contact us"
sidebarlinkurl2: "/en/contact"
saas: ""
aliases:
- /en/gdpr/
TOC: "On this page"
---

{{< icon-block-container >}}
    {{< icon-block icon="fa-solid fa-shield-alt" text="External Data Protection" link="#external-data-protection-measures" color="#FA690F">}}
    {{< icon-block icon="fa-solid fa-lock" text="Internal Data Protection" link="#internal-data-protection-measures" color="#195F8C">}}
    {{< icon-block icon="fa-solid fa-file-alt" text="Schrems II White Paper" link="/whitepaper/schrems-ii/" color="#32cd32">}}
    {{< icon-block icon="fa-solid fa-video" text="GDPR Webcast Series" link="/webinar/gdpr-fireside-chat/" color="#195F8C">}}
    {{< icon-block icon="fa-solid fa-database" text="About Our Data Centers" link="/about-safespring/datacenter/" color="#3C9BCD">}}
    {{< icon-block icon="fa-solid fa-user-shield" text="Personal Data Processing" link="/documents/personal-data-processing/" color="#3C9BCD">}}
{{< /icon-block-container >}}



## External Data Protection Measures
In the context of data protection and GDPR, third-country transfers are often discussed. An entire chapter in the GDPR deals exclusively with the limitations of the possibilities to transfer data, and we have previously developed [recommendations for organizations](/whitepaper/schrems-ii/) that are still grappling with this issue. But these are not the only requirements for data controllers where processors can help.

Safespring's obligation as your data processor is to actively assist with your compliance (according to Article 28.3). We are here to make your work easier and more efficient when it comes to meeting data protection requirements. Our cloud platform ensures that you, as data controllers, can always meet the requirements GDPR imposes on you.

We interpret this as a positive obligation to not only implement security measures in our own systems but also to inform about the possibilities our infrastructure offers you to tailor data protection as needed. Below is a list of technical security features that can contribute to higher procedural security, which we either directly provide or can offer good advice on.




{{% accordion title="Log Management and Security Measures" id="1" %}}

Protection against internal and external active/aggressive expertise: Safespring currently has effective debugging and system logging.

#### Safespring's recommendation to our customers
Our recommendation is to use established industry tools for intrusion detection and audit logging. Store logs both locally and centrally, and use tools to identify normal log patterns.

#### This contributes to maintaining GDPR's requirements on
  - integrity (A5.1.f),
  - confidentiality (A5.1.f), and
  - accountability (A5.2), as well as
  - security measures for confidentiality and integrity (32.1.b).
{{% /accordion %}}




{{% accordion title="User Management and Access Control" id="2" %}}

Protection against internal Passive/Neutral Expert: To manage risks associated with employees' mistakes or role changes, Safespring carefully manages user access. All accounts must be individual.

#### Safespring's recommendation to our customers
Our recommendation is to remove individual accounts when employees leave or change roles. This includes using timed permissions for applications and the ability to force data storage on a server one connects to securely to prevent sensitive files from being stored locally on the user's workstation.

#### This contributes to maintaining GDPR's requirements on
  - accuracy (A5.1.d),
  - data minimization (A5.1.e),
  - integrity (A5.1.f), and
  - security measures for access (A32.1.b).
{{% /accordion %}}




{{% accordion title="Data Encryption" id="3" %}}

Safespring implements "encryption at rest" by using disk encryption on all disks in its data centers, helping the customer secure personal data

 stored on the platform in accordance with GDPR. Encryption at rest and in transit is crucial to ensure data remains secure. Safespring applies at least "TLS 1.2" for communication to and from all services.

#### Safespring's recommendation to our customers
Our recommendation is to establish a "zero-knowledge" architecture, where data is encrypted before being sent to Safespring's platform, where applicable. Safespring's Backup service has this functionality built in as an option that automates encryption. For storing less sensitive data, customers can also rely on Safespring's built-in encryption at rest.

#### This complies with GDPR's requirements on
  - built-in data protection (A25.2),
  - confidentiality (A5.1.f).
{{% /accordion %}}




{{% accordion title="Backup and Recovery" id="4" %}}

Protection against physical and technical incident management: Safespring implements key measures to ensure the availability and recovery of customer data. We offer a robust backup solution for our internal services and environments, but it is important to note that we do not back up customer-entered data. Customers are encouraged to ensure their data is backed up to restore availability and access to personal data when needed. Our backup service is a valuable option that facilitates customers in meeting this recommendation.

#### Safespring's recommendations to our customers
Our recommendation is to actively manage the backup and redundancy of their data. By using our backup service and taking advantage of our robust block storage, customers can ensure high availability and quick recovery of their data.

#### This complies with GDPR's requirements on
  - availability,
  - recoverability, and
  - resilience of processing systems and services (A32.1.c).

{{% /accordion %}}




{{% accordion title="Security Audit and Policy Update" id="5" %}}

Policy documents and revisions: Safespring has several policy documents and security guides, which means we regularly update and revise our security policies.

#### Safespring's recommendations to our customers
Our recommendation is to regularly update and revise their own security policies to ensure that established routines are followed or to update routines so they reflect the business in practice.

#### This complies with GDPR's requirements on
  - regularly testing, assessing, and evaluating the effectiveness of technical and organizational measures to ensure the security of processing (Article 32).
{{% /accordion %}}



{{% accordion title="Redundancy" id="6" %}}

Protection against physical and technical failure or ransomware

Central block storage for increased redundancy: As part of our service, we offer central block storage to Safespring Compute, where data is stored in three copies across a cluster, minimizing dependence on specific hard drives. This measure is crucial to ensuring data access and recovery in the event of technical failure.

#### This complies with GDPR's requirements on
  - the resilience of processing systems and services (32.1c)

{{% /accordion %}}
{{< accordion-script >}}




{{< horisontal-card image="/img/card/safespring-scaleut_use-case-ebba.webp" cardtitle="Federated Machine Learning" link="/services/case/scaleout/" linktext="Read Use Case" text="“There is value in having critical infrastructure located in Sweden where we are not dependent on other countries' legislation...“ – Ebba Kreamer, Scaleout" >}}




## Internal Data Protection Measures

Internal data protection measures are those that Safespring implements for personal data we ourselves are responsible for. We are a cloud company that operates towards other businesses. Our commercial activity involves personal data to a very limited extent. In production, only usernames and passwords for users on the platform are handled.

### Administrative Data Management

In the administrative area, it is mainly in the handling of invoices, personnel administration, through our website, and in certain types of information distribution for marketing purposes that we handle contact details or aggregated statistics.

For all types of accounting actions, we are bound by the Companies Act, the Accounting Act, tax legislation, and guidelines on good auditing practice. Receipts, contracts, invoices (incoming and outgoing), or information on sickness compensation payments are preserved for seven years to accommodate the need for retrospective checks of our accounting. After this period, the information is culled in accordance with our data protection policy for personnel management.

### Marketing Measures and Consent

For marketing beyond web analysis, it applies that one interacts with Safespring based on consent or our legitimate interest. This may be, for example, a person on some social media marking themselves as interested in cloud services and therefore, as a result, assumed by us to be interested in Safespring even if they have not personally contacted our CMO. In other cases, we receive contact details when people sign up for events and seminars.

For web analytics, we collect aggregated data handled via a local tool (Matomo) after a person visiting our website has indicated that they agree to such data collection. Further information is available on our website.