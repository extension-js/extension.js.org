---
sort: 2
---

```sh
npx extension-create dev [extension-path | extension-url] [options]
```

**Responsible for running your extension in `development` mode.** Gets the extension and bundles in a new browser instance. Browser extension files are watched and live-reloaded as they change.

If a URL is provided, `extension-create` will download and run the extension in the current working directory and follow the same tasks any other local extension would. _This feature only works for [GitHub](https://github.com) repositories currently_.

The target browser determines which browser they want to run their extension. Setting it to `"all"` will open all available browsers at once. If the user doesn't have the target browser installed, `extension-create will throw a compiler error.

Users can also opt for a different port to run their extensions.

## Default Browser Ports

| Browser | Default Port |
|-|-|
| Google Chrome | `:8000` |
| Microsoft Edge | `:8001` |

## Arguments And Flags

| Flag          | Argument                                | What it does                                  | Defaults to |
| ------------- | --------------------------------------- | --------------------------------------------- | ----------- |
| [path or url] | The extension path or the remote extension URL      | If a path is defined, loads the local extension. If a URL is provided, pulls the extension from remote source and loads it as a local extension         | `process.cwd()`        |
| -p, --port    | The port used to serve watched files    | Changes the port for the "dev" script         | See above   |
| -b, --browser | The browser that will run the extension | Changes the browser (`chrome`, `edge`, `all`) | "chrome"    |

<!--
| Flag                | Argument                    | What it does                                                                                                                          |
| ------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| -o, --open          | boolean                     | Whether to open the browser. This invalidates the `--user-data-dir` flag. Defaults to `true`.                                         |
| -u, --user-data-dir | file path or boolan         | What browser profile path to use. A boolean value of false sets the profile to the default user profile. Defaults to a fresh profile. |
| -b, --browser       | 'chrome' or 'edge' or 'all' | Which browser to target your extension build. Defaults to `'chrome'`.                                                                 |
| -p, --polyfill      | boolean                     | Whether or not to apply the cross-browser polyfill. Defaults to `true`.                                                               |
| -a, --auto-reload   | boolean                     | Whether to enable auto-reload on save. Defaults to `true`.                                                                            |
| -p, --port          | number                      | What port should extension-create/develop run. Defaults to `3000`.                                                                    |
| -r, --reloader-port | number                      | What port should run the reloader run. Defaults to `8081`.
-->

---

**🧩 extension-create** • create cross-browser extensions with no build configuration.
