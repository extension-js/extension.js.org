import {
  readFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const REVIEW_DIR = path.join(ROOT, "docs-review");
const LEDGER_PATH = path.join(REVIEW_DIR, "coverage.json");
const CAVEATS_PATH = path.join(REVIEW_DIR, "caveats.json");
const LOCALE_ROOTS = ["docs", "zh-Hans/docs", "zh-Hant/docs"];
const EXTRA_PAGES = ["index.mdx", "showcase.mdx"];

function walkMdx(dir, out = []) {
  if (!existsSync(dir)) return out;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;

    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) walkMdx(full, out);
    else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
      out.push(full);
    }
  }

  return out;
}

export function collectPages() {
  const pages = [];

  for (const localeRoot of LOCALE_ROOTS) {
    const locale = localeRoot.startsWith("zh-")
      ? localeRoot.split("/")[0]
      : "en";

    for (const abs of walkMdx(path.join(ROOT, localeRoot))) {
      pages.push({
        id: path.relative(ROOT, abs),
        locale,
        // Page identity shared across locales, so twins can be paired up.
        slug: path
          .relative(path.join(ROOT, localeRoot), abs)
          .replace(/\\/g, "/"),
        abs,
      });
    }
  }

  for (const rel of EXTRA_PAGES) {
    const abs = path.join(ROOT, rel);
    if (existsSync(abs)) pages.push({ id: rel, locale: "en", slug: rel, abs });
  }

  return pages.sort((a, b) => a.id.localeCompare(b.id));
}

