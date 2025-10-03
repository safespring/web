---
ai: true
title: "Skapa en webbtjänst för flera moln från grunden"
date: "2023-06-07"
intro: "Infrastruktur som kod som möjliggör skalning från noll till oändlighet över flera OpenStack-platser."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknikuppdatering"
author: "Jarle Bjørgeengen"
language: "sv"
toc: "Innehållsförteckning"
aliases:
  - /blogg/2023/2023-05-multicloud-demo/
---
{{< ingress >}}
Utforska kraften i infrastruktur som kod (IAC) med den här guiden om
att skapa en skalbar webbapplikation med flera OpenStack-platser.
Lär dig hur du använder Terraform för infrastrukturprovisionering, Ansible
för systemkonfiguration och hur dessa verktyg, i kombination med DNS
round-robin, kan ge en dynamisk och skalbar lösning för dina webbtjänster.
{{< /ingress >}}

I tidigare inlägg har vi visat styrkan i att kombinera Terraform för
infrastrukturprovisionering och Ansible för att konfigurera operativsystemen på
instanserna i infrastrukturen. I det här blogginlägget tar vi det ett steg
längre. Vi visar ett minimalt exempel på hur man skalar upp backend för webbtjänster
över flera platser och använder en API-programmerbar DNS-tjänst (Gandi) för att
underhålla A-poster för dessa backend, vilket i praktiken skalar tjänsten med hjälp
av DNS round-robin (RR).

Det här är det enklast möjliga angreppssättet för en sådan
implementation, men det kan byggas ut genom att ersätta enkel DNS RR
med en servicediscovery-mekanism (som Consul, till exempel) för att möjliggöra mer
dynamiska beteenden och till och med hälsokontroller som säkerställer att bara friska tjänster
används som backend. Samma metodik kan förstås användas för att provisionera och
skala Kubernetes-kluster, vilket möjliggör horisontell skalning, kontinuerlig
leverans och alla de cloud-native-finesser du vill ha för att leverera
mikrotjänster och applikationer som skalar horisontellt; i själva verket är det precis
detta som vår partner Elastisys gör.

## Förutsättningar

Det här blogginlägget utgår från att du använder den öppna källkodsvarianten av Terraform CLI. Terraform CLI
är bara ett binärt program som du laddar ner från [utgåvesidan][tfreleases],
för din arkitektur/plattform. Där hittar du också kontrollsummor för filerna för att
verifiera deras integritet. Det finns även officiell [Terraform-dokumentation][tfdocs].

- En grundläggande förståelse för Ansible-playbooks och inventories behövs också.
- Viss grundläggande användning av [OpenStack CLI][osclidoc] krävs också.
- Grundläggande förståelse för DNS och round-robin (RR).
- Blogginlägget om [Safesprings community-moduler för Terraform][tfmodulesblog]

## Översikt

Följande animerade skiss visar konceptet för demonstrationen. Klicka i
bilden för att bläddra mellan vyerna.

1. Ingen infrastruktur, DNS eller tjänster finns ännu.
2. En backend-tjänst finns i Safespring sto1 sandbox-projekt.
3. En instans läggs till på en annan europeisk molnplats, vilket ger en backend-tjänst på vardera platsen.
4. A-poster som pekar på instansernas IP-adresser över platserna läggs till.
5. Skala upp tjänsten med `count`-parametrar.
6. Skala ännu mer (ingår inte i demon).
7. Automatisk skalning med återkoppling baserad på tjänstens svarstider (ingår inte i demon).

<iframe src="/img/eosc-multicloud-demo.sozi.html"  width="100%" height="500" style="border:0"></iframe>

## TL;DR

<div style="margin-bottom:50px;"></div>

<script data-autoplay="true" data-loop="true" data-speed="2" async id="asciicast-kCn38aGPomo6FvSCjqCDAukoM" src="https://asciinema.org/a/kCn38aGPomo6FvSCjqCDAukoM.js"></script>

## Starta skalning av webbtjänsternas backend

Alla filer i demon finns i [Safesprings community-repo på GitHub][mcdemo]. Fortsätt läsa för att förstå vad som händer i mer detalj.

### Använd flera moln från samma Terraform-kod och state

