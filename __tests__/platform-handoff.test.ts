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

  it("quotes the exact lines a successful build prints", () => {
    const buildDoc = read("docs/commands/build.mdx");
    expect(buildDoc).toContain(
      "⏵⏵⏵ Build succeeded with no warnings.\nYour extension is ready for deployment.",
    );
  });

  it("claims no printed link on any locale's build page", () => {
    const claims = [
      "the link a successful build prints",
      "构建成功后终端也会打印这个链接",
      "建置成功後終端機也會印出這個連結",
    ];
    for (const localeDir of LOCALE_DIRS) {
      const body = read(`${localeDir}/commands/build.mdx`);
      for (const claim of claims) expect(body).not.toContain(claim);
    }
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
