import {type ReactNode} from 'react'
import {ArrowRight} from 'lucide-react'

import {cn} from '../../lib/utils'

type MarketingCardProps = {
  title: string
  description: string
  href: string
  linkLabel: string
  accent: string
  media?: ReactNode
  className?: string
}

export function MarketingCard({
  title,
  description,
  href,
  linkLabel,
  accent,
  media,
  className
}: MarketingCardProps) {
  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-[color:var(--rp-c-divider-light)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-5 text-left shadow-[0_10px_30px_rgba(0,0,0,0.14)] transition-transform duration-200 hover:-translate-y-0.5 sm:p-6 lg:h-full',
        className
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[radial-gradient(circle,var(--tw-gradient-stops))]',
          accent
        )}
      />

      <div className="pointer-events-none relative flex h-full flex-col">
        <div className="mb-4 flex min-h-10 w-full items-start justify-between gap-3 sm:mb-5 sm:gap-4">
          <h3 className="m-0 min-w-0 flex-1 pr-2 text-lg font-semibold leading-snug text-foreground sm:pr-4 sm:text-xl">
            {title}
          </h3>
          {media ? (
            <div className="flex shrink-0 items-start justify-end">{media}</div>
          ) : null}
        </div>

        <p className="m-0 max-w-xl text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
          {description}
        </p>

        <div className="mt-2 pt-1 sm:mt-3">
          <a
            className="pointer-events-auto inline-flex items-center gap-2 text-sm font-medium text-[color:var(--rp-c-brand-light)] no-underline transition-colors hover:text-[color:var(--rp-c-brand)]"
            href={href}
          >
            {linkLabel}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/[0.03]" />
    </article>
  )
}
