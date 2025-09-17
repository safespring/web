---
ai: true
title: "The Court of Justice of the European Union's invalidation of the Privacy Shield"
section: "White Paper"
language: "en"
date: "2020-09-04"
draft: false
tags: ["Svenska"]
author: "Amelia Andersdotter"
dokumentnamn: ""
socialmedia: "/blogg/socialmedia/safespring_social_33.jpg"
intro: "Prerequisites and recommendations for the public sector and its suppliers"
sidebarlinkname: "Download as PDF"
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: "/publications/safespring-white_paper-ogiltigforklarandet_av_privacy_shield.pdf"
card: "safespring_card_33.jpg"
socialmediabild: "safespring_social_33.jpg"
toc: "Contents"
aliases:
  - /schrems/
  - /whitepaper/schrems-ii/
---
{{< ingress >}}
Now that cloud services subject to U.S. legislation likely cannot be used in procurement, we at Safespring have released a white paper on the new legal landscape.
{{< /ingress >}}

This white paper addresses the conditions after the ruling and recommendations for organizations within the EU, and is divided into four chapters.

- The Schrems II judgment (Part I),
- the market structure for cloud services and the interplay between technical requirements and law (Part II),
- the roles of various Swedish actors in the further development of this market structure and in particular the need for coordination of efforts at the state level (Part III)
- and a brief description of the way forward (Part IV).

## Background

{{< ingress >}}
In the spring of 2018, Safespring published a white paper on the consequences of the European General Data Protection Regulation (GDPR) and the U.S. CLOUD Act for cloud procurement in Sweden.
{{< /ingress >}}

Safespring’s white paper concluded with eleven recommendations to organizations working with cloud infrastructure in Sweden regarding data protection, data security, and jurisdictional issues. Now, in a judgment on 16 July 2020, the Court of Justice of the EU has further specified the conditions for transferring the data of European individuals to U.S. jurisdiction. This calls for an update of Safespring’s previous recommendations.

This document reviews the Schrems II judgment (Part I), the market structure for cloud services and the interplay between technical requirements and law (Part II), the roles of various Swedish actors in the further development of this market structure and in particular the need for coordination of efforts at the state level (Part III), and a brief description of the way forward (Part IV). In Parts II and IV, Safespring’s previous recommendations for organizations’ own operations are developed further in light of the new legal situation. Part III gives organizations better conditions to demand the right requirements from state-level coordination.

## Part I - Introduction <br> Further clarification of data transfer rules

{{< ingress >}}
On 16 July 2020, the Court of Justice of the EU issued its judgment in Case C-311/18, often referred to as “Schrems II”.
{{< /ingress >}}

On 16 July 2020, the Court of Justice of the EU issued its judgment in Case C-311/18[^1], often referred to as “Schrems II”, concerning the compatibility of European constitutional principles with what until the ruling had been politically accepted norms for data transfers to the third country, the United States. The judgment mainly confirmed what the CJEU had already made clear in a number of decisions since the Lisbon Treaty entered into force in 2009: data protection is a constitutional principle in the EU (Article 8 of the Charter of Fundamental Rights of the European Union), and the specification of rules to uphold this constitutional principle, for example in the General Data Protection Regulation (GDPR), does not undermine this constitutional principle.

In Schrems II it is made concrete that these constitutional norms mean that certain parts of U.S. intelligence and security legislation prevent companies subject to obligations under that legislation from being considered safe recipients of data in a European legal sense. The CJEU also reminds European policymakers that the administrative data transfer decisions the European Commission can adopt under GDPR Article 45 and transfer agreements under GDPR Articles 46 and 49 cannot be used to override the European constitutional principles of data protection.

The judgment has consequences for companies and public authorities that process the personal data of European citizens in that the scope for agreements and cooperation with actors that risk being subject to obligations under U.S. legislation on data disclosure to authorities is now severely limited.

{{% accordion title="What is an adequacy decision?" %}}
An adequacy decision means that the European Commission decides that a third country has norms that protect the rights of European citizens. An adequacy decision is not an agreement in the true sense, but a unilateral proclamation by the European Commission.

