# Landing page

Mode: Persuade, with exploration rather than application as the primary action.

## Direction contract
THESIS: A clear, recognizable academic homepage inspired by the user's four named college and institute references, with authentic campus imagery and practical information close to the top.
OWN-WORLD: White masthead, deep blue navigation and photo caption, restrained burnt-orange links, light blue content panels, classic serif titles and legible sans-serif supporting text. Logo identity remains authoritative.
STORY: Identify the college and university affiliation immediately; find academic navigation, the campus, admission status and practical links; continue through courses, founder philosophy, campus life, admissions and contact.
FIRST VIEWPORT: Utility links, large Insan logo with “Insan Degree College”, Purnea University's full logo at right, a separate blue navigation bar, admission notice strip, then a campus photograph with a blue caption alongside a notice board. Both logos remain visible on mobile, above a native expandable navigation row.
FORM: User-pinned institutional references supersede the earlier editorial marketing composition. IIT Madras inspires the separated utility/masthead/nav bands and announcement strip; NIT Durgapur informs photo-plus-notices structure; Marwari College informs familiar academic navigation and prominent institutional identity. IIT Delhi's page structure was reviewed in HTML; its first browser capture remained blank, so no screenshot-specific claim is made.
INTERACTION: Native course and FAQ disclosures; mobile navigation changes below 1024px; header identity is always present. Internal anchors, university portal, phone/email and map links work without JavaScript. No invented notices, dates, results, or administrative content.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Asset provenance
All ten raster assets were supplied by the user in the project root and confirmed authentic and approved for public use. Originals remain unmodified. gallery1.webp and gallery2.webp are displayed at no more than their native 182px width. No generated assets.


## September 26 refinement
The user requested a slimmer header and stronger alignment, movement and New/Earlier notification states, full inline poster, deletion of the campus intro sentence, an email-preparation enquiry form, exact embedded map, dark mode, SEO and security review, supplied PDF links, and a copyright footer. The identity row is now 88px maximum base minimum with 44px navigation (132px desktop); utility bar removed. Section heading groups align consistently. Poster uses its intrinsic 3:4 ratio at up to 360px. Full light/dark semantic tokens govern surfaces, text, inputs, and borders; logos retain white backing to stay legible. New UI uses one local app.js and no dependencies. Notifications advance every eight seconds, stop on hover/focus/hidden tab, and default to paused under reduced motion. Form results explicitly describe an unsent draft and use textContent plus encoded mailto parameters. PDFs are original user uploads, preserved unchanged, loaded only when opened.
