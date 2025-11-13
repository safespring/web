---
title: "Automating backup node enrollment with Cloutility API-client"
date: "2023-04-26"
publishDate: "2023-04-26"
intro: "Use our open-source Cloutility API-client library to create an automated backup client enrollment app."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Tech update"
author: "Daniel de Oquiñena"
language: "En"
sidebarlinkname: "Cloutility-api-client Repository"
sidebarlinkurl: "https://github.com/safespring-community/cloutility-api-client"
sidebarlinkname2: "Complete code example"
sidebarlinkurl2: "https://github.com/safespring-community/cloutility-api-client/tree/main/examples/enroll"
toc: "In this guide"
---

{{< ingress >}}
In this tutorial, we will explore Safespring's cloutility-backup-client library written in Go. We will write a small, easily deployable, tool to automate the enrollment procedure of backup nodes and take a deeper look at a few of the methods available in the cloutility-api-client library.
{{< /ingress >}}

{{% note "Recommended reading" %}}
Dive deeper into the world of open-source backup client management by checking out our recent article on [Creating an Open-Source Backup Client Library.](/blogg/2023/2023-04-creating-an-opensource-backup-client-library/)  Happy reading!
{{% /note %}}

## Prerequisites

If you wish to follow along, make sure you have Go installed on your machine. You will also need to set up an account with Safespring Backup and have access to your API keys and credentials.

We will also be making a few assumptions on which to base our use-case:
- We want to enroll a large number of servers with similar setup.
- The backup nodes should be identified as their hostname.
- We already manage these servers using a configuration management tool such as Puppet or Ansible.
- All the servers should have the same retention period and settings within the Safespring Backup service.

{{< distance >}}

## 1. Declaring default values and retrieving hostname
Set default values and retrieve the server's hostname, which will be used as the identifier for backup nodes.
We will begin by setting a few default values:
```go
const (
    // Set the OS to Linux, ID = 3
    osTypeID = int(3)
    // Set the nodeType to Fileserver, ID = 1
    nodeTypeID = int(1)
    // Use standard domain (180 Days backup retention), ID = 1
    domainID = int(1)
    // Set the clientOptionSet to "DEDUP_AND_COMPRESS", ID = 2
    clientOptionSetID = int(2)
    // Set contact info to IT Department
    contact = "Company IT Department"
)
```
As we will see later in the tutorial, we will pass these values when creating our backup node to ensure we set the correct settings for this particular server type. These settings can easily be adapted to a variety of server / workstation setups. For a complete list of all available combinations supported by Safespring Backup you can use the cli-tool included in the cloutilty-api-client project.

Prior to accessing the API we will also retrieve the hostname of the server which will be used as the identifier for backup nodes. 
```go
hostname, _ := os.Hostname()
```
In this example we will make sure that no two consumers (backup nodes) is identified by the same hostname.

{{< distance >}}

## 2. Setting up the Environment

In order to interact with the API we need an authenticated client to perform the various operations. Initialization is done using the `cloutapi.Init()` function. Here's what it looks like:

```go
func Init(ctx context.Context, clientID, apiKeyOrigin, username, password, baseURL string) (*Client, error)
```

The `Init()` function initializes a Cloutility API client and returns a pointer to an `AuthenticatedClient` struct. It takes the following parameters:

| Parameter   | Type            | Description                                                                                                 |
|-------------|-----------------|-------------------------------------------------------------------------------------------------------------|
| `ctx`       | context.Context | A context.Context object for the API client                                  |
| `client_id` | string          | Provide the Safespring client ID (APIKey)                                                                   |
| `origin`    | string          | The origin of the client ID, specified upon creation                                                        |
| `username`  | string          | Input the username for the Safespring Backup service                                                        |
| `password`  | string          | Enter the password for the Safespring Backup service                                                        |
| `baseURL`   | string          | Base URL for Cloutility API: `https://portal-api.backup.sto2.safedc.net` (for Safespring Backup interaction)|

