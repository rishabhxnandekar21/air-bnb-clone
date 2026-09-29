# Decisions

Why this project is built the way it is. Each entry records a choice, the
reasoning, and — where relevant — the mistake that produced it. The wrong
turns are the more useful half.

---

## 1. React + TypeScript + Vite, and nothing else

Vite for fast startup and HMR with almost no configuration. TypeScript in
strict mode with `noUncheckedIndexedAccess`, which catches an entire class of
bug in a UI with layered modal states.

Deliberately absent: a router, a state library, a component kit, a CSS
framework. The assignment is one page with two overlays. Each of those would
add a dependency to carry and a convention to explain, and none would remove
work.

The assignment makes a backend optional and permits frontend storage. There
is no backend here: content is a typed module in `src/data/`, shaped the way
a listing service's response would be. Swapping it for `fetch()` is a change
to the data layer, not a rewrite.

## 2. Modal state lives in the URL, not in components

`src/utils/url-state.ts` and `src/hooks/useNavState.ts` own it.
`?modal=PHOTO_TOUR_SCROLLABLE` opens the Photo Tour; `&modalItem=1000..1042`
opens the Lightbox on a photo.

This buys three things a `useState` boolean cannot: every view is directly
addressable and shareable, browser Back closes an overlay because it is a
real history entry, and the states can be opened directly in review without
clicking through to reach them.

Parsing is **total**. A malformed, out-of-range or orphaned `modalItem`
resolves to `null` rather than throwing, so a hand-edited URL never
white-screens the app. `modalItem` alongside any modal other than the Photo
Tour is ignored, so a future modal cannot inherit a stray lightbox index.

The 1000 offset is not decoration — it makes an accidental `?modalItem=3`
fall outside the valid range instead of silently opening photo 3.

## 3. One overlay-focus hook, not three implementations

`src/hooks/useOverlayFocus.ts` owns focus for every overlay: move focus in on
open, trap Tab, restore focus to the opener on close, answer Escape.

This replaced three divergent implementations, and the divergence was hiding
two real defects:

- **The Photo Tour had no focus management at all** — no initial focus, no
  restore, no trap. Tab walked straight out of the overlay into the listing
  page behind it.
- **Escape unwound two layers at once.** With the Lightbox open over the
  Photo Tour, both components had a `window` keydown listener and both called
  `goBack()`, so a single Escape popped two history entries and closed
  everything. Verified by driving the page: the URL went from
  `?modal=PHOTO_TOUR_SCROLLABLE&modalItem=1000` straight to `/`.

The fix is an `isTopmost` flag. A covered overlay keeps its focus bookkeeping
but stops answering Escape and stops trapping Tab, so the topmost layer alone
owns the keyboard. `App` passes `isTopmost={lightboxIndex === null}` to the
Photo Tour.

Two details worth keeping:

- Focus restore uses `focus({ preventScroll: true })`. Without it, `focus()`
  scrolls its target into view and undoes the scroll position the page behind
  has just restored.
- The Photo Tour focuses its own dialog surface rather than the first
  control, so opening it does not paint a focus ring on a button the user
  never chose.

Neither defect was visible in the JSX. Both components already had
`role="dialog"` and `aria-modal`, which prove nothing about behaviour. They
were found by driving the page, which is why `.claude/agents/a11y-auditor.md`
insists on it.

## 4. Icons and the brand mark are drawn, not traced

`src/data/amenityIconPaths.ts` holds original line icons on a 24 grid —
~1.5px stroke, rounded caps and joins, colour from `currentColor`.

The brand mark in `BrandMark.tsx` goes further than original: it is a
**deliberately different figure**. An earlier version was an original
drawing but in the reference's own construction — a rounded outline closing
to a point with a looping inner counter — which is a near-variant of a
trademark rather than a mark of this project's own. It is now an arch over
a doorway on a shared baseline: three open strokes, nothing in common with
the original's geometry. It keeps the same 32px slot and optical weight, so
the header's measurements are unchanged.

This is the one place the build is intentionally *not* trying to match the
reference. Redrawing the mark closer to the original would undo the point.

Not an icon pack. Lucide and Heroicons carry their own proportions and read
as foreign next to the rest of the page.

The file is structured as `SHAPES` (one entry per distinct drawing) plus
`AMENITY_SHAPE` (43 amenity ids onto a shape). Six amenities legitimately
share a pictogram — fridge/freezer, kitchen/cooking-basics, the two entrance
rows — and this stores each drawing once. `ShapeName = keyof typeof SHAPES`
makes a typo in the mapping a compile error rather than a silently blank slot.