In practice, however, the European Commission does not take decisions on its own, but is supported by the committee of Member State representatives established under GDPR Article 93. The Commission’s decisions are often preceded by negotiations with the third country.
{{% /accordion %}}

{{% accordion title="What is a transfer agreement?" %}}
Data transfer agreements can take the form of standard contractual clauses (GDPR Art. 46(2)), data processing agreements (GDPR Art. 46(3)), or agreements between a business and an individual (GDPR Art. 49).

Standard contractual clauses must provide a level of protection essentially equivalent to that of domestic European law.
{{% /accordion %}}

### The CJEU’s decision

The CJEU specifically decided

- That third-country security legislation does not affect the application of European rights for citizens, even if the European citizen interacts with businesses from the third country (C-311/18 para 89).
- That the requirement for essentially equivalent protection for European citizens’ rights in data transfers is not affected by the specific transfer mechanism used (C-311/18 para 92).
- That the “level of protection” for personal data must be essentially equivalent to that established under EU law, without regard to particular national provisions in individual EU countries (C-311/18 paras 101 and 103).
- That the ability of third-country authorities to gain access to data affects the level of protection (C-311/18 para 103).
- That supervisory authorities have an obligation to act when an essentially equivalent level of protection cannot be established, especially where there is no adequacy decision (C-311/18 paras 120–121).
- That a European Commission decision on standard contractual clauses does not affect the obligations of controllers and recipients to suspend transfers if it turns out that the protection covered by the clauses cannot be realized (C-311/18 para 142).
- That the European Commission’s adequacy decision “Privacy Shield” is invalid (C-311/18 para 201).

The CJEU has mainly confirmed the conclusions already presented in Safespring’s 2018 white paper “How to handle the uncertain situation in light of the CLOUD Act and the GDPR.” While the economic stress caused by further tensions between the U.S. and the EU on data protection issues has not been alleviated by the political reactions to Schrems I or the now issued Schrems II decision, the legal situation is now clearer.

With the Schrems II decision, it has become clearer that the problem is not primarily where the data as such is stored, but where the actor storing the data is located. The rights codified in European law protect natural persons, and the obligations to uphold those rights codified in European law apply to natural and legal persons. If third-country legislation applies to a natural or legal person in such a way that it prevents them from fulfilling obligations regarding fundamental rights for a natural person, this is in principle a significant obstacle to cooperation with that natural or legal person.

The judgment brings Safespring’s recommendations to organizations regarding cloud services[^2] back to the fore. But organizations must not only ensure that they have a thorough legal analysis of data catalogs and legal bases for personal data processing and transfers; they should also ensure that the services they use employ openly specified protocols and are technically designed with the intention of enabling potential future vendor changes. When investing in or using cloud services that at any level of the chain may involve (European) public authorities’ processing of personal data, cooperation with U.S. companies appears to be in principle excluded, unless the U.S. changes its domestic legislation to the benefit of European legal subjects.

This last condition will be particularly interesting in the process announced by the European Commission to initiate talks on a new adequacy decision[^3].

## Part II – The Cloud, Local infrastructure with local adaptation

{{< ingress >}}
Cloud services have created major opportunities for organizations to streamline and automate their work.
{{< /ingress >}}

It is primarily through economies of scale that cloud services contribute to everything from environmental sustainability to stronger security work, but the increased ability to quickly gain access to either data storage capacity or data processing capacity without formalized procurements has also helped this modern form of IT operations make progress not only in the private sector but also in the public sector[^4].

The advantages of some centralization also show up in increased adaptability. The costs of developing and maintaining basic functionalities can be spread across multiple parties. Over the past 10 years, several global consortia have been established with the mission of maintaining and developing useful foundational functions for managing large numbers of servers[^5]. Tasks that in a smaller IT system can require many manual hours can be automated in large-scale environments, and typically time-consuming and expensive tasks such as investing in real-time monitoring of the IT environment’s security or remediating security vulnerabilities become easier to justify. With secure and optimized basic functions as a foundation, specialized services can then be built and adapted to each organization’s specific needs. The organization can rely on a stable and solid foundation without having to build an entire IT architecture from scratch every time a new concept is to be tested.

