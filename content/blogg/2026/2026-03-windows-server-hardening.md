---
title: "Automating Windows Server Hardening on Safespring Compute: From Launch to Locked Down"
date: "2026-03-17"
intro: "The result is a fully hardened Windows Server you can provision in one shot, hands-off, from the OpenStack CLI."
draft: false
sectiontext: "Tech Update"
section: "Tech update"
tags: ["English"]
showthedate: true
card: ""
eventbild: ""
socialmediabild: ""
language: "En"
author: "Gabriel Paues"
---


When you spin up a Windows Server instance in a cloud environment like Safespring Compute, you get a blank slate, no password, no SSH, no remote access at all. 

This post walks through the full automation chain: using cloudbase-init to bootstrap the instance at first boot, then running an Ansible playbook to apply a security baseline.

The result is a fully hardened Windows Server you can provision in one shot, hands-off, from the OpenStack CLI.

---

## The Problem With Fresh Windows Instances

Unlike Linux, a Windows instance launched without any User Data has:

- **No Administrator password** — the account exists but is inaccessible
- **No SSH** — only RDP and the OpenStack web console are available
- **No hardening** — default Windows settings are permissive

The only way in without automation is the Horizon web console, which is slow and does not scale. We need to fix all of this before the instance finishes booting.

---

## Step 1 — Bootstrap With Cloudbase-Init

