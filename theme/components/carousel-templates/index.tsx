import {TabsCommandLine} from '@components/tabs-command-line'
import {useState} from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel'
import {ALL_TEMPLATES} from './data'
import type {Template} from './types'
import {TemplateTabs} from './template-tabs'

interface CarouselTemplates {
  activeIndex?: number
  setActiveIndex?: (index: number) => void
  single?: boolean
  showControls?: boolean
  showCommands?: boolean
  templates?: Template[]
}

export function CarouselTemplatesControls({
  activeIndex
}: {
  activeIndex?: number
}) {
  return (
    <div className="flex items-center justify-between w-full max-w-md h-12 m-auto">
      <CarouselPrevious className="" />
      {/* <label className="w-full text-center m-auto text-sm leading-1">
        {ALL_TEMPLATES[activeIndex || 0].name}
      </label> */}
      <CarouselNext className="" />
    </div>
  )
}

export function CarouselTemplates({
  activeIndex,
  setActiveIndex,
  single,
  showControls = true,
  showCommands = true,
  templates
}: CarouselTemplates) {
  const [localActiveIndex, localSetActiveIndex] = useState(0)
  const visibleTemplates =
    templates && templates.length > 0 ? templates : ALL_TEMPLATES

  const handleSlideClick = (index: number) => {
    if (!setActiveIndex) {
      localSetActiveIndex(index)
      return
    }

    setActiveIndex(index)
  }

  return (
    <Carousel
      opts={{
        align: 'start'
      }}
      className="w-full mb-6"
    >
      <div className="inset-y-0 w-20 bg-gradient-to-l from-background to-transparent h-full pointer-events-none" />
      <CarouselContent className="mb-0">
        {visibleTemplates.map((template, index) => {
          const isActive =
            (activeIndex != null ? activeIndex : localActiveIndex) === index
          const activeClass = isActive
            ? 'bg-[var(--rp-c-brand-tint)] rounded-md'
            : ''

          return (
            <CarouselItem
              key={`template-${template.name}`}
              className={
                single
                  ? 'md:w-full lg:w-full max-w-sm cursor-pointer'
                  : 'md:basis-1/2 lg:basis-1/2 cursor-pointer'
              }
            >
              <TemplateTabs
                className={`${activeClass}`}
                template={template}
                setActiveTemplate={() => handleSlideClick(index)}
              />
            </CarouselItem>
          )
        })}
      </CarouselContent>
      {showControls && (
        <CarouselTemplatesControls
          activeIndex={activeIndex != null ? activeIndex : localActiveIndex}
        />
      )}
      {showCommands && (
        <TabsCommandLine
          command={{
            npm: `extension create <your-extension-name> --template=${visibleTemplates[activeIndex != null ? activeIndex : localActiveIndex].name}`,
            pnpm: `extension create <your-extension-name> --template=${visibleTemplates[activeIndex != null ? activeIndex : localActiveIndex].name}`,
            yarn: `extension create <your-extension-name> --template=${visibleTemplates[activeIndex != null ? activeIndex : localActiveIndex].name}`
          }}
        />
      )}
    </Carousel>
  )
}