The strong interest in cloud services has meant that the market has quickly developed to include a range of different services with different advantages for the procuring customer. Different degrees of automation and scale can be permitted depending on the specific requirements within each procuring organization.

Thus, the term cloud service includes, on the one hand, centralized management of infrastructure—virtualized servers with an operating system that the customer can use as they see fit by adding and maintaining specific services for specific purposes (for example, databases, web servers, or administrative systems). On the other hand, it includes purpose-specific systems where the cloud service provider itself supplies database tools and other basic building blocks for more specialized functionality. The most visible part of the cloud market for a typical end user consists of services that are already highly refined by the cloud provider: centralized systems for everything from word processing to scheduling and video conferencing.

The cloud market has also evolved so that different types of cloud services interact with each other in B2B relationships. A refined cloud service in the form of an employee attendance solution can, therefore, interact with a more infrastructural cloud service that provides virtual servers. In this way, an end customer only needs to handle the input and verification of relevant information rather than maintenance and administration of code bases and underlying operating systems. It is also common for both infrastructural services and refined services to be provided by the same market actor. Just as the telecom market in the 1980s was characterized by vertical integration, the cloud market today is dominated by actors with a high level of vertical integration. By that we mean that companies simultaneously provide infrastructure, platforms, and software.

For procuring end customers, the pros and cons of vertical integration need to be carefully considered. In a vertically separated market where many different companies can contribute new functionalities at each level of the value chain, there is greater room for varied and tailored service offerings. In addition, large end customers are in a better knowledge position vis-à-vis suppliers. Just as vertical separation and competition in the telecom market opened the way for the development of innovative services in the 1990s, separation and competition in the cloud market can create space for innovative services in the 2020s.

One important difference is that the cloud market already to a large extent is based on cross-border and shared open code bases. The origin of the market is global, not national, and a higher level of vertical separation does not have to mean a higher degree of nationalization. This means that applications, computing power, and the data fed into these applications are geographically and organizationally mobile. Data transfers have become common both in the cross-border sense and in the sense that data is transferred between organizations that each play a role in delivering the final service.

A German project that seeks to combine experiences from the telecom industry with the benefits of the cloud industry is GAIA-X[^6], a framework for cost sharing among geographically linked actors providing interoperable services[^7]. In France, for almost a decade it has been emphasized that procurement instruments can be particularly suitable for strengthening the role of European SMEs in digital ecosystems, with particular emphasis on open data and cloud service solutions[^8].

### With flexibility comes increased responsibility

Using cloud services in practice means that data for which a procuring organization is responsible, and applications that use such data as input, will reside on infrastructure not administered by the organization itself. Regardless of the level of refinement organizations choose for their cloud services, many of the economies of scale depend on the actual administrator of the cloud service infrastructure having access to sufficient information about the data being processed to be able to provide the resources and ensure the level of security the customer requires. It is in this technical inevitability that obligations for procuring organizations arise in relation to the CJEU’s Schrems II ruling.

The CJEU’s assessment of fundamental rights in the EU creates a requirement for controllers to gain an overview of the entire value chain, even when procuring a specific and limited software application that is only intended to achieve a limited benefit in their own operations. The end customer should not only consider the benefits of the service being procured, but also look at how this service provider interacts with subcontractors.

Already in the government report “The Invisible Infrastructure” from 2007 it was observed[^9] that “IT infrastructure has the peculiarity of being invisible when standards are in place and fit for purpose. Only when [standards] are missing is their absence noticed and causes problems. IT standards are also to a large extent invisible in the decision-making of those responsible for operations. Business decisions, for example on the procurement of e-services, often also entail decisions on the choice of standards, but these do not seem to be decided separately and explicitly, at least at the operationally responsible level, but become an unspoken consequence of business decisions of various kinds.” One of the consequences of both the GDPR and the Schrems II decision should be that these unspoken consequences must in fact be articulated.

