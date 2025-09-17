---
ai: true
title: "Safespring: Omfattende GDPR-beskyttelse ud over overførsler til tredjelande"
language: "da"
date: 2024-01-01T13:58:58+01:00
draft: false
section: "Efterlevelse"
intro: "Her giver vi en dybdegående gennemgang af, hvordan vores svenske offentlige cloudplatform ikke blot lever op til GDPR's strenge krav, men også går et skridt videre for at sikre din virksomheds databeskyttelse. Med Safespring får du ikke blot en løsning, der beskytter mod overførsel af data til tredjelande, men en omfattende strategi, der dækker flere aspekter af databeskyttelse og sikkerhed."
background: "safespring-blue-fade2.svg"
darkmode: "fra"
socialmedia: ""
sidebarlinkname: "Se demo"
sidebarlinkurl: "/demo/compute/"
sidebarlinkname2: "Kontakt os"
sidebarlinkurl2: "/contact"
saas: ""
TOC: "På denne side"
aliases:
  - /en/gdpr/
---
{{< icon-block-container >}}
{{< icon-block icon="fa-solid fa-shield-alt" text="Ekstern databeskyttelse" link="#external-data-protection-measures" color="#FA690F">}}
{{< icon-block icon="fa-solid fa-lock" text="Intern databeskyttelse" link="#internal-data-protection-measures" color="#195F8C">}}
{{< icon-block icon="fa-solid fa-file-alt" text="Schrems II-hvidbog" link="/whitepaper/schrems-ii/" color="#32cd32">}}
{{< icon-block icon="fa-solid fa-video" text="GDPR-webcastserie" link="/webinar/gdpr-fireside-chat/" color="#195F8C">}}
{{< icon-block icon="fa-solid fa-database" text="Om vores datacentre" link="/about-safespring/datacenter/" color="#3C9BCD">}}
{{< icon-block icon="fa-solid fa-user-shield" text="Behandling af personoplysninger" link="/documents/personal-data-processing/" color="#3C9BCD">}}
{{< /icon-block-container >}}

## Eksterne foranstaltninger til databeskyttelse

I forbindelse med databeskyttelse og GDPR diskuteres overførsler til tredjelande ofte. Et helt kapitel i GDPR omhandler udelukkende begrænsningerne i mulighederne for at overføre data, og vi har tidligere udarbejdet [anbefalinger til organisationer](/whitepaper/schrems-ii/), der stadig kæmper med dette spørgsmål. Men dette er ikke de eneste krav til dataansvarlige, hvor databehandlere kan hjælpe.

Safesprings forpligtelse som din databehandler er aktivt at bistå din efterlevelse (i henhold til artikel 28.3). Vi er her for at gøre dit arbejde lettere og mere effektivt, når det gælder opfyldelse af kravene til databeskyttelse. Vores cloudplatform sikrer, at du som dataansvarlig altid kan leve op til de krav, som GDPR stiller til dig.

Vi tolker dette som en positiv forpligtelse til ikke blot at implementere sikkerhedsforanstaltninger i vores egne systemer, men også at informere om de muligheder, vores infrastruktur giver dig for at skræddersy databeskyttelsen efter behov. Nedenfor er en liste over tekniske sikkerhedsfunktioner, der kan bidrage til højere processikkerhed, som vi enten leverer direkte eller kan rådgive kvalificeret om.

{{% accordion title="Loghåndtering og sikkerhedsforanstaltninger" id="1" %}}

Beskyttelse mod interne og eksterne aktive/aggressive aktører: Safespring har i øjeblikket effektiv fejlfinding og systemlogning.

#### Safesprings anbefaling til vores kunder

Vores anbefaling er at bruge etablerede brancheværktøjer til indtrængningsdetektion og revisionslogning. Opbevar logs både lokalt og centralt, og brug værktøjer til at identificere normale logmønstre.

#### Dette bidrager til overholdelse af GDPR's krav om

- integritet (A5.1.f),
- fortrolighed (A5.1.f), og
- ansvarlighed (A5.2) samt
- sikkerhedsforanstaltninger for fortrolighed og integritet (32.1.b).
  {{% /accordion %}}

{{% accordion title="Brugeradministration og adgangskontrol" id="2" %}}

Beskyttelse mod interne passive/neutrale aktører: For at håndtere risici forbundet med medarbejderes fejl eller rolleændringer administrerer Safespring omhyggeligt brugeradgang. Alle konti skal være individuelle.

#### Safesprings anbefaling til vores kunder

Vores anbefaling er at fjerne individuelle konti, når medarbejdere forlader virksomheden eller skifter rolle. Dette omfatter brug af tidsbegrænsede rettigheder til applikationer og muligheden for at tvinge datalagring til en server, man forbinder til på sikker vis, for at forhindre, at følsomme filer gemmes lokalt på brugerens arbejdsstation.

#### Dette bidrager til overholdelse af GDPR's krav om

- rigtighed (A5.1.d),
- dataminimering (A5.1.e),
- integritet (A5.1.f) og
- sikkerhedsforanstaltninger for adgang (A32.1.b).
  {{% /accordion %}}

{{% accordion title="Datakryptering" id="3" %}}

Safespring implementerer "kryptering i hvile" ved at bruge diskkryptering på alle diske i sine datacentre, hvilket hjælper kunden med at sikre personoplysninger

der er lagret på platformen i overensstemmelse med GDPR. Kryptering i hvile og under transport er afgørende for at sikre, at data forbliver beskyttede. Safespring anvender mindst "TLS 1.2" til kommunikation til og fra alle tjenester.

#### Safesprings anbefaling til vores kunder

