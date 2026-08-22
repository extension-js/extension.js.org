import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const SHARE_DOCS_URL =
  "https://docs.extension.dev/share/unpublished-build-for-review";

const LOCALE_DIRS = ["docs", "zh-Hans/docs", "zh-Hant/docs"];

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

function read(relativePath: string): string {
  return readFileSync(resolve(ROOT, relativePath), "utf8");
}

describe("hand-off to the extension.dev platform", () => {
  it("finds every locale's command docs", () => {
    const pages = allDocPages();
    expect(pages.length).toBeGreaterThan(0);
    for (const localeDir of LOCALE_DIRS) {
      expect(
        pages.some((page) => page.includes(`/${localeDir}/commands/build.`)),
      ).toBe(true);
    }
  });

  it("points the publish page at the share destination", () => {
    expect(read("docs/commands/publish.mdx")).toContain(SHARE_DOCS_URL);
  });

  // This assertion used to pin the opposite text, which the CLI has never
  // printed. A test that quotes terminal prose can only be trusted when it is
  // checked against a real run, so it now asserts the lines 4.1.3 emits.
  it("quotes the exact lines a successful build prints", () => {
    const buildDoc = read("docs/commands/build.mdx");
    expect(buildDoc).toContain("⏵⏵⏵ Extension built for production in dist/");
    expect(buildDoc).toContain("⏵⏵⏵ Send this build to someone for review:");
    expect(buildDoc).not.toContain("Build succeeded with no warnings.");
    expect(buildDoc).not.toContain("Your extension is ready for deployment.");
  });

  it("points every locale's build page at the share destination", () => {
    for (const localeDir of LOCALE_DIRS) {
      expect(read(`${localeDir}/commands/build.mdx`)).toContain(SHARE_DOCS_URL);
    }
  });

  it("teaches no command from the private deploy package", () => {
    for (const page of allDocPages()) {
      const body = readFileSync(page, "utf8");
      for (const name of ["@extension.dev/deploy", "extension-deploy"]) {
        if (!body.includes(name)) continue;
        throw new Error(
          `${page} still references ${name}, which no reader can install.`,
        );
      }
    }
  });

  it("carries no link to the retired shared-previews address", () => {
    for (const page of allDocPages()) {
      expect(readFileSync(page, "utf8")).not.toContain(
        "docs.extension.dev/share/shared-previews",
      );
    }
  });
});
