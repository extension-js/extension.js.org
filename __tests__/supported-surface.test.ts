import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = resolve(__dirname, "..");
const DOCS_DIR = resolve(SITE_ROOT, "docs");
const MONOREPO_ROOT = resolve(SITE_ROOT, "..", "..");
const CONSTANTS_TS = resolve(
  MONOREPO_ROOT,
  "programs",
  "develop",
  "lib",
  "constants.ts",
);
const HAS_MONOREPO = existsSync(CONSTANTS_TS);

// Vendored copies of the canonical lists in
// programs/develop/lib/constants.ts. CI (which checks out only this repo)
// guards the docs against these; local runs additionally cross-check the
// vendored copies against the monorepo source so they cannot drift silently.
const SUPPORTED_PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun", "deno"];
const SUPPORTED_UI_FRAMEWORKS = ["react", "preact", "vue", "svelte"];

function getAllMdxFiles(dir: string): string[] {
  return readdirSync(dir, { recursive: true, encoding: "utf-8" })
    .filter((entry) => entry.endsWith(".mdx"))
    .map((entry) => resolve(dir, entry));
}

function stripCodeBlocks(content: string): string {
  return content.replace(/```[\s\S]*?```/g, "");
}

function extractArrayLiteral(source: string, name: string): string[] {
  const match = source.match(
    new RegExp(`export const ${name} = \\[([^\\]]+)\\]`),
  );
  if (!match) return [];
  return [...match[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
}

describe("supported surface", () => {
  it.skipIf(!HAS_MONOREPO)(
    "vendored canonical lists match programs/develop/lib/constants.ts",
    () => {
      const source = readFileSync(CONSTANTS_TS, "utf-8");
      expect(extractArrayLiteral(source, "SUPPORTED_PACKAGE_MANAGERS")).toEqual(
        SUPPORTED_PACKAGE_MANAGERS,
      );
      expect(extractArrayLiteral(source, "SUPPORTED_UI_FRAMEWORKS")).toEqual(
        SUPPORTED_UI_FRAMEWORKS,
      );
    },
  );

  it("every page with package-manager command tabs includes all package managers", () => {
    const pages = [...getAllMdxFiles(DOCS_DIR), resolve(SITE_ROOT, "index.mdx")];
    for (const page of pages) {
      const content = readFileSync(page, "utf-8");
      if (!content.includes("```bash npm")) continue;
      for (const pm of SUPPORTED_PACKAGE_MANAGERS) {
        expect(
          content,
          `${page} has npm command tabs but no ${pm} tab`,
        ).toContain(`\`\`\`bash ${pm}`);
      }
    }
  });

  it("framework enumerations on drift-prone pages never omit exactly one framework", () => {
    // The recurring drift shape: a sentence lists three of the four supported
    // frameworks and silently drops the fourth (historically Preact or
    // Svelte). Enumerating fewer is fine (page-specific focus); enumerating
    // all but one reads as an unintentional support gap.
    const pages = [
      resolve(SITE_ROOT, "index.mdx"),
      resolve(DOCS_DIR, "getting-started", "templates.mdx"),
      resolve(DOCS_DIR, "languages-and-frameworks", "index.mdx"),
      resolve(DOCS_DIR, "compare", "extension-js-vs-wxt.mdx"),
    ];
    for (const page of pages) {
      const paragraphs = stripCodeBlocks(readFileSync(page, "utf-8")).split(
        /\n\s*\n/,
      );
      for (const paragraph of paragraphs) {
        const mentioned = SUPPORTED_UI_FRAMEWORKS.filter((framework) =>
          new RegExp(`\\b${framework}\\b`, "i").test(paragraph),
        );
        expect(
          mentioned.length,
          `${page} enumerates ${mentioned.join(", ")} but omits ${SUPPORTED_UI_FRAMEWORKS.filter((f) => !mentioned.includes(f)).join(", ")}:\n---\n${paragraph.trim()}\n---`,
        ).not.toBe(SUPPORTED_UI_FRAMEWORKS.length - 1);
      }
    }
  });

  it("languages index links every supported framework", () => {
    const content = readFileSync(
      resolve(DOCS_DIR, "languages-and-frameworks", "index.mdx"),
      "utf-8",
    );
    for (const framework of SUPPORTED_UI_FRAMEWORKS) {
      expect(content).toContain(`/docs/languages-and-frameworks/${framework}`);
    }
  });

  it("preact page does not claim fast refresh (disabled in the toolchain)", () => {
    // programs/develop/plugin-js-frameworks/js-tools/preact.ts intentionally
    // ships no refresh plugin (upstream @rspack/plugin-preact-refresh is
    // broken under rspack 2.x); Preact gets live reload. If fast refresh is
    // re-enabled upstream, update the page and this test together.
    const content = readFileSync(
      resolve(DOCS_DIR, "languages-and-frameworks", "preact.mdx"),
      "utf-8",
    );
    expect(content).not.toMatch(/fast-refresh support automatically/i);
    expect(content).not.toMatch(/using `@rspack\/plugin-preact-refresh`/);
    expect(content.toLowerCase()).toContain("live reload");
  });

  it("never mentions stylus (no stylus support exists)", () => {
    const pages = [...getAllMdxFiles(DOCS_DIR), resolve(SITE_ROOT, "index.mdx")];
    for (const page of pages) {
      expect(
        /\bstylus\b/i.test(readFileSync(page, "utf-8")),
        `${page} mentions stylus, which the toolchain does not support`,
      ).toBe(false);
    }
  });

  it("compatibility matrix page exists, is in the nav, and covers all categories", () => {
    const matrixPath = resolve(DOCS_DIR, "features", "compatibility-matrix.mdx");
    expect(existsSync(matrixPath)).toBe(true);
    const nav = readFileSync(resolve(SITE_ROOT, "docs.json"), "utf-8");
    expect(nav).toContain("docs/features/compatibility-matrix");
    const content = readFileSync(matrixPath, "utf-8").toLowerCase();
    for (const item of [...SUPPORTED_PACKAGE_MANAGERS, ...SUPPORTED_UI_FRAMEWORKS]) {
      expect(content, `compatibility matrix omits ${item}`).toContain(item);
    }
    for (const browser of ["chrome", "edge", "firefox", "safari"]) {
      expect(content, `compatibility matrix omits ${browser}`).toContain(browser);
    }
  });
});
