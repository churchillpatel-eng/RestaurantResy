---
name: Churchill & Sejal's Dining Guide
description: A field-guide-styled restaurant tracker for trip planning, color-coded by city.
colors:
  navy-deep: "#1F4E79"
  navy-deep-hover: "#2E6DA4"
  taos-green: "#2D6A4F"
  abq-clay: "#843C0C"
  paper-blue: "#f0f4f8"
  surface: "#ffffff"
  ink: "#222222"
  border: "#d0d8e0"
  chase-blue: "#117ACA"
  amber-star: "#f5b301"
typography:
  headline:
    fontFamily: "'Segoe UI', Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.3px"
  title:
    fontFamily: "'Segoe UI', Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "'Segoe UI', Arial, sans-serif"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "'Segoe UI', Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  pill: "20px"
  circle: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.navy-deep}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "9px 16px"
  button-primary-hover:
    backgroundColor: "{colors.navy-deep-hover}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
  filter-pill:
    backgroundColor: "{colors.surface}"
    textColor: "#444444"
    rounded: "{rounded.pill}"
    padding: "5px 14px"
  filter-pill-active:
    backgroundColor: "{colors.navy-deep}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "5px 14px"
  badge-vegan:
    backgroundColor: "#E8F5E9"
    textColor: "{colors.taos-green}"
    rounded: "{rounded.xs}"
    padding: "2px 7px"
  badge-carnivore:
    backgroundColor: "#FFEBEE"
    textColor: "#8B0000"
    rounded: "{rounded.xs}"
    padding: "2px 7px"
  chase-badge:
    backgroundColor: "{colors.chase-blue}"
    textColor: "#ffffff"
    rounded: "{rounded.xs}"
    padding: "2px 6px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "13px 16px"
---

# Design System: Churchill & Sejal's Dining Guide

## 1. Overview

**Creative North Star: "The Field Guide"**

This is a personal reference book, not a product marketing site: a deep-navy spine gives it the
authority of a well-kept field guide, while a per-city color system — blue for San Francisco,
green for Taos, clay-orange for Albuquerque — works like chapter tabs, letting the eye jump to
the right section at a glance. Emoji badges (🌱🥩⚡📅🚶) are the annotations scribbled in the
margins: fast, legible, a little playful, never decorative for its own sake.

It explicitly rejects the enterprise-dashboard and generic-SaaS-list look. There is no audience
to convert, no metrics to perform for — every visual decision should serve one question, asked
standing in a parking lot: *where do we eat?*

**Key Characteristics:**
- Deep navy as the authoritative spine color; per-city hues as wayfinding, not decoration.
- Soft-lifted surfaces — cards read as physical index cards resting on the page, not flat rows in
  a data table.
- Saturated, tactile fills on anything tappable; nothing ghost or outline-only.
- Compact type at high information density, sized for scanning, not reading.

## 2. Colors

A navy field-guide spine, city-coded accents for wayfinding, and saturated tag colors that read
instantly as icon + color, not text.

### Primary
- **Navy Deep** (`#1F4E79`): the spine color. Header background, primary buttons, headings,
  active filter state, the back-to-top button. Used with intent — it's the "this is
  interactive/important" signal.
- **Navy Deep Hover** (`#2E6DA4`): the interactive-state sibling of Navy Deep. Hover/focus on
  navy elements, search input focus ring, and doubles as the San Francisco city tab color.

### Secondary
- **Taos Green** (`#2D6A4F`): Taos section header + accent, and shared with the vegan badge
  text — a deliberate overlap, since Taos leans plant-forward in this guide.

### Tertiary
- **Albuquerque Clay** (`#843C0C`): Albuquerque section header + accent. The warmest of the three
  city hues, distinct from the vegan/green and carnivore/red badge colors so city and dietary
  signals never compete.

### Neutral
- **Paper Blue** (`#f0f4f8`): page background. A cool, quiet backdrop the city colors and badges
  pop against.
- **Surface White** (`#ffffff`): cards, modals, header bars, inputs.
- **Ink** (`#222222`): default body text.
- **Border** (`#d0d8e0`): all hairline borders — cards, dividers, inputs, section rules.

### Accent
- **Chase Blue** (`#117ACA`): fixed brand color for the Chase Sapphire OpenTable credit badge and
  the reservation banner. Not part of the app's own palette — do not reassign or retint; it must
  stay recognizable as Chase's blue.
- **Amber Star** (`#f5b301`): filled star-rating glyphs only. The one warm, high-chroma accent in
  the whole system — reserve it for ratings, don't reuse it elsewhere or it stops meaning "rated."

### Named Rules
**The City-Tab Rule.** A city's color (SF blue / Taos green / ABQ clay) appears only on that
city's section header, border, and heading text. It never bleeds into buttons, links, or global
chrome — city color means "which chapter," nothing else.

**The Third-Party Color Rule.** External brand marks — OpenTable red (`#DA3743`), Resy black
(`#1A1A1A`), Chase blue (`#117ACA`) — are reproduced as-given on their respective link buttons and
badges. Never retint them to fit the app's palette; they're identity marks the user needs to
recognize instantly.

## 3. Typography

**Body Font:** 'Segoe UI', Arial, sans-serif (single family, no separate display face)

**Character:** One workhorse system sans at every size — this is a scanning tool, not an
editorial piece. Hierarchy comes from weight and size steps, not font pairing.

### Hierarchy
- **Headline** (700, 22px, line-height 1.3, +0.3px tracking): the page title only (`<h1>`).
- **Title** (700, 15–20px, line-height 1.3): city section headers, state accordion summaries,
  card names, modal/detail headings.
