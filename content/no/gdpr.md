---
title: "Safespring: Omfattende GDPR-beskyttelse utover tredjelands­overføring"
language: "No"
date: 2024-01-01T13:58:58+01:00
draft: false
section: "Compliance"
intro: "Her gir vi en grundig oversikt over hvordan vår svenske offentlige skyplattform ikke bare oppfyller de strenge kravene i GDPR, men også går et skritt videre for å sikre bedriftens databeskyttelse. Med Safespring får du ikke bare en løsning som beskytter mot dataoverføring til tredjeland, men en omfattende strategi som dekker flere aspekter ved databeskyttelse og sikkerhet."
background: "safespring-blue-fade2.svg"
darkmode: "off"
socialmedia: ""
sidebarlinkname: "Bestill demo"
sidebarlinkurl: "/no/demo"
sidebarlinkname2: "Kontakt Safespring"
sidebarlinkurl2: "/no/kontakt"
saas: ""
aliases: ""
TOC: "På denne siden"
---

{{< icon-block-container >}}
    {{< icon-block icon="fa-solid fa-shield-alt" text="Eksterne databeskyttelses­tiltak" link="#eksterne-databeskyttelsestiltak" color="#FA690F">}}
    {{< icon-block icon="fa-solid fa-lock" text="Interne databeskyttelses­tiltak" link="#interne-databeskyttelsestiltak" color="#195F8C">}}
    {{< icon-block icon="fa-solid fa-file-alt" text="Schrems II White Paper" link="/whitepaper/schrems-ii/" color="#32cd32">}}
    {{< icon-block icon="fa-solid fa-video" text="GDPR Webcast-serie" link="/webinar/gdpr-fireside-chat/" color="#195F8C">}}
    {{< icon-block icon="fa-solid fa-database" text="Om våre datasentre" link="/om-safespring/datasenter/" color="#3C9BCD">}}
    {{< icon-block icon="fa-solid fa-user-shield" text="Behandling av person­opplysninger" link="/dokumenter/personopplysningsbehandling/" color="#3C9BCD">}}
{{< /icon-block-container >}}



## Eksterne databeskyttelsestiltak
I konteksten av databeskyttelse og GDPR diskuteres ofte tredjelands­overføringer. Et helt kapittel i GDPR handler utelukkende om begrensningene av mulighetene for å overføre data, og vi har tidligere utviklet [anbefalinger for organisasjoner](/whitepaper/schrems-ii/) som fortsatt sliter med nettopp dette. Men disse er ikke de eneste kravene til databehandlere der behandlere kan hjelpe.

Safesprings forpliktelse som deres databehandler er å aktivt assistere med deres overholdelse (i henhold til artikkel 28.3). Vi er her for å gjøre arbeidet deres enklere og mer effektivt når det kommer til å møte databeskyttelseskravene. Vår skyplattform sikrer at dere, som databehandlere, alltid kan møte kravene GDPR stiller til dere.

Vi tolker dette som en positiv forpliktelse til ikke bare å implementere sikkerhetstiltak i våre egne systemer, men også å informere om hvilke muligheter vår infrastruktur gir dere for å tilpasse databeskyttelse etter behov. Nedenfor følger en liste over tekniske sikkerhetsfunksjoner som kan bidra til høyere prosessuell sikkerhet, og som vi enten direkte tilbyr eller kan gi god rådgivning om.




{{% accordion title="Logghåndtering og sikkerhetstiltak" id="1" %}}

Beskyttelse mot intern og ekstern aktiv/aggressiv ekspertise: Safespring har for øyeblikket effektiv feilsøking og systemlogging.

#### Safesprings anbefaling til våre kunder
Vår anbefaling er å bruke etablerte bransjeverktøy for inntrengningsdeteksjon og revisjonslogging. Lag

re logger både lokalt og sentralt, samt å bruke verktøy for å identifisere normale loggmønstre.

#### Dette bidrar til å opprettholde GDPRs krav om
  - integritet (A5.1.f),
  - konfidensialitet (A5.1.f) og
  - ansvarlighet (A5.2), samt
  - sikkerhetstiltak for konfidensialitet og integritet (32.1.b).
{{% /accordion %}}




{{% accordion title="Brukerhåndtering og tilgangskontroll" id="2" %}}

Beskyttelse mot intern Passiv/Nøytral Ekspert: For å håndtere risikoer knyttet til ansattes feil eller rolleendringer, håndterer Safespring brukertilgang nøye. Alle kontoer må være individuelle.

#### Safesprings anbefaling til våre kunder
Vår anbefaling er å fjerne individuelle kontoer når ansatte slutter eller bytter roller. Dette inkluderer bruk av tidsbestemte tillatelser for applikasjoner og muligheten til å tvinge lagring av data på en server man kobler til sikkert for å unngå at sensitive filer lagres lokalt på brukerens arbeidsstasjon.

#### Dette bidrar til å opprettholde GDPRs krav om
  - korrekthet (A5.1.d),
  - dataminimering (A5.1.e),
  - integritet (A5.1.f) og
  - sikkerhetstiltak for tilgang (A32.1.b).
{{% /accordion %}}




{{% accordion title="Datakryptering" id="3" %}}

Safespring implementerer "encryption at rest" ved å bruke diskkryptering på alle disker i sine datasentre, noe som bidrar til å hjelpe kunden med å sikre personopplysninger som de lagrer på plattformen i henhold til GDPR. Kryptering ved hvile og under overføring er viktig for å sikre at data forblir sikre. Safespring anvender minst "TLS 1.2" for kommunikasjon til og fra alle tjenester.

