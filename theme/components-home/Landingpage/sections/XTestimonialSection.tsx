import {Card, CardContent} from '../../../components/ui/card'

export function XTestimonialSection() {
  return (
    <section className="pb-8">
      <Card className="border-blue-300/20 bg-blue-500/10 shadow-none text-left">
        <CardContent className="space-y-3 p-6 text-left items-start">
          <p className="text-xs uppercase tracking-wide text-blue-200 text-left">
            Community signal
          </p>
          <p className="text-lg text-slate-100 text-left">Mentioned by Guillermo Rauch.</p>
          <p className="text-sm text-slate-300 text-left">
            Read the post:{' '}
            <a
              href="https://x.com/rauchg/status/1785325069658648996"
              target="_blank"
              rel="noreferrer"
              className="inline text-left underline underline-offset-4 hover:text-white"
            >
              x.com/rauchg/status/1785325069658648996
            </a>
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
