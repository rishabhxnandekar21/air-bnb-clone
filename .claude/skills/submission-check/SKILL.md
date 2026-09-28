---
name: submission-check
description: Run the full pre-packaging check over this project — build and lint, the four URL states in a browser, the keyboard and focus chain, an originality sweep, and the assignment's named deliverables. Use before zipping a submission, before a release commit, or when asked whether the project is ready, complete, or missing anything.
---

# Submission check

Everything below is verified by running it. Nothing is assumed, and nothing is
reported as passing that was not observed.

Work through the five gates in order. A gate that fails stops the check —
report it and what it blocks rather than pressing on to produce a long report
about a build that does not compile.

## Gate 1 — it builds

```bash
npm run build     # tsc -b, then vite build
npm run lint      # oxlint
```

Both must exit 0. Report the actual exit codes.

There is no test suite here. Say that plainly rather than implying coverage
that does not exist — a clean build is the only automated signal this project
has.

## Gate 2 — the four states render

```bash
npm run dev
```

| State | URL |
|---|---|
| Listing | `/` |
| Photo Tour | `/?modal=PHOTO_TOUR_SCROLLABLE` |
| Lightbox | `/?modal=PHOTO_TOUR_SCROLLABLE&modalItem=1000` |
| Amenities | `/?modal=AMENITIES` |

For each: zero console errors, zero broken images, no horizontal overflow.
In the amenities dialog, all 44 rows across 12 groups render a glyph and none
is blank. On the listing, all 10 preview amenities have icons.

Check a malformed URL too — `?modal=AMENITIES&modalItem=99999` must resolve to
no lightbox rather than throwing.

## Gate 3 — the keyboard chain

Trace it; do not infer it from the source. The nine steps are in
`.claude/agents/a11y-auditor.md`, and the short version is: focus moves into
each overlay, is trapped there, `←`/`→` work in the Lightbox without a focused
button, Escape unwinds exactly one layer at a time, focus returns to the exact
element that opened each overlay, scroll position survives, and browser Back
closes an overlay.

Two defects previously lived here and are fixed: the Photo Tour had no focus
management, and Escape closed both overlays at once. Both are the most likely
regressions — verify them specifically rather than assuming.

## Gate 4 — originality

The assignment penalises lifting the reference's codebase and runs plagiarism
detection.

```bash
grep -rniE '\bported\b|\bextracted from\b|\bverbatim\b|reference\.html|saved (copy|markup)' src/ *.md
grep -rniE '\-\-(ink|rausch|muted2|grey100|line-soft)\b' src/
find src -name '*.ts' -o -name '*.tsx' -o -name '*.css' | xargs awk 'length > 500 {print FILENAME":"FNR}'
```

All three should come back empty. A long line in `src/data/property.ts` is
listing copy, not code — that one is fine.

Also confirm: no Cereal font vendored under `public/assets/fonts/`, no
reproduced Airbnb logotype, and no file byte-identical to another project's
deliverable. Colour values and listing content are **not** findings.

## Gate 5 — the deliverables

The assignment names these. Check each exists and is this project's own:

| Deliverable | Where |
|---|---|
| Three views | `src/components/{listing,photo-tour,lightbox}/` |
| Architecture diagram | `docs/architecture.{svg,png}` |
| Sub-agent configs | `.claude/agents/` |
| Skill configs | `.claude/skills/` |
| Prompt log | `PROMPTS.md` |
| Project rules | `CLAUDE.md` |

For the diagram and the agent configs, confirm they describe **this** project:
the diagram in this project's brand colour, and the agents referencing npm
scripts that exist here. A config calling `qa:local` is pointing at tooling
this repo does not have.

## What to report

A five-line verdict, one per gate, each pass or fail with the evidence.
Then the failures in detail, most severe first.

Two things that are outside these gates and must not be silently omitted if
they are still true: the repository is public, which the assignment's
submission note rules out, and the raster icons under `public/images/` are
still the reference's artwork rather than drawn here. Name them as known and
accepted, or name them as open — but name them.
