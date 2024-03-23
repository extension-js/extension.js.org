---
sort: 2
---

One of the coolest features of extension-create is the ability to execute remote extensions. By running a valid GitHub URL as the command argument, `extension-create` downloads and execute the extension files against the target browser, as if you would using any local extension.

This is useful during prototype steps where you want to create something based on a working extension sample, such as [Chrome Samples](#) or [MDN samples](#). 

<!--
## Remote `create` command
-->

## Remote `dev` command

The `dev` command runs the extension in development mode with support for reloading upon file changes. By passing a valid GitHub URL (as long as there is a valid manifest file), extension-create will download the files to your current directory and run your extension against the current browser.

In the example below, we are using the remote Chrome Sample [page_redder](#).

```
npx extension dev xxxxx
```

## Remote `start` command

The `start` command runs the extension in production mode **without** support for reloading upon file changes. This is how your extension will look like for users, the equivalent of running a browser against the `build` of your extension. Aside from the reloading capability, runs the same way as the `dev` command does.

In the example below, we are using the remote Chrome Sample [xxxx](#).

## Remote `build` command

Builds your extension with production defaults. The build command does not run any browser, but uses it to validate files.

In the example below, we are using the remote Chrome Sample [xxxx](#).

## Next Steps

- Learn how to use different browsers as a target for your extension in [[Browser Runners]].
- Learn how to polyfill your extension so it runs across all major browsers in [[Browser API Support]].

---

**🧩 extension-create** • create cross-browser extensions with no build configuration.
