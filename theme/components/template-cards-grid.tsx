'use client'

import {motion, useReducedMotion} from 'framer-motion'

import {TemplateCard} from './ui/template-card'
import {homepageEase} from '../components-home/homepage-motion-reveal'

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
      'Build polished extension interfaces with Preact, lighter bundles, and familiar JSX you know well.',
    iconSrc: 'https://cdn.simpleicons.org/preact/673AB8',
    accent: 'from-violet-400/20 via-violet-400/5 to-transparent'
  },
  {
    title: 'Vue',
    slug: 'vue',
    description:
      'Build polished extension interfaces with Vue, single-file flow, and predictable structure in UIs.',
    iconSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    accent: 'from-emerald-400/20 via-emerald-400/5 to-transparent'
  },
  {
    title: 'Svelte',
    slug: 'svelte',
    description:
      'Build polished extension interfaces with Svelte, lean components, and tiny runtime in shipped UI.',
    iconSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg',
    accent: 'from-orange-300/20 via-orange-300/5 to-transparent'
  },
  {
    title: 'TypeScript',
    slug: 'typescript',
    description:
      'Build polished extension interfaces with TypeScript, static typing, and safer refactors at scale.',
    iconSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    accent: 'from-cyan-400/20 via-cyan-400/5 to-transparent'
  },
  {
    title: 'JavaScript',
    slug: 'javascript',
    description:
      'Build polished extension interfaces with JavaScript, light tooling, and quick sketch-to-UI speed.',
    iconSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    accent: 'from-amber-300/20 via-amber-300/5 to-transparent'
  }
]

export function TemplateCardsGrid() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className="grid grid-cols-1 gap-3 text-left md:grid-cols-2 lg:gap-4"
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={{once: true, margin: '-50px', amount: 0.1}}
      variants={{
        hidden: {},
        show: {
          transition: {staggerChildren: reduce ? 0 : 0.06, delayChildren: 0.02}
        }
      }}
    >
      {TEMPLATE_CARDS.map((template) => (
        <motion.div
          key={template.slug}
          variants={{
            hidden: reduce
              ? {opacity: 1, y: 0, scale: 1}
              : {opacity: 0, y: 40, scale: 0.97},
            show: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {duration: reduce ? 0 : 0.62, ease: homepageEase}
            }
          }}
        >
          <TemplateCard
            title={template.title}
            description={template.description}
            href={`https://templates.extension.dev/${template.slug}`}
            accent={template.accent}
            iconSrc={template.iconSrc}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
