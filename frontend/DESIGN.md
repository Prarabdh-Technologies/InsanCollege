---
name: Insan Degree College
description: A compact academic homepage with accessible light and dark themes.
colors:
  paper: "#ffffff"
  surface: "#ffffff"
  ink: "#173954"
  muted: "#52616c"
  accent: "#a84722"
  action: "#a84722"
  green: "#46664b"
  line: "#d9e0e5"
  input-line: "#768a98"
  panel: "#f2f5f7"
  warm: "#f6f0e7"
  warm-line: "#dfd0ba"
  navy: "#173954"
  focus: "#a84722"
  error: "#af2828"
  dark-paper: "#0f1b26"
  dark-surface: "#152532"
  dark-ink: "#e4eef4"
  dark-muted: "#b7c9d5"
  dark-accent: "#ffbc91"
  dark-green: "#afd0b5"
  dark-line: "#354956"
  dark-input-line: "#708995"
  dark-panel: "#192d3c"
  dark-warm: "#292720"
  dark-warm-line: "#655a47"
  dark-focus: "#ffc397"
  dark-error: "#ff9b9b"
typography:
  display:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.85rem, 2.65vw, 2.7rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-.025em"
  headline:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2rem, 3vw, 2.65rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-.025em"
  title:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "1.45rem"
    fontWeight: 400
    lineHeight: 1.35
  body:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.65
  label:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: ".88rem"
    fontWeight: 600
rounded:
  control: "3px"
  status-dot: "50%"
spacing:
  section: "clamp(3.5rem, 6vw, 5.5rem)"
  paragraph: "1rem"
  gallery-gap: "26px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "#fff"
    padding: "13px 20px"
  navigation:
    backgroundColor: "{colors.navy}"
    textColor: "#fff"
    padding: "11px 12px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
  photo-caption:
    backgroundColor: "{colors.navy}"
    textColor: "#fff"
    padding: "22px 26px"
  notice-badge:
    rounded: "{rounded.control}"
    padding: "3px 9px"
---

# Design System: Insan Degree College

## Overview

**Creative North Star: “The community’s academic institution”**

A compact institutional masthead, navy navigation, authentic campus photograph, and practical university notifications introduce a community-centered college. Classic serif headings and clear sans-serif information preserve the academic character in both light and dark themes.

**Key Characteristics:**

- Both original institution logos remain visible across screen sizes.
- Aligned section headings, flat surfaces, fine borders, and restrained accents.
- Native HTML disclosures enhanced by a small local JavaScript file.
- No framework, third-party scripts, or downloaded fonts; the map is an external embed.

## Colors

### Primary

`ink` is semantic foreground; `navy` remains a dark institutional band in both themes. `accent` handles links and status emphasis, while `action` retains burnt orange beneath white button text. Do not use the light dark-theme accent as a white-text button background.

### Secondary

`green` supports italic emphasis and list markers. `error` identifies invalid form borders. Both adapt to the selected theme.

### Neutral

`paper`, `surface`, `panel`, and `warm` separate the page, controls, cool panels, and admissions surfaces. `line`, `input-line`, and `warm-line` provide context-specific borders; `muted` supports secondary text. Frontmatter `dark-*` values map to the same CSS custom property names under the dark-theme selector; they are not separate CSS property names.

**The Theme Role Rule.** Use semantic CSS properties for content and controls. Logos retain white backing, navy navigation and photo captions retain white text, and the philosophy band remains its fixed deep blue. Navigation focus uses light orange; ordinary focus follows `focus`.

## Typography

Headings use Georgia with Times New Roman and generic serif fallbacks. Body and controls use Arial with Helvetica and generic sans-serif fallbacks. Body measure is generally capped at (70ch). The header name is bold serif at `clamp(1.35rem, 2.2vw, 1.85rem)`; the photograph headline and section hierarchy are recorded above.

Section heading groups use a (14px) gap, (34px) bottom margin, and supporting paragraphs capped at (64ch). Mobile bottom margin is (28px). Campus life now leads directly into its feature content without the former introductory sentence.

## Layout

The container is capped at (1200px) with (32px) side gutters, reducing to (20px) at (760px) and (16px) at (380px). Fluid section spacing is the `section` token.

The utility band has been removed. The identity row has an (88px) desktop minimum and the navigation band is (44px): the closed header totals approximately (132px). At (760px), identity minimum becomes (82px), giving approximately (126px). Open mobile navigation naturally increases height. Both original logos stay visible, with no location or establishment-date header tagline.

The photograph/notifications grid uses `minmax(0, 1.85fr) minmax(290px, 1fr)` and a (24px) gap; at (1100px) it narrows to (1.6fr) with a (280px) notice minimum. At (1023px), native mobile navigation replaces desktop links. At (760px), the hero, quick links, major content, and contact columns stack. At (520px), form field pairs stack. At (380px), the photographic gallery becomes one column. Gallery and small campus notes otherwise retain two columns on mobile.

## Elevation & Depth

