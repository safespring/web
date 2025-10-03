---
ai: true
title: "Opsætning af en minimal Kubernetes-klynge på Safespring med Kubespray"
date: "2022-08-22"
intro: "Safespring er en cloudplatform baseret på OpenStack. Dette indlæg viser én måde, hvorpå du kan komme fra nul ressourcer til en minimal Kubernetes-klynge udelukkende ved hjælp af kode."
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
  - /blogg/2022-08-kubespray-minimal
  - /blogg/2022/2022-08-kubespray-minimal/
---
{{< ingress >}}
Kubespray er et omfattende værktøj, der dækker mange forskellige brugsscenarier. I dette indlæg fokuserer vi på den nødvendige konfiguration for at installere en minimal K8S-klynge til test og eksperimenter på Safespring.
{{< /ingress >}}

## Forudsætninger

1. Dette blogindlæg antager, at du bruger den open source Terraform CLI. Terraform CLI er blot et binært program, som du downloader fra [udgivelsessiden][tfreleases] for din arkitektur/platform. Her finder du også kontrolsummer for filerne til at verificere deres integritet. Der findes også den officielle [Terraform-dokumentation][tfdocs].
1. Et grundlæggende kendskab til Ansible-playbooks og inventories er også nødvendigt.
1. En smule grundlæggende brug af [OpenStack CLI][osclidoc] vil også være nødvendig.

## Introduktion til Kubespray

[Kubespray][kubespray] er en sammensætning af Ansible-playbooks, inventory, provisioneringsværktøjer og domæneviden til generelle konfigurationsstyringsopgaver for OS-/Kubernetes-klynger. Det er udbredt, har stor fleksibilitet via parametre og bliver aktivt vedligeholdt.

Til provisionering af virtuel infrastruktur på OpenStack bruger Kubespray Terraform-kode sammen med et inventory-script, der stiller inventory til rådighed for Kubesprays Ansible-playbooks baseret på Terraform state-filen, som beskriver den infrastruktur, der er provisioneret af Terraform.

## Provisionér infrastrukturen

1. Opret først en mappe til at placere din lokale klyngekonfiguration og state-filer:   
```bash
     $ mkdir -p ~/kubespray-clusters/minimal-k8s
   ```
1. Klon kubespray-repositoriet til det sted, du foretrækker, og skift til den seneste release:   
```bash
   $ cd ~/git/
   $ git clone https://github.com/kubernetes-sigs/kubespray.git
   $ cd kubespray
   $ git tag
   (....)
   $ git checkout v2.19
   ```
1. Opret en Terraform-variabelfil til infrastrukturen (eksempel):   
```hcl
   $ cat ~/kubespray-clusters/minimal-k8s/cluster.tfvars
   use_existing_network = "true"
   force_null_port_security = "true"

   # your Kubernetes cluster name here
   cluster_name = "minimal-k8s"

   # image to use for bastion, masters, standalone etcd instances, and nodes
   image = "ubuntu-20.04"

   # 0|1 bastion nodes
   number_of_bastions = 0

   use_neutron = 0

   # standalone etcds
   number_of_etcd = 0

   # masters
   number_of_k8s_masters = 0
   number_of_k8s_masters_no_etcd = 0
   number_of_k8s_masters_no_floating_ip = 1
   number_of_k8s_masters_no_floating_ip_no_etcd = 0
   flavor_k8s_master = "8f84ceab-89c1-4dfb-9ef6-97504475bd3a" #l2.c4r8.500
   #flavor_k8s_master = "e91ff4b7-cf9e-4d95-8374-aa3b1d765200" #l2.c4r8.1000

   # nodes
   number_of_k8s_nodes = 0
   number_of_k8s_nodes_no_floating_ip = 2
   flavor_k8s_node = "8f84ceab-89c1-4dfb-9ef6-97504475bd3a" # l2.c4r8.500

   # networking
   # ssh access to nodes
   k8s_allowed_remote_ips = ["0.0.0.0/0"]

   # Security group config
   worker_allowed_ports = [
     { # Node ports
       "protocol"         = "tcp"
       "port_range_min"   = 30000
       "port_range_max"   = 32767
       "remote_ip_prefix" = "0.0.0.0/0"
     },
     { # HTTP
       "protocol"         = "tcp"
       "port_range_min"   = 80
       "port_range_max"   = 80
       "remote_ip_prefix" = "0.0.0.0/0"
     },
     { # HTTPS
       "protocol"         = "tcp"
       "port_range_min"   = 443
       "port_range_max"   = 443
       "remote_ip_prefix" = "0.0.0.0/0"
     }
   ]
   external_net = "33dc493f-f4d5-4ab4-bf8e-43bee3faf3ef"
   use_access_ip = 1
   network_name = "public"
   public_key_path = "~/.ssh/id_rsa.pub"
   ```
