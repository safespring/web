---
title: "Using the cloutility-api-client library to automatically enroll backup nodes"
date: "2023-04-26"
publishDate: "2023-04-26"
intro: "Use our open-source Cloutility API client library to create an automated backup client enrollment app."
draft: true
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Tech update"
language: "En"
toc: ""
sidebarlinkname: "Cloutility-api-client Repository"
sidebarlinkurl: "https://github.com/safespring-community/cloutility-api-client"
sidebarlinkname2: "Complete code example"
sidebarlinkurl2: "https://github.com/safespring-community/cloutility-api-client/tree/main/examples/enroll"
---

{{< author-daniel >}}

Safespring Backup is a cloud backup and recovery service that provides secure and reliable data protection for businesses based on Auwau Cloutility and IBM Spectrum Protect. In this tutorial, we will assume the role of a team assigned the task of enrolling a large number of workstations (or servers) against the Safespring Backup service. We will use our cloutility-backup-client library to automate the procedure and get a deeper understanding of a few of the core methods available in the cloutility-api-client library. 

## Prerequisites

If you wish to follow along, make sure you have Go installed on your machine. You will also need to set up an account with Safespring Backup and have access to your API keys and credentials.

## Declaring defaults and retrieving hostname

We will begin by setting a few defaults as we assume that this particular application should only run on workstations running on Linux, with a retention period of 180 days:
```go
const (
	// Set the OS to Linux, ID = 3
	osTypeID = int(3)
	// Set the nodeType to Workstation, ID = 2
	nodeTypeID = int(2)
	// Use standard domain (180 Days backup retention), ID = 1
	domainID = int(1)
	// Set the clientOptionSet to "DEDUP_AND_COMPRESS", ID = 2
	clientOptionSetID = int(2)
	// Set contact info to IT Departament
	contact = "Company IT Departement"
)
```
As we will see later in the tutorial these values will ensure we set the correct settings for this particular workstation type but can easily be adapted to a variety of server / workstation setups. For a complete list of all available combinations supported by Safespring Backup you can use the cli-tool included in the cloutilty-api-client project.

Prior to accessing the API we will also retrieve the hostname of the workstation which will be used as an identifier. 
```go
hostname, _ := os.Hostname()
```
In this example we will make sure that no two consumers / backup nodes is identified by the same hostname.

## Setting up the Environment

In order to interact with the API we need an authenticated client to perform the various operations. Initialization is done using the `cloutapi.Init()` function. Here's what it looks like:

```go
func Init(ctx context.Context, clientID, apiKeyOrigin, username, password, baseURL string) (*Client, error)
```

The `Init()` function initializes a Cloutility API client and returns a pointer to an `AuthenticatedClient` struct. It takes the following parameters:

- `ctx`(context.Context): A context.Context object for the API client.
- `client_id` (string): Safespring client ID (apikey).
- `origin` (string): The origin of the apikey, specified upon creation.
- `username`(string): Username to the Safespring Backup service.
- `password`(string): Password to the Safespring Backup service.
- `baseURL`(string): A string representing the base URL to the Cloutility API. This should always be set to `https://portal-api.backup.sto2.safedc.net` when interacting with the Safespring Backup service.

In our example we will pass most of these values from environment variables present in the execution environment but could just as well be made available from a configuration file or some other source.

## Retrieving User Information

Once the API client is initialized, the next step is to retrieve the user information in order to determine the business-unit in which to place the backup node. This is done using the `GetUser()` method, which is defined like:

```go
func (c *AuthenticatedClient) GetUser() (*User, error)
```

The `GetUser()` method retrieves the current user's information and returns a pointer to a `User` struct. It takes no parameters.

## Retrieving Consumer Information

After retrieving the user information, the next step is to get a list of consumers within the users business-unit to make sure this backup nodes hostname is not already present as a consumer. For this we will be using the `GetConsumers()` method which looks like:

```go
func (c *AuthenticatedClient) GetConsumers(bUnitID int) ([]Consumer, error)
```