Processors must ensure that any sub-processors are subject to the same contractual obligations towards the individuals whose data is processed by a controller as the processor itself (GDPR Art. 28).

However, it is up to the controller to ultimately ensure that both processors and subcontractors are able to provide the right kind of contractual guarantees. When either a processor or the processor’s subcontractor is subject to legal obligations in a third country, the CJEU considers that the controller bears extensive responsibility to ensure that these legal obligations do not degrade the data protection of European citizens. The CJEU further considers that the controller’s obligations are not reduced merely because it is not possible to establish an actual realization of such legal obligations on specific data; it is sufficient that such a legal obligation could arise (cf. C-311/18 para 142).

Safespring’s checklist from 2018 addresses the issues that every organization should apply when choosing infrastructure[^10]. In light of the Schrems II ruling, this checklist needs to be clarified so that cloud service providers subject to third-country legislation should have difficulty meeting EU law’s requirements. For the United States in particular, U.S. legislation needs to change for companies based there to be an acceptable recipient of data from a data protection law perspective. It is no longer sufficient to keep track of which (sensitive) personal data may end up with a foreign authority; the risk that such data could be required to be disclosed now needs to be actively prevented.

In practice, this means that procuring organizations should limit their choice of service providers and subcontractors to providers that are legally based somewhere within the EEA. There may also be a need to ensure that the administration and maintenance of IT systems is not carried out by persons working outside the EEA. The fact that European politicians and the European Commission have twice failed to formulate adequacy decisions with sufficiently strong guarantees for data protection should also make procuring organizations hesitant to rely on future adequacy decisions[^11]. In practice, Swedish politicians, despite limited legal room to circumvent the CJEU, have nevertheless mainly oriented their efforts towards trying to preserve the status quo[^12], with the result that actors who follow political guidelines risk ending up on the wrong side of the law.

### Complementary recommendations

See the previous list in Safespring, White paper: How to handle the uncertain situation in light of the CLOUD Act and the GDPR, 2018.

1. Check whether downstream service providers use subcontractors in the form of PaaS or SaaS providers.
2. Check whether the service provider used openly specified software functionalities (such as APIs or data formats) in the design of its service.
3. Verify that there are agreements between the service provider and the subcontractor, and that the agreement complies with data protection law requirements.
4. Check that the subcontractor provides documentation on the open standards and specifications the subcontractor used for its infrastructure solutions. Further check that the service provider has assured itself that it has the ability, if necessary, to migrate to another subcontractor.
5. Check whether either the service provider as such or the service provider’s subcontractors have their legal domicile in a third country. Assess whether this risks enabling the third country’s authorities to require either the subcontractor or the service provider to hand over data to the third country’s authorities.

### Openness as a safeguard against political instability

At both the European[^13] and Swedish[^14] levels, it has been emphasized that a stronger focus on openly available source code and open standards creates both transparency and clarity in the way that European data protection law now appears to require. Swedish authorities are recommended by the Agency for Digital Government to publish all self-produced code under open software licenses[^15].

Open standards and open code bases are not recommendations that stem from European data protection law. However, they create greater mobility for end customers between different providers. If the infrastructure is open and interoperable, the end customer has greater freedom to adapt, for example, to court decisions.

Even if data protection law does not, as such, mandate that organizations ensure the possibility of switching providers, the development of practice in data protection law seems to be such that organizations may want to invest in such flexibility themselves.

In terms of data transfers, for example, political leadership in Sweden and Europe has not once, but twice miscalibrated political decisions in such a way that the CJEU has been forced to overturn them. For organizations that need to follow the law, this entails high costs and great uncertainty and time consumption. Conscious investments in open standards and code, however, reduce friction when changes are needed.

## Part III – Legal frameworks are a shared responsibility

{{< ingress >}}
However, each individual organization should not be forced to invent on its own how to handle open standards and data protection law.
{{< /ingress >}}

Regarding data transfers and cloud services, there are a number of Swedish public actors whose efforts can make it easier for others to adapt to EU law while achieving a high level of both fundamental stability and application stability in IT systems.

