"use client";

import HeroVideoDialog from "../../components/ui/hero-video-dialog";

export default function WorkflowVideoSection() {
  return (
    <section className="w-full p-4 sm:p-6 md:p-8 lg:p-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-12 text-center">
          <p className="text-foreground mx-auto mb-2 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Watch the full developer workflow
          </p>
          <p className="text-muted-foreground text-lg sm:text-lg">
            From scaffold to running extension, in one modern toolchain.
          </p>
        </div>
        <div className="relative">
          <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/_qm2EsVKz98"
            thumbnailSrc="https://raw.githubusercontent.com/extension-js/examples/main/public/new-typescript/screenshot.png"
            thumbnailAlt="Hero Video"
          />
          <HeroVideoDialog
            className="hidden dark:block"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/_qm2EsVKz98"
            thumbnailSrc="https://raw.githubusercontent.com/extension-js/examples/main/public/new-typescript/screenshot.png"
            thumbnailAlt="Hero Video"
          />
        </div>
      </div>
    </section>
  );
}
