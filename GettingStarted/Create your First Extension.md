---
sort: 3

---

To learn how to create an extension from scratch using `extension-create`, let's create one together, from scratch.

Take a common task for some developers: searching on GitHub.

**The problem:** I want to search on GitHub in the most convenient way. Imagine searching GitHub projects directly from your browser's URL bar.

The solution? Meet `github_search`, a tool that makes this possible. 

![howiwant.png](howiwant.png)

## The Plan

Our goal is to make GitHub project searches as easy as searching on Google. To avoid irrelevant searches when the user decides to search something else, let's reserve a keyword for our extension. If the user types "gh", followed by a space, will activate our extension to trigger our search. 

![search.png](search.png)
> The interface that we are creating here.

## Step 1 - Create the extension

Let's use the `create` command to bootstrap a minimal extension for us. Let's call it: `github-search`

```
npx extension-create create github-search
```

> TOdo: cezaraugusto run the command and cat the manifest file

## Step 1 - Create the manifest file

Every extension starts with a manifest file. It tells the browser information about the extension's metadata, permissions, and files that the extension needs to run properly. Based on the [plan above](#plan), we want a custom search shortcut "gh" that will link us to GitHub search. We are also adding a service_worker script to handle user events logic.

```jsx
{
  "manifest_version": 3,
  "name": "GitHub Search",
  "version": "1.0",
  "omnibox": {"keyword" : "gh"},
  "permissions": ["http://www.github.com/"],
  "background": {
    "service_worker": "service_worker.js"
  }
}
```

- `background.service_worker` will let us react to the custom search events.
- `permissions` define the capabilities of our extension.
- `omnibox` keyword "gh" sets our activation word in the URL bar.

## Step 2 - Create the Service Worker

Next, we need a script that listens for our keyword and searches GitHub. Create a `background.js` file with this code:

```js
chrome.omnibox.onInputEntered.addListener((text) => {
  const url = `https://github.com/search?q=${encodeURIComponent(text)}&type=issues`
  chrome.tabs.create({ url })
});
```

This script opens a new tab with GitHub search results whenever you enter something after "gh" in the URL bar.

## Step 3 - Load Your Extension

If you take a looka t your `package.json` file now, it looks more or less like this:

```json
{
  // ...your extension metadata
  "scripts": {
    "dev": "extension-create dev",
    "start": "extension-create start",
    "build": "extension-create build"
  },
  "devDependencies": {
    "extension-create": "latest"
  }
}

```

These scripts are the main scripts used by extension-create for development mode. To preview your extension, let load it for the first time.

```
npm run dev
```

> TODO cezaraugusto: run the command, open chrome, try to change the url, works, close


## Step 4 - Making It Better

To improve our extension, we can add search suggestions directly in the URL bar. Update `background.js` to fetch suggestions from GitHub and display them as you type.

Here's how to enhance your script for suggestions:

```jsx
function debounce(fn, delay) {
  let timeoutID;
  return function (...args) {
    if(timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn(...args), delay);
  }
}

chrome.omnibox.onInputChanged.addListener(debounce(async (text, suggest) => {
  const response = await fetch(`https://api.github.com/search/issues?q=${text}`);
  const data = await response.json();
  const suggestions = data.items.map(issue => ({
    content: issue.html_url,
    description: issue.title
  }));
  suggest(suggestions);
}, 250));
```

Adding this code lets you see live search suggestions from GitHub right in your URL bar, making your search experience even smoother. Here's how it looks like:

TODO: add the result extension

## 5 - Conclusion

Congratulations! You've built a GitHub search extension. Experiment with it, improve it, and make it your own. This is just the beginning of what you can do with browser extensions.

---

**🧩 extension-create** • create cross-browser extensions with no build configuration.