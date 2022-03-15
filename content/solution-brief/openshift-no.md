---
title: "OpenShift kjører smidig på Safesprings plattform"
date: 2021-12-07T13:58:58+01:00
draft: false
tags: ["Norsk"]
intro: "Med vårt eget OKD-installasjonsprogram kan du raskt få et OpenShift-cluster up-and-running."
background: "safespring-compute.jpg"
sidebarlinkname: "Kontakt oss"
sidebarlinkurl: "/no/kontakt"
socialmedia: "safespring-compute.jpg"
devops: ""
card: "safespring-openshift.svg"
sidebarimage: "safespring-openshift.svg"
background: "safespring-openshift.png"
socialmediabild: "safespring_social_21.gif"
form: "yes"
toc: "Innholdsfortegnelse"
language: "No"
---

![Safespring OpenShift benefits](/img/safespring_key-points-openshift-2.svg)

{{% ingress %}}
Containere krever fleksibilitet. Safesprings plattform er skapt for skalerbarhet, høy sikkerhet og er optimalisert for OpenShift-clusterressurskrav.
{{% /ingress %}}

Safesprings Compute-tjeneste gir deg alle ressursene du trenger for å kjøre OKD, åpen kildekodeversjon av Kubernetes basert på RedHat OpenShift.

Kjører du OpenShift on-prem i dag? Med en norsk skytjeneste som grunnlag for din OKD-cluster får du både skalerbarheten og sikkerheten til en administrert infrastrukturplattform. La utviklerne dine fokusere på OpenShift og betal kun for ressursene du bruker.

<div style="margin-bottom:50px;"></div>

![Safespring OpenShift installer demo](/img/event/safespring-video-placeholder.svg)

## Installer OKD med vår Terraform-modul og installer

{{% ingress %}}
Lær alt som trengs for å sette opp community-distribusjonen til Kubernetes som kjører RedHat OpenShift (OKD) på Safesprings skyplattform.
{{% /ingress %}}

Med disse verktøyene kan du gi en OKD-cluster på omtrent en time. Installasjonen gir en minimal OKD-klynge med tre mastere og to arbeidsnoder med en minimumsinstansstørrelse.

På Safesprings Openstack-baserte infrastrukturplattform kan du raskt distribuere en OKD-klynge med vår [terraform-modul][1] og [verktøyene for å instansiere cluster][2].

{{< 2calltoaction "Last ned Terraform-modul" "https://github.com/safespring-community/terraform-modules/tree/main/v2-okd-cluster-local-disk-gandi-dns" "Last ned OKD-installer" "https://github.com/safespring-community/utilities/tree/main/okd" >}}

<div style="margin-bottom:50px;"></div>

### Du trenger dette for å komme i gang

- Et prosjekt på [Safespring Compute](/no/tjenester/compute/) med følgende ressurser:
    - Memory: 60GB
    - VCPUs: 16
    - Security group rules: 40
    - Storage access to S3 in our STO2 site
    - A liveDNS domain @ gandi.net
    - An API key for your gandi.net user

### Terraform-modulen
Kjernen i vårt utviklede verktøy er Terraform-modulen, som gir alle nødvendige ressurser som en OKD-klynge trenger for å sette sammen selv, dvs. beregne noder med forskjellige roller (oppstart, master, arbeider), blokklagring, sikkerhet, grupper, nettverk, DNS-poster, nøkkelpar, og så videre. Modulen er så generell som den kan bli.

### Inndataparametere
For å gi klyngen trenger den en stor mengde inndataparametere. Du kan velge å angi disse parametrene for å passe dine behov, men vi har laget et abstraksjonslag som dekker hverdagsbruk for å gjøre dette så enkelt som mulig. Verktøyet vi har utviklet sikrer at du har alle avhengigheter på plass og gjør nødvendig konfigurasjon fra maler.

Verktøyet tar noen få innganger som klyngenavn, DNS-domene, S3-bøtte (for den store tenningsfilen for startnoden) og konverterer disse til nyttige parametere for Terraform-modulen. En malgenerert "main.tf" inneholder disse parameterne og referansene til modulen. "main.tf"-filen brukes til klargjøring.

## Resultater
Installasjonen gir en minimal OKD-klynge med tre mastere og to arbeidsnoder med en minimumsinstansstørrelse. Du kan overstyre forekomststørrelsen og andre parametere (som antall forskjellige noder) gjennom "settings.yml"-filen.

{{< 2calltoaction "Last ned Terraform-modul" "https://github.com/safespring-community/terraform-modules/tree/main/v2-okd-cluster-local-disk-gandi-dns" "Last ned OKD-installer" "https://github.com/safespring-community/utilities/tree/main/okd" >}}

[1]:https://github.com/safespring-community/terraform-modules/tree/main/v2-okd-cluster-local-disk-gandi-dns
[2]:https://github.com/safespring-community/utilities/tree/main/okd
