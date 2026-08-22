import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildLedger, collectPages } from "../scripts/docs-coverage.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CAVEATS_PATH = resolve(ROOT, "docs-review", "caveats.json");

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
    const missing = ledger.pages.filter((page) => !page.laneB).map((page) => page.page);
    expect(
      missing,
      `pages with no lane B review record (run the docs review sweep, then commit docs-review/lane-b/*.json):\n${missing.slice(0, 25).join("\n")}`,
    ).toEqual([]);
  });

  it("keeps every known limitation documented on its page", () => {
    const violations = ledger.laneAFindings.filter(
      (finding) => finding.kind === "omitted-caveat" || finding.kind === "caveat-page-missing",
    );
    expect(
      violations,
      `caveat ledger violations:\n${violations.map((v) => `  ${v.page}: ${v.caveat}`).join("\n")}`,
    ).toEqual([]);
  });

  it("requires every caveat to cite how the limitation was verified", () => {
    expect(existsSync(CAVEATS_PATH)).toBe(true);
    const { caveats } = JSON.parse(readFileSync(CAVEATS_PATH, "utf-8"));
    expect(caveats.length).toBeGreaterThan(0);
    for (const caveat of caveats) {
      expect(caveat.verifiedBy, `caveat ${caveat.id} has no verifiedBy citation`).toBeTruthy();
      expect(caveat.mustAppearOn.length, `caveat ${caveat.id} targets no page`).toBeGreaterThan(0);
      expect(caveat.anyOf.length, `caveat ${caveat.id} has no match patterns`).toBeGreaterThan(0);
    }
  });
});
