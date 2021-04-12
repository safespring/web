---
title: "Migrate from Azure Kubernetes Service to CK8s at Safespring"
date: "2020-09-04"
draft: false
author: ""
dokumentnamn: ""
socialmedia: "/blogg/socialmedia/safespring_social_37-2.gif"
intro: "This white paper summarises the steps that need to be taken to migrate from Azure Kubernetes Service."
sidebarlinkname: ""
Section: "White Paper"
sidebarlinkicon: "fa-file-download"
card: "safespring_card_37.jpg"
eventbild: "safespring_background_37.jpg"
socialmediabild: "safespring_social_37-2.gif"
toc: "Table of contents"
language: "En"
---

## Migration to Compliant Kubernetes

{{< ingress >}}
This white paper summarises the steps that need to be taken to migrate from Azure Kubernetes Service.
{{< /ingress >}}

There are many reasons for such a migration, including adhering to Swedish and European legislation for GDPR compliance, access to expert support in Swedish, and the secure storage of data in Sweden. Another reason is the emphasis on security in Compliant Kubernetes.

A migration plan contains the necessary inventory phase, the identification of dependencies and how these can be replaced, work planning, and tests that ensure functionality. Migration can then commence and is verified by way of the requisite tests. Ongoing documentation and follow-ups mean that everything that is learnt along the way is retained for future reference.

Once migration is complete, system administration and monitoring await in a new environment. The tools for this are also presented in the document, which also looks at how they work together to provide an all-in-one solution with an emphasis on security and smooth, agile development processes.

## Background

{{< ingress >}}
Cloud services have revolutionised how many companies now work.
{{< /ingress >}}

The flexibility of having a service that enables you to buy functions that previously didn’t exist or that were difficult to build yourself has made many companies more innovative and simplified their processes. Collaborative functions and the centralised management of data and documents have solved the problem of keeping track of the latest version of a document. In just a few clicks, IT and development departments can turn on new functions that support complex or completely new processes.

The majority of the cloud platforms that companies currently use are American. These players are hugely innovative giants and are a big reason for organisations working in completely new ways today. The problem lies in the fact that legislation between the EU and the US is incompatible in terms of how personal data is handled. Within the EU, the General Data Protection Regulation (GDPR) and other information security laws are based on EU constitutional law, which gives individuals considerable control over their data. In the US, however, the starting point is legislation that gives US authorities the ability to infiltrate the data that users leave behind in order to uphold national security.

