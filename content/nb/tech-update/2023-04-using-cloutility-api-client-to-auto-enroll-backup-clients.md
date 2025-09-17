---
ai: true
title: "Automatisert registrering av sikkerhetskopinoder med Cloutility API-klienten"
date: "2023-04-26"
publishDate: "2023-04-26"
intro: "Bruk vårt Cloutility API-klientbibliotek med åpen kildekode til å lage en app for automatisk registrering av backupklienter."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknologioppdatering"
author: "Daniel de Oquiñena"
language: "nb"
toc: ""
sidebarlinkname: "Cloutility-api-client-repo"
sidebarlinkurl: "https://github.com/safespring-community/cloutility-api-client"
sidebarlinkname2: "Fullstendig kodeeksempel"
sidebarlinkurl2: "https://github.com/safespring-community/cloutility-api-client/tree/main/examples/enroll"
toc: "I denne veiledningen"
aliases:
- /blogg/2023/2023-04-using-cloutility-api-client-to-auto-enroll-backup-clients/
---
{{< ingress >}}
I denne veiledningen skal vi utforske Safesprings bibliotek cloutility-backup-client skrevet i Go. Vi lager et lite, lett å distribuere verktøy for å automatisere registreringsprosedyren for sikkerhetskopinoder og ser nærmere på noen av metodene som er tilgjengelige i biblioteket cloutility-api-client.
{{< /ingress >}}

{{% note "Anbefalt lesning" %}}
Fordyp deg i verden av åpen kildekode-håndtering av sikkerhetskopiklienter ved å lese vår ferske artikkel om [Å lage et klientbibliotek for sikkerhetskopi med åpen kildekode.](/blogg/2023/2023-04-creating-an-opensource-backup-client-library/) God lesning!
{{% /note %}}

## Forutsetninger

Hvis du vil følge med, må du sørge for at du har Go installert på maskinen. Du må også ha opprettet en konto hos Safespring Backup og ha tilgang til API-nøklene og påloggingsdetaljene dine.

Vi gjør også noen antakelser som grunnlag for brukstilfellet vårt:

- Vi ønsker å registrere et stort antall servere med lignende oppsett.
- Sikkerhetskopinodene skal identifiseres ved vertsnavnet deres.
- Vi administrerer allerede disse serverne med et konfigurasjonsstyringsverktøy som Puppet eller Ansible.
- Alle serverne skal ha samme retensjonsperiode og innstillinger i Safespring Backup-tjenesten.

{{< distance >}}

## 1. Deklarere standardverdier og hente vertsnavn

Angi standardverdier og hent serverens vertsnavn, som skal brukes som identifikator for sikkerhetskopinoder.
Vi begynner med å angi noen standardverdier:```go
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
Som vi skal se senere i veiledningen, sender vi med disse verdiene når vi oppretter backup-noden vår for å sikre at vi setter riktige innstillinger for denne spesifikke servertypen. Disse innstillingene kan enkelt tilpasses en rekke server-/arbeidsstasjonsoppsett. For en komplett liste over alle tilgjengelige kombinasjoner som støttes av Safespring Backup kan du bruke cli-tool som er inkludert i cloutilty-api-client-prosjektet.

Før vi får tilgang til API-et henter vi også vertsnavnet til serveren, som vil bli brukt som identifikator for backup-noder.```go
hostname, _ := os.Hostname()
```
I dette eksemplet sørger vi for at ingen to konsumenter (backup-noder) har samme vertsnavn.

{{< distance >}}

## 2. Sette opp miljøet

For å kunne bruke API-et trenger vi en autentisert klient for å utføre de ulike operasjonene. Initialisering gjøres med funksjonen `cloutapi.Init()`. Slik ser det ut:```go
func Init(ctx context.Context, clientID, apiKeyOrigin, username, password, baseURL string) (*Client, error)
```
Funksjonen `Init()` initialiserer en Cloutility API-klient og returnerer en peker til en `AuthenticatedClient`-struktur. Den tar følgende parametere:

| Parameter   | Type            | Beskrivelse                                                                                                   |
| ----------- | --------------- | ------------------------------------------------------------------------------------------------------------- |
| `ctx`       | context.Context | Et context.Context-objekt for API-klienten                                                                    |
| `client_id` | string          | Oppgi Safespring-klient-ID (APIKey)                                                                           |
| `origin`    | string          | Opprinnelsen til klient-ID-en, angitt ved opprettelse                                                        |
| `username`  | string          | Oppgi brukernavnet for Safespring Backup-tjenesten                                                            |
| `password`  | string          | Oppgi passordet for Safespring Backup-tjenesten                                                               |
| `baseURL`   | string          | Basis-URL for Cloutility API: `https://portal-api.backup.sto2.safedc.net` (for interaksjon med Safespring Backup) |

