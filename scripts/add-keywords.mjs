#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { globSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const STOPWORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "if",
  "of",
  "for",
  "to",
  "in",
  "on",
  "at",
  "by",
  "from",
  "with",
  "as",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "could",
  "should",
  "may",
  "might",
  "can",
  "you",
  "your",
  "we",
  "our",
  "it",
  "its",
  "this",
  "that",
  "these",
  "those",
  "how",
  "what",
  "when",
  "where",
  "why",
  "who",
  "which",
  "about",
  "into",
  "over",
  "under",
  "up",
  "down",
  "out",
  "off",
  "not",
  "no",
  "yes",
  "all",
  "any",
  "each",
  "some",
  "more",
  "most",
  "less",
  "than",
  "then",
  "so",
  "also",
  "just",
  "only",
  "very",
  "too",
  "here",
  "there",
  "use",
  "using",
  "make",
  "makes",
  "get",
  "gets",
  "one",
  "two",
  "run",
  "runs",
  "working",
  "works",
]);

// Words always worth keeping for SEO in this domain
const DOMAIN_ALWAYS = [
  "extension.js",
  "extensions",
  "chrome",
  "firefox",
  "edge",
  "browser",
  "manifest",
  "typescript",
  "javascript",
  "react",
  "vue",
  "svelte",
  "preact",
  "rspack",
  "hmr",
  "tailwindcss",
  "postcss",
  "eslint",
  "prettier",
  "stylelint",
  "playwright",
  "webassembly",
  "content script",
  "service worker",
  "side panel",
  "popup",
  "devtools",
];

function parseFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { frontmatter: null, body: src, fmRaw: "" };
  const fmRaw = m[0];
  const body = src.slice(m[0].length);
  const fm = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^["'](.*)["']$/, "$1");
  }
  return { frontmatter: fm, body, fmRaw };
}

function extractKeywords(fm, body, slug) {
  const pool = new Set();

  const title = (fm.title || "").toLowerCase();
  const description = (fm.description || "").toLowerCase();

  // Pull H2/H3 headings
  const headings = [...body.matchAll(/^##\s+(.+?)$|^###\s+(.+?)$/gm)]
    .map((m) => (m[1] || m[2]).toLowerCase())
    .slice(0, 6);

  // Domain keywords present in title + description + body
  const haystack = `${title} ${description} ${body.toLowerCase()}`;
  for (const term of DOMAIN_ALWAYS) {
    if (haystack.includes(term)) pool.add(term);
  }

  // Slug pieces
  for (const piece of slug.split("/")) {
    if (piece.length > 2) pool.add(piece.replace(/-/g, " "));
  }

  // Tokens from title (weighted high)
  for (const tok of title.split(/[\s.,?!:()\/]+/)) {
    const w = tok.replace(/[^\w-]/g, "");
    if (w.length > 2 && !STOPWORDS.has(w) && !/^\d+$/.test(w)) pool.add(w);
  }

  // Tokens from first two headings
  for (const h of headings.slice(0, 2)) {
    for (const tok of h.split(/[\s.,?!:()\/]+/)) {
      const w = tok.replace(/[^\w-]/g, "");
      if (w.length > 2 && !STOPWORDS.has(w) && !/^\d+$/.test(w)) pool.add(w);
    }
  }

  return [...pool].slice(0, 8);
}

function serializeKeywords(list) {
  return `[${list.map((k) => `"${k}"`).join(", ")}]`;
}

function processFile(path) {
  const src = readFileSync(path, "utf8");
  const { frontmatter, body, fmRaw } = parseFrontmatter(src);
  if (!frontmatter) return false;
  if (frontmatter.keywords) return false; // already has keywords

  const slug = path
    .replace(`${ROOT}/`, "")
    .replace(/\.mdx$/, "")
    .replace(/\/index$/, "");

  const keywords = extractKeywords(frontmatter, body, slug);
  if (keywords.length === 0) return false;

  // Insert keywords before closing ---
  const newFm = fmRaw.replace(
    /\n---\n?$/,
    `\nkeywords: ${serializeKeywords(keywords)}\n---\n`,
  );
  const out = newFm + body;
  writeFileSync(path, out);
  return true;
}

const files = globSync(`${ROOT}/{docs,blog}/**/*.mdx`);
let touched = 0;
for (const f of files) {
  if (processFile(f)) touched++;
}
console.log(`added keywords to ${touched}/${files.length} files`);
