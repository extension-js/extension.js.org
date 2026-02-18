"use client";

const faqItems = [
  {
    question: "How fast can I launch my first browser extension?",
    answer:
      "Most developers scaffold and run a working extension in minutes with the create command and starter templates.",
  },
  {
    question: "Can one Extension.js project target Chrome, Edge, and Firefox?",
    answer:
      "Yes. Extension.js is built for cross-browser extension development, with one command workflow and browser-aware build output.",
  },
  {
    question: "Do I need to abandon my existing web stack?",
    answer:
      "No. Use React, Vue, Svelte, TypeScript, or JavaScript templates and keep a familiar developer experience.",
  },
  {
    question: "Is Extension.js ready for production teams?",
    answer:
      "Yes. Teams use Extension.js to standardize extension build, test, and release workflows while keeping code maintainable.",
  },
  {
    question: "Where should I start in the docs?",
    answer:
      "Start with Getting Started, then follow the first-extension tutorial and template guides for your preferred stack.",
  },
];

export default function FaqSection() {
  return (
    <section className="relative overflow-hidden" id="faq">
      <div className="w-full p-4 sm:p-6 md:p-8 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center text-center mb-10">
            <h2 className="text-foreground mb-2 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Developer <span className="text-primary">FAQ</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl text-base leading-relaxed sm:text-lg">
              Practical answers for setup, cross-browser support, and production
              delivery.
            </p>
          </div>

          <div className="bg-card/20 overflow-hidden rounded-xl p-2">
            {faqItems.map((item) => (
              <details className="group px-3 py-1" key={item.question}>
                <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-left font-medium">
                  {item.question}
                  <span className="text-muted-foreground transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="text-muted-foreground pb-3 text-sm leading-relaxed">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <a
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              href="https://github.com/orgs/extension-js/discussions/new?category=q-a"
              rel="noreferrer"
              target="_blank"
            >
              Ask a new question on GitHub Q&A
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
