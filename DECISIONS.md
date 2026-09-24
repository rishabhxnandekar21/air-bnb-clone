# Architecture Decisions

## 1. React + TypeScript + Vite

Vite gives fast dev-server startup and HMR with minimal configuration overhead. TypeScript in
strict mode catches an entire class of bugs (null/undefined handling, prop mismatches) before
runtime, which matters for a UI with several layered modal states (listing → photo tour →
lightbox). React is the assignment's expected library and pairs naturally with both.

## 2. No heavyweight router

The application has exactly one route-shaped surface: the listing page, with two modal states
layered on top (photo tour, lightbox) that are represented as URL query parameters rather than
distinct routes. A router like React Router is built for multi-page navigation trees with route
matching, nested layouts, and data loaders — none of which this assignment needs. Bringing one in
would add an abstraction layer and bundle weight to solve a problem the native History API and
`URLSearchParams` already solve directly.

## 3. URL-driven modal state

Modal visibility (photo tour, lightbox) is derived from the URL (`?modal=...&modalItem=...`)
rather than kept in isolated component state. This makes modal state shareable via link,
survivable across refresh, and correctly integrated with browser back/forward — closing the
lightbox with the back button and landing exactly on the photo tour (and the same lightbox index
on forward) is a URL-state problem, not a component-state problem. A single utility
(`src/utils/url-state.ts`) centralizes all reading/writing of this state so no component parses
`location.search` directly.

## 4. DM Sans instead of Airbnb Cereal

The reference design uses Airbnb's proprietary "Cereal VF" typeface, which is not licensed for
reuse outside Airbnb's own products. DM Sans is an open, freely licensed geometric sans-serif with
a similar visual character (weight, x-height, letterform proportions) and is loaded via Google
Fonts at weights 400 and 500 — the two weights the reference design actually uses. No proprietary
font files are downloaded, embedded, or hotlinked from Airbnb-controlled sources.

## 5. Clean-room implementation approach

The UI is implemented by observing and measuring the reference design's layout, spacing, and
color values (verified independently — see the design tokens in `src/styles/tokens.css`) and
reproducing the *behavior and structure* in original code, rather than copying markup, CSS, or
assets from the reference source. No proprietary images, icons, or fonts belonging to the
reference brand are included in this repository.

## 6. Property data as a single canonical record

`src/data/property.ts` exports one `PROPERTY` constant typed by `src/types/property.ts` (plus
`host.ts`, `booking.ts`, `amenity.ts`, `rating.ts`). Every field is copied verbatim from the
verified reference brief — no field was inferred, estimated, or embellished. Splitting the
supporting types across small single-purpose files (one concept per file, matching the pattern
already established by `photo.ts` and `modal.ts`) keeps each type reviewable in isolation and
avoids a single monolithic "everything" type.

## 7. Photo manifest generated from category metadata, not hand-written

`src/data/photoCategories.ts` holds the 9 verified categories with their label and expected count.
`src/data/photos.ts` generates the 43-entry manifest by iterating that metadata rather than
listing 43 records by hand — this makes it structurally impossible for the manifest's per-category
counts to drift from the verified counts, because both are derived from the same array. The
alternative (hand-typing 43 objects) invites silent transcription errors that a generated
approach cannot make.

## 8. Dev-time manifest validation instead of a test file

`src/data/validatePhotoManifest.ts` checks the manifest's shape (count, index contiguity, unique
ids, valid categories, per-category counts) and is invoked once at module load, gated behind
`import.meta.env.DEV`. Vite statically replaces and dead-code-eliminates that check out of
production builds, so it costs nothing in the shipped bundle while still catching manifest drift
immediately during development — the moment someone edits `photoCategories.ts` incorrectly, the
app fails loudly instead of silently rendering a wrong photo count.

## 9a. Photography supplied by the project owner (supersedes the sourcing half of decision 9)

The project owner supplied the listing photography directly as local files, which is the route
offered when the question of assets first came up. Those files are now committed under
`public/images/listing/` and wired through the existing adapter. The *mechanism* described in
decision 9 below is unchanged and still does the work — unsupplied slots keep the
`placeholder://` scheme; only the sourcing question is now settled. What did not change: nothing
was downloaded or scraped from the reference by this project, and no slot was backfilled with
substitute or stock imagery to make the gallery look complete.

Slot ordering was verified rather than assumed. Reading the reference's rendered Photo Tour showed
the hero gallery uses manifest slots 6, 3, 4, 12 and 28 — not 0–4 as the implementation had
assumed since Phase 3 — so `HERO_PHOTO_INDICES` now carries that verified order and `HeroGallery`
consumes it instead of `PHOTOS.slice(0, 5)`.

## 9. Placeholder image scheme instead of fabricated file paths

No photography assets for this listing exist anywhere in this repository or workspace (confirmed
by filesystem search). Rather than invent realistic-looking paths like `/photos/bedroom-1.jpg`
that would 404 silently and look like a real, working asset, every `Photo.src` uses a
`placeholder://{category}/{sequence}` value — a pseudo-scheme that cannot resolve as an `<img
src>`, so it can never be mistaken for a real file. This keeps the limitation visible in the data
itself rather than hidden behind a plausible-looking but broken URL. See README.md, "Image Source
Strategy," for how this gets swapped for real assets later.

