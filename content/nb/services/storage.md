---
title: "Safespring S3: Skalerbar og høyytelses objektlagring"
language: "nb"
documentation: "Storage"
cardtitle: "Lagring i stor skala"
cardicon: "fak fa-safespring-s3"
cardcolor: "#f4670f"
cardorder: "2"
date: 2024-12-13
draft: false
intro: "Skybasert lagring levert fra våre datasentre i Norden, basert på den markedsledende lagringsteknologien Ceph."
cardintro: "Skybasert lagring for store datavolumer levert fra våre egne datasentre"
background: "safespring-storage-background.svg"
form: "yes"
sidebarlinkname: "Kom i gang"
sidebarlinkurl: "#contact"
sidebarlinkname2: "Pris for Storage"
sidebarlinkurl2: "/pris/#safespring-storage-s3"
section: "Public cloud"
socialmedia: "safespring-storage.jpg"
megamenu: "yes"
aliases:
  - /no/storage/
  - /no/safespring-storage/
  - /no/tjenester/storage/
---

{{< icon-block-container >}}
{{< icon-block icon="fa-solid fa-shield-alt" text="Europeiske sikkerhets­verdier" link="" color="#32cd32">}}
{{< icon-block icon="fa-solid fa-layer-group" text="Skalerbar lagring" link="" color="#417DA5">}}
{{< icon-block icon="fa-solid fa-tachometer-alt" text="Høy ytelse" link="" color="#3C9BCD">}}
{{< icon-block icon="fa-kit fa-safespring-s3" text="S3-kompatibel" link="" color="#3C9BCD">}}
{{< icon-block icon="fa-solid fa-sync-alt" text="Høy tilgjengelighet" link="" color="#FA690F">}}
{{< icon-block icon="fa-solid fa-dollar-sign" text="Kostnadseffektivt" link="" color="#32cd32">}}
{{< /icon-block-container >}}

## S3 Storage – lagring i skyen

{{< ingress >}}
Safespring Storage er en S3-kompatibel objektlagringsløsning utformet for å møte behovene til europeiske organisasjoner. Med fokus på samsvar, skalerbarhet og ytelse gir Safespring Storage et pålitelig grunnlag for dine lagringsbehov.
{{< /ingress >}}

Med **datakryptering** kan du beskytte dataene dine med ende-til-ende-kryptering og sikre integritet og konfidensialitet under overføring og lagring. Vår funksjon **objektlåsning** beskytter dine kritiske data mot utilsiktet sletting eller ransomware-angrep ved å gjøre objekter uforanderlige i en spesifisert tidsperiode.

Skybaserte applikasjoner er avhengige av dataaksess med lav forsinkelse og raske overføringer. Våre **optimerte overføringer** muliggjør effektiv datahåndtering gjennom ytelsesforbedringer som parallelle opplastinger og multipart-overføringer.

I tillegg tilbyr vår løsning enkel integrasjon med eksisterende S3-verktøy og applikasjoner, uten behov for endringer. Med bred applikasjonsstøtte er Safespring Storage kompatibel med populære programmer som Veeam Backup, Nextcloud, Cyberduck og flere.

## Safespring Storage finnes i to versjoner

Trenger applikasjonen din rask tilgang til lagrede data, eller ser du etter en langsiktig lagringsløsning for sikkerhetskopiering utenfor stedet?

{{< icon-block-horisontal icon="fa-solid fa-rabbit-running" color="#3C9BCD" text="S3 Standardlagring" description="Vår standard S3-tjeneste med lav forsinkelse og høy ytelse. Optimalisert for applikasjoner som krever rask og pålitelig dataaksess." >}}
{{< icon-block-horisontal icon="fa-solid fa-boxes-packing" color="#3C9BCD" text="S3 Arkivlagring" description="En kostnadseffektiv S3-tjeneste utformet for arkiveringsformål, ideell for å lagre større objekter som skrives én gang og sjelden leses." >}}

## Nøkkelfunksjoner

