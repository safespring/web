---
ai: true
title: "The EU Court of Justice's invalidation of the Privacy Shield"
section: "White Paper"
date: "2020-09-04"
draft: false
tags: ["Norsk"]
author: "Amelia Andersdotter"
dokumentnamn: ""
socialmedia: "/blogg/socialmedia/safespring_social_33.jpg"
intro: "Prerequisites and recommendations for the public sector and its suppliers."
sidebarlinkname: ""
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: ""
card: "safespring_card_33.jpg"
socialmediabild: "safespring_social_33.jpg"
toc: "Contents"
language: "en"
aliases:
  - /whitepaper/schrems-ii-norwegian/
---
{{< ingress >}}
This white paper addresses the situation after the judgment and recommendations to organizations within the EU; it is divided into three chapters.{{< /ingress >}}

{{< inline "Part I" >}}<br>The Schrems II ruling

{{< inline "Part II" >}} <br>The market structure for cloud services and the interplay between technical requirements and the law.

{{< inline "Part III" >}} <br>A brief description of the way.

## Background

{{< ingress >}}
In the spring of 2018, Safespring published a white paper on the consequences that the European General Data Protection Regulation (GDPR) and the US CLOUD Act have for cloud procurement in Sweden.
{{< /ingress >}}

Safespring’s white paper concluded with eleven recommendations to organizations working with cloud infrastructure in Sweden regarding privacy, data security, and jurisdictional issues. Now, in a judgment of 16 July 2020, the Court of Justice of the European Union has further clarified the conditions that apply to the transfer of EU residents’ personal data to US jurisdiction. This necessitates an update to Safespring’s previous recommendations.

This document reviews the Schrems II decision (Part I), the market structure for cloud services and the interplay between technical requirements and the law (Part II), the roles of various Swedish actors in the further development of the market structure and, in particular, the need for coordination of measures at the state level (Part III), as well as a brief description of the way forward (Part IV). In Parts II and IV, Safespring’s earlier recommendations for organizational operations are expanded upon in light of the new legal situation. Part III gives organizations better conditions to set the right requirements for state-level coordination.

## <small>Part I - Introduction</small><br>Further clarification of data transfer rules

{{< ingress >}}
On 16 July 2020, the CJEU delivered its judgment in Case C-311/18, often called “Schrems II.”
{{< /ingress >}}

On 16 July 2020, the Court of Justice of the European Union delivered its judgment in Case C-311/181, also commonly called “Schrems II,” concerning whether European constitutional principles are compatible with what, up to that judgment, had been politically accepted norms for data transfers to the third country, the United States. Broadly speaking, the judgment confirmed what the CJEU had already emphasized in several rulings since the Lisbon Treaty entered into force in 2009: privacy is a constitutional principle within the EU (Article 8 of the Charter of Fundamental Rights of the European Union), and the specification of rules intended to uphold this constitutional principle—such as in the GDPR—does not undermine the constitutional principle itself.

The Schrems II judgment specifies that these constitutional norms mean that certain parts of US intelligence and security legislation prevent companies subject to those legal obligations from being considered safe recipients of data under European law. The CJEU also reminds European policymakers that adequacy decisions which the European Commission may adopt under GDPR Article 45, and transfer arrangements under GDPR Articles 46 and 49, cannot be used to override European constitutional principles on privacy.

The judgment has consequences for companies and public authorities that process the personal data of EU citizens, because the possibilities for agreements and cooperation with actors who may be subject to legal obligations under US laws requiring disclosure of data to authorities are now severely limited.

{{% accordion title="Adequate level of protection?" %}}
An adequacy decision means that the European Commission decides that a third country has norms that protect the rights of EU citizens.

An adequacy decision is not an agreement as such, but a unilateral declaration by the European Commission. In practice, the Commission does not take such decisions alone, but is assisted by a committee composed of representatives from the Member States, established in Article 93 of the GDPR.

The Commission’s decisions often follow negotiations with the third country.
{{% /accordion %}}

{{% accordion title="What is a transfer agreement?" %}}
Data transfer arrangements may be standard contractual clauses (GDPR Article 46.2), an ad hoc data processing agreement (GDPR Article 46.3), or agreements between a business and individuals (GDPR Article 49).

Standard contractual clauses are intended to provide a level of protection essentially equivalent to that of EU internal law.
{{% /accordion %}}

### The Court of Justice decided

The Court of Justice expressly decided

