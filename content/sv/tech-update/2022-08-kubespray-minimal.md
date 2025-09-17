---
ai: true
title: "Konfigurera ett minimalt Kubernetes-kluster på Safespring med Kubespray"
date: "2022-08-22"
intro: "Safespring är en molnplattform byggd på OpenStack. Det här inlägget visar ett sätt att gå från inga resurser till ett minimalt Kubernetes-kluster enbart med kod."
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
  - /blogg/2022-08-kubespray-minimal
  - /blogg/2022/2022-08-kubespray-minimal/
---
{{< ingress >}}
Kubespray är ett heltäckande verktyg som täcker många olika användningsfall. I det här inlägget fokuserar vi på den nödvändiga konfigurationen för att installera ett minimalt K8S-kluster för test och experiment på Safespring.
{{< /ingress >}}

## Förutsättningar

1. Detta blogginlägg utgår från att du använder den öppna källkodsversionen av Terraform CLI. Terraform CLI är bara ett binärt program som du laddar ned från [releases-sidan][tfreleases] för din arkitektur/plattform. Här hittar du också checksummor för filerna för att verifiera deras integritet. Det finns även den officiella [Terraform-dokumentationen][tfdocs].
1. Grundläggande förståelse för Ansible-playbooks och inventory krävs också.
1. Viss grundläggande användning av [OpenStack CLI][osclidoc] kommer också att krävas.

## Introduktion till Kubespray

[Kubespray][kubespray] är en samling av Ansible-playbooks, inventory, provisioningverktyg och domänkunskap för generella konfigurationshanteringsuppgifter för OS/Kubernetes-kluster. Det används i stor utsträckning, erbjuder stor flexibilitet via parametrar och underhålls aktivt.

För att provisionera virtuell infrastruktur på OpenStack använder Kubespray Terraform-kod tillsammans med ett inventory-skript som förser Kubesprays Ansible-playbooks med inventory baserat på Terraform state-filen som beskriver den infrastruktur som provisionerats av Terraform.

## Provisionera infrastrukturen

1. Skapa först en katalog där du placerar din lokala klusterkonfiguration och dina state-filer:   ```bash
     $ mkdir -p ~/kubespray-clusters/minimal-k8s
   ```
1. Klona kubespray-repot till valfri plats och checka ut den senaste releasen:   ```bash
   $ cd ~/git/
   $ git clone https://github.com/kubernetes-sigs/kubespray.git
   $ cd kubespray
   $ git tag
   (....)
   $ git checkout v2.19
   ```
1. Skapa en Terraform-variabelfil för infrastrukturen (exempel):   ```hcl
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
Observera att vi använder parametrarna `no_floating_ip` för att ange antalet master- och worker-noder. Detta beror på att Safesprings IaaS-plattform inte har användarkontrollerade nätverkskomponenter som floating IP, subnät, routrar och så vidare. Om du inte är bekant med detta, läs gärna [blogginlägget som förklarar hur och varför][netblog]. Av samma skäl måste vi också sätta `use_existing_network = "true"` och `force_null_port_security = "true"`.

Flavors måste anges som flavor-ID:n. De kan hittas med OpenStack CLI via `openstack flavor list`. `external_net` är ID:t för nätverket `public` och kan hittas med `openstack network list`.

### Undvik att läcka dina personliga OpenStack-autentiseringsuppgifter

Kubespray-installationen som vi använder senare kommer att konfigurera en in-kluster-konfiguration för molnleverantören för att kunna använda dynamiskt provisionerad lagring och koppla till poddar i klustret. Installationen kopierar de miljövariabler som används för att provisionera infrastrukturen och lagrar dem i klustret för detta ändamål. För att undvika att dina personliga OpenStack-autentiseringsuppgifter läcker in i klustrets cloud-config bör du i stället skapa en [applikationsreferens][appcred] och använda den både för infrastruktur­provisioneringen med Terraform och för att Ansible-playbooks ska kunna plocka upp och kopiera den vid installation av K8S.

1. Kort sagt, gör så här:   ```bash
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
1. Skapa sedan en miljöfil med följande information och kör `source` på den:   ```bash
   export OS_AUTH_URL=<same-as-in-your-personal-openstack-cli-config>
   export OS_REGION_NAME=<same-as-in-your-personal-openstack-cli-config>
   export OS_APPLICATION_CREDENTIAL_SECRET=fWtpQpR1-HShPkjjCa8pdMoI6oTWPQtB38qQVR-fjTJyynnLMjexY0T7M-2CQjqZMjLv4hct15leIRA4up4WWA
   export OS_APPLICATION_CREDENTIAL_ID=26eb762775cc4544b4d4f76fdb642f9a
   export OS_APPLICATION_CREDENTIAL_NAME=dummy
   export OS_AUTH_TYPE=v3applicationcredential
   ```
1. ID:t och hemligheten måste förstås ersättas med värdena från de applikationsautentiseringsuppgifter du själv har skapat. Jag tar helt enkelt bort den här dummyuppgiften för att undvika missbruk.
   `   $ openstack  application credential delete dummy`
