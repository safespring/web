---
ai: true
title: "Privat moln"
language: "sv"
cardtitle: "Privat moln"
cardicon: "fa-solid fa-shield-check"
cardcolor: "#195F8C"
cardorder: "07"
date: "2025-01-20"
draft: false
cardintro: "Komplett erbjudande inklusive hårdvara, drift och programvaruunderhåll."
intro: "Omfattande privata molnlösningar, inklusive hårdvara, drift och programvaruunderhåll, anpassade för full kontroll och skalbarhet i dedikerad kundägd infrastruktur."
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tillbaka till alla kategorier"
sidebarlinkurl: "/geant/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "OCRE 2024-ramverk"
socialmedia: "/safespring-start.jpg"
toc: "På den här sidan"
noindex: "x"
aliases:
- /geant/service-catalogue/private-cloud/
---
{{< ingress >}}
Komplett erbjudande för Private Cloud-implementering, inklusive hårdvara, drift och programvaruunderhåll. Hårdvaran ägs av kunden, som även tillhandahåller rackplats i datacenter för installationen.
{{< /ingress >}}

Grunderbjudandet för Compute inkluderar Control Plane och Compute-tjänst med endast lokal instanslagring.

Tillval omfattar Elastic Block Storage (Ceph-kluster) och accelererade beräkningsnoder (vanligen GPU).

Grunderbjudandet för Storage inkluderar Control Plane och lagringsnoder av antingen HDD- eller NVMe-typ.

Lagringsgränssnitt omfattar RADOS, S3 via Rados Gateway, Rados Block Device eller iSCSI/NFS via en lagringsproxy.

Vid behov kan kunden ta över förvaltningen av installationen och fortsätta att drifta tjänsten i egen regi. Detta säkerställer kontinuitet i tjänsterna om kundens behov förändras över tid och kan underlättas genom kontrollerad kunskapsöverföring från Safespring till kunden.

## Private Cloud – Compute Base

Baskonfigurationen, Compute Base, är avsedd för installation i ett dedikerat rackutrymme, helst med utrymme för expansion. ToR-switcharna skalar till 24 compute- eller lagringsnoder eftersom 4 gränssnitt reserveras för control plane, 2 för länkar mellan switchar och 2 för uplänkar.

Vid installation över flera rack krävs ytterligare portar för korskoppling. Konfiguration av Compute Node (CPU, RAM, lokal NVMe) enligt kundens specifikation.

### Förutsättningar

Inga.

## Private Cloud – Volymlagringsalternativ

Compute Volumes-alternativet lägger till flera lagringsmöjligheter till en Compute Base-installation. NVMe för lokal, efemär lagring på de compute-noder där instanserna körs, samt HDD-baserad lagring för beständig lagring i ett delat Ceph-kluster. Det återanvänder switchar och control plane från Private Cloud-installationen. ToR-switcharna har 32x100 Gbps och skalar till 24 compute- eller lagringsnoder eftersom fyra gränssnitt reserveras för control plane, två för länkar mellan switchar och två för uplänkar.

Vid installation över flera rack krävs ytterligare portar för korskoppling. Lagringsgränssnittet är Rados Block Device (RBD) till compute-noderna. HDD-lagringsnod rymmer 12x3,5”, maximal kapacitet per disk beror på marknadstillgång och den använder Optane-enhet för databasen. NVMe-lagringsnod rymmer 10x2,5” NVMe; diskarnas skrivuthållighet och storlek beror på marknadstillgång och kundens preferenser.

### Förutsättningar

Compute Base-konfiguration.

## Private Cloud – S3-lagringsalternativ

Private Cloud kan levereras med ett stort, skalbart objektlager med ett S3-kompatibelt API. Detta ger kunden ett kostnadseffektivt och standardiserat sätt att lagra stora datamängder på plattformen.

I kombination med blocklagringsalternativet som är anslutet till compute-noderna kan data lagras i S3-objektlagret och sedan kopieras till blocklagringen under bearbetning. Denna kombination av S3-objektlagring och blocklagring ger en mycket kostnadseffektiv men ändå produktiv miljö för att lagra och bearbeta stora datamängder.

S3-lagringsalternativet är en fristående lösning från Compute Base och kan sättas upp separat.

### Förutsättningar

Inga.

{{< distance >}}
{{% custom-card image="/img/kontakt/safespring-daniel-melin-2024.webp" cardtitle="Kontakta Safespring" %}}
{{< inline "Support:" >}} support@safespring.com  
{{< inline "Sales:" >}} +46855107370 eller sales@safespring.se
{{% /custom-card %}}