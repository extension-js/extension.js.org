import type {BeforeSearch} from '@rspress/core/theme'

const SEARCH_ALIASES: Array<[RegExp, string]> = [
  [/\bmv3\b/gi, 'manifest v3 mv3'],
  [/\bwebextension\b/gi, 'browser extension webextension'],
  [/\bweb extension\b/gi, 'browser extension webextension'],
  [/\bff\b/gi, 'firefox ff'],
  [/\bfx\b/gi, 'firefox fx']
]

export const beforeSearch: BeforeSearch = async (query) => {
  const normalizedQuery = SEARCH_ALIASES.reduce(
    (currentQuery, [pattern, alias]) => {
      return currentQuery.replace(pattern, alias)
    },
    query
  )

  return normalizedQuery.trim().replace(/\s+/g, ' ')
}
