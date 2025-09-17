---
ai: true
title: "Flexibel provisionering av resurser med Safesprings nya Terraform-moduler"
date: "2022-04-11"
intro: "Från grundläggande till mer avancerad/kraftfull användning av Safesprings Terraform-moduler"
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknisk uppdatering"
author: "Jarle Bjørgeengen"
language: "sv"
toc: "Innehållsförteckning"
aliases:
  - /blogg/2022-03-terraform-module
  - /blogg/2022/2022-03-terraform-module/
---
{{< ingress >}}
Detta är del två i serien om Safesprings Terraform‑moduler. Detta blogginlägg
kommer att titta på de nya och mer generella Safespring‑modulerna för compute‑instanser
och säkerhetsgrupper.{{< /ingress >}}

Vi kommer också att titta på hur vi kan använda dem för att provisionera
uppsättningar av instanser i olika konfigurationer där endast nödvändiga
anslutningar tillåts via säkerhetsgrupper. Nästa inlägg kommer att handla om
att använda Ansible och Terraform/OpenStack för att konfigurera tjänster på de
provisionerade instanserna.

{{% note "Läs mer" %}}
Om du tyckte att detta inlägg var användbart, se till att kolla in resten av serien om att använda Terraform och Ansible för resursprovisionering och efterlevnad. Särskilt kanske du också uppskattar:

1. [Busenkel provisionering med Safesprings Terraform‑moduler](/blogg/2022-01-terraform-modules)
2. [Flexibel provisionering av resurser med Safesprings nya Terraform‑moduler](/blogg/2022-03-terraform-module)
3. [Integrera Terraform och Ansible för effektiv resurshantering](/blogg/2022-05-terraform-ansible)
4. [Från noll till kontinuerlig efterlevnad med Terraform, Ansible och Rudder](/blogg/2022-06-terraform-ansible-rudder)

{{% /note %}}

## Förutsättningar

Detta blogginlägg förutsätter att du använder den öppna Terraform CLI. Terraform CLI
är bara ett binärprogram som du laddar ner från [releases-sidan][tfreleases]
för din arkitektur/plattform. Här hittar du också kontrollsummor för filerna för att
verifiera deras integritet.

Om inget annat förklaras förutsätter alla exempel att du lägger koden
i en `.tf` i en separat katalog och kör `plan`, `init`, `apply` och `destroy`
från den katalogen. `main.tf` används mest som en konvention för fil-
namn, men du kan kalla den vad du vill så länge den slutar på `.tf`.

Det finns också den officiella [Terraform‑dokumentationen][tfdocs]

## Introduktion till Terraform

Terraform tar vanliga textfiler med ”HCL – HashiCorp Configuration Language”
som indata och levererar servrar och lagring som utdata. HCL är ett deklarativt
språk, dvs det anger inte vilka åtgärder som ska utföras utan snarare ett önskat
tillstånd – eller resultat.

Tanken att konfigurationsspråk ska vara deklarativa, och att
agenten ska driva/konvergera verkligt tillstånd till det deklarerade önskade tillståndet, har
blivit allmänt accepterad under de senaste tre decennierna och bygger på idéer och
forskning av [Mark Burgess under tidigt 90‑tal och senare][mbcfengine].

### Terraform‑providers

Superkraften i Terraform kommer från alla dess providers. Terraform‑providers
är binära tillägg till Terraform som, precis som namnet antyder,
”tillhandahåller” resurser av olika slag via API:erna hos den molnleverantör som
reflekteras av tilläggets namn.

Dessa tillägg gör allt tungt lyft för molnleverantörernas API:er och
säkerställer att det faktiska tillståndet (molnresurserna) konvergeras till det som
angivits som önskat tillstånd.

Terraform kan ses som en konfigurationsagent för önskat tillstånd av
infrastruktur. Varje gång det körs omvandlar det det önskade tillståndet till det
faktiska tillståndet för molnresurser.

### Minska graden av ”inlåsning”

Terraform har mängder av beprövade providers att använda, vilket underlättar
provisionering av molnresurser från alla möjliga moln‑API:er inom samma (eller
olika) konfigurationer.

Anta att du behöver resurser i andra moln (eller on‑prem) för samma
multicloud‑ eller hybrida miljöer. Då kan du göra det med en Terraform‑
konfiguration, och du kan till och med skala upp och ner antalet resurser genom att
ändra några variabler i din Terraform‑kod.

