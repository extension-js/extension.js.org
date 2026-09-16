import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const TREES = ["docs", "blog", "zh-Hans", "zh-Hant"];
const ROOT_PAGES = ["index.mdx", "showcase.mdx"];

// Mintlify renders "<title> - Extension.js", and a search result line cuts off
// around 60 characters, so the suffix is part of the budget.
const TITLE_SUFFIX = " - Extension.js";
const TITLE_BUDGET = 60;

// A page earns an exemption only when trimming it would risk traffic it already
// has. Each entry carries the reason, and the list is checked for rot below.
const TITLE_EXEMPTIONS = new Map([
  [
    "docs/browsers/browser-flags.mdx",
    "the top click earner and the most cited page, 5 chars over, not worth the churn",
  ],
]);

function getAllMdxFiles(dir: string): string[] {
  return readdirSync(dir, { recursive: true, encoding: "utf-8" })
    .filter((entry) => entry.endsWith(".mdx"))
    .map((entry) => resolve(dir, entry));
}

function allPages(): string[] {
  const fromTrees = TREES.flatMap((tree) =>
    getAllMdxFiles(resolve(ROOT, tree)),
  );
  const fromRoot = ROOT_PAGES.map((page) => resolve(ROOT, page)).filter(
    (page) => existsSync(page),
  );

  return [...fromTrees, ...fromRoot];
}

function frontmatterTitle(content: string): string | null {
  if (!content.startsWith("---")) return null;

  const end = content.indexOf("\n---", 3);
  if (end === -1) return null;

  const block = content.slice(3, end);

  for (const line of block.split("\n")) {
    const match = /^title:\s*(?:"([^"]*)"|'([^']*)'|(.+?))\s*$/.exec(line);
    if (match) return match[1] ?? match[2] ?? match[3] ?? null;
  }

  return null;
}

