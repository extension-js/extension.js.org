'use client'

import HomepageSection from './homepage-section'
import HomepageSectionHeader from './homepage-section-header'
import TestimonialTweetCard from './testimonial-tweet-card'

export default function TestimonialsSection() {
  return (
    <HomepageSection id="testimonials" contentClassName="max-w-3xl">
      <div className="flex flex-col items-center text-center">
        <HomepageSectionHeader
          title="From developers worldwide"
          description="Real feedback from developers and teams experimenting with Extension.js."
        />
        <div className="mt-6 w-full">
          <TestimonialTweetCard />
        </div>
      </div>
    </HomepageSection>
  )
}
