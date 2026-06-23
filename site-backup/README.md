# Site backup — ssdisabilityassoc.com

Static snapshot of the live **SS Disability Associates, LLC** website
(<https://www.ssdisabilityassoc.com/home>), captured for archival/reference.

- **Captured:** 2026-06-23
- **Source platform:** Google Sites (page content rendered client-side; assets served from Google CDNs)
- **Tool:** `wget --mirror --page-requisites --convert-links`

## Contents

### `www.ssdisabilityassoc.com/` — page HTML
| File | Live URL |
| --- | --- |
| `home.html` / `index.html` | `/home`, `/` |
| `about.html` | `/about` |
| `about/connect.html` | `/about/connect` |
| `about/testimonials.html` | `/about/testimonials` |
| `about/the-privacy-policy.html` | `/about/the-privacy-policy` |
| `about/the-terms-and-conditions.html` | `/about/the-terms-and-conditions` |
| `q-a.html` | `/q-a` |
| `contacts.html` | `/contacts` |
| `online-appointments.html` | `/online-appointments` |

### `assets/` — CSS / icons / fonts pulled from Google CDNs (`gstatic.com`, `googleusercontent.com`)

## Caveats

- Google Sites pages are JavaScript-rendered, so the saved HTML preserves the **text
  content and structure** but will not reproduce the live site pixel-for-pixel offline.
- Content photos hosted on `lh*.googleusercontent.com` use opaque, expiring URLs; some
  may not be captured. The `assets/` folder is mostly Google Sites UI chrome.
- This is a reference snapshot, not a redeployable copy of the site.
