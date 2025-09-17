---
ai: true
title: "Supernem provisionering med Safespring Terraform-modulerne"
date: "2022-01-10"
intro: "Det har aldrig været nemmere at provisionere compute- og bloklagringsressourcer på Safesprings infrastrukturplatform."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Tech-opdatering"
author: "Jarle Bjørgeengen"
language: "da"
toc: "Indholdsfortegnelse"
aliases:
  - /blogg/2022-01-terraform-modules
  - /blogg/2022/2022-01-terraform-modules/
---
{{< ingress >}}
I dette blogindlæg viser vi, hvor let det er, med eksempler fra vores community-Terraform-moduler.
{{< /ingress >}}

Det har aldrig været nemmere at klargøre compute- og bloklagringsressourcer på Safesprings infrastrukturplatform. Moduler kan hentes direkte fra GitHub med et minimum af Terraform-kode.

{{% note "Læs mere" %}}
Hvis du fandt dette indlæg nyttigt, så tjek resten af serien om brug af Terraform og Ansible til klargøring og compliance. Især vil du måske også synes om:

1. [Ekstremt nem klargøring med Safesprings Terraform-moduler](/blogg/2022-01-terraform-modules)
2. [Fleksibel klargøring af ressourcer med Safesprings nye Terraform-moduler](/blogg/2022-03-terraform-module)
3. [Integrering af Terraform og Ansible til effektiv ressourcehåndtering](/blogg/2022-05-terraform-ansible)
4. [Fra nul til kontinuerlig compliance med Terraform, Ansible og Rudder](/blogg/2022-06-terraform-ansible-rudder)

{{% /note %}}

## Introduktion til Terraform

Terraform er blevet de facto industristandard for »Infrastructure as Code (IaC)«. Det er skrevet i Golang, er open source, og du kan downloade det som en enkelt eksekverbar fil fra [Terraform-downloadsiden][tfdl].

Terraform tager almindelige tekstfiler med »HCL – HashiCorp Configuration Language« som input og leverer servere og storage som output. HCL er et deklarativt sprog, dvs. det angiver ikke handlinger, der skal udføres, men derimod en ønsket tilstand – eller et ønsket resultat.

Ideen om, at konfigurationssprog bør være deklarative, og at den faktiske tilstand skal konvergere mod den deklarerede ønskede tilstand, er blevet bredt accepteret gennem de sidste tre årtier og bygger på idéer og forskning af [Mark Burgess i begyndelsen af halvfemserne og senere][mbcfengine].

### Terraform-providere

Terraform får sin styrke fra alle sine providere. Terraform-providere er binære udvidelser til Terraform, som – som navnet antyder – »leverer« ressourcer af forskellig art ved at bruge API’erne fra den cloud-udbyder, som udvidelsens navn afspejler.

Disse udvidelser tager sig af alt det tunge arbejde mod cloud-udbydernes API’er og sikrer, at den faktiske tilstand (cloud-ressourcerne) konvergerer mod den ønskede tilstand.

Terraform kan ses som en Desired State-konfigurationsagent for infrastruktur. Hver gang det køres, omsætter det den ønskede tilstand til faktisk tilstand for cloud-ressourcer.

### Reduktion af «lock-in»

Terraform har masser af gennemprøvede providere, hvilket letter byrden ved at klargøre cloud-ressourcer fra alle mulige cloud-API’er i samme (eller forskellige) konfigurationer.

Lad os sige, at du har brug for ressourcer i andre clouds (eller on-premise) til det samme multi-cloud- eller hybride miljø. Det kan du gøre med én Terraform-konfiguration, og du kan endda skalere antallet af ressourcer op og ned ved at ændre nogle variabler i din Terraform-kode.

Terraform er cloud-agnostisk og er derfor en glimrende forsikring for, at dine ressourcer er så portable som muligt, hvilket reducerer niveauet af »lock-in« til et minimum.

## Eksempler med Safesprings Terraform-moduler

Safesprings OpenStack-platform tilbyder to kategorier af instans-typer (flavors):

1. Flavors med lokal NVMe-disk. Flavornavne begynder med `l`, f.eks. `lm.small`.
2. Flavors uden disk. Flavornavne begynder uden `l`. Disse flavors skal klargøre mindst ét ekstra volume fra OpenStacks volume-tjeneste (Cinder) at boote operativsystemet fra.

Derfor er modulerne opdelt i to hovedtyper alt efter, om instanserne har lokal disk eller ej. Derudover kan både instanser med og uden lokal disk få tilkoblet et centralt datadrev. Det giver fire moduler i alt:

1. `v2-compute-local-disk`<br>
   Modul til flavor med lokal disk og uden ekstra centralt datadrev.
2. `v2-compute-central-disk`<br>
   Modul til flavor med central disk og uden ekstra centralt datadrev
3. `v2-compute-local-disk-and-attached-disk`<br>
   Modul til flavor med lokal disk og ekstra centralt datadrev
4. `v2-compute-central-disk-and-attached-disk`<br>
   Modul til flavor med central disk og ekstra centralt datadrev:

