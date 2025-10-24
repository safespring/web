---
title: "Safespring S3: Skalerbar og højtydende objektlagring"
language: "da"
documentation: "Storage"
cardtitle: "Storskalig lagring"
cardicon: "fak fa-safespring-s3"
cardcolor: "#f4670f"
cardorder: "2"
date: "2025-05-23"
draft: false
intro: "Skybaseret lagring leveret fra vores datacentre i Norden, baseret på den markedsledende lagringsteknologi Ceph."
cardintro: "Skybaseret lagring til store datamængder leveret fra vores egne datacentre"
background: "safespring-storage-background.svg"
form: "yes"
sidebarlinkname: "Kom i gang"
sidebarlinkurl: "#contact"
sidebarlinkname2: "Pris for Storage"
sidebarlinkurl2: "/pris/#safespring-storage-s3"
section: "Public cloud"
socialmedia: "/safespring-start.jpg"
megamenu: "yes"
aliases:
  - /da/storage/
  - /da/safespring-storage/
  - /da/tjenester/storage/
---

{{< icon-block-container >}}
{{< icon-block icon="fa-solid fa-shield-alt" text="Europæiske sikkerheds­værdier" link="" color="#32cd32">}}
{{< icon-block icon="fa-solid fa-layer-group" text="Skalerbar lagring" link="" color="#417DA5">}}
{{< icon-block icon="fa-solid fa-tachometer-alt" text="Høj ydeevne" link="" color="#3C9BCD">}}
{{< icon-block icon="fa-kit fa-safespring-s3" text="S3-kompatibel" link="" color="#3C9BCD">}}
{{< icon-block icon="fa-solid fa-sync-alt" text="Høj tilgængelighed" link="" color="#FA690F">}}
{{< icon-block icon="fa-solid fa-dollar-sign" text="Omkostnings­effektiv" link="" color="#32cd32">}}
{{< /icon-block-container >}}

## S3 Storage – lagring i skyen

{{< ingress >}}
Safespring Storage er en S3-kompatibel objektlagringsløsning designet til at opfylde behovene hos europæiske organisationer. Med fokus på compliance, skalerbarhed og ydeevne giver Safespring Storage et pålideligt fundament for dine lagringsbehov.
{{< /ingress >}}

Med **datakryptering** kan du beskytte dine data med end-to-end-kryptering og sikre integritet og fortrolighed under overførsel og lagring. Vores funktion **objektlåsning** beskytter dine kritiske data mod utilsigtet sletning eller ransomware-angreb ved at gøre objekter uforanderlige i en specificeret tidsperiode.

Skybaserede applikationer er afhængige af dataadgang med lav latens og hurtige overførsler. Vores **optimerede overførsler** muliggør effektiv datahåndtering gennem ydeevneforbedringer som parallelle uploads og multipart-overførsler.

Derudover tilbyder vores løsning nem integration med eksisterende S3-værktøjer og applikationer, uden behov for ændringer. Med bred applikationsunderstøttelse er Safespring Storage kompatibel med populære programmer som Veeam Backup, Nextcloud, Cyberduck og flere.

## Safespring Storage findes i to versioner

Har din applikation brug for hurtig adgang til lagrede data, eller leder du efter en langsigtet lagringsløsning til offsite-backup?

{{< icon-block-horisontal icon="fa-solid fa-rabbit-running" color="#3C9BCD" text="S3 Standardlagring" description="Vores standard S3-tjeneste med lav latens og høj ydeevne. Optimeret til applikationer, der kræver hurtig og pålidelig dataadgang." >}}
{{< icon-block-horisontal icon="fa-solid fa-boxes-packing" color="#3C9BCD" text="S3 Arkivlagring" description="En omkostningseffektiv S3-tjeneste designet til arkiveringsformål, ideel til lagring af større objekter, der skrives én gang og læses sjældent." >}}

## Nøglefunktioner

