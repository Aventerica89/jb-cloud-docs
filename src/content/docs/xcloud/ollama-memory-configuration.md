---
title: Ollama Memory Configuration
description: How to increase Docker memory limits for Ollama on xCloud to run larger models.
sidebar:
  order: 2
  badge:
    text: New
    variant: tip
isNew: true
newUntil: "2026-02-01"
---

When running Ollama on xCloud, you may encounter memory errors like:

```
500: model requires more system memory (4.5 GiB) than is available (2.0 GiB)
```

This happens because the Ollama Docker container has a memory limit (often 2GB by default), even if your server has more RAM available.

## Prerequisites

- SSH access to your xCloud server (see [SSH Setup](/xcloud/ssh-setup))
- Access to the Server Command Runner in xCloud dashboard

## Diagnosing the Issue

### Check Container Memory Limit

Run via SSH or the xCloud Command Runner:

```bash
docker inspect $(docker ps -q --filter name=ollama) | grep -i memory
```

Look for the `"Memory"` value. `2147483648` = 2GB, which is often too low for larger models.

### Check Your Model Requirements

Different models require different amounts of RAM:
- **llama2-uncensored (7B)**: ~4.5GB
- **deepseek-r1:1.5b**: ~2GB
- **llama2:13b**: ~8GB
- **llama2:70b**: ~40GB+

## Fixing the Memory Limit

### Step 1: Get Current Container Configuration

Save the volume mount path before removing the container:

```bash
docker inspect ollama-your-domain.com --format '{{range .Mounts}}{{.Source}}:{{.Destination}}{{"\n"}}{{end}}'
```

Example output: `/var/www/your-domain.com/data:/root/.ollama`

### Step 2: Stop and Remove the Old Container

```bash
docker stop ollama-your-domain.com && docker rm ollama-your-domain.com
```

### Step 3: Recreate with More Memory

Replace `<VOLUME_PATH>` with your path from Step 1:

```bash
docker run -d --name ollama-your-domain.com --memory=12g --restart unless-stopped -p 127.0.0.1:18016:11434 -v <VOLUME_PATH>:/root/.ollama ollama/ollama:latest
```

For example:

```bash
docker run -d --name ollama-your-domain.com --memory=12g --restart unless-stopped -p 127.0.0.1:18016:11434 -v /var/www/your-domain.com/data:/root/.ollama ollama/ollama:latest
```

### Step 4: Verify the New Limit

```bash
docker inspect ollama-your-domain.com --format '{{.HostConfig.Memory}}'
```

Should return `12884901888` (12GB).

## Reconnecting Open WebUI

After recreating the Ollama container, Open WebUI may lose connection because the container is no longer on the same Docker network.

### Step 1: Find the Open WebUI Network

```bash
docker inspect $(docker ps -q --filter name=openweb) --format '{{range $k, $v := .NetworkSettings.Networks}}{{$k}}{{end}}'
```

### Step 2: Connect Ollama to the Network

```bash
docker network connect --alias ollama <NETWORK_NAME> ollama-your-domain.com
```

For example:

```bash
docker network connect --alias ollama your-openwebui-network-name ollama-your-domain.com
```

The `--alias ollama` is important because Open WebUI is configured to connect to `http://ollama:11434`.

### Step 3: Verify Connection

In Open WebUI:
1. Go to **Admin Settings > Connections**
2. Click the refresh button next to the Ollama API URL
3. You should see "server connection verified"

## Memory Limits Explained

The `--memory=12g` flag sets a **ceiling**, not a reservation:

- Ollama can use **up to** 12GB, but only consumes what it actually needs
- Other apps can freely use any RAM that Ollama isn't actively using
- No memory is pre-allocated or blocked from other containers

Your server's total RAM should be higher than the sum of all container limits to avoid the OOM (Out of Memory) killer terminating containers.

## Troubleshooting

### "Failed to fetch models" in Open WebUI

The Ollama container isn't reachable. Check:
1. Container is running: `docker ps | grep ollama`
2. Container is on the correct network (see Reconnecting section above)

### Model still shows memory error

Verify the container was recreated with the new limit:

```bash
docker inspect ollama-your-domain.com | grep '"Memory"'
```

If it still shows 2GB, the container wasn't properly recreated.

### Container won't start

Check Docker logs:

```bash
docker logs ollama-your-domain.com
```

## Using with Claude Code

Claude Code can assist with diagnosing and fixing Ollama memory issues. Here's how to leverage Claude for this task.

### Quick Diagnosis with Claude

Copy the output from the xCloud Command Runner and paste it to Claude:

```bash
# Run in Command Runner, paste output to Claude
docker inspect $(docker ps -q --filter name=ollama) | grep -i memory
```

Claude will:
- Interpret the memory values (e.g., `2147483648` = 2GB)
- Recommend appropriate memory limits for your model
- Generate the exact commands to fix the issue

### Claude-Assisted Workflow

**Step 1: Tell Claude your situation**
> I'm getting "model requires more system memory (4.5 GiB) than is available (2.0 GiB)" when running llama2-uncensored on Ollama via xCloud.

**Step 2: Provide container info**
Run in Command Runner and paste to Claude:
```bash
docker inspect ollama-your-domain.com --format '{{range .Mounts}}{{.Source}}:{{.Destination}}{{"\n"}}{{end}}'
```

**Step 3: Claude generates fix commands**
Claude will provide the complete sequence:
```bash
# Stop and remove
docker stop ollama-your-domain.com && docker rm ollama-your-domain.com

# Recreate with proper memory
docker run -d --name ollama-your-domain.com \
  --memory=12g \
  --restart unless-stopped \
  -p 127.0.0.1:18016:11434 \
  -v /var/www/your-domain.com/data:/root/.ollama \
  ollama/ollama:latest
```

### Memory Recommendations by Model

Ask Claude: "What memory limit should I set for [model name]?"

Claude knows common model requirements:
| Model | Recommended `--memory` |
|-------|----------------------|
| deepseek-r1:1.5b | `4g` |
| llama2-uncensored (7B) | `8g` |
| llama2:13b | `12g` |
| llama2:70b | `48g` |

### Troubleshooting with Claude

When encountering issues, provide Claude with:
1. **Error message** - Exact text from Open WebUI or logs
2. **Container status** - Output of `docker ps | grep ollama`
3. **Memory config** - Output of `docker inspect ... | grep Memory`
4. **Network status** - For Open WebUI connection issues

Claude can help diagnose network issues, generate reconnection commands, and verify the fix worked.
