---
ai: true
title: "Bästa praxis för SSH-nycklar i moln-/OpenStack-miljöer"
date: "2022-03-17"
intro: "Låt oss gå igenom bästa praxis för hantering av SSH-nycklar och reda ut vanliga missförstånd."
draft: false
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
section: "Teknikuppdatering"
author: "Jarle Bjørgeengen"
language: "sv"
toc: "Innehållsförteckning"
aliases:
  - /blogg/2022-03-ssh-keys
  - /blogg/2022/2022-03-ssh-keys/
---
{{< ingress >}}
För Linux-/Unix-baserade molninstanser aktiveras initial root-åtkomst till instanserna med SSH-nycklar. I det här inlägget går vi igenom några bästa praxis och saker att tänka på när du hanterar ssh-nycklar för att möjliggöra root-åtkomst till instanser.
{{< /ingress >}}

## Sammanfattning (TL;DR)

- Det olyckligt namngivna "OpenStack keypair" innehåller inga hemligheter, bara en publik SSH-nyckel.
- SSH-nyckelpar är inte samma sak som ett "OpenStack keypair".
- SSH-nyckelpar ska skapas i en betrodd miljö på användarens dator. Det ska vara av typen RSA. Den privata nyckeln ska förvaras i en krypterad hemlighetslagring och aldrig exponeras utanför användarens lokala plats/miljö.
- Ett "OpenStack keypair" är knutet till användaren som skapar det, inte till ett specifikt projekt.
- Ingen bryr sig om SSH-värdnycklar, men det borde man.

## Bakgrund

När du provisionerar instanser i en molnplattform får du en virtuell server med ett basoperativsystem som Centos, Ubuntu, Debian, FreeBSD osv., baserat på vilken molnavbild instansen har provisionerats från. Du kan använda avbilder som finns i Infrastructure as a Service (IaaS)-plattformen eller ladda upp dina egna, så länge avbilden är förberedd för att användas med den IaaS-plattform du använder. I Safesprings fall måste avbilden vara gjord för OpenStack IaaS.

Den mekanism som automatiserar konfigurationen av en molnavbild till en molninstans måste ge operativsystemets root-åtkomst till användaren som äger den provisionerade instansen. Detta för att låta användaren vidare konfigurera instansen så att den gör något nyttigt (installera paket, konfigurera tjänster osv.).

För Linux-/Unix-baserade system ges denna åtkomst via Secure Shell-daemonen (SSHD), en tjänst som alla Linux-/Unix-baserade system har inkluderad och som alltid ingår i en Linux-/Unix-baserad molnavbild. Även om SSHD kan låta användare logga in med lösenord är detta avstängt i alla molnavbilder avsedda för produktion, eftersom [lösenord utgör en säkerhetsrisk][sshpw].

[sshpw]: https://blog.runcloud.io/why-authentication-using-ssh-public-key-is-better-than-using-password-and-how-do-they-work/

I stället ges åtkomst med hjälp av en publik SSH-nyckel som placeras i molnanvändarens `authorized_keys`-fil i avbilden. Molnanvändaren är den lokala användaren (i instansens `/etc/passwd|shadow`) som används för att logga in till instansen och därefter bli root via `su` eller `sudo`.

För att få operativsystemsåtkomst till en molninstans med en SSH-klient måste du:

- Se till att den publika nyckeln injiceras i molnanvändarens `authorized_keys`-fil i instansen
- Använd rätt molnanvändarnamn för avbilden: t.ex. centos för Centos, ubuntu för Ubuntu osv. (Google är din vän här.)
- Ha den privata nyckel tillgänglig för din klient som matchar den publika nyckeln i instansens `authorized_keys`-fil.

Injektionen av den publika nyckeln i molnanvändarens `authorized_keys`-fil görs av "cloud-init" när du talar om för OpenStack vilken publik SSH-nyckel (Openstack keypair) som ska användas med instansen.

Så vi kan uppskatta att mycket händer bakom kulisserna för att användare på ett säkert sätt ska kunna initiera root-åtkomst till de instanser som provisioneras. Openstack återanvänder bara redan existerande mekanismer från långt innan "molnåldern". Det är bara paketerat i något nytt som kallas "cloud-init". Ingen magi, egentligen!

## Bästa praxis

### Publik vs privat

Ett nyckelpar består av en publik och en privat nyckel. Namnen är precis så beskrivande som de låter. Den privata nyckeln ska hållas hemlig eftersom den innehåller den hemlighet du använder för att logga in.

Den publika nyckeln innehåller inga hemligheter. Kännedom om denna nyckel ger inte åtkomst till något någonstans.

I Openstack är termen "keypair" olyckligt vald. Den betyder i praktiken "publik nyckel", eftersom det bara är den publika delen av nyckelparet som lagras av Openstack.

