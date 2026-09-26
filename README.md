# Insan Degree College landing page

Responsive static HTML/CSS with a 6.2 KB local JavaScript enhancement. No framework, package installation, third-party scripts, or external fonts.

## Preview

Run `python3 -m http.server 8080` and visit `http://localhost:8080`.

## Publish

Run `python3 scripts/build.py`, then upload the contents of `dist/` to an HTTPS static host. This allowlisted folder excludes development documentation and review artefacts. Run the command again after making changes.

`_headers` is supplied for compatible hosts such as Netlify/Cloudflare Pages; other hosts need equivalent server/CDN configuration. Confirm response headers, compression and caching after deployment. See `SECURITY.md` for the audit scope and deployment checklist. The local Python preview does not apply `_headers`.

The production URL has not been supplied. Add an absolute canonical URL, social-preview image URL and sitemap once that origin is confirmed. Existing SEO features include a descriptive title, description, social metadata, crawlable content/links, robots.txt, semantic headings and CollegeOrUniversity JSON-LD. If the JSON-LD changes, update its SHA-256 hash in the HTML CSP and `_headers` together.

## Features and maintenance

- Compact header with both original logos and the college name. Mobile/tablet navigation uses native disclosures.
- Theme follows the system until the visitor chooses light/dark; only that preference is stored locally.
- Notifications link to `notice.pdf` (22 September 2026 public self-disclosure circular) and `notice1.pdf` (18 September 2026 revised sports calendar), both supplied by the user and preserved unchanged. New status becomes Earlier after 14 days. Neither label implies a circular is expired. Update HTML entries with new notices; the carousel derives its count automatically.
- Notices advance every eight seconds. Previous/Next and Pause/Play are available. Movement pauses on hover, focus and hidden tabs; reduced-motion users start paused. With JavaScript disabled, the notice list can be scrolled horizontally.
- The full philosophy poster is displayed inline at its original 3:4 ratio. Its wording is also transcribed as accessible HTML.
- The enquiry form validates fields and prepares an encoded email draft. It does not submit to a server or send email. The visitor must review/send from their email app; a text preview supports copying into webmail. No email was sent during testing.
- The lazy-loaded Google Maps embed uses coordinates resolved from the user's exact map link. A directions link remains available if Google cannot load. PDFs load only when opened.
- The copyright year updates automatically; 2026 is the no-JavaScript fallback.

All ten original image assets remain in use, with intrinsic dimensions and lazy loading below the fold. The complete core page and all images are approximately 511 KB uncompressed, excluding the on-demand PDFs and Google Maps resources. Local JavaScript is approximately 2 KB gzipped. These are asset sizes, not real-world performance scores.

## Verification

Local Chrome checks cover light/dark themes at 320, 390, 768, 1024, 1440 and 1920 CSS pixels. No page overflow, broken images or missing anchor targets were found. Both header logos remain visible. Native mobile keyboard navigation, theme persistence, notification movement/pause, reduced motion, empty/invalid/whitespace form values, safe text rendering, encoded email drafts, CSP enforcement and no-JavaScript fallback were tested. The map was visually checked after scrolling to trigger lazy loading. Physical-device testing and a live-host audit have not been performed.

Evidence: `.impeccable/review/audit-checks.json`, `contrast-checks.json`, and the light/dark screenshots. `SECURITY.md` records the source/configuration audit and deployment-dependent protections.

## Design references

The academic structure was inspired by [IIT Madras](https://www.iitm.ac.in/), [IIT Delhi](https://home.iitd.ac.in/), [NIT Durgapur](https://nitdgp.ac.in/), and [Marwari College Kishanganj](https://www.marwaricollegekishanganj.in/). Published college content and imagery remain specific to Insan Degree College.
