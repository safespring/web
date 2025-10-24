---
ai: true
title: "Plattform som en tjeneste – PaaS"
language: "nb"
cardtitle: "Plattformtjenester"
cardicon: "fa-solid fa-container-storage"
cardcolor: "#195F8C"
cardorder: "07"
date: 2023-02-28
draft: false
intro: "Safespring tilbyr en rekke plattformtjenester på toppen av IaaS-plattformen."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nei"
sidebarlinkname: "Tilbake til alle kategorier"
sidebarlinkurl: "/service-catalogue"
section: "Safespring tjenestekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
aliases:
  - /service-catalogue/platform/
---

{{< ingress >}}
Safespring leverer flere plattformtjenester på toppen av IaaS-plattformen.
{{< /ingress >}}

<table class="width100">
  <thead>
    <tr>
      <th>Produktkode</th>
      <th>Tjeneste</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>PAAS-man.kubernetes</td>
      <td>Administrert Kubernetes</td>
    </tr>
    <tr>
      <td>PAAS-man.postgresql</td>
      <td>Administrert PostgreSQL</td>
    </tr>
    <tr>
      <td>PAAS-man.mariadb</td>
      <td>Administrert MariaDB</td>
    </tr>
    <tr>
      <td>PAAS-man.elasticsearch</td>
      <td>Administrert Elasticsearch</td>
    </tr>
    <tr>
      <td>PAAS-man.redis</td>
      <td>Administrert Redis</td>
    </tr>
    <tr>
      <td>PAAS-man.nats</td>
      <td>Administrert NATS</td>
    </tr>
  </tbody>
</table>

## Administrert Kubernetes

Den administrerte Compliant Kubernetes-plattformen omfatter følgende funksjoner og egenskaper:

{{% accordion title="Sikkerhet og etterlevelse" %}}

- Privat containerregister
- Innbruddsdeteksjonssystemer (IDS) for varsling ved brudd
- Automatisert skanning av bilde-sårbarheter
- Integrasjon med autentiseringsleverandører som Active Directory, SAML og OIDC, f.eks. Google-autentisering
- Revisjonslogging i Kubernetes API-serveren for å spore aktiviteter i klyngen
- Rollebasert tilgangskontroll (RBAC)
- Håndheving av etterlevelsespolicyer
- Håndtering av hemmeligheter (secrets)
- Automatisert sertifikathåndtering
- Nettverkssegregering (nettverkssoner og isolering av øst-vest-trafikk)
- Nettverksisolasjon og restriktive brannmurer, som kun tillater tillatt nettverkstrafikk inn i plattformen. Inngående trafikk til klyngen håndteres sikkert ved bruk av Nginx ingress controller

{{% /accordion %}}

{{% accordion title="Plattformobservabilitet" %}}

- Overvåking av ressursbruk i Compliant Kubernetes-plattformen
- Varsling basert på overvåkingsdata
- Loggaggregasjon
- Analyser basert på innsamlede logger
  {{% /accordion %}}
  {{% accordion title="Automatisering og forvaltning" %}}

- Kontinuerlige oppdateringer/patcher av Kubernetes-plattformen
- Kontinuerlige oppdateringer/patcher av klyngetjenester og eksterne tjenester
- Sikkerhetskopier og gjenoppretting etter katastrofe
- Enterprise-UI for å kontrollere klyngen og integrere med andre tjenester
  {{% /accordion %}}

### Forutsetninger

Safespring IaaS.

### Administrert Kubernetes – oversikt

Safesprings administrerte Kubernetes-tjeneste er bygget på Compliant Kubernetes (CK8s). Compliant Kubernetes er en bevist, stabil og sikker Kubernetes-plattform bygget på sky-native open source-komponenter. I tillegg til det som inngår i en standard «vanilla» administrert Kubernetes-tjeneste, gir Compliant Kubernetes følgende verdi:

