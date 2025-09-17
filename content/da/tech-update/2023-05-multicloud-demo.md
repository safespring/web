---
ai: true
title: "Udvikling af en multicloud-webtjeneste fra bunden"
date: "2023-06-07"
intro: "Infrastruktur som kode, der muliggør skalering fra nul til uendelighed ved hjælp af flere OpenStack-sites."
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
  - /blogg/2023/2023-05-multicloud-demo/
---
{{< ingress >}}
Udforsk kraften i infrastructure as code (IaC) med denne guide til at
opbygge en skalerbar webapplikation ved hjælp af flere OpenStack-sites.
Lær at bruge Terraform til infrastrukturprovisionering, Ansible
til systemkonfiguration, og hvordan disse værktøjer, kombineret med DNS
round-robin, kan tilbyde en dynamisk og skalerbar løsning til dine webtjenester.
{{< /ingress >}}

I tidligere indlæg har vi vist styrken ved at kombinere Terraform til
infrastrukturprovisionering og Ansible til konfiguration af operativsystemer på
instanserne i infrastrukturen. I dette blogindlæg tager vi det et skridt videre.
Vi viser et minimalt eksempel på, hvordan man skalerer webservice-backends
på tværs af flere sites og bruger en API-programmerbar DNS-tjeneste (Gandi) til at
vedligeholde A-records for disse backends, hvilket i praksis skalerer tjenesten ved hjælp
af DNS round-robin (RR).

Dette er den simpleste mulige tilgang til en sådan
implementering; den kan dog udvides ved at erstatte simpel DNS RR
med en servicediscovery-mekanisme (som Consul for eksempel) for at muliggøre mere
dynamisk adfærd og endda sundhedstjek, der sikrer, at kun sunde tjenester
bruges som backends. Den samme metode kan naturligvis bruges til at provisionere og
skalere Kubernetes-klynger, hvilket muliggør horisontal skalering, kontinuerlig
levering og alle de cloud-native finesser, du ønsker, for at levere
mikroservices og applikationer, der skalerer horisontalt; faktisk er det præcis,
hvad vores partner Elastisys gør.

## Forudsætninger

Dette blogindlæg antager, at du bruger den open source Terraform CLI. Terraform CLI
er blot et binært program, som du downloader fra [releasesiden][tfreleases]
til din arkitektur/platform. Her finder du også kontrolsummer for filerne til at
verificere deres integritet. Der findes også den officielle [Terraform-dokumentation][tfdocs].

- Grundlæggende forståelse af Ansible playbooks og inventories er også nødvendig.
- En smule grundlæggende brug af [OpenStack CLI][osclidoc] vil også være påkrævet.
- Grundlæggende forståelse af DNS og round-robin (RR)-adfærd.
- Blogindlægget om [Safespring community Terraform-moduler][tfmodulesblog]

## Overblik

Den følgende animerede tegning viser konceptet i demonstrationen. Klik i
tegningen for at bladre gennem skærmene.

1. Ingen infrastruktur, DNS eller tjenester findes endnu.
2. Én backend-tjeneste findes i Safespring sto1 sandbox-projektet.
3. Én instans tilføjes til et andet europæisk cloud-site, hvilket giver én backend-tjeneste på hvert site.
4. A-records, der peger mod instansernes IP-adresser på tværs af sites, tilføjes.
5. Skalering af tjenesten med `count`-parametre.
6. Endnu mere skalering (ikke en del af demoen).
7. Automatisk skalering ved hjælp af feedback baseret på tjenestens svartider (ikke en del af demoen).

<iframe src="/img/eosc-multicloud-demo.sozi.html"  width="100%" height="500" style="border:0"></iframe>

## TL;DR

<div style="margin-bottom:50px;"></div>

<script data-autoplay="true" data-loop="true" data-speed="2" async id="asciicast-kCn38aGPomo6FvSCjqCDAukoM" src="https://asciinema.org/a/kCn38aGPomo6FvSCjqCDAukoM.js"></script>

## Start med at skalere webservice-backends

Alle filerne i demoen er tilgængelige i [Safesprings community GitHub-repositorium][mcdemo].
Læs videre for at forstå, hvad der sker, i flere detaljer.

### Brug af flere clouds fra den samme Terraform-kode og -state

