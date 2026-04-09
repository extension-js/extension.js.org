'use client'

import {motion, useReducedMotion} from 'framer-motion'
import {ArrowRight} from 'lucide-react'

import {Button} from '../components/ui/button'
import {cn} from '../lib/utils'
import HomepageSection from './homepage-section'
import HomepageSectionHeader from './homepage-section-header'
import {coreFeatures, CoreFeatureCard} from './core-features-section-content'
import {homepageEase} from './homepage-motion-reveal'

/**
 * lg: 3×3 grid via template areas so wide cards span **columns** (not rows):
 *
 *   [0      ][0][1]
 *   [2][3      ][3]
 *   [4      ][4][5]
 */
const CORE_FEATURE_GRID_PLACEMENT = [
  {featureIndex: 0, className: 'lg:[grid-area:a]'},
  {featureIndex: 1, className: 'lg:[grid-area:b]'},
  {featureIndex: 2, className: 'lg:[grid-area:c]'},
  {featureIndex: 3, className: 'lg:[grid-area:d]'},
  {featureIndex: 4, className: 'lg:[grid-area:e]'},
  {featureIndex: 5, className: 'lg:[grid-area:f]'}
] as const

export default function CoreFeaturesSection() {
  const reduce = useReducedMotion()

  const gridVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.07,
        delayChildren: reduce ? 0 : 0.05
      }
    }
  }

  const cardVariants = {
    hidden: reduce
      ? {opacity: 1, y: 0, scale: 1}
      : {opacity: 0, y: 48, scale: 0.96},
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {duration: reduce ? 0 : 0.68, ease: homepageEase}
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
      contentClassName="max-w-6xl"
      id="core-features"
    >
      <motion.div className="mx-auto mb-10 w-full max-w-3xl" {...headerMotion}>
        <HomepageSectionHeader
          title={
            <>
              Core features for the{' '}
              <span className="text-primary">full extension lifecycle</span>
            </>
          }
          description="Build, test, and ship for every browser with one modern extension workflow."
        />
      </motion.div>

      <motion.div
        className={cn(
          'grid grid-cols-1 gap-3',
          'lg:grid-cols-3 lg:gap-4',
          "lg:[grid-template-areas:'a_a_b'_'c_d_d'_'e_e_f']"
        )}
        variants={gridVariants}
        initial={reduce ? 'show' : 'hidden'}
        whileInView={reduce ? undefined : 'show'}
        viewport={{once: true, margin: '-60px', amount: 0.08}}
      >
        {CORE_FEATURE_GRID_PLACEMENT.map(({featureIndex, className}) => {
          const feature = coreFeatures[featureIndex]
          return (
            <motion.div
              key={feature.title}
              className={cn('min-h-0', className)}
              variants={cardVariants}
            >
              <CoreFeatureCard {...feature} />
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        className="mt-10 flex justify-center"
        initial={reduce ? false : {opacity: 0, y: 24}}
        whileInView={reduce ? undefined : {opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.55, delay: 0.12, ease: homepageEase}}
      >
        <Button asChild size="lg" className="gap-2">
          <a href="/docs/features">
            Explore all features
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </motion.div>
    </HomepageSection>
  )
}
