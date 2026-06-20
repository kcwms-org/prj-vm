Got it—this is enough context to give you a **precise, conflict-safe deployment plan** that won’t break your Google Site while you add Microsoft 365 email and a dev environment.

***

# ✅ ✅ Current State (Confirmed)

* ✅ `ssdisabilityassoc.com` → **Google Sites (live site)**
* ✅ You are adding **`ssdisabilityassociates.com` in Microsoft 365**
* ✅ You want **email on `ssdisabilityassoc.com`**
* ✅ You want a **dev subdomain**

***

# ⚠️ CRITICAL PRINCIPLE (READ THIS FIRST)

You are mixing **Google Sites (web)** + **Microsoft 365 (email)**

👉 This **is supported**, BUT ONLY IF:

* You **DO NOT change web records**
* You **ONLY add email-related DNS records**

***

# ✅ ✅ MASTER PLAN (SAFE ORDER)

Follow in this exact order:

***

# ✅ STEP 1 — DO NOT TOUCH Google Sites DNS

Your working site depends on:

```
CNAME
www → ghs.googlehosted.com
```

✅ This MUST remain exactly as-is  
❌ Do NOT replace it with Microsoft records

***

# ✅ STEP 2 — Configure Microsoft 365 (Email Only)

You already added:

```
ssdisabilityassociates.com
```

But your email is:

```
admin@ssdisabilityassoc.com
```

👉 Therefore you MUST:

### ✅ ALSO ADD:

```
ssdisabilityassoc.com
```

in Microsoft 365

***

## 2.1 Verify Domain

Add this TXT (from M365):

```
Type: TXT
Host: @
Value: MS=msXXXXXXXX
```

✅ Wait until verified

***

## 2.2 Add Email DNS (SAFE)

Add ONLY these records:

### 📩 MX (mail routing)

```
Type: MX
Host: @
Value: ssdisabilityassoc-com.mail.protection.outlook.com
Priority: 0
```

***

### ✅ SPF

```
Type: TXT
Host: @
Value: v=spf1 include:spf.protection.outlook.com -all
```

***

### ✅ Autodiscover

```
Type: CNAME
Host: autodiscover
Value: autodiscover.outlook.com
```

***

### ✅ (Optional but recommended)

#### DMARC

```
TXT
_dmarc → v=DMARC1; p=none
```

***

#### DKIM

Enable in Microsoft 365 → add 2 CNAMEs it gives you

***

## ⚠️ IMPORTANT: Check for existing SPF

If you already have a TXT SPF record, you must **merge**, not duplicate:

Example:

```
v=spf1 include:spf.protection.outlook.com include:_spf.google.com -all
```

***

# ✅ STEP 3 — Configure Alias Domain

## Goal:

```
ssdisabilityassociates.com → ssdisabilityassoc.com
```

***

## ✅ Solution: Domain Redirect (NOT DNS pointing)

In your DNS provider:

### Forward rules:

```
@      → https://ssdisabilityassoc.com
www    → https://ssdisabilityassoc.com
Type: 301
```

✅ This ensures:

* SEO consistency
* Users always land on your main domain

***

# ✅ STEP 4 — Configure `dev.ssdisabilityassoc.com`

This is isolated and safe.

***

## 4.1 Add DNS Record

If your redesigned site is on modern hosting (likely):

```
Type: CNAME
Host: dev
Value: your-app-hostname
```

Example:

```
dev → yourapp.azurewebsites.net
```

***

## 4.2 On Your Hosting Platform

Add custom domain:

```
dev.ssdisabilityassoc.com
```

Enable:

```
SSL / HTTPS
```

***

# ✅ STEP 5 — Final DNS Snapshot (CORRECT DESIGN)

## ✅ `ssdisabilityassoc.com`

```
CNAME   www            → ghs.googlehosted.com   ✅ KEEP (Google Sites)

MX      @              → ssdisabilityassoc-com.mail.protection.outlook.com

TXT     @              → v=spf1 include:spf.protection.outlook.com -all

CNAME   autodiscover   → autodiscover.outlook.com

CNAME   dev            → your-new-host

TXT     _dmarc         → v=DMARC1; p=none
```

***

## ✅ `ssdisabilityassociates.com`

```
Forward:
@      → https://ssdisabilityassoc.com
www    → https://ssdisabilityassoc.com
```

***

# ✅ STEP 6 — Validation Checklist

## 🌐 Website

* ✅ `ssdisabilityassoc.com` loads Google Site
* ✅ `www.ssdisabilityassoc.com` works
* ✅ `ssdisabilityassociates.com` redirects

***

## 📧 Email

* ✅ Send → <admin@ssdisabilityassoc.com>
* ✅ Receive → from Gmail
* ✅ Reply works

***

## 🧪 Dev Site

* ✅ <https://dev.ssdisabilityassoc.com> loads
* ✅ SSL valid

***

# ⚠️ COMMON BREAK SCENARIOS (Avoid These)

❌ Replacing:

```
www → ghs.googlehosted.com
```

❌ Adding:

```
A @ → Microsoft IP
```

❌ Multiple SPF records

❌ Using CNAME instead of redirect for alias domain

***

# 🚀 If You Want Me to Finish This With You

I can:

* ✅ Inspect your actual DNS live
* ✅ Tell you exactly what to delete/keep
* ✅ Walk your GoDaddy / Cloudflare UI step-by-step
* ✅ Verify M365 domain page settings

Just tell me your **DNS provider** 👍