Terraform har en praktisk funktion, der lader os konfigurere flere instanser af
samme type provider og bruge aliasser til at skelne, hvilken der skal bruges,
når vi erklærer den ønskede tilstand for ressourcer.

I vores tilfælde gør denne kode netop det:```hcl
provider "openstack" {
  alias               = "sto1-sandbox"
  cloud = "safespring-sto1"
}

provider "openstack" {
  alias = "psnc-dcw"
  cloud = "psnc-dcw"
  region = "DCW"
}
```
Her definerer vi to deklarationer af Terraform OpenStack-provider, som peger på forskellige poster i vores `clouds.yaml`-fil, og som vi kan referere til via deres `alias`.

Vi skal også angive, hvilke versioner af providers vi har brug for, for alle de providers, der bruges i koden. Sådan her:```hcl
terraform {
  required_providers {
    openstack = {
      source = "terraform-provider-openstack/openstack"
      configuration_aliases = [ openstack.sto1-sandbox, openstack.psnc-dcw]
    }
    gandi = {
      version = "~> 2.1.0"
      source   = "go-gandi/gandi"
    }
  }
  required_version = ">= 0.14"
}

```
Bemærk også, at aliaserne for OpenStack-providerinstanserne skal angives i feltet `configuration_aliases`.

### Web-backend-instanser i cloud nummer et (Safespring sto1)

Vi starter med at definere den ønskede tilstand i Terraform for instanser i sto1 Safespring-datacenteret, sådan her (`safespring.tf`):```hcl
resource "openstack_compute_keypair_v2" "sto1kp" {
  name       = "mc-sto1-pubkey"
  public_key = chomp(file("~/.ssh/id_rsa_jump.pub"))
  provider   = openstack.sto1-sandbox
}

module "sto1_http_backend_sg" {
  providers = {
    openstack = openstack.sto1-sandbox
  }
  source      = "github.com/safespring-community/terraform-modules/v2-compute-security-group"
  name        = "http_back_end"
  description = "Opening ports for http backends"
  rules = {
    one = {
      ip_protocol = "tcp"
      to_port     = "22"
      from_port   = "22"
      ethertype   = "IPv4"
      cidr        = "0.0.0.0/0"
    }
    two = {
      ip_protocol = "tcp"
      to_port     = "443"
      from_port   = "443"
      ethertype   = "IPv4"
      cidr        = "0.0.0.0/0"
    }
    three = {
      ip_protocol = "tcp"
      to_port     = "80"
      from_port   = "80"
      ethertype   = "IPv4"
      cidr        = "0.0.0.0/0"
    }
  }
}

module "sto1_instances" {
  providers = {
    openstack = openstack.sto1-sandbox
  }
  source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
  name            = "mc-safespring-sto1-${count.index + 1}.saft.in"
  role            = "http_backend"
  count           = var.count_safespring
  network         = "public"
  security_groups = [module.sto1_http_backend_sg.name]
  key_pair_name   = openstack_compute_keypair_v2.sto1kp.name
}
```
Vi bruger ganske enkelt de Safespring-leverede Terraform-moduler direkte fra Github (`source`-feltet) til nemt at deklarere både de nødvendige sikkerhedsgrupper (til at åbne portene for hhv. ssh, http og https) og, ved at bruge count med et præfiks, et sæt instanser, hvor antallet og navnet styres af variablen `var.count_safespring`. Variablen er defineret i filen `variables.tf` med en standardværdi på `1`, sådan her:```hcl
variable "count_safespring" {
  description = "Instance count Safespring"
  type        = number
  default     = 1
}
```
Der er også en ressourceerklæring for det [dårligt navngivne][sshblog] `ssh
keypair`, som i virkeligheden blot læser din ssh-offentlige nøglefil ind og
gemmer den i OpenStack til senere brug af instansmodulet. (`key_pair_name   =
openstack_compute_keypair_v2.sto1kp.name`)

Men det mest interessante er parametrene `provider` og `providers` for
henholdsvis keypair-ressourcen og modulerne. Her refererer vi til provideren
med det tidligere nævnte alias `openstack.sto1-sandbox`. Dermed vil de
deklarerede ressourcer blive oprettet med **den** cloud-udbyder, som peger
tilbage på projektet `sandbox` på Safesprings `sto1`-site.

