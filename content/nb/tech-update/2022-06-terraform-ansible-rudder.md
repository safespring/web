---
ai: true
title: "Fra null til kontinuerlig etterlevelse med Terraform, Ansible og Rudder"
date: "2022-06-29"
intro: "Dette innlegget viser hvordan du kan gå fra null ressurser til en fullt automatisert infrastruktur som til enhver tid er i samsvar med kravene, utelukkende ved hjelp av kode."
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
  - /blogg/2022-06-terraform-ansible-rudder
  - /blogg/2022/2022-06-terraform-ansible-rudder/
---
{{< ingress >}}
Dette blogginnlegget ser på hvordan vi kan bygge enda videre på
tidligere demonstrerte konsepter for å opprette sett med servere som
kontinuerlig overvåkes og holdes i etterlevelse ved hjelp av Rudder, et topp moderne
konfigurasjonsstyringsverktøy.
{{< /ingress >}}

{{% disclaimer "oppdatering" %}}
Oppdatert for å rette en inkonsistens 2022-08-22
{{% /disclaimer %}}

{{% note "Les mer" %}}
Hvis du synes dette innlegget var nyttig, bør du også sjekke resten av serien om bruk av Terraform og Ansible for ressursprovisjonering og etterlevelse. Spesielt kan disse være interessante:

1. [Superenkel provisjonering med Safesprings Terraform‑moduler](/blogg/2022-01-terraform-modules)
2. [Fleksibel provisjonering av ressurser med Safesprings nye Terraform‑moduler](/blogg/2022-03-terraform-module)
3. [Integrering av Terraform og Ansible for effektiv ressursforvaltning](/blogg/2022-05-terraform-ansible)
4. [Fra null til kontinuerlig etterlevelse med Terraform, Ansible og Rudder](/blogg/2022-06-terraform-ansible-rudder)

{{% /note %}}

## Forutsetninger

Dette blogginnlegget forutsetter at du bruker den åpne kildekode‑baserte Terraform CLI. Terraform CLI
er bare et binært program du laster ned fra [utgivelsessiden][tfreleases],
for din arkitektur/plattform. Her finner du også kontrollsummer for filene for å
verifisere integriteten.

Med mindre annet er forklart, forutsetter alle eksemplene at du legger koden
i en `.tf`‑fil i en egen katalog og kjører `plan`, `init`, `apply` og `destroy`
fra den katalogen. `main.tf` brukes mest som en navnekonvensjon,
men du kan kalle filen hva du vil så lenge den ender på `.tf`.

Det finnes også den offisielle [Terraform‑dokumentasjonen][tfdocs].

Grunnleggende forståelse av Ansible‑playbooks og inventar (inventories) er også nødvendig.

## Introduksjon til Terraform

Terraform tar tekstfiler med «HCL ‑ Hashicorp Configuration Language»
som input og provisjonerer servere og lagring som output. HCL er et deklarativt
språk, dvs. det spesifiserer ikke handlinger som skal utføres, men en ønsket
tilstand – eller et ønsket resultat.

Ideen om at konfigurasjonsspråk bør være deklarative, og at
agenten skal drive/konvergere faktisk tilstand mot den deklarerte ønskede tilstanden, har
blitt bredt akseptert de siste tre tiårene og bygger på ideer og
forskning av [Mark Burgess på begynnelsen av 90‑tallet og senere][mbcfengine].

### Terraform‑providere

Superkraften til Terraform kommer fra alle providerne. Terraform‑providere er binære utvidelser av Terraform som, som navnet indikerer,
«leverer» ressurser av ulike slag ved å bruke API‑ene til skyleverandøren
som utvidelsens navn reflekterer.

Disse utvidelsene gjør det tunge arbeidet mot skyleverandørenes API‑er og
sørger for at faktisk tilstand (skyressursene) konvergeres til det som er
spesifisert som ønsket tilstand.

Terraform kan ses på som en ønsket‑tilstand‑konfigurasjonsagent for
infrastruktur. Hver gang det kjøres, vil det omsette ønsket tilstand til
faktisk tilstand for skyressurser.

### Redusere graden av «lock‑in»

Terraform har mengder av velprøvde providere klare til bruk, noe som gjør det enklere å
provisjonere skyressurser fra alle typer sky‑API‑er innenfor
samme (eller ulike) konfigurasjoner.

