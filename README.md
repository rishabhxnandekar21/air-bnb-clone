# Airbnb Listing Page — PlayPower Labs Placement Assessment

A React 19 + TypeScript + Vite implementation of an Airbnb listing page, built to match a
reference deployment as closely as possible.

**Source:** https://github.com/rishabhxnandekar21/air-bnb-clone
**Reference:** `https://airbnb-clone-umber-two.vercel.app/`

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # type-check (tsc -b) + production build
npm run lint     # oxlint
```

Both exit 0. There is nothing to configure — no environment variables, no API keys, and the page
makes no third-party network request except the Google Fonts stylesheet.

## What to look at

| | |
|---|---|
| Listing page | `/` |
| Photo tour | `/?modal=PHOTO_TOUR_SCROLLABLE` |
| Lightbox | `/?modal=PHOTO_TOUR_SCROLLABLE&modalItem=1000` (valid `1000`–`1042`) |
| Amenities dialog | `/?modal=AMENITIES` |

Modal state lives in the URL rather than component state, so these are shareable and the browser
back button closes a dialog. Parsing is total: a malformed, out-of-range or orphaned `modalItem`
resolves to `null` rather than throwing.

Worth exercising: the sticky bar sliding in as the gallery passes under it, hover on the photo
tour tiles, the availability calendar's month navigation and "Clear dates", the long reviews'
"Show more", and Share (which raises the reference's status toast).

## How fidelity was verified

Layout was measured, not eyeballed. Both pages were loaded at identical viewports and compared
element by element with `getBoundingClientRect` and `getComputedStyle`.

At 1536×864 the following match the reference exactly:

- header 88px; content column 1120px at x=208; main column 652px; booking card 372px at x=956
- hero gallery 1120×494 — primary cell 560×494, secondaries 272×243
- photo tour tiles 458×305, category nav 976×276 across 8 columns
- every section landmark: 716 / 1508 / 1893 / 4136 / 4988 / 5550 / 5886
- total page height 6265 against the reference's 6266

Across 1536 / 1128 / 743 / 390: zero console errors, zero broken images, zero horizontal overflow.

## Known difference

**Typography.** The reference self-hosts Airbnb Cereal VF. That file is not redistributable and
was not obtainable, so the font stack falls through to DM Sans — declared exactly as the reference
declares it, with the same `@font-face` path. Every metric above already matches; the only visible
consequence is that DM Sans is slightly narrower, so a long paragraph wraps a line or two later.

Dropping `AirbnbCerealVF.woff2` into `public/assets/fonts/` closes it with no code change. See
`public/assets/fonts/README.md`.

Because the `@font-face` still points at that path, the deployed site logs one 404 for it on load.
That is the declaration looking for a font that was deliberately not committed — `font-display:
swap` means the fallback renders immediately and nothing waits on it.

## Structure

```
src/
  app/           Root shell
  components/
    common/       Shared primitives (Section, PhotoTile, Toast, icons, logo)
    header/       Site header + search pill
    gallery/      Hero photo grid
    listing/      Listing sections, sticky nav, calendar, host, things to know
    reviews/      Guest-favourite header, rating breakdown, review cards
    booking/      Booking card, promo banner
    photo-tour/   Full-screen photo tour
    lightbox/     Single-photo viewer
    amenities/    Amenities dialog
  data/          All content (property, photos, reviews, amenities, nearby stays)
  hooks/         useNavState, useBodyScrollLock
  styles/        Design tokens, reset, layout, accessibility
  types/         Domain types
  utils/         URL state, formatting, class names
```

Every design value is a CSS custom property in `src/styles/tokens.css` — colour, typography,
spacing, radii, layout widths, z-index, motion. No component hardcodes a colour, width or spacing.

## Content and assets

All 43 photo slots carry real photography, and the text — description, the six reviews, the 44
amenities across 12 categories, house rules, host details — is the reference's own. Nothing is
invented: where content could not be sourced it was left out rather than fabricated.

`src/data/photos.ts` holds the canonical ordered 43-photo manifest, generated from
`photoCategories.ts` so counts cannot drift, with a dev-time validator asserting count, index
contiguity, unique ids and per-category totals. The hero uses slots 6, 3, 4, 12, 28 — the set the
reference actually renders, not the first five.

## Decisions

`DECISIONS.md` records every significant choice and, where a value came from the reference, how it
was obtained. It also records the mistakes found along the way and what they were traced to, which
may be the more useful read.

`REFERENCE_SPEC.md` holds the measured specification.
