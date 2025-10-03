---
ai: true
title: "Fleksibel provisionering af ressourcer med Safesprings nye Terraform-moduler"
date: "2022-04-11"
intro: "Fra grundlæggende til mere avanceret og effektiv anvendelse af Safesprings Terraform-moduler"
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
  - /blogg/2022-03-terraform-module
  - /blogg/2022/2022-03-terraform-module/
---
{{< ingress >}}
Dette er del to i serien om Safesprings Terraform-moduler. Dette blogindlæg ser på de nye og mere generelle Safespring-moduler til compute-instanser og sikkerhedsgrupper.{{< /ingress >}}

Vi ser også på, hvordan vi kan bruge det til at provisionere sæt af instanser i forskellige konfigurationer, der kun tillader de nødvendige forbindelser ved hjælp af sikkerhedsgrupper. Det næste indlæg vil handle om at bruge Ansible og Terraform/OpenStack til at konfigurere tjenester på de oprettede instanser.

{{% note "Læs mere" %}}
Hvis du fandt dette indlæg nyttigt, så husk at tjekke resten af serien om brug af Terraform og Ansible til resource provisioning og compliance. Du vil især måske også synes om:

1. [Supernem provisionering med Safesprings Terraform-moduler](/blogg/2022-01-terraform-modules)
2. [Fleksibel provisionering af ressourcer med Safesprings nye Terraform-moduler](/blogg/2022-03-terraform-module)
3. [Integration af Terraform og Ansible for effektiv ressourcehåndtering](/blogg/2022-05-terraform-ansible)
4. [Fra nul til kontinuerlig compliance med Terraform, Ansible og Rudder](/blogg/2022-06-terraform-ansible-rudder)

{{% /note %}}

## Forudsætninger

Dette blogindlæg forudsætter, at du bruger den open source Terraform CLI. Terraform CLI er blot et binært program, som du downloader fra [udgivelsessiden][tfreleases] til din arkitektur/platform. Her finder du også kontrolsummer for filerne til at verificere deres integritet.

Medmindre andet forklares, forudsætter alle eksempler, at du lægger koden i en `.tf` i en separat mappe og kører `plan`, `init`, `apply` og `destroy` fra den pågældende mappe. `main.tf` bruges mest som en konvention for filnavn, men du kan kalde den, hvad du vil, så længe den slutter på `.tf`

Der findes også den officielle [Terraform-dokumentation][tfdocs]

## Introduktion til Terraform

Terraform tager tekstfiler med «HCL - Hashicorp Configuration Language» som input og leverer servere og storage som output. HCL er et deklarativt sprog, dvs. det angiver ikke handlinger, der skal udføres, men snarere en ønsket tilstand – eller et ønsket udfald.

Tanken om, at konfigurationssprog skal være deklarative, og at agenten skal drive/konvergere den virkelige tilstand til den deklarerede ønskede tilstand, er blevet bredt accepteret over de sidste tre årtier og bygger på idéer og forskning af [Mark Burgess i begyndelsen af halvfemserne og senere][mbcfengine].

### Terraform-providers

Terraforms superkraft kommer fra alle dets providers. Terraform-providers er binære udvidelser til Terraform, som – som navnet antyder – «leverer» ressourcer af forskellige slags ved at bruge API’erne hos den cloud-udbyder, som udvidelsens navn afspejler.

Disse udvidelser tager sig af alt det tunge arbejde over for cloud-udbydernes API’er og sikrer, at den faktiske tilstand (cloud-ressourcerne) konvergeres til det, der er angivet som den ønskede tilstand.

Terraform kan betragtes som en konfigurationsagent for ønsket tilstand for infrastruktur. Hver gang det køres, vil det omsætte den ønskede tilstand til den faktiske tilstand for cloud-ressourcer.

### Reducering af graden af «lock-in»

Terraform har masser af gennemtestede providers klar til brug og gør det dermed lettere at provisionere cloud-ressourcer fra alle mulige cloud-API’er i samme (eller forskellige) konfigurationer.

Lad os sige, at du har brug for ressourcer i andre clouds (eller on‑premise) til de samme multi‑cloud- eller hybride miljøer. Så kan du gøre det med én Terraform-konfiguration, og du kan endda skalere antallet af ressourcer op og ned ved at ændre nogle variabler i din Terraform-kode.

