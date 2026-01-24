---
title: Updating Docker Apps
description: How to update Docker-based applications on xCloud hosting.
sidebar:
  order: 1
---

xCloud manages Docker applications but doesn't automatically update them. You'll need to manually update your Docker apps using the Server Command Runner.

## Prerequisites

- Access to your xCloud Server Dashboard
- The app must be deployed via Docker (most xCloud apps are)

## Important: SSH Limitations

Docker commands (`docker ps`, `docker exec`, etc.) **cannot be run via SSH** on xCloud. The SSH user doesn't have Docker socket permissions.

Instead, use the **Server Dashboard → Management → Commands** runner, which has the necessary permissions.

## Update Process

### Step 1: Access the Command Runner

1. Log into your xCloud dashboard
2. Go to your **Server Dashboard** (not the site dashboard)
3. Navigate to **Management → Commands**

### Step 2: Find Your Container

Run this command to see all running containers:

```bash
docker ps
```

Note your container name (e.g., `openwebui-openweb.jbmdcreations.dev`).

### Step 3: Pull the Latest Image

For OpenWebUI:
```bash
docker pull ghcr.io/open-webui/open-webui:main
```

For other apps, use their specific image (check the IMAGE column from `docker ps`).

### Step 4: Restart with New Image

Navigate to your app's directory and use docker compose:

```bash
cd /var/www/your-app-domain.com && docker compose up -d
```

This will:
- Stop the old container
- Remove it
- Create a new container with the updated image
- Preserve your data (stored in volumes)

## Example: Updating OpenWebUI

```bash
# Pull latest image
docker pull ghcr.io/open-webui/open-webui:main

# Restart the container
cd /var/www/openweb.jbmdcreations.dev && docker compose up -d
```

## Notes

- Use `docker compose` (with a space), not `docker-compose` (with hyphen)
- Your data is preserved in Docker volumes
- Check your app after updating to ensure it's working correctly