La oss si at du trenger ressurser i andre skyer (eller on‑prem) til de samme
multi‑cloud‑ eller hybride miljøene. Da kan du gjøre det med én Terraform‑
konfigurasjon, og du kan til og med skalere opp og ned antall ressurser ved å endre
noen variabler i Terraform‑koden din.

Terraform er sky‑agnostisk og er dermed en utmerket forsikring for at ressursene dine
er så portable som mulig, og reduserer «lock‑in» til et minimum.

{{< disclaimer "Ansvarsfraskrivelse" >}}Terraform er et kraftig verktøy, og kraftige verktøy kan føre til alvorlige feil hvis de misbrukes. Les dokumentasjonen
og følg anbefalte praksiser for å forstå verktøyets natur før du bruker det til
viktige oppgaver.{{< /disclaimer >}}

## Introduksjon til Ansible

[Ansible][ansible] er en verktøypakke for orkestrering og konfigurasjonsstyring,
hovedsakelig ved å bruke såkalte playbooks. Playbooks skrives i YAML og beskriver den
ønskede tilstanden for operativsystemegenskaper som filer, tjenester, filsystemer
og så videre. Det brukes primært til å konfigurere Linux‑baserte operativsystemer over
SSH‑protokollen, men kan også brukes til å konfigurere Windows‑operativsystemer.
I dette innlegget viser vi hvordan vi bruker Ansible til å konfigurere tjenester på
et Linux‑basert operativsystem (Ubuntu 20.04).

### Ansible‑inventarer

Ansible‑inventarer er lister over verter (hosts), grupper av verter, og variabler for disse
vertene og gruppene. Verter og grupper brukes til å fortelle Ansible hvor en
ønsket tilstand (oppgave) er aktuell. Når man jobber med statiske verter i et
datasenter, er inventarer ofte også statiske tekstfiler som vedlikeholdes
manuelt eller semimanuelt. Inventarer kan imidlertid også være dynamiske, dvs.
generert av skript.

Når man jobber med OpenStack, er det mulig å bruke inventarskript som
spør OpenStack‑API‑et direkte og produserer et komplett inventar over alle
instanser med metadata, alle gruppemedlemskap osv., men ofte
bruker disse skriptene lang tid å kjøre, og de må som regel kjøres hver
gang du kjører en playbook. Dermed blir playbook‑kjøringer størrelsesordener mer
tidkrevende enn med statiske inventarer. De kan også belaste
OpenStack‑API‑ene tungt hvis inventaret hentes ofte.

## Terraform og Ansible

Det må vel være «Terrible» da ;-)? Faktisk er det ikke ille i det hele tatt.

Terraform fører sin egen oversikt over alle objektene det provisjonerer sammen med
metadataene deres. Dette kalles «state», og lagres i den lokale katalogen
der Terraform kjøres som standard, i en fil som heter `terraform.tfstate`. Forrige
state‑versjon sikkerhetskopieres i filen `terraform.tfstate.backup`.