In our example we will look for these values in environment variables present in the execution environment but, they could just as well be made available from a configuration file, a deployment tool such as ansible or some other source.

{{< distance >}}

## 3. Retrieving User Information

Once the API client is initialized, we begin by retrieving the useraccess information to determine the business-unit in which to place the backup node. This is done using the `GetUser()` method, which is defined like:

```go
func (c *AuthenticatedClient) GetUser() (*User, error)
```

The `GetUser()` method retrieves information about the current user (determined by the username/password used to initialize the client) and returns a pointer to a `User` struct. Going forward we will use this value of `User.UserBunit.ID` as the business-unit ID in which we will place our backup client.

{{< distance >}}

## 4. Retrieving Consumer Information

The next step is to get a list of consumers already present within our chosen business-unit. For this we will be using the `GetConsumers()` method which looks like:

```go
func (c *AuthenticatedClient) GetConsumers(bUnitID int) ([]Consumer, error)
```

The `GetConsumers()` method retrieves a list of consumers within a given business-unit and returns a slice of `Consumer` structs. It takes the following parameters:

| Parameter         | Type     | Description                                                  |
|-------------------|----------|--------------------------------------------------------------|
|`bUnitID` |integer |We will be passing the ID of the current user's business-unit.|

To make sure we are creating a new consumer using a unique hostname identifier we will also need to loop over the result and abort execution if the hostname matches an already present consumer. 

{{% note "Duplicate Consumer Names Allowed" %}}
There is no inherit limitation within the service that prevents setting up consumers with the same name. The actual identifier will be the ID generated upon creation.
{{% /note %}}

{{< distance >}}

## 5. Creating a New Consumer

If no consumer with the current hostname exists, we'll proceed to create one within the context of the users business-unit, using the `CreateConsumer()` method:

```go
func (c *AuthenticatedClient) CreateConsumer(bUnitID int, name string) (Consumer, error)
```

The `CreateConsumer()` method creates a new consumer within a business-unit and returns a  `Consumer` struct containing ID, name, creation date etc. It takes the following parameters:

| Parameter         | Type     | Description                                                  |
|-------------------|----------|--------------------------------------------------------------|
|`bUnitID`|integer| We will (once again) pass the ID of the current user's business-unit.|
|`name`|string| The consumer name, we will use the hostname of the current server.|

{{< distance >}}

## 6. Creating a Backup Node

