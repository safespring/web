---
ai: true
title: "Automatisering av Windows Server Hardening på Safespring Compute: Fra lansering til låst ned"
date: "2026-03-17"
intro: "Resultatet er en fullstendig herdet Windows-server som du kan klargjøre i ett skudd, hands-off, fra OpenStack CLI."
draft: false
sectiontext: "Teknologioppdatering"
section: "Teknologioppdatering"
tags: ["windows", "compute"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "nb"
author: "Gabriel Paues"
aliases:
  - /blogg/2026/2026-03-windows-server-hardening/
  - /blogg/2026-03-windows-server-hardening/
---


Når du spinner opp en Windows Server-forekomst i et skymiljø som Safespring Compute, får du
et blankt ark, ingen passord, ingen SSH, ingen ekstern tilgang i det hele tatt.

Dette innlegget går gjennom hele automatiseringskjeden: bruk av cloudbase-init for å starte
opp forekomsten ved første oppstart, og deretter kjøre en Ansible-spillebok for å bruke en
sikkerhetsgrunnlinje.

Resultatet er en fullstendig herdet Windows-server som du kan klargjøre i ett skudd,
hands-off, fra OpenStack CLI.

---

## Problemet med ferske Windows-forekomster

I motsetning til Linux har en Windows-forekomst lansert uten noen brukerdata:

- **Ingen administratorpassord** — kontoen eksisterer, men er utilgjengelig
- **Ingen SSH** — bare RDP og OpenStack-nettkonsollen er tilgjengelig
- **Ingen herding** — standard Windows-innstillinger er tillatte

Den eneste veien inn uten automatisering er Horizon nettkonsoll, som er treg og ikke
skalerer. Vi må fikse alt dette før forekomsten fullfører oppstart.

---

## Trinn 1 — Bootstrap med Cloudbase-Init

Safespring Windows-bilder leveres med [cloudbase-init](https://cloudbase.it/cloudbase-init/)
forhåndsinstallert. Det fungerer som cloud-init på Linux: det leser brukerdataene du oppgir
ved lansering og kjører det én gang ved første oppstart.

Skriptene må begynne med `#ps1_sysnative` slik at cloudbase-init kjører dem i 64-biters
PowerShell-verten.

{{% disclaimer "Sikkerhetsmerknad" %}} 
Alt i brukerdata kan vises i cloudbase-init-loggfiler på forekomsten. Behandle passordet du
angir her som en midlertidig bootstrap-legitimasjon, roter det etter første pålogging, eller
bruk nøkkelbasert SSH utelukkende.
{{% /disclaimer %}}

### Cloudbase-init-skriptet

Lim dette inn i feltet **Configuration > Customization Script** i Horizon, eller lagre det
som en fil og send det med `--user-data`:

```powershell
#ps1_sysnative

$NewPassword = "YourStrongPasswordHere"

$ErrorActionPreference = "Stop"

try {
    # Set Administrator password and enable the account
    $account = [ADSI]"WinNT://./Administrator,user"
    $account.SetPassword($NewPassword)
    $flags = $account.UserFlags.value
    $flags = $flags -band (-bnot 0x2)   # Clear ADS_UF_ACCOUNTDISABLE
    $flags = $flags -bor 0x10000        # Set ADS_UF_DONT_EXPIRE_PASSWD
    $account.UserFlags = $flags
    $account.PasswordExpired = 0
    $account.SetInfo()
    Write-Host "Administrator password set successfully."

    # Install OpenSSH Server
    Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
    Set-Service -Name sshd -StartupType Automatic
    Start-Service sshd

    # Set PowerShell as the default SSH shell
    New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" `
        -Name DefaultShell `
        -Value "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" `
        -PropertyType String `
        -Force

    Write-Host "OpenSSH Server installed and configured successfully."
} catch {
    Write-Host "Error: $_"
    exit 1
}
```

> **Før oppstart:** Åpne port 22 i OpenStack Security Group, men begrens den kun til din egen IP. Den første påloggingen bruker passordautentisering (før SSH-nøkkelen din er på plass), så å utsette port 22 for verden på dette stadiet er en betydelig risiko. Finn din nåværende offentlige IP med `curl ifconfig.me` og legg til en regel for `<your-ip>/32` på TCP-port 22.

Eller start via CLI:

```bash
openstack server create \
  --image “windows-server-2022” \
  --flavor l2.c4r8 \
  --user-data windows-bootstrap.ps1 \
  my-windows-server
```

Når forekomsten er ferdig med oppstart, vil administratorkontoen ha passordet ditt angitt og
SSH vil lytte på port 22.

---

## Trinn 2 — Sett opp nøkkelbasert SSH

Passordbasert SSH er kun nyttig som et springbrett. Før du kjører Ansible, bytt til
nøkkelbasert autentisering slik at automatiseringen din aldri trenger å håndtere
påloggingsinformasjon i ren tekst.

> **Tips:** Generer nøkkelen din uten en passordfrase (`ssh-keygen -t rsa -b 4096 -f ~/.ssh/your-key.pem` og trykk Enter når du blir bedt om en passordfrase). Ansible kjører uten tilsyn, en passordfrasebeskyttet nøkkel vil føre til at den henger og venter på input.

### Logg inn med passord og konfigurer nøkkelen

```bash
ssh administrator@<server-ip>
```

På Windows-serveren (PowerShell):

```powershell
# Create the .ssh directory and authorized_keys file
New-Item -ItemType Directory -Path "C:\Users\Administrator\.ssh" -Force
New-Item -ItemType File -Path "C:\Users\Administrator\.ssh\authorized_keys" -Force

# Add your public key
Add-Content -Path "C:\Users\Administrator\.ssh\authorized_keys" -Value "ssh-rsa AAAA...your-key..."

# Lock down file permissions — SSH will refuse to use the file if permissions are too open
icacls "C:\Users\Administrator\.ssh\authorized_keys" /inheritance:r /grant "Administrator:F" /grant "SYSTEM:F"
```

### Sjekk sshd_config

```powershell
Get-Content "C:\ProgramData\ssh\sshd_config"
```

Sørg for at disse linjene er tilstede og **ikke** kommentert:

```
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```

Og sørg for at disse linjene nederst **er** kommentert ut, de overstyrer per-bruker
`authorized_keys` for administratorkontoen:

```
# Match Group administrators
#        AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys
```

Hvis de ikke er kommentert, fikser du dem:

```powershell
(Get-Content "C:\ProgramData\ssh\sshd_config") `
  -replace "Match Group administrators", "#Match Group administrators" `
  -replace "       AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys", `
           "#       AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys" `
  | Set-Content "C:\ProgramData\ssh\sshd_config"

Restart-Service sshd
```

Test nøkkelbasert pålogging fra din lokale maskin:

```bash
ssh -i ~/.ssh/your-key.pem administrator@<server-ip>
```

Når du er inne og har bekreftet at nøkkelen fungerer, deaktiver passordautentisering.

### Deaktiver passordpålogging over SSH

Tilbake på Windows-serveren (nå koblet til nøkkelen din):

```powershell
(Get-Content "C:\ProgramData\ssh\sshd_config") `
  -replace "#PasswordAuthentication yes", "PasswordAuthentication no" `
  -replace "PasswordAuthentication yes", "PasswordAuthentication no" `
  | Set-Content "C:\ProgramData\ssh\sshd_config"

Restart-Service sshd
```

Bekreft at passordpålogging nå er avvist ved å åpne en annen terminal og prøve uten
nøkkelen:

```bash
ssh administrator@<server-ip>
```

Du bør få `Permission denied (publickey)`, det er det forventede resultatet. Fra dette
tidspunktet er det kun nøkkelinnehavere som kan logge inn over SSH.

Du kan også stramme inn sikkerhetsgrupperegelen nå hvis du vil: siden Ansible vil koble til
fra en kjent vert, kan du begrense port 22 til bare den maskinen i stedet for
arbeidsstasjonens IP-adresse.

---

## Trinn 3 — Installer Ansible

### macOS

```bash
brew install ansible
pip3 install pywinrm --break-system-packages
```

### Ubuntu

```bash
sudo apt update
sudo apt install -y software-properties-common
sudo add-apt-repository --yes --update ppa:ansible/ansible
sudo apt install -y ansible
pip3 install pywinrm --break-system-packages
```

Verifisere:

```bash
ansible --version
```

---

## Trinn 4 — Lag inventarfilen

Klon eller naviger til din `ansible-windows`-prosjektkatalog:

```bash
mkdir -p ~/ansible-windows
cd ~/ansible-windows
```

Opprett `inventory.ini`:

```ini
[windows]
<your-server-ip>

[windows:vars]
ansible_user=administrator
ansible_connection=ssh
ansible_shell_type=powershell
ansible_ssh_private_key_file=~/.ssh/your-key.pem
```

Erstatt `<your-server-ip>` med forekomstens IP-adresse og oppdater banen til din private
SSH-nøkkel.

### Bekreft tilkoblingen

Før du kjører herding playbook, bekreft at Ansible kan nå verten:

```bash
ansible windows -i inventory.ini -m ansible.windows.win_ping
```

Forventet utgang:

```json
192.168.x.x | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```

Hvis dette mislykkes, sjekk at:
- SSH-nøkkelen samsvarer med det du la til i `authorized_keys`
- `sshd`-tjenesten kjører på Windows-verten
- Din OpenStack Security Group tillater TCP-port 22 fra din IP

---

## Trinn 5 — Kjør Hardening Playbook

`windows_baseline.yml`-spilleboken bruker en omfattende sikkerhetsgrunnlinje i ni trinn:

| Trinn | Hva den gjør | |---|---| | **1. Windows Update** | Installerer alle
sikkerhetsoppdateringer og kritiske oppdateringer, starter på nytt om nødvendig | | **2.
Tjenester** | Deaktiverer farlige/unødvendige tjenester (Telnet, FTP, Remote Registry, Xbox,
Print Spooler, etc.) | | **3. SMB-herding** | Deaktiverer SMBv1, deaktiverer komprimering
(CVE-2020-0796-reduksjon), krever SMB-signering | | **4. Registerherding** | Tvinger NTLMv2,
deaktiverer LM-hash-lagring, deaktiverer Wdigest, aktiverer LSA-beskyttelse og UAC | | **5.
Revisjonspolicy** | Aktiverer logging for påloggingshendelser, kontoadministrasjon,
rettighetsbruk og prosessoppretting | | **6. Passordpolicy** | Minimum 14 tegn, 90-dagers
utløp, lockout etter 5 mislykkede forsøk | | **7. Windows Defender** | Starter
Defender-tjenesten, muliggjør sanntidsbeskyttelse, oppdaterer signaturer | | **8. TLS
herding** | Deaktiverer SSL 2.0/3.0 og TLS 1.0/1.1, aktiverer TLS 1.2 og TLS 1.3 | | **9.
PowerShell-logging** | Aktiverer skriptblokklogging og modullogging – all
PowerShell-aktivitet skrives til hendelsesloggen | | **10. Størrelse på hendelsesloggen** |
Øker sikkerhetsloggen til ~192 MB, system- og applikasjonsloggene til ~32 MB hver | | **11.
Endelig omstart** | Starter på nytt for å bruke alle endringer |

{{% note "Ingen brannmur" %}}
Windows-brannmuren er deaktivert på denne plattformen. Tilgangskontroll på nettverksnivå
håndteres utelukkende av OpenStack Security Groups.
{{% /note %}}

### Kjør den

```bash
cd ~/ansible-windows
ansible-playbook -i inventory.ini windows_baseline.yml
```

### Nyttige alternativer

```bash
# Verbose output, good for troubleshooting
ansible-playbook -i inventory.ini windows_baseline.yml -v

# Maximum debug output
ansible-playbook -i inventory.ini windows_baseline.yml -vvv

# Dry run, see what would change without making changes
ansible-playbook -i inventory.ini windows_baseline.yml --check
```

### Forventet utgang

En vellykket løpetur avsluttes med en SPILL-RESEPTAK slik:

```
PLAY RECAP *******************************************************************
192.168.x.x    : ok=28   changed=15   unreachable=0    failed=0    skipped=2
```

- `ok` — oppgaver som kjørte uten feil
- `changed` — oppgaver som faktisk endret noe
- `skipped` — oppgaver hoppet over (f.eks. tjenester som ikke er installert på dette bildet)
- `failed` — må være **0** for en ren kjøring

---

## Feilsøking

| Problem | Løsning | |---|---| | `win_ping` mislykkes | Sjekk at SSH-nøkkelen er riktig og
at `sshd` kjører på serveren | | `WinDefend` Tilgang nektet | Forsvarer kan være
policy-kontrollert. Spilleboken bruker `ignore_errors` for denne oppgaven | | Tjenesten ikke
funnet | Normal — spilleboken sjekker om en tjeneste eksisterer før den forsøker å stoppe
den | | TLS-endringer gjelder ikke | Krever omstart — spilleboken utfører dette automatisk
på slutten | | `rc=1` på PowerShell-oppgaver | Sjekk `stderr` i utgangen — ofte en uventet
utgangskode fra en PS-kommando |

---

## Hele bildet

Her er hele flyten, fra null til herdet:

```
openstack server create --user-data bootstrap.ps1
         │
         ▼
cloudbase-init runs at first boot
  ├── Sets Administrator password
  └── Installs and starts OpenSSH Server
         │
         ▼
Manual step: add SSH public key to authorized_keys
         │
         ▼
ansible windows -i inventory.ini -m win_ping   ← verify connectivity
         │
         ▼
ansible-playbook -i inventory.ini windows_baseline.yml
  ├── Windows Update
  ├── Disable insecure services
  ├── SMB hardening
  ├── Registry hardening (NTLM, WDigest, LSA, UAC)
  ├── Audit policy
  ├── Password policy
  ├── Windows Defender
  ├── TLS hardening
  ├── PowerShell logging
  ├── Event log sizing
  └── Final reboot
```

Hele prosessen, fra en ny forekomst til en herdet, lappet og kontrollerbar Windows-server,
tar omtrent 15–30 minutter, avhengig av hvor mange Windows-oppdateringer som venter.

---

## Går videre

Handleboken i denne veiledningen dekker en solid generell grunnlinje, men hvis du trenger å
møte en spesifikk samsvarsstandard som CIS Benchmark eller DISA STIG, ta en titt på [Ansible
Lockdown](https://github.com/ansible-lockdown). De opprettholder ferdige Ansible-roller for
Windows Server 2016, 2019 og 2022 som implementerer hundrevis av kontroller på tvers av både
CIS- og STIG-rammeverk, med granulær tagging slik at du bare kan bruke nivåene eller
kategoriene som er relevante for miljøet ditt.

---

## Vedlegg — windows_baseline.yml

```yaml
---
- name: Windows Baseline Hardening & Patching
  hosts: windows
  gather_facts: true
  vars:
    reboot_timeout: 600

  tasks:

    # ============================================================
    # 1. WINDOWS UPDATE
    # ============================================================

    - name: Install all available Windows updates
      ansible.windows.win_updates:
        category_names:
          - SecurityUpdates
          - CriticalUpdates
          - UpdateRollups
          - Updates
        state: installed
        reboot: false
      register: update_result

    - name: Reboot if updates require it
      ansible.windows.win_reboot:
        reboot_timeout: "{{ reboot_timeout }}"
      when: update_result.reboot_required

    # ============================================================
    # 2. DISABLE INSECURE / UNNECESSARY SERVICES
    # ============================================================

    - name: Check which services exist
      ansible.windows.win_shell: |
        $services = @("LanmanServer","RemoteRegistry","TlntSvr","FTPSVC","W3SVC","Spooler","WMPNetworkSvc","XboxGipSvc","XblAuthManager","XblGameSave","XboxNetApiSvc")
        foreach ($svc in $services) {
          $s = Get-Service -Name $svc -ErrorAction SilentlyContinue
          if ($s) { Write-Output $svc }
        }
        exit 0
      register: existing_services
      changed_when: false
      failed_when: false

    - name: Disable services that exist
      ansible.windows.win_service:
        name: "{{ item }}"
        start_mode: disabled
        state: stopped
      loop: "{{ existing_services.stdout_lines }}"
      ignore_errors: true

    # ============================================================
    # 3. SMB HARDENING
    # ============================================================

    - name: Disable SMBv1
      ansible.windows.win_shell: |
        Set-SmbServerConfiguration -EnableSMB1Protocol $false -Force
      changed_when: false

    - name: Disable SMBv2/v3 compression (CVE-2020-0796 mitigation)
      ansible.windows.win_shell: |
        Set-SmbServerConfiguration -DisableCompression $true -Force
      changed_when: false

    - name: Enable SMB signing (required)
      ansible.windows.win_shell: |
        Set-SmbServerConfiguration -RequireSecuritySignature $true -Force
        Set-SmbClientConfiguration -RequireSecuritySignature $true -Force
      changed_when: false

    # ============================================================
    # 4. REGISTRY HARDENING
    # ============================================================

    - name: Disable NTLM v1 (force NTLMv2)
      ansible.windows.win_regedit:
        path: HKLM:\SYSTEM\CurrentControlSet\Control\Lsa
        name: LmCompatibilityLevel
        data: 5
        type: dword

    - name: Disable LM hash storage
      ansible.windows.win_regedit:
        path: HKLM:\SYSTEM\CurrentControlSet\Control\Lsa
        name: NoLMHash
        data: 1
        type: dword

    - name: Enable NTLMv2 minimum client security
      ansible.windows.win_regedit:
        path: HKLM:\SYSTEM\CurrentControlSet\Control\Lsa
        name: NtlmMinClientSec
        data: 537395200
        type: dword

    - name: Disable anonymous SID enumeration
      ansible.windows.win_regedit:
        path: HKLM:\SYSTEM\CurrentControlSet\Control\Lsa
        name: RestrictAnonymousSAM
        data: 1
        type: dword

    - name: Disable anonymous enumeration of shares
      ansible.windows.win_regedit:
        path: HKLM:\SYSTEM\CurrentControlSet\Control\Lsa
        name: RestrictAnonymous
        data: 1
        type: dword

    - name: Enable UAC
      ansible.windows.win_regedit:
        path: HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System
        name: EnableLUA
        data: 1
        type: dword

    - name: Set UAC to prompt for credentials (not just consent)
      ansible.windows.win_regedit:
        path: HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System
        name: ConsentPromptBehaviorAdmin
        data: 1
        type: dword

    - name: Disable autorun/autoplay
      ansible.windows.win_regedit:
        path: HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer
        name: NoDriveTypeAutoRun
        data: 255
        type: dword

    - name: Disable Remote Assistance
      ansible.windows.win_regedit:
        path: HKLM:\SYSTEM\CurrentControlSet\Control\Remote Assistance
        name: fAllowToGetHelp
        data: 0
        type: dword

    - name: Disable WDigest (prevents plaintext creds in LSASS)
      ansible.windows.win_regedit:
        path: HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\WDigest
        name: UseLogonCredential
        data: 0
        type: dword

    - name: Enable LSA protection (Credential Guard / RunAsPPL)
      ansible.windows.win_regedit:
        path: HKLM:\SYSTEM\CurrentControlSet\Control\Lsa
        name: RunAsPPL
        data: 1
        type: dword

    - name: Enable Windows Defender real-time protection via registry
      ansible.windows.win_regedit:
        path: HKLM:\SOFTWARE\Policies\Microsoft\Windows Defender\Real-Time Protection
        name: DisableRealtimeMonitoring
        data: 0
        type: dword

    # ============================================================
    # 5. AUDIT POLICY
    # ============================================================

    - name: Enable audit policy - logon events
      ansible.windows.win_shell: |
        auditpol /set /subcategory:"Logon" /success:enable /failure:enable
        auditpol /set /subcategory:"Account Lockout" /success:enable /failure:enable
        auditpol /set /subcategory:"Special Logon" /success:enable /failure:enable
        auditpol /set /subcategory:"Logoff" /success:enable
      changed_when: false

    - name: Enable audit policy - object access & privilege use
      ansible.windows.win_shell: |
        auditpol /set /subcategory:"File System" /success:enable /failure:enable
        auditpol /set /subcategory:"Sensitive Privilege Use" /success:enable /failure:enable
        auditpol /set /subcategory:"Process Creation" /success:enable
      changed_when: false

    - name: Enable audit policy - account management
      ansible.windows.win_shell: |
        auditpol /set /subcategory:"User Account Management" /success:enable /failure:enable
        auditpol /set /subcategory:"Security Group Management" /success:enable /failure:enable
      changed_when: false

    # ============================================================
    # 6. PASSWORD POLICY
    # ============================================================

    - name: Set password policy
      ansible.windows.win_shell: |
        net accounts /minpwlen:14 /maxpwage:90 /minpwage:1 /uniquepw:10 /lockoutthreshold:5 /lockoutduration:30 /lockoutwindow:30
      changed_when: false

    # ============================================================
    # 7. WINDOWS DEFENDER
    # ============================================================

    - name: Check if Defender cmdlets are available
      ansible.windows.win_shell: |
        if (Get-Command Set-MpPreference -ErrorAction SilentlyContinue) { "available" } else { "unavailable" }
      register: defender_cmdlets
      changed_when: false

    - name: Ensure Windows Defender service is running
      ansible.windows.win_service:
        name: WinDefend
        state: started
        start_mode: auto
      when: defender_cmdlets.stdout | trim == "available"
      ignore_errors: true

    - name: Ensure Security Center service is running
      ansible.windows.win_service:
        name: wscsvc
        state: started
        start_mode: auto
      when: defender_cmdlets.stdout | trim == "available"
      ignore_errors: true

    - name: Configure Windows Defender settings
      ansible.windows.win_shell: |
        Set-MpPreference -DisableRealtimeMonitoring $false
        Set-MpPreference -MAPSReporting Advanced
        Set-MpPreference -SubmitSamplesConsent SendAllSamples
        Set-MpPreference -PUAProtection Enabled
      when: defender_cmdlets.stdout | trim == "available"
      changed_when: false

    - name: Update Windows Defender signatures
      ansible.windows.win_shell: |
        Update-MpSignature
      when: defender_cmdlets.stdout | trim == "available"
      register: defender_update
      retries: 3
      delay: 10
      until: defender_update.rc == 0
      changed_when: false

    # ============================================================
    # 8. TLS HARDENING
    # ============================================================

    - name: Disable SSL 2.0
      ansible.windows.win_regedit:
        path: "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\SCHANNEL\\Protocols\\SSL 2.0\\Server"
        name: Enabled
        data: 0
        type: dword

    - name: Disable SSL 3.0
      ansible.windows.win_regedit:
        path: "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\SCHANNEL\\Protocols\\SSL 3.0\\Server"
        name: Enabled
        data: 0
        type: dword

    - name: Disable TLS 1.0
      ansible.windows.win_regedit:
        path: "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\SCHANNEL\\Protocols\\TLS 1.0\\Server"
        name: Enabled
        data: 0
        type: dword

    - name: Disable TLS 1.1
      ansible.windows.win_regedit:
        path: "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\SCHANNEL\\Protocols\\TLS 1.1\\Server"
        name: Enabled
        data: 0
        type: dword

    - name: Enable TLS 1.2
      ansible.windows.win_regedit:
        path: "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\SCHANNEL\\Protocols\\TLS 1.2\\Server"
        name: Enabled
        data: 1
        type: dword

    - name: Enable TLS 1.3
      ansible.windows.win_regedit:
        path: "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\SCHANNEL\\Protocols\\TLS 1.3\\Server"
        name: Enabled
        data: 1
        type: dword

    # ============================================================
    # 9. POWERSHELL LOGGING
    # ============================================================

    - name: Enable PowerShell script block logging
      ansible.windows.win_regedit:
        path: HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging
        name: EnableScriptBlockLogging
        data: 1
        type: dword

    - name: Enable PowerShell module logging
      ansible.windows.win_regedit:
        path: HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ModuleLogging
        name: EnableModuleLogging
        data: 1
        type: dword

    - name: Log all modules (wildcard)
      ansible.windows.win_regedit:
        path: HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ModuleLogging\ModuleNames
        name: "*"
        data: "*"
        type: string

    # ============================================================
    # 10. EVENT LOG SIZING
    # ============================================================

    - name: Set Security event log size (196 608 KB / ~192 MB)
      ansible.windows.win_shell: |
        wevtutil sl Security /ms:201326592
      changed_when: false

    - name: Set System event log size (32 768 KB / ~32 MB)
      ansible.windows.win_shell: |
        wevtutil sl System /ms:33554432
      changed_when: false

    - name: Set Application event log size (32 768 KB / ~32 MB)
      ansible.windows.win_shell: |
        wevtutil sl Application /ms:33554432
      changed_when: false

    # ============================================================
    # 11. FINAL REBOOT
    # ============================================================

    - name: Final reboot to apply all changes
      ansible.windows.win_reboot:
        reboot_timeout: "{{ reboot_timeout }}"
        msg: "Rebooting after baseline hardening"
```