Terraform är molnagnostiskt och utgör därmed en utmärkt försäkring om att dina resurser är så portabla som möjligt, vilket minskar graden av ”inlåsning” till ett minimum.

{{< disclaimer "Ansvarsfriskrivning" >}}Terraform är ett kraftfullt verktyg, och kraftfulla verktyg kan orsaka
kraftfulla fel om de används fel, så se till att läsa på dokumentation
och bästa praxis för att förstå verktygets natur innan du använder det för
det viktiga.{{< /disclaimer >}}

## Den nya modulen ”v2-compute-instance”

I [det förra blogginlägget][firstblog] visade vi grundläggande användning av den
första versionen av Safesprings Terraform‑moduler. Dessa moduler är nu utfasade
och ersatta av en enda modul som gör mer än de utfasade. Skälet är att den nya
modulen automatiskt slår på och av användning av ”boot from volume” baserat på
om flavor‑namnet börjar med ett ”l” eller inte. Den nya modulen använder också som
standard [våra nya compute‑flavors][newflavors], medan de utfasade hade de gamla
utfasade flavors som standard. Sist men inte minst kan den nya modulen
[ta emot en map‑variabel som beskriver en uppsättning extra datadiskar som ska
fästas vid instansen][diskmap].

{{< note "Observera" >}}Modulbiblioteket utvecklas ständigt, så detta blogginlägg
förklarar de funktioner som för närvarande finns och hur de används. Titta också på
koden, kommentarerna och variabeldefinitionerna för att få hela bilden.
Särskilt vid en senare tidpunkt. {{< /note >}}

## Exempel

Vi använder koden [exempel][sftfexamples] i Terraform‑modulens [git‑repo][sftfmodules]
som referens och förklarar var och en under koden.

### [Ex1][ex1]: En instans med standardparametrar

[ex1]: https://github.com/safespring-community/terraform-modules/blob/main/examples/v2-compute-instance/main.tf```
module my_sf_instance {
   source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
   # name          = "hello-safespring"
   key_pair_name   = "an-existing-keypair"
   # config_drive  = false
   # disk_size     = 5                 # When using b2-flavors
   # network       = "default"         # One of default, private, public
   # wg_ip         = ""                # Ends up as metadata. Can be used to assign wireguard address for us in Ansible.
   # role          = "general"         # Ends up as metadata. Can be for example be used as ansible host group with Ansible Terraform Inventory (ATI)
   # image         = "ubuntu-20.04"
   # flavor        = "l2.c2r4.100"     # Use openstack flavor list. Pick flavors starting with b2 or l2
   # security_groups = ["default"]
   # data_disks = {
   #   "db" = {
   #     size    = 5
   #     type    = "fast"
   #   }
   #   "archive" = {
   #      size = 10
   #      type = "large"
   #   }
   # }
}
```
Detta är det enklaste möjliga exemplet som endast använder modulens källkod på GitHub och ett befintligt nyckelpar. Alla andra värden är standard. De kommenterade raderna dokumenterar innehållet i standardvärdena. För att skriva över ett standardvärde, avkommentera och ändra värdet.

Vid tillämpning kommer denna kod att skapa en compute-instans med namnet hello-safespring, operativsystemet ubuntu 20.04, från en flavor med lokal disk, 2 vCPU:er och 4 GB RAM. Den kopplas till standardnätverket, vilket ger instansen en publik IPv6-adress och en privat IPv4-adress. Instansen kommer inte att ha några datadiskar och kommer att vara medlem i säkerhetsgruppen `default`, som innehåller regler som tillåter trafik från instansen ut mot internet på IPv4 och IPv6 (egress). Eftersom flavor:en är av typen lokal disk kommer parametern disk_size att ignoreras, och den lokala NVMe-disken som definieras i flavor:en (100 GB) kommer att användas för Ubuntu-operativsystemet.

Parametern `config_drive` används sällan. Om du inte vet vad den används till kan du lugnt låta standardvärdet (false) vara kvar. För parametrarna `role` och `wg_ip` väntar vi med förklaringen till senare.

### [Ex2][ex2]: En uppsättning med 3 instanser som använder count

[ex2]: https://github.com/safespring-community/terraform-modules/blob/main/examples/v2-compute-instance-set-with-count/main.tf```
module my_sf_instances {
   count           = 3
   source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
   name            = "hello-safespring-${count.index + 1}.example.com"
   key_pair_name   = "an-existing-keypair"
}
```
Här har vi lagt till ett count på 3 och använder count-indexet för att särskilja namnen på de 3 instanser som skapas (du kan inte skapa mer än en instans med samma namn). Att tillämpa detta ger 3 instanser med namnen `hello-safespring-{1,2,3}.example.com`. Kommenterade standardparametrar förklarades i det första exemplet, så de utelämnas här. Som i det första exemplet används standardvärden där inget anges, så alla 3 instanser får samma egenskaper, och dessa egenskaper är samma standardvärden som i det första exemplet.

### [Ex3][ex3]: Säkerhetsgrupp(er) och nyckelpar som del av koden

[ex3]: https://github.com/safespring-community/terraform-modules/blob/main/examples/v2-compute-instance-set-with-keypair-and-secgroup/main.tf```
# This is needed when creating resources directly. When using modules
# the modules will have this included.
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

