---
ai: true
title: "Fra nul til kontinuerlig efterlevelse med Terraform, Ansible og Rudder"
date: "2022-06-29"
intro: "Dette indlæg viser, hvordan du kan gå fra nul ressourcer til en fuldt automatiseret infrastruktur, der løbende overholder kravene – udelukkende ved hjælp af kode."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknisk opdatering"
author: "Jarle Bjørgeengen"
language: "da"
toc: "Indholdsfortegnelse"
aliases:
  - /blogg/2022-06-terraform-ansible-rudder
  - /blogg/2022/2022-06-terraform-ansible-rudder/
---
{{< ingress >}}
Dette blogindlæg ser på, hvordan vi kan bygge endnu mere videre på
tidligere demonstrerede koncepter for at skabe sæt af servere, der
kontinuerligt overvåges og holdes i compliance ved hjælp af Rudder, et topmoderne
værktøj til konfigurationsstyring.
{{< /ingress >}}

{{% disclaimer "update" %}}
Opdateret for at rette en inkonsistens den 2022-08-22
{{% /disclaimer %}}

{{% note "Read more" %}}
Hvis du fandt dette indlæg nyttigt, så husk at tjekke resten af serien om brug af Terraform og Ansible til ressourceklargøring og compliance. Særligt kunne du også have glæde af:

1. [Knaldnem klargøring med Safesprings Terraform‑moduler](/blogg/2022-01-terraform-modules)
2. [Fleksibel klargøring af ressourcer med Safesprings nye Terraform‑moduler](/blogg/2022-03-terraform-module)
3. [Integration af Terraform og Ansible til effektiv ressourcehåndtering](/blogg/2022-05-terraform-ansible)
4. [Fra nul til kontinuerlig compliance med Terraform, Ansible og Rudder](/blogg/2022-06-terraform-ansible-rudder)

{{% /note %}}

## Forudsætninger

Dette blogindlæg forudsætter, at du bruger den åbne Terraform CLI. Terraform CLI
er blot et binært program, som du downloader fra [udgivelsessiden][tfreleases]
til din arkitektur/platform. Her finder du også checksums for filerne til at
verificere deres integritet.

Medmindre andet forklares, forudsætter alle eksempler, at du lægger koden
i en `.tf` i en separat mappe og kører `plan`, `init`, `apply` og `destroy`
fra den pågældende mappe. `main.tf` bruges mest som en konvention for filnavnet,
men du kan kalde den hvad du vil, så længe den ender på `.tf`.

Der findes også den officielle [Terraform-dokumentation][tfdocs].

En grundlæggende forståelse af Ansible-playbooks og inventories er også nødvendig.

## Introduktion til Terraform

Terraform tager almindelige tekstfiler med «HCL - HashiCorp Configuration Language»
som input og leverer servere og storage som output. HCL er et deklarativt
sprog, dvs. det angiver ikke handlinger, der skal udføres, men derimod en ønsket
tilstand – eller et ønsket resultat.

Ideen om, at konfigurationssprog skal være deklarative, og at
agenten skal drive/konvergere den faktiske tilstand til den erklærede ønskede tilstand, er
blevet bredt accepteret over de sidste tre årtier og bygger på idéer og
forskning af [Mark Burgess i begyndelsen af 90’erne og senere][mbcfengine].

### Terraform-providers

Terraform’s superkraft kommer fra alle dets providers. Terraform‑providers
er binære udvidelser til Terraform, som, som navnet antyder,
«leverer» ressourcer af forskellige slags ved at bruge API’erne fra den cloud‑udbyder,
som udvidelsens navn afspejler.

Disse udvidelser tager sig af det tunge arbejde over for cloud‑udbydernes API’er og
sørger for, at den faktiske tilstand (cloud‑ressourcerne) konvergeres til det, der er
angivet som den ønskede tilstand.

Terraform kan ses som en desired state‑konfigurationsagent for
infrastruktur. Hver gang det køres, vil det omsætte den ønskede tilstand til den
faktiske tilstand for cloud‑ressourcer.

### Reducere graden af «lock-in»

Terraform har masser af gennemprøvede providers, der er klar til brug, hvilket letter
byrden ved at klargøre cloud‑ressourcer fra alle mulige cloud‑API’er inden for de
samme (eller forskellige) konfigurationer.

