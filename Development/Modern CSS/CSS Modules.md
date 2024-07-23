---
sort: 0
---

From [https://github.com/css-modules/css-modules](https://github.com/css-modules/css-modules).

> A CSS Module is a CSS file where all class names and animation names are scoped locally by default.

`Extension` offers first-class support for CSS modules, including Sass modules (`*.module.sass`, `*.module.scss`).

## Starter CSS Module Template 

`Extension` comes with a default CSS Module template for new projects, which you can use as a starting point for your next CSS Module-based Extension. This is the easiest way to have CSS Modules integrated with `Extension`.

<!-- <img src="https://place-hold.it/700x400"> -->

### Try it yourself 

```sh
npx extension dev @Extension/templates/css-modules
```

## Usage With An Existing Extension 

`Extension` offfers zero-config CSS modules support. To enable CSS Modules for a CSS file, just rename it to include `.module.css`.

```diff
- myComponentCss.css
+ myComponentCss.module.css
```

#### Usage

```js
import buttonStyles from './styles/myComponent.module.css'
 
export default function NewTabPage() {
  return (
    <button className={buttonStyles.primary}>
      Click here
    </button>
  )
}
```

---

**🧩 Extension** • create cross-browser extensions with no build configuration.
