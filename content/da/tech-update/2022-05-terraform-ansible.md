---
ai: true
title: "Integration af Terraform og Ansible"
date: "2022-05-23"
intro: "Fra nul til tjeneste med Terraform og Ansible i kombination"
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknologiopdatering"
author: "Jarle Bjørgeengen"
language: "da"
toc: "Indholdsfortegnelse"
aliases:
  - /blogg/2022-05-terraform-ansible
  - /blogg/2022/2022-05-terraform-ansible/
---
{{< ingress >}}
Dette er del tre i serien om Safesprings Terraform-moduler. Dette blogindlæg ser på, hvordan vi kan integrere Ansible og Terraform for at konfigurere tjenester oven på de instanser, der er klargjort med Terraform, ved at bruge Terraform-state som Ansible-inventory.
{{< /ingress >}}

{{% note "Læs mere" %}}
Hvis du fandt dette indlæg nyttigt, så husk at tjekke resten af serien om brug af Terraform og Ansible til ressourceklargøring og compliance. Du vil især måske også synes om:

1. [Supernem klargøring ved hjælp af Safesprings Terraform-moduler](/blogg/2022-01-terraform-modules)
2. [Fleksibel klargøring af ressourcer med Safesprings nye Terraform-moduler](/blogg/2022-03-terraform-module)
3. [Integration af Terraform og Ansible til effektiv ressourcehåndtering](/blogg/2022-05-terraform-ansible)
4. [Fra nul til kontinuerlig compliance med Terraform, Ansible og Rudder](/blogg/2022-06-terraform-ansible-rudder)

{{% /note %}}

## Forudsætninger

Dette blogindlæg forudsætter, at du bruger den open source Terraform CLI. Terraform CLI
er blot et binært program, som du downloader fra [udgivelsessiden][tfreleases]
til din arkitektur/platform. Her finder du også kontrolsummer for filerne til at
verificere deres integritet.

Medmindre andet er forklaret, forudsætter alle eksempler, at du lægger koden
i en `.tf` i en separat mappe og kører `plan`, `init`, `apply` og `destroy`
fra den mappe. `main.tf` bruges mest som en konvention for filnavnet,
men du kan kalde den, hvad du vil, så længe den ender på `.tf`.

Der findes også den officielle [Terraform-dokumentation][tfdocs].

Et grundlæggende kendskab til Ansible-playbooks og inventories er også nødvendigt.

## Introduktion til Terraform

Terraform tager almindelige tekstfiler med «HCL - Hashicorp Configuration Language»
som input og leverer servere og storage som output. HCL er et deklarativt
sprog, dvs. det angiver ikke handlinger, der skal udføres, men derimod en ønsket
tilstand – eller et ønsket resultat.

Ideen om, at konfigurationssprog skal være deklarative, og at
agenten skal drive/konvergere den reale tilstand mod den deklarerede ønskede tilstand, er
blevet bredt accepteret over de sidste tre årtier og bygger på idéer og
forskning af [Mark Burgess i begyndelsen af halvfemserne og senere][mbcfengine].

### Terraform-providers

Superkraften i Terraform kommer fra alle dets providers. Terraform-
providers er binære udvidelser af Terraform, som – som navnet antyder –
«leverer» ressourcer af forskellige slags ved at bruge cloud-udbyderens API’er,
som afspejles af udvidelsens navn.

Disse udvidelser tager sig af alt det tunge arbejde mod cloud-udbydernes API’er og
sikrer, at den faktiske tilstand (cloud-ressourcerne) konvergerer til det, der er
specificeret som den ønskede tilstand.

Terraform kan ses som en desired state-konfigurationsagent for
infrastruktur. Hver gang den køres, vil den gøre den ønskede tilstand til den
faktiske tilstand for cloud-ressourcer.

### Reducering af graden af «lock-in»

