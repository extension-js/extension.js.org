---
sort: 3
---

To allow developers to use the latest language features without worrying about browser or environment constraints, `Extension` relies on [[Babel]] to transpile cutting-edge JavaScript and TypeScript code, ensuring broad compatibility and enabling developers.

## Manifest Capabilities

One of the major challenges of developing an extension from scratch (and main motivation to start this project) is the lack of full manifest features support provided by the many frameworks/boilerplates/templates currently available.

With that in mind, `Extension` is designed to ensure that most of manifest.json features are covered for the various extension fields available. See [[Manifest Capabilities]].

## Manifest Compatibility

The `manifest.json` file is the only required file in an extension. While very similar between browsers and versions, different versions and different browser vendors can have slightly different requirements between them. See [[Manifest Compatibility]] to learn more.

## Next Steps

* See the Commands [[Reference]].

---

**🧩 Extension** • create cross-browser extensions with no build configuration.