I eksemplet vårt henter vi disse verdiene fra miljøvariabler i kjøremiljøet, men de kan like gjerne gjøres tilgjengelige fra en konfigurasjonsfil, et utrullingsverktøy som Ansible eller en annen kilde.

{{< distance >}}

## 3. Hente brukerinformasjon

Når API-klienten er initialisert, begynner vi med å hente informasjon om brukertilgang for å avgjøre hvilken forretningsenhet vi skal plassere backup-noden i. Dette gjøres ved å bruke metoden `GetUser()`, som er definert slik:```go
func (c *AuthenticatedClient) GetUser() (*User, error)
```
Metoden `GetUser()` henter informasjon om den gjeldende brukeren (bestemt av brukernavn/passord brukt til å initialisere klienten) og returnerer en peker til en `User`-struct. Videre vil vi bruke denne verdien av `User.UserBunit.ID` som ID-en til forretningsenheten der vi plasserer backup-klienten vår.

{{< distance >}}

## 4. Hente informasjon om konsumenter

Neste steg er å hente en liste over konsumenter som allerede finnes i den valgte forretningsenheten. Til dette bruker vi metoden `GetConsumers()`, som ser slik ut:```go
func (c *AuthenticatedClient) GetConsumers(bUnitID int) ([]Consumer, error)
```
Metoden `GetConsumers()` henter en liste over konsumenter innenfor en gitt forretningsenhet og returnerer en slice av `Consumer`-strukturer. Den tar følgende parametere:

| Parameter | Type    | Beskrivelse                                                     |
| --------- | ------- | ---------------------------------------------------------------- |
| `bUnitID` | heltall | Vi sender ID-en til den gjeldende brukerens forretningsenhet.    |

For å sikre at vi oppretter en ny konsument med et unikt vertsnavn må vi også iterere over resultatet og avbryte kjøringen hvis vertsnavnet samsvarer med en allerede eksisterende konsument.

{{% note "Dupliserte konsumentnavn er tillatt" %}}
Det finnes ingen innebygd begrensning i tjenesten som hindrer at man oppretter konsumenter med samme navn. Den faktiske identifikatoren vil være ID-en som genereres ved opprettelse.
{{% /note %}}

{{< distance >}}

## 5. Opprette en ny konsument

Hvis det ikke finnes noen konsument med det gjeldende vertsnavnet, fortsetter vi med å opprette en innenfor brukerens forretningsenhet, ved å bruke metoden `CreateConsumer()`:```go
func (c *AuthenticatedClient) CreateConsumer(bUnitID int, name string) (Consumer, error)
```
Metoden `CreateConsumer()` oppretter en ny konsument i en forretningsenhet og returnerer en `Consumer`-struktur som inneholder ID, navn, opprettelsesdato osv. Den tar følgende parametere:

| Parameter | Type   | Beskrivelse                                                               |
| --------- | ------ | ------------------------------------------------------------------------- |
| `bUnitID` | heltall | Vi sender (igjen) ID-en til den nåværende brukerens forretningsenhet.    |
| `name`    | streng | Konsumentnavnet; vi bruker vertsnavnet til den gjeldende serveren.        |

{{< distance >}}

## 6. Opprette en sikkerhetskopinode