Vores anbefaling er at etablere en "nul-viden"-arkitektur, hvor data krypteres, før de sendes til Safesprings platform, hvor det er relevant. Safesprings backup-tjeneste har denne funktionalitet indbygget som en mulighed, der automatiserer krypteringen. Til lagring af mindre følsomme data kan kunder også støtte sig til Safesprings indbyggede kryptering i hvile.

#### Dette er i overensstemmelse med GDPR's krav om

- indbygget databeskyttelse (A25.2),
- fortrolighed (A5.1.f).
  {{% /accordion %}}

{{% accordion title="Sikkerhedskopiering og gendannelse" id="4" %}}

Beskyttelse i forbindelse med håndtering af fysiske og tekniske hændelser: Safespring implementerer centrale tiltag for at sikre tilgængelighed og gendannelse af kundedata. Vi tilbyder en robust backup-løsning til vores interne tjenester og miljøer, men det er vigtigt at bemærke, at vi ikke sikkerhedskopierer data, som kunderne selv lægger ind. Kunder opfordres til at sikre, at deres data sikkerhedskopieres for at kunne genskabe tilgængelighed og adgang til personoplysninger, når det er nødvendigt. Vores backup-tjeneste er en værdifuld mulighed, der hjælper kunder med at opfylde denne anbefaling.

#### Safesprings anbefalinger til vores kunder

Vores anbefaling er aktivt at styre backup og redundans for deres data. Ved at bruge vores backup-tjeneste og udnytte vores robuste bloklagring kan kunder sikre høj tilgængelighed og hurtig gendannelse af deres data.

#### Dette er i overensstemmelse med GDPR's krav om

- tilgængelighed,
- gendannelsesevne og
- modstandsdygtighed for behandlingssystemer og -tjenester (A32.1.c).

{{% /accordion %}}

{{% accordion title="Sikkerhedsrevision og opdatering af politikker" id="5" %}}

Policydokumenter og revisioner: Safespring har flere policydokumenter og sikkerhedsvejledninger, hvilket betyder, at vi regelmæssigt opdaterer og reviderer vores sikkerhedspolitikker.

#### Safesprings anbefalinger til vores kunder

Vores anbefaling er regelmæssigt at opdatere og revidere deres egne sikkerhedspolitikker for at sikre, at etablerede rutiner følges, eller for at opdatere rutiner, så de afspejler den faktiske praksis i virksomheden.

#### Dette er i overensstemmelse med GDPR's krav om

- regelmæssigt at teste, vurdere og evaluere effektiviteten af tekniske og organisatoriske foranstaltninger for at sikre behandlingssikkerheden (artikel 32).
  {{% /accordion %}}

{{% accordion title="Redundans" id="6" %}}

Beskyttelse mod fysisk og teknisk fejl eller ransomware

Central bloklagring for øget redundans: Som en del af vores service tilbyder vi central bloklagring til Safespring Compute, hvor data lagres i tre kopier på tværs af en klynge, hvilket minimerer afhængigheden af specifikke harddiske. Dette tiltag er afgørende for at sikre dataadgang og gendannelse i tilfælde af teknisk svigt.

#### Dette er i overensstemmelse med GDPR's krav om

- modstandsdygtighed for behandlingssystemer og -tjenester (32.1c)

{{% /accordion %}}
{{< accordion-script >}}

{{< horisontal-card image="/img/card/safespring-scaleut_use-case-ebba.webp" cardtitle="Fødereret maskinlæring" link="/services/case/scaleout/" linktext="Læs use case" text="“Det har værdi at have kritisk infrastruktur placeret i Sverige, hvor vi ikke er afhængige af andre landes lovgivning...” – Ebba Kreamer, Scaleout" >}}

## Interne foranstaltninger til databeskyttelse

Interne databeskyttelsestiltag er dem, som Safespring implementerer for personoplysninger, som vi selv er ansvarlige for. Vi er et cloud-selskab, der leverer til andre virksomheder. Vores kommercielle aktivitet omfatter personoplysninger i meget begrænset omfang. I drift håndterer vi kun brugernavne og adgangskoder for brugere på platformen.

### Administrativ datahåndtering

På det administrative område er det primært i forbindelse med håndtering af fakturaer, personaleadministration, via vores website og ved visse typer informationsdistribution til markedsføringsformål, at vi håndterer kontaktoplysninger eller aggregeret statistik.

For alle typer bogføringshandlinger er vi bundet af Selskabsloven, Bogføringsloven, skattelovgivningen og retningslinjer for god revisionsskik. Kvitteringer, kontrakter, fakturaer (indgående og udgående) eller oplysninger om udbetaling af sygekompensation opbevares i syv år for at imødekomme behovet for efterfølgende kontrol af vores regnskab. Efter denne periode kasseres oplysningerne i overensstemmelse med vores databeskyttelsespolitik for personaleadministration.

### Markedsføringstiltag og samtykke

For markedsføring ud over webanalyse gælder det, at interaktionen med Safespring sker på grundlag af samtykke eller vores legitime interesse. Det kan for eksempel være, at en person på et socialt medie markerer sig som interesseret i cloud-tjenester og derfor af os antages at være interesseret i Safespring, selv om vedkommende ikke personligt har kontaktet vores CMO. I andre tilfælde modtager vi kontaktoplysninger, når personer tilmelder sig arrangementer og seminarer.

Til webanalyse indsamler vi aggregerede data, som behandles via et lokalt værktøj (Matomo), efter at en besøgende på vores website har angivet, at vedkommende accepterer en sådan dataindsamling. Yderligere information findes på vores website.