Lad os sige, at du har brug for ressourcer i andre clouds (eller on‑prem) til de samme
multi‑cloud‑ eller hybride miljøer. Så kan du gøre det med én Terraform‑
konfiguration, og du kan endda skalere op og ned i antallet af ressourcer ved at ændre
nogle variabler i din Terraform‑kode.

Terraform er cloud‑agnostisk og er dermed en fremragende forsikring for, at dine ressourcer
er så portable som muligt, hvilket reducerer graden af "lock‑in" til et minimum.

{{< disclaimer "Disclaimer" >}}Terraform er et kraftfuldt værktøj, og kraftfulde værktøjer kan føre til
kraftfulde fejl, hvis de misbruges, så sørg for at læse dokumentation
og best practices for at forstå værktøjets natur, før du bruger det til
det vigtige.{{< /disclaimer >}}

## Introduktion til Ansible

[Ansible][ansible] er en værktøjssuite til orkestrering og konfigurationsstyring,
primært ved hjælp af såkaldte playbooks. Playbooks er skrevet i YAML og beskriver den
ønskede tilstand for operativsystem‑egenskaber som filer, services, filsystemer
osv. Det bruges hovedsageligt til at konfigurere Linux‑baserede operativsystemer over
ssh‑protokollen, men det kan også bruges til at konfigurere Windows‑operativ‑
systemer. I dette indlæg viser vi, hvordan man bruger Ansible til at konfigurere services på
et Linux‑baseret operativsystem (Ubuntu 20.04).

### Ansible‑inventories

Ansible‑inventories er lister over værter, grupper af værter og variabler for disse
værter og grupper. Værter og grupper bruges til at fortælle Ansible, hvor en bestemt
ønsket tilstand (opgave) er relevant. Når man arbejder med statiske værter i et
datacenter, er inventories ofte også statiske tekstfiler, der vedligeholdes
manuelt eller semimanuelt. Inventories kan dog også være dynamiske, dvs.
leveret af scripts.

Når man arbejder med OpenStack, er det muligt at bruge inventory‑scripts, som
forespørger OpenStack‑API’et direkte og producerer et komplet inventory over alle
instances med metadata, alle gruppemedlemskaber osv., men ofte
tager disse scripts lang tid at køre, og de skal som regel køre hver gang du kører
en playbook, hvilket gør playbook‑kørsler størrelsesordener mere tidskrævende
end statiske inventories. Derudover kan de lægge en tung belastning på
OpenStack‑API’erne, hvis inventory’et forespørges ofte.

## Terraform og Ansible

Det må så være "Terrible" ;-) ? Faktisk er det slet ikke slemt.

Terraform fører selv regnskab over alle objekter, det klargør, sammen med
deres metadata. Dette kaldes "state", og det gemmes i den lokale mappe,
hvor Terraform som standard køres, i en fil med navnet `terraform.tfstate`. Den
forrige state‑version sikkerhedskopieres i filen `terraform.tfstate.backup`.

