'use client'

import {ArrowRight} from 'lucide-react'

import {Button} from '../../components/ui/button'
import HomepageSection from './homepage-section'
import HomepageSectionHeader from './homepage-section-header'
import {coreFeatures, CoreFeatureCard} from './core-features-section-content'

export default function CoreFeaturesSection() {
  return (
    <HomepageSection className="overflow-hidden" id="core-features">
      <HomepageSectionHeader
        className="mx-auto mb-10 max-w-3xl"
        title={
          <>
            Core features for the{' '}
            <span className="text-primary">full extension lifecycle</span>
          </>
        }
        description="Build, test, and ship for every browser with one modern extension workflow."
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:auto-rows-[16rem] lg:grid-cols-3 lg:gap-4">
        {coreFeatures.map((feature) => (
          <CoreFeatureCard key={feature.title} {...feature} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild size="lg" className="gap-2">
          <a href="/docs/features">
            Explore all features
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </HomepageSection>
  )
}
