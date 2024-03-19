---
sort: 2
---

#### Demo

<img src="https://place-hold.it/500">

```sh
npx extension dev @extension-create/templates/less
```

#### In an HTML file

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
   <h1 className="text-4xl font-bold">Hello, extension-create.</h1>
  </body>
</html>

```

#### In a JavaScript File

```js
// ./NewTabApp.jsx

import './css/globals.css'
 
export default function MyNewTabPage() {
  return (
    <h1 className="text-4xl font-bold">Hello, extension-create.</h1>
  )
}
```

#### In a content_script file

```js
// ./content_script.jsx

// There is no HTML in a content_script file, so
// we import our global CSS file via dynamic import. 
import('./css/globals.css')
 
export default function MyNewTabPage() {
  return <h1 className="text-3xl font-bold underline">Hello, extension-create!</h1>
}
```

## Next Steps

* Learn how to apply styles to the multiple extension contexts in [[Working With Stylesheets]].
* Learn how to enable [[PostCSS]] capabilities in your extension.
* Configure [[Tailwind]] in your extension.
* Using [[Stylelint]] with extension-create to lint your stylesheets.

---

**🧩 extension-create** • create cross-browser extensions with no build configuration.