- Bekymringsfri containerdrift med plattform driftet døgnet rundt, sju dager i uken, i ISO-sertifiserte, europeiske datasentre.
- Forhåndskonfigurert sikkerhetsverktøy i tråd med beste praksis for å redusere etterlevelsesbyrden for rammeverk som ISO-27001, GDPR og PCI-DSS.
- Gjør det enklere å forbli sikker og etterleve krav over tid ved å håndheve policyer gjennom hele programvareutviklingens livssyklus, uten å begrense utviklere.
- Reduserer revisjonsbyrden ved å tilby detaljerte og lett tilgjengelige revisjonsspor.
- Gjør applikasjoner enklere å administrere fra et drifts-, etterlevelses- og sikkerhetsperspektiv ved å tilby et enterprise-UI som fungerer som ett inngangspunkt til alle relevante verktøy, policyer og konfigurasjon.
- Reduserer driftsbelastningen ved å håndtere alle tilleggskomponentene som kreves for et sikkert og compliant Kubernetes-miljø, slik som observabilitet (logging, overvåking, revisjon), autentisering, håndtering av hemmeligheter, innbruddsdeteksjon, sårbarhetsskanning og et privat containerregister.

### Administrert Kubernetes – tjenestebeskrivelse

![Safespring Managed Kubernetes – tjenestebeskrivelse](/img/graphics/safespring-openshift-2024.png)

### Administrert Kubernetes – SLA

Tjenesten leveres med støtte døgnet rundt, sju dager i uken, og har en tilgjengelighets-SLA på 99,9 prosent.

## PaaS – Administrert PostgreSQL

Den administrerte PostgreSQL-tjenesten tilbyr regelmessige oppdateringer, daglige sikkerhetskopier, gjenoppretting til et bestemt tidspunkt (point-in-time recovery), og logglagring i Elasticsearch i opptil 30 dager eller 50 GB.

{{% accordion title="Oppdateringer og oppgraderinger" %}}

PostgreSQL holdes oppdatert med sikkerhetsoppdateringer og nye versjoner. Dette inkluderer operativsystemet og databaseapplikasjonen.

{{% /accordion %}}

{{% accordion title="Sikkerhetskopier og gjenoppretting etter katastrofe" %}}

Det tas en full sikkerhetskopi av databasen hver dag. I tillegg tilbys gjenoppretting til et bestemt tidspunkt ved hjelp av en Write-Ahead-Log.

Gjenoppretting etter katastrofe forpliktes å være fullført innen 4 timer.

{{% /accordion %}}

{{% accordion title="Loggaggregasjon" %}}

Alle logger lagres i Elasticsearch og kan vises i Kibana.

Logger beholdes i maks 30 dager (GDPR-etterlevelse) eller opptil 50 GB, avhengig av hva som inntreffer først.

{{% /accordion %}}

### Forutsetninger

Safespring IaaS.

### Administrert PostgreSQL – oversikt

PostgreSQL er den mest populære åpne relasjonsdatabasen for bedriftsarbeidslaster. Safespring leverer en fullt administrert PostgreSQL-tjeneste optimalisert for ytelse og pålitelighet.

### Administrert PostgreSQL – SLA

Tjenesten leveres med støtte døgnet rundt, sju dager i uken, og har en tilgjengelighets-SLA på 99,9 prosent.

## PaaS – Administrert Elasticsearch

Administrert Elasticsearch tilbyr regelmessige oppdateringer, daglige sikkerhetskopier med gjenoppretting til et bestemt tidspunkt, og gjenoppretting etter katastrofe med en forpliktelse på 4 timer. Logger lagres i Elasticsearch og kan vises i Kibana, med en maksimal oppbevaringsperiode på 30 dager eller 50 GB.

{{% accordion title="Oppdateringer og oppgraderinger" %}}

Elasticsearch- og Kibana-instansene holdes oppdatert med sikkerhetsoppdateringer og nye versjoner.

{{% /accordion %}}

{{% accordion title="Sikkerhetskopier og gjenoppretting etter katastrofe" %}}

Det tas en full sikkerhetskopi av databasen hver dag. I tillegg tilbys gjenoppretting til et bestemt tidspunkt ved hjelp av en Write-Ahead-Log.

Gjenoppretting etter katastrofe forpliktes å være fullført innen fire (4) timer.

{{% /accordion %}}

{{% accordion title="Loggaggregasjon" %}}

Alle logger lagres i Elasticsearch og kan vises i Kibana.

Logger beholdes i maks 30 dager (GDPR-etterlevelse) eller opptil 50 GB, avhengig av hva som inntreffer først.

{{% /accordion %}}

### Forutsetninger

