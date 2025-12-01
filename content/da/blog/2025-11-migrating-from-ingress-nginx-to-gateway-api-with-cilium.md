---
ai: true
title: "Ingress-Nginx udfases i marts 2026: Sådan migrerer du til Gateway API og Cilium Gateway"
date: 2025-11-27
intro: "Denne artikel giver platformteams en konkret migrationsdrejebog."
draft: false
tags: ["container"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "da"
sectiontext: "Teknologiopdatering"
section: "Tech update"
author: "Anders Johansson"
TOC: "I dette indlæg"
sidebarlinkurl: "/containers"
sidebarlinkname: "Udforsk kubernetes on-demand"
sidebarlinkurl2: "/containers#get-started"
sidebarlinkname2: "Book en demo"
---
## TL;DR
I forbindelse med udfasningen af Ingress Nginx er en migration fra Ingress-Nginx til Gateway API med Cilium og en delt gateway-tilgang en måde at løse spørgsmålet om ingress til din klynge på – du bytter lidt kompleksitet for en renere, mere effektiv og standardiseret håndtering af ingress.

### Hvorfor overveje Gateway API:

- **Annoteringsspredning**: Håndtering af dusinvis af ingress-nginx-specifikke annoteringer på tværs af Ingress-ressourcer.
- **Begrænset fremtidssikring**: På linje med den retning, Kubernetes bevæger sig i.

### Gateway API imødekommer disse bekymringer ved at tilbyde:

- **Standardisering**: Er et officielt Kubernetes-projekt.
- **Forbedret sikkerhed**: Indbyggede RBAC-kontroller og adgangsbegrænsninger på namespace-niveau.
- **Bedre ressourcehåndtering**: Alternativet med delte gateways betyder reduceret ressourceoverhead.

{{< horisontal-card
    image="/img/graphics/safespring-image.svg"
    alt="Safespring on-demand Kubernetes med Cilium Gateway API"
    cardtitle="Gateway API på Cilium, administreret for dig"
    text="Start Talos-baserede klynger med Cilium og Gateway API klar fra dag ét. Få en administreret control plane og fleksibel bloklagring, så du kan fokusere på dine workloads frem for selve infrastrukturen."
    link="/containers/"
    linktext="Udforsk on-demand Kubernetes"
>}}

{{< distance >}}
## Lad os begynde

{{% note "Forudsætninger" %}}

### Installation af Gateway API CRDs
Før du påbegynder migreringen, skal du installere Gateway API CRDs. Vi bruger den nyeste Gateway API v1.4.0:
```bash
# Install standard Gateway API CRDs
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.4.0/config/crd/standard/gateway.networking.k8s.io_gatewayclasses.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.4.0/config/crd/standard/gateway.networking.k8s.io_gateways.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.4.0/config/crd/standard/gateway.networking.k8s.io_httproutes.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.4.0/config/crd/standard/gateway.networking.k8s.io_referencegrants.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.4.0/config/crd/standard/gateway.networking.k8s.io_grpcroutes.yaml

# Install experimental CRDs (optional, for TLS routes)
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.4.0/config/crd/experimental/gateway.networking.k8s.io_tlsroutes.yaml
```
{{% /note %}}

## Påkrævet Cilium-konfiguration

For at aktivere Gateway API-understøttelse i Cilium skal flere nøglefunktioner konfigureres:

### Væsentlige Cilium-funktioner
```yaml
# Cilium configuration for Gateway API
gatewayAPI:
  enabled: true           # Enable Gateway API support

kubeProxyReplacement: true # Required for Gateway API

l2announcements:
  enabled: true           # Enable L2 announcements for LoadBalancer services

externalIPs:
  enabled: true           # Allow external IP assignment

# Important for clusters with many services
k8sClientRateLimit:
  burst: 40               # Adjust based on cluster size
  qps: 20                 # Adjust based on cluster size
```
### Konfiguration af IP-pulje til Load Balancer

Definér en IP-pulje til LoadBalancer-tjenester:
```yaml
apiVersion: cilium.io/v2alpha1
kind: CiliumLoadBalancerIPPool
metadata:
  name: "ipv4-pool"
spec:
  blocks:
    - start: "Start Address"
      stop: "Stop Address"
```
### L2-annonceringspolitik

Konfigurer L2-annonceringer for din netværksgrænseflade:
```yaml
apiVersion: "cilium.io/v2alpha1"
kind: CiliumL2AnnouncementPolicy
metadata:
  name: l2-announcement
spec:
  interfaces:
    - eth0  # Replace with your network interface name
  externalIPs: true
  loadBalancerIPs: true
```
## Delt vs Ikke-delt Gateway

Brug af den ikke-delte gateway vil gentage det samme mønster som ingress-nginx. Grundlæggende én gateway, httproute og en grant til TLS-certifikatet.
Og en gateway betyder også, at der bruges en IP fra puljen.
Selvom der findes use cases for at bruge en separat Gateway til din workload, fokuserer vi på den delte Gateway i dette blogindlæg.

### Ikke-delt Gateway 

I den traditionelle tilgang har hver tjeneste eller applikation sin egen Gateway-ressource:

| Fordele | Ulemper |
|------|------|
| Fuld isolation mellem tjenester | Højere ressourceforbrug (flere Gateway-instanser) |
| Individuel konfiguration pr. tjeneste | Dobbelt håndtering af TLS-certifikater |
| Nemmere fejlfinding (én gateway pr. tjeneste) | Mere kompleks certifikatdistribution |
| Ingen afhængigheder på tværs af namespaces | Øget driftsmæssig overhead |
|  | Forbrug af IP'er |

{{% note "Eksempel" %}}
```yaml
# Individual gateway per service
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: podinfo-gateway
  namespace: podinfo
spec:
  gatewayClassName: cilium
  listeners:
  - hostname: podinfo.fdqn
    name: http
    port: 80
    protocol: HTTP
```
{{% /note %}}

### Delt gateway 

Så lad os udforske den delte gateway.

| Fordele | Ulemper |
|------|------|
| Reduceret ressourceforbrug (en enkelt gateway-instans) | Afhængigheder på tværs af namespaces |
| Centraliseret håndtering af TLS-certifikater | Kræver yderligere RBAC-konfiguration |
| Ensartede sikkerhedspolitikker | Mere kompleks indledende opsætning |
| Forenklet drift og overvågning | Potentielt enkelt fejlpunkt |
| Forbedret sikkerhed gennem valg af namespaces |  |
| Forbrug af IP-adresser |  |

{{% note "Eksempel" %}}
```yaml
# Shared gateway serving multiple services
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: shared-gateway
  namespace: gateway-system
spec:
  gatewayClassName: cilium
  listeners:
    - name: https
      port: 443
      protocol: HTTPS
      tls:
        certificateRefs:
          - kind: Secret
            name: domain-wildcard-tls
            namespace: cert-manager
      allowedRoutes:
        namespaces:
          from: Selector
          selector:
            matchLabels:
              gateway.networking.k8s.io/allowed: "true"
```
{{% /note %}}

## Migreringstrin

### Trin 1: Forbered den delte gateway-infrastruktur

Opret namespace'et gateway-system og udrul den delte gateway:
```yaml
# Namespace with proper labeling
apiVersion: v1
kind: Namespace
metadata:
  name: gateway-system
  labels:
    app.kubernetes.io/name: shared-gateway
    app.kubernetes.io/component: networking
```
### Trin 2: Konfigurer certifikatadgang

Konfigurer ReferenceGrant, så gatewayen kan få adgang til TLS-certifikater:
```yaml
apiVersion: gateway.networking.k8s.io/v1beta1
kind: ReferenceGrant
metadata:
  name: shared-gateway-cert-access
  namespace: cert-manager
spec:
  from:
  - group: gateway.networking.k8s.io
    kind: Gateway
    namespace: gateway-system
  to:
  - group: ""
    kind: Secret
    name: domain-wildcard-tls
```

### Trin 3: Migrér enkelte tjenester

For hver tjeneste, følg dette migreringsmønster:

**Før (nginx-ingress):**
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: podinfo
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
spec:
  rules:
  - host: podinfo.fqdn
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: podinfo
            port:
              number: 9898
```
**Efter (Gateway API med delt gateway):**

1. Mærk namespace'et:    
    ```yaml
    apiVersion: v1
    kind: Namespace
    metadata:
      name: podinfo
      labels:
        gateway.networking.k8s.io/allowed: "true"  # Enable shared gateway access
    ```
2. Opret HTTPRoute:
    ```yaml
    apiVersion: gateway.networking.k8s.io/v1
    kind: HTTPRoute
    metadata:
      name: podinfo
      namespace: podinfo
    spec:
      hostnames:
      - podinfo.fqdn
      parentRefs:
      - name: shared-gateway
        namespace: gateway-system
      rules:
      - backendRefs:
        - name: podinfo
          port: 9898
    ```
3. Opret ReferenceGrant til adgang på tværs af namespaces:
    ```yaml
    apiVersion: gateway.networking.k8s.io/v1beta1
    kind: ReferenceGrant
    metadata:
      name: podinfo-to-shared-gateway
      namespace: gateway-system
    spec:
      from:
      - group: gateway.networking.k8s.io
        kind: HTTPRoute
        namespace: podinfo
      to:
      - group: gateway.networking.k8s.io
        kind: Gateway
        name: shared-gateway
    ```
4. Fjern Nginx Ingress
    ```yaml
    kubectl delete your_ingress -n your_namespace
    ```
## Sikkerhedsforbedringer

Den delte gateway-tilgang introducerer flere sikkerhedsforbedringer:

### Namespace-baseret adgangskontrol
Kun namespaces, der eksplicit er mærket med `gateway.networking.k8s.io/allowed: "true"`, kan oprette HTTPRoutes, der refererer til den delte gateway.

### Direkte certifikathåndtering
Gatewayen tilgår certifikater direkte fra cert-manager-namespace'et.

### RBAC-integration
Korrekte ServiceAccount- og RBAC-politikker sikrer, at kun autoriserede komponenter kan administrere gateway-ressourcer.

## Hvad er fordelene?

1. **Ressourceeffektivitet**: At udnytte Ciliums kapaciteter og minimere ressourceoverhead er altid en god ting. Mere eBPF til folket!
2. **Forbedret sikkerhed**: Namespace-baserede adgangskontroller og direkte integration med cert-manager
3. **Driftsmæssig enkelhed**: Færre ressourcer at overvåge og vedligeholde
4. **Overholdelse af standarder**: På linje med retningen i Kubernetes-fællesskabet

## Ydelsesmæssige overvejelser

Den delte gateway-tilgang giver forbedret ydeevne ved:

- **Lavere hukommelsesforbrug**: En enkelt gatewayinstans i stedet for flere gateways
- **Reduceret netværkslatens**: Direkte håndtering af trafik uden ekstra proxy-lag
- **Bedre ressourceudnyttelse**: Mere effektiv belastningsfordeling via Ciliums eBPF-implementering.

## Links

[Udfasning af Ingress Nginx](https://www.kubernetes.dev/blog/2025/11/1/ingress-nginx-retirement/)

[Gateway API](https://gateway-api.sigs.k8s.io)

[Cilium Gateway](https://docs.cilium.io/en/stable/network/servicemesh/gateway-api/gateway-api/#gateway-api-support)


{{< horisontal-card
    image="/img/graphics/safespring-image.svg"
    alt="Overblik over Safespring on-demand Kubernetes-klynge"
    cardtitle="Klar til at prøve dette i en rigtig klynge?"
    text="Safespring on-demand Kubernetes lader dig prøvekøre Gateway API og Cilium i et administreret miljø med Talos, observabilitet og lagring allerede på plads. Perfekt til at pilotere din Ingress-Nginx-migrering, før du ruller den ud i produktion."
    link="/containers/"
    linktext="Udforsk on-demand Kubernetes"
>}}