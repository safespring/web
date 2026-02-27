---
ai: true
title: "En trinnvis veiledning for å kjøre en GPU-akselerert lokal LLM på Safespring"
date: 2025-12-16
intro: "Installer NVIDIA-serverdrivere og Ollama på Ubuntu 24.04, og legg deretter til Open-WebUI for å kjøre en lokal LLM med et nettleserbasert chattegrensesnitt."
draft: false
tags: ["container"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "nb"
sectiontext: "Teknologioppdatering"
section: "Tech update"
author: "Gabriel Paues"
TOC: "I dette innlegget"
sidebarlinkurl: "/containers"
sidebarlinkname: "Utforsk Kubernetes på forespørsel"
sidebarlinkurl2: "/containers#get-started"
sidebarlinkname2: "Bokdemo"
---
{{< ingress >}}
Å køyre ein LLM lokalt treng ikkje vere komplisert. Dette innlegget viser korleis du kan gjere ein GPU-aktivert Ubuntu 24.04-instans i Safespring om til ei praktisk AI-arbeidsstasjon ved hjelp av NVIDIA-drivarar, Ollama og Open-WebUI.
{{< /ingress >}}

Vi startar frå ein heilt ny instans, installerar den tilrådde NVIDIA-serverdrivaren, verifiserer GPU-akselerasjon med `nvidia-smi`, hentar nokre modellar, og avsluttar med å setje opp Open-WebUI i Docker slik at du kan chatte i nettlesaren. Alt blir verande på di eiga instans, og vi brukar SSH-vidarekopling for trygg tilgang.

{{< horisontal-card
    image="/img/graphics/safespring-image.svg"
    alt="Safespring GPU-aktivert instansar for å køyre lokale LLM-ar med Ollama"
    cardtitle="Køyr lokale LLM-ar på Safespring-GPU-ar"
    text="Containerplattforma til Safespring lèt deg klargjere GPU-aktivert Ubuntu-instansar på få minutt, med føreseieleg yting og full kontroll over miljøet ditt."
    link="/containers/"
    linktext="Utforsk GPU-instansar"
>}}
{{< distance >}}

{{% note "Føresetnader" %}}

Fyrst startar du ein instans i Safespring-plattforma med GPU-støtte. Dette inneber å velje ein flavor med suffikset gA2, til dømes b2.c4r8.gA2.

SSH til instansen din:
```bash
ssh ubuntu@<IP-of-your-instance>
```
{{% /note %}}

## 1. Oppdater systemet

Start med å oppdatere pakkelisten og oppgradere alle pakkene som er installert for øyeblikket:
```bash
sudo apt update && sudo apt upgrade -y
```
## 2. Installer NVIDIA-drivere

Installer verktøyet `ubuntu-drivers-common` for å hjelpe deg med å identifisere riktig driver for GPU-en din:
```bash
sudo apt install ubuntu-drivers-common
```
List opp tilgjengelige og anbefalte drivere:
```bash
ubuntu-drivers devices
```
Installer den anbefalte NVIDIA-serverdriveren (for eksempel `nvidia-driver-580-server-open`.
```bash
sudo apt install nvidia-driver-580-server-open
```
Start systemet på nytt for å aktivere driveren:
```bash
sudo reboot
```
Etter omstart, verifiser at GPU-en din blir oppdaget og fungerer:
```bash
nvidia-smi
```
Du skal se GPU-modellen din, driverversjonen og eventuelle aktive GPU-prosesser i utskriften.

## 3. Installer Ollama

Installer Ollama ved å bruke det offisielle skallskriptet:
```bash
curl -fsSL https://ollama.com/install.sh | sh
```
Bekreft at Ollama-installasjonen fungerer:
```bash
ollama -v
```
Last inn shell-miljøet ditt på nytt:
```bash
source ~/.bashrc
```
## 4. Hent modeller

Du kan nå hente noen eksempelmodeller for å komme i gang:
```bash
ollama pull ministral-3:8b
ollama pull llama3:8b
ollama pull nchapman/ministral-8b-instruct-2410:8b
```
List opp alle lokalt installerte modeller:
```bash
ollama list
```
## 5. Kjør og test modeller

Start en modell og samhandle med den i terminalen:
```bash
ollama run llama3:8b
```
Du skal nå kunne chatte med modellen interaktivt. GPU-bruk kan observeres i en annen terminal ved å bruke:
```bash
nvidia-smi
```
Du kan også prøve en annen modell for å sammenligne svar og ytelse:
```bash
ollama run ministral-3:8b
```
Ollama-serveren lytter på den lokale porten 11434 med et REST-API. Dette kan brukes til å koble modellen til andre verktøy, som Opencode.

Ved å bruke SSH-viderekobling kan du også nå API-et sikkert fra den lokale klienten din. Bare legg til `-L`-flagget når du kobler til GPU-instansen din:
```bash
ssh -L 8080:localhost:11434 ubuntu@<IP-of-your-instance>
```
Etter at du har koblet til på denne måten, vil du kunne nå API-et fra din lokale klient ved å koble til porten localhost:8080.

## 6. Installer Open-WebUI

Å chatte med modellen din i CLI-en er bra for testing, men det er langt fra brukervennlig. Nå er det på tide å legge til et webgrensesnitt til Ollama-installasjonen din, slik at du kan lage din egen lokale ChatGPT-klone som kjører lokalt på instansen din i Safesprings infrastruktur.

Open-WebUI vil kjøre i en Docker-container, så først installerer vi Docker:
```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker "$USER"
```
For å kunne kjøre Docker-kommandoer fra din lokale Ubuntu-bruker må du logge ut av instansen og logge inn igjen for å få riktige gruppeattributter. Samtidig setter vi opp en port-videresending som vi senere vil bruke for å nå Open-WebUI:
```bash
ssh -L 8080:localhost:8080 ubuntu@<IP of your host>
```
Nå er det på tide å starte Open-WebUI-containeren. Vi bruker host-nettverk for å sikre at containeren kan kommunisere med ollama-API-et på http://localhost:11434:
```bash
docker run -d \
  --name open-webui \
  --network=host \
  -e OLLAMA_BASE_URL=http://127.0.0.1:11434 \
  -v open-webui:/app/backend/data \
  --restart always \
  ghcr.io/open-webui/open-webui:latest
```
Det tar en stund å laste ned containerne, men når det er ferdig vil Open-WebUI-containeren din nå svare på den lokale porten 8080 på Linux-instansen din. Siden vi satte opp en port forwarding da vi koblet til igjen, nøyaktig til denne porten, skal du nå kunne peke den lokale nettleseren din til http://localhost:8080 for å nå Open-WebUI.

I Open-WebUI vil du kunne opprette en konto og velge hvilken av modellene du har installert, og chatte med den.

Du har nå en AI-modell med et fungerende webgrensesnitt som kjører på din lokale GPU-instans hos Safespring!


{{< horisontal-card
    image="/img/graphics/safespring-image.svg"
    alt="Prøv Safespring GPU-instanser for å kjøre lokale LLM-er"
    cardtitle="Prøv det selv på Safespring"
    text="Vil du gjenskape dette oppsettet på få minutter? Start opp en GPU-aktivert Ubuntu-instans i Safesprings containerplattform og følg guiden fra start til slutt."
    link="/containers#get-started"
    linktext="Kom i gang med GPU-instanser"
>}}