'use client'

import {Check, Copy} from 'lucide-react'
import {useEffect, useState} from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './tooltip'
import {cn} from '../../lib/utils'

type CommandCopyChipProps = {
  command: string
  className?: string
}

export default function CommandCopyChip({
  command,
  className
}: CommandCopyChipProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) {
      return
    }

    const timeout = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timeout)
  }, [copied])

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
  }

  return (
    <div
      className={cn(
        'inline-flex w-fit items-center gap-2 rounded-lg bg-zinc-950 px-3 py-2 font-mono text-xs font-medium text-white shadow-[0_1px_0_rgba(0,0,0,0.4)]',
        className
      )}
    >
      <span aria-hidden="true" className="text-zinc-400">
        $
      </span>
      <code className="whitespace-nowrap">{command}</code>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={copyToClipboard}
              className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={copied ? 'Command copied' : 'Copy command'}
            >
              {copied ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>{copied ? 'Copied!' : 'Copy command'}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
