---
ai: true
title: "Platform som en tjeneste – PaaS"
language: "da"
cardtitle: "Platformtjenester"
cardicon: "fa-solid fa-container-storage"
cardcolor: "#195F8C"
cardorder: "07"
date: 2023-02-28
draft: false
intro: "Safespring tilbyder en række platformtjenester oven på IaaS-platformen."
cardintro: ""
background: "safespring-compute-background.svg"
form: "nej"
sidebarlinkname: "Tilbage til alle kategorier"
sidebarlinkurl: "/service-catalogue"
socialmedia: "safespring-compute.jpg"
section: "Safespring Servicekatalog"
socialmedia: "/safespring-start.jpg"
toc: ""
aliases:
- /service-catalogue/platform/
---
{{< ingress >}}
Safespring leverer flere platformtjenester oven på IaaS-platformen.
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
      <td>Administreret Kubernetes</td>
    </tr>
    <tr>
      <td>PAAS-man.postgresql</td>
      <td>Administreret PostgreSQL</td>
    </tr>
    <tr>
      <td>PAAS-man.mariadb</td>
      <td>Administreret MariaDB</td>
    </tr>
    <tr>
      <td>PAAS-man.elasticsearch</td>
      <td>Administreret Elasticsearch</td>
    </tr>
    <tr>
      <td>PAAS-man.redis</td>
      <td>Administreret Redis</td>
    </tr>
    <tr>
      <td>PAAS-man.nats</td>
      <td>Administreret NATS</td>
    </tr>
  </tbody>
</table>

## Administreret Kubernetes

Den administrerede Compliant Kubernetes-platform indeholder følgende funktioner og muligheder:

{{% accordion title="Sikkerhed og compliance" %}}

- Privat container-register
- Indtrængningsdetekteringssystemer (IDS) til alarmering i tilfælde af brud
- Automatisk scanning for sårbarheder i images
- Integration med godkendelsesudbydere som Active Directory, SAML og OIDC, f.eks. Google-godkendelse
- Revisionslogning i Kubernetes API-serveren for at spore aktiviteter i klyngen
- Rollebaseret adgangskontrol (RBAC)
- Håndhævelse af compliancepolitikker
- Håndtering af secrets
- Automatisk certifikathåndtering
- Netværkssegregering (netværkszoner og isolation af øst-vest-trafik)
- Netværksisolering og restriktive firewalls, så kun tilladt netværkstrafik får adgang til platformen. Indgående trafik til klyngen håndteres sikkert ved hjælp af Nginx ingress controller

{{% /accordion %}}

{{% accordion title="Platformobservabilitet" %}}

- Overvågning af Compliant Kubernetes-platformens ressourceforbrug
- Alarmering baseret på overvågningsdata
- Logaggregering
- Analyse baseret på indsamlede logfiler
  {{% /accordion %}}
  {{% accordion title="Automatisering og administration" %}}

- Løbende opdateringer/patches af Kubernetes-platformen
- Løbende opdateringer/patches af klyngetjenester og eksterne tjenester
- Sikkerhedskopier og katastrofegenopretning
- Enterprise-brugerflade til at styre klyngen og integrere med andre tjenester
  {{% /accordion %}}

### Forudsætninger

Safespring IaaS.

### Administreret Kubernetes – oversigt

Safesprings administrerede Kubernetes-tjeneste er bygget på Compliant Kubernetes (CK8s). Compliant Kubernetes er en gennemprøvet, stabil og sikker Kubernetes-platform bygget på open source cloud-native komponenter. Ud over det, der indgår i en standard “vanilla” administreret Kubernetes-tjeneste, giver Compliant Kubernetes følgende værdi:

