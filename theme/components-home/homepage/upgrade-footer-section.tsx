"use client";

import { ExternalLink } from "lucide-react";

const footerLinks = [
  {
    title: "Code of Conduct",
    href: "https://github.com/extension-js/extension.js/blob/main/CODE_OF_CONDUCT.md",
  },
  {
    title: "Changelog",
    href: "https://github.com/extension-js/extension.js/releases",
  },
  {
    title: "Security",
    href: "https://github.com/extension-js/extension.js/security",
  },
];

export default function UpgradeFooterSection() {
  return (
    <footer className="w-full">
      <div className="mx-auto w-full max-w-screen-2xl p-4 sm:p-6 md:p-8 lg:p-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <a
            className="text-muted-foreground inline-flex items-center gap-1 font-mono text-xs font-medium underline-offset-4 hover:text-muted-foreground hover:underline"
            href="https://github.com/extension-js/extension.js/releases/tag/v3.0.0"
            rel="noreferrer"
            target="_blank"
          >
            <img
              alt="Extension.js icon"
              className="h-5 w-5 rounded-sm object-cover pr-1"
              src="https://media.extension.land/track/extension-js.png"
            />
            New release available. View Extension.js v3
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <div className="flex flex-col gap-4 md:items-end">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
              {footerLinks.map(({ title, href }) => (
                <li key={title}>
                  <a
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm underline-offset-4 transition-colors hover:underline"
                    href={href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {title}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground text-sm">
              MIT (c) Cezar Augusto and the Extension.js Authors.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
