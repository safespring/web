---
ai: true
title: "Från noll till kontinuerlig regelefterlevnad med Terraform, Ansible och Rudder"
date: "2022-06-29"
intro: "Det här inlägget visar hur du med enbart kod kan ta dig från noll resurser till en fullt automatiserad och kontinuerligt regelefterlevande infrastruktur."
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
  - /blogg/2022-06-terraform-ansible-rudder
  - /blogg/2022/2022-06-terraform-ansible-rudder/
---
{{< ingress >}}
Det här blogginlägget tittar på hur vi kan bygga vidare på
tidigare demonstrerade koncept för att skapa uppsättningar av servrar som
kontinuerligt övervakas och hålls i efterlevnad med hjälp av Rudder, ett toppmodernt
verktyg för konfigurationshantering.
{{< /ingress >}}

{{% disclaimer "uppdatering" %}}
Uppdaterad för att rätta en inkonsekvens den 2022-08-22
{{% /disclaimer %}}

{{% note "Läs mer" %}}
Om du tyckte att det här inlägget var användbart, kolla gärna in resten av serien om att använda Terraform och Ansible för resurstilldelning och efterlevnad. Särskilt kanske du också gillar:

1. [Busenkel provisionering med Safesprings Terraform‑moduler](/blogg/2022-01-terraform-modules)
2. [Flexibel provisionering av resurser med Safesprings nya Terraform‑moduler](/blogg/2022-03-terraform-module)
3. [Integrera Terraform och Ansible för effektiv resurshantering](/blogg/2022-05-terraform-ansible)
4. [Från noll till kontinuerlig efterlevnad med Terraform, Ansible och Rudder](/blogg/2022-06-terraform-ansible-rudder)

{{% /note %}}

## Förutsättningar

Det här blogginlägget utgår från att du använder den öppna Terraform CLI. Terraform CLI
är bara ett binärt program som du laddar ner från [releases-sidan][tfreleases]
för din arkitektur/plattform. Här hittar du också kontrollsummor för filerna för att
verifiera deras integritet.

Om inget annat förklaras förutsätter alla exempel att du lägger koden
i en `.tf` i en separat katalog och kör `plan`, `init`, `apply` och `destroy`
inifrån den katalogen. `main.tf` används främst som en konvention för filnamnet,
men du kan döpa den till vad du vill så länge den slutar på `.tf`.

Det finns också den officiella [Terraform-dokumentationen][tfdocs].

En grundläggande förståelse för Ansible-playbooks och inventarier krävs också.

## Introduktion till Terraform

Terraform tar vanligt textformat med «HCL - Hashicorp Configuration Language»
som indata och levererar servrar och lagring som utdata. HCL är ett deklarativt
språk, dvs. det specificerar inte vilka åtgärder som ska utföras utan snarare ett
önskat tillstånd – eller resultat.

Idén att konfigurationsspråk ska vara deklarativa, och att
agenten ska driva/konvergera det faktiska tillståndet till det deklarerade önskade tillståndet, har
blivit allmänt accepterad under de senaste tre decennierna och bygger på idéer och
forskning av [Mark Burgess under tidigt 90‑tal och senare][mbcfengine].

### Terraform-providers

Superkraften i Terraform kommer från alla dess providers. Terraform‑
providers är binära tillägg till Terraform som, som namnet antyder,
«tillhandahåller» resurser av olika slag med hjälp av API:erna hos den molnleverantör
som återspeglas av tilläggets namn.

Dessa tillägg gör allt tungt arbete mot molnleverantörernas API:er och
säkerställer att det faktiska tillståndet (molnresurserna) konvergeras till det som
specificerats som det önskade tillståndet.

Terraform kan ses som en agent för önskat tillstånd (desired state) för
infrastruktur. Varje gång det körs omvandlar det det önskade tillståndet till det
faktiska tillståndet för molnresurser.

### Minska graden av «lock-in»

Terraform har mängder av beprövade providers att använda, vilket underlättar
provisioneringen av molnresurser från alla möjliga moln‑API:er inom samma
(eller olika) konfigurationer.

