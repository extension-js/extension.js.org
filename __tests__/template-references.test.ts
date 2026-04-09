import {describe, it, expect} from 'vitest'
import {readdirSync, readFileSync, existsSync} from 'node:fs'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DOCS_DIR = resolve(__dirname, '..', 'docs', 'en', 'docs')
const EXAMPLES_DIR = resolve(__dirname, '..', '..', 'examples')
const HAS_EXAMPLES = existsSync(EXAMPLES_DIR)

function getAllMdxFiles(dir: string): string[] {
  return readdirSync(dir, {recursive: true, encoding: 'utf-8'})
    .filter((entry) => entry.endsWith('.mdx'))
    .map((entry) => resolve(dir, entry))
}

function extractTemplateNames(content: string): Map<string, string[]> {
  const templates = new Map<string, string[]>()

  function add(name: string, source: string) {
    if (!templates.has(name)) templates.set(name, [])
    templates.get(name)!.push(source)
  }

  // From screenshot URLs
  const screenshotRe =
    /extension-js\/examples\/main\/public\/([\w-]+)\/screenshot\.png/g
  let m
  while ((m = screenshotRe.exec(content))) add(m[1], 'screenshot-url')

  // From repo URLs
  const repoRe = /extension-js\/examples\/tree\/main\/examples\/([\w-]+)/g
  while ((m = repoRe.exec(content))) add(m[1], 'repo-url')

  // From create commands: --template=name or --template name
  const templateRe = /--template[=\s]([\w-]+)/g
  while ((m = templateRe.exec(content))) add(m[1], 'create-command')

  return templates
}

describe('Template references', () => {
  const files = getAllMdxFiles(DOCS_DIR)

  it('should find docs files to test', () => {
    expect(files.length).toBeGreaterThan(0)
  })

  it.skipIf(!HAS_EXAMPLES)('examples directory should exist', () => {
    expect(
      existsSync(EXAMPLES_DIR),
      `Examples directory not found at ${EXAMPLES_DIR}`
    ).toBe(true)
  })

  const allTemplates = new Map<string, string[]>()
  for (const file of files) {
    const content = readFileSync(file, 'utf-8')
    const templates = extractTemplateNames(content)
    for (const [name, sources] of templates) {
      const relPath = file.replace(DOCS_DIR + '/', '')
      if (!allTemplates.has(name)) allTemplates.set(name, [])
      allTemplates.get(name)!.push(...sources.map((s) => `${relPath}:${s}`))
    }
  }

  for (const [name, sources] of allTemplates) {
    describe(`template "${name}"`, () => {
      it.skipIf(!HAS_EXAMPLES)('example directory exists', () => {
        const exampleDir = resolve(EXAMPLES_DIR, 'examples', name)
        expect(
          existsSync(exampleDir),
          `Template "${name}" directory not found at ${exampleDir} (referenced by ${sources[0]})`
        ).toBe(true)
      })

      if (sources.some((s) => s.includes('screenshot-url'))) {
        it.skipIf(!HAS_EXAMPLES)('screenshot file exists', () => {
          const screenshot = resolve(
            EXAMPLES_DIR,
            'public',
            name,
            'screenshot.png'
          )
          expect(
            existsSync(screenshot),
            `Screenshot for "${name}" not found at ${screenshot}`
          ).toBe(true)
        })
      }
    })
  }
})