Bemærk, at vi bruger `no_floating_ip`-parametrene til at angive antallet af master- og worker-noder. Det skyldes, at Safespring IaaS-platformen ikke har brugerstyrede netværkskomponenter som floating IP, subnet, router osv. Hvis du ikke er bekendt med dette, så læs venligst [blogindlægget, der forklarer hvordan og hvorfor][netblog]. Af samme grund skal vi også sætte `use_existing_network = "true"` og `force_null_port_security = "true"`.

Flavors skal angives som flavor-ID'er. De kan findes via OpenStack CLI med `openstack flavor list`. `external_net` er id'et for `public`-netværket og kan findes med `openstack network list`.

### Undgå at lække dine personlige OpenStack-adgangsoplysninger

Kubespray-installationen, som vi bruger senere, konfigurerer en in-cluster cloud provider-konfiguration for at bruge dynamisk klargjort lagring og tilknytte den til pods i klyngen. Installationen kopierer de miljøvariabler, der bruges til at provisionere infrastrukturen, og gemmer dem i klyngen til dette formål. For at undgå at lække dine personlige OpenStack-adgangsoplysninger til klyngens cloud-config bør du i stedet oprette en [applikationslegitimation][appcred] og bruge den både til infrastruktur-provisioneringen med Terraform og så Ansible-playbooks kan afhente og kopiere den under installation af K8S.

1. Kort sagt, gør dette:   
```bash
   $ openstack application credential create dummy
   +--------------+----------------------------------------------------------------------------------------+
   | Field        | Value                                                                                  |
   +--------------+----------------------------------------------------------------------------------------+
   | description  | None                                                                                   |
   | expires_at   | None                                                                                   |
   | id           | 26eb762775cc4544b4d4f76fdb642f9a                                                       |
   | name         | dummy                                                                                  |
   | project_id   | 74cf3e20e55345d29935625c7b3e5618                                                       |
   | roles        | member reader                                                                          |
   | secret       | fWtpQpR1-HShPkjjCa8pdMoI6oTWPQtB38qQVR-fjTJyynnLMjexY0T7M-2CQjqZMjLv4hct15leIRA4up4WWA |
   | system       | None                                                                                   |
   | unrestricted | False                                                                                  |
   | user_id      | 9956b53cf1ca4967a7a945b4e6657cf6                                                       |
   +--------------+----------------------------------------------------------------------------------------+
   ```
1. Opret derefter en miljøfil med følgende oplysninger og kør `source` på den:   
```bash
   export OS_AUTH_URL=<same-as-in-your-personal-openstack-cli-config>
   export OS_REGION_NAME=<same-as-in-your-personal-openstack-cli-config>
   export OS_APPLICATION_CREDENTIAL_SECRET=fWtpQpR1-HShPkjjCa8pdMoI6oTWPQtB38qQVR-fjTJyynnLMjexY0T7M-2CQjqZMjLv4hct15leIRA4up4WWA
   export OS_APPLICATION_CREDENTIAL_ID=26eb762775cc4544b4d4f76fdb642f9a
   export OS_APPLICATION_CREDENTIAL_NAME=dummy
   export OS_AUTH_TYPE=v3applicationcredential
   ```
