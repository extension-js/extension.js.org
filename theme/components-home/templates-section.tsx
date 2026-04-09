'use client'

import {motion, useReducedMotion} from 'framer-motion'
import {ArrowRight} from 'lucide-react'
import {Button} from '../components/ui/button'
import {TemplateCardsGrid} from '../components/template-cards-grid'
import HomepageSection from './homepage-section'
import HomepageSectionHeader from './homepage-section-header'
import {homepageEase} from './homepage-motion-reveal'

export default function TemplatesSection() {
  const reduce = useReducedMotion()

  const headerMotion = reduce
    ? {}
    : {
        initial: {opacity: 0, y: 32} as const,
        whileInView: {opacity: 1, y: 0} as const,
        viewport: {once: true, margin: '-40px'},
        transition: {duration: 0.65, ease: homepageEase}
      }

  return (
    <HomepageSection className="overflow-hidden" id="templates">
      <div className="text-center">
        <motion.div
          className="mx-auto mb-10 w-full max-w-3xl"
          {...headerMotion}
        >
          <HomepageSectionHeader
            title={
              <>
                Pick your <span className="text-primary">framework</span>. Keep
                your workflow.
              </>
            }
            description="Start with production-ready templates for React, Vue, Svelte, TypeScript, or JavaScript."
          />
        </motion.div>

        <div className="mb-10 w-full">
          <TemplateCardsGrid />
        </div>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={reduce ? false : {opacity: 0, y: 24}}
          whileInView={reduce ? undefined : {opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.55, delay: 0.1, ease: homepageEase}}
        >
          <Button asChild className="w-full gap-2 sm:w-auto" size="lg">
            <a href="/docs/getting-started/templates">
              Browse templates
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </HomepageSection>
  )
}
