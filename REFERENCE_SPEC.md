# Reference Spec

Measured/verified geometry, typography, and content for
`https://airbnb-clone-umber-two.vercel.app/`, compiled from the values
already captured in this codebase's own measurement comments (`tokens.css`,
`layout.css`, and the per-component `.module.css`/`.tsx` files) plus the
listing content brief. See **Access note** below for why this document was
compiled from those sources rather than a fresh live pass.

## Access note (this session)

The reference URL is currently served from behind Vercel's bot-verification
checkpoint. Every access attempt this session — `curl`, the `WebFetch` tool,
and a local Playwright-driven Chromium (both headless and headed, default
configuration, no fingerprint spoofing) — received either an HTTP 429 with
`X-Vercel-Mitigated: challenge`, or the interstitial page itself, which
renders `Failed to verify your browser — Code 21` and does not resolve. No
attempt was made to defeat that check (stealth plugins, header/UA spoofing,
proxying, etc.) — that would be circumventing a site's access controls
rather than "measuring a reference," so it was ruled out rather than
retried harder.

Everything below therefore comes from two sources: (1) `getBoundingClientRect`
/ `getComputedStyle` / `document.fonts` measurements recorded directly in
this repo's CSS comments during an earlier phase when the reference *was*
reachable, and (2) the listing content values supplied directly in the
project brief (price, dates, title, category counts, sticky-nav copy). Where
a value is my own inference from Airbnb's known production design system
(since this reference is explicitly a clone of it) rather than a direct
measurement, it's marked **(inferred)**.

## Color

| Token | Value | Source |
|---|---|---|
| Primary (brand pink/red) | `#ff385c` | tokens.css — matches Airbnb's real brand red |
| Text primary | `#222222` | tokens.css |
| Text secondary | `#717171` | tokens.css |
| Border | `#dddddd` | tokens.css |
| Surface | `#ffffff` | tokens.css |
| Surface muted (hover fills) | `#f7f7f7` | tokens.css |
| Gallery placeholder | `#eeeeee` | tokens.css |

## Typography

- Reference font-family: Airbnb's proprietary "Cereal VF" (confirmed via
  `document.fonts` in the earlier phase — weights 200–900, loaded from
  Airbnb's own asset host). Not legitimately reusable outside Airbnb's own
  properties.
- Substitute in use: **DM Sans** (400/500/700), an open geometric sans with
  comparable x-height and letterform proportions, loaded via Google Fonts.
- Title: 26px / 30px line-height / 500 weight / 0.00185em letter-spacing.
- Body/section text: 14–16px, 400/500 weight.
- Field labels (booking card): 10px, 500 weight, uppercase, 0.03em tracking.

## Header

- Height: 88px, sticky, `border-bottom: 1px solid #ddd`.
- Horizontal padding: 80px, full-bleed (independent of the 1120px listing
  content column, which itself sits ~200px in on a ~1520px viewport).
- Layout: 3-column grid (`1fr auto 1fr`) so the center search pill stays
  centered in the full header regardless of side-content width.
- Left: logo mark + wordmark, `justify-self: start`.
- Center: search pill.
- Right: "Become a host" text button, 40×40 circular globe button, pill
  profile button (menu icon + user icon, 1px border, 21px radius),
  `justify-self: end`.
- **Branding (inferred / this-project choice):** the reference's left slot
  shows the real Airbnb logo mark + "airbnb" wordmark. That specific
  artwork is a protected trademark and isn't reproduced pixel-for-pixel
  here; instead an original glyph (`IconBrandMark` — four rounded petals
  meeting at a center point, in the brand pink) plus the plain text
  "airbnb" (22px / 700 weight / -0.02em tracking, in `--color-text-primary`)
  occupies the same position — see DECISIONS.md for the reasoning. This
  replaces the placeholder "PlayPower" mark that previously occupied that
  slot.

## Search pill

