---
sort: 3
---

`extension-create` has built-in CSS support using PostCSS and compiles CSS with the following transformations:

Customizing Target Browsers
Next.js allows you to configure the target browsers (for Autoprefixer and compiled css features) through Browserslist.

To customize browserslist, create a browserslist key in your package.json like so:

package.json

{
  "browserslist": [">0.3%", "not dead", "not op_mini all"]
}
You can use the browsersl.ist tool to visualize what browsers you are targeting.


| feature name | description | extension|
|-|-|-|
| [CSS Modules](#css-modules) | Locally scoped CSS classes. | *.module.css |
| [Sass](#sass) | Sass is the most mature, stable, and powerful professional grade CSS extension language in the world. | *.sass, *.scss |
| [LESS](#less) | Less extends CSS with dynamic behavior such as variables, mixins, operations and functions. | *.less |
| [CSS-in-JS](#css-in-js) | A pattern where CSS is composed using JavaScript instead of defined in external files. | ?? |


### CSS Modules

No configuration is needed to support CSS Modules. To enable CSS Modules for a file, rename the file to have the extension .module.css.

You can learn more about Next.js' CSS Module support here.

### Customizing Plugins

> Warning: When you define a custom PostCSS configuration file, Next.js completely disables the default behavior. Be sure to manually configure all the features you need compiled, including Autoprefixer. You also need to install any plugins included in your custom configuration manually, i.e. npm install postcss-flexbugs-fixes postcss-preset-env.

To customize the PostCSS configuration, create a postcss.config.json file in the root of your project.

This is the default configuration used by Next.js:

postcss.config.json

```
{
  "plugins": [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        "autoprefixer": {
          "flexbox": "no-2009"
        },
        "stage": 3,
        "features": {
          "custom-properties": false
        }
      }
    ]
  ]
}
```

Good to know: Next.js also allows the file to be named .postcssrc.json, or, to be read from the postcss key in package.json.

It is also possible to configure PostCSS with a postcss.config.js file, which is useful when you want to conditionally include plugins based on environment:

postcss.config.js
```
module.exports = {
  plugins:
    process.env.NODE_ENV === 'production'
      ? [
          'postcss-flexbugs-fixes',
          [
            'postcss-preset-env',
            {
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
              features: {
                'custom-properties': false,
              },
            },
          ],
        ]
      : [
          // No transformations in development
        ],
}
```

Good to know: Next.js also allows the file to be named .postcssrc.js.

Do not use require() to import the PostCSS Plugins. Plugins must be provided as strings.

Good to know: If your postcss.config.js needs to support other non-Next.js tools in the same project, you must use the interoperable object-based format instead:

```
module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
  },
}
```

## CSS Modules

https://nextjs.org/docs/pages/building-your-application/styling/css-modules

## SASS

https://nextjs.org/docs/pages/building-your-application/styling/sass

## LESS

TODO

## CSS-in-JS

https://nextjs.org/docs/pages/building-your-application/styling/css-in-js

---

**🧩 extension-create** • create cross-browser extensions with no build configuration.