For at opsummere: Ved kun at anvende denne kode vil den oprette keypair
(pubkey), sikkerhedsgruppen med regler og én instans i OpenStack-projektet
`sandbox` på Safesprings `sto1`-site.

### Om forbindelsen mellem Terraform og Ansible

Terraform holder selv regnskab over alle objekter, det opretter, sammen med
deres metadata. Dette kaldes “state”, og det gemmes som standard i den lokale
mappe, hvor Terraform køres, i en fil kaldet `terraform.tfstate`. Den forrige
state-version sikkerhedskopieres i filen `terraform.tfstate.backup`.

Det betyder, at det meste af det, du kan spørge API’et om vedrørende dine
Terraform-oprettede objekter i OpenStack, også findes i den lokale Terraform-
statefil. Derfor kan vi, hvis vi bruger et script, der læser den lokale
Terraform-statefil, få høj hastighed og undgå at belaste OpenStack-API’et. Det
er præcis, hvad [Ansible Terraform Inventory (ATI)][ati] gør.

For at bruge det skal du kopiere eller lave et symlink til scriptet et passende
sted og bruge stien som `--inventory`-option til `ansible-*`-kommandoer.

Når det bruges som inventory til Ansible, vil scriptet danne værtsgrupper ud
fra OpenStack-metadata for instanser, så et sæt instanser med bestemte
metadata ses som en Ansible-inventory-værtsgruppe. For at forenkle og
standardisere dette koncept indeholder Safespring-modulet til oprettelse af
instanser parameteren `role`. I næste kapitel ser du, hvordan `role`-parameteren
kan opfanges og bruges som en værtsgruppe til at konfigurere tjenester på et
sæt instanser med et Ansible-playbook.

### Konfiguration af webtjenesten på backend-instanser i Safespring

Vi konfigurerer en minimal backend-http-tjeneste med et Ansible-playbook som
dette (`configure.yaml`):```yaml
- name: Configure back ends
  hosts: os_metadata_role=http_backend
  become: yes
  tasks:
    - name: wait for nodes to come up
      wait_for_connection:
        timeout: 900
    - name: Install nginx
      apt:
        update_cache: yes
        name: nginx
        state: present
    - name: An example index.html file
      copy:
        dest: "/var/www/html/index.html"
        content: "<html><h1>Welcome to {{ansible_hostname}}</h1></html>"
```
Først venter vi på, at instanserne bliver tilgængelige. Derefter installerer vi Nginx, en minimal webserver, og opretter en skabelon til en minimal HTML-startside, der returnerer en hilsen sammen med værtsnavnet på den instans, som tjenesten kører på.

Bemærk feltet `hosts:`, som fortæller Ansible, hvor de efterfølgende opgaver skal køres. Det er her, forbindelsen sker mellem det, vi angav som en `role` i den ønskede tilstand (Terraform) for klargøring af instanserne, og den værtsgruppe, vi vil konfigurere i Ansible-playbooken.

Så nu kører vi playbooken sådan her:```shell
$ ansible-playbook -i ati configure.yaml
[WARNING]: Invalid characters were found in group names but not replaced, use -vvvv to see details

PLAY [Configure back ends] ********************************************************************************************************

TASK [Gathering Facts] ************************************************************************************************************
ok: [mc-safespring-sto1-1.saft.in]

TASK [wait for nodes to come up] **************************************************************************************************
ok: [mc-safespring-sto1-1.saft.in]

TASK [Install nginx] **************************************************************************************************************
changed: [mc-safespring-sto1-1.saft.in]

TASK [An example index.html file] *************************************************************************************************
changed: [mc-safespring-sto1-1.saft.in]

PLAY RECAP ************************************************************************************************************************
mc-safespring-sto1-1.saft.in : ok=4    changed=2    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
```
Det, der sker, er følgende:

- Terraform-modulet tager parameteren `role` og opretter en metadata-post med nøglen `role` og værdien `http_backend` i den underliggende OpenStack Terraform-provider.
- Da metadataen er en del af staten for det, som Terraform opretter i OpenStack, findes denne information også i Terraform-state-filen (`terraform.tfstate`), som inventory-scriptet læser.
- Via inventory-scriptet finder Ansible gruppen kaldet `os_metadata_role=http_backend` i inventory'et og udfører opgaverne på værterne i den gruppe.

