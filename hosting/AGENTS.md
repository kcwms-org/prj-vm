# AGENTS.md — hosting/

This file provides guidance to AI coding agents (Claude Code, and any tool that reads
`AGENTS.md`) when working in this directory.

> Note: This `hosting/` tree is **unrelated to the prj-vm testimonials app** at the repo
> root (kevcoder.com). It holds deployment/DNS notes for a separate property,
> **ssdisabilityassoc.com**. Nearest-file-wins, so this `AGENTS.md` governs `hosting/`.

## What this is

DNS, email, and hosting configuration notes for **ssdisabilityassoc.com**. There is no code
or build here — these are operational runbooks for changing live DNS without breaking the
existing site. The authoritative step-by-step lives in
[`ms365/dns_and_email.md`](ms365/dns_and_email.md); read it before touching any record.

## The setup (split web/email DNS — the part that's easy to break)

Two providers serve one domain, so web records and email records must be kept apart:

- **Web** is **Google Sites**, anchored by `CNAME www → ghs.googlehosted.com`. This record is
  load-bearing — replacing it (e.g. with a Microsoft `A @ → <IP>`) takes the live site down.
- **Email** is **Microsoft 365**. Only email-class records get added: `MX @`, the SPF `TXT @`,
  `CNAME autodiscover`, plus optional `_dmarc` TXT and the two DKIM CNAMEs M365 issues.
- **`dev.ssdisabilityassoc.com`** is an isolated dev subdomain via `CNAME dev → <app host>`;
  safe to change without affecting web or email.

Two domains are in play, and they are configured differently:

- `ssdisabilityassoc.com` — the primary; holds the real web + email records above.
- `ssdisabilityassociates.com` — an alias that **301-redirects** (`@` and `www`) to the
  primary. Use provider domain-forwarding, **not** a CNAME, so it stays a true redirect.

## Hard rules when editing DNS

- Never modify or remove `CNAME www → ghs.googlehosted.com`.
- Never add an `A @` pointing at Microsoft — email setup needs no apex A record.
- Keep a **single** SPF `TXT` record; if one already exists, merge includes into it rather
  than adding a second (e.g. `v=spf1 include:spf.protection.outlook.com include:_spf.google.com -all`).
- Email lives on `ssdisabilityassoc.com`, so that domain (not just
  `ssdisabilityassociates.com`) must be added and verified in M365.

The DNS provider is not yet recorded here; confirm it before giving UI-specific steps.