// Fences carry an info string, not just a language: ```bash npm is common here.
const FENCE_RE = /```([^\n]*)\n([\s\S]*?)```/g;
const COMMAND_RE = /\bextension(?:@[\w.\-]+)?\s+([a-z][a-z-]*)/g;
const FLAG_RE = /(?<![\w-])--[a-z][a-z0-9-]+/g;
const MDX_LINK_RE = /\]\((\/docs\/[^)#]+|\.[^)]+\.mdx)/g;
const VERSION_PIN_RE = /\bextension@(\d+\.\d+\.\d+(?:-[\w.]+)?)/g;

export function analyzePage(rawSource) {
  // A {/* ... */} block is a production note that never reaches the reader, so
  // a command or flag written inside one is not a claim the page makes.
  const source = rawSource.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
  const shellFences = [];

  for (const match of source.matchAll(FENCE_RE)) {
    const lang = (match[1] || "").trim().split(/\s+/)[0].toLowerCase();

    if (["bash", "sh", "shell", "console", "zsh"].includes(lang)) {
      shellFences.push(match[2]);
    }
  }

  const shell = shellFences.join("\n");
  const commands = [...shell.matchAll(COMMAND_RE)].map((m) => m[1]);
  const inlineCommands = [
    ...source.matchAll(/`extension(?:@[\w.\-]+)?\s+([a-z][a-z-]*)[^`]*`/g),
  ].map((m) => m[1]);

  return {
    commands: [...new Set([...commands, ...inlineCommands])],
    flags: [...new Set([...source.matchAll(FLAG_RE)].map((m) => m[0]))],
    links: [...new Set([...source.matchAll(MDX_LINK_RE)].map((m) => m[1]))],
    versionPins: [
      ...new Set([...source.matchAll(VERSION_PIN_RE)].map((m) => m[1])),
    ],
    codeBlocks: [...source.matchAll(FENCE_RE)].length,
    headings: [...source.matchAll(/^#{2,3}\s+.+$/gm)].length,
    words: source.split(/\s+/).filter(Boolean).length,
  };
}

// A page is "claim bearing" when lane A can assert something concrete about it.
// Pages that are not claim bearing still need lane B, which is the point of the
// ledger: prose with no commands is exactly where silent untruths survive.
export function claimCount(analysis) {
  return (
    analysis.commands.length +
    analysis.flags.length +
    analysis.links.length +
    analysis.versionPins.length
  );
}

function loadCaveats() {
  if (!existsSync(CAVEATS_PATH)) return [];

  return JSON.parse(readFileSync(CAVEATS_PATH, "utf-8")).caveats || [];
}

// The inverted truthfulness check: a page can contain no false sentence and
// still mislead by omitting a limitation we know exists.
export function checkCaveats(pages) {
  const findings = [];
  const byId = new Map(pages.map((p) => [p.id, p]));

  for (const caveat of loadCaveats()) {
    for (const pageId of caveat.mustAppearOn) {
      const page = byId.get(pageId);

      if (!page) {
        findings.push({
          kind: "caveat-page-missing",
          caveat: caveat.id,
          page: pageId,
          detail: "page listed in the caveat ledger does not exist",
        });

        continue;
      }

      const source = readFileSync(page.abs, "utf-8");
      const hit = caveat.anyOf.some((needle) =>
        new RegExp(needle, "i").test(source),
      );

      // A limitation that matters in English matters in translation too, but the
      // evidence is locale specific, so each locale brings its own patterns.
      for (const [locale, patterns] of Object.entries(
        caveat.translations || {},
      )) {
        const twinId = pageId.replace(/^docs\//, `${locale}/docs/`);
        const twin = byId.get(twinId);
        if (!twin) continue;

        const twinSource = readFileSync(twin.abs, "utf-8");

        if (
          !patterns.some((needle) => new RegExp(needle, "i").test(twinSource))
        ) {
          findings.push({
            kind: "omitted-caveat",
            caveat: caveat.id,
            page: twinId,
            detail: `${caveat.why} (missing from the ${locale} translation)`,
            verifiedBy: caveat.verifiedBy,
            expectedAnyOf: patterns,
          });
        }
      }

      if (!hit) {
        findings.push({
          kind: "omitted-caveat",
          caveat: caveat.id,
          page: pageId,
          detail: caveat.why,
          verifiedBy: caveat.verifiedBy,
          expectedAnyOf: caveat.anyOf,
        });
      }
    }
  }

  return findings;
}

export function checkLocaleTwins(pages) {
  const bySlug = new Map();

  for (const page of pages) {
    if (!bySlug.has(page.slug)) bySlug.set(page.slug, new Set());

    bySlug.get(page.slug).add(page.locale);
  }

  const findings = [];

  for (const [slug, locales] of bySlug) {
    if (!locales.has("en")) continue;

    for (const locale of ["zh-Hans", "zh-Hant"]) {
      if (!locales.has(locale)) {
        findings.push({
          kind: "missing-translation",
          page: `docs/${slug}`,
          detail: `no ${locale} twin`,
        });
      }
    }
  }

  return findings;
}

export function checkVersionPins(pages, latest) {
  if (!latest) return [];

  const findings = [];

  for (const page of pages) {
    const analysis = analyzePage(readFileSync(page.abs, "utf-8"));

    for (const pin of analysis.versionPins) {
      if (pin !== latest) {
        findings.push({
          kind: "stale-version-pin",
          page: page.id,
          detail: `documents extension@${pin}, published latest is ${latest}`,
        });
      }
    }
  }

  return findings;
}

// Code is not translated. A Chinese page that shows a different command, flag
// or output path than its English twin is a defect no reviewer should have to
// hunt for by eye, so the mechanical half of parity lives here.
export function checkTranslationParity(pages) {
  const byLocale = {
    en: new Map(),
    "zh-Hans": new Map(),
    "zh-Hant": new Map(),
  };

  for (const page of pages) {
    if (
      page.id === page.slug &&
      page.locale === "en" &&
      !page.id.startsWith("docs/")
    ) {
      continue;
    }

    byLocale[page.locale]?.set(page.slug, page);
  }

  const findings = [];

  for (const [slug, enPage] of byLocale.en) {
    const enAnalysis = analyzePage(readFileSync(enPage.abs, "utf-8"));

    for (const locale of ["zh-Hans", "zh-Hant"]) {
      const twin = byLocale[locale].get(slug);
      if (!twin) continue;

      const twinAnalysis = analyzePage(readFileSync(twin.abs, "utf-8"));
      const missingCommands = enAnalysis.commands.filter(
        (c) => !twinAnalysis.commands.includes(c),
      );
      const extraCommands = twinAnalysis.commands.filter(
        (c) => !enAnalysis.commands.includes(c),
      );
      const missingFlags = enAnalysis.flags.filter(
        (f) => !twinAnalysis.flags.includes(f),
      );

      if (missingCommands.length || extraCommands.length) {
        findings.push({
          kind: "translation-command-drift",
          page: twin.id,
          detail: `commands differ from the English twin${missingCommands.length ? `, missing: ${missingCommands.join(", ")}` : ""}${extraCommands.length ? `, extra: ${extraCommands.join(", ")}` : ""}`,
        });
      }

      if (missingFlags.length) {
        findings.push({
          kind: "translation-flag-drift",
          page: twin.id,
          detail: `flags absent from the translation: ${missingFlags.join(", ")}`,
        });
      }
    }
  }

  return findings;
}

// Mintlify silently drops components it does not know, so a typo or a removed
// component renders as nothing and no build step complains. Everything a page
// uses must therefore be a documented built-in or a local snippet.
const KNOWN_COMPONENTS = new Set([
  "Accordion",
  "AccordionGroup",
  "Card",
  "CardGroup",
  "CodeGroup",
  "Columns",
  "Check",
  "Expandable",
  "Frame",
  "Icon",
  "Info",
  "Note",
  "Panel",
  "Param",
  "ParamField",
  "ResponseField",
  "Step",
  "Steps",
  "Tab",
  "Tabs",
  "Tip",
  "Tooltip",
  "Update",
  "Warning",
  "Button",
  "Snippet",
]);

export function checkComponents(pages) {
  const findings = [];

  for (const page of pages) {
    const source = readFileSync(page.abs, "utf-8")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`[^`\n]*`/g, "");
    const used = new Set(
      [...source.matchAll(/<([A-Z][A-Za-z0-9]*)[\s/>]/g)].map((m) => m[1]),
    );

    for (const name of used) {
      if (!KNOWN_COMPONENTS.has(name)) {
        findings.push({
          kind: "unknown-component",
          page: page.id,
          detail: `<${name}> is not a known component, so it renders as nothing`,
        });
      }
    }
  }

  return findings;
}

// A heading with nothing under it still ships to llms-full.txt and to every
// machine consumer, which then emits a section promising content that is not
// there. Thirteen pages carried an empty "Video walkthrough" this way.
export function checkEmptySections(pages) {
  const findings = [];

  for (const page of pages) {
    const source = readFileSync(page.abs, "utf-8");
    const matches = [...source.matchAll(/^(##+)\s+(.+?)\s*$/gm)];

    for (let index = 0; index < matches.length; index += 1) {
      const level = matches[index][1].length;
      const next = matches[index + 1];
      // A section that opens straight into its own subsection is not empty:
      // only a heading with no prose AND no deeper heading is a dead promise.
      if (next && next[1].length > level) continue;

      const start = matches[index].index + matches[index][0].length;
      const end = next ? next.index : source.length;

      if (source.slice(start, end).trim() === "") {
        findings.push({
          kind: "empty-section",
          page: page.id,
          detail: `"${matches[index][2]}" has no content under it`,
        });
      }
    }
  }

  return findings;
}

function loadReviewRecords(lane) {
  const dir = path.join(REVIEW_DIR, lane);
  const records = new Map();
  if (!existsSync(dir)) return records;

  for (const file of readdirSync(dir)) {
    if (!file.endsWith(".json")) continue;

    const parsed = JSON.parse(readFileSync(path.join(dir, file), "utf-8"));

    for (const entry of parsed.pages || []) {
      const previous = records.get(entry.page);

      // Keep the record with the most findings so a thin pass cannot mask a thorough one.
      if (!previous || (entry.findings || 0) > (previous.findings || 0)) {
        records.set(entry.page, { ...entry, source: file });
      }
    }
  }

  return records;
}

export function buildLedger({ latest } = {}) {
  const pages = collectPages();
  const laneB = loadReviewRecords("lane-b");
  const laneC = loadReviewRecords("lane-c");
  const caveatFindings = checkCaveats(pages);
  const localeFindings = checkLocaleTwins(pages);
  const versionFindings = checkVersionPins(pages, latest);
  const parityFindings = checkTranslationParity(pages);
  const componentFindings = checkComponents(pages);
  const emptySectionFindings = checkEmptySections(pages);

  const ledgerPages = pages.map((page) => {
    const analysis = analyzePage(readFileSync(page.abs, "utf-8"));

    return {
      page: page.id,
      locale: page.locale,
      claims: claimCount(analysis),
      commands: analysis.commands.length,
      flags: analysis.flags.length,
      words: analysis.words,
      laneA: true,
      laneB: laneB.has(page.id) ? laneB.get(page.id) : null,
      laneC: laneC.has(page.id) ? laneC.get(page.id) : null,
    };
  });

  return {
    pages: ledgerPages,
    laneAFindings: [
      ...caveatFindings,
      ...localeFindings,
      ...versionFindings,
      ...parityFindings,
      ...componentFindings,
      ...emptySectionFindings,
    ],
    summary: {
      totalPages: ledgerPages.length,
      en: ledgerPages.filter((p) => p.locale === "en").length,
      laneBReviewed: ledgerPages.filter((p) => p.laneB).length,
      laneCTraversed: ledgerPages.filter((p) => p.laneC).length,
      unreviewed: ledgerPages.filter((p) => !p.laneB).length,
      claimlessPages: ledgerPages.filter((p) => p.claims === 0).length,
    },
  };
}

export function serializeLedger(ledger) {
  return JSON.stringify(ledger, null, 2) + "\n";
}

export function writeLedger(ledger, ledgerPath = LEDGER_PATH) {
  mkdirSync(path.dirname(ledgerPath), { recursive: true });
  writeFileSync(ledgerPath, serializeLedger(ledger));
}

function countByKind(findings) {
  const byKind = {};

  for (const f of findings) {
    byKind[f.kind] = (byKind[f.kind] || 0) + 1;
  }

  return byKind;
}

// Names what moved between the committed ledger and a fresh build, page by
// page, so a stale failure says which page to look at instead of just "stale".
export function describeLedgerDrift(committedText, fresh) {
  if (committedText === serializeLedger(fresh)) return [];

  let committed;

  try {
    committed = JSON.parse(committedText);
  } catch {
    return ["committed ledger is not valid JSON"];
  }

  const lines = [];
  const committedPages = new Map(
    (committed.pages || []).map((p) => [p.page, p]),
  );
  const freshPages = new Map(fresh.pages.map((p) => [p.page, p]));

  for (const [id, page] of freshPages) {
    const previous = committedPages.get(id);

    if (!previous) {
      lines.push(`${id}: not in the committed ledger`);
      continue;
    }

    const changed = Object.keys(page).filter(
      (key) => JSON.stringify(page[key]) !== JSON.stringify(previous[key]),
    );

    if (changed.length) {
      lines.push(
        `${id}: ${changed
          .map((key) =>
            typeof page[key] === "object"
              ? `${key} changed`
              : `${key} ${previous[key]} -> ${page[key]}`,
          )
          .join(", ")}`,
      );
    }
  }

  for (const id of committedPages.keys()) {
    if (!freshPages.has(id)) lines.push(`${id}: no longer exists`);
  }

  const committedKinds = countByKind(committed.laneAFindings || []);
  const freshKinds = countByKind(fresh.laneAFindings);

  for (const kind of new Set([
    ...Object.keys(committedKinds),
    ...Object.keys(freshKinds),
  ])) {
    if ((committedKinds[kind] || 0) !== (freshKinds[kind] || 0)) {
      lines.push(
        `lane A ${kind}: ${committedKinds[kind] || 0} -> ${freshKinds[kind] || 0}`,
      );
    }
  }

  if (JSON.stringify(committed.summary) !== JSON.stringify(fresh.summary)) {
    lines.push("summary block differs");
  }

  return lines.length ? lines : ["serialization differs from the generator"];
}

export function main(
  args,
  { ledgerPath = LEDGER_PATH, log = console.log, error = console.error } = {},
) {
  const latestArg = args.find((a) => a.startsWith("--latest="));
  const ledger = buildLedger({
    latest: latestArg ? latestArg.split("=")[1] : undefined,
  });

  if (args.includes("--json")) {
    log(JSON.stringify(ledger, null, 2));

    return 0;
  }

  const assert = args.includes("--assert");

  if (!assert) writeLedger(ledger, ledgerPath);

  const { summary } = ledger;
  log("Docs review coverage");
  log("--------------------");
  log(`  pages total        ${summary.totalPages} (en ${summary.en})`);
  log(`  lane A checked     ${summary.totalPages} (every page)`);
  log(`  lane B reviewed    ${summary.laneBReviewed}`);
  log(`  lane C traversed   ${summary.laneCTraversed}`);
  log(`  unreviewed         ${summary.unreviewed}`);
  log(`  pages with no machine-checkable claim: ${summary.claimlessPages}`);

  if (ledger.laneAFindings.length) {
    log(`\nLane A findings: ${ledger.laneAFindings.length}`);

    for (const [kind, count] of Object.entries(
      countByKind(ledger.laneAFindings),
    )) {
      log(`  ${kind}: ${count}`);
    }
  }

  if (!assert) return 0;

  let failed = false;
  const missing = ledger.pages.filter((p) => !p.laneB).map((p) => p.page);
  const blocking = ledger.laneAFindings.filter(
    (f) => f.kind === "omitted-caveat" || f.kind === "caveat-page-missing",
  );

  if (missing.length) {
    failed = true;
    error(`\n✖ ${missing.length} page(s) have no lane B review record:`);

    for (const page of missing.slice(0, 20)) error(`  ${page}`);

    if (missing.length > 20) error(`  ... and ${missing.length - 20} more`);
  }

  if (blocking.length) {
    failed = true;
    error(`\n✖ ${blocking.length} caveat ledger violation(s):`);

    for (const f of blocking) error(`  ${f.page}: ${f.caveat} (${f.detail})`);
  }

  const relativeLedger = path.relative(ROOT, ledgerPath);

  if (!existsSync(ledgerPath)) {
    failed = true;
    error(
      `\n✖ ${relativeLedger} does not exist: run pnpm docs:coverage and commit it`,
    );
  } else {
    const drift = describeLedgerDrift(
      readFileSync(ledgerPath, "utf-8"),
      ledger,
    );

    if (drift.length) {
      failed = true;
      error(
        `\n✖ ${relativeLedger} is stale: run pnpm docs:coverage and commit the result`,
      );

      for (const line of drift.slice(0, 20)) error(`  ${line}`);

      if (drift.length > 20) error(`  ... and ${drift.length - 20} more`);
    }
  }

  if (failed) return 1;

  log("\n✔ every page carries a lane A and lane B review record");
  log(`✔ ${relativeLedger} matches a fresh build`);

  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exitCode = main(process.argv.slice(2));
}
