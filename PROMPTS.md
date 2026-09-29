# Prompt log

The prompts I gave while working on this codebase, in order, with what came
back and anything worth remembering.

**What this covers.** This is the log for a remediation and hardening pass
over an existing build of the app: replacing traced artwork with drawings of
my own, fixing two focus defects, writing the project rules and agent
configs, producing the architecture diagram, and clearing dead assets. The
earlier build was done in a previous session and its prompts are not
reproduced here — nothing in this file has been reconstructed or back-filled
to cover that gap. Where a prompt produced a wrong turn, the wrong turn is
left in; those are the entries worth reading.

---

## Prompt 01 — Audit the codebase against the assignment


**Prompt**

Read the assignment PDF and go through this folder properly. Pull out what the
assignment actually asks for and check whether what's here matches it. Flag
anything that looks like it came from the reference codebase — there's a
plagiarism check and a rule against lift-and-shift. Confirm the tech stack and
list the differences.

**Result**

Requirements extracted from the PDF: three views (listing, photo tour,
lightbox), desktop only, plus an architecture diagram, sub-agent/skill config
files and the prompt sequence as named deliverables. Backend explicitly
optional.

Build verified: `npm ci`, `tsc -b` and `oxlint` all exit 0. All three views
present. Accessibility partly in place — skip link, `aria-modal`,
`prefers-reduced-motion` in five files, 30 `aria-label`s.

Findings that mattered:

- **The design tokens carried the reference's own variable names** as
  comments — `--ink`, `--rausch`, `--muted2`, `--grey100`, `--line`. Naming is
  not a design value; that is copied source.
- **`AirbnbLogo.tsx` held a single 3,975-character path**, and
  `amenityIconPaths.ts` held ~19 KB of path data, both taken out of the
  reference's markup.
- **Fifteen source comments said so outright** — "ported", "extracted from",
  "verbatim".
- `DECISIONS.md` contains a section titled *"reference recovered from a saved
  copy, design system ported"*, while decision 5 of the same document claims a
  clean-room build. The file contradicts itself on exactly the point under
  scrutiny.
- Three required deliverables absent: architecture diagram, `.claude/` agent
  and skill configs, prompt log.
- The repository the README pointed at was **public**, against an explicit
  instruction in the PDF.

**Notes**

One premise in the prompt was wrong and is recorded rather than quietly
worked around: the assignment does **not** require a Node backend. It says
"Backend is optional. You may also choose to store data in frontend/browser
storage". A React SPA with content in a typed module is compliant, so no
backend was added.

The live reference could not be inspected — it sits behind Vercel's bot
checkpoint and returns an interstitial to automated browsers. No attempt was
made to defeat that. The audit was done from the code and the assignment
document instead, and that limitation was stated rather than papered over.

---

## Prompt 02 — Replace the lifted artwork and the porting language


**Prompt**

Fix these three: the "ported/extracted/verbatim" language in source, the
lifted Airbnb logo path, and the lifted SVG icon data.

**Result**

**Icons.** `src/data/amenityIconPaths.ts` went from 24,370 bytes of extracted
path data to 8,947 bytes of original line icons — 24 grid, ~1.5px stroke,
rounded caps, colour from `currentColor`. Restructured into `SHAPES` (one
entry per distinct drawing) plus `AMENITY_SHAPE` (43 amenity ids onto a
shape), which de-duplicates the six amenities that legitimately share a
pictogram — fridge/freezer, kitchen/cooking-basics, the two entrance rows.
`AmenityIcon` was rewritten to render stroked multi-path SVG.

**Logo.** `AirbnbLogo.tsx` dropped from a 3,975-character extracted path to a
223-character original mark: two stroked paths, rounded outline closing to a
point with an open inner counter. The wordmark is now set as type in the
header behind a new `--font-weight-wordmark` token. `public/favicon.svg` reuses
the mark.

**Language.** Fifteen comments rewritten. In `tokens.css` the reference's own
variable names were deleted outright — that was the copied artifact. The
colour values stayed, because the assignment requires identical colours and
`#ff385c` cannot be plagiarism.

Verified: `tsc -b`, `oxlint` and `vite build` all exit 0. Driving the page —
44/44 amenity rows render an icon with no blanks across all twelve groups,
10/10 in the preview, zero broken images, zero console errors, no horizontal
overflow. Strict scan for the porting vocabulary across `src/`: 15 hits → 0.

**Notes**

The distinction that governed the whole pass: deleting words like "ported"
while leaving ported code would be concealment, not a fix. So the substance
was replaced first and the comments were rewritten to describe what each rule
does. No comment was changed to claim a measurement that could not be
verified — "ported from the reference" was not swapped for "measured from the
reference", because the second would assert a methodology this codebase's own
`DECISIONS.md` contradicts.

A type error surfaced during the icon work and was worth keeping rather than
casting away: `noUncheckedIndexedAccess` rejected the shape lookup. Deriving
`ShapeName = keyof typeof SHAPES` fixed it and now makes a typo in the mapping
a compile error instead of a silently blank icon slot.