Så har vi nu et sæt bestående af én instans (mc-safespring-sto1-1.saft.in) på `sto1`-sitet (sandbox-projekt), med en ssh-pubkey, der giver adgang til operativsystemet som root (via `sudo`), en sikkerhedsgruppe med regler, der tillader indgående trafik på port 80 (HTTP), 443 (HTTPS) og 22 (SSH). Derudover brugte vi den SSH-adgang (nøgle og port) sammen med Ansible og inventory'et fra Ansible Terraform Inventory Python-scriptet til at konfigurere en webtjeneste (Nginx), der leverer en minimal hilsen, som inkluderer instansens værtsnavn (mc-safespring-sto1-1.saft.in) over HTTP på port 80.

### Konfiguration af nye backends i en anden cloud

I Polen arbejder vi sammen med en anden europæisk cloud-udbyder. De leverer også en OpenStack-baseret IaaS, men med en lidt anderledes opsætning af netværksstakken i OpenStack-platformen.

I vores demo vil vi vise, at Safespring-communityets Terraform-moduler også kan bruges til at klargøre instanser på den anden europæiske cloud-udbyders OpenStack-IaaS med kun få ekstra linjer Terraform-kode til at allokere og tilknytte floating IP-adresser til instanser. Hvis vi i stedet brugte et andet Safespring-site som den anden (eller flere) OpenStack-IaaS, ville det kun være variation i providers og aliasser, der var nødvendig.

Koden for ssh-nøgle, sikkerhedsgruppe med regler og instans er faktisk identisk, bortset fra at der bruges et andet provider-alias, som peger på den anden europæiske cloud-udbyders OpenStack-cloud-post i den lokale `clouds.yaml`-fil, sådan her:```hcl
resource "openstack_compute_keypair_v2" "psncdcwkp" {
  name       = "mc-psnc-bst-pubkey"
  public_key = chomp(file("~/.ssh/id_ecdsa.pub"))
  provider   = openstack.psnc-dcw
}

module "psnc_dcw_http_backend_sg" {
  providers = {
    openstack = openstack.psnc-dcw
  }
  source      = "github.com/safespring-community/terraform-modules/v2-compute-security-group"
  name        = "http_back_end"
  description = "Opening ports for http backends"
  rules = {
    one = {
      ip_protocol = "tcp"
      to_port     = "22"
      from_port   = "22"
      ethertype   = "IPv4"
      cidr        = "0.0.0.0/0"
    }
    two = {
      ip_protocol = "tcp"
      to_port     = "443"
      from_port   = "443"
      ethertype   = "IPv4"
      cidr        = "0.0.0.0/0"
    }
    three = {
      ip_protocol = "tcp"
      to_port     = "80"
      from_port   = "80"
      ethertype   = "IPv4"
      cidr        = "0.0.0.0/0"
    }
    four = {
      ip_protocol = "icmp"
      ethertype   = "IPv4"
      cidr        = "0.0.0.0/0"
    }
  }
}

module "psnc_dcw_instances" {
  providers = {
    openstack = openstack.psnc-dcw
  }
  source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
  name            = "mc-psnc-dcw-${count.index + 1}.saft.in"
  role            = "http_backend"
  count           = var.count_psnc
  disk_size       = 30
  network         = "jbnet"
  flavor          = "s.2VCPU_4GB"
  image           = "Ubuntu Server 22.04 LTS Cloud Image"
  security_groups = [module.psnc_dcw_http_backend_sg.name]
  key_pair_name   = openstack_compute_keypair_v2.psncdcwkp.name
}
```
Bemærk, at parametrene `image` og `flavor` skal angives, da de indbyggede standardværdier for Safespring-modulerne specificerer Safespring-specifikke image og flavor. Og tilsvarende, som hos Safespring, er standardantallet af instanser hos den anden europæiske cloud-udbyder `1`.

