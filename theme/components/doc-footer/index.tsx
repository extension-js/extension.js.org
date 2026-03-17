import {
  DocFooter as BasicDocFooter,
  EditLink,
  LastUpdated,
  PrevNextPage
} from '@rspress/core/theme-original'

export function DocFooter() {
  return (
    <footer className="docs-doc-footer">
      <div className="docs-doc-footer__meta">
        <EditLink />
        <LastUpdated />
      </div>
      <div className="docs-doc-footer__divider" />
      <div className="docs-doc-footer__nav">
        <PrevNextPage />
      </div>
    </footer>
  )
}

export {BasicDocFooter}
