import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  readFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
  statSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  analyzePage,
  buildLedger,
  collectPages,
  main,
  serializeLedger,
} from "../scripts/docs-coverage.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CAVEATS_PATH = resolve(ROOT, "docs-review", "caveats.json");

function runScript(args: string[], ledgerPath: string) {
  const out: string[] = [];
  const err: string[] = [];
  const code = main(args, {
    ledgerPath,
    log: (line: string) => out.push(line),
    error: (line: string) => err.push(line),
  });

  return { code, stdout: out.join("\n"), stderr: err.join("\n") };
}

describe("docs coverage script modes", () => {
  let dir: string;
  let ledgerPath: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "docs-coverage-"));
    ledgerPath = join(dir, "nested", "coverage.json");
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it("generate mode writes the ledger", () => {
    const { code } = runScript([], ledgerPath);
    expect(code).toBe(0);
    expect(readFileSync(ledgerPath, "utf-8")).toBe(
      serializeLedger(buildLedger()),
    );
  });

  it("assert mode passes on a fresh ledger and leaves it byte-identical", () => {
    runScript([], ledgerPath);
    const before = readFileSync(ledgerPath);
    const mtimeBefore = statSync(ledgerPath).mtimeMs;

    const { code, stdout } = runScript(["--assert"], ledgerPath);

    expect(code).toBe(0);
    expect(stdout).toContain("matches a fresh build");
    expect(readFileSync(ledgerPath).equals(before)).toBe(true);
    expect(statSync(ledgerPath).mtimeMs).toBe(mtimeBefore);
  });

  it("assert mode fails on a stale ledger without rewriting it", () => {
    const ledger = buildLedger();
    const first = ledger.pages[0];
    first.words += 1;
    const stale = serializeLedger(ledger);
    mkdirSync(dirname(ledgerPath), { recursive: true });
    writeFileSync(ledgerPath, stale);

    const { code, stderr } = runScript(["--assert"], ledgerPath);

    expect(code).toBe(1);
    expect(stderr).toContain("is stale: run pnpm docs:coverage");
    expect(stderr).toContain(`${first.page}: words ${first.words} -> `);
    expect(readFileSync(ledgerPath, "utf-8")).toBe(stale);
  });

  it("assert mode fails when the ledger is missing", () => {
    const { code, stderr } = runScript(["--assert"], ledgerPath);

    expect(code).toBe(1);
    expect(stderr).toContain("does not exist: run pnpm docs:coverage");
    expect(existsSync(ledgerPath)).toBe(false);
  });
});

// The rest of this suite proves claim types are sound. This one proves no page
// escaped review: a page whose links resolve can still be untrue in prose, and
// only a reviewer who read it can say otherwise.
describe("docs review coverage", () => {
  const ledger = buildLedger();

  it("finds every content page across all locales", () => {
    const pages = collectPages();
    expect(pages.length).toBeGreaterThan(300);
    expect(pages.filter((p) => p.locale === "en").length).toBeGreaterThan(115);
  });

  it("gives every page a lane B review record", () => {
    const missing = ledger.pages
      .filter((page) => !page.laneB)
      .map((page) => page.page);
    expect(
      missing,
      `pages with no lane B review record (run the docs review sweep, then commit docs-review/lane-b/*.json):\n${missing.slice(0, 25).join("\n")}`,
    ).toEqual([]);
  });

  it("keeps every known limitation documented on its page", () => {
    const violations = ledger.laneAFindings.filter(
      (finding) =>
        finding.kind === "omitted-caveat" ||
        finding.kind === "caveat-page-missing",
    );
    expect(
      violations,
      `caveat ledger violations:\n${violations.map((v) => `  ${v.page}: ${v.caveat}`).join("\n")}`,
    ).toEqual([]);
  });

  // A recording script in a JSX comment used to read as a claim the page made,
  // which then showed up as flag drift on every translation that omits it.
  it("ignores commands and flags inside JSX comments", () => {
    const page = [
      "{/* run: node video/record.mjs migrate-crxjs --mock */}",
      "",
      "Run the dev server.",
      "",
      "```bash",
      "extension dev --profile ./run",
      "```",
    ].join("\n");
    const analysis = analyzePage(page);
    expect(analysis.flags).toContain("--profile");
    expect(analysis.flags).not.toContain("--mock");
    expect(analysis.commands).toEqual(["dev"]);
  });

  it("requires every caveat to cite how the limitation was verified", () => {
    expect(existsSync(CAVEATS_PATH)).toBe(true);
    const { caveats } = JSON.parse(readFileSync(CAVEATS_PATH, "utf-8"));
    expect(caveats.length).toBeGreaterThan(0);

    for (const caveat of caveats) {
      expect(
        caveat.verifiedBy,
        `caveat ${caveat.id} has no verifiedBy citation`,
      ).toBeTruthy();

      expect(
        caveat.mustAppearOn.length,
        `caveat ${caveat.id} targets no page`,
      ).toBeGreaterThan(0);

      expect(
        caveat.anyOf.length,
        `caveat ${caveat.id} has no match patterns`,
      ).toBeGreaterThan(0);
    }
  });
});
