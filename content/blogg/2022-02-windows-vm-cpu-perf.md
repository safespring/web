---
title: "CPU performance improvement on Windows"
date: "2022-02-16"
intro: "Did you know that Windows suffer poor CPU-performance with OpenStack and KVM's default settings?"
draft: false
tags: [""]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Tech update"
language: "En"
toc: ""
---

{{< ingress >}}
In this blog post, we'll go through some virtual machine optimizations. We optimized CPU performance improvement on Windows due to poor application performance for one of our customers.
{{< /ingress >}}

## Background
We were recently contacted by a client using Windows 2019 server operating system. They experienced higher CPU load and slower response times when using our platform than other IaaS-solutions.

Our general internal experience with Windows is that it had stable performance across compute/hypervisor hosts and that it got better performance when we installed newer hardware (as expected). We had never tested against other cloud providers. Thus, we were unaware of the problem.

## Investigations
The client started tracing the application and looked for possible differences in code execution paths between platforms. This process yielded performance improvements for the application on all platforms; however, the difference between us and other platforms (as measured by the client) was still way too much to be expected. As a result, we started investigating and general benchmarking in a sandbox environment. This investigation did not exhibit a stellar performance, but - as previously noted - the performance did not differ significantly between hypervisor hosts. A stable bad performance can usually rule out issues with single hypervisor hosts.

### Wrong type of virtual hardware?
When experiencing consistent site-wide lousy performance on a specific set of virtual machines, this usually is caused by being presented with the wrong type of virtual hardware or using bad (or no) drivers for the virtual hardware.

Virtual platforms usually have specific drivers for each guest operating system type to make them use the virtual hardware in the most efficient way possible. These are ideally baked into the virtual image used when installing the operating system. In addition, the host system can sometimes present different kinds of virtual hardware based on which operating system is using the system.

There were drivers baked into the windows image used in our case, so that should not be the problem. The virtual hardware was what seemed to be a typical virtual machine, much like the other non-windows instances we were running.

### Findings regarding Hyper-V for KVM
While doing some searching around the topic of windows and KVM (which we use for virtualization), we found some info regarding Hyper-V for KVM ([1][1], [2][2], [3][3] and [4][4]) - which, according to the documentation, could lead to a pretty massive performance boost. To enable these additions, settings had to be done in each instances' XML config file. The problem is that Openstack authoritatively writes this file on instance boot, which means that any changes made to the XML (which is only read at boot) will be overwritten at boot.

[1]: https://leduccc.medium.com/improving-the-performance-of-a-windows-10-guest-on-qemu-a5b3f54d9cf5
[2]: https://techblog.web.cern.ch/techblog/post/ostype-property-for-windows-images-on/
[3]: https://openstack-in-production.blogspot.com/2017/02/ostype-property-for-windows-images-on.html
[4]: https://bugs.launchpad.net/nova/+bug/1400315

## The solution

The solution we found was embarrassingly simple. Just add image property `os_type=windows`, and OpenStack will add some «Hyper-V Enlightenments» to the KVM XML-config of the VM created from that image ([4][4]).

The config that is added as a result of setting this property is:

```
<features>
    <acpi/>
    <apic/>
    <hyperv>
      <relaxed state='on'/>
      <vapic state='on'/>
      <spinlocks state='on' retries='8191'/>
    </hyperv>
  </features>
  ....
  <clock offset='localtime'>
    <timer name='pit' tickpolicy='delay'/>
    <timer name='rtc' tickpolicy='catchup'/>
    <timer name='hpet' present='no'/>
    <timer name='hypervclock' present='yes'/>
  </clock>
```

After this change, Windows application performance is on par with other platforms. A warm thank you to the client who helped us discover this to benefit all our windows customers. This property is now a standard-setting.
