import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const LOCALE_DIRS = ["docs", "zh-Hans/docs", "zh-Hant/docs"];

const ALLOWED_PAGES = ["docs/commands/publish.mdx"];

const PLATFORM_VOCABULARY = [
  "EXTENSION_DEV_TOKEN",
  "extension.dev/device",
  "device login",
  "managed mirror",
  "managed GitHub mirror",
  "Settings, then Stores",
  "guided setup dialog",
  "release flow on extension.dev",
  "extension.dev/import",
  "Platform mirror secret",
  "Saved platform secrets",
  "platform track",
  "STORE_CHROME_",
  "STORE_FIREFOX_",
  "STORE_EDGE_",
  "STORE_SAFARI_",
];

function allDocPages(): string[] {
  const files: string[] = [];
  for (const localeDir of LOCALE_DIRS) {
    const dir = resolve(ROOT, localeDir);
    for (const entry of readdirSync(dir, {
      recursive: true,
      encoding: "utf-8",
    })) {
      if (entry.endsWith(".mdx") || entry.endsWith(".md")) {
        files.push(resolve(dir, entry));
      }
    }
  }
  return files;
}

describe("platform vocabulary stays out of the docs corpus", () => {
  it("keeps every allowlisted page in the tree", () => {
    for (const page of ALLOWED_PAGES) {
      expect(() => readFileSync(resolve(ROOT, page), "utf8")).not.toThrow();
    }
  });

  it("proves the detector can see the vocabulary at all", () => {
    const allowedBodies = ALLOWED_PAGES.map((page) =>
      readFileSync(resolve(ROOT, page), "utf8").toLowerCase(),
    ).join("\n");
    const seen = PLATFORM_VOCABULARY.filter((term) =>
      allowedBodies.includes(term.toLowerCase()),
    );
    expect(seen.length).toBeGreaterThan(0);
  });

  it("finds no platform vocabulary outside the allowlist", () => {
    const violations: string[] = [];
    for (const page of allDocPages()) {
      const relativePath = relative(ROOT, page);
      if (ALLOWED_PAGES.includes(relativePath)) continue;
      const body = readFileSync(page, "utf8").toLowerCase();
      for (const term of PLATFORM_VOCABULARY) {
        if (body.includes(term.toLowerCase())) {
          violations.push(`${relativePath}: ${term}`);
        }
      }
    }
    expect(violations).toEqual([]);
  });

  it("keeps the cut platform pages gone", () => {
    const pages = allDocPages().map((page) => relative(ROOT, page));
    expect(pages).not.toContain("docs/getting-started/platform.mdx");
    expect(pages).not.toContain("docs/publishing/agencies.mdx");
  });
});
