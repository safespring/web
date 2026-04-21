---
ai: true
title: "Automatisering af Windows Server Hardening på Safespring Compute: Fra lancering til låst server"
date: "2026-03-17"
intro: "Resultatet er en fuldt hærdet Windows Server, som du kan klargøre i ét skud, hands-off, fra OpenStack CLI."
draft: false
sectiontext: "Teknologiopdatering"
section: "Teknologiopdatering"
tags: ["windows", "compute"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "da"
author: "Gabriel Paues"
aliases:
  - /blogg/2026/2026-03-windows-server-hardening/
  - /blogg/2026-03-windows-server-hardening/
---


Når du opretter en Windows Server-instans i et cloudmiljø som Safespring Compute, får du en
blank tavle, ingen adgangskode, ingen SSH, ingen fjernadgang overhovedet.

Dette indlæg går gennem den fulde automatiseringskæde: Brug af cloudbase-init til at
bootstrap forekomsten ved første opstart, og kør derefter en Ansible-afspilningsbog for at
anvende en sikkerhedsbaseline.

Resultatet er en fuldt hærdet Windows Server, som du kan klargøre i ét skud, hands-off, fra
OpenStack CLI.

---

## Problemet med nye Windows-forekomster

I modsætning til Linux har en Windows-instans lanceret uden nogen brugerdata:

- **Ingen administratoradgangskode** — kontoen eksisterer, men er utilgængelig
- **Ingen SSH** — kun RDP og OpenStack-webkonsollen er tilgængelige
- **Ingen hærdning** — standard Windows-indstillinger er tilladelige

Den eneste vej ind uden automatisering er Horizon webkonsollen, som er langsom og ikke
skalerer. Vi skal rette alt dette, før instansen afslutter opstart.

---

## Trin 1 — Bootstrap med Cloudbase-Init

Safespring Windows-billeder leveres med
[cloudbase-init](https://cloudbase.it/cloudbase-init/) forudinstalleret. Det fungerer som
cloud-init på Linux: det læser de brugerdata, du angiver ved lanceringen, og udfører det én
gang ved første opstart.

Scripts skal begynde med `#ps1_sysnative`, så cloudbase-init kører dem i 64-bit
PowerShell-værten.

{{% disclaimer "Sikkerhedsnote" %}} 
Alt i brugerdata kan vises i cloudbase-init-logfiler på instansen. Behandl den adgangskode,
du angiver her, som en midlertidig bootstrap-legitimationsoplysninger, roter den efter
første login, eller brug udelukkende nøglebaseret SSH.
{{% /disclaimer %}}

### Cloudbase-init-scriptet

Indsæt dette i feltet **Configuration > Customization Script** i Horizon, eller gem det som
en fil og send det med `--user-data`:

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

> **Før lancering:** Åbn port 22 i din OpenStack Security Group, men begræns den til kun din egen IP. Det første login bruger adgangskodegodkendelse (før din SSH-nøgle er på plads), så det er en betydelig risiko at udsætte port 22 for verden på dette tidspunkt. Find din nuværende offentlige IP med `curl ifconfig.me` og tilføj en regel for `<your-ip>/32` på TCP-port 22.

Eller start via CLI:

```bash
openstack server create \
  --image “windows-server-2022” \
  --flavor l2.c4r8 \
  --user-data windows-bootstrap.ps1 \
  my-windows-server
```

Når instansen er færdig med at starte, vil administratorkontoen have din adgangskode
indstillet, og SSH vil lytte på port 22.

---

## Trin 2 — Konfigurer nøglebaseret SSH

Adgangskodebaseret SSH er kun nyttig som et springbræt. Før du kører Ansible, skal du skifte
til nøglebaseret godkendelse, så din automatisering aldrig behøver at håndtere
legitimationsoplysninger i almindelig tekst.

> **Tip:** Generer din nøgle uden en adgangssætning (`ssh-keygen -t rsa -b 4096 -f ~/.ssh/your-key.pem` og tryk på Enter, når du bliver bedt om en adgangssætning). Ansible kører uden opsyn, en adgangssætningsbeskyttet nøgle vil få den til at hænge og vente på input.

### Log ind med adgangskode og konfigurer nøglen

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

### Tjek sshd_config

```powershell
Get-Content "C:\ProgramData\ssh\sshd_config"
```

Sørg for, at disse linjer er til stede og **ikke** kommenteret:

```
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```

Og sørg for, at disse linjer nederst **er** kommenteret ud, de tilsidesætter per-bruger
`authorized_keys` for administratorkontoen:

```
# Match Group administrators
#        AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys
```

Hvis de ikke er kommenteret, skal du rette dem:

```powershell
(Get-Content "C:\ProgramData\ssh\sshd_config") `
  -replace "Match Group administrators", "#Match Group administrators" `
  -replace "       AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys", `
           "#       AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys" `
  | Set-Content "C:\ProgramData\ssh\sshd_config"

Restart-Service sshd
```

Test nøglebaseret login fra din lokale maskine:

```bash
ssh -i ~/.ssh/your-key.pem administrator@<server-ip>
```

Når du er inde og har bekræftet, at nøglen virker, skal du deaktivere
adgangskodegodkendelse.

### Deaktiver adgangskodelogin over SSH

Tilbage på Windows-serveren (nu forbundet med din nøgle):

```powershell
(Get-Content "C:\ProgramData\ssh\sshd_config") `
  -replace "#PasswordAuthentication yes", "PasswordAuthentication no" `
  -replace "PasswordAuthentication yes", "PasswordAuthentication no" `
  | Set-Content "C:\ProgramData\ssh\sshd_config"

Restart-Service sshd
```

Bekræft, at adgangskodelogin nu er afvist ved at åbne en anden terminal og prøve uden
nøglen:

```bash
ssh administrator@<server-ip>
```

Du bør få `Permission denied (publickey)`, det er det forventede resultat. Fra dette
tidspunkt er det kun nøgleindehavere, der kan logge ind over SSH.

Du kan også stramme sikkerhedsgruppereglen nu, hvis du vil: da Ansible vil oprette
forbindelse fra en kendt vært, kan du begrænse port 22 til kun den maskine i stedet for din
arbejdsstations IP.

---

## Trin 3 — Installer Ansible

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

Verificere:

```bash
ansible --version
```

---

## Trin 4 — Opret inventarfilen

Klon eller naviger til din `ansible-windows`-projektmappe:

```bash
mkdir -p ~/ansible-windows
cd ~/ansible-windows
```

Opret `inventory.ini`:

```ini
[windows]
<your-server-ip>

[windows:vars]
ansible_user=administrator
ansible_connection=ssh
ansible_shell_type=powershell
ansible_ssh_private_key_file=~/.ssh/your-key.pem
```

Erstat `<your-server-ip>` med instansens IP-adresse og opdater stien til din SSH private
nøgle.

### Bekræft forbindelsen

Før du kører hærdningsafspilningsbogen, skal du bekræfte, at Ansible kan nå værten:

```bash
ansible windows -i inventory.ini -m ansible.windows.win_ping
```

Forventet output:

```json
192.168.x.x | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```

Hvis dette mislykkes, skal du kontrollere at:
- SSH-nøglen matcher det, du føjede til `authorized_keys`
- `sshd`-tjenesten kører på Windows-værten
- Din OpenStack Security Group tillader TCP-port 22 fra din IP

---

## Trin 5 — Kør Hardening Playbook

`windows_baseline.yml` playbook anvender en omfattende sikkerhedsbaseline i ni trin:

| Trin | Hvad det gør | |---|---| | **1. Windows Update** | Installerer alle
sikkerhedsopdateringer og kritiske opdateringer, genstarter om nødvendigt | | **2.
Tjenester** | Deaktiverer farlige/unødvendige tjenester (Telnet, FTP, Remote Registry, Xbox,
Print Spooler osv.) | | **3. SMB hærdning** | Deaktiverer SMBv1, deaktiverer komprimering
(CVE-2020-0796-reduktion), kræver SMB-signering | | **4. Registry hærdning** | Tvinger
NTLMv2, deaktiverer LM-hash-lagring, deaktiverer Wdigest, aktiverer LSA-beskyttelse og UAC |
| **5. Revisionspolitik** | Aktiverer logning for logonhændelser, kontoadministration,
privilegiebrug og procesoprettelse | | **6. Adgangskodepolitik** | Minimum 14 tegn, 90 dages
udløb, lockout efter 5 mislykkede forsøg | | **7. Windows Defender** | Starter
Defender-tjenesten, muliggør realtidsbeskyttelse, opdaterer signaturer | | **8. TLS
hærdning** | Deaktiverer SSL 2.0/3.0 og TLS 1.0/1.1, aktiverer TLS 1.2 og TLS 1.3 | | **9.
PowerShell-logning** | Aktiverer scriptbloklogning og modullogning — al PowerShell-aktivitet
skrives til hændelsesloggen | | **10. Hændelseslogstørrelse** | Øger sikkerhedslog til ~192
MB, system- og applikationslog til ~32 MB hver | | **11. Endelig genstart** | Genstarter for
at anvende alle ændringer |

{{% note "Ingen firewall" %}}
Windows Firewall er deaktiveret på denne platform. Adgangskontrol på netværksniveau
håndteres udelukkende af OpenStack Security Groups.
{{% /note %}}

### Kør den

```bash
cd ~/ansible-windows
ansible-playbook -i inventory.ini windows_baseline.yml
```

### Nyttige muligheder

```bash
# Verbose output, good for troubleshooting
ansible-playbook -i inventory.ini windows_baseline.yml -v

# Maximum debug output
ansible-playbook -i inventory.ini windows_baseline.yml -vvv

# Dry run, see what would change without making changes
ansible-playbook -i inventory.ini windows_baseline.yml --check
```

### Forventet output

Et vellykket løb slutter med et PLAY RECAP som dette:

```
PLAY RECAP *******************************************************************
192.168.x.x    : ok=28   changed=15   unreachable=0    failed=0    skipped=2
```

- `ok` — opgaver, der kørte uden fejl
- `changed` — opgaver, der faktisk ændrede noget
- `skipped` — opgaver sprunget over (f.eks. tjenester, der ikke er installeret på dette billede)
- `failed` — skal være **0** for en ren kørsel

---

## Fejlfinding

| Problem | Løsning | |---|---| | `win_ping` fejler | Kontroller, at SSH-nøglen er korrekt,
og at `sshd` kører på serveren | | `WinDefend` Adgang nægtet | Forsvarer kan være politisk
kontrolleret. Afspilningsbogen bruger `ignore_errors` til denne opgave | | Tjenesten blev
ikke fundet | Normal — afspilningsbogen kontrollerer, om en tjeneste eksisterer, før den
forsøger at stoppe den | | TLS-ændringer gælder ikke | Kræver genstart — playbook udfører
dette automatisk i slutningen | | `rc=1` på PowerShell-opgaver | Tjek `stderr` i outputtet —
ofte en uventet udgangskode fra en PS-kommando |

---

## Det fulde billede

Her er det komplette flow, fra nul til hærdet:

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

Hele processen, fra en ny instans til en hærdet, patchet og reviderbar Windows-server, tager
omkring 15-30 minutter afhængigt af hvor mange Windows-opdateringer, der venter.

---

## Går videre

Spillebogen i denne vejledning dækker en solid basislinje til generelle formål, men hvis du
har brug for at opfylde en specifik overholdelsesstandard såsom CIS Benchmark eller DISA
STIG, så tag et kig på [Ansible Lockdown](https://github.com/ansible-lockdown). De
opretholder færdiglavede Ansible-roller til Windows Server 2016, 2019 og 2022, der
implementerer hundredvis af kontroller på tværs af både CIS- og STIG-frameworks, med
granulær tagging, så du kun kan anvende de niveauer eller kategorier, der er relevante for
dit miljø.

---

## Tillæg — windows_baseline.yml

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
