---
ai: true
title: "Automatiser registreringen af backup-noder med Cloutility API-klient"
date: "2023-04-26"
publishDate: "2023-04-26"
intro: "Brug vores open source Cloutility API-klientbibliotek til at udvikle en automatiseret app til tilmelding af backupklienter."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknologiopdatering"
author: "Daniel de Oquiñena"
language: "da"
sidebarlinkname: "Cloutility-api-client repository"
sidebarlinkurl: "https://github.com/safespring-community/cloutility-api-client"
sidebarlinkname2: "Komplet kodeeksempel"
sidebarlinkurl2: "https://github.com/safespring-community/cloutility-api-client/tree/main/examples/enroll"
toc: "I denne vejledning"
aliases:
  - /blogg/2023/2023-04-using-cloutility-api-client-to-auto-enroll-backup-clients/
---

{{< ingress >}}
I denne vejledning udforsker vi Safesprings cloutility-backup-client-bibliotek skrevet i Go. Vi skriver et lille, nemt udrulleligt værktøj til at automatisere tilmeldingsproceduren for backupnoder og ser nærmere på nogle af de metoder, der er tilgængelige i biblioteket cloutility-api-client.
{{< /ingress >}}

{{% note "Anbefalet læsning" %}}
Dyk dybere ned i verdenen af open source-håndtering af backupklienter ved at tjekke vores seneste artikel om [Oprettelse af et open source-bibliotek til backupklienter.](/blogg/2023/2023-04-creating-an-opensource-backup-client-library/) God læselyst!
{{% /note %}}

## Forudsætninger

Hvis du vil følge med, skal du sørge for at have Go installeret på din maskine. Du skal også oprette en konto hos Safespring Backup og have adgang til dine API-nøgler og adgangsoplysninger.

Vi gør også et par antagelser, som vores anvendelsesscenarie bygger på:

- Vi vil tilmelde et stort antal servere med en lignende opsætning.
- Backupnoderne skal identificeres med deres værtsnavn.
- Vi administrerer allerede disse servere med et konfigurationsstyringsværktøj som Puppet eller Ansible.
- Alle serverne skal have samme opbevaringsperiode og indstillinger i Safespring Backup-tjenesten.

{{< distance >}}

## 1. Angivelse af standardværdier og hentning af værtsnavn

Angiv standardværdier og hent serverens værtsnavn, som bruges som identifikator for backupnoder.
Vi begynder med at angive nogle standardværdier:

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

Som vi vil se senere i vejledningen, vil vi videregive disse værdier, når vi opretter vores backup-node, for at sikre at vi angiver de korrekte indstillinger for denne specifikke servertype. Disse indstillinger kan nemt tilpasses til en række forskellige server- og arbejdsstationsopsætninger. For en komplet liste over alle tilgængelige kombinationer, der understøttes af Safespring Backup, kan du bruge CLI-værktøjet, der er inkluderet i projektet cloutilty-api-client.

Før vi tilgår API'et, henter vi også serverens værtsnavn, som vil blive brugt som identifikator for backup-noder.

```go
hostname, _ := os.Hostname()
```

I dette eksempel vil vi sikre, at der ikke er to konsumenter (backup-noder), der identificeres med det samme værtsnavn.

{{< distance >}}

## 2. Opsætning af miljøet

For at interagere med API'et har vi brug for en autentificeret klient til at udføre de forskellige operationer. Initialisering sker med funktionen `cloutapi.Init()`. Sådan ser det ud:

```go
func Init(ctx context.Context, clientID, apiKeyOrigin, username, password, baseURL string) (*Client, error)
```

Funktionen `Init()` initialiserer en Cloutility API-klient og returnerer en pointer til en `AuthenticatedClient`-struct. Den tager følgende parametre:

