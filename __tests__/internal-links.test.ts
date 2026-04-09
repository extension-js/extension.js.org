import {describe, it, expect} from 'vitest'
import {readdirSync, readFileSync, existsSync} from 'node:fs'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DOCS_DIR = resolve(__dirname, '..', 'docs', 'en', 'docs')

function getAllMdxFiles(dir: string): string[] {
  return readdirSync(dir, {recursive: true, encoding: 'utf-8'})
    .filter((entry) => entry.endsWith('.mdx'))
    .map((entry) => resolve(dir, entry))
}

function stripCodeBlocks(content: string): string {
  return content.replace(/```[\s\S]*?```/g, '')
}

function stripJsxComments(content: string): string {
  return content.replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
}

function extractRelativeMdxLinks(content: string): string[] {
  const clean = stripJsxComments(stripCodeBlocks(content))
  const links: string[] = []
  const re = /\]\((\.[^)]+\.mdx)\)/g
  let m
  while ((m = re.exec(clean))) {
    links.push(m[1])
  }
  return links
}

function extractAbsoluteDocLinks(content: string): string[] {
  const clean = stripJsxComments(stripCodeBlocks(content))
  const links: string[] = []
  const re = /\]\((\/docs\/[^)#\s]+)\)/g
  let m
  while ((m = re.exec(clean))) {
    links.push(m[1])
  }
  return links
}

function resolveAbsoluteLink(link: string): string[] {
  // /docs/section/page -> try section/page.mdx, section/page/index.mdx
  const relative = link.replace(/^\/docs\//, '')
  return [
    resolve(DOCS_DIR, `${relative}.mdx`),
    resolve(DOCS_DIR, `${relative}.md`),
    resolve(DOCS_DIR, relative, 'index.mdx'),
    resolve(DOCS_DIR, relative, 'index.md')
  ]
}

describe('Internal MDX links', () => {
  const files = getAllMdxFiles(DOCS_DIR)

  it('should find docs files to test', () => {
    expect(files.length).toBeGreaterThan(0)
  })

  for (const file of files) {
    const relPath = file.replace(DOCS_DIR + '/', '')
    const content = readFileSync(file, 'utf-8')

    const relativeLinks = extractRelativeMdxLinks(content)
    for (const link of relativeLinks) {
      it(`${relPath}: relative link ${link} resolves`, () => {
        const target = resolve(dirname(file), link)
        expect(
          existsSync(target),
          `${link} not found (resolved to ${target})`
        ).toBe(true)
      })
    }

    const absoluteLinks = extractAbsoluteDocLinks(content)
    for (const link of absoluteLinks) {
      it(`${relPath}: absolute link ${link} resolves`, () => {
        const candidates = resolveAbsoluteLink(link)
        const found = candidates.some((c) => existsSync(c))
        expect(
          found,
          `${link} not found (tried ${candidates.join(', ')})`
        ).toBe(true)
      })
    }
  }
})