En konsument (eller forbruksenhet, som det kalles i nettportalen) er en enhet som inneholder metadata som visningsnavn, tagger og faktureringsdata. Men vi må fortsatt opprette en faktisk sikkerhetskopinode i vår nyopprettede konsument. Til dette bruker vi metoden `CreateNode()`:```go
func (c *AuthenticatedClient) CreateNode(bUnitID, consumerID, osTypeID, nodeTypeID, domainID, clientOptionSetID int, contact string) (Node, error)
```
Metoden `CreateNode()` oppretter en backupnode knyttet til en forbruksenhet og returnerer en ny `Node`-struktur. Den krever følgende parametere:

| Parameter           | Type    | Beskrivelse                                                                                                                                              |
| ------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bUnitID`           | integer | Som før bruker vi gjeldende brukers forretningsenhet.                                                                                                    |
| `consumerID`        | integer | Forbruksenheten der backupnoden skal plasseres. Vi sender ID-en til forbruksenheten vi nettopp opprettet.                                               |
| `osType`            | integer | Her sender vi konstanten `osTypeID` som vi deklarerte lenger opp. Hos Safespring Backup har en Linux-server ID 3. En Windows-server har ID 2.           |
| `clientType`        | integer | ID-en til klienttypen vi registrerer; vi sender verdien av `nodeTypeID`, som for en filserver har ID 1.                                                 |
| `domain`            | integer | Domenet bestemmer retensjonsperioden. Vi bruker STANDARD-domenet med ID 1, som hos Safespring Backup beholder 180 dager med sikkerhetskopi.             |
| `clientOptionSetID` | integer | Alternativsettet for backupklienten som skal brukes. Vi bruker alternativsettet DEDUP_AND_COMPRESS                                                       |
| `contact`           | integer | Kontakt vedrørende backupnoden. Typisk avdelingen som har ansvar for å administrere backupnoden.                                                         |

{{< distance >}}

## 7. Aktivere serveren

Når vi har opprettet både en forbruksenhet (consumption-unit) og en backupnode på servernivå, må vi aktivere noden for å hente brukernavn og passord som skal gis videre til IBM Spectrum Protect Backup-Archive Client som vil kjøre på serveren og faktisk utføre sikkerhetskopiene. Dette gjøres med metoden `ActivateNode()`:```go
func (c *AuthenticatedClient) ActivateNode(bUnitID, consumerID int) (Node, error)
```
Metoden `ActivateNode()` returnerer en `Node`-struktur som inneholder verdiene `Node.TsmName` og `Node.TsmPassword` som hentes når backup-noden aktiveres. Disse verdiene gjør at IBM Spectrum Protect Backup-Archive Client kan identifisere seg korrekt når den kobler til backup-serveren. Vi kaller metoden `ActivateNode()` med samme forretningsenhets-ID og konsument-ID som tidligere.

{{< distance >}}

## 8. Ferdig applikasjon

La oss nå sette alt sammen og se på den komplette applikasjonen:```go
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
Koden ovenfor vil resultere i en selvstendig binærfil på ~7Mb som er enkel å distribuere og kan kjøres fra et shell-skript som eksporterer de nødvendige miljøvariablene. Ved aktivering skrives brukernavnet og passordet som trengs av IBM Spectrum Protect Backup-Archive Client i eksempel­koden vår ut til stdout og kan brukes i det kjørende skriptet for å fullføre installasjonen.

{{% note "Anbefaling" %}}
Eksempelkoden over har av hensyn til enkelhet utelatt all feilhåndtering. I et produksjonsmiljø anbefales unntakshåndtering
{{% /note %}}

På litt over 35 kodelinjer har vi utviklet et fullt funksjonelt verktøy for å automatisere registreringen av backup-klienter ved hjelp av Safesprings cloutility-api-client-bibliotek.

Oppsummert har cloutility-api-client-biblioteket fra Safespring gjort det mulig for oss å lage et automatisert verktøy for registrering av backup-klienter som enkelt kan integreres i dine eksisterende prosesser. Dette viser Safesprings dedikasjon til å forhindre leverandørlåsing og å legge til rette for sømløs integrasjon med våre tjenester.

Vi er forpliktet til å gi kundene våre fleksibiliteten og friheten til å velge og tilpasse løsningene sine etter egne behov. Hvis du har spørsmål eller trenger hjelp med implementeringen, ikke nøl med å kontakte vårt supportteam. Lykke til med kodingen!