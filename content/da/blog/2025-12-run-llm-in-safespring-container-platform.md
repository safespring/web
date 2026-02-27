---
ai: true
title: "En trin-for-trin-guide til at køre en GPU-accelereret lokal LLM på Safespring"
date: 2025-12-16
intro: "Installer NVIDIA-serverdrivere og Ollama på Ubuntu 24.04, og tilføj derefter Open-WebUI for at køre en lokal LLM med en browserbaseret chatgrænseflade."
draft: false
tags: ["container"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "da"
sectiontext: "Tech-opdatering"
section: "Tech update"
author: "Gabriel Paues"
TOC: "I dette indlæg"
sidebarlinkurl: "/containers"
sidebarlinkname: "Udforsk on-demand Kubernetes"
sidebarlinkurl2: "/containers#get-started"
sidebarlinkname2: "Bogdemo"
---
{{< ingress >}}
At køre en LLM lokalt behøver ikke være kompliceret. Dette indlæg viser, hvordan du forvandler en GPU-aktiveret Ubuntu 24.04-instans i Safespring til en praktisk AI-workstation ved hjælp af NVIDIA-drivere, Ollama og Open-WebUI.
{{< /ingress >}}

Vi starter fra en helt ny instans, installerer den anbefalede NVIDIA-serverdriver, bekræfter GPU-acceleration med `nvidia-smi`, henter et par modeller og slutter af med at udrulle Open-WebUI i Docker, så du kan chatte i din browser. Alt bliver på din egen instans, og vi bruger SSH-forwarding for sikker adgang.

{{< horisontal-card
    image="/img/graphics/safespring-image.svg"
    alt="Safespring GPU-aktiverede instanser til at køre lokale LLM’er med Ollama"
    cardtitle="Kør lokale LLM’er på Safespring GPU’er"
    text="Safesprings containerplatform lader dig klargøre GPU-aktiverede Ubuntu-instanser på få minutter med forudsigelig ydeevne og fuld kontrol over dit miljø."
    link="/containers/"
    linktext="Udforsk GPU-instanser"
>}}
{{< distance >}}

{{% note "Forudsætninger" %}}

Start først en instans i Safesprings platform med GPU-understøttelse. Det betyder, at du skal vælge en flavor med suffikset gA2, såsom b2.c4r8.gA2.

SSH til din instans:
```bash
ssh ubuntu@<IP-of-your-instance>
```
{{% /note %}}

## 1. Opdater systemet

Start med at opdatere din pakkeliste og opgradere alle aktuelt installerede pakker:
```bash
sudo apt update && sudo apt upgrade -y
```
## 2. Installér NVIDIA-drivere

Installér hjælpeværktøjet `ubuntu-drivers-common` for at hjælpe med at identificere den korrekte driver til din GPU:
```bash
sudo apt install ubuntu-drivers-common
```
Liste over tilgængelige og anbefalede drivere:
```bash
ubuntu-drivers devices
```
Installer den anbefalede NVIDIA-serverdriver (for eksempel `nvidia-driver-580-server-open`.
```bash
sudo apt install nvidia-driver-580-server-open
```
Genstart dit system for at aktivere driveren:
```bash
sudo reboot
```
Efter genstart skal du kontrollere, at din GPU registreres og fungerer korrekt:
```bash
nvidia-smi
```
Du bør kunne se din GPU-model, driverversion og eventuelle aktive GPU-processer i outputtet.

## 3. Installér Ollama

Installér Ollama ved hjælp af det officielle shell-script:
```bash
curl -fsSL https://ollama.com/install.sh | sh
```
Bekræft, at Ollama-installationen fungerer:
```bash
ollama -v
```
Genindlæs dit shell-miljø:
```bash
source ~/.bashrc
```
## 4. Hent modeller

Du kan nu hente et par eksempelmodeller for at komme i gang:
```bash
ollama pull ministral-3:8b
ollama pull llama3:8b
ollama pull nchapman/ministral-8b-instruct-2410:8b
```

Vis alle lokalt installerede modeller:
```bash
ollama list
```
## 5. Kør og test modeller

Start en model, og interagér med den i terminalen:
```bash
ollama run llama3:8b
```
Du skulle nu kunne chatte med modellen interaktivt. GPU-forbrug kan observeres i en anden terminal ved hjælp af:
```bash
nvidia-smi
```
Du kan også prøve en anden model for at sammenligne svar og ydeevne:
```bash
ollama run ministral-3:8b
```
Ollama-serveren lytter på den lokale port 11434 med en REST-API. Dette kan bruges til at forbinde modellen med andre værktøjer, såsom Opencode.

Ved at bruge SSH-forwarding kan du også sikkert få adgang til API'et fra din lokale klient. Du skal blot tilføje -L-flaget, når du forbinder til din GPU-instans:
```bash
ssh -L 8080:localhost:11434 ubuntu@<IP-of-your-instance>
```
Efter tilslutning på denne måde vil du kunne tilgå API'et fra din lokale klient ved at forbinde til porten localhost:8080.

## 6. Installér Open-WebUI

At chatte med din model i CLI'en er godt til test, men det er langt fra brugervenligt. Nu er det tid til at tilføje en webbrugergrænseflade til din Ollama-installation for at skabe din egen lokale ChatGPT-klon, der kører lokalt på din instans i Safesprings infrastruktur.

Open-WebUI kører i en Docker-container, så først installerer vi Docker:
```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker "$USER"
```
For at kunne køre Docker-kommandoer fra din lokale Ubuntu-bruger skal du logge ud af din instans og logge ind igen for at få de korrekte gruppe-ejerskaber. Samtidig opsætter vi også en port-forwarding, som vi senere vil bruge til at nå Open-WebUI:
```bash
ssh -L 8080:localhost:8080 ubuntu@<IP of your host>
```
Nu er det tid til at starte Open-WebUI-containeren. Vi vil bruge værtsnetværk for at sikre, at containeren kan kommunikere med Ollama-API’et på http://localhost:11434:
```bash
docker run -d \
  --name open-webui \
  --network=host \
  -e OLLAMA_BASE_URL=http://127.0.0.1:11434 \
  -v open-webui:/app/backend/data \
  --restart always \
  ghcr.io/open-webui/open-webui:latest
```
Det tager et stykke tid at downloade containerne, men når det er færdigt, vil din Open-WebUI-container nu svare på den lokale port 8080 på din linux-instans. Da vi opsatte en port-forward, da vi genforbandt, præcis til denne port, bør du nu kunne pege din lokale webbrowser på http://localhost:8080 for at nå Open-WebUI.

I Open-WebUI kan du oprette en konto og vælge, hvilken af de modeller, du har installeret, og chatte med den.

Du har nu en AI-model med en fungerende webgrænseflade kørende på din lokale GPU-instans hos Safespring!


{{< horisontal-card
    image="/img/graphics/safespring-image.svg"
    alt="Prøv Safespring GPU-instancer til at køre lokale LLM'er"
    cardtitle="Prøv det selv på Safespring"
    text="Vil du genskabe denne opsætning på få minutter? Start en GPU-aktiveret Ubuntu-instans i Safesprings containerplatform, og følg guiden fra ende til anden."
    link="/containers#get-started"
    linktext="Kom i gang med GPU-instancer"
>}}