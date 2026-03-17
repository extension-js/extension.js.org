import {TemplateCard} from './ui/template-card'

type TemplateCardItem = {
  title: string
  slug: string
  description: string
  iconSrc: string
  accent: string
}

const TEMPLATE_CARDS: TemplateCardItem[] = [
  {
    title: 'React',
    slug: 'react',
    description:
      'Build polished extension interfaces with React, strong tooling, and a mature component ecosystem.',
    iconSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    accent: 'from-sky-400/20 via-sky-400/5 to-transparent'
  },
  {
    title: 'Preact',
    slug: 'preact',
    description:
      'Get a React-like workflow with a lighter runtime and smaller bundles.',
    iconSrc: 'https://cdn.simpleicons.org/preact/673AB8',
    accent: 'from-violet-400/20 via-violet-400/5 to-transparent'
  },
  {
    title: 'Vue',
    slug: 'vue',
    description:
      'Use single-file components and clear conventions for maintainable extension UIs.',
    iconSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    accent: 'from-emerald-400/20 via-emerald-400/5 to-transparent'
  },
  {
    title: 'Svelte',
    slug: 'svelte',
    description:
      'Ship interactive UIs with concise components and minimal runtime overhead.',
    iconSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg',
    accent: 'from-orange-300/20 via-orange-300/5 to-transparent'
  },
  {
    title: 'TypeScript',
    slug: 'typescript',
    description:
      'Add type safety for clearer refactors and long-term maintainability.',
    iconSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    accent: 'from-cyan-400/20 via-cyan-400/5 to-transparent'
  },
  {
    title: 'JavaScript',
    slug: 'javascript',
    description:
      'Start fast and ship quickly with the lightest setup, while keeping the path clear for rapid prototypes, production-ready features, and teams that want minimal ceremony.',
    iconSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    accent: 'from-amber-300/20 via-amber-300/5 to-transparent'
  }
]

export function TemplateCardsGrid() {
  return (
    <div className="grid grid-cols-1 gap-3 text-left md:grid-cols-2 lg:gap-4">
      {TEMPLATE_CARDS.map((template) => (
        <TemplateCard
          key={template.slug}
          title={template.title}
          description={template.description}
          href={`https://templates.extension.dev/${template.slug}`}
          accent={template.accent}
          iconSrc={template.iconSrc}
        />
      ))}
    </div>
  )
}
