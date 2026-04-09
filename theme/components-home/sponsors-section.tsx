'use client'

import {motion, useReducedMotion} from 'framer-motion'

import HomepageSection from './homepage-section'
import HomepageSectionHeader from './homepage-section-header'
import {homepageEase} from './homepage-motion-reveal'

export default function SponsorsSection() {
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
    <HomepageSection id="sponsors" contentClassName="max-w-4xl">
      <div className="text-center">
        <motion.div {...headerMotion}>
          <HomepageSectionHeader
            className="mb-10"
            title="Backing the open source core"
            description="Sponsors help us ship faster releases, better developer experience, and long-term reliability for extension teams."
          />
        </motion.div>
        <motion.a
          className="inline-flex items-center gap-3"
          href="https://www.testmuai.com/?utm_medium=sponsor&utm_source=extensionjs"
          rel="noreferrer"
          target="_blank"
          initial={reduce ? false : {opacity: 0, y: 28, scale: 0.96}}
          whileInView={reduce ? undefined : {opacity: 1, y: 0, scale: 1}}
          viewport={{once: true, margin: '-30px'}}
          transition={{duration: 0.7, delay: 0.06, ease: homepageEase}}
          whileHover={reduce ? undefined : {scale: 1.03}}
          whileTap={reduce ? undefined : {scale: 0.98}}
        >
          <img
            alt="TestMu AI logo"
            className="w-auto transition dark:invert"
            src="https://assets.testmu.ai/resources/images/logos/logo.png"
            style={{height: '64px'}}
          />
        </motion.a>
      </div>
    </HomepageSection>
  )
}
