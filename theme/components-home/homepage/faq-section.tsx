'use client'

import {ArrowRight, ChevronRight} from 'lucide-react'
import {useState} from 'react'

import HomepageSection from './homepage-section'
import HomepageSectionHeader from './homepage-section-header'

const faqItems = [
  {
    question: 'How quickly can I go from idea to a running extension?',
    answer: [
      'Most developers can scaffold and run a working extension in minutes. The create flow gives you a clear starting point, sensible defaults, and templates that are ready to open in your editor and load in the browser.',
      'That means less time assembling folders, manifests, and scripts by hand. You can start validating the product idea earlier, then iterate on the extension itself instead of the setup.'
    ]
  },
  {
    question: 'Can one project support Chrome, Edge, and Firefox?',
    answer: [
      'Yes. Extension.js is designed for cross-browser development, so one project can produce browser-aware output for Chrome, Edge, and Firefox without splitting your codebase into separate apps.',
      'The workflow stays consistent while the build output adapts to each target. That keeps local testing simpler, reduces drift between browsers, and makes release management easier over time.'
    ]
  },
  {
    question: 'Do I need to leave behind my current web stack?',
    answer: [
      'No. You can keep a familiar stack and start with React, Vue, Svelte, TypeScript, or JavaScript templates. The goal is to let teams move into extension development without relearning everything around the UI layer.',
      'That makes adoption much smoother for product teams and agencies already shipping on the web. You keep the tools and patterns you know, while Extension.js handles the extension-specific workflow around them.'
    ]
  },
  {
    question: 'Is Extension.js a good fit for production teams?',
    answer: [
      'Yes. Teams use Extension.js to standardize how they build, test, preview, and release browser extensions. It helps make the workflow more repeatable without forcing a heavy platform layer on top of the project.',
      'That matters as a codebase grows and more contributors get involved. Clear output, predictable commands, and maintainable structure make it easier to move from experimentation to a production process.'
    ]
  },
  {
    question: 'What is the best place to start in the docs?',
    answer: [
      'Start with Getting Started, then move into the first-extension guide for the quickest path to a working project. That sequence gives you enough context to understand the workflow without asking you to read everything upfront.',
      'After that, use the template guides and feature pages based on the stack you want to ship with. The docs are easiest to navigate when you begin with the core flow, then branch into the details that match your project.'
    ]
  }
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <HomepageSection
      className="overflow-hidden"
      id="faq"
      contentClassName="max-w-4xl"
    >
      <HomepageSectionHeader
        className="mb-10"
        title={
          <>
            Developer <span className="text-primary">FAQ</span>
          </>
        }
        description="Practical answers for setup, cross-browser support, and production delivery."
      />

      <div className="space-y-3">
        {faqItems.map((item, index) => (
          <div
            key={item.question}
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
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <a
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          href="https://github.com/orgs/extension-js/discussions/new?category=q-a"
          rel="noreferrer"
          target="_blank"
        >
          Ask a new question on GitHub Q&A
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </HomepageSection>
  )
}
