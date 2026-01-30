---
title: Security
description: Authentication, rate limiting, and security features in WP Manager
sidebar:
  order: 6
---

WP Manager includes built-in security features to protect your dashboard and the WordPress site credentials it manages.

## Authentication

WP Manager uses password-based authentication with JWT sessions.

### Enabling Authentication

Set the `ADMIN_PASSWORD` environment variable in your deployment:

```bash
# Vercel CLI
vercel env add ADMIN_PASSWORD

# Or in Vercel dashboard
# Settings > Environment Variables > Add
```

**Without `ADMIN_PASSWORD` set**, authentication is bypassed (useful for local development).

### Session Management

- Sessions are stored as HTTP-only cookies
- Session duration: 7 days
- JWT tokens are signed with `JWT_SECRET` (auto-generated if not set)
- Sessions are verified on every API request

### Login Flow

1. User visits any page
2. Middleware checks for valid session cookie
3. If no valid session, redirects to `/login`
4. User enters password
5. On success, JWT cookie is set and user is redirected to dashboard

## Rate Limiting

Protects against brute force attacks and API abuse.

| Endpoint Type | Limit |
|--------------|-------|
| General API | 100 requests/minute |
| Login attempts | 5 attempts/minute |

Rate limits reset after the window expires. Exceeded limits return HTTP 429 (Too Many Requests).

## Security Headers

All responses include security headers:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Content-Type-Options` | `nosniff` | Prevent MIME sniffing |
| `X-Frame-Options` | `DENY` | Prevent clickjacking |
| `X-XSS-Protection` | `1; mode=block` | XSS filter |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Control referrer info |

## Input Validation

All API endpoints validate input:

- **ID parameters**: Must be positive integers
- **Search queries**: LIKE wildcards are escaped to prevent SQL injection
- **URLs**: Must be valid HTTP/HTTPS URLs
- **Required fields**: Validated before database operations

## Credential Storage

WordPress site credentials are encrypted at rest:

- API passwords are encrypted using `ENCRYPTION_SECRET`
- Encryption key should be 32+ characters
- Credentials are decrypted only when connecting to WordPress sites

### Setting Up Encryption

```bash
# Generate a secure key
openssl rand -base64 32

# Add to environment
ENCRYPTION_SECRET=your-generated-key-here
```

## Error Handling

Error responses are sanitized to prevent information leakage:

- Stack traces are not exposed in production
- Sensitive field names (password, token, key, secret) are redacted from logs
- Generic error messages are returned to clients
- Detailed errors only shown in development mode

## IP Address Masking

When exporting site data, IP addresses are masked by default:

```
Full IP: 192.168.1.100
Masked:  192.xxx.xxx.xxx
```

To include full IPs in exports, explicitly pass `?includeIps=true`.

## Best Practices

1. **Always set `ADMIN_PASSWORD` in production**
2. **Use a strong `ENCRYPTION_SECRET`** (32+ characters)
3. **Keep dependencies updated** (`npm audit`)
4. **Use HTTPS** (handled by Vercel automatically)
5. **Rotate credentials** if you suspect compromise

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ADMIN_PASSWORD` | Production | Dashboard login password |
| `JWT_SECRET` | No | Custom JWT signing key (auto-generated if not set) |
| `ENCRYPTION_SECRET` | Yes | Key for encrypting WordPress credentials |
| `TURSO_DATABASE_URL` | Yes | Database connection URL |
| `TURSO_AUTH_TOKEN` | Yes | Database auth token |

## Using with Claude Code

Claude Code can help you implement security features, audit code for vulnerabilities, and manage secure deployments.

### Security Audits

Ask Claude to review your code for security issues:

> Audit the WP Manager codebase for security vulnerabilities

Claude will check for:
- SQL injection risks (LIKE wildcards, raw queries)
- XSS vulnerabilities (unsanitized HTML)
- Credential exposure (hardcoded secrets, logs)
- Authentication bypasses
- CSRF token issues
- Rate limiting gaps

### Setting Up Encryption

Claude can generate secure encryption keys:

> Generate a secure encryption key for WP Manager

Claude runs:
```bash
openssl rand -base64 32
# Output: dGhpc2lzYXNlY3VyZTMyY2hhcmFjdGVya2V5Zm9yZW5j

# Claude then helps you add it to Vercel
vercel env add ENCRYPTION_SECRET
```

### Implementing Rate Limiting

Add rate limiting to new endpoints:

> Add rate limiting to the /api/sites/export endpoint

Claude will:
1. Create rate limiting middleware
2. Apply it to the endpoint
3. Write tests for rate limit enforcement
4. Add proper error responses (HTTP 429)

Example implementation Claude might generate:
```typescript
// lib/rateLimit.ts
import rateLimit from 'express-rate-limit'

export const exportLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 exports per window
  message: 'Too many export requests, please try again later'
})

// app/api/sites/export/route.ts
import { exportLimiter } from '@/lib/rateLimit'

export async function GET(request: Request) {
  await exportLimiter(request)
  // ... export logic
}
```

### Credential Rotation

When credentials are compromised:

> Help me rotate the ENCRYPTION_SECRET without losing existing site credentials

Claude will guide you through:
1. Decrypt all credentials with old key
2. Generate new encryption key
3. Re-encrypt credentials with new key
4. Update environment variable
5. Verify all sites still work

### Adding Security Headers

Implement additional security headers:

> Add Content-Security-Policy header to WP Manager

Claude generates middleware:
```typescript
export function securityHeaders(response: Response) {
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
  )
  return response
}
```

### Penetration Testing Support

Claude can help you test security:

> Test if the login endpoint is vulnerable to brute force

Claude will:
- Generate test scripts to attempt rapid login attempts
- Verify rate limiting works correctly
- Check for timing attacks in authentication
- Suggest improvements based on test results

### Secure Deployment Checklist

Ask Claude to verify production readiness:

> Is WP Manager ready for production deployment?

Claude checks:
- ✓ ADMIN_PASSWORD is set
- ✓ ENCRYPTION_SECRET is strong (32+ chars)
- ✓ JWT_SECRET is unique (not default)
- ✓ HTTPS is enforced
- ✓ Security headers are present
- ✓ Rate limiting is active
- ✓ Error messages don't leak info
- ✓ Dependencies have no critical CVEs