Terraform har masser af gennemtestede providers, der er klar til brug, hvilket letter
byrden ved at klargøre cloud-ressourcer fra alle mulige cloud-API’er inden for den
samme (eller forskellige) konfiguration.

Lad os sige, at du har brug for ressourcer i andre clouds (eller on-premise) til de samme
multi-cloud- eller hybride miljøer. Så kan du gøre det med én Terraform-
konfiguration, og du kan endda skalere antallet af ressourcer op og ned ved at ændre
nogle variabler i din Terraform-kode.

Terraform er cloud-agnostisk og er derfor en fremragende forsikring for, at dine ressourcer
er så portable som muligt, hvilket reducerer graden af "lock-in" til et minimum.

{{< disclaimer "Ansvarsfraskrivelse" >}}Terraform er et kraftfuldt værktøj, og kraftfulde værktøjer kan give kraftfulde fejl ved forkert brug, så sørg for at læse dokumentation
og best practices for at forstå værktøjets natur, før du bruger det til
det vigtige.{{< /disclaimer >}}

## Introduktion til Ansible

[Ansible][ansible] er en værktøjssuite til orkestrering og konfigurationsstyring,
primært via såkaldte playbooks. Playbooks skrives i YAML og beskriver den
ønskede tilstand for operativsystemegenskaber som filer, services, filsystemer
osv. Det bruges primært til at konfigurere Linux-baserede operativsystemer over ssh-
protokollen, men kan også bruges til at konfigurere Windows-operativ-
systemer. I dette indlæg viser vi, hvordan man bruger Ansible til at konfigurere tjenester på
et Linux-baseret operativsystem (Ubuntu 20.04).

Ansible-inventories er lister over værter, grupper af værter og variabler for disse
værter og grupper. Værter og grupper bruges til at fortælle Ansible, hvor en given
ønsket tilstand (opgave) er relevant. Når man arbejder med statiske værter i et
datacenter, er inventories ofte også statiske tekstfiler, der vedligeholdes
manuelt eller semimanuelt. Inventories kan dog også være dynamiske, dvs.
leveret af scripts.

Når man arbejder med OpenStack, er det muligt at bruge inventory-scripts, der
forespørger OpenStack-API’et direkte og producerer et komplet inventory over alle
instanser med metadata, alle gruppemedlemskaber osv., men ofte
tager disse scripts lang tid at køre, og de skal generelt køres hver gang du kører
en playbook, hvilket gør playbook-kørsler størrelsesordener mere tidskrævende
end statiske inventories. Desuden kan de lægge en tung belastning på
OpenStack-API’erne, hvis inventory’et forespørges hyppigt.

## Terraform og Ansible

Så må det være "Terrible" så ;-) ? Faktisk er det slet ikke slemt.

Terraform holder selv styr på alle objekter, det klargør, sammen med
deres metadata. Dette kaldes "state", og det gemmes som standard i den lokale mappe,
hvor Terraform køres, i en fil kaldet `terraform.tfstate`. Den
forrige state-version sikkerhedskopieres i filen `terraform.tfstate.backup`.

