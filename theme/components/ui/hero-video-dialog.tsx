import {AnimatePresence, motion} from 'framer-motion'
import {Play, XIcon} from 'lucide-react'
import {type ReactNode, useEffect, useId, useRef, useState} from 'react'
import {createPortal} from 'react-dom'

import {cn} from '../../lib/utils'

type AnimationStyle =
  | 'from-bottom'
  | 'from-center'
  | 'from-top'
  | 'from-left'
  | 'from-right'
  | 'fade'
  | 'top-in-bottom-out'
  | 'left-in-right-out'

interface HeroVideoProps {
  animationStyle?: AnimationStyle
  videoSrc: string
  thumbnailSrc: string
  thumbnailBackgroundColor?: string
  thumbnailAlt?: string
  triggerContent?: ReactNode
  className?: string
  dialogClassName?: string
  thumbnailClassName?: string
  thumbnailFrameClassName?: string
  containerClassName?: string
  overlayClassName?: string
}

const animationVariants = {
  'from-bottom': {
    initial: {y: '100%', opacity: 0},
    animate: {y: 0, opacity: 1},
    exit: {y: '100%', opacity: 0}
  },
  'from-center': {
    initial: {scale: 0.5, opacity: 0},
    animate: {scale: 1, opacity: 1},
    exit: {scale: 0.5, opacity: 0}
  },
  'from-top': {
    initial: {y: '-100%', opacity: 0},
    animate: {y: 0, opacity: 1},
    exit: {y: '-100%', opacity: 0}
  },
  'from-left': {
    initial: {x: '-100%', opacity: 0},
    animate: {x: 0, opacity: 1},
    exit: {x: '-100%', opacity: 0}
  },
  'from-right': {
    initial: {x: '100%', opacity: 0},
    animate: {x: 0, opacity: 1},
    exit: {x: '100%', opacity: 0}
  },
  fade: {
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0}
  },
  'top-in-bottom-out': {
    initial: {y: '-100%', opacity: 0},
    animate: {y: 0, opacity: 1},
    exit: {y: '100%', opacity: 0}
  },
  'left-in-right-out': {
    initial: {x: '-100%', opacity: 0},
    animate: {x: 0, opacity: 1},
    exit: {x: '100%', opacity: 0}
  }
}

export default function HeroVideoDialog({
  animationStyle = 'from-center',
  videoSrc,
  thumbnailSrc,
  thumbnailBackgroundColor,
  thumbnailAlt = 'Video thumbnail',
  triggerContent,
  className,
  dialogClassName,
  thumbnailClassName,
  thumbnailFrameClassName,
  containerClassName,
  overlayClassName
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const dialogId = useId()
  const selectedAnimation = animationVariants[animationStyle]
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isVideoOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    const triggerElement = triggerRef.current
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsVideoOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      triggerElement?.focus()
    }
  }, [isVideoOpen])

  const closeVideo = () => setIsVideoOpen(false)
  const openVideo = () => setIsVideoOpen(true)
  const embedSrc = videoSrc.includes('?')
    ? `${videoSrc}&autoplay=1`
    : `${videoSrc}?autoplay=1`
  const triggerAriaProps = {
    'aria-label': 'Play developer workflow video',
    'aria-controls': dialogId,
    'aria-expanded': isVideoOpen,
    'aria-haspopup': 'dialog' as const
  }

  return (
    <div className={cn('relative', className)}>
      {triggerContent ? (
        <div
          className={cn(
            'relative isolate block w-full group text-left',
            containerClassName
          )}
        >
          {triggerContent}
          <button
            ref={triggerRef}
            type="button"
            className="absolute inset-0 z-50 block w-full cursor-pointer appearance-none rounded-[inherit] border-0 bg-transparent p-0 pointer-events-auto touch-manipulation"
            onClick={openVideo}
            {...triggerAriaProps}
          >
            <span className="sr-only">Play developer workflow video</span>
          </button>
        </div>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          className={cn(
            'relative block w-full cursor-pointer group text-left',
            containerClassName
          )}
          onClick={openVideo}
          {...triggerAriaProps}
        >
          <div
            className={cn(
              'pointer-events-none relative aspect-video w-full overflow-hidden rounded-md',
              thumbnailFrameClassName
            )}
            style={
              thumbnailBackgroundColor
                ? {backgroundColor: thumbnailBackgroundColor}
                : undefined
            }
          >
            <img
              src={thumbnailSrc}
              alt={thumbnailAlt}
              width={1920}
              height={1080}
              className={cn(
                'size-full object-contain object-left-top transition-all duration-200 ease-out group-hover:brightness-[0.8]',
                thumbnailClassName
              )}
            />
            <div
              className={cn(
                'absolute inset-0 flex scale-[0.95] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-100',
                overlayClassName
              )}
            >
              <div className="flex size-24 items-center justify-center rounded-full border border-white/50 bg-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
                <div className="relative flex size-16 items-center justify-center rounded-full border border-black/80 bg-black/85 shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-all duration-200 ease-out group-hover:scale-110">
                  <Play
                    className="size-6 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105"
                    style={{
                      filter: 'drop-shadow(0 2px 2px rgb(0 0 0 / 0.35))'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </button>
      )}
      {isMounted
        ? createPortal(
            <AnimatePresence>
              {isVideoOpen && (
                <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  onClick={closeVideo}
                  exit={{opacity: 0}}
                  className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Developer workflow video"
                >
                  <motion.div
                    {...selectedAnimation}
                    id={dialogId}
                    transition={{type: 'spring', damping: 30, stiffness: 300}}
                    className={cn(
                      'relative mx-auto aspect-video w-full max-w-4xl',
                      dialogClassName
                    )}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <motion.button
                      type="button"
                      onClick={closeVideo}
                      className="absolute -top-14 right-0 rounded-full bg-neutral-900/65 p-2 text-xl text-white ring-1 ring-white/20 backdrop-blur-md dark:bg-neutral-100/65 dark:text-black"
                      aria-label="Close video dialog"
                    >
                      <XIcon className="size-5" />
                    </motion.button>
                    <div className="relative isolate z-[1] size-full overflow-hidden rounded-2xl border-2 border-white">
                      <iframe
                        src={embedSrc}
                        title="YouTube video player"
                        className="size-full rounded-2xl"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )
        : null}
    </div>
  )
}
