import {describe, it, expect} from 'vitest'
import {readFileSync, existsSync} from 'node:fs'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DOCS_DIR = resolve(__dirname, '..', 'docs')
const MONOREPO_ROOT = resolve(__dirname, '..', '..', '..')
const COMMANDS_DIR = resolve(MONOREPO_ROOT, 'programs', 'extension', 'commands')
const CLI_INDEX = resolve(MONOREPO_ROOT, 'programs', 'extension', 'index.ts')
const HAS_MONOREPO = existsSync(COMMANDS_DIR)

interface CommandMapping {
  doc: string
  source: string
  /** For files that define multiple commands (e.g. install.ts has install + uninstall) */
  commandBoundary?: string
}

const COMMAND_MAP: Record<string, CommandMapping> = {
  create: {doc: 'commands/create.mdx', source: 'create.ts'},
  dev: {doc: 'commands/dev.mdx', source: 'dev.ts'},
  build: {doc: 'commands/build.mdx', source: 'build.ts'},
  start: {doc: 'commands/start.mdx', source: 'start.ts'},
  preview: {doc: 'commands/preview.mdx', source: 'preview.ts'},
  install: {
    doc: 'commands/install.mdx',
    source: 'install.ts',
    commandBoundary: "command('install')"
  },
  uninstall: {
    doc: 'commands/uninstall.mdx',
    source: 'install.ts',
    commandBoundary: "command('uninstall')"
  }
}

/**
 * Extract --flag-name patterns from markdown table rows.
 * Only matches flags inside backticks within table rows.
 */
function extractDocFlags(content: string): Set<string> {
  const flags = new Set<string>()
  const lines = content.split('\n')
  for (const line of lines) {
    if (!line.trim().startsWith('|')) continue
    // Skip separator rows
    if (/^\|[\s-|]+$/.test(line.trim())) continue
    const re = /`(--[\w-]+)/g
    let m
    while ((m = re.exec(line))) {
      flags.add(m[1])
    }
  }
  return flags
}

/**
 * Extract the source section for a specific command when multiple
 * commands are defined in the same file.
 */
function extractCommandSection(content: string, boundary: string): string {
  const idx = content.indexOf(boundary)
  if (idx === -1) return content

  // Find the next command boundary or end of file
  const rest = content.slice(idx + boundary.length)
  const nextCommand = rest.search(/\.command\(/)
  if (nextCommand === -1) return content.slice(idx)
  return content.slice(idx, idx + boundary.length + nextCommand)
}

/**
 * Check if a flag exists in the source content.
 * Searches .option() calls and .addHelpText() strings.
 */
function sourceContainsFlag(source: string, flag: string): boolean {
  return source.includes(flag)
}

describe('CLI command flags match source', () => {
  it.skipIf(!HAS_MONOREPO)('source directory should exist', () => {
    expect(
      existsSync(COMMANDS_DIR),
      `Commands directory not found at ${COMMANDS_DIR}`
    ).toBe(true)
  })

  for (const [command, mapping] of Object.entries(COMMAND_MAP)) {
    describe(`${command} command`, () => {
      const docPath = resolve(DOCS_DIR, mapping.doc)
      const sourcePath = resolve(COMMANDS_DIR, mapping.source)

      it('doc file exists', () => {
        expect(existsSync(docPath), `${mapping.doc} not found`).toBe(true)
      })

      it.skipIf(!HAS_MONOREPO)('source file exists', () => {
        expect(existsSync(sourcePath), `${mapping.source} not found`).toBe(true)
      })

      // Only run flag checks if both files exist
      if (existsSync(docPath) && existsSync(sourcePath)) {
        const docContent = readFileSync(docPath, 'utf-8')
        const docFlags = extractDocFlags(docContent)

        let sourceContent = readFileSync(sourcePath, 'utf-8')
        if (mapping.commandBoundary) {
          sourceContent = extractCommandSection(
            sourceContent,
            mapping.commandBoundary
          )
        }

        for (const flag of docFlags) {
          it(`documented flag ${flag} exists in source`, () => {
            expect(
              sourceContainsFlag(sourceContent, flag),
              `Flag "${flag}" is documented in ${mapping.doc} but not found in ${mapping.source}`
            ).toBe(true)
          })
        }
      }
    })
  }

  describe('global flags', () => {
    const docPath = resolve(DOCS_DIR, 'workflows', 'global-flags.mdx')

    it('doc file exists', () => {
      expect(existsSync(docPath), 'global-flags.mdx not found').toBe(true)
    })

    it.skipIf(!HAS_MONOREPO)('CLI index file exists', () => {
      expect(
        existsSync(CLI_INDEX),
        'programs/extension/index.ts not found'
      ).toBe(true)
    })

    if (existsSync(docPath) && existsSync(CLI_INDEX)) {
      const docContent = readFileSync(docPath, 'utf-8')
      const sourceContent = readFileSync(CLI_INDEX, 'utf-8')
      const docFlags = extractDocFlags(docContent)

      for (const flag of docFlags) {
        it(`documented flag ${flag} exists in source`, () => {
          expect(
            sourceContent.includes(flag),
            `Global flag "${flag}" documented but not found in index.ts`
          ).toBe(true)
        })
      }
    }
  })
})
