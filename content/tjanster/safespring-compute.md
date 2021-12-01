---
title: "Safespring Compute"
date: 2019-01-07T13:58:58+01:00
draft: false
intro: "Med Safesprings molnbaserade infrastrukturtjänst  (Compute)  kan du skala upp och ner din infrastruktur efter behov. Levereras ifrån säkra datahallar inom landet."
background: "safespring-compute.jpg"
form: "yes"
sidebarlinkname: "Ladda ner produktblad"
sidebarlinkurl: "/marketing/safespring-compute-web.pdf"
socialmedia: "safespring-compute.jpg"
aliases:
    - /compute/
    - /safespring-compute/
devops: ""
section: "Public Cloud"
---

<video poster="/tjanster/images/safespring_compute.jpg" width="100%" style="border-radius: 5px;" controls="true">
<source type="video/mp4" src="/tjanster/images/safespring_compute.mp4">
<track src="/tjanster/images/safespring_compute.vtt" kind="subtitles" srclang="sv" label="Svenska" default>
</video>

## Virtuella maskiner till er tjänst
<div class="ingress"><p>En flexibel och skalbar IT-tjänst som inte kräver hårdvaruinvesteringar.</p></div>

Tjänsten är flexibel, fullt automatiserad och baserad på självbetjäning via en portal. Användaren kan själv med få, enkla steg skapa, starta och stoppa virtuella maskiner. Det går även att styra virtuella maskiner programmatiskt genom standardiserade anrop mot vårt API.

![Safespring Compute benefits](/img/safespring-compute-key-points.svg)

Vår molnbaserade infrastrukturtjänst är baserad på den marknadsledande molnplattformen OpenStack. Tjänsten levereras ifrån säkra datahallar med mycket hög tillgänglighet. Data i tjänsten lämnar aldrig Sverige då datahallarna är placerade inom landets gränser. Vi är ett nordiskt bolag som därigenom inte omfattas av ex. Cloud Act, vilket gör att gör att du kan känna dig ännu tryggare.

{{< 2calltoaction "Testa tjänst" "#testa-safespring" "Kontakta oss" "/kontakt" >}}

### Lagring till Safespring Compute
Den lagring som behövs till de virtuella instanserna är separerad från noderna där själva instanserna kör i ett Ceph-kluster och kan fås i två varianter:

- **Fast** — som är optimerat på prestanda.
- **Large** — som är optimerat på pris.

Genom en självbetjäningsportal kan tjänsten skalas uppåt eller nedåt vid behov. Detta tillsammans med att våra plattformar är mycket kostnadseffektiva kan minska dina kostnader för lagring betydligt samtidigt som du har full flexibilitet.

<br><a href="/tjanster/safespring-storage" id="text-button">Läs mer om lagring</a>

{{< youtube iYDi_Hz7A74 >}}

### Datahallar inom landets gränser
Tjänsten levereras från våra mycket säkra datahallar med mycket hög tillgänglighet. Eftersom vi är ett nordiskt bolag och våra molntjänster produceras i datahallar som befinner sig inom landets gränser och sorterar under den lokala lagstiftningen samt att din Data aldrig lämnar landet, är det enklare att efterleva lagar och regler kring vilken data som kan lagras externt. All data lagras dessutom på krypterade hårddiskar. Tjänsten är flexibel och fullt automatiserad.

Safespring Compute erbjuder stora fördelar såsom förenklat samarbete mellan olika avdelningar eller grupper, förenklar IT-hantering och adderar effektivitet och flexibilitet till er organisation.

### Öppen källkod som grund
Safespring Compute är byggd på Open Source. De senaste decennierna har visat att Open Source är ett oerhört effektivt ramverk för samarbete och innovation för företag och organisationer emellan. Genom att dela på produktutvecklingen kring de saker som är gemensamma kan de deltagande organisationerna ägna sig åt tjänster och värdeförädling kring de områden där de skiljer sig åt. På så sätt så kan både företagen, organisationerna och kunderna tjäna på det samtidigt.

Eftersom att OpenStack är baserad på Open Source gör det också att den fungerar mycket bra som bottenplatta för andra projekt baserade på öppen källkod t ex containers och Kubernetes. Om dessa verktyg används på rätt sätt kan ert företag skapa de tekniska förutsättningarna för att arbeta helt enligt DevOps.

Plattformen skapar också ett ramverk för att designa sina applikationer så att de är anpassade för molnet, s k Cloud Native. Den stora skillnaden i design från traditionella applikationsuppsättningar är att tjänsterna delas upp i små tjänster som är lätta att skala horisontellt - dvs. att man skapar många små byggklossar som tillsammans delar på arbetet istället för att öka resurserna på en nod som gör allt (monolit).

{{< docs "compute" >}}

### Kubernetes och containrar
 ...gör det också lätt att automatisera uppsättningen av applikationer  och gör det också möjligt att låta uppsättningen skala efter behov. Det går också att använda Kubernetes för att skapa en likadan uppsättning av dina applikationer, oavsett om ni kör dem hos oss, hos er eller hos en annan molnleverantör.

### OpenStack
...använder sig av öppna, dokumenterade APIer som gör det enkelt att skriva egna skript för automatisering för uppsättning av nya resurser. På så sätt kan ni göra klara definitionerna för er infrastruktur och en väldigt enkel flytt till en annan leverantör om ni någon gång i framtiden skulle vilja byta.

Vi på Safespring samarbetar också med andra företag inom Linux-communityt för att leverera tjänster. En sådan partner är SUSE som genom sin produkt Container as a Service-plattform gör det väldigt enkelt att sätta upp, och underhålla, ett fullfjädrat Kubernetes-kluster i vår plattform.  

Även om vår plattform är baserad på öppen källkod och Linux så går det naturligtvis att köra Windows på de virtuella maskinerna. Safespring använder underleverantören CloudBase för att erbjuda startklara avbildningar av Windows för att du lätt skall kunna komma igång med dem.
