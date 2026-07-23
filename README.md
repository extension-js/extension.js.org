[![CI](https://github.com/extension-js/extension.js.org/actions/workflows/ci.yml/badge.svg)](https://github.com/extension-js/extension.js.org/actions/workflows/ci.yml)

# Extension.js Docs

> The documentation website for Extension.js

<a href="https://extension.js.org"><img alt="Extension.js — the cross-browser extension framework" src="https://media.extension.land/brand/extension-js/social/github-banner.png" /></a>

Extension.js Docs is the documentation site for the cross-browser extension framework. It publishes the guides, references, workflows, and implementation notes for [Extension.js](https://extension.js.org).

- Read the docs: [extension.js.org](https://extension.js.org)
- View the available examples: [extension-js/examples](https://github.com/extension-js/examples)
- Explore the framework: [extension-js/extension.js](https://github.com/extension-js/extension.js)
- Contribute to the framework: [CONTRIBUTING.md](https://github.com/extension-js/extension.js/blob/main/CONTRIBUTING.md)

## Frameworks

Every framework below gets automatic detection, bundling, and dev-time updates, with no build config to write. What differs is the update model on edit: React hot-swaps with fast refresh and keeps component state, Vue and Svelte remount, and TypeScript, vanilla JS, and WebAssembly reload per surface.

<div align="center">

| <img alt="ESNext" src="https://media.extension.land/logos/frameworks/esnext.png" width="70"> | <img alt="TypeScript" src="https://media.extension.land/logos/frameworks/typescript.png" width="70"> | <img alt="WASM" src="https://media.extension.land/logos/frameworks/wasm.png" width="70"> | <img alt="React" src="https://media.extension.land/logos/frameworks/react.png" width="70"> | <img alt="Vue" src="https://media.extension.land/logos/frameworks/vue.png" width="70"> | <img alt="Svelte" src="https://media.extension.land/logos/frameworks/svelte.png" width="70"> | <img alt="Preact" src="https://media.extension.land/logos/frameworks/preact.png" width="70"> |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| ESNext<br>[Try out](https://templates.extension.dev/javascript) | TypeScript<br>[Try out](https://templates.extension.dev/typescript) | WASM<br>[Try out](https://github.com/extension-js/examples/tree/main/examples/transformers-js) | React<br>[Try out](https://templates.extension.dev/react) | Vue<br>[Try out](https://templates.extension.dev/vue) | Svelte<br>[Try out](https://templates.extension.dev/svelte) | Preact<br>[Try out](https://templates.extension.dev/preact) |

</div>

## Browsers

Chrome, Edge, and Firefox are the primary targets, and any Chromium- or Gecko-based fork you have installed (Brave, Opera, Vivaldi, Yandex, Waterfox, LibreWolf) is auto-located and runs through the same HMR workflow. Safari builds on macOS through Apple's converter and needs the full Xcode app.

<div align="center">

| <img alt="Google Chrome" src="https://media.extension.land/logos/browsers/chrome.svg" width="70"> | <img alt="Microsoft Edge" src="https://media.extension.land/logos/browsers/edge.svg" width="70"> | <img alt="Mozilla Firefox" src="https://media.extension.land/logos/browsers/firefox.svg" width="70"> | <img alt="Apple Safari" src="https://media.extension.land/logos/browsers/safari.svg" width="70"> | <img alt="Chromium-based" src="https://media.extension.land/logos/browsers/chromium.svg" width="70"> | <img alt="Gecko-based" src="https://media.extension.land/logos/browsers/firefox.svg" width="70"> |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Google Chrome<br>✅ Supported | Microsoft Edge<br>✅ Supported | Mozilla Firefox<br>✅ Supported | Apple Safari<br>✅ Supported | Chromium-based<br>✅ Supported | Gecko-based<br>✅ Supported |

</div>

## Package managers

`npm`, `pnpm`, `yarn`, `bun`, and `deno` all work for `create`, `dev`, and `build`. The toolchain is manifest-agnostic, so Deno projects scaffold a `deno.jsonc` instead of a `package.json` and everything else behaves the same.

<div align="center">

| <img alt="npm" src="https://media.extension.land/logos/package-managers/npm.svg" width="70"> | <img alt="pnpm" src="https://media.extension.land/logos/package-managers/pnpm.svg" width="70"> | <img alt="Yarn" src="https://media.extension.land/logos/package-managers/yarn.svg" width="70"> | <img alt="Bun" src="https://media.extension.land/logos/package-managers/bun.svg" width="70"> | <picture><source media="(prefers-color-scheme: dark)" srcset="https://media.extension.land/logos/package-managers/deno-dark.svg"><img alt="Deno" src="https://media.extension.land/logos/package-managers/deno.svg" width="70"></picture> |
| :-: | :-: | :-: | :-: | :-: |
| npm<br>✅ Supported | pnpm<br>✅ Supported | Yarn<br>✅ Supported | Bun<br>✅ Supported | Deno<br>✅ Supported |

</div>

## Run locally

Install dependencies:

```sh
pnpm install
```

Start the docs dev server:

```sh
pnpm dev
```

Build the site:

```sh
pnpm build
```

Preview the production build:

```sh
pnpm preview
```

## License

MIT (c) Cezar Augusto and the Extension.js authors.
