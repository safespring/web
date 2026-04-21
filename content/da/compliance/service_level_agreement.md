---
ai: true
title: "Serviceniveauaftale"
date: 2026-04-15
draft: false
intro: "Om oppetid og hjælp. Forklarer tilgængelighedsmål, hændelseshåndtering, forventninger til respons og hvilken kompensation der gælder, hvis målene ikke opfyldes."
documentimage: "safespring_card_21.jpg"
sidebarlinkname: ""
sidebarlinkicon: ""
sidebarlinkurl: ""
general: "yes"
toc: "Indholdsfortegnelse"
language: "da"
noindex: "x"
aliases:
  - /document/service_level_agreement/
---

I løbetiden for den aftale, hvor Safespring har forpligtet sig til at levere
sine tjenester til kunden ("aftalen"), skal hver omfattet tjeneste levere en
månedlig oppetidsprocent til kunden som angivet i tabellerne nedenfor
("Service Level Objective" eller "SLO").

Hvis Safespring ikke opfylder SLO'en, og kunden opfylder sine forpligtelser
efter denne SLA, kan kunden være berettiget til de finansielle kreditter, der
beskrives nedenfor. Denne SLA angiver kundens eneste og eksklusive retsmiddel,
hvis Safespring ikke opfylder SLO'en.

## 1. Serviceniveaumål

Mål for månedlig oppetidsprocent fastsættes pr. omfattet tjeneste. Hver
tjeneste måles uafhængigt på kalendermånedsbasis.

| Omfattet tjeneste | Månedlig oppetid % |
|---|---|
| **Compute (IaaS), Network, Block Storage** | **99,99%** |
| **Kubernetes (control plane)** | **99,95%** |
| **Object Storage (S3)** | **99,95%** |
| **Backup Service** | **99,9%** |

**Bemærk:** Kubernetes-SLO'en gælder kun for control plane. Tilgængeligheden
for worker nodes reguleres af den underliggende Compute-SLO.

## 2. Latensmål

Ud over tilgængelighed har følgende tjenester latensmål målt ved 95.
percentilen (p95) over en kalendermåned.

| Tjeneste | Målepunkt | Min | Gns. (p50) | Maks. (p95) |
|---|---|---|---|---|
| **Network (intra-site)** | Round-trip | [TBD] | [TBD] | [TBD] |
| **Block Storage (læsning)** | IOPS-latens | [TBD] | [TBD] | [TBD] |
| **Block Storage (skrivning)** | IOPS-latens | [TBD] | [TBD] | [TBD] |
| **Object Storage (S3)** | First-byte | [TBD] | [TBD] | [TBD] |

**Bemærk:** Latensmålene er informative og er ikke omfattet af finansielle
kreditter. Vedvarende afvigelser kan indrapporteres til Safesprings support
til undersøgelse.

## 3. Definitioner

Følgende definitioner gælder for SLA'en:

### Omfattet tjeneste

-   **COMPUTE**
    Safesprings Compute-tjeneste, herunder virtuelle maskiner, lokal lagring
    og block storage-volumener.
-   **NETWORK**
    Netværksforbindelsen mellem kundeinstanser på en Safespring-site og til
    eksterne endpoints.
-   **BLOCK STORAGE**
    Persistente block storage-volumener tilknyttet Compute-instanser.
-   **KUBERNETES**
    Kubernetes API og control plane leveret som del af Safesprings managed
    Kubernetes-tilbud.
-   **OBJECT STORAGE**
    Safesprings S3-kompatible object storage-tjeneste.
-   **BACKUP**
    Safesprings cloud backup-tjeneste.

### Nedetid

Nedetid defineres pr. omfattet tjeneste som følger:

-   **COMPUTE**
    En virtuel maskine bliver utilgængelig, crasher eller mister adgang til
    tilknyttet block storage og påvirker instanser på tværs af to eller flere
    fysiske hosts. Fejl på en enkelt host er undtaget (se punkt 5).
-   **NETWORK**
    Fuldstændigt tab af netværksforbindelse på site-niveau, der påvirker alle
    kunder.
-   **BLOCK STORAGE**
    Manglende mulighed for at udføre læse- eller skrive-I/O på provisionerede
    volumener.
-   **KUBERNETES**
    Kubernetes API'et er utilgængeligt eller kan ikke behandle forespørgsler
    for alle klynger. Fejl på enkelte worker nodes eller pods anses ikke som
    nedetid og er dækket af Compute-SLO'en.
-   **OBJECT STORAGE**
    S3 API'et er utilgængeligt eller kan ikke behandle læse-, skrive- eller
    list-forespørgsler.
