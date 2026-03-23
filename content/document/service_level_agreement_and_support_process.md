---
title: "Service Level Agreement and Support Processes"
date: 2026-03-23
draft: false
intro: "This SLA states customers sole and exclusive remedy for any failure by Safespring to meet the target."
documentimage: "safespring_card_21.jpg"
sidebarlinkname: ""
sidebarlinkicon: ""
sidebarlinkurl: ""
general: "yes"
toc: "Table of contents"
language: "En"
noindex: "x"
---

*All information contained in this document is provided in confidence to
the parties involved for the sole purpose of clarifiyng the service
level agreement and support process for Safespring AB ("Safespring").*

*This requirement does not cover information which is published or known
to the parties involved from some source other than Safespring or
"Vendor".*

## Service level agreement 

This SLA states customers sole and exclusive remedy for any failure by
Safespring to meet the target.

During the Term of the agreement under which Safespring has agreed to
provide its services to customer, the included service will provide a
monthly uptime percentage to Customer of at least 99.9%. If Safespring does
not meet the target, and if customer meets its obligations under this
SLA, customer will be eligible to receive the financial credits
described below.

This SLA states customers sole and exclusive remedy for any failure by
Safespring to meet the target. Capitalized terms used in this SLA, but not
defined in this SLA, have the meaning set forth in the Agreement. If the
Agreement authorizes the resale or supply of Safespring's services under a
partner program, then all references to Customer in this SLA mean
Partner, and any Financial Credit(s) will only apply for impacted
Partner order(s) under the Agreement.

## Definitions

The following definitions apply to the SLA:

### Covered Service

-   **COMPUTE**   
    Safespring Compute service including local storage and block storage.
-   **STORAGE**   
    Safespring object Storage Service accessed via S3.
-   **BACKUP**  
    Safespring cloud backup service.
-   Instances hosted as part of the Safespring Service.

### Unavailability

Unavailability for a service is measured from the service is
interrupted, and until the service is accepting customer load.

-   For Compute instances: Loss of external connectivity or persistent
    disk access for all running Instances, when Instances are placed
    across two or more physical nodes in Safespring sites. A compute host
    is available when the instances that were running when the service
    became unavailable has been issued the boot command, or for a
    network interruption when they can recieve and send network traffic
    again. For flavors with local disks, the SLA does not cover
    unavailability caused by hardware issues.
-   For Storage: API for reading, writing or listing data is not
    responding.
-   For Backup: Loss of external connectivity from clients to the backup
    service.

### Unavailability Period

"Unavailability Period" means a period of one or more consecutive
minutes of Unavailability, excluding planned maintenance.

### Monthly Uptime Percentage

"Monthly Uptime Percentage" means total number of minutes in a 30 day
month, minus the number of minutes of Downtime suffered from all
Downtime Periods in a month, divided by the total number of minutes in a
month.

### Financial Credit

"Financial Credit" means the following:

-   **MUP** Monthly Uptime Percentage
-   **PMB** Percentage of monthly bill for the respective Covered
    Service affected which did not meet SLO that will be credited to
    future monthly bills of Customer.

| **MUP** | **PMB** |
|---|---|
| 99.00 % - < 99.90 % | 10% |
| 95.00 % - < 99.00 % | 20% |
| 00.00 % - < 95.00 % | 50% |

### Customer Must Request Financial Credit

In order to receive any of the Financial Credits described above,
Customer must notify Safespring within thirty days from the time Customer
becomes eligible to receive a Financial Credit.

### Maximum Financial Credit

The aggregate maximum number of Financial Credits to be issued by
Safespring to Customer for any and all Downtime Periods that occur in a
single billing month will not exceed 50% of the amount due by Customer
for the Covered Service for the applicable month. Financial Credits will
be made in the form of a monetary credit applied to future use of the
Service and will be applied within 60 days after the Financial Credit
was requested.

## Calculation of Uptime and Downtime

Downtime is defined as the actual time that a service or a product is
not performing as agreed, and/or is not available to customer for normal
use. Any period where the response time is noticeably slower than it
would be in an optimized and fully operative technical environment,
shall also be considered as Downtime.

Unavailability for a service is measured from the service is
interrupted, and until the service is accepting customer load. For
Compute service, that means that a compute host is available when the
instances that were running when the service became unavailable has been
issued the boot command, or for a network interruption when they can
recieve and send network traffic again. The customer is responsible for
monitoring their own instances, and ensuring that their services is
running after an interruption.

Downtime is permitted in all agreed maintenance windows, provided
however that Safespring has made reasonable efforts to limit the downtime
during the agreed maintenance window.

Safespring uses maintenance windows to maintain infrastructure platforms
and the operational environment. Such maintenance windows shall be
announced 5 working days in advance. One maintenance window per service/
month can be accepted, and each maintenance window shall be limited to
as few hours as necessary, and shall be scheduled to such weeks/hours
that has as little negative impact on Safespring and Customers businesses
as possible.

Exceptionally, in case of external and server security threats not under
Safespring's control, Safespring may announce additional maintenance windows,
for instance to install hot-fixes or security patches which could not
have been installed by Safespring during any preceding maintenance window.

Safespring shall give customer prior written notice at least 5 working days
in advance of any expected downtime, or as soon as possible. Further,
Safespring shall give customer written notice immediately in case of
unexpected downtime.

### Service

-   Compute
-   Storage
-   Backup

### Service Level Guarantee

