---
ai: true
title: "Nyttige (måske) OpenStack-API-tricks til at muliggøre mere automatisering"
date: "2022-09-20"
intro: "Sådan får du oplysninger, der ellers ikke er direkte tilgængelige fra Openstack API'et"
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknisk opdatering"
author: "Jarle Bjørgeengen"
language: "da"
toc: "Indholdsfortegnelse"
aliases:
  - /blogg/2022-09-api-play
  - /blogg/2022/2022-09-api-play/
---
{{< ingress >}}
Safespring fremmer så meget automatisering som muligt ved hjælp af standardværktøjer som Terraform og Ansible. Nogle gange er det dog nødvendigt at gå et spadestik dybere for at finde de sidste manglende oplysninger og dermed skabe en fuldstændig automatisering.
{{< /ingress >}}

## Introduktion (problemformulering)

På Safesprings platform er den S3-kompatible lagringstjeneste og den OpenStack-baserede computetjeneste nu integreret. Det betyder, at når du har adgang til compute-platformen, kan du også hente legitimationsoplysninger til den integrerede S3-tjeneste via web-GUI’et og/eller kommandolinjegrænsefladen (CLI).

### Openshift-installationsprogram

Vi har lavet et [Openshift-installationsprogram][okdinstaller], der gør det nemt at installere Openshift på Safespring ved at pakke lidt værktøj omkring det officielle [UPI-installationsprogram][okdupi].

Dette installationsprogram kræver en S3-bucket for at placere boot-nodens ignition-fil, fordi [filen er for stor][userdatasize] til at sende direkte til OpenStack-API’et som [user_data][userdata]. I stedet [forhåndssignerer][presign] installationsprogrammet et S3-objekt og instruerer bootstrap-nodens ignition-fil i at hente den «rigtige» ignition-fil fra den URL. Kort sagt: Installationsprogrammet skal have en S3-bucket og legitimationsoplysninger til den for at fungere.

Openshift-installationsprogrammet blev lavet, før Safespring havde S3 integreret i compute-tjenesten, og det var lidt besværligt, at installationsprogrammet var afhængigt af en manuelt vedligeholdt S3-tjeneste, som var den tidligere metode.

### Hent legitimationsoplysninger

Nu hvor S3 er integreret, bør installationsprogrammet automatisk hente legitimationsoplysninger og S3 endpoint-URL, oprette en bucket, uploade ignition-filen til bucketen, forhåndssignere den og indsætte den forhåndssignerede URL i ignition-filen for bootstrap-noden.

Dette blogindlæg beskriver læringspunkterne (som også kan være nyttige i andre automatiseringskontekster) fra processen, der førte til [ændringen i installationsprogrammet][installerchange].

## Indhentning af information via kommandolinjegrænsefladen (CLI)

For at kunne uploade og efterfølgende downloade via presign-metoden skal man programmæssigt indhente tre informationer: S3 access key, S3 secret key og S3 endpoint URL. Jeg forventede, at dette ville være trivielt, og for S3 access key og S3 secret key var det rigtigt. Det er så enkelt som:
```shell
$ export AWS_ACCESS_KEY_ID="$(openstack ec2 credential list -c Access  -f value)"
$ export AWS_SECRET_ACCESS_KEY="$(openstack ec2 credential list -c Secret  -f value)"
```
Så for automatisk at bruge den integrerede S3-tjeneste har vi kun brug for én oplysning mere: S3-tjenestens endpoint-URL. Det burde være lige til, ikke? Forkert! Tja, når du først ved, hvordan man gør, er det faktisk ikke så slemt.

## Hentning af S3-endpoint-URL med curl og OpenStack-API'et

Lad os starte med den rene API-tilgang for at forstå, hvad der foregår. Disse eksempler er stærkt inspireret af OpenStack API curl [eksempler][oscurlexamples].

Først autentificerer vi med projektscope. Lad os oprette en shell-funktion til at forberede JSON-data, som vi senere kan POST'e med curl:
```shell
function gen_os_auth_data_project_scope {
cat <<EOF
{ "auth": {
    "identity": {
      "methods": ["password"],
      "password": {
        "user": {
          "name": "${OS_USERNAME}",
          "domain": { "name": "${OS_USER_DOMAIN_NAME}"},
          "password": "${OS_PASSWORD}"
        }
      }
    },
    "scope": {
      "project": {
        "domain": { "name": "${OS_PROJECT_DOMAIN_NAME}" },
        "name": "${OS_PROJECT_NAME}"
       }
     }
  }
}
EOF
}
```
For at denne funktion virker, skal du sikre, at miljøvariablerne i funktionen er korrekt sat, før brug (på samme måde som når du bruger Openstack CLI eller Terraform)..

Herefter bruger vi curl til at hente JSON-data fra OpenStack API'et:
```shell
$ curl  -s -H "Content-Type: application/json" -d"$(gen_os_auth_data_project_scope)" "${OS_AUTH_URL}/auth/tokens"
```
Miljøvariablen `OS_AUTH_URL` indeholder det samme, som du ville angive, når du bruger [OpenStack CLI][osclidoc]. Kommandoen ovenfor giver dig det, som OpenStack CLI gennemsigtigt bruger til at finde endepunkter for alle de OpenStack-tjenester, som `OS_AUTH_URL` «annoncerer», nemlig tjenestekataloget, sammen med et kortlivet token til at få adgang til dem. Du er velkommen til at udforske datastrukturen, men for nu er vi kun interesserede i vores manglende oplysning: S3-endepunktets URL, som bør være den samme som den, der er angivet i GUI’en under «API Access / view credentials».

