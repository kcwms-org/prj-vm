# Domain Forwarding — ssdisabilityassociates.com → ssdisabilityassoc.com

## Context

`ssdisabilityassociates.com` is registered with Squarespace. The goal is to redirect all
traffic to the canonical domain `ssdisabilityassoc.com`. The domain has active Google
Workspace email (MX + SPF/DKIM records) that must not be disrupted.

**Current DNS state (as of 2026-06-27):**
- Nameservers: custom (third-party, not Squarespace) — Squarespace DNS records are inactive
- Email: Google Workspace MX records active (`aspmx.l.google.com` + alternates)
- Existing CNAME `www` → `ghs.googlehosted.com` (Google Sites legacy)

## Recommendation: Squarespace domain forwarding (registrar-level)

Use Squarespace's built-in forwarding — no DNS or nameserver changes required, email unaffected.

### Steps

1. Log in to Squarespace Domains
2. Open `ssdisabilityassociates.com` → **Forwarding** tab
3. Add forward:
   - **From:** `ssdisabilityassociates.com` (root)
   - **To:** `https://www.ssdisabilityassoc.com`
   - **Type:** 301 (Permanent)
4. Add a second forward for `www.ssdisabilityassociates.com` → `https://www.ssdisabilityassoc.com`
5. Save and test after a few minutes

### Why this approach

- Works regardless of which nameservers are active (registrar-level, not DNS-level)
- No risk to Google Workspace email records
- 301 permanent redirect is correct for SEO (signals canonical domain to search engines)
- No infrastructure to maintain

### What NOT to do

- Do not switch to Squarespace nameservers — would require re-entering all Google Workspace
  DNS records and risks email downtime
- Do not add an A record pointing to a redirect server — unnecessary complexity given
  Squarespace forwarding is available