- Bekymringsfri containerdrift med platformen driftes ”døgnets 24 timer, 7 dage om ugen” i ISO-certificerede, europæiske datacentre.
- Forudkonfigureret sikkerhedsværktøj i henhold til best practice for at reducere compliancebyrden for rammeværker som ISO-27001, GDPR og PCI-DSS.
- Gør det nemmere at forblive sikker og compliant over tid ved at håndhæve politikker på tværs af hele softwareudviklingslivscyklussen uden at begrænse udviklere.
- Reducerer revisionsbyrden ved at tilbyde detaljerede og let tilgængelige revisionsspor.
- Gør applikationer nemmere at administrere fra et drifts-, compliance- og sikkerhedsperspektiv ved at tilbyde en enterprise-brugerflade, der fungerer som et samlet indgangspunkt til alle relevante værktøjer, politikker og konfiguration.
- Mindsker driftsbyrden ved at administrere alle de ekstra komponenter, der kræves for et sikkert og compliant Kubernetes-miljø, såsom observabilitet (logning, overvågning, audit), godkendelse, håndtering af secrets, indtrængningsdetektering, sårbarhedsscanning og et privat container-register.

### Administreret Kubernetes – servicedeskription

![Beskrivelse af Safespring Administreret Kubernetes-tjeneste](/img/graphics/safespring-openshift-2024.png)

### Administreret Kubernetes – SLA

Tjenesten leveres med support ”døgnets 24 timer, 7 dage om ugen” og har en tilgængeligheds-SLA på 99,9 %.

## PaaS – Administreret PostgreSQL

Den administrerede PostgreSQL-tjeneste tilbyder regelmæssige opdateringer, daglige sikkerhedskopier, point-in-time-gendannelse og loglagring i Elasticsearch i op til 30 dage eller 50 GB.

{{% accordion title="Opdateringer og opgraderinger" %}}

PostgreSQL holdes opdateret med sikkerhedspatches og nye versioner. Dette omfatter operativsystemet og databaseapplikationen.

{{% /accordion %}}

{{% accordion title="Sikkerhedskopier og katastrofegenopretning" %}}

Der tages en fuld sikkerhedskopi af databasen hver dag. Derudover leveres point-in-time-gendannelse ved hjælp af en Write-Ahead-Log.

Katastrofegenopretning forpligter vi os til at gennemføre inden for 4 timer.

{{% /accordion %}}

{{% accordion title="Logaggregering" %}}

Alle logfiler gemmes i Elasticsearch og kan vises i Kibana.

Logfiler opbevares i maksimalt 30 dage (GDPR-overholdelse) eller op til 50 GB, alt efter hvad der nås først.

{{% /accordion %}}

### Forudsætninger

Safespring IaaS.

### Administreret PostgreSQL – oversigt

PostgreSQL er den mest populære open source-relationsdatabase til enterprise-arbejdsbelastninger. Safespring leverer en fuldt administreret PostgreSQL-tjeneste optimeret til ydeevne og pålidelighed.

### Administreret PostgreSQL – SLA

Tjenesten leveres med support ”døgnets 24 timer, 7 dage om ugen” og har en tilgængeligheds-SLA på 99,9 %.

## PaaS – Administreret Elasticsearch

Administreret Elasticsearch tilbyder regelmæssige opdateringer, daglige sikkerhedskopier med point-in-time-gendannelse og katastrofegenopretning med en forpligtelse på 4 timer. Logfiler gemmes i Elasticsearch og kan vises i Kibana, med en maksimal opbevaringsperiode på 30 dage eller 50 GB.

{{% accordion title="Opdateringer og opgraderinger" %}}

Elasticsearch- og Kibana-instanser holdes opdateret med sikkerhedspatches og nye versioner.

{{% /accordion %}}

{{% accordion title="Sikkerhedskopier og katastrofegenopretning" %}}

Der tages en fuld sikkerhedskopi af databasen hver dag. Derudover leveres point-in-time-gendannelse ved hjælp af en Write-Ahead-Log.

Katastrofegenopretning forpligter vi os til at gennemføre inden for fire (4) timer.

{{% /accordion %}}

{{% accordion title="Logaggregering" %}}

Alle logfiler gemmes i Elasticsearch og kan vises i Kibana.

Logfiler opbevares i maksimalt 30 dage (GDPR-overholdelse) eller op til 50 GB, alt efter hvad der nås først.

{{% /accordion %}}

### Forudsætninger

Safespring IaaS.