Det betyder, at det meste af det, du kan forespørge API’et om vedrørende dine Terraform-
leverede objekter i OpenStack, også vil være til stede i den lokale Terraform-
state-fil. Hvis vi derfor bruger et script, der forespørger den lokale Terraform-
state-fil, får vi fordel af høj hastighed og ingen ressourceforbrug i
OpenStack-API’et. Det er præcis det, vi vil demonstrere her. Der findes flere
scripts/programmer til dette formål (https://duckduckgo.com er din ven),
men vi vil bruge et simpelt [Python-script][ati], der oprindeligt er udviklet af Cisco
Systems.

For at bruge det skal du kopiere eller symlinke scriptet et passende sted og
bruge stien som `--inventory`-option til `ansible-*`-kommandoer. Hvis du
lægger scriptet i en mappe og bruger mappenavnet som `--inventory`,
kan du også kombinere information fra det dynamiske inventory leveret af scriptet
med statiske inventory-filer, der yderligere beriger eller transformerer det dynamiske
inventory. Hvis du for eksempel bruger en Ansible-rolle eller -playbook, der kræver et
bestemt værtsgruppenavn, kan du bruge et statisk inventory til at definere en ny værtsgruppe,
som du selv navngiver, og angive en værtsgruppe fra det dynamiske inventory som
`children` til den gruppe, du oprettede, og derefter bruge den gruppe med din rolle
eller playbook. Det ser vi på i et senere eksempel.

## Eksempler

Vi bruger [eksemplerne][sftfexamples] i Terraform-modulets [git-repo][sftfmodules] som reference og forklarer hver af dem under koden.

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
Først opretter vi to instanser på `public`-netværket, baseret på instanstypen `l2.c2r4.100` og image'et `ubuntu-20.04`. Bemærk, at vi angiver `role=webserver`. Når vi kører `terraform apply` på dette, bliver instanser, nøglepar og sikkerhedsgrupper oprettet. Der er endnu ikke installeret eller konfigureret en webserver. Det bruger vi Ansible til.

For at genbruge den rolle, vi angav i Terraform-koden for instanserne, har vi brug for et inventory-script, der læser Terraform-statefiler og producerer et inventory i et format, som Ansible kan bruge. [Ansible Terraform Inventory-scriptet][ati] vil blive brugt til dette formål. Vi kopierer scriptet til en mappe med navnet `ati` og kører denne playbook.
```
ansible-playbook -i ati example.yml
```
Indholdet i `example.yml`
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
Bemærk `hosts: os_metadata_role=webserver`. Det er her, vi kalder den rolle, vi angav i Terraform-koden. Inventory-scriptet vil finde de korrekte instanser og deres IP-adresser, som tilhører den gruppe, der har rollen `webserver`, og dermed vil playbookens opgaver blive udført for disse værter.

Først venter vi på, at instanserne bliver tilgængelige. På den måde kan vi køre playbooken umiddelbart efter provisionering (fx i et script) i stedet for at vente et ukendt antal sekunder, før instanserne er tilgængelige og klar til at blive konfigureret af Ansible over ssh. Vi sætter `gather_facts: no` for at forhindre, at playbooken fejler, før instanserne er tilgængelige, og derefter bruger vi `setup:` i sin egen opgave, efter vi har ventet på, at instanserne er tilgængelige.

De to følgende opgaver installerer Nginx-pakken og opretter en `index.html` med en velkomstbesked, der indsætter værtsnavnet for hver instans.

### Et sæt Wireguard-klienter, der bruger en exit-gateway

I dette eksempel viser vi, hvordan man kombinerer statisk og dynamisk inventory for at bygge bro mellem gruppenavne, som en Ansible-rolle forventer, og gruppenavne, der leveres af OpenStack-metadata-rollen i Terraform-state.

Den praktiske pointe ved eksemplet er også at vise en automatiseret opsætning af Wireguard på et sæt klienter for at dirigere deres trafik gennem en gateway. Det kan være nyttigt, hvis klienter skal tilgå en ekstern tjeneste med en stabil kildeadresse, for eksempel hvis den eksterne tjeneste bruger IP-baserede ACL’er.
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
Her erklærer vi et nøglepar (offentlig nøgle), to sikkerhedsgrupper, en Wireguard-gateway-instans og et sæt på 2 Wireguard-klientinstanser. Sikkerhedsgruppen `ingress` tillader adgang fra hele verden via IPv4 til port 22/tcp (ssh), sikkerhedsgruppen `interconnect` sikrer fuld IPv4-forbindelse mellem alle gruppens medlemsinstanser. Både gateway-instansen og sættet af klientinstanser er med i begge disse sikkerhedsgrupper; de er også med i den allerede eksisterende standard-sikkerhedsgruppe for at tillade udgående trafik til internettet.

Vi har også tilføjet en ny parameter til Safespring-modulet for compute-instanser, nemlig parameteren `wg_ip`. Formålet med denne parameter er at allokere Wireguard-overlayets IP-plan som metadata, når instanserne oprettes. Senere ser vi, hvordan disse metadata kan findes og genbruges som variabler i Ansible-inventoryet, og dermed undgå enhver manuel specifikation af konfiguration.

Vi tildeler Wireguard-IP-adressen for gateway-instansen til den første adresse i området `192.168.45.0/24`, og derefter tildeler vi klienternes adresser til den anden, tredje osv. ved at benytte funktionen `cidrhost("192.168.45.0/24",count.index + 2)`. Count-indekset starter på 0, og dokumentation for Terraform-funktionen `cidrhost()` findes i [Terraform-dokumentationen][tfdocs]

Og nu videre til Ansible. Vi oprettede en inventory-mappe med følgende indhold:
```
$ ls -l inventory
total 4
-rw-rw-r-- 1 jarle jarle 241 May 25 13:36 hosts
lrwxrwxrwx 1 jarle jarle  22 May 25 13:32 _terraform.py -> ../../ati/terraform.py
```
Filen `_terraform.py` er et symbolsk link (symlink) til det dynamiske inventory-script. Årsagen til, at den starter med en understregning, er, at det, der er defineret i det statiske inventory (filen `hosts `), henviser til elementer, der produceres af det dynamiske inventory. Filerne i inventory-mappen behandles i alfabetisk rækkefølge, så det dynamiske inventory skal behandles før det statiske inventory; ellers findes de refererede undergrupper i det statiske inventory endnu ikke, når det bliver behandlet.

Indholdet af `hosts`-filen:
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
Her definerer vi de værtsgrupper, som Wireguard-rollen forventer, nemlig
`wireguard_gateway` og `wireguard_clients`, og udfylder dem med undergrupperne
fra de respektive grupper fra det dynamiske inventory, nemlig
`os_metadata_role=wg_gw` og `os_metadata_role=wg_client`.
Vi definerer også de statiske variabler `wireguard_forward_interface` og
`wireguard_connect_interface`

Playbooket ser sådan ud:
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
Først kører vi et play, der anvender Wireguard-rollen på Wireguard-gatewayen, og derefter kører vi endnu et play, der anvender den samme rolle på Wireguard-klienterne. Dette er fordi klienterne kræver oplysninger, som blev oprettet af playet for gatewayen. Udfyldningen af værtvariablen `wireguard_address` forventes af rollen at komme fra værdien af `{{metadata.wg_ip}}`, som kommer fra det dynamiske inventory-script og peger tilbage på `wg_ip`, der blev defineret i Terraform.

Derefter kører vi playbooken med den blandede statiske og dynamiske inventory:
```
ansible-playbook -i inventory wg.yml
```
Dette vil installere Wireguard og konfigurere klienter til at rute al trafik via
Wireguard-gatewayen over det Wireguard-krypterede overlay-netværk. Sådan her:
```
$ openstack server list |grep wire
| 666bc025-3c86-4bc8-9278-66600a49f522 | wireguard-client-2.example.com | ACTIVE | public=185.189.29.84, 2a0a:bcc0:40::40c  | ubuntu-20.04                   | l2.c2r4.100 |
| 9c260891-954b-418c-9be5-aff2b8482164 | wireguard-gw.example.com       | ACTIVE | public=185.189.28.40, 2a0a:bcc0:40::d3   | ubuntu-20.04                   | l2.c2r4.100 |
| f3f361c3-19f8-45dd-887e-ca2dd7fa98f2 | wireguard-client-1.example.com | ACTIVE | public=185.189.29.118, 2a0a:bcc0:40::326 | ubuntu-20.04                   | l2.c2r4.100 |
```
Gatewayens IP-adresse er `185.189.28.40`. Hvis vi logger ind på klienterne
og spørger, hvad vores kildeadresse er set fra internettet.
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
Voilà!

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