- 385px total width × 48px height, centered in the header.
- Three segments — "Anywhere" / "Anytime" / "Add guests" — each 14px/500,
  separated by 1px × 24px dividers.
- 24px pill radius, `1px solid #ddd` border, `0 1px 4px rgba(0,0,0,.08)`
  shadow.
- 32px circular search button, brand-pink fill, flush right, 14px search
  icon.
- Hidden below 900px viewport width.

## Hero gallery (at 1120px content width)

- Total height: 494px, 8px gap between cells, 12px (`--radius-lg`) corner
  radius on the whole gallery (clipped via `overflow: hidden`).
- Grid: primary image is exactly **50%** of gallery width (560px), not an
  equal 4-column split — the remaining 544px splits into two 272px
  columns; each row is 243px tall (243 + 8 + 243 = 494).
- 5 photos shown, slots verified from the reference's own rendered Photo
  Tour DOM order: manifest indices **6, 3, 4, 12, 28** (primary, top-mid,
  top-right, bottom-mid, bottom-right) — not `PHOTOS.slice(0, 4)`.
- "Show all photos" button overlays the bottom-right cell, inset 24px from
  its corner, white background, 1px dark border, grid icon + label.

## Title row

- Content column width: 1120px, no internal gutter (below that width, a
  24px side gutter is added via `min()` rather than padding).
- Row = title (h1, 26px/30px/500) on the left, Share/Save actions on the
  right — no rating/location metadata line in this row (that appears later,
  next to the reviews/host block).

## Sticky nav

- 64px tall, sticks directly under the 88px header (`top: 88px`).
- Left: tab list — Photos / Amenities / Reviews / Location — 14px/500,
  secondary-color text, 2px underline on the active tab in primary text
  color.
- Right: condensed price ("₹28,499 for 5 nights", 14px/500) stacked over a
  rating line (★ 4.95 · 19 reviews, 13px), plus a "Reserve" button
  (brand-pink fill, 8px radius). Hidden below 900px.

## Booking card

- Width: 372px (`--booking-width`), sticky, offset from the top by
  header + sticky-nav height + 24px.
- 1px border, 12px radius, `0 1px 12px rgba(0,0,0,.12)` shadow, 24px
  padding, 16px internal gap between blocks.
- Price row: "₹28,499" (20px/500, underlined) + "for 5 nights" (14px).
- 2×2 field grid (Check-in / Checkout / Guests spanning full width),
  1px dividers, 10px uppercase labels, 14px values.
  - Check-in: 10/18/2026 · Checkout: 10/23/2026 · Guests: 2 guests.
- Cancellation notice ("Free cancellation before 17 October") sits in a
  muted-background row **above** the Reserve button.
- Reserve button: full width, brand-pink fill, 16px/500, 8px radius.
- Disclaimer below the button: "You won't be charged yet", 13px, centered.

## Calendar (booking-card popover)

- Two-month grid: the check-in month and the following month — currently
  October 2026 and November 2026, since check-in is 2026-10-18.
- 7-column weekday header (S M T W T F S), selected start/end dates as
  filled circles, the nights between them shaded as a continuous range,
  out-of-month days muted.

## Listing title

`Romantic Jacuzzi 1BHK Candolim | Mirashya UG10` — Candolim, Goa, India.

## Content sections (in order)

