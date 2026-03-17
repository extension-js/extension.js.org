import type React from 'react'

interface AvatarEmojiProps {
  emoji: string
  size?: number // Optional prop for the width
  altText?: string // Optional prop for the alt text
}

const DEFAULT_DOC_ICON = 'https://avatars.githubusercontent.com/u/172809806'

const emojiLinks: Record<string, string> = {
  fire: '🔥',
  folder: '🗂️',
  first: '🥇',
  remote: '🎮',
  manifest: '📜',
  package: '📦',
  icons: '🧩',
  config: '🎛️',
  error: '✋',
  speed: '⚡️',
  path: '🛣️',
  user: '👤',
  flag: '🏴‍☠️',
  star: '⭐️'
}

const AvatarEmoji: React.FC<AvatarEmojiProps> = ({
  emoji,
  size = 120,
  altText
}) => {
  if (import.meta.env.SSG_MD) {
    return null
  }

  const emojiSymbol = emojiLinks[emoji] || '' // Retrieve the emoji from the emojiLinks object

  if (!emojiSymbol) {
    return (
      <img
        data-doc-avatar="true"
        className="logo"
        src={DEFAULT_DOC_ICON}
        alt={altText || 'The extension logo'}
        width={size}
        style={{marginBottom: size ? `${size / 50}rem` : '2.5rem'}}
      />
    )
  }

  return (
    <div
      data-doc-avatar="true"
      className={`flex items-center w-[${size}px] h-[${size}px] shadow-sm text-5xl`}
      style={{marginBottom: size ? `${size / 50}rem` : '2.5rem'}}
    >
      <span
        role="img"
        aria-label={altText || emoji}
        style={{fontSize: `${size}px`}}
      >
        {emojiSymbol}
      </span>
    </div>
  )
}

export {AvatarEmoji}
