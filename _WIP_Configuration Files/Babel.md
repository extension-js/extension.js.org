---
sort: 6
---

To allow developers to use the latest language features without worrying about browser or environment constraints, `extension-create` relies on [Babel](#) to transpile cutting-edge JavaScript and TypeScript code, ensuring broad compatibility and enabling developers.

https://nextjs.org/docs/pages/building-your-application/configuring/babel

## Feature Support

Here’s how each Babel plugin and preset contributes to this feature:

* [@babel/plugin-proposal-decorators](https://www.npmjs.com/package/@babel/plugin-proposal-decorators): Allows developers to use decorators in their code, providing a convenient and readable way to annotate and modify classes and properties at design time.
* [@babel/plugin-syntax-dynamic-import](https://www.npmjs.com/package/@babel/plugin-syntax-dynamic-import): Enables the use of dynamic import() syntax, facilitating code-splitting and lazy-loading of modules, which can significantly improve the performance of web applications.
* [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env): Automatically determines the Babel plugins and polyfills needed based on the target environment's feature support, ensuring that the output code runs efficiently across all platforms.
* [@babel/preset-react](https://www.npmjs.com/package/@babel/preset-react): Transforms JSX into standard JavaScript, making it compatible with the browser and enabling the use of React's powerful UI library and its ecosystem.
* [@babel/preset-typescript](https://www.npmjs.com/package/@babel/preset-typescript): Provides support for TypeScript, allowing developers to leverage type-safe programming, interfaces, and other TypeScript features, which are compiled down to standard JavaScript.
* [babel-plugin-react-require](https://www.npmjs.com/package/babel-plugin-react-require): Automatically injects the React import statement in files that use JSX, ensuring that the React namespace is always available where needed.
* [babel-plugin-transform-react-remove-prop-types](https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types): Removes PropTypes from the production build of React components, reducing the bundle size and improving the performance of the production app.

This comprehensive setup empowers developers to write modern, efficient, and clean extension code across various modern web technologies, including [[React]] and [[TypeScript]].

## Next Steps

* Add a custom [[Babel]] config (`babel.config.js`) to your extension.
* To maintain compatibility across diverse browser vendors, see [[Polyfill]].
* Learn about [[React]] in extension-create.
* Learn about [[TypeScript]] in extension-create.

---

**🧩 extension-create** • create cross-browser extensions with no build configuration.
