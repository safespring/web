---
title: "Setting up a minimal Kubernetes cluster on Safespring using Kubespray"
date: "2022-08-16"
intro: "This post shows one way you can get from no resources to a minimal Kubernetes cluster with code only."
draft: true
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Tech update"
language: "En"
toc: "Table of contents"
---
{{< ingress >}}
This blog post explains how to automatically configure and deploy a minimal
Kubernetes (K8S) cluster by utilizing a tool called Kubespray. Kubespray is a
comprehensive tool that covers a lot of different use cases. In this post we
will focus on the necessary config to install a minimal K8S cluster for test
and experiment on the Safespring IaaS.
{{< /ingress >}}

## Prerequisites
This blog post assumes that you use the open source Terraform CLI. Terraform CLI
is just a binary program that you download from the [releases page][tfreleases],
for your architecture/platform. Here you also find checksums for the files to
verify their integrity.

There is also the official [Terraform documentation][tfdocs].

A basic understanding of Ansible playbooks and inventories is also necessary.

[Some basic usage of the openstack CLI will also be required][osclidoc].

## Kubespray introduction

[Kubespray][kubespray] is a composition of Ansible playbooks,
inventory, provisioning tools, and domain knowledge for generic OS/Kubernetes
clusters configuration management tasks. It is widely used, has a lot of
flexibility using parameters and is actively maintained.

For provisioning virtual infrastructure on Openstack, Kubespray uses Terraform
code together with an inventory script that provides the Kubespray Ansible
playbooks with inventory based on the Terraform state file describing the
infrastructure provisioned by Terraform.

## Provision the infrastructure

First create a directory to place your local cluster config and state files:
```bash
$ mkdir -p ~/kubespray-clusters/minimal-k8s
```

Clone the kubespray repository to your preferred place, and check out the latest release:
```bash
$ cd ~/git/
$ git clone https://github.com/kubernetes-sigs/kubespray.git
$ cd kubespray
$ git tag
(....)
$ git checkout v2.19
```

Create a terraform variable file for the infrastructure (example):
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

Note that we use the `no_floating_ip`-parameters to specify the number of
masters and workers. This is because the Safespring IaaS platform doesn't have
user- controllable network components like floting ip, subnetl, router and so
on. If you are not familiar with this fact then please read [the blog post that
explain how and why][netblog]. For the same reason we must also set
`use_existing_network = "true"` and `force_null_port_security = "true"`

Flavors must be given as flavor IDs. They can be found using the Openstack CLI
with `openstack flavor list`. `external_net` is the id of the `public` network
and can be found using `openstack network list`.

The Kubespray installation that we'll use later on will be configuring an
in-cluster cloud provider config in order to use dynamically provisioned
storage and attach to pods in the cluster. The installation will copy the
environment variables used for provisioning the infrastructure and store them
in the cluster for this purpose. To avoid leaking your personal Openstack
credentials into the cluster's cloud-config you should rather create an
[application credential][appcred], and use that both for the infrastructure
provisioning with Terraform and for the ansible playbooks to pick up and copy
when installing K8S.

In short, do this:
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

Then create an environment file with the following information and `source` it:
```bash
export OS_AUTH_URL=<same-as-in-your-personal-openstack-cli-config>
export OS_REGION_NAME=<same-as-in-your-personal-openstack-cli-config>
export OS_APPLICATION_CREDENTIAL_SECRET=fWtpQpR1-HShPkjjCa8pdMoI6oTWPQtB38qQVR-fjTJyynnLMjexY0T7M-2CQjqZMjLv4hct15leIRA4up4WWA
export OS_APPLICATION_CREDENTIAL_ID=26eb762775cc4544b4d4f76fdb642f9a
export OS_APPLICATION_CREDENTIAL_NAME=dummy
export OS_AUTH_TYPE=v3applicationcredential
```

The ID and secret must of course be substituted with the values from your own
creation of application credentials. I'll just delete this dummy credential in
order to avoid abuse.
```
$ openstack  application credential delete dummy
```

Go to the Terraform Openstack contrib directory of the kubespray repo and run
terraform init and apply from there.
```
$ cd ~/git/kubespray/contrib/terraform/openstack/
$ terraform init
$ terraform apply -var-file=$HOME/kubespray-clusters/minimal-k8s/cluster.tfvars  -state=$HOME/kubespray-clusters/minimal-k8s/terraform.tfstate
(...)
```