Safespring Windows images ship with [cloudbase-init](https://cloudbase.it/cloudbase-init/) pre-installed. It works like cloud-init on Linux: it reads the User Data you supply at launch and executes it once on first boot.

Scripts must begin with `#ps1_sysnative` so cloudbase-init runs them in the 64-bit PowerShell host.

{{% disclaimer "Security note" %}} 
Anything in User Data may appear in cloudbase-init log files on the instance. Treat the password you set here as a temporary bootstrap credential, rotate it after first login, or use key-based SSH exclusively.
{{% /disclaimer %}}

### The cloudbase-init script

Paste this into the **Configuration > Customization Script** field in Horizon, or save it as a file and pass it with `--user-data`:

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

> **Before launching:** Open port 22 in your OpenStack Security Group, but restrict it to your own IP only. The first login uses password authentication (before your SSH key is in place), so exposing port 22 to the world at this stage is a significant risk. Find your current public IP with `curl ifconfig.me` and add a rule for `<your-ip>/32` on TCP port 22.

Or launch via the CLI:

```bash
openstack server create \
  --image "Windows Server 2022" \
  --flavor l2.c4r8 \
  --user-data windows-bootstrap.ps1 \
  my-windows-server
```

When the instance finishes booting, the Administrator account will have your password set and SSH will be listening on port 22.

---

## Step 2 — Set Up Key-Based SSH

Password-based SSH is only useful as a stepping stone. Before running Ansible, switch to key-based authentication so your automation never needs to handle plaintext credentials.

> **Tip:** Generate your key without a passphrase (`ssh-keygen -t rsa -b 4096 -f ~/.ssh/your-key.pem` and press Enter when asked for a passphrase). Ansible runs unattended, a passphrase-protected key will cause it to hang waiting for input.

### Log in with password and configure the key

```bash
ssh administrator@<server-ip>
```

On the Windows server (PowerShell):

```powershell
# Create the .ssh directory and authorized_keys file
New-Item -ItemType Directory -Path "C:\Users\Administrator\.ssh" -Force
New-Item -ItemType File -Path "C:\Users\Administrator\.ssh\authorized_keys" -Force

# Add your public key
Add-Content -Path "C:\Users\Administrator\.ssh\authorized_keys" -Value "ssh-rsa AAAA...your-key..."

# Lock down file permissions — SSH will refuse to use the file if permissions are too open
icacls "C:\Users\Administrator\.ssh\authorized_keys" /inheritance:r /grant "Administrator:F" /grant "SYSTEM:F"
```

### Check sshd_config

```powershell
Get-Content "C:\ProgramData\ssh\sshd_config"
```

Make sure these lines are present and **not** commented out:

```
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```

And make sure these lines at the bottom **are** commented out, they override the per-user `authorized_keys` for the Administrator account:

```
# Match Group administrators
#        AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys
```

If they are not commented, fix them:

```powershell
(Get-Content "C:\ProgramData\ssh\sshd_config") `
  -replace "Match Group administrators", "#Match Group administrators" `
  -replace "       AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys", `
           "#       AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys" `
  | Set-Content "C:\ProgramData\ssh\sshd_config"

Restart-Service sshd
```

Test key-based login from your local machine:

```bash
ssh -i ~/.ssh/your-key.pem administrator@<server-ip>
```

Once you are in and have confirmed the key works, disable password authentication.

### Disable password login over SSH

Back on the Windows server (now connected with your key):

```powershell
(Get-Content "C:\ProgramData\ssh\sshd_config") `
  -replace "#PasswordAuthentication yes", "PasswordAuthentication no" `
  -replace "PasswordAuthentication yes", "PasswordAuthentication no" `
  | Set-Content "C:\ProgramData\ssh\sshd_config"

Restart-Service sshd
```

Verify that password login is now rejected by opening a second terminal and trying without the key:

```bash
ssh administrator@<server-ip>
```

You should get `Permission denied (publickey)`, that is the expected result. From this point on, only key holders can log in over SSH.

You can also tighten the Security Group rule now if you want: since Ansible will be connecting from a known host, you can restrict port 22 to just that machine instead of your workstation IP.

---

## Step 3 — Install Ansible

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

Verify:

```bash
ansible --version
```

---

## Step 4 — Create the Inventory File

Clone or navigate to your `ansible-windows` project directory:

```bash
mkdir -p ~/ansible-windows
cd ~/ansible-windows
```

Create `inventory.ini`:

```ini
[windows]
<your-server-ip>

[windows:vars]
ansible_user=administrator
ansible_connection=ssh
ansible_shell_type=powershell
ansible_ssh_private_key_file=~/.ssh/your-key.pem
```

Replace `<your-server-ip>` with the instance's IP address and update the path to your SSH private key.

### Verify connectivity

Before running the hardening playbook, confirm Ansible can reach the host:

```bash
ansible windows -i inventory.ini -m ansible.windows.win_ping
```

Expected output:

```json
192.168.x.x | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```

If this fails, check that:
- The SSH key matches what you added to `authorized_keys`
- The `sshd` service is running on the Windows host
- Your OpenStack Security Group allows TCP port 22 from your IP

---

## Step 5 — Run the Hardening Playbook

The `windows_baseline.yml` playbook applies a comprehensive security baseline in nine steps:

| Step | What it does |
|---|---|
| **1. Windows Update** | Installs all security and critical updates, reboots if required |
| **2. Services** | Disables dangerous/unnecessary services (Telnet, FTP, Remote Registry, Xbox, Print Spooler, etc.) |
| **3. SMB hardening** | Disables SMBv1, disables compression (CVE-2020-0796 mitigation), requires SMB signing |
| **4. Registry hardening** | Forces NTLMv2, disables LM hash storage, disables WDigest, enables LSA protection and UAC |
| **5. Audit policy** | Enables logging for logon events, account management, privilege use, and process creation |
| **6. Password policy** | Minimum 14 characters, 90-day expiry, lockout after 5 failed attempts |
| **7. Windows Defender** | Starts the Defender service, enables real-time protection, updates signatures |
| **8. TLS hardening** | Disables SSL 2.0/3.0 and TLS 1.0/1.1, enables TLS 1.2 and TLS 1.3 |
| **9. PowerShell logging** | Enables script block logging and module logging — all PowerShell activity is written to the event log |
| **10. Event log sizing** | Increases Security log to ~192 MB, System and Application logs to ~32 MB each |
| **11. Final reboot** | Reboots to apply all changes |

{{% note "No Firewall" %}}
Windows Firewall is disabled on this platform. Network-level access control is handled entirely by OpenStack Security Groups.
{{% /note %}}

### Run it

```bash
cd ~/ansible-windows
ansible-playbook -i inventory.ini windows_baseline.yml
```

### Useful options

```bash
# Verbose output, good for troubleshooting
ansible-playbook -i inventory.ini windows_baseline.yml -v

# Maximum debug output
ansible-playbook -i inventory.ini windows_baseline.yml -vvv

# Dry run, see what would change without making changes
ansible-playbook -i inventory.ini windows_baseline.yml --check
```

### Expected output

A successful run ends with a PLAY RECAP like this:

```
PLAY RECAP *******************************************************************
192.168.x.x    : ok=28   changed=15   unreachable=0    failed=0    skipped=2
```

- `ok` — tasks that ran without error
- `changed` — tasks that actually modified something
- `skipped` — tasks skipped (e.g., services not installed on this image)
- `failed` — must be **0** for a clean run

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `win_ping` fails | Check that the SSH key is correct and `sshd` is running on the server |
| `WinDefend` Access Denied | Defender may be policy-controlled. The playbook uses `ignore_errors` for this task |
| Service not found | Normal — the playbook checks whether a service exists before attempting to stop it |
| TLS changes not applying | Requires reboot — the playbook performs this automatically at the end |
| `rc=1` on PowerShell tasks | Check `stderr` in the output — often an unexpected exit code from a PS command |

---

## The Full Picture

Here is the complete flow, from zero to hardened:

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

## Going Further

The playbook in this guide covers a solid general-purpose baseline, but if you need to meet a specific compliance standard such as CIS Benchmark or DISA STIG, take a look at [Ansible Lockdown](https://github.com/ansible-lockdown). They maintain ready-made Ansible roles for Windows Server 2016, 2019, and 2022 that implement hundreds of controls across both CIS and STIG frameworks, with granular tagging so you can apply only the levels or categories relevant to your environment.

---

## Appendix — windows_baseline.yml

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