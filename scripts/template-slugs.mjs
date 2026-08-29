// Template slug guard for extension.js.org.
// Every --template=<slug> in the docs must name a real template in the
// extension-js/examples repository, otherwise copy-paste commands fail.
// The catalog comes from the GitHub API, with a committed fallback list.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const CATALOG_URL =
  "https://api.github.com/repos/extension-js/examples/contents/examples";
const FALLBACK = path.join(ROOT, "scripts", "template-catalog.json");
const SKIP_DIRS = new Set(["node_modules", ".git", ".github", "docs-review"]);

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.mdx?$/.test(e.name)) out.push(p);
  }
  return out;
}

// Prefer the live listing so newly published templates pass immediately.
// Any network or rate-limit failure falls back to the committed list.
async function loadCatalog() {
  try {
    const res = await fetch(CATALOG_URL, {
      headers: { accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const entries = await res.json();
    const dirs = entries.filter((e) => e.type === "dir").map((e) => e.name);
    if (dirs.length > 0) return { slugs: new Set(dirs), source: "github" };
    throw new Error("empty listing");
  } catch (err) {
    const list = JSON.parse(readFileSync(FALLBACK, "utf8"));
    console.warn(
      `note: GitHub catalog unavailable (${err.message}), using fallback list`,
    );
    return { slugs: new Set(list), source: "fallback" };
  }
}

const { slugs, source } = await loadCatalog();
const problems = [];

for (const file of walk(ROOT)) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const m of line.matchAll(/--template[= ]([A-Za-z0-9._:/-]+)/g)) {
      // The flag also accepts GitHub and ZIP URLs, which are not slugs.
      if (m[1].includes("://")) continue;
      if (!slugs.has(m[1])) {
        const rel = path.relative(ROOT, file);
        problems.push(`${rel}:${i + 1}: unknown template slug "${m[1]}"`);
      }
    }
  });
}

if (!existsSync(FALLBACK)) {
  problems.push("scripts/template-catalog.json is missing");
}

if (problems.length > 0) {
  console.error(`Template slug check failed (catalog: ${source}):`);
  for (const p of problems) console.error("  " + p);
  console.error(
    "Fix the slug or update the template in extension-js/examples first.",
  );
  process.exit(1);
}

console.log(`Template slug check passed (catalog: ${source}).`);