Så for at få netop det, kan vi gøre:
```shell
curl  -s -H "Content-Type: application/json" -d"$(gen_os_auth_data_project_scope)" "${OS_AUTH_URL}/auth/tokens"|jq '.token.catalog[]|select(.type=="s3").endpoints[0].url' -r
```
Nu har vi set, hvordan man får S3-endpointets URL, når man autentificerer som en personlig OpenStack-bruger. Den anbefalede måde at autentificere mod OpenStack fra scripts eller anden automationskode er dog at bruge [OpenStack
applikationslegitimationsoplysninger][appcred]. Applikationslegitimationsoplysninger giver kun adgang til det projekt, de blev oprettet i. Personlige legitimationsoplysninger kan have langt bredere adgang og udgør derfor en langt større konsekvens ved et brud. Applikationslegitimationsoplysninger er lette at rotere og bør have en anden (kortere) livscyklus end dine personlige legitimationsoplysninger, og sidst men ikke mindst risikerer du ikke at eksponere dine personlige legitimationsoplysninger, når du bruger applikationslegitimationsoplysninger fra kørende kode.

Så lad os se, hvordan vi kan få S3-endpointets URL ved at autentificere med et sæt applikationslegitimationsoplysninger. Fremgangsmåden er ikke meget anderledes. Forskellen er, at vi nu vil autentificere med «globalt scope». Sådan her:
```shell
function gen_os_auth_data_appcred_global_scope {
cat <<EOF
{ "auth": {
    "identity": {
      "methods": ["application_credential"],
      "application_credential": {
        "id": "${OS_APPLICATION_CREDENTIAL_ID}",
        "secret": "${OS_APPLICATION_CREDENTIAL_SECRET}"
      }
    }
  }
}
EOF
}
```
Du skal naturligvis igen sætte miljøvariablerne i overensstemmelse med de
oplysninger, du fik, da du oprettede [applikationslegitimationsoplysninger][appcred]. Ellers er det
det samme:
```shell
curl  -s -H "Content-Type: application/json" -d"$(gen_os_auth_data_appcred_global_scope)" "${OS_AUTH_URL}/auth/tokens"|jq '.token.catalog[]|select(.type=="s3").endpoints[0].url' -r
```
## Hent S3-endpoint-URL'en med Python eller Ansible

Det er også muligt at hente servicekataloget både direkte fra Python ved hjælp af [OpenStack Python-SDK][pysdk] og med [Ansible][ansibleosauth].

For at hente S3-endpoint-URL'en med Python-SDK'et kan du gøre følgende:
```python
# cloud is an entry in your clouds.yaml containing the other necessary parameters for talking to the Openstack API
conn = openstack.connect(cloud=cloud, username=os.environ['OS_USERNAME'], password=os.environ['OS_PASSWORD'])
print(conn.endpoint_for('s3'))
```
For at få S3-endpointets URL med Ansible kan du gøre sådan her:
```ansible
  - name: Authenticate to the cloud and retrieve the service catalog
      openstack.cloud.auth:

    - name: Set fact, s3 endpoint
      ansible.builtin.set_fact:
        s3_endpoint_url: "{{ item }}"
      loop: "{{ service_catalog|community.general.json_query('[?type==`s3`].endpoints[0].url') }}"
```
`service_catalog` udfyldes med data af modulet `openstack.cloud.auth`, og værdien af S3-endpointets URL hentes derfra ved at løbe igennem listen over endpoints for S3-tjenesten (som i vores tilfælde kun indeholder ét element), ved hjælp af Jinja-filteret `community.general.json_query`.

Dette kræver, at dit miljø og/eller `clouds.yaml`/`secure.yaml` indeholder de nødvendige oplysninger; det samme som hvis du ville bruge [OpenStack CLI][osclidoc].

[ansibleosauth]: https://docs.ansible.com/ansible/latest/collections/openstack/cloud/auth_module.html
[pysdk]: https://docs.openstack.org/openstacksdk/latest/
[oscurlexamples]: https://docs.openstack.org/keystone/latest/api_curl_examples.html
[userdatasize]: https://docs.openstack.org/api-ref/compute/?expanded=create-server-detail#create-server
[userdata]: https://docs.openstack.org/nova/rocky/user/user-data.html
[presign]: https://docs.aws.amazon.com/cli/latest/reference/s3/presign.html
[installerchange]: https://github.com/safespring-community/utilities/commit/0ee81dc0fbd47419fd32e965c14cf5349aa329c1
[okdupi]: https://docs.okd.io/latest/installing/installing_openstack/installing-openstack-user.html
[okdinstaller]: https://github.com/safespring-community/utilities/tree/main/okd
[ksparams]: https://github.com/kubernetes-sigs/kubespray/blob/master/docs/vars.md
[kubespray]: https://github.com/kubernetes-sigs/kubespray
[sftfmodules]: https://github.com/safespring-community/terraform-modules
[sftfexamples]: https://github.com/safespring-community/terraform-modules/tree/main/examples
[sshblog]: /blogg/2022-03-ssh-keys/
[netblog]: /blogg/2022-03-network/
[tfdocs]: https://www.terraform.io/docs
[tfreleases]: https://releases.hashicorp.com/terraform/
[osclidoc]: https://docs.safespring.com/new/api/
[appcred]: https://docs.safespring.com/new/app-creds/