---
sort: 0

---

Welcome to the fast track of browser extension development with `extension-create`! Whether you're looking to prototype quickly or delve into full-scale development, you've made the right choice. Let's get your development environment set up and running in no time.

## Kickstart Any Sample from Chrome Extension Samples

Dive right into development by starting with a sample from the Chrome Extension Samples repository. It's a great way to get acquainted with best practices and save time:

1. Open your terminal.
2. Navigate to the directory where you want your project.
3. Run the command:
   ```bash
   npx extension dev <sample-name>
   ```
   Replace `<sample-name>` with the name of the sample you wish to use from [Chrome Extension Samples](https://github.com/GoogleChrome/chrome-extensions-samples).

<!-- > See the example below where we request the sample [page-redder](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.page-redder) from [Google Chrome Extension Samples](https://github.com/GoogleChrome/chrome-extensions-samples).

<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/e5782e95dce04b949935cf9c750ab472?sid=ea9b4daa-89cd-4661-8093-5fdb5446d676" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div> -->

## Use `Microsoft Edge` to Kickstart Any Sample

`extension-create` supports a variety of browsers, including Microsoft Edge. To start an Edge-compatible extension, simply:

1. Open your terminal.
2. Navigate to your desired project directory.
3. Execute:
   ```bash
   npx extension dev  <sample-name> --browser=edge
   ```
   Tailor your command by replacing `<sample-name>` with the specific sample you're interested in.

<!-- > See the example below where we request the sample [magic8ball](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/topSites/magic8ball) from  from [Google Chrome Extension Samples](https://github.com/GoogleChrome/chrome-extensions-samples) using Edge as the runtime browser.

<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/share/c04b012185a04e2aa19461a3fff1ff24?sid=1d36a0fe-7c7a-4802-9fb8-59a0b02912a6" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div> -->

## Run Mozilla Add-Ons in Chrome

Bridge the gap between Firefox and Chrome by running Mozilla Add-Ons in Chrome:

1. Navigate to your project directory.
2. Use the command:
   ```bash
   npx extension dev <addon-name> --browser=chrome --polyfill=true 
   ```
   This will fetch a Mozilla Add-On and adapt it for Chrome.

<!-- > See the example below where we request the sample [Top Sites](https://github.com/mdn/webextensions-examples/tree/main/top-sites) from  from [MDN WebExtensions Examples](https://github.com/mdn/webextensions-examples) using Chrome as the runtime browser.

<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/share/c04b012185a04e2aa19461a3fff1ff24?sid=1d36a0fe-7c7a-4802-9fb8-59a0b02912a6" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div> -->

## Some Tips To Help You Get Started

* To use TypeScript, add a `tsconfig.json` file to the root of your extension.
* To use React, just ensure you have it as a dependency in your `package.json`.
* Any `tsconfig.json` with React support makes your project React/TypeScript ready.
* If you need to handle assets not declared in the manifest, learn more about [[Special Folders]]</a>.

## Next Steps

Start exploring the world of browser extension development with `extension-create` by [[Create Your First Extension]].

---

**🧩 extension-create** • create cross-browser extensions with no build configuration.