- That third-country security legislation does not affect how EU citizens’ rights are to be applied, even when the EU citizen interacts with a trader from that third country (C-311/18, paragraph 89)
- That the requirement for essentially equivalent protection of EU citizens’ rights in data transfers is not affected by the specific transfer mechanism used (C-311/18, paragraph 92)
- That the “level of protection” for personal data must be essentially equivalent to that established in EU law, irrespective of particular national provisions in different EU countries (C-311/18, paragraphs 101 and 103)
- That the possibilities for third-country authorities to obtain access to data affect the level of protection (C-311/18, paragraph 103)
- That supervisory authorities are obliged to act where it is not possible to ensure essentially equivalent protection, particularly when an adequacy decision is lacking (C-311/18, paragraphs 120–121)
- That a European Commission decision on standard contractual clauses does not affect the obligations of controllers and recipients of personal data to suspend transfers if it turns out that the protection envisaged by the clauses cannot be ensured (C-311/18, paragraph 142)
- That the European Commission’s adequacy decision, Privacy Shield, is invalid (C-311/18, paragraph 201)

The CJEU has essentially confirmed the conclusions already set out in Safespring’s 2018 white paper on how to handle the uncertainty created by the CLOUD Act and GDPR (“Hur du hanterar det osäkra läget i och med CLOUD Act och GDPR”). While the economic stress caused by further tensions between the US and the EU on privacy issues has not abated—either due to political reactions to Schrems I or now the Schrems II judgment—the legal situation is clearer now.

After the Schrems II judgment, it has become clearer that the primary issue is not where the data are stored, but in which jurisdiction the actor storing the data is located. The rights codified in European law protect natural persons, and the duties to uphold those rights bind both natural and legal persons. If third-country legislation applies to a natural or legal person such that it prevents that person from fulfilling duties concerning the fundamental rights of a natural person, this is a significant impediment to interacting with that natural or legal person.

The judgment refocuses Safespring’s recommendations to organizations on cloud services.2 Organizations must not only ensure a thorough legal analysis of data inventories and legal grounds for personal data processing and transfers; they must also ensure that services they use rely on openly specified protocols and are technically designed to enable potential vendor changes in the future. For investments in or use of cloud services that at any stage may involve (European) public authorities’ processing of personal data, dealings with US companies appear to be almost excluded unless the US changes its national legislation in favor of European data subjects.

This last precondition will be particularly interesting in the process that the European Commission has announced to initiate discussions on a new adequacy decision(3).

## <small>Part II – The Cloud</small> <br>Local infrastructure with local adaptation

{{< ingress >}}
Cloud services have given organizations great opportunities to streamline and automate work.
{{< /ingress >}}

Above all through economies of scale, cloud services contribute to everything from environmental benefits to improved security work; the increased ability to quickly obtain either data storage capacity or computing capacity without formal tendering processes has also helped modern IT operations advance in both the private and public sectors.4

The benefits of a certain centralization also appear as increased possibilities for customization. The costs for developing and maintaining basic functionalities can be shared among several parties. Over the last ten years, several global consortia have been established to maintain and develop useful basic functions for handling a large number of servers.5 Tasks that, in a smaller IT system, might take many manual hours can be automated in large-scale environments. Tasks that are normally expensive and time-consuming—such as investing in real-time monitoring of the IT environment’s security or measures against security threats—are easier to justify. With secure and well-justified base functions as a starting point, specialized services can be built and adapted depending on the organization’s specific needs. The organization can stand on a stable and solid foundation without having to build an entire IT architecture from scratch every time a new concept is to be tested.

The strong interest in cloud services has led to a rapid development of the market, which now includes a variety of services that offer different benefits to interested customers. Different degrees of automation and scale are possible depending on the specific requirements of the organization seeking the service.

Thus, the term “cloud service” covers, on the one hand, partly centralized management of infrastructure—virtualized servers with an operating system that the customer can configure at will by adding and maintaining specific services for specific purposes (for example, databases, web servers, or administrative systems). And on the other hand, it includes specific systems where the cloud provider itself delivers database tools and other basic components for more specialized functionality. The most visible part of the cloud market for a typical end user consists of services where the cloud provider has already added significant value: centralized systems for everything from text editing to planning and videoconferencing.

The cloud market has also developed so that different types of cloud services work together in B2B relationships. A value-added cloud service in the form of a human resources system can also interoperate with a more infrastructural cloud service that offers virtual servers. Thus the end customer only needs to handle the registration and verification of relevant data, rather than maintain and manage codebases and underlying operating systems. It is also common for both infrastructural services and value-added services to be delivered by the same market actor. Just as the telecom market in the 1980s was characterized by vertical integration, the cloud market today is dominated by actors with a high degree of vertical integration. This means that companies deliver infrastructure, platforms, and software.