1. ID’et og den hemmelige nøgle skal naturligvis erstattes med værdierne fra din egen
   oprettelse af legitimationsoplysninger til applikationen. Jeg sletter bare denne
   dummy-legitimation for at undgå misbrug.
   `   $ openstack  application credential delete dummy`
1. Gå til Terraform OpenStack contrib-mappen i kubespray-repoet, og kør
   terraform init og apply derfra.
   `   $ cd ~/git/kubespray/contrib/terraform/openstack/
$ terraform init
$ terraform apply -var-file=$HOME/kubespray-clusters/minimal-k8s/cluster.tfvars  -state=$HOME/kubespray-clusters/minimal-k8s/terraform.tfstate
(...)`
1. Bemærk, at vi har fået infrastrukturen som lovet af terraform-koden, for eksempel:   
```
   $ openstack server list |grep mini
   | 0ac5616f-aff7-4d5a-849b-54cbec614137 | minimal-k8s-k8s-master-nf-1 | ACTIVE  | public=212.162.146.113, 2a09:d400:0:1::296 | ubuntu-20.04             | l2.c4r8.500  |
   | 169d54b5-995b-4271-9b18-87547097d295 | minimal-k8s-k8s-node-nf-1   | ACTIVE  | public=212.162.147.139, 2a09:d400:0:1::221 | ubuntu-20.04             | l2.c4r8.500  |
   | a757b87c-03e1-4dd9-813b-8e40fd575196 | minimal-k8s-k8s-node-nf-2   | ACTIVE  | public=212.162.147.52, 2a09:d400:0:1::17b  | ubuntu-20.04             | l2.c4r8.500  |
   ```
## Installer K8S med Kubespray

1. Kopier inventory-scriptet fra kubespray git-repoet til din clusters config/state-mappe, og sørg for, at det er kørbart.
   `bash
$ cp ~/git/kubespray/contrib/terraform/terraform.py ~/kubespray-clusters/minimal-k8s
$ chmod +x ~/kubespray-clusters/minimal-k8s/terraform.py
`
1. Gå til Kubespray-repoet, opret et Python-virtualenv, aktiver det, og installer Kubesprays afhængigheder.   
```bash
   $ python3 -m venv venv
   $ source venv/bin/activate
   $ pip install -r requirements.txt
   ```
1. Kontrollér, at du har SSH-adgang, og at inventory fungerer.   
```bash
   $ ansible -i ~/kubespray-clusters/minimal-k8s/terraform.py -m ping all
   [WARNING]: Skipping callback plugin 'ara_default', unable to load
   minimal-k8s-k8s-master-nf-1 | SUCCESS => {
       "changed": false,
       "ping": "pong"
   }
   minimal-k8s-k8s-node-nf-2 | SUCCESS => {
       "changed": false,
       "ping": "pong"
   }
   minimal-k8s-k8s-node-nf-1 | SUCCESS => {
       "changed": false,
       "ping": "pong"
   }
   ```
1. Opret en konfigurationsfil til Kubespray Ansible-opsætningen, for eksempel sådan her:   
```yaml
   mkdir -p ~/kubespray-clusters/minimal-k8s-old/group_vars/k8s_cluster
   vi ~/kubespray-clusters/minimal-k8s-old/group_vars/k8s_cluster/ck8s-k8s-cluster.yaml
   (edit stuff)
   cat ~/kubespray-clusters/minimal-k8s-old/group_vars/k8s_cluster/ck8s-k8s-cluster.yaml
   artifacts_dir: "{{ inventory_dir }}/artifacts"
   cluster_admin_users:
   - k8sadmin@exmaple.com
   cluster_admin_groups:
   - admin-group
   kubeconfig_localhost: true
   force_null_port_security: true
   ingress_nginx_enabled: true
   ngress_nginx_host_network: true
   cloud_provider: external
   external_cloud_provider: openstack
   calico_mtu: 1480
   external_openstack_cloud_controller_extra_args:
     # Must be different for every cluster in the same openstack project
     cluster-name: "minimal-k8s"
   cinder_csi_enabled: true
   persistent_volumes_enabled: true
   storage_classes:
     - name: cinder-csi
       is_default: true
       parameters:
         allowVolumeExpansion: true
         availability: nova
   ```
   En omfattende vejledning om de tilgængelige parametre findes i [Kubespray
   dokumentationen][ksparams]
