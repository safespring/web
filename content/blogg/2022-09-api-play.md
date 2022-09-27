---
title: "Useful (perhaps) Openstack API tricks for enabling more automation"
date: "2022-09-20"
intro: "How to obtain information otherwise unavailable directly from the Openstack API"
draft: false
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
Safespring promote as much automation as possible using standard tools
like Terraform and Ansible. Sometimes, however, it is necessary to dig one step
deeper in order to find some missing pieces of information in order to create a complete automation.
{{</ingress >}}

## Introduction (Problem statement)
In the Safespring platform, the S3 compatible storage service and the OpenStack
based compute service are now integrated. It means that once you have access to the
compute platform you also can fetch credentials for accessing the integrated S3
service through the web GUI and/or the command line interface (CLI).

### Openshift installer
We have created an [Openshift installer][okdinstaller] that makes it easy to
install Openshift on Safespring by wrapping some tooling around the official
[UPI installer][okdupi].

This installer requires an S3 bucket in order to place the ignition file of the
boot node, because [the file is too big][userdatasize] to send directly to
the OpenStack API as [user_data][userdata]. Instead, the installer
[presigns][presign] an S3 object and instructs the ignition file for the
bootstrap node to fetch the «real» ignition file from that URL. Long story
short; the installer must have an s3 bucket and credentials for it in order to
work.

The Openshift installer was created before Safespring had S3 integrated into the
compute service and it was a bit cumbersome that the installer depended on a
manually maintained S3 service, which was the method used previously.

### Fetch credentials
Now that S3 is integrated the installer should automatically fetch credentials
and S3 endpoint URL and create a bucket, upload the ignition file to the
bucket, presign it and inject the presign url into the ignition file for the
bootstrap node.

This blog post describes the learning points (which can be useful in other
automation contexts) from the process that led up to the [installer
change][installerchange].

## Fetching information with the command line interface (CLI)

In order to upload, and subsequently download using the presign method, need to
obtain three pieces of information programmatically: the S3 access key, the S3
secret key, and the S3 endpoint URL. I expected that this would be trivial, and
for the S3 access key and the S3 secret key, this was true. It is as simple as:

```shell
$ export AWS_ACCESS_KEY_ID="$(openstack ec2 credential list -c Access  -f value)"
$ export AWS_SECRET_ACCESS_KEY="$(openstack ec2 credential list -c Secret  -f value)"
```

So, in order to automatically use the integrated S3 service we only need one
more piece of information: the S3 service endpoint URL. Should be just as easy,
right ? Wrong! Well, once you know how to do it's not that bad actually.

## Fetching S3 endpoint URL using curl and the Openstack API

Let's start with the pure API approach in order to understand what is going on.
These examples are heavily inspired by the Openstack API curl [examples][oscurlexamples].

First we'll authenticate using project scope. Let's create a shell function for
presenting JSON data to POST with curl later:

```shell
function gen_os_auth_data_project_scope {
cat <<EOF
{ "auth": {
    "identity": {
      "methods": ["password"],
      "password": {
        "user": {
          "name": "${OS_USERNAME}",
          "domain": { "name": "${OS_USER_DOMAIN_NAME}"},
          "password": "${OS_PASSWORD}"
        }
      }
    },
    "scope": {
      "project": {
        "domain": { "name": "${OS_PROJECT_DOMAIN_NAME}" },
        "name": "${OS_PROJECT_NAME}"
       }
     }
  }
}
EOF
}
```

For this function to work you must make sure the environment variables in the
function are properly set before usage.

Next, we'll use curl to fetch some JSON data from the OpenStack API:

```shell
$ curl  -s -H "Content-Type: application/json" -d"$(gen_os_auth_data_project_scope)" "${OS_AUTH_URL}/auth/tokens"
```
The environment variable `OS_AUTH_URL` contains the same as you would put when
using the [OpenStack CLI][osclidoc]. The command above will give you what the
OpenStack CLI transparently uses to find endpoints for all the Openstack
services that the `OS_AUTH_URL` «announces», the service catalog, together with
a short lived token for accessing them. Feel free to explore the data structure
at will, but for now, we are only interested in our missing piece of
information: the S3 endpoint URL which should be the same as the one listed in
the GUI under «API Access / view credentials».

