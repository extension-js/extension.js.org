'use client'

import {motion, useReducedMotion} from 'framer-motion'
import type {ReactNode} from 'react'

import {cn} from '../lib/utils'

/** Open Screen–style ease: soft deceleration */
export const homepageEase = [0.22, 1, 0.36, 1] as const

type HomepageMotionRevealProps = {
  children: ReactNode
  className?: string
  /** Extra delay after scroll trigger (seconds) */
  delay?: number
  /** Larger travel + blur for hero / video blocks */
  emphasis?: boolean
}

export function HomepageMotionReveal({
  children,
  className,
  delay = 0,
  emphasis = false
}: HomepageMotionRevealProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={cn('w-full', className)}>{children}</div>
  }

  return (
    <motion.div
      className={cn('w-full', className)}
      initial={{
        opacity: 0,
        y: emphasis ? 64 : 44,
        filter: 'blur(10px)',
        scale: emphasis ? 0.97 : 0.99
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        scale: 1
      }}
      viewport={{once: true, margin: '-48px 0px -12% 0px', amount: 0.12}}
      transition={{
        duration: emphasis ? 0.9 : 0.72,
        delay,
        ease: homepageEase
      }}
    >
      {children}
    </motion.div>
  )
}