1. Ingen trafikkostnad belastes fra tjenesten, det som kalles egress-cost og ingress-cost. Du kan lese mer om denne funksjonen i vår artikkel: [Safespring tar ikke ut noen trafikkavgifter](/blogg/2023/2023-03-egress-cost/).
1. Safespring Storage prioriterer datasikkerheten din. Med funksjoner som objektlåsning og ACL-er har du full kontroll over dataenes tilgjengelighet og beskyttelse.
1. Betal kun for lagringen du bruker. Safespring Storage tilbyr [fleksible prismodeller](/pris/#safespring-storage-s3) som kan tilpasses dine spesifikke behov, noe som gir kostnadsbesparelser når du skalerer.
1. Vårt erfarne kundestøtteteam er tilgjengelig for å hjelpe deg med alle spørsmål eller utfordringer, noe som sikrer en smidig Safespring-opplevelse.

### Bruksområder

#### Innholdslagring og distribusjon

Lagre og distribuer store mediefiler, dokumenter og andre digitale eiendeler effektivt til ditt globale publikum. Bruk Safespring Storage som en mediaserver for å strømme video over HLS. Safespring bruker våre egne tjenester. [Våre webcasts strømmes fra Safespring Storage](/webinar/).

#### Stordataanalyse

Utnytt Safespring Storage til å lagre store datasett som kreves for analyse- og maskinlæringsapplikasjoner. Les mer om hvordan [SciLifeLab bruker Safespring til forskning innen livsvitenskap](/services/case/scilifelab/.

#### Databackup og gjenoppretting

Vår backup-tjeneste bruker Safespring Storage som grunnlag for å sikre sikkerhetskopiering av dine kritiske data og sikre rask gjenoppretting ved katastrofer eller datatap.

#### Samsvar og arkivering

Oppfyll regulatoriske krav ved å lagre og arkivere data sikkert med uforanderlighet og revisjonsmuligheter.

## Kom i gang med våre konfigurasjonsguider

{{< icon-block-small-container >}}
{{< icon-block-small icon="fa-solid fa-terminal" text="s3fs" link="https://docs.safespring.com/storage/howto/configs/s3fs/" color="#32cd32">}}
{{< icon-block-small icon="fa-solid fa-cloud" text="CloudBerry" link="https://docs.safespring.com/storage/howto/configs/cloudberry/" color="#417DA5">}}
{{< icon-block-small icon="fa-solid fa-duck" text="CyberDuck" link="https://docs.safespring.com/storage/howto/configs/cyberduck/" color="#3C9BCD">}}
{{< icon-block-small icon="fa-solid fa-duck" text="Duck CLI" link="https://docs.safespring.com/storage/howto/configs/duck-cli/" color="#3C9BCD">}}
{{< icon-block-small icon="fa-solid fa-server" text="MinIO Client" link="https://docs.safespring.com/storage/howto/configs/minio-client/" color="#FA690F">}}
{{< icon-block-small icon="fa-solid fa-cloud-upload-alt" text="AWS-CLI" link="https://docs.safespring.com/storage/howto/configs/aws-cli/" color="#32cd32">}}
{{< icon-block-small icon="fa-solid fa-cloud" text="NextCloud" link="https://docs.safespring.com/storage/howto/configs/nextcloud-s3/" color="#32cd32">}}
{{< /icon-block-small-container >}}

## Ofte stilte spørsmål

{{% question question="Hva er objektlåsning og hvordan beskytter det dataene mine?" %}}
Objektlåsning er en funksjon som gjør objekter uforanderlige i en angitt tidsperiode og forhindrer at de slettes eller overskrives. Dette beskytter dataene dine mot utilsiktet sletting og ransomware-angrep.
{{% /question %}}

{{% question question="Er Safespring Storage kompatibelt med mine eksisterende S3-verktøy?" %}}
Ja, Safespring Storage er fullt S3-kompatibelt, slik at du kan bruke dine eksisterende verktøy og applikasjoner uten endringer.
{{% /question %}}

{{< distance >}}

{{% custom-card image="/img/card/safespring-daniel.webp" cardtitle="Kontakt oss i dag" alt="Kontakt Safespring" %}}
Oppdag det fulle potensialet i dataene dine med Safespring Storage. Vårt team er klart til å hjelpe deg med å finne den perfekte lagringsløsningen for virksomhetens behov.

[hello@safespring.com](mailto:hello@safespring.com)
{{% /custom-card %}}

{{< accordion-script >}}
