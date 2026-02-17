# Homepage Update Handoff (AI-Executable)

Use this brief to update the homepage for `extension.js.org`.

## Core objective

Update homepage messaging and content hierarchy to reflect Extension.js capabilities for:

- AI-assisted/vibe coders
- seasoned web developers new to browser extensions
- production extension teams

## Critical constraint

**Preserve existing UI structure as much as possible.**

Do not redesign layout primitives. Keep the current section skeleton and reuse existing component blocks/classes in:

- `theme/components-home/Landingpage/index.tsx`

Allowed:

- content rewrites
- reordering blocks **within** existing section flow
- replacing array data used to render cards
- updating labels/headings/CTA text
- adding one new lightweight content block between existing sections

Not allowed:

- replacing page with a different layout system
- removing current visual style patterns
- introducing a new design framework
- large structural refactors that break current section ids/anchors unless necessary

## Required updates

### 1) Hero section

Keep existing hero structure; update copy to clearly position Extension.js:

- H1: modern browser extension development
- subhead: one codebase and command surface across Chrome/Edge/Firefox
- CTAs:
  - docs entry
  - first extension tutorial
  - GitHub

### 2) Social proof + video block (between hero and next section)

Insert a testimonial/social proof block **between hero and section 2**, then a video preview below it.

Reference link:

- <https://x.com/rauchg/status/1785325069658648996>

If exact quote text is unavailable, keep safe attribution language and link.

### 3) Template gallery section

Convert the next card grid section to a focused **Template gallery** with exactly six items:

- React
- TypeScript
- Preact
- JavaScript
- Vue
- Svelte

Each item should include a one-line "when to use it" style description.

### 4) Remove old section-6 style block

Do not include the previously proposed extra "ship safely" block. Keep homepage concise.

### 5) Keep remaining structure

Retain:

- path/persona guidance section
- FAQ section
- final CTA/open source section

Update headings/labels to match new semantics:

- nav label "Features" -> "Templates"
- nav label "Users" -> "Paths"

## Content guidance

- Keep tone outcome-first, concise, practical.
- Avoid generic template boilerplate language.
- Keep "Extension.js" capitalization consistent.
- Prefer short active sentences.

## SEO calibration (homepage)

- primary intent: "build browser extensions"
- secondary intents:
  - cross-browser extension workflow
  - extension CLI
  - React/Vue/TypeScript extension development

Suggested metadata direction:

- title style: `Extension.js — Build Cross-Browser Extensions with Modern Web Tooling`  
- description style: modern framework/CLI + Chrome/Edge/Firefox + TS/React/Vue + release workflows

## File to edit

- `theme/components-home/Landingpage/index.tsx`

Optional related file (only if metadata updates are requested):

- `rspress.config.ts`

## Acceptance criteria

- homepage reflects Extension.js-specific value prop (not generic starter language)
- testimonial + video appear between hero and template gallery
- template gallery contains exactly 6 requested stacks
- no additional section-6 block added
- UI structure remains substantially unchanged
- build succeeds (`pnpm build`)
- lint/diagnostics clean for touched files

## Implementation notes

- Prefer editing existing arrays/labels and section headings over adding new abstractions.
- Keep IDs/anchors stable where practical (`#features`, `#testimonials`, `#faq`) to avoid nav regressions.
- If renaming section meaning, update corresponding nav labels while keeping anchor behavior.