These different bases create a legal sticking point that’s not entirely easy to sort out. For more information on this topic, we recommend reading Safespring’s white paper on Schrems II (https://www.safespring.com/en/whitepaper/schrems2/), which explains the latest developments in connection with the annulment of Privacy Shield by the European Court of Justice. In recent years, Privacy Shield has been the agreement that US cloud services have relied on within the EU.

There are now a number of companies and organisations that have adopted new ways of working that are rooted in cloud services, but a legal basis for their use is lacking. This is a difficult position to be in, as it’s not easy to go back. Meanwhile, organisations must adhere to the law.

### The ability to become independent
Frameworks have been developed that remove dependencies on the underlying cloud service provider. One such framework is Kubernetes, which is an orchestration platform for container technology with standardised interfaces for the commissioning and maintenance of applications. Kubernetes creates a base plate on which applications can be managed by way of standardised definitions. In less technical terms, Kubernetes helps organisations to manage their applications and services in a standardised way with a high level of reliability. Because the systems and their dependencies are defined by code, it’s possible to leverage the knowledge available online and easily commission complex systems to replace the services of established cloud service providers. Consequently, it’s easier to run the services yourself that your organisation has become dependent on.

In addition, there are more and more applications that are replacing the more user-friendly services like Office 365, OneDrive, or Dropbox. If an organisation uses Kubernetes to run its applications and services, the commissioning and maintenance of these applications becomes more manageable.

Safespring is a cloud service provider with data centres in Sweden, which makes legal conflicts with the US a non-issue. Together with our partner Elastisys, we’ve developed a joint offer – Compliant Kubernetes, or CK8s. This is a managed service that gives organisations a base plate that frees them from the underlying cloud service provider. If a company already uses Kubernetes within its current cloud service provider, migration is even easier as it’s possible to reuse all the code that describes the systems and services that are being run.

This white paper describes the migration process from Microsoft Azure Kubernetes Service (AKS). The starting point is that the organisation is already running Kubernetes in Azure. Several of the steps are applicable even to organisations that don’t currently use Azure Kubernetes Service. Assuming that Kubernetes continues to be the lingua franca for the operation of containerised applications, there is an obvious advantage in running it in the organisation. All the effort that goes into migrating to a standardised platform can be reused should the organisation wish to move its infrastructure elsewhere, as the same infrastructure definitions can be used as long as the receiving platform is also Kubernetes. This creates a level of flexibility and independence that’s otherwise difficult to achieve.

### The benefits of open source
A big reason why many people use cloud services is that they provide useful additional services that reduce the time to market. Although these services reduce production times, they increase dependence on the cloud service providers’ ecosystems. One way of reducing production times for your services while also reducing dependency on a supplier is to implement open-source systems that are outside your core delivery. Although both approaches allow you to focus on your application and put support systems to one side, the open-source approach reduces dependency instead of increasing it.

Open source is based on collaboration. By getting involved in the projects you use (primarily by posting back the bug fixes and improvements you make), what you contribute is reviewed to ensure greater security and reliability. The fact that others using the projects are doing the same thing ensures that there is a continuously updated code base, reviewed by many and without licensing costs. Since many people use the projects, there’s also a lot of code and several solutions are just a few searches away when commissioning and maintaining the systems.

### Compliant Kubernetes
Compliant Kubernetes is certified by the Cloud Native Computing Foundation (CNCF) for Kubernetes distribution that is freely available both as open source and as a fully managed service at Safespring. The open-source solution is suitable for organisations that are happy to operate Kubernetes and the surrounding technology stacks by themselves, but which also want to take advantage of Kubernetes distribution with toughened security that is specially adapted for regulated industries, all while not having to worry about maintenance and being able to leverage quarterly updates of Kubernetes packages and ancillary projects. The open-source option is also a good complement to a managed service for those who need to deliver their software via their own server halls, out at their customers, and in public clouds, and who want to do this seamlessly with full regulatory compliance. For customers who are interested, our partner Elastisys provides both 8/17 and 24/7 support.

### Compliant Kubernetes as open-source code

- Source code: https://github.com/elastisys/compliantkubernetes
- Documentation: https://compliantkubernetes.io

### Conditions
To be able to run applications in Compliant Kubernetes, the following conditions apply:

- Account for Safespring Compute and possibly Safespring Storage if object storage is to be used.
- One or more domains registered with a registrar that can single out the services.

Compliant Kubernetes uses external-dns and cert-manager to dynamically take care of the applications’ domain names as well as automatic certificate management, so a registrar supported by external-dns is preferable. As domain name management does not involve the exposure of personal data, it is possible to remain with your registrar from a GDPR point of view, provided that the registrar has a compatible API.

Find out which version of Kubernetes is currently being run in Azure Kubernetes Service (AKS). To avoid surprises, it’s important to run the same version in Compliant Kubernetes.


## Migration plan

{{< ingress >}}
This section covers the steps that should be taken before the actual migration takes place.
{{< /ingress >}}

Inventory of systems running in the organisation
Each migration project starts with an inventory of the services and systems that are run within the organisation. Even if what is currently run in Azure Kubernetes Service (AKS) is only a subset, there may be dependencies on other systems. Examples of systems that can create dependencies are:

- {{< inline "Business logic systems" >}} This type of system can sometimes linger for a long time, and so there may be dependencies on them in all sorts of places. Are these systems currently running in Azure, or are they running purely in-house or with another hosting partner?
- {{< inline "Integration functions" >}} This type of system sometimes exists to solve small, specific tasks. They’re often added to integrate one system with another. It may be worthwhile checking how this type of system is called and where from.
- {{< inline "Databases" >}} These are often used by many systems and depending on the stringency of the division between different domains, databases can be called from systems that don’t really belong to the system domain where the database is located. By going through database connections and logs, you can get an idea of how the databases are used in the organisation. If this hasn’t already been done, database consolidation can be a project that is run before the actual migration takes place in order to simplify the process.
- {{< inline "E-mail systems" >}} There are very many systems that use e-mail to communicate statuses or if something goes wrong. Some of these e-mails can even be read mechanically by other systems, making them a link in a process flow. It may be that these accounts are registered in domains other than those for public e-mail accounts. By going through the domains and accounts used for this type of communication, nasty surprises can be avoided.
- {{< inline "Support functions" >}} Systems in this category include DNS (name lookup), NTP (time synchronisation), and various types of service discovery systems. Although many of these are securely run in Azure today, it’s important to identify if they’re also run internally somewhere.
- {{< inline "Internal applications" >}} Not all systems may have migrated to Azure (perhaps time reporting or internal web). There may be various dependencies hidden in these systems that are important to identify.    


Make an inventory of how securely communication between systems is handled. There are two typical choices:

- Virtual Private Networking (VPN), which allows all communications to and from Azure and the internal environment to go through a VPN tunnel, or
- The applications themselves take care of secure communication by using TLS or similar protocols.

If a VPN is used, a new VPN tunnel will need to be set up between the internal environment and Safespring’s environment. This can be done in advance so that communication is up and running when the systems are moved over. In the migration phase, an additional VPN tunnel may also need to be set up between Azure and Safespring’s environment should it be the case that the systems must be moved over one at a time.

It will be easier if the second option is used as this is just a matter of re-directing communication to Safespring’s environment with a change of a DNS record. It may be worthwhile looking at this option even if a VPN tunnel is currently used, as all types of migrations will be easier if the applications handle secure communication themselves.

### Inventory of services running in Azure
Make an inventory of dependencies for the services running in Azure.

- {{< inline "Identity management" >}} How are identity management and rights managed? Is Azure AD used? If it is, is it called from the services running in Azure Kubernetes Service (AKS)? One step that can make things easier later on is the enabling of Secure LDAP (a standardised protocol) on Azure AD and customisation of the services to use this instead. This will make the migration from Azure AD much easier when the time comes.
- {{< inline "Object storage" >}} is a practical way to cheaply store files used by systems. If object storage is already in use in the form of Azure Blob Storage, the data can be migrated to Safespring Storage, which is S3 compatible. Adjustments may need to be made in order for the systems to use Safespring’s service instead. It may be worth checking if the systems are designed to enable the simple changing of the object storage service’s URI in one place with one variable. If not, it may be worthwhile spending some time on making sure that the systems are adapted in such a way that it will be much easier to redirect them later on. If object storage is not currently used in the organisation, it may be worth considering starting to do so, even if such a project is added after migration takes place so as to minimise the degrees of freedom.
- {{< inline "Virtual machines" >}} Are all systems in Azure run as containers or are there some systems that are run as separate virtual machines? If so, it’s a good idea to look at how these machines are set up and if there’s an easy way to replicate their configuration. Although there are different ways to migrate virtual machines “as is” with snapshots, the recommendation is to set the machines up with Safespring from the outset to ensure better integration with the platform.
- {{< inline "Database services" >}} with Azure. If these are used, it’s a good idea to look at which variant is running (MySQL, MariaDB, PostgreSQL, or Microsoft SQL). You can run all these yourself on Safespring’s infrastructure. MariaDB and PostgreSQL can be obtained as a database as a service through the Ck8s offer.  To ensure their high levels of availability, it is recommended that some form of cluster be used. Galera is used for MySQL and MariaDB. PostgreSQL and Microsoft SQL have their own built-in solutions.
- {{< inline "Secret management" >}} A good way of removing passwords and keys from the systems themselves is to use a central secret management system. By virtue of being Kubernetes-based, Azure Kubernetes Service (AKS) provides the management of Secrets. These can be used in the same way in Compliant Kubernetes. Azure also has the specific Key Vault service. An equivalent service is the Vault software by the company Hashicorp. Adjustments need to be made in the services in order to switch to Hashicorp Vault, and it’s important to identify other systems that also use this functionality.
- {{< inline "Message bus" >}} or message queues. Asynchronous communication between services is often handled using a message bus system or a message queue system. Azure has the Service Bus service. Although Safespring does not offer a similar service, we recommend that customers install a RabbitMQ cluster. This can be run within Compliant Kubernetes, and RabbitMQ is compatible with Azure Service Bus as both support the same API (AMQP 1.0). Consequently, migration should be relatively uncomplicated and primarily require that the new service be pointed out in the application configuration. A modern alternative with superior performance and advanced functionality is NATS, but it is not API compatible with Azure Service Bus.

### Establish a dependency matrix
A controlled migration requires complete knowledge of the dependencies that exist between the systems. It shows the order in which the systems are migrated and which systems are more central than others. Dependencies can sometimes creep into unexpected places, so a thorough review of how Azure’s services are configured, and which services are used in proprietary systems will pay off when it’s time to migrate.

Hidden dependencies are usually found around central systems, such as identity management (Azure AD), messaging buses, and/or databases.

In addition, it’s important to make an inventory of proprietary systems and whether they have dependencies in the form of development libraries. If a library adapted for Azure has been used, it needs to be replaced with something that is agnostic to the underlying platform. This can give rise to adaptations in the application itself.

### Services in Azure as Open Source
There are many embedded systems that have an equivalent built with open-source code. There is a list of around 20 on page 10. In this step, a list is compiled of the tests to be performed in order to define what a successful migration is.

{{< localbutton "See the list" "#aks-counterparts-as-open-source" >}}

### Planning and ranking
After the dependency analysis has been completed, the migration of the systems can be planned.  Migration will often include some form of service window for when the services are down, so it’s important to plan everything to be done and in what order. Input values for this step also come from the testing and assurance phase.

### Testing and assurance
The first thing to be tested is the services themselves that are running in the new platform. When this works, the target image is then ready and migration to the test environment is tested to get an idea of what steps are needed for a successful migration.

After this, load tests that reflect the production load must also be performed as far as this is possible. Of course, the closer the test load is to the production load, the less risk there is of surprises when migration takes place.

## Migration

{{< ingress >}}
If the tests have been carried out, the actual migration won’t be too difficult.
{{< /ingress >}}

During migration, unexpected events can occur that could not have been foreseen. These typically include a test database that is not identical to the production database, which can have unexpected effects. Other common problems include keys and secrets being set up for use differently in production than in tests, which may need to be updated if the services do not fully use central secret management (e.g., Hasicorp Vault).

### Implementation load balancer
To ensure a high level of availability for production loads, a solution for load balancers will need to be set up. Safespring can provide a solution where you get access to two or more virtual machines that can balance the load over specific instances running on the platform. Although the service as such includes some manual steps in setting up, the service is easy to manage once in operation. There’s a choice of load balancer software, but the most popular is HAProxy or Traefik. You can also install MetalLB to get a system that offers a Kubernetes-delivered and compatible service that provides dynamic load-balancing functionality.

### Follow-up
Once migration is complete, tests are performed from the list that defines a successful migration. Device tests created to test the systems before and after migration must be run to ensure that all functionality works properly. Any deviations are reviewed to find out if any further adjustments are needed before commissioning.

### Documentation
Although documentation must be kept throughout the process, a separate step is also needed to compile the documentation that has been produced. In addition to documentation on how things are set up and how the systems interact, it’s important to have learnt experiences.

## Once migration is complete

{{< ingress >}}
Operation and monitoring of your applications post-migration ensures that you have control after the migration.
{{< /ingress >}}

### Operation and monitoring
Applications in Compliant Kubernetes are monitored in two ways:

1. Metrics and monitoring data are saved in Prometheus and visualised in Grafana.
2. Application logs are saved in an Elasticsearch cluster and visualised and processed in Kibana.
These programs enjoy good support from the global DevOps community, and it is widely seen as best practice to use them for these tasks in the context of Kubernetes.


Many programs expose metrics in a Prometheus-specific format precisely because the system is so entrenched in the community. Adapters are available for different contexts to ensure smooth data collection, such as for Java applications that expose data via Java Management Extensions (JMX), where data can be automatically imported into Prometheus. Grafana allows system administrators to create dashboards via Prometheus’s query language, PromQL, and thus get a graphical overview of the state of the infrastructure (e.g., hard disk space, network traffic, and processor usage), as well as key values for application performance (e.g., the number of logged-in users or active database transactions).

In this way, engineers can keep track of the four golden signs in monitoring:

- Latency
-	Traffic
-	Errors
-	System saturation

Application logs are retrieved from the containers automatically and their content is made searchable in Kibana by way of tagged metadata. This allows administrators to quickly determine which node in the Compliant Kubernetes cluster a certain log extract came from and to perform root cause analysis for effective troubleshooting. If the log data consistently follows a certain structure, or even if it is in a hierarchical format such as JSON, this structure can be made into regular fields in Elasticsearch and thereby further simplify the processing of the data.

### Continuous Integration and Deployment
To enable an agile way of working, many organisations rely on systems that allow them to automatically build, test, and deploy software in a CI/CD process, preferably directly when checking code into a version control system. Azure offers Azure DevOps Pipelines as a complete solution. Other popular alternatives are Gitlab, CircleCI, ArgoCD, Octopus Deploy, TeamCity, and Jenkins, where organisations administer at least some of these themselves.

As the systems for building and deploying software in a CI/CD process are not typically dependent on the user’s personal data, it’s likely that, even under the GDPR, they will continue to use the systems the organisation already has for this. Organisations that therefore have processes and a lot of knowledge within a certain series of products or services may therefore want to stay with these.

Neither Safespring as such nor Compliant Kubernetes dictates a specific CI/CD solution but can be made compatible with all. For security reasons, Compliant Kubernetes recommends that construction artefacts – container images – be saved in the container image register included in Compliant Kubernetes.

As an official CNCF-certified Kubernetes distribution solution, Compliant Kubernetes is fully compatible with all CI/CD systems that support Kubernetes.

### Policy as Code
Continuous security and compliance via Policy as Code. Compliant Kubernetes is a Kubernetes distribution solution with an emphasis on security. Ensuring system security is not a one-time event but a continuous process. Compliant Kubernetes supports this process as follows:

- {{< inline "Security scanning" >}} of container images for known errors is performed continuously by the Trivy software integrated in the container image register Harbor.
- {{< inline "Intrusion detection" >}} via Falco warns when the software in a container starts behaving in an unauthorised manner, for example by trying to make network connections to systems it otherwise does not connect to, or by starting to write or read files that the programmers did not intend.
- {{< inline "Limitation of network traffic" >}} via firewall rules is expressed in terms of Kubernetes Network Policies. These are implemented and adhered to by the network software Calico.
- {{< inline "Automatic certificate management" >}} via cert-manager means that network encryption certificates can be given a short service life and are rotated often and automatically.
- {{< inline "Protection against incorrect configuration" >}} with Open Policy Agent: the latter captures, inspects, and API calls to the Kubernetes API server and only transmits those that meet defined policy requirements. An example here is that a policy may prohibit configuration containing known default passwords or development systems from connecting to production databases.

These aspects of the security process are a concretisation of the organisation’s policies. As these policies are configured via code that can be version-controlled and subjected to the organisation’s requirements for code review, the organisation can more easily meet regulatory compliance requirements in accordance with, for example, ISO-27001.

Continuous scanning for both known errors and warnings for behaviours that indicate unknown errors also reduces the risk of data breaches. Meanwhile, restrictions on network traffic that the applications themselves cannot modify reduce the risk that any intrusions will have a major effect.

## Summary

{{< ingress >}}
A migration plan contains an inventory phase, the identification of dependencies, work planning, and tests that ensure functionality.
{{< /ingress >}}

This document summarises the steps an organisation needs to take in order to successfully migrate from Microsoft Azure and Azure Kubernetes Service to Safespring and Compliant Kubernetes. There are many reasons for such a migration, including adhering to Swedish and European legislation for GDPR compliance, access to expert support in Swedish, and the secure roosting of data in Sweden. Another reason is the emphasis on security in Compliant Kubernetes.

A migration plan contains the necessary inventory phase, the identification of dependencies and how these can be replaced, work planning, and tests that ensure functionality. Migration can then commence and is verified by way of the requisite tests. Ongoing documentation and follow-ups mean that everything that is learnt along the way is retained for future reference.

Once migration is complete, system administration and monitoring await in a new environment. The tools for this are also presented in the document, which also looks at how they work together to provide an all-in-one solution with an emphasis on security and smooth, agile development processes.

## AKS counterparts as Open Source

{{< en-aks-alternatives >}}
