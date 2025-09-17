---
ai: true
title: "Integrera Terraform med Ansible"
date: "2022-05-23"
intro: "Från noll till tjänst med Terraform och Ansible tillsammans"
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
  - /blogg/2022-05-terraform-ansible
  - /blogg/2022/2022-05-terraform-ansible/
---
{{< ingress >}}
Detta är del tre i serien om Safesprings Terraform-moduler. Den här bloggposten
tittar på hur vi kan integrera Ansible och Terraform för att konfigurera
tjänster ovanpå de instanser som tillhandahålls med Terraform, genom att använda Terraform state som
Ansible-inventory.
{{< /ingress >}}

{{% note "Läs mer" %}}
Om du tyckte att den här posten var användbar, kolla gärna in resten av serien om att använda Terraform och Ansible för resursprovisionering och regelefterlevnad. I synnerhet kanske du också gillar:

1. [Busenkel provisionering med Safesprings Terraform-moduler](/blogg/2022-01-terraform-modules)
2. [Flexibel provisionering av resurser med Safesprings nya Terraform-moduler](/blogg/2022-03-terraform-module)
3. [Integrera Terraform och ansible för effektiv resurshantering](/blogg/2022-05-terraform-ansible)
4. [Från noll till kontinuerlig compliance med Terraform, ansible och Rudder](/blogg/2022-06-terraform-ansible-rudder)

{{% /note %}}

## Förutsättningar

Den här bloggposten utgår från att du använder den öppna källkodsversionen av Terraform CLI. Terraform CLI
är bara ett binärt program som du laddar ner från [releases-sidan][tfreleases]
för din arkitektur/plattform. Här hittar du också checksummor för filerna för att
verifiera deras integritet.

Om inget annat anges förutsätter alla exempel att du lägger koden
i en `.tf` i en separat katalog och kör `plan`, `init`, `apply` och `destroy`
inifrån den katalogen. `main.tf` används mest som en konvention för filnamnet,
men du kan döpa den till vad du vill så länge den slutar på `.tf`.

Det finns också den officiella [Terraform-dokumentationen][tfdocs].

En grundläggande förståelse för Ansible-playbooks och inventories är också nödvändig.

## Introduktion till Terraform

Terraform tar klartextfiler med «HCL - Hashicorp Configuration Language»
som indata och levererar servrar och lagring som utdata. HCL är ett deklarativt
språk, dvs. det anger inte vilka åtgärder som ska vidtas utan ett önskat
tillstånd – eller utfall.

Idén att konfigurationsspråk bör vara deklarativa, och att
agenten ska driva/konvergera det verkliga tillståndet mot det deklarerade önskade tillståndet, har
blivit allmänt accepterad under de senaste tre decennierna och bygger på idéer och
forskning av [Mark Burgess under tidigt nittiotal och senare][mbcfengine].

### Terraform-providers

Terraforms superkraft kommer från alla dess providers. Terraform-
providers är binära tillägg till Terraform som, vilket namnet antyder,
«tillhandahåller» resurser av olika slag via API:erna hos den molnleverantör
som återspeglas av tilläggets namn.

Dessa tillägg gör det tunga lyftet mot molnleverantörernas API:er och
säkerställer att det faktiska tillståndet (molnresurserna) konvergeras till det som
är specificerat som det önskade tillståndet.

Terraform kan ses som en agent för önskat tillstånd av
infrastruktur. Varje gång det körs omvandlar det det önskade tillståndet till det
faktiska tillståndet för molnresurser.

### Minska graden av «inlåsning»

Terraform har mängder av väl beprövade providers att använda, vilket underlättar
provisioneringen av molnresurser från alla möjliga moln-API:er inom
samma (eller olika) konfigurationer.

Säg att du behöver resurser i andra moln (eller on-premise) för samma
multi‑cloud- eller hybridmiljöer. Då kan du göra det med en enda Terraform-
konfiguration, och du kan till och med skala upp och ner antalet resurser genom att ändra
några variabler i din Terraform-kod.

Terraform är molnagnostiskt och är därmed en utmärkt försäkring om att dina resurser
är så portabla som möjligt, vilket minimerar graden av "lock-in".

{{< disclaimer "Friskrivning" >}}Terraform är ett kraftfullt verktyg, och kraftfulla verktyg kan orsaka stora fel om de används felaktigt, så se till att läsa in dig på dokumentation
och best practices för att förstå verktygets natur innan du använder det för
det viktiga.{{< /disclaimer >}}

## Introduktion till Ansible

[Ansible][ansible] är en uppsättning verktyg för orkestrering och konfigurationshantering
främst via så kallade playbooks. Playbooks skrivs i YAML och beskriver det
önskade tillståndet för operativsystemsegenskaper som filer, tjänster, filsystem
och så vidare. Det används främst för att konfigurera Linux-baserade operativsystem över
ssh-protokollet, men kan också användas för att konfigurera Windows-operativ-
system. I den här posten visar vi hur man använder Ansible för att konfigurera tjänster på
ett Linux-baserat operativsystem (Ubuntu 20.04)