| Parameter   | Type            | Beskrivelse                                                                                                       |
| ----------- | --------------- | ----------------------------------------------------------------------------------------------------------------- |
| `ctx`       | context.Context | Et context.Context-objekt til API-klienten                                                                        |
| `client_id` | string          | Angiv Safespring klient-id (APIKey)                                                                               |
| `origin`    | string          | Oprindelsen for klient-id'et, angivet ved oprettelsen                                                             |
| `username`  | string          | Angiv brugernavnet til Safespring Backup-tjenesten                                                                |
| `password`  | string          | Angiv adgangskoden til Safespring Backup-tjenesten                                                                |
| `baseURL`   | string          | Basis-URL for Cloutility API: `https://portal-api.backup.sto2.safedc.net` (til interaktion med Safespring Backup) |

I vores eksempel vil vi lede efter disse værdier i miljøvariabler, der findes i køringsmiljøet, men de kunne lige så godt stilles til rådighed fra en konfigurationsfil, et deployment-værktøj som ansible eller en anden kilde.

{{< distance >}}

## 3. Hentning af brugeroplysninger

Når API-klienten er initialiseret, begynder vi med at hente brugeradgangsoplysningerne for at bestemme den forretningsenhed, hvori backup-noden skal placeres. Dette gøres med metoden `GetUser()`, som er defineret således:

```go
func (c *AuthenticatedClient) GetUser() (*User, error)
```

Metoden `GetUser()` henter oplysninger om den aktuelle bruger (bestemt af det brugernavn/adgangskode, der blev brugt til at initialisere klienten) og returnerer en pointer til en `User`-struct. Fremadrettet vil vi bruge værdien af `User.UserBunit.ID` som ID’et for den forretningsenhed, hvor vi placerer vores backupklient.

{{< distance >}}

## 4. Hentning af forbrugeroplysninger

Næste trin er at hente en liste over forbrugere, der allerede findes i den valgte forretningsenhed. Til dette bruger vi metoden `GetConsumers()`, som ser sådan ud:

```go
func (c *AuthenticatedClient) GetConsumers(bUnitID int) ([]Consumer, error)
```

Metoden `GetConsumers()` henter en liste over konsumenter inden for en given forretningsenhed og returnerer et slice af `Consumer`-strukturer. Den tager følgende parametre:

| Parameter | Type   | Beskrivelse                                                        |
| --------- | ------ | ------------------------------------------------------------------ |
| `bUnitID` | heltal | Vi vil videregive ID'et for den aktuelle brugers forretningsenhed. |

For at sikre, at vi opretter en ny konsument med en unik værtsnavnsidentifikator, skal vi også gennemløbe resultatet og afbryde udførelsen, hvis værtsnavnet matcher en allerede eksisterende konsument.

{{% note "Identiske konsumentnavne er tilladt" %}}
Der er ingen indbygget begrænsning i tjenesten, der forhindrer oprettelse af konsumenter med samme navn. Den faktiske identifikator er det ID, der genereres ved oprettelse.
{{% /note %}}

{{< distance >}}

## 5. Oprettelse af en ny konsument

Hvis der ikke findes en konsument med det aktuelle værtsnavn, fortsætter vi med at oprette en inden for brugerens forretningsenhed ved hjælp af `CreateConsumer()`-metoden:

```go
func (c *AuthenticatedClient) CreateConsumer(bUnitID int, name string) (Consumer, error)
```

Metoden `CreateConsumer()` opretter en ny consumer i en forretningsenhed og returnerer en `Consumer`-struktur, der indeholder ID, navn, oprettelsesdato osv. Den tager følgende parametre:

| Parameter | Type    | Beskrivelse                                                                 |
| --------- | ------- | --------------------------------------------------------------------------- |
| `bUnitID` | integer | Vi sender (endnu en gang) ID'et for den nuværende brugers forretningsenhed. |
| `name`    | string  | Consumer-navnet; vi bruger værtsnavnet på den aktuelle server.              |

{{< distance >}}

## 6. Oprette en backupnode

En consumer (eller forbrugsenhed, som det kaldes i webportalen) er en enhed, der indeholder metadata såsom visningsnavn, tags og faktureringsdata. Men vi skal stadig oprette selve backupnoden inden for vores nyoprettede consumer. Til dette bruger vi metoden `CreateNode()`:

