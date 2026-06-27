# Domain Forwarding — ssdisabilityassociates.com → ssdisabilityassoc.com

## Context

`ssdisabilityassociates.com` is registered with Squarespace but DNS is **not** managed
by Squarespace. The nameservers are Microsoft 365 (`ns1-4.bdm.microsoftonline.com`),
meaning all DNS changes must be made in the **Microsoft 365 admin portal**, not Squarespace.

Email is on **Microsoft 365 / Exchange Online** (MX → `SSDISABILITYASSOCIATES-COM.mail.protection.outlook.com`).
This must not be disrupted.

**Authoritative DNS state (from SSDISABILITYASSOCIATES.COM.csv, 2026-06-27):**

| Type | Name | Value |
|------|------|-------|
| MX | @ | `SSDISABILITYASSOCIATES-COM.mail.protection.outlook.com` (priority 0) |
| CNAME | www | `ghs.googlehosted.com` (Google Sites legacy — safe to replace) |
| CNAME | autodiscover | `autodiscover.outlook.com` |
| CNAME | lyncdiscover | `webdir.online.lync.com` |
| CNAME | sip | `sipdir.online.lync.com` |
| CNAME | enterpriseenrollment | `enterpriseenrollment.manage.microsoft.com` |
| CNAME | enterpriseregistration | `enterpriseregistration.windows.net` |
| TXT | @ | `v=spf1 include:spf.protection.outlook.com -all` |
| SRV | _sipfederationtls._tcp | `sipfed.online.lync.com` |
| SRV | _sip._tls | `sipdir.online.lync.com` |
| NS | — | `ns1-4.bdm.microsoftonline.com` |

Note: The Squarespace DNS panel showed Google Workspace records — those are **inactive**
(Squarespace nameservers are not in use). The CSV above is the authoritative source.

## Recommendation: Squarespace registrar-level forwarding

Even though DNS is managed by Microsoft, Squarespace as the **registrar** can still apply
domain forwarding at the registrar layer (independent of nameservers). Try this first —
it's the simplest path and requires no DNS changes.

### Steps

1. Log in to Squarespace Domains
2. Open `ssdisabilityassociates.com` → **Forwarding** tab
3. Add forward:
   - **From:** `ssdisabilityassociates.com` (root)
   - **To:** `https://www.ssdisabilityassoc.com`
   - **Type:** 301 (Permanent)
4. Add a second forward: `www.ssdisabilityassociates.com` → `https://www.ssdisabilityassoc.com`
5. Save and test in a browser after ~15 minutes

### Fallback: Microsoft 365 DNS redirect via CNAME + web host

If Squarespace forwarding doesn't work with external nameservers:

1. In **Microsoft 365 admin → Domains → ssdisabilityassociates.com → DNS records**
2. Replace the existing `www` CNAME (`ghs.googlehosted.com` — inactive Google Sites legacy)
   with a CNAME pointing to wherever `ssdisabilityassoc.com` is hosted, **or**
3. Deploy a minimal redirect page (e.g., on Cloudflare Pages or Netlify) that issues a
   301 to `https://www.ssdisabilityassoc.com`, then point an A/CNAME at it
4. The root `@` cannot be a CNAME — use an A record or ALIAS/ANAME if the host supports it

### What NOT to do

- Do not switch nameservers back to Squarespace — would break Microsoft 365 email,
  Teams (SIP/Lync records), and Intune enrollment records
- Do not remove MX, SPF, or SRV records — all are live Microsoft 365 services