Terraform har en praktisk funktion som låter oss konfigurera flera instanser av
samma typ av provider och använda alias för att skilja vilken som ska användas
när vi deklarerar önskat tillstånd för resurser.

I vårt fall gör den här koden just detta:
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
Här definierar vi två deklarationer av Terraform OpenStack-providern som pekar
på olika poster i vår `clouds.yaml` och som vi kan referera till via deras
`alias`.

Vi behöver också ange vilka versioner av providers vi behöver för alla providers
som används i koden. Så här:
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
Observera också att aliasen för OpenStack-provider-instanserna måste deklareras i fältet `configuration_aliases`.

### Webb-backend-instanser i moln nummer ett (Safespring sto1)

Vi börjar med att deklarera det önskade tillståndet i Terraform för instanser i Safesprings sto1-datacenter, så här (`safespring.tf`):
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
Vi använder helt enkelt Safespring-tillhandahållna Terraform-moduler direkt från Github
(fältet `source`) för att enkelt deklarera både de nödvändiga säkerhetsgrupperna (för
att öppna portarna för ssh, http och https respektive) samt använda count med
ett prefix för att deklarera en uppsättning instanser där antalet och namnet styrs
av variabeln `var.count_safespring`. Variabeln definieras i filen
`variables.tf` med ett standardvärde på `1`, så här:
```hcl
variable "count_safespring" {
  description = "Instance count Safespring"
  type        = number
  default     = 1
}
```
Det finns också en resursdeklaration för det [olyckligt namngivna][sshblog] `ssh
keypair`, som i själva verket bara läser in din publika SSH-nyckel och lagrar den i
OpenStack för senare användning av instansmodulen. (`key_pair_name   =
openstack_compute_keypair_v2.sto1kp.name`)

Men det mest intressanta är parametrarna `provider` och `providers` för
nyckelparresursen respektive modulerna. Här refererar vi till providern via det
tidigare nämnda aliaset `openstack.sto1-sandbox`. Därmed kommer de deklarerade
resurserna att provisioneras med just den molnleverantören, som mappar tillbaka
till projektet `sandbox` på Safespring-platsen `sto1`.

Sammanfattningsvis: att bara tillämpa den här koden skapar nyckelparet (publik
nyckel), säkerhetsgruppen med regler samt en instans i OpenStack-projektet
`sandbox` på Safespring-platsen `sto1`.

### Om kopplingen mellan Terraform och Ansible

Terraform håller själv reda på alla objekt det provisionerar tillsammans med
deras metadata. Detta kallas "state" och lagras som standard i den lokala
katalog där Terraform körs, i en fil som heter `terraform.tfstate`. Föregående
state-version säkerhetskopieras i filen `terraform.tfstate.backup`.

Detta innebär att det mesta du kan fråga API:et om, gällande dina av Terraform
provisionerade objekt i OpenStack, också finns i den lokala Terraform-statefilen.
Om vi alltså använder ett skript som läser den lokala Terraform-statefilen
drar vi nytta av hög hastighet och ingen resursbelastning på OpenStacks API.
Det är precis vad [Ansible Terraform Inventory (ATI)][ati] gör.

För att använda det, kopiera eller skapa en symbolisk länk till skriptet på en
lämplig plats och använd sökvägen som alternativet `--inventory` till
`ansible-*`-kommandon.

När det används som inventory för Ansible kommer skriptet att skapa värdgrupper
utifrån OpenStack-metadata för instanser, så att en uppsättning instanser med
viss metadata ses som en Ansible-inventory-värdgrupp. För att förenkla och
standardisera detta koncept innehåller Safesprings modul för att skapa
instanser parametern `role`. I nästa kapitel får du se hur parametern `role`
kan plockas upp och användas som en värdgrupp för att konfigurera tjänster på
en uppsättning instanser med en Ansible-playbook.

### Konfigurera webbtjänsten på backend-instanser i Safespring

Vi konfigurerar en minimal backend-http-tjänst med en Ansible-playbook som
denna (`configure.yaml`):
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
Först väntar vi på att instanserna blir tillgängliga. Sedan installerar vi Nginx, en minimal webbserver, och skapar en minimal HTML-startsida via en mall som returnerar en hälsning tillsammans med värdnamnet för den instans som tjänsten körs på.