For Swedish organizations, the assessment here is that the following actors should be encouraged to continue working with IT infrastructures and data protection:

1. The inquiry established by committee directive 2019:64, with supplementary directive 2020:73, should not only be given more time to complete its task but also receive a substantially clearer mandate to look at data transfer issues and open standards.
   1. The commissioning authority should request a follow-up of the conclusions in SOU 2017:74 that required data stored by telecom operators to be stored in Sweden, in relation to data stored by other actors.
   2. The commissioning authority should also request a follow-up of the objectives in SOU 2007:47 Chapter 6 based on the last 15 years of European and Swedish legal developments, with regard to the institutional conditions for interoperable, lawful, and functioning technical infrastructure proposed there.
   3. The commissioning authority should request a compilation of how other EU countries are working with data transfers and cloud infrastructures. For example, Slovenia has started work on a government cloud[^16], and France has adopted a stated strategy for “digital sovereignty”[^17]. These measures should be contrasted and compared with current Swedish strategies for IT infrastructure and cloud services.
   4. Above all, the commissioning authority should clarify that the investigator should not only look at how existing agreements between municipalities and companies in third countries can be made lawful, but should be given the mandate to propose ways forward that will also suffice beyond the next data protection review in the CJEU.
2. The Swedish Ministry of Justice has opportunities to follow the European Commission’s negotiations with the U.S. administration on a new adequacy decision through the so-called Article 93 Committee (established by GDPR Art. 93). Ahead of the negotiations on the Privacy Shield, the Ministry of Justice stated that it had primarily had written contact with the Swedish company Ericsson[^18], and Sweden’s government also pushed for a quick decision that did not set ultimate demands on the U.S.[^19]. The Schrems II decision shows that this approach has shortcomings, and a broader range of input to the Ministry of Justice could guide the government to seek more stable solutions to data transfer issues.
3. The Data Protection Authority (Datainspektionen) should be given a stronger mandate to continue work on supervision and regulations. In a study by the Swedish Agency for Public Management[^20] in the summer of 2020, it was noted that the authority suffers from a “culture of caution,” which in the specific case of cloud services and data transfers risks exacerbating and prolonging legal uncertainty. SOU 2016:65 shows that the Data Protection Authority has at times also had problems cooperating with other authorities. An explicit mandate to conduct supervision and cooperate with other authorities on specific problem areas (such as procurement, IT infrastructure, and data transfers) could provide greater clarity for more actors in the Swedish market.
4. The Swedish Competition Authority should be tasked with following up on the review of the division of responsibility between processors and controllers that the Data Protection Authority announced in its 2019–2020 supervision plan[^21]. In particular, the Competition Authority should, based on its supervisory role under the Public Procurement Act, look at how the Data Protection Authority’s conclusions affect opportunities and challenges for procurers in the public sector, in relation to the framework agreements[^22] already available from the National Procurement Services (Kammarkollegiet), possibly in cooperation with the Data Protection Authority.
5. The Swedish Agency for Economic and Regional Growth (Tillväxtverket) should be tasked with investigating Swedish opportunities within the framework of the German GAIA-X project[^23]. Possible directions for this work could be to examine whether the business models proposed by GAIA-X are sufficiently future-proof, or to what extent GAIA-X could offer advantages for Swedish cloud and IT actors that cannot be achieved within the framework of the private consortia developing open cloud infrastructures (e.g., OSF)[^24] or orchestration tools (e.g., CNCF)[^25]. In addition, a review of the benefits to Swedish actors from the European ISA2 project[^26] would be welcome, also in light of potential future opportunities for Swedish industry.

The state’s IT work needs structure and determination, and the mandates and strengths of different authorities need to be coordinated for a unified outcome. The boundaries for possible outcomes are to some extent already predetermined by the EU-level coordination that Sweden has subjected itself to through membership of the Union. The government’s ability to provide Swedish organizations with adequate support in these matters also largely depends on those organizations’ ability to clearly communicate their problems to relevant decision-makers at the national level. The Schrems II decision should be seen as an opportunity to achieve a high degree of clarity faster, rather than as an obstacle.

