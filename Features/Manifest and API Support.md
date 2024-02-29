---
sort: 1

---

<!-- 
AUTHOR HIT: Core Features are the "extension" plugins in the webpack-config
-->

Offering comprehensive support for `manifest.json` and seamless API integration provides developers with greater control over their browser extension's features. This level of control enhances quality assurance, error management, and a more sophisticated reload strategy, ensuring a smoother development process.

## Support for Manifest Files

`extension-create` ensures your `manifest.json` is supported for various fields to enhance your extension's functionality and user experience.

### HTML Support

| Manifest Field                   | File Type Expected |
|----------------------------------|--------------------|
| `action.default_popup`           | .html               |
| `background.page`                | .html               |
| `browser_action.default_popup`   | .html               |
| `chrome_url_overrides.bookmarks` | .html               |
| `chrome_url_overrides.history`   | .html               |
| `chrome_url_overrides.newtab`    | .html               |
| `devtools_page`                  | .html               |
| `options_ui.page`                | .html               |
| `page_action.default_popup`      | .html               |
| `sandbox.pages`                  | .html               |
| `sidepanel`                      | .html               |
| `sidebar_action.default_panel`   | .html               |

### Icons Support

| Manifest Field                 | File Type Expected |
|--------------------------------|--------------------|
| `action.default_icon`          | .png, .jpg, ...Other image formats           |
| `browser_action.default_icon`  | .png, .jpg, ...Other image formats           |
| `theme_icons`                  | .png, .jpg, ...Other image formats           |
| `icons`                        | .png, .jpg, ...Other image formats           |
| `page_action.default_icon`     | .png, .jpg, ...Other image formats           |
| `sidebar_action.default_icon`  | .png, .jpg, ...Other image formats           |

### JSON Fields

| Manifest Field              | File Type Expected |
|-----------------------------|--------------------|
| `declarative_net_request.rule_resources`   | .json               |
| `storage.managed_schema`                   | .json               |

### Scripts Fields

| Manifest Field                 | File Type Expected |
|--------------------------------|--------------------|
| `background.service_worker`    | .js, .jsx, .ts, .tsx, .mjs, .mjsx, .mts, .mtsx |
| `background.scripts`           | .js, .jsx, .ts, .tsx, .mjs, .mjsx, .mts, .mtsx |
| `content_scripts.js`           | .js, .jsx, .ts, .tsx, .mjs, .mjsx, .mts, .mtsx |
| `content_scripts.css`          | .css, .scss, .sass, .less                      |
| `user_scripts.api_script`      | .js, .jsx, .ts, .tsx, .mjs, .mjsx, .mts, .mtsx |

### Web Accessible Resources

Files imported in `content_scripts` are set as `web_accessible_resources` by default.

## Support for API File Paths

```diff
- chrome.action.setIcon({path: "../../images/popup.html"});
+ chrome.action.setIcon({path: "/assets/popup.html"});
```

With the built-in API resolver, we ensuring your extension can efficiently communicate and interact with web pages and browser features. This tool automatically resolves paths and manages permissions, making API calls straightforward and minimizing the potential for errors.

---

**🧩 extension-create** • create cross-browser extensions with no build configuration.