Säg att du behöver resurser i andra moln (eller on‑prem) för samma
multicloud‑ eller hybrida miljöer. Då kan du göra det med en och samma Terraform‑
konfiguration, och du kan till och med skala upp och ner antalet resurser genom att ändra
några variabler i din Terraform‑kod.

Terraform är molnagnostiskt och är därmed en utmärkt försäkring för att dina resurser
är så portabla som möjligt, vilket minimerar graden av ”inlåsning”.

{{< disclaimer "Ansvarsfriskrivning" >}}Terraform är ett kraftfullt verktyg, och kraftfulla verktyg kan orsaka
stora fel om de används fel, så se till att läsa in dig på dokumentation
och bästa praxis för att förstå verktygets natur innan du använder det för
det viktiga.{{< /disclaimer >}}

## Introduktion till Ansible

[Ansible][ansible] är en svit verktyg för orkestrering och konfigurationshantering
främst via så kallade playbooks. Playbooks skrivs i YAML och beskriver det
önskade tillståndet för operativsystems‑egenskaper som filer, tjänster, filsystem
och så vidare. Det används främst för att konfigurera Linux‑baserade operativsystem över
SSH‑protokollet, men kan också användas för att konfigurera Windows‑
system. I det här inlägget visar vi hur man använder Ansible för att konfigurera tjänster på
ett Linux‑baserat operativsystem (Ubuntu 20.04).

### Ansible-inventarier

Ansible‑inventarier är listor över värdar, grupper av värdar och variabler för dessa
värdar och grupper. Värdar och grupper används för att tala om för Ansible var ett visst
önskat tillstånd (uppgift) är tillämpligt. När man arbetar med statiska värdar i ett
datacenter är inventarier ofta också statiska textfiler som underhålls
manuellt eller semimanuellt. Inventarier kan dock också vara dynamiska, dvs.
tillhandahållas av skript.

När man arbetar med OpenStack är det möjligt att använda inventarie‑skript som
frågar OpenStacks API direkt och producerar ett komplett inventarium över alla
instanser med metadata, alla gruppmedlemskap och så vidare, men ofta
tar dessa skript lång tid att köra, och de behöver i regel köras varje
gång du kör en playbook, vilket gör playbook‑körningar storleksordningar mer
tidskrävande än statiska inventarier. De kan också belasta
OpenStacks API hårt om inventariet frågas ofta.

## Terraform och Ansible

Det måste vara ”Terrible” då ;-) ? Nej, det är det inte alls.

Terraform håller själv reda på alla objekt det provisionerar tillsammans med
deras metadata. Detta kallas ”state” och lagras i den lokala katalog
där Terraform körs som standard, i en fil som heter `terraform.tfstate`. Den
tidigare versionen av tillståndet säkerhetskopieras i filen `terraform.tfstate.backup`.

