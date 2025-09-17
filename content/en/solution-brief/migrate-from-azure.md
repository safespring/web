---
ai: true
title: "Migrate from Azure Kubernetes Service to CK8s on Safespring"
date: "2020-09-04"
draft: false
tags: ["Svenska"]
dokumentnamn: ""
socialmedia: "/blogg/socialmedia/safespring_social_37.gif"
intro: "This document outlines the steps that should be taken to migrate from Azure Kubernetes Service."
sidebarlinkname: "Read as PDF"
sidebarlinkicon: "fa-file-download"
sidebarlinkurl: "/publications/safespring-migrering-fran-microsoft-azure-kubernetes-service-2021.pdf"
card: "safespring-azure.svg"
sidebarimage: "safespring-azure.svg"
toc: "Contents"
background: "safespring-azure.png"
socialmediabild: ""
language: "en"
section: "Solution Brief"
aliases:
  - /solution-brief/migrate-from-azure/
---
## Migration to Compliant Kubernetes

{{< ingress >}}
This document outlines the steps to migrate from Azure Kubernetes Service.
{{< /ingress >}}

There are many reasons to undertake such a migration. Ensuring Swedish and European legal jurisdiction for GDPR compliance, access to expert support in Swedish, and keeping data safely within Sweden are a few of them. The strong security focus within Compliant Kubernetes is another.

A migration plan necessarily includes an inventory phase, identification of dependencies and how these can be replaced, planning of the work, and tests to ensure functionality. After that, the migration can begin and be verified using the acceptance tests. Continuous documentation and follow-up ensure that important lessons are not lost.

Once the migration is completed, system administration and monitoring in a new environment await. The tools for this are also presented in the document, as well as how they work together to provide a complete solution focused on security and smooth agile development processes.

## Background

{{< ingress >}}
Cloud services have revolutionized how many companies work today.
{{< /ingress >}}

The flexibility of being able to buy, as a service, features that previously did not exist or were hard to build in-house has given many companies renewed innovation capacity and simplified processes. Collaboration features and centralized handling of data and documents have solved the problem of “which is the latest version of the document.” IT and development departments can enable new features with a few clicks to support complex or entirely new processes.

The majority of cloud platforms used by companies today are American. These providers have grown into huge giants with immense innovation power and are a big reason why we now work in entirely new ways within organizations. The problem is that EU and US legal frameworks are not compatible regarding how personal data should be handled. In the EU, GDPR and other information security laws are grounded in the EU constitution, which gives individuals substantial control over their data. In the US, the starting point is laws that give US authorities broad capabilities to access user data to uphold national security.

These differing foundations create a clash that is not easy to resolve legally. For more information on this topic, we recommend [Safespring’s white paper on Schrems II](/schrems), which describes the latest developments following the EU Court of Justice’s invalidation of Privacy Shield, the agreement that use of US cloud services within the EU has relied upon in recent years.

What remains is a number of companies and organizations that, with a foundation of cloud services, have adopted a new way of working without a legal basis to use them. It’s a difficult position because reverting is not easy, while organizations must comply with the law.

### The opportunity to become independent

Frameworks have been developed to remove dependencies on the underlying cloud provider. One such framework is Kubernetes, an orchestration platform for container technology with standardized interfaces for deploying and maintaining applications. Kubernetes provides a foundational layer upon which applications can be managed through standardized definitions. To summarize the technical aspects: Kubernetes helps organizations manage applications and services in a standardized way with high reliability. Since systems and their dependencies are defined as code, it is possible to leverage the knowledge available on the internet and easily deploy complex systems that can replace services provided by established cloud vendors. In other words, it becomes simpler to run in-house the services your organization has become dependent on.

More and more applications are also emerging that replace user-facing services such as Office 365, OneDrive, or Dropbox. If your organization uses Kubernetes to run applications and services, deploying and maintaining these applications becomes manageable.

