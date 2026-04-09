import {MarketingCard} from '../components/ui/marketing-card'

export const coreFeatures = [
  {
    title: 'Compile one extension into browser-specific output',
    description:
      'Build once for Chrome, Edge, Firefox, and custom Chromium or Gecko targets, while keeping browser-specific output predictable across development, testing, and release builds.',
    href: '/docs/features/cross-browser-compatibility',
    media: 'browsers',
    accent: 'from-sky-400/20 via-sky-400/5 to-transparent'
  },
  {
    title: 'Keep extension structure explicit',
    description:
      'Keep your manifest, paths, and emitted assets in sync as your extension grows.',
    href: '/docs/implementation-guide/manifest-json',
    accent: 'from-amber-300/20 via-amber-300/5 to-transparent'
  },
  {
    title: 'Use the lightest safe path',
    description:
      'Get the fastest safe update path for every change, from HMR to full restarts.',
    href: '/docs/features/reload-and-hmr',
    accent: 'from-emerald-400/20 via-emerald-400/5 to-transparent'
  },
  {
    title: 'Bring your preferred stack',
    description:
      'Start with React, Vue, Svelte, TypeScript, or JavaScript and keep one workflow, so your team can choose the right UI model without changing the core extension toolchain.',
    href: '/docs/getting-started/templates',
    media: 'frameworks',
    accent: 'from-violet-400/20 via-violet-400/5 to-transparent'
  },
  {
    title: 'Build, preview, and package with one flow',
    description:
      'Build, preview, and package for each browser from the same project, with a release flow that stays clear from first local check to store-ready artifacts.',
    href: '/docs/features/multi-platform-builds',
    accent: 'from-cyan-400/20 via-cyan-400/5 to-transparent'
  },
  {
    title: 'Inject environment values cleanly',
    description:
      'Load environment values by browser and mode, then replace them in JavaScript, JSON, and HTML.',
    href: '/docs/features/environment-variables',
    media: 'env',
    accent: 'from-fuchsia-400/20 via-fuchsia-400/5 to-transparent'
  }
] as const

export type CoreFeature = (typeof coreFeatures)[number]

const docImageSrc: Record<'react' | 'vue' | 'svelte' | 'env', string> = {
  react:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  vue: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  svelte:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg',
  env: 'https://github.com/user-attachments/assets/75bd0de7-2b00-41db-8407-e06a96bf5b7c'
}

type IconProps = {className?: string}

function BuildBrowserAvatarsIcon({className}: IconProps) {
  return (
    <div className={`flex items-center -space-x-2 ${className ?? ''}`}>
      {[
        {
          alt: 'Chrome browser icon',
          src: 'https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome.svg'
        },
        {
          alt: 'Firefox browser icon',
          src: 'https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox.svg'
        },
        {
          alt: 'Edge browser icon',
          src: 'https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge.svg'
        }
      ].map((browser) => (
        <img
          key={browser.alt}
          src={browser.src}
          alt={browser.alt}
          className="h-10 w-10 object-contain"
        />
      ))}
    </div>
  )
}

function BuildFrameworkAvatarsIcon({className}: IconProps) {
  return (
    <div className={`flex items-center -space-x-2 ${className ?? ''}`}>
      {[
        {alt: 'React framework icon', src: docImageSrc.react},
        {alt: 'Vue framework icon', src: docImageSrc.vue},
        {alt: 'Svelte framework icon', src: docImageSrc.svelte}
      ].map((framework) => (
        <img
          key={framework.alt}
          src={framework.src}
          alt={framework.alt}
          className="h-10 w-10 object-contain"
        />
      ))}
    </div>
  )
}

function FeatureMedia({media}: {media: 'browsers' | 'frameworks' | 'env'}) {
  if (media === 'browsers') {
    return <BuildBrowserAvatarsIcon />
  }

  if (media === 'frameworks') {
    return <BuildFrameworkAvatarsIcon />
  }

  if (media === 'env') {
    return (
      <img
        src={docImageSrc[media]}
        alt="Environment doc icon"
        className="h-10 w-10 object-contain"
      />
    )
  }

  return null
}

export function CoreFeatureCard({
  title,
  description,
  href,
  accent,
  className,
  ...rest
}: CoreFeature & {className?: string}) {
  const media = 'media' in rest ? rest.media : undefined
  return (
    <MarketingCard
      title={title}
      description={description}
      href={href}
      linkLabel="Learn more"
      accent={accent}
      media={media ? <FeatureMedia media={media} /> : undefined}
      className={className}
    />
  )
}
