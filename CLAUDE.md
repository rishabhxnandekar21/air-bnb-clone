# Project rules

An Airbnb listing page reproduced from a reference deployment, as a React 19 +
TypeScript + Vite single-page app. No backend, no router, no state library, no
UI kit. Three views: the listing page, the Photo Tour, the Lightbox.

These rules exist because breaking them has already caused defects here. The
`code-reviewer` agent enforces them; the others assume them.

---

## 1. Token discipline

Every repeated visual value lives in `src/styles/tokens.css`. Colour,
typography, spacing, radii, layout widths, z-index and motion are all tokens.

- No hex colour, `rgb(` or `rgba(` outside `tokens.css`.
- No `px` for font-size, radius or layout dimension outside `tokens.css`.
  A genuine structural one-off is fine; anything appearing twice is a token.
- No `box-shadow` declared anywhere but `tokens.css`.
- **Never** `style={{ fontSize }}` or similar inline overrides. They bypass the
  token system, and a heading size regression traced to exactly this.

When a value is missing, add a token. Do not inline it "just here".

## 2. Content is data, never JSX

All page content lives in `src/data/` — `property.ts`, `reviews.ts`,
`amenityCategories.ts`, `photos.ts`, `nearbyStays.ts`.

- **Nothing is invented.** No filler review text, no plausible-sounding amenity,
  no placeholder host. Where content could not be sourced it is left out, and
  the gap is recorded in a comment rather than filled.
- Two such gaps are deliberate and must not be "fixed" by fabricating data: the
  button reads "Show all 50 amenities" against 44 real entries, and "Show all
  19 reviews" against 6 real review texts. Those counts are what the listing
  states; the data is what could be sourced. Leave both.
- `photos.ts` is generated from `photoCategories.ts` so counts cannot drift,
  and `validatePhotoManifest.ts` asserts count, index contiguity, unique ids
  and per-category totals at dev time. Do not hand-edit the manifest.
- No `new Date()` driving anything the page shows as fixed. The stay dates are
  content.

## 3. Modal state lives in the URL

`src/hooks/useNavState.ts` and `src/utils/url-state.ts` own it. `ModalKind` is
`'PHOTO_TOUR_SCROLLABLE' | 'AMENITIES'`; the lightbox index rides as
`modalItem`, offset by 1000.

- No overlay keeps its own open/closed state. Browser Back must close a dialog,
  and every view must be reachable by URL.
- Parsing is total: a malformed, out-of-range or orphaned `modalItem` resolves
  to `null` rather than throwing. Keep it that way.

## 4. Originality

This is a clone, so matching layout, spacing, colour and content is the task.
Copying the reference's *code* is not.

- Icons are original line artwork on a 24 grid, ~1.5px stroke, in
  `src/data/amenityIconPaths.ts`. Not an icon pack, not traced paths.
- The brand mark in `BrandMark.tsx` is an original drawing, and it is
  deliberately a *different figure* from the reference's, not a variant of
  it. Do not redraw it closer to the original. The logotype is not
  reproduced either; the wordmark is set as ordinary type.
- The type is deliberately not the reference's. `--font-family-base` leads
  with DM Sans and names no proprietary family at all, so the page renders
  the same everywhere rather than matching the reference on a machine that
  happens to have the original installed. Run widths stay slightly narrow
  as a result — intended, not a bug to chase.
- Never introduce a comment describing code as ported, extracted or lifted
  from the reference. If that would be accurate, the code is wrong, not the
  comment.

## 5. Accessibility is graded

- Every overlay traps Tab, sets focus on open, restores it on close, and
  answers Escape. Nesting matters: Escape closes only the topmost layer.
- Icon-only buttons carry `aria-label`. Dialogs carry `role="dialog"`,
  `aria-modal` and an accessible name.
- Interactive elements are `<button>` or `<a>`, never a `div` with `onClick`.
  Controls with no destination are `<button>`, not `href="#"`.
- Nothing disables a focus outline without replacing it with something at
  least as visible.
- No transition ignores `prefers-reduced-motion`.

## 6. Scope

Three views and the amenities dialog. Not in scope: extra routes, a state
library, a component kit, dark mode, an animation library, loading skeletons.
A clean complete build beats an over-engineered incomplete one.

Mobile is explicitly out of scope. Layout reflow that already exists may stay;
do not add mobile-specific UI.

## 7. Structure

One component per directory-level concern, each with its own `.module.css`.
`src/components/common/` holds shared primitives. A component past roughly 200
lines is usually doing two jobs.

## Two bugs worth grepping for

Both have appeared here more than once:

- An inline element (`<span>`) given `width`, `height` or `aspect-ratio`,
  which silently does nothing.
- A percentage `height` inside a parent with no height, which resolves to
  `auto` and collapses the box.

## Checks

```bash
npm run build     # tsc -b, then vite build
npm run lint      # oxlint
```

Both must exit 0 before anything is considered done. There is no test suite
and no capture harness; behaviour is verified by driving the page in a
browser.
