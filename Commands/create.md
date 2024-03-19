---
sort: 1
---

```sh
yarn extension-create <extension-name|extension-path> [options]
```

**Responsible for creating new extensions,** the `create` command also accepts a `--template` flag where you can set one of the custom templates available (see [[Templates]]).


```sh
npx extension create my-extension --template=react
```

Users can also opt for a different directory to install their extensions. Defaults to `process.cwd()`.


```sh
npx extension create patb/to/my-extension --template=react
```

## Arguments And Flags 

| Flag           | Argument                                                | What it does                                | Defaults to   |
| -------------- | ------------------------------------------------------- | ------------------------------------------- | ------------- |
| `[path or name]`     | The extension path or name                        | If a path is defined, loads the local extension. If a name is provided, loads the extension in the current working directory. | `process.cwd()` |
| -t, --template | Name of the template used to bootstrap your extension   | Bootstrap your extension using a template   | [new](n/getting-started/templates/templates#template-new)           |


---

**🧩 extension-create** • create cross-browser extensions with no build configuration.