```go
func (c *AuthenticatedClient) CreateNode(bUnitID, consumerID, osTypeID, nodeTypeID, domainID, clientOptionSetID int, contact string) (Node, error)
```

Metoden `CreateNode()` opretter en backup-node knyttet til en consumer og returnerer en ny `Node` struct. Den kræver følgende parametre:

| Parameter           | Type    | Beskrivelse                                                                                                                                           |
| ------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bUnitID`           | integer | Som før bruger vi den nuværende brugers forretningsenhed.                                                                                             |
| `consumerID`        | integer | Den consumer, hvori backup-noden placeres. Vi sender ID'et på den consumer, vi netop oprettede.                                                       |
| `osType`            | integer | Her angiver vi konstanten `osTypeID`, som vi erklærede længere oppe. Hos Safespring Backup har en Linux-server ID 3. En Windows-server vil have ID 2. |
| `clientType`        | integer | ID'et for den type klient, vi tilmelder; vi sender værdien af `nodeTypeID`, som for en filserver har ID'et 1.                                         |
| `domain`            | integer | Domænet bestemmer opbevaringsperioden. Vi bruger domænet STANDARD med ID 1, som hos Safespring Backup opbevarer 180 dages backup.                     |
| `clientOptionSetID` | integer | Backupklientens optionsæt, der skal bruges. Vi bruger optionsættet DEDUP_AND_COMPRESS.                                                                |
| `contact`           | integer | Kontakt vedrørende backup-noden. Typisk den afdeling, der er ansvarlig for at administrere backup-noden.                                              |

{{< distance >}}

## 7. Aktivering af serveren

Når vi har oprettet både en consumer (forbrugsenhed) og en backup-node på serverniveau, skal vi nu aktivere noden for at hente brugernavn og adgangskode, som skal gives videre til IBM Spectrum Protect Backup-Archive Client, der kører på serveren og som faktisk udfører backup. Dette gøres med metoden `ActivateNode()`:</final

```go
func (c *AuthenticatedClient) ActivateNode(bUnitID, consumerID int) (Node, error)
```

Metoden `ActivateNode()` returnerer en `Node`-struktur, hvor værdierne `Node.TsmName` og `Node.TsmPassword` hentes, når backupnoden aktiveres. Disse værdier gør det muligt for IBM Spectrum Protect Backup-Archive Client at identificere sig korrekt, når den opretter forbindelse til backupserveren. Vi kalder metoden `ActivateNode()` med samme forretningsenheds-ID og forbruger-ID som før.

{{< distance >}}

## 8. Færdig applikation

Lad os nu samle det hele og se på den komplette applikation:

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

Koden ovenfor vil resultere i en selvstændig binærfil på ~7Mb, som er let at distribuere og kan køres fra et shell-script, der eksporterer de nødvendige miljøvariabler. Ved aktivering bliver det brugernavn og den adgangskode, som IBM Spectrum Protect Backup-Archive Client kræver, i vores eksempelkode udskrevet til stdout og kan bruges i det kørende script til at fuldføre installationen.

{{% note "Anbefaling" %}}
Eksempelkoden ovenfor har af hensyn til enkelhed udeladt al fejlhåndtering. I et produktionsmiljø anbefales det at implementere undtagelseshåndtering.
{{% /note %}}

På lidt over 35 kodelinjer har vi udviklet et fuldt funktionsdygtigt værktøj til at automatisere tilmelding af backupklienter ved hjælp af Safesprings cloutility-api-client-bibliotek.

Sammenfattende har Safesprings cloutility-api-client-bibliotek gjort det muligt for os at skabe et automatiseret værktøj til tilmelding af backupklienter, som uden besvær kan integreres i jeres eksisterende processer. Dette viser Safesprings dedikation til at forhindre leverandørlåsning og at fremme problemfri integration med vores tjenester.

Vi er engagerede i at tilbyde vores kunder fleksibiliteten og friheden til at vælge og tilpasse deres løsninger efter deres behov. Hvis I har spørgsmål eller brug for hjælp til implementeringen, er I meget velkomne til at kontakte vores supportteam. God fornøjelse med kodningen!
