import type {ReactNode} from 'react'

import {cn} from '../lib/utils'

interface HomepageSectionHeaderProps {
  title: ReactNode
  description?: ReactNode
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  align?: 'left' | 'center'
}

export default function HomepageSectionHeader({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  align = 'center'
}: HomepageSectionHeaderProps) {
  const isCentered = align === 'center'

  return (
    <div
      className={cn(
        'flex flex-col',
        isCentered ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      <h2
        className={cn(
          'text-foreground max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl',
          titleClassName
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'text-muted-foreground mt-2 max-w-2xl text-lg leading-relaxed sm:text-lg',
            descriptionClassName
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
