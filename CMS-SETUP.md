# CMS & Auto-Deploy Setup Guide

WordPress is the editing screen for the site. When you save content there, the site
automatically rebuilds (via GitHub Actions) and the new version is uploaded to
Bluehost. You never have to touch code or upload files.

```
WordPress (Bluehost)          GitHub.com (repo)                   Bluehost (live site)
  ┌────────────────┐            ┌──────────────────┐              ┌───────────────┐
  │ edit & publish │  save →   │ Actions builds     │  FTP →       │ public_html/   │
  │ content        │  dispatch │ the static site    │  upload      │ your site      │
  └────────────────┘            └──────────────────┘              └───────────────┘
        ▲                                                                 │
        └────────────  build pulls wp-json/crl/v1/all data  ──────────────┘
```

---

## 1. Hosting & WordPress (Bluehost)

1. In Bluehost, create a WordPress site on your domain (Bluehost installs
   WordPress for you during setup).
2. It will be reachable at something like `https://yoursite.com/wp` or
   `https://yoursite.com`. Remember this address — it is your **WordPress URL**.
3. Log into the WordPress admin: `https://yoursite.com/wp/wp-admin`.

## 2. Install the two plugins

1. Plugins → Add New → search **Advanced Custom Fields** → Install → Activate.
   (The free version is enough — do **not** need Pro.)
2. Upload **Crestline Headless**:
   - Zip the `cms/wordpress/crl-headless` folder from this project into
     `crl-headless.zip`.
   - Plugins → Add New → Upload Plugin → choose the zip → Install Now → Activate.

After activation you'll see new menu items: **Attorneys**, **Practice Areas**,
**Testimonials**, **Case Results**, **FAQs**, **Careers**, plus **Posts → Insights**.

## 3. Fill in firm details

Go to **Settings → Crestline Headless**. Fill in:

- Firm name, legal name, tagline, description, established year, phone, email, address.
- Opening hours: two lines in the format `Monday – Friday | 8:00 AM – 5:00 PM`
  (days on the left, time on the right, separated by `|`).
- Social URLs (LinkedIn, Twitter/X, Facebook, Instagram).
- Home page statistics: one line each, e.g. `20+ | Years of practice`.
- Press **Save settings**.

## 4. Add your content

Everything editable lives under its own menu. The slug (auto-created from the title)
becomes the URL, so use short titles, e.g. "Litigation & Dispute Resolution".

| Menu | Becomes |
| --- | --- |
| Posts → Insights | Blog articles at `/insights/…` |
| Attorneys | `/attorneys/…` |
| Practice Areas | `/practice-areas/…` |
| Testimonials | Home page quote carousel |
| Case Results | `/case-results` |
| FAQs | `/faq` |
| Careers | `/careers` |
| Settings → Crestline Headless | Footer, logo, contact page, stats |

Tips for the editor screens:

- Multi-item lists (education, qualifications, languages, services, …) — one item
  **per line**.
- Paired items use `Title | Value` per line, e.g. experience `Crestline Law | 2005–present`,
  publications `Article title | 2024`, practice-area results `Acme v. Delta | Won on summary judgment`.
- Blog "Body" field uses light markup: `## Heading`, `> Quote`, `- list item`,
  blank line between paragraphs. The author dropdown links the post to an attorney.
- Drag items within a list to set their order; list order on the site follows menu order.

## 5. Create the GitHub repository & connect it

1. Create a **private** GitHub repository (e.g. `law-firm-site`).
2. In the repo settings: Settings → Secrets and variables → Actions → **New repository secret** for each of:

   | Secret | What it is |
   | --- | --- |
   | `WP_API_URL` | Your WordPress base URL, e.g. `https://yoursite.com/wp` (no trailing slash). The build pulls content from `…/wp-json/crl/v1/all`. |
   | `FTP_SERVER` | Bluehost FTP hostname, e.g. `ftp.yoursite.com` |
   | `FTP_USERNAME` | Your Bluehost FTP/cPanel username |
   | `FTP_PASSWORD` | Your Bluehost FTP password |
   | `FTP_DIR` | Web root on the server, usually `/public_html` (or `/public_html/<subdomain-folder>` if the site lives in a subdirectory) |