Flat surfaces, navy bands, border rules, and spacing create hierarchy. There are no structural box shadows. The New badge briefly pulses a (3px) warm-colored ring; this is motion feedback, not panel elevation.

## Shapes

Major panels, photographs, and primary actions have square corners. Form fields, notice controls, badges, and white logo backings have (3px) corners. Status dots are circular. Inline SVGs are stroked; disclosure plus/minus indicators are CSS lines.

The campus building preserves its (767:431) composition with contain fitting. The complete philosophy poster is displayed inline at its natural (3:4) ratio, up to (360px) wide or (340px) on mobile, without a view-original link. Gallery photographs use cover cropping, a (1.45) mobile ratio, and natural proportions in the single-column narrow layout.

## Components

### Header, navigation, and theme control

The exact college name appears beside the Insan logo, with the complete Purnea University logo and affiliation label opposite. Desktop links and the theme button have (44px) minimum height. Navigation has white text and blue hover fill, with no permanent orange Home highlight. Focus is a (3px) light-orange outline inset by (4px).

The native mobile menu opens in flow with two link columns; selecting a link does not auto-close it. The theme button exposes its current state with `aria-pressed` and labels the next action. Initial theme follows system preference unless a valid local preference exists; explicit selection is stored locally when available. CSS also supports system dark mode without JavaScript. Theme-control text hides between (1024px) and (1100px), while its accessible label remains.

### Notifications and badges

Two original university PDFs appear in horizontally scrollable, snapping slides. Previous, next, position, and Pause/Play controls enhance the native scrolling surface. Automatic movement runs every (8 seconds), suspends during hover, keyboard focus, or a hidden tab, and starts paused under reduced motion. Manual movement remains available. Controls are shown only when JavaScript initializes.

The September 22 circular starts New and changes to Earlier when its publication age exceeds (14 days), or if future-dated. The September 18 sports circular is explicitly Earlier. Earlier does not mean expired. The New badge pulses twice; dates, titles, PDF page counts, sizes, and language are supplied content. PDF links open original files in a new tab with protective link attributes.

### Actions, disclosures, and enquiry fields

Primary actions have (48px) minimum height, (13px 20px) padding, and (.2s) hover transitions. Links use a (4px) underline offset. Ordinary keyboard focus is a (3px) semantic focus outline offset by (4px).

Courses and admissions retain independent native disclosures. Courses start closed and the first admissions answer starts open. On mobile, course content loses its left indentation.

The enquiry form has explicit labels, required name/email/question fields, optional phone, course selection, native validation, and whitespace checks for name/question. Inputs have a (46px) minimum height, (1rem) text, and a distinct input border; the textarea has a (130px) minimum height and vertical resize. Invalid text fields use the error border token.

“Prepare enquiry” produces an unsent email draft locally. The result is a focusable status panel with an email-app link and a native disclosure for copying the message. User content is rendered as text and mailto values are encoded. Editing a field hides the stale draft. Nothing is automatically submitted to a server or sent. Without JavaScript, the form uses its native mailto action and offers a direct email alternative.

### Visit panel, assets, and footer

The contact panel includes a lazy Google Maps iframe centered on (26.1079038, 87.9388474), with a (325px) CSS height, descriptive title, and a directions link. Its embedded map retains light color-scheme in either page theme. External map rendering depends on the map service.

All ten original raster assets are user-supplied, authentic, approved, and unchanged: `insaan.webp`, `insan_phil.webp`, `insanlogo.jpg`, `purnea_university.png`, and `gallery1.webp` through `gallery6.webp`. Small thumbnails do not exceed native (182px) width. `notice.pdf` and `notice1.pdf` are unchanged user uploads, loaded when opened. No generated imagery is used. Poster text remains transcribed alongside; gallery images still link to their originals.

The footer includes copyright text with a (2026) HTML fallback year, updated to the current year by the local script.

### Accessibility and motion

Semantic landmarks, descriptive image alternatives, labeled navigation/fields, a visible keyboard skip link, native controls, and wrapping long links support access. Decorative icons are hidden from assistive technology. Images declare dimensions, below-fold images load lazily, and the hero has high fetch priority.

The hero arrives over (.6s) from (8px) below; gallery hover scales to (1.025) over (.45s). Reduced motion disables CSS animations, transitions, and smooth scrolling and pauses automatic notifications. Basic navigation, disclosures, PDF links, system theming, and native mailto remain usable without the enhancement script.

## Do's and Don'ts

- **Do** retain both original logos, exact college name, and compact header proportions.
- **Do** use semantic theme roles for new surfaces, text, borders, and controls.
- **Do** keep the full poster inline and notification movement pausable.
- **Do** describe the enquiry result as an unsent draft and preserve the user’s final sending step.
- **Don't** add header location/date taglines, invented notices, or unsupported institutional claims.
- **Don't** treat Earlier as expired or use dark-theme accent for white-text action backgrounds.
- **Don't** introduce frameworks, third-party scripts, or font downloads.