Procuring end users should carefully weigh the advantages and disadvantages of vertical integration. In a vertically separated market where many different companies can contribute new functionalities at every level of the value chain, there is greater potential for a varied and tailored service offering. Moreover, large end users gain a stronger knowledge position vis-à-vis suppliers. Just as vertical separation and competition in the telecom market opened the way for innovative services in the 1990s, separation and competition in the cloud market can make room for innovative services in the 2020s.

One important difference is that the cloud market already largely builds on cross-border and shared open codebases. The origin of the market is global, not national, and a higher degree of vertical separation does not necessarily mean a higher degree of nationalization. This means that applications, computing power, and data ingested into applications are geographically and organizationally mobile. Data transfers have become common both in the cross-border sense and in the sense that data are transferred between organizations that each play their own role in delivering the actual service.

A German project that tries to combine experiences from the telecom industry with the advantages of the cloud industry is GAIA-X6. It is a framework for cost-sharing among actors with a geographical affinity who offer interoperable services.7 In France, for almost ten years, it has been emphasized that procurement instruments can be particularly suitable for strengthening European SMEs’ role in digital ecosystems, with a particular emphasis on open data solutions and cloud services.(8)

### Flexibility requires greater responsibility

Cloud services mean in practice that data for which a procuring organization is responsible, and applications that use such data as input, will reside on infrastructure not administered by the organization itself. Regardless of the level of value-add an organization chooses for its cloud services, many of the economies of scale depend on the cloud infrastructure administrator having access to sufficient information about the data being processed to make resources available and provide the level of security the customer requires. It is in this technical requirement that procuring organizations’ obligations under the CJEU’s Schrems II judgment arise.

The CJEU’s assessment of fundamental rights in the EU places a duty on organizations responsible for personal data to obtain an overview of the entire value chain, even when procuring a specific and limited software application intended to provide only limited utility in their own operations. The end user should not only assess the benefits of the service being procured, but also examine how the service provider interacts with subcontractors.

Already in the 2007 government inquiry “Den osynliga infrastrukturen,” it was observed9 that [IT] infrastructure has the special characteristic of being invisible when there are appropriate standards. Only when [standards] are absent does their absence become obvious and problematic. IT standards are also largely invisible in decisions made by those responsible for the organization. Business decisions, such as the procurement of e-services, often entail decisions about the choice of standards, but it does not seem that these decisions are made separately and explicitly, at least not at the management level; rather, they become an unspoken consequence of various other business decisions. A consequence of both the GDPR and the Schrems II judgment should be that these unspoken consequences need to be specified and stated explicitly.

The processor must ensure that any other processors have the same contractual obligations to the individuals who own the data being processed by the controller as the processor itself (GDPR Article 28).

But it is the controller who is responsible for ensuring that both processors and subcontractors are able to fulfill the necessary contractual guarantees. When either a processor or the processor’s subcontractor is subject to legal obligations in a third country, the CJEU considers that the controller has a far-reaching responsibility to ensure that those legal obligations do not provide EU citizens with a lower level of privacy. The CJEU also considers that the controller’s obligations are not reduced where it is not possible to establish an actual implementation of such legal obligations on specific data, but that it is sufficient that such a legal obligation may arise (cf. C-311/18, paragraph 142).

Safespring’s 2018 checklist addresses the questions that all organizations should consider when choosing infrastructure.10 In light of the Schrems II judgment, this must be emphasized in the checklist: it should be difficult for cloud providers subject to third-country law to satisfy the requirements of EU law. Particularly for the third country, the United States, US law must be changed for companies based there to be acceptable recipients of personal data from a data protection perspective. It is no longer sufficient merely to track which (sensitive) personal data might end up in the hands of a foreign authority. The risk that such data could be compelled to be disclosed must now be actively prevented.

In practice, this means that procuring organizations should limit their choice of service providers and subcontractors to providers legally based in the EEA. It may also be necessary to ensure that administration and maintenance of IT systems are not performed by persons operating outside the EEA. The fact that European politicians and the European Commission have twice failed to formulate adequacy decisions with sufficiently strong privacy guarantees should also lead procuring organizations not to uncritically rely on future adequacy decisions.11 In practice, Swedish politicians, despite limited legal possibilities to circumvent the CJEU, have nevertheless mainly tried to maintain the status quo,12 with the result that actors following political guidance may end up in legal error.

### Complementary recommendations (13)

