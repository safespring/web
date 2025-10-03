---
ai: true
title: "Fleksibel provisjonering av ressurser med Safesprings nye Terraform-moduler"
date: "2022-04-11"
intro: "Fra grunnleggende til mer avansert og kraftigere bruk av Safesprings Terraform-moduler"
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
  - /blogg/2022-03-terraform-module
  - /blogg/2022/2022-03-terraform-module/
---
{{< ingress >}}
Dette er del to i serien om Safesprings Terraform-moduler. Dette blogginnlegget
ser på de nye og mer generelle Safespring-modulene for compute-instanser og
sikkerhetsgrupper.{{< /ingress >}}

Vi skal også se på hvordan vi kan bruke dem til å provisjonere sett av instanser
i ulike konfigurasjoner, og kun tillate nødvendige forbindelser ved hjelp av
sikkerhetsgrupper. Neste innlegg handler om å bruke Ansible og
Terraform/OpenStack til å konfigurere tjenester på de provisjonerte
instansene.

{{% note "Les mer" %}}
Hvis du synes dette innlegget var nyttig, bør du også se resten av serien om å bruke Terraform og Ansible for provisjonering og etterlevelse. Spesielt kan du ha glede av:

1. [Superenkel provisjonering med Safesprings Terraform-moduler](/blogg/2022-01-terraform-modules)
2. [Fleksibel provisjonering av ressurser med Safesprings nye Terraform-moduler](/blogg/2022-03-terraform-module)
3. [Integrering av Terraform og Ansible for effektiv ressursforvaltning](/blogg/2022-05-terraform-ansible)
4. [Fra null til kontinuerlig etterlevelse med Terraform, Ansible og Rudder](/blogg/2022-06-terraform-ansible-rudder)

{{% /note %}}

## Forutsetninger

Dette blogginnlegget forutsetter at du bruker den åpne Terraform CLI-en. Terraform CLI
er bare et binært program som du laster ned fra [utgivelsessiden][tfreleases]
for din arkitektur/plattform. Her finner du også sjekksummer for filene for å
verifisere integriteten.

Hvis ikke annet er forklart, forutsetter alle eksemplene at du legger koden
i en `.tf` i en egen katalog og kjører `plan`, `init`, `apply` og `destroy`
fra den katalogen. `main.tf` brukes mest som en konvensjon for filnavn,
men du kan kalle den hva du vil så lenge den slutter på `.tf`.

Det finnes også den offisielle [Terraform-dokumentasjonen][tfdocs].

## Terraform-introduksjon

Terraform tar vanlige tekstfiler med «HCL - Hashicorp Configuration Language»
som input og leverer servere og lagring som utdata. HCL er et deklarativt
språk, dvs. det spesifiserer ikke handlinger som skal utføres, men en ønsket
tilstand – eller et resultat.

Ideen om at konfigurasjonsspråk bør være deklarative, og at
agenten skal drive/konvergere faktisk tilstand inn i den deklarerte ønskede tilstanden, har
blitt allment akseptert de siste tre tiårene og er basert på ideer og
forskning av [Mark Burgess på begynnelsen av 90-tallet og senere][mbcfengine].

### Terraform-providere

Superkraften til Terraform kommer fra alle providerne. Terraform-
providere er binære utvidelser av Terraform som, som navnet antyder,
«leverer» ressurser av ulike slag ved å bruke API-ene til den skyleverandøren
som utvidelsen er knyttet til.

Disse utvidelsene tar seg av alt det tunge arbeidet mot skyleverandørenes API-er og
sikrer at faktisk tilstand (skyressursene) konvergeres til det som er
spesifisert som ønsket tilstand.

Terraform kan betraktes som en ønsket-tilstand-konfigurasjonsagent for
infrastruktur. Hver gang det kjøres, vil det gjøre ønsket tilstand om til faktisk
tilstand for skyressurser.

### Redusere graden av «lock-in»

Terraform har mengder av gjennomprøvde providere klare til bruk, og det gjør det
enklere å provisjonere skyressurser fra alle slags sky-API-er innenfor samme
(eller forskjellige) konfigurasjoner.

