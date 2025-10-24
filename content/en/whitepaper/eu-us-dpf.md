---
ai: true
title: "Where things stand after the EU-US Data Protection Framework (DPF)"
section: "White Paper"
language: "en"
date: "2024-03-13"
intro: "In light of the European Commission’s latest decision in July 2023 on data transfers to US cloud service providers, there is reason to once again review the changed circumstances."
draft: false
tags: ["Svenska"]
author: "Amelia Andersdotter"
dokumentnamn: ""
socialmediabild: ""
sidebarlinkname: ""
sidebarlinkicon: ""
sidebarlinkurl: ""
card: ""
eventbild: ""
toc: "Contents"
aliases:
  - /whitepaper/eu-us-dpf/
---

{{< ingress >}}
The European Commission’s latest decision on data transfers to the United States has once again drawn attention to the legal and technical challenges faced by European organizations.
{{< /ingress >}}

In two earlier white papers, from 2018[^1] and 2020[^2], Safespring reviewed the legal and technical landscape for organizations planning their IT infrastructure.

In light of the European Commission’s most recent decision on data transfers to U.S. cloud providers in July 2023[^3], there is reason to once again review the changed circumstances.

For the most part, the recommendations remain the same. In some places we have updated the language and removed recommendations that referred to old data transfer decisions. Infrastructure planning is not a new activity; the cornerstones of a responsible approach to infrastructure for the foreseeable future are the same today as they were fifty years ago—or thirty, or five. It is about giving your organization the ability to avoid vendor lock-in, to predict and ideally minimize costs and maintenance overhead. Individual organizations, Sweden, and Europe all need to work increasingly to assert control over the parts of the infrastructure that must be stable and reliable, and over those that should enable flexibility, change, and innovation.

{{< quote "Amelia Andersdotter" >}}
As others besides Safespring have noted, there is little reason to believe that the changes in the new data transfer decision provide “essentially equivalent protection” to European law.
{{< /quote >}}

## Background

### European data transfer decisions

On 10 July 2023, the European Commission published its latest decision concerning legal certainty for transfers of personal data to entities subject to U.S. law: the EU-US Data Protection Framework (DPF). This follows the Safe Harbor and Privacy Shield decisions, which were previously invalidated by the Court of Justice of the European Union (CJEU). The EU-US DPF is based on negotiations between the EU Member States and the European Commission, on the one hand, and the Commission and U.S. federal authorities, on the other. The negotiations resulted in an agreement between the U.S. and the EU, included as an annex to the decision.

Among the novelties in the EU-US DPF are references to key concepts in European data protection law: proportionality,[^4] necessity,[^5] and legitimate interests[^6]. The previous ombudsperson function has been split into new functions: a Civil Liberties Protection Officer[^7] and a Data Protection Review Court[^8].

As others besides Safespring have noted, there is little reason to believe these changes provide “essentially equivalent protection”[^9]. Proportionality, necessity, and legitimate interests are not absolute but relative concepts. If the starting point is that U.S. security interests—for example, anything that might affect the U.S. economy, U.S. companies, or U.S. citizens—take precedence over other interests, then it may be both necessary and proportionate under U.S. law to restrict the rights of European citizens.

The CJEU’s objection to the previous ombudsperson function was not that the title was wrong, but that the powers granted to the ombudsperson were insufficient. The judicial function is not seen by the CJEU as an administrative authority whose mandate can be flexibly directed by political instructions, but as a separate and independent function detached from other politically directed activities. The European Data Protection Supervisor (EDPS) has also held, in a decision against the European Commission, that based on the CJEU’s rulings, one must conclude that only European authorities may be empowered to make secret claims to access protected data[^10].

From that perspective, when legally reviewed the CJEU will likely have no choice but to strike down the EU-US DPF as well. It need not take long. The Safe Harbor decision was invalidated after 15 years, and the Privacy Shield decision after four. New legal avenues for European citizens to defend their rights in court have significantly shortened the path from a presumptively unlawful decision to judicial review by the CJEU. Even if the wheels of justice still grind slowly, we at Safespring believe they can no longer be assumed to grind more slowly than the planning horizon for IT infrastructure.

