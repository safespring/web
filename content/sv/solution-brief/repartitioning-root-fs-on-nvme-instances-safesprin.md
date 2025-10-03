---
ai: true
title: "Ompartitionering av rotfilsystemet på NVMe-instanser"
date: 2023-03-02T13:58:58+01:00
draft: false
tags: ["English"]
intro: "Denna lösningsguide innehåller steg-för-steg-instruktioner om hur du partitionerar om rotfilsystemet på en NVMe-instans i l2-serien på Safesprings plattform."
background: ""
sidebarlinkname: "Möt en molnarkitekt"
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
language: "sv"
author: "Gabriel Paues"
section: "Lösningsöversikt"
aliases:
- /solution-brief/repartitioning-root-fs-on-nvme-instances-safesprin/
---
{{< ingress >}}
Standardrotfilsystemet på en NVMe-instans i l2-serien på Safesprings plattform är ext4, men i vissa fall kan du behöva skapa ytterligare partitioner eller använda ett annat filsystem.
{{< /ingress >}}

Ibland kan du behöva repartitionera disken i flera partitioner om applikationen du vill köra kräver en separat partition eller ett annat filsystem än det ext4 som rotfilsystemet i molnavbilden använder som standard. Ett exempel är MongoDB; om du planerar att sätta upp ett MongoDB-kluster behöver du göra detta på dina klusternoder.

### Repartitionera NVMe-rotfilsystemet i Safespring

1. Börja med att skapa en ny instans i OpenStack med en flavor i l2-serien för att säkerställa att noden har lokal NVMe.
2. Under instansens skapande, på fliken "Configuration", välj "Manual" som alternativ för diskpartitionering.
3. I fältet "Customization Script", ange följande cloud-config-kod:   
```yaml
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
4. Ändra koden ovan efter dina behov. Du kan ändra partitionsstorleken och filsystemet enligt dina behov.
5. Klicka på ”Launch Instance” för att skapa instansen.
6. När instansen har startats, anslut via SSH till instansen med ett verktyg som PuTTY.
7. Kontrollera diskpartitionerna genom att köra följande kommando. Skapa det nya filsystemet på partitionen, i det här fallet är det XFS. Kontrollera att enhetsnumret X nedan motsvarar det som visas i listningen från fdisk.   
```shell
   bash# sudo fdisk -l
   bash# sudo mkfs.xfs /dev/sdaX
   ```
8. Montera den nya partitionen genom att köra följande kommando:   
```shell
   bash# sudo mount /dev/sdaX /mnt
   ```
9. Verifiera att partitionen har monterats genom att köra följande kommando:   
```shell
   bash# df -h
   ```
10. Grattis! Du har framgångsrikt partitionerat om rotfilsystemet och aktiverat XFS på den andra partitionen med hjälp av cloud-config.