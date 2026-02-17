import {Card, CardContent, CardDescription, CardTitle} from '../../../components/ui/card'
import {featureItems, sectionTitleClass} from './content'

export function ChooseStartingStackSection() {
  return (
    <section id="features" className="pb-12">
      <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8">
        <h2 className={sectionTitleClass}>Choose your starting stack</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-300">
          Choose the starter stack that matches your team and workflow.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featureItems.map((feature) => (
            <Card key={feature.title} className="border-white/10 bg-slate-950/40 shadow-none">
              <CardContent className="space-y-2 p-5">
                <CardTitle className="text-base text-white">{feature.title}</CardTitle>
                <CardDescription className="text-slate-300">{feature.description}</CardDescription>
                <a
                  href={feature.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-blue-300 hover:text-blue-200"
                >
                  Template example
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
