---
name: extension-js
description: Develop, run, and build cross-browser extensions with Extension.js. Use when creating a browser extension, running one in development, or packaging it for Chrome, Edge, Firefox, or Safari.
---

# Extension.js

Extension.js is a zero-config toolkit for browser extension development. It
compiles a standard `manifest.json` project with TypeScript, React, Vue,
Svelte, Preact, and plain JavaScript support built in.

## Commands

```bash
npx extension@latest create my-extension --template=react
npx extension@latest dev
npx extension@latest build --browser=chrome
```

Targets: `chrome` (default), `edge`, `firefox`, `safari`, `chromium-based`,
`gecko-based`. Output lands in `dist/<browser>`.

## Machine-readable documentation

- Page index: https://extension.js.org/llms.txt
- Full content bundle: https://extension.js.org/llms-full.txt
- Any docs page as Markdown: append `.md` to its URL
- MCP server (HTTP transport): https://extensionjs.mintlify.app/mcp

## CLI contracts for agents

- `npx extension@latest --ai-help --output json` emits the command and flag
  surface plus contract file paths.
- In development the CLI writes `ready.json` and `events.ndjson` under
  `.extension-js/` so an agent can await readiness without parsing logs.

## Key rules

- The project root is the directory that contains `manifest.json`.
- Special folders `pages/`, `scripts/`, and `public/` sit at that root.
- Template slugs are listed at https://extension.js.org/docs/getting-started/templates
