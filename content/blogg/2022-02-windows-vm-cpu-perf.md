---
title: "CPU Performance improvement on windows"
date: "2022-02-16"
intro: "Did you know that windows suffer poor CPU-performance with Openstack and KVM's default settings?"
draft: false
tags: [""]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Tech update"
language: "En"
toc: "Table of contents"
---
{{< ingress >}}
In this blog post, we'll go through some virtual machine optimizations that were done based on poor application performance (CPU bound) for one of our customers
{{< /ingress >}}
## Background

We were recently contacted by a client using windows 2019 server operating system. They experienced higher CPU load and slower response times when using our platform compared to other IaaS solutions.

Our general internal experience with windows is that it had stable performance across compute/hypervisor hosts, and that it got better performance when we installed newer hardware (as expected). For some reason we had never tested against other cloud providers, thus we were unaware of the problem.

## Investigations
The client started out tracing the applicaiton and looked for possible differences in code execution paths between platforms. This process yielded performance improvements for the application on all platforms, however the difference between us and other plattforms (as measured by the client) was still way too much to be expected. As a result we started investigating and doing som general benchmarking in a sandbox environment. This investigations did not exhibit a stellar performance, but - as previously noted - the performance did not differ significantly between hypervisor hosts. A stable bad performance can usually rule out issues with single hypervisor hosts.

When experiencing consistent site wide bad performance on a specific set of virtual machines this is normally either caused by being presented with the wrong type of virtual hardware or using bad (or no) drivers for the virtual hardware.

Virtual platforms usually have specific drivers for each guest os type to make them able to use the virtual hardware in the most efficient way possible. These are ideally baked into the virtual image used when installing the OS. In addition, the host system can some times present different kinds of virtual hardware based on which OS is using the system.

In our case there were drivers baked into the windows image used, so that should not be the problem. The virtual hardware was what seemed to be a normal virtual machine, much like the other non-windows instances we were running.

While doing some searching around the topic of windows and kvm (which we use for virtualization), we found some info regarding hyper-v for kvm [^1],[^2],[^3],[^4] - which according to the documentation could lead to a pretty massive performance boost. To enable these additions settings had to be done in each instances' XML config file. The problem is that Openstack authoritatively writes this file on instance boot, which means that any changes made to the XML (which is only read at boot) will be overwritten at boot.

[^1]: https://leduccc.medium.com/improving-the-performance-of-a-windows-10-guest-on-qemu-a5b3f54d9cf5
[^2]: https://techblog.web.cern.ch/techblog/post/ostype-property-for-windows-images-on/
[^3]: https://openstack-in-production.blogspot.com/2017/02/ostype-property-for-windows-images-on.html 
[^4]: https://bugs.launchpad.net/nova/+bug/1400315

## The solution

....was embarrasingly simple once discovered. It was not really obvious that just adding the image property `os_type=windows` would pose such dramatice CPU performance boost. The implemantiation of that boost comes form the fact that  openstack will add some «Hyper-V Enlightenments» to the KVM XML-config of the VM created from that image when that image property is set for new instances created from that image. The property is also inherited if a volume is created from that image, and subsequently an instance is created to boot from that volume[^4].

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

After this change windows application performance is on par with other platforms. A warm thank you to the client that helped us discover this, to the benefit of all our windows customers. This property is now a standard setting, such that all windows instances in our new platform will get this improvement automatically. Let's hope this blog post can notify other Openstack operators of this subtle but important setting for windows users.
