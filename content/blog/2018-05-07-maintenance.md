+++
title = "Datacentre maintenance in Stockholm"
date = "2018-05-04"
draft = false
tags = ["compute, storage, maintenance"]
showthedate = true
+++

## Maintenance in Stockholm [sto1] datacentre

This post describes planned work on our compute and storage services at 
our datacentre in Stockholm monday may 7. from 17:00-22:00 CEST. 
All impacted customers have previously been informed by email.

<!--more-->

### [sto1] Storage (S3) maintenance 2018-05-07 17:00-22:00

Safespring is planning a maintenance window on Monday 7.5 from 17:00 to
22:00 at our sto1 (Stockholm) datacenter.

#### Planned work

Switch software upgrades on front and backend switches in the S3 storage
cluster. Verification of network redundancy configurations.

#### Impact

The Storage S3 service will be intermittently unavailable during the
maintenance window as the switch upgrades progress, are tested, and
completed.

#### Customer actions needed

None, if you accept that reads and writes might fail during the window.

### [sto1] Compute maintenance 2018-05-07 17:00-22:00

Safespring is planning a maintenance window on Monday 7.5 from 17:00 to
22:00 at our sto1 (Stockholm) datacenter. This will require controlled
shutdown of all customer instances for the duration of the work.

#### Planned work

Switch software upgrades on front and backend switches in the S3 storage
cluster. Re-enable redundant network configurations.

#### Impact

The compute service will be shut down completely during the window. Any
instances running at 17:00 will be shut down by Safespring, then started
again when the work is completed.

##### Customer actions needed

None, if your systems are able to shut down and start again without
manual intervention.

If manual intervention IS required, you must complete shutting down
before 17:00. Follow the information at https://status.safespring.com to
determine when work finishes. Only instances RUNNING at 17:00 will be
started again by Safespring.
