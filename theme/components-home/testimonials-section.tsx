'use client'

import {motion, useReducedMotion} from 'framer-motion'

import HomepageSection from './homepage-section'
import HomepageSectionHeader from './homepage-section-header'
import {homepageEase} from './homepage-motion-reveal'
import TestimonialTweetCard from './testimonial-tweet-card'

export default function TestimonialsSection() {
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
    <HomepageSection id="testimonials" contentClassName="max-w-3xl">
      <div className="flex flex-col items-center text-center">
        <motion.div {...headerMotion}>
          <HomepageSectionHeader
            title="From developers worldwide"
            description="Real feedback from developers and teams experimenting with Extension.js."
          />
        </motion.div>
        <motion.div
          className="mt-10 w-full"
          initial={
            reduce
              ? false
              : {opacity: 0, y: 48, scale: 0.97, filter: 'blur(8px)'}
          }
          whileInView={
            reduce
              ? undefined
              : {opacity: 1, y: 0, scale: 1, filter: 'blur(0px)'}
          }
          viewport={{once: true, margin: '-50px', amount: 0.15}}
          transition={{duration: 0.78, delay: 0.05, ease: homepageEase}}
        >
          <TestimonialTweetCard />
        </motion.div>
      </div>
    </HomepageSection>
  )
}
