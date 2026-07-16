# Deploying ss-disability-assoc to a DigitalOcean Droplet

**Status:** Documented, not yet executed against the live droplet.

## Scope

This covers deploying **`ss-disability-assoc/`** only — the Astro marketing site. It is a
static site (`astro build` produces `dist/`, served by nginx). It has no server-side runtime,
database, or API dependency, so it does not need Docker or the `docker-compose.yml` stack used
by the testimonials app (`server/` + `prj-web/` + MongoDB). That stack has its own deployment
path and is out of scope here.

Target droplet: **plasticlake** (already provisioned).

## Prerequisites on the droplet

- Ubuntu (matches the droplet's existing image)
- Node.js **>= 22.12.0** (required by `ss-disability-assoc/package.json` `engines`)
- `nginx`
- `git`
- `certbot` + `python3-certbot-nginx` (for TLS)

```bash
apt update
apt install -y nginx git certbot python3-certbot-nginx

# Node 22.x via NodeSource (Ubuntu's default apt repo is usually too old)
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
node -v   # confirm >= 22.12.0
```

## DNS

The live site's canonical domain is `ssdisabilityassoc.com` (with `ssdisabilityassociates.com`
301-forwarding to it — see
[domain-forwarding-ssdisabilityassociates](plans/domain-forwarding-ssdisabilityassociates.md)).
That plan doesn't record where `ssdisabilityassoc.com` itself is hosted/DNS-managed — confirm
that before pointing anything at the droplet. Once known:

- Add an **A record** for `ssdisabilityassoc.com` (and `www`) → the droplet's public IP.
- **Do not** touch `ssdisabilityassociates.com`'s Microsoft 365 DNS (MX/SPF/SRV records) —
  that domain only needs its existing forward to keep pointing at `ssdisabilityassoc.com`.

## One-time setup

1. **Clone the repo** somewhere outside nginx's web root, e.g.:

   ```bash
   mkdir -p /srv
   cd /srv
   git clone https://github.com/kcwms-org/prj-vm.git
   cd prj-vm/ss-disability-assoc
   ```

2. **Install and build**:

   ```bash
   npm ci
   npm run build
   ```

   This produces `/srv/prj-vm/ss-disability-assoc/dist/`.

3. **nginx site config** — create `/etc/nginx/sites-available/ssdisabilityassoc.com`:

   ```nginx
   server {
       listen 80;
       server_name ssdisabilityassoc.com www.ssdisabilityassoc.com;

       root /srv/prj-vm/ss-disability-assoc/dist;
       index index.html;

       location / {
           try_files $uri $uri/ $uri.html =404;
       }
   }
   ```

   Enable it:

   ```bash
   ln -s /etc/nginx/sites-available/ssdisabilityassoc.com /etc/nginx/sites-enabled/
   nginx -t
   systemctl reload nginx
   ```

4. **TLS via certbot** (rewrites the config above to add the HTTPS server block and
   HTTP→HTTPS redirect, and sets up auto-renewal):

   ```bash
   certbot --nginx -d ssdisabilityassoc.com -d www.ssdisabilityassoc.com
   ```

## Repeatable deploy (after the first setup)

A deploy is just: pull, reinstall if dependencies changed, rebuild. nginx serves whatever is
in `dist/` on the next request — no reload or restart needed since it's static files.

```bash
cd /srv/prj-vm/ss-disability-assoc
git pull
npm ci
npm run build
```

Save this as `/srv/prj-vm/ss-disability-assoc/deploy.sh` on the droplet for convenience:

```bash
#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
git pull
npm ci
npm run build
echo "Deployed $(git rev-parse --short HEAD)"
```

```bash
chmod +x deploy.sh
```

Run it manually over SSH after merging changes to `main`:

```bash
ssh <user>@<droplet-ip> "/srv/prj-vm/ss-disability-assoc/deploy.sh"
```

## Future automation (optional)

A GitHub Actions workflow that SSHes into the droplet and runs `deploy.sh` on push to `main`
would remove the manual step. Not set up yet — this doc covers the manual path first.

## Why not Docker for this site

The testimonials app (`server/`, `prj-web/`, MongoDB) already uses `docker-compose.yml`
because it's a multi-service stack. `ss-disability-assoc` is a single static-file output;
wrapping nginx-over-static-files in a container adds a layer of indirection with no benefit
for a standalone droplet. If this site later needs to run alongside the testimonials app in
the same Compose stack, add it as an `nginx-static` service mounting `dist/` — that's a small
addition, not a rewrite of this plan.