Dette betyr at det meste du kan spørre API‑et om, for Terraform‑
provisjonerte objekter i OpenStack, også vil være til stede i den lokale Terraform
state‑filen. Hvis vi derfor bruker et skript som leser den lokale Terraform‑state‑
filen, får vi høy ytelse og unngår ressursbruk mot
OpenStack‑API‑et. Det er nettopp dette vi skal vise her. Det finnes flere
skript/programmer for dette formålet (https://duckduckgo.com er din venn),
men vi bruker et enkelt [Python‑skript][ati] opprinnelig utviklet av Cisco
Systems.

### Kom i gang

For å bruke det, kopier eller lag en symbolsk lenke (symlink) til skriptet et passende sted og
bruk stien som `--inventory`‑flagget til `ansible-*`‑kommandoer. Hvis du
legger skriptet i en katalog og bruker katalognavnet som `--inventory`,
kan du også kombinere informasjonen fra det dynamiske inventaret skriptet leverer
med statiske inventarfiler som ytterligere beriker eller transformerer det dynamiske
inventaret. Hvis du for eksempel bruker en Ansible‑rolle eller playbook som krever et
spesifikt vertsgruppenavn, kan du bruke et statisk inventar til å definere en ny vertsgruppe
med et valgfritt navn, og angi en vertsgruppe fra det dynamiske inventaret som `children`
til gruppen du opprettet, og deretter bruke den gruppen med rollen eller playbooken din. Vi ser
på det i et senere eksempel.

## Introduksjon til Rudder

[Rudder][rudder] er et åpen kildekode‑verktøy for konfigurasjons‑ og sikkerhetsstyring.
Det kommer med et multi‑tenant‑kontrollplan for å administrere og overvåke grupper
av noder/agenter sentralt. Fordi Rudder er bygget på den svært
effektive [Cfengine‑kjernen][cfcore], bruker det svært lite ressurser, er
lynraskt og skalerer fra en håndfull noder til mange tusen.

{{% accordion title="En kort historietime" %}}
Konfigurasjonsdrift var et problem i datasentre lenge før «Skyen»
kom. Verktøy som Cfengine, Chef og Puppet adresserte dette i stor
grad ved mer eller mindre kontinuerlig å sammenligne ønsket tilstand med faktisk
tilstand, for deretter å konvergere systemet til ønsket tilstand ved å rette opp
forskjellene. Du kan tenke på konfigurasjonsdrift som mutasjoner og på verktøy for konfigurasjonsstyring som immunsystemet som retter opp mutasjonene, og slik
skaper stabilitet og robusthet mot forstyrrelser og sikkerhetsproblemer.
Altså analogien med at servere er som kjæledyr som må tas vare på gjennom hele
levetiden, som kan være mange år.

I sky‑æraen finnes et nytt paradigme som i stor grad beskrives av ideen om
immutabel infrastruktur og at servere er som storfe: kortlivede, og hvis
det oppstår problemer, bygger vi bare serveren på nytt fra et image og kjører
malbyggingen (én gang) for å skape ønsket tilstand.

Etter flere år med skyløsninger, og ved å observere hvordan mange mennesker og selskaper
bruker dem, ser vi imidlertid et klart gap mellom virkeligheten
og den noe illusoriske ideen om kortlivede «cattle»‑servere (instanser):

Fordi mange selskaper er så fokusert på å levere nye funksjoner raskt, er
virkeligheten at infrastrukturer slett ikke er kortlivede, spesielt når man tar
med i betraktningen at tiden fra utrulling av et oppdatert system til en
ny sikkerhetsfeil oppdages er blitt kortere. Dette gjelder spesielt for
virtuelle maskiner, men selv for containere ser vi at mange lever lenge og dermed
opplever de samme problemene som «kjæledyr‑serverne» fra gamle dager. Gitt
dårlig programvarekvalitet, og dermed rask oppdagelse av sårbarheter, er det
i bunn og grunn samme situasjon som før. Kanskje enda verre, fordi
containere og deres orkestrering introduserer ekstra kompleksitet og dermed større
angrepsflater.

Den gode nyheten er at verktøyene som retter konfigurasjonsdrift fortsatt
finnes og kan – og bør – brukes inne i sky‑instanser for å lukke gapet
beskrevet over. Dette blogginnlegget illustrerer hvor enkelt det kan være å gå fra en
«fire and forget»‑verden til en «kontinuerlig etterlevelse»‑verden.  
{{% /accordion %}}

Du kan velge å kjøpe en Rudder‑abonnements‑støtteplan fra Normation,
selskapet bak Rudder, for å få forutsigbarhet for produktutvikling og vedlikehold samt ulike støtte‑SLA‑er. Normation tilbyr også
kurs og rådgivning rundt Rudder. Eller du kan velge å installere og
drifte det selv med hjelp fra de hyggelige sjelene hos Normation m.fl., som
leverer ferdige programpakker, Ansible‑samling osv. for de mest
vanlige plattformene.

Den røde tråden gjennom denne bloggserien er hvordan vi limer sammen eksisterende
teknologier for å oppnå et høyere mål – tidligere ved å bruke Ansible Terraform
Inventory (ATI)‑skriptet for å bygge bro mellom Terraform og Ansible. Denne gangen tar vi det
et steg videre og bruker Ansible med ATI sammen med en [Ansible‑samling][rudder-ansible]
vedlikeholdt av Normation for å installere Rudder‑server og ‑agenter og bootstrappe disse agentene til nevnte server.

## Installere og bootstrappe Rudder med Ansible

Vi bruker [eksemplene][sftfexamples] i Terraform‑modulets [Git‑repo][sftfmodules] som referanse og forklarer hvert av dem under koden.

### Installere en Rudder‑server og bootstrappe agenter til den serveren

Eksempel i https://github.com/safespring-community/terraform-modules/tree/main/examples/v2-rudder-minimal-poc

#### Terraform‑kode```terraform

terraform {
  required_version = ">= 0.14.0"
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
    }
  }
}