### 1. Det mindst mulige eksempel

En instans med en flavor med lokal disk og standardværdier.

Parametrene for flavor, image, name-prefix, suffix, count osv. er standard, med mindre de angives. Den eneste obligatoriske parameter er `key_pair_name`, som kan være en eksisterende nøgle, eller den kan oprettes som en del af Terraform-konfigurationen. Først opretter vi en med OpenStack CLI og refererer til den i Terraform-konfigurationen.

<script data-theme="solarized-dark" id="asciicast-yr2F1jWsmTWTFvkiXMtQ26f5I" src="https://asciinema.org/a/yr2F1jWsmTWTFvkiXMtQ26f5I.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

### 2. Samme øvelse, men nu opretter vi nøglen i Terraform

Først destruerer vi det, vi oprettede i det forrige eksempel. Derefter tilføjer vi kode til at oprette et nøglepar med Terraform og bruger nøgleparet i instanskonfigurationen. Dermed bliver Terraform-konfigurationen selvstændig uden eksterne afhængigheder til OpenStack-objekter.

Safesprings moduler indeholder referencer til, hvilke providere/versioner de afhænger af. Når vi opretter ressourcer direkte i konfigurationen (som nøgleparet i eksemplet nedenfor), skal vi også inkludere konfiguration for OpenStack-provider i root-modulet (main.tf)

<script data-theme="solarized-dark" id="asciicast-P36Q7BaY9sktSzTbS7uhASjGj" src="https://asciinema.org/a/P36Q7BaY9sktSzTbS7uhASjGj.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

### 3. Nu med sikkerhedsgrupper

Hvis en instans ikke er medlem af nogen sikkerhedsgrupper, er det umuligt at kommunikere med instansen via tildelte IP-adresser. Det følgende eksempel viser, hvordan man opretter en sikkerhedsgruppe med et par regler, der tillader `ssh` og `ICMP` (fx ping) fra »hele verden« via IPv4. Det er også muligt at bruge navne på eksisterende sikkerhedsgrupper (fx standard-sikkerhedsgruppen, som altid findes i et projekt).

Det bør også være muligt at anvende konfigurationsændringer uden at skulle destruere den nuværende tilstand af ressourcerne. Nogle gange er det umuligt at ændre tilstanden uden at genskabe objekter. Terraform genskaber objekter, når ændringerne kræver det, så vær omhyggelig, når du gennemgår planen, før du anvender den. Planen vises altid, når `terraform apply` køres i interaktiv tilstand, men det er også muligt/anbefalet at køre `terraform plan`, som kun viser de planlagte ændringer.

Lad os anvende vores nytilføjede sikkerhedsgruppe på den eksisterende konfiguration uden først at destruere den.

<script data-theme="solarized-dark" id="asciicast-py92MXeP9yI4f2a33Z5KMRLuk" src="https://asciinema.org/a/py92MXeP9yI4f2a33Z5KMRLuk.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

### 4. Flere moduler og parametre

Hvordan ved jeg »magisk«, hvilke parametre der er tilgængelige for et modul, og hvad de gør? Nemt – jeg kigger i filen `variables.tf` i modulmappen på GitHub. For eksempel ligger modulet `v2-compute-local-disk`, som vi har brugt indtil nu (blandt andre), på [Safespring Community på GitHub](https://github.com/safespring-community/terraform-modules/tree/main/v2-compute-local-disk). Der ligger nogle `.tf`-filer i den mappe. `variables.tf` indeholder alle de variabler/parametre, som modulet accepterer, deres beskrivelser og standardværdier.

Lad os bruge det til at udvide vores konfiguration lidt mere.

<script data-theme="solarized-dark" id="asciicast-rfkA04x6QfSkGaIMJOS1rTGJE" src="https://asciinema.org/a/rfkA04x6QfSkGaIMJOS1rTGJE.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

### 5. Afrunding

Vi har set, hvor lidt kode der skal til for at udrulle grupper af ressourcer på Safesprings compute-platform ved hjælp af en minimal mængde Terraform-kode, der genbruger Safespring-specifikke moduler direkte fra GitHub til at angive den ønskede tilstand for Safespring-ressourcer.

Vi har også henvist til modulernes kildekode, som du kan gennemgå for at se, hvad de gør, og hvordan de gør det. Kildekoden kan inspirere dig til at oprette dine egne moduler til netop dit formål.

Det næste indlæg vil uddybe modulbrug yderligere for at oprette flere sæt/grupper af instanser og sikkerhedsgrupper til at orkestrere og forbinde miljøer. Det vil også demonstrere, hvordan metadata-roller fra Terraform-konfigurationen kan bruges som Ansible-inventorygrupper til at konfigurere operativsystemerne i henhold til de roller, som instanserne skal udfylde.

[mbcfengine]: https://www.researchgate.net/publication/243774232_Cfengine_A_site_configuration_engine
[tfdl]: https://www.terraform.io/downloads
[sftfmodules]: https://github.com/safespring-community/terraform-modules