- **Body** (400, 12.5–13px, line-height 1.5): restaurant descriptions, notes, form field text.
- **Label** (600, 10–12px, line-height 1.2): filter buttons, badges, legend text, timestamps.
  Uppercase is never used for emphasis here — weight and color carry it instead.

### Named Rules
**The One-Family Rule.** Every text element uses the same system-sans stack. Don't introduce a
second typeface for "hierarchy" — weight (400/500/600/700) and the four-step size scale above are
the only levers.

## 4. Elevation

Soft-lifted, not flat: surfaces are meant to read as index cards resting slightly above the page,
not as rows in a data table. (Note: the current implementation is flat-at-rest with a
hover-triggered shadow — `.card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.10); }` — and hasn't
yet been migrated to the persistent ambient shadow this system calls for. Treat that migration as
open `layout`/`polish` work, not a contradiction of this spec.)

### Shadow Vocabulary
- **Ambient rest** (`box-shadow: 0 1px 4px rgba(0,0,0,0.06)`): the target at-rest elevation for
  cards and the state-accordion sections — barely-there lift, enough to separate from the paper-blue
  background.
- **Ambient hover** (`box-shadow: 0 4px 16px rgba(0,0,0,0.10)`): existing card hover state. Keep on
  interaction; don't remove once ambient-rest ships.
- **Floating** (`box-shadow: 0 2px 10px rgba(0,0,0,0.25)`): the back-to-top circular button —
  deliberately heavier since it floats free over content rather than sitting in the page flow.
- **Overlay scrim** (`background: rgba(0,0,0,0.5)`): modal backdrop.

### Named Rules
**The Rest-Isn't-Flat Rule.** Cards, the state accordion, and the detail panel always carry
Ambient Rest, even with nothing hovered. Flat-until-touched reads as a spreadsheet; this is a
field guide.

## 5. Components

### Buttons
- **Shape:** `{rounded.md}` (8px) for standard actions (Save Restaurant); `{rounded.pill}` (20px)
  for the header's "+ Add Restaurant" and all filter buttons.
- **Primary:** Navy Deep fill, white text, 700 weight, `9px 16px` padding.
- **Hover:** background steps to Navy Deep Hover; no scale/transform, just the color shift.
- **Filter pills:** white fill / 1.5px border at rest; Navy Deep fill with matching border when
  active. Border-only never means "selected" — fill does.

### Badges / Chips
- **Style:** small (`{rounded.xs}`, 4px), `2px 6–7px` padding, 700 weight text, always paired with
  an emoji glyph (🌱🥩⚡📅🚶✓) so the badge is legible by color+icon alone, text is reinforcement.
- **State:** badges are informational only, not interactive — no hover state, no cursor change.

### Cards
- **Corner Style:** `{rounded.lg}` (12px) for restaurant cards and the detail panel; `{rounded.lg}`
  also for the add-restaurant modal.
- **Background:** Surface White, with a tinted header strip inside each card (light-blue /
  light-green / light-orange matching that card's city).
- **Shadow Strategy:** see Elevation — Ambient Rest at idle, Ambient Hover on `:hover`.
- **Border:** 1.5px solid Border on every card and section container.
- **Internal Padding:** `{spacing.md}`–`{spacing.lg}` (12–16px).

### Inputs / Fields
- **Style:** 1.5px Border stroke, `{rounded.sm}` (6px) for form fields, `{rounded.pill}` for the
  top search bar specifically.
- **Focus:** border color steps to Navy Deep Hover — no glow/ring, a clean color-only signal.
- **Error / Disabled:** not yet defined in the current build; if added, keep the same
  color-only-signal approach (no shape change) for consistency.

### Navigation
- **Style:** the filter row acts as primary navigation — pill buttons, active state = Navy Deep
  fill. City sections and the state accordion are the secondary wayfinding layer, driven entirely
  by the City-Tab Rule colors rather than icons or labels.

### Star Rating (signature component)
Custom `<star-rating>` element: unfilled stars use Border gray, filled stars use Amber Star. A
44×44px touch target wraps each small glyph per WCAG 2.5.5, even though the visible star is much
smaller — tap accuracy on mobile (parking-lot use) matters more than visual density here.

## 6. Do's and Don'ts

### Do:
- **Do** keep city color (SF blue / Taos green / ABQ clay) scoped to that city's own section per
  the City-Tab Rule.
- **Do** reproduce OpenTable red, Resy black, and Chase blue exactly as their brand colors — they
  are identity marks, not part of this palette.
- **Do** use saturated, confident fills on every tappable element (buttons, active filters,
  badges) — this is a fast-decision tool used on a phone, not a document to linger over.
- **Do** give every animation a `prefers-reduced-motion` fallback, matching the existing skeleton
  shimmer's `animation: none` override.
- **Do** keep the 44×44px minimum touch target on small interactive glyphs (star rating, close
  buttons), even when the visible icon is smaller.

### Don't:
- **Don't** introduce a second typeface. One system-sans family, weight and size carry hierarchy.
- **Don't** let city color leak outside its own section into global chrome, buttons, or links.
- **Don't** flatten cards back to zero elevation at rest — Ambient Rest applies even when nothing
  is hovered (The Rest-Isn't-Flat Rule).
- **Don't** reach for enterprise-dashboard or generic-SaaS-list patterns: no dense data-table rows,
  no gray-on-gray sterility, no "this is trying to sell you something" polish. This has an
  audience of two.
- **Don't** use uppercase tracked labels for emphasis; weight and color already carry it here.
