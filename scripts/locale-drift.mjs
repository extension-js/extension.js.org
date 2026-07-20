// Locale drift report for extension.js.org across en / zh-Hans / zh-Hant.
// Reports four independent kinds of drift:
//   1. file presence   - page exists in one locale but not another
//   2. nav presence    - page exists on disk but is absent from docs.json navigation
//   3. structure       - shared page has a different heading or code-block count
//   4. staleness       - English page was edited after its translation
import {readFileSync, readdirSync, statSync, existsSync} from 'node:fs'
import {execSync} from 'node:child_process'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const LOCALES = ['en', 'zh-Hans', 'zh-Hant']

// en lives at the repo root, the others under a locale directory.
const prefix = (loc) => (loc === 'en' ? '' : loc + '/')

function walk(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const e of readdirSync(dir, {withFileTypes: true})) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name.endsWith('.mdx')) out.push(p)
  }
  return out
}

// Collect the logical page key (locale-independent) for every file.
const files = {}
for (const loc of LOCALES) {
  const base = path.join(ROOT, prefix(loc))
  const roots = ['docs', 'blog'].map((d) => path.join(base, d))
  const list = roots.flatMap((r) => walk(r))
  if (existsSync(path.join(base, 'index.mdx'))) list.push(path.join(base, 'index.mdx'))
  files[loc] = new Map(
    list.map((f) => [path.relative(base, f).replace(/\\/g, '/'), f])
  )
}

// Flatten docs.json navigation into a set of page paths per language.
const docsJson = JSON.parse(readFileSync(path.join(ROOT, 'docs.json'), 'utf8'))
const navPages = {}
for (const langBlock of docsJson.navigation.languages) {
  const pages = new Set()
  const visit = (node) => {
    if (typeof node === 'string') return pages.add(node)
    if (Array.isArray(node)) return node.forEach(visit)
    if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) {
        if (k === 'language') continue
        visit(v)
      }
    }
  }
  visit(langBlock)
  navPages[langBlock.language] = pages
}

const gitTime = (abs) => {
  try {
    const rel = path.relative(ROOT, abs)
    const out = execSync(`git log -1 --format=%at -- "${rel}"`, {cwd: ROOT}).toString().trim()
    return out ? parseInt(out, 10) : 0
  } catch {
    return 0
  }
}

const structure = (abs) => {
  const src = readFileSync(abs, 'utf8')
  const body = src.replace(/^---\n[\s\S]*?\n---\n/, '')
  return {
    headings: (body.match(/^#{1,6}\s/gm) || []).length,
    code: (body.match(/^```/gm) || []).length / 2,
  }
}

const report = {missingPages: [], navGaps: [], structureDrift: [], stale: []}

// 1. file presence, keyed off the English tree
const enKeys = [...files.en.keys()].sort()
for (const key of enKeys) {
  for (const loc of ['zh-Hans', 'zh-Hant']) {
    if (!files[loc].has(key)) report.missingPages.push({key, missingIn: loc})
  }
}
// pages that exist only in a translated tree
for (const loc of ['zh-Hans', 'zh-Hant']) {
  for (const key of files[loc].keys()) {
    if (!files.en.has(key)) report.missingPages.push({key, missingIn: 'en', orphanFrom: loc})
  }
}

// 2. nav gaps: on disk but not in that locale's navigation
for (const loc of LOCALES) {
  const nav = navPages[loc] || new Set()
  for (const key of files[loc].keys()) {
    if (key === 'index.mdx' || key.startsWith('blog/')) continue
    const navKey = (prefix(loc) + key).replace(/\.mdx$/, '')
    if (!nav.has(navKey)) report.navGaps.push({locale: loc, page: navKey})
  }
}

// 3 + 4. structure and staleness for pages present in all three
for (const key of enKeys) {
  if (!files['zh-Hans'].has(key) || !files['zh-Hant'].has(key)) continue
  const en = files.en.get(key)
  const s = {en: structure(en)}
  const t = {en: gitTime(en)}
  for (const loc of ['zh-Hans', 'zh-Hant']) {
    s[loc] = structure(files[loc].get(key))
    t[loc] = gitTime(files[loc].get(key))
  }
  for (const loc of ['zh-Hans', 'zh-Hant']) {
    if (s[loc].headings !== s.en.headings || s[loc].code !== s.en.code) {
      report.structureDrift.push({
        page: key,
        locale: loc,
        en: s.en,
        loc: s[loc],
        headingDelta: s[loc].headings - s.en.headings,
        codeDelta: s[loc].code - s.en.code,
      })
    }
    // more than a day behind means the English edit was not mirrored in the same commit
    if (t.en - t[loc] > 86400) {
      report.stale.push({
        page: key,
        locale: loc,
        daysBehind: Math.round((t.en - t[loc]) / 86400),
      })
    }
  }
}

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(report, null, 2))
  process.exit(0)
}

const h = (s) => console.log('\n' + s + '\n' + '-'.repeat(s.length))

h(`Missing pages (${report.missingPages.length})`)
for (const m of report.missingPages) {
  console.log(`  absent from ${m.locale ?? m.missingIn}: ${m.key}`)
}

h(`Section drift (${report.structureDrift.length})`)
const worst = [...report.structureDrift].sort(
  (a, b) => Math.abs(b.headingDelta) - Math.abs(a.headingDelta)
)
for (const d of worst.slice(0, 15)) {
  console.log(
    `  ${d.locale.padEnd(8)} ${String(d.headingDelta).padStart(3)} headings ` +
      `${String(d.codeDelta).padStart(3)} code blocks  ${d.page}`
  )
}
if (worst.length > 15) console.log(`  ...and ${worst.length - 15} more`)

h(`Stale translations (${report.stale.length})`)
const byPage = {}
for (const s of report.stale) byPage[s.page] = Math.max(byPage[s.page] ?? 0, s.daysBehind)
for (const [page, days] of Object.entries(byPage).sort((a, b) => b[1] - a[1]).slice(0, 15)) {
  console.log(`  ${String(days).padStart(4)} days behind  ${page}`)
}

h('Navigation')
console.log(`  entries in docs.json with no file on disk: ${report.navGaps.length}`)
