---
ai: true
title: "Regelefterlevnad i Kubernetes"
date: 2019-01-07T13:58:58+01:00
draft: false
intro: "Compliant Kubernetes ger dig alla fördelar med en modern containerplattform som körs i nordiska datacenter, utan att du behöver tänka på driften."
background: "safespring-compute.jpg"
form: "ja"
sidebarlinkname: ""
sidebarlinkurl: ""
socialmedia: "safespring-compute.jpg"
devops: ""
section: "Publikt moln"
language: "sv"
aliases:
  - /no/whitepaper/compliant-kubernetes/
---
{{% ingress %}}
Organisationer i alla branscher tar i bruk containrar för ökad agilitet, utvecklarproduktivitet samt högre tillgänglighet och prestanda.
{{% /ingress %}}

För att orkestrera och hantera denna dynamiska, nya miljö av mindre mikrotjänster har Kubernetes etablerat sig som de facto‑standard.

Allt fler branscher som offentlig sektor, bank, fintech, regtech, iGaming, medtech och biotech står inför ökat regulatoriskt tryck på grund av sin påverkan på samhället. Även företag som inte omfattas av branschregler väljer att införa kontroller enligt bästa praxis, som CIS eller SOC 2.

Att hantera känsliga användardata och efterleva regelverk som GDPR, ISO‑27001 eller PCI‑DSS kan vara svårt i en dynamisk, containerbaserad miljö på grund av flera lager av abstraktion och virtualisering, vilka är svåra att översätta till krav som skrivits med fysisk infrastruktur och single‑tenancy i åtanke. Att därför övertyga säkerhetsteam om att containrar kan vara minst lika säkra, om inte säkrare, än traditionella virtuella maskiner har under de senaste åren varit en utmaning. Dessutom ökar attackytan i takt med att antalet rörliga delar blir fler.

<br><br>
<img src="/img/safespring-compliant-kubernetes-3.svg" class="mobile">
<img src="/img/safespring-compliant-kubernetes-2.svg" class="desktop">
<br><br>

Om din nuvarande miljö har passerat alla revisioner måste DevOps‑team argumentera ännu starkare för containerisering, eftersom den nuvarande lösningen, även om den är oflexibel och förlänger mjukvarans utvecklingscykel, har visat sig uppfylla kraven. Aspekter såsom nätverkssegmentering, brandväggar, rollbaserad åtkomstkontroll, hantering av hemligheter, sårbarhets- och antivirusskanning samt uppdateringar görs alla på ett annorlunda sätt i containeriserade miljöer.

Även om det historiskt har setts som svårt att sätta upp är det idag i princip bara några klick för att få ett Kubernetes‑kluster igång. Att däremot drifta det i produktion med verkliga arbetslaster och samtidigt hantera känsliga användardata är fortfarande en stor utmaning, särskilt vid höga säkerhetskrav eller regulatoriska begränsningar.

![Compliant Kubernetes på Safespring Compute](/img/safespring_compliant_kubernetes-pyramide.svg)

_En process har inletts för att ansluta Safesprings molnplattform till Sjunet i Sverige._

Förutom att övervaka klustren dygnet runt, både hälsomått och misstänkt extern aktivitet, innebär drift av ett kluster också kontinuerlig plattformslivscykelhantering – uppgradering, testning och patchning när säkerhetsbrister upptäcks. Att hålla sig à jour med Common Vulnerabilities and Exposures (CVE:er), hantera säkerhetskopior samt drifta kringliggande tjänster som loggning och övervakning ökar också arbetsbördan för driftteamet.

I grunden handlar utmaningen om hur man ökar mjukvarans agilitet genom containerisering samtidigt som säkerhet och regelefterlevnad garanteras för verksamheten.

Safespring Compliant Kubernetes (CK8s) är en Kubernetes‑distribution certifierad av Cloud Native Computing Foundation (CNCF) som levereras förpackad med säkerhetshärdade konfigurationer och komponenter med öppen källkod enligt bästa praxis. Safespring levererar kvartalsvisa releaser av Compliant Kubernetes – testar och härdar komponenterna för att säkerställa att de uppfyller de strikta säkerhets‑ och regulatoriska krav som våra kunder ställer på sina containerplattformar.

{{% horisontal-card image="/img/blue/safespring_card_compute.jpg" link="/services/safespring-compute/" linktext="Läs mer" cardtitle="Safespring Compute är kärnan i Compliant Kubernetes" text="Vår infrastrukturtjänst finns i säkra datacenter inom EU och påverkas inte av utländska lagar som CLOUD Act eller FISA 702." %}}

Compliant Kubernetes gör det möjligt för organisationer att dra full nytta av Kubernetes och samtidigt uppfylla regulatoriska krav – inte bara när nya kluster tas i drift utan under hela mjukvarans livscykel: utveckling, sammansättning och paketering, test och driftsättning samt drift och revisioner.

På grund av Cloud Act och andra mekanismer som ger utländska aktörer åtkomst till användardata migrerar europeiska företag i allt högre grad sina arbetslaster till europeiska leverantörer.

Compliant Kubernetes finns som en hanterad tjänst i partnerskap med Safespring, vilket ger dig alla fördelar med en modern containerplattform som körs i nordiska datacenter utan att du behöver bekymra dig om driften.