Detta betyder att det mesta du kan fråga API:et om, gällande dina Terraform‑
tillhandahållna objekt i OpenStack, också finns i den lokala Terraform‑
tillståndsfilen. Om vi därför använder ett skript som läser den lokala Terraform‑
tillståndsfilen får vi fördelen av hög hastighet och noll resursförbrukning i
OpenStacks API. Det är precis vad vi visar här. Det finns flera
skript/program för detta syfte (https://duckduckgo.com är din vän),
men vi använder ett enkelt [python‑skript][ati] som initialt utvecklades av Cisco
Systems.

### Kom igång

För att använda det, kopiera eller skapa en symbolisk länk till skriptet någonstans lämpligt och
ange sökvägen som alternativet `--inventory` till kommandon `ansible-*`. Om du
lägger skriptet i en katalog och använder katalognamnet som `--inventory` kan du
också kombinera information från det dynamiska inventariet som skriptet ger
med statiska inventarie‑filer som ytterligare berikar eller transformerar det dynamiska
inventariet. Om du till exempel använder en Ansible‑roll eller playbook som kräver ett
specifikt värdgruppsnamn kan du använda ett statiskt inventarium för att definiera en ny värdgrupp
med ett namn du själv väljer och ange en värdgrupp från det dynamiska
inventariet som `children` till gruppen du skapade, och sedan använda den gruppen med
din roll eller playbook. Vi tittar på det i ett senare exempel.

## Introduktion till Rudder

[Rudder][rudder] är ett open source‑verktyg för konfigurations‑ och säkerhetshantering.
Det kommer med en multi‑tenant‑kontrollplan för att hantera och övervaka grupper
av noder/agenter centralt. Eftersom Rudder är byggt på den mycket
effektiva [Cfengine core][cfcore] förbrukar det väldigt lite resurser, är
blixtsnabbt och skalar från ett fåtal noder till många tusen.

{{% accordion title="En kort historielektion" %}}
Konfigurationsdrift var ett problem i datacenter långt innan ”molnet”
dök upp. Verktyg som Cfengine, Chef och Puppet adresserade detta problem till
stor del genom att mer eller mindre kontinuerligt jämföra önskat tillstånd med faktiskt
tillstånd och sedan konvergera systemet till önskat tillstånd genom att rätta
skillnaderna. Du kan tänka på konfigurationsdrift som mutationer och
konfigurationshanteringsverktyg som immunsystemet som korrigerar mutationerna och därigenom
skapar stabilitet och motståndskraft mot störningar och säkerhetsproblem.
Dvs. analogin att servrar är som husdjur som behöver tas om hand under
sin livstid, som kan vara många år.

I molneran finns ett nytt paradigm som i stor utsträckning beskrivs av idén om
oföränderlig infrastruktur och att servrar är som boskap: kortlivade och om
det uppstår problem bygger vi helt enkelt om servern från en avbild och kör
templateringen (en gång) för att skapa det önskade tillståndet.

Efter några år med molnteknik, och efter att ha sett hur
många personer och företag använder den, kan man dock konstatera att det finns rätt stora glapp mellan verkligheten
och den något illusoriska idén om kortlivade boskapsservrar (instanser):

Eftersom många företag är så fokuserade på att leverera nya funktioner snabbt är
verkligheten att infrastrukturer inte alls är kortlivade, särskilt med
den allt kortare tiden från att ett system uppdateras tills en ny
säkerhetsbrist upptäcks. Detta gäller särskilt för virtuella maskiner,
men även för containrar ser vi att många lever länge och därmed
upplever samma problem som husdjursservrarna från förr. Med
tanke på den bristfälliga programvarukvaliteten, och därmed den snabba upptäckten av sårbarheter, är det
i princip samma situation som tidigare. Kanske till och med värre, eftersom
containrar och deras orkestrering introducerar ytterligare komplexitet och därmed större
angreppsyta.

Det positiva är dock att verktygen för att åtgärda konfigurationsdrift fortfarande
finns och kan – och bör – användas inne i molninstanser för att överbrygga gapet
ovan. Det här blogginlägget illustrerar hur enkelt det kan vara att gå från en
”fire and forget”-värld till en ”continuous compliance”-värld.  
{{% /accordion %}}

Du kan välja att köpa en Rudder‑supportprenumeration från Normation,
företaget bakom Rudder, för att få förutsägbarhet kring produktutveckling och
underhåll samt olika support‑SLA:er. Normation erbjuder också
utbildning och konsulting kring Rudder. Eller så kan du välja att installera och
förvalta det själv med hjälp av de vänliga själarna på Normation m.fl. som
tillhandahåller färdiga programpaket, Ansible‑kollektion etc. för de
vanligaste plattformarna.

Det genomgående temat i den här blogserien är hur man knyter ihop befintliga
tekniker för att nå ett högre mål, tidigare genom att använda Ansible Terraform
Inventory (ATI)‑skriptet för att brygga Terraform och Ansible. Den här gången tar vi
det ett steg längre och använder Ansible med ATI tillsammans med en [Ansible‑kollektion][rudder-ansible]
som underhålls av Normation för att installera Rudder‑server och agenter och bootstrap:a dessa agenter till nämnda server.

## Installera och bootstrap:a Rudder med Ansible

Vi använder [exemplen][sftfexamples] i Terraform‑modulens [git‑repo][sftfmodules] som referens och förklarar vart och ett under koden.

### Installera en Rudder‑server och bootstrap:a agenter till den servern

Exempel i https://github.com/safespring-community/terraform-modules/tree/main/examples/v2-rudder-minimal-poc

#### Terraform-kod
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
Här skapar vi en instans som kommer att konfigureras som en Rudder-server med v2-compute-instance-modulen och `role=rudder_server`. Därefter skapar vi 2 Rudder-klienter/agenter med v2-compute-instance med `count=2` och `role=rudder_client` och kopplar dem till standardnätverket. Standardnätverket är ett privat (RFC1918) nätverk där instanser kan nå Internet genom NAT via compute-värden, för sådant som paketinstallationer osv. Instanser på detta nätverk kan dock förstås inte nås direkt från Internet.

Vi skapar två säkerhetsgrupper: en «interconnect»-säkerhetsgrupp där alla medlemmar har fullständig konnektivitet sinsemellan, och en ingress-säkerhetsgrupp som tillåter inkommande (ingress) anslutningar på portarna `80/tcp` (HTTP), `443/tcp` (HTTPS) och `22/tcp` (ssh) från hela världen. Alla instanser är medlemmar i interconnect-säkerhetsgruppen så att agenterna kan prata fritt med servern, och servern är också medlem i ingress-säkerhetsgruppen så att den kan nås som en administrationsvärd både via Rudder-webbgränssnittet och API:et, men också som en bastionvärd för inloggning med ssh och för att hoppa vidare till klienterna som är provisionerade på ett RFC1918-nät som inte kan nås direkt från Internet. Slutligen inkluderar vi den befintliga `default`-säkerhetsgruppen för att tillåta utgående (egress) trafik från alla instanser.

{{% note "Safespring-nätverk" %}}
Ingen av instanserna har mer än ett gränssnitt. Detta är avsiktligt. Om du inte vet varför, läs inlägget om [Safespring-nätverksmodellen][netblog]
{{% /note %}}

#### Konfiguration av Rudder Ansible-kollektionen (requirements.yml)
```yaml
collections:
  - name: https://github.com/Normation/rudder-ansible.git
    type: git
    version: master
```
För att kunna använda kollektionen rudder-ansible måste vi installera den lokalt.
Detta görs genom att skapa filen `requirements.yml` som visats ovan och köra:
```shell
$ ansible-galaxy install -r requirements.yml
```
#### Ansible-playbooken (configure.yml)
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
Här återanvänder vi vår tidigare definierade `role` från Terraform-koden som värdgrupper direkt i Ansible-playbooken, `os_metadata_role=rudder_server` och `os_metadata_role=rudder_client` respektive. Observera att vi anger parametern `policy_server` i rollen `rudder_agent` som IP-adressen till servern från Ansible-inventariet för den instansen (vilket i slutänden tillhandahålls av ATIs dynamiska inventory-skript).

{{% note "Nåbarhet för klientnoderna" %}}
För att nå klientnoderna med ssh (de befinner sig i ett RFC1918-nätverk) måste playbooken köras från en instans som finns på samma Safespring-plats som klientnoderna. Om detta låter märkligt, läs gärna blogginlägget om [Safesprings nätverksmodell][netblog].
{{% /note %}}

## Använda Rudder för att hantera önskat tillstånd

Detta är ett omfattande ämne och vi går bara igenom grunderna för att komma igång och illustrera styrkan i ett verktyg som Rudder.

När Ansible-playbooken körs och rollerna i den tillämpas får vi en Rudder-server på instansen `rudder-server`, och Rudder-agenter på instanserna `rudder-client`. Rudder-agenterna konfigureras att använda Rudder-serverns IP-adress som sin policyserver via variabeln `policy_server:` i Ansible-rollen rudder_agent. Rudder-servern startas med ett självsignerat certifikat för webbgränssnittet och API:t. Dessa måste förstås ersättas med giltiga certifikat innan Rudder-servern tas i produktion. Här fokuserar vi bara på ett minimalt proof-of-concept utan produktionsdata, så vi väljer att använda det självsignerade certifikatet och ignorera varningarna för det när vi interagerar med Rudder-servern.

Rudder-servern behöver ett administratörskonto för att kunna ställas in för användning. Detta görs genom att logga in på Rudder-serverns instans och köra följande kommando:
```console
root@rudder-server:~# rudder server create-user -u  admin
New password:
Re-type new password:
User 'admin' added, restarting the Rudder server
root@rudder-server:~#
```
Efter detta kan du logga in på Rudder-serverns webbgränssnitt på `https://<ip-address-of-rudder-server-instance>` med det användarnamn och lösenord som just skapats med CLI:t. Härifrån kan du välja att antingen arbeta i webbgränssnittet (som är ganska bra och användarvänligt) eller arbeta via API:t eller verktyget `rudder-cli`, som i sin tur använder API:t. Oavsett vilket behöver du en token för att komma åt API:t, och den kan genereras i GUI:t under "Administration/API accounts".

De två `rudder-client`-instanserna kan nu ses under "Node Management/Pending Nodes" i GUI:t. Det innebär att de två nya klienterna/agenterna behöver accepteras av policyservern för att servern ska kunna hantera dem. Du kan göra detta i webbgränssnittet genom att markera den och trycka på knappen "accept". När noder accepteras flyttas de från listan "Pending Nodes" till listan "Nodes".

Om du klickar på en nod i listan "Pending Nodes" får du mer information. "Node ID" är ett unikt ID för varje nod/agent. Du kan verifiera den väntande nodens "Node ID" genom att jämföra det med utdata från följande kommando på själva noden/agenten/klienten.
```console
root@rudder-client-1:~# rudder agent info |grep UUID
               UUID: c9e80279-00d3-4ee3-a7e1-8491955ebd3c
root@rudder-client-1:~#
```
Eller så kan du göra det med verktyget "rudder-cli" via API:et som visas nedan.

Observera listan över väntande noder med `rudder-cli` och `jq`. (Det finns bara
en nod kvar i väntande tillstånd eftersom den andra redan har accepterats.)
```console
root@rudder-server:~# rudder-cli node list_pending -t erpaNdoBe4A96VpIlWrCpUEs93LTvVBf  --skip-verify |jq '.nodes[].id' -r
bdfbd21c-d46d-403b-9836-06e2d282b704
root@rudder-server:~#
```

Notera ID:t för den väntande agenten på agenten själv
```console
root@rudder-client-2:~# rudder agent info |grep UUID
               UUID: bdfbd21c-d46d-403b-9836-06e2d282b704
root@rudder-client-2:~#
```
Acceptera sedan noden
```console
root@rudder-server:~# rudder-cli node accept bdfbd21c-d46d-403b-9836-06e2d282b704  -t erpaNdoBe4A96VpIlWrCpUEs93LTvVBf  --skip-verify |jq '.nodes[].id' -r
bdfbd21c-d46d-403b-9836-06e2d282b704
root@rudder-server:~#
```
Och observera sedan att noden har flyttats från listan "pending" till listan "node":
```console
root@rudder-server:~# rudder-cli node list -t erpaNdoBe4A96VpIlWrCpUEs93LTvVBf  --skip-verify |jq '.nodes[].id' -r
root
c9e80279-00d3-4ee3-a7e1-8491955ebd3c
bdfbd21c-d46d-403b-9836-06e2d282b704
root@rudder-server:~#
```
Från och med nu står de två klienterna under kontinuerlig hantering från Rudder-servern och verifieras var femte minut som standard. Inga åtgärder vidtas för att konfigurera något på agent-instanserna innan du skapar regler för nodgrupper.

Användningen av Rudder för att hålla dina instanser kontinuerligt i överensstämmelse med din policy (önskat tillstånd) är ett omfattande ämne i sig och ligger utanför ramen för det här blogginlägget. Gå till Normations [Rudder-sida][rudder] för att läsa mer.

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