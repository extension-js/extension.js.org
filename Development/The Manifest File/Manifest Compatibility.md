---
sort: 2

---

The manifest.json file is the only required file in an extension. While very similar between browsers and versions, different versions and different browser vendors can have slightly different requirements between them.

In an ideal world, browser vendors would agree between conventions and developers shouldn't worry about cross-browser compatibilities. While this doesn't happen, `extension-create` has an ever growing support for the different manifest files across `manifest_version`s and browser vendors.

## Check For Required Fields

![Required Field](../assets/required_field.png)

It is a common standard across all browsers vendors that the minimum Manifest file should contain a `name`, a `version`, and a `manifest_version` field as requirements. Missing one of these fields results in a runtime error.

## Check For Deprecated Fields

Fields such as [`options_page`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/options_page) are deprecated in current valid Manifest versions. ~~Using deprecated fields results in a runtime error~~. [This feature is being tracked for future implementation](https://github.com/cezaraugusto/extension-create/issues/43).
## Check For Invalid Field Types

![Invalid Field](../assets/invalid_field.png)

While the [`action` page in Chrome](https://developer.chrome.com/docs/extensions/reference/api/action) accepts a `default_icon` field value as a string, per the [official Manifest JSON Schema](https://json.schemastore.org/chrome-manifest.json) it is expected to be an object in Manifest V3. Using invalid field types results in a warning message.

<!-- 
## Check If Field is Supported By The Manifest Version

While the [`web_accessible_resources`](https://developer.chrome.com/docs/extensions/develop/migrate/manifest) field accepts an array of strings in Manifest V2, in Manifest V3 it is set as an array of objects. ~~Using fields not supported by the current `manifest_version` results in an error message~~. [This feature is being tracked for future implementation](https://github.com/cezaraugusto/extension-create/issues/42).

## Check If Field is Supported By The Current Browser

The property `theme_icons` of [`browser_action`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action) enables you to specify different icons for themes depending on whether Firefox detects that the theme uses dark or light text, but it has no effect in Chrome. ~~Using fields not supported by the current browser results in a warning message~~. [This feature is being tracked for future implementation](https://github.com/cezaraugusto/extension-create/issues/39).
-->
---

**🧩 extension-create** • create cross-browser extensions with no build configuration.
