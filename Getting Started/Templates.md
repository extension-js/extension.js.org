---
sort: 3

---

You can create new extensions based on existing templates. Just pass a `--template` flag and use one of the options below.

```sh
npx extension create my-extension --template=<template>
```
![Extension prompt](./assets/prompt.png)

|Template Flag|Description|Demo|
|-|-|-|
| `--template=new` | Includes a new tab page override (default). | [Demo](#template-new) |
| `--template=init`| Includes a single manifest.json file. | [Demo](#template-init) |
| `--template=content` | Includes a content_script. | [Demo](#template-content) |
| `--template=new-react` | Includes a new tab override using [React](https://react.dev), [TypeScript](https://www.typescriptlang.org/), and [Tailwind.css](https://tailwindcss.com/). | [Demo](#template-new-react) |
| `--template=new-typescript` | Includes a new tab override using [TypeScript](https://www.typescriptlang.org/). | [Demo](#template-new-typescript) |
| `--template=content-react` | Includes a content_script using [React](https://react.dev), [TypeScript](https://www.typescriptlang.org/), and [Tailwind.css](https://tailwindcss.com/). | [Demo](#template-content-react) |
| `--template=action-chatgpt` | Includes an action using [React](https://react.dev), [Tailwind.css](https://tailwindcss.com/), [DaisyUI](https://daisyui.com), and a ChatGPT integration. | [Demo](#template-action-chatgpt) |

# --template=new

The default template includes a new tab page override, built with HTML, CSS, and JavaScript.

![New Extension Template](./assets/new-template.png)

# --template=init

For fast prototypes, includes just a single manifest.json file.

![Init Extension Template](./assets/init-template.png)

```sh
npx extension create <your-extension-name> --template=init
```

# --template=content

Similar to the default template, except for the HTML part, which we inherit from the current tab. Uses JavaScript and CSS as a content_script.

![Content Extension Template](./assets/content-template.png)

```sh
npx extension create <your-extension-name> --template=content
```

# --template=new-react

Great for new projects using JSX without [TypeScript](https://www.typescriptlang.org/). Includes a new tab override using [React](https://react.dev) and [sakura.css](https://oxal.org/projects/sakura/).

![React Extension Template](./assets/react-template.png)

```sh
npx extension create <your-extension-name> --template=react
```

# --template=new-typescript

Similar to the default template, includes a new tab page override, built with HTML, CSS, and [TypeScript](https://www.typescriptlang.org/).

![TypeScript Extension Template](./assets/ts-template.png)

```sh
npx extension create <your-extension-name> --template=typescript
```

# --template=content-react

Great for bootstrapping extensions with a rich UI experience. Includes a content_script using [React](https://react.dev), [TypeScript](https://www.typescriptlang.org/) and [Tailwind.css](https://tailwindcss.com/).

![React+TypeScript Extension Template](./assets/react-ts-template.png)

```sh
npx extension create <your-extension-name> --template=react-typescript
```

# --template=action-chatgpt

The most complete template available. Fully integrated with the ChatGPT API. Includes a `sidebar_panel` using [React](https://react.dev), [Tailwind.css](https://tailwindcss.com/), and the [official OpenAI Node API library](https://www.npmjs.com/package/openai). 

![ChatGPT Extension Template](./assets/chatgpt-template.png)

```sh
npx extension create <your-extension-name> --template=chatgpt
```

# More templates

You can find more template [here](https://github.com/extension-js/extension.js/tree/main/examples). Use a folder name in the template param like so, `--template=<folder_name>`.

# Next Steps

* Understand [[Browser Runners]] and how they help you visualize your extension.
* Learn how `Extension` handles [[Environment Variables]].

---

**🧩 Extension** • create cross-browser extensions with no build configuration.