Det betyder, at det meste af det, du kan spørge API’et om vedrørende dine af Terraform
leverede objekter i OpenStack, også vil være til stede i den lokale Terraform‑
state‑fil. Hvis vi derfor bruger et script, der læser den lokale Terraform‑state‑
fil, får vi høj hastighed og ingen ressourceforbrug i OpenStack‑API’et. Det er
præcis, hvad vi vil demonstrere her. Der findes flere scripts/programmer til dette
formål (https://duckduckgo.com er din ven), men vi bruger et simpelt [Python‑script][ati],
oprindeligt udviklet af Cisco Systems.

### Kom i gang

For at bruge det, kopier eller opret et symlink til scriptet et passende sted og
brug stien som `--inventory`‑option til `ansible-*`‑kommandoer. Hvis du
lægger scriptet i en mappe og bruger mappenavnet som `--inventory`, kan du
også kombinere information fra det dynamiske inventory, som scriptet leverer,
med statiske inventory‑filer, der yderligere beriger eller transformerer det dynamiske
inventory. Hvis du for eksempel bruger en Ansible‑rolle eller ‑playbook, der kræver et
bestemt værtsgruppenavn, kan du bruge et statisk inventory til at definere en ny
værtsgruppe, som du selv navngiver, og angive en værtsgruppe fra det dynamiske
inventory som `children` til den gruppe, du oprettede, og derefter bruge den gruppe med
din rolle eller playbook. Det kigger vi på i et senere eksempel.

## Introduktion til Rudder

[Rudder][rudder] er et open source‑værktøj til konfigurations‑ og sikkerhedsstyring.
Det leveres med en multi‑tenant‑kontrolplan til at administrere og overvåge grupper
af noder/agenter centralt. Fordi Rudder er bygget på den meget
effektive [Cfengine‑kerne][cfcore], bruger det meget få ressourcer, er
lynhurtigt og skalerer fra en håndfuld noder til mange tusinde.

{{% accordion title="A short history lesson" %}}
Konfigurationsdrift var et problem i datacentre længe før "The
Cloud" kom til. Værktøjer som Cfengine, Chef og Puppet adresserede dette problem i
vid udstrækning ved mere eller mindre kontinuerligt at sammenligne den ønskede tilstand med den faktiske
tilstand og derefter konvergere systemet til den ønskede tilstand ved at rette op på
forskellene. Du kan tænke på konfigurationsdrift som mutationer og
konfigurationsstyringsværktøjer som immunsystemet, der retter mutationerne og dermed
skaber stabilitet og robusthed mod forstyrrelser og sikkerhedsproblemer.
Altså analogien om, at servere er som kæledyr, der skal passes gennem
deres levetid, som kan være mange år.

I cloud‑æraen er der et nyt paradigme, der i høj grad beskrives af idéen om
immutable infrastruktur, og at servere er som kvæg: kortlivede, og hvis
der er problemer, genopbygger vi bare serveren fra et image og kører
templating (én gang) for at skabe den ønskede tilstand.

Efter at have arbejdet nogle år med cloud‑teknologier og observeret, hvordan
mange mennesker og virksomheder bruger dem, ser vi dog en del huller mellem realiteten
og den noget illusoriske idé om kortlivede kvæg‑servere (instances):

Fordi mange virksomheder er så fokuserede på hurtigt at levere nye features, er
realiteten, at infrastrukturer slet ikke er kortlivede, især når man tager
den reducerede tid i betragtning fra udrulning af et opdateret system, til der
opdages en ny sikkerhedsfejl. Dette gælder især for virtuelle maskiner,
men selv for containere ser vi, at mange af dem lever længe og dermed
oplever de samme problemer som kæledyrsserverne fra gamle dage. I betragtning af
den ringe softwarekvalitet – og dermed hurtig opdagelse af sårbarheder – er det
grundlæggende den samme situation som før. Måske er det endda værre, fordi
containere og deres orkestrering introducerer ekstra kompleksitet og dermed større
angrebsflader.

Den gode nyhed er dog, at værktøjerne til at rette konfigurationsdrift stadig
findes og kan og bør bruges inde i cloud‑instances for at lukke hullet
beskrevet ovenfor. Dette blogindlæg illustrerer, hvor nemt det kan være at gå fra en
"fire and forget"‑verden til en "continuous compliance"‑verden.  
{{% /accordion %}}

Du kan vælge at købe en Rudder‑abonnementsstøtteplan fra Normation,
virksomheden bag Rudder, for at få forudsigelighed i produktudvikling og vedligeholdelse samt forskellige support‑SLA’er. Normation tilbyder også
træning og konsulentbistand vedrørende Rudder. Eller du kan vælge at installere og
supportere det selv ved hjælp af de venlige sjæle hos Normation m.fl., som
leverer brugsklare softwarepakker, Ansible collection osv. til de mest
almindelige platforme.

Den røde tråd gennem denne blogserie er, hvordan man limer eksisterende
teknologier sammen for at nå et højere mål; tidligere ved at bruge Ansible Terraform
Inventory (ATI)‑scriptet til at bygge bro mellem Terraform og Ansible. Denne gang går vi
et skridt videre og bruger Ansible med ATI sammen med en [Ansible‑samling][rudder-ansible],
vedligeholdt af Normation, til at installere Rudder‑server og ‑agenter og bootstrappe disse agenter til den nævnte server.

## Installation og bootstrap af Rudder med Ansible

Vi bruger [eksemplerne][sftfexamples] i Terraform‑modulets [git‑repo][sftfmodules] som reference og forklarer hver af dem under koden.

### Installation af en Rudder‑server og bootstrap af agenter til den server

Eksempel i https://github.com/safespring-community/terraform-modules/tree/main/examples/v2-rudder-minimal-poc

#### Terraform‑kode
```terraform

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
Her opretter vi en instans, der konfigureres som en Rudder-server ved hjælp af modulet v2-compute-instance med `role=rudder_server`. Derefter opretter vi 2 Rudder-klienter/agenter med v2-compute-instance med `count=2` og `role=rudder_client` og tilknytter dem til standardnetværket. Standardnetværket er et privat (RFC1918) netværk, hvor instanser kan nå internettet gennem NAT via compute-værten til ting som pakkeinstallationer osv. Instanser på dette netværk kan dog naturligvis ikke nås direkte fra internettet.

Vi opretter to sikkerhedsgrupper: en «interconnect»-sikkerhedsgruppe, hvor alle medlemmer har fuld forbindelse til hinanden, og en ingress-sikkerhedsgruppe, der tillader indgående (ingress) forbindelser på portene `80/tcp` (HTTP), `443/tcp` (HTTPS) og `22/tcp` (SSH) fra hele verden. Alle instanser er medlem af interconnect-sikkerhedsgruppen, så agenterne frit kan tale med serveren, og serveren er også medlem af ingress-sikkerhedsgruppen, så den kan tilgås som administrationsvært både via Rudder-webgrænsefladen og API'et, men også som en bastion-vært til at logge ind med SSH og hoppe videre til klienterne, som er klargjort på et RFC1918-netværk, der ikke er direkte tilgængeligt fra internettet. Til sidst inkluderer vi den allerede eksisterende `default`-sikkerhedsgruppe for at tillade udgående (egress) trafik fra alle instanser.

{{% note "Safespring-netværk" %}}
Ingen af instanserne har mere end ét interface. Det er med vilje. Hvis du ikke ved hvorfor, så læs indlægget om [Safespring-netværksmodellen][netblog]
{{% /note %}}

#### Konfiguration af Rudder Ansible-kollektionen (requirements.yml)
```yaml
collections:
  - name: https://github.com/Normation/rudder-ansible.git
    type: git
    version: master
```
For at kunne bruge rudder-ansible-samlingen skal vi installere den lokalt.
Dette gøres ved at oprette `requirements.yml` som vist ovenfor og køre:
```shell
$ ansible-galaxy install -r requirements.yml
```
#### Ansible-playbook (configure.yml)
```yaml
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
Her genbruger vi vores tidligere definerede `role` fra Terraform-koden som værtsgrupper direkte i Ansible-playbooken, `os_metadata_role=rudder_server` og `os_metadata_role=rudder_client` henholdsvis. Bemærk, at vi angiver parameteren `policy_server` for rollen `rudder_agent` som IP-adressen på serveren fra Ansible-inventaret for den pågældende instans (som i sidste ende leveres af ATI's dynamiske inventory-script).

{{% note "Forbindelse til klientnoderne" %}}
For at kunne nå klientnoderne med ssh (de er på et RFC1918-netværk), skal playbooket køres fra en instans, der befinder sig i samme Safespring-site som klientnoderne. Hvis det lyder mærkeligt, så læs blogindlægget om [Safesprings netværksmodel][netblog].
{{% /note %}}

## Brug af Rudder til at administrere den ønskede tilstand

Dette er et stort emne, og vi gennemgår kun det grundlæggende for at komme i gang og illustrere styrken i et værktøj som Rudder.

Når Ansible-playbooket køres, og rollerne deri anvendes, ender vi med en Rudder-server på instansen `rudder-server` og Rudder-agenter på instanserne `rudder-client`. Rudder-agenterne er konfigureret til at bruge IP-adressen på Rudder-serveren som deres policy-server via variablen `policy_server:` i rudder_agent-rollen i Ansible. Rudder-serveren startes med et selvsigneret certifikat til web-GUI'et og API'et. Disse skal naturligvis erstattes med gyldige certifikater, før Rudder-serveren tages i produktion. Her fokuserer vi blot på et minimalt proof of concept uden produktionsdata, så vi vælger at bruge det selvsignerede certifikat og ignorere advarsler om det, når vi interagerer med Rudder-serveren.

Rudder-serveren kræver en administratorbruger for at blive sat op til brug. Det gøres ved at logge ind på Rudder-serverinstansen og køre følgende kommando:
```console
root@rudder-server:~# rudder server create-user -u  admin
New password:
Re-type new password:
User 'admin' added, restarting the Rudder server
root@rudder-server:~#
```
Herefter kan du logge ind på Rudder-serverens web-GUI på
`https://<ip-address-of-rudder-server-instance>` med det brugernavn og den
adgangskode, der netop blev oprettet med CLI. Herfra kan du vælge enten at
arbejde i web-GUI'et (som er ret godt og brugervenligt), eller du kan arbejde
via API'et eller værktøjet `rudder-cli`, som igen benytter API'et. Under alle
omstændigheder skal du bruge et token for at få adgang til API'et, og det kan
genereres i GUI'et under "Administration/API-konti".

De to `rudder-client`-instanser kan nu ses under "Nodehåndtering/Ventende
noder" i GUI'et. Det betyder, at de to nye klienter/agenter skal godkendes af
policy-serveren, før serveren kan administrere dem. Det kan du gøre i
web-GUI'et ved at markere den og trykke på knappen "Accepter". Når noder
accepteres, flyttes de fra listen "Ventende noder" til listen "Noder".

Hvis du klikker på en node på listen "Ventende noder", får du flere
oplysninger. "Node-id" er et unikt id for hver node/agent. Du kan verificere
"Node-id'et" for den ventende node ved at sammenligne det med outputtet fra
følgende kommando på selve noden/agenten/klienten.
```console
root@rudder-client-1:~# rudder agent info |grep UUID
               UUID: c9e80279-00d3-4ee3-a7e1-8491955ebd3c
root@rudder-client-1:~#
```
Alternativt kan du gøre det med værktøjet "rudder-cli" via API'et, som vist nedenfor.

Se listen over afventende noder med `rudder-cli` og `jq`. (Der er kun én node tilbage i den afventende tilstand, fordi den anden allerede er accepteret.)
```console
root@rudder-server:~# rudder-cli node list_pending -t erpaNdoBe4A96VpIlWrCpUEs93LTvVBf  --skip-verify |jq '.nodes[].id' -r
bdfbd21c-d46d-403b-9836-06e2d282b704
root@rudder-server:~#
```
Se ID'et for den afventende agent på selve agenten
```console
root@rudder-client-2:~# rudder agent info |grep UUID
               UUID: bdfbd21c-d46d-403b-9836-06e2d282b704
root@rudder-client-2:~#
```
Accepter derefter noden
```console
root@rudder-server:~# rudder-cli node accept bdfbd21c-d46d-403b-9836-06e2d282b704  -t erpaNdoBe4A96VpIlWrCpUEs93LTvVBf  --skip-verify |jq '.nodes[].id' -r
bdfbd21c-d46d-403b-9836-06e2d282b704
root@rudder-server:~#
```
Og bemærk derefter, at noden er flyttet fra "pending"-listen til "node"-listen:
```console
root@rudder-server:~# rudder-cli node list -t erpaNdoBe4A96VpIlWrCpUEs93LTvVBf  --skip-verify |jq '.nodes[].id' -r
root
c9e80279-00d3-4ee3-a7e1-8491955ebd3c
bdfbd21c-d46d-403b-9836-06e2d282b704
root@rudder-server:~#
```
Fra nu af er de to klienter under løbende styring fra Rudder-serveren og kontrolleres som standard hvert femte minut. Der foretages ingen konfiguration på agentinstanserne, før du opretter regler for nodegrupper.

Brugen af Rudder til løbende at holde dine instanser i overensstemmelse med din politik (den ønskede tilstand) er et stort emne i sig selv og ligger uden for dette blogindlægs rammer. Gå til Normations [Rudder-side][rudder] for at lære mere.

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