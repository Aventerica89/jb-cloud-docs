---
title: Domain Commands
description: Manage custom domains, DNS records, and SSL certificates with Vercel CLI.
sidebar:
  order: 3
---

Commands for managing domains, DNS, and SSL certificates.

## vercel domains

Manage custom domains for your Vercel projects.

### List domains

```bash
vercel domains ls
```

### Add a domain

```bash
# Add domain to current project
vercel domains add example.com

# Add to specific project
vercel domains add example.com my-project
```

### Remove a domain

```bash
vercel domains rm example.com
```

### Buy a domain

```bash
vercel domains buy example.com
```

### ELI5: How Domains Work

When you add a domain to Vercel, you need to prove you own it by adding a DNS record. Vercel will tell you exactly what to add. Once verified, your site will be accessible at that domain.

---

## vercel alias

Assign a domain or subdomain to a specific deployment.

### Set an alias

```bash
# Assign domain to deployment
vercel alias set https://my-app-abc123.vercel.app example.com

# Assign subdomain
vercel alias set https://my-app-abc123.vercel.app staging.example.com
```

### List aliases

```bash
vercel alias ls
```

### Remove an alias

```bash
vercel alias rm staging.example.com
```

### When to use aliases

- Point multiple domains to one deployment
- Create staging subdomains
- A/B test different deployments

---

## vercel dns

Manage DNS records for domains on Vercel.

### List DNS records

```bash
vercel dns ls example.com
```

### Add a DNS record

```bash
# A record
vercel dns add example.com @ A 76.76.21.21

# CNAME record
vercel dns add example.com www CNAME cname.vercel-dns.com

# TXT record (for verification)
vercel dns add example.com @ TXT "verification-string"

# MX record
vercel dns add example.com @ MX mail.example.com 10
```

### Remove a DNS record

```bash
vercel dns rm [record-id]
```

### ELI5: DNS Record Types

- **A** - Points a domain to an IP address
- **CNAME** - Points a domain to another domain
- **TXT** - Stores text (used for verification)
- **MX** - Points to email servers

Most of the time, Vercel sets these up automatically. You only need manual DNS commands for special cases like email or third-party services.

---

## vercel certs

Manage SSL certificates for your domains.

### List certificates

```bash
vercel certs ls
```

### Issue a certificate

```bash
vercel certs issue example.com
```

### Remove a certificate

```bash
vercel certs rm [cert-id]
```

### ELI5: SSL Certificates

SSL certificates make your site use `https://` instead of `http://`. This encrypts traffic so hackers can't see what users send to your site.

**Good news:** Vercel automatically issues free SSL certificates for all your domains. You rarely need these commands unless something goes wrong.

---

## Common Workflows

### Add a custom domain

```bash
# 1. Add the domain
vercel domains add myapp.com

# 2. Vercel tells you what DNS records to add
# 3. Add them at your registrar (or use Vercel DNS)
# 4. Wait for verification (usually a few minutes)

# 5. Deploy to production
vercel --prod
```

### Set up a staging subdomain

```bash
# Create staging alias pointing to a preview deployment
vercel alias set https://my-app-preview.vercel.app staging.myapp.com
```

### Transfer DNS to Vercel

If your domain is registered elsewhere but you want Vercel to manage DNS:

1. Go to your registrar
2. Change nameservers to Vercel's (shown in dashboard)
3. Use `vercel dns` commands to manage records

---

## Using with Claude Code

Ask Claude to manage your domains:

> "Add docs.myapp.com to my Vercel project"

Claude will run `vercel domains add` and tell you what DNS records to configure.

> "What domains are configured for this project?"

Claude will run `vercel domains ls` and summarize the results.

> "Set up a staging subdomain for my preview deployment"

Claude will run `vercel alias set` with the appropriate URLs.

---

## Related

- [Production Checklist](/vercel/production-checklist/) - Domain verification before launch
- [Deployment Commands](/vercel/cli/deployment/) - Deploy to your custom domain
