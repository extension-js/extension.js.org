# Documentation Iteration Playbook

This file captures how we are updating docs page-by-page in this project, so the same process can be reused for future iterations.

## Scope covered so far

- `docs/en/docs/welcome.mdx`
- `docs/en/docs/getting-started/immediately.mdx`
- `docs/en/docs/features/cross-browser-compatibility.mdx`
- `docs/en/docs/features/browser-specific-fields.mdx`
- `docs/en/docs/features/special-folders.mdx`
- `docs/en/docs/features/environment-variables.mdx`
- `docs/en/docs/features/extension-configuration.mdx`
- `docs/en/docs/features/rspack-configuration.mdx`
- `docs/en/docs/features/reload-and-hmr.mdx`
- `docs/en/docs/features/path-resolution.mdx`
- `docs/en/docs/features/multi-platform-builds.mdx`
- `docs/en/docs/browsers/browsers-available.mdx`
- `docs/en/docs/browsers/browser-preferences.mdx`
- `docs/en/docs/browsers/browser-flags.mdx`
- `docs/en/docs/browsers/browser-profile.mdx`
- `docs/en/docs/browsers/running-other-browsers.mdx`
- `docs/en/docs/languages-and-frameworks/typescript.mdx`
- `docs/en/docs/languages-and-frameworks/ecmascript-modules.mdx`
- `docs/en/docs/languages-and-frameworks/react.mdx`
- `docs/en/docs/languages-and-frameworks/preact.mdx`
- `docs/en/docs/languages-and-frameworks/vue.mdx`
- `docs/en/docs/languages-and-frameworks/css-modules.mdx`
- `docs/en/docs/languages-and-frameworks/less.mdx`
- `docs/en/docs/languages-and-frameworks/sass.mdx`
- `docs/en/docs/languages-and-frameworks/node.mdx`
- `docs/en/docs/integrations/babel.mdx`
- `docs/en/docs/integrations/eslint.mdx`
- `docs/en/docs/integrations/postcss.mdx`
- `docs/en/docs/integrations/prettier.mdx`
- `docs/en/docs/integrations/stylelint.mdx`
- `docs/en/docs/integrations/tailwindcss.mdx`
- `docs/en/docs/integrations/shadcnui.mdx`
- `docs/en/docs/workflows/dev-update-behavior.mdx`
- `docs/en/docs/workflows/troubleshooting.mdx`
- `docs/en/docs/workflows/security-checklist.mdx`
- `docs/en/docs/workflows/performance-playbook.mdx`
- `docs/en/docs/implementation-guide/manifest-json.mdx`
- `docs/en/docs/implementation-guide/html.mdx`
- `docs/en/docs/implementation-guide/css.mdx`
- `docs/en/docs/implementation-guide/javascript.mdx`
- `docs/en/docs/implementation-guide/background.mdx`
- `docs/en/docs/implementation-guide/content-scripts.mdx`
- `docs/en/docs/implementation-guide/locales.mdx`
- `docs/en/docs/implementation-guide/json.mdx`
- `docs/en/docs/implementation-guide/icons.mdx`
- `docs/en/docs/implementation-guide/web-accessible-resources.mdx`
- `docs/en/docs/workflows/global-flags.mdx`
- `docs/en/docs/workflows/playwright-e2e.mdx`
- `docs/en/docs/workflows/ci-templates.mdx`
- `docs/en/docs/commands/create.mdx`
- `docs/en/docs/commands/dev.mdx`
- `docs/en/docs/commands/start.mdx`
- `docs/en/docs/commands/preview.mdx`
- `docs/en/docs/commands/build.mdx`
- `docs/en/docs/getting-started/create-your-first-extension.mdx`
- `docs/en/docs/getting-started/templates.mdx`
- `docs/en/docs/languages-and-frameworks/webassembly.mdx`

## Editing goals

- Keep a developer-first voice (Apple developer-product style, not marketing-heavy).
- Write for "vibe coders": clear, direct, concrete examples, less jargon.
- Assume readers may know web development but be new to extension development.
- Explain value through real needs and outcomes in varied phrasing.
- Preserve technical accuracy while simplifying phrasing.

## Audience guidance (vibe coders)

- Prefer "need-first" examples over API-first explanations.
- Avoid leading with API names or internals when introducing a concept.
- Main page description should answer: "Why would I use this page?"
- Explain the problem first, then show the mechanism:
  - Good: "Need to inject a script into a page at runtime?"
  - Then: "Use `scripting.executeScript`..."
- Keep extension-specific terms lightweight and contextual.
- Avoid repetitive opening patterns in top descriptions (for example, do not always start with "Imagine...").

### Top description style (vibe-coder friendly)

Use 1-2 sentences that quickly explain what the page solves and when it helps.

Recommended opening patterns (rotate them):

- "Keep ... while ..."
- "Control ... for ..."
- "Build ... with ..."
- "Manage ... across ..."
- "Solve ... without ..."
- "Run ... across ..."

## Non-negotiable rules

1. **Use MDX-safe comments only.**

   - Use `{/* ... */}` comments.
   - Do not use HTML comments like `<!-- ... -->` in MDX files.

