---
ai: true
title: "Automatisera härdning av Windows Server på Safespring Compute: från start till låst system"
date: "2026-03-17"
intro: "Resultatet är en fullt härdad Windows Server som du kan provisionera i ett enda steg, utan handpåläggning, från OpenStack CLI."
draft: false
sectiontext: "Teknikuppdatering"
section: "Teknikuppdatering"
tags: ["windows", "compute"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "sv"
author: "Gabriel Paues"
aliases:
  - /blogg/2026/2026-03-windows-server-hardening/
  - /blogg/2026-03-windows-server-hardening/
---

När du startar en Windows Server-instans i en molnmiljö som Safespring Compute får du ett tomt utgångsläge: inget lösenord, ingen SSH och ingen fjärråtkomst alls.

Det här inlägget går igenom hela automationskedjan: först används cloudbase-init för att boota upp instansen vid första start, därefter körs en Ansible-playbook som applicerar en säkerhetsbaslinje.

Resultatet är en fullt härdad Windows Server som du kan provisionera i ett enda steg, utan handpåläggning, från OpenStack CLI.

---

## Problemet med nya Windows-instanser

Till skillnad från Linux har en Windows-instans som startas utan User Data:

- **Inget Administrator-lösenord** - kontot finns men går inte att använda.
- **Ingen SSH** - bara RDP och OpenStacks webbkonsol är tillgängliga.
- **Ingen härdning** - Windows standardinställningar är tillåtande.

Utan automation är Horizon-konsolen den enda vägen in, och den är både långsam och svår att skala. Vi behöver lösa allt detta innan instansen har startat färdigt.

---

## Steg 1 - Bootstrappa med Cloudbase-Init

Safesprings Windows-avbildningar levereras med [cloudbase-init](https://cloudbase.it/cloudbase-init/) förinstallerat. Det fungerar som cloud-init på Linux: det läser den User Data du skickar med vid start och kör den en gång vid första boot.

Skript måste börja med `#ps1_sysnative` så att cloudbase-init kör dem i 64-bitars PowerShell.

{{% disclaimer "Säkerhetsnotering" %}} 
Allt i User Data kan hamna i cloudbase-init-loggar på instansen. Behandla lösenordet du sätter här som en tillfällig bootstrap-uppgift, rotera det efter första inloggningen eller använd enbart nyckelbaserad SSH.
{{% /disclaimer %}}

### cloudbase-init-skriptet

Klistra in detta i fältet **Configuration > Customization Script** i Horizon, eller spara det som en fil och skicka med den via `--user-data`:

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

> **Före start:** Öppna port 22 i din OpenStack Security Group, men begränsa den till din egen IP-adress. Första inloggningen använder lösenordsautentisering innan SSH-nyckeln är på plats, så att exponera port 22 mot internet i det här skedet är en tydlig risk. Hitta din publika IP med `curl ifconfig.me` och lägg till en regel för `<your-ip>/32` på TCP-port 22.

Eller starta via CLI:

```bash
openstack server create \
  --image “windows-server-2022” \
  --flavor l2.c4r8 \
  --user-data windows-bootstrap.ps1 \
  my-windows-server
```

När instansen har startat färdigt har Administrator-kontot fått ditt lösenord och SSH lyssnar på port 22.

---

## Steg 2 - Sätt upp nyckelbaserad SSH

Lösenordsbaserad SSH är bara användbar som ett första steg. Innan du kör Ansible bör du byta till nyckelbaserad autentisering så att automationen aldrig behöver hantera lösenord i klartext.

> **Tips:** Skapa nyckeln utan lösenfras (`ssh-keygen -t rsa -b 4096 -f ~/.ssh/your-key.pem` och tryck Enter när du ombeds ange lösenfras). Ansible körs utan interaktiv inmatning, och en lösenfrasskyddad nyckel gör att körningen fastnar i väntan på input.

### Logga in med lösenord och konfigurera nyckeln

```bash
ssh administrator@<server-ip>
```

På Windows-servern (PowerShell):

```powershell
# Create the .ssh directory and authorized_keys file
New-Item -ItemType Directory -Path "C:\Users\Administrator\.ssh" -Force
New-Item -ItemType File -Path "C:\Users\Administrator\.ssh\authorized_keys" -Force

# Add your public key
Add-Content -Path "C:\Users\Administrator\.ssh\authorized_keys" -Value "ssh-rsa AAAA...your-key..."

# Lock down file permissions — SSH will refuse to use the file if permissions are too open
icacls "C:\Users\Administrator\.ssh\authorized_keys" /inheritance:r /grant "Administrator:F" /grant "SYSTEM:F"
```

### Kontrollera sshd_config

```powershell
Get-Content "C:\ProgramData\ssh\sshd_config"
```

Kontrollera att de här raderna finns och **inte** är bortkommenterade:

```
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```

Kontrollera också att de här raderna längst ned **är** bortkommenterade. De åsidosätter annars `authorized_keys` per användare för Administrator-kontot:

```
# Match Group administrators
#        AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys
```

Om de inte är bortkommenterade, rätta dem:

```powershell
(Get-Content "C:\ProgramData\ssh\sshd_config") `
  -replace "Match Group administrators", "#Match Group administrators" `
  -replace "       AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys", `
           "#       AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys" `
  | Set-Content "C:\ProgramData\ssh\sshd_config"

Restart-Service sshd
```

Testa nyckelbaserad inloggning från din lokala maskin:

```bash
ssh -i ~/.ssh/your-key.pem administrator@<server-ip>
```

När du är inne och har bekräftat att nyckeln fungerar, stäng av lösenordsautentisering.

### Stäng av lösenordsinloggning via SSH

Tillbaka på Windows-servern, nu ansluten med din nyckel:

```powershell
(Get-Content "C:\ProgramData\ssh\sshd_config") `
  -replace "#PasswordAuthentication yes", "PasswordAuthentication no" `
  -replace "PasswordAuthentication yes", "PasswordAuthentication no" `
  | Set-Content "C:\ProgramData\ssh\sshd_config"

Restart-Service sshd
```

Verifiera att lösenordsinloggning nu nekas genom att öppna en andra terminal och försöka utan nyckeln:

```bash
ssh administrator@<server-ip>
```

Du ska få `Permission denied (publickey)`, vilket är det förväntade resultatet. Från och med nu kan bara nyckelinnehavare logga in via SSH.

Du kan också skärpa Security Group-regeln nu om du vill: eftersom Ansible ansluter från en känd host kan du begränsa port 22 till just den maskinen i stället för din arbetsstations IP.

---

## Steg 3 - Installera Ansible

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

Verifiera:

```bash
ansible --version
```

---

## Steg 4 - Skapa inventory-filen

Klona eller gå till din projektkatalog för `ansible-windows`:

```bash
mkdir -p ~/ansible-windows
cd ~/ansible-windows
```

Skapa `inventory.ini`:

```ini
[windows]
<your-server-ip>

[windows:vars]
ansible_user=administrator
ansible_connection=ssh
ansible_shell_type=powershell
ansible_ssh_private_key_file=~/.ssh/your-key.pem
```

Ersätt `<your-server-ip>` med instansens IP-adress och uppdatera sökvägen till din privata SSH-nyckel.

### Verifiera anslutning

Innan du kör härdnings-playbooken, bekräfta att Ansible når hosten:

```bash
ansible windows -i inventory.ini -m ansible.windows.win_ping
```

Förväntad output:

```json
192.168.x.x | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```

Om detta misslyckas, kontrollera att:
- SSH-nyckeln matchar det du lade till i `authorized_keys`
- `sshd`-tjänsten kör på Windows-hosten
- din OpenStack Security Group tillåter TCP-port 22 från din IP

---

## Steg 5 - Kör härdnings-playbooken

Playbooken `windows_baseline.yml` applicerar en bred säkerhetsbaslinje i elva steg:

| Steg | Vad det gör |
|---|---|
| **1. Windows Update** | Installerar alla säkerhets- och kritiska uppdateringar, startar om vid behov |
| **2. Tjänster** | Stänger av farliga eller onödiga tjänster som Telnet, FTP, Remote Registry, Xbox, Print Spooler med flera |
| **3. SMB-härdning** | Stänger av SMBv1, stänger av komprimering som mitigation för CVE-2020-0796 och kräver SMB-signering |
| **4. Registry-härdning** | Tvingar NTLMv2, stänger av LM hash-lagring, stänger av WDigest och aktiverar LSA-skydd och UAC |
| **5. Audit policy** | Aktiverar loggning för inloggningar, kontohantering, privilegieanvändning och processskapande |
| **6. Lösenordspolicy** | Minst 14 tecken, 90 dagars giltighetstid och låsning efter 5 misslyckade försök |
| **7. Windows Defender** | Startar Defender-tjänsten, aktiverar realtidsskydd och uppdaterar signaturer |
| **8. TLS-härdning** | Stänger av SSL 2.0/3.0 och TLS 1.0/1.1, aktiverar TLS 1.2 och TLS 1.3 |
| **9. PowerShell-loggning** | Aktiverar script block logging och module logging, så att all PowerShell-aktivitet skrivs till eventloggen |
| **10. Storlek på eventloggar** | Ökar Security-loggen till cirka 192 MB och System/Application till cirka 32 MB vardera |
| **11. Slutomstart** | Startar om för att applicera alla ändringar |

{{% note "Ingen brandvägg" %}}
Windows Firewall är avstängd på den här plattformen. Åtkomstkontroll på nätverksnivå hanteras helt av OpenStack Security Groups.
{{% /note %}}

### Kör den

```bash
cd ~/ansible-windows
ansible-playbook -i inventory.ini windows_baseline.yml
```

### Användbara alternativ

```bash
# Utförligare output, bra för felsökning
ansible-playbook -i inventory.ini windows_baseline.yml -v

# Maximal debug-output
ansible-playbook -i inventory.ini windows_baseline.yml -vvv

# Torrkörning, visa vad som skulle ändras utan att göra ändringar
ansible-playbook -i inventory.ini windows_baseline.yml --check
```

### Förväntad output

En lyckad körning avslutas med en PLAY RECAP som denna:

```
PLAY RECAP *******************************************************************
192.168.x.x    : ok=28   changed=15   unreachable=0    failed=0    skipped=2
```

- `ok` - uppgifter som kördes utan fel
- `changed` - uppgifter som faktiskt ändrade något
- `skipped` - uppgifter som hoppades över, till exempel tjänster som inte finns i avbilden
- `failed` - måste vara **0** för en ren körning

---

## Felsökning

| Problem | Lösning |
|---|---|
| `win_ping` misslyckas | Kontrollera att SSH-nyckeln är korrekt och att `sshd` kör på servern |
| `WinDefend` Access Denied | Defender kan vara policystyrt. Playbooken använder `ignore_errors` för den uppgiften |
| Tjänst saknas | Normalt - playbooken kontrollerar om en tjänst finns innan den försöker stoppa den |
| TLS-ändringar slår inte igenom | Kräver omstart - playbooken gör detta automatiskt i slutet |
| `rc=1` på PowerShell-uppgifter | Kontrollera `stderr` i outputen, ofta handlar det om en oväntad exit code från ett PowerShell-kommando |

---

## Hela flödet

Här är hela flödet, från tom instans till härdad server:

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

The entire process, from a fresh instance to a hardened, patched, and auditable Windows Server, takes about 15–30 minutes depending on how many Windows updates are pending.

---

## Gå vidare

Playbooken i den här guiden täcker en stabil generell baslinje. Om du behöver möta en specifik efterlevnadsstandard, till exempel CIS Benchmark eller DISA STIG, kan du titta på [Ansible Lockdown](https://github.com/ansible-lockdown). De underhåller färdiga Ansible-roller för Windows Server 2016, 2019 och 2022 som implementerar hundratals kontroller från både CIS- och STIG-ramverk, med granulär taggning så att du kan applicera just de nivåer eller kategorier som är relevanta för din miljö.

---

## Appendix - windows_baseline.yml

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
