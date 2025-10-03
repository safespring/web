---
ai: true
title: "Å bygge en flersky nettjeneste fra bunnen av"
date: "2023-06-07"
intro: "Infrastruktur som kode som muliggjør skalering fra null til uendelig på tvers av flere OpenStack-lokasjoner."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknisk oppdatering"
author: "Jarle Bjørgeengen"
language: "nb"
toc: "Innholdsfortegnelse"
aliases:
  - /blogg/2023/2023-05-multicloud-demo/
---
{{< ingress >}}
Utforsk kraften i infrastruktur som kode (IaC) med denne veiledningen om
å lage en skalerbar webapplikasjon ved å bruke flere OpenStack-lokasjoner.
Lær hvordan du bruker Terraform til infrastrukturprovisjonering, Ansible
til systemkonfigurasjon, og hvordan disse verktøyene, kombinert med DNS
round-robin, kan tilby en dynamisk og skalerbar løsning for webtjenestene dine.
{{< /ingress >}}

I tidligere innlegg har vi vist kraften i å kombinere Terraform for
infrastrukturprovisjonering og Ansible for konfigurasjon av operativsystemer på
instansene i infrastrukturen. I dette blogginnlegget tar vi det ett steg videre.
Vi viser et minimalt eksempel på hvordan du kan skalere opp backend for webtjenester
på tvers av flere steder og bruke en API-programmerbar DNS-tjeneste (Gandi) til å
vedlikeholde A-oppføringer for disse backendene, og dermed skalere tjenesten ved hjelp
av DNS round-robin (RR).

Dette er den enklest mulige tilnærmingen for en slik
implementering, men dette kan utvides ved å erstatte enkel DNS RR
med en tjenesteoppdagelsesmekanisme (som Consul, for eksempel) for å muliggjøre mer
dynamisk atferd og til og med helsesjekker som sikrer at bare friske tjenester brukes
som backender. Den samme metodikken kan selvsagt brukes til å provisjonere og
skalere Kubernetes-klynger, og dermed muliggjøre horisontal skalering, kontinuerlig
levering og alle de sky-native finessene du vil ha for å levere
mikrotjenester og applikasjoner som skalerer horisontalt; faktisk er det nettopp
dette vår partner Elastisys gjør.

## Forutsetninger

Dette blogginnlegget forutsetter at du bruker den åpne kilden Terraform CLI. Terraform CLI
er bare et binærprogram som du laster ned fra [utgivelsessiden][tfreleases],
for din arkitektur/plattform. Her finner du også kontrollsummer for filene for å
verifisere integriteten. Det finnes også offisiell [Terraform-dokumentasjon][tfdocs].

- Grunnleggende forståelse av Ansible-playbooks og -inventories er nødvendig.
- Noe grunnleggende bruk av [OpenStack CLI][osclidoc] vil også være nødvendig.
- Grunnleggende forståelse av DNS og round-robin (RR)-atferd.
- Blogginnlegget om [Safespring community Terraform-moduler][tfmodulesblog]

## Oversikt

Den følgende animerte illustrasjonen viser konseptet i demonstrasjonen. Klikk i
illustrasjonen for å bla gjennom skjermbildene.

1. Ingen infrastruktur, DNS eller tjenester finnes ennå.
2. Én backend-tjeneste finnes i Safespring sto1 sandbox-prosjektet.
3. Én instans legges til i en annen europeisk sky-lokasjon, noe som gir én backend-tjeneste i hver lokasjon.
4. A-oppføringer som peker mot IP-adressene til instansene på tvers av lokasjoner legges til.
5. Skalere opp tjenesten med `count`-parametere.
6. Skalere enda mer (ikke del av demoen).
7. Automatisk skalering ved hjelp av tilbakemeldinger basert på tjenestens responstider (ikke del av demoen).

<iframe src="/img/eosc-multicloud-demo.sozi.html"  width="100%" height="500" style="border:0"></iframe>

## TL;DR

<div style="margin-bottom:50px;"></div>

<script data-autoplay="true" data-loop="true" data-speed="2" async id="asciicast-kCn38aGPomo6FvSCjqCDAukoM" src="https://asciinema.org/a/kCn38aGPomo6FvSCjqCDAukoM.js"></script>

## Start skalering av backend-tjenester for web

Alle filene i demoen er tilgjengelige i [Safesprings community GitHub-repositorium][mcdemo].
Les videre for å forstå hva som skjer i mer detalj.