Property type/location line → rating + review count → host line → feature
highlights (3 items: Outdoor entertainment / Designed for staying cool /
Self check-in) → Where you'll sleep (Bedroom, Living room cards with
photos) → What this place offers (6-item amenity preview + "Show all N
amenities") → Where you'll be (location text + notice) → Reviews summary
(4.95 · 19 reviews) → Meet your host (Mirashya Homes — 1,463 reviews, 4.68
rating, hosting 2 years, born-in-80s, school, response rate/time).

**Not reproduced, on principle (unchanged from DECISIONS.md #12):** guest/
bedroom/bed/bathroom counts, the "Guest favourite" badge and its marketing
copy, and per-feature review-derived promotional sentences — none of these
exist in this project's own canonical `PROPERTY` data brief, and inventing
plausible-looking numbers for a real business's real listing would be
fabrication, not layout fidelity.

## Photo Tour / 43-slot manifest

Categories and counts (verified, generated from `photoCategories.ts`):
Living room 1 (3), Living room 2 (7), Full kitchen (2), Bedroom (6), Full
bathroom (1), Gym (5), Exterior (6), Pool (3), Additional photos (10) = 43.

Local assets supplied: **43/43**. All slots carry the reference's own
photography, recovered from a complete saved copy of the reference page and
verified against its Photo Tour DOM order. The `placeholder://` scheme is
retained only as a load-error fallback (see DECISIONS.md #16).

## Responsive behavior

Container query breakpoints already implemented: 1024px (header padding
drops to 24px), 900px (search pill + sticky-nav summary hide, content grid
collapses to one column, booking card goes static), 700px ("Become a
host" hides), 600px (title row stacks, sticky-nav tabs scroll
horizontally). These match the reference's general collapse pattern
**(inferred continuity from the desktop measurements — not re-verified at
each of the 6 requested breakpoints this session, since that requires live
reference access)**.

---

## Sections added in the structural-completion pass

These close the remaining structural gaps against the reference. Geometry here is **(inferred)**
from Airbnb's production patterns — the reference itself could not be re-measured (see the access
note above), so none of it is a verified reference measurement.

| Section | Component | Notes |
| --- | --- | --- |
| Description | `listing/PropertyDescription.tsx` | 16px / 24px line-height, clamped to 4 lines, underlined "Show more" toggle. Renders nothing without `description`. |
| Rating bars | `listing/RatingBreakdown.tsx` | Six categories in a 2-column grid; 4px track, filled to `score / 5`. |
| Review cards | `listing/ReviewCard.tsx` | 40px initials avatar, name, rating + date meta line, 15px / 22px body. |
| Reviews grid | `listing/ReviewsPreview.tsx` | First 6 reviews, 2 columns, "Show all N reviews" button. Falls back to the summary sentence when no review text exists. |
| Reviews modal | `reviews/ReviewsModal.tsx` | Mirrors the amenities dialog: 780px card, 85vh, 64px header, 40px close button. URL: `?modal=REVIEWS`. |
| Map | `listing/LocationPreview.tsx` | 480px tall (320px under 700px), 12px radius, OpenStreetMap embed on 15.5185/73.7625, 180px translucent approximate-area circle. |
| Things to know | `listing/ThingsToKnow.tsx` | House rules and Safety & property now render `houseRules` / `safetyItems` when present. |
| Footer | `footer/Footer.tsx` | Three link columns above a bottom bar (copyright, legal links, language + currency). Constrained to the same 1120px `.content-container`. |
| Capacity line | `listing/PropertySummary.tsx` | "N guests · N bedrooms · N beds · N baths", shown only when `capacity` is set. |

### Verified locally after this pass

Measured at 1536x864 against the running app: header 88px; content column 1120px starting at
x=208; main column 652px; main-to-booking gap 96px; booking card 372px at x=956; gallery
1120x494. At 1440x860 the same values shift to x=160 / x=908, as expected. Across 1536x864,
1440x860, 1280x800, 1024x768, 768x1024 and 390x844: zero console errors, zero broken images, zero
horizontal overflow, and every element resolving to a single font family (DM Sans).

### Photo assets

Local assets supplied: **43/43 real, 0 placeholder**. Slot order and category counts are
unchanged from the verified manifest.

---

## Status of this document

Sections above were written across several passes, some while the reference was unreachable, and
values marked **(inferred)** date from that period. Anything since has been read directly from a
complete saved copy of the reference page and measured against it in the browser.

For the current, verified figures — geometry, section landmarks, page height, and the one known
remaining difference — see the "How fidelity was verified" and "Known difference" sections of
[README.md](./README.md), which supersede any older value here that conflicts with them.