### Swedish legislation

It is not only European law that matters for Swedish organizations planning their IT infrastructure. Swedish legislation, such as the Protective Security Act and the Public Access to Information and Secrecy Act, also plays a role. This can involve interpreting concepts such as “to disclose [a classified item of information],” “direct access,” or the difference between a disclosure and technical processing. It is currently unclear if and how the government distinguishes between situations where authorities cooperate on IT operations (coordination) and where an individual authority contracts a private actor to provide IT operations (outsourcing)[^11].

When analyzing supply chains, questions may arise about the extent to which the customer must ensure that subcontractors providing support services have or have had problematic citizenships. For example, when a Balkan service technician in the Czech Republic provides system administration support services for a government system in Sweden[^12]. In some cases, the requirements become so strict that all personnel handling the IT system must undergo a security clearance, where Swedish citizenship is required even to be eligible for clearance.

When assessing ambiguities in the interpretation of Swedish law, the customer often first needs to determine whether it is an activity of critical importance to society within the meaning of Swedish national security policy[^13]. A municipal power grid may, for example, be locally critical to society but not nationally critical. Central government authorities are often nationally critical.

The impact of Swedish legislation on infrastructure planning is primarily about administrative control.

### Standardization, open source, and certification

An important development in European law is the growing emphasis on industry norms, standards, and certifications. This applies, for example, in the NIS2 Directive, and even more clearly in laws such as the AI Act and the Cyber Resilience Act.

Standardization and certification in the IT industry are nothing new. Devices for generating cryptographic signatures have been standardized since the 1990s. Think of bank tokens, card readers, chips on biometric passports and ID cards, and similar applications. There are also quality standards for software: the so-called Common Criteria and FIPS are used in North America to test implementations of security functions. In the EU there are no comparable region-wide initiatives or standards.

The most common criticism of software certification programs is that certification cycles are long and expensive for vendors to complete. This reduces the incentive to discover, analyze, and remedy security problems after certification, even though no existing certification guarantees flawless products (and for software, that is not even possible).

In general, it is becoming increasingly common within a given industry to collaborate around jointly developed, open application programming interfaces (APIs). For example, OpenRAN, a set of interfaces for managing mobile network equipment, consists of open-source applications that each mobile network operator can contribute to, modify in their own networks, or implement as is to ensure the highest level of interoperability with other mobile networks. Corresponding sets of interfaces exist for cloud services, management of the Internet of Things, interfaces for in-vehicle electronics, and more. Open source has become the fastest way to guarantee the greatest degree of digital interoperability.

Open source code reduces the ability of vendors and implementers to hide security flaws discovered after any certification. It also enables public steering of the resources that go into the consortia responsible for interface development. Exactly how that governance will evolve remains to be seen, but clearly there are both security and interoperability reasons to orient toward open-source solutions.

## Recommendations

### Establish the time horizon you want to work on

- Decide on the time horizon for your infrastructure planning and how often you want to seek out and procure new services. Compare this time horizon with how quickly the legal context, the technology landscape, and your organization more broadly may change.
- Analyze the pace of change in contractual terms and how much influence you can exert over them. This may involve pricing and service availability terms, for example.
  - Note: When using vendors’ standard contracts, it is common for terms to change even with the customer’s passive consent. Not accepting changes to standard terms is, in these situations, tantamount to initiating a migration project.
- Test and model different scenarios. Quantify your probability assessments and impact analyses. {{< note "Example scenario" >}}<p>For example, if you assume a 20% risk of a complete halt to transfers of personal data to U.S. services over twelve months starting nine months from now, how would this affect the organization and the decision-making process for IT strategy regarding vendor selection?</p>{{< /note >}}

### Create conditions for easy migration