La oss si at du trenger ressurser i andre skyer (eller on‑prem) for de samme
multi‑cloud- eller hybride miljøene. Da kan du gjøre det med én Terraform-
konfig, og du kan til og med skalere opp og ned antall ressurser ved å endre
noen variabler i Terraform-koden din.

Terraform er sky-agnostisk og er dermed en utmerket forsikring for at ressursene dine er så portable som mulig, og reduserer dermed graden av «lock‑in» til et minimum.

{{< disclaimer "Ansvarsfraskrivelse" >}}Terraform er et kraftig verktøy, og kraftige verktøy kan føre til store feil hvis de brukes feil. Sørg derfor for å lese dokumentasjonen
og beste praksis for å forstå verktøyets natur før du bruker det til
det viktige.{{< /disclaimer >}}

## Den nye modulen «v2-compute-instance»

I [forrige blogginnlegg][firstblog] viste vi grunnleggende bruk av den første
versjonen av Safesprings Terraform-moduler. Disse modulene er nå utfaset
og erstattet av én modul som gjør mer enn de utfasete. Årsaken er at den nye modulen
automatisk slår bruken av «boot from volume» av og på basert på om flavor-navnet
starter med en «l» eller ikke. Den nye modulen bruker også som standard [våre nye compute‑flavors][newflavors],
mens de utfasete modulene som standard brukte de gamle, utfasete flavorene. Sist men ikke
minst kan den nye modulen [motta en map-variabel som beskriver et sett med ekstra
datadisker som skal kobles til instansen][diskmap].

{{< note "Merk" >}}Modulbiblioteket utvikler seg kontinuerlig, så dette blogginnlegget
forklarer funksjonene som er tilgjengelige nå og hvordan de brukes. Se også på
koden, kommentarene og variabeldefinisjonene for å få hele bildet.
Spesielt hvis du leser dette på et senere tidspunkt. {{< /note >}}

## Eksempler

Vi bruker [eksemplene][sftfexamples] i Terraform-modulets [git-repo][sftfmodules] som referanse og forklarer hvert av dem under koden.

### [Eks1][ex1]: Én instans med standardparametere

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
Dette er det enklest mulige eksemplet som bare bruker modulens kilde på GitHub og et forhåndseksisterende nøkkelpar. Alle andre verdier er standard. De kommenterte linjene dokumenterer innholdet i standardverdiene. For å overstyre en standard, fjern kommentaren og endre verdien.

Når dette tas i bruk, vil denne koden opprette en compute-instans med navnet hello-safespring, operativsystem ubuntu 20.04, fra en flavor med lokal disk, 2 vCPU og 4 GB RAM. Den kobles til standardnettverket, som gir instansen en offentlig IPv6-adresse og en privat IPv4-adresse. Instansen vil ikke ha noen datadisker og vil være medlem av sikkerhetsgruppen `default`, som inneholder regler som tillater trafikk fra instansen ut til verden over IPv4 og IPv6 (egress). Siden flavoren er av typen lokal disk, blir parameteren disk_size ignorert, og den lokale NVMe-disken definert i flavoren (100GB) vil bli brukt til Ubuntu-operativsystemet.

Parameteren `config_drive` brukes sjelden. Hvis du ikke vet hva den brukes til, kan du trygt la standardverdien stå (false). Forklaringen av parameterne `role` og `wg_ip` lar vi vente til senere.

### [Eksempel 2][ex2]: Et sett med 3 instanser ved bruk av count

[ex2]: https://github.com/safespring-community/terraform-modules/blob/main/examples/v2-compute-instance-set-with-count/main.tf
```
module my_sf_instances {
   count           = 3
   source          = "github.com/safespring-community/terraform-modules/v2-compute-instance"
   name            = "hello-safespring-${count.index + 1}.example.com"
   key_pair_name   = "an-existing-keypair"
}
```
Her har vi lagt til en count på 3, og vi bruker count-indeksen for å skille navnene på de 3 instansene som opprettes (du kan ikke opprette mer enn én instans med samme navn). Å kjøre apply vil gi 3 instanser med navn `hello-safespring-{1,2,3}.example.com`. Kommenterte standardparametere ble forklart i det første eksemplet, så de er utelatt her. Som i det første eksemplet vil standardverdier brukes der ingen er angitt, så alle de 3 instansene får de samme egenskapene, og disse har de samme standardverdiene som i det første eksemplet.

