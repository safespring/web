---
ai: true
title: "Använda Talos Linux och initiera Kubernetes på OpenStack"
date: 2025-03-03
intro: "Vi anser att automatisering, säkerhet och vanliga IaC-verktyg utgör den heliga treenigheten för ett robust Kubernetes-plattformserbjudande."
draft: false
tags: ["English"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "sv"
sectiontext: "Blogg"
section: "Teknikuppdatering"
author: "Anders Johansson"
TOC: "I det här inlägget"
aliases:
  - /blogg/2025/2024-02-engineering-plans/
  - /blogg/2025/2025-03-talos-linux-on-openstack/
---

{{< ingress >}}
När det gäller containerorkestrering är Kubernetes de facto-standard. Och det finns många olika varianter av Kubernetes-distributioner och sätt att provisionera dem. Så vi började utforska vad Talos Linux skulle kunna innebära för oss.  
{{< /ingress >}}

Saker vi ville få svar på under arbetets gång:

1. **Automatisering** – kan vi göra detta automatiserat?
2. **Säkerhet**, måste vara säker som standard med minimal overhead för användare.
3. **Användning av vanliga IaC-verktyg** och andra verktyg måste stödjas.

Vi ser detta som den heliga treenigheten för en robust Kubernetes-plattform. Och att klara alla tre är nyckeln till framgång: en automatiserbar, säker som standard och repeterbar lösning.

Med detta i åtanke valde vi Talos Linux från Sidero Labs, eftersom det kommer med en sund implementation som är säker som standard. Sådant som ingen SSH-åtkomst till noderna och ett utbyggbart API med stöd för de vanligaste användningsfallen för modern containerbaserad drift.

Och dessutom ett mycket litet resursfotavtryck[^1]. Med ett så litet fotavtryck var valet givet.

Och Talos Linux-systemet har bara 12 unika binärer, medan en vanlig distribution som Ubuntu Server 22.04 har minst 1 500 binärer. Färre binärer innebär mindre exponering och därmed högre säkerhet. Och enklare underhåll.

## Nu kör vi igång med det roliga

Det finns några förutsättningar för att komma igång. Vi håller detta på en hög nivå och går inte in på OpenStack-specifika detaljer i det här inlägget.

{{% note "Förutsättningar" %}}

- Du behöver `talosctl` och `kubectl`.
- OpenStack-inloggningsuppgifter.
  - inkludera även OpenStack EC2-inloggningsuppgifter för state i S3.
- Talos-avbildning tillgänglig i OpenStack.
  {{% /note %}}

För att konfigurera och ladda upp[^2] en talos[^3]-avbild till OpenStack, använd följande guide:

```bash
inputs_schematic: 376567988ad370138ad8b2698212367b8edcb69b5fd68c80be1f2ec7d603b4ba
inputs_version: v1.9.4

wget https://factory.talos.dev/image/${inputs_schematic}/${inputs_version}/openstack-amd64.raw.xz
unxz openstack-amd64.raw.xz
openstack image create --disk-format raw --container-format bare --community --file ./openstack-amd64.raw talos-image-${inputs_version}
rm -f openstack-amd64.raw.xz openstack-amd64.raw
```

_Med verktygsförutsättningarna på plats behöver vi också ha skapat en HaProxy-lastbalanserare och en DNS-post för klustret._

Nu ska vi generera en Talos-konfiguration:

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

{{% note "Observera" %}}
Alternativen `with-example` och `with-docs` används för att hålla konfigurationen ren och fri från exempel eller dokumentation.
{{% /note %}}

Ovanstående genererar en Talos-konfiguration och lägger den i `talosconfig_dir`. Det skapar också tre patch-filer: en för varje nodtyp (controlplane, worker) samt en generell för klustret.

Innan vi fortsätter, låt oss ange API-slutpunkten för klustret och vilken nod vi ska interagera med.

```bash
talosctl config endpoint "https://fqdn"
talosctl config node "https://fdqn"
```

_Följande är en exempelkonfiguration som också visar hur man installerar en anpassad CNI (Cilium i det här fallet) med ett Kubernetes-jobb._

Klusterkonfiguration:

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

Sedan skapar vi en för kontrollplanet:

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

Och slutligen ska vi skapa en för arbetarna:

```yaml
# separate worker node config
machine:
  type: worker
  nodeLabels:
    node-role.kubernetes.io/worker: worker
```

En maskinkonfiguration kan också patchas i efterhand:

```bash
talosctl machineconfig patch worker.yaml --patch @patches/patch.yaml -o worker1.yaml
```

Och på en körande Talos-nod kan du patcha maskinkonfigurationen med följande:

```bash
talosctl patch mc --nodes 1.2.3.4 --patch @patches/patch.yaml
```

{{% note "hämta kubconfig" %}}
När vi ställer in alternativet `rotate-server-certificates` till `true` kan den nya kubconfig hämtas med:

```bash
talosctl kubeconfig kubeconfig_<path>
```

{{% /note %}}

Noder kan provisioneras med OpenStack- och Opentofu-providern.
Förutsatt att vi har OpenStack-infrastrukturen konfigurerad med Opentofu kan vi nu skapa ett Kubernetes-kluster med Talos Linux med hjälp av resursen `null_resource` och provisioneraren `local-exec`:

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

Detta ger dig ett färdigt, avskalat Kubernetes-kluster.  
Kör följande för att verifiera åtkomst till klustret.

```
kubectl get nodes -o wide
```

## Slutsats: Varför Talos Linux?

Talos Linux erbjuder ett modernt angreppssätt för Kubernetes‑infrastruktur genom att:

- {{< inline "Minimal attackyta" >}} Endast 12 unika binärer jämfört med 1 500 i traditionella distributioner. Varför? Varje ytterligare paket är en potentiell säkerhetssårbarhet. Mer kod innebär fler möjliga angreppspunkter för angripare. Genom att minska systemet till bara 12 nödvändiga binärer krymper Talos den potentiella attackytan dramatiskt, vilket gör det avsevärt svårare för angripare att utnyttja systemet.
- {{< inline "Oföränderlig säkerhet" >}} Ingen SSH, API‑driven hantering. Varför? Traditionell serverhantering bygger på direkt SSH‑åtkomst, vilket medför många säkerhetsrisker: manuella ändringar, konfigurationsdrift och mänskliga misstag. Genom att eliminera SSH och använda ett API‑drivet arbetssätt säkerställer Talos att alla ändringar är avsiktliga, spårbara och kan versionshanteras, vilket förhindrar obehöriga eller odokumenterade ändringar.
- {{< inline "Molnnativ enkelhet" >}} Byggt för modern, automatiserad infrastruktur. Varför? Moderna molnmiljöer kräver infrastruktur som snabbt kan startas upp, tas ned och återskapas exakt. Traditionella operativsystem är designade för statiska, långlivade servrar. Talos är byggt från grunden för att stödja dynamiska, containeriserade miljöer, vilket gör det sömlöst att integrera med CI/CD‑pipelines och arbetsflöden för infrastruktur som kod.
- {{< inline "Operationell effektivitet" >}} Minskar komplexiteten, ökar tillförlitligheten. Varför? IT‑team lägger otaliga timmar på att felsöka konfigurationsproblem, hantera systemuppdateringar och underhålla komplexa servermiljöer. Talos förenklar detta genom att tillhandahålla ett specialbyggt operativsystem för Kubernetes som tar bort de flesta manuella driftuppgifter, så att team kan fokusera på att leverera värde snarare än att underhålla infrastrukturen.

Det är därför vi valde Talos Linux; Talos erbjuder en pragmatisk väg framåt. Det handlar inte om att jaga den senaste trenden, utan om att ha en stabil grund för att lösa verkliga hinder: genom att minska säkerhetsrisker, minimera konfigurationsfel och göra infrastrukturen mer förutsägbar. Se det mindre som en revolutionerande teknik och mer som ett praktiskt verktyg som stämmer överens med hur modern infrastruktur bör fungera – enkelt, säkert och reproducerbart.

{{% note "Gillade du det du just läste?" %}}
Låter detta som en bra lösning för dina behov?
Tveka inte att höra av dig om du har några frågor på hello@safespring.com.
{{% /note %}}

## Referenser och länkar

[^1]: Läs mer om [Talos systemkrav](https://www.talos.dev/v1.9/introduction/system-requirements/#minimum-requirements).

[^2]: Läs mer om hur du laddar upp en avbild i [Safesprings dokumentation om avbilder](https://docs.safespring.com/compute/image/#uploading-an-image-by-customer).

[^3]: Mer information om [Talos Image Factory](https://factory.talos.dev/).
