#!/usr/bin/env node
import {readFileSync, writeFileSync, statSync} from 'node:fs'
import {join, dirname, relative, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {execSync} from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const ICON_MAP = {
  extension: 'puzzle',
  stylelint: 'paint-roller',
  tailwindcss: 'wind',
  shadcnui: 'palette',
  babel: 'tower-broadcast',
  prettier: 'wand-magic-sparkles',
  postcss: 'droplet',
  eslint: 'shield-check',
  json: 'brackets-curly',
  javascript: 'js',
  background: 'layer-group',
  content: 'file-code',
  env: 'key',
  icons: 'icons',
  rocket: 'rocket',
  user: 'user',
  path: 'route',
  speed: 'gauge-high',
  fire: 'fire',
  first: 'flag-checkered',
  folder: 'folder-open',
  package: 'box'
}

const FILES = execSync(
  `find ${ROOT}/docs ${ROOT}/blog -type f \\( -name '*.mdx' -o -name '*.md' \\)`,
  {encoding: 'utf8'}
)
  .trim()
  .split('\n')
  .filter(Boolean)

const ALREADY_CONVERTED = new Set([
  `${ROOT}/docs/welcome.mdx`,
  `${ROOT}/docs/getting-started/index.mdx`,
  `${ROOT}/docs/commands/create.mdx`,
  `${ROOT}/docs/hall-of-fame.mdx`
])

function transform(source, filePath) {
  let text = source

  // Extract existing frontmatter (may be empty `---\n---`)
  let frontmatter = {}
  const fmMatch = text.match(/^---\n([\s\S]*?)\n---\n/)
  if (fmMatch) {
    const body = fmMatch[1].trim()
    if (body) {
      for (const line of body.split('\n')) {
        const m = line.match(/^(\w[\w-]*):\s*(.*)$/)
        if (m) frontmatter[m[1]] = m[2].trim()
      }
    }
    text = text.slice(fmMatch[0].length)
  }

  // Strip rspress imports
  text = text.replace(
    /^import\s*\{[^}]+\}\s*from\s*['"](@theme|.*theme\/components\/[^'"]+)['"]\s*\n/gm,
    ''
  )

  // Extract AvatarImage/AvatarEmoji usage (take icon/emoji as frontmatter icon)
  let detectedIcon = null
  text = text.replace(
    /<AvatarImage\s+icon=["']([^"']+)["']\s*\/>\s*\n?/g,
    (_, key) => {
      detectedIcon = ICON_MAP[key] || key
      return ''
    }
  )
  text = text.replace(
    /<AvatarEmoji\s+emoji=["']([^"']+)["']\s*\/>\s*\n?/g,
    (_, key) => {
      detectedIcon = ICON_MAP[key] || 'sparkles'
      return ''
    }
  )

  // Convert PackageManagerTabs to CodeGroup
  text = text.replace(
    /<PackageManagerTabs\s+command=\{\{\s*([\s\S]*?)\s*\}\}\s*\/>/g,
    (_, body) => {
      const npm = body.match(/npm:\s*['"]([^'"]+)['"]/)
      const pnpm = body.match(/pnpm:\s*['"]([^'"]+)['"]/)
      const yarn = body.match(/yarn:\s*['"]([^'"]+)['"]/)
      const bun = body.match(/bun:\s*['"]([^'"]+)['"]/)
      const parts = []
      if (npm) parts.push(`\`\`\`bash npm\n${npm[1]}\n\`\`\``)
      if (pnpm) parts.push(`\`\`\`bash pnpm\n${pnpm[1]}\n\`\`\``)
      if (yarn) parts.push(`\`\`\`bash yarn\n${yarn[1]}\n\`\`\``)
      if (bun) parts.push(`\`\`\`bash bun\n${bun[1]}\n\`\`\``)
      return `<CodeGroup>\n\n${parts.join('\n\n')}\n\n</CodeGroup>`
    }
  )

  // Extract H1 as title if no title in frontmatter
  if (!frontmatter.title) {
    const h1Match = text.match(/^\s*#\s+(.+?)\s*$/m)
    if (h1Match) {
      frontmatter.title = h1Match[1].replace(/^["']|["']$/g, '')
      text = text.replace(h1Match[0] + '\n?', '')
      text = text.replace(/^\s*#\s+.+\s*\n/m, '')
    } else {
      // For blog/index and similar, derive title from filename
      const base = filePath.split('/').pop().replace(/\.mdx?$/, '')
      frontmatter.title = base
        .split('-')
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(' ')
    }
  }

  if (!frontmatter.icon && detectedIcon) {
    frontmatter.icon = detectedIcon
  }

  // Rewrite relative links (./foo.mdx, ../bar/baz.md) to root-relative /docs/... or /blog/...
  const fileDir = dirname(filePath)
  text = text.replace(
    /\]\((\.\/|\.\.\/)([^)]+?)\.mdx?((?:#[^)]*)?)\)/g,
    (_, prefix, path, hash) => {
      const abs = resolve(fileDir, prefix + path)
      const rel = '/' + relative(ROOT, abs).replace(/\\/g, '/')
      return `](${rel}${hash || ''})`
    }
  )

  // Rewrite any leftover /docs/en/... or /blog/en/... to flat paths
  text = text.replace(/\/docs\/en\/docs\//g, '/docs/')
  text = text.replace(/\/docs\/en\/blog\//g, '/blog/')

  // Escape any lingering curly-brace JSX-like text that will confuse MDX:
  //   {/* comment */} is fine (MDX comment).

  // Serialize frontmatter
  const ordered = ['title', 'description', 'icon', 'sidebarTitle', 'tag']
  const fmLines = []
  for (const key of ordered) {
    if (frontmatter[key]) {
      const value = frontmatter[key]
      // Quote if not already quoted
      const needsQuotes = !/^["'].*["']$/.test(value)
      fmLines.push(`${key}: ${needsQuotes ? `"${value.replace(/"/g, '\\"')}"` : value}`)
    }
  }
  for (const key of Object.keys(frontmatter)) {
    if (!ordered.includes(key)) {
      const value = frontmatter[key]
      const needsQuotes = !/^["'].*["']$/.test(value)
      fmLines.push(`${key}: ${needsQuotes ? `"${value.replace(/"/g, '\\"')}"` : value}`)
    }
  }

  // Trim leading blank lines in body
  text = text.replace(/^\s*\n+/, '\n')

  return `---\n${fmLines.join('\n')}\n---\n${text}`
}

let changed = 0
let skipped = 0
for (const file of FILES) {
  if (ALREADY_CONVERTED.has(file)) {
    skipped++
    continue
  }
  const original = readFileSync(file, 'utf8')
  const converted = transform(original, file)
  if (converted !== original) {
    writeFileSync(file, converted)
    changed++
    console.log(`  converted ${relative(ROOT, file)}`)
  }
}

console.log(`\nDone: ${changed} files converted, ${skipped} already-converted skipped.`)
