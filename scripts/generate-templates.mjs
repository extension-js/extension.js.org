import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SNIPPET = path.join(ROOT, "snippets", "templates.jsx");
const CATALOG_URL =
  "https://raw.githubusercontent.com/extension-js/templates/main/templates-meta.json";
const START = "// @generated:start";
const END = "// @generated:end";

// Pass a local templates-meta.json path to skip the network.
async function loadCatalog(localPath) {
  if (localPath) return JSON.parse(readFileSync(localPath, "utf8"));

  const res = await fetch(CATALOG_URL, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`catalog fetch failed: HTTP ${res.status}`);

  return res.json();
}

// The catalog lists Chrome, Edge and Firefox only. Safari is added here
// so the page shows it next to them.
const withSafari = (browsers) =>
  browsers.includes("safari") ? browsers : [...browsers, "safari"];

function toEntry(template) {
  const base = `examples/${template.slug}/`;
  const strip = (file) => (file ? file.replace(base, "") : null);

  return {
    slug: template.slug,
    title: template.title || template.name,
    description: template.description,
    surfaces: template.surfaces,
    framework: template.uiFramework || null,
    css: template.css,
    browsers: withSafari(template.browsers || []),
    featured: template.featured,
    difficulty: template.difficulty || null,
    tags: template.tags || [],
    icon: strip(template.icon),
    screenshot: strip(template.screenshot),
    video: template.video || null,
    docsUrl: template.docsUrl || null,
    firstSteps: template.firstSteps || [],
    useCases: template.useCases || [],
  };
}

const catalog = await loadCatalog(process.argv[2]);
const entries = catalog.templates.map(toEntry);
const source = readFileSync(SNIPPET, "utf8");
const start = source.indexOf(START);
const end = source.indexOf(END);

if (start === -1 || end === -1) {
  throw new Error(`markers not found in ${path.relative(ROOT, SNIPPET)}`);
}

const body = JSON.stringify(entries, null, 2);
const next =
  source.slice(0, start + START.length) +
  `\n  const templates = ${body};\n  ` +
  source.slice(end);

writeFileSync(SNIPPET, next);
console.log(`Wrote ${entries.length} templates to snippets/templates.jsx.`);