// A site path such as /docs/browsers resolves to a page file or a section index.
function pageExists(path: string): boolean {
  const base = resolve(ROOT, path.replace(/^\//, ""));

  return (
    existsSync(`${base}.mdx`) ||
    existsSync(`${base}.md`) ||
    existsSync(resolve(base, "index.mdx")) ||
    existsSync(resolve(base, "index.md"))
  );
}

function stripCodeAndComments(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
}

function internalLinks(content: string): string[] {
  const clean = stripCodeAndComments(content);
  const found: string[] = [];
  const re = /(?:\]\(|(?:href|src)=")(\/[^)"\s#]*)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(clean))) found.push(m[1]);

  return found;
}

const docsJson = JSON.parse(
  readFileSync(resolve(ROOT, "docs.json"), "utf-8"),
) as {
  redirects: { source: string; destination: string }[];
};

// Wildcard entries expand to an unbounded family, so only literal paths can be
// checked against files on disk.
const literalRedirects = docsJson.redirects.filter(
  (entry) => !entry.source.includes(":") && !entry.destination.includes(":"),
);

describe("Search result titles stay inside the snippet budget", () => {
  const pages = allPages();

  it("finds pages to check", () => {
    expect(pages.length).toBeGreaterThan(0);
  });

  const measured = pages.map((file) => {
    const title = frontmatterTitle(readFileSync(file, "utf-8"));
    const rendered = (title ?? "").length + TITLE_SUFFIX.length;

    return { file: file.replace(`${ROOT}/`, ""), title, rendered };
  });

  const overBudget = measured.filter(
    (page) => page.title !== null && page.rendered > TITLE_BUDGET,
  );
  const offenders = overBudget.filter(
    (page) => !TITLE_EXEMPTIONS.has(page.file),
  );

  it("every title fits once the site suffix is appended", () => {
    const report = offenders
      .map((page) => `${page.file}: ${page.rendered} chars ("${page.title}")`)
      .join("\n");
    expect(offenders, `over ${TITLE_BUDGET} chars:\n${report}`).toEqual([]);
  });

  // An exemption that no longer applies is worse than no exemption, because it
  // hides the next regression on that page.
  it("every exemption still names a page that needs one", () => {
    const stale = [...TITLE_EXEMPTIONS.keys()].filter(
      (file) => !overBudget.some((page) => page.file === file),
    );
    expect(
      stale,
      `drop these from TITLE_EXEMPTIONS, they now fit or no longer exist: ${stale.join(", ")}`,
    ).toEqual([]);
  });

  it("every page declares a title", () => {
    const untitled = pages
      .filter((file) => frontmatterTitle(readFileSync(file, "utf-8")) === null)
      .map((file) => file.replace(`${ROOT}/`, ""));
    expect(untitled, `no frontmatter title: ${untitled.join(", ")}`).toEqual(
      [],
    );
  });
});

describe("robots.txt stays valid for every crawler", () => {
  const lines = readFileSync(resolve(ROOT, "robots.txt"), "utf-8").split("\n");
  const directives = lines
    .map((line, index) => ({ line: line.trim(), number: index + 1 }))
    .filter((entry) => entry.line !== "" && !entry.line.startsWith("#"))
    .map((entry) => {
      const colon = entry.line.indexOf(":");

      return {
        number: entry.number,
        name: entry.line.slice(0, colon).trim().toLowerCase(),
        value: entry.line.slice(colon + 1).trim(),
        raw: entry.line,
      };
    });

  // Yandex rejects a rule whose value is not a path. This is the exact defect
  // that sat in robots.txt as "Allow: https://placehold.co/".
  it("every Allow and Disallow value is a path", () => {
    const bad = directives
      .filter((entry) => entry.name === "allow" || entry.name === "disallow")
      .filter((entry) => entry.value !== "" && !/^[/*]/.test(entry.value))
      .map((entry) => `line ${entry.number}: ${entry.raw}`);
    expect(bad, `a rule must start with / or *:\n${bad.join("\n")}`).toEqual(
      [],
    );
  });

  it("every rule sits inside a User-agent group", () => {
    const firstSitemap = directives.findIndex(
      (entry) => entry.name === "sitemap",
    );
    const orphans: string[] = [];
    let seenAgent = false;
    directives.forEach((entry, index) => {
      if (entry.name === "user-agent") seenAgent = true;
      if (entry.name !== "allow" && entry.name !== "disallow") return;

      const afterSitemap = firstSitemap !== -1 && index > firstSitemap;

      if (!seenAgent || afterSitemap) {
        orphans.push(`line ${entry.number}: ${entry.raw}`);
      }
    });

    expect(
      orphans,
      `a rule outside a group is ignored:\n${orphans.join("\n")}`,
    ).toEqual([]);
  });

  it("declares an absolute sitemap", () => {
    const sitemaps = directives.filter((entry) => entry.name === "sitemap");
    expect(sitemaps.length).toBeGreaterThan(0);

    for (const entry of sitemaps) {
      expect(entry.value, `${entry.raw} is not absolute`).toMatch(
        /^https:\/\//,
      );
    }
  });
});

describe("Redirects point somewhere real", () => {
  it("no redirect shadows a page that still exists", () => {
    const shadowed = literalRedirects
      .filter((entry) => pageExists(entry.source))
      .map((entry) => `${entry.source} still exists on disk`);
    expect(shadowed, shadowed.join("\n")).toEqual([]);
  });

  it("every literal destination resolves to a page", () => {
    const sources = new Set(docsJson.redirects.map((entry) => entry.source));
    const dangling = literalRedirects
      .filter(
        (entry) =>
          !pageExists(entry.destination) && !sources.has(entry.destination),
      )
      .map((entry) => `${entry.source} -> ${entry.destination}`);
    expect(dangling, `destination missing:\n${dangling.join("\n")}`).toEqual(
      [],
    );
  });
});

describe("Pages link to pages, never to a redirect", () => {
  const sources = new Set(literalRedirects.map((entry) => entry.source));

  it("has redirects to check against", () => {
    expect(sources.size).toBeGreaterThan(0);
  });

  it("no internal link lands on a redirect source", () => {
    const leaning: string[] = [];

    for (const file of allPages()) {
      const relPath = file.replace(`${ROOT}/`, "");

      for (const link of internalLinks(readFileSync(file, "utf-8"))) {
        if (sources.has(link)) leaning.push(`${relPath} -> ${link}`);
      }
    }

    expect(
      leaning,
      `link the destination directly:\n${leaning.join("\n")}`,
    ).toEqual([]);
  });
});
