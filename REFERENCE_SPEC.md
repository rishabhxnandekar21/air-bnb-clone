# Implementation spec

What this build renders, at what measurements, and what it deliberately does
not render. `DECISIONS.md` covers *why*; this is the *what*.

## Status of the numbers

Two different confidence levels appear below, and they are labelled rather
than blended:

- **[V]** — verified against the reference while it was reachable, then
  re-measured against this build.
- **[I]** — internal to this build: the value it renders, checkable for
  consistency but not confirmed against the reference, which now sits behind
  a bot checkpoint (see `DECISIONS.md` §10).

Nothing here is estimated. Where a value could not be established it is
absent, not guessed.

## Layout

| | Value | |
|---|---|---|
| Header height | 88px, full-bleed, 80px page padding | [V] |
| Page container cap | 1280px | [V] |
| Content column | 1120px, at x=208 on a 1536px viewport | [V] |
| Main column | 652px | [V] |
| Booking card | 372px, at x=956 | [V] |
| Column gap | 96px | [V] |
| Sticky nav | 66px, fixed, slides in once the hero scrolls past | [V] |
| Breakpoints | 1128px and 743px | [V] |

## Hero gallery

1120 x 494 at full width [V]. Proportional rather than pinned:
`grid-template-columns: 35fr 17fr 17fr` on a `1120 / 494` aspect ratio, so the
shape holds as the container narrows. Primary cell 560 x 494; secondaries
272 x 243; 8px gaps; 12px radius clipped on the group [V].

Photos are manifest slots **6, 3, 4, 12, 28** — the five the reference
renders, not the first five [V].

## Colour

Every value is a token in `src/styles/tokens.css`. Tokens are named for the
job they do here.

| Token | Value |
|---|---|
| `--color-primary` | `#ff385c` |
| `--color-text-primary` | `#222222` |
| `--color-text-secondary` | `#717171` |
| `--color-border` | `#dddddd` |
| `--color-border-soft` | `#ebebeb` |
| `--color-surface-muted` | `#f7f7f7` |

Reserve is a three-stop gradient, not a flat fill [V].

## Typography

**Deliberately divergent [I].** The type is not the reference's and is not
meant to be. `--font-family-base` leads with DM Sans and names no proprietary
family; nothing is vendored and no `@font-face` declares one. DM Sans is
narrower at the same size, so long paragraphs wrap a line or two later
(`DECISIONS.md` §5).

The brand mark is likewise a different figure, not a variant — an arch over a
doorway, in the same 32px slot and optical weight as the mark it replaces
(`DECISIONS.md` §4).

Title 26px / 30px line-height / 500. Body 14–16px. Booking-card field labels
10px uppercase, 500, 0.03em.

## The three views

| View | Component | URL |
|---|---|---|
| Listing | `listing/ListingPage.tsx` | `/` |
| Photo Tour | `photo-tour/PhotoTour.tsx` | `?modal=PHOTO_TOUR_SCROLLABLE` |
| Lightbox | `lightbox/Lightbox.tsx` | `?modal=PHOTO_TOUR_SCROLLABLE&modalItem=1000`–`1042` |
| Amenities dialog | `amenities/AmenitiesModal.tsx` | `?modal=AMENITIES` |

Photo Tour tiles 458 x 305; category nav 976px across 8 columns [V].

## Photo manifest

43 slots, generated from `photoCategories.ts` and asserted at dev time by
`validatePhotoManifest.ts`.

Living room 1 (3), Living room 2 (7), Full kitchen (2), Bedroom (6), Full
bathroom (1), Gym (5), Exterior (6), Pool (3), Additional photos (10) = 43.

## Keyboard and focus

All overlays route through `src/hooks/useOverlayFocus.ts`: focus in on open,
Tab trapped, focus restored to the opener on close, Escape handled by the
topmost layer only.

Verified by driving the page:

- 40 Tab presses inside the Photo Tour, the Lightbox and the amenities dialog
  each leave focus inside that overlay.
- Escape with the Lightbox open closes **only** the Lightbox and returns focus
  to the exact tile that opened it; the Photo Tour stays open.
- A second Escape closes the tour and restores the listing's scroll position.
- `←` / `→` move between photos without a focused button.
- Browser Back closes an overlay.

## Not implemented, deliberately

- **No footer.** The reference has none; the page ends after "More stays
  nearby".
- **No reviews dialog.** The reference ships three dialogs — Photo Tour,
  Lightbox, amenities. Its "Show all 19 reviews" control has no handler, and
  neither does this one.
- **No geographic map.** "Where you'll be" is drawn in CSS, as the
  reference's is.
- **Counts that do not reconcile, on purpose.** "Show all 50 amenities"
  against 44 entries, "Show all 19 reviews" against 6 texts. See
  `DECISIONS.md` §6.
- **No mobile UI.** Desktop is the assignment's scope. The layout reflows;
  nothing mobile-specific was added.

## Open

The raster icons under `public/images/` are not original work and are still to
be redrawn (`DECISIONS.md`, "Open").
