---
title: Welcome
headline: Welcome to extension-create
panel: false
---
<!-- 
AUTHOR TIP:


-->
`extension-create` is a development tool for browser extensions, allowing developers to create cross-browser extensions with no build configuration.

Designed with practicity and fast prototyping in mind, running a single terminal command is enough to start developing your extension and requires no extra knowledge to get started.

<!-- <div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="<LOOM_VIDEO_URL>" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div> -->

## Usage With An Existing Extension

If you have an existing extension and uses a package manager, install the `extension` package.

```sh
npm install extension@latest --save-dev
```

Then, edit the `package.json` file and add the development commands to your scripts field.

```json
{
  "scripts": {
    "dev": "extension dev",
    "start": "extension start",
    "build": "extension build"
  },
  "devDependencies": {
    // ...other deps,
    "extension": "latest"
  }
}
```

Done. You are all set!

* To develop the extension, run `npm run dev`.
* To visualize the extension in production mode, run `npm run start`.
* To build the extension in production mode, run `npm run build`.

<!-- > [!tip]
> If you have an existing extension and want to fully migrate it to extension-create, read [[Migrating Your Extension]] -->

## Create a Starter Extension

`extension-create` has a `create` command that allows you to generate the foundations of your next extension project. It also supports templates via `--template` flag.

```sh
npm extension-create create <your-extension-name>
```


<!-- <div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="<LOOM_VIDEO_URL>" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div> -->

Supported Templates:

```sh
# Default
npm extension-create create <your-extension-name>

# Web
npm extension-create create <your-extension-name> --template=web

# React
npm extension-create create <your-extension-name> --template=react

# TypeScript
npm extension-create create <your-extension-name> --template=typescript

# React + TypeScript:
npm extension-create create <your-extension-name> --template=react-typescript
```

## Next Steps

- [[Create Your First Extension]]

---

**🧩 extension-create** • create cross-browser extensions with no build configuration.