1. Check whether downstream service providers use subcontractors in the form of PaaS or SaaS providers.
2. Check whether the service provider has used openly specified software functionalities (such as APIs or data formats) in the design of the service.
3. Check that there are agreements between the service provider and the subcontractor, and that the agreement complies with data protection requirements.
4. Check that the subcontractor provides documentation for the open standards and specifications the subcontractor has used in its infrastructure solutions. Also check that the service provider has ensured it can migrate to another subcontractor if needed.
5. Check whether either the service provider itself or the service provider’s subcontractor is legally based in a third country. Assess whether this may mean that authorities in the third country can compel either the subcontractor or the service provider to disclose information to authorities in that third country.

### Openness is a safeguard against political instability

At both the European(14) and Swedish(15) level, it has been emphasized that a stronger focus on openly available source code and open standards creates both transparency and clarity in the way European data protection law now appears to require. Swedish authorities are recommended by the Agency for Digital Government to publish all self-produced code under open-source software licenses.(16)

Open standards and open codebases are not recommendations deriving from European data protection law. However, they create greater mobility for end users. Both at the European14 and Swedish15 level it has been emphasized that a greater focus on openly available source code and open standards provides both transparency and overview, as European data protection law now seems to require. Swedish authorities are recommended by the Agency for Digital Government to publish all self-produced code under open-source software licenses.16

Open standards and open codebases are not recommendations that stem from the GDPR. Rather, they offer end users greater freedom of movement between different providers. If the infrastructure is open and interoperable, the end user has greater freedom to adapt, for example in response to court rulings.

Although the GDPR does not in itself require organizations to ensure the possibility of switching providers, practice in the data protection field suggests that organizations may well be interested in investing in such flexibility themselves.

With regard to data transfers, for example, political leadership in Sweden and Europe has not just once but twice miscalibrated political decisions such that the CJEU had to annul them. For organizations that must comply with applicable laws and regulations, that entails high costs, substantial uncertainty, and wasted time. Deliberate investments in open standards and code reduce friction if changes become necessary.

## <small>Part III</small><br>Ways forward

{{< ingress >}}
Organizations in Norway may currently be prevented from choosing cloud services subject to US law in procurement processes.
{{< /ingress >}}

The reason for this is US intelligence legislation, but also the CLOUD Act, which Safespring has addressed in earlier white papers. Against this background, organizations should, in addition to following Safespring’s current recommendations and the enhancements mentioned above, do the following:

- Develop a plan to migrate away from cloud services that are subject to US law.17
- Review how your organization already works with existing guidelines from Statens inköpscentral, eSam, and ISA2 (for example by evaluating ongoing projects based on existing recommendations).
- Actively engage the government in developing a Swedish plan for cloud services that is compatible with European law.

## References

{{< ingress >}}
The white paper is written by Amelia Andersdotter. Safespring offers Swedish-produced cloud services.
{{< /ingress >}}

1. 1. ECLI:EU:C:2020:559
2. Safespring, white paper: Hur du hanterar det osäkra läget i och med CLOUD Act och GDPR, from 2018.
3. European Commission, 10 August 2020, Joint Press Statement from European Commissioner for Justice Didier Reynders and U.S. Secretary of Commerce Wilbur Ross. https://ec.europa.eu/info/news/joint-press-statement-european-commissioner-justice-didier-reynders-and-us-secretary-commerce-wilbur-ross-7-august-2020-2020-aug-07_en
4. Statens servicecenter: A shared government cloud service for the agencies’ IT operations, interim report 2017.
5. Cf. OpenStack Foundation (OSF) and Cloud Native Computing Foundation (CNCF).
6. GAIA-X: a federated data infrastructure for Europe. https://www.data-infrastructure.eu/GAIAX/Navigation/EN/Home/home.html
7. Interoperability: interaction between different components. See also SOU 2007:47, pp. 133 ff.
8. Rapport d’Information No 443, Union européenne -- colonie du monde numérique ?, 20 March 2013, pp. 115–116.
9. SOU 2007:47, Den osynliga infrastrukturen, p. 64.
10. Cf. footnote 2 above.
11. Both the Safe Harbor decision from 2001 and the Privacy Shield decision from 2016 have been invalidated by the CJEU.
12. Cf. committee directives 2019:64 with additions in dir. 2020:73.
13. See Recommendations for organizations in footnote 2 above.
14. C(2018) 7118, European Commission Digital Strategy - A digitally transformed, user-focused and data-driven Commission, 2018.
15. E-delegationen, Guidance for digital collaboration, Version 4.1, 2015-05-28.
16. DIGG, 2019-136, Policy for the development of software.
17. Question 5 in Part II must essentially always be answered “yes” when using US cloud services, as long as the US does not change its legislation.

{{< accordion-script >}}