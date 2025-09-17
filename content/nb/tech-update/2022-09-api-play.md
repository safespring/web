---
ai: true
title: "Nyttige (kanskje) OpenStack-API-triks som legger til rette for mer automatisering"
date: "2022-09-20"
intro: "Hvordan innhente informasjon som ellers ikke er direkte tilgjengelig via OpenStack-API-et"
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknologioppdatering"
author: "Jarle Bjørgeengen"
language: "nb"
toc: "Innholdsfortegnelse"
aliases:
  - /blogg/2022-09-api-play
  - /blogg/2022/2022-09-api-play/
---
{{< ingress >}}
Safespring fremmer så mye automatisering som mulig ved hjelp av standardverktøy som Terraform og Ansible. Noen ganger er det likevel nødvendig å gå ett hakk dypere for å finne manglende brikker av informasjon for å kunne lage en komplett automatisering.
{{< /ingress >}}

## Introduksjon (problemstilling)

På Safespring-plattformen er den S3-kompatible lagringstjenesten og den OpenStack-baserte compute-tjenesten nå integrert. Det betyr at når du har tilgang til compute-plattformen, kan du også hente legitimasjon for å få tilgang til den integrerte S3-tjenesten via web-GUI og/eller kommandolinjegrensesnittet (CLI).

### Openshift-installasjonsprogram

Vi har laget et [Openshift-installasjonsprogram][okdinstaller] som gjør det enkelt å installere Openshift på Safespring ved å legge litt verktøy rundt det offisielle [UPI-installasjonsprogrammet][okdupi].

Dette installasjonsprogrammet trenger en S3-bucket for å plassere ignition-filen til oppstarts­noden, fordi [filen er for stor][userdatasize] til å sendes direkte til OpenStack-API-et som [user_data][userdata]. I stedet [forhåndssignerer][presign] installasjonsprogrammet et S3-objekt og instruerer ignition-filen for bootstrap-noden om å hente den «egentlige» ignition-filen fra den URL-en. Kort fortalt: installasjonsprogrammet må ha en S3-bucket og legitimasjon for den for å fungere.

Openshift-installasjonsprogrammet ble laget før Safespring hadde S3 integrert i compute-tjenesten, og det var litt tungvint at installasjonsprogrammet var avhengig av en manuelt vedlikeholdt S3-tjeneste, som var metoden brukt tidligere.

### Hente legitimasjon

Nå som S3 er integrert, bør installasjonsprogrammet automatisk hente legitimasjon og S3-endepunkt-URL, opprette en bucket, laste opp ignition-filen til bucketen, forhåndssignere den og injisere den forhåndssignerte URL-en i ignition-filen for bootstrap-noden.

Dette blogginnlegget beskriver læringspunktene (som kan være nyttige i andre automatiseringskontekster) fra prosessen som ledet fram til [endringen i installasjonsprogrammet][installerchange].

## Hente informasjon med kommandolinjegrensesnittet (CLI)

For å laste opp, og deretter laste ned ved å bruke forhåndssignering, må vi programmessig hente tre opplysninger: S3 access key, S3 secret key og S3-endepunkt-URL. Jeg forventet at dette skulle være trivielt, og for S3 access key og S3 secret key stemte det. Det er så enkelt som:```shell
$ export AWS_ACCESS_KEY_ID="$(openstack ec2 credential list -c Access  -f value)"
$ export AWS_SECRET_ACCESS_KEY="$(openstack ec2 credential list -c Secret  -f value)"
```
Så, for å automatisk bruke den integrerte S3-tjenesten trenger vi bare én opplysning til: S3-tjenestens endepunkt-URL. Burde være like enkelt, ikke sant? Feil! Vel, når du først vet hvordan du gjør det, er det faktisk ikke så ille.

## Hente S3-endepunkt-URL med curl og OpenStack API

La oss starte med en ren API-tilnærming for å forstå hva som skjer. Disse eksemplene er sterkt inspirert av OpenStack API sine curl-[eksempler][oscurlexamples].

