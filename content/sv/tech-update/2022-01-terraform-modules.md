---
ai: true
title: "Busenkel provisionering med Safesprings Terraform-moduler"
date: "2022-01-10"
intro: "Det har aldrig varit enklare att provisionera beräknings- och blocklagringsresurser i Safesprings infrastrukturplattform."
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
  - /blogg/2022-01-terraform-modules
  - /blogg/2022/2022-01-terraform-modules/
---
{{< ingress >}}
I det här blogginlägget visar vi hur enkelt det är med exempel från våra Terraform‑moduler i communityt.
{{< /ingress >}}

Det har aldrig varit enklare att provisionera compute‑ och blocklagringsresurser i Safesprings infrastrukturplattform. Moduler kan hämtas direkt från GitHub med ett minimum av Terraform‑kod.

{{% note "Läs mer" %}}
Om du tyckte att det här inlägget var användbart, kolla gärna in resten av serien om hur du använder Terraform och Ansible för resurstilldelning och regelefterlevnad. I synnerhet kan du också gilla:

1. [Busenkel provisionering med Safesprings Terraform‑moduler](/blogg/2022-01-terraform-modules)
2. [Flexibel resurstilldelning med Safesprings nya Terraform‑moduler](/blogg/2022-03-terraform-module)
3. [Integrera Terraform och Ansible för effektiv resurshantering](/blogg/2022-05-terraform-ansible)
4. [Från noll till kontinuerlig regelefterlevnad med Terraform, Ansible och Rudder](/blogg/2022-06-terraform-ansible-rudder)

{{% /note %}}

## Introduktion till Terraform

Terraform har blivit de facto‑standard i branschen för ”Infrastructure as Code – IaC”. Det är skrivet i Golang, är öppen källkod och kan laddas ner som en enda körbar fil från [nedladdningssidan för Terraform][tfdl].

Terraform tar vanliga textfiler med ”HCL – HashiCorp Configuration Language” som input och ger servrar och lagring som output. HCL är ett deklarativt språk, dvs. det specificerar inte vilka åtgärder som ska utföras utan beskriver ett önskat tillstånd – eller resultat.

Tanken att konfigurationsspråk ska vara deklarativa och att det faktiska tillståndet ska konvergera mot det deklarerade önskade tillståndet har blivit allmänt accepterad under de senaste tre decennierna och bygger på idéer och forskning av [Mark Burgess från tidigt 90‑tal och framåt][mbcfengine].

### Terraform‑providers

Terraforms superkraft kommer från alla dess providers. Terraform‑providers är binära tillägg till Terraform som, precis som namnet antyder, ”tillhandahåller” resurser av olika slag via API:erna hos den molnleverantör som tilläggets namn syftar på.

Dessa tillägg gör det tunga arbetet mot molnleverantörernas API:er och säkerställer att det faktiska tillståndet (molnresurserna) konvergerar till det som specificerats som det önskade tillståndet.

Terraform kan ses som en agent för önskat tillstånd för infrastruktur. Varje gång det körs förvandlar det det önskade tillståndet till faktiskt tillstånd för molnresurser.

### Minska graden av inlåsning

Terraform har mängder av beprövade providers att använda, vilket gör det enklare att provisionera molnresurser från alla möjliga moln‑API:er inom samma (eller olika) konfigurationer.

Säg att du behöver resurser i andra moln (eller on‑prem) för samma multi‑cloud‑ eller hybridmiljö. Då kan du göra det med en enda Terraform‑konfiguration, och du kan till och med skala upp och ner antalet resurser genom att ändra några variabler i din Terraform‑kod.

Terraform är molnagnostiskt och är därmed en utmärkt försäkring för att dina resurser ska vara så portabla som möjligt, vilket minimerar graden av inlåsning.

## Exempel med Safesprings Terraform‑moduler

Safesprings OpenStack‑plattform erbjuder två kategorier av instansflavors:

1. Flavors med lokal NVMe‑disk. Flavornamn börjar med `l`, till exempel `lm.small`.
2. Flavors utan disk. Flavornamn börjar utan `l`. Dessa flavors behöver provisionera minst en extra volym från OpenStack‑volymtjänsten (Cinder) att starta operativsystemet från.

Därför är modulerna indelade i två huvudtyper beroende på om instansen har lokal disk eller inte. Dessutom kan både instanser med och utan lokal disk ha en central disk (datadisk) ansluten. Det blir totalt fyra moduler:

1. `v2-compute-local-disk`<br>
   Modul för flavor med lokal disk och ingen central extra datadisk.
2. `v2-compute-central-disk`<br>
   Modul för flavor med central disk och ingen central extra datadisk
3. `v2-compute-local-disk-and-attached-disk`<br>
   Modul för flavor med lokal disk och central extra datadisk
4. `v2-compute-central-disk-and-attached-disk`<br>
   Modul för flavor med central disk och extra central datadisk:

