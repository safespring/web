---
ai: true
title: "Superenkel provisjonering med Safesprings Terraform-moduler"
date: "2022-01-10"
intro: "Det har aldri vært enklere å provisjonere compute- og blokklagringsressurser på Safesprings infrastrukturplattform."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknologioppdatering"
author: "Jarle Bjørgeengen"
language: "nb"
toc: "Innholdsfortegnelse"
aliases:
  - /blogg/2022-01-terraform-modules
  - /blogg/2022/2022-01-terraform-modules/
---
{{< ingress >}}
I dette blogginnlegget viser vi hvor enkelt det er ved hjelp av våre Terraform-moduler fra fellesskapet.
{{< /ingress >}}

Det har aldri vært enklere å provisjonere compute- og blokklagringsressurser i Safesprings infrastrukturplattform. Modulene kan hentes direkte fra GitHub med et minimum av Terraform-kode.

{{% note "Les mer" %}}
Hvis du synes dette innlegget var nyttig, sjekk gjerne resten av serien om bruk av Terraform og Ansible for ressursprovisjonering og etterlevelse. Spesielt kan du like:

1. [Superenkel provisjonering med Safesprings Terraform-moduler](/blogg/2022-01-terraform-modules)
2. [Fleksibel provisjonering av ressurser med Safesprings nye Terraform-moduler](/blogg/2022-03-terraform-module)
3. [Integrere Terraform og Ansible for effektiv ressursforvaltning](/blogg/2022-05-terraform-ansible)
4. [Fra null til kontinuerlig etterlevelse med Terraform, Ansible og Rudder](/blogg/2022-06-terraform-ansible-rudder)

{{% /note %}}

## Introduksjon til Terraform

Terraform har blitt de facto industristandard for «Infrastructure as Code – IAC». Det er skrevet i Golang, er åpen kildekode, og du kan laste det ned som én enkelt kjørbar fil fra [nedlastingssiden for Terraform][tfdl].

Terraform tar klartekstfiler med «HCL – HashiCorp Configuration Language» som input og leverer servere og lagring som output. HCL er et deklarativt språk, det vil si at det ikke angir hvilke handlinger som skal utføres, men beskriver en ønsket tilstand – eller et ønsket resultat.

Tanken om at konfigurasjonsspråk bør være deklarative, og at faktisk tilstand skal konvergere mot den deklarerte ønskede tilstanden, har blitt bredt akseptert de siste tre tiårene og bygger på ideer og forskning av [Mark Burgess tidlig på nittitallet og senere][mbcfengine].

### Terraform-providere

Terraform sin styrke kommer fra alle dets providere. Terraform-providere er binære utvidelser av Terraform som, som navnet tilsier, «leverer» ressurser av ulike slag ved å bruke API-ene til skyleverandøren som utvidelsen er knyttet til.

Disse utvidelsene gjør tungjobben mot skyleverandørenes API-er og sørger for at faktisk tilstand (skyressursene) konvergerer mot det som er spesifisert som ønsket tilstand.

Terraform kan ses på som en ønsket-tilstand-konfigurasjonsagent for infrastruktur. Hver gang det kjøres, vil det gjøre ønsket tilstand om til faktisk tilstand for skyressurser.

### Redusere graden av leverandørlåsing («lock-in»)

Terraform har mengder av gjennomprøvde providere klare til bruk, noe som gjør det enklere å provisjonere skyressurser fra alle slags sky-API-er innenfor samme (eller ulike) konfigurasjoner.

La oss si at du trenger ressurser i andre skyer (eller on-premise) for de samme multisky- eller hybridmiljøene. Da kan du gjøre det med én Terraform-konfigurasjon, og du kan til og med skalere opp og ned antall ressurser ved å endre noen variabler i Terraform-koden din.

Terraform er sky-agnostisk og er derfor en utmerket forsikring for at ressursene dine er så flyttbare som mulig, noe som reduserer graden av «lock-in» til et minimum.

## Eksempler med Safesprings Terraform-moduler

Safespring Openstack-plattformen tilbyr to kategorier instans-flavors:

1. Flavors med lokal NVMe-disk. Flavornavn starter med `l`, for eksempel `lm.small`.
2. Flavors uten disk. Flavornavn starter uten `l`. Disse flavorene må provisjonere minst ett ekstra volum fra Openstack-volumtjenesten (Cinder) å starte operativsystemet fra.

Dermed er modulene delt inn i to hovedtyper etter om instansen har lokal disk eller ikke. I tillegg kan både instanser med og uten lokal disk ha en sentral disk (datadisk) koblet til. Det gir fire moduler totalt:

1. `v2-compute-local-disk`<br>
   Modul for flavor med lokal disk og uten ekstra sentral datadisk.
2. `v2-compute-central-disk`<br>
   Modul for flavor med sentral disk og uten ekstra sentral datadisk
3. `v2-compute-local-disk-and-attached-disk`<br>
   Modul for flavor med lokal disk og ekstra sentral datadisk
