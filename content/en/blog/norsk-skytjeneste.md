---
ai: true
title: "Do we need a Norwegian government cloud service?"
date: 2020-10-14T09:42:10+02:00
draft: false
intro: "Fredric Wallsten has extensive experience working with these issues in his role as CEO of the Norwegian cloud service provider Safespring."
background: "safespring_2019-10-24_fredric-wallsten_03-small_fotograf-marcus-boberg.jpg"
form: "no"
sidebarlinkname: "Download White Paper"
sidebarlinkurl: "#down"
socialmedia: "safespring-compute.jpg"
language: "en"
section: "Fredric Wallsten"
article: "DN.no"
socialmedia: "/socialmedia/fredric-social-article.jpg"
aliases:
  - /no/aktuelt/norsk_skytjeneste/
  - /no/aktuelt/norsk-skytjeneste/
---
## Norwegian state cloud service?

{{< ingress >}}
The debate about the security of U.S. cloud services has been a hot topic since the summer.
{{< /ingress >}}

On July 16, the Court of Justice of the European Union struck down the data transfer arrangement "Privacy Shield" in the so-called "Schrems II" ruling. The court also held that the United States is not a safe third country. For many companies, this has made it harder to use cloud services from U.S. providers.

Fredric Wallsten has extensive experience working with these issues in his role as CEO of the Norwegian cloud provider Safespring.

### Fredric, what does it mean for companies that Privacy Shield was struck down this summer?

Without a valid data transfer arrangement, it becomes harder to find a legal basis for transferring data. Moreover, the CJEU found that U.S. national legislation does not protect European citizens. This has more consequences than many probably realize. The court found, among other things, that it is the provider’s place of establishment, not the geographic location of the hardware, that determines the level of protection.

This makes it much harder to use cloud services from providers subject to U.S. law, even if they have data centers in Norway, Sweden, or elsewhere in Europe. If U.S. authorities can make binding demands on the provider, it should in practice be difficult for an organization in the EEA to use the provider’s services.

### Are there other consequences of the ruling?

Many companies are currently in breach of the GDPR and risk fines. The CJEU also held that supervisory authorities are obliged to act against data transfers when equivalent protection in the recipient country cannot be established. In Ireland, what this means in practice is now being examined.

### The industry talks about Standard Contractual Clauses and Binding Corporate Rules—can they be used?

Well, it’s important to understand that Privacy Shield was an agreement between jurisdictions, while SCCs are agreements between companies. SCCs are a set of standard clauses that govern data transfers to third countries between the parties. But if the counterparty is established in the U.S., it is impossible for them to meet EU requirements without additional measures, because U.S. national surveillance laws mean the EU disqualifies the country as a safe third country. Among these laws are, for example, FISA 702a, EO12333, and potentially the CLOUD Act. In other words, this legislation makes it impossible for a U.S. counterparty to meet European data protection requirements.

### What do you think companies should do now?

Go through all data processing agreements, including any with sub-processors, and map the company’s exposure. What is particularly important to uncover are services subject to U.S. law, so the company can prioritize these and find alternatives. This is the responsibility of the controller. It can also be wise to identify personal data that does not belong to your own organization but, for example, to customers.

### What advice would you give to users of cloud services subject to U.S. law?

Act before the regulator shows up. If you are processing personal data with a provider subject to U.S. law, you will need to take measures. If you have actively started this work, that should count as mitigating circumstances and be reflected in any enforcement action.

### What are the concrete alternatives—is encryption a solution?

Some claim so. But the Hamburg DPA has decided that encrypting data in a U.S. cloud service can only be considered acceptable if the keys are handled securely. This of course rules out handling them in the same cloud service and therefore rules out almost all practical use. This is really not a technical problem but a legal one. It’s not Microsoft, AWS, Google, and others who are the villains; rather, the U.S. has given its own administration unlimited power over any data they can access. This is incompatible with European law, and U.S. laws will have to change before it becomes possible to reach a new agreement.

### What will happen in the future?

Haha, I wish I could answer that. The only thing we can be sure of is that there will be new laws, new directives, and new recommendations. Those who chose a provider that is currently subject to U.S. law, are locked in, and now have to move are in trouble. These will be expensive migration projects. Those with architecture and design that allow you to switch between different providers can easily adapt to new conditions.

### A discussion that has arisen here in Norway is whether the state should build its own cloud service—what do you think?

In principle, that’s probably a good idea. There are certainly a number of applications and data that may be best handled by the state itself. However, I think many take the easy way out—since technology is abstract—and make sweeping generalizations when it comes to IT systems and applications.

I don’t think either the state or any single provider can produce the breadth of services needed, across infrastructure, platforms, and applications. Therefore, it would be extremely unfortunate to choose proprietary solutions that lead to being shut out from the rest of the market. In that case, the state risks losing much of the innovative power you get with modern cloud services. It is therefore very important to choose solutions based on open standards, standardized APIs, and standardized file formats.

There must be a predictable and standardized way to interact with the rest of the market so that it is possible to tap the full potential of the innovation the market can contribute. There are European initiatives, e.g., GAIA-X, that will be interesting to follow. GAIA-X is precisely about shared infrastructure that, if successful, could become such a platform for standardized exchange of services.

<span id="down" />