### 1. Det minsta möjliga exemplet

En instans med lokal‑disk‑flavor och standardvärden.

Parametrar för flavor, image, name-prefix, suffix, count och så vidare är standard om inget annat anges. Den enda obligatoriska parametern är `key_pair_name` som kan vara en befintlig nyckel, eller så kan den skapas som en del av Terraform‑konfigurationen. Först skapar vi en med OpenStack CLI och refererar till den i Terraform‑konfigurationen.

<script data-theme="solarized-dark" id="asciicast-yr2F1jWsmTWTFvkiXMtQ26f5I" src="https://asciinema.org/a/yr2F1jWsmTWTFvkiXMtQ26f5I.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

### 2. Samma sak men nu skapar vi nyckeln i Terraform

Först förstör vi det vi skapade i föregående exempel. Sedan lägger vi till kod för att skapa ett nyckelpar med Terraform och använder därefter nyckelparet i instanskonfigurationen. På så sätt blir Terraform‑konfigurationen självbärande utan externa beroenden till OpenStack‑objekt.

Safesprings moduler innehåller referenser till vilka providers/versions de beror på. När vi skapar resurser direkt i konfigurationen (som nyckelparet i exemplet nedan) måste vi också inkludera konfiguration för OpenStack‑providern i rotmodulen (main.tf)

<script data-theme="solarized-dark" id="asciicast-P36Q7BaY9sktSzTbS7uhASjGj" src="https://asciinema.org/a/P36Q7BaY9sktSzTbS7uhASjGj.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

### 3. Nu med säkerhetsgrupper

Om en instans inte är medlem i några säkerhetsgrupper går det inte att kommunicera med instansen via några tilldelade IP‑adresser. Följande exempel visar hur man skapar en säkerhetsgrupp med ett par regler för att tillåta `ssh` och `ICMP` (ping, till exempel) från ”hela världen” via IPv4. Det går också att använda namn på befintliga säkerhetsgrupper (till exempel standardgruppen som alltid finns i ett projekt).

Det ska också vara möjligt att tillämpa konfigurationsändringar utan att behöva förstöra det aktuella tillståndet för resurserna. Ibland är det omöjligt att ändra tillståndet utan att återskapa objekt. Terraform återskapar objekt när ändringarna kräver det, så var noga med att granska planen innan du applicerar. Planen visas alltid när `terraform apply` körs i interaktivt läge, men det är också möjligt/rekommenderat att köra `terraform plan`, som bara visar de planerade ändringarna.

Låt oss applicera vår nyskapade säkerhetsgrupp på vår befintliga konfiguration utan att förstöra den först.

<script data-theme="solarized-dark" id="asciicast-py92MXeP9yI4f2a33Z5KMRLuk" src="https://asciinema.org/a/py92MXeP9yI4f2a33Z5KMRLuk.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

### 4. Fler moduler och parametrar

Hur vet jag ”magiskt” vilka parametrar som finns för en modul och vad de gör? Enkelt – jag tittar i filen `variables.tf` i modulens katalog på GitHub. Till exempel finns modulen `v2-compute-local-disk` som vi använt hittills (bland andra) på [Safespring Community på GitHub](https://github.com/safespring-community/terraform-modules/tree/main/v2-compute-local-disk). Det finns några `.tf`‑filer i den katalogen. `variables.tf` innehåller alla variabler/parametrar som modulen accepterar, deras beskrivning och standardvärden.

Låt oss använda det för att utöka vår konfiguration lite till.

<script data-theme="solarized-dark" id="asciicast-rfkA04x6QfSkGaIMJOS1rTGJE" src="https://asciinema.org/a/rfkA04x6QfSkGaIMJOS1rTGJE.js" data-autoplay="true" data-loop="true" data-speed="2" async></script>

### 5. Sammanfattning

Vi har sett hur lite kod som behövs för att driftsätta grupper av resurser i Safesprings compute‑plattform med en minimal mängd Terraform‑kod som återanvänder Safesprings specifika moduler direkt från GitHub för att beskriva det önskade tillståndet för Safespring‑resurser.

Vi har också pekat på modulernas källkod, som du kan granska för att se vad de gör och hur de gör det. Källkoden kan inspirera dig att skapa egna moduler för just dina syften.

Nästa inlägg kommer att fördjupa sig ytterligare i modulernas användning för att skapa flera uppsättningar/grupper av instanser och säkerhetsgrupper för att orkestrera och koppla samman miljöer. Det kommer också att visa hur metadata‑roller från Terraform‑konfigurationen kan användas som Ansible‑inventorygrupper för att konfigurera operativsystemen enligt de roller som instanserna ska fylla.

[mbcfengine]: https://www.researchgate.net/publication/243774232_Cfengine_A_site_configuration_engine
[tfdl]: https://www.terraform.io/downloads
[sftfmodules]: https://github.com/safespring-community/terraform-modules