1. Så er det tid til at installere Kubernetes ved hjælp af Kubespray-playbook og -roller.   
```
   $ .venv/bin/ansible-playbook -i ~/kubespray-clusters/minimal-k8s/terraform.py cluster.yml -b
   ```
1. Snup en kop kaffe eller to ..... eller måske endda tre :-)

## Test af klyngen

1. Sørg for, at du har `kubectl` installeret.
1. Installationen kopierer en kubeconfig til
   `~/kubespray-clusters/minimal-k8s/artifacts/admin.conf`, fordi
   `kubeconfig_localhost: true` og `artifacts_dir: "{{ inventory_dir
}}/artifacts"`. Denne fil giver fuld klyngeadministratoradgang (root) og bør
   beskyttes tilsvarende.
1. Sæt miljøvariablen `KUBECONFIG` til at pege på din cluster-admin-kubeconfig:   
```
   $ cd ~/kubespray-clusters/minimal-k8s
   $ export KUBECONFIG=artifacts/admin.conf
   ```
1. Undersøg nogle egenskaber med kubectl:   
```bash
   $ kubectl get nodes
   NAME                          STATUS   ROLES                  AGE     VERSION
   minimal-k8s-k8s-master-nf-1   Ready    control-plane,master   6m40s   v1.23.7
   minimal-k8s-k8s-node-nf-1     Ready    <none>                 5m27s   v1.23.7
   minimal-k8s-k8s-node-nf-2     Ready    <none>                 5m27s   v1.23.7

    kubectl get pods --all-namespaces -o wide
   NAMESPACE       NAME                                                  READY   STATUS    RESTARTS   AGE   IP                NODE                          NOMINATED NODE   READINESS GATES
   ingress-nginx   ingress-nginx-controller-mkn8d                        1/1     Running   0          20m   10.233.113.1      minimal-k8s-k8s-node-nf-1     <none>           <none>
   ingress-nginx   ingress-nginx-controller-s62ss                        1/1     Running   0          20m   10.233.125.1      minimal-k8s-k8s-node-nf-2     <none>           <none>
   kube-system     calico-kube-controllers-6dd874f784-mjsds              1/1     Running   0          20m   212.162.146.113   minimal-k8s-k8s-master-nf-1   <none>           <none>
   kube-system     calico-node-d42n5                                     1/1     Running   0          21m   212.162.147.139   minimal-k8s-k8s-node-nf-1     <none>           <none>
   kube-system     calico-node-p5jrt                                     1/1     Running   0          21m   212.162.146.113   minimal-k8s-k8s-master-nf-1   <none>           <none>
   kube-system     calico-node-qwj5l                                     1/1     Running   0          21m   212.162.147.52    minimal-k8s-k8s-node-nf-2     <none>           <none>
   kube-system     coredns-76b4fb4578-6n4rj                              1/1     Running   0          20m   10.233.113.2      minimal-k8s-k8s-node-nf-1     <none>           <none>
   kube-system     coredns-76b4fb4578-t8gxw                              1/1     Running   0          20m   10.233.72.1       minimal-k8s-k8s-master-nf-1   <none>           <none>
   kube-system     csi-cinder-controllerplugin-cf59469bb-xxt7j           6/6     Running   0          19m   10.233.125.2      minimal-k8s-k8s-node-nf-2     <none>           <none>
   kube-system     csi-cinder-nodeplugin-9mpf8                           3/3     Running   0          19m   212.162.147.52    minimal-k8s-k8s-node-nf-2     <none>           <none>
   kube-system     csi-cinder-nodeplugin-b2t99                           3/3     Running   0          19m   212.162.147.139   minimal-k8s-k8s-node-nf-1     <none>           <none>
   kube-system     dns-autoscaler-7979fb6659-67cv5                       1/1     Running   0          20m   10.233.72.2       minimal-k8s-k8s-master-nf-1   <none>           <none>
   kube-system     kube-apiserver-minimal-k8s-k8s-master-nf-1            1/1     Running   1          23m   212.162.146.113   minimal-k8s-k8s-master-nf-1   <none>           <none>
   kube-system     kube-controller-manager-minimal-k8s-k8s-master-nf-1   1/1     Running   1          23m   212.162.146.113   minimal-k8s-k8s-master-nf-1   <none>           <none>
   kube-system     kube-proxy-4rp76                                      1/1     Running   0          21m   212.162.147.139   minimal-k8s-k8s-node-nf-1     <none>           <none>
   kube-system     kube-proxy-j5w9g                                      1/1     Running   0          21m   212.162.147.52    minimal-k8s-k8s-node-nf-2     <none>           <none>
   kube-system     kube-proxy-jx5zq                                      1/1     Running   0          21m   212.162.146.113   minimal-k8s-k8s-master-nf-1   <none>           <none>
   kube-system     kube-scheduler-minimal-k8s-k8s-master-nf-1            1/1     Running   1          23m   212.162.146.113   minimal-k8s-k8s-master-nf-1   <none>           <none>
   kube-system     nginx-proxy-minimal-k8s-k8s-node-nf-1                 1/1     Running   0          21m   212.162.147.139   minimal-k8s-k8s-node-nf-1     <none>           <none>
   kube-system     nginx-proxy-minimal-k8s-k8s-node-nf-2                 1/1     Running   0          21m   212.162.147.52    minimal-k8s-k8s-node-nf-2     <none>           <none>
   kube-system     nodelocaldns-hg2gh                                    1/1     Running   0          20m   212.162.147.52    minimal-k8s-k8s-node-nf-2     <none>           <none>
   kube-system     nodelocaldns-qzxqz                                    1/1     Running   0          20m   212.162.147.139   minimal-k8s-k8s-node-nf-1     <none>           <none>
   kube-system     nodelocaldns-rbh2g                                    1/1     Running   0          20m   212.162.146.113   minimal-k8s-k8s-master-nf-1   <none>           <none>
   kube-system     openstack-cloud-controller-manager-jlzmd              1/1     Running   0          20m   212.162.146.113   minimal-k8s-k8s-master-nf-1   <none>           <none>
   kube-system     snapshot-controller-754bc6769f-4hqcd                  1/1     Running   0          19m   10.233.113.3      minimal-k8s-k8s-node-nf-1     <none>           <none>

   $ kubectl get storageclass
   NAME                   PROVISIONER                RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
   cinder-csi (default)   cinder.csi.openstack.org   Delete          WaitForFirstConsumer   true                   20m
   ```