1. Gå till Terraform Openstack-contrib-katalogen i kubespray-repot och kör terraform init och apply därifrån.
   `   $ cd ~/git/kubespray/contrib/terraform/openstack/
$ terraform init
$ terraform apply -var-file=$HOME/kubespray-clusters/minimal-k8s/cluster.tfvars  -state=$HOME/kubespray-clusters/minimal-k8s/terraform.tfstate
(...)`
1. Observera att vi fick infrastrukturen som utlovats av terraform-koden, till exempel:   ```
   $ openstack server list |grep mini
   | 0ac5616f-aff7-4d5a-849b-54cbec614137 | minimal-k8s-k8s-master-nf-1 | ACTIVE  | public=212.162.146.113, 2a09:d400:0:1::296 | ubuntu-20.04             | l2.c4r8.500  |
   | 169d54b5-995b-4271-9b18-87547097d295 | minimal-k8s-k8s-node-nf-1   | ACTIVE  | public=212.162.147.139, 2a09:d400:0:1::221 | ubuntu-20.04             | l2.c4r8.500  |
   | a757b87c-03e1-4dd9-813b-8e40fd575196 | minimal-k8s-k8s-node-nf-2   | ACTIVE  | public=212.162.147.52, 2a09:d400:0:1::17b  | ubuntu-20.04             | l2.c4r8.500  |
   ```
## Installera K8S med Kubespray

1. Kopiera inventory-skriptet från Kubesprays git-repo till klustrets katalog config/state och se till att det är körbart.
   `bash
$ cp ~/git/kubespray/contrib/terraform/terraform.py ~/kubespray-clusters/minimal-k8s
$ chmod +x ~/kubespray-clusters/minimal-k8s/terraform.py
`
1. Gå till Kubespray-repot, skapa en Python-virtualenv, aktivera den och installera Kubesprays beroenden.   ```bash
   $ python3 -m venv venv
   $ source venv/bin/activate
   $ pip install -r requirements.txt
   ```
1. Kontrollera att du har SSH-åtkomst och att inventory fungerar.   ```bash
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
1. Skapa en konfigurationsfil för Kubespray Ansible-uppsättningen, till exempel så här:   ```yaml
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
   En omfattande guide till tillgängliga parametrar finns i [Kubespray
   dokumentationen][ksparams]
1. Därefter är det dags att installera Kubernetes med Kubespray-playbooken och rollerna.   ```
   $ .venv/bin/ansible-playbook -i ~/kubespray-clusters/minimal-k8s/terraform.py cluster.yml -b
   ```
1. Gå och ta en kaffe eller två ..... eller kanske till och med tre :-)

## Testa klustret

1. Kontrollera att du har `kubectl` installerat.
1. Installationen kopierar en kubeconfig till
   `~/kubespray-clusters/minimal-k8s/artifacts/admin.conf` eftersom
   `kubeconfig_localhost: true` och `artifacts_dir: "{{ inventory_dir
}}/artifacts"` är konfigurerade så. Denna fil ger fullständig klusteradministratörsåtkomst (root) och bör skyddas därefter.
1. Ställ in miljövariabeln `KUBECONFIG` så att den pekar på din kubeconfig för klusteradministratören:   ```
   $ cd ~/kubespray-clusters/minimal-k8s
   $ export KUBECONFIG=artifacts/admin.conf
   ```
1. Inspektera vissa egenskaper med hjälp av kubectl:   ```bash
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
1. Testa att lagringsklassen fungerar:   ```bash
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
1. Testa att ingressen fungerar:   ```bash
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
   Nu har vi skapat två enkla poddar som kommer att eko tillbaka texten ”apple” och
   ”banana” respektive och två tjänster för att exponera dem internt i
   klustret. Koden i `ingress-path-apple-banana.yml` kommer att skapa en ingress som
   kommer att exponera dessa tjänster på sökvägarna `/apple` och `/banana` respektive på alla
   arbetsnoder via nginx-ingresskontrollern som installerades eftersom
   `ingress_nginx_enabled: true` och `ngress_nginx_host_network: true`

1. Låt oss se om vi kan nå dem från utsidan av klustret:   ```bash
   $ openstack server list |grep node
   | 169d54b5-995b-4271-9b18-87547097d295 | minimal-k8s-k8s-node-nf-1   | ACTIVE  | public=212.162.147.139, 2a09:d400:0:1::221 | ubuntu-20.04             | l2.c4r8.500  |
   | a757b87c-03e1-4dd9-813b-8e40fd575196 | minimal-k8s-k8s-node-nf-2   | ACTIVE  | public=212.162.147.52, 2a09:d400:0:1::17b  | ubuntu-20.04             | l2.c4r8.500  |

   $ curl http://212.162.147.52/banana
   banana
   $ curl http://212.162.147.52/apple
   apple
   ```
## Sammanfattning

Det var allt för det här blogginlägget. Kom ihåg att den här konfigurationen inte
är lämplig för produktionsbruk på något sätt. Kontakta oss gärna på [info@safespring.com](mailto:info@safespring.com) så hjälper vi dig att hitta rätt lösning för Kubernetes i
produktion också.

När du är klar med testningen kan du ta bort allt med:```bash
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