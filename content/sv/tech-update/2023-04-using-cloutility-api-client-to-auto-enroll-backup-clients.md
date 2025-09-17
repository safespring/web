---
ai: true
title: "Automatisera registreringen av backupnoder med Cloutilitys API-klient"
date: "2023-04-26"
publishDate: "2023-04-26"
intro: "Använd vårt Cloutility API-klientbibliotek med öppen källkod för att skapa en app för automatisk registrering av backup-klienter."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknikuppdatering"
author: "Daniel de Oquiñena"
language: "sv"
toc: ""
sidebarlinkname: "Kodförråd för Cloutility-api-client"
sidebarlinkurl: "https://github.com/safespring-community/cloutility-api-client"
sidebarlinkname2: "Fullständigt kodexempel"
sidebarlinkurl2: "https://github.com/safespring-community/cloutility-api-client/tree/main/examples/enroll"
toc: "I den här guiden"
aliases:
- /blogg/2023/2023-04-using-cloutility-api-client-to-auto-enroll-backup-clients/
---
{{< ingress >}}
I den här guiden går vi igenom Safesprings cloutility-backup-client-bibliotek skrivet i Go. Vi kommer att skriva ett litet, lättdistribuerbart verktyg för att automatisera registreringsprocessen av backupnoder och titta närmare på några av metoderna som finns i biblioteket cloutility-api-client.
{{< /ingress >}}

{{% note "Rekommenderad läsning" %}}
Fördjupa dig i världen av hantering av backupklienter med öppen källkod genom att läsa vår senaste artikel: [Skapa ett open source-bibliotek för backupklienter.](/blogg/2023/2023-04-creating-an-opensource-backup-client-library/) Trevlig läsning!
{{% /note %}}

## Förutsättningar

Om du vill följa med, se till att du har Go installerat på din maskin. Du behöver också skapa ett konto hos Safespring Backup och ha åtkomst till dina API-nycklar och inloggningsuppgifter.

Vi utgår också från några antaganden för vårt användningsfall:

- Vi vill registrera ett stort antal servrar med liknande konfiguration.
- Backupnoderna ska identifieras med sina värdnamn.
- Vi hanterar redan dessa servrar med ett konfigurationshanteringsverktyg som Puppet eller Ansible.
- Alla servrar ska ha samma retentionsperiod och inställningar i tjänsten Safespring Backup.

{{< distance >}}

## 1. Deklarera standardvärden och hämta värdnamn

Sätt standardvärden och hämta serverns värdnamn, som kommer att användas som identifierare för backupnoderna.
Vi börjar med att ange några standardvärden:```go
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
Som vi kommer att se senare i guiden, kommer vi att skicka vidare dessa värden när vi skapar vår backupnod för att säkerställa att vi ställer in rätt inställningar för just denna servertyp. Dessa inställningar kan enkelt anpassas till en mängd olika server- och arbetsstationskonfigurationer. För en komplett lista över alla tillgängliga kombinationer som stöds av Safespring Backup kan du använda CLI-verktyget som ingår i projektet cloutilty-api-client.

Innan vi får åtkomst till API:et hämtar vi också serverns värdnamn, som kommer att användas som identifierare för backupnoder.```go
hostname, _ := os.Hostname()
```
I det här exemplet ser vi till att inga två konsumenter (backupnoder) identifieras med samma värdnamn.

{{< distance >}}

## 2. Konfigurera miljön

För att interagera med API:et behöver vi en autentiserad klient för att utföra de olika operationerna. Initieringen görs med funktionen `cloutapi.Init()`. Så här ser det ut:```go
func Init(ctx context.Context, clientID, apiKeyOrigin, username, password, baseURL string) (*Client, error)
```
Funktionen `Init()` initierar en Cloutility API-klient och returnerar en pekare till en `AuthenticatedClient`-struct. Den tar följande parametrar:

| Parameter   | Typ             | Beskrivning                                                                                                  |
| ----------- | --------------- | ------------------------------------------------------------------------------------------------------------ |
| `ctx`       | context.Context | Ett context.Context-objekt för API-klienten                                                                  |
| `client_id` | string          | Ange Safespring-klient-ID (APIKey)                                                                           |
| `origin`    | string          | Ursprunget för klient-ID:t, angivet vid skapandet                                                            |
| `username`  | string          | Ange användarnamnet för Safespring Backup-tjänsten                                                           |
| `password`  | string          | Ange lösenordet för Safespring Backup-tjänsten                                                               |
| `baseURL`   | string          | Bas-URL för Cloutility API: `https://portal-api.backup.sto2.safedc.net` (för interaktion med Safespring Backup) |