# Create a security group using a safespring module
module puff {
   source = "github.com/safespring-community/terraform-modules/v2-compute-security-group"
   name = "bowl-of-petunias"
   description = "Oh no! Not again"
   rules = {
     one = {
       ip_protocol = "tcp"
       to_port = "22"
       from_port = "22"
       ethertype = "IPv4"
       cidr = "0.0.0.0/0"
     }
     two = {
       ip_protocol = "tcp"
       to_port = "443"
       from_port = "443"
       ethertype = "IPv4"
       cidr = "0.0.0.0/0"
     }
  }
}

module my_sf_instances {
   source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
   name            = "hello-safespring-${count.index + 1}.example.com"
   count           = 3
   security_groups = [ module.puff.name ]
   key_pair_name   = openstack_compute_keypair_v2.skp.name
}
```
Nu har vi lagt till kod för att skapa nyckelparet `hello-pubkey` och säkerhetsgruppen `puff`. Dessa namn används för att namnge objekten i OpenStack. Det finns också Terraform-interna namn som bara används för referenser fram och tillbaka i Terraform-kod och -state. Det sistnämnda används för att referera till namnen på nyckelparet och säkerhetsgruppen i instansernas definition.

Resultatet av denna konfiguration blir samma tre instanser som i föregående exempel, förutom att de inte kommer att tillhöra standard-säkerhetsgruppen utan i stället säkerhetsgruppen `puff` som vi skapade med ingressregler för `ssh` och `https`.

Vi har också skapat ett eget nyckelpar (publik nyckel) som våra instanser får i molnanvändarnas fil `authorized_keys`. Koden tar den lokala (där Terraform körs) filen `~/.ssh/id_rsa.pub` och skapar ett OpenStack-nyckelpar av den. För detaljer om ssh-nycklar i OpenStack, besök [ett annat blogginlägg om det][sshblog]

I den här konfigurationen har vi blandat att skapa resurser direkt i konfigurationen och via externa moduler. Det är helt okej; ibland är resurserna så enkla att det inte är meningsfullt att skapa en abstraktion (modul) för dem. OpenStack-nyckelpar är ett utmärkt exempel på en sådan resurs.

Specifikationen av reglerna för säkerhetsgruppen görs med map-variabler direkt i instansieringen av säkerhetsgruppsmodulen, en map av mappar «one» och «two». Dessa kan ersättas med «locals» eller till och med variabeldefinitioner som kan användas som parametrar om du använder den här koden som en modul.

Det är helt upp till dig om du vill använda vårt modulbibliotek, skapa egna moduler eller bara skapa resurserna direkt i din konfiguration. Åtminstone kan modulbiblioteket, med sina standardvärden, fungera som dokumentation eller en tunn wrapper runt resurserna och namnen i vår plattform ur ett Terraform-perspektiv.

### [Ex4][ex4]: Mappar definierar instanser och regler för säkerhetsgrupper

[ex4]: https://github.com/safespring-community/terraform-modules/blob/main/examples/v2-compute-instance-set-using-map/main.tf```
module ingress {
   source = "github.com/safespring-community/terraform-modules/v2-compute-security-group"
   name = "ingress"
   delete_default_rules = true
   description = "For exposing web servers on port 443 (https) to the world"
   rules = {
     ingress = {
       direction   = "ingress"
       ip_protocol = "tcp"
       to_port     = "443"
       from_port   = "443"
       ethertype   = "IPv4"
       cidr        = "0.0.0.0/0"
     }
  }
}