2. **Use a standard video placeholder pattern.**

   - Add a marker comment:
     - `{/* VIDEO_PLACEHOLDER: <what the video should show> */}`
   - Add a placeholder image directly under it:
     - `![Video placeholder: <short label>](https://placehold.co/960x540?text=Video+placeholder)`

3. **When relevant, replace existing visual/video blocks with placeholders.**

   - Override any existing demo video/image block in that section with the standard placeholder block.
   - Keep one visual source per section to avoid duplication.

4. **If placeholder replaces legacy visual content, remove the old block.**

   - Keep one visual source per section to avoid duplication and confusion.

5. **Keep commands and behavior unchanged unless explicitly requested.**
   - Copy edits should not alter product semantics.

## Per-page workflow

1. Read the target `.mdx` page.
2. Rewrite top description for clarity and user benefit.
3. Simplify dense sections (especially "How it works").
4. Keep/normalize terminology and capitalization.
5. Add `VIDEO_PLACEHOLDER` blocks at workflow-heavy moments.
6. Replace existing demo visuals/videos with placeholder blocks where relevant.
7. Run lint/diagnostic checks on edited files.
8. Verify MDX renders (no parser errors).

## Languages/Frameworks page pattern

For pages under `docs/en/docs/languages-and-frameworks/`:

1. Keep an imperative top description that explains the problem solved.
2. Add `## Template examples` near the top.
3. Include 1-2 template examples (except `webassembly`).
4. For each template example include:
   - Screenshot image
   - `create --template=<slug>` command (`PackageManagerTabs`)
   - Repository link to `https://github.com/extension-js/examples/tree/main/examples/<slug>`
5. Use `templates-meta.json` from `extension-js/examples` as the source of truth for slug/screenshot metadata.
6. If older template names drift from metadata, update docs to the metadata-backed slug.
7. `webassembly` is the exception: no template-example block required.

## Integrations page pattern

For pages under `docs/en/docs/integrations/`:

1. Keep an imperative top description that explains when this tool is useful.
2. Add a capabilities table (`## <Tool> capabilities`) near the top.
3. Include concrete examples:
   - Template example block when a metadata-backed template exists (screenshot + command + repo link).
   - Existing-project setup example when no dedicated template exists.
4. Add at least one `VIDEO_PLACEHOLDER` block for a workflow-heavy step.
5. Keep command examples actionable and copy-paste friendly.
6. Use `templates-meta.json` from `extension-js/examples` as source of truth for template slugs/screenshots.

## Workflows page pattern

For pages under `docs/en/docs/workflows/`:

1. Keep an imperative top description focused on unblocking developers quickly.
2. Add a capabilities table near the top (`## <Topic> capabilities`).
3. Include a fast triage/optimization/review flow when relevant.
4. Add at least one `VIDEO_PLACEHOLDER` block for realistic troubleshooting or operational workflow.
5. Keep checklists practical and ordered by impact.

## Implementation Guide page pattern

For pages under `docs/en/docs/implementation-guide/`:

1. Keep an imperative top description anchored in extension developer needs.
2. Add a capabilities table near the top (`## <Topic> capabilities`).
3. Preserve concrete manifest/config/code examples.
4. Add at least one `VIDEO_PLACEHOLDER` block showing compile/runtime behavior.
5. Keep links explicit between implementation pages and workflows pages.

## Testing workflow page pattern

For testing-focused pages under `docs/en/docs/workflows/`:

1. Keep an imperative top description focused on release confidence.
2. Add a capabilities table near the top (`## <Topic> capabilities`).
3. Keep setup examples practical and CI-oriented.
4. Add at least one `VIDEO_PLACEHOLDER` block for real test/CI workflow.
5. Include common pitfalls to reduce flaky or low-signal test pipelines.

## Commands Reference page pattern

For pages under `docs/en/docs/commands/`:

1. Keep an imperative top description focused on when to use the command.
2. Add a capabilities table near the top (`## <Command> capabilities`).
3. Keep usage/options tables explicit and copy-paste friendly.
4. Add `VIDEO_PLACEHOLDER` blocks for practical execution workflows.
5. Prefer explicit browser target examples (for example comma-separated targets) over `--browser=all`.

## Getting Started page pattern

For pages under `docs/en/docs/getting-started/`:

1. Keep an imperative top description focused on first successful outcome.
2. Add a capabilities table near the top when the page has a workflow/tutorial shape.
3. Keep step-by-step flow practical and copy-paste friendly.
4. Add `VIDEO_PLACEHOLDER` blocks around key milestones.
5. Preserve existing Loom embeds unless explicitly requested to remove.

## Copy style checklist

- Prefer short sentences.
- Lead with user outcomes, then implementation details.
- Use concrete phrasing:
  - "Keep ..."
  - "If you need to..."
  - "This gives you..."
- Avoid meta references in top descriptions (do not use "this page", "in this page", "here you will").
- Rotate phrasing to avoid repeating the same opening style across pages.
- Avoid unnecessary deep internals unless required for action.
- Keep section and bullet naming consistent across pages.

## Reusable snippet

```mdx
{/* VIDEO_PLACEHOLDER: Show <specific workflow outcome> */}
![Video placeholder: <workflow label>](https://placehold.co/960x540?text=Video+placeholder)
```

## Notes for next iterations

- Apply this same process to remaining sidebar sections in order.
- Prioritize clarity for new extension developers.
- Keep this document updated as new rules are introduced.
