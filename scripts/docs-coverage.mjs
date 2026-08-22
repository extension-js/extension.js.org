// Docs review coverage ledger for extension.js.org.
// Every content page carries two independent review records, because the
// existing vitest suite proves claim types are sound, not that a page was read.
//   lane-a  deterministic claim checks (this script plus __tests__/)
//   lane-b  per-page truth audit by a reviewer that can run the real CLI
//   lane-c  end-to-end sealed journeys, extra depth, never proof of coverage
// Run with --assert to fail when a page is missing a lane, or --json for raw.
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const REVIEW_DIR = path.join(ROOT, "docs-review");
const LEDGER_PATH = path.join(REVIEW_DIR, "coverage.json");
const CAVEATS_PATH = path.join(REVIEW_DIR, "caveats.json");
const LOCALE_ROOTS = ["docs", "zh-Hans/docs", "zh-Hant/docs"];
const EXTRA_PAGES = ["index.mdx"];

function walkMdx(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMdx(full, out);
    else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

export function collectPages() {
  const pages = [];
  for (const localeRoot of LOCALE_ROOTS) {
    const locale = localeRoot.startsWith("zh-") ? localeRoot.split("/")[0] : "en";
    for (const abs of walkMdx(path.join(ROOT, localeRoot))) {
      pages.push({
        id: path.relative(ROOT, abs),
        locale,
        // Page identity shared across locales, so twins can be paired up.
        slug: path.relative(path.join(ROOT, localeRoot), abs).replace(/\\/g, "/"),
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

export function analyzePage(source) {
  const shellFences = [];
  for (const match of source.matchAll(FENCE_RE)) {
    const lang = (match[1] || "").trim().split(/\s+/)[0].toLowerCase();
    if (["bash", "sh", "shell", "console", "zsh"].includes(lang)) shellFences.push(match[2]);
  }
  const shell = shellFences.join("\n");
  const commands = [...shell.matchAll(COMMAND_RE)].map((m) => m[1]);
  const inlineCommands = [...source.matchAll(/`extension(?:@[\w.\-]+)?\s+([a-z][a-z-]*)[^`]*`/g)].map((m) => m[1]);
  return {
    commands: [...new Set([...commands, ...inlineCommands])],
    flags: [...new Set([...source.matchAll(FLAG_RE)].map((m) => m[0]))],
    links: [...new Set([...source.matchAll(MDX_LINK_RE)].map((m) => m[1]))],
    versionPins: [...new Set([...source.matchAll(VERSION_PIN_RE)].map((m) => m[1]))],
    codeBlocks: [...source.matchAll(FENCE_RE)].length,
    headings: [...source.matchAll(/^#{2,3}\s+.+$/gm)].length,
    words: source.split(/\s+/).filter(Boolean).length,
  };
}

// A page is "claim bearing" when lane A can assert something concrete about it.
// Pages that are not claim bearing still need lane B, which is the point of the
// ledger: prose with no commands is exactly where silent untruths survive.
export function claimCount(analysis) {
  return analysis.commands.length + analysis.flags.length + analysis.links.length + analysis.versionPins.length;
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
        findings.push({ kind: "caveat-page-missing", caveat: caveat.id, page: pageId, detail: "page listed in the caveat ledger does not exist" });
        continue;
      }
      const source = readFileSync(page.abs, "utf-8");
      const hit = caveat.anyOf.some((needle) => new RegExp(needle, "i").test(source));
      // A limitation that matters in English matters in translation too, but the
      // evidence is locale specific, so each locale brings its own patterns.
      for (const [locale, patterns] of Object.entries(caveat.translations || {})) {
        const twinId = pageId.replace(/^docs\//, `${locale}/docs/`);
        const twin = byId.get(twinId);
        if (!twin) continue;
        const twinSource = readFileSync(twin.abs, "utf-8");
        if (!patterns.some((needle) => new RegExp(needle, "i").test(twinSource))) {
          findings.push({ kind: "omitted-caveat", caveat: caveat.id, page: twinId, detail: `${caveat.why} (missing from the ${locale} translation)`, verifiedBy: caveat.verifiedBy, expectedAnyOf: patterns });
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
      if (!locales.has(locale)) findings.push({ kind: "missing-translation", page: `docs/${slug}`, detail: `no ${locale} twin` });
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
        findings.push({ kind: "stale-version-pin", page: page.id, detail: `documents extension@${pin}, published latest is ${latest}` });
      }
    }
  }
  return findings;
}

// Code is not translated. A Chinese page that shows a different command, flag
// or output path than its English twin is a defect no reviewer should have to
// hunt for by eye, so the mechanical half of parity lives here.
export function checkTranslationParity(pages) {
  const byLocale = { en: new Map(), "zh-Hans": new Map(), "zh-Hant": new Map() };
  for (const page of pages) {
    if (page.id === page.slug && page.locale === "en" && !page.id.startsWith("docs/")) continue;
    byLocale[page.locale]?.set(page.slug, page);
  }
  const findings = [];
  for (const [slug, enPage] of byLocale.en) {
    const enAnalysis = analyzePage(readFileSync(enPage.abs, "utf-8"));
    for (const locale of ["zh-Hans", "zh-Hant"]) {
      const twin = byLocale[locale].get(slug);
      if (!twin) continue;
      const twinAnalysis = analyzePage(readFileSync(twin.abs, "utf-8"));
      const missingCommands = enAnalysis.commands.filter((c) => !twinAnalysis.commands.includes(c));
      const extraCommands = twinAnalysis.commands.filter((c) => !enAnalysis.commands.includes(c));
      const missingFlags = enAnalysis.flags.filter((f) => !twinAnalysis.flags.includes(f));
      if (missingCommands.length || extraCommands.length) {
        findings.push({
          kind: "translation-command-drift",
          page: twin.id,
          detail: `commands differ from the English twin${missingCommands.length ? `, missing: ${missingCommands.join(", ")}` : ""}${extraCommands.length ? `, extra: ${extraCommands.join(", ")}` : ""}`,
        });
      }
      if (missingFlags.length) {
        findings.push({ kind: "translation-flag-drift", page: twin.id, detail: `flags absent from the translation: ${missingFlags.join(", ")}` });
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
      if (!previous || (entry.findings || 0) > (previous.findings || 0)) records.set(entry.page, { ...entry, source: file });
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
    laneAFindings: [...caveatFindings, ...localeFindings, ...versionFindings, ...parityFindings],
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

function main() {
  const args = process.argv.slice(2);
  const latestArg = args.find((a) => a.startsWith("--latest="));
  const ledger = buildLedger({ latest: latestArg ? latestArg.split("=")[1] : undefined });

  if (args.includes("--json")) {
    console.log(JSON.stringify(ledger, null, 2));
    return;
  }

  mkdirSync(REVIEW_DIR, { recursive: true });
  writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2) + "\n");

  const { summary } = ledger;
  console.log("Docs review coverage");
  console.log("--------------------");
  console.log(`  pages total        ${summary.totalPages} (en ${summary.en})`);
  console.log(`  lane A checked     ${summary.totalPages} (every page)`);
  console.log(`  lane B reviewed    ${summary.laneBReviewed}`);
  console.log(`  lane C traversed   ${summary.laneCTraversed}`);
  console.log(`  unreviewed         ${summary.unreviewed}`);
  console.log(`  pages with no machine-checkable claim: ${summary.claimlessPages}`);

  if (ledger.laneAFindings.length) {
    console.log(`\nLane A findings: ${ledger.laneAFindings.length}`);
    const byKind = {};
    for (const f of ledger.laneAFindings) byKind[f.kind] = (byKind[f.kind] || 0) + 1;
    for (const [kind, count] of Object.entries(byKind)) console.log(`  ${kind}: ${count}`);
  }

  if (args.includes("--assert")) {
    const missing = ledger.pages.filter((p) => !p.laneB).map((p) => p.page);
    const blocking = ledger.laneAFindings.filter((f) => f.kind === "omitted-caveat" || f.kind === "caveat-page-missing");
    if (missing.length || blocking.length) {
      if (missing.length) {
        console.error(`\n✖ ${missing.length} page(s) have no lane B review record:`);
        for (const page of missing.slice(0, 20)) console.error(`  ${page}`);
        if (missing.length > 20) console.error(`  ... and ${missing.length - 20} more`);
      }
      if (blocking.length) {
        console.error(`\n✖ ${blocking.length} caveat ledger violation(s):`);
        for (const f of blocking) console.error(`  ${f.page}: ${f.caveat} (${f.detail})`);
      }
      process.exit(1);
    }
    console.log("\n✔ every page carries a lane A and lane B review record");
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