3. Upload this project to the repository (see footer note).
4. In WordPress: Settings → Crestline Headless → **Automatic deployment** section:
   - GitHub repository: `your-github-username/law-firm-site`
   - Personal access token: create one at GitHub → Settings → Developer settings →
     **Personal access tokens → Tokens (classic)** with the **`repo`** scope, paste it here.
   - Tick **"Auto-deploy on save"** and **Save settings**.
5. Press **Deploy now**. On the GitHub repo page → Actions you should see the
   "Deploy to Bluehost" workflow start; it turns green when the new site is live.

> GitHub's old `ghp_…` style PATs expire. You can also create a **fine-grained**
> token with read/write on your repository. Any token type works as long as it can
> trigger repository dispatch events.

## 6. Testing everything locally (optional)

Before you touch the live site, you can run the same pipeline on your own
computer using Docker — instructions in `cms/local/README.md`. It boots a
throwaway WordPress with the Crestline Headless plugin, seeds realistic content,
and rebuilds the Next.js site from `http://localhost:8080`.
This is a great way to try the editor before setting up the real deploy.

## 7. Your daily editing workflow

1. In WordPress: edit a practice area, write an insight post, add an attorney…
2. Press **Publish** (or **Update**).
3. That's it. Within ~2–4 minutes the live site shows your change.
4. Want to force a refresh without editing? Settings → Crestline Headless → **Deploy now**.

## 7. What's editable vs. what's code

| Content | Editable in WordPress? |
| --- | --- |
| Firm name, contact, hours, socials, home stats | Yes (Settings → Crestline Headless) |
| Attorneys, practice areas, testimonials, case results, FAQs, careers, insights | Yes |
| Photos / images | Yes — the image fields upload to your Bluehost media library |
| Navigation menu, "why choose us", about timeline, services page, legal pages | No — code (`src/data/firm.ts`, page components) |

If a WordPress section is empty, the site falls back to the demo content in
`src/data/`. So the site never looks blank mid-setup.

## 8. Troubleshooting

| Symptom | Fix |
| --- | --- |
| "Deploy now" shows a GitHub error | Check the repo format `owner/repo` and that the token has `repo` rights. |
| Workflow starts but FTP fails | Verify `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_DIR` secrets; Bluehost FTP host is usually `ftp.<yourdomain>`. |
| Site still shows old content after deploy | The "update" link (e.g. legal pages) and images: check the deploy ran; hard-refresh (Ctrl+F5). |
| Can't reach the REST endpoint from GitHub Actions | `WP_API_URL` must be set; if your site uses Cloudflare or restricts crawlers, allow `/wp-json`. |
| WordPress shows empty practice-area fields on a page | Not a bug — any empty collection uses demo data until you add real items, then deletes nothing. It goes away once you publish items. |
| Multiple publishes fast | Deploys are throttled to one per 45s; the last save wins. A second deploy will be triggered shortly after. |

## Notes for the developer

- Content flows: WordPress `/wp-json/crl/v1/all` → `scripts/sync-content.ts` →
  generated `src/lib/content.generated.ts` → pages import from `@/lib/content`
  (which re-exports the generated module).
- Without `WP_API_URL` (local dev) the build regenerates `content.generated.ts`
  from the seed files in `src/data/` — the site fully works offline.
- The build always runs the sync first (`prebuild` npm hook). In CI,
  `WP_API_URL` is a secret so the build pulls real content.
- The site exports to plain HTML (`next.config.ts`) in the `out/` folder, which
  is what gets FTP-uploaded. No Node needed on the server.
- To add this project to GitHub from the command line:
  `git init && git add . && git commit -m "Initial import" && git branch -M main && git remote add origin https://github.com/<you>/<repo>.git && git push -u origin main`