Observera fältet `hosts:` som talar om för Ansible var de följande uppgifterna ska köras. Det är här kopplingen sker mellan det vi specificerade som en `role` i det önskade tillståndet (Terraform) för provisioneringen av instanserna och den värdgrupp vi vill konfigurera i Ansible-playbooken.

Så här kör vi nu playbooken:
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
Det som händer är följande:

- Terraform-modulen tar parametern `role` och skapar en metadata-post
  med nyckeln `role` och värdet `http_backend` i den underliggande OpenStack-
  Terraformprovidern.
- Eftersom metadatan ingår i state för det som Terraform skapar i
  OpenStack finns den här informationen också i Terraform-statefilen
  (`terraform.tfstate`) som inventory-skriptet läser.
- Via inventory-skriptet hittar Ansible gruppen som heter
  `os_metadata_role=http_backend` i inventoryt och kör uppgifterna på
  värdarna i den gruppen.

Så nu har vi en uppsättning med en instans (mc-safespring-sto1-1.saft.in ) på
platsen `sto1` (sandbox-projekt), med en offentlig SSH-nyckel som möjliggör
åtkomst till operativsystemet som root (via `sudo`), en säkerhetsgrupp med
regler som tillåter inkommande trafik på portarna 80 (HTTP), 443 (HTTPS) och
22 (SSH). Vidare använde vi den SSH-åtkomsten (nyckel och port) med Ansible
tillsammans med inventory som hämtats från Python-skriptet Ansible Terraform
Inventory för att konfigurera en webbtjänst (Nginx) som levererar en minimal
hälsning som inkluderar instansens värdnamn (mc-safespring-sto1-1.saft.in) över
HTTP på port 80.

### Konfigurera nya backend:er i ett annat moln

I Polen samarbetar vi med en annan europeisk molnleverantör. De tillhandahåller
också en OpenStack-baserad IaaS, men med en något annorlunda uppsättning av
nätverksstacken i OpenStack-plattformen.

I vår demo visar vi att Safesprings communitymoduler för Terraform också kan
användas för att etablera instanser på den andra europeiska molnleverantörens
OpenStack-IaaS med bara några få extra rader Terraform-kod för att allocera och
koppla floating IP-adresser till instanser. Om vi skulle använda en annan
Safespring-site som den andra (eller ännu fler) OpenStack-IaaS skulle bara
variationer av providers och alias vara nödvändiga.

Koden för SSH-nyckel, säkerhetsgrupp med regler och instans är faktiskt
identisk, förutom att den använder ett annat provider-alias som pekar på den
andra europeiska molnleverantörens OpenStack-molns post i den lokala
`clouds.yaml`-filen, så här:
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
Observera att parametrarna `image` och `flavor` måste anges eftersom de inbyggda standardvärdena för Safespring-modulerna specificerar en Safespring-specifik image och flavor. Och på samma sätt som med Safespring är det förvalda antalet instanser hos den andra europeiska molnleverantören `1`.

Den här koden räcker dock inte för att göra instanser tillgängliga på Internet på samma sätt som när Safespring IaaS användes. För att göra det behöver vi också lägga till:
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
Den här koden allokerar en offentlig IPv4-adress från en pool av floating IP-adresser och associerar den med instans-ID(n) enligt samma `count.index`-cykel som instanserna.

### Konfigurera webbtjänsten på backend-instanserna

Och nu betalar sig automatiseringen, eftersom det enda som behövs är att köra Ansible-playbooken igen med den uppdaterade värdförteckningen som det nya Terraform-tillståndet representerar. Värdgruppen `os_metadata_role=http_backend` innehåller nu både Safespring- och den andra europeiska molnleverantörens instans(er).
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
Och playbooken kommer att konstatera att i Safespring‑instansen är allt redan korrekt uppsatt, men i instansen hos den nya, andra molnleverantören har ingenting gjorts ännu, så den täpper till det gapet och konvergerar till det önskade tillståndet för alla värdar i gruppen.

### Konfigurera round-robin (RR)-lastbalansering med DNS

Vilken DNS‑leverantör som helst kan egentligen användas, men för att undvika potentiellt problematiska USA‑ägda tjänster är det bäst att välja ett europeiskt företag. Därför valde vi Gandi.net. Eftersom Gandi.net är ett franskt företag elimineras överföring av data till tredjeländer enligt GDPR helt, precis som när man använder Safespring och våra partners tjänster.

