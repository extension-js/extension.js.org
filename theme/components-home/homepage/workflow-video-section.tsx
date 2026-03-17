'use client'

import {Play} from 'lucide-react'

import HeroVideoDialog from '../../components/ui/hero-video-dialog'

import mainWorkflowPreview from '../../../assets/main-workflow-preview.png'

export default function WorkflowVideoSection() {
  return (
    <section className="w-full p-4 sm:p-6 md:p-8 lg:p-8">
      <div className="mx-auto w-full max-w-5xl">
        <HeroVideoDialog
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/ipsktOrlFns"
          thumbnailSrc={mainWorkflowPreview}
          thumbnailAlt="Extension.js welcome page preview"
          triggerContent={
            <div className="rounded-3xl">
              <div className="mb-12 text-center">
                <p className="text-foreground mx-auto mb-2 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  Watch the full developer workflow
                </p>
                <p className="text-muted-foreground text-lg sm:text-lg">
                  From scaffold to running extension, in one modern toolchain.
                </p>
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-md bg-[#00B1D2]">
                <img
                  src={mainWorkflowPreview}
                  alt="Extension.js welcome page preview"
                  width={1920}
                  height={1080}
                  className="size-full object-contain object-center"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-200 ease-out group-hover:bg-black/10" />
                <div className="absolute inset-0 flex scale-[0.95] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-100">
                  <div className="flex size-24 items-center justify-center rounded-full border border-white/50 bg-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
                    <div className="relative flex size-16 items-center justify-center rounded-full border border-black/80 bg-black/85 shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-all duration-200 ease-out group-hover:scale-110">
                      <Play
                        className="size-6 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105"
                        style={{
                          filter: 'drop-shadow(0 2px 2px rgb(0 0 0 / 0.35))'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </section>
  )
}