-   99,9 % -- 24/7/365

### Delivery/ Measurment
- Delivery at Customer connection point.
- Monitoring and measurement at Datacenter

### Calculation 

As described under chapter *Calculation of availability* above

### Service Credits

See section for *Service Credits*.  
Delivery / Service level is measured at NREN connection point.

## Using support

### Customer obligation

The following cooperation obligations are to be fulfilled by the
customer for the contractual provision of the service desk services by
Safespring:

-   Register support case via support@safespring.com
-   Subscribe to updates on the status page: https://status.safespring.com

When communicating with Safespring staff regarding support case via other
communication channels (e.g. phone or chat) please always refer to
registered ticket reference number (e.g. RT#1234) obtained from Safespring
ticketing system when registered a support case via support@safespring.com

In order to facilitate the best possible support experience please
provide as much relevant information possible when opening a support
case, like:

-   Problem description including severity level
-   Site and project name
-   Instance IDs of affected instances
-   Timestamps
-   Console output, error codes or relevant logs
-   Protocols, ports

for detailed template please see documention under chapter *status and
support*: https://docs.safespring.com/

## Support process 

### Customer support contact points

For handling and resolution of incidents, E-mail is used for
communications. E-mails sent to the support email address are
automatically added to the ticket history for the incident.

The Safespring support team is available 08-17 all workdays.

-   **E-MAIL** **support@safespring.com**  
    Main communication channel.
-   **PHONE NORWAY** **+47 23 65 32 23**  
    Used for critical incidents, 24/7 or escalations
-   **PHONE SWEDEN** **+46 8 551 073 74**  
    Used for critical incidents, 24/7 or escalations

The Customer reports incidents to Safespring via email. Critical incidents
shall be reported by phone in addition. The Customer applies severity
level to the incident which determine further treatment of the incident.

If the incident is not solved within time limits or is in risk being
exceeded, escalation routines will be initiated.

The escalation routines shall be initiated if:

-   Customer has not received necessary feedback about the status of
    ongoing error correction within defined response time
-   Incidents are not corrected or that solution time is not set within
    defined response time related to escalation level 3.

Each party have the responsibility to perform escalation within its own
organization.

### Escalation level and contact information

Each party have the responsibility to perform escalation within its own
organization.

{{% note color="clear-blue" title="ESCALATION LEVELS" %}}
#### Escalation level ONE

Safespring Support manager -- Duty Manager  
Norway: +47 23 65 32 23  
Sweden: +46 8 551 073 74

#### Escalation level TWO 

Head of Engineering -- Head of Operations  
Phone: +31 637 17 46 61

#### Escalation level THREE 

CEO -- Phone: +46 708 37 55 66

{{% /note %}}

## Incident level description and response time

Safespring effectively manages all levels of incidents with continuous
support and rapid responses to ensure minimal disruption.

{{% note color="red" icon="fa-solid fa-1" title="Critical Incident" %}}
## Critical Incident - P1

### Defenition
Incidents that cause loss of service or continuous
    instability of mission-critical functionality and have no
    workaround. The Incident causes or may cause a material adverse
    effect on Customer's business or material parts of the operational
    services are unavailable.

### Safespring Incident Handling
The Safespring is working continuous 24/7
    with the Incident until it is resolved or a satisfactory
    "work-around" is established. There is regular feedback to the
    Customer on the progression of the error handling. Safespring
    management will create a dialogue with the manufacturer's support
    department. If necessary, the Safespring will require on-site
    assistance from the manufacturer.

### Response Time
Phone call alert (24/7): Immediate  
E-mail within working hours: 30 minutes.

### Resolution Time
Given by SLA
{{% /note %}}

{{% note color="orange" icon="fa-solid fa-2" title="Major Incident" %}}
## Major Incident - P2

### Defenition
Incidents that are impairing, but not causing loss of
    service or loss of mission-critical functionality. Intermittent
    issues that affect missioncritical functionality. The Incident
    causes or may cause an adverse effect on Customer's business or a
    critical function does not work, or work with response times that
    are inferior to the agreed.

### Safespring Incident Handling
Safespring is working continuous 24/7
    with the Incident until it is resolved or a satisfactory
    "work-around" is established. Safespring will inform the Customer
    regarding progression of the Incident handling. Safespring's management
    will create a dialogue with the manufacturer's support department.
    If necessary, the Safespring will require on-site assistance from the
    manufacturer.

### Response Time
E-mail: 2 hours within working hours

### Resolution Time
 As soon as practically possible

{{% /note %}}
{{% note color="green" icon="fa-solid fa-3" title="Minor incident" %}}
## Minor incident - P3

### Defenition
All other incidents

### Safespring Incident Handling

Safespring is working with the Incident during normal business hours
until it is resolved or a satisfactory "work-around" is established.
Safespring's management will create a dialogue with the manufacturer's
support department if necessary.

### Resolution Time
E-mail: End of next business day.

### Resolution Time
In a coming software update.
{{% /note %}}

## Contact information

{{< contact 
    picture="rob.webp" 
    title="Head of Engineering" 
    name="Rob Haverkamp" 
    phone="+31 637 17 46 61" 
    email="rob.haverkamp@safespring.com" 
>}}

{{< contact 
    picture="johan.webp" 
    title="CEO" 
    name="Johan Harrysson" 
    phone="+46 708 37 55 66" 
    email="johan.harrysson@safespring.com" 
>}}