1. Ingen trafikomkostninger opkræves fra tjenesten, det der kaldes egress-cost og ingress-cost. Du kan læse mere om denne funktion i vores artikel: [Safespring tager ikke trafikafgifter](/blogg/2023/2023-03-egress-cost/).
1. Safespring Storage prioriterer din datasikkerhed. Med funktioner som objektlåsning og ACL'er har du fuld kontrol over dine datas tilgængelighed og beskyttelse.
1. Betal kun for den lagring, du bruger. Safespring Storage tilbyder [fleksible prismodeller](/pris/#safespring-storage-s3), der kan tilpasses dine specifikke behov og giver omkostningsbesparelser, når du skalerer.
1. Vores erfarne kundesupportteam er tilgængeligt til at hjælpe dig med alle spørgsmål eller udfordringer og sikrer en smidig Safespring-oplevelse.

### Anvendelsesområder

#### Indholdslagring og distribution

Lagre og distribuer store mediefiler, dokumenter og andre digitale aktiver effektivt til dit globale publikum. Brug Safespring Storage som en medieserver til at streame video over HLS. Safespring bruger vores egne tjenester. [Vores webcasts streames fra Safespring Storage](/webinar/).

#### Big Data-analyse

Udnyt Safespring Storage til at lagre store datasæt, der kræves til analyse- og machine learning-applikationer. Læs mere om, hvordan [SciLifeLab bruger Safespring til forskning inden for livsvidenskab](/services/case/scilifelab/).

#### Databackup og gendannelse

Vores backup-tjeneste bruger Safespring Storage som grundlag for sikkert at sikkerhedskopiere dine kritiske data og sikre hurtig gendannelse ved katastrofer eller datatab.

#### Compliance og arkivering

Opfyld regulatoriske krav ved sikkert at lagre og arkivere data med uforanderlighed og revisionsmuligheder.

## Kom i gang med vores konfigurationsguider

{{< icon-block-small-container >}}
{{< icon-block-small icon="fa-solid fa-terminal" text="s3fs" link="https://docs.safespring.com/storage/s3fs" color="#32cd32">}}
{{< icon-block-small icon="fa-solid fa-cloud" text="CloudBerry" link="https://docs.safespring.com/storage/cloudberry" color="#417DA5">}}
{{< icon-block-small icon="fa-solid fa-duck" text="CyberDuck" link="https://docs.safespring.com/storage/cyberduck" color="#3C9BCD">}}
{{< icon-block-small icon="fa-solid fa-duck" text="Duck CLI" link="https://docs.safespring.com/storage/duck-cli" color="#3C9BCD">}}
{{< icon-block-small icon="fa-solid fa-server" text="MinIO Client" link="https://docs.safespring.com/storage/minio-client" color="#FA690F">}}
{{< icon-block-small icon="fa-solid fa-cloud-upload-alt" text="AWS-CLI" link="https://docs.safespring.com/storage/aws-cli" color="#32cd32">}}
{{< icon-block-small icon="fa-solid fa-cloud" text="NextCloud" link="https://docs.safespring.com/storage/nextcloud-s3" color="#32cd32">}}
{{< /icon-block-small-container >}}

## Ofte stillede spørgsmål

{{% question question="Hvad er objektlåsning, og hvordan beskytter det mine data?" %}}
Objektlåsning er en funktion, der gør objekter uforanderlige i en angivet tidsperiode og forhindrer, at de slettes eller overskrives. Dette beskytter dine data mod utilsigtet sletning og ransomware-angreb.
{{% /question %}}

{{% question question="Er Safespring Storage kompatibelt med mine eksisterende S3-værktøjer?" %}}
Ja, Safespring Storage er fuldt S3-kompatibelt, så du kan bruge dine eksisterende værktøjer og applikationer uden ændringer.
{{% /question %}}

{{< distance >}}

{{% custom-card image="/img/card/safespring-petter.webp" cardtitle="Kontakt os i dag" alt="Kontakt Safespring" %}}
Oplev det fulde potentiale i dine data med Safespring Storage. Vores team er klar til at hjælpe dig med at finde den perfekte lagringsløsning til din virksomheds behov.

[hello@safespring.com](mailto:hello@safespring.com)
{{% /custom-card %}}

{{< accordion-script >}}
