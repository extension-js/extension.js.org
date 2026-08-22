# Docs review

Proves two different things about every page on this site:

1. **Truthfulness.** Does the page describe the tool as it actually behaves.
2. **Followability.** Can someone who knows nothing reach the outcome the page promises without leaving the docs.

They need different machinery, so the review runs in three lanes. A page counts as
reviewed only when it has a record in lane A and lane B. Lane C adds depth and cannot
prove coverage on its own, because journeys never traverse every page.

## Lane A, deterministic

Runs on every page, every time, no agents involved. This is the vitest suite in
`__tests__/` plus `scripts/docs-coverage.mjs`:

| Check | Where |
| --- | --- |
| Fenced commands and flags exist in the real CLI | `__tests__/fenced-commands.test.ts` against `__tests__/fixtures/cli-flags.json` |
| Command pages match the CLI source | `__tests__/cli-flags.test.ts` |
| Internal links resolve | `__tests__/internal-links.test.ts` |
| Template references exist in the examples repo | `__tests__/template-references.test.ts` |
| Supported browsers, package managers, frameworks | `__tests__/supported-surface.test.ts` |
| Known limitations still documented | `docs-review/caveats.json` via `__tests__/docs-coverage.test.ts` |
| Every page carries a review record | `__tests__/docs-coverage.test.ts` |
| Locale twins, stale version pins | `scripts/docs-coverage.mjs` |

Regenerate the ledger:

```bash
node scripts/docs-coverage.mjs --latest=$(npm view extension version)
node scripts/docs-coverage.mjs --assert   # non-zero exit when a page is unreviewed
```

### The caveat ledger

`caveats.json` is the inverted truthfulness check. A page can contain no false sentence
and still mislead by omitting a limitation the tool really has. Each entry names the page
that must carry the limitation, patterns that satisfy it, and **`verifiedBy`**: how we know
the limitation is real. Never add an entry from memory. Cite a source file, a command
output, or an observed build.

## Lane B, per-page truth audit

An agent reviewer with **reality access**. It reads a page, lists the concrete claims, and
verifies them by running the published CLI, inspecting a built tree, or checking the repo.
Verifying truth requires reality, so this lane is deliberately not sealed.

Output lands in `lane-b/<batchId>.json`:

```json
{ "pages": [{ "page": "docs/commands/build.mdx", "claimsChecked": 9, "findings": 0, "verdict": "accurate" }] }
```

Every assigned page gets a record, including pages with nothing wrong. A page of pure
conceptual prose legitimately records `claimsChecked: 0`.

Chinese pages are reviewed for **parity** rather than re-audited from scratch: does the
translation carry the same claims, caveats, and commands as its English twin.

## Lane C, sealed journeys

An agent plays a new user with a goal, and the rules are what make the result meaningful:

- **Sealed context.** Published pages only, reachable by links from the entry URL. No repo
  source, no web search, no prior knowledge of Extension.js, no exploratory `--help` unless
  a page said to run it.
- **Blocked is a successful outcome.** When the docs run out, stop and report the block.
  Guessing past a gap destroys the signal being measured.
- **Evidence or it did not happen.** Page URL, verbatim quote, exact command, actual output.

Findings then face an adversarial pass whose job is to refute them. Default to refuted when
uncertain, because noise filed against the docs costs more than a missed low severity issue.

Output lands in `lane-c/<journey>.json` with the pages traversed, so journeys feed the
coverage ledger too.

## Environment rules for any agent lane

This runs on a shared machine, so these are not optional:

- Never launch a headful browser. Pass `--no-browser`, or add `--headless=new`.
- `export EXTENSION_TELEMETRY_DISABLED=1` so review traffic never reaches real telemetry.
- Work in a sandbox directory. Never modify the docs or the framework repo.
- Wrap long-running commands in `timeout` and kill every process started.
- Use the published CLI (`npm i extension@latest`), because that is what a reader has.

## Reading the results

`coverage.json` is generated, do not hand edit. The summary block answers the only question
that matters for coverage: `unreviewed` must be zero. Findings from all lanes get filed
individually, and anything confirmed should also become a lane A assertion so the same rot
cannot come back silently.
