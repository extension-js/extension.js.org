import type {ComponentPropsWithoutRef, ReactNode, Ref} from 'react'

import {cn} from '../lib/utils'

interface HomepageSectionProps extends ComponentPropsWithoutRef<'section'> {
  children: ReactNode
  innerClassName?: string
  contentClassName?: string
  sectionRef?: Ref<HTMLElement>
}

export default function HomepageSection({
  children,
  className,
  contentClassName,
  innerClassName,
  sectionRef,
  ...props
}: HomepageSectionProps) {
  return (
    <section
      ref={sectionRef}
      className={cn('relative w-full', className)}
      {...props}
    >
      <div className={cn('w-full p-4 sm:p-6 md:p-8 lg:p-8', innerClassName)}>
        <div className={cn('mx-auto w-full max-w-5xl', contentClassName)}>
          {children}
        </div>
      </div>
    </section>
  )
}