# Create a keypair from a public key.
# An openstack keypair contains only the public key. Thus a misleading name for it.
resource "openstack_compute_keypair_v2" "skp" {
  name       = "hello-pubkey"
  public_key = "${chomp(file("~/.ssh/id_rsa.pub"))}"
}

module interconnect {
   source = "github.com/safespring-community/terraform-modules/v2-compute-security-group"
   name = "interconnect"
   delete_default_rules = true
   description = "For interconnecting servers with full network access between members, egress to the world and ssh from the world"
   rules = {
     ingress = {
       direction       = "ingress"
       remote_group_id = "self"
     }
     ssh = {
       direction   = "ingress"
       ip_protocol = "tcp"
       to_port     = "22"
       from_port   = "22"
       ethertype   = "IPv4"
       cidr        = "0.0.0.0/0"
     }
  }
}

module ingress {
   source = "github.com/safespring-community/terraform-modules/v2-compute-security-group"
   name = "ingress"
   delete_default_rules = true
   description = "For ingress http/https traffic to the Rudder server"
   rules = {
     http = {
       direction   = "ingress"
       ip_protocol = "tcp"
       to_port     = "80"
       from_port   = "80"
       ethertype   = "IPv4"
       cidr        = "0.0.0.0/0"
     }
     https = {
       direction   = "ingress"
       ip_protocol = "tcp"
       to_port     = "443"
       from_port   = "443"
       ethertype   = "IPv4"
       cidr        = "0.0.0.0/0"
     }
  }
}

module my_gw {
   source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
   name            = "rudder-server.example.com"
   image           = "ubuntu-20.04"
   network         = "public"
   security_groups = [ "default", module.interconnect.name, module.ingress.name ]
   role            = "rudder_server"
   key_pair_name   = openstack_compute_keypair_v2.skp.name
}

module my_clients {
   source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
   count           = 2
   name            = "rudder-client-${count.index+1}.example.com"
   image           = "ubuntu-20.04"
   network         = "default"
   security_groups = [ "default", module.interconnect.name ]
   role            = "rudder_client"
   key_pair_name   = openstack_compute_keypair_v2.skp.name
}

```
Her oppretter vi en instans som blir konfigurert som en Rudder-server ved å bruke v2-compute-instance-modulen med `role=rudder_server`. Deretter oppretter vi 2 Rudder-klienter/-agenter ved å bruke v2-compute-instance med `count=2` og `role=rudder_client`, og knytter dem til standardnettverket. Standardnettverket er et privat (RFC1918) nettverk der instanser kan nå Internett via NAT gjennom compute-verten, for ting som pakkeinstallasjoner osv. Instanser på dette nettverket kan imidlertid ikke nås direkte _fra_ Internett, selvsagt.

Vi oppretter to sikkerhetsgrupper: én «interconnect»-sikkerhetsgruppe der alle medlemmene har full konnektivitet seg imellom, og én ingress-sikkerhetsgruppe som tillater innkommende (ingress) tilkoblinger på portene `80/tcp` (HTTP), `443/tcp` (HTTPS) og `22/tcp` (ssh) fra hele verden. Alle instanser er medlemmer av interconnect-sikkerhetsgruppen slik at agenter kan snakke fritt med serveren, og serveren er også medlem av ingress-sikkerhetsgruppen slik at den kan være tilgjengelig som en administrasjonsvert både via Rudder-webgrensesnittet og API-et, men også som en bastion-vert for å logge inn med ssh og hoppe videre til klientene som er klargjort på et RFC1918-nettverk som ikke er direkte tilgjengelig fra Internett. Til slutt inkluderer vi den forhåndsdefinerte `default`-sikkerhetsgruppen for å tillate utgående (egress) trafikk fra alle instanser.

{{% note "Safespring-nettverket" %}}
Ingen av instansene har mer enn ett grensesnitt. Dette er med hensikt. Hvis du ikke vet hvorfor, les innlegget om [Safespring-nettverksmodellen][netblog]
{{% /note %}}

#### Konfigurasjon av Rudder Ansible-samlingen (requirements.yml)```yaml
collections:
  - name: https://github.com/Normation/rudder-ansible.git
    type: git
    version: master