Ansible-inventories är listor över värdar, grupper av värdar och variabler för dessa
värdar och grupper. Värdar och grupper används för att tala om för Ansible var ett visst
önskat tillstånd (uppgift) är tillämpligt. När man arbetar med statiska värdar i ett
datacenter är inventories ofta också statiska textfiler som underhålls
manuellt eller semimanuellt. Inventories kan dock också vara dynamiska, dvs.
tillhandahållas av skript.

När du arbetar med OpenStack är det möjligt att använda inventory-skript som
frågar OpenStack API direkt och producerar ett komplett inventory över alla
instanser med metadata, alla gruppmedlemskap och så vidare, men ofta
tar dessa skript lång tid att köra, och de behöver i regel köras varje
gång du kör en playbook, vilket gör playbook-körningar storleksordningar mer
tidskrävande än statiska inventories. Dessutom kan de belasta
OpenStack-API:erna hårt om inventariet frågas ofta.

## Terraform och Ansible

Då måste det bli "Terrible" ;-) ? Faktiskt inte alls.

Terraform håller reda på alla objekt det provisionerar tillsammans med
deras metadata. Detta kallas "state", och lagras som standard i den lokala katalog
där Terraform körs, i en fil som heter `terraform.tfstate`. Den
föregående state-versionen säkerhetskopieras i filen `terraform.tfstate.backup`.