Denne kode er dog ikke tilstrækkelig til at gøre instanser tilgængelige på internettet på samme måde, som det var ved brug af Safespring IaaS. For at gøre det skal vi også tilføje:```hcl
resource "openstack_networking_floatingip_v2" "floatip_1" {
  provider = openstack.psnc-dcw
  count    = var.count_psnc
  pool     = "PCSS-DCW-PUB1-EDU"
}

resource "openstack_compute_floatingip_associate_v2" "fipa_1" {
  provider    = openstack.psnc-dcw
  count       = var.count_psnc
  floating_ip = openstack_networking_floatingip_v2.floatip_1[count.index].address
  instance_id = module.psnc_dcw_instances[count.index].id
}
```
Denne kode vil tildele en offentlig IPv4-adresse fra en pulje af flydende IP-adresser og tilknytte den til instans-id'erne i samme `count.index`-cyklus som instanserne.

### Konfiguration af webtjenesten på back-end-instanser

Og nu betaler automatiseringen sig, for det eneste, der er nødvendigt nu, er at køre Ansible-playbooken igen med det opdaterede inventory, som den nye Terraform-state repræsenterer. Det vil sige, at værtsgruppen `os_metadata_role=http_backend` nu indeholder både Safespring-instans(er) og instans(er) hos den anden europæiske cloududbyder.```shell
$ ansible-playbook -i ati configure.yaml
ansible-playbook -i ati configure.yaml
[WARNING]: Invalid characters were found in group names but not replaced, use -vvvv to see details

PLAY [Configure back ends] ********************************************************************************************************

TASK [Gathering Facts] ************************************************************************************************************
ok: [mc-safespring-sto1-1.saft.in]
ok: [mc-psnc-dcw-1.saft.in]

TASK [wait for nodes to come up] **************************************************************************************************
ok: [mc-safespring-sto1-1.saft.in]
ok: [mc-psnc-dcw-1.saft.in]

TASK [Install nginx] **************************************************************************************************************
ok: [mc-safespring-sto1-1.saft.in]
changed: [mc-psnc-dcw-1.saft.in]

TASK [An example index.html file] *************************************************************************************************
ok: [mc-safespring-sto1-1.saft.in]
changed: [mc-psnc-dcw-1.saft.in]

PLAY RECAP ************************************************************************************************************************
mc-psnc-dcw-1.saft.in      : ok=4    changed=2    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
mc-safespring-sto1-1.saft.in : ok=4    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
```
Og playbooket vil konstatere, at i Safespring-instansen er alt allerede sat korrekt op, men i den nye, anden cloud-udbyder-instans er der endnu ikke gjort noget, så det vil lukke det hul og til sidst konvergere til den ønskede tilstand for alle værter i gruppen.

### Konfiguration af round-robin (RR) lastbalancering med DNS

Man kan i princippet bruge enhver DNS-udbyder; for at undgå potentielt problematiske amerikansk-ejede tjenester er det dog bedst at vælge en europæisk virksomhed. Derfor valgte vi Gandi.net. Da Gandi.net er en fransk virksomhed, elimineres overførsel af data til tredjelande i henhold til GDPR helt, præcis som når man bruger Safespring og vores partneres tjenester.

For automatisk at vedligeholde et sæt DNS A-records, der lastbalancerer på tværs af instanser i begge (eller alle) OpenStack-sites, kan vi bruge følgende Terraform-kode (`gandi-dns.tf`), som igen bruger den officielle Gandi.net Terraform-provider, som igen bruger Gandi.net automation API.```hcl
resource "gandi_livedns_record" "rrlb" {
  zone   = "saft.in"
  name   = "www.mcdemo"
  ttl    = 300
  type   = "A"
  values = concat(tolist([for i in module.sto1_instances : i.IPv4]), openstack_networking_floatingip_v2.floatip_1.*.address)
}
```
Her opretter vi A-records for alle IPv4-adresser til instanser i både Safespring og de andre europæiske cloud-udbyderes OpenStack-IaaS'er ved at sammenkæde listerne over IPv4-adresser fra Safespring-modulets outputværdier og de andre europæiske cloud-udbyderes floating IP-adresser, henholdsvis. Alle A-records peger på navnet `www.mcdemo.saft.in`; derfor vil DNS fordele trafikken på tværs af alle disse IPv4-adresser ved round-robin.

