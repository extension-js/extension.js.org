---
title: Welcome
headline: Welcome to Extension
panel: false
---


`Extension` is a development tool for browser extensions with built-in support for [[TypeScript]], [[WebAssembly]], [[React]], and [[modern JavaScript]].


Designed with practicity and fast prototyping in mind, running a single terminal command is enough to start developing your extension and requires no extra knowledge to get started.
> Create cross-browser extensions with no build configuration.

![Extension default template](./browser-all.png)

## Create A New Extension

<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/58e21900d693417db1e0e59c0a96c4b3?sid=80cf1003-7ed1-4f9d-a3fb-01c7876983ad" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`Extension` has a default `create` command that allows you to generate the foundations of your next extension project (see demo above). It also supports templates via `--template` flag.

```sh
npx extension create <your-extension-name>
```

For a list of all supported templates, see [[Templates]].

## Usage With An Existing Extension

<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/c7ae4fc7cdfc47c39334c7efe3175dd9?sid=035792a7-aec9-4f1a-852b-47ca7166a539" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

If you have an existing extension which is using a package manager, you can install the `Extension` package and manually create the scripts used to run your extension. See the demo above or follow these instructions to get it done:

**Step 1 - Install Extension as a `devDependency`**

```sh
npm install extension --save-dev
```

**Step 2 - Link your npm scripts with the executable `Extension` commands**

```json
{
  "scripts": {
    "build": "extension build",
    "dev": "extension dev",
    "start": "extension start"
  },
  "devDependencies": {
    // ...other deps,
    "extension": "latest"
  }
}
```

Done. You are all set!

- To develop the extension, run `npm run dev`.
- To visualize the extension in production mode, run `npm run start`.
- To build the extension in production mode, run `npm run build`.

## Next Steps

- Learn how to [[Create Your First Extension]].
- Have an idea in mind? Check the built-in [[Templates]] available.

---

**🧩 Extension** • create cross-browser extensions with no build configuration.
