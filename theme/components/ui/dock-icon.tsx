import type {ReactNode} from 'react'

import {cn} from '../../lib/utils'

type DockIconProps = {
  src?: string
  alt?: string
  children?: ReactNode
  className?: string
  imgClassName?: string
}

function DockIcon({
  src,
  alt,
  children,
  className,
  imgClassName
}: DockIconProps) {
  return (
    <div
      className={cn(
        'flex h-10 w-10 min-w-10 flex-none items-center justify-center rounded-2xl border border-[color:var(--rp-c-divider-light)] bg-[color:var(--rp-c-bg-soft)] p-1.5 shadow-sm',
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? ''}
          className={cn('h-full w-full object-contain', imgClassName)}
        />
      ) : (
        children
      )}
    </div>
  )
}

function DockIconStack({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex min-w-[104px] flex-none items-center -space-x-3 justify-end',
        className
      )}
    >
      {children}
    </div>
  )
}

export {DockIcon, DockIconStack}