Det kan vi teste med `curl`:```shell
for i in `seq 1 100`
do
echo "$(curl -s www.mcdemo.saft.in)"
done|sort |uniq

<html><h1>Welcome to mc-psnc-dcw-1-saft-in</h1></html>
<html><h1>Welcome to mc-safespring-sto1-1</h1></html>
```
Her laver vi 100 curl-anmodninger mod www.mcdemo.saft.in, sorterer dem og samler dem til unikke strenge. Dette viser, at både Safespring og den anden europæiske cloud-udbyders instanser deltager i håndteringen af webanmodninger.

### Opskalering (og nedskalering)

Med et setup som dette er det eneste, vi behøver for at skalere, at ændre nogle count-parametre, køre `terraform apply` og genkøre det samme Ansible-playbook, efterhånden som inventory ændrer sig. For at gøre dette kan vi oprette en variabelfil (`terraform.tfvars`) med følgende indhold.```hcl
count_psnc=2
count_safespring=3
```
Efter at have anvendt dette og kørt Ansible-playbooken igen, giver vores test med `curl` følgende.```shell
for i in `seq 1 100`
do
echo "$(curl -s www.mcdemo.saft.in)"
done|sort |uniq
<html><h1>Welcome to mc-psnc-dcw-1-saft-in</h1></html>
<html><h1>Welcome to mc-psnc-dcw-2-saft-in</h1></html>
<html><h1>Welcome to mc-safespring-sto1-1</h1></html>
<html><h1>Welcome to mc-safespring-sto1-2</h1></html>
<html><h1>Welcome to mc-safespring-sto1-3</h1></html>
```
## Resumé

### Udnyt styrken i Infrastruktur som kode

Afslutningsvis ligger styrken ved Infrastruktur som kode (IaC) i dens evne til problemfrit at skalere webapplikationer på tværs af flere OpenStack-sites. Ved at udnytte værktøjer som Terraform og Ansible kan vi automatisere henholdsvis klargøring af infrastruktur og systemkonfiguration. Integration af disse værktøjer med DNS round-robin til load balancing gør det muligt at skabe en dynamisk og skalerbar løsning til webtjenester.

### Forbedring af skalerbarhed og robusthed

Selvom denne guide præsenterede en enkel implementering, er det muligt at introducere mere sofistikerede elementer såsom service discovery-mekanismer og health checks for yderligere optimering. I sidste ende kan disse metoder anvendes til at klargøre og skalere Kubernetes-klynger og understøtte kontinuerlig levering og andre cloud-native funktioner.

### Afsluttende bemærkninger

Efterhånden som vi fortsætter med at udforske mulighederne i IaC, håber vi, at denne guide kan fungere som et værdifuldt springbræt på din rejse mod at bygge skalerbare, robuste og effektive webtjenester.

{{% note "Læs mere" %}}
Hvis du fandt dette indlæg nyttigt, så tjek også resten af serien om brugen af Terraform og Ansible til ressourceklargøring og compliance. Du vil især måske også synes om:

-- [Særdeles enkel klargøring med Safesprings Terraform-moduler](/blogg/2022-01-terraform-modules)  
-- [Fleksibel klargøring af ressourcer med Safesprings nye Terraform-moduler](/blogg/2022-03-terraform-module)  
-- [Integration af Terraform og Ansible til effektiv ressourcehåndtering](/blogg/2022-05-terraform-ansible)  
-- [Fra nul til kontinuerlig compliance med Terraform, Ansible og Rudder](/blogg/2022-06-terraform-ansible-rudder)

{{% /note %}}

[tfmodulesblog]: /blogg/2022/2022-03-terraform-module/
[ati]: https://github.com/safespring-community/utilities/blob/main/ati/terraform.py
[ksparams]: https://github.com/kubernetes-sigs/kubespray/blob/master/docs/vars.md
[kubespray]: https://github.com/kubernetes-sigs/kubespray
[sftfmodules]: https://github.com/safespring-community/terraform-modules
[sftfexamples]: https://github.com/safespring-community/terraform-modules/tree/main/examples
[sshblog]: /blogg/2022-03-ssh-keys/
[netblog]: /blogg/2022-03-network/
[tfdocs]: https://www.terraform.io/docs
[tfreleases]: https://releases.hashicorp.com/terraform/
[osclidoc]: https://docs.safespring.com/new/api/
[appcred]: https://docs.safespring.com/new/app-creds/
[mcdemo]: https://github.com/safespring-community/terraform-modules/tree/main/examples/openstack-multicloud