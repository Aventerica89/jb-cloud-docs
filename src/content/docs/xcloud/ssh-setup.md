---
title: SSH Access Setup
description: How to set up SSH access to your xCloud server.
sidebar:
  order: 0
---

This guide covers setting up SSH key authentication for your xCloud server.

## Generate an SSH Key

If you don't have an SSH key, create one:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/id_xcloud
```

You'll be prompted for a passphrase. macOS Keychain will remember it after first use.

## Add Your Key to xCloud

1. Copy your public key:
   ```bash
   cat ~/.ssh/id_xcloud.pub | pbcopy
   ```

2. In xCloud, go to your **Site → Access Data → SSH/sFTP**

3. Click **"+ Add SSH Key"**

4. Paste your public key (must be one continuous line)

5. Give it a name (e.g., "MacBook")

6. Click **Add SSH Key**

7. **Important:** Click **Save** at the bottom of the page

## Connect to Your Server

```bash
ssh -i ~/.ssh/id_xcloud username@your-server-ip
```

Your SSH string is shown in the xCloud dashboard under **Access Data → SSH/sFTP**.

## First Connection

On first connect, you'll see a fingerprint verification prompt:

```
The authenticity of host 'x.x.x.x' can't be established.
ED25519 key fingerprint is SHA256:xxxxx
Are you sure you want to continue connecting (yes/no)?
```

Type `yes` to add the server to your known hosts.

## Troubleshooting

### Permission denied (publickey)

- Ensure you clicked **Save** after adding the key in xCloud
- Wait 1-2 minutes for the key to propagate
- Verify the correct key is being used: `ssh -v -i ~/.ssh/id_xcloud user@host`

### Key must be valid OpenSSH format

When pasting your key in xCloud, ensure:
- It's all on one continuous line
- Starts with `ssh-ed25519` or `ssh-rsa`
- No extra line breaks or spaces
