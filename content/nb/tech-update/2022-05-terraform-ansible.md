---
ai: true
title: "Integrering av Terraform og Ansible"
date: "2022-05-23"
intro: "Fra null til tjeneste med Terraform og Ansible"
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
  - /blogg/2022-05-terraform-ansible
  - /blogg/2022/2022-05-terraform-ansible/
---
{{< ingress >}}
Dette er del tre i serien om Safesprings Terraform-moduler. Dette blogginnlegget ser på hvordan vi kan integrere Ansible og Terraform for å konfigurere tjenester oppå instansene som er klargjort med Terraform, ved å bruke Terraform-state som Ansible-inventory.
{{< /ingress >}}

{{% note "Les mer" %}}
Hvis du synes dette innlegget var nyttig, bør du også sjekke resten av serien om bruk av Terraform og Ansible for ressursklargjøring og etterlevelse. Særlig kan du ha glede av:

1. [Superenkel klargjøring med Safesprings Terraform-moduler](/blogg/2022-01-terraform-modules)
2. [Fleksibel ressursklargjøring med Safesprings nye Terraform-moduler](/blogg/2022-03-terraform-module)
3. [Integrering av Terraform og ansible for effektiv ressursforvaltning](/blogg/2022-05-terraform-ansible)
4. [Fra null til kontinuerlig etterlevelse med Terraform, ansible og Rudder](/blogg/2022-06-terraform-ansible-rudder)

{{% /note %}}

## Forutsetninger

Dette blogginnlegget forutsetter at du bruker den åpne kildetekstversjonen Terraform CLI. Terraform CLI
er bare et binærprogram som du laster ned fra [releases-siden][tfreleases]
for din arkitektur/plattform. Her finner du også sjekksummer for filene for å
verifisere integriteten deres.

Med mindre annet er forklart, forutsetter alle eksemplene at du legger koden
i en `.tf` i en egen katalog og kjører `plan`, `init`, `apply` og `destroy`
fra den katalogen. `main.tf` brukes hovedsakelig som en konvensjon for filnavn,
men du kan kalle den hva du vil så lenge den slutter på `.tf`.

Det finnes også den offisielle [Terraform-dokumentasjonen][tfdocs].

Grunnleggende forståelse av Ansible-playbooks og inventory er også nødvendig.

## Introduksjon til Terraform

Terraform tar rene tekstfiler med «HCL - Hashicorp Configuration Language»
som input og leverer servere og lagring som output. HCL er et deklarativt
språk, dvs. det spesifiserer ikke handlinger som skal utføres, men en ønsket
tilstand – eller et resultat.

Ideen om at konfigurasjonsspråk bør være deklarative, og at
agenten skal drive/konvergere virkelig tilstand til den deklarerte ønskede tilstanden, har
blitt allment akseptert de siste tre tiårene og bygger på ideer og
forskning av [Mark Burgess på begynnelsen av nittitallet og senere][mbcfengine].

### Terraform-providere

Superkraften til Terraform kommer fra alle providerne. Terraform-
providere er binære utvidelser av Terraform som, som navnet antyder,
«leverer» ressurser av ulike slag ved å bruke API-ene til skyleverandøren
reflektert av utvidelsens navn.

Disse utvidelsene gjør alt det tunge arbeidet mot skyleverandørens API-er og
sikrer at den faktiske tilstanden (skyeressursene) konvergeres til det som er
spesifisert som ønsket tilstand.

Terraform kan ses som en ønsket-tilstand-konfigurasjonsagent for
infrastruktur. Hver gang den kjøres, vil den gjøre ønsket tilstand om til
faktisk tilstand for skyeressurser.

### Redusere graden av «lock-in»

Terraform har haugevis av gjennomtestede providere klare til bruk, noe som
letter byrden ved å klargjøre skyeressurser fra alle slags cloud-API-er innenfor
de samme (eller ulike) konfigurasjonene.