Observe that we got the infrastructure as promised by the terraform code with for example:
```
$ openstack server list |grep mini
| 0ac5616f-aff7-4d5a-849b-54cbec614137 | minimal-k8s-k8s-master-nf-1 | ACTIVE  | public=212.162.146.113, 2a09:d400:0:1::296 | ubuntu-20.04             | l2.c4r8.500  |
| 169d54b5-995b-4271-9b18-87547097d295 | minimal-k8s-k8s-node-nf-1   | ACTIVE  | public=212.162.147.139, 2a09:d400:0:1::221 | ubuntu-20.04             | l2.c4r8.500  |
| a757b87c-03e1-4dd9-813b-8e40fd575196 | minimal-k8s-k8s-node-nf-2   | ACTIVE  | public=212.162.147.52, 2a09:d400:0:1::17b  | ubuntu-20.04             | l2.c4r8.500  |
```

## Install K8S using Kubespray

Copy the inventory script from the kubespray git repo to your cluster
config/state directory and make sure it is executable.
```bash
$ cp ~/git/kubespray/contrib/terraform/terraform.py ~/kubespray-clusters/minimal-k8s
$ chmod +x ~/kubespray-clusters/minimal-k8s/terraform.py
```

Go to the Kubespray repo, create a python virtualenv, activate it and install
the Kubespray requirements.
```bash
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install -r requirements.txt
```

Check that you have ssh access and that inventory is working.
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

Create a config file for the Kubespray ansible setup, for example like this:
```yaml
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

A comprehensive guide for available parameters can be found on the [Kubespray
documentation][ksparams]

Then it is time to install Kubernetes using the Kubespray playbook and roles.
```
$ ansible-playbook -i ~/kubespray-clusters/minimal-k8s/terraform.py cluster.yml -b
```

Go for a coffe or two ..... or maybe even three :-)

## Testing the cluster

Make sure you have `kubectl` installed.

The installation copies a kubeconfig into
`~/kubespray-clusters/minimal-k8s/artifacts/admin.conf` because
´kubeconfig_localhost: true` and `artifacts_dir: "{{ inventory_dir
}}/artifacts"`. This file gives full cluster admin access (root) and should be
protected likewise.

Set the KUBECONFIG environment variable to point to your cluster-admin-kubeconfig:
```
$ cd ~/kubespray-clusters/minimal-k8s
$ export KUBECONFIG=artifacts/admin.conf
```

Inspect some properties using kubectl:
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

Test that the storageclass works:
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

Test that the ingress is working:
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

Now we have created two simple pods that will echo back the text "apple" and
"banana" respectively and two services to expose them internally in the
cluster. The `ingress-path-apple-banana.yml` code will create an ingress that
will expose those services on paths `/apple` and `/banana` respectively on all
worker nodes through the nginx ingress controller that was installed because
`ingress_nginx_enabled: true` and `ngress_nginx_host_network: true`

Let's see if we can reach them from outside the cluster:
```bash
$ openstack server list |grep node
| 169d54b5-995b-4271-9b18-87547097d295 | minimal-k8s-k8s-node-nf-1   | ACTIVE  | public=212.162.147.139, 2a09:d400:0:1::221 | ubuntu-20.04             | l2.c4r8.500  |
| a757b87c-03e1-4dd9-813b-8e40fd575196 | minimal-k8s-k8s-node-nf-2   | ACTIVE  | public=212.162.147.52, 2a09:d400:0:1::17b  | ubuntu-20.04             | l2.c4r8.500  |

$ curl http://212.162.147.52/banana
banana
$ curl http://212.162.147.52/apple
apple
```

Well that about wraps up for this blog post. Remember that this setup is not
suitable for production use in any way. Please contact us on (FIXME Marcus
please) and we'll help you find the right solution for Kubernetes in
production too.

When finished testing, you can remove the whole thing with:
```bash
$ cd ~/git/kubespray/contrib/terraform/openstack
$ terraform destroy -var-file=$HOME/kubespray-clusters/minimal-k8s/cluster.tfvars  -state=$HOME/kubespray-clusters/minimal-k8s/terraform.tfstate
```


[ksparams]: https://github.com/kubernetes-sigs/kubespray/blob/master/docs/vars.md
[kubespray]: https://github.com/kubernetes-sigs/kubespray
[sftfmodules]:https://github.com/safespring-community/terraform-modules
[sftfexamples]:https://github.com/safespring-community/terraform-modules/tree/main/examples
[sshblog]:https://www.safespring.com/blogg/2022-03-ssh-keys/
[netblog]:https://www.safespring.com/blogg/2022-03-network/
[tfdocs]:https://www.terraform.io/docs
[tfreleases]:https://releases.hashicorp.com/terraform/
[osclidoc]:https://docs.safespring.com/new/api/
[appcred]: https://docs.safespring.com/new/app-creds/