### Bruke flere skyer fra samme Terraform-kode og -state

Terraform har en praktisk funksjon som lar oss konfigurere flere instanser av
samme type provider og bruke aliaser for å skille hvilken som skal brukes
når vi erklærer ønsket tilstand for ressurser.

I vårt tilfelle gjør denne koden nettopp det:
```hcl
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
Her definerer vi to deklarasjoner av Terraform OpenStack-leverandøren som peker til ulike oppføringer i `clouds.yaml`-filen og som kan refereres til med deres `alias`.

Vi må også angi hvilke versjoner av leverandører vi trenger for alle leverandørene som brukes i koden. Slik:
```hcl
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
Merk også at aliasene til OpenStack-providerinstansene må angis i feltet `configuration_aliases`.

### Web-backend-instanser i den første skyen (Safespring sto1)

Vi starter med å definere ønsket tilstand i Terraform for instanser i Safespring-datasenteret sto1, slik (`safespring.tf`):
```hcl
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
Vi bruker enkelt og greit Safespring-leverte Terraform-moduler direkte fra Github
(feltet `source`) for å enkelt deklarere både de nødvendige sikkerhetsgruppene (for
åpning av portene for ssh, http og https henholdsvis) og bruke count med
et prefiks for å deklarere et sett med instanser der antallet og navnet styres
av variabelen `var.count_safespring`. Variabelen er definert i filen
`variables.tf` med en standardverdi på `1`, slik:
```hcl
variable "count_safespring" {
  description = "Instance count Safespring"
  type        = number
  default     = 1
}
```
Det finnes også en ressursdeklarasjon for den [dårlig navngitte][sshblog] `ssh
keypair`, som i praksis bare leser inn den offentlige SSH-nøkkelfilen din og lagrer den i
OpenStack for senere bruk av instansmodulen. (`key_pair_name   =
openstack_compute_keypair_v2.sto1kp.name`)

Men det mest interessante er `provider`- og `providers`-parameterne
for henholdsvis keypair-ressursen og modulene. Her refererer vi til
leverandøren med det tidligere nevnte aliaset `openstack.sto1-sandbox`. Dermed
vil de deklarerte ressursene bli provisjonert med **den** skyleverandøren,
som peker tilbake til prosjektet `sandbox` på Safespring-lokasjonen `sto1`.

Oppsummert: Å anvende bare denne koden vil opprette nøkkelparet (pubkey),
sikkerhetsgruppen med regler og én instans i OpenStack-prosjektet `sandbox`
på Safespring-lokasjonen `sto1`.

### Om forbindelsen mellom Terraform og Ansible

Terraform fører selv oversikt over alle objektene det provisjonerer sammen med
metadataene. Dette kalles «state», og det lagres som standard i den lokale katalogen der
Terraform kjøres, i en fil som heter `terraform.tfstate`. Forrige state-versjon
sikkerhetskopieres i filen `terraform.tfstate.backup`.

Dette betyr at det meste du kan hente fra API-et om Terraform-administrerte
objekter i OpenStack også vil finnes i den lokale Terraform-statefilen. Derfor,
hvis vi bruker et skript som leser den lokale Terraform-statefilen, får vi høy
ytelse og ingen ressursbruk i OpenStack-API-et. Det er nettopp det
[Ansible Terraform Inventory (ATI)][ati] gjør.

For å bruke det, kopier eller lag en symlink til skriptet et passende sted og bruk
stien som `--inventory`-alternativ til `ansible-*`-kommandoer.

Når det brukes som inventory for Ansible, vil skriptet lage vertgrupper ut fra
OpenStack-metadata for instanser, slik at et sett med instanser som har bestemte
metadata, blir sett som en Ansible-inventory-vertgruppe. For å forenkle og
standardisere dette konseptet inkluderer Safespring-modulen for å opprette instanser
parameteren `role`. I neste kapittel ser du hvordan role-parameteren kan plukkes opp
og brukes som en vertgruppe for å konfigurere tjenester på et sett med instanser med en
Ansible-playbook.

### Konfigurere webtjenesten på backend-instansene i Safespring

Vi konfigurerer en minimal backend HTTP-tjeneste med en Ansible-playbook som dette
(`configure.yaml`):
```yaml
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
Først venter vi på at instanser skal bli tilgjengelige. Deretter installerer vi Nginx, en minimal web
server, og bruker en mal til å lage en minimal HTML-forside som returnerer en hilsen sammen
med vertsnavnet til instansen tjenesten kjører på.

