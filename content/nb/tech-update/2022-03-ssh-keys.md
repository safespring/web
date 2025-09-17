---
ai: true
title: "Beste praksis for SSH-nøkler i skyen/OpenStack"
date: "2022-03-17"
intro: "La oss gå gjennom noen anbefalte fremgangsmåter for håndtering av SSH-nøkler og avklare vanlige misforståelser."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknologioppdatering"
author: "Jarle Bjørgeengen"
language: "nb"
toc: "Innholdsfortegnelse"
aliases:
  - /blogg/2022-03-ssh-keys
  - /blogg/2022/2022-03-ssh-keys/
---
{{< ingress >}}
For Linux-/Unix-baserte skyinstanser er den første root-tilgangen til instansene aktivert ved bruk av SSH-nøkler. I dette innlegget går vi gjennom noen beste praksiser og ting å huske på når du håndterer ssh-nøkler for å gi root-tilgang til instanser.
{{< /ingress >}}

## Sammendrag (TL;DR)

- Det misvisende navnet «OpenStack-nøkkelpar» inneholder ingen hemmeligheter, kun en offentlig SSH-nøkkel.
- SSH-nøkkelpar er ikke det samme som et OpenStack-nøkkelpar.
- SSH-nøkkelpar bør opprettes i et pålitelig miljø på brukerens egen maskin. Det bør være av typen RSA. Den private nøkkelen skal oppbevares i et kryptert hemmelager og aldri eksponeres utenfor brukerens lokale miljø.
- Et «OpenStack-nøkkelpar» er knyttet til brukeren som oppretter det, ikke til et spesifikt prosjekt.
- Ingen bryr seg om SSH-vertsnøkler, men det burde de.

## Bakgrunn

Når du klargjør instanser i en hvilken som helst skyplattform, får du en virtuell server med et basisoperativsystem som Centos, Ubuntu, Debian, FreeBSD osv., avhengig av hvilket skylag-bilde instansen er klargjort fra. Du kan bruke bilder som er tilgjengelige i Infrastructure as a Service (IaaS)-plattformen, eller laste opp dine egne, så lenge bildet er klargjort for å brukes med IaaS-plattformen du benytter. I Safesprings tilfelle må bildet være laget for OpenStack-IaaS.

Mekanismen som automatiserer konfigurasjonen av et skybilde til en skyinstans må gi root-tilgang i operativsystemet til brukeren som eier den klargjorte instansen. Dette er for at brukeren skal kunne konfigurere instansen videre til å gjøre noe nyttig (installere pakker, konfigurere tjenester osv.).

For Linux-/Unix-baserte systemer gis denne tilgangen via Secure Shell-daemon (SSHD), en tjeneste som alle Linux-/Unix-baserte systemer har inkludert og som alltid er en del av et Linux-/Unix-basert skybilde. Selv om SSHD kan tillate innlogging med passord, er dette alternativet slått av i alle skybilder ment for produksjonsbruk siden [passord utgjør en sikkerhetsrisiko][sshpw].

[sshpw]: https://blog.runcloud.io/why-authentication-using-ssh-public-key-is-better-than-using-password-and-how-do-they-work/

I stedet gis tilgangen ved hjelp av en offentlig SSH-nøkkel som plasseres i `authorized_keys`-filen til skybrukeren i bildet. Skybrukeren er den lokale brukeren (i instansens `/etc/passwd|shadow`) som brukes for å logge inn på instansen, og deretter bli root med `su` eller `sudo`.

For å få tilgang til operativsystemet på en skyinstans med en SSH-klient må du:

- Sørge for at den offentlige nøkkelen er injisert i skybrukerens `authorized_keys`-fil i instansen
- Bruke korrekt skybrukernavn for bildet: f.eks. centos for Centos, ubuntu for Ubuntu, osv. (Her er Google din venn.)
- Ha den private nøkkelen som matcher den offentlige nøkkelen i instansens `authorized_keys`-fil tilgjengelig for klienten din.

Injeksjon av den offentlige nøkkelen i skybrukerens `authorized_keys`-fil gjøres av «cloud-init» når du forteller OpenStack hvilken offentlig SSH-nøkkel (Openstack-nøkkelpar) som skal brukes med instansen.

Vi kan dermed sette pris på at mye skjer i kulissene for at brukerne sikkert skal kunne bootstrappe root-tilgang til de klargjorte instansene. Openstack gjenbruker bare allerede eksisterende mekanismer fra lenge før «skyalderen». Det er bare pakket inn i noe nytt kalt «cloud-init». Ingen magi, egentlig!

## Beste praksis

### Offentlig vs. privat

Et nøkkelpar består av en offentlig og en privat nøkkel. Navnene er like beskrivende som de høres ut. Den private nøkkelen skal holdes konfidensiell, ettersom den inneholder hemmeligheten du bruker til å logge inn.

Den offentlige nøkkelen inneholder ingen hemmeligheter. Kunnskap om denne nøkkelen kan ikke gi tilgang til noe noe sted.

I Openstack er begrepet «nøkkelpar» misvisende. Det betyr i praksis «offentlig nøkkel», fordi det bare er den offentlige delen av nøkkelparet som lagres av Openstack.

