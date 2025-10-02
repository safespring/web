---
ai: true
title: "Bruk av Talos Linux og oppstart av Kubernetes på OpenStack"
date: 2025-03-03
intro: "Vi anser automatisering, sikkerhet og vanlige IaC-verktøy som den hellige treenigheten for en robust Kubernetes-plattform."
draft: false
tags: ["English"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "nb"
sectiontext: "Blogg"
section: "Teknologioppdatering"
author: "Anders Johansson"
TOC: "I dette innlegget"
aliases:
  - /blogg/2025/2024-02-engineering-plans/
  - /blogg/2025/2025-03-talos-linux-on-openstack/
---

{{< ingress >}}
Når det kommer til container-orkestrering, er Kubernetes de facto-standarden. Og det finnes mange ulike varianter av Kubernetes-distribusjoner og måter å provisjonere dem på. Så vi begynte å utforske hva Talos Linux kunne bety for oss.  
{{< /ingress >}}

Dette ønsket vi svar på underveis:

1. Automatisering – kan vi gjøre dette automatisert?
2. Sikkerhet – må være sikkert som standard, med minimalt merarbeid for brukerne.
3. Bruk av vanlige IaC-er og andre verktøy må støttes.

Vi mener dette er den hellige treenighet for et robust Kubernetes-plattformtilbud. Å få til alle tre er nøkkelen til suksess: en løsning som kan automatiseres, er sikker som standard og er repeterbar.

Med det i tankene valgte vi Talos Linux fra Sidero Labs, ettersom det kommer med en fornuftig implementering som er sikker som standard. Ting som ingen SSH-tilgang til noder og et utvidbart API med støtte for de vanlige brukstilfellene når det gjelder moderne, containerbasert drift.

Og dessuten et veldig lite ressursfotavtrykk[^1]. Med et så lite fotavtrykk var det en selvfølge.

Og Talos Linux-systemet har bare 12 unike binærfiler, mens en vanlig distribusjon som Ubuntu Server 22.04 har minst 1 500 binærfiler. Færre binærfiler betyr mindre eksponering, som igjen betyr høyere sikkerhet. Og enklere vedlikehold.

## La oss komme i gang med det morsomme

Det er noen forutsetninger for å komme i gang; vi holder det på et overordnet nivå og går ikke inn i OpenStack-spesifikke detaljer i dette innlegget.

{{% note "Forutsetninger" %}}

- Du trenger `talosctl` og `kubectl`.
- OpenStack-legitimasjon.
  - inkluder også OpenStack EC2-legitimasjon for state i S3-lager.
- Talos-image tilgjengelig i OpenStack.
  {{% /note %}}

For å konfigurere og laste opp[^2] et Talos[^3]-image til OpenStack, bruk følgende veiledning:

```bash
inputs_schematic: 376567988ad370138ad8b2698212367b8edcb69b5fd68c80be1f2ec7d603b4ba
inputs_version: v1.9.4

wget https://factory.talos.dev/image/${inputs_schematic}/${inputs_version}/openstack-amd64.raw.xz
unxz openstack-amd64.raw.xz
openstack image create --disk-format raw --container-format bare --community --file ./openstack-amd64.raw talos-image-${inputs_version}
rm -f openstack-amd64.raw.xz openstack-amd64.raw
```

_Når forutsetningene for verktøyene er på plass, må vi også ha opprettet en HaProxy-lastbalanserer og en DNS-oppføring for klyngen._

La oss nå generere en Talos-konfigurasjon:\_

```bash
talosctl gen config \
    "name-of-cluster" \
    "fqdn_endpoint:6443" \
    --kubernetes-version 1.30.4  \
    --output talosconfig_dir \
    --config-patch @patch/cluster.yaml \
    --config-patch-control-plane @patch/patch-controlplane.yaml \
    --config-patch-worker @patch/patch-worker.yaml \
    --with-examples=false \
    --with-docs=false
```

{{% note "Merk" %}}
Alternativene `with-example` og `with-docs` brukes for å holde konfigurasjonen ren, uten eksempler eller dokumentasjon.
{{% /note %}}

Ovenstående vil generere en Talos-konfigurasjon og legge den i `talosconfig_dir`. Det vil også generere 3 patch-filer: én for hver nodetype (controlplane, worker) og én generell for klyngen.

Før vi fortsetter, la oss sette API-endepunktet for klyngen og hvilken node vi skal kommunisere med.

```bash
talosctl config endpoint "https://fqdn"
talosctl config node "https://fdqn"
```

_Følgende er et eksempel på en konfigurasjon som også viser hvordan du installerer en egendefinert CNI (Cilium i dette tilfellet) med en Kubernetes-jobb._

Klyngekonfigurasjon:\_

```yaml
machine:
  seccompProfiles:
    - name: audit.json
      value:
        defaultAction: SCMP_ACT_LOG
  kubelet:
    extraArgs:
      rotate-server-certificates: true
    extraConfig:
      featureGates:
        UserNamespacesSupport: true
        UserNamespacesPodSecurityStandards: true
  sysctls:
    user.max_user_namespaces: "11255"

cluster:
  adminKubeconfig:
    certLifetime: 2160h0m0s # 90 days
  apiServer:
    auditPolicy:
      apiVersion: audit.k8s.io/v1
      kind: Policy
      rules:
        - level: Metadata
    extraArgs:
      feature-gates: UserNamespacesSupport=true,UserNamespacesPodSecurityStandards=true
  network:
    cni:
      name: none
  proxy:
    disabled: true
  extraManifests:
    # these are added due to the option of rotate-server-certificates which needs a way to approve certificates
    # https://kubernetes.io/docs/reference/access-authn-authz/certificate-signing-requests/
    - https://raw.githubusercontent.com/alex1989hu/kubelet-serving-cert-approver/main/deploy/standalone-install.yaml
    - https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
  inlineManifests:
    - name: cilium-install
      contents: |
        ---
        # https://www.talos.dev/v1.9/kubernetes-guides/network/deploying-cilium/#method-5-using-a-job
```

Deretter oppretter vi en for kontrollplanet:

```yaml
# control plane config
machine:
  type: controlplane
  features:
    rbac: true # Enable role-based access control (RBAC).

    # Configure Talos API access from Kubernetes pods.
    kubernetesTalosAPIAccess:
      enabled: true # Enable Talos API access from Kubernetes pods.
      # The list of Talos API roles which can be granted for access from Kubernetes pods.
      allowedRoles:
        - os:reader
      #     # The list of Kubernetes namespaces Talos API access is available from.
      allowedKubernetesNamespaces:
        - kube-system
```

Og til slutt oppretter vi en for arbeiderne:

```yaml
# separate worker node config
machine:
  type: worker
  nodeLabels:
    node-role.kubernetes.io/worker: worker
```

En maskinkonfigurasjon kan også patches i etterkant:

```bash
talosctl machineconfig patch worker.yaml --patch @patches/patch.yaml -o worker1.yaml
```

Og på en kjørende Talos-node kan du patche maskinkonfigurasjonen ved å bruke følgende:

```bash
talosctl patch mc --nodes 1.2.3.4 --patch @patches/patch.yaml
```

{{% note "hent kubconfig" %}}
Når vi setter alternativet `rotate-server-certificates` til `true`, kan den nye kubconfig hentes ved å bruke:

```bash
talosctl kubeconfig kubeconfig_<path>
```

{{% /note %}}

Noder kan provisjoneres med OpenStack- og Opentofu-providerne.
Forutsatt at vi har OpenStack-infrastrukturen satt opp med Opentofu, kan vi nå opprette en Kubernetes-klynge med Talos Linux ved å bruke provisionerne `null_resource` og `local-exec`:

```yaml
resource "null_resource" "talos_bootstrap" {
  depends_on = [null_resource.a_records, null_resource.apply_haproxy_config]
  provisioner "local-exec" {
    interpreter = ["bash", "-c"]
    command     = <<EOT
#!/bin/bash

# wait for DNS propagation
timeout 300 perl -e 'print("Waiting for DNS propagation ...\n"), sleep(10) while `nc -w 2 -z ${local.api_endpoint} 6443 2>&1`' 0

# bootstrap the cluster using fqdn endpoint configured in talosconfig
talosctl --talosconfig "${var.talosconfig_dir}/talosconfig" bootstrap

# wait for the cluster to be ready
timeout 300 perl -e 'print("Waiting for ${local.api_endpoint}:6443 ...\n"), sleep(10) while `curl -k https://${local.lb_ip}:6443 2>&1 2>/dev/null` !~ 401' 0

# save the kubeconfig
echo "saving kubeconfig in ${var.kubeconfigs_dir}"
talosctl --talosconfig "${var.talosconfig_dir}/talosconfig" kubeconfig "${var.kubeconfigs_dir}/kubeconfig-${local.cluster_fqdn}"
export KUBECONFIG="${var.kubeconfigs_dir}/kubeconfig-${local.cluster_fqdn}"

EOT
  }
}
```

Dette vil gi deg en klar til bruk, minimal Kubernetes-klynge.  
Kjør følgende for å bekrefte tilgang til klyngen.

```
kubectl get nodes -o wide
```

## Konklusjon: Hvorfor Talos Linux?

Talos Linux tilbyr en moderne tilnærming til Kubernetes-infrastruktur ved å:

- {{< inline "Minimal angrepsflate" >}} Bare 12 unike binærfiler mot 1 500 i tradisjonelle distribusjoner. Hvorfor? Hver ekstra pakke er en potensiell sikkerhetssårbarhet. Mer kode betyr flere potensielle inngangspunkter for angripere. Ved å redusere systemet til bare 12 nødvendige binærfiler, krymper Talos angrepsflaten dramatisk og gjør det betydelig vanskeligere for ondsinnede aktører å utnytte systemet.
- {{< inline "Uforanderlig sikkerhet" >}} Ingen SSH, API-drevet administrasjon. Hvorfor? Tradisjonell serveradministrasjon baserer seg på direkte SSH-tilgang, noe som skaper en rekke sikkerhetsrisikoer: manuelle endringer, konfigurasjonsdrift og potensiell menneskelig feil. Ved å eliminere SSH og bruke en API-drevet tilnærming, sikrer Talos at alle endringer er bevisste, sporbare og kan versjonskontrolleres, noe som forhindrer uautoriserte eller udokumenterte endringer.
- {{< inline "Skynativ enkelhet" >}} Bygget for moderne, automatisert infrastruktur. Hvorfor? Moderne skymiljøer krever infrastruktur som raskt kan settes opp, rives ned og replikeres presist. Tradisjonelle operativsystemer er designet for statiske, langlivede servere. Talos er bygget fra grunnen av for å støtte dynamiske, containeriserte miljøer, noe som gjør det sømløst å integrere med CI/CD-pipelines og Infrastructure-as-Code-arbeidsflyter.
- {{< inline "Operasjonell effektivitet" >}} Reduserer kompleksitet, øker pålitelighet. Hvorfor? IT-team bruker utallige timer på å feilsøke konfigurasjonsproblemer, håndtere systemoppdateringer og vedlikeholde komplekse servermiljøer. Talos forenkler dette ved å tilby et formålsbygget Kubernetes-operativsystem som fjerner de fleste manuelle administrasjonsoppgaver, slik at teamene kan fokusere på å levere verdi fremfor å vedlikeholde infrastruktur.

Dette er grunnen til at vi valgte Talos Linux; Talos tilbyr en pragmatisk vei videre. Det handler ikke om å jage den siste trenden, i stedet ønsker vi et godt fundament for å løse reelle utfordringer: ved å redusere sikkerhetsrisiko, ved å minimere konfigurasjonsfeil og ved å gjøre infrastrukturen mer forutsigbar. Tenk på det mindre som en revolusjonerende teknologi og mer som et praktisk verktøy som er i tråd med hvordan moderne infrastruktur bør fungere—enkelt, sikkert og reproduserbart.

{{% note "likte du det du nettopp leste?" %}}
Høres dette ut som en god match for dine behov?
Ikke nøl med å ta kontakt hvis du har spørsmål på e-post til hello@safespring.com.
{{% /note %}}

## Referanser og lenker

[^1]: Les mer om [Systemkrav for Talos](https://www.talos.dev/v1.9/introduction/system-requirements/#minimum-requirements).

[^2]: Les mer om hvordan du laster opp et image i [Safespring-dokumentasjonen om images](https://docs.safespring.com/compute/image/#uploading-an-image-by-customer).

[^3]: Mer informasjon om [Talos Image Factory](https://factory.talos.dev/).
