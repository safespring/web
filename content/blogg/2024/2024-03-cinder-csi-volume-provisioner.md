---
title: "OpenStack Cinder CSI volume provisioner"
date: "2024-03-13"
intro: "This guide is designed to help you effortlessly integrate the Cinder CSI Volume Provisioner into your OKD or OpenShift cluster."
draft: false
section: "Tech update"
author: "Niklas Hagman"
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "En"
TOC: "In this guide"
sidebarlinkname: "To Git-repository"
sidebarlinkurl: "https://github.com/safespring-community/utilities/tree/main/okd/cinder-csi"
sidebarlinkicon: "fa-arrow-up-right-from-square"
---



{{< ingress >}}
Have you configured your OKD or OpenShift cluster with the platform option set to "none" and, as a result, are missing the OpenStack Cinder CSI Driver Operator?
{{< /ingress >}}

This guide is designed to help you effortlessly integrate the Cinder CSI Volume Provisioner into your OKD or OpenShift cluster. It's designed to streamline the process, making the integration seamless and hassle-free.

Moreover, this guide is not exclusive to OpenShift or OKD environments; it can be easily adapted for use in vanilla Kubernetes setups with a simple modification. A key highlight for OKD and OpenShift users is the inclusion of Security Context Constraints (SCC) cluster role bindings in the Helm chart's templates directory. This critical feature enables the Cinder CSI pods to run with privileged access, aligning them with OpenShift's security practices and ensuring their optimal functionality within your cluster's security framework.

Throughout this guide, we will take you step by step through the installation process, providing clear instructions and helpful tips to ensure a successful integration. Whether you're new to OpenShift or an experienced administrator, this guide aims to provide you with all the necessary information to enhance your cluster's storage capabilities with the Cinder CSI Volume Provisioner.

## Setting up your secret for OpenStack authentication

Securing communication between Cinder CSI volume provisioner and OpenStack is paramount. Utilizing an application credential facilitates this by providing the necessary authentication details for interactions with OpenStack services.

### 1. Creating an application credential
Initiate the creation of a new application credential tailored for your requirements. If you have previously generated credentials, consider reusing them for the Cinder CSI plugin. To manage your credentials effectively, use the command below to create a new set or list existing ones:
```bash
openstack application credential create <app-cred-name>
openstack application credential list
```

Upon creation, extract the `auth_url`, `Application ID`, and `Application secret` to enable OpenStack authentication:
```bash
auth_url=$(openstack configuration show -f json | jq .auth_url)

json_output=$(openstack application credential create cinder-csi --format json)
app_id=$(echo $json_output | jq -r '.id')
app_secret=$(echo $json_output | jq -r '.secret')

echo "auth_url: ${auth_url}"
echo "Application ID: ${app_id}"
echo "Application secret: ${app_secret}"
```

### 2. Create a namespace for storage CSI
Establish a dedicated namespace for the CSI, enhancing organizational clarity and security:

```bash
namespace="csi"
oc create namespace ${namespace}
```

### 3. Prepare Your cloud configuration
Generate a configuration file encoded in base64 for Kubernetes secret storage. This configuration allows your application to authenticate with OpenStack:

```bash
cloud_config="[Global]
auth-url=${auth_url}
application-credential-id=${app_id}
application-credential-secret=${app_secret}"

cloud_config_encoded=$(echo "${cloud_config}" | base64 | tr -d '\n')
echo -e "${cloud_config_encoded}" | base64 -d
```

### 4. Deploy the encoded configuration as your secret
Utilize this Kubernetes manifest to securely store your OpenStack credentials within the created namespace:

```yaml
oc apply -f - <<EOF
kind: Secret
apiVersion: v1
metadata:
  name: cinder-csi-cloud-config
  namespace: ${namespace}
data:
  cloud.conf: ${cloud_config_encoded}
type: Opaque
EOF
```

## Installation process

### Selecting the correct Cinder CSI volume provisioner version

Match the Cinder CSI provisioner version with your Kubernetes version. Retrieve your Kubernetes version and list available Helm chart versions to ensure compatibility.

Obtain your OpenShift version:
```bash
oc version
```
```
Client Version: 4.15.0
Kustomize Version: v5.0.4-0.20230601165947-6ce0bf390ce3
Server Version: 4.15.0
Kubernetes Version: v1.28.6+6216ea1
```
List available Cinder CSI versions:
```bash
namespace="${namespace:-csi}"
helm repo -n ${namespace} add cpo https://kubernetes.github.io/cloud-provider-openstack
helm search -n ${namespace} repo cpo/openstack-cinder-csi --versions
```
| name                     | version | app_version | description                    |
| ------------------------ | ------- | ----------- | ------------------------------ |
| cpo/openstack-cinder-csi | 2.29.0  | v1.29.0     | Cinder CSI Chart for OpenStack |
| cpo/openstack-cinder-csi | 2.28.2  | v1.28.2     | Cinder CSI Chart for OpenStack |
| cpo/openstack-cinder-csi | 2.28.1  | v1.28.1     | Cinder CSI Chart for OpenStack |
| cpo/openstack-cinder-csi | 2.28.0  | v1.28.0     | Cinder CSI Chart for OpenStack |
| cpo/openstack-cinder-csi | 2.27.3  | v1.27.3     | Cinder CSI Chart for OpenStack |
| cpo/openstack-cinder-csi | 2.27.2  | v1.27.2     | Cinder CSI Chart for OpenStack |
| cpo/openstack-cinder-csi | 2.27.1  | v1.27.1     | Cinder CSI Chart for OpenStack |
| cpo/openstack-cinder-csi | 2.27.0  | v1.27.0     | Cinder CSI Chart for OpenStack |