Safespring is a cloud service provider with data centers in Sweden, which makes legal conflicts with US laws a non-issue. Together with our partner Elastisys, we have developed a joint offering: Compliant Kubernetes, or CK8s. It is a managed service that provides organizations with the foundation needed to achieve independence from the underlying cloud provider. If a company already uses Kubernetes with its current cloud provider, migration becomes easier because all the code describing the systems and services can be reused.

This white paper describes what a migration from Microsoft Azure Kubernetes Service (AKS) looks like, assuming the organization already runs Kubernetes in Azure. Many of the steps also apply to organizations not currently using Azure Kubernetes Service. Assuming Kubernetes continues to be the lingua franca for operating containerized applications, the advantages of running it within the organization are clear. All the work invested in migrating to a standardized platform can be reused if the organization later wants to move its infrastructure elsewhere, since the same infrastructure definitions can be used as long as the target platform is also Kubernetes. This creates flexibility and independence that are otherwise hard to achieve.

### The advantages of Open Source

A major reason many use cloud services is the availability of useful add-on services that reduce time-to-market. However, as much as these services shorten production time, they increase dependency on cloud providers’ ecosystems. An alternative way to reduce production time for your services while decreasing vendor lock-in is to implement systems outside your core delivery using open source. Both approaches let you focus on your application and leave supporting systems aside, but the open source path reduces dependency instead of increasing it.

Open source is built on collaboration, and by engaging with the projects you use (primarily by contributing back bug fixes and improvements), your contributions are reviewed for greater assurance and security. Others using the projects do the same, creating a continuously updated codebase reviewed by many, without license costs. Since many use these projects, there is also a wealth of ready-made code and solutions for deploying and maintaining systems just a few searches away.

### Compliant Kubernetes

Compliant Kubernetes (CK8s) is a CNCF (Cloud Native Computing Foundation) certified Kubernetes distribution, freely available both as open source and as a fully managed service on Safespring. The open source solution suits organizations that prefer to operate Kubernetes and the surrounding tech stack themselves, but want to benefit from a security-hardened Kubernetes distribution specifically tailored for regulated industries, while avoiding maintenance and relying on quarterly updates of the Kubernetes packaging and related projects. The open source variant is also a great complement to a managed service for those who need to deliver their software across a combination of their own data centers, on customer premises, and in public clouds, and want to do so seamlessly with full regulatory compliance. For customers who want it, our partner Elastisys provides both 8/17 and 24/7 support.

### CK8s as open source

