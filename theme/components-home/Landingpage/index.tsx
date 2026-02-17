import {BuildAndShipSection} from './sections/BuildAndShipSection'
import {ChooseStartingStackSection} from './sections/ChooseStartingStackSection'
import {FAQSection} from './sections/FAQSection'
import {ModernBrowserDevelopmentSection} from './sections/ModernBrowserDevelopmentSection'
import {SeeInActionSection} from './sections/SeeInActionSection'
import {XTestimonialSection} from './sections/XTestimonialSection'

const LandingPage = () => {
  return (
    <main className="w-full bg-[#020b22] text-slate-100">
      <div className="mx-auto max-w-6xl px-6">
        <BuildAndShipSection />
        <XTestimonialSection />
        <ModernBrowserDevelopmentSection />
        <SeeInActionSection />
        <ChooseStartingStackSection />
        <FAQSection />
      </div>
    </main>
  )
}

export default LandingPage
