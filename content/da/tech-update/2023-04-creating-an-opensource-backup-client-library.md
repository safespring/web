---
ai: true
title: "Sådan opretter du et open source-klientbibliotek til sikkerhedskopiering"
date: "2023-04-21"
publishDate: "2023-04-23"
intro: "Udforsk vores open source-klientbibliotek til Cloutility API, der forenkler registrering og administration af backupklienter."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknisk opdatering"
author: "Daniel de Oquiñena"
language: "da"
toc: ""
sidebarlinkname: "Cloutility-api-client-repositoryet"
sidebarlinkurl: "https://github.com/safespring-community/cloutility-api-client"
sidebarlinkname2: ""
sidebarlinkurl2: ""
aliases:
  - /blogg/2023/2023-04-creating-an-opensource-backup-client-library/
---
{{< ingress >}}
Hos Safespring brænder vi for open source-teknologier. Vores platform bygger på flere open source-produkter, og vi er forpligtet til at give tilbage til fællesskabet, når det er muligt.
{{< /ingress >}}

Nogle gange har vi dog brug for en løsning, der endnu ikke findes. Det var tilfældet, da vi ville skabe et værktøj, der gjorde tilmeldingsprocessen for backup-klienter til vores backup-løsning enklere.

Safesprings backup-løsning er baseret på IBM Spectrum Protect med Auwau’s Cloutility som front-end. Denne kombination giver en stærk backup-løsning i enterprise-klassen, og Cloutility leverer både en kundeportal og et rigt API. Vi kunne imidlertid ikke finde et eksisterende klientbibliotek, der kunne bruges til at tilgå Cloutility API’et.

Derfor besluttede vi at tage udfordringen op selv i håbet om at gavne ikke kun Safespring, men også andre organisationer og brugere, der anvender en lignende opsætning. For et par uger siden begyndte vi derfor at arbejde på projektet "cloutility-api-client". Biblioteket er langt fra funktionskomplet, men gør det muligt at tilgå Cloutility API’et og indeholder omkring 15 metoder til at arbejde med forretningsenheder, kunder og noder. Disse metoder gør det muligt at udføre opgaver som at oprette og slette forretningsenheder og kunder samt at administrere noder og deres tilknyttede data.

Derudover skrev vi også et simpelt CLI-værktøj, der kan bruges til generelle formål, så operatører hurtigt og nemt kan interagere med Cloutility API’et, og som implementerer alle metoder, der aktuelt findes i cloutapi-package.

Styrken ved et bibliotek ligger i, at det kan udvides med skræddersyede værktøjer og integrationer, og vi håber at se værktøjer skabt af fællesskabet, som yderligere kan forenkle tilmeldingsprocessen og forbedre livscyklusstyringen af backup-noder.

Derfor byder vi bidrag fra fællesskabet velkommen for at udvide de tilgængelige funktioner og levere specialiserede værktøjer, der opfylder specifikke behov. Vores mål er som altid at skabe en robust og fleksibel løsning, der let kan tilpasses forskellige miljøer og anvendelsesscenarier, og vi håber, at vores arbejde med Cloutility API-klienten vil muliggøre dette.

{{% note "Anbefalet læsning" %}}
Dyk dybere ned i open source-verdenen for håndtering af backup-klienter ved at læse vores seneste artikel om [Automatisering af tilmelding af backup-noder med Cloutility API-klienten.](/blogg/2023/2023-04-using-cloutility-api-client-to-auto-enroll-backup-clients/) God læselyst!
{{% /note %}}

## Forstå nøglebegreber

Udforsk en kort guide, der forklarer centrale termer i vores artikel om det open source Cloutility API-klientbibliotek. Få en dybere forståelse af de begreber og teknologier, der diskuteres, så du bedre kan værdsætte deres betydning for håndtering og tilmelding af backup-klienter.

{{% accordion title="Open source" %}}
Open source refererer til software eller projekter, hvis kildekode er gjort tilgængelig for offentligheden, så alle kan se, bruge, modificere og distribuere koden. Det fremmer samarbejde, innovation og transparens og opfordrer til deling af viden og ressourcer i udviklerfællesskabet.
{{% /accordion %}}

{{% accordion title="Backup-klient" %}}
En backup-klient er et softwareprogram eller værktøj, der kører på en enhed (såsom en computer eller server) og har til opgave at sende data til en backup-server eller -system. Formålet er at beskytte og bevare data ved at oprette kopier eller backups, som kan gendannes i tilfælde af datatab, korruption eller andre problemer.
{{% /accordion %}}

{{% accordion title="API" %}}
API, en forkortelse for Application Programming Interface, er et sæt regler og protokoller, der gør det muligt for forskellige softwareapplikationer at kommunikere og dele data med hinanden. API’er definerer, hvordan information anmodes om, sendes og modtages mellem softwaresystemer, hvilket gør det muligt for udviklere at bygge applikationer, der udnytter funktionerne og dataene fra andre tjenester.
{{% /accordion %}}

{{% accordion title="IBM Spectrum Protect" %}}
IBM Spectrum Protect, tidligere kendt som Tivoli Storage Manager (TSM), er en løsning til databeskyttelse og -gendannelse, der hjælper organisationer med at administrere og sikre deres kritiske data. Den tilbyder centraliseret, automatiseret administration af backup og gendannelse og understøtter en bred vifte af platforme, lagerenheder og applikationer. IBM Spectrum Protect hjælper med at sikre dataintegritet, minimere nedetid og reducere driftsomkostninger.
{{% /accordion %}}

{{% accordion title="Auwau’s Cloutility" %}}
Auwau’s Cloutility er en softwareløsning, der leverer en brugervenlig kundeportal og et API til styring af backup- og gendannelsestjenester. Den fungerer som en front-end til backup-løsninger i enterprise-klassen som IBM Spectrum Protect og gør det lettere for brugere at administrere og overvåge deres backups. Cloutility strømliner backup-processen og forbedrer den samlede brugeroplevelse.
{{% /accordion %}}

{{% accordion title="CLI-værktøj" %}}
CLI, en forkortelse for Command Line Interface, er en tekstbaseret grænseflade, der gør det muligt for brugere at interagere med et computerprogram eller operativsystem ved at skrive kommandoer i stedet for at bruge en grafisk brugerflade (GUI). Et CLI-værktøj er et hjælpeprogram, der bruger kommandolinjen til at udføre opgaver eller operationer og giver erfarne brugere en hurtig og effektiv måde at interagere med et system på.
{{% /accordion %}}

{{< accordion-script >}}