The logotype is not reproduced either. The wordmark beside the mark is set as
ordinary type at weight 600 — 700 reads heavier than the lettering it stands
in for.

## 5. The font is a licensing decision, not an oversight

Two things are true here, and the second is the operative one.

The face the reference uses is proprietary: not published under any public
licence, not carried by any font service, and serving it over HTTP grants no
redistribution licence. So it could not be vendored.

Beyond that, the typography here is **meant** to differ. `--font-family-base`
leads with DM Sans and names no proprietary family at all — not at the head
of the stack, not as a fallback. An earlier version listed the original first
so a licensed installation would be picked up, which meant the page matched
the reference exactly on any machine that happened to have the font. That is
the opposite of the intent.

There is also **no `@font-face` for it**. An earlier version declared one
against a path this project does not ship, which cost a failed request on
every page load and rendered nothing. The name stays at the head of
`--font-family-base`, so a machine with the font installed picks it up
locally at no network cost.

DM Sans carries the page otherwise — an open geometric sans with a comparable
x-height. It is narrower at the same size, so long paragraphs wrap a line or
two later. That is the one known type difference, and it is not a spacing bug
to chase.

## 6. Content is data, and none of it is invented

`src/data/` holds everything the page says. Nothing is fabricated: where
content could not be sourced it is left out and the gap is recorded, rather
than filled with something plausible.

Two gaps are deliberate and must survive:

- The amenities button reads **"Show all 50 amenities"** against **44** real
  entries.
- The reviews button reads **"Show all 19 reviews"** against **6** real
  review texts.

The counts are what the listing states. The data is what could be sourced.
Reconciling them by inventing rows would turn a visible, honest gap into an
invisible fabrication, which is worse — a reviewer can see the first and
cannot see the second.

Several controls are inert for the same reason the reference's are: the
reviews "Show all", the map controls, "Report this listing". They remain
focusable and labelled — inert is not the same as broken.

## 7. The photo manifest is generated, and checked

`photos.ts` is derived from `photoCategories.ts` so the 43 slots and the
per-category counts cannot drift apart. `validatePhotoManifest.ts` asserts
count, index contiguity, unique ids and per-category totals at dev time.

This is a test in the only form that earns its place here: it runs
automatically, needs no runner, and ships nothing to production. There is no
test suite otherwise, and the README does not claim one.

The hero uses manifest slots **6, 3, 4, 12, 28** — the five the reference
actually renders, not `PHOTOS.slice(0, 5)`. `HERO_PHOTO_INDICES` is canonical
so the order cannot be "tidied" back into a slice.

## 8. Every visual value is a token

`src/styles/tokens.css` holds colour, typography, spacing, radii, layout
widths, z-index and motion. No component hardcodes a colour, width or
spacing.

The rule earns itself: a heading-size regression here traced directly to an
inline `style={{ fontSize }}` that bypassed the system. Inline visual
overrides are now a review failure — see `CLAUDE.md`.

Token names describe the job the value does in this page, not the palette
they came from. A name is part of the source, and borrowing one from
elsewhere makes the origin of the code ambiguous for no benefit.

## 9. Desktop is the scope

The assignment says desktop only. The layout does reflow, because it was
cheaper to make the grid proportional than to pin it, but no mobile-specific
UI exists and none should be added. The hero is
`grid-template-columns: 35fr 17fr 17fr` on a `1120 / 494` aspect ratio rather
than fixed pixels, so the proportions hold at any width and still measure
1120x494 at full size.

## 10. What cannot be verified, and is not claimed

The reference is behind a bot checkpoint that serves an interstitial to
anything automated. No attempt is made to work around it — that is defeating
a site's access controls, not measuring a reference. The practical
consequence is that this build cannot be diffed against it live, and
`.claude/skills/visual-qa/SKILL.md` says so rather than implying a comparison
that did not happen.

The geometry recorded in `README.md` dates from when the reference was
reachable. Anything it does not cover is checked for internal consistency
instead, which needs no reference: one role rendering two different sizes in
two places is provably wrong either way.

## Open

The raster icons under `public/images/icons/` and `public/images/ui/` are not
original work. They are still to be replaced by drawings in the same 24-grid
language as the amenity set, at which point `AssetIcon` goes away.