A consumer (or consumption-unit as it's referred to within the web portal), is an entity containing metadata such as friendly-name, tags and billing data. But we still need to create an actual backup node within our newly created consumer. For this we'll use the `CreateNode()` method:

```go
func (c *AuthenticatedClient) CreateNode(bUnitID, consumerID, osTypeID, nodeTypeID, domainID, clientOptionSetID int, contact string) (Node, error)
```

The `CreateNode()` method creates a backup node associated with a consumer and returns a new `Node` struct. It requires the following parameters:

| Parameter           | Type    | Description                                                                                                                                            |
|---------------------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `bUnitID`           | integer | As before we'll be using the current user's business-unit.                                                                                             |
| `consumerID`        | integer | The consumer in which to place the backup node. We'll pass the ID of the consumer we just created.                                                     |
| `osType`            | integer | Here we pass the constant `osTypeID`that we, further up, declared. At Safespring Backup a linux server has ID 3. A Windows server would have the ID 2. |
| `clientType`        | integer | The ID of the type of client we are enrolling, we'll be passing the value of `nodeTypeID` which for a Fileserver has the ID of 1.                      |
| `domain`            | integer | The domain determines the retention period. We will be using the STANDARD domain with ID 1, which at Safespring Backup retains 180 days of backup.     |
| `clientOptionSetID` | integer | Backup client Optionset to use. We'll use the DEDUP_AND_COMPRESS Optionset                                                                             |
| `contact`           | integer | Contact regarding the backup node. Typically the departament responsible for managing the backup node.                                                 |


{{< distance >}}

## 7. Activating the server

Having created both a consumer (consumption-unit) and a backup node at the server level we now have to activate the node in order to retrieve the username and password to pass along to the IBM Spectrum Protect Backup-Archive Client that will be running on the server and which will actually be performing the backups. This is done using the `ActivateNode()` method:
```go
func (c *AuthenticatedClient) ActivateNode(bUnitID, consumerID int) (Node, error)
```
The `ActivateNode()` method returns a `Node` struct where the values `Node.TsmName` and `Node.TsmPassword` are retrieved when the backup node is activated. These values will allow the IBM Spectrum Protect Backup-Archive Client to correctly identify itself when connecting to the backup server. We'll call the `ActivateNode()` method using the same business-unit ID and consumer ID as before.

{{< distance >}}

## 8. Finished application

Now let's put everything together and take a look at the complete application: 

```go
package main

import (
    "context"
    "fmt"
    "os"

    "github.com/safespring-community/cloutility-api-client/cloutapi"
)

const (
    // Set the OS to Linux, ID = 3
    osTypeID = int(3)
    // Set the nodeType to server, ID = 1
    nodeTypeID = int(1)
    // Use standard domain (180 Days backup retention), ID = 1
    domainID = int(1)
    // Set the clientOptionSet to "DEDUP_AND_COMPRESS", ID = 2
    clientOptionSetID = int(2)
    // Set contact info to IT Department
    contact = "Company IT Department"
)

func main() {
    // Get the hostname of the current server
    hostname, _ := os.Hostname()

    // Initialize client using predefined URL and environment variables
    client, _ := cloutapi.Init(
        context.TODO(),
        os.Getenv("CLIENT_ID"),
        os.Getenv("APIKEY_ORIGIN"),
        os.Getenv("SAFESPRING_USERNAME"),
        os.Getenv("SAFESPRING_PASSWORD"),
        "https://portal-api.backup.sto2.safedc.net",
    )

    // Retrieve userinfo to determine business-unit in which to create backup-node
    user, _ := client.GetUser()

    // Get a list of consumers within the current business-unit
    consumers, _ := client.GetConsumers(user.UserBUnit.ID)

    // Loop through names and abort if consumer with the name of 'hostname' exists
    for _, consumer := range consumers {
        if consumer.Name == hostname {
            fmt.Printf("A consumer with the name %s already exists\n", hostname)
            os.Exit(1)
        }
    }

    // Proceed to create a new consumer within the context of the username business-unit
    consumer, _ := client.CreateConsumer(user.UserBUnit.ID, hostname)

    // Create a backup node within the consumer we just created
    backupNode, _ := client.CreateNode(
        user.UserBUnit.ID,
        consumer.ID,
        osTypeID,
        nodeTypeID,
        domainID,
        clientOptionSetID,
        contact,
    )

    // Activate the node
    backupNode, _ = client.ActivateNode(user.UserBUnit.ID, consumer.ID)

    // Finally print the userID and password for backupNode separated by a newline
    fmt.Printf("%s\n%s\n", backupNode.TsmName, backupNode.TsmPassword)
}
```
The code above will result in a standalone binary at ~7Mb which is easily distributable and can be executed from a shell script exporting the required environment variables. Upon activation the username and password needed by the IBM Spectrum Protect Backup-Archive Client is in our example code printed to stdout and can be used within the executing script to finish the installation.  

{{% note "Recommendation" %}}
The example code above has for the sake of simplicity omitted any error handling. In a production environment exception handling is recommended
{{% /note %}}

In just over 35 lines of code, we have successfully developed a fully functional tool to automate backup client enrollment utilizing Safespring's cloutility-api-client library.

To summarize, the cloutility-api-client library by Safespring has enabled us to create an automated backup client enrollment tool that can be effortlessly integrated into your existing processes. This showcases Safespring's dedication to preventing vendor lock-in and advocating for seamless integration with our services. 

We are committed to offering our customers the flexibility and liberty to select and modify their solutions based on their requirements. If you have any questions or need support with implementation, please do not hesitate to contact our support team. Happy coding!