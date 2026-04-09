import type {ReactNode} from 'react'

/**
 * Hero dock: uniform square tiles, squircle curve, shared inset.
 * Motion lives on the parent in open-source-hero-section (single reveal).
 */
const dockTileTopMax = 'w-full max-w-[8.25rem] shrink-0'
const dockTileCenterMax = 'w-full max-w-[9rem] shrink-0'
const dockTileBottomMax = 'w-full max-w-[7.625rem] shrink-0'
const dockTileRadius = 'rounded-[20%]'
const dockTileBorder =
  'border border-stone-900 bg-white shadow-[inset_0_1px_1px_0_var(--color-stone-700)]'
const dockImageInsetClass = 'h-full w-full object-contain p-[9.76%]'
const dockImageReducedInsetClass = 'h-full w-full object-contain p-[5%]'

const dockTileTopChrome = `${dockTileTopMax} ${dockTileRadius} overflow-hidden ${dockTileBorder}`
const dockTileBottomChrome = `${dockTileBottomMax} ${dockTileRadius} overflow-hidden ${dockTileBorder}`

const heroLogoTopRow = [
  {
    src: 'https://media.extension.land/logos/browsers/brave.svg',
    className: dockTileTopChrome,
    imageClassName: dockImageReducedInsetClass
  },
  {
    src: 'https://media.extension.land/logos/browsers/chrome.svg',
    className: dockTileTopChrome,
    imageClassName: dockImageInsetClass
  },
  {
    src: 'https://media.extension.land/track/extension-js.png',
    className: `${dockTileCenterMax} ${dockTileRadius} overflow-hidden`,
    imageClassName: 'h-full w-full object-cover object-center p-0',
    useTileChrome: false
  },
  {
    src: 'https://media.extension.land/logos/browsers/edge.svg',
    className: dockTileTopChrome,
    imageClassName: dockImageInsetClass
  },
  {
    src: 'https://media.extension.land/logos/browsers/vivaldi.svg',
    className: dockTileTopChrome,
    imageClassName: 'h-full w-full object-contain p-0'
  }
]

const heroLogoBottomRow = [
  {
    src: 'https://media.extension.land/logos/browsers/opera.svg',
    className: dockTileBottomChrome,
    imageClassName: dockImageReducedInsetClass
  },
  {
    src: 'https://media.extension.land/logos/browsers/chromium.svg',
    className: dockTileBottomChrome,
    imageClassName: dockImageInsetClass
  },
  {
    src: 'https://media.extension.land/logos/browsers/firefox.svg',
    className: dockTileBottomChrome,
    imageClassName: dockImageInsetClass
  },
  {
    src: 'https://media.extension.land/logos/browsers/safari.svg',
    className: dockTileBottomChrome,
    imageClassName: 'h-full w-full object-contain p-0'
  }
]

function BrowserLogoSquare({
  src,
  className,
  imageClassName = dockImageInsetClass,
  useTileChrome = true
}: {
  src: string
  className: string
  imageClassName?: string
  useTileChrome?: boolean
}) {
  return (
    <div
      className={`${className} ${useTileChrome ? '!bg-white' : ''}`}
      style={useTileChrome ? {backgroundColor: '#fff'} : undefined}
    >
      <div className="relative w-full pb-[100%]">
        <div
          className={`absolute inset-0 flex ${useTileChrome ? '!bg-white' : ''}`}
          style={useTileChrome ? {backgroundColor: '#fff'} : undefined}
        >
          <img alt="" className={imageClassName} src={src} />
        </div>
      </div>
    </div>
  )
}

function DockRow({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`flex w-full items-center justify-center gap-[2.8%] ${className ?? ''}`}
    >
      {children}
    </div>
  )
}

export default function OpenSourceHeroLogoGrid() {
  return (
    <div className="mx-auto w-full max-w-[43.125rem]">
      <DockRow>
        {heroLogoTopRow.map((logo) => (
          <BrowserLogoSquare
            key={logo.src}
            src={logo.src}
            className={logo.className}
            imageClassName={logo.imageClassName}
            useTileChrome={logo.useTileChrome}
          />
        ))}
      </DockRow>
      <DockRow className="pt-[3%]">
        {heroLogoBottomRow.map((logo) => (
          <BrowserLogoSquare
            key={logo.src}
            src={logo.src}
            className={logo.className}
            imageClassName={logo.imageClassName}
          />
        ))}
      </DockRow>
    </div>
  )
}
