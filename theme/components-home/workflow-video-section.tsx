'use client'

import {motion, useReducedMotion} from 'framer-motion'
import {Play} from 'lucide-react'

import HeroVideoDialog from '../components/ui/hero-video-dialog'

import mainWorkflowPreview from '../../assets/main-workflow-preview.png'
import {homepageEase} from './homepage-motion-reveal'

export default function WorkflowVideoSection() {
  const reduce = useReducedMotion()

  return (
    <section className="w-full p-4 sm:p-6 md:p-8 lg:p-8">
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          className="mb-10 text-center"
          initial={reduce ? false : {opacity: 0, y: 28}}
          whileInView={reduce ? undefined : {opacity: 1, y: 0}}
          viewport={{once: true, margin: '-20px'}}
          transition={{duration: 0.65, ease: homepageEase}}
        >
          <p className="text-foreground mx-auto mb-2 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Watch the full developer workflow
          </p>
          <p className="text-muted-foreground text-lg sm:text-lg">
            From scaffold to running extension, in one modern toolchain.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : {opacity: 0, y: 48, scale: 0.94}}
          whileInView={reduce ? undefined : {opacity: 1, y: 0, scale: 1}}
          viewport={{once: true, margin: '-40px'}}
          transition={{
            duration: 0.88,
            delay: 0.06,
            ease: homepageEase
          }}
        >
          <HeroVideoDialog
            animationStyle="from-bottom"
            videoSrc="https://www.youtube.com/embed/ipsktOrlFns"
            thumbnailSrc={mainWorkflowPreview}
            thumbnailAlt="Extension.js welcome page preview"
            renderTrigger={({openVideo, triggerRef, triggerAriaProps}) => (
              <div className="rounded-3xl">
                <motion.div
                  className="group/preview relative overflow-hidden rounded-2xl bg-[#00B1D2] shadow-[0_24px_80px_-12px_rgba(0,0,0,0.35)] ring-1 ring-black/5"
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          scale: 1.02,
                          boxShadow:
                            '0 36px 100px -18px rgba(0,0,0,0.42), 0 0 0 1px rgba(255,255,255,0.08)'
                        }
                  }
                  whileTap={reduce ? undefined : {scale: 0.985}}
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 26
                  }}
                >
                  <div className="relative aspect-video w-full">
                    <img
                      src={mainWorkflowPreview}
                      alt="Extension.js welcome page preview"
                      width={1920}
                      height={1080}
                      className="size-full object-contain object-center"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-200 ease-out group-hover/preview:bg-black/10" />
                    <div className="absolute inset-0 flex scale-[0.95] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover/preview:scale-100">
                      <div className="flex size-24 items-center justify-center rounded-full border border-white/50 bg-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
                        <div className="relative flex size-16 items-center justify-center rounded-full border border-black/80 bg-black/85 shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-all duration-200 ease-out group-hover/preview:scale-110">
                          <Play
                            className="size-6 fill-white text-white transition-transform duration-200 ease-out group-hover/preview:scale-105"
                            style={{
                              filter: 'drop-shadow(0 2px 2px rgb(0 0 0 / 0.35))'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      ref={triggerRef}
                      type="button"
                      className="absolute inset-0 z-50 block w-full cursor-pointer appearance-none rounded-[inherit] border-0 bg-transparent p-0 touch-manipulation"
                      onClick={openVideo}
                      {...triggerAriaProps}
                    >
                      <span className="sr-only">
                        Play developer workflow video
                      </span>
                    </button>
                    <div className="pointer-events-none absolute inset-0 z-[60]">
                      <div className="flex justify-end p-4">
                        <span className="rounded-full border border-white/30 bg-black/40 px-3 py-1 text-xs font-semibold tracking-wide text-white/95 shadow-lg backdrop-blur-md">
                          Click to expand
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          />
        </motion.div>
      </div>
    </section>
  )
}