4. `v2-compute-central-disk-and-attached-disk`<br>
   Modul for flavor med sentral disk og ekstra sentral datadisk:

### 1. Det minste mulige eksempelet

En instans med lokal disk-flavor med standardverdier.

Parametere for flavor, image, name-prefix, suffix, count osv. er standard med mindre de angis. Den eneste obligatoriske parameteren er `key_pair_name`, som kan være en eksisterende nøkkel, eller den kan opprettes som en del av Terraform-konfigurasjonen. Først oppretter vi en med OpenStack CLI og refererer til den i Terraform-konfigurasjonen.

<script data-theme="solarized-dark" id="asciicast-yr2F1jWsmTWTFvkiXMtQ26f5I" src="https://asciinema.org/a/yr2F1jWsmTWTFvkiXMtQ26f5I.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

### 2. Det samme, men nå oppretter vi nøkkelen i Terraform

Først sletter vi det vi opprettet i forrige eksempel. Deretter legger vi til kode for å opprette et nøkkelpar med Terraform, og bruker så nøkkelparet i instanskonfigurasjonen. Dermed blir Terraform-konfigurasjonen selvstendig uten eksterne avhengigheter til Openstack-objekter.

Safespring-modulene inneholder referanser til hvilke providere/versjoner de er avhengige av. Når vi oppretter ressurser direkte i konfigurasjonen (som nøkkelparet i eksemplet under), må vi også inkludere konfigurasjon for OpenStack-provideren i rotmodulen (main.tf)

<script data-theme="solarized-dark" id="asciicast-P36Q7BaY9sktSzTbS7uhASjGj" src="https://asciinema.org/a/P36Q7BaY9sktSzTbS7uhASjGj.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

### 3. Nå med sikkerhetsgrupper

Hvis en instans ikke er medlem av noen sikkerhetsgrupper, er det umulig å kommunisere med instansen via tildelte IP-adresser. Eksemplet under viser hvordan du oppretter en sikkerhetsgruppe med et par regler som tillater `ssh` og `ICMP` (for eksempel ping) fra «hele verden» over IPv4. Det er også mulig å bruke navn på eksisterende sikkerhetsgrupper (for eksempel standard sikkerhetsgruppe, som alltid er til stede i et prosjekt).

Det bør også være mulig å ta i bruk konfigurasjonsendringer uten å måtte slette dagens ressurs-tilstand. Noen ganger er det umulig å endre tilstanden uten å gjenskape objekter. Terraform vil gjenskape objekter når endringene krever det, så vær nøye når du ser gjennom planen før du anvender den. Planen vises alltid når `terraform apply` kjøres i interaktiv modus, men det er også mulig/anbefalt å kjøre `terraform plan`, som kun viser de planlagte endringene.

La oss legge til den nye sikkerhetsgruppen i den eksisterende konfigurasjonen uten å slette noe først.

<script data-theme="solarized-dark" id="asciicast-py92MXeP9yI4f2a33Z5KMRLuk" src="https://asciinema.org/a/py92MXeP9yI4f2a33Z5KMRLuk.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

### 4. Flere moduler og parametere

Så hvordan vet jeg «magisk» hvilke parametere som er tilgjengelige i en modul og hva de gjør? Enkelt: Jeg ser i `variables.tf`-filen i modulkatalogen på GitHub. For eksempel ligger modulen `v2-compute-local-disk` som vi har brukt så langt (blant andre) på [Safespring Community på GitHub](https://github.com/safespring-community/terraform-modules/tree/main/v2-compute-local-disk). Det ligger noen `.tf`-filer i den katalogen. `variables.tf` inneholder alle variablene/parameterne modulen aksepterer, beskrivelsen av dem og standardverdier.

La oss bruke det til å utvide konfigurasjonen vår litt til.

<script data-theme="solarized-dark" id="asciicast-rfkA04x6QfSkGaIMJOS1rTGJE" src="https://asciinema.org/a/rfkA04x6QfSkGaIMJOS1rTGJE.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

### 5. Oppsummering

Vi har sett hvor lite kode som skal til for å sette opp grupper av ressurser på Safesprings compute-plattform ved å bruke et minimum av Terraform-kode som gjenbruker Safespring-spesifikke moduler direkte fra GitHub for å spesifisere ønsket tilstand for Safespring-ressurser.

Vi har også pekt til modulenes kildekode, som du kan undersøke for å se hva de gjør og hvordan de gjør det. Kildekoden kan inspirere deg til å lage egne moduler for dine formål.

Det neste innlegget vil gå videre med modulbruk for å opprette flere sett/grupper av instanser og sikkerhetsgrupper for å orkestrere og koble sammen miljøer. Det vil også vise hvordan metadata-roller fra Terraform-konfigurasjonen kan brukes som Ansible-inventory-grupper for å konfigurere operativsystemene etter rollene instansene skal fylle.

[mbcfengine]: https://www.researchgate.net/publication/243774232_Cfengine_A_site_configuration_engine
[tfdl]: https://www.terraform.io/downloads
[sftfmodules]: https://github.com/safespring-community/terraform-modules