-   **BACKUP**
    Backup-tjenesten er utilgængelig, og klienter kan ikke starte eller
    gennemføre backup- eller restore-operationer.

### Nedetidsperiode

"Nedetidsperiode" betyder en periode på fem eller flere sammenhængende
minutter med nedetid. Intermitterende nedetid på mindre end fem minutter
medregnes ikke som en nedetidsperiode.

### Månedlig oppetidsprocent

"Månedlig oppetidsprocent" betyder det samlede antal minutter i en
kalendermåned minus antallet af nedetidsminutter fra alle nedetidsperioder i
den måned, divideret med det samlede antal minutter i måneden.

### Planlagt nedetid

"Planlagt nedetid" betyder nedetid, der skyldes, at Safespring udfører
vedligeholdelse i et på forhånd kommunikeret vedligeholdelsesvindue. Planlagt
nedetid er undtaget fra beregningen af månedlig oppetidsprocent.

### Vedligeholdelsesvindue

En periode, hvor Safespring udfører planlagt vedligeholdelse på en omfattet
tjeneste. Vedligeholdelsesvinduer skal annonceres mindst 5 arbejdsdage i
forvejen. Ét vedligeholdelsesvindue pr. tjeneste pr. måned er standard. I
ekstraordinære tilfælde, der involverer eksterne sikkerhedstrusler, kan
yderligere vedligeholdelsesvinduer annonceres med så langt varsel som muligt.

## 4. Finansielle kreditter

Finansielle kreditter fastsættes på kalendermånedsbasis pr. omfattet tjeneste.

-   **MUP** Månedlig oppetidsprocent
-   **PMB** Procentdel af den månedlige faktura for den berørte omfattede
    tjeneste, som ikke opfyldte SLO'en, og som krediteres kundens fremtidige
    månedlige fakturaer.

### Compute, Network, and Block Storage

| **MUP** | **PMB** |
|---|---|
| 99,00% til < 99,99% | 10% |
| 95,00% til < 99,00% | 25% |
| < 95,00% | 50% |

### Kubernetes and Object Storage

| **MUP** | **PMB** |
|---|---|
| 99,00% til < 99,95% | 10% |
| 95,00% til < 99,00% | 25% |
| < 95,00% | 50% |

### Backup

| **MUP** | **PMB** |
|---|---|
| 99,00% til < 99,90% | 10% |
| 95,00% til < 99,00% | 25% |
| < 95,00% | 50% |

### Kunden skal anmode om finansiel kredit

For at modtage nogen af de finansielle kreditter beskrevet ovenfor skal kunden
underrette Safespring senest tredive dage efter det tidspunkt, hvor kunden blev
berettiget til at modtage en finansiel kredit. Kunden skal også fremlægge
logfiler eller overvågningsdata, der viser tjenestens utilgængelighed samt dato
og tidspunkt for de relevante fejl.

### Maksimal finansiel kredit

Det samlede maksimale antal finansielle kreditter, som Safespring udsteder til
kunden for alle nedetidsperioder i en enkelt faktureringsmåned, kan ikke
overstige 50% af det beløb, kunden skal betale for den berørte omfattede
tjeneste for den pågældende måned. Finansielle kreditter gives som en monetær
kredit til fremtidig brug af tjenesten og anvendes senest 60 dage efter, at den
finansielle kredit blev anmodet om.

## 5. SLA-undtagelser

Denne SLA gælder ikke for:

(a) planlagt nedetid eller på forhånd kommunikerede vedligeholdelsesvinduer;

(b) hardwarefejl, der påvirker enkelte compute-hosts;

(c) funktioner, der er markeret som beta;

(d) fejl forårsaget af faktorer uden for Safesprings rimelige kontrol;

(e) fejl, der skyldes kundens software, hardware eller tredjepartssoftware
eller -hardware;

(f) fejl, der skyldes misbrug eller anden adfærd, som overtræder aftalen eller
den acceptable brugspolitik;

(g) fejl forårsaget af kvoter eller ressourcegrænser angivet i
selvbetjeningsportalen.

## 6. Måling og overvågning

Tilgængelighed måles ved forbindelsespunktet (leveringspunktet) ved hjælp af
Safesprings infrastrukturovervågningssystemer i datacentret.

Kunden er ansvarlig for at overvåge sine egne instanser og sikre, at tjenester
kører efter en afbrydelse.

Kunder opfordres til at abonnere på statussiden på
https://status.safespring.com for opdateringer om hændelser i realtid.