#### Safesprings anbefaling til våre kunder
Vår anbefaling er å etablere en "nullkunnskaps" arkitektur, der data krypteres før det sendes til Safesprings plattform, der det er aktuelt. Safesprings backup-tjeneste har denne funksjonaliteten innebygd som et valg som gjør krypteringen automatisk. Ved lagring av mindre sensitiv data kan kunden også stole på Safesprings innebygde kryptering ved hvile.

#### Dette samsvarer med GDPRs krav om
  - innebygd databeskyttelse (A25.2),
  - konfidensialitet (A5.1.f).
{{% /accordion %}}




{{% accordion title="Backup og gjenoppretting" id="4" %}}

Beskyttelse mot fysisk og teknisk hendelseshåndtering: Safespring implementerer nøkkeltiltak for å sikre tilgjengelighet og gjenoppretting av kundedata. Vi tilbyr en robust backup-løsning for våre interne tjenester og miljøer, men det er viktig å merke seg at vi ikke sikkerhetskopierer kundeinnskrevet data. Kunder oppfordres til å sikre at deres data er sikkerhetskopiert for å kunne gjenopprette tilgjengelighet og tilgang til personopplysninger ved behov. Vår backup-tjeneste er et verdifullt tillegg som letter for kunder å møte denne anbefalingen.

#### Safesprings anbefalinger til våre kunder
Vår anbefaling er å aktivt håndtere sikkerhetskopiering og redundans av sine data. Ved å bruke vår backup-tjeneste og dra nytte av vår robuste blokklagring, kan kunder sikre høy tilgjengelighet og rask gjenoppretting av sine data.

#### Dette samsvarer med GDPRs krav om
  - tilgjengelighet, 
  - gjenopprettbar

het og 
  - motstandsdyktighet hos behandlingssystemene og tjenestene (A32.1.c).

{{% /accordion %}}




{{% accordion title="Sikkerhetsrevisjon og policy-oppdatering" id="5" %}}

Policydokumenter og revisjoner: Safespring har flere policydokumenter og sikkerhetsguider, som betyr at vi regelmessig oppdaterer og reviderer våre sikkerhetspolicyer.

#### Safesprings anbefalinger til våre kunder
Vår anbefaling er å regelmessig oppdatere og revidere sine egne sikkerhetspolicyer for å sikre at etablerte rutiner følges eller for å oppdatere rutinene slik at de reflekterer virksomheten i praksis.

#### Dette samsvarer med GDPRs krav om
  - å regelmessig teste, undersøke og evaluere effektiviteten av tekniske og organisatoriske tiltak for å sikre behandlingens sikkerhet (Artikkel 32).
{{% /accordion %}}




{{% accordion title="Redundans" id="6" %}}

Beskyttelse mot fysisk og teknisk svikt eller ransomware

Sentral blokklagring for økt redundans: Som en del av vår tjeneste tilbyr vi sentral blokklagring til Safespring Compute, der data lagres i tre kopier over et klynge, noe som minimerer avhengigheten av spesifikke harddisker. Dette tiltaket er avgjørende for å sikre dataaksess og gjenoppretting ved teknisk svikt.

#### Dette samsvarer med GDPRs krav om
  - motstandsdyktighet hos behandlingssystemene og -tjenestene (32.1c)

{{% /accordion %}}
{{< accordion-script >}}




{{< horisontal-card image="/img/card/safespring-scaleut_use-case-ebba.webp" cardtitle="Føderert maskinlæring" link="/tjenester/case/scaleout/" linktext="Les Use Case" text="“Det er verdi i å ha kritisk infrastruktur plassert i Sverige hvor vi ikke er avhengige av andre lands lovgivning...“ – Ebba Kreamer, Scaleout" >}}




## Interne databeskyttelsestiltak

Interne databeskyttelsestiltak er de Safespring implementerer for personopplysninger vi selv er ansvarlige for. Vi er et skyfirma som opererer mot andre bedrifter. Vår kommersielle aktivitet involverer personopplysninger i svært begrenset omfang. I produksjon håndteres kun brukernavn og passord for brukere på plattformen.

### Administrativ datahåndtering

Innen det administrative området er det først og fremst ved håndtering av fakturaer, personaladministrasjon, gjennom vår nettside, og ved visse typer informasjonsutsendelser til markedsføringsformål at vi håndterer kontaktinformasjon eller aggregert statistikk.

For alle typer regnskapsmessige handlinger er vi bundet av aksjeloven, regnskapsloven, skattelovgivningen og retningslinjer for god revisjonsskikk. Kvitteringer, kontrakter, fakturaer (innkommende og utgående) eller informasjon om sykepengeutbetalinger bevares i syv år for å imøtekomme behovet for etterkontroller av vår bokføring. Etter denne perioden kasseres opplysningene i samsvar med vår policy for databeskyttelse ved personalhåndtering.

### Markedsføringstiltak og samtykke

For markedsføring utover webanalyse gjelder det at man interagerer med Safespring basert på samtykke eller vår berettigede interesse. Dette kan for eksempel være at en person på noen sosiale medier markerer seg som interessert i skytjenester og derfor, som et resultat, antas av oss å være interessert i Safespring selv om de ikke personlig har tatt kontakt med vår CMO. I andre tilfeller mottar vi kontaktinformasjon når personer melder seg på til arrangementer og seminarer.

Ved webanalyse samler vi inn aggregerte data som håndteres via et lokalt verktøy (Matomo) etter at en person som besøker vår nettside har indikert at de godtar slik datainnsamling. Ytterligere informasjon finnes på vår nettside.