## Part IV – Ways forward

{{< ingress >}}
Organizations in Sweden are, at present, likely prevented from choosing cloud services subject to U.S. law in procurements.
{{< /ingress >}}

The reason for this is found in U.S. legislation on intelligence activities, but also in the CLOUD Act that Safespring has already addressed in previous white papers. In light of this, organizations should, in addition to following Safespring’s existing recommendations and the reinforcements mentioned above:

- Develop a plan to migrate away from cloud services subject to U.S. law[^27].
- Review how their own organization already works with existing guidelines from the National Procurement Services, eSam, and ISA2 (for example by evaluating existing projects against existing recommendations).
- Actively engage the government in developing a Swedish plan for cloud services that are compatible with European law.

## References

{{< ingress >}}
This white paper was written by Amelia Andersdotter. Safespring provides Swedish-produced cloud services.
{{< /ingress >}}

{{< accordion-script >}}

[^1]: ECLI:EU:C:2020:559

[^2]: Safespring, White paper: How to handle the uncertain situation in light of the CLOUD Act and the GDPR, 2018

[^3]: [European Commission, 10 August 2020, Joint Press Statement from European Commissioner for Justice Didier Reynders and U.S. Secretary of Commerce Wilbur Ross](https://ec.europa.eu/info/news/joint-press-statement-european-commissioner-justice-didier-reynders-and-us-secretary-commerce-wilbur-ross-7-august-2020-2020-aug-07_en)

[^4]: Swedish Government Service Centre, A shared government cloud service for agencies’ IT operations, interim report 2017.

[^5]: Cf. OpenStack Foundation (OSF) and Cloud Native Computing Foundation (CNCF).

[^6]: [GAIA-X: a federated data infrastructure for Europe](https://www.data-infrastructure.eu/GAIAX/Navigation/EN/Home/home.html)

[^7]: Interoperability: interaction between different components. See also SOU 2007:47, p. 133 ff.

[^8]: Rapport d’Information No 443, Union européenne -- colonie du monde numérique ?, 20 March 2013, pp. 115–116.

[^9]: SOU 2007:47, Den osynliga infrastrukturen [The Invisible Infrastructure], p. 64.

[^10]: Cf. footnote 2 above.

[^11]: Both the 2001 Safe Harbor decision and the 2016 Privacy Shield decision have been found invalid by the CJEU.

[^12]: Cf. committee directive 2019:64 with the supplement in dir. 2020:73.

[^13]: C(2018) 7118, European Commission Digital Strategy - A digitally transformed, user-focused and data-driven Commission, 2018.

[^14]: E-delegationen, Guidance for digital collaboration, Version 4.1, 2015-05-28.

[^15]: DIGG, 2019-136, Policy for software development.

[^16]: [Slovenian State Cloud DRO](https://nio.gov.si/nio/asset/drzavni+racunalniski+oblak+dro?lang=en)

[^17]: See above, footnote 8.

[^18]: According to the constitutional law unit’s register, requested by the author in autumn 2016.

[^19]: The Ministry of Justice’s instruction ahead of the meeting of the committee for the protection of individuals with regard to the processing of personal data of 2016–06–20.

[^20]: Statskontoret 2020:14, Agency analysis of the Data Protection Authority.

[^21]: Data Protection Authority DI-2019-841, 15 March 2019.

[^22]: [Kammarkollegiet, National Procurement Services, framework agreements in the IT and telecom area](https://www.avropa.se/ramavtal/ramavtalsomraden/it-och-telekom/)

[^23]: See footnote 6 above.

[^24]: [OpenStack Foundation](https://osf.dev)

[^25]: [Cloud Native Computing Foundation (Linux Foundation)](https://cncf.io)

[^26]: [European Commission, Interoperability solutions for public administrations, businesses and citizens](https://ec.europa.eu/isa2/)

[^27]: Question 5 in Part II will in principle always have to be answered in the affirmative when using American