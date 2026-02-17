import type React from 'react'

interface AvatarEmojiProps {
  emoji: string
  size?: number // Optional prop for the width
  altText?: string // Optional prop for the alt text
}

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
  const emojiSymbol = emojiLinks[emoji] || '' // Retrieve the emoji from the emojiLinks object

  if (!emojiSymbol) {
    return <p>Emoji not found</p> // Return a fallback if the emoji doesn't exist
  }

  return (
    <div
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
