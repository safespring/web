---
ai: true
title: "Digital control is not a product"
slug: "digital-radighet-ar-inte-en-produkt"
date: "2026-07-01"
intro: "CivSec's report Digital rådighet och strukturella beroenden brings together questions already surfacing in procurement, architecture, data protection and AI. Developments around the EU-US Data Privacy Framework make them concrete for cloud customers."
draft: false
tags: ["English"]
showthedate: true
card: "digital-radighet-schrems-card.webp"
eventbild: ""
socialmedia: "blogg/socialmedia/safespring-puzzle.jpg"
language: "en"
section: "blogg"
author: "Gabriel Paues"
aliases:
  - /blog/2026-06-digital-radighet-ar-inte-en-produkt/
  - /blog/digital-radighet-ar-inte-en-produkt/
---

{{< ingress >}}
When CivSec published the report Digital rådighet och strukturella beroenden in May 2026, it gave a clear definition to the concept: an organization's actual ability to control information, systems and decisions over time, even when suppliers, contracts or legal conditions change.
{{< /ingress >}}

The report places digital control alongside NIS2, the AI Act, DORA and the Swedish Cybersecurity Act (2025:1506).[^1] It also points to the gap between what the regulatory frameworks already make possible and what organizations actually require when they procure, document and govern their digital environments.

At Safespring, we have approached the same area from several directions over the past few years: jurisdiction and data protection, cloud architecture, AI, public procurement and the ability to choose another path when conditions change. In the article [The multidimensional problem]({{% relref "/blog/2025-08-det-multidimensionella-problemet.md" %}}), we brought several of those perspectives together, from law and security to operations, geopolitics and business risk.

Digital control works well as an umbrella concept, but only if it is not turned into yet another product category. The core question is what decisions an organization can still make when technology, contracts, the supplier market or legislation changes.

## When law meets infrastructure

In procurement and architecture, digital control often sounds like a technical issue. Yet several of the hardest trade-offs are legal.

The Schrems II judgment in 2020 made that clear, and the work on the EU-US Data Privacy Framework has kept the issue alive. Organizations that process sensitive information need more than technical specifications. They need to know where data is processed, which legislation applies to the supplier and how realistic it is to move services if the conditions change.

On 29 June 2026, the US Supreme Court decided *Trump v. Slaughter*.[^2] The Court held that the FTC's limits on the president's ability to remove commissioners violate the separation of powers in the US Constitution.

The connection to the EU-US Data Privacy Framework is direct: the European Commission's adequacy decision of 10 July 2023 relies on American oversight and redress mechanisms.[^3] On 30 June, noyb sent a formal letter to the European Commission.[^4] noyb argues that the judgment affects the basis for the DPF, among other things because the Commission's decision refers to the FTC more than 250 times. In its article about the judgment, noyb also writes that SCCs and BCRs may be affected when organizations' transfer impact assessments rely on American oversight or specific redress mechanisms.[^5]

The DPF therefore still applies. The adequacy decision remains in force until the European Commission withdraws it or the Court of Justice of the European Union invalidates it. Organizations that use American cloud services should still be able to show what legal basis their transfers rely on and what assumptions are included in their own analysis.

In our white paper [Where things stand after the EU-US Data Protection Framework (DPF)]({{% relref "/whitepaper/eu-us-dpf.md" %}}), we wrote about how such considerations affect the risk picture even when data is stored in Europe. That kind of review recurs when organizations choose cloud platforms, collaboration tools, AI services and security systems.

In a review of cloud services, the organization should be able to answer:

- Which personal data is processed in the US or can be accessed from the US?
- Which transfer mechanism is used for each processing activity?
- Which subcontractors have access to operations, support, logs, backups or metadata?
- Which assessments refer to independent American oversight or specific redress mechanisms?
- Which systems contain data with high protection value?

The list is not legal advice. It is a practical reason to review cloud dependencies, subcontractors and exit plans while there is still time to do the work in an orderly way.

## Open standards and the ability to choose another path

CivSec returns several times to portability.

Portability includes data export, but also how dependent the organization becomes on a specific platform, a specific interface or a supplier's way of packaging services.

Open standards do not solve the whole problem, but they can reduce the cost of future change. OpenStack is used to build cloud infrastructure with open interfaces. Kubernetes is used to run containerized applications in different environments. S3-compatible storage interfaces can reduce dependence on a specific storage provider.

Technology choices do not remove supplier dependencies, but they can make the dependencies more visible and make some changes more feasible. We have previously touched on this in the article [A holistic approach to cloud infrastructure]({{% relref "/blog/2023-06-molninfrastruktur.md" %}}) and in several texts about OpenStack, Kubernetes and supplier-independent architecture.

## AI makes the dependency clearer

Over the past two years, AI has started to appear in the same kind of discussions as cloud services did before.

The starting point is often functionality. Quite quickly, the discussion still ends up in data and dependencies: where information is processed, whether the model can be reviewed, whether the solution can be moved and what requirements the AI Act places on documentation and transparency.

CivSec treats AI as part of digital control. We recognize the pattern from conversations about private AI environments, GPU infrastructure and the use of language models in the public sector. One example is our work with GPU infrastructure and federated machine learning, where data placement, control and collaboration between organizations become part of the technical solution. More about this is available on our page about [Federated AI with FEDn on Safespring]({{% relref "/services/machine-learning.md" %}}).

