---
sort: 1
---

<!-- make a video of running something -->

Browser Runners allow developers to run their extension against multiple browser targets with built-in integration with the extension bundle, and offer support for useful commands such as setting up the default home page.

Features: 
- Zero-config auto-reload for [virtually everything](https://github.com/cezaraugusto/webpack-run-chrome-extension/issues/4) including all HTML overrides, and every resource you plan to require via `<script>` and `<link>` in manifest declared HTML pages.
- Fresh profile with developer mode enabled by default on every run. (customizable)
- Opens the handy "chrome://extensions" by default for fast debugging.
- Uses the system browser instead of fully downloading Chrome. (accepts Canary builds)
- Closing the webpack process instantly kills all child processes. No extra steps to open/close Chrome.
- Supports [virtually all Chrome flags](https://peter.sh/experiments/chromium-command-line-switches/).

## API

### new RunChromeExtension(options)

#### Options

##### extensionPath (required)

Type: `string`

Path to your extension. Must point to the same directory as the manifest file.

##### browserFlags (optional)

Type: `Array<string>`

Additional flags to pass to Chrome. Defaults to [these flags](https://github.com/GoogleChrome/chrome-launcher/blob/master/src/flags.ts).

For a full list of available flags, see https://peter.sh/experiments/chromium-command-line-switches/.

##### userDataDir (optional)

Type: `string` | `boolean`

What Chrome profile path to use. A boolean value of `false` sets the profile to the default user profile. Defaults to a fresh Chrome profile.

##### startingUrl (optional)

Type: `string`

What URL to start the browser with. Defaults to `about:blank`

##### autoReload (optional)

Type: `boolean`

Whether to enable auto-reload on save. Defaults to `true`

##### port (optional)

Type: `number`

What port should run the extension reloader. Defaults to `8081`

```sh
npx extension dev my-extension --browser=<browser-name>
```
### Desktop Browsers

| Browser         | Website                                       | Supported         |
|-----------------|-----------------------------------------------|-------------------|
| Google Chrome   | [https://chrome.google.com](https://chrome.google.com)| ✅                |
| Mozilla Firefox | [https://mozilla.org/firefox](https://mozilla.org/firefox)| ⛔️            |
| Microsoft Edge  | [https://microsoft.com/edge](https://microsoft.com/edge)| ✅              |
| Opera           | [https://opera.com](https://opera.com)                | ⛔️                |
| Brave           | [https://brave.com](https://brave.com)                | ⛔️                |
| Vivaldi         | [https://vivaldi.com](https://vivaldi.com)            | ⛔️                |
| Safari (macOS)  | [https://apple.com/safari](https://apple.com/safari)  | ⛔️                |

### Mobile Browsers

| Browser             | Website                                           | Supported         |
|---------------------|---------------------------------------------------|-------------------|
| Firefox for Android | [https://mozilla.org/firefox/mobile](https://mozilla.org/firefox/mobile) | ⛔️ |
| Kiwi Browser        | [https://kiwibrowser.com](https://kiwibrowser.com)        | ⛔️                |



It also includes support for running the following browsers:

chrome, edge
![chrome](https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome.svg")
![edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge.svg")



Desktop Browsers

![edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge.svg")


Mobile Browsers

![edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge.svg")


Desktop Browsers:
Google Chrome: Supports web extensions through the Chrome Web Store.
Mozilla Firefox: Has support for web extensions available through the Firefox Add-ons site.
Microsoft Edge: The newer versions of Edge, based on Chromium, support web extensions available on the Microsoft Store.
Opera: Supports web extensions and has its own add-ons site, but can also use Chrome's extensions via an add-on.
Brave: Built on the Chromium project, supports the same web extensions as Chrome.
Vivaldi: Another Chromium-based browser that supports web extensions from the Chrome Web Store.

Mobile Browsers:
Firefox for Android (Fenix): Supports a limited set of web extensions specifically curated for mobile.
Kiwi Browser: An Android browser based on Chromium that supports Chrome extensions.
Yandex Browser: Available for Android and supports web extensions.

---

**🧩 extension-create** • create cross-browser extensions with no build configuration.
