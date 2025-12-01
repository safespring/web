---
ai: true
title: "Ingress-Nginx pensioneras i mars 2026: Så här går du över till Gateway API och Cilium Gateway"
date: 2025-11-27
intro: "Den här artikeln ger plattformteam en konkret migrationshandbok."
draft: false
tags: ["container"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "sv"
sectiontext: "Teknikuppdatering"
section: "Tech update"
author: "Anders Johansson"
TOC: "I det här inlägget"
sidebarlinkurl: "/containers"
sidebarlinkname: "Utforska Kubernetes på begäran"
sidebarlinkurl2: "/containers#get-started"
sidebarlinkname2: "Boka demo"
---

## TL;DR
Med utfasningen av Ingress-Nginx är en migrering från Ingress-Nginx till Gateway API med Cilium och en delad gateway-modell ett sätt att lösa ingress till ditt kluster, där du byter lite komplexitet mot renare, effektivare och mer standardiserad ingresshantering.

### Varför utforska Gateway API:

- Annoteringssprawl: Hantera dussintals ingress-nginx-specifika annoteringar i ingressresurser.
- Begränsad framtidssäkring: Sämre anpassning till vart Kubernetes är på väg.

### Gateway API adresserar dessa frågor genom att erbjuda:

- Standardisering: Är ett officiellt Kubernetes-projekt.
- Förbättrad säkerhet: Inbyggda RBAC-kontroller och namnområdesbaserade åtkomstbegränsningar.
- Bättre resurshantering: Alternativet att använda delade gateways innebär minskad resursbelastning.

{{< horisontal-card
    image="/img/graphics/safespring-image.svg"
    alt="Safespring on-demand Kubernetes med Cilium Gateway API"
    cardtitle="Gateway API på Cilium, hanterat åt dig"
    text="Starta Talos-baserade kluster med Cilium och Gateway API redo dag ett. Få ett hanterat kontrollplan och flexibel blocklagring, så att du kan fokusera på dina arbetslaster i stället för grundinfrastrukturen."
    link="/containers/"
    linktext="Upptäck Kubernetes on-demand"
>}}

{{< distance >}}
## Låt oss börja

{{% note "Förutsättningar" %}}

### Installation av Gateway API CRDs
Innan du påbörjar migreringen behöver du installera Gateway API-CRD:erna. Vi använder den senaste Gateway API v1.4.0:
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

## Nödvändig Cilium-konfiguration

För att aktivera stöd för Gateway API i Cilium måste flera viktiga funktioner konfigureras:

### Väsentliga Cilium-funktioner
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
### Konfiguration av IP-pool för lastbalanserare

Definiera en IP-pool för LoadBalancer-tjänster:
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
### Policy för L2-annonsering

Konfigurera L2-annonsering för ditt nätverksgränssnitt:
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
## Delad vs icke-delad Gateway

Att använda den icke-delade gatewayen replikerar samma mönster som ingress-nginx. I princip en gateway, httproute och ett grant för TLS-certifikatet.
Och en gateway innebär också att man använder en IP-adress ur poolen.
Det finns visserligen användningsfall för att använda en separat Gateway för din arbetslast, men i det här blogginlägget fokuserar vi på den delade Gatewayen.

### Icke-delad Gateway 

I det traditionella tillvägagångssättet har varje tjänst eller applikation sin egen Gateway-resurs:

| Fördelar | Nackdelar |
|------|------|
| Fullständig isolering mellan tjänster | Högre resursförbrukning (flera Gateway-instanser) |
| Individuell konfiguration per tjänst | Duplicerad hantering av TLS-certifikat |
| Enklare felsökning (en gateway per tjänst) | Mer komplex distribution av certifikat |
| Inga beroenden mellan namespaces | Ökad driftmässig overhead |
|  | Förbrukning av IP-adresser |

{{% note "Exempel" %}}
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

### Delad Gateway 

Så låt oss utforska den delade Gatewayen.

| Fördelar | Nackdelar |
|------|------|
| Minskad resursförbrukning (en enda Gateway-instans) | Beroenden mellan namespaces |
| Centraliserad hantering av TLS-certifikat | Kräver ytterligare RBAC-konfiguration |
| Konsekventa säkerhetspolicyer | Mer komplex initial uppsättning |
| Förenklad drift och övervakning | Potentiell enskild felpunkt |
| Förbättrad säkerhet genom val av namespace |  |
| Förbrukning av IP-adresser |  |

{{% note "Exempel" %}}
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

## Migreringssteg

### Steg 1: Förbered den delade gateway-infrastrukturen

Skapa namnrymden gateway-system och distribuera den delade gatewayen:
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
### Steg 2: Konfigurera certifikatåtkomst

Konfigurera ReferenceGrant så att gatewayen kan komma åt TLS-certifikat:
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
### Steg 3: Migrera enskilda tjänster

För varje tjänst, följ detta migrationsmönster:

**Före (nginx-ingress):**
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

**Efter (Gateway API med gemensam gateway):**

1. Märk namnrymden: 
    ```yaml
    apiVersion: v1
    kind: Namespace
    metadata:
      name: podinfo
      labels:
        gateway.networking.k8s.io/allowed: "true"  # Enable shared gateway access
    ```
2. Skapa HTTPRoute: 
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
3. Skapa ReferenceGrant för åtkomst mellan namnrymder: 
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
4. Ta bort Nginx Ingress 
    ```yaml
    kubectl delete your_ingress -n your_namespace
    ```
## Säkerhetsförbättringar

Det delade gateway-upplägget medför flera säkerhetsförbättringar:

### Namespace-baserad åtkomstkontroll
Endast namespaces som uttryckligen är märkta med `gateway.networking.k8s.io/allowed: "true"` kan skapa HTTPRoutes som refererar till den delade gatewayn.

### Direkt certifikathantering
Gatewayn har direkt åtkomst till certifikat från cert-manager-namespacet.

### RBAC-integration
Korrekt ServiceAccount- och RBAC-policyer säkerställer att endast auktoriserade komponenter kan hantera gatewayresurser.

## Vilka är fördelarna?

1. **Resurseffektivitet**: Att utnyttja Ciliums möjligheter och minimera resurspåslag är alltid bra. Mer eBPF åt folket!
2. **Förbättrad säkerhet**: Namespace-baserad åtkomstkontroll och direkt integration med cert-manager
3. **Driftsmässig enkelhet**: Färre resurser att övervaka och underhålla
4. **Standardefterlevnad**: I linje med Kubernetes-communityns inriktning

## Tankar om prestanda

Det delade gateway-upplägget visar förbättrad prestanda genom:

- **Lägre minnesanvändning**: En enda gatewayinstans jämfört med flera gateways
- **Minskad nätverkslatens**: Direkt trafikhantering utan ytterligare proxylager
- **Bättre resursutnyttjande**: Mer effektiv lastbalansering via Ciliums eBPF-implementation.

## Länkar

[Avveckling av Ingress Nginx](https://www.kubernetes.dev/blog/2025/11/1/ingress-nginx-retirement/)

[Gateway API](https://gateway-api.sigs.k8s.io)

[Cilium Gateway](https://docs.cilium.io/en/stable/network/servicemesh/gateway-api/gateway-api/#gateway-api-support)


{{< horisontal-card
    image="/img/graphics/safespring-image.svg"
    alt="Översikt över Safespring on-demand Kubernetes-kluster"
    cardtitle="Redo att testa detta i ett riktigt kluster?"
    text="Safespring on-demand Kubernetes låter dig provköra Gateway API och Cilium i en hanterad miljö där Talos, observabilitet och lagring redan finns på plats. Perfekt för att pilottesta din Ingress-Nginx-migrering innan du rullar ut den i produktion."
    link="/containers/"
    linktext="Upptäck Kubernetes on-demand"
>}}