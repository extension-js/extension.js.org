import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const LOCALES = ["zh-Hans", "zh-Hant"];

function getAllMdxFiles(dir: string): string[] {
  return readdirSync(dir, { recursive: true, encoding: "utf-8" })
    .filter((entry) => entry.endsWith(".mdx"))
    .map((entry) => resolve(dir, entry));
}

function stripCodeBlocks(content: string): string {
  return content.replace(/```[\s\S]*?```/g, "");
}

function stripJsxComments(content: string): string {
  return content.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
}

// Markdown links and JSX hrefs both reach the reader, so both are checked.
function extractLinks(content: string, pattern: RegExp): string[] {
  const clean = stripJsxComments(stripCodeBlocks(content));
  const found: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(clean))) found.push(m[1]);

  return found;
}

function pageExists(path: string): boolean {
  const base = resolve(ROOT, path.replace(/^\//, ""));

  return existsSync(`${base}.mdx`) || existsSync(resolve(base, "index.mdx"));
}

describe("Translated pages keep the reader in their locale", () => {
  for (const locale of LOCALES) {
    const files = getAllMdxFiles(resolve(ROOT, locale));

    it(`${locale}: has translated pages to test`, () => {
      expect(files.length).toBeGreaterThan(0);
    });

    for (const file of files) {
      const relPath = file.replace(ROOT + "/", "");
      const content = readFileSync(file, "utf-8");

      const prefixed = extractLinks(
        content,
        new RegExp(
          `(?:\\]\\(|(?:href|src)=")(/${locale}/(?:docs|blog)[^)"\\s#]*)`,
          "g",
        ),
      );

      if (prefixed.length > 0) {
        it(`${relPath}: every ${locale} link resolves`, () => {
          const missing = prefixed.filter((link) => !pageExists(link));
          expect(missing, `no page on disk for ${missing.join(", ")}`).toEqual(
            [],
          );
        });
      }

      // A bare /docs link drops the reader into English. That is the right
      // fallback only while the page it points at has no translation yet.
      const bare = extractLinks(
        content,
        /(?:\]\(|(?:href|src)=")(\/(?:docs|blog)[^)"\s#]*)/g,
      );

      if (bare.length > 0) {
        it(`${relPath}: only links out to untranslated pages`, () => {
          const translated = bare.filter((link) =>
            pageExists(`/${locale}${link}`),
          );
          expect(
            translated,
            `${translated.join(", ")} is translated, so the link needs the /${locale} prefix`,
          ).toEqual([]);
        });
      }
    }
  }
});
