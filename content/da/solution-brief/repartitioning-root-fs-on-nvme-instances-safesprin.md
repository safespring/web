---
ai: true
title: "Ompartitionering af rodfilsystemet på NVMe-instanser"
date: 2023-03-02T13:58:58+01:00
draft: false
tags: ["English"]
intro: "Dette løsningsnotat giver en trin-for-trin-vejledning i, hvordan man ompartitionerer root-filsystemet på en NVMe-instans i l2-serien på Safesprings platform."
background: ""
sidebarlinkname: "Mød en cloud-arkitekt"
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
language: "da"
author: "Gabriel Paues"
section: "Løsningsoversigt"
aliases:
- /solution-brief/repartitioning-root-fs-on-nvme-instances-safesprin/
---
{{< ingress >}}
Standard-root-filsystemet på en NVMe-instans i l2-serien på Safesprings platform leveres med et ext4-filsystem, men i nogle tilfælde kan brugere have behov for at oprette yderligere partitioner eller bruge et andet filsystem.
{{< /ingress >}}

Nogle gange vil du gerne ompartitionere disken i flere partitioner, hvis den applikation, du vil køre, kræver en separat partition eller et bestemt filsystem, som ikke er det standard ext4, som root-filsystemet i cloud-imaget bruger. En applikation, der kræver dette, er MongoDB, så hvis du har planer om at opsætte en MongoDB-klynge, skal du udføre dette på dine klyngenoder.

### Ompartitionering af NVMe-root-filsystem på Safespring

1. Start med at oprette en ny instans i OpenStack med en flavor i l2-serien for at sikre, at noden har lokal NVMe.
2. Under oprettelsen af instansen skal du på fanen "Configuration" vælge "Manual" for diskpartitioneringsindstillingen.
3. I feltet "Customization Script" skal du indtaste følgende cloud-config-kode:   ```yaml
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
4. Tilpas ovenstående kode efter dine behov. Du kan ændre partitionsstørrelse og filsystem efter behov.
5. Klik på "Launch Instance" for at oprette instansen.
6. Når instansen er oprettet, SSH ind på instansen med et værktøj som PuTTY.
7. Kontrollér diskpartitionerne ved at køre følgende kommando. Opret det nye filsystem på partitionen; i dette tilfælde er det XFS. Sørg for, at enhedsnummeret X nedenfor svarer til det fra fdisk-udskriften.   ```shell
   bash# sudo fdisk -l
   bash# sudo mkfs.xfs /dev/sdaX
   ```
8. Monter den nye partition ved at køre følgende kommando:   ```shell
   bash# sudo mount /dev/sdaX /mnt
   ```
9. Kontroller, at partitionen er blevet monteret, ved at køre følgende kommando:   ```shell
   bash# df -h
   ```
10. Tillykke! Du har med succes ompartitioneret rodfilsystemet og aktiveret XFS på den anden partition ved hjælp af cloud-config.