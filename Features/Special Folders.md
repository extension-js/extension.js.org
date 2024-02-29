---
templateEngineOverride: njk,md
sort: 2
---

Special folders are folders that allows you to work with files outside the scope of the manifest file. Since `extension-create` uses the manifest to generate the assets, files outside its scope are not bundled by default -- unless they are in a special folder.

| Folder Name | Description |
|-------------|-------------|
| `pages/`    | Allows adding complementary HTML pages to the compilation process, handling its resources as any other HTML file from the manifest. |
| `scripts/`  | Allows adding script files to the compilation process that are not present in the manifest file or HTML pages.                      |
| `public/`   | Allows adding static assets to the output directory without bundling. These files are not processed by extension-create.            |

## Handling HTML Pages

To work with complementary HTML files (such as internal page links or iframes), add the file into a `pages/` folder.

<img src="./pages.png">

**Example:** 
* A sandboxed page. [See code.](#)

## Handling Script Files

For scripts without the need of HTML files, add the file into a `scripts/` folder. Any JavaScript-like file in this folder is a valid entry point.

<img src="./scripts.png">

**Example:** 
* Scripts injected via <code>chrome.scripting.executeScript</code>. [See code.](#)


## Handling Static Assets

For files that you don't want extension-create to parse, or if you want a predictable output path, add your files to the `public/` folder, like `<your-project>/public/icon/subfolder/icon.png`.

<img src="./public.png">
  

---

**🧩 extension-create** • create cross-browser extensions with no build configuration.