Terraform er cloud-agnostisk og er dermed en glimrende forsikring for, at dine ressourcer er så portable som muligt, hvilket reducerer graden af "lock-in" til et minimum.

{{< disclaimer "Ansvarsfraskrivelse" >}}Terraform er et kraftfuldt værktøj, og kraftfulde værktøjer kan føre til alvorlige fejl ved forkert brug, så sørg for at læse dokumentation og best practices for at forstå værktøjets natur, før du bruger det til de vigtige ting.{{< /disclaimer >}}

## Det nye «v2-compute-instance»-modul

I [det forrige blogindlæg][firstblog] viste vi grundlæggende brug af den første version af Safesprings Terraform-moduler. Disse moduler er nu udfaset og erstattet af ét enkelt modul, der kan mere end de udfasede. Årsagen er, at det nye modul automatisk slår brugen af «boot from volume» til og fra baseret på, om flavor-navnet starter med et «l» eller ej. Det nye modul bruger også som standard [vores nye compute-flavors][newflavors], mens de udfasede som standard bruger de gamle, udfasede flavors. Sidst men ikke mindst kan det nye modul [modtage en map-variabel, der beskriver et sæt ekstra datadiske, som skal tilknyttes instansen][diskmap].

{{< note "Bemærk" >}}Modulbiblioteket udvikler sig konstant, så dette blogindlæg forklarer de funktioner, der er tilgængelige lige nu, og hvordan de bruges. Se også på koden, kommentarerne og variabledefinitionerne for at få det fulde billede – især på et senere tidspunkt. {{< /note >}}

## Eksempler

Vi bruger [eksemplerne][sftfexamples] i Terraform-modulets [git-repo][sftfmodules] som reference og forklarer dem hver især under koden.

### [Eksempel 1][ex1]: Én instans med standardparametre

[ex1]: https://github.com/safespring-community/terraform-modules/blob/main/examples/v2-compute-instance/main.tf
```
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
Dette er det enklest mulige eksempel, der kun bruger modulkilden på GitHub og et allerede eksisterende nøglepar. Alle andre værdier er standard. De kommenterede linjer dokumenterer indholdet af standardværdierne. For at tilsidesætte en standard skal du blot fjerne kommenteringen og ændre værdien.

Når den anvendes, vil denne kode oprette en compute-instans med navnet hello-safespring, operativsystemet Ubuntu 20.04, fra en flavor med lokal disk, 2 vCPU'er og 4 GB RAM. Den vil blive tilknyttet standardnetværket, som giver instansen en offentlig IPv6-adresse og en privat IPv4-adresse. Instansen vil ikke have datadiske og vil være medlem af sikkerhedsgruppen `default`, som indeholder regler, der tillader trafik fra instansen ud i verden på IPv4 og IPv6 (egress). Da flavoren er af typen lokal disk, vil parameteren disk_size blive ignoreret, og den lokale NVMe-disk, der er defineret i flavoren (100GB), vil blive brugt til Ubuntu-operativsystemet.

Parameteren `config_drive` bruges sjældent. Hvis du ikke ved, hvad den bruges til, kan du trygt lade standardværdien (false) stå. For parametrene `role` og `wg_ip` gemmer vi forklaringen til senere.

### [Eksempel 2][ex2]: Et sæt på 3 instanser ved hjælp af count

[ex2]: https://github.com/safespring-community/terraform-modules/blob/main/examples/v2-compute-instance-set-with-count/main.tf
```
module my_sf_instances {
   count           = 3
   source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
   name            = "hello-safespring-${count.index + 1}.example.com"
   key_pair_name   = "an-existing-keypair"
}
```
Her har vi tilføjet en count på 3, og vi bruger count-indekset til at skelne mellem navnene på de 3 oprettede instanser (du kan ikke oprette mere end én instans med samme navn). At anvende dette vil give 3 instanser med navnene `hello-safespring-{1,2,3}.example.com`. Kommenterede standardparametre blev forklaret i det første eksempel, så de er udeladt her. Som i det første eksempel bruges standardværdier, hvor der ikke er angivet noget, så alle 3 instanser får de samme egenskaber, og disse egenskaber er de samme standardværdier som i det første eksempel.

### [Eksempel 3][ex3]: Sikkerhedsgruppe(r) og nøglepar som en del af koden

[ex3]: https://github.com/safespring-community/terraform-modules/blob/main/examples/v2-compute-instance-set-with-keypair-and-secgroup/main.tf
```
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
Nu har vi tilføjet kode til at oprette nøgleparret `hello-pubkey` og sikkerhedsgruppen `puff`. Disse navne bruges til at navngive objekterne i OpenStack. Der er også de interne Terraform-navne, som kun bruges til at referere frem og tilbage i Terraform-koden/-staten. Sidstnævnte bruges til at referere til navnene på nøgleparret og sikkerhedsgruppen i definitionen af instanserne.

