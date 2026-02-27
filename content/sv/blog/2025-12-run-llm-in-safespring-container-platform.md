---
ai: true
title: "En steg-för-steg-guide för att köra en GPU-accelererad lokal LLM på Safespring"
date: 2025-12-16
intro: "Installera NVIDIA-serverdrivrutiner och Ollama på Ubuntu 24.04 och lägg sedan till Open-WebUI för att köra en lokal LLM med ett chattgränssnitt i webbläsaren."
draft: false
tags: ["container"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "sv"
sectiontext: "Teknisk uppdatering"
section: "Tech update"
author: "Gabriel Paues"
TOC: "I det här inlägget"
sidebarlinkurl: "/containers"
sidebarlinkname: "Utforska Kubernetes på begäran"
sidebarlinkurl2: "/containers#get-started"
sidebarlinkname2: "Bokdemo"
---
{{< ingress >}}
Att köra en LLM lokalt behöver inte vara komplicerat. Det här inlägget visar hur du förvandlar en GPU-aktiverad Ubuntu 24.04-instans i Safespring till en praktisk AI-arbetsstation med NVIDIA-drivrutiner, Ollama och Open-WebUI.
{{< /ingress >}}

Vi börjar från en helt ny instans, installerar den rekommenderade NVIDIA-serverdrivrutinen, verifierar GPU-acceleration med `nvidia-smi`, hämtar några modeller och avslutar med att driftsätta Open-WebUI i Docker så att du kan chatta i din webbläsare. Allt stannar på din egen instans, och vi använder SSH-forwarding för säker åtkomst.

{{< horisontal-card
    image="/img/graphics/safespring-image.svg"
    alt="Safespring GPU-aktiverade instanser för att köra lokala LLM:er med Ollama"
    cardtitle="Kör lokala LLM:er på Safespring-GPU:er"
    text="Safesprings containerplattform låter dig provisionera GPU-aktiverade Ubuntu-instanser på några minuter, med förutsägbar prestanda och full kontroll över din miljö."
    link="/containers/"
    linktext="Utforska GPU-instanser"
>}}
{{< distance >}}

{{% note "Förutsättningar" %}}

Starta först en instans i Safesprings plattform med GPU-stöd. Det innebär att du väljer en flavor med suffixet gA2, till exempel b2.c4r8.gA2.

SSH:a till din instans:
```bash
ssh ubuntu@<IP-of-your-instance>
```
{{% /note %}}

## 1. Uppdatera systemet

Börja med att uppdatera din paketlista och uppgradera alla för närvarande installerade paket:
```bash
sudo apt update && sudo apt upgrade -y
```
## 2. Installera NVIDIA-drivrutiner

Installera verktyget `ubuntu-drivers-common` för att hjälpa till att identifiera rätt drivrutin för din GPU:
```bash
sudo apt install ubuntu-drivers-common
```
Lista tillgängliga och rekommenderade drivrutiner:
```bash
ubuntu-drivers devices
```
Installera den rekommenderade NVIDIA-serverdrivrutinen (till exempel `nvidia-driver-580-server-open`.
```bash
sudo apt install nvidia-driver-580-server-open
```
Starta om systemet för att aktivera drivrutinen:
```bash
sudo reboot
```
Efter omstarten, verifiera att din GPU upptäcks och fungerar som den ska:
```bash
nvidia-smi
```
Du bör se din GPU-modell, drivrutinsversion och eventuella aktiva GPU-processer i utdata.

## 3. Installera Ollama

Installera Ollama med hjälp av det officiella shell-skriptet:
```bash
curl -fsSL https://ollama.com/install.sh | sh
```
Verifiera att Ollama-installationen fungerar:
```bash
ollama -v
```
Ladda om din skalmiljö:
```bash
source ~/.bashrc
```
## 4. Hämta modeller

Du kan nu hämta några exempelmodeller för att komma igång:
```bash
ollama pull ministral-3:8b
ollama pull llama3:8b
ollama pull nchapman/ministral-8b-instruct-2410:8b
```

Lista alla lokalt installerade modeller:
```bash
ollama list
```
## 5. Kör och testa modeller

Starta en modell och interagera med den i terminalen:
```bash
ollama run llama3:8b
```
Du bör nu kunna chatta med modellen interaktivt. GPU-användning kan observeras i en annan terminal med hjälp av:
```bash
nvidia-smi
```
Du kan också prova en annan modell för att jämföra svar och prestanda:
```bash
ollama run ministral-3:8b
```
Ollama-servern lyssnar på den lokala porten 11434 med ett REST-API. Detta kan användas för att ansluta modellen till andra verktyg, såsom Opencode.

Genom att använda SSH-portvidarebefordran kan du också nå API:et säkert från din lokala klient. Lägg bara till flaggan -L när du ansluter till din GPU-instans:
```bash
ssh -L 8080:localhost:11434 ubuntu@<IP-of-your-instance>
```
Efter att du har anslutit på det här sättet kommer du att kunna nå API:et från din lokala klient genom att ansluta till porten localhost:8080.

## 6. Installera Open-WebUI

Att chatta med din modell i CLI:t är bra för testning men det är knappast användarvänligt. Nu är det dags att lägga till ett webbgränssnitt till din Ollama-installation för att skapa din egen lokala ChatGPT-klon som kör lokalt på din instans i Safesprings infrastruktur.

Open-WebUI kommer att köras i en Docker-container, så först installerar vi Docker:
```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker "$USER"
```
För att kunna köra Docker-kommandon från din lokala Ubuntu-användare behöver du logga ut från din instans och logga in igen för att få korrekta gruppbehörigheter. Samtidigt kommer vi att konfigurera en portvidarebefordran som vi senare kommer att använda för att nå Open-WebUI:
```bash
ssh -L 8080:localhost:8080 ubuntu@<IP of your host>
```
Nu är det dags att starta Open-WebUI-containern. Vi kommer att använda värdnätverk för att säkerställa att containern kan prata med ollama-API:t på http://localhost:11434:
```bash
docker run -d \
  --name open-webui \
  --network=host \
  -e OLLAMA_BASE_URL=http://127.0.0.1:11434 \
  -v open-webui:/app/backend/data \
  --restart always \
  ghcr.io/open-webui/open-webui:latest
```
Det tar ett tag att ladda ner containrarna, men när det är klart kommer din Open-WebUI-container nu att svara på den lokala porten 8080 på din Linux-instans. Eftersom vi satte upp en portvidarebefordran när vi återanslöt, exakt till denna port, bör du nu kunna peka din lokala webbläsare till http://localhost:8080 för att nå Open-WebUI.

I Open-WebUI kommer du att kunna skapa ett konto och välja vilken av de modeller du har installerat och chatta med den.

Du har nu en AI-modell med ett fungerande webbgränssnitt som körs på din lokala GPU-instans hos Safespring!


{{< horisontal-card
    image="/img/graphics/safespring-image.svg"
    alt="Prova Safespring GPU-instanser för att köra lokala LLM:er"
    cardtitle="Prova själv på Safespring"
    text="Vill du återskapa den här installationen på några minuter? Starta en GPU-aktiverad Ubuntu-instans i Safesprings containerplattform och följ guiden från början till slut."
    link="/containers#get-started"
    linktext="Kom igång med GPU-instanser"
>}}