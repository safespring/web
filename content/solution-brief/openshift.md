---
title: "OpenShift kör smidigt på Safesprings plattform"
date: 2021-12-07T13:58:58+01:00
draft: false
tags: ["Svenska"]
intro: "Med vår egen OKD-installer kan du snabbt få ett OpenShift-cluster up-and-running."
background: "safespring-compute.jpg"
sidebarlinkname: "Kontakta oss"
sidebarlinkurl: "/kontakt"
socialmedia: "safespring-compute.jpg"
devops: ""
card: "safespring-openshift.svg"
sidebarimage: "safespring-openshift.svg"
background: "safespring-openshift.png"
socialmediabild: "safespring_social_21.gif"
form: "yes"
toc: "Innehållsförteckning"
---

![Safespring OpenShift benefits](/img/safespring_key-points-openshift-1.svg)

{{% ingress %}}
Containrar kräver flexibilitet. Safesprings plattform är skapad för skalbarhet, hög säkerhet och är optimerat för OpenShift-clusters resurskrav.
{{% /ingress %}}

Safesprings Compute-tjänst ger dig alla resurser som krävs för att köra OKD, open source versionen av Kubernetes som bygger på Red Hat OpenShift.

Kör ni OpenShift on-prem idag? Med en svensk molntjänst som grund för ert OKD-cluster får ni både skalbarheten och säkerheten hos en managerad infrastruktur­plattform. Låt era utvecklare fokusera på OpenShift och betala endast för de resurser ni förbrukar.

<div style="margin-bottom:50px;"></div>

![Safespring OpenShift installer demo](/img/event/safespring-video-placeholder.svg)

## Installera OKD med vår Terraform-modul och installer

{{% ingress %}}
Lär dig allt som krävs för att sätta upp community­distributionen av Kubernetes som driver RedHat OpenShift (OKD) på Safesprings molnplattform.
{{% /ingress %}}

Med dessa verktyg kan du tillhandahålla ett OKD-kluster på ungefär en timme. Installationen ger ett minimalt OKD-kluster med tre masters och två arbetsnoder med minimal instans­storlek.

På Safesprings Openstack-baserade infrastruktur­plattform kan du snabbt distribuera ett OKD-kluster med vår [terraform-modul][1] och [verktygen för att instansiera kluster][2].

{{< 2calltoaction "Hämta Terraform-modul" "https://github.com/safespring-community/terraform-modules/tree/main/v2-okd-cluster-local-disk-gandi-dns" "Hämta OKD-installer" "https://github.com/safespring-community/utilities/tree/main/okd" >}}

<div style="margin-bottom:50px;"></div>

### Detta behöver du för att köra igång

- Ett projekt på [Safespring Compute](/compute) med följande resurser:
    - Memory: 60GB
    - VCPUs: 16
    - Security group rules: 40
    - Storage access to S3 in sto2 site
    - A liveDNS domain @ gandi.net
    - An API key for your gandi.net user

### Terraform-modulen
Kärnan vårt framtagna verktyg är Terraform-modulen som tillhandahåller alla nödvändiga resurser som ett OKD-kluster behöver för att sätta ihop sig själv, dvs. beräkna noder med olika roller (boot, master, worker), blocklagring, säkerhet, grupper, nätverk, DNS-poster, nyckelpar, och så vidare. Modulen är så generell som den kan vara.

### Indataparametrar
För att tillhandahålla klustret behöver det en stor mängd indataparametrar. Du kan välja att tillhandahålla dessa parametrar för att passa dina behov, men vi gjorde ett abstraktionslager som täcker vardagliga användningsfall för att göra detta så enkelt som möjligt. Det verktyg vi tagit fram ser till att du har alla beroenden på plats och gör den nödvändiga konfigurationen från mallar.

Verktyget tar några få ingångar som klusternamn, DNS-domän, S3-bucket (för den stora ignition-filen för startnoden) och konverterar dessa till användbara parametrar för Terraform-modulen. En mallgenererad "main.tf" innehåller dessa parametrar och referenser till modulen. Filen "main.tf" används för provisioneringen.

## Resultat
Installationen ger ett minimalt OKD-kluster med tre masters och två arbetsnoder med minimal instansstorlek. Du kan åsidosätta instansstorleken och andra parametrar (som antalet olika noder) genom filen "settings.yml".

{{< 2calltoaction "Hämta Terraform-modul" "https://github.com/safespring-community/terraform-modules/tree/main/v2-okd-cluster-local-disk-gandi-dns" "Hämta OKD-installer" "https://github.com/safespring-community/utilities/tree/main/okd" >}}

[1]:https://github.com/safespring-community/terraform-modules/tree/main/v2-okd-cluster-local-disk-gandi-dns
[2]:https://github.com/safespring-community/utilities/tree/main/okd