La oss si at du trenger ressurser i andre skyer (eller on-premise) for samme
multi-cloud- eller hybride miljøer. Da kan du gjøre det med én Terraform-
konfig, og du kan til og med skalere opp og ned antallet ressurser ved å endre
noen variabler i Terraform-koden din.

Terraform er cloud-agnostisk og er dermed en utmerket forsikring om at ressursene
dine er så portable som mulig, og reduserer graden av «lock-in» til et minimum.

{{< disclaimer "Disclaimer" >}}Terraform er et kraftig verktøy, og kraftige verktøy kan gi
kraftige feil hvis de misbrukes, så sørg for å lese dokumentasjon
og beste praksis for å forstå verktøyets natur før du bruker det til
de viktige tingene.{{< /disclaimer >}}

## Introduksjon til Ansible

[Ansible][ansible] er en verktøysuite for orkestrering og konfigurasjonsstyring
hovedsakelig ved bruk av såkalte playbooks. Playbooks skrives i YAML og beskriver den
ønskede tilstanden for operativsystemegenskaper som filer, tjenester, filsystemer
og så videre. Det brukes hovedsakelig til å konfigurere Linux-baserte operativsystemer over
ssh-protokollen, men kan også brukes til å konfigurere Windows-operativ-
systemer. I dette innlegget viser vi hvordan vi bruker Ansible til å konfigurere tjenester på
et Linux-basert operativsystem (Ubuntu 20.04)

Ansible-inventory er lister over verter, vertgrupper og variabler for disse
vertene og gruppene. Verter og grupper brukes til å fortelle Ansible hvor en bestemt
ønsket tilstand (oppgave) er relevant. Når man jobber med statiske verter i et
datasenter, er inventory ofte også statiske tekstfiler som vedlikeholdes
manuelt eller semi-manuelt. Inventory kan imidlertid også være dynamisk, dvs.
levert av skript.

Når man jobber med OpenStack, er det mulig å bruke inventory-skript som
spørrer OpenStack-API-et direkte og produserer et komplett inventory over alle
instanser med metadata, alle gruppemedlemskap og så videre, men ofte
tar disse skriptene lang tid å kjøre, og de må som regel kjøres hver
gang du kjører en playbook, noe som gjør playbook-kjøringer størrelsesordener mer
tidskrevende enn statiske inventory. I tillegg kan de belaste
OpenStack-API-ene hvis inventory blir forespurt ofte.

## Terraform og Ansible

Da må det være «Terrible», da ;-)? Faktisk er det slett ikke forferdelig.

Terraform fører selv regnskap over alle objekter det klargjør sammen med
tilhørende metadata. Dette kalles «state», og det lagres som standard i den lokale katalogen
der Terraform kjøres, i en fil som heter `terraform.tfstate`. Den
forrige state-versjonen sikkerhetskopieres i filen `terraform.tfstate.backup`.

