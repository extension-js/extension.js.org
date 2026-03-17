'use client'

import {ArrowRight} from 'lucide-react'
import {Button} from '../../components/ui/button'
import {TemplateCardsGrid} from '../../components/template-cards-grid'
import HomepageSection from './homepage-section'
import HomepageSectionHeader from './homepage-section-header'

export default function TemplatesSection() {
  return (
    <HomepageSection className="overflow-hidden" id="templates">
      <div className="text-center">
        <HomepageSectionHeader
          className="mb-10"
          title={
            <>
              Pick your <span className="text-primary">framework</span>. Keep
              your workflow.
            </>
          }
          description="Start with production-ready templates for React, Vue, Svelte, TypeScript, or JavaScript."
        />

        <div className="mx-auto mb-10 max-w-5xl">
          <TemplateCardsGrid />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild className="w-full gap-2 sm:w-auto" size="lg">
            <a href="/docs/getting-started/templates">
              Browse templates
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </HomepageSection>
  )
}
