import {Badge} from '../../components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from '../../components/ui/card'

const featureItems = [
  {
    title: 'Cross-browser by default',
    description:
      'Build once and run across Chrome, Edge, Firefox, and custom browser binaries.'
  },
  {
    title: 'Extension-specific workflows',
    description:
      'Handle manifest compilation, browser flags, profiles, and runtime reload behavior from one CLI.'
  },
  {
    title: 'Framework-friendly stack',
    description:
      'Use TypeScript, React, Vue, Preact, Tailwind, PostCSS, and other tooling without manual bundler wiring.'
  },
  {
    title: 'Template-first onboarding',
    description:
      'Start from proven templates for popup, new tab, sidebar, and content script experiences.'
  },
  {
    title: 'Built for AI-assisted coding',
    description:
      'Keep predictable project structure and command flows that AI tools can safely scaffold and extend.'
  },
  {
    title: 'Release confidence',
    description:
      'Ship with workflow docs for troubleshooting, security, performance, and Playwright E2E.'
  }
]

const testimonials = [
  {
    name: 'AI-assisted builders',
    role: 'Fast iteration',
    quote:
      '"The command flow is predictable, so I can generate features with AI and validate quickly."'
  },
  {
    name: 'Web developers',
    role: 'New to extensions',
    quote:
      '"It feels familiar if you know modern web tooling, while still covering extension-specific needs."'
  },
  {
    name: 'Extension teams',
    role: 'Shipping to multiple stores',
    quote:
      '"We keep one project and produce browser-specific outputs without maintaining separate pipelines."'
  }
]

const faqItems = [
  {
    question: 'Do I need prior extension experience?',
    answer:
      'No. The docs cover extension fundamentals and practical workflows from first project to production.'
  },
  {
    question: 'Can I use React, Vue, or TypeScript?',
    answer:
      'Yes. Extension.js supports modern frameworks and tooling with templates and integration guides.'
  },
  {
    question: 'How do I test across browsers?',
    answer:
      'Use the same commands with explicit browser targets such as `--browser=chrome,firefox` for validation.'
  },
  {
    question: 'Is Extension.js open source?',
    answer:
      'Yes. Extension.js is open source and maintained in public on GitHub.'
  }
]

const LandingPage = () => {
  return (
    <main className="w-full bg-[#020b22] text-slate-100">
      <div className="mx-auto max-w-6xl px-6">
        <header className="flex h-16 items-center justify-between border-b border-white/10">
          <a
            className="text-sm font-semibold tracking-wide text-slate-100"
            href="/"
          >
            extension.js
          </a>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a
              href="#testimonials"
              className="hover:text-white transition-colors"
            >
              Users
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>
        </header>

        <section className="mx-auto max-w-3xl py-20 text-center">
          <Badge
            variant="secondary"
            className="mb-6 border border-blue-300/30 bg-blue-500/10 text-blue-100"
          >
            Browser extension developer platform
          </Badge>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Build browser extensions with modern web tooling
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm text-slate-300 sm:text-base">
            Extension.js helps vibe coders, web developers, and extension teams
            ship to Chrome, Edge, and Firefox from one codebase and one command
            surface.
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

          <div className="mt-14">
            <p className="text-sm font-semibold text-slate-300">
              Built with modern tools
            </p>
            <div className="mx-auto mt-5 grid max-w-md grid-cols-5 gap-3 text-xs">
              {['TypeScript', 'React', 'Vue', 'Rspack', 'Tailwind'].map(
                (tool) => (
                  <div
                    key={tool}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-2 text-slate-200"
                  >
                    {tool}
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section id="features" className="pb-12">
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8">
            <h2 className="text-center text-3xl font-bold text-white">
              Features
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-300">
              Build extension workflows that scale from first prototype to
              store-ready artifact.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featureItems.map((feature) => (
                <Card
                  key={feature.title}
                  className="border-white/10 bg-slate-950/40 shadow-none"
                >
                  <CardContent className="space-y-2 p-5">
                    <CardTitle className="text-base text-white">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20">
          <h2 className="text-center text-3xl font-bold text-white">
            Built for real developer workflows
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.name}
                className="border-white/10 bg-slate-950/40 shadow-none"
              >
                <CardContent className="space-y-3 p-5">
                  <div>
                    <p className="font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-slate-400">{testimonial.role}</p>
                  </div>
                  <p className="text-sm italic text-slate-300">
                    {testimonial.quote}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-3xl py-8">
          <h2 className="text-center text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>

          <div className="mt-8 divide-y divide-white/10 rounded-xl border border-white/10 bg-slate-950/40">
            {faqItems.map((item) => (
              <details key={item.question} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-medium text-slate-100">
                  {item.question}
                  <span className="text-slate-400 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-4 text-sm text-slate-300">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="py-20 text-center">
          <h2 className="text-4xl font-bold text-white">Proudly Open Source</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
            Extension.js is built in the open and maintained with feedback from
            extension developers shipping to multiple browsers.
          </p>
          <a
            href="https://github.com/extension-js/extension.js"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block text-sm text-slate-200 underline underline-offset-4 hover:text-white"
          >
            Star us on GitHub
          </a>
        </section>
      </div>
    </main>
  )
}

export default LandingPage
