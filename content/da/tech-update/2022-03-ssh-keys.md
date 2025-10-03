---
ai: true
title: "Bedste praksis for SSH-nøgler i Cloud/OpenStack"
date: "2022-03-17"
intro: "Lad os gennemgå nogle bedste fremgangsmåder for håndtering af SSH-nøgler og afklare almindelige misforståelser."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknisk opdatering"
author: "Jarle Bjørgeengen"
language: "da"
toc: "Indholdsfortegnelse"
aliases:
  - /blogg/2022-03-ssh-keys
  - /blogg/2022/2022-03-ssh-keys/
---
{{< ingress >}}
For Linux-/Unix-baserede cloud-instanser aktiveres den indledende root-adgang til instanserne ved hjælp af SSH-nøgler. I dette indlæg gennemgår vi bedste praksis og ting, du skal huske, når du håndterer ssh-nøgler for at give root-adgang til instanser.
{{< /ingress >}}

## Resumé (TL;DR)

- Det uheldigt navngivne "OpenStack-nøglepar" indeholder ingen hemmeligheder, kun en offentlig SSH-nøgle.
- SSH-nøglepar er ikke det samme som et OpenStack-nøglepar.
- SSH-nøglepar bør oprettes i et betroet miljø på brugerens computer. Det bør være af typen RSA. Den private nøgle skal opbevares i et krypteret hemmelighedslager og må aldrig eksponeres uden for brugerens lokale site/miljø.
- Et "OpenStack-nøglepar" er knyttet til brugeren, der opretter det, ikke til et specifikt projekt.
- Ingen bekymrer sig om SSH-værtsnøgler, men det burde de.

## Baggrund

Når du klargør instanser på en hvilken som helst cloud-platform, får du en virtuel server med et basisoperativsystem som Centos, Ubuntu, Debian, FreeBSD osv., afhængigt af hvilket cloud-image instansen er klargjort fra. Du kan bruge images, der er tilgængelige i IaaS-platformen (Infrastructure as a Service), eller uploade dine egne, så længe imaget er forberedt til at blive brugt med den IaaS-platform, du anvender. I Safesprings tilfælde skal imaget være lavet til OpenStack-IaaS.

Mekanismen, der automatiserer konfigurationen af et cloud-image til en cloud-instans, skal give operativsystemets root-adgang til brugeren, der ejer den klargjorte instans. Dette er for at give brugeren mulighed for at konfigurere instansen yderligere til noget nyttigt (installere pakker, konfigurere tjenester osv.).

For Linux-/Unix-baserede systemer gives denne adgang via secure shell-dæmonen (SSHD), en tjeneste som alle Linux-/Unix-baserede systemer har inkluderet, og som altid er en del af et Linux-/Unix-baseret cloud-image. Selvom SSHD kan tillade, at brugere logger ind med adgangskode, er denne mulighed slået fra i alle cloud-images beregnet til produktion, da [adgangskoder udgør en sikkerhedsrisiko][sshpw].

[sshpw]: https://blog.runcloud.io/why-authentication-using-ssh-public-key-is-better-than-using-password-and-how-do-they-work/

I stedet gives adgang ved hjælp af en offentlig SSH-nøgle, som placeres i `authorized_keys`-filen for cloud-brugeren i imaget. Cloud-brugeren er den lokale bruger (i instansens `/etc/passwd|shadow`), der bruges til at logge ind på instansen med, og derefter blive root ved at bruge `su` eller `sudo`.

For at få operativsystemadgang til en cloud-instans med en SSH-klient skal du:

- Sikre, at den offentlige nøgle er lagt ind i cloud-brugerens `authorized_keys`-fil i instansen
- Bruge det korrekte cloud-brugernavn til imaget: dvs. centos for Centos, ubuntu for Ubuntu osv. (Google er din ven her.)
- Have den private nøgle, der matcher den offentlige nøgle i instansens `authorized_keys`-fil, tilgængelig for din klient.

Indsættelsen af den offentlige nøgle i cloud-brugerens `authorized_keys`-fil udføres af "cloud-init", når du fortæller OpenStack, hvilken offentlig SSH-nøgle (Openstack-nøglepar) der skal bruges med instansen.

Vi kan altså sætte pris på, at der sker en masse bag kulisserne for at brugerne sikkert kan bootstrappe root-adgang til de klargjorte instanser. Openstack genbruger blot allerede eksisterende mekanismer fra længe før "cloud-alderen". Det er blot pakket ind i noget nyt kaldet "cloud-init". Ingen magi, faktisk!

## Bedste praksis

### Offentlig vs. privat

Et nøglepar består af en offentlig og en privat nøgle. Navnene er lige så beskrivende, som de lyder. Den private nøgle skal holdes fortrolig, da den indeholder hemmeligheden, du bruger til at logge ind med.

Den offentlige nøgle indeholder ingen hemmeligheder. Kendskab til denne nøgle kan ikke give adgang til noget som helst nogen steder.

I Openstack er termen "nøglepar" uheldigt navngivet. Den oversættes til "offentlig nøgle", fordi det kun er den offentlige del af nøgleparret, der gemmes af Openstack.

