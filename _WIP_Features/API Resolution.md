---
sort: 5
---

## Support for API File Paths

```diff
- # During development.
- chrome.action.setIcon({path: "../../images/popup.html"});

+ # During production.
+ chrome.action.setIcon({path: "/assets/popup.html"});
```

`extension-create` comes with a built-in API resolver. This allows developers to specify the real path of their extension file requests without worrying about whether the output path will be resolved after compilation, allowing your extension to efficiently communicate and interact with web pages and other extension features. Allowing automatic path resolution.

---

**🧩 extension-create** • create cross-browser extensions with no build configuration.
