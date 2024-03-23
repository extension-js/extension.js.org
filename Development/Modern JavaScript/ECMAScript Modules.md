---
sort: 0
---

From [https://nodejs.org/api/esm.html#introduction](https://nodejs.org/api/esm.html#introduction):

> ECMASCript modules are the official standard format to package JavaScript code for reuse. Modules are defined using a variety of import and export statements.

## Starter ECMASCript Module Template

`extension-create` comes with a default ECMASCript Module template for new projects, which you can use as a starting point for your next ECMASCript Module-based Extension. This is the easiest way to have ECMASCript Modules integrated with `extension-create`.

<img src="https://place-hold.it/700x400">

### Try it yourself

```sh
npx extension create my-extension --template=esm
```

## Usage With An Existing Extension 

To make `extension-create` recognize all files as ECMAScript Modules, you have two options:

1. Add an `m` prefix to your JavaScript file, or
2. Define `"type": "module"` in your `package.json`

**Option #1 - Add an `m` prefix to your JavaScript Extension File**

```diff
- my-extension.js
+ my-extension.mjs

- my-extension.ts
+ my-extension.mts

- my-extension.jsx
+ my-extension.mjsx

- my-extension.tsx
+ my-extension.mtsx
```

**Option #2 - Define `"type": "module"` in your `package.json`**

```diff
// package.json
{
  "name": "my-extension",
  "version": "1.0",
  "description": "My Extension Example.",
+ "type": "module"
  "devDependencies": {
    "extension": "latest"
  },
  "scripts": {
    "dev": "extension dev",
    "start": "extension start",
    "build": "extension build"
  }
}
```

## Differences From Non-ECMAScript Modules

ECMAScript Modules have some differences from CommonJS modules. See below.

### Relative requests must include a filename and file extension (e.g. `*.js` or `*.mjs`).

Except for modules imported from your `package.json`, all imports must include its file extension.

```diff
// my-file.mjs

// React doesn't need a file extension since it's imported from package.json
import React from 'react'

// myImport needs a file extension since it's a locally imported module
+ import myImport from './myImport.js'
- import myImport from './myImport'
```

### Only the `"default"` export can be imported from non-ESM. Named exports are not available.

If the file you are working on is not an ESM but the file you are importing is, then it must use 
a default import to work.

```diff
// my-file.js -- not a module.

// myImport is a module. It only works via default import/export.
+ import myDefaultExport from './myImport.mjs'
- import {myExportedMethod} from './myImport.mjs'
```

### CommonJs Syntax is not available

Attempting to use CommonJs syntax such as `require`, `module`, `exports`, `__filename`, `__dirname` will result in an error.

## Next Steps

- Learn how `extension-create` works with extensions using [[CSS Modules]].

---

**🧩 extension-create** • create cross-browser extensions with no build configuration.
