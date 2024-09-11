---
sort: 1
---

From [https://sass-lang.com/](https://sass-lang.com/):

> Sass is the most mature, stable, and powerful professional grade CSS extension language in the world

`Extension` supports both `.scss` and `sass` extensions. It also supports component-level Sass via CSS Modules and the `.module.scss` or `.module.sass` extension.

## Starter Scss Template

`Extension` comes with a default Sass Module template for new projects, which you can use as a starting point for your next Sass Extension. This is the easiest way to have Sass integrated with `Extension`.

<!-- <img src="https://place-hold.it/700x400"> -->

### Try it yourself

```sh
npx extension dev @Extension/templates/sass
```

## Usage With An Existing Extension

### Installation & Configuration

```sh
# Install required dependency
npm install -D sass
```

### Usage

#### In An HTML File

```html
<!doctype html>
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

import styles from './styles/button.module.scss'

export default function MyNewTabPage({ Component, pageProps }) {
  return (
    <h1 className={{styles.primaryColor}}>Hello, Extension.</h1>
  )
}
```

<!--
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
-->

#### As A Module

```scss
/* styles/button.module.scss */

$primary-color: #64ff00;

:export {
  primaryColor: $primary-color;
}
```

```js
// ./NewTabApp.jsx

import styles from './styles/button.module.scss'

export default function MyNewTabPage({ Component, pageProps }) {
  return (
    <h1 className={{styles.primaryColor}}>Hello, Extension.</h1>
  )
}
```

Now, add `css/button.scss` as an import for the file you want Sass to work. For example:

## Next Steps

- Ensure the semantics and code quality of your CSS files by using [[Stylelint]].

---
