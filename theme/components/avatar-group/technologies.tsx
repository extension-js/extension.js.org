import type React from 'react'

interface AvatarBrowsersProps {
  browsers: string[]
}

const browserIcons: Record<string, string> = {
  arc: 'https://github.com/cezaraugusto/extension.js/assets/4672033/6ce53a31-c6f6-4a1c-b927-e9ec7fd2df78',
  brave:
    'https://raw.githubusercontent.com/alrra/browser-logos/main/src/brave/brave.svg',
  chrome:
    'https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome.svg',
  chromium:
    'https://raw.githubusercontent.com/alrra/browser-logos/main/src/chromium/chromium.svg',
  edge: 'https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge.svg',
  firefox:
    'https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox.svg',
  opera:
    'https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera.svg',
  safari:
    'https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari.svg',
  vivaldi:
    'https://raw.githubusercontent.com/alrra/browser-logos/main/src/vivaldi/vivaldi.svg',
  gecko:
    'https://github.com/user-attachments/assets/b133bb25-c6c5-40fc-ae2e-0c4a2ba23b60',
  waterfox:
    'https://github.com/user-attachments/assets/9e3ab324-d49d-415e-a07f-1640bbe5196d'
}

const AvatarBrowsers: React.FC<AvatarBrowsersProps> = ({browsers}) => {
  const displayedBrowsers = browsers.slice(0, 3) // Display up to 3 browsers
  const remainingCount = browsers.length - displayedBrowsers.length // Remaining browsers count

  return (
    <div className="flex -space-x-10" style={{marginBottom: '2.5rem'}}>
      {displayedBrowsers.map((browser) => (
        <img
          key={browser.toLowerCase()}
          src={browserIcons[browser.toLowerCase()]}
          alt={`The ${browser} browser icon`}
          className={
            browser.toLowerCase() === 'gecko' ||
            browser.toLowerCase() === 'waterfox'
              ? 'w-[120px] h-[120px] shadow-sm'
              : 'w-[120px] h-[120px] shadow-sm rounded-full'
          }
          style={{}}
        />
      ))}
      {remainingCount > 0 && (
        <div className="flex items-center justify-center w-[120px] h-[120px] rounded-full bg-gray-200 text-gray-800 text-4xl border border-white">
          +{remainingCount}
        </div>
      )}
    </div>
  )
}

export {AvatarBrowsers}