Merk `hosts:`-feltet som forteller Ansible hvor de påfølgende oppgavene skal kjøres.
Det er her koblingen skjer mellom det vi spesifiserte som en `role` i ønsket tilstand (Terraform) for
klargjøring av instanser og vertsgruppen vi vil konfigurere i Ansible-playbooken.

Så kjører vi nå playbooken slik:
```shell
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
Dette er det som skjer:

- Terraform-modulen tar parameteren `role` og oppretter en metadataoppføring
  med nøkkelen `role` og verdien `http_backend` i den underliggende OpenStack
  Terraform-provideren.
- Siden metadata er en del av tilstanden for det Terraform oppretter i
  OpenStack, finnes denne informasjonen også i Terraform-tilstandsfilen
  (`terraform.tfstate`) som inventory-skriptet leser.
- Gjennom inventory-skriptet finner Ansible gruppen kalt
  `os_metadata_role=http_backend` i inventoryet, og kjører oppgavene på
  vertene i den gruppen.

Så nå har vi et sett bestående av én instans (mc-safespring-sto1-1.saft.in) i
`sto1`-site (sandbox-prosjekt), med en SSH-offentlig nøkkel som gir tilgang til
operativsystemet som root (via `sudo`), en security_group med regler som tillater
innkommende trafikk på portene 80 (HTTP), 443 (HTTPS) og 22 (SSH). Videre brukte
vi den SSH-tilgangen (nøkkel og port) med Ansible sammen med inventory hentet fra
Ansible Terraform Inventory-Python-skriptet til å konfigurere en webtjeneste
(Nginx) som leverer en minimal hilsen som inkluderer instansens vertsnavn
(mc-safespring-sto1-1.saft.in) over HTTP på port 80.

### Konfigurere nye backends i en annen sky

I Polen samarbeider vi med en annen europeisk skyleverandør. De tilbyr også en
OpenStack-basert IaaS, men med et litt annerledes oppsett når det gjelder
nettverksstakken i OpenStack-plattformen.

I demonstrasjonen vår vil vi vise at Safespring community Terraform-modulene også kan
brukes til å provisjonere instanser på den andre europeiske skyleverandørens
OpenStack IaaS med bare noen få ekstra linjer Terraform-kode for å allokere og
knytte floating IP-adresser til instanser. Hvis vi skulle bruke et annet
Safespring-sted som den andre (eller enda flere) OpenStack IaaS, ville det kun
være nødvendig med variasjon av providere og aliaser.

Koden for SSH-nøkkel, security group med regler og instans er faktisk
identisk, bortsett fra at den bruker et annet provider-alias som peker til den
andre europeiske skyleverandørens OpenStack-skyoppføring i den lokale
`clouds.yaml`-filen, slik:
```hcl
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
Merk at parameterne `image` og `flavor` må spesifiseres, ettersom de innebygde standardverdiene for Safespring-modulene angir Safespring-spesifikke image og flavor. Tilsvarende som hos Safespring er standardantallet for instanser hos den andre europeiske skyleverandøren `1`.

Denne koden er imidlertid ikke tilstrekkelig for å gjøre instanser tilgjengelige på Internett på samme måte som med Safespring IaaS. For å få til det må vi også legge til:
```hcl
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
Denne koden vil tildele en offentlig IPv4-adresse fra en pulje med flytende IP-adresser og knytte den til instans-ID(ene) i henhold til samme `count.index`-syklus som instansene.

### Konfigurere webtjenesten på back-end-instansene

Og nå kommer gevinsten av automatiseringen: Det eneste som trengs nå er å kjøre Ansible-playbooken på nytt med det oppdaterte inventoryet som den nye Terraform-tilstanden representerer. Nærmere bestemt inneholder vertgruppen `os_metadata_role=http_backend` nå både Safespring- og den andre europeiske skyleverandørens instans(er).
```shell
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
Og playbooken vil oppdage at i Safespring-instansen var alt allerede satt opp riktig, men i den nye, andre skyleverandør-instansen er ingenting gjort ennå, så den vil tette det gapet og ende opp med å konvergere til ønsket tilstand for alle verter i gruppen.

### Konfigurere round-robin (RR) lastbalansering med DNS

Man kan i praksis bruke hvilken som helst DNS-leverandør, men for å styre unna potensielt problematiske amerikansk-eide tjenester er det best å velge et europeisk selskap. Derfor valgte vi Gandi.net. Siden Gandi.net er et fransk selskap, er overføring av data til tredjeland etter GDPR helt eliminert, slik det også er når man bruker Safespring og våre partneres tjenester.

