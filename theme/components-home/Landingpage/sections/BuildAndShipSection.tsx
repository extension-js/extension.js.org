import {Badge} from '../../../components/ui/badge'
import {sectionTitleClass} from './content'

export function BuildAndShipSection() {
  return (
    <section className="mx-auto max-w-3xl py-20 text-center">
      <Badge
        variant="secondary"
        className="mb-6 border border-blue-300/30 bg-blue-500/10 text-blue-100"
      >
        Browser extension developer platform
      </Badge>

      <h1 className={sectionTitleClass}>Build and ship with open source tooling</h1>

      <p className="mx-auto mt-6 max-w-xl text-sm text-slate-300 sm:text-base">
        Extension.js helps vibe coders, web developers, and extension teams ship to Chrome,
        Edge, and Firefox from one codebase and one command surface.
      </p>

      <div className="mt-8 flex items-center justify-center gap-3">
        <a
          href="/docs/welcome"
          className="inline-flex h-10 items-center rounded-md bg-white px-4 text-sm font-medium text-slate-900 hover:bg-slate-100"
        >
          Read docs
        </a>
        <a
          href="/docs/getting-started/create-your-first-extension"
          className="border-slate-500 bg-transparent text-slate-100 hover:bg-slate-800"
        >
          <span className="inline-flex h-10 items-center rounded-md border px-4 text-sm font-medium">
            Build your first extension
          </span>
        </a>
        <a
          href="https://github.com/extension-js/extension.js"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 items-center rounded-md border border-slate-500 bg-transparent px-4 text-sm font-medium text-slate-100 hover:bg-slate-800"
        >
          GitHub
        </a>
      </div>
    </section>
  )
}