Detta innebär att det mesta du kan fråga API:t om, kring dina av Terraform
tillhandahållna objekt i OpenStack, också finns i den lokala Terraform-
state-filen. Om vi alltså använder ett skript som läser den lokala Terraform-
state-filen får vi hög prestanda och ingen resursförbrukning mot
OpenStack API. Det är precis det vi visar här. Det finns flera
skript/program för detta ändamål (https://duckduckgo.com är din vän),
men vi använder ett enkelt [python-skript][ati] som från början utvecklades av Cisco
Systems.

För att använda det, kopiera eller skapa en symlänk till skriptet någonstans lämpligt och
använd sökvägen som `--inventory`-alternativ till `ansible-*`-kommandon. Om du
lägger skriptet i en katalog och använder katalognamnet som `--inventory`,
kan du också kombinera informationen från det dynamiska inventory som skriptet ger
med statiska inventory-filer som ytterligare berikar eller transformerar det dynamiska
inventariet. Om du till exempel använder en Ansible-roll eller -playbook som kräver ett
specifikt värdgruppsnamn kan du använda ett statiskt inventory för att definiera en ny värdgrupp
med ett namn du själv väljer och ange en värdgrupp från det dynamiska
inventariet som `children` till gruppen du skapade, och sedan använda den gruppen med
din roll eller playbook. Vi tittar på det i ett senare exempel.

## Exempel

Vi använder koden [exempel][sftfexamples] i Terraform-modulens [git-repo][sftfmodules] som referens och förklarar var och en under koden.

### Två webbservrar med Nginx```
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
Först skapar vi två instanser på nätverket `public`, med flavorn `l2.c2r4.100` och avbilden `ubuntu-20.04`. Observera att vi anger `role=webserver`. När vi kör `terraform apply` på detta skapas instanser, nyckelpar och säkerhetsgrupper. Det finns ännu ingen webbserver installerad eller konfigurerad. Det är det vi ska använda Ansible till.

För att återanvända rollen som vi angav i Terraform-koden för instanserna behöver vi ett inventeringsskript som läser Terraform-statefil(er) och genererar ett inventory i ett format som Ansible kan använda. [Ansible Terraform Inventory-skriptet][ati] kommer att användas för detta ändamål. Vi kopierar skriptet till en katalog som heter `ati` och kör denna playbook.```
ansible-playbook -i ati example.yml
```
Innehållet i `example.yml````
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
Observera `hosts: os_metadata_role=webserver`. Det är här vi anropar den roll som vi angav i Terraform-koden. Inventeringsskriptet hittar rätt instanser och deras IP-adresser som tillhör den grupp som har rollen `webserver`, och därmed kommer playbookens uppgifter att tillämpas på dessa värdar.

Först väntar vi på att instanserna ska starta. På så sätt kan vi köra playbooken direkt efter provisioneringen (till exempel i ett skript) i stället för att vänta ett okänt antal sekunder innan instanserna är tillgängliga och redo att konfigureras av Ansible över ssh. Vi sätter `gather_facts: no` för att undvika att playbooken misslyckas innan instanserna är tillgängliga, och använder sedan `setup:` i en egen uppgift efter att vi har väntat in att instanserna blir tillgängliga.

De två följande uppgifterna installerar Nginx-paketet och skapar en `index.html` med ett välkomstmeddelande som infogar värdnamnet för respektive instans.

### En uppsättning Wireguard-klienter som använder en exit-gateway

I det här exemplet visar vi hur man kombinerar statiskt och dynamiskt inventory för att koppla ihop gruppnamn som en Ansible-roll förväntar sig med gruppnamn som tillhandahålls av OpenStack-metadata-rollen i Terraform-state.

Den praktiska poängen med exemplet är också att visa en automatiserad installation av Wireguard på en uppsättning klienter för att dirigera deras trafik genom en gateway. Detta kan vara användbart om klienter behöver komma åt en extern tjänst med en stabil källadress, till exempel om den externa tjänsten använder IP-baserade ACL:er.```
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
Här deklarerar vi ett nyckelpar (offentlig nyckel), två säkerhetsgrupper, en Wireguard-gatewayinstans och en uppsättning med 2 Wireguard-klientinstanser. Säkerhetsgruppen `ingress` tillåter åtkomst från världen på IPv4 till port 22/tcp (ssh), säkerhetsgruppen `interconnect` säkerställer full IPv4-anslutning mellan alla instanser som ingår i gruppen. Både gatewayinstansen och uppsättningen av klientinstanser ingår i båda dessa säkerhetsgrupper; de ingår också i den redan befintliga standardsäkerhetsgruppen för att tillåta utgående trafik till omvärlden.

Vi lade också till en ny parameter i Safesprings compute-instansmodul, nämligen parametern `wg_ip`. Syftet med denna parameter är att allokera Wireguard-overlays IP-plan som metadata när instanserna skapas. Senare ska vi se hur denna metadata kan hittas och återanvändas som variabler i Ansible-inventoryn, och därmed undvika all manuell konfiguration.

Vi tilldelar Wireguard-IP-adressen för gatewayinstansen till den första adressen i intervallet `192.168.45.0/24`, och sedan tilldelar vi klienternas adresser till den andra, tredje och så vidare genom att använda funktionen `cidrhost("192.168.45.0/24",count.index + 2)`. Count-indexet börjar på 0 och dokumentation för Terraform-funktionen `cidrhost()` finns i [Terraform-dokumentationen][tfdocs]

Och nu över till Ansible. Vi skapade en inventory-katalog med följande innehåll:```
$ ls -l inventory
total 4
-rw-rw-r-- 1 jarle jarle 241 May 25 13:36 hosts
lrwxrwxrwx 1 jarle jarle  22 May 25 13:32 _terraform.py -> ../../ati/terraform.py
```
Filen `_terraform.py` är en symbolisk länk till det dynamiska inventory-skriptet. Anledningen till att den börjar med ett understreck är att det som definieras i den statiska inventoryn (filen `hosts `) hänvisar till sådant som produceras av den dynamiska inventoryn. Filer i inventory-katalogen bearbetas i alfabetisk ordning, därför måste den dynamiska inventoryn bearbetas före den statiska; annars finns de refererade undergrupperna i den statiska inventoryn ännu inte när den bearbetas.

Innehållet i filen `hosts`:```
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
Så här definierar vi de värdgrupper som Wireguard-rollen förväntar sig, nämligen
`wireguard_gateway` och `wireguard_clients`, och fyller dem med undergrupperna
från de respektive grupperna i det dynamiska inventoryt, nämligen
`os_metadata_role=wg_gw` och `os_metadata_role=wg_client`.
Dessutom definierar vi de statiska variablerna `wireguard_forward_interface` och
`wireguard_connect_interface`

Playbooken ser ut så här:```
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
Först kör vi ett play som tillämpar Wireguard-rollen på Wireguard-gatewayn och sedan kör vi ytterligare ett play som tillämpar samma roll på Wireguard-klienter. Detta eftersom klienterna behöver information som skapades av playet för gatewayn. Att värdvariabeln `wireguard_address` fylls i förväntas av rollen utifrån värdet `{{metadata.wg_ip}}`, som kommer från det dynamiska inventory-skriptet och pekar tillbaka på `wg_ip` som definierades i Terraform.

Sedan kör vi playbooken med det blandade statiska och dynamiska inventoryt:```
ansible-playbook -i inventory wg.yml
```
Detta kommer att installera Wireguard och konfigurera klienter att dirigera all trafik via
Wireguard-gatewayn över det Wireguard-krypterade överlagringsnätverket. Så här:```
$ openstack server list |grep wire
| 666bc025-3c86-4bc8-9278-66600a49f522 | wireguard-client-2.example.com | ACTIVE | public=185.189.29.84, 2a0a:bcc0:40::40c  | ubuntu-20.04                   | l2.c2r4.100 |
| 9c260891-954b-418c-9be5-aff2b8482164 | wireguard-gw.example.com       | ACTIVE | public=185.189.28.40, 2a0a:bcc0:40::d3   | ubuntu-20.04                   | l2.c2r4.100 |
| f3f361c3-19f8-45dd-887e-ca2dd7fa98f2 | wireguard-client-1.example.com | ACTIVE | public=185.189.29.118, 2a0a:bcc0:40::326 | ubuntu-20.04                   | l2.c2r4.100 |
```
Gatewayns IP-adress är `185.189.28.40`. Om vi loggar in på klienterna
och frågar vad som är vår källadress sedd från Internet.```
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