Safespring IaaS.

### Administrert Elasticsearch – oversikt

Safespring leverer en fullt administrert Elasticsearch-tjeneste som gjør det enkelt å distribuere og drifte Elasticsearch med sikkerhet i toppsjiktet, i sky-skala, uten nedetid. Som del av tjenesten får kunder også tilgang til en eller flere administrerte Kibana-instans(er) som muliggjør søk, analyser og visualisering av data i sanntid.

### Administrert Elasticsearch – SLA

Tjenesten leveres med støtte døgnet rundt, sju dager i uken, og har en tilgjengelighets-SLA på 99,9 prosent.

## PaaS – Administrert Redis

Denne delen gir informasjon om den administrerte Redis-tjenesten som tilbys som en del av PaaS-løsningen. Tjenesten inkluderer regelmessige oppdateringer og oppgraderinger, daglige sikkerhetskopier med gjenoppretting til et bestemt tidspunkt, og loggaggregasjon med oppbevaring i opptil 30 dager eller 50 GB, avhengig av hva som inntreffer først. Les videre for flere detaljer.

{{% accordion title="Oppdateringer og oppgraderinger" %}}

Databasen holdes oppdatert med sikkerhetsoppdateringer og nye versjoner. Dette inkluderer operativsystemet og databaseapplikasjonen.

{{% /accordion %}}

{{% accordion title="Sikkerhetskopier og gjenoppretting etter katastrofe" %}}

Det tas en full sikkerhetskopi av databasen hver dag. I tillegg tilbys gjenoppretting til et bestemt tidspunkt ved hjelp av en Write-Ahead-Log.

Gjenoppretting etter katastrofe forpliktes å være fullført innen fire (4) timer.

{{% /accordion %}}

{{% accordion title="Loggaggregasjon" %}}

Alle logger lagres i Elasticsearch og kan vises i Kibana.

Logger beholdes i maks 30 dager (GDPR-etterlevelse) eller opptil 50 GB, avhengig av hva som inntreffer først.

{{% /accordion %}}

### Forutsetninger

Safespring IaaS.

### Administrert Redis– oversikt

Redis er en åpen kildekode, minnebasert datalagring og et svært populært valg som database, cache eller meldingsmegler. Safespring drifter en fullt administrert Redis-tjeneste som gir alle fordelene med verdens ledende minnebaserte nøkkel-verdi-lager uten kompleksiteten ved databaseadministrasjon, oppgraderinger og sikkerhetskopier.

### Administrert Redis – SLA

Tjenesten leveres med støtte døgnet rundt, sju dager i uken, og har en tilgjengelighets-SLA på 99,9 prosent.

## PaaS – Administrert NATS

Denne delen gir informasjon om den administrerte NATS-tjenesten som tilbys som en del av PaaS-løsningen. Tjenesten inkluderer regelmessige oppdateringer og oppgraderinger, daglige sikkerhetskopier med rask gjenoppretting etter katastrofe, og loggaggregasjon med oppbevaring i opptil 30 dager eller 50 GB, avhengig av hva som inntreffer først. Les videre for flere detaljer.

{{% accordion title="Oppdateringer og oppgraderinger" %}}

- NATS holdes oppdatert med sikkerhetsoppdateringer og nye versjoner.

{{% /accordion %}}

{{% accordion title="Sikkerhetskopier og gjenoppretting etter katastrofe" %}}

- Det tas en full sikkerhetskopi hver dag.
- Gjenoppretting etter katastrofe forpliktes å være fullført innen fire (4) timer.

{{% /accordion %}}

{{% accordion title="Loggaggregasjon" %}}

- Alle logger lagres i Elasticsearch og kan vises i Kibana.
- Logger beholdes i maks 30 dager (GDPR-etterlevelse) eller opptil 50 GB, avhengig av hva som inntreffer først.

{{% /accordion %}}

### Forutsetninger

Safespring IaaS.

### Administrert NATS – oversikt

Safespring drifter en fullt administrert NATS-tjeneste som lar deg få fordelene av et moderne, sky-native meldingssystem.

### Administrert NATS – SLA

Tjenesten leveres med støtte døgnet rundt, sju dager i uken, og har en tilgjengelighets-SLA på 99,9 prosent.

{{% accordion-script %}}