Resultatet af denne konfiguration bliver de samme 3 instanser som i det forrige eksempel, bortset fra at de ikke er medlem af standard-sikkerhedsgruppen, men i stedet af sikkerhedsgruppen `puff`, som vi oprettede med ingress-regler for `ssh` og `https`.

Derudover har vi oprettet vores eget nøglepar (offentlig nøgle), som vores instanser får i deres cloud-brugeres `authorized_keys`-fil. Denne kode tager den lokale (der hvor Terraform køres) fil `~/.ssh/id_rsa.pub` og opretter et OpenStack-nøglepar ud fra den. For detaljer om ssh-nøgler i OpenStack, se venligst [et andet blogindlæg om emnet][sshblog]

I denne konfiguration har vi blandet oprettelse af ressourcer direkte i konfigurationen og via eksterne moduler. Det er helt fint; nogle gange er ressourcerne så simple, at det ikke giver mening at lave en abstraktion (modul) for dem. OpenStack-nøglepar er et glimrende eksempel på en sådan ressource.

Specifikationen af reglerne for sikkerhedsgrupper sker med map-variabler direkte i instantiationen af sikkerhedsgruppe-modulet, et map of maps «one» og «two». Disse kan erstattes med «locals» eller endda variabledefinitioner, der kan bruges som parametre, hvis du bruger denne kode som et modul.

Det er helt op til dig, om du vil bruge vores modulbibliotek, oprette dine egne moduler eller blot oprette ressourcerne direkte i din konfiguration. Som minimum kan modulbiblioteket, med sine standardværdier, fungere som dokumentation eller som et tyndt lag (wrapper) omkring ressourcerne og navnene i vores platform set fra et Terraform-perspektiv.

### [Eksempel 4][ex4]: Maps definerer instanser og regler for sikkerhedsgrupper

[ex4]: https://github.com/safespring-community/terraform-modules/blob/main/examples/v2-compute-instance-set-using-map/main.tf
```
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
Her itererer vi over et lokalt map af maps, der definerer alle aspekter af de instanser, der skal oprettes (se linjen `for_each = local.instances`). Derefter tilsidesætter vi standarderne i `v2-compute-instance`-modulet ved at bruge de enkelte felter i hvert map (i `instances`-mappet) og opretter dermed 3 instanser med forskellige egenskaber.

Instanserne `websrv{1,2}.example.com` oprettes ud fra et `centos-7`-image, tilsluttet det offentlige netværk (derfor får de offentlige IP-adresser). De er også tilknyttet både sikkerhedsgrupperne `ingress` og `interconnect`, hvilket betyder, at summen/unionen af alle regler i disse sikkerhedsgrupper gælder for dem.

Sikkerhedsgruppen `interconnect` har regler, der åbner fuld forbindelse mellem alle medlemmer af gruppen, men intet andet. Sikkerhedsgruppen `ingress` åbner port `tcp/443` fra verden til alle dens medlemmer.

Da `db`-serveren er det eneste medlem af sikkerhedsgruppen `interconnect`, kan `websrv{1,2}`-serverne forbinde til den (og omvendt), men `db`-serveren kan ikke nås fra andre steder, både fordi den er tilsluttet `default`-netværket, som er et privat (RFC1918) netværk, og på grund af reglerne i sikkerhedsgruppen `ingress` (som kun tillader medlemmer af samme gruppe at forbinde). Hvis du undrer dig over, hvorfor webserverne på `public`-netværket kan forbinde til db-serveren på `default`-netværket med kun ét interface på hver af dem, [så læs dette blogindlæg om Safesprings netværksstack.][netblog]

Det er værd at bemærke, at parameteren `delete_default_rules = true` fjerner standard-egress-reglerne, der tillader adgang til verden over IPv4 og IPv6, og giver dig dermed fuld kontrol over, hvilken trafik der tillades. Dette vil i praksis blokere alle forsøg fra servere på at initiere udgående forbindelser og kan bruges som effektiv forebyggelse af [fase 2-downloads af eksekverbar kode under et angreb og dermed [forhindre angriberes etablering af command and control (COC))][coc]. Derefter kan du kun lave de nødvendige huller til legitime udgående forbindelser til software-repositorier osv. Dette er også relevant for servere på `default`-netværket både via IPv6 og NAT'et IPv4.

{{< note "Bemærk" >}}Hvis du opretter en instans, der ikke har nogen sikkerhedsgrupper tilknyttet, vil den stadig blive tilknyttet `default`-sikkerhedsgruppen, som indeholder egress-regler, der tillader instansen at forbinde til verden. For at forhindre dette skal du oprette dine egne sikkerhedsgrupper, som du knytter instanser til, og bruge parameteren «delete_default_rules = true» til «v2-compute-security-group»-modulet.{{< /note >}}

### [Eksempel 5][ex5]: Kombination af count og map til instanser og map til diske

[ex5]: https://github.com/safespring-community/terraform-modules/tree/main/examples/v2-compute-instance-set-with-count-and-map

Det ville være rart, hvis du kunne kombinere iteration med `for_each` (map) og count, ikke? På den måde kunne du sige: «Giv mig 10 webservere uden datadisk på det offentlige netværk med flavor X, og 2 backend-servere på default-netværket med en 100GB datadisk». Men hvis du forsøger at kombinere dem i det samme kald til `v2-compute-instance`, får du en fejl, der siger:
```
The "count" and "for_each" meta-arguments are mutually-exclusive, only one
should be used to be explicit about the number of resources to be created.
```
Det kan dog gøres ved at indkapsle en af dem i sit eget modul.
Lad os sige, at vi opretter følgende lokale modul i en mappe med navnet
`./a-set-of-instances`:

`main.tf`
```
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
`variables.tf`
```
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
`providers.tf`
```
terraform {
  required_version = ">= 0.14.0"
    required_providers {
      openstack = {
      source  = "terraform-provider-openstack/openstack"
    }
  }
}
```
Og så denne kode i vores `main.tf`:
```
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
Så først oprettede vi et modul, der brugte vores `v2-compute-instance` som kilde med de nødvendige variabeldefinitioner for de værdier, vi har tænkt os at tilsidesætte standarderne for, samt parameteren `i_count`, som definerer antalsværdien for hvert sæt.

Derefter kalder vi vores lokale modul, som nu understøtter en `i_count`-parameter, og itererer over et map, der har alle de nødvendige standardoverstyringer for hvert sæt og antallet for hvert sæt. Så i stedet for at kopiere to identiske map-indgange og kun variere navnet kan vi generere navnet ud fra et præfiks og tælleindekset i det lokale modul; dermed kan vi med én map-indgang oprette et sæt af så mange instanser, vi ønsker, med de samme egenskaber. Hvis vi har brug for andre egenskaber, opretter vi et andet sæt med sine egne parametre og `i_count`. Navngivningen af parameteren `i_count` er valgt, så den ikke kolliderer med den interne, reserverede parameter `count`.

Her har vi altså kombineret metoderne fra eksemplerne 2 og 4 for at lave det samme som i eksempel 4, men på en mere generisk måde, der kan skalere sæt op uden at duplikere en masse map-indgange. For at skalere antallet af webservere øger du nu blot feltet `i_count` i map-indgangen for webservere i stedet for at oprette lige så mange nye map-indgange, som der er brug for nye servere.

Derudover har vi defineret et andet map inde i map-indgangen for `db`-instansen, som vil oprette og tilknytte et volumen af typen `fast` og størrelsen 5GB.

[try-funktionen][tftry] bruges til at give det lokale modul de obligatoriske fallback-parametre, når forskellige map-indgange har behov for at tilsidesætte forskellige sæts parametre i `v2_compute_instance`. Det lokale modul skal have variabler for sum/union af alle parametre, der skal angives.

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