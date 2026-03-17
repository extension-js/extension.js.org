import type {ComponentPropsWithoutRef} from 'react'
import {useEffect, useState} from 'react'
import {NoSSR, useLang, usePageData} from '@rspress/core/runtime'
import {
  getCustomMDXComponent as basicGetCustomMDXComponent,
  Layout as BasicLayout
} from '@rspress/core/theme-original'
import {AnimatePresence, motion, useReducedMotion} from 'framer-motion'
import {XIcon} from 'lucide-react'
import {DocFooter} from './components/doc-footer'
import {HomeLayout} from './pages'

const DEFAULT_DOC_ICON = 'https://avatars.githubusercontent.com/u/172809806'
const ANNOUNCEMENT_URL = '/blog/announcing-3-0-0'
const ANNOUNCEMENT_STORAGE_KEY = 'extensionjs-announcement-closed-v3'

const DocsAvatarFallback = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.location.pathname.startsWith('/docs')) return

    const applyFallback = () => {
      const docsRoot =
        document.querySelector<HTMLElement>('.rspress-doc') ||
        document.querySelector<HTMLElement>('main')
      if (!docsRoot) return

      if (docsRoot.querySelector('[data-doc-avatar="true"]')) return

      const heading = docsRoot.querySelector('h1')
      if (!heading?.parentElement) return

      const fallbackIcon = document.createElement('img')
      fallbackIcon.src = DEFAULT_DOC_ICON
      fallbackIcon.alt = 'The extension logo'
      fallbackIcon.width = 120
      fallbackIcon.className = 'logo'
      fallbackIcon.setAttribute('data-doc-avatar', 'true')
      fallbackIcon.style.marginBottom = '2.4rem'

      heading.parentElement.insertBefore(fallbackIcon, heading)
    }

    const frame = window.requestAnimationFrame(applyFallback)
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return null
}

const HomeAnnouncementBanner = () => {
  const {page} = usePageData()
  const lang = useLang()
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (typeof window === 'undefined' || page.pageType !== 'home') {
      return
    }

    const isDismissed =
      window.localStorage.getItem(ANNOUNCEMENT_STORAGE_KEY) === 'true'
    setIsVisible(!isDismissed)
  }, [page.pageType])

  if (page.pageType !== 'home') {
    return null
  }

  const href = lang === 'en' ? ANNOUNCEMENT_URL : `/${lang}${ANNOUNCEMENT_URL}`

  const closeBanner = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, 'true')
    }

    setIsVisible(false)
  }

  return (
    <AnimatePresence initial={false}>
      {isVisible ? (
        <motion.div
          initial={
            prefersReducedMotion
              ? {opacity: 0}
              : {opacity: 0, y: -10, filter: 'blur(6px)'}
          }
          animate={
            prefersReducedMotion
              ? {opacity: 1}
              : {opacity: 1, y: 0, filter: 'blur(0px)'}
          }
          exit={
            prefersReducedMotion
              ? {opacity: 0}
              : {opacity: 0, y: -6, filter: 'blur(4px)'}
          }
          transition={{
            duration: prefersReducedMotion ? 0.18 : 0.28,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="home-announcement"
        >
          <a className="home-announcement__link" href={href}>
            <span className="home-announcement__eyebrow">New release</span>
            <span className="home-announcement__message">
              Announcing Extension.js 3.0.0
            </span>
          </a>
          <button
            type="button"
            className="home-announcement__close"
            onClick={closeBanner}
            aria-label="Dismiss announcement"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

const Layout = () => (
  <BasicLayout
    beforeNav={
      <NoSSR>
        <HomeAnnouncementBanner />
        <DocsAvatarFallback />
      </NoSSR>
    }
  />
)

function getCustomMDXComponent() {
  const mdxComponents = basicGetCustomMDXComponent()
  const Img = mdxComponents.img ?? 'img'

  const CleanLlmsImage = (props: ComponentPropsWithoutRef<'img'>) => {
    if (import.meta.env.SSG_MD) {
      const src = props.src ?? ''
      const alt = props.alt ?? ''
      const isVideoPlaceholder =
        src.includes('placehold.co') || alt.startsWith('Video demo soon:')

      if (isVideoPlaceholder) {
        return null
      }
    }

    return <Img {...props} />
  }

  return {
    ...mdxComponents,
    img: CleanLlmsImage
  }
}

export {DocFooter, getCustomMDXComponent, HomeLayout, Layout}
export * from '@rspress/core/theme-original'