1. Test, at storageclass virker:   
```bash
   cat pod-with-pvc.yml
   apiVersion: v1
   kind: Pod
   metadata:
     name: task-pv-pod
   spec:
     volumes:
       - name: task-pv-storage
         persistentVolumeClaim:
           claimName: task-pv-claim
     containers:
       - name: task-pv-container
         image: nginx
         ports:
           - containerPort: 80
             name: "http-server"
         volumeMounts:
           - mountPath: "/usr/share/nginx/html"
             name: task-pv-storage
   ---
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: task-pv-claim
   spec:
      accessModes:
        - ReadWriteOnce
      resources:
          requests:
              storage: 2Gi


   $ kubectl apply -f pod-with-pvc.yml
   pod/task-pv-pod created
   persistentvolumeclaim/task-pv-claim created
   $ kubectl get pods
   NAME          READY   STATUS              RESTARTS   AGE
   task-pv-pod   0/1     ContainerCreating   0          13s
   $ kubectl get pods
   NAME          READY   STATUS    RESTARTS   AGE
   task-pv-pod   1/1     Running   0          20s
   $ kubectl get pvc
   NAME            STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
   task-pv-claim   Bound    pvc-e09d7ae7-391e-4659-a46b-2a9e7213b90a   2Gi        RWO            cinder-csi     27s

   $ kubectl delete  -f pod-with-pvc.yml
   pod "task-pv-pod" deleted
   persistentvolumeclaim "task-pv-claim" deleted

   $ kubectl get pvc
   No resources found in default namespace.
   $ kubectl get pods
   No resources found in default namespace.
   ```
