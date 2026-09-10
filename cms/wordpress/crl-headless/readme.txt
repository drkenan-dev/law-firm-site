=== Crestline Headless ===
Contributors: crestline
Tags: rest api, headless, acf, cpt
Requires at least: 6.2
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later

Turns WordPress into the content source for the Crestline Law Next.js site: content types, a clean JSON endpoint, and a GitHub auto-deploy trigger.

== Description ==

This plugin powers the headless CMS for the law firm website:

* Adds content types for Attorneys, Practice Areas, Testimonials, Case Results, FAQs and Vacancies (posts are reused for Insights/Blog).
* Adds an Advanced Custom Fields editor screen for every content type (ACF free is enough — no Pro needed).
* Provides a Settings screen for firm details (name, contact, hours, socials, home page statistics) and deployment.
* Exposes every piece of content as JSON at `https://your-site.com/wp-json/crl/v1/all` for the static site build to download.
* Optionally triggers a GitHub deployment every time content is saved, so publishing is one click.

Requires: Advanced Custom Fields (free, https://wordpress.org/plugins/advanced-custom-fields/).

== Installation ==

1. Upload the `crl-headless` folder to `/wp-content/plugins/`, or zip the folder and install via Plugins → Add New → Upload Plugin.
2. Activate "Advanced Custom Fields" first, then "Crestline Headless".
3. Go to Settings → Crestline Headless and fill in the firm details and the GitHub repository/token for auto-deploy.

== Using the content types ==

* **Posts → Insights** — write your blog article in the "Body" field using light markup: `## Heading`, `> Quote`, `- list item`, blank line between paragraphs. Set the author and cover image in the "Insight Post Settings" box on the post editor.
* **Attorneys** — photo, position, bio, practice-area links, and the resume lists. Multi-item fields take one item per line; "Professional experience" uses `Title | Years` per line and "Publications" uses `Title | Year`.
* **Practice Areas** — icon, tagline, description, image, experience highlights, services, and "Representative matters" as `Title | Result` per line.
* **Testimonials, Case Results, FAQs, Vacancies** — short forms; the slug is used for links, so keep titles short.

== Deployment ==

Every time you save/publish content and "Auto-deploy on save" is on, the plugin tells GitHub to run the site's Actions workflow (a `wp-publish` repository_dispatch event), which builds the static site and uploads it to Bluehost. You can also press "Deploy now" on the settings page. Deployments are throttled to one every 45 seconds.

== Changelog ==

= 1.0.0 =
* Initial release.