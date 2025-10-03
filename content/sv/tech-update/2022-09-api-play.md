---
ai: true
title: "Användbara (kanske) OpenStack-API-knep för ökad automatisering"
date: "2022-09-20"
intro: "Hur man får fram information som annars inte är direkt tillgänglig via Openstack-API:t"
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknikuppdatering"
author: "Jarle Bjørgeengen"
language: "sv"
toc: "Innehållsförteckning"
aliases:
  - /blogg/2022-09-api-play
  - /blogg/2022/2022-09-api-play/
---
{{< ingress >}}
Safespring förespråkar så mycket automatisering som möjligt med standardverktyg
som Terraform och Ansible. Ibland behöver man dock gräva ett steg
djupare för att hitta saknade informationsbitar för att kunna skapa en komplett automatisering.
{{< /ingress >}}

## Introduktion (Problemformulering)

På Safesprings plattform är den S3-kompatibla lagringstjänsten och den OpenStack-
baserade compute-tjänsten numera integrerade. Det innebär att när du har åtkomst till
compute-plattformen kan du också hämta autentiseringsuppgifter för att komma åt den integrerade S3-
tjänsten via webbgränssnittet (GUI) och/eller kommandoradsgränssnittet (CLI).

### Openshift-installationsprogram

Vi har skapat ett [Openshift-installationsprogram][okdinstaller] som gör det enkelt att
installera Openshift på Safespring genom att kapsla in viss verktygskod runt det officiella
[UPI-installationsprogrammet][okdupi].

Detta installationsprogram kräver en S3-bucket för att placera Ignition-filen för
startnoden, eftersom [filen är för stor][userdatasize] för att skickas direkt till
OpenStack API som [user_data][userdata]. I stället [presignerar][presign]
installationsprogrammet ett S3-objekt och instruerar Ignition-filen för
bootstrap-noden att hämta den ”riktiga” Ignition-filen från den URL:en. Kort sagt:
installationsprogrammet måste ha en S3-bucket och tillhörande autentiseringsuppgifter
för att fungera.

Openshift-installationsprogrammet skapades innan Safespring hade S3 integrerat i
compute-tjänsten, och det var lite omständligt att installationsprogrammet var beroende av en
manuellt hanterad S3-tjänst, vilket var metoden som användes tidigare.

### Hämta autentiseringsuppgifter

Nu när S3 är integrerat ska installationsprogrammet automatiskt hämta
autentiseringsuppgifter och S3:s endpoint-URL, skapa en bucket, ladda upp
Ignition-filen till bucketen, presignera den och injicera den presignerade URL:en i
Ignition-filen för bootstrap-noden.

Denna bloggpost beskriver lärdomarna (som kan vara användbara i andra
automatiseringssammanhang) från processen som ledde fram till [ändringen i installationsprogrammet][installerchange].

## Hämta information med kommandoradsgränssnittet (CLI)

För att kunna ladda upp, och sedan ladda ner med presign-metoden, behöver vi
programmässigt hämta tre saker: S3 access key, S3 secret key och S3 endpoint-URL. Jag
trodde att detta skulle vara trivialt, och för S3 access key och S3 secret key var det
också sant. Det är så enkelt som:
```shell
$ export AWS_ACCESS_KEY_ID="$(openstack ec2 credential list -c Access  -f value)"
$ export AWS_SECRET_ACCESS_KEY="$(openstack ec2 credential list -c Secret  -f value)"
```
Så, för att automatiskt använda den integrerade S3-tjänsten behöver vi bara en uppgift till: S3-tjänstens endpoint-URL. Borde vara lika enkelt, eller hur? Fel! Nå, när du väl vet hur man gör är det faktiskt inte så farligt.

## Hämta S3-endpoint-URL med curl och OpenStack-API:t

Vi börjar med det rena API-angreppssättet för att förstå vad som pågår. Dessa exempel är starkt inspirerade av OpenStack-API:s curl-[exempel][oscurlexamples].

Först autentiserar vi med projektscope. Låt oss skapa en shell-funktion för att senare skicka JSON-data med POST via curl:
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
För att den här funktionen ska fungera måste du se till att miljövariablerna i
funktionen är korrekt inställda före användning (på samma sätt som när du använder
OpenStack CLI eller Terraform).