1. Test, at ingressen fungerer:   
```bash
   $ cat apple.yml
   kind: Pod
   apiVersion: v1
   metadata:
     name: apple-app
     labels:
       app: apple
   spec:
     containers:
       - name: apple-app
         image: hashicorp/http-echo
         args:
           - "-text=apple"

   ---

   kind: Service
   apiVersion: v1
   metadata:
     name: apple-service
   spec:
     selector:
       app: apple
     ports:
       - port: 5678 # Default port for image

   $ cat banana.yml
   kind: Pod
   apiVersion: v1
   metadata:
     name: banana-app
     labels:
       app: banana
   spec:
     containers:
       - name: banana-app
         image: hashicorp/http-echo
         args:
           - "-text=banana"

   ---

   kind: Service
   apiVersion: v1
   metadata:
     name: banana-service
   spec:
     selector:
       app: banana
     ports:
       - port: 5678 # Default port for image

   $ cat ingress-path-apple-banana.yml
   kind: Ingress
   apiVersion: networking.k8s.io/v1
   metadata:
     name: example-ingress
     annotations:
       ingress.kubernetes.io/rewrite-target: /
   spec:
     rules:
     - http:
         paths:
           - path: /apple
             pathType: Prefix
             backend:
               service:
                 name: apple-service
                 port:
                   number: 5678
           - path: /banana
             pathType: Prefix
             backend:
               service:
                 name: banana-service
                 port:
                   number: 5678

   $ kubectl apply -f apple.yml -f banana.yml -f ingress-path-apple-banana.yml
   pod/apple-app created
   service/apple-service created
   pod/banana-app created
   service/banana-service created
   ingress.networking.k8s.io/example-ingress created
   ```
Nu har vi oprettet to simple pods, der hver især returnerer teksten "apple" og "banana", samt to tjenester til at eksponere dem internt i klyngen. Koden i `ingress-path-apple-banana.yml` opretter en ingress, der eksponerer disse tjenester på stierne `/apple` og `/banana` på alle worker-noder via nginx-ingress-controlleren, som blev installeret, fordi `ingress_nginx_enabled: true` og `ngress_nginx_host_network: true`

1. Lad os se, om vi kan nå dem udefra klyngen:   
```bash
   $ openstack server list |grep node
   | 169d54b5-995b-4271-9b18-87547097d295 | minimal-k8s-k8s-node-nf-1   | ACTIVE  | public=212.162.147.139, 2a09:d400:0:1::221 | ubuntu-20.04             | l2.c4r8.500  |
   | a757b87c-03e1-4dd9-813b-8e40fd575196 | minimal-k8s-k8s-node-nf-2   | ACTIVE  | public=212.162.147.52, 2a09:d400:0:1::17b  | ubuntu-20.04             | l2.c4r8.500  |

   $ curl http://212.162.147.52/banana
   banana
   $ curl http://212.162.147.52/apple
   apple
   ```
## Opsummering

Det var vist alt for dette blogindlæg. Husk, at denne opsætning på ingen måde er egnet til produktion. Kontakt os gerne på [info@safespring.com](mailto:info@safespring.com), så hjælper vi dig også med at finde den rigtige løsning til Kubernetes i produktion.

Når du er færdig med at teste, kan du fjerne det hele med:
```bash
$ cd ~/git/kubespray/contrib/terraform/openstack
$ terraform destroy -var-file=$HOME/kubespray-clusters/minimal-k8s/cluster.tfvars  -state=$HOME/kubespray-clusters/minimal-k8s/terraform.tfstate
```
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