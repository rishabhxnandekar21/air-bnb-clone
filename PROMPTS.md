# Prompt log

The prompts given to the coding agent while working on this repository, in
order, with what came back and anything worth remembering.

**Scope, stated plainly.** This log covers a remediation and documentation
pass over an existing codebase — originality cleanup, a brand mark and icon
set redrawn from scratch, repository hygiene, and the architecture diagram.
It is **not** a log of the original build. That was done in a separate
session whose prompt history is not available here, and nothing in this file
has been reconstructed, inferred or back-filled to cover that gap. Where a
prompt produced a wrong turn or a correction, the wrong turn is left in.

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

## Prompt 02 — The prompt log belongs to a different build

**Prompt**

*(A `PROMPTS.md` was supplied.)* These were the prompts I used to make this
assignment.

**Result**

It does not describe this codebase, and saying so was the useful answer.

The supplied log names `SiteHeader`, `StayLayout`, `usePhotoTour`, a shared
`Modal` primitive and a `scripts/` QA harness. None exist here. It records
brand red as `#EB4C60`, measured; this codebase uses `#ff385c`. Its prompt 10
explicitly *declines* to take the font and logo from Airbnb; this codebase had
taken both.

A search of the machine found the build it does describe — a separate project
directory carrying `.claude/agents/`, `.claude/skills/`, `docs/architecture.*`
and the QA scripts, matching the log component for component.

**Notes**

This is the entry worth keeping. Two builds of the same assignment existed
side by side, and the more complete one was not the one under review. Copying
its prompt log across would have produced a record of work that never happened
on this code — the one deliverable the assignment says may be walked through
at submission. It was left alone.

---

## Prompt 03 — Replace the lifted artwork and the porting language

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

## Prompt 04 — Publish to GitHub

**Prompt**

I want to push this code to my GitHub repo — `air-bnb-clone`.

**Result**

Two blockers surfaced before anything was pushed, and both were put back to
the owner rather than decided unilaterally:

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

## Prompt 05 — Correct the README, then remove what it could not support

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
that introduced the bad link, so the old URL survived in history on a public
repository. Caught later (prompt 06), not here.

---

## Prompt 06 — Remove the previous owner's handle everywhere

**Prompt**

Check if there's anything else in this repo, and replace the old account
reference anywhere you find it.

**Result**

Searched tracked files, all branches, every commit, and untracked/ignored
files. No name, no email address, no author metadata, no `package.json`
attribution — the only reference anywhere was the account handle inside that
one README URL.

It did still survive in **git history**, at the first commit. The three
commits were squashed into one so the final tree is byte-identical but the
handle appears nowhere in `main`'s history, and force-pushed.

**Notes**

Stated rather than glossed: squashing removes the commit from the branch, not
from GitHub. The orphaned SHA still resolves over the API until GitHub
garbage-collects it, which is not something the repository owner controls.
Claiming the history was "wiped" would have been wrong, so the limitation was
reported with the fix.

---

## Prompt 07 — Architecture diagram

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