Dette betyr at det meste du kan spørre API-et om, vedrørende Terraform-
leverte objekter i OpenStack, også vil finnes i den lokale Terraform-
statefilen. Hvis vi derfor bruker et skript som spør den lokale Terraform-
statefilen, vil vi få høy ytelse uten ressursbruk i
OpenStack-API-et. Det er nettopp det vi viser her. Det finnes flere
skript/programmer tilgjengelig for dette formålet (https://duckduckgo.com er din venn),
men vi bruker et enkelt [python-skript][ati] opprinnelig utviklet av Cisco
Systems.

For å bruke det, kopier eller lag en symbolsk lenke til skriptet et passende sted og
bruk stien som `--inventory`-alternativ til `ansible-*`-kommandoer. Hvis du
legger skriptet i en katalog og bruker katalognavnet som `--inventory`, kan du
også kombinere informasjon fra det dynamiske inventory levert av skriptet
med statiske inventory-filer som ytterligere beriker eller transformerer det dynamiske
inventory. Hvis du for eksempel bruker en Ansible-rolle eller -playbook som krever et
bestemt vertsgruppenavn, kan du bruke et statisk inventory til å definere en ny vert-
gruppe som du velger navnet på og spesifisere en vertgruppe fra det dynamiske
inventory som `children` til gruppen du opprettet, og deretter bruke den gruppen med
rollen eller playbooken din. Det ser vi på i et senere eksempel.

## Eksempler

Vi bruker koden [eksempler][sftfexamples] i Terraform-modulets [git-repo][sftfmodules] som referanse og forklarer hver av dem under koden.

### To webservere med Nginx
```
terraform {
  required_version = ">= 0.14.0"
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
    }
  }
}

resource "openstack_compute_keypair_v2" "skp" {
  name       = "hello-pubkey"
  public_key = "${chomp(file("~/.ssh/id_rsa.pub"))}"
}

module ingress {
   source = "github.com/safespring-community/terraform-modules/v2-compute-security-group"
   name = "ingress"
   delete_default_rules = true
   description = "For exposing web servers on port 80 (http) to the world"
   rules = {
     ssh = {
       direction   = "ingress"
       ip_protocol = "tcp"
       to_port     = "22"
       from_port   = "22"
       ethertype   = "IPv4"
       cidr        = "0.0.0.0/0"
     }
     http = {
       direction   = "ingress"
       ip_protocol = "tcp"
       to_port     = "80"
       from_port   = "80"
       ethertype   = "IPv4"
       cidr        = "0.0.0.0/0"
     }
  }
}

locals {
  instances = {
    "web1" = {
      name    = "websrv1.example.com"
      flavor  = "l2.c2r4.100"
      os      = "ubuntu-20.04"
      network = "public"
      role    = "webserver"
      sgs     = [ "default", module.ingress.name ]
    }
    "web2" = {
      name    = "websrv2.example.com"
      flavor  = "l2.c2r4.100"
      os      = "ubuntu-20.04"
      network = "public"
      role    = "webserver"
      sgs     = [ "default", module.ingress.name ]
    }
  }
}

module my_sf_instances {
   for_each        = local.instances
   source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
   name            = each.value.name
   image           = each.value.os
   network         = each.value.network
   security_groups = each.value.sgs
   role            = each.value.role
   key_pair_name   = openstack_compute_keypair_v2.skp.name
}
```
Først oppretter vi to instanser på nettverket `public`, fra flavor `l2.c2r4.100` og imaget `ubuntu-20.04`. Merk at vi spesifiserer `role=webserver`. Når vi kjører `terraform apply` på dette, blir instansene, nøkkelparene og sikkerhetsgruppene opprettet. Det er ennå ikke installert eller konfigurert noen webserver. Det er det vi skal bruke Ansible til.

For å gjenbruke rollen vi spesifiserte i Terraform-koden for instanser, trenger vi et inventory-skript som leser Terraform state-fil(er) og produserer et inventory i et format som Ansible kan bruke. [Ansible Terraform Inventory-skriptet][ati] vil bli brukt til dette formålet. Vi kopierer skriptet til en katalog som heter `ati` og kjører denne playbooken.
```
ansible-playbook -i ati example.yml
```
Innholdet i `example.yml`
```
- hosts: os_metadata_role=webserver
  gather_facts: no
  become: true
  tasks:
    - name: Wait 600 seconds for target connection to become reachable/usable
      wait_for_connection:

    - name: gather facts
      setup:

    - name: Make sure nginx is installed
      apt:
        update_cache: yes
        name: "nginx"
        state: present

    - name: An example index.html file
      copy:
        dest: "/var/www/html/index.html"
        content: "<html><h1>Welcome to {{ansible_hostname}}</h1></html>"
```
Merk `hosts: os_metadata_role=webserver`. Det er her vi bruker rollen vi spesifiserte i Terraform-koden. Inventory-skriptet vil finne de riktige instansene, og IP-adressene deres, som tilhører gruppen som har `webserver`-rollen, og dermed vil playbook-oppgavene bli kjørt for disse vertene.

Først venter vi på at instansene skal starte opp. På den måten kan vi kjøre playbooken rett etter provisjonering (for eksempel i et skript) i stedet for å vente et ukjent antall sekunder før instansene er tilgjengelige og klare til å konfigureres av Ansible over SSH. Vi setter `gather_facts: no` for å forhindre at playbooken feiler før instansene er tilgjengelige, deretter bruker vi `setup:` i sin egen oppgave etter at vi har ventet på at instansene skal bli tilgjengelige.

De to påfølgende oppgavene er å installere Nginx-pakken og å opprette en `index.html` med en velkomstmelding som setter inn vertsnavnet til hver enkelt instans.

### Et sett med Wireguard-klienter som bruker en exit-gateway

I dette eksempelet viser vi hvordan vi kan kombinere statisk og dynamisk inventory for å koble gruppenavnene en Ansible-rolle forventer, med gruppenavnene som leveres av OpenStack-metadatarollen i Terraform-staten.

Den praktiske hensikten med eksemplet er også å vise et automatisert oppsett av Wireguard på et sett med klienter for å rute trafikken deres gjennom en gateway. Dette kan være nyttig hvis klienter må få tilgang til en ekstern tjeneste med en stabil kildeadresse, for eksempel hvis den eksterne tjenesten bruker IP-baserte ACL-er.
```
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
   description = "For interconnecting servers with full network access between members"
   rules = {
     ingress = {
       direction       = "ingress"
       remote_group_id = "self"
     }
     egress = {
       direction       = "egress"
       remote_group_id = "self"
     }
  }
}

module ingress {
   source = "github.com/safespring-community/terraform-modules/v2-compute-security-group"
   name = "ingress"
   delete_default_rules = true
   description = "For for ssh access from the world, and egress from nodes"
   rules = {
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

module my_gw {
   source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
   name            = "wireguard-gw.example.com"
   image           = "ubuntu-20.04"
   network         = "public"
   security_groups = [ "default", module.interconnect.name, module.ingress.name ]
   role            = "wg_gw"
   wg_ip           = "192.168.45.1"
   key_pair_name   = openstack_compute_keypair_v2.skp.name
}

module my_clients {
   source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
   count           = 2
   name            = "wireguard-client-${count.index+1}.example.com"
   image           = "ubuntu-20.04"
   network         = "public"
   security_groups = [ "default", module.interconnect.name, module.ingress.name ]
   role            = "wg_client"
   wg_ip           = cidrhost("192.168.45.0/24",count.index + 2)
   key_pair_name   = openstack_compute_keypair_v2.skp.name
}
```
Her deklarerer vi et nøkkelpar (offentlig nøkkel), to sikkerhetsgrupper, en Wireguard-gatewayinstans og et sett med 2 Wireguard-klientinstanser. Sikkerhetsgruppen `ingress` tillater tilgang fra hele verden over IPv4 til port 22/tcp (ssh), sikkerhetsgruppen `interconnect` sikrer full IPv4-konnek tivitet mellom alle medlemsinstanser i gruppen. Både gateway-instansen og settet med klientinstanser er inkludert i begge disse sikkerhetsgruppene; de er også inkludert i den forhåndsdefinerte standard-sikkerhetsgruppen for å tillate utgående trafikk til omverdenen.

Vi la også til en ny parameter i Safespring compute instance-modulen, nemlig parameteren `wg_ip`. Formålet med denne parameteren er å tildele Wireguard-overleggsnettets IP-plan som metadata når instansene opprettes. Senere skal vi se hvordan denne metadataen kan finnes og gjenbrukes som variabler i Ansible-inventaret, og dermed unngå manuell konfigurasjon.

Vi tildeler Wireguard-IP-adressen til gateway-instansen den første adressen i området `192.168.45.0/24`, og deretter tildeler vi klientenes adresser den andre, tredje og så videre ved å bruke funksjonen `cidrhost("192.168.45.0/24",count.index + 2)`. Telleindeksen starter på 0, og dokumentasjonen for Terraform-funksjonen `cidrhost()` finnes i [Terraform-dokumentasjonen][tfdocs]

Og nå over til Ansible. Vi opprettet en inventory-katalog med følgende innhold:
```
$ ls -l inventory
total 4
-rw-rw-r-- 1 jarle jarle 241 May 25 13:36 hosts
lrwxrwxrwx 1 jarle jarle  22 May 25 13:32 _terraform.py -> ../../ati/terraform.py
```
Filen `_terraform.py` er en symbolsk lenke til det dynamiske inventory-skriptet. Grunnen til at den begynner med en understrek, er at det som defineres i det statiske inventoryet (`hosts `-filen) refererer til ting som produseres av det dynamiske inventoryet. Filer i inventory-katalogen behandles i alfabetisk rekkefølge, derfor må det dynamiske inventoryet behandles før det statiske; ellers eksisterer ikke de refererte undergruppene i det statiske inventoryet ennå når det blir behandlet.

Innholdet i `hosts`-filen:
```
[wireguard_gateway]
[wireguard_gateway:children]
os_metadata_role=wg_gw

[wireguard_gateway:vars]
wireguard_forward_interface=ens3
wireguard_connect_interface=ens3

[wireguard_clients]
[wireguard_clients:children]
os_metadata_role=wg_client
```
Så her definerer vi vertgruppene som Wireguard-rollen forventer, nemlig
`wireguard_gateway` og `wireguard_clients`, og fyller dem med undergruppene
fra de tilsvarende gruppene i det dynamiske inventoryet, nemlig
`os_metadata_role=wg_gw` og `os_metadata_role=wg_client`.
I tillegg definerer vi de statiske variablene `wireguard_forward_interface` og
`wireguard_connect_interface`

Playbooken ser slik ut:
```
- hosts: wireguard_gateway
  become: yes
  remote_user: ubuntu
  vars:
    wireguard_address: "{{metadata.wg_ip}}"
  tasks:
    - include_role:
        name: ansible-role-wireguard

- hosts: wireguard_clients
  become: yes
  remote_user: ubuntu
  vars:
    wireguard_address: "{{metadata.wg_ip}}"
  tasks:
    - include_role:
        name: ansible-role-wireguard
```
Først kjører vi et play som anvender Wireguard-rollen på Wireguard-gatewayen, og deretter kjører vi et nytt play som anvender den samme rollen på Wireguard-klientene. Dette er fordi klientene trenger informasjon som ble opprettet av playet for gatewayen. Rollen forventer at vertvariabelen `wireguard_address` fylles fra verdien av `{{metadata.wg_ip}}`, som kommer fra det dynamiske inventarskriptet og peker tilbake på `wg_ip` som ble definert i Terraform.

Deretter kjører vi playbook-en med et blandet statisk og dynamisk inventar:
```
ansible-playbook -i inventory wg.yml
```
Dette vil installere Wireguard og konfigurere klienter til å rute all trafikk via
Wireguard-gatewayen over det Wireguard-krypterte overlay-nettverket. Slik:
```
$ openstack server list |grep wire
| 666bc025-3c86-4bc8-9278-66600a49f522 | wireguard-client-2.example.com | ACTIVE | public=185.189.29.84, 2a0a:bcc0:40::40c  | ubuntu-20.04                   | l2.c2r4.100 |
| 9c260891-954b-418c-9be5-aff2b8482164 | wireguard-gw.example.com       | ACTIVE | public=185.189.28.40, 2a0a:bcc0:40::d3   | ubuntu-20.04                   | l2.c2r4.100 |
| f3f361c3-19f8-45dd-887e-ca2dd7fa98f2 | wireguard-client-1.example.com | ACTIVE | public=185.189.29.118, 2a0a:bcc0:40::326 | ubuntu-20.04                   | l2.c2r4.100 |
```
IP-adressen til gatewayen er `185.189.28.40`. Hvis vi logger inn på klientene
og spør hva Internett ser som kildeadressen vår.
```
$ ssh ubuntu@185.189.29.84
(..)
$ curl ifconfig.me
185.189.28.40
$ ssh ubuntu@185.189.29.118
(..)
$ curl ifconfig.me
185.189.28.40
```
Vær så god!

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