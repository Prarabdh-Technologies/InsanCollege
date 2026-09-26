# Security review — 26 September 2026

Scope: the local static website, its local JavaScript, two supplied PDFs, browser behaviour, and deployment configuration. This is a source/configuration review and local browser verification, not a penetration test of a deployed server or an assessment of Google's services.

## Implemented controls

- The enquiry form prepares an unsent email draft. It has no collection endpoint, database, analytics event, or automatic email sending. Only the theme preference is saved in local storage.
- Inputs are length-limited, labelled, and validated for required values, email format, and whitespace-only responses. User text is rendered with `textContent`; subject and body are separately URL-encoded. No `innerHTML`, evaluation of strings, or third-party JavaScript is used.
- Content Security Policy permits local scripts/styles/images and the exact hash of the structured-data block. It blocks inline executable scripts, object/plugin embedding, base-URL changes, and scripted network connections. The only permitted child-frame origin is `https://www.google.com`; form navigation is limited to `mailto:`.
- The map is an explicitly requested, cross-origin Google Maps iframe with limited sandbox permissions, a referrer policy, and lazy loading. Google receives map requests when it loads. Its directions link remains available if the embed cannot load.
- New-tab PDF and map links use `noopener noreferrer`. The PDF documents are navigated to, not embedded as active objects in the site.
- Both user-provided PDFs were inspected using `pdfinfo -js` and `pdfdetach -list`: neither reports JavaScript or embedded files. This does not constitute antivirus certification. Originals are preserved.
- `_headers` supplies CSP with `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, a referrer policy, and disabled camera/microphone/geolocation permissions on hosts supporting this file. The HTML also includes the supported CSP subset as a fallback.
- `scripts/build.py` creates a deployment folder containing only the public HTML, CSS, JavaScript, images, PDFs, robots file, and headers configuration. Project documentation and review artefacts are excluded.

## Verification

Local Chrome checks passed for empty/invalid/whitespace-only form inputs; hostile HTML-like input remaining literal text; URL-encoded mailto content; stale drafts being cleared after edits; and executable inline-script injection being blocked by CSP. No enquiry was sent during testing.

Both PDFs return HTTP 200 with `application/pdf`. JSON-LD parses correctly and its SHA-256 hash matches both policy declarations. Browser interaction results are saved in `.impeccable/review/audit-checks.json`. The PDF fetch entries marked `blocked` are an intentional test of `connect-src 'none'`; normal PDF document links were separately verified from the test process.

## Deployment-dependent checks

- Deploy `dist/` over HTTPS. Confirm the chosen host applies `_headers`; otherwise configure the same response headers at the server/CDN. The local Python preview does not apply this file. HTML metadata cannot enforce `frame-ancestors`, so anti-framing protection depends on the response header.
- Verify TLS, HTTPS redirection, compression, caching, and response headers on the actual public origin. Hosting and infrastructure were not supplied and have not been audited.
- Add an absolute canonical URL, social preview image URL, and sitemap once the production origin is confirmed; no unverified domain is embedded in those settings.
- If the enquiry form is later changed to submit to a server, that endpoint needs its own server-side validation, abuse protection, appropriate CSRF controls, retention policy, and access controls. Client validation alone is not a server-side security boundary.
- Both uploaded PDFs are image scans, not tagged accessible PDFs; the website provides English titles/summaries and identifies their language, but these do not replace a complete accessible transcription.

Implementation references: [MDN Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy), [form-action](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/form-action), and [Google structured-data guidance](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).