- Building your environment with containers (e.g., Kubernetes or Docker) makes it easier to migrate development and production environments between providers compared with virtual servers or physical servers.
- Calculate how data transfer costs would affect you the day you want to move out. Many cloud service providers do not charge for uploading data. Many more charge customers to retrieve their data.
  - Note: This is often called ingress (upload) and egress (download).
- Separate data from services using open (or standardized) interfaces to make it easier to switch data storage platforms.
  - Pitfall: Amazon’s S3 protocol is a de facto standard for large-scale storage of unstructured data in the cloud. Unfortunately, it is not always possible to interoperate with all the functionalities Amazon builds into its version of S3. If you use S3, make sure to use only those functionalities that can be implemented by all S3 providers.
- Invest in your own identity management rather than relying on the cloud provider’s. The ramp-up may be a bit longer, but migration becomes much easier.
- Ensure that, in designing its service, the service provider has used openly specified APIs and data formats.

### Personal data protection

- Do the GDPR groundwork for handling personal data. Review:
  - where you geographically store your personal data,
  - the legal basis you rely on for the processing,
  - how sensitive the personal data you process is,
  - whether a data retention and deletion routine is implemented,
  - how you inform individuals about the processing, and
  - if personal data is stored outside the EU/EEA, what legal basis you have for transferring it there. {{< note "Deletion" >}}<p>Deletion routines are especially important if data is stored in the U.S., as organizations then reduce the amount of data that might have to be disclosed.</p>{{< /note >}}
- Assess the security classification of the data processed within the organization. This assessment is necessary to conduct an appropriate suitability and risk analysis for using different cloud services.
  - Is it sensitive personal data?
  - Public data?
  - Private communications?

### Security

- Will your organization be subject to security standard requirements? If so, which ones?
  - How will you verify providers?
  - Which certificates will you accept?
  - Will you be able to cooperate with others when evaluating certificates?
  - How will you monitor developments after certificates are issued?
- How will you handle ongoing security updates?

### Managing the supply chain

- Keep track of the entire supply chain:
  - Check whether downstream service providers use subcontractors in the form of other cloud service providers.
  - Verify that there are contracts between the service provider and the subcontractor, and that the contract complies with data protection law requirements.
  - Check whether either the service provider as such or the provider’s subcontractors have their legal domicile in a third country. Assess whether this risks enabling the authorities of that third country to compel either the subcontractor or the service provider to hand over data to that country’s authorities.

## References

[^1]: Safespring. (2018). _Cloud Act White Paper_. Retrieved from [safespring.com](/whitepaper/cloudact/)

[^2]: Safespring. (2020). _Schrems II White Paper_. Retrieved from [safespring.com](/whitepaper/schrems-ii/)

[^3]: European Commission. (2023). _C(2023) 4745 final_. Retrieved from [commission.europa.eu](https://commission.europa.eu/system/files/2023-07/Adequacy%20decision%20EU-US%20Data%20Privacy%20Framework_en.pdf)

[^4]: European Commission. (2023). _C(2023) 4745 final, Rec. 131_. Charter of Fundamental Rights of the European Union, Article 52(1).

[^5]: European Commission. (2023). _C(2023) 4745 final, Rec. 138_. Charter of Fundamental Rights of the European Union, Article 52(1).

[^6]: European Commission. (2023). _C(2023) 4745 final, Rec. 134-135_. General Data Protection Regulation (GDPR), 679/2016, Article 6(1)(f).

[^7]: European Commission. (2023). _C(2023) 4745 final, Rec. 126_.

[^8]: European Commission. (2023). _C(2023) 4745 final, Rec. 184_.

[^9]: noyb. (2023, 10 July). _European Commission gives EU-US data transfers third round at CJEU_. Retrieved from [noyb.eu](https://noyb.eu/en/european-commission-gives-eu-us-data-transfers-third-round-cjeu)

[^10]: European Data Protection Supervisor. (2024). _EDPS/2024/05_. European Commission’s use of Microsoft 365 infringes data protection law for EU institutions and bodies. Retrieved from [edps.europa.eu](https://www.edps.europa.eu/system/files/2024-03)
