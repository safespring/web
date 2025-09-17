---
ai: true
title: "Ompartisjonering av rotfilsystemet på NVMe-instanser"
date: 2023-03-02T13:58:58+01:00
draft: false
tags: ["English"]
intro: "Dette løsningsnotatet gir trinnvise instruksjoner om hvordan du ompartisjonerer rotfilsystemet på en NVMe-instans i l2-serien på Safesprings plattform."
background: ""
sidebarlinkname: "Møt en skyarkitekt"
sidebarlinkurl: "/demo"
sidebarlinkname2: ""
sidebarlinkurl2: ""
socialmedia: ""
devops: ""
card: "safespring-harddrive.svg"
sidebarimage: ""
background: ""
socialmediabild: ""
form: ""
toc: ""
language: "nb"
author: "Gabriel Paues"
section: "Løsningsoversikt"
aliases:
- /solution-brief/repartitioning-root-fs-on-nvme-instances-safesprin/
---
{{< ingress >}}
Standard rotfilsystem på en NVMe-instans i l2-serien på Safesprings plattform er ext4, men i noen tilfeller kan brukere trenge å opprette ekstra partisjoner eller bruke et annet filsystem.
{{< /ingress >}}

Noen ganger ønsker du å partisjonere denne disken på nytt i flere partisjoner dersom applikasjonen du vil kjøre krever en egen partisjon eller et annet filsystem enn standard ext4 som rotfilsystemet fra skybildet bruker. En applikasjon som krever dette er MongoDB, så hvis du planlegger å sette opp en MongoDB-klynge, må du gjøre dette på klyngenodene.

### Partisjonering av NVMe-rotfilsystem i Safespring

1. Begynn med å opprette en ny instans i OpenStack med en flavor i l2-serien for å sikre at noden har lokal NVMe.
2. Under opprettelsen av instansen, på fanen "Configuration", velg "Manual" for diskpartisjonering.
3. I feltet "Customization Script", skriv inn følgende cloud-config-kode:   ```yaml
   #cloud-config
   # Ubuntu 18.04+
   resize_rootfs: false
   write_files:
     - content: |
       # Any text
       path: /etc/growroot-disabled

   runcmd:
     - [sgdisk, -e, /dev/sda]
     - [partprobe]
     - [parted, -s, /dev/sda, mkpart, primary, xfs, "25%", "100%"]
     - [growpart, /dev/sda, 1]
     - [resize2fs, /dev/sda1]
   ```
4. Tilpass koden over etter dine behov. Du kan endre partisjonsstørrelse og filsystem etter behov.
5. Klikk på "Launch Instance" for å opprette instansen.
6. Når instansen er opprettet, koble til via SSH ved å bruke et verktøy som PuTTY.
7. Kontroller diskpartisjonene ved å kjøre følgende kommando. Opprett det nye filsystemet på partisjonen; i dette tilfellet er det XFS. Sørg for at enhetsnummeret X nedenfor samsvarer med det som vises i listen fra fdisk.   ```shell
   bash# sudo fdisk -l
   bash# sudo mkfs.xfs /dev/sdaX
   ```
8. Monter den nye partisjonen ved å kjøre følgende kommando:   ```shell
   bash# sudo mount /dev/sdaX /mnt
   ```
9. Verifiser at partisjonen er montert ved å kjøre følgende kommando:   ```shell
   bash# df -h
   ```
10. Gratulerer! Du har med hell repartisjonert rotfilsystemet og aktivert XFS på den andre partisjonen ved hjelp av cloud-config.