Match your kubernetes version with the version in app_version column. When searching for specific version, keep in mind that it is the Helm chart version you are specifying, not the kubernetes version.

```bash
helm search -n ${namespace} repo cpo/openstack-cinder-csi --version '~2.28'
```
| name                     | version | app_version | description                    |
| ------------------------ | ------- | ----------- | ------------------------------ |
| cpo/openstack-cinder-csi | 2.28.2  | v1.28.2     | Cinder CSI Chart for OpenStack |

When searching for the right version, we are using Tilde range comparisons. The tilde (~) comparison operator is for patch level ranges when a minor version is specified and major level changes when the minor number is missing. In our example, `~2.28` is equivalent to `>= 2.28, < 2.29`.

In `Chart.yaml`, update the dependencies so it searching for the same version

```yaml
dependencies:
  - name: openstack-cinder-csi
    version: '~2.28'
    repository: "https://kubernetes.github.io/cloud-provider-openstack"
```

Update dependencies
```bash
helm dependency update
```

If you have changes, push this to your git repository.

### Installing Cinder CSI volume provisioner

```bash
namespace="${namespace:-csi}"
helm install -n ${namespace} cinder-csi .
```

Verify with `oc -n ${namespace} get pods` that you have one `controllerplugin` pod and `nodeplugin` pods for each node in your cluster.
```bash
oc -n ${namespace} get pods
```

| NAME                                                   | READY | STATUS  | RESTARTS | AGE  |
|--------------------------------------------------------|-------|---------|----------|------|
| openstack-cinder-csi-controllerplugin-544fc6fc4c-cnjft | 6/6   | Running | 0        | 151m |
| openstack-cinder-csi-nodeplugin-5t54r                  | 3/3   | Running | 0        | 151m |
| openstack-cinder-csi-nodeplugin-dc5hc                  | 3/3   | Running | 0        | 151m |
| openstack-cinder-csi-nodeplugin-dxkhb                  | 3/3   | Running | 0        | 151m |
| openstack-cinder-csi-nodeplugin-kxzr8                  | 3/3   | Running | 0        | 151m |
| openstack-cinder-csi-nodeplugin-vp8qg                  | 3/3   | Running | 0        | 151m |

You now have two different storage classes to use.
```bash
oc get storageclass -o custom-columns=Name:.metadata.name,Provisoner:.provisioner
```
| Name                 | Provisoner               |
|----------------------|--------------------------|
| csi-cinder-sc-delete | cinder.csi.openstack.org |
| csi-cinder-sc-retain | cinder.csi.openstack.org |

## Test Cinder CSI volume provisioner
Test Cinder CSI volume provisioner by creating a Persistent Volume Claim and then a application that's using this PVC.

```bash
namespace_test="csi-test"
oc create namespace ${namespace_test}
```
```yaml
oc apply -f - <<EOF
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: csi-pvc-cinderplugin
  namespace: ${namespace_test}
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: csi-cinder-sc-delete
EOF
```
```yaml
oc apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  namespace: ${namespace_test}
spec:
  containers:
    - image: docker.io/nginxinc/nginx-unprivileged
      imagePullPolicy: IfNotPresent
      name: nginx
      ports:
        - containerPort: 8080
          protocol: TCP
      volumeMounts:
        - mountPath: /var/lib/www/html
          name: csi-data-cinderplugin
  volumes:
    - name: csi-data-cinderplugin
      persistentVolumeClaim:
        claimName: csi-pvc-cinderplugin
        readOnly: false
EOF

```
The persistent volume claim should be "Bound" when successful.
```bash
oc -n ${namespace_test} get pvc -o custom-columns=Name:.metadata.name,Status:.status.phase,Volume:.spec.volumeName
```
| Name                 | Status | Volume                                   |
|----------------------|--------|------------------------------------------|
| csi-pvc-cinderplugin | Bound  | pvc-ed60e725-93e8-447c-bc18-ca33546f2ce8 |

If you have any problems, start by looking into the events table with `oc -n ${namespace_test} events`.

In Openstack you can use openstack cli to see your volume.
```bash
openstack volume show pvc-ed60e725-93e8-447c-bc18-ca33546f2ce8
```

Finally delete your test:
```bash
oc delete namespace ${namespace_test}
```

## Updating your installation
Should there be updates available for the Cinder CSI provisioner, use the following command to apply them:
```bash
namespace="${namespace:-csi}"
helm upgrade -n ${namespace} cinder-csi .
```

## Uninstalling
If you need to uninstall the Cinder CSI provisioner, execute these commands:
```bash
namespace="${namespace:-csi}"
helm install -n ${namespace} cinder-csi .
oc delete namespace ${namespace}
```

## FAQ

### The challenge with using Helm's `values.yaml` for secrets

While Helm charts offer the convenience of automating deployments, including the creation of secrets via the `values.yaml` file, this method presents significant security challenges, especially in a GitOps workflow with ArgoCD.

For example, when configuring the `openstack-cinder-csi` chart, you might be tempted to directly embed sensitive credentials within the `values.yaml` file like so:

```yaml
openstack-cinder-csi:
  secret:
    enabled: true
    create: true
    name: cinder-csi-cloud-config
    data:
      cloud.conf: |-
        [Global]
        auth-url=<auth_url>
        application-credential-id=<app_id>
        application-credential-secret=<app_secret>
```

This approach works fine for manual Helm installations. However, in a GitOps setup where ArgoCD automatically applies configurations from a Git repository, storing secrets in this manner is risky. The primary concern is security: storing sensitive data, like credentials, in a Git repository—even if it's private—exposes your infrastructure to potential breaches.