Bästa praxis för att skapa nyckelpar för molninstanser är att göra det i en betrodd miljö på din egen dator och sedan skapa ett "OpenStack keypair" genom att importera den publika nyckeln från det lokalt genererade nyckelparet. På så sätt får varken molnleverantören eller någon på vägen någonsin tillgång till din privata nyckel.

Det säger sig självt att den privata nyckeln endast ska exponeras för subjekt (användare, skript, playbooks etc.) som ska ha root-åtkomst till instansen; därför ska den förvaras i en krypterad hemlighetslagring och bara exponeras enligt principen behov av kännedom.

En konsekvens av detta angreppssätt är att du inte ska använda OpenStack (GUI, API, CLI) för att generera nyckelparet, eftersom den privata nyckeln då inte blir så privat som möjligt.

### Publika nycklar är knutna till Openstack-användare

"Openstack keypairs", som innehåller den publika delen av nyckelparet, ägs av den användare som skapade dem, oavsett projekt. Ett "OpenStack keypair" är alltså inte en projektresurs utan en användarresurs. Därför kan en användare se (GUI) eller lista (CLI) sina nycklar oavsett vilket OpenStack-projekt användaren befinner sig i.

Än en gång: "OpenStack keypairs" innehåller endast den publika nyckeln, och att dela den med världen är inget problem om du väljer att göra det.

En användare kan importera så många nyckelpar (publika nycklar) till OpenStack som hen vill. Detta är användbart om man vill separera root-åtkomst för olika grupper av instanser genom att koppla olika nyckelpar (publika nycklar) till olika grupper av instanser och sedan ge åtkomst till de lokala privata nycklar som motsvarar de grupper som det lokala subjektet ska ha åtkomst till.

Ett annat sätt att separera och/eller ta full kontroll över åtkomsten är att enbart använda det av OpenStack tillhandahållna "keypair" för att konfigurera din egen autentiserings-/auktoriseringsmekanism och därefter ta bort åtkomst via molnanvändaren genom att ta bort dess `authorized_keys`. För att förhindra att den åter injiceras i `authorized_keys`-filen vid en återuppbyggnad av instansen kan man också ta bort "keypair":et (den publika nyckeln) från Openstack. Detta tar också bort reservåtkomsten ifall den autentiseringsmetod användaren satte upp är felkonfigurerad eller fungerar dåligt och användaren blir permanent utelåst.

### Publik SSH-värdnyckel

Utöver de SSH-nyckelpar som används för att ge användare åtkomst finns också SSH-värdnyckeln. Det är det sätt på vilket en värd unikt identifierar sig för anslutande klienter. Det är upp till klienten att lita på denna värdnyckel vid första kontakten. Vi har alla sett detta meddelande:```
The authenticity of host 'foo.example.net (x.x.x.x)' can't be established.
ECDSA key fingerprint is SHA256:bbFasR3yR1ellOSPnLOjYTWkAdGNnhNnUybkbrf5apc.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```
Om vi svarar ja lagras fingeravtrycket i vår `known_hosts`-fil och blir i praktiken betrott vid framtida anslutningar.

Det korrekta att göra innan man svarar ja, och litar på att SSH-tjänsten på värden verkligen är den den utger sig för att vara, är att jämföra fingeravtrycket i den prompten mot ett känt fingeravtryck för fjärrserverns värdnyckelfil. Det kan du göra med utdata från `ssh-keygen -l -f <ssh-host-key-file>` på servern du försöker logga in på.

Hmm, det är lite Catch-22, eller hur? Hur kan jag köra ett kommando på en värd jag ännu inte har loggat in på? Kanske är det därför de flesta användare ignorerar det och accepterar risken att någon genomför en man-in-the-middle- (MITM-)attack just i det ögonblick då det initiala förtroendet etableras. Anta att du accepterar nyckelns fingeravtryck utan att verifiera det. Då säger du i praktiken: «Jag är tillräckligt övertygad om att ingen förfalskar min kommunikation just nu och accepterar att lita på det här fingeravtrycket utan att verifiera det».

Om du inte tillhör den stora majoritet som uppenbarligen är okej med denna praxis, bör du förmodligen överväga att ta fram automation, till exempel med cloud-init, som på ett säkert sätt skickar serverns SSH-värdnyckels fingeravtryck hem till dig och använder det för att generera SSH known hosts som faktiskt är kända.

Mer om [SSH MITM][ssh-mitm]

[ssh-mitm]: https://github.com/ssh-mitm/ssh-mitm

## Nyckelhantering

För att behålla kontrollen över SSH-nycklar som åtkomstmekanism måste man etablera bra verktyg och rutiner. Det kan variera, men [det här blogginlägget][kmgmt] går igenom några viktiga saker att tänka på.

[kmgmt]: https://www.beyondtrust.com/blog/entry/ssh-key-management-overview-6-best-practices