I vårt exempel letar vi efter dessa värden i miljövariabler som finns i körmiljön, men de kan lika gärna göras tillgängliga från en konfigurationsfil, ett deploymentsverktyg såsom ansible eller någon annan källa.

{{< distance >}}

## 3. Hämta användarinformation

När API-klienten har initierats börjar vi med att hämta användaråtkomstinformationen för att avgöra i vilken affärsenhet vi ska placera backupnoden. Detta görs med metoden `GetUser()`, som är definierad så här:```go
func (c *AuthenticatedClient) GetUser() (*User, error)
```
Metoden `GetUser()` hämtar information om den aktuella användaren (bestäms av det användarnamn/lösenord som användes för att initiera klienten) och returnerar en pekare till en `User`-struktur. Framöver använder vi värdet `User.UserBunit.ID` som affärsenhets-ID:t där vi placerar vår backupklient.

{{< distance >}}

## 4. Hämta konsumentinformation

Nästa steg är att hämta en lista över konsumenter som redan finns i vår valda affärsenhet. För detta använder vi metoden `GetConsumers()` som ser ut så här:```go
func (c *AuthenticatedClient) GetConsumers(bUnitID int) ([]Consumer, error)
```
Metoden `GetConsumers()` hämtar en lista över consumers inom en viss affärsenhet och returnerar en slice av `Consumer`-strukturer. Den tar följande parametrar:

| Parameter | Typ    | Beskrivning                                                     |
| --------- | ------ | ---------------------------------------------------------------- |
| `bUnitID` | heltal | Vi skickar ID:t för den aktuella användarens affärsenhet.       |

För att säkerställa att vi skapar en ny consumer med ett unikt värdnamn som identifierare behöver vi också loopa igenom resultatet och avbryta körningen om värdnamnet matchar en redan befintlig consumer.

{{% note "Dubbletter av Consumer-namn är tillåtna" %}}
Det finns ingen inbyggd begränsning i tjänsten som förhindrar att man skapar consumers med samma namn. Den faktiska identifieraren är det ID som genereras vid skapandet.
{{% /note %}}

{{< distance >}}

## 5. Skapa en ny Consumer

Om det inte finns någon consumer med det aktuella värdnamnet går vi vidare och skapar en inom ramen för användarens affärsenhet med hjälp av metoden `CreateConsumer()`:```go
func (c *AuthenticatedClient) CreateConsumer(bUnitID int, name string) (Consumer, error)
```
Metoden `CreateConsumer()` skapar en ny konsument inom en affärsenhet och returnerar en `Consumer`-struct som innehåller ID, namn, skapandedatum osv. Den tar följande parametrar:

| Parameter | Typ     | Beskrivning                                                            |
| --------- | ------- | ---------------------------------------------------------------------- |
| `bUnitID` | heltal  | Vi kommer (återigen) att skicka in ID:t för den aktuella användarens affärsenhet. |
| `name`    | sträng  | Konsumentens namn; vi använder värdnamnet för den aktuella servern.    |

{{< distance >}}

## 6. Skapa en backupnod

En konsument (eller konsumtionsenhet som den kallas i webbportalen) är en entitet som innehåller metadata såsom visningsnamn, taggar och faktureringsdata. Men vi behöver fortfarande skapa en faktisk backupnod i vår nyligen skapade konsument. För detta kommer vi att använda metoden `CreateNode()`:```go
func (c *AuthenticatedClient) CreateNode(bUnitID, consumerID, osTypeID, nodeTypeID, domainID, clientOptionSetID int, contact string) (Node, error)
```
Metoden `CreateNode()` skapar en backupnod kopplad till en konsument och returnerar en ny `Node`-struct. Den kräver följande parametrar:

| Parameter           | Typ     | Beskrivning                                                                                                                                              |
| ------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bUnitID`           | heltal  | Som tidigare kommer vi att använda den aktuella användarens affärsenhet.                                                                                 |
| `consumerID`        | heltal  | Den konsument i vilken backupnoden ska placeras. Vi skickar in ID:t för den konsument vi just skapade.                                                   |
| `osType`            | heltal  | Här skickar vi konstanten `osTypeID` som vi deklarerade längre upp. I Safespring Backup har en Linux-server ID 3. En Windows-server skulle ha ID 2.     |
| `clientType`        | heltal  | ID:t för den klienttyp vi registrerar; vi skickar värdet av `nodeTypeID`, vilket för en filserver har ID 1.                                              |
| `domain`            | heltal  | Domänen avgör retentionstiden. Vi använder STANDARD-domänen med ID 1, som i Safespring Backup behåller 180 dagars backup.                               |
| `clientOptionSetID` | heltal  | Optionset för backupklienten som ska användas. Vi använder Optionset DEDUP_AND_COMPRESS.                                                                 |
| `contact`           | heltal  | Kontakt rörande backupnoden. Vanligtvis den avdelning som ansvarar för att hantera backupnoden.                                                          |

{{< distance >}}

## 7. Aktivera servern

När vi har skapat både en konsument (förbrukningsenhet) och en backupnod på servernivå måste vi nu aktivera noden för att hämta användarnamn och lösenord att skicka vidare till `IBM Spectrum Protect Backup-Archive Client` som kommer att köras på servern och faktiskt utföra säkerhetskopieringarna. Detta görs med metoden `ActivateNode()`:```go
func (c *AuthenticatedClient) ActivateNode(bUnitID, consumerID int) (Node, error)
```
Metoden `ActivateNode()` returnerar en `Node`-struktur där värdena `Node.TsmName` och `Node.TsmPassword` hämtas när säkerhetskopieringsnoden aktiveras. Dessa värden gör att IBM Spectrum Protect Backup-Archive Client kan identifiera sig korrekt när klienten ansluter till säkerhetskopieringsservern. Vi anropar metoden `ActivateNode()` med samma affärsenhets-ID och konsument-ID som tidigare.

{{< distance >}}

## 8. Färdig applikation

Nu sätter vi ihop allt och tittar på den kompletta applikationen:```go
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
Koden ovan resulterar i en fristående binär på ~7Mb som är lätt att distribuera och kan köras från ett skalskript som exporterar de nödvändiga miljövariablerna. Vid aktivering skrivs det användarnamn och lösenord som behövs av IBM Spectrum Protect Backup-Archive Client i vårt exempel ut till stdout och kan användas i det körande skriptet för att slutföra installationen.

{{% note "Rekommendation" %}}
Exempelkoden ovan har av enkelhetsskäl utelämnat all felhantering. I en produktionsmiljö rekommenderas undantagshantering
{{% /note %}}

På drygt 35 rader kod har vi framgångsrikt utvecklat ett fullt fungerande verktyg för att automatisera registreringen av backupklienter med hjälp av Safesprings bibliotek cloutility-api-client.

Sammanfattningsvis har biblioteket cloutility-api-client från Safespring gjort det möjligt för oss att skapa ett automatiserat verktyg för registrering av backupklienter som enkelt kan integreras i dina befintliga processer. Detta visar Safesprings engagemang för att motverka leverantörslåsning och främja sömlös integration med våra tjänster.

Vi är engagerade i att erbjuda våra kunder flexibiliteten och friheten att välja och anpassa sina lösningar utifrån sina behov. Om du har några frågor eller behöver stöd med implementationen, tveka inte att kontakta vårt supportteam. Lycka till med kodandet!