Først autentiserer vi med prosjekt-scope. La oss lage en shell-funksjon for å sende JSON-data vi skal POST-e med curl senere:```shell
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
For at denne funksjonen skal fungere, må du sørge for at miljøvariablene i funksjonen er riktig konfigurert før bruk (på samme måte som når du bruker OpenStack CLI eller Terraform).

Deretter bruker vi curl til å hente JSON-data fra OpenStack API-et:```shell
$ curl  -s -H "Content-Type: application/json" -d"$(gen_os_auth_data_project_scope)" "${OS_AUTH_URL}/auth/tokens"
```
Miljøvariabelen `OS_AUTH_URL` inneholder det samme som du ville oppgitt når du bruker [OpenStack-CLI][osclidoc]. Kommandoen over gir deg det som OpenStack-CLI umerkelig bruker for å finne endepunkter for alle OpenStack-tjenestene som `OS_AUTH_URL` «annonserer», nemlig tjenestekatalogen, sammen med et kortvarig token for å få tilgang til dem. Du kan gjerne utforske datastrukturen som du vil, men foreløpig er vi bare interessert i den manglende biten med informasjon: S3-endepunktets URL, som skal være den samme som den som er oppført i GUI-en under «API Access / view credentials».

Så for å få akkurat det, kan vi gjøre:```shell
curl  -s -H "Content-Type: application/json" -d"$(gen_os_auth_data_project_scope)" "${OS_AUTH_URL}/auth/tokens"|jq '.token.catalog[]|select(.type=="s3").endpoints[0].url' -r
```
Nå har vi sett hvordan vi får tak i S3-endepunktets URL når vi autentiserer som en personlig OpenStack-bruker. Den anbefalte måten å autentisere mot OpenStack fra skript, eller annen automasjonskode, er imidlertid å bruke [OpenStack-applikasjonslegitimasjon][appcred]. En applikasjonslegitimasjon gir bare tilgang til prosjektet den ble opprettet i. Personlige legitimasjonsopplysninger kan ha langt bredere tilgang og utgjør derfor en mye større risiko dersom de blir kompromittert. Applikasjonslegitimasjon er lett å rotere og bør ha en annen (kortere) livssyklus enn dine personlige legitimasjonsopplysninger, og ikke minst: når du bruker applikasjonslegitimasjon, risikerer du ikke å eksponere personlige legitimasjonsopplysninger i kode som kjører.

La oss derfor se hvordan vi kan hente S3-endepunktets URL ved å autentisere med et sett med applikasjonslegitimasjon. Fremgangsmåten er ikke så ulik. Forskjellen er at vi nå autentiserer med «globalt scope». Slik:```shell
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
Du må selvfølgelig på nytt sette miljøvariablene i samsvar med informasjonen
fra opprettelsen av [applikasjonslegitimasjonene][appcred]. Ellers er det det
samme:```shell
curl  -s -H "Content-Type: application/json" -d"$(gen_os_auth_data_appcred_global_scope)" "${OS_AUTH_URL}/auth/tokens"|jq '.token.catalog[]|select(.type=="s3").endpoints[0].url' -r
```
## Hente S3-endepunkt-URL ved hjelp av Python eller Ansible

Det er også mulig å hente tjenestekatalogen både direkte fra Python ved å bruke
[OpenStack Python SDK][pysdk] og med [Ansible][ansibleosauth].

For å hente S3-endepunkt-URL-en med Python SDK kan du gjøre dette:```python
# cloud is an entry in your clouds.yaml containing the other necessary parameters for talking to the Openstack API
conn = openstack.connect(cloud=cloud, username=os.environ['OS_USERNAME'], password=os.environ['OS_PASSWORD'])
print(conn.endpoint_for('s3'))
```
For å hente URL-en til S3-endepunktet med Ansible kan du gjøre dette:```ansible
  - name: Authenticate to the cloud and retrieve the service catalog
      openstack.cloud.auth:

    - name: Set fact, s3 endpoint
      ansible.builtin.set_fact:
        s3_endpoint_url: "{{ item }}"
      loop: "{{ service_catalog|community.general.json_query('[?type==`s3`].endpoints[0].url') }}"
```
`service_catalog` fylles med data av modulen `openstack.cloud.auth`, og verdien av S3-endepunktets URL hentes fra den ved å iterere over listen over endepunkter for S3-tjenesten (som i vårt tilfelle bare inneholder ett element), ved å bruke Jinja-filteret `community.general.json_query`.

Dette krever at miljøet ditt og/eller `clouds.yaml`/`secure.yaml` inneholder nødvendig informasjon; det samme som om du skulle bruke [OpenStack-kommandolinje (CLI)][osclidoc].

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