# Airbnb Listing Page

A React 19 + TypeScript + Vite implementation of an Airbnb listing page, built to match a
reference deployment as closely as possible.

**Live:** [https://air-bnb-clone-xi-one.vercel.app](https://air-bnb-clone-xi-one.vercel.app)

**Reference:** https://airbnb-clone-umber-two.vercel.app/

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

Two things here differ from the reference on purpose, and both are the one place this build is
not trying to match it.

**Typography.** The face the reference uses is proprietary, so it could not be vendored — but the
type is also meant to differ. `--font-family-base` leads with DM Sans and names no proprietary
family at all, so the page renders the same everywhere rather than matching the reference on a
machine that happens to have the original installed. DM Sans is slightly narrower, so a long
paragraph wraps a line or two later. Every metric above is unaffected.

**The brand mark.** An original drawing, and a different figure rather than a variant — an arch
over a doorway on a shared baseline. It keeps the same 32px slot and optical weight, so the
header's geometry is unchanged. The logotype is not reproduced; the wordmark is set as type.

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

`REFERENCE_SPEC.md` is the implementation spec — what is rendered, at what
measurements, and what is deliberately not rendered. Values are marked [V]
where verified against the reference and [I] where internal to this build.

`CLAUDE.md` holds the rules every change has to follow, and `.claude/` holds
the four sub-agent configs and two skills that enforce them — visual
measurement, the keyboard and focus chain, the project rules, originality,
and a five-gate pre-submission check.

`PROMPTS.md` is the prompt log for the work recorded in it — a remediation and
documentation pass, not the original build. Its opening section says so.

## Architecture

`docs/architecture.svg` (and the same drawing as `.png`) is a production
architecture for a vacation-rental marketplace at scale, covering frontend,
backend, storage, search and deployment. Three traffic paths are traced
through it separately — browse, book and publish — because each scales on a
different curve. The footer records which single box of it this repository
actually implements.