## 10. URL-state range validation is generated, not duplicated

`src/utils/url-state.ts` derives its valid `modalItem` range (`1000`–`1042`) from
`PHOTOS.length` rather than hardcoding `42` — so if the photo count ever changes, the URL
parser's valid range updates automatically instead of silently falling out of sync with the
manifest it's supposed to index into.

## 11. Reference fidelity pass (Phase 3.5): what was reproduced and what was not

The listing page's geometry was corrected against a live reference deployment using
`getBoundingClientRect()` measurements (not eyeballed) — see the measurement comments left in
`tokens.css`, `layout.css`, `Header.module.css`, and `HeroGallery.module.css` for the specific
numbers. Two categories of reference content were deliberately **not** reproduced, on principle
rather than oversight:

- **The "Airbnb Cereal VF" font.** The reference's `document.fonts` reports this exact family
  (weights 200–900, loaded). It is Airbnb's proprietary typeface, licensed only for Airbnb's own
  properties — it is not a font this project has any right to self-host or hotlink, regardless of
  how it's served on the reference. DM Sans remains the substitute (see decision 4). This is a
  re-confirmation of that earlier decision with direct evidence, not a new one.
- **The reference's real listing photography.** The reference loads real photographs of an actual
  short-term-rental property from its own asset store. That photography is not this project's to
  copy and redistribute — real-world images of somebody's real property carry their own copyright
  regardless of the fact that a "reference implementation" happens to display them. The
  `placeholder://` scheme (decision 9) remains in place unchanged.
- **The Airbnb wordmark/logo** shown in the reference header is a protected trademark and was
  never a candidate for reuse — the project's own "playpower" brand mark (decision-adjacent to
  the clean-room principle) continues to occupy that position instead.

Everything else — container widths, the header's own independent padding scheme (not the same
box as the listing content column), gallery cell geometry, title-row layout, booking-card field
order, and section grouping — was corrected to match measured/observed reference values, because
layout and spacing are not the kind of content that copyright or trademark law protects; only the
specific creative expression (photography, wordmark, typeface) is.

## 12. Content completeness (Phase 3.6): why some reference content was not added

No assignment brief exists anywhere in this project or workspace — every requirement to date has
come from the project owner's own instructions across phases. Treating that instruction history as
the authoritative scope (rather than "everything the reference happens to display"), several
content items visible on the reference were deliberately left out of the canonical `PROPERTY` data
rather than copied in:

