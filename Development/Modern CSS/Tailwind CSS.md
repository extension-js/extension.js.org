---
sort: 3
---

`Extension` offers first-class support for the utility-first CSS framework for rapidly building modern extensions without ever leaving your HTML.

## Starter Tailwind Templates 

The easiest way to get started with `Tailwind CSS` with `Extension` is using a template. Currently, there are three templates that include `Tailwind CSS` as a dependency. See [[Templates]] to learn more.

## Usage With An Existing Extension 

### Installation

```sh
# Install required dependencies
npm install -D tailwindcss postcss autoprefixer

# Generates Tailwind.css config files:
# -`postcss.config.js`
# -`tailwind.config.js`

npx tailwindcss init -p
```

### Configuration

In `tailwind.config.js`, add the paths to the files you want `Tailwind` to work:

```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Optional: Note the addition of the `pages` directory.
    // See "Special Folders" in this documentation for info.
    './pages/**/*.{html,js,ts,jsx,tsx,mdx}',
 
    // Applies to everyone. Note the "html" file extension which
    // is not common for React apps but for regular HTML extensions.
    './**/*.{html,js,ts,jsx,tsx,mdx}', 

    // Or if using `src` directory:
    './src/**/*.{html,js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Usage

Tailwind generated styles by injecting CSS directives to a Global Stylesheet in your extension, so you need to import the global file in a place where these styles can be inherit. 

First, create the global CSS file.

```css
/* css/globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now, add `css/globals.css` as an import for the file you want Tailwind.css to work. For example: 

#### In An HTML File

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New Extension</title>
    <!-- Add the Tailwind global stylesheet -->
    <link rel="stylesheet" href="./css/globals.css" media="screen" />
  </head>
  <body>
    <!-- Add the styles you need -->
   <h1 className="text-4xl font-bold">Hello, Extension.</h1>
  </body>
</html>

```

#### In A JavaScript File

```js
// ./NewTabApp.jsx

import './css/globals.css'
 
export default function MyNewTabPage() {
  return (
    <h1 className="text-4xl font-bold">Hello, Extension.</h1>
  )
}
```

#### In A `content_script` File

```js
// ./content_script.jsx

// There is no HTML in a content_script file, so
// we import our global CSS file via dynamic import. 
import('./css/globals.css')
 
export default function MyNewTabPage() {
  return <h1 className="text-3xl font-bold underline">Hello, Extension!</h1>
}
```

#### In The `manifest.json` File

The manifest.json file supports `.css` extensions for `content_scripts`.

```diff
{
  "manifest_version": 3,
  "version": "1.0",
  "name": "My Content Scripts Extension",
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
+     "css": ["./css/global.css"]
    }
  ]
}

```

## Next Steps

* Ensure the semantics and code quality of your CSS files by using [[Stylelint]].

---

**🧩 Extension** • create cross-browser extensions with no build configuration.