```
For å kunne bruke rudder-ansible-samlingen må vi installere den lokalt.
Dette gjøres ved å opprette `requirements.yml` som vist ovenfor og kjøre:```shell
$ ansible-galaxy install -r requirements.yml
```
#### Ansible-playbook (configure.yml)```yaml
---
- name: Install Rudder Server
  hosts: os_metadata_role=rudder_server
  become: yes
  collections:
    - rudder.rudder
  tasks:
    - import_role:
        name: rudder.rudder.rudder_server
      vars:
        server_version: 7.0

- name: Install Rudder agents
  hosts: os_metadata_role=rudder_client
  become: yes
  collections:
    - rudder.rudder
  tasks:
    - import_role:
        name: rudder.rudder.rudder_agent
      vars:
        agent_version: 7.0
        policy_server: "{{hostvars['rudder-server.example.com']['ansible_default_ipv4']['address']}}"
```
Her gjenbruker vi vår tidligere definerte `role` fra Terraform-koden som vertgrupper direkte i Ansible-playbooken, `os_metadata_role=rudder_server` og `os_metadata_role=rudder_client` henholdsvis. Merk at vi angir parameteren `policy_server` i `rudder_agent`-rollen som IP-adressen til serveren fra Ansible-inventaret for den instansen (som til slutt leveres av ATI sitt dynamiske inventory-skript).

{{% note "Nåbarhet for klientnodene" %}}
For å nå klientnodene med ssh (de er på et RFC1918-nett), må playbooken kjøres fra en instans som befinner seg på samme Safespring-site som klientnodene. Hvis dette virker rart, les blogginnlegget om [Safespring-nettverksmodellen][netblog].
{{% /note %}}

## Bruke Rudder til å administrere ønsket tilstand

Dette er et stort tema, og vi går bare gjennom det grunnleggende for å komme i gang og illustrere styrken i et verktøy som Rudder.

Når Ansible-playbooken kjøres og rollene i den anvendes, ender vi opp med en Rudder-server på `rudder-server`-instansen og Rudder-agenter på `rudder-client`-instansene. Rudder-agentene er konfigurert til å bruke IP-adressen til Rudder-serveren som sin policy-server via variabelen `policy_server:` i rudder_agent-rollen i Ansible. Rudder-serveren startes med et selvsignert sertifikat for web-GUI og API. Disse må naturligvis erstattes med gyldige sertifikater før man tar Rudder-serveren i produksjon. Her fokuserer vi bare på et minimalt proof of concept uten produksjonsdata, så vi velger å bruke det selvsignerte sertifikatet og ignorere advarsler for det når vi samhandler med Rudder-serveren.

Rudder-serveren trenger en administratorbruker for å sette seg opp til bruk. Dette gjøres ved å logge inn på Rudder-serverinstansen og kjøre følgende kommando:```console
root@rudder-server:~# rudder server create-user -u  admin
New password:
Re-type new password:
User 'admin' added, restarting the Rudder server
root@rudder-server:~#
```
Etter dette kan du logge inn på web-GUI-et til Rudder-serveren på
`https://<ip-address-of-rudder-server-instance>` med brukernavnet og
passordet du nettopp opprettet med CLI-en. Herfra kan du velge enten å jobbe i
web-GUI-et (som er ganske bra og brukervennlig) eller du kan jobbe via
API-et eller verktøyet `rudder-cli`, som i sin tur bruker API-et. Uansett trenger du et
token for å få tilgang til API-et, og det kan genereres i GUI-et under
"Administration/API accounts".

