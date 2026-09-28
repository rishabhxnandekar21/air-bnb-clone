---
name: visual-qa
description: Verify this listing page's rendered geometry, typography and colour by driving the running app and measuring the DOM. Use when asked to check fidelity, verify a section is done, confirm a layout change, or investigate a spacing, size or colour difference. Covers the four URL-reachable states, what to measure, the deviations that are deliberate, and when to stop.
---

# Visual QA

The goal is **measured parity**, not a page that looks right. Reading a page
side by side reliably misses 4–8px errors; measuring the DOM does not.

## What this project has, and does not

There is no capture harness. No `scripts/`, no Playwright, no pixel diff, and
adding one is out of scope. The whole method is: run the app, drive it, read
the DOM.

```bash
npm run dev      # http://localhost:5173
```

Measure with `getBoundingClientRect()`, `getComputedStyle()` and
`document.fonts`. Read colour from computed style rather than sampling pixels
— there is no colour-managed capture path here, so a sampled pixel can
disagree with correct CSS for reasons that are not bugs.

## The four states

| State | URL |
|---|---|
| Listing | `/` |
| Photo Tour | `/?modal=PHOTO_TOUR_SCROLLABLE` |
| Lightbox | `/?modal=PHOTO_TOUR_SCROLLABLE&modalItem=1000` (valid `1000`–`1042`) |
| Amenities | `/?modal=AMENITIES` |

Modal state lives in the URL, so every state is directly addressable and
browser Back closes a dialog. Use the URL; do not click your way in.

## The reference is unreachable

It sits behind a bot checkpoint and serves an interstitial to anything
automated. **Do not attempt to work around it.** You therefore cannot diff
live, and must not imply that you did.

Measure against, in order:

1. `src/styles/tokens.css` and the per-component `.module.css` comments.
2. Internal consistency — one role rendering two sizes in two places is a
   defect provable without the reference.
3. The geometry recorded in `README.md` from when the reference *was*
   reachable: header 88px; content column 1120px at x=208; main column 652px;
   booking card 372px at x=956; hero 1120×494, primary 560×494, secondaries
   272×243.

If a check genuinely needs the reference, say so and stop. Never invent a
number to close the gap.

## Checklist, ordered by errors found per minute

| Check | What to verify |
|---|---|
| Layout | Content column 1120 at x=208; header gutters 80; main 652 / booking 372 |
| Hero | 1120×494 total; 560 primary; 272×243 secondaries; 8px gaps; 12px radius |
| Spacing | Section rhythm and the rules between sections. Consistent-but-wrong is the usual failure |
| Typography | Size, weight and line-height per role. Compare the same role in two places before blaming the font |
| Colour | Read computed style. `--color-primary` is `#ff385c`; text `#222222`; secondary `#717171`; border `#dddddd` |
| Images | Right photo in the right slot, right aspect. The hero uses manifest slots 6, 3, 4, 12, 28 — not the first five |
| Icons | All 44 amenity rows render a glyph, and it is the right object. Icons are 24-grid line art, stroked, `currentColor` |
| Borders | 1px at DPR 1. A `border-box` mistake shows as a 2px seam |
| Radii | Measure the corner profile. A pill is `height / 2`, not a token radius |
| States | Hover and focus on every interactive element |
| Overflow | No horizontal scroll; nothing clipped |

## Deliberate deviations — do not report these

- **Type runs slightly narrow.** Airbnb Cereal is proprietary and is not
  vendored; DM Sans is narrower at the same size, so long paragraphs wrap a
  line or two later. Documented in `tokens.css`. If a type difference is
  uniform across the whole page, this is the cause.
- **"Show all 50 amenities" against 44 rows**, and **"Show all 19 reviews"
  against 6 texts**. The counts are what the listing states; the data is what
  could be sourced. Inventing rows to reconcile them is a defect, not a fix.
- **Several inert controls** — the reviews "Show all", the map controls,
  "Report this listing". The reference's own do nothing either.

## Traps that have produced false findings

- **Scrollbar gutter.** A classic scrollbar narrows the viewport and
  re-centres the content column; every x shifts 7–8px. Check viewport width
  before trusting an x measurement.
- **Bounding boxes over mixed content.** A box around a region holding two
  elements measures both. A 30px "icon" here was a 19px icon plus the
  adjacent letter.
- **Percentage height in an auto-height parent** resolves to `auto` and the
  box collapses. It reads as a spacing bug and is not one.
- **Inline elements ignore `width` / `aspect-ratio`.** A `<span>` given either
  silently does nothing.

## Fixing

Work top-down — a vertical error near the top inflates every delta below it.
Correct the **token or layout rule**, never the individual element; nudging
one box moves the error somewhere else. Re-measure after each fix before
touching anything else.

## Stop condition

Not "no visible difference" — that is reachable while still several pixels out
everywhere. Stop when the numbers agree, or when the residual is a deliberate
deviation that is already documented. Record any new exception; a named,
justified deviation reads as rigour, an unexplained one reads as a miss.
