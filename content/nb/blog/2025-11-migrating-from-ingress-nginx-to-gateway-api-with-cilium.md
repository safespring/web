---
ai: true
title: "Ingress-Nginx fases ut i mars 2026: Slik migrerer du til Gateway API og Cilium Gateway"
date: 2025-11-27
intro: "Denne artikkelen gir plattformteam en konkret migreringsveiledning."
draft: false
tags: ["container"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "nb"
sectiontext: "Teknologioppdatering"
section: "Tech update"
author: "Anders Johansson"
TOC: "I dette innlegget"
sidebarlinkurl: "/containers"
sidebarlinkname: "Utforsk Kubernetes på forespørsel"
sidebarlinkurl2: "/containers#get-started"
sidebarlinkname2: "Bestill en demo"
---
## TL;DR
Med utfasing av Ingress Nginx er migrering fra Ingress-Nginx til Gateway API ved bruk av Cilium med en delt gateway-tilnærming, der man bytter litt kompleksitet mot renere, mer effektiv og standardisert ingresshåndtering, én måte å løse spørsmålet om ingress til klyngen din på.

### Hvorfor utforske Gateway API:

- **Annotasjons-spredning**: Håndtere dusinvis av ingress-nginx-spesifikke annotasjoner på tvers av ingressressurser.
- **Begrenset fremtidssikring**: Dårligere i tråd med hvor Kubernetes er på vei.

### Gateway API tar tak i disse utfordringene ved å tilby:

- **Standardisering**: Er et offisielt Kubernetes-prosjekt.
- **Forbedret sikkerhet**: Innebygde RBAC-kontroller og navneromsbaserte tilgangsbegrensninger.
- **Bedre ressursstyring**: Alternativet med å bruke delte gateways betyr redusert ressurs-overhead.

{{< horisontal-card
    image="/img/graphics/safespring-image.svg"
    alt="Safespring Kubernetes på forespørsel med Cilium Gateway API"
    cardtitle="Gateway API på Cilium, driftet for deg"
    text="Start opp Talos-baserte klynger med Cilium og Gateway API klare fra dag én. Få en driftet kontrollplan og fleksibel blokk-lagring, slik at du kan fokusere på arbeidslastene dine i stedet for infrastrukturen."
    link="/containers/"
    linktext="Oppdag Kubernetes på forespørsel"
>}}

{{< distance >}}
## La oss starte

{{% note "Forutsetninger" %}}

### Installasjon av Gateway API-CRD-er
Før du begynner migreringen, må du installere Gateway API-CRD-ene. Vi bruker den nyeste Gateway API v1.4.0:
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

## Påkrevd Cilium-konfigurasjon

For å aktivere Gateway API-støtte i Cilium, må flere nøkkelfunksjoner konfigureres:

### Vesentlige Cilium-funksjoner
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
### Konfigurasjon av IP-pool for lastbalanser

Definer en IP-pool for LoadBalancer-tjenester:
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
### Policy for L2-kunngjøringer

Konfigurer L2-kunngjøringer for nettverksgrensesnittet ditt:
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
## Delt vs ikke-delt gateway

Å bruke en ikke-delt gateway vil replikere det samme mønsteret som ingress-nginx. I bunn og grunn én gateway, httproute og en grant for TLS-sertifikatet.
Og en gateway betyr også at du bruker en IP fra puljen.
Selv om det finnes brukstilfeller for å bruke en separat gateway for arbeidslasten din, vil vi fokusere på den delte gatewayen i dette blogginnlegget.

### Ikke-delt gateway 

I den tradisjonelle tilnærmingen har hver tjeneste eller applikasjon sin egen Gateway-ressurs:

| Fordeler | Ulemper |
|------|------|
| Full isolasjon mellom tjenester | Høyere ressursforbruk (flere Gateway-instanser) |
| Individuell konfigurasjon per tjeneste | Duplisert håndtering av TLS-sertifikater |
| Enklere feilsøking (én gateway per tjeneste) | Mer kompleks sertifikatdistribusjon |
| Ingen avhengigheter på tvers av navnerom | Økt driftsmessig overhead |
|  | IP-forbruk |

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

### Delt Gateway 

La oss utforske den delte Gatewayen.

| Fordeler | Ulemper |
|------|------|
| Redusert ressursforbruk (én enkelt Gateway-instans) | Avhengigheter på tvers av navnerom |
| Sentralisert håndtering av TLS-sertifikater | Krever ekstra RBAC-konfigurasjon |
| Konsistente sikkerhetspolicyer | Mer komplekst førstegangsoppsett |
| Forenklet drift og overvåking | Potensielt enkeltpunkt for feil |
| Forbedret sikkerhet gjennom valg av navnerom |  |
| Forbruk av IP-adresser |  |

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

## Migrasjonstrinn

### Trinn 1: Forbered den delte gateway-infrastrukturen

Opprett navnerommet gateway-system og distribuer den delte gatewayen:
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
### Trinn 2: Konfigurer tilgang til sertifikater

Sett opp ReferenceGrant for å la gatewayen få tilgang til TLS-sertifikater:
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
### Trinn 3: Migrer individuelle tjenester

For hver tjeneste, følg dette migreringsmønsteret:

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
**Etter (Gateway API med delt gateway):**

1. Merk navnerommet:** 
    ```yaml
    apiVersion: v1
    kind: Namespace
    metadata:
      name: podinfo
      labels:
        gateway.networking.k8s.io/allowed: "true"  # Enable shared gateway access
    ```
2. Opprett HTTPRoute: 
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
3. Opprett ReferenceGrant for tilgang på tvers av navnerom:  
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
## Sikkerhetsforbedringer

Den delte gateway-tilnærmingen introduserer flere sikkerhetsforbedringer:

### Navneromsbasert tilgangskontroll
Kun navnerom eksplisitt merket med `gateway.networking.k8s.io/allowed: "true"` kan opprette HTTPRoutes som refererer til den delte gatewayen.

### Direkte sertifikathåndtering
Gatewayen får direkte tilgang til sertifikater fra cert-manager-navnerommet.

### RBAC-integrasjon
Korrekte ServiceAccount- og RBAC-policyer sikrer at bare autoriserte komponenter kan administrere gateway-ressurser.

## Hva er godbitene?

1. **Ressurseffektivitet**: Å utnytte Ciliums muligheter og minimere ressursoverhead er alltid bra. Mer eBPF til folket!
2. **Bedre sikkerhet**: Navneromsbaserte tilgangskontroller og direkte integrasjon med cert-manager
3. **Operasjonell enkelhet**: Færre ressurser å overvåke og vedlikeholde
4. **Standardetterlevelse**: I tråd med retningen i Kubernetes-fellesskapet

## Ytelsestanker

Den delte gateway-tilnærmingen viser forbedret ytelse ved:

- **Lavere minnebruk**: Én gateway-instans vs. flere gateways
- **Redusert nettverkslatens**: Direkte trafikkhåndtering uten ekstra proxy-lag
- **Bedre ressursutnyttelse**: Mer effektiv lastbalansering gjennom Ciliums eBPF-implementasjon.

## Lenker

[Avvikling av Ingress Nginx](https://www.kubernetes.dev/blog/2025/11/1/ingress-nginx-retirement/)

[Gateway API](https://gateway-api.sigs.k8s.io)

[Cilium Gateway](https://docs.cilium.io/en/stable/network/servicemesh/gateway-api/gateway-api/#gateway-api-support)


{{< horisontal-card
    image="/img/graphics/safespring-image.svg"
    alt="Oversikt over Safespring on-demand Kubernetes-klynge"
    cardtitle="Klar til å prøve dette i en ekte klynge?"
    text="Safespring on-demand Kubernetes lar deg testkjøre Gateway API og Cilium i et administrert miljø med Talos, observabilitet og lagring allerede på plass. Perfekt for å pilotere migreringen fra Ingress-Nginx før du ruller den ut i produksjon."
    link="/containers/"
    linktext="Oppdag on-demand Kubernetes"
>}}