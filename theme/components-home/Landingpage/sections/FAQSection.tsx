import {faqItems, sectionTitleClass} from './content'

export function FAQSection() {
  return (
    <section id="faq" className="mx-auto max-w-3xl py-8">
      <h2 className={sectionTitleClass}>FAQ</h2>

      <div className="mt-8 divide-y divide-white/10 rounded-xl border border-white/10 bg-slate-950/40">
        {faqItems.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-medium text-slate-100">
              {item.question}
              <span className="text-slate-400 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="px-5 pb-4 text-sm text-slate-300">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
