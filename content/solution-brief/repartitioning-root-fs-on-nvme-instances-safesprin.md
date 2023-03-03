---
title: "Repartitioning Root Filesystem on NVMe Instances"
date: 2023-03-02T13:58:58+01:00
draft: false
tags: ["English"]
intro: "This solution brief provides step-by-step instructions on how to repartition the root filesystem on an NVMe instance in the l2-series on Safespring's platform."
background: ""
sidebarlinkname: "Meet a cloud Architect"
sidebarlinkurl: "/en/demo"
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
language: "En"
---

{{< author-gabriel >}}

{{< ingress >}}
The default root filesystem on an NVMe instance in the l2-series on Safespring's platform comes with an ext4 filesystem, but in some cases, users may need to create additional partitions or use a different filesystem.
{{< /ingress >}}

Sometimes you would like to repartition this disk into several partitions  if the application you want to run demands a separate partition or a certain filesystem that is not the default ext4 that the root filesystem from the cloud image is running by default. One application that demands this is MongoDB so if your aiming at setup a MongoDB cluster you will need to perform this on your cluster nodes.

### Repartitioning NVMe Root FS in Safespring
1. Start by creating a new instance in OpenStack with a flavor in the l2-series to ensure that the node have local NVMe.
2. During the instance creation process, on the "Configuration" tab, select "Manual" for the disk partitioning option.
3. In the "Customization Script" field, enter the following cloud-config code: 
	```yaml
	#cloud-config
	# Ubuntu 18.04+
	resize_rootfs: false
	write_files:
	  - content: |
	    # Any text
	    path: /etc/growroot-disabled

	runcmd:
	  - [ sgdisk, -e, /dev/sda ]
	  - [ partprobe ]
	  - [ parted, -s, /dev/sda, mkpart, primary, xfs, "25%", "100%" ]
	  - [ growpart, /dev/sda, 1 ] 
	  - [ resize2fs, /dev/sda1 ]
	```
4. Modify the above code as per your requirements. You can change the partition size and file system according to your needs.
5. Click on "Launch Instance" to create the instance.
6. Once the instance is launched, SSH into the instance using a tool like PuTTY.
7. Check the disk partitions by running the following command. Create the new filesystem on the partition, in this case it is XFS. Ensure that the device number X below corresponds to the one from the listing from fdisk.
	```shell
	bash# sudo fdisk -l
	bash# sudo mkfs.xfs /dev/sdaX 
	```
8. Mount the new partition by running the following command:  
	```
	bash# sudo mount /dev/sdaX /mnt
	`
9. Verify that the partition has been mounted by running the following command:  
	```
	bash# df -h
	`
10. Congratulations! You have successfully repartitioned the root filesystem and enabled XFS on the other partition using cloud-config.