In June 2026, there was a concrete example. On 12 June, Anthropic wrote that the US government had decided on export controls for the models Fable 5 and Mythos 5.[^6] The decision applied to foreign nationals, both inside and outside the US. Anthropic also wrote that the company did not have a reliable way to verify nationality in real time and therefore disabled access to both models for all users.

On 30 June, Anthropic wrote that the export controls had been lifted.[^7] Fable 5 would become globally available again on 1 July, while Mythos 5 had been restored for a set of American organizations after approval from the US government.

For a Swedish or European organization, the point is not whether Fable 5 or Mythos 5 should be used. The important question is whether a critical AI function can be affected by decisions outside the organization's own contract, supplier governance and EU jurisdiction.

## When law affects access to services

Anthropic is the recent example. The problem of access to digital services and foreign jurisdiction is older.

In 2019, the US issued Executive Order 13884, which blocked property and certain transactions linked to the government of Venezuela.[^8] In connection with this, Adobe notified users in Venezuela that their accounts would be deactivated. The Verge reported that Adobe first wrote that refunds could not be made, but later changed its message.[^9]

In 2025, the US sanctioned Karim Khan, Chief Prosecutor of the International Criminal Court. Associated Press reported that Khan's Microsoft account had been closed and that he had switched to Proton Mail.[^10] In a written answer in the UK House of Lords, the government noted that Microsoft had strongly denied doing this.[^11]

The examples should not be forced into the same explanation. They still show why jurisdiction, sanctions rules and the supplier's technical control need to be part of risk work.

## NIS2 makes the issue less optional

CivSec returns to the fact that many organizations still treat supplier dependencies as an IT issue, even though regulatory frameworks increasingly make them a business issue.

NIS2 has made that shift clearer. Jurisdiction, supply chains, incident management and continuity now belong together with the organization's risk management. For some organizations, this appears in procurement. For others, it appears in requirements for documentation, architecture or supplier governance.

This is also the background to several of our earlier texts on digital control, supplier risk and European infrastructure, including [The EU just defined Sovereign Cloud, here is our score]({{% relref "/blog/2025-11-the-eu-just-defined-sovereign-cloud-here-is-our-score.md" %}}).

## Digital control in practice

In practical work, digital control can often begin with questions that fit into an architecture review, risk analysis or procurement process:

- Can data be moved to another environment?
- Are documented exit options in place?
- Which parts of the infrastructure depend on a specific supplier?
- Can a critical AI function be replaced if access is suddenly withdrawn?
- Who can make decisions about the service's continued availability?

The answers will differ between organizations. A research environment has different requirements than a municipality. A public website has different requirements than a system used for the exercise of public authority.

Digital control is therefore not a product, a region setting or a certification. It is built through technical, legal and organizational decisions made over time.

For those who want to go deeper into the European dimension of the issue, we also recommend the articles [The EU just defined Sovereign Cloud, here is our score]({{% relref "/blog/2025-11-the-eu-just-defined-sovereign-cloud-here-is-our-score.md" %}}) and [Why Safespring supports EuroStack]({{% relref "/blog/2025-03-eurostack.md" %}}).

## Sources

[^1]: CivSec, *Digital rådighet och strukturella beroenden*, May 2026: <https://www.civsec.se/documents/Digital%20r%C3%A5dighet%20och%20strukturella%20beroenden_1.1.pdf>
[^2]: Supreme Court of the United States, *Trump v. Slaughter*, 29 June 2026: <https://www.supremecourt.gov/opinions/25pdf/25-332_qn12.pdf>
[^3]: European Commission, *Adequacy decision for the EU-US Data Privacy Framework*, 10 July 2023: <https://commission.europa.eu/document/fa09cbad-dd7d-4684-ae60-be03fcb0fddf_en>
[^4]: noyb, formal letter to the European Commission on EU-US data transfers, 30 June 2026: <https://noyb.eu/sites/default/files/2026-06/Letter_noyb_EU-US_data_transfers.pdf>
[^5]: noyb, "US Supreme Court just blew up EU-US Data Transfers", 29 June 2026: <https://noyb.eu/en/us-supreme-court-just-blew-eu-us-data-transfers>
[^6]: Anthropic, "Statement on the US government directive to suspend access to Fable 5 and Mythos 5", 12 June 2026: <https://www.anthropic.com/news/fable-mythos-access>
[^7]: Anthropic, "Redeploying Fable 5", 30 June 2026: <https://www.anthropic.com/news/redeploying-fable-5>
[^8]: Federal Register, Executive Order 13884, 7 August 2019: <https://www.federalregister.gov/documents/2019/08/07/2019-17052/blocking-property-of-the-government-of-venezuela>
[^9]: The Verge, "Adobe is cutting off users in Venezuela due to US sanctions", 8 October 2019: <https://www.theverge.com/2019/10/7/20904030/adobe-venezuela-photoshop-behance-us-sanctions>
[^10]: Associated Press, "Trump's sanctions on ICC prosecutor have halted tribunal's work", 2025: <https://apnews.com/article/icc-trump-sanctions-karim-khan-court-a4b4c02751ab84c09718b1b95cbd5db3>
[^11]: UK Parliament, written answer HL8755, 8 July 2025: <https://lordsbusiness.parliament.uk/ItemOfBusiness?businessPaperDate=2025-06-25&itemOfBusinessId=157147&sectionId=50>