The two heredocs that wrote the icon file were truncated by a command-length
limit, producing a file cut off mid-entry. Caught by checking the line count
against what was sent, not by assuming the write succeeded.

---

## Prompt 03 — Publish to GitHub


**Prompt**

I want to push this code to my GitHub repo — `air-bnb-clone`.

**Result**

Two blockers surfaced before anything was pushed, and both needed a decision
rather than an assumption:

1. The target repository was **not empty**. It held a different Airbnb clone
   with its own commit history from August. A push would have destroyed it.
2. It was **public**, which the assignment PDF explicitly rules out.

Both were confirmed as deliberate. The old `main` was first pushed to
`backup-main-aug2026` so the overwrite stayed reversible, then this codebase
was committed and force-pushed. 284 files, 16 MB. `node_modules`, `dist` and
the saved `reference/` copy stayed out — the last of those matters most, since
it is a verbatim copy of the reference site.

**Notes**

Git Credential Manager handled authentication, so no credential was ever
handled directly.

The backup branch was not asked for. It was pushed anyway because the
alternative was an irreversible overwrite of someone's work on a one-word
instruction, and a branch costs nothing and deletes in one command.

---

## Prompt 04 — Correct the README, then remove what it could not support


**Prompt**

*(three prompts, taken together)* Update the source link. Then: drop the
`PROMPT_LOG.md` sentence, and remove the live link for now, we'll add it later.

**Result**

The `Source:` link pointed at the repository this build previously lived in.
Repointed.

Two further claims could not be supported and were removed rather than
reworded. The README promised a `PROMPT_LOG.md` that did not exist. The
`Live:` link resolved to a deployment wired to the *old* repository — it
returned 200, but served the pre-cleanup build, complete with the extracted
logo and the font 404. A working link to the wrong artifact is worse than no
link.

**Notes**

Worth recording as a miss: the first fix was committed *on top of* the commit
that introduced the bad link, so the stale URL survived in the earlier commit
even though the working tree was correct. Fixing a file is not the same as
fixing the history that ships with it, and I did not notice at the time.

---

## Prompt 05 — Architecture diagram


**Prompt**

Draw an architecture diagram for this project.

**Result**

`docs/architecture.svg`, `.html` and `.png` — a production architecture for a
vacation-rental marketplace, covering the five areas the assignment names:
frontend, backend, storage, search and deployment.

Six bands — clients, edge, services, storage & search, async backbone,
deployment — with **three traffic paths traced through them in colour**,
because the organising idea is that they scale differently: browse is
read-heavy and cacheable, book is a low-volume strongly-consistent write, and
publish is async fan-out that rebuilds search off the event stream. A margin
column carries the reasoning per band, a panel lists the scaling levers
cheapest-first, and the footer states what this submission actually
implements — the Web SPA box, and nothing else.

Generated from a script rather than hand-placed, so bands, nodes and the
annotation column stay aligned when content changes.

**Notes**

The first render came out entirely black. The SVG had been written with a
`<style>` block and CSS classes, and the rasteriser ignored it — as GitHub's
renderer and most Office importers also do, which would have made the
committed diagram useless in exactly the places it needs to work. Rewritten
with inline presentation attributes on every element. This is the reason the
generator exists in the form it does, and it is noted at the top of the
script.

Second pass fixed two band labels (`STORAGE & SEARCH`, `DEPLOYMENT & OPS`)
that overran the label column and collided with the first node in their row —
found by looking at the render, not by reading the coordinates.

---

## Prompt 06 — Check the project against the assignment PDF


**Prompt**

Read the assignment PDF again and check whether this project contains
everything it asks for.

**Result**

Most of it did. Three views present, desktop only, React, motion and
`prefers-reduced-motion` in place, build and lint clean.

Three deliverables had appeared since the previous pass, and none of the six
files described this repository: the three `.claude/agents/*.md`, the
`visual-qa` skill, and `docs/architecture.{png,svg,html}`, which had
overwritten the diagram generated here.

Worse than duplication, two of them did not work in this repository. The
agents invoke `npm run qa:local`, `qa:diff`, `qa:sections` and `qa:widths`;
this project's `package.json` has `dev`, `build`, `lint` and `preview`, and
there is no `scripts/` directory. The skill points at `scripts/states.mjs`,
which does not exist, and asserts a reference height of 6258px and a brand
red of `#EB4C60` — this project renders `#ff385c`, so `code-reviewer` would
have flagged the correct colour as wrong.

**Notes**

Copied configs are worse than missing ones. A missing config is a gap; a
config that names commands the project does not have is a claim that fails
the moment anyone runs it.

---

## Prompt 07 — Make it genuinely this project's own


**Prompt**

Apart from the repo being public, improve everything so it doesn't look like
exact copies. Tweak the agents and skills, create the missing files, and
generate a new high-level diagram.

**Result**

Adapted rather than disguised — the configs are different because they now
describe this repository, which is also what makes them work.

- **`CLAUDE.md`** written from scratch: token discipline, content-as-data,
  URL-driven modal state, originality, accessibility, scope. The rules the
  agents enforce now exist in the repo they enforce them in.