De to `rudder-client`-instansene kan nå observeres i "Node
Management/Pending Nodes" i GUI-et. Det betyr at de to nye klientene/agentene
må godtas av policy-serveren for at serveren skal kunne administrere dem. Du
kan gjøre dette i web-GUI-et ved å markere den og trykke på "accept"-knappen.
Når noder blir akseptert, flyttes de fra listen "Pending Nodes" til listen
"Nodes".

Hvis du klikker på en node i listen "Pending Nodes", får du litt mer detalj.
"Node ID" er en unik ID for hver node/agent. Du kan verifisere "Node ID" til
den ventende noden ved å sammenligne den med utdataene fra følgende kommando på
selve noden/agenten/klienten.```console
root@rudder-client-1:~# rudder agent info |grep UUID
               UUID: c9e80279-00d3-4ee3-a7e1-8491955ebd3c
root@rudder-client-1:~#
```
Eller du kan gjøre det med verktøyet "rudder-cli" via API-et som vist nedenfor.

Se listen over ventende noder med `rudder-cli` og `jq`. (Det er bare én node som fortsatt er i ventende tilstand, fordi den andre allerede er akseptert.)```console
root@rudder-server:~# rudder-cli node list_pending -t erpaNdoBe4A96VpIlWrCpUEs93LTvVBf  --skip-verify |jq '.nodes[].id' -r
bdfbd21c-d46d-403b-9836-06e2d282b704
root@rudder-server:~#
```
Se ID-en til den ventende agenten på selve agenten```console
root@rudder-client-2:~# rudder agent info |grep UUID
               UUID: bdfbd21c-d46d-403b-9836-06e2d282b704
root@rudder-client-2:~#
```
Godta deretter noden```console
root@rudder-server:~# rudder-cli node accept bdfbd21c-d46d-403b-9836-06e2d282b704  -t erpaNdoBe4A96VpIlWrCpUEs93LTvVBf  --skip-verify |jq '.nodes[].id' -r
bdfbd21c-d46d-403b-9836-06e2d282b704
root@rudder-server:~#
```
Og observer deretter at noden har blitt flyttet fra "pending"-listen til "node"-listen:```console
root@rudder-server:~# rudder-cli node list -t erpaNdoBe4A96VpIlWrCpUEs93LTvVBf  --skip-verify |jq '.nodes[].id' -r
root
c9e80279-00d3-4ee3-a7e1-8491955ebd3c
bdfbd21c-d46d-403b-9836-06e2d282b704
root@rudder-server:~#
```
Fra nå av er de to klientene under kontinuerlig administrasjon fra Rudder-serveren og verifiseres som standard hvert 5. minutt. Det gjøres ingen konfigurasjonsendringer på agentinstansene før du oppretter regler for nodegrupper.

Bruken av Rudder for å holde instansene dine kontinuerlig i samsvar med policyen din (ønsket tilstand) er et stort tema i seg selv, og det ligger utenfor rammen for dette blogginnlegget. Gå til Normations [Rudder-side][rudder] for å lære mer.

[rudder-ansible]: https://github.com/Normation/rudder-ansible
[cfcore]: https://github.com/cfengine/core
[rudder]: https://www.rudder.io/
[ati]: https://github.com/safespring-community/utilities/blob/main/ati/terraform.py
[ansible]: https://github.com/ansible/ansible
[tftry]: https://www.terraform.io/language/functions/try
[coc]: https://www.paloaltonetworks.com/cyberpedia/how-to-break-the-cyber-attack-lifecycle
[diskmap]: https://github.com/safespring-community/terraform-modules/blob/main/examples/v2-compute-instance/main.tf#L17
[newflavors]: https://docs.safespring.com/new/flavors/
[firstblog]: /blogg/2022-01-terraform-modules/
[mbcfengine]: https://www.researchgate.net/publication/243774232_Cfengine_A_site_configuration_engine
[tfdl]: https://www.terraform.io/downloads
[sftfmodules]: https://github.com/safespring-community/terraform-modules
[sftfexamples]: https://github.com/safespring-community/terraform-modules/tree/main/examples
[sshblog]: /blogg/2022-03-ssh-keys/
[netblog]: /blogg/2022-03-network/
[tfdocs]: https://www.terraform.io/docs
[tfreleases]: https://releases.hashicorp.com/terraform/

{{< accordion-script >}}