For å automatisk vedlikeholde et sett med DNS A-poster som lastbalanserer på tvers av instanser i begge (eller alle) OpenStack-lokasjoner, kan vi bruke følgende Terraform-kode (`gandi-dns.tf`), som igjen bruker den offisielle Terraform-leverandøren for Gandi.net, som i sin tur bruker Gandi.net-automatiserings-API-et.
```hcl
resource "gandi_livedns_record" "rrlb" {
  zone   = "saft.in"
  name   = "www.mcdemo"
  ttl    = 300
  type   = "A"
  values = concat(tolist([for i in module.sto1_instances : i.IPv4]), openstack_networking_floatingip_v2.floatip_1.*.address)
}
```
Her oppretter vi A-poster for alle IPv4-adresser til instanser i både Safespring og den andre europeiske skyleverandørens OpenStack-IaaS ved å slå sammen listene over IPv4-adresser fra Safespring-modulenes utdata og den andre leverandørens flytende IP-adresser, henholdsvis. Alle A-postene peker til navnet `www.mcdemo.saft.in`, dermed vil DNS lastbalansere på tvers av alle disse IPv4-adressene i en round-robin-måte.

Vi kan teste dette med `curl`:
```shell
for i in `seq 1 100`
do
echo "$(curl -s www.mcdemo.saft.in)"
done|sort |uniq

<html><h1>Welcome to mc-psnc-dcw-1-saft-in</h1></html>
<html><h1>Welcome to mc-safespring-sto1-1</h1></html>
```
Her gjør vi 100 curl-forespørsler mot www.mcdemo.saft.in, sorterer dem og
slår dem sammen til unike strenger. Dette viser at både Safespring og den andre europeiske skyleverandørens
instanser er med på å betjene webforespørsler.

### Skalere opp (og ned)

Med et slikt oppsett trenger vi bare å
endre noen count-parametere, kjøre `terraform apply` og kjøre den samme
Ansible-playbooken på nytt etter hvert som inventoryet endres. For å gjøre dette kan vi opprette en
variabelfil (`terraform.tfvars`) med følgende innhold.
```hcl
count_psnc=2
count_safespring=3
```
Etter å ha tatt dette i bruk og kjørt Ansible-playbooken på nytt, gir testen vår med `curl` følgende resultat.
```shell
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
## Oppsummering

### Utnytte kraften i infrastruktur som kode

Avslutningsvis ligger kraften i infrastruktur som kode (IAC) i evnen til sømløst å skalere webapplikasjoner på tvers av flere OpenStack-siter. Ved å bruke verktøy som Terraform og Ansible kan vi automatisere henholdsvis provisjonering av infrastruktur og systemkonfigurasjon. Integrasjonen av disse verktøyene med DNS round-robin for lastbalansering gjør det mulig å skape en dynamisk og skalerbar løsning for webtjenester.

### Forbedre skalerbarhet og robusthet

Selv om denne veiledningen presenterte en enkel implementering, er det mulig å introdusere mer sofistikerte elementer som mekanismer for service discovery og helsesjekker for ytterligere optimalisering. Til syvende og sist kan disse metodene brukes til å provisjonere og skalere Kubernetes-klynger, med støtte for kontinuerlig levering og andre cloud-native-funksjoner.

### Avsluttende tanker

Etter hvert som vi fortsetter å utforske mulighetene med IAC, håper vi at denne veiledningen fungerer som et verdifullt springbrett på veien mot å bygge skalerbare, robuste og effektive webtjenester.

{{% note "Les mer" %}}
Hvis du synes dette innlegget var nyttig, bør du sjekke ut resten av serien om bruk av Terraform og Ansible for ressursprovisjonering og etterlevelse. Spesielt kan du også like:

-- [Superenkel provisjonering med Safesprings Terraform-moduler](/blogg/2022-01-terraform-modules)  
-- [Fleksibel provisjonering av ressurser med Safesprings nye Terraform-moduler](/blogg/2022-03-terraform-module)  
-- [Integrering av Terraform og Ansible for effektiv ressursforvaltning](/blogg/2022-05-terraform-ansible)  
-- [Fra null til kontinuerlig etterlevelse med Terraform, Ansible og Rudder](/blogg/2022-06-terraform-ansible-rudder)

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