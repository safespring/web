---
ai: true
title: "Anvendelse af Talos Linux og opsætning af Kubernetes på OpenStack"
date: 2025-03-03
intro: "Vi anser automatisering, sikkerhed og de gængse IaC-værktøjer for at være den hellige treenighed bag en robust Kubernetes-platformløsning."
draft: false
tags: ["English"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "da"
sectiontext: "Blog"
section: "Teknisk opdatering"
author: "Anders Johansson"
TOC: "I dette indlæg"
aliases:
  - /blogg/2025/2024-02-engineering-plans/
  - /blogg/2025/2025-03-talos-linux-on-openstack/
---

{{< ingress >}}
Når det gælder containerorkestrering, er Kubernetes de facto-standarden. Og der findes mange forskellige varianter af Kubernetes-distributioner og måder at provisionere dem på. Så vi begyndte at undersøge, hvad Talos Linux kunne betyde for os.  
{{< /ingress >}}

Ting vi gerne ville have besvaret undervejs:

1. **Automatisering**, kan vi gøre dette med automation?
2. **Sikkerhed**, skal være sikker som standard med minimal overhead for brugerne.
3. **Brug af almindelige IaC'er** og andre værktøjer skal understøttes.

Vi betragter dette som den hellige treenighed for en robust Kubernetes-platform. At kunne opfylde alle tre er nøglen til succes: en automatiserbar, sikker som standard og reproducerbar løsning.

Med det in mente valgte vi Talos Linux fra Sidero Labs, da det leveres med en fornuftig secure-by-default-implementering. Såsom ingen SSH-adgang til noder og et udvidbart API med understøttelse af de almindelige anvendelsestilfælde inden for moderne, containerbaserede driftsmiljøer.

Og desuden et virkelig lille ressourceforbrug[^1]. Med så lille et fodaftryk var valget oplagt.

Og Talos Linux-systemet har kun 12 unikke binære filer, mens en almindelig distribution som Ubuntu Server 22.04 har mindst 1.500 binære filer. Færre binære filer betyder mindre angrebsflade og dermed højere sikkerhed. Og nemmere vedligeholdelse.

## Lad os komme i gang med det sjove

Der er et par forudsætninger for at komme i gang. Vi holder det på et overordnet niveau og går ikke i OpenStack-specifikke detaljer i dette indlæg.

{{% note "Forudsætninger" %}}

- Du skal bruge `talosctl` og `kubectl`.
- OpenStack-legitimationsoplysninger.
  - inkluder også OpenStack EC2-legitimationsoplysninger til state S3-lageret.
- Talos-image tilgængeligt i OpenStack.
  {{% /note %}}

For at konfigurere og uploade[^2] et talos[^3]-image til OpenStack skal du bruge følgende vejledning:

```bash
inputs_schematic: 376567988ad370138ad8b2698212367b8edcb69b5fd68c80be1f2ec7d603b4ba
inputs_version: v1.9.4

wget https://factory.talos.dev/image/${inputs_schematic}/${inputs_version}/openstack-amd64.raw.xz
unxz openstack-amd64.raw.xz
openstack image create --disk-format raw --container-format bare --community --file ./openstack-amd64.raw talos-image-${inputs_version}
rm -f openstack-amd64.raw.xz openstack-amd64.raw
```

_Når de nødvendige værktøjer er på plads, skal vi også have oprettet en HaProxy-loadbalancer og en DNS-post til klyngen._

Lad os nu generere en Talos-konfiguration:

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

{{% note "Bemærk" %}}
Valgmulighederne `with-example` og `with-docs` bruges til at holde konfigurationen ren og fri for eksempler eller dokumentation.
{{% /note %}}

Det ovenstående genererer en Talos-konfiguration og placerer den i `talosconfig_dir`. Det genererer også 3 patchfiler: én for hver nodetype (controlplane, worker) samt én generel for klyngen.

Inden vi fortsætter, lad os sætte API-endpointet for klyngen og vælge, hvilken node vi skal interagere med.

```bash
talosctl config endpoint "https://fqdn"
talosctl config node "https://fdqn"

```

_Følgende er en eksempelkonfiguration, der også viser, hvordan man installerer en brugerdefineret CNI (Cilium i dette tilfælde) med et Kubernetes-job._

Klyngekonfiguration:

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

Derefter opretter vi en til Control Plane:

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

Og til sidst opretter vi én til arbejderne:

```yaml
# separate worker node config

machine:
  type: worker
  nodeLabels:
    node-role.kubernetes.io/worker: worker
```

En maskinkonfiguration kan også patches efterfølgende:

```bash
talosctl machineconfig patch worker.yaml --patch @patches/patch.yaml -o worker1.yaml

```

Og på en kørende Talos-node kan du patche maskinkonfigurationen ved hjælp af følgende:

```bash
talosctl patch mc --nodes 1.2.3.4 --patch @patches/patch.yaml

```

{{% note "hent kubconfig" %}}
Når vi sætter indstillingen `rotate-server-certificates` til `true`, kan den nye kubconfig hentes ved at bruge:

```bash
talosctl kubeconfig kubeconfig\_<path>

```

{{% /note %}}

Noder kan klargøres med providerne OpenStack og Opentofu.
Forudsat at vi har OpenStack-infrastrukturen opsat med Opentofu, kan vi nu oprette en Kubernetes-klynge med Talos Linux ved hjælp af provisionerne `null_resource` og `local-exec`:

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

Dette giver dig en minimal Kubernetes-klynge, der er klar til brug.
Kør nedenstående for at verificere adgangen til klyngen.

```
kubectl get nodes -o wide

```

## Konklusion: Hvorfor Talos Linux?

Talos Linux tilbyder en moderne tilgang til Kubernetes-infrastruktur ved at:

- {{< inline "Minimal angrebsflade" >}} Kun 12 unikke binærfiler mod 1.500 i traditionelle distributioner. Hvorfor? Hver ekstra pakke er en potentiel sikkerhedssårbarhed. Mere kode betyder flere mulige indgangspunkter for angribere. Ved at reducere systemet til blot 12 essentielle binærfiler mindsker Talos den potentielle angrebsflade markant og gør det væsentligt sværere for ondsindede aktører at udnytte systemet.
- {{< inline "Uforanderlig sikkerhed" >}} Ingen SSH, API-drevet administration. Hvorfor? Traditionel serveradministration er afhængig af direkte SSH-adgang, hvilket skaber adskillige sikkerhedsrisici: manuelle ændringer, konfigurationsdrift og potentielle menneskelige fejl. Ved at eliminere SSH og anvende en API-drevet tilgang sikrer Talos, at alle ændringer er bevidste, sporbare og kan versionsstyres, hvilket forhindrer uautoriserede eller udokumenterede ændringer.
- {{< inline "Cloud-native enkelhed" >}} Bygget til moderne, automatiseret infrastruktur. Hvorfor? Moderne cloud-miljøer kræver infrastruktur, der hurtigt kan oprettes, nedlægges og reproduceres præcist. Traditionelle operativsystemer er designet til statiske, langtidskørende servere. Talos er bygget fra bunden til at understøtte dynamiske, containeriserede miljøer, hvilket gør det gnidningsløst at integrere med CI/CD-pipelines og infrastruktur-som-kode-workflows.
- {{< inline "Operationel effektivitet" >}} Reducerer kompleksitet, øger pålidelighed. Hvorfor? IT-teams bruger utallige timer på at fejlfinde konfigurationsproblemer, håndtere systemopdateringer og vedligeholde komplekse servermiljøer. Talos gør det enklere ved at levere et formålsbygget Kubernetes OS, der fjerner de fleste manuelle administrationsopgaver, så teams kan fokusere på at levere værdi frem for at vedligeholde infrastruktur.

Det er derfor, vi valgte Talos Linux; Talos tilbyder en pragmatisk vej frem. Det handler ikke om at jagte den nyeste trend; i stedet ønsker vi et solidt fundament til at løse reelle udfordringer: ved at reducere sikkerhedsrisici, minimere konfigurationsfejl og gøre infrastrukturen mere forudsigelig. Tænk på det mindre som en revolutionerende teknologi og mere som et praktisk værktøj, der matcher, hvordan moderne infrastruktur bør fungere—enkelt, sikkert og reproducerbart.

{{% note "Kunne du lide det, du lige læste?" %}}
Lyder det som et godt match til dine behov?
Tøv ikke med at kontakte os, hvis du har spørgsmål, på hello@safespring.com.
{{% /note %}}

## Referencer og links

[^1]: Læs mere om [Talos systemkrav](https://www.talos.dev/v1.9/introduction/system-requirements/#minimum-requirements).

[^2]: Læs mere om, hvordan man uploader et image i [Safesprings dokumentation om images](https://docs.safespring.com/compute/image/#uploading-an-image-by-customer).

[^3]: Mere information om [Talos Image Factory](https://factory.talos.dev/).
