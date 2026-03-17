const heroLogoTopRow = [
  {
    src: 'https://media.extension.land/logos/browsers/brave.svg',
    className:
      'w-full max-w-[8.25rem] origin-bottom scale-[.83] overflow-hidden rounded-[20%] border border-stone-800 bg-white shadow-[inset_0_1px_1px_0_var(--color-stone-700)]',
    imageClassName: 'h-full w-full object-contain p-3'
  },
  {
    src: 'https://media.extension.land/logos/browsers/chrome.svg',
    className:
      'w-full max-w-[8.25rem] origin-bottom scale-90 overflow-hidden rounded-[20%] border border-stone-900 bg-white shadow-[inset_0_1px_1px_0_var(--color-stone-700)]',
    imageClassName: 'h-full w-full object-contain p-3'
  },
  {
    src: 'https://media.extension.land/track/extension-js.png',
    className: 'w-full max-w-[8.25rem] overflow-hidden rounded-[20%]',
    imageClassName: 'h-full w-full object-cover object-center',
    useTileChrome: false
  },
  {
    src: 'https://media.extension.land/logos/browsers/edge.svg',
    className:
      'w-full max-w-[8.25rem] origin-bottom scale-90 overflow-hidden rounded-[20%] border border-stone-900 bg-white shadow-[inset_0_1px_1px_0_var(--color-stone-700)]',
    imageClassName: 'h-full w-full object-contain p-3'
  },
  {
    src: 'https://media.extension.land/logos/browsers/vivaldi.svg',
    className:
      'w-full max-w-[8.25rem] origin-bottom scale-[.83] overflow-hidden rounded-[20%] border border-stone-800 bg-white shadow-[inset_0_1px_1px_0_var(--color-stone-700)]',
    imageClassName: 'h-full w-full object-contain p-0'
  }
]

const heroLogoBottomRow = [
  {
    src: 'https://media.extension.land/logos/browsers/opera.svg',
    className:
      'w-full max-w-[7.625rem] origin-bottom scale-[.83] overflow-hidden rounded-[20%] border border-stone-950 bg-white shadow-[inset_0_1px_1px_0_var(--color-stone-700)]'
  },
  {
    src: 'https://media.extension.land/logos/browsers/chromium.svg',
    className:
      'w-full max-w-[7.625rem] overflow-hidden rounded-[20%] border border-stone-950 bg-white shadow-[inset_0_1px_1px_0_var(--color-stone-700)]'
  },
  {
    src: 'https://media.extension.land/logos/browsers/firefox.svg',
    className:
      'w-full max-w-[7.625rem] overflow-hidden rounded-[20%] border border-stone-950 bg-white shadow-[inset_0_1px_1px_0_var(--color-stone-700)]'
  },
  {
    src: 'https://media.extension.land/logos/browsers/safari.svg',
    className:
      'w-full max-w-[7.625rem] origin-bottom scale-[.83] overflow-hidden rounded-[20%] border border-stone-950 bg-white shadow-[inset_0_1px_1px_0_var(--color-stone-700)]',
    imageClassName: 'h-full w-full object-contain p-0'
  }
]

function BrowserLogoSquare({
  src,
  className,
  imageClassName = 'h-full w-full object-contain p-3',
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

export default function OpenSourceHeroLogoGrid() {
  return (
    <div className="w-full max-w-[43.125rem]">
      <div className="flex w-full items-end justify-center gap-[2.8%]">
        {heroLogoTopRow.map((logo) => (
          <BrowserLogoSquare
            key={logo.src}
            src={logo.src}
            className={logo.className}
            imageClassName={logo.imageClassName}
            useTileChrome={logo.useTileChrome}
          />
        ))}
      </div>
      <div className="flex w-full items-start justify-center gap-[2.8%] pt-[3%]">
        {heroLogoBottomRow.map((logo) => (
          <BrowserLogoSquare
            key={logo.src}
            src={logo.src}
            className={logo.className}
            imageClassName={logo.imageClassName}
          />
        ))}
      </div>
    </div>
  )
}