Därefter använder vi curl för att hämta JSON-data från OpenStack API:t:
```shell
$ curl  -s -H "Content-Type: application/json" -d"$(gen_os_auth_data_project_scope)" "${OS_AUTH_URL}/auth/tokens"
```
Miljövariabeln `OS_AUTH_URL` innehåller samma sak som du skulle ange när du använder [OpenStack CLI][osclidoc]. Kommandot ovan ger dig det som OpenStack CLI transparent använder för att hitta slutpunkter för alla OpenStack-tjänster som `OS_AUTH_URL` ”annonserar”, nämligen tjänstekatalogen, tillsammans med en kortlivad åtkomsttoken för att komma åt dem. Utforska gärna datastrukturen som du vill, men just nu är vi bara intresserade av vår saknade uppgift: S3-slutpunktens URL, som bör vara densamma som den som listas i GUI:t under «API Access / view credentials».

Så för att få fram just det kan vi göra:
```shell
curl  -s -H "Content-Type: application/json" -d"$(gen_os_auth_data_project_scope)" "${OS_AUTH_URL}/auth/tokens"|jq '.token.catalog[]|select(.type=="s3").endpoints[0].url' -r
```
Nu har vi sett hur man får fram S3‑slutpunkts‑URL:en när man autentiserar sig som en personlig OpenStack‑användare. Det rekommenderade sättet att autentisera mot OpenStack från skript, eller någon form av automationskod, är dock att använda [OpenStack‑applikationsuppgifter][appcred]. Applikationsuppgifter ger endast åtkomst till det projekt de skapades i. Personliga inloggningsuppgifter kan ha mycket bredare åtkomst och innebär därför en betydligt större påverkan om de komprometteras. Applikationsuppgifter är lätta att rotera och bör ha en annan (kortare) livscykel än dina personliga inloggningsuppgifter, och sist men inte minst riskerar du inte att exponera dina personliga inloggningsuppgifter när du använder applikationsuppgifter i körande kod.

Så låt oss se hur vi kan få fram S3‑slutpunkts‑URL:en genom att autentisera med en uppsättning applikationsuppgifter. Förfarandet är inte mycket annorlunda. Skillnaden är att vi nu autentiserar med «global scope». Så här:
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
Du måste förstås återigen ställa in miljövariablerna utifrån informationen från när du skapade [applikationens inloggningsuppgifter][appcred]. I övrigt är det samma sak:
```shell
curl  -s -H "Content-Type: application/json" -d"$(gen_os_auth_data_appcred_global_scope)" "${OS_AUTH_URL}/auth/tokens"|jq '.token.catalog[]|select(.type=="s3").endpoints[0].url' -r
```
## Hämta URL:en till S3-slutpunkten med Python eller Ansible

Det går också att hämta tjänstekatalogen både direkt från Python med [OpenStack Python‑SDK][pysdk] och med [Ansible][ansibleosauth].

För att hämta URL:en till S3‑slutpunkten med Python‑SDK:t kan du göra så här:
```python
# cloud is an entry in your clouds.yaml containing the other necessary parameters for talking to the Openstack API
conn = openstack.connect(cloud=cloud, username=os.environ['OS_USERNAME'], password=os.environ['OS_PASSWORD'])
print(conn.endpoint_for('s3'))
```
För att hämta URL:en till S3-slutpunkten med Ansible kan du göra så här:
```ansible
  - name: Authenticate to the cloud and retrieve the service catalog
      openstack.cloud.auth:

    - name: Set fact, s3 endpoint
      ansible.builtin.set_fact:
        s3_endpoint_url: "{{ item }}"
      loop: "{{ service_catalog|community.general.json_query('[?type==`s3`].endpoints[0].url') }}"
```
`service_catalog` fylls med data av modulen `openstack.cloud.auth`, och värdet för URL:en till S3-slutpunkten hämtas därifrån genom att iterera över listan med slutpunkter för S3-tjänsten (som i vårt fall bara innehåller ett element) med hjälp av Jinja-filtret `community.general.json_query`.

Detta kräver att din miljö och/eller `clouds.yaml`/`secure.yaml` innehåller den nödvändiga informationen; samma som om du skulle använda [OpenStack CLI][osclidoc].

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