### [Eksempel 3][ex3]: Sikkerhetsgruppe(r) og nøkkelpar som del av koden

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
Nå har vi lagt til kode for å opprette nøkkelparet `hello-pubkey` og sikkerhetsgruppen `puff`. Disse navnene brukes til å navngi objektene i OpenStack. Det finnes også interne navn i Terraform som bare brukes til å referere frem og tilbake i Terraform-kode/tilstand. Sistnevnte brukes til å referere til navnene på nøkkelparet og sikkerhetsgruppen i definisjonen av instansene.

Resultatet av denne konfigurasjonen blir de samme 3 instansene som i forrige eksempel, bortsett fra at de ikke vil være medlem av standardsikkerhetsgruppen, men av sikkerhetsgruppen `puff` som vi opprettet med inngangsregler for `ssh` og `https`.

Vi har også opprettet vårt eget nøkkelpar (offentlig nøkkel) som instansene våre får i skybrukernes `authorized_keys`-fil. Denne koden tar den lokale (der Terraform kjøres) `~/.ssh/id_rsa.pub`-filen og oppretter et OpenStack-nøkkelpar for den. For detaljer om ssh-nøkler i OpenStack, gå til [et annet blogginnlegg om det][sshblog]

I denne konfigurasjonen har vi blandet opprettelsen av ressurser direkte i konfigurasjonen og via eksterne moduler. Dette er helt greit; noen ganger er ressursene så enkle at det ikke gir mening å lage en abstraksjon (modul) for dem. OpenStack-nøkkelpar er et utmerket eksempel på en slik ressurs.

Spesifikasjonen av regler for sikkerhetsgruppen gjøres med map-variabler direkte i instansieringen av sikkerhetsgruppemodulen, et map av maps, «one» og «two». Disse kan erstattes med «locals» eller til og med variabeldefinisjoner som kan brukes som parametere hvis du bruker denne koden som en modul.

Det er helt opp til deg om du vil bruke modulbiblioteket vårt, lage dine egne moduler eller bare opprette ressursene direkte i konfigurasjonen din. I det minste kan modulbiblioteket, med sine standardverdier, fungere som dokumentasjon eller en tynn innpakning rundt ressursene og navnene i plattformen vår sett fra et Terraform-perspektiv.

### [Eksempel 4][ex4]: Map-er definerer instanser og regler for sikkerhetsgrupper

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
Her itererer vi over en lokal map av maps som definerer alle aspekter ved instansene som skal opprettes (se linjen `for_each = local.instances`). Deretter overstyrer vi standardene i modulen `v2-compute-instance` ved å bruke de individuelle feltene i hver map (i `instances`-mapen), og skaper dermed 3 instanser med ulike egenskaper.

Instansene `websrv{1,2}.example.com` opprettes fra et `centos-7`-image, tilknyttes det offentlige nettet (derfor får de offentlige IP-adresser). De knyttes også til både sikkerhetsgruppene `ingress` og `interconnect`, noe som betyr at summen/unionen av alle reglene i disse sikkerhetsgruppene gjelder for dem.

Sikkerhetsgruppen `interconnect` har regler som åpner for full konnektivitet mellom alle medlemmene i gruppen, men ingenting annet. Sikkerhetsgruppen `ingress` åpner port `tcp/443` fra verden til alle sine medlemmer.

Siden `db`-serveren er det eneste medlemmet av sikkerhetsgruppen `interconnect`, kan `websrv{1,2}`-serverne koble til den (og omvendt), men `db`-serveren kan ikke nås fra noe annet sted, både fordi den er tilknyttet `default`-nettverket, som er et privat (RFC1918) nettverk, og på grunn av reglene i sikkerhetsgruppen `ingress` (som bare tillater medlemmer av samme gruppe å koble til). Hvis du lurer på hvorfor webserverne på `public`-nettverket kan koble til db-serveren på `default`-nettverket med bare ett grensesnitt på hver av dem, [les dette blogginnlegget om Safesprings nettverksstack.][netblog]