För att automatiskt upprätthålla en uppsättning DNS A‑poster som lastbalanserar över instanser i båda (eller alla) OpenStack‑platser kan vi använda följande Terraform‑kod (`gandi-dns.tf`), som i sin tur använder den officiella Terraform‑providern för Gandi.net, som i sin tur använder Gandi.nets automations‑API.
```hcl
resource "gandi_livedns_record" "rrlb" {
  zone   = "saft.in"
  name   = "www.mcdemo"
  ttl    = 300
  type   = "A"
  values = concat(tolist([for i in module.sto1_instances : i.IPv4]), openstack_networking_floatingip_v2.floatip_1.*.address)
}
```
Här skapar vi A‑poster för alla IPv4‑adresser för instanser i både
Safespring och den andra europeiska molnleverantörens OpenStack‑IaaS‑miljöer genom att slå ihop listorna med IPv4‑
adresser från Safespring‑modulens utdata respektive den andra europeiska molnleverantörens flytande IP‑adresser.
Alla A‑poster pekar på namnet `www.mcdemo.saft.in`, vilket gör att DNS
lastbalanserar över alla dessa IPv4‑adresser med round‑robin.

Vi kan testa detta med `curl`:
```shell
for i in `seq 1 100`
do
echo "$(curl -s www.mcdemo.saft.in)"
done|sort |uniq

<html><h1>Welcome to mc-psnc-dcw-1-saft-in</h1></html>
<html><h1>Welcome to mc-safespring-sto1-1</h1></html>
```
Här gör vi 100 curl-anrop mot www.mcdemo.saft.in, sorterar dem och slår samman dem till unika strängar. Detta visar att både Safesprings och den andra europeiska molnleverantörens instanser medverkar i hanteringen av webbförfrågningar.

### Skala upp (och ned)

Med en sådan här uppsättning är det enda vi behöver för att skala lösningen att ändra några count-parametrar och köra `terraform apply` samt köra om samma Ansible-playbook när inventariet ändras. För att göra detta kan vi skapa en variabelfil (`terraform.tfvars`) med följande innehåll.
```hcl
count_psnc=2
count_safespring=3
```
Efter att ha tillämpat detta och kört Ansible-playbooken igen ger vårt test med `curl` följande resultat.
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
## Sammanfattning

### Att utnyttja kraften i infrastruktur som kod

Sammanfattningsvis ligger styrkan i infrastruktur som kod (IAC) i dess förmåga att sömlöst skala webbapplikationer över flera OpenStack‑platser. Genom att utnyttja verktyg som Terraform och Ansible kan vi automatisera provisioneringen av infrastruktur respektive systemkonfiguration. Integrationen av dessa verktyg med DNS round-robin för lastbalansering gör att vi kan skapa en dynamisk och skalbar lösning för webbtjänster.

### Förbättra skalbarhet och resiliens

Även om den här guiden presenterade en enkel implementation går det att införa mer sofistikerade element såsom mekanismer för service discovery och hälsokontroller för ytterligare optimering. I slutänden kan dessa metoder användas för att provisionera och skala Kubernetes‑kluster, med stöd för kontinuerlig leverans och andra molnnativa funktioner.

### Avslutande tankar

Allteftersom vi fortsätter utforska möjligheterna med IAC hoppas vi att den här guiden fungerar som ett värdefullt steg på vägen mot att bygga skalbara, resilienta och effektiva webbtjänster.

{{% note "Läs mer" %}}
Om du tyckte att det här inlägget var användbart, ta gärna en titt på resten av serien om att använda Terraform och Ansible för resursprovisionering och efterlevnad. Särskilt kanske du också uppskattar:

-- [Enkel provisionering med Safesprings Terraform‑moduler](/blogg/2022-01-terraform-modules)  
-- [Flexibel provisionering av resurser med Safesprings nya Terraform‑moduler](/blogg/2022-03-terraform-module)  
-- [Integrering av Terraform och ansible för effektiv resurshantering](/blogg/2022-05-terraform-ansible)  
-- [Från noll till kontinuerlig efterlevnad med Terraform, ansible och Rudder](/blogg/2022-06-terraform-ansible-rudder)

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