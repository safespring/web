---
title: "A step-by-step guide to running a GPU-accelerated local LLM on Safespring"
date: 2025-12-16
intro: "Install NVIDIA server drivers and Ollama on Ubuntu 24.04, then add Open-WebUI to run a local LLM with a browser chat interface."
draft: false
tags: ["container"]
showthedate: true
card: ""
sidebarimage: ""
eventbild: ""
socialmediabild: ""
language: "En"
sectiontext: "Tech Update"
section: "Tech update"
author: "Gabriel Paues"
TOC: "In this post"
sidebarlinkurl: "/containers"
sidebarlinkname: "Explore on-demand kubernetes"
sidebarlinkurl2: "/containers#get-started"
sidebarlinkname2: "Book demo"
---

{{< ingress >}}
Running an LLM locally does not have to be complicated. This post shows how to turn a GPU-enabled Ubuntu 24.04 instance in Safespring into a practical AI workstation using NVIDIA drivers, Ollama, and Open-WebUI.
{{< /ingress >}}

We’ll start from a fresh instance, install the recommended NVIDIA server driver, verify GPU acceleration with `nvidia-smi`, pull a few models, and finish by deploying Open-WebUI in Docker so you can chat in your browser. Everything stays on your own instance, and we’ll use SSH forwarding for safe access.

{{< horisontal-card
    image="/img/graphics/safespring-image.svg"
    alt="Safespring GPU-enabled instances for running local LLMs with Ollama"
    cardtitle="Run local LLMs on Safespring GPUs"
    text="Safespring’s container platform lets you provision GPU-enabled Ubuntu instances in minutes, with predictable performance and full control of your environment."
    link="/containers/"
    linktext="Explore GPU instances"
>}}
{{< distance >}}

{{% note "Prerequisites" %}}

First launch an instance in Safesprings platform with GPU support. This means choosing a flavor with the suffix gA2, such as b2.c4r8.gA2.

SSH to you instance:

```bash
ssh ubuntu@<IP-of-your-instance>
```
{{% /note %}}

## 1. Update the system

Start by updating your package list and upgrading all currently installed packages:

```bash
sudo apt update && sudo apt upgrade -y
```

## 2. Install NVIDIA drivers

Install the `ubuntu-drivers-common` utility to help identify the correct driver for your GPU:

```bash
sudo apt install ubuntu-drivers-common
```

List available and recommended drivers:

```bash
ubuntu-drivers devices
```

Install the recommended NVIDIA server driver (for example, `nvidia-driver-580-server-open`.

```bash
sudo apt install nvidia-driver-580-server-open
```

Reboot your system to activate the driver:

```bash
sudo reboot
```

After reboot, verify that your GPU is detected and operational:

```bash
nvidia-smi
```

You should see your GPU model, driver version, and any active GPU processes in the output.

## 3. Install Ollama

Install Ollama using the official shell script:

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Verify that the Ollama installation is working:

```bash
ollama -v
```

Reload your shell environment:

```bash
source ~/.bashrc
```

## 4. Pull models

You can now pull a few example models to get started:

```bash
ollama pull ministral-3:8b
ollama pull llama3:8b
ollama pull nchapman/ministral-8b-instruct-2410:8b
```

List all locally installed models:

```bash
ollama list
```

## 5. Run and test models

Start a model and interact with it in the terminal:

```bash
ollama run llama3:8b
```

You should now be able to chat with the model interactively. GPU usage can be observed in another terminal using:

```bash
nvidia-smi
```

You can also try another model to compare responses and performance:

```bash
ollama run ministral-3:8b
```

The ollama server is listening on the local port 11434 with a REST API. This can be used to connect the model with other tools, such as Opencode.

By using SSH forwarding you can also securely reach the API from your local client. Just add the -L flag when you connect to your GPU instance:

```bash
ssh -L 8080:localhost:11434 ubuntu@<IP-of-your-instance>
```

After connecting this way you will be able to reach the API from your local client by connecting to the port localhost:8080.

## 6. Install Open-WebUI

Chatting with your model in the CLI is good for testing but it is hardly user friendly. Now it is time to add a web user interface to your Ollama installation to create your own local ChatGPT clone running locally on your instance in Safespring's infrastructure.

The Open-WebUI will run in a Docker container so first we install Docker:

```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker "$USER"
```

In order to run Docker commands from you local ubuntu user you need to logut from your instance and login again to get the correct group ownerships. We will also at the same time set up a port forward that we will use later to reach the Open-WebUI:

```bash
logout
ssh -L 8080:localhost:8080 ubuntu@<IP of you host>
```

Now it is time to start the Open-WebUI container. We will use host networking to ensure that the container can speak to the ollama API at http://localhost:11434:

```bash
docker run -d \
  --name open-webui \
  --network=host \
  -e OLLAMA_BASE_URL=http://127.0.0.1:11434 \
  -v open-webui:/app/backend/data \
  --restart always \
  ghcr.io/open-webui/open-webui:latest
```

It takes a while to download the containers, but once it is finished your Open-WebUI container will now respond on the local port 8080 on your linux instance. Since we set up a port forward when we reconnected,  exactly to this port, you should now be able to point your local web browser to http://localhost:8080 to reach Open-WebUI.

In the Open-WebUI you will be able create an account and to pick which of the models you have installed and chat with it.

You now have a AI model with a working web interface running on your local GPU instance at Safespring!


{{< horisontal-card
    image="/img/graphics/safespring-image.svg"
    alt="Try Safespring GPU instances for running local LLMs"
    cardtitle="Try it yourself on Safespring"
    text="Want to replicate this setup in minutes? Spin up a GPU-enabled Ubuntu instance in Safespring’s container platform and follow the guide end-to-end."
    link="/containers#get-started"
    linktext="Get started with GPU instances"
>}}