- Guest/bedroom/bed/bathroom counts (e.g. "3 guests · 1 bedroom · 1 bed · 1 bathroom")
- Per-feature descriptive sentences (e.g. "The pool and alfresco dining are great for summer
  trips")
- The "Guest favourite" badge and its associated marketing copy
- The "Get 10% off your next stay" promotional banner
- ~~The sticky secondary navigation bar (Photos/Amenities/Reviews/Location tabs + condensed
  price)~~ — **superseded.** This was subsequently built and is rendered by
  `src/components/listing/StickyNav.tsx`; it is layout, not third-party factual data, so it did
  not raise the concern the rest of this list does.

None of these were specified in this project's own canonical-data brief (Phase 2). Reproducing
them would mean trusting a third-party clone site as an authoritative data source for a real
business's real property — a step beyond "matching layout and spacing," which is what the
reference-fidelity work in decision 11 is scoped to. If the project owner has the actual source
data for these fields (or wants the reference's numbers trusted as-is), they can be added in a
follow-up pass; until then, `PROPERTY` stays exactly as specified in Phase 2.

The same reasoning was considered for the photo gallery: using generic, properly-licensed stock
photography as placeholder-replacement (rather than the reference's real listing photos) was
evaluated and set aside for this pass, since sourcing and license-verifying 43 individual images
against the required category counts is a substantial, separate content-sourcing effort rather
than a visual-fidelity correction — see README.md, "Image Source Strategy," for the current
status.

## 13. Header branding: PlayPower mark replaced with an original "airbnb" wordmark treatment (Phase 4)

The project owner's Phase 4 brief was explicit and specific: the header must visually read as
Airbnb's, not PlayPower's, because the evaluator compares the rendered page against the reference
directly. This supersedes the header-only aspect of decision 11's trademark note (which kept
"playpower" in that slot) — the *reasoning* in decision 11 about not embedding Airbnb's actual
proprietary logo file still holds, but leaving the previous brand's own name and mark in the
header is no longer the right way to honor it, now that the owner has said so directly.

What changed: `Header.tsx`'s brand mark (a "PP" square) and text ("playpower") were replaced with
`IconBrandMark` — a new, original SVG icon (four rounded petals meeting at a center point, defined
from scratch, not traced or derived from Airbnb's Bélo symbol) — paired with the plain text
"airbnb" in the existing brand-pink token (`--color-primary`, `#ff385c`, itself independently
matched to Airbnb's real brand color, not copied from any asset file). `index.html`'s `<title>`
and `public/favicon.svg` were updated the same way, for the same reason: they're part of the same
"which brand is this" signal, even though they're not literally inside the header element.

This keeps the position taken in decision 11 intact — no proprietary Airbnb artwork (the actual
logo file, wordmark glyph, or font) is downloaded, traced, or embedded anywhere in this repo — while
no longer displaying a *different, unrelated* brand's name and mark in the one part of the page a
reference-fidelity comparison looks at first.

## 14. Reference re-verification blocked this session; prior measurements trusted instead

This session's brief asked for the reference to be re-measured live (multiple viewport widths,
`getBoundingClientRect`/`getComputedStyle`/`document.fonts` inspection, screenshot diffing). The
reference URL is currently behind a Vercel bot-verification checkpoint: every access attempt this
session — `curl`, the harness's `WebFetch` tool, and a locally driven Playwright/Chromium instance
(both headless and headed, default configuration) — received either an HTTP 429
(`X-Vercel-Mitigated: challenge`) or the interstitial's own "Failed to verify your browser — Code
21" page, which never resolves to the real site. No attempt was made to work around that check
(no header/UA spoofing, no stealth automation, no proxying) — that would mean deliberately
defeating a third-party site's access controls, which is out of bounds regardless of the
(legitimate) reason for wanting the page.

Given that constraint, this pass relied on the extensive, already-verified measurements an earlier
phase captured while the reference *was* reachable — recorded directly as comments throughout
`tokens.css`, `layout.css`, and the individual component stylesheets — cross-referenced against the
specific content values supplied in the brief itself (price, dates, title, category counts, sticky
nav copy) and, where neither source covered a case (e.g., the mobile hero layout — see
`HeroGallery.module.css`), Airbnb's own known production design patterns, since this reference is
explicitly a clone of that real product. `REFERENCE_SPEC.md` records which values come from which
source, marking anything not directly re-verified this session as inferred.

---

## 15. Phase 5 — structural completion, with content left data-driven

The remaining structural gaps against the reference were closed in this pass: a page footer
(`src/components/footer/Footer.tsx`), a neighbourhood map in "Where you'll be", per-category
rating bars, guest review cards, a reviews modal reachable at `?modal=REVIEWS`, a description
block with a "Show more" toggle, and content slots for the previously heading-only "House rules"
and "Safety & property" columns.

The components exist; most of the *content* deliberately does not. `Property` gained
`description`, `reviews`, `houseRules`, `safetyItems` and `capacity` as **optional** fields, and
every consumer renders nothing when its field is absent. This keeps decision 12's rule intact —
no invented prose, no invented house rules, no invented guest reviews for a real property — while
removing the need to touch a single component when the real text is supplied. Dropping the text
into `src/data/property.ts` is the whole integration step.

Two things are genuinely new data rather than absent data:

- `coordinates` is Candolim, Goa's real published position (15.5185, 73.7625). The map is an
  OpenStreetMap embed centred there, with the translucent circle Airbnb uses to indicate an
  approximate area — consistent with `locationNotice`, which already says the exact location
  follows booking. No API key and no new dependency.
- The footer's link labels are Airbnb's own generic, non-listing-specific navigation, which is
  public and carries no factual claim about this property. The links have no destinations here,
  so they render as buttons rather than `href="#"` anchors that would jump the page on click.

`ReviewsModal` is only mounted when review data actually exists, so `?modal=REVIEWS` is currently
an inert URL rather than an empty dialog.

---

## 16. Phase 6 — reference recovered from a saved copy, design system ported

The owner saved a complete copy of the reference page from their own browser
(the deployment stays behind Vercel's Attack Challenge Mode, which returns
HTTP 429 with `X-Vercel-Mitigated: challenge` to every automated request; no
attempt was made to defeat it). That copy is committed under `reference/` and
is now the source of truth. It contained three things nothing else could give:

**All 43 photographs.** The saved assets folder holds 55 JPEGs. The Photo
Tour's own DOM order maps 1:1 onto the 43 manifest slots, which independently
confirmed all 24 previously-mapped files, the category boundaries, and
`HERO_PHOTO_INDICES = [6, 3, 4, 12, 28]`. The 19 previously-empty slots are
filled with the reference's real photography, so `MANIFEST` no longer carries
`null` and the entry type narrowed from `string | null` to `string`. The
`placeholder://` scheme and `resolvePhotoSrc` stay as the load-error fallback.

**The complete stylesheet.** 27,713 characters of CSS were inlined in a
`<style>` tag in the body. Its `:root` is now ported into `tokens.css`
verbatim, which corrected several values that had been inferred: the Reserve
button is a three-stop gradient rather than a flat `#ff385c`; the container is
a 1280px cap with 80px padding (yielding the same 1120px content column);
breakpoints are 1128px and 743px, not 1024/900/700; sections are separated by
`border-top` on `--line-soft`, not `border-bottom`; the sticky bar is 66px and
is `position: fixed`, hidden by default and sliding down once the hero
scrolls past, rather than `position: sticky`; the hero grid is proportional
(`35fr 17fr 17fr` on a 1120/494 aspect ratio) rather than `50% 1fr 1fr` at a
fixed height; and the header's right side is two 40px round buttons on
`--grey200`, not a combined profile pill.

**The real content.** The listing description, the 44 amenities grouped into
the reference's own 12 categories, and the fact that "Carbon monoxide alarm"
and "Smoke alarm" render struck through as unavailable. These are now in
`src/data/`, so decision 12's rule holds — nothing here is invented, all of it
is the reference's own text.

Two honest discrepancies are preserved rather than papered over: the
reference's button reads "Show all 50 amenities" while its own dialog lists
44, so the app renders the true count from its data; and Airbnb Cereal VF is
declared with the reference's exact `@font-face` and stack, but the woff2 is
proprietary and is not committed, so the chain falls through to DM Sans until
someone supplies the file.

---

## 17. Phase 6b — summary block rebuilt against the reference DOM

The owner spotted that the summary region did not match. Reading the
reference's own DOM between its `<h2>` and "Where you'll sleep" settled the
exact order and content, and four things were wrong:

1. **Section order was inverted.** The reference runs heading → Guest
   favourite card → host row → feature highlights → description. The app had
   the description above the feature highlights. Corrected in `ListingBody`.
2. **The "Guest favourite" card was missing entirely** — a bordered 16px-radius
   row with a laurel either side of the label, the note "One of the most loved
   homes on Airbnb, according to guests", and 4.95/19 split by a hairline
   divider. Now `PropertySummary`. The laurel is an original glyph
   (`IconLaurel`) mirrored with `scaleX(-1)` for the right side, as the
   reference does; it is a placeholder for the real artwork.
3. **The "Get 10% off your next stay" card was missing.** It lives inside the
   sticky booking rail above the card, not in the page content, so it scrolls
   with the card — `PromoBanner`, rendered in `ListingPage`.
4. **Heading wording.** The reference reads "Entire serviced apartment in
   Candolim, India", not "Serviced apartment in Candolim, Goa, India". Rather
   than overload `location` (which correctly stays "Candolim, Goa, India" in
   "Where you'll be"), `Property` gained `shortLocation`, and `propertyType`
   became "Entire serviced apartment".

The host row also now uses the reference's real host photograph
(`public/images/ui/host.jpeg`) via a new optional `Host.avatarSrc`, falling
back to the initials avatar when absent. This supersedes decision 12's listing
of the promo banner as deliberately omitted — it is the reference's own
content, not invented copy.

One operational note: rewriting whole modules under a long-running Vite dev
server left its transform cache stale and the app rendered blank with "does
not provide an export named 'PropertySummary'" while the file and `tsc -b`
were both fine. Clearing `node_modules/.vite` and restarting fixed it; it was
never a source defect.

---

## 18. Phase 6c — element-by-element measurement against the reference

Rather than compare screenshots by eye, both pages were loaded at identical
viewports and 25 elements measured on each with `getBoundingClientRect` plus
`getComputedStyle`, then diffed. Run at 1920x1080, 1536x864 and 1440x860.

The hypothesis under test — that the app's gallery images render larger than
the reference's — did not hold. At every width the hero is identical:

| | reference | app |
| --- | --- | --- |
| hero grid | 1120x494 | 1120x494 |
| primary cell | 560x494 | 560x494 |
| secondary cell | 272x243 | 272x243 |

as are the header (89px), header inner row (88px), search pill (392x48), h1
(586x30 at 26px/500), Share button (80x35), "Show all photos" (142x32 at
12px/500), the 652px content column, and every summary block.

Two real differences surfaced and were fixed:

**The booking card was 44px short.** Its internals had been inferred rather
than read. The reference's own rules gave: price 22px (not 20) with an 18px
row margin, "for 5 nights" at 15px (not 14), field box ruled in `#b0b0b0`
(not `--color-border`), field padding 10px/12px (not 16px), labels at
10px/**700**/`0.04em`, the cancellation strip centred with 8px padding and
16px vertical margins, and a 16px gap above the disclaimer. `#b0b0b0` is now
`--color-field-border`. The guest row also gained its chevron, and the
"Report this listing" link that sits below the card inside the sticky rail.

**DOM nesting differed.** The reference wraps the title row, hero and content
grid in a single container div; the app had made each of them the container.
Visually identical, since the inner content landed at the same coordinates,
but it meant those three boxes measured 1280px where the reference measured
1120px. `ListingPage` now nests them the same way, so every box lines up 1:1
and future measurements compare directly.

Three residual deltas are known and accepted: the brand wordmark is 2px wider
(placeholder logo), and the booking card and its field box are each 2px
shorter — text metrics from DM Sans standing in for Airbnb Cereal VF, which
will resolve if the real woff2 is supplied. Page height still differs (6266 vs
4151) purely because the reviews, "More stays nearby" and richer host blocks
are not built yet.

---

## 19. Phase 6d — availability calendar, and the grid/full-width split

The reference carries an inline availability calendar between the amenities
list and the reviews, which the app was missing entirely. It is now
`AvailabilityCalendar`, built from the reference's own rules rather than
approximated: two months in a `1fr 1fr` grid with a 56px gutter, prev/next
floated above both at `top: -4px`, weekday initials at 12px/500, and day cells
on a 1:1 aspect ratio.

The booked range is drawn the way the reference draws it — the first and last
night as filled circles, the nights between as a continuous grey bar, and each
end circle joined to that bar by a half-width `::before` block at `z-index:-1`.
Unavailable dates render struck through in `#dddddd`; the reference's own
unavailable set (18-24 and 29-30 November 2026) is now data on
`BookingDetails.unavailableDates`. Month navigation and "Clear dates" are live,
and the calendar computes real dates rather than hardcoding a grid.

One subtle match: the reference never resets button padding, so its "Clear
dates" control keeps the browser default of `1px 6px`. This project's global
reset zeroes button padding, which made the control 12px narrower and 2px
shorter. `.clearButton` restores that padding explicitly instead of weakening
the global reset.

**The larger finding was structural.** Measuring where the reference's
two-column grid actually ends showed it closes at y=2733, immediately after
the calendar. Everything below — reviews, "Where you'll be", "Meet your host",
"Things to know", "More stays nearby" — runs the full 1120px content width,
not the 652px left column. The app had all of those inside the left column.
`ListingBody` now holds only the sections that sit beside the booking rail,
and the new `ListingSections` holds the full-width ones, in the reference's
order (reviews before location). The grid now ends at y=2732 and every
below-grid section measures 1120px at x=208.

Measured against the reference at 1536x864, the calendar matches exactly:
title 652x31 at 22px/500, months grid 652x277, each month panel 298 wide,
month title 298x23 at 16px/500, weekday row 298x17, day grid 298x213,
individual day cell 43x43, controls row 652x22, "Clear dates" 82x21.

---

## 20. Phase 7 — the full-width sections below the grid

The last four sections were built from the reference's own DOM and CSS.

**Reviews** (`src/components/reviews/`). `GuestFavouriteHeader` renders the
100px score at `-0.03em` between the reference's laurel images.
`RatingBreakdownGrid` is the `1.4fr repeat(6,1fr)` layout — the star
distribution on the left, then six category columns divided by hairlines,
collapsing to two columns below 1128px. `ReviewTags` is the scrollable chip
row using the reference's own category PNGs. `ReviewCard` shows a photo when
the reviewer has one and a tinted initial disc otherwise, reusing the exact
background/foreground pairs the reference sets inline. All six reviews are
verbatim, recovered from the `data-full` attributes that hold the untruncated
text behind each "Show more".

**Host** (`HostSection`). The 340px card plus `1fr` detail column, with the
host photo carrying its `--rausch` verified badge, a hairline-divided stats
column, and the eight co-hosts in a three-column grid.

**Things to know** rewritten as three icon-led columns carrying the
reference's real cancellation, house-rules and safety text — which retires the
placeholder-heading compromise decision 12 described.

**More stays nearby** (`MoreStaysNearby`) is the paged carousel: eight cards
at `calc((100% - 80px) / 5)`, with the `1 / 2` counter and disabled-aware
arrows.

New data lives in `src/data/reviews.ts` (reviews + tag chips) and
`src/data/nearbyStays.ts`; the rating breakdown, distribution, co-hosts,
house rules, safety items, cancellation detail and neighbourhood text were
added to `PROPERTY`. Nothing here is invented — every string is the
reference's own.

`WideSection` was added alongside `Section` because the reference gives
below-grid sections 48px of vertical padding against the in-grid 32px.

Measured at 1536x864, the carousel matches exactly: track 1120 wide, cards
208 wide with 208x208 images, 8 cards. Section positions now track the
reference within 12px across a ~6200px page — "Where you'll be" 4148 vs 4136,
"Meet your host" 4999 vs 4988, "Things to know" 5555 vs 5550, "More stays
nearby" 5888 vs 5886. Across 1536/1128/743/390: zero console errors, zero
broken images, zero horizontal overflow.

Category icons (spray bottle, tick, speech bubble, map, calendar-with-cross,
shield, balloon, mortarboard, laurel) are original glyphs drawn to the
reference's sizes, not extracted artwork — consistent with decision 11.

---

## 21. Phase 7b — closing the vertical drift to zero

The section landmarks sat 2-12px below the reference. Rather than nudge
margins until the numbers agreed, each section's children were measured
against the reference's and the causes traced individually. Five were real
value errors, all now corrected against `reference.css`:

| Symptom | Cause | Fix |
| --- | --- | --- |
| review grid 15px tall | review body `line-height: 1.5` | reference uses **1.4** (21px per line at 15px) |
| "How reviews work" 2px short | global reset zeroes button padding | restore UA default `1px 6px` |
| host section 6px short | payment-protection icon 16px | `._ZOpPkY .ico` is **24px** |
| things to know 2px short | column subheading `margin-bottom: 12px` | `._BTCYex ._JwWFHq` is **14px** |
| sleeping arrangements 1px short per row | room label 14px with a 12px image margin | label is **15px** with `margin-top: 14px`, image carries no margin |
| location 2px short | location line 15px | reference is **16px** |

Also corrected while checking: the rating-breakdown category icons are 32px
(`._ygNjbZ .ico`), not the 24px first used.

Every landmark now matches the reference exactly at 1536x864: content grid
ends 2733, summary 716, "Where you'll sleep" 1508, "What this place offers"
1893, "Where you'll be" 4136, "Meet your host" 4988, "Things to know" 5550,
"More stays nearby" 5886. Header, title row, h1 and hero geometry are
unchanged and still exact.

The one remaining measured difference on the page is the booking card at 366
against 368 — text metrics from DM Sans standing in for Airbnb Cereal VF,
which resolves if the real woff2 is supplied.

The lesson worth keeping: the drift was never distributed evenly, so
adjusting the outer sections would have hidden six separate value errors
behind a single compensating offset. Measuring each subtree against its
counterpart found the actual causes.

---

## 22. Phase 8 — the reference's real icon artwork replaces the SVG stand-ins

The owner supplied the reference project's own asset folder. Every icon that
had been drawn by hand as an SVG placeholder is now the reference's actual
artwork, installed under `public/images/icons/` and rendered through a new
`AssetIcon` component:

- Guest favourite card: `guest-laurel-left/right.png` (these are a different,
  smaller pair than the large `laurel-left/right.png` used by the reviews
  header — the reference uses both)
- Rating breakdown: cleanliness spray, accuracy check, check-in key,
  communication bubble, location map, value tag
- Things to know: calendar-cancel, key-outline, shield
- Host: born, education cap, shield
- Feature highlights: fireplace, fan, door
- Amenities: kitchen, wifi, workspace, parking, pool, hot tub, pets, security
  camera, carbon monoxide, smoke alarm, TV
- "Report this listing": flag

`amenityIcons.tsx` became a plain id → path map (`AMENITY_ICON_SRC`) instead
of a component map. Twenty-three now-dead SVG components were deleted from
`icons.tsx`, leaving only the fifteen still used for genuine UI chrome
(chevrons, close, star, share, heart, grid, search, brand mark, and the
image-off placeholder).

Several assets in the folder are deliberately **not** wired up, because the
reference's own built page never references them: the `amenity-*.jpg` photo
set, `gallery-*.jpeg`, the `s1-s7.png` variants (the page uses the `.jpeg`
ones, which were already installed), `A_shape.png` / `V_shape.png` /
`*-symbol.png`, and the `gym*/ext*/add*/pool*.png` files. Wiring them would
diverge from the reference rather than match it.

The folder contains no Airbnb logo, so the header wordmark is unchanged and
remains the placeholder mark from decision 13.

All eight section landmarks still match the reference exactly after the swap
(2733 / 716 / 1508 / 1893 / 4136 / 4988 / 5550 / 5886), with zero console
errors, zero broken images and zero overflow across 1536/1128/743/390.

---

## 23. Phase 9 — real logo, Photo Tour motion, amenity label

**The Airbnb wordmark.** At the owner's explicit and repeated direction the
header now uses the reference's own logo, extracted from `reference.html` as
a single 3,956-character path on a `0 0 3490 1080` viewBox and committed as
`src/components/common/AirbnbLogo.tsx`. The path carries both the mark and
the lettering, so the separate text node is gone and the logo inherits its
colour through `fill: currentColor`. `public/favicon.svg` reuses the same
path with the viewBox cropped to the mark. The placeholder `IconBrandMark`
from decision 13 is deleted. This supersedes decision 11's stance on
reproducing the wordmark; the owner asked for it directly, having supplied
the reference for exactly this purpose. The header logo now measures 103x32
at x=80 — identical to the reference, where the placeholder was 105 wide.

**Photo Tour motion**, ported from the reference rather than approximated:

- tour tiles: `transform .4s cubic-bezier(.2,0,0,1)`, `scale(1.04)` on hover
  and back to `scale(1)` on press, over a 3:2 tile with an 8px radius
- category thumbnails: `scale(1.04)` plus `brightness(.94)` on hover at
  `.25s`, `scale(.99)` on press
- the overlay itself fades in while rising 28px over `.3s`

All three are disabled under `prefers-reduced-motion`. The grid was also
restructured: the reference alternates a full-width photo with a 2-up pair
down a 12px-gapped column, rather than one grid with a spanning first child.
The tour column is a 1024px cap with 24px padding and 96px of bottom
clearance; the container class had been applied to the category nav as well
as the wrapper, which made the nav 1024px wide and gave it the bottom
padding. With that corrected the nav measures 976x276 across 8 columns and
tiles are 458x305 — both exact against the reference.

**"Show all 50 amenities."** The reference is internally inconsistent: its
button advertises 50 while its dialog renders 44 rows (verified by counting
`_gmngIQ` elements in the saved markup, after stripping the inline `<style>`
block that was inflating the count). The label is what the owner sees, so
`ADVERTISED_AMENITY_COUNT = 50` now drives the button while
`TOTAL_AMENITY_COUNT` continues to describe the real list. Keeping them as
two separate values records the discrepancy instead of hiding it behind a
magic number.

---

## 24. Phase 9b — every amenity carries the reference's own glyph

The amenity rows were showing icons for only the eleven that had a matching
raster asset; the other thirty-two rendered with an empty slot. The reference
draws all of them, so its artwork was extracted directly from the saved
markup.

The extraction was uniform enough to store cheaply: all 44 rows use a single
`<path>` on a `0 0 32 32` viewBox filled with `currentColor`, with no stroke
variants and no additional attributes. Only the path data needed keeping.
`src/data/amenityIconPaths.ts` holds 43 entries (44 rows, but "Cot" appears
in both "Bedroom and laundry" and "Family"), keyed by the same slug the
category data uses, and `AmenityIcon` supplies the wrapper. The previous
`amenityIcons.tsx` raster map is deleted.

One id had drifted: `PROPERTY.amenities` carried
`exterior-security-cameras` where the label slug is
`exterior-security-cameras-on-property`, which left that one preview row
without a glyph. Aligning the id fixed it, and coverage is now 10/10 in the
preview and 44/44 across the dialog's twelve groups.

Note the icons had to be counted against markup with the inline `<style>`
block stripped — the reference's CSS lives in a `<style>` tag inside the
body, so its class names would otherwise be counted as if they were elements.
That is what produced the earlier miscount of 48 rows.

---

## 25. Phase 9c — the map is an illustration, and one inert control

**The map.** The reference does not embed a geographic map at all. Its
"Where you'll be" panel is drawn entirely in CSS: a `115deg` linear gradient
splitting sea from land at 34%, two `radial-gradient` landmasses at 30%/40%
and 70%/60%, and a `::before` layer carrying a 90px graticule from two 1px
linear gradients at 50%/35% alpha and 0.5 opacity. Over that sit a 40px round
search button, a stacked pair of 40px zoom buttons with 8px radii, and a 56px
black disc holding a stroked house glyph.

That replaces the OpenStreetMap `<iframe>` this project had been using, which
means the page now makes **no third-party request except the Google Fonts
stylesheet**. Frame measures 1120x480 and the marker 56x56, both exact.

Two details were missed on the first pass and caught by comparing captures
rather than trusting the CSS extraction: the graticule lives on
`._pLIPHL:before`, which the first grep for map rules did not reach; and the
marker's SVG fills the full 56px disc rather than sitting at half size inside
it.

`Property.coordinates` is now unused. It is kept because it is a true fact
about the listing and any real map would need it, with a comment saying so.

**The neighbourhood "Show more".** The reference gives its description toggle
an `id="descMore"` and binds a handler to it, but the neighbourhood-highlights
button carries no id and no handler — it is inert, and the text above it is
never clamped. This project had made it a working toggle that flipped to
"Show less". It is now static, matching the reference, and the clamp is gone.

---

## 26. Phase 10 — removing what the reference does not have

Three additions this project had made speculatively turned out not to exist
on the reference at all, and interactive controls that should be inert were
navigating. All were verified against the saved markup rather than assumed.

**Dead links were navigating.** Six controls used `href="#"`, which scrolls
the page to the top and appends a fragment to the URL on click — Terms apply,
Become a host, Show original, Learn more, Report this listing, and the header
logo. None have a destination, so all six are now `<button>`s, extending the
pattern decision 15 already established for the footer. Verified by clicking
each and asserting the URL, scroll offset and dialog count are unchanged.

**The reviews dialog never existed.** The reference ships exactly three
dialogs — Photo tour, Photo viewer, and "What this place offers". Its
amenities button carries `id="showAmen"` and is wired; its "Show all 19
reviews" button has no id and no handler. `ReviewsModal` was this project's
own invention, so it is deleted along with the `'REVIEWS'` modal kind, its
URL-state branch and the callback threaded through `ListingPage` and
`ListingSections`. The button remains, inert.

**The footer never existed either.** The reference has zero `<footer>`
elements and none of the Support/Hosting/Airbnb link text appears anywhere in
its markup; the page simply ends after "More stays nearby". The footer built
in decision 15 is removed entirely. The trailing 64px of page padding went
with it, since the reference has none.

Also corrected: the "Show more" chevron. The reference uses one glyph for
both of its toggles — a right-pointing chevron on an `0 0 18 18` viewBox that
never rotates. This project had been reusing the nav chevron rotated 90deg to
point down, and flipping it on expand. `IconChevronForward` now carries the
reference's exact path and no transform. Review-card toggles have no chevron
at all on the reference, which already matched.

With the footer and padding gone the page measures 6265px against the
reference's 6266, and all eight section landmarks are exact.

---

## 27. Phase 10b — the Share toast

Clicking Share on the reference raises a dark pill at the bottom centre
reading "Share options". Its markup is an empty
`<div id="_HALoyX" role="status" aria-live="polite">` that stays in the
document and is filled by script, and its two states are both in the
stylesheet:

```
._HALoyX          { position:fixed; left:50%; bottom:32px;
                    transform:translate(-50%,20px); background:#222;
                    color:#fff; padding:14px 22px; border-radius:8px;
                    font-size:14px; font-weight:500; opacity:0;
                    pointer-events:none; transition:opacity .2s,transform .2s;
                    z-index:200 }
._HALoyX._fTQmRt  { opacity:1; transform:translate(-50%) }
```

`Toast` reproduces that, including staying mounted while empty so the live
region already exists when a message arrives. Verified: hidden at opacity 0
translated 20px down, then on click "Share options" at opacity 1, y=0, 32px
from the bottom, centred at x=768 in a 1536 viewport, on `rgb(34,34,34)` at
14px — dismissing itself after 2.5s.

Save is left as it was. Its button toggles the heart to `--rausch` via the
reference's own `._nfavct` modifier, but whether it also raises a toast — and
with what wording — is not recoverable, because the reference's script was
not part of the saved page. Only the Share text was directly observable.

---

## 28. Phase 10c — review paragraph breaks

Expanding a long review rendered its paragraphs with a blank line between
them, where the reference runs them as consecutive lines. The cause was in
the data, not the styling: the reference's `data-full` attribute separates
paragraphs with a single newline, and this project had stored them with a
double. Under the shared `white-space: pre-line`, the double became an empty
line.

Vedant's review — the only one long enough to show the difference — now uses
single newlines. Measured: collapsed 84px (four lines at 21px, matching
`-webkit-line-clamp: 4`), expanded 210px (ten lines), with the toggle
flipping between "Show more" and "Show less" as the reference does.

Worth recording that the trailing "...." on the collapsed text is correct and
not a stray character: the paragraph ends in a full stop and
`-webkit-line-clamp` appends its own ellipsis, so a period plus a three-dot
ellipsis reads as four dots. The reference shows the same.

---

## 29. Phase 10d — line-for-line wrapping is font-bound

A request to match the reference's review text line for line was traced to
its actual cause by extracting the rendered lines from both pages with the
Range API, walking character by character and recording where the top offset
changes.

The result was conclusive: **this app and the saved reference copy wrap
identically — all ten lines, word for word.** The review column measures
520px on both. So neither the text, the column width, the font size (15px)
nor the line height (21px) differs.

The owner's screenshot of the *live* reference shows twelve lines with
earlier breaks, because their browser loads Airbnb Cereal VF while both
locally served pages fall through to DM Sans. DM Sans is the narrower face at
the same size, so it fits more words per line.

That difference cannot be closed in CSS without distorting metrics that
currently match exactly. It closes by supplying the font, which is not
obtainable from anything to hand: the woff2 was not included in the saved
page, and the asset folder the owner supplied contains only images. The
reference serves it at `/assets/fonts/AirbnbCerealVF.woff2`, which a browser
that can pass the Vercel challenge can download directly.

`public/assets/fonts/` now exists with a README recording the path, the URL
and the reason, so dropping the file in is the whole fix — the `@font-face`
already points there and no code changes.

---

## 30. Phase 10e — when the sticky bar appears

The bar was arriving later than the reference's. Traced by stepping the
scroll position and reading its opacity at each stop:

| scrollY | gallery bottom (viewport) | summary heading (viewport) | bar |
| --- | --- | --- | --- |
| 640 | 28 | 76 | hidden |
| 668 | 0 | 48 | appearing |

The trigger was `boundingClientRect.bottom < 0` — the gallery having fully
left the viewport. That is 66px too late: at the moment the bar appeared, the
summary heading was at viewport y=48, i.e. behind the 66px bar. The
reference's screenshot shows that heading clear of the bar, so its bar must
already be up by then.

The trigger now sits on the bar's own bottom edge: the observer's root is
shrunk by `NAV_HEIGHT` via `rootMargin` and the callback tests
`bottom <= NAV_HEIGHT`, so the bar appears as the gallery slides underneath
it rather than after it has gone. It now fires at roughly scrollY 602 and is
fully opaque by 660.

The exact threshold the reference uses is **not recoverable** — its script
was not part of the saved page (the only large script in the save is a
browser extension's). 66px is an inferred value, chosen because it is the
bar's own height and therefore the one line that guarantees content is never
briefly hidden behind the bar as it fades in. It satisfies the observed
constraint from the reference screenshot; it is not an extracted constant.

A process note: the first attempt at this edit silently did not apply — the
`str.replace` target did not match and the script reported success anyway.
The verification run showed identical numbers, which is what caught it. Edits
of this kind now assert the match before writing.

---

## 31. Phase 10f — Photo Tour category subtitles

Each Photo Tour section on the reference carries a middle-dot list of the
room's amenities under its heading; this project was showing a photo count
instead. The lists are in the saved markup as `._hvJgUS`, and were taken
verbatim onto `PhotoCategoryMeta.features`:

| Category | Subtitle |
| --- | --- |
| Living room 1 | Sofa, Air conditioning, Ceiling fan, TV |
| Living room 2 | Ceiling fan, Hot tub |
| Full kitchen | 11 items, Freezer through Crockery and cutlery |
| Bedroom | 14 items, Double bed through Wifi |
| Full bathroom | Hairdryer, Hot water, Shampoo, Shower gel |
| Gym | Air conditioning, Gym, Exercise equipment, Ceiling fan |
| Pool | Pool |

Exterior and Additional photos are deliberately absent — the reference emits
no subtitle element for those two at all, so `features` is optional and the
paragraph is skipped rather than rendered empty. Verified by reading the
heading/subtitle pairs from both pages: all nine categories agree, including
the two with none.

---

## 32. Phase 10g — Photo Tour row layout is data, not a rule

The Photo Tour laid photos out by alternating one full-width row with a
2-up row. Reading the reference's actual rows — counting `._GXrMIo` buttons
inside each `._wdcjGJ`, and whether the row carries `._DLVRjk` — showed that
rule is right for seven of the nine categories and wrong for two:

| Category | n | Reference | Alternating rule |
| --- | --- | --- | --- |
| Full kitchen | 2 | `2-up` | `full, full` |
| Gym | 5 | `full, 2-up, 2-up` | `full, 2-up, full, single` |

Full kitchen opens with a pair rather than a full-width photo, and Gym closes
on two pairs rather than leaving a lone photo stranded in a half-width slot.
No single rule explains all nine — the two exceptions look like editorial
choices about what a category's photos suit.

So the layout is stored rather than derived: `PhotoCategoryMeta.rowPattern`
holds each category's row sizes exactly as the reference lays them out, and
`PhotoGrid` slices the photos to it. A dev-time check asserts every pattern
sums to that category's `expectedCount`, so the two can never drift apart —
the same guarantee `expectedCount` already gives the manifest.

Verified across all nine categories: row structure and tile widths match the
reference exactly (458px full-width, 223px paired).