Beste praksis for å lage nøkkelpar for skyinstanser er å gjøre det i et pålitelig miljø hos deg, og deretter opprette et OpenStack-nøkkelpar ved å importere den offentlige nøkkelen fra det lokalt genererte nøkkelparet. På den måten vil verken skyleverandøren eller noen andre underveis noen gang få tilgang til den private nøkkelen din.

Det sier seg selv at den private nøkkelen kun skal eksponeres for subjekter (brukere, skript, playbooks osv.) som skal ha root-tilgang til instansen; derfor bør den oppbevares i et kryptert hemmelager og kun eksponeres etter behov.

En konsekvens av denne tilnærmingen er at du ikke bør bruke OpenStack (GUI, API, CLI) til å generere nøkkelparet, fordi den private nøkkelen da ikke blir så privat som mulig.

### Offentlige nøkler er knyttet til Openstack-brukere

Openstack-nøkkelpar, som inneholder den offentlige delen av nøkkelparet, eies av brukeren som opprettet dem, uavhengig av prosjekt. Så OpenStack-nøkkelparet er ikke en prosjektsressurs, men en brukerressurs. Dermed kan en bruker se (GUI) eller liste opp (CLI) nøklene sine uavhengig av hvilket OpenStack-prosjekt brukeren er i.

Enda en gang: OpenStack-nøkkelpar inneholder kun den offentlige nøkkelen, og det er ikke et problem å dele den med hvem som helst om du ønsker det.

En bruker kan importere så mange nøkkelpar (offentlige nøkler) til OpenStack som vedkommende ønsker. Dette er nyttig hvis man vil segregere root-tilgang for ulike sett med instanser ved å knytte forskjellige nøkkelpar (offentlige nøkler) til de ulike settene, og deretter gi tilgang til de lokale private nøklene som samsvarer med de settene det lokale subjektet skal ha tilgang til.

En annen måte å separere og/eller ta full kontroll over tilgangen på er å bruke det OpenStack-leverte nøkkelparet kun til å konfigurere din egen autentiserings-/autorisasjonsmekanisme og deretter fjerne tilgang via skybrukeren ved å fjerne dens `authorized_keys`. For å hindre at den blir re-injisert i `authorized_keys`-filen ved en rebuild av instansen, kan man også fjerne nøkkelparet (den offentlige nøkkelen) fra Openstack. Dette vil også fjerne nødtilgangen hvis autentiseringsmetoden brukeren satte opp er feilkonfigurert eller svikter, og brukeren blir permanent låst ute.

### SSH offentlig vertsnøkkel

I tillegg til SSH-nøkkelparene som brukes for å gi brukere tilgang, finnes også SSH-vertsnøkkelen. Dette er metoden en vert identifiserer seg entydig overfor tilkoblede klienter med. Det er opp til klienten å stole på denne vertsnøkkelen ved første kontakt. Vi har alle sett denne meldingen:```
The authenticity of host 'foo.example.net (x.x.x.x)' can't be established.
ECDSA key fingerprint is SHA256:bbFasR3yR1ellOSPnLOjYTWkAdGNnhNnUybkbrf5apc.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```
Hvis vi svarer ja, lagres fingeravtrykket i `known_hosts`-filen og blir i praksis godkjent og brukt ved senere tilkoblinger.

Det riktige før du svarer ja, og stoler på at SSH-tjenesten på verten faktisk er den den utgir seg for å være, er å sammenligne fingeravtrykket i den prompten med et kjent fingeravtrykk av den eksterne serverens vertsnøkkel. Du kan gjøre dette med utdataene fra `ssh-keygen -l -f <ssh-host-key-file>` på serveren du prøver å logge inn på.

Hmm, det er litt Catch-22, ikke sant? Hvordan kan jeg kjøre en kommando på en vert jeg ennå ikke er logget inn på? Kanskje er det derfor de fleste brukere ignorerer dette og aksepterer risikoen for at noen gjennomfører et man-in-the-middle (MITM)-angrep akkurat i det øyeblikket den innledende tilliten etableres. Anta at du aksepterer nøkkelens fingeravtrykk uten å verifisere det? Da sier du i praksis: «Jeg er tilstrekkelig overbevist om at ingen forfalsker kommunikasjonen min akkurat nå, og jeg velger å stole på dette fingeravtrykket uten å verifisere det.»

Med mindre du er blant det store flertallet som tilsynelatende er komfortable med denne praksisen, bør du vurdere å utvikle automatisering, for eksempel med cloud-init, som på en sikker måte sender serverens SSH-vertsnøkkel-fingeravtrykk hjem til deg, og bruker det til å generere SSH known hosts som faktisk er kjente.

Mer om [MITM i SSH][ssh-mitm]

[ssh-mitm]: https://github.com/ssh-mitm/ssh-mitm

## Nøkkelhåndtering

For å holde kontroll på SSH-nøkler som en tilgangsmekanisme, må man etablere gode verktøy og rutiner. Det vil variere, men [dette blogginnlegget][kmgmt] går gjennom noen viktige ting å tenke på.

[kmgmt]: https://www.beyondtrust.com/blog/entry/ssh-key-management-overview-6-best-practices