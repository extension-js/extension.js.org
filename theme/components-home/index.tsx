import CoreFeaturesSection from './core-features-section'
import FaqSection from './faq-section'
import {HomepageMotionReveal} from './homepage-motion-reveal'
import OpenSourceHeroSection from './open-source-hero-section'
import SponsorsSection from './sponsors-section'
import TemplatesSection from './templates-section'
import TestimonialsSection from './testimonials-section'
import WorkflowVideoSection from './workflow-video-section'

const homepageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Extension.js',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Chrome, Edge, Firefox',
  url: 'https://extension.js.org',
  codeRepository: 'https://github.com/extension-js/extension.js',
  description:
    'Build browser extensions for Chrome, Edge, and Firefox with one modern workflow. Extension.js handles manifest compilation, browser-specific output, reload behavior, and packaging so you can focus on product features.'
}

export default function Homepage() {
  return (
    <main className="w-full bg-background text-foreground [&_a]:underline-offset-4 [&_a:hover]:underline">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageStructuredData)
        }}
      />
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-y-9 sm:gap-y-11 md:gap-y-14 lg:gap-y-[4.5rem] xl:gap-y-20">
        <HomepageMotionReveal emphasis delay={0}>
          <OpenSourceHeroSection />
        </HomepageMotionReveal>
        <HomepageMotionReveal emphasis delay={0.06}>
          <WorkflowVideoSection />
        </HomepageMotionReveal>
        <TestimonialsSection />
        <CoreFeaturesSection />
        <TemplatesSection />
        <SponsorsSection />
        <FaqSection />
      </div>
    </main>
  )
}