The `GetConsumers()` method retrieves a list of consumers within a given business-unit and returns a slice of `Consumer` structs. It takes the following parameters:

- `bUnitID`: An integer representing the business-unit ID. We will be passing the ID of the current user's business-unit.

To make sure we are creating a new consumer using a unique hostname identifier we will loop over the result and abort execution if the hostname matches an already present consumer.

## Creating a New Consumer

If no consumer with the current hostname exists, we'll proceed to create a new consumer within the context of the users business-unit, using the `CreateConsumer()` method. Here's what it looks like:

```go
func (c *AuthenticatedClient) CreateConsumer(bUnitID int, name string) (Consumer, error)
```

The `CreateConsumer()` method creates a new consumer within a business-unit and returns a  `Consumer` struct. It takes the following parameters:

- `bUnitID`: An integer representing the business-unit ID where we will (once again) pass the ID of the current user's business-unit
- `name`: A string representing the consumer name for which we will use the hostname of the current workstation.

## Creating a Backup Node

A consumer (or consumption-unit), is an entity containing metadata such as friendly-name, tags and billing data. But we still need to create an actual backup node within our newly created consumer. For this we'll use the `CreateNode()` method:

```go
func (c *AuthenticatedClient) CreateNode(bUnitID, consumerID, osTypeID, nodeTypeID, domainID, clientOptionSetID int, contact string) (Node, error)
```

The `CreateNode()` method creates a backup node associated with a consumer and returns a new `Node` struct. It takes the following parameters:

- `bUnitID`(integer): As before we'll be using the current user's business-unit.
- `consumerID`(integer): We'll pass the ID of the consumer we just created.
- `osType`(integer): Here we pass the constant `osTypeID`that we initially declared as ID 3. A Windows workstation should have the value 2.
- `clientType`(integer): The ID of the type of client were enrolling, we'll be passing the value of `nodeTypeID` which for Workstation has the ID of 2.
- `domain`(integer): The domain determines the retention period. We will be using the STANDARD domain with ID 1, which at Safespring Backup retains 180 days of backup.
- `clientOptionSetID`(integer): Backup client optionset to use. We'll use the DEDUP_AND_COMPRESS optionset
- `contact`(string): Contact regarding the backup node. Typically the departament responsible for the backup node.

## Activating the workstation

Having created both a consumption-unit(consumer) and a backup node on the serverside we now have to activate the node in order to retrieve the username and password to pass along to the IBM Spectrum Protect Backup-Archive Client that will be running on the workstation and which will actually be performing the backups. This is done using the `ActivateNode()` method:
```go
func (c *AuthenticatedClient) ActivateNode(bUnitID, consumerID int) (Node, error)
```
The `ActivateNode()` method returns a `Node` struct where the values `Node.TsmName` and `Node.TsmPassword` are retrieved when the backup node is activated. These values will allow the IBM Spectrum Protect Backup-Archive Client to correctly identify itself when connecting to the backup server. We'll call the `ActivateNode()` method using the same business-unit ID and consumer ID as before.

## Finished application

Now let's put everything together and take a look at the complete application. 

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
	// Set the nodeType to Workstation, ID = 2
	nodeTypeID = int(2)
	// Use standard domain (180 Days backup retention), ID = 1
	domainID = int(1)
	// Set the clientOptionSet to "DEDUP_AND_COMPRESS", ID = 2
	clientOptionSetID = int(2)
	// Set contact info to IT Departament
	contact = "Company IT Departement"
)

func main() {
    // Get the hostname of the current Workstation
    hostname, _ := os.Hostname()

    // Initilize client using predefined URL and environment variables
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
The code above will result in a standalone binary at ~7Mb which is easily distributible and can be executed from a shell script exporting the environment variables used to authenticate the connection. Upon activation the username and password required by the IBM Spectrum Protect Backup-Archive Client is in this example printed to stdout and can be used within the executing script to finish the installation or, depending on your use case, further processed.