- **Four agents**, rewritten against real tooling. `visual-qa` measures the
  DOM against recorded values because there is no capture harness and adding
  one is out of scope. `a11y-auditor` traces a nine-step chain over this
  project's own overlays. `code-reviewer` enforces `CLAUDE.md`. A fourth,
  **`originality-auditor`**, is new and specific to this codebase's history —
  it distinguishes copied *source* from the colour values and listing content
  the assignment actually requires.
- **Two skills**: `visual-qa` rewritten for DOM measurement, and a new
  `submission-check` that runs five gates before packaging.
- **The diagram regenerated** in this project's `#ff385c`, with a footer line
  describing how `src/data/` stands in for the listing service.

**Two real defects found and fixed.** The a11y audit was run rather than
assumed, and it surfaced more than the known Tab-trap gap:

1. The Photo Tour had **no focus management at all**.
2. **Escape unwound two layers at once.** Both overlays listened on `window`
   and both called `goBack()`. Driving it: `?modal=PHOTO_TOUR_SCROLLABLE&modalItem=1000`
   went straight to `/` on a single Escape.

Both fixed by one hook, `useOverlayFocus`, with an `isTopmost` flag so a
covered overlay stops owning the keyboard. Verified by driving: 40 Tab
presses stay inside each of the three overlays; Escape closes only the
Lightbox and returns focus to the exact tile that opened it; a second Escape
closes the tour and restores scroll; arrows still move 1005 → 1006 → 1005.

Also: the dangling `@font-face` for a font this project does not ship was
removed — it cost a failed request on every page load and rendered nothing.
`DECISIONS.md` rewritten 842 → 194 lines and `REFERENCE_SPEC.md` 230 → 122,
both now describing the code as it is, with the porting vocabulary and the
self-contradiction gone.

**Notes**

The first Escape test was invalid and is recorded because the failure mode is
easy to repeat: deep-linking to `?modal=...&modalItem=...` leaves no history
for `goBack()` to pop, so nothing happened and it looked like a pass. The
defect only appeared once the overlays were opened through the UI. A second
attempt was also invalid — the click landed on a category-nav button rather
than a photo, so the Lightbox never opened and the test silently measured the
wrong thing. Both are why the a11y agent says to trace every step and
distrust an assertion that passes without evidence.

---

## Prompt 08 — Check for missing files


**Prompt**

Check if any files are missing or not.

**Result**

None were. All 43 manifest photos present, every import resolving, every CSS
module paired with a component, both barrel files live, all markdown
references resolving.

One stale claim was found and fixed, and it was self-inflicted: `README.md`
still said dropping the font file into `public/assets/fonts/` "closes it with
no code change" and pointed at a README in that folder. Removing the
`@font-face` in the previous pass had made both false — with no declaration,
dropping the file in would do nothing, and the folder was gone.

The real finding was the inverse of the question: **60 of 149 images ship
unreferenced** — the entire 33-file `amenities/` photo set (2.1 MB, nothing
points at it since the rows render inline SVG), 15 unused icons, and 12 files
in `listing/` that are byte-identical duplicates of files in `ui/`.

**Notes**

The first orphan count was wrong and is worth recording. A naive grep for
literal `/images/...` paths reported 103 orphans including all of `listing/`,
which would have meant the page had no photos at all — obviously false. The
manifest stores bare filenames against an `ASSET_BASE` constant, so none of
the 43 matched a literal path search. A count that implies the app cannot
work is a broken measurement, not a finding.

---

## Prompt 09 — Drift the logo and the font


**Prompt**

The reference link is the source of truth and must be followed, but the logo
and font should not be exactly the same — there should be some drift.

**Result**

Both were closer to the reference than intended.

**The mark.** It was already an original drawing, but in the reference's own
construction — a rounded outline closing to a point with a looping inner
counter. Original in execution, a near-variant of a trademark in form.
Replaced with a different figure entirely: an arch over a doorway on a shared
baseline, three open strokes on a 32 grid. Same slot, same optical weight, so
the header still measures 89px and nothing else moved. `AirbnbLogo.tsx` is
renamed `BrandMark.tsx`, since it is no longer standing in for a logo.

**The type.** `--font-family-base` had led with the reference's proprietary
family, with DM Sans much further down as the practical fallback. The stated
reason was that a licensed installation would then be picked up — which also
meant the page rendered *identically to the reference* on any machine with
the font installed. The stack now leads with DM Sans and names no proprietary
family at all, so the type is the same everywhere and deliberately not the
reference's.

Verified: mark 32x32 across three paths, header still 89px, computed
`font-family` resolves to DM Sans on every element, and no proprietary family
name appears anywhere in the cascade.

**Notes**

The reference was retried at the top of this pass and is still behind its bot
checkpoint — "This page could not be verified. Please open it in a standard
web browser." No attempt was made to work around it.

Worth being precise about what changed, because "make it original" and "make
it different" are not the same instruction. The mark was already original
work; the problem was that it was original work shaped like someone else's
trademark. Drift is a design decision, not a licensing one, and both are now
recorded as deliberate so a later pass does not helpfully close the gap.
