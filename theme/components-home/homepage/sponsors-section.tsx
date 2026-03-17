'use client'

import HomepageSection from './homepage-section'
import HomepageSectionHeader from './homepage-section-header'

export default function SponsorsSection() {
  return (
    <HomepageSection id="sponsors" contentClassName="max-w-4xl">
      <div className="text-center">
        <HomepageSectionHeader
          className="mb-16"
          title="Backing the open source core"
          description="Sponsors help us ship faster releases, better developer experience, and long-term reliability for extension teams."
        />
        <a
          className="inline-flex items-center gap-3"
          href="https://www.testmuai.com/?utm_medium=sponsor&utm_source=extensionjs"
          rel="noreferrer"
          target="_blank"
        >
          <img
            alt="TestMu AI logo"
            className="w-auto transition dark:invert"
            src="https://assets.testmu.ai/resources/images/logos/logo.png"
            style={{height: '64px'}}
          />
        </a>
      </div>
    </HomepageSection>
  )
}