So to get exactly that, we can do:

```shell
curl  -s -H "Content-Type: application/json" -d"$(gen_os_auth_data_project_scope)" "${OS_AUTH_URL}/auth/tokens"|jq '.token.catalog[]|select(.type=="s3").endpoints[0].url' -r
```

Now we have seen how to get the  S3 endpoint URL when authenticating as an
OpenStack personal user. However, the recommended way of authenticating with
OpenStack from scripts, or any form of automation code, is to use [OpenStack
application credentials][appcred]. Application credentials allow access only
to the project it was created in. Personal credentials may have much wider
access and hence it comprises a much bigger impact if breached. Application
credentials are easy to rotate and (should) have a different (shorter) life
cycle than your personal credentials, and last but not least, when using
application credentials you don't expose your personal credentials in the
code.

So let's see how we can get the S3 endpoint URL authenticating with a set of
application credentials. The procedure is not much different. The difference is
that we'll now authenticate with the «global scope». Like this:

```shell
function gen_os_auth_data_appcred_global_scope {
cat <<EOF
{ "auth": {
    "identity": {
      "methods": ["application_credential"],
      "application_credential": {
        "id": "${OS_APPLICATION_CREDENTIAL_ID}",
        "secret": "${OS_APPLICATION_CREDENTIAL_SECRET}"
      }
    }
  }
}
EOF
}
```

You must of course again set the environment variables accordingly with the
information from creating the [application credentials][appcred]. Otherwise, it
is the same:
```shell
curl  -s -H "Content-Type: application/json" -d"$(gen_os_auth_data_appcred_global_scope)" "${OS_AUTH_URL}/auth/tokens"|jq '.token.catalog[]|select(.type=="s3").endpoints[0].url' -r
```

## Fetching the S3 endpoint URL using Python or Ansible

It is also possible to get the service catalog both directly from Python using
the [OpenStack Python SDK][pysdk] and with [Ansible][ansibleosauth].

To get the S3 endpoint URL using the Python SDK you can do this:

```python
# cloud is an entry in your clouds.yaml containing the other necessary parameters for talking to the Openstack API
conn = openstack.connect(cloud=cloud, username=os.environ['OS_USERNAME'], password=os.environ['OS_PASSWORD'])
print(conn.endpoint_for('s3'))
```

To get the S#3 endpoint URL using Ansible you can do this:

```ansible
  - name: Authenticate to the cloud and retrieve the service catalog
      openstack.cloud.auth:

    - name: Set fact, s3 endpoint
      ansible.builtin.set_fact:
        s3_endpoint_url: "{{ item }}"
      loop: "{{ service_catalog|community.general.json_query('[?type==`s3`].endpoints[0].url') }}"
```

The `service_catalog` is populated with data by the `openstack.cloud.auth`
module, and the value of the S3 endpoint URL is fetched from it by looping over
the list of endpoints for the S3 service (which in our case only contains one element),
by using the Jinja filter `community.general.json_query`.

This require that your environment and/or `clouds.yaml`/`secure.yaml` contain the
necessary information; the same as if you would use the [OpenStack CLI][osclidoc].

[ansibleosauth]: https://docs.ansible.com/ansible/latest/collections/openstack/cloud/auth_module.html
[pysdk]: https://docs.openstack.org/openstacksdk/latest/
[oscurlexamples]: https://docs.openstack.org/keystone/latest/api_curl_examples.html
[userdatasize]: https://docs.openstack.org/api-ref/compute/?expanded=create-server-detail#create-server
[userdata]: https://docs.openstack.org/nova/rocky/user/user-data.html
[presign]: https://docs.aws.amazon.com/cli/latest/reference/s3/presign.html
[installerchange]: https://github.com/safespring-community/utilities/commit/0ee81dc0fbd47419fd32e965c14cf5349aa329c1
[okdupi]: https://docs.okd.io/latest/installing/installing_openstack/installing-openstack-user.html
[okdinstaller]: https://github.com/safespring-community/utilities/tree/main/okd
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
