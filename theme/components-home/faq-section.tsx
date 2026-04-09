'use client'

import {motion, useReducedMotion} from 'framer-motion'
import {ArrowRight, ChevronRight} from 'lucide-react'
import {useState} from 'react'

import HomepageSection from './homepage-section'
import HomepageSectionHeader from './homepage-section-header'
import {homepageEase} from './homepage-motion-reveal'

const faqItems = [
  {
    question: 'How does Extension.js handle hot reload during development?',
    answer: [
      'Run npx extension dev and the CLI watches your project for changes. Edits to popups, content scripts, background service workers, and options pages trigger the fastest safe update path available—HMR when the browser platform supports it, targeted reloads when it does not.',
      'You stay in the editor and the browser instead of restarting manually or maintaining custom reload scripts. The CLI resolves common pain points like stale service workers and missed content-script updates automatically.'
    ]
  },
  {
    question: 'How do I build one extension for Chrome, Edge, and Firefox?',
    answer: [
      'Extension.js compiles a single codebase into browser-specific output. One set of commands produces correctly packaged builds for Chrome, Edge, Firefox, and other Chromium-based browsers, each with the right manifest format, paths, and platform adjustments.',
      'This eliminates the need for parallel project trees or fragile shell scripts per browser. Your CI pipeline uses the same build step with different browser flags, reducing drift between store submissions.'
    ]
  },
  {
    question:
      'Can I use React, Vue, Svelte, or TypeScript to build browser extensions?',
    answer: [
      'Yes. Extension.js ships production-ready templates for React, Vue, Svelte, TypeScript, and plain JavaScript. You write components and UI the same way you would in any frontend project—the CLI handles the extension-specific compilation, manifest wiring, and browser packaging.',
      'Framework choice does not affect the core workflow. Create, develop, build, and package commands work identically regardless of your UI stack.'
    ]
  },
  {
    question: 'Does Extension.js support Manifest V3?',
    answer: [
      'Yes. The toolchain is built around Manifest V3 and the constraints that browser stores enforce today—service workers, declarative APIs, updated permissions, and stricter packaging rules. MV3 is the default, not an afterthought.',
      'Extension.js surfaces manifest issues during development so problems appear before store submission, not after. You keep full control over permissions, host access, and content security policies.'
    ]
  },
  {
    question: 'How do I migrate from a custom webpack or Vite extension setup?',
    answer: [
      'Extension.js replaces the extension-specific glue code in hand-rolled bundler configs: manifest versioning, multi-browser output, content-script injection boundaries, and reload orchestration. You move your source files and manifest into an Extension.js project and the CLI handles the rest.',
      'Your existing React, Vue, Svelte, or TypeScript code works without rewriting. The migration removes maintenance overhead around build tooling while preserving the UI patterns your team already uses.'
    ]
  },
  {
    question:
      'Does Extension.js work with monorepos and environment variables?',
    answer: [
      'Extension.js supports pnpm, npm, and Yarn workspaces in monorepo setups. Path resolution and shared dependencies work correctly across workspace boundaries, so you know exactly which files end up in the shipped extension package.',
      'Environment variables are injected per browser and build mode, with replacement applied across JavaScript, JSON, and HTML. Values stay scoped to the right surface—development secrets never leak into production bundles.'
    ]
  }
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(0)
  const reduce = useReducedMotion()

  const listVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.06,
        delayChildren: reduce ? 0 : 0.04
      }
    }
  }

  const rowVariants = {
    hidden: reduce ? {opacity: 1, y: 0} : {opacity: 0, y: 36},
    show: {
      opacity: 1,
      y: 0,
      transition: {duration: reduce ? 0 : 0.6, ease: homepageEase}
    }
  }

  const headerMotion = reduce
    ? {}
    : {
        initial: {opacity: 0, y: 32} as const,
        whileInView: {opacity: 1, y: 0} as const,
        viewport: {once: true, margin: '-40px'},
        transition: {duration: 0.65, ease: homepageEase}
      }

  return (
    <HomepageSection
      className="overflow-hidden"
      id="faq"
      contentClassName="max-w-4xl"
    >
      <motion.div {...headerMotion}>
        <HomepageSectionHeader
          className="mb-10"
          title={
            <>
              Developer <span className="text-primary">FAQ</span>
            </>
          }
          description="Common questions about building browser extensions with Extension.js—from hot reload and cross-browser builds to Manifest V3, frameworks, and monorepo support."
        />
      </motion.div>

      <motion.div
        className="space-y-3"
        variants={listVariants}
        initial={reduce ? 'show' : 'hidden'}
        whileInView={reduce ? undefined : 'show'}
        viewport={{once: true, margin: '-50px', amount: 0.08}}
      >
        {faqItems.map((item, index) => (
          <motion.div
            key={item.question}
            layout={!reduce}
            variants={rowVariants}
            transition={{
              layout: {duration: reduce ? 0 : 0.35, ease: homepageEase}
            }}
            className="group overflow-hidden rounded-2xl border border-[color:var(--rp-c-divider-light)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
          >
            <button
              type="button"
              onClick={() =>
                setOpenIndex((current) => (current === index ? -1 : index))
              }
              className="flex w-full items-start gap-4 px-4 py-4 text-left sm:px-5"
            >
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-xl border border-[color:var(--rp-c-divider-light)] bg-[color:var(--rp-c-bg-soft)] text-xs font-semibold text-[color:var(--rp-c-text-2)]">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-medium text-foreground sm:text-[17px]">
                  {item.question}
                </span>
              </span>
              <span className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[color:var(--rp-c-divider-light)] bg-[color:var(--rp-c-bg-soft)] text-[color:var(--rp-c-text-2)] transition-transform duration-200">
                <ChevronRight
                  className={
                    openIndex === index ? 'h-4 w-4 rotate-90' : 'h-4 w-4'
                  }
                />
              </span>
            </button>

            <div
              className={
                openIndex === index
                  ? 'grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out'
                  : 'grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out'
              }
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                  <div className="ms-12 rounded-2xl bg-muted/10 px-4 py-4">
                    <div className="space-y-3">
                      {item.answer.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-sm leading-7 text-foreground sm:text-[15px]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-10 flex justify-center"
        initial={reduce ? false : {opacity: 0, y: 20}}
        whileInView={reduce ? undefined : {opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.5, delay: 0.08, ease: homepageEase}}
      >
        <a
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          href="https://github.com/orgs/extension-js/discussions/new?category=q-a"
          rel="noreferrer"
          target="_blank"
        >
          Ask a new question on GitHub Q&A
          <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    </HomepageSection>
  )
}
