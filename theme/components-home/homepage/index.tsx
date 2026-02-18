import FaqSection from "./faq-section";
import OpenSourceHeroSection from "./open-source-hero-section";
import SponsorsSection from "./sponsors-section";
import TemplatesSection from "./templates-section";
import TestimonialsSection from "./testimonials-section";
import WorkflowVideoSection from "./workflow-video-section";

const homepageStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Extension.js",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Chrome, Edge, Firefox",
  url: "https://extension.js.org",
  codeRepository: "https://github.com/extension-js/extension.js",
  description:
    "Extension.js is an open source framework and CLI for building, testing, and shipping cross-browser extensions for Chrome, Edge, and Firefox.",
};

export default function Homepage() {
  return (
    <main className="w-full bg-background text-foreground [&_a]:underline-offset-4 [&_a:hover]:underline">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageStructuredData),
        }}
      />
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-16">
        <OpenSourceHeroSection />
        <TestimonialsSection />
        <WorkflowVideoSection />
        <TemplatesSection />
        <SponsorsSection />
        <FaqSection />
      </div>
    </main>
  );
}