- [Source code](https://github.com/elastisys/compliantkubernetes)
- [Documentation](https://compliantkubernetes.io)

### Prerequisites

To run applications in Compliant Kubernetes, the following prerequisites apply:

- An account with Safespring Compute and, if object storage will be used, Safespring Storage.
- One or more domains registered with a registrar that can point to the services. Compliant Kubernetes uses external-dns and cert-manager to dynamically manage both application domain names and automatic certificate handling, so a registrar supported by external-dns is preferable. Since domain name handling does not expose customers’ personal information, from a GDPR perspective you can remain with your current registrar as long as it has a compatible API.

Check which version of Kubernetes is currently running in Azure Kubernetes Service (AKS). To avoid surprises, it is important to run the same version in Compliant Kubernetes.

## Migration plan

{{< ingress >}}
This section covers the steps that should be taken before the actual migration.
{{< /ingress >}}

Inventory of systems running in the organization
Every migration project starts with an inventory of the services and systems running within the organization. Even if what runs in Azure Kubernetes Service (AKS) today is only a subset, there may be dependencies on other systems.

Examples of systems that can create dependencies include:

- {{< inline "Line-of-business systems" >}} These types of systems sometimes linger for a long time, so there may be dependencies on them in all sorts of places. Are these systems running in Azure today, or are they even running in-house or with another hosting partner?
- {{< inline "Integration functions" >}} These types of systems sometimes exist to solve small, specific tasks. They often emerged to integrate one system with another. It may be worth checking how this type of system is called and from where.
- {{< inline "Databases" >}} These are often used by many systems and, depending on how strictly domains have been separated, databases may be called by systems that do not actually belong to the domain where the database resides. By reviewing database connections and logs, you can get a sense of how databases are used in the organization. If not already done, consolidating databases is a project that can be run before the migration itself to simplify the process.
- {{< inline "Email systems" >}} Many systems use email to communicate status or when something goes wrong. Some of these emails may even be machine-read by other systems, making them a link in a process flow. It may be that these accounts are registered in domains other than those for public mail accounts. By reviewing which domains and accounts are used for this type of communication, unpleasant surprises can be avoided.
- {{< inline "Supporting services" >}} Systems in this category include DNS (name resolution), NTP (time synchronization), and various types of service discovery systems. Many of these are likely running in Azure today, but it is important to identify whether they also run internally somewhere.
- {{< inline "Internal applications" >}} Not all systems may have been migrated to Azure (perhaps time reporting or the intranet). There may be hidden dependencies in these systems that are important to identify.

Inventory how secure communication between systems is handled. There are two typical choices:

- Virtual Private Networking (VPN), which routes all communication to and from Azure and the internal environment through a VPN tunnel, or
- applications themselves are responsible for secure communication by using TLS or similar protocols.

If a VPN is used, a new VPN tunnel will need to be set up between the internal environment and Safespring’s environment. This can be done in advance so that communication is up when systems are moved. During the migration phase, an additional VPN tunnel may also need to be set up between Azure and Safespring’s environment if systems are to be moved one at a time.

If the second option is used, things become simpler since you only need to point the communication to Safespring’s environment by changing a DNS record. It may be worth considering this option even if a VPN tunnel is used today, because all types of migrations become easier if applications handle secure communication themselves.

### Inventory of services

Inventory dependencies for the services running in Azure.

- {{< inline "Identity management" >}} How are identity management and permissions handled? Is Azure AD used, and if so, is it called from services running in Azure Kubernetes Service (AKS)? A step that can simplify later is to enable Secure LDAP (a standardized protocol) on Azure AD and adapt the services to use that instead. This will make the migration away from Azure AD much easier.
- {{< inline "Object storage" >}} is a convenient way to store files used by systems at low cost. If object storage is already used in the form of Azure Blob Storage, the data can be migrated to Safespring Storage, which is S3-compatible. Adjustments will be needed so systems use Safespring’s service instead. It may be worth checking whether systems are designed so that the URI to the object storage service can be changed in one place via a variable. If not, it may be worth putting in some effort to make systems configurable in that way, as it will be much easier to repoint later. If object storage is not currently used in the organization, it may be worth considering starting to use it, although that project is preferably scheduled after the migration to minimize degrees of freedom.
- {{< inline "Virtual machines" >}} Are all systems in Azure running as containers, or are some systems running as separate virtual machines? If so, it’s a good idea to examine how these machines are set up and whether there is an easy way to replicate their configuration. There are different ways to migrate virtual machines “as is” using snapshots, but it is recommended to set up the machines from scratch at Safespring for better integration with the platform.
- {{< inline "Database services" >}} at Azure. If these are used, it is good to investigate which variant is running (MySQL, MariaDB, PostgreSQL, or Microsoft SQL). All of these variants can be self-hosted on Safespring’s infrastructure. MariaDB and PostgreSQL are available as databases-as-a-service through the CK8s offering. For high availability, it is recommended to use some form of clustering. For MySQL and MariaDB, that means Galera. PostgreSQL and Microsoft SQL have their own built-in solutions.
- {{< inline "Secret management" >}} A good way to remove passwords and keys from the systems themselves is to use a centralized secret management system. Azure Kubernetes Service (AKS) offers Secret handling by virtue of being based on Kubernetes. These can be used the same way in Compliant Kubernetes. Azure also has the specific service Key Vault. An equivalent is HashiCorp Vault. Adjustments will need to be made in services to switch to HashiCorp Vault, and it is important to identify other systems that also use this functionality.
- {{< inline "Message bus" >}} or message queues. Asynchronous communication between services is often handled via a message bus or queueing system. In Azure, this is Service Bus. Safespring does not offer a corresponding managed service, but recommends that customers install a RabbitMQ cluster. This can run within Compliant Kubernetes, and RabbitMQ is compatible with Azure Service Bus since both support the same API (AMQP 1.0). Thus, a migration should be relatively straightforward, mainly requiring that the new service be pointed to in the applications’ configuration. A modern alternative with superior performance and advanced capabilities is NATS; however, it is not API-compatible with Azure Service Bus.

### Establish a dependency matrix

A controlled migration requires full knowledge of the dependencies between systems. This shows the order in which systems are migrated and which are more central than others. Dependencies can sometimes creep in at unexpected places, so a careful review of how Azure services are configured and which services are used in custom-built systems will pay off when it’s time to migrate.

Hidden dependencies are usually found around central systems, such as identity management (Azure AD), message buses, and/or databases.

It is also important to inventory whether custom-built systems have dependencies in the form of development libraries. If a library tailored for Azure has been used, it needs to be replaced with something agnostic to the underlying platform. This may create a need for adaptations in the application itself.

### Services to be replaced

There are many built-in systems that have an equivalent built with open source. On page 10 there is a collection of about 20. In this step, you also define a list of tests to determine what constitutes a successful migration.

### Azure services as Open Source

We have gathered the most common services in Azure Kubernetes Service and listed their open source equivalents. See the full list at the end of this text. You can easily scroll down by clicking the button below.

{{< localbutton text="See the list" link="#aks-motsvarighet-som-open-source" >}}

### Planning and prioritization

After completing a dependency analysis, you can plan how systems should be migrated. The migration will often involve some form of maintenance window when services are down, so it is important to plan everything to be done and in what order. Inputs to this step also come from the test and assurance phase.

### Testing and assurance

The first thing to test is the services themselves running on the new platform. When that works, the target state is clear, and then you test migration to the test environment to understand which steps are needed for a successful migration.

After this, load tests that mirror production load as closely as possible should be performed. Naturally, the closer the tests come to production load, the lower the risk of surprises when the migration is carried out.

## Migration

{{< ingress >}}
If the tests have been carried out, the migration itself will not be difficult.
{{< /ingress >}}

During a migration, unexpected events can occur that could not be foreseen. Typical issues include the test database not being identical to the production database, which can lead to unexpected effects. Other common problems are that a different set of keys and secrets were used in production than in test, which may need to be updated if services do not fully use a centralized secret manager (e.g., HashiCorp Vault).

### Load balancer

To ensure high availability for production workloads, a load balancer solution will need to be set up. Safespring can provide a solution where you get access to two or more virtual machines that can balance the load across specific instances running on the platform. The service itself involves a few manual steps during setup but is easy to manage once in operation. The choice of software for load balancing is up to you, but the most popular options are HAProxy or Traefik. You can also install MetalLB to get a system that provides a Kubernetes-delivered and -compatible service offering dynamic load-balancing functionality.

### Follow-up

After the migration is completed, run the tests from the list that defines a successful migration. Unit tests created to test the systems before and after migration should be run to ensure all functionality works as intended. In cases where deviations occur, review them to determine whether additional changes are needed before go-live.

### Documentation

Documentation should be maintained throughout the process, but a separate step is also needed to compile what has been produced. In addition to documentation of how things are set up and how systems interact, it is also important to include lessons learned.

## After the migration

{{< ingress >}}
Operating and monitoring your applications after the migration ensures you remain in control afterwards.
{{< /ingress >}}

### Operations and monitoring

Applications in Compliant Kubernetes are monitored in two ways:

1. Metrics and monitoring data are stored in Prometheus and visualized in Grafana.
2. Application logs are stored in an Elasticsearch cluster and visualized and processed in Kibana.

These software tools enjoy strong support from the global DevOps community and are generally seen as best practice for these tasks in Kubernetes contexts.

Many software systems expose metrics in Prometheus-specific format precisely because the system is so entrenched in the community. Adapters exist for various contexts, making data collection smooth. For example, Java applications exposing data via Java Management Extensions (JMX) can have their data automatically imported into Prometheus. Grafana allows system administrators to create dashboards via Prometheus’s query language, PromQL, thereby obtaining a graphical overview of both the infrastructure’s state (such as disk space, network traffic, and CPU usage) and key values for application performance (such as the number of logged-in users or active database transactions).

In this way, engineers can keep track of the “four golden signals” of monitoring:

- Latency
- Traffic
- Errors
- Saturation

Application logs are automatically retrieved from containers, and their content is made searchable in Kibana via tagged metadata. Administrators can quickly determine which node in the Compliant Kubernetes cluster a given log entry came from and perform root cause analysis to troubleshoot effectively. If the log data consistently follows a certain structure, or is even in a hierarchical format such as JSON, this structure can be turned into proper fields in Elasticsearch, further simplifying data processing.

### Continuous Integration and Deployment

To enable an agile way of working, many organizations rely on systems that automatically build, test, and deploy software in a Continuous Integration and Deployment (CI/CD) process, preferably immediately upon code check-in to a version control system. Azure offers Azure DevOps Pipelines as a complete solution. Other popular options include GitLab, CircleCI, ArgoCD, Octopus Deploy, TeamCity, and Jenkins, where organizations administer at least some of these themselves.

Since systems for building and deploying software in a CI/CD process are typically not dependent on users’ personal data, it is likely possible, even under GDPR, to continue using the systems your organization already has. Organizations that, therefore, have processes and considerable expertise in a certain set of products or services may wish to stay with them.

Neither Safespring nor Compliant Kubernetes dictates a specific CI/CD solution; both can be made compatible with all of them. For security reasons, Compliant Kubernetes recommends storing build artifacts, container images, in the container image registry included with Compliant Kubernetes.

As an officially CNCF-certified Kubernetes distribution, Compliant Kubernetes is fully compatible with all CI/CD systems that support Kubernetes.

### Policy as Code

Continuous security and compliance via Policy as Code. Compliant Kubernetes is a Kubernetes distribution with a strong focus on security. Ensuring system security is not a one-time activity but a continuously ongoing process. Compliant Kubernetes supports this process in the following ways:

- Continuous vulnerability scanning of container images for known issues via Trivy, integrated into the Harbor container image registry.
- Intrusion detection via Falco, which alerts when software in a container starts behaving in unauthorized ways, for example, by attempting network connections to systems it normally does not, or by starting to read or write files not intended by the developers.
- Restriction of network traffic via firewall rules expressed as Kubernetes Network Policies. These are implemented and enforced by the Calico networking software.
- Automatic certificate management via cert-manager, allowing TLS certificates to have short lifetimes and be rotated frequently automatically.
- Protection against incorrect configuration via Open Policy Agent, which intercepts, inspects, and only allows API calls to the Kubernetes API server that meet defined policy requirements. For example, a policy can forbid configurations containing known default passwords or prevent development systems from connecting to production databases.

These aspects of the security process are a concretization of the organization’s policies. Since these policies are configured as code that can be version-controlled and subject to the organization’s code review requirements, it becomes easier to meet compliance demands such as ISO-27001.

Continuous scanning for both known vulnerabilities and behavior that indicates unknown issues also reduces the risk of data breaches. And network traffic limitations that applications themselves cannot modify reduce the risk that any intrusion will have a large impact.

## Summary

{{< ingress >}}
A migration plan includes an inventory phase, discovering dependencies, planning the work, and tests that ensure functionality.
{{< /ingress >}}

This document has compiled the steps an organization needs to take to successfully migrate from Microsoft Azure and Azure Kubernetes Service to Safespring and Compliant Kubernetes. There are many reasons to undertake such a migration. Ensuring Swedish and European legal jurisdiction for GDPR compliance, access to expert support in Swedish, and keeping data safely within Sweden are a few of them. The strong security focus within Compliant Kubernetes is another.

A migration plan necessarily includes an inventory phase, identification of dependencies and how these can be replaced, planning of the work, and tests to ensure functionality. After that, the migration can begin and be verified using the acceptance tests. Continuous documentation and follow-up ensure that important lessons are not lost.

Once the migration is completed, system administration and monitoring in a new environment await. The tools for this are also presented in the document, as well as how they work together to provide a complete solution focused on security and smooth agile development processes.

## AKS equivalents as Open Source {#aks-motsvarighet-som-open-source}

| Service in Azure                              | Function                                                               | Open Source                                                                                                    | Managed by Safespring                               |
| --------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Azure Kubernetes Service (AKS)                | Managed Kubernetes                                                     | [Compliant Kubernetes](/services/compliant-kubernetes)                                                         | {{< icon "fa-solid fa-circle-check" "#32CD32" >}}   |
| Azure Virtual Machine                         | Virtual machines where Kubernetes runs (master and worker nodes)       | N/A                                                                                                            | {{< icon "fa-solid fa-circle-check" "#32CD32" >}}   |
| Azure Blob Storage                            | Object storage                                                         | N/A                                                                                                            | {{< icon "fa-solid fa-circle-check" "#32CD32" >}}   |
| Azure Mysql, Azure MariaDB, Azure PostgreSQL  | Databases                                                              | Galera cluster (for MySQL or MariaDB) with ProxySQL running in Kubernetes or on separate virtual machines      | {{< icon "fa-solid fa-circle-check" "#32CD32" >}}   |
| Azure Service Bus                             | Messaging for communication between services                           | RabbitMQ or NATS running in Kubernetes or on separate virtual machines                                         | {{< icon "fa-solid fa-circle-check" "#32CD32" >}}   |
| Azure Monitor                                 | Monitoring                                                            | Prometheus + Grafana                                                                                           | {{< icon "fa-solid fa-circle-check" "#32CD32" >}}   |
| Azure Monitor                                 | Logging                                                                | Elasticsearch                                                                                                  | {{< icon "fa-solid fa-circle-check" "#32CD32" >}}   |
| Azure Container Registry                      | Container registry                                                     | Harbor                                                                                                         | {{< icon "fa-solid fa-circle-check" "#32CD32" >}}   |
| N/A                                           | Intrusion detection                                                    | Falco                                                                                                          | {{< icon "fa-solid fa-circle-check" "#32CD32" >}}   |
| Azure Active Directory                        | Identity Provider                                                      | Dex                                                                                                            | {{< icon "fa-solid fa-circle-check" "#32CD32" >}}   |
| Azure AD Domain Services                      | Management of an organization’s users, resources, and their permissions | OpenLDAP                                                                                                       | {{< icon "fa-solid fa-dash" "#FA690F" >}}           |
| Azure Key Vault                               | Centralized and secure secret management                               | HashiCorp Vault                                                                                                | {{< icon "fa-solid fa-dash" "#FA690F" >}}           |
| Azure Cosmos DB (Table API)                   | Key-value store                                                        | TiKV                                                                                                           | {{< icon "fa-solid fa-dash" "#FA690F" >}}           |
| Azure Functions                               | Serverless runtime                                                     | OpenFaaS / OpenWhisk                                                                                           | {{< icon "fa-solid fa-dash" "#FA690F" >}}           |
| Azure Virtual Network                         | Private networking                                                     | Calico                                                                                                         | {{< icon "fa-solid fa-dash" "#FA690F" >}}           |
| Azure DevOps Pipelines                        | CI/CD                                                                  | Jenkins, ArgoCD, and others                                                                                    | {{< icon "fa-solid fa-dash" "#FA690F" >}}           |