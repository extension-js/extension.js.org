---
sort: 2
---

In the early days of web development, CSS was challenging due to its limitations in scalability and maintainability. CSS preprocessors provided a way to organize stylesheets modularly, leading to the evolution of modern CSS practices.

`Extension` supports different ways of processing (more precisely, pre-processing and post-processing) CSS in your extension and offers some built-in tools to speed up the addition of styles into your browser extension.

## Feature Support

In addition to regular `*.css` files, `Extension` also supports the following file extensions and CSS utilities:

| feature name | description | extension|
|-|-|-|
| [[CSS Modules]] | Locally scoped CSS classes. | *.module.css |
| [[Sass]] | Sass is the most mature, stable, and powerful professional grade CSS extension language in the world. | *.sass, *.scss |
| [[Less]] | Less extends CSS with dynamic behavior such as variables, mixins, operations and functions. | *.less |
| [[Tailwind]] | First class support for the utility-first CSS framework for rapidly building modern extensions without ever leaving your HTML. | *.css |

## Next Steps

* Using [[Stylelint]] with `Extension` to lint your stylesheets.

---

**🧩 Extension** • create cross-browser extensions with no build configuration.
