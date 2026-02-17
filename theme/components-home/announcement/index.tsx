import {useState} from 'react'
import {usePageData} from 'rspress/runtime'
import {useLang} from 'rspress/runtime'

const LOCAL_STORAGE_KEY = 'extensionjs-announcement-closed'
const ANNOUNCEMENT_URL = '/blog/announcing-2-0-0-beta'

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-x"
    >
      <title>Close icon</title>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export function Announcement() {
  const [disable, setDisable] = useState(
    window.localStorage.getItem(LOCAL_STORAGE_KEY) ?? false
  )
  const {page} = usePageData()
  const lang = useLang()

  // Only display in homepage
  if (page.pageType !== 'home' || disable) {
    return null
  }

  return (
    <div
      className={
        'flex justify-center items-center bg-[#3d61ff] dark:bg-[#0971fe] h-[52px]'
      }
    >
      <a
        href={lang === 'en' ? ANNOUNCEMENT_URL : `/${lang}${ANNOUNCEMENT_URL}`}
        className="hover:underline text-sm text-[--rp-c-bg] dark:text-white flex items-center"
        rel="noopener noreferrer"
      >
        <span>
          {lang === 'en'
            ? 'Announcing Extension.js 2.0.0-beta'
            : 'Announcing Extension.js 2.0.0-beta'}
        </span>
        <svg
          role="img"
          aria-label="Chevron right"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-chevron-right w-3 h-3 ml-1 opacity-70"
        >
          <title>Chevron right</title>
          <path d="m9 18 6-6-6-6" />
        </svg>
      </a>
      <button
        type="button"
        onClick={() => {
          setDisable(true)
          window.localStorage.setItem(LOCAL_STORAGE_KEY, 'true')
        }}
        className="absolute right-6 p-2 cursor-pointer text-sm text-[--rp-c-bg] dark:text-white hover:bg-[rgba(255,255,255,0.3)] rounded-full"
      >
        <CloseIcon />
      </button>
    </div>
  )
}