module interconnect {
   source = "github.com/safespring-community/terraform-modules/v2-compute-security-group"
   name = "interconnect"
   delete_default_rules = true
   description = "For interconnecting servers with full network access between members"
   rules = {
     ingress = {
       direction             = "ingress"
       remote_group_id = "self"
     }
     egress = {
       direction             = "egress"
       remote_group_id = "self"
     }
  }
}

locals {
  instances = {
    "web1" = {
      name    = "websrv1.example.com"
      flavor  = "l2.c2r4.100"
      os      = "centos-7"
      network = "public"
      sgs     = [ module.interconnect.name, module.ingress.name ]
    }
    "web2" = {
      name    = "websrv2.example.com"
      flavor  = "l2.c2r4.100"
      os      = "centos-7"
      network = "public"
      sgs     = [ module.interconnect.name, module.ingress.name ]
    }
    "db" = {
      name    = "db.example.com"
      flavor  = "l2.c4r8.100"
      network = "default"
      os      = "ubuntu-20.04"
      sgs     = [ module.interconnect.name ]
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
   key_pair_name   = an-existing-keypair-or-id-of-one-in-terraform-config
}
```
Här itererar vi över en lokal map av mappar som definierar alla aspekter av de instanser som ska skapas (se raden `for_each = local.instances`). Sedan åsidosätter vi standardvärdena i `v2-compute-instance`-modulen med de individuella fälten i varje map (i `instances`-mappen) och skapar därmed 3 instanser med olika egenskaper.

Instanserna `websrv{1,2}.example.com` skapas från en `centos-7`-avbild, anslutna till det publika nätet (därför får de publika IP-adresser). De är också anslutna till både säkerhetsgrupperna `ingress` och `interconnect`, vilket betyder att unionen av alla regler i dessa säkerhetsgrupper gäller för dem.

Säkerhetsgruppen `interconnect` har regler som öppnar full konnektivitet mellan alla medlemmar i gruppen, men inget annat. Säkerhetsgruppen `ingress` öppnar port `tcp/443` från världen till alla sina medlemmar.

Eftersom `db`-servern är den enda medlemmen i säkerhetsgruppen `interconnect` kan `websrv{1,2}`-servrarna ansluta till den (och vice versa), men `db`-servern kan inte nås från något annat håll, både för att den är ansluten till nätet `default`, som är ett privat (RFC1918) nät, och på grund av reglerna i säkerhetsgruppen `ingress` (som bara tillåter medlemmar i samma grupp att ansluta). Om du undrar varför webbservrarna på det `public` nätet kan ansluta till db-servern på nätet `default` med bara ett gränssnitt på var och en av dem, [läs gärna detta blogginlägg om Safesprings nätverksstack.][netblog]

Det är värt att notera att parametern `delete_default_rules = true` tar bort standardutgående regler som tillåter åtkomst till världen över IPv4 och IPv6, vilket ger dig full kontroll över vilken trafik som ska tillåtas. Detta kommer i praktiken att blockera alla försök från servrar att initiera utgående anslutningar och kan användas som effektiv prevention av [steg 2‑nedladdningar av körbar kod under en attack och därmed [förhindra angripares upprättande av command and control (COC))][coc]. Därefter kan du bara öppna de nödvändiga hålen för legitima utgående anslutningar till programvarurepositorier etc. Detta är relevant även för servrar på `default`-nätet, både via IPv6 och NAT:ad IPv4.

{{< note "Observera" >}}Om du skapar en instans som inte har några säkerhetsgrupper kopplade till sig kommer den ändå att kopplas till säkerhetsgruppen `default` som inkluderar utgående regler som tillåter instansen att ansluta ut mot världen. För att förhindra detta, skapa egna säkerhetsgrupper som du kopplar instanser till och använd parametern «delete_default_rules = true» till modulen «v2-compute-security-group».{{< /note >}}

### [Ex5][ex5]: Kombination av count och map för instanser och map för diskar

[ex5]: https://github.com/safespring-community/terraform-modules/tree/main/examples/v2-compute-instance-set-with-count-and-map

Det vore trevligt om du kunde kombinera iteration med `for_each` (map) och count, eller hur? På så sätt skulle du kunna säga: «Ge mig 10 webbservrar utan datadisk på det publika nätet med flavor X, och 2 backend-servrar på nätet default med en 100GB datadisk». Försöker du dock kombinera dem i samma anrop till `v2-compute-instance` får du ett fel som säger:```
The "count" and "for_each" meta-arguments are mutually-exclusive, only one
should be used to be explicit about the number of resources to be created.
```
Det går dock att göra genom att kapsla in en av dem i en egen modul.
Låt oss säga att vi skapar följande lokala modul i en katalog som heter
`./a-set-of-instances`:

`main.tf````
module my_sf_instances {
   source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
   name            = "${var.prefix}-${count.index + 1}.example.com"
   count           = var.i_count
   key_pair_name   = var.key_pair_name
   data_disks      = var.data_disks
   image           = var.image
   network         = var.network
   flavor          = var.flavor
}
```
`variables.tf````
variable "i_count" {
  description = "Count"
  type        = number
}

variable "flavor" {
  type        = string
}

variable "prefix" {
  type        = string
}

variable "key_pair_name" {
  type = string
}

variable "image" {
  type = string
}

variable "network" {
  type = string
}

variable "data_disks" {
  type        = map(
    object({
      type      = string
      size      = number
    })
  )
}
```
`providers.tf````
terraform {
  required_version = ">= 0.14.0"
    required_providers {
      openstack = {
      source  = "terraform-provider-openstack/openstack"
    }
  }
}
```
Och sedan den här koden i vår `main.tf`:```
locals {
  instances = {
    "web" = {
      prefix  = "web"
      flavor  = "l2.c2r4.100"
      os      = "centos-7"
      network = "public"
      i_count   = 2
    }
    "db" = {
      prefix  = "db"
      flavor  = "l2.c4r8.100"
      network = "default"
      os      = "ubuntu-20.04"
      data_disks = {
        "db" = {
          size    = 5
          type    = "fast"
        }
      }
    }
  }
}

module my_sf_instances {
   for_each        = local.instances
   source          = "./a-set-of-instances"
   prefix          = each.value.prefix
   i_count         = try(each.value.i_count,1)
   image           = each.value.os
   flavor          = each.value.flavor
   network         = each.value.network
   key_pair_name   = "jb-jump"
   data_disks      = try(each.value.data_disks,{})
}
```
Så först skapade vi en modul som använde vår `v2-compute-instance` som källa, med nödvändiga variabeldefinitioner för de värden vi avser att åsidosätta standardvärdena för samt parametern `i_count` som definierar antalvärdet för var och en.

Sedan anropar vi vår lokala modul, som nu stöder parametern `i_count`, och itererar över en map som innehåller alla nödvändiga åsidosättningar av standardvärden för varje uppsättning samt antalet för varje uppsättning. Nu kan vi alltså, i stället för att kopiera två identiska map-poster och bara variera namnet, generera namnet utifrån ett prefix och count-indexet i den lokala modulen; därmed kan vi med en enda map-post skapa en uppsättning med så många instanser vi vill med samma egenskaper. Om vi behöver andra egenskaper skapar vi en ny uppsättning med egna parametrar och `i_count`. Namnet på parametern `i_count` är valt så att den inte kolliderar med den interna, reserverade parametern `count`.

Här har vi alltså kombinerat metoderna från exemplen 2 och 4 för att göra samma sak som i exempel 4 men på ett mer generiskt sätt som kan skala upp uppsättningar utan att duplicera en massa map-poster. För att skala upp antalet webbservrar ökar du nu bara fältet `i_count` i map-posten för webbservrar i stället för att skapa lika många nya map-poster som nya servrar behövs.

Dessutom har vi definierat ännu en map inne i map-posten för `db`-instansen som skapar och kopplar en volym av typen `fast` med storlek 5 GB.

[try-funktionen][tftry] används för att ge den lokala modulen de obligatoriska reservparametrarna när olika map-poster behöver åsidosätta olika uppsättningar parametrar i `v2_compute_instance`. Den lokala modulen måste ha variabler för summan/unionen av alla parametrar som ska anges.

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