Den bedste praksis for at oprette nøglepar til cloud-instanser er at gøre det i et betroet miljø hos dig selv og derefter oprette et OpenStack-nøglepar ved at importere den offentlige nøgle fra det lokalt genererede nøglepar. På den måde får hverken cloud-udbyderen eller nogen imellem nogensinde adgang til din private nøgle.

Det siger sig selv, at den private nøgle udelukkende bør eksponeres for parter (brugere, scripts, playbooks osv.), som skal have root-adgang til instansen; derfor bør den opbevares i et krypteret hemmelighedslager og kun eksponeres efter need-to-know-princippet.

En konsekvens af denne tilgang er, at du ikke bør bruge OpenStack (GUI, API, CLI) til at generere nøgleparret, fordi den private nøgle så ikke vil være så privat som muligt.

### Offentlige nøgler er knyttet til Openstack-brugere

Openstack-nøglepar, som indeholder den offentlige del af nøgleparret, ejes af brugeren, der oprettede dem, uanset projekt. Så OpenStack-nøglepar er ikke en projektressource, men en brugerressource. Derfor kan en bruger se (GUI) eller liste (CLI) sine nøgler uanset hvilket OpenStack-projekt, brugeren er i.

Endnu en gang: OpenStack-nøglepar indeholder kun den offentlige nøgle, og det er ikke et problem at dele den med hele verden, hvis du vælger at gøre det.

En bruger kan importere så mange nøglepar (offentlige nøgler) til OpenStack, som vedkommende ønsker. Dette er nyttigt, hvis man vil adskille root-adgang for forskellige sæt af instanser ved at knytte forskellige nøglepar (offentlige nøgler) til de forskellige sæt af instanser og derefter give adgang til de lokale private nøgler, der matcher de sæt, som den lokale part skal have adgang til.

En anden måde at adskille og/eller overtage fuld kontrol over adgangen på er at bruge det OpenStack-leverede nøglepar kun til at konfigurere din egen autentificerings-/autoriseringsmekanisme og derefter fjerne adgangen via cloud-brugeren ved at fjerne dens `authorized_keys`. For at forhindre, at den bliver genindsat i `authorized_keys`-filen ved genopbygning af instansen, kan man også fjerne nøgleparret (offentlig nøgle) fra Openstack. Dette fjerner også nødadgangen, hvis den auth-metode, brugeren satte op, er fejlkonfigureret eller fejlfungerende, og brugeren låses permanent ude.

### Offentlig SSH-værtsnøgle

Ud over de SSH-nøglepar, der bruges til at give brugere adgang, findes også SSH-værtsnøglen. Dette er metoden, en vært bruger til entydigt at identificere sig over for tilsluttede klienter. Det er op til klienten at stole på denne værtsnøgle ved første kontakt. Den besked har vi alle set:
```
The authenticity of host 'foo.example.net (x.x.x.x)' can't be established.
ECDSA key fingerprint is SHA256:bbFasR3yR1ellOSPnLOjYTWkAdGNnhNnUybkbrf5apc.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```
Siger vi ja, gemmes fingeraftrykket i vores `known_hosts`-fil og bliver i praksis betroet ved efterfølgende adgang.

Det rigtige at gøre, før man svarer ja og stoler på, at SSH-tjenesten på værten faktisk er den, den udgiver sig for at være, er at sammenligne fingeraftrykket i prompten med et kendt fingeraftryk af den fjerne servers værtsnøglefil. Det kan du gøre med outputtet fra `ssh-keygen -l -f <ssh-host-key-file>` på den server, du forsøger at logge ind på.

Hmm, det er lidt en Catch-22, ikke? Hvordan kan jeg køre en kommando på en vært, jeg endnu ikke er logget ind på? Måske er det derfor, at de fleste brugere ignorerer det og accepterer risikoen for, at nogen udfører et man-in-the-middle (MITM)-angreb netop i det øjeblik, hvor den første tillid etableres. Antag, at du accepterer nøglens fingeraftryk uden at verificere det? I så fald siger du: «Jeg er tilstrækkeligt overbevist om, at ingen forfalsker min kommunikation lige nu, og jeg accepterer at stole på dette fingeraftryk uden at verificere det».

Medmindre du er blandt det store flertal, der tilsyneladende er okay med denne praksis, bør du overveje at udvikle automatisering, for eksempel med cloud-init, som på sikker vis sender serverens SSH-værtsnøglefingeraftryk hjem til dig og bruger det til at generere SSH known hosts, som faktisk er kendte.

Mere om [SSH MITM][ssh-mitm]

[ssh-mitm]: https://github.com/ssh-mitm/ssh-mitm

## Nøglehåndtering

For at bevare kontrollen over SSH-nøgler som adgangsmekanisme skal man etablere gode værktøjer og rutiner. Det kan variere, men [dette blogindlæg][kmgmt] gennemgår nogle vigtige ting at tænke over.

[kmgmt]: https://www.beyondtrust.com/blog/entry/ssh-key-management-overview-6-best-practices