Det er verdt å merke seg at parameteren `delete_default_rules = true` vil fjerne standard egress-regler som tillater tilgang ut til verden på IPv4 og IPv6, og gir deg dermed full kontroll over hvilken trafikk som skal tillates. Dette vil i praksis brannmurere alle forsøk fra servere på å initiere utgående forbindelser og kan brukes som effektiv forebygging av [fase 2-nedlastinger av kjørbar kode under et angrep og dermed [hindre angriperes etablering av command and control (COC))][coc]. Deretter kan du åpne bare de nødvendige hullene for legitime utgående forbindelser til programvare-repositorier osv. Dette er relevant også for servere på `default`-nettverket, både via IPv6 og NAT-et IPv4.

{{< note "Merk" >}}Hvis du oppretter en instans som ikke har noen sikkerhetsgrupper tilknyttet, vil den likevel knyttes til sikkerhetsgruppen `default` som inkluderer egress-regler som lar instansen koble ut til verden. For å hindre dette, opprett dine egne sikkerhetsgrupper som du knytter instanser til, og bruk parameteren «delete_default_rules = true» til modulen «v2-compute-security-group».{{< /note >}}

### [Ex5][ex5]: Kombinere count og map for instanser og map for disker

[ex5]: https://github.com/safespring-community/terraform-modules/tree/main/examples/v2-compute-instance-set-with-count-and-map

Det hadde vært fint om du kunne kombinere iterasjon med `for_each` (map) og count, ikke sant? Da kunne du si: «Gi meg 10 webservere uten datadisk på public-nettverket med flavor X, og 2 backend-servere på default-nettverket med en 100GB datadisk». Vel, hvis du prøver å kombinere dem i samme kall til `v2-compute-instance` får du en feil som sier:
```
The "count" and "for_each" meta-arguments are mutually-exclusive, only one
should be used to be explicit about the number of resources to be created.
```
Det kan imidlertid gjøres ved å kapsle én av dem inn i sin egen modul.
La oss si at vi oppretter følgende lokale modul i en mappe som heter
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
Og deretter denne koden i `main.tf`-filen vår:
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
Først opprettet vi en modul som brukte `v2-compute-instance` som kilde, med nødvendige variabeldefinisjoner for verdiene vi har tenkt å overstyre standardene for, samt parameteren `i_count` som definerer antallsverdi for hver.

Deretter kaller vi vår lokale modul, som nå støtter en `i_count`-parameter, og itererer over et map som har alle nødvendige standardoverstyringer for hvert sett og antallet for hvert sett. Så i stedet for å kopiere to identiske map-oppføringer og bare variere navnet, kan vi generere navnet fra et prefiks og count-indeksen i den lokale modulen; dermed kan vi med én map-oppføring opprette et sett med så mange instanser vi vil med de samme egenskapene. Hvis vi trenger andre egenskaper, lager vi et nytt sett med egne parametere og `i_count`. Navnet på `i_count`-parameteren er valgt slik at den ikke kolliderer med den interne, reserverte `count`-parameteret.

Her har vi kombinert metodene fra eksempel 2 og 4 for å gjøre det samme som i eksempel 4, men på en mer generell måte som kan skalere opp sett uten å duplisere mange map-oppføringer. For å skalere opp antallet webservere øker du nå bare `i_count`-feltet i map-oppføringen for webservere, i stedet for å opprette like mange nye map-oppføringer som det trengs nye servere.

I tillegg har vi definert et annet map inne i map-oppføringen til `db`-instansen som vil opprette og koble til et volum av typen `fast` med størrelse 5GB.

Funksjonen [try][tftry] brukes for å gi den lokale modulen obligatoriske reserveparametere når ulike map-oppføringer må overstyre ulike sett med parametere i `v2_compute_instance`. Den lokale modulen må ha variabler for summen/unionen av alle parametere som skal kunne angis.

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