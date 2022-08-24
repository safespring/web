---
title: "Openstack port preserve_on_delete state"
date: "2022-08-22"
intro: "Flipping the preserve_on_delete flag for active openstack ports"
draft: true
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
	A network port that is added automatically to an instance, either upon creation of the instance or via the "Attach Interface -> by Network" option will automatically deleted and have its IP address freed upon detaching the interface or deleting the instance. This can be avoided by creating the port manually before creating the instance or attaching the interface, but if the port is already automatically created there is no way to retroactively keep openstack from deleting it on detachment.
{{< /ingress >}}

## Background
After a quite hasty migration to our newer openstack platform some of the instances ended up on a different datastore to what would be optimal for these instances. To fix this we would normally just take a snapshot of the instance and create a new instance based on the snapshot on the desired datastore. This would however cause the assigned IP addresses to be lost as these were added on creation of the instances. Handling IP address changes would add quite a bit of downtime to what should be a pretty simple and quick migration, so we decided to spend some time looking into how to avoid losing the original IP addresses.

## Investigations
Looking at both the gui(horizon) and cli side of things there seems to be no way of knowing if the port is going to be deleted on detach or not, other than comparing the creation date of the port (via cli) vs the creation date of the instance. If the port is older than the instance there is a good chance it will not be deleted on detach - however this is not a 100% way of deciding if it will be deleted or not as it is also possible to create a port after an instance is created and attaching it manually.

Finding no way of deciding if an interface will be deleted or not from the user(and admin)-facing side of things but seeing that there is an obvious difference in the handling of automatically added vs manually added ports it was time to look at how this process is handled in code.

### Digging into the code
Taking an educated guess, there was a good chance there was some flag being set at the time when a port was attached to an instance. After digging quite a bit this was found in the neutron(v2) code([1][1]).

It seems that if the port already exists on connection, it gets the `preserve_on_delete` flag set to `true` and if it did not exist the flag gets set to `false`.

So.. apparently there should be a `preserve_on_delete` value somewhere in the database. Instead of digging _more_ in the code I just dumped the whole nova database and grepped through that, hoping to find a field containing this value.

The database dump contained the value, but in a bit more complicated form than I was hoping for.

In our version of openstack this data is stored in a json blob (basically a long string) together with a whole lot of other network info, in the `network_info` field in the `instance_info_caches` table.

I am not sure what the reasoning is behind this, I have seen this before - for instance the flavor data for each instance at creation time is stored in this way. My guess is this is supposed to store info that was true at the time it was stored.

Anyway, the field contains (amongst other things) the string `preserve_on_delete=true` or `preserve_on_delete=false` for each port registered to an instance. 

[1]: https://github.com/openstack/nova/blob/stable/train/nova/network/neutronv2/api.py#L2945-L2955

### Conclusion

Modifying the `preserve_on_delete` part of the string for the relevant `instance_uuid` in the `network_info` field in the `instance_info_caches` table in the `nova` database causes the port to be preserved(`true`) or deleted(`false`) upon detachment.

This seems to solve our issue.