### Administreret Elasticsearch – oversigt

Safespring leverer en fuldt administreret Elasticsearch-tjeneste, der gør det nemt at implementere og drive Elasticsearch med sikkerhed i topklasse, i cloud-skala og med nul (0) nedetid. Som en del af tjenesten får kunder også adgang til en eller flere administrerede Kibana-instanser, hvilket gør det muligt at søge, køre analyser og visualisere data i realtid.

### Administreret Elasticsearch – SLA

Tjenesten leveres med support ”døgnets 24 timer, 7 dage om ugen” og har en tilgængeligheds-SLA på 99,9 %.

## PaaS – Administreret Redis

Dette afsnit giver information om den administrerede Redis-tjeneste, der tilbydes som en del af PaaS-løsningen. Tjenesten omfatter regelmæssige opdateringer og opgraderinger, daglige sikkerhedskopier med point-in-time-gendannelse samt logaggregering med opbevaring i op til 30 dage eller 50 GB, alt efter hvad der nås først. Læs videre for flere detaljer.

{{% accordion title="Opdateringer og opgraderinger" %}}

Databasen holdes opdateret med sikkerhedspatches og nye versioner. Dette omfatter operativsystemet og databaseapplikationen.

{{% /accordion %}}

{{% accordion title="Sikkerhedskopier og katastrofegenopretning" %}}

Der tages en fuld sikkerhedskopi af databasen hver dag. Derudover leveres point-in-time-gendannelse ved hjælp af en Write-Ahead-Log.

Katastrofegenopretning forpligter vi os til at gennemføre inden for fire (4) timer.

{{% /accordion %}}

{{% accordion title="Logaggregering" %}}

Alle logfiler gemmes i Elasticsearch og kan vises i Kibana.

Logfiler opbevares i maksimalt 30 dage (GDPR-overholdelse) eller op til 50 GB, alt efter hvad der nås først.

{{% /accordion %}}

### Forudsætninger

Safespring IaaS.

### Administreret Redis – oversigt

Redis er et open source, in-memory datalager og et yderst populært valg som database, cache eller message broker. Safespring driver en fuldt administreret Redis-tjeneste, som giver alle fordelene ved verdens førende in-memory, nøgle-værdi-lager uden kompleksiteten ved databaseadministration, opgraderinger og sikkerhedskopier.

### Administreret Redis – SLA

Tjenesten leveres med support ”døgnets 24 timer, 7 dage om ugen” og har en tilgængeligheds-SLA på 99,9 %.

## PaaS – Administreret NATS

Dette afsnit giver information om den administrerede NATS-tjeneste, der tilbydes som en del af PaaS-løsningen. Tjenesten omfatter regelmæssige opdateringer og opgraderinger, daglige sikkerhedskopier med hurtig katastrofegenopretning samt logaggregering med opbevaring i op til 30 dage eller 50 GB, alt efter hvad der nås først. Læs videre for flere detaljer.

{{% accordion title="Opdateringer og opgraderinger" %}}

- NATS holdes opdateret med sikkerhedspatches og nye versioner.

{{% /accordion %}}

{{% accordion title="Sikkerhedskopier og katastrofegenopretning" %}}

- Der tages en fuld sikkerhedskopi hver dag.
- Katastrofegenopretning forpligter vi os til at gennemføre inden for fire (4) timer.

{{% /accordion %}}

{{% accordion title="Logaggregering" %}}

- Alle logfiler gemmes i Elasticsearch og kan vises i Kibana.
- Logfiler opbevares i maksimalt 30 dage (GDPR-overholdelse) eller op til 50 GB, alt efter hvad der nås først.

{{% /accordion %}}

### Forudsætninger

Safespring IaaS.

### Administreret NATS – oversigt

Safespring driver en fuldt administreret NATS-tjeneste, der giver dig fordelene ved et moderne, cloud-native beskedsystem.

### Administreret NATS – SLA

Tjenesten leveres med support ”døgnets 24 timer, 7 dage om ugen” og har en tilgængeligheds-SLA på 99,9 %.

{{% accordion-script %}}