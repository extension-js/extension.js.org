/* global useState, useEffect, useRef */
export const TemplatesGallery = ({ locale = "en" }) => {
  // @generated:start
  const templates = [
    {
      slug: "action",
      title: "Action (Popup)",
      description: "Adds a toolbar popup to the browser with a simple page.",
      surfaces: ["action", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "beginner",
      tags: ["action", "popup", "javascript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "AWMlWK934qE",
      docsUrl:
        "https://extension.js.org/docs/implementation-guide/manifest-json",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click the toolbar icon to open the action popup",
        "Edit src/action/index.html and watch HMR update the popup",
      ],
      useCases: [
        "Toolbar popup as the primary UI surface",
        "Quick actions that don't need a full sidebar or page",
        "Starting point for popup-based browser extensions",
      ],
    },
    {
      slug: "action-locales",
      title: "Action Locales",
      description:
        "Adds a toolbar popup whose text follows your browser's language.",
      surfaces: ["action", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["action", "popup", "i18n", "javascript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "bY0Mtv77bVc",
      docsUrl: "https://extension.js.org/docs/implementation-guide/locales",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click the toolbar icon to see the popup in your browser's language",
        "Add a folder under _locales/ and switch your browser language to see it",
      ],
      useCases: [
        "A toolbar popup translated with the i18n API",
        "Shipping _locales without hand-editing the manifest",
        "Reference for localized extension UI across browsers",
      ],
    },
    {
      slug: "action-preact",
      title: "Preact Action (Popup)",
      description:
        "Adds a toolbar popup to the browser with a simple Preact page.",
      surfaces: ["action", "background"],
      framework: "preact",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["action", "popup", "preact", "typescript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: null,
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/preact",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click the toolbar icon to open the action popup",
        "Edit src/action/ActionApp.tsx and save to see fast refresh update it",
      ],
      useCases: [
        "A toolbar popup rendered by Preact",
        "Quick actions that read and open tabs with no permission",
        "Starting point for Preact extensions with a popup",
      ],
    },
    {
      slug: "action-svelte",
      title: "Svelte Action (Popup)",
      description:
        "Adds a toolbar popup to the browser with a simple Svelte page.",
      surfaces: ["action", "background"],
      framework: "svelte",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["action", "popup", "svelte", "typescript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: null,
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/svelte",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click the toolbar icon to open the action popup",
        "Edit src/action/ActionApp.svelte and save to watch it update",
      ],
      useCases: [
        "Toolbar popup rendered by Svelte as the primary UI surface",
        "Quick actions that update the toolbar badge from the popup",
        "Starting point for Svelte extensions with a popup",
      ],
    },
    {
      slug: "action-vue",
      title: "Vue Action (Popup)",
      description:
        "Adds a toolbar popup to the browser with a simple Vue page.",
      surfaces: ["action", "background"],
      framework: "vue",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["action", "popup", "vue", "typescript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: null,
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/vue",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click the toolbar icon to open the Vue popup",
        "Edit src/action/ActionApp.vue and save to watch it update",
      ],
      useCases: [
        "A toolbar popup rendered by Vue",
        "Single-file components compiled with no extra config",
        "Starting point for Vue extensions with a popup",
      ],
    },
    {
      slug: "ai-chatgpt",
      title: "ChatGPT AI Sidebar",
      description:
        "Adds a sidebar panel where you can chat with ChatGPT about the page you are viewing.",
      surfaces: ["content", "action", "sidebar", "background"],
      framework: "react",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "beginner",
      tags: [
        "ai",
        "chatgpt",
        "openai",
        "gpt",
        "chat",
        "sidebar",
        "content-scripts",
        "react",
        "shadcn",
      ],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "oEiJ_b36EtE",
      docsUrl: "https://platform.openai.com/docs/api-reference/chat",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open any web page and click the extension icon to open the sidebar",
        "Enter your ChatGPT API key (from platform.openai.com)",
        "Ask ChatGPT about the active tab, and the content script feeds the page text into the conversation",
      ],
      useCases: [
        "Chat with the active tab's content using ChatGPT",
        "Summarize or question articles, docs, and dashboards in place",
        "Starting point for page-aware ChatGPT extensions",
      ],
    },
    {
      slug: "ai-claude",
      title: "Claude AI Sidebar",
      description:
        "Adds a sidebar panel where you can chat with Claude about the page you are viewing.",
      surfaces: ["content", "action", "sidebar", "background"],
      framework: "react",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "beginner",
      tags: [
        "ai",
        "claude",
        "anthropic",
        "chat",
        "sidebar",
        "content-scripts",
        "react",
        "shadcn",
      ],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "z3JmyUlmiUw",
      docsUrl: "https://docs.anthropic.com/en/api/getting-started",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open any web page and click the extension icon to open the sidebar",
        "Enter your Claude API key (from console.anthropic.com)",
        "Ask Claude about the active tab, and the content script feeds the page text into the conversation",
      ],
      useCases: [
        "Chat with the active tab's content using Claude",
        "Summarize or question articles, docs, and dashboards in place",
        "Starting point for page-aware Claude extensions",
      ],
    },
    {
      slug: "ai-gemini",
      title: "Gemini AI Sidebar",
      description:
        "Adds a sidebar panel where you can chat with Gemini about the page you are viewing.",
      surfaces: ["content", "action", "sidebar", "background"],
      framework: "react",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "beginner",
      tags: [
        "ai",
        "gemini",
        "google",
        "chat",
        "sidebar",
        "content-scripts",
        "react",
        "shadcn",
      ],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "I2uhXovfurE",
      docsUrl: "https://ai.google.dev/gemini-api/docs",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open any web page and click the extension icon to open the sidebar",
        "Enter your Gemini API key (from aistudio.google.com)",
        "Ask Gemini about the active tab, and the content script feeds the page text into the conversation",
      ],
      useCases: [
        "Chat with the active tab's content using Gemini",
        "Summarize or question articles, docs, and dashboards in place",
        "Starting point for page-aware Gemini extensions",
      ],
    },
    {
      slug: "ai-perplexity",
      title: "Perplexity AI Sidebar",
      description:
        "Adds a sidebar panel where you can chat with Perplexity about the page you are viewing.",
      surfaces: ["content", "action", "sidebar", "background"],
      framework: "react",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "beginner",
      tags: [
        "ai",
        "perplexity",
        "search",
        "chat",
        "sidebar",
        "content-scripts",
        "react",
        "shadcn",
      ],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "W9j9rUrevjI",
      docsUrl: "https://docs.perplexity.ai/",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open any web page and click the extension icon to open the sidebar",
        "Enter your Perplexity API key (from perplexity.ai/settings/api)",
        "Ask Perplexity about the active tab, and the content script feeds the page text into the conversation",
      ],
      useCases: [
        "Chat with the active tab's content using Perplexity",
        "Summarize or question articles, docs, and dashboards in place",
        "Starting point for page-aware Perplexity extensions",
      ],
    },
    {
      slug: "content",
      title: "Content scripts",
      description:
        "Injects a small badge into every web page you visit, with an options page that moves it to the left or right edge.",
      surfaces: ["content", "options", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["content", "options", "storage", "javascript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "GflWcgdS9Tw",
      docsUrl:
        "https://extension.js.org/docs/implementation-guide/content-scripts",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click Open options on the badge injected into the page",
        "Tick the setting and watch the badge move to the left edge",
      ],
      useCases: [
        "A plain JavaScript UI injected into every page",
        "One position setting shared between an options page and a content script",
        "Starting point for content scripts that need preferences",
      ],
    },
    {
      slug: "content-css-modules",
      title: "Content CSS Modules",
      description:
        "Injects a small styled badge into every web page you visit.",
      surfaces: ["content", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["content-scripts", "css-modules", "javascript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "ondh3B28ieQ",
      docsUrl:
        "https://extension.js.org/docs/languages-and-frameworks/css-modules",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open any web page to see the badge this template injects",
        "Edit src/content/styles.module.css and save to restyle the badge",
      ],
      useCases: [
        "A content script styled with CSS modules",
        "Class names hashed so page styles never collide",
        "Starting point for content scripts that need scoped CSS",
      ],
    },
    {
      slug: "content-custom-font",
      title: "Custom fonts in a content script",
      description:
        "Injects a badge rendered in a custom font into every web page you visit, with an options page that turns the custom font on and off.",
      surfaces: ["content", "options", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["content", "fonts", "options", "storage", "javascript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "IAbckjfGO5Y",
      docsUrl: "https://extension.js.org/docs/implementation-guide/css",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click Open options on the badge injected into the page",
        "Untick the setting and watch the badge fall back to the system font",
      ],
      useCases: [
        "A content script that ships its own typeface",
        "One font setting shared between an options page and a content script",
        "Starting point for injected UI that must not inherit host page type",
      ],
    },
    {
      slug: "content-env",
      title: "Content Env",
      description:
        "Injects a small panel showing the extension's environment values into every web page you visit.",
      surfaces: ["content", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["content-scripts", "env", "configuration", "typescript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "Q-ugTIZVZ-U",
      docsUrl: "https://extension.js.org/docs/features/environment-variables",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open any web page to see the panel print the injected values",
        "Edit .env.chrome or .env.firefox to change what the panel reads",
      ],
      useCases: [
        "Reading build-time configuration inside a content script",
        "Switching behavior per browser without touching the source",
        "Reference for EXTENSION_PUBLIC_* values in typed sources",
      ],
    },
    {
      slug: "content-less",
      title: "Content Less",
      description:
        "Injects a small styled badge into every web page you visit, with a Less options page that moves it to the left or right edge.",
      surfaces: ["content", "options", "background"],
      framework: null,
      css: "less",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "beginner",
      tags: ["content", "options", "storage", "less"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "VGssDbxBeMM",
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/less",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click Open options on the badge injected into the page",
        "Tick the setting and watch the badge move to the left edge",
      ],
      useCases: [
        "A Less-styled badge injected into every page",
        "One position setting shared between an options page and a content script",
        "Starting point for Less extensions that need preferences",
      ],
    },
    {
      slug: "content-less-modules",
      title: "Content Less Modules",
      description:
        "Injects a small styled badge into every web page, with a Less modules options page that moves it to the left or right edge.",
      surfaces: ["content", "options", "background"],
      framework: null,
      css: "less",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["content", "options", "storage", "less-modules"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "Q1fNVB2ZuNw",
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/less",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click Open options on the badge injected into the page",
        "Tick the setting and watch the badge move to the left edge",
      ],
      useCases: [
        "Hashed class names shared by a content script and an options page",
        "One position setting shared between an options page and a content script",
        "Starting point for CSS Modules extensions that need preferences",
      ],
    },
    {
      slug: "content-main-world",
      title: "Main-world Content Script",
      description:
        "Injects a small UI into every page from the extension and the page world, with an options page that moves it left or right.",
      surfaces: ["content", "options", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "intermediate",
      tags: [
        "content-scripts",
        "main-world",
        "isolated-world",
        "options",
        "storage",
        "javascript",
      ],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "3-C3wCE3fWU",
      docsUrl:
        "https://extension.js.org/docs/implementation-guide/content-scripts",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click Open options on the UI injected into the page",
        "Tick the setting and watch the main-world UI move to the left edge",
      ],
      useCases: [
        "Hook into page-level globals that isolated content scripts cannot reach",
        "Bridge isolated and main-world execution contexts cleanly",
        "Read a stored setting from a main-world script that has no chrome APIs",
      ],
    },
    {
      slug: "content-multi-one-entry",
      title: "Content Multi One Entry",
      description: "Injects four small elements into every web page you visit.",
      surfaces: ["content", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["content-scripts", "multi-entry", "javascript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "l1QWq7lIKo8",
      docsUrl:
        "https://extension.js.org/docs/implementation-guide/content-scripts",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open any web page and an element appears in each of its four corners",
        "Edit one script in src/content/ and save to see that corner update",
      ],
      useCases: [
        "Four scripts shipped from a single content-script entry",
        "One match rule driving several focused files",
        "Reference for grouping content scripts under one entry",
      ],
    },
    {
      slug: "content-multi-three-entries",
      title: "Multi-entry Content Scripts",
      description: "Injects four small elements into every web page you visit.",
      surfaces: ["content", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "intermediate",
      tags: ["content-scripts", "multi-entry", "javascript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "oDcdmGaIBjw",
      docsUrl:
        "https://extension.js.org/docs/implementation-guide/content-scripts",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open any page and three separate content scripts inject small elements",
        "Edit any of the entries in src/content/ to see HMR update independently",
      ],
      useCases: [
        "Split content-script logic across multiple entries with different match rules",
        "Target different page contexts with focused, independent bundles",
        "Reference for the multi-entry content_scripts pattern in MV3",
      ],
    },
    {
      slug: "content-preact",
      title: "Content Preact",
      description:
        "Shows an overlay UI on web pages and an options page that moves it from right to left.",
      surfaces: ["content", "options", "background"],
      framework: "preact",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: [
        "content",
        "options",
        "storage",
        "preact",
        "typescript",
        "tailwind",
      ],
      icon: "src/images/icon-128.png",
      screenshot: "screenshot.png",
      video: "sYA3V9YIWwo",
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/preact",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click Open options on the overlay injected into the page",
        "Tick the setting and watch the overlay move to the left edge",
      ],
      useCases: [
        "An on-page UI written in Preact and isolated in a Shadow DOM",
        "One setting shared between an options page and a content script",
        "Starting point for Preact extensions that need preferences",
      ],
    },
    {
      slug: "content-react",
      title: "Content React",
      description:
        "Shows a small overlay UI on every web page, with a React options page that moves it from right to left.",
      surfaces: ["content", "options", "background"],
      framework: "react",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: [
        "content",
        "options",
        "storage",
        "react",
        "typescript",
        "tailwind",
      ],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "oGNhj9k4bNs",
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/react",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click Open options on the overlay injected into the page",
        "Tick the setting and watch the overlay move to the left edge",
      ],
      useCases: [
        "A React UI injected into any page, isolated in a Shadow DOM",
        "One setting shared between a React options page and a content script",
        "Starting point for content-script extensions that need preferences",
      ],
    },
    {
      slug: "content-sass",
      title: "Content scripts with Sass",
      description:
        "Injects a small styled badge into every web page you visit, with a Sass options page that moves it to the left or right edge.",
      surfaces: ["content", "options", "background"],
      framework: null,
      css: "sass",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "beginner",
      tags: ["content", "sass", "options", "storage"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "-VceQYe_KMk",
      docsUrl: "https://extension.js.org/docs/implementation-guide/css",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click Open options on the badge injected into the page",
        "Tick the setting and watch the badge move to the left edge",
      ],
      useCases: [
        "A badge injected into every page and styled with Sass",
        "One position setting shared between an options page and a content script",
        "Starting point for Sass content scripts that need preferences",
      ],
    },
    {
      slug: "content-sass-modules",
      title: "Content scripts with Sass modules",
      description:
        "Injects a small styled badge into every web page, with a Sass modules options page that moves it to the left or right edge.",
      surfaces: ["content", "options", "background"],
      framework: null,
      css: "sass",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["content", "sass", "css-modules", "options", "storage"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "Ma9f_Q1C7Eo",
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/sass",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click Open options on the badge injected into the page",
        "Tick the setting and watch the badge move to the left edge",
      ],
      useCases: [
        "A badge injected into every page and styled with hashed Sass module class names",
        "One position setting shared between an options page and a content script",
        "Starting point for Sass module content scripts that need preferences",
      ],
    },
    {
      slug: "content-svelte",
      title: "Content Svelte",
      description:
        "Shows a Svelte overlay on every web page you visit, with an options page that moves it from right to left.",
      surfaces: ["content", "options", "background"],
      framework: "svelte",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: [
        "content",
        "svelte",
        "typescript",
        "tailwind",
        "options",
        "storage",
      ],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "g6-GZ6_Rn38",
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/svelte",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click Open options on the overlay injected into the page",
        "Tick the setting and watch the overlay move to the left edge",
      ],
      useCases: [
        "A Svelte overlay injected into every page, isolated in a Shadow DOM",
        "One setting shared between a Svelte options page and a content script",
        "Starting point for Svelte extensions that need preferences",
      ],
    },
    {
      slug: "content-typescript",
      title: "Content TypeScript",
      description:
        "Shows a small overlay UI on every web page, with an options page that moves it from right to left.",
      surfaces: ["content", "options", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["content", "options", "storage", "typescript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "9OBuuh3N_cM",
      docsUrl:
        "https://extension.js.org/docs/languages-and-frameworks/typescript",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click Open options on the overlay injected into the page",
        "Tick the setting and watch the overlay move to the left edge",
      ],
      useCases: [
        "A typed overlay injected into every page",
        "One setting shared between an options page and a content script",
        "Starting point for TypeScript extensions that need preferences",
      ],
    },
    {
      slug: "content-vue",
      title: "Content Vue",
      description:
        "Shows a small overlay UI on every web page, with a Vue options page that moves it from right to left.",
      surfaces: ["content", "options", "background"],
      framework: "vue",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["content", "options", "storage", "vue", "typescript", "tailwind"],
      icon: "src/images/logo.svg",
      screenshot: "screenshot.png",
      video: "LIfZxR-B2Nk",
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/vue",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click Open options on the overlay injected into the page",
        "Tick the setting and watch the overlay move to the left edge",
      ],
      useCases: [
        "A Vue overlay injected into every page, isolated in a Shadow DOM",
        "One setting shared between a Vue options page and a content script",
        "Starting point for Vue extensions that need preferences",
      ],
    },
    {
      slug: "devtools",
      title: "Devtools panel",
      description:
        "Adds a devtools panel to the browser that reads the inspected page.",
      surfaces: ["devtools"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["devtools", "panel", "javascript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "kyJk6ksDOsU",
      docsUrl:
        "https://extension.js.org/docs/implementation-guide/manifest-json",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open the browser devtools with F12 or Cmd+Option+I, then pick the Example tab",
        "Edit src/panel/index.html and reopen devtools to see the change",
      ],
      useCases: [
        "A devtools panel as the primary UI surface",
        "Inspecting the current page from inside the developer tools",
        "Starting point for debugging tools built as browser extensions",
      ],
    },
    {
      slug: "devtools-preact",
      title: "Devtools panel Preact",
      description:
        "Adds a devtools panel written in Preact that reads the inspected page.",
      surfaces: ["devtools"],
      framework: "preact",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["devtools", "panel", "preact", "typescript"],
      icon: "src/images/icon-128.png",
      screenshot: "screenshot.png",
      video: "WjPVn5SlGaU",
      docsUrl:
        "https://extension.js.org/docs/implementation-guide/manifest-json",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open the browser devtools with F12 or Cmd+Option+I, then pick the Example tab",
        "Edit src/panel/PanelApp.tsx and reopen devtools to see the change",
      ],
      useCases: [
        "A devtools panel as the primary UI surface",
        "Inspecting the current page from inside the developer tools",
        "Starting point for Preact debugging tools built as browser extensions",
      ],
    },
    {
      slug: "devtools-react",
      title: "React devtools panel",
      description:
        "Adds a React devtools panel to the browser that reads the inspected page.",
      surfaces: ["devtools"],
      framework: "react",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["devtools", "panel", "react", "typescript"],
      icon: "src/images/icon-128.png",
      screenshot: "screenshot.png",
      video: "mRZO9Eg2aUQ",
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/react",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open the browser devtools with F12 or Cmd+Option+I, then pick the Example tab",
        "Edit src/panel/PanelApp.tsx and save to see the panel update",
      ],
      useCases: [
        "A React devtools panel as the primary UI surface",
        "Inspecting the current page from inside the developer tools",
        "Starting point for debugging tools built as browser extensions",
      ],
    },
    {
      slug: "devtools-svelte",
      title: "Devtools panel with Svelte",
      description:
        "Adds a Svelte devtools panel to the browser that reads the inspected page.",
      surfaces: ["devtools"],
      framework: "svelte",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["devtools", "panel", "svelte", "typescript"],
      icon: "src/images/icon-128.png",
      screenshot: "screenshot.png",
      video: "SqOxa9hRg1s",
      docsUrl:
        "https://extension.js.org/docs/implementation-guide/manifest-json",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open the browser devtools with F12 or Cmd+Option+I, then pick the Example tab",
        "Edit src/panel/PanelApp.svelte and reopen devtools to see the change",
      ],
      useCases: [
        "A devtools panel as the primary UI surface",
        "Inspecting the current page from inside the developer tools",
        "Starting point for debugging tools built as browser extensions",
      ],
    },
    {
      slug: "devtools-typescript",
      title: "Devtools panel (TypeScript)",
      description:
        "Adds a devtools panel to the browser that reads the inspected page.",
      surfaces: ["devtools"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["devtools", "panel", "typescript"],
      icon: "src/images/icon-128.png",
      screenshot: "screenshot.png",
      video: "iI1Th6Hi_ck",
      docsUrl:
        "https://extension.js.org/docs/implementation-guide/manifest-json",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open the browser devtools with F12 or Cmd+Option+I, then pick the Example tab",
        "Edit src/panel/index.html and reopen devtools to see the change",
      ],
      useCases: [
        "A devtools panel as the primary UI surface",
        "Inspecting the current page from inside the developer tools",
        "Starting point for debugging tools built as browser extensions",
      ],
    },
    {
      slug: "devtools-typescript-sqlite",
      title: "SQLite DevTools Panel",
      description:
        "Records the inspected page's network requests in SQLite and lets you query them.",
      surfaces: ["devtools"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["devtools", "panel", "sqlite", "wasm", "typescript"],
      icon: "src/images/icon-128.png",
      screenshot: "screenshot.png",
      video: null,
      docsUrl:
        "https://extension.js.org/docs/languages-and-frameworks/typescript",
      firstSteps: [
        "Run npm install, then npm run dev",
        "Open the browser devtools on any page, then pick the Requests tab",
        "Run a SQL query against the requests table",
      ],
      useCases: [
        "Record the inspected page's network requests in SQLite",
        "Query those requests with SQL from a devtools panel",
        "Ship sql.js inside an extension without a CDN",
      ],
    },
    {
      slug: "devtools-vue",
      title: "Devtools panel with Vue",
      description:
        "Adds a devtools panel built with Vue that reads the inspected page.",
      surfaces: ["devtools"],
      framework: "vue",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["devtools", "panel", "vue", "typescript"],
      icon: "src/images/icon-128.png",
      screenshot: "screenshot.png",
      video: "sp-bjexg2X8",
      docsUrl:
        "https://extension.js.org/docs/implementation-guide/manifest-json",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open the browser devtools with F12 or Cmd+Option+I, then pick the Example tab",
        "Edit src/panel/PanelApp.vue and reopen devtools to see the change",
      ],
      useCases: [
        "A devtools panel as the primary UI surface",
        "Inspecting the current page from inside the developer tools",
        "Starting point for debugging tools built as browser extensions",
      ],
    },
    {
      slug: "init",
      title: "Initial",
      description:
        "A minimal extension that loads in your browser, ready to build on.",
      surfaces: [],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["minimal", "javascript"],
      icon: "src/images/icon-128.png",
      screenshot: "screenshot.png",
      video: null,
      docsUrl: "https://extension.js.org/docs/getting-started/immediately",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "The extension loads in a fresh profile with no surface of its own",
        "Add src/newtab/index.html and it ships on the next reload",
      ],
      useCases: [
        "The smallest Extension.js project that still runs",
        "A blank slate for whichever surface you choose",
        "Reference for the minimum an MV3 extension needs",
      ],
    },
    {
      slug: "javascript",
      title: "JavaScript",
      description: "Adds a sidebar panel to the browser with a simple page.",
      surfaces: ["content", "action", "sidebar", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["sidebar", "javascript", "content-scripts"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "Ryjuq2o-kzc",
      docsUrl:
        "https://extension.js.org/docs/getting-started/templates/javascript",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click the extension icon to open the sidebar panel",
        "Edit src/sidebar/index.html and save to watch the panel update",
      ],
      useCases: [
        "A sidebar panel as the primary UI surface",
        "Plain JavaScript with no compiler config to maintain",
        "Starting point for extensions written in JavaScript",
      ],
    },
    {
      slug: "newtab",
      title: "New Tab",
      description:
        "Replaces your new tab page with a simple page you can customize.",
      surfaces: ["newtab", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["new-tab", "javascript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "fouoMkXLyvQ",
      docsUrl: "https://extension.js.org/docs/implementation-guide/html",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open a new tab and this page loads in place of the default",
        "Edit src/newtab/index.html and save to watch the tab update",
      ],
      useCases: [
        "A new tab page as the primary UI surface",
        "Dashboards, launchers, and start pages",
        "Starting point for new tab extensions in JavaScript",
      ],
    },
    {
      slug: "newtab-browser-flags",
      title: "New Tab Browser Flags",
      description:
        "Replaces your new tab page with a launcher that opens the extension's sidebar panel.",
      surfaces: ["content", "newtab", "sidebar", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["new-tab", "sidebar", "configuration", "javascript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: null,
      docsUrl: "https://extension.js.org/docs/browsers/browser-flags",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "The browser starts with the flags this template sets in extension.config.js",
        "Open a new tab and use the launcher to open the sidebar panel",
      ],
      useCases: [
        "Passing custom browser flags through extension.config.js",
        "A new tab launcher that opens another extension surface",
        "Reference for browser-specific differences across targets",
      ],
    },
    {
      slug: "newtab-config-eslint",
      title: "New Tab Config ESLint",
      description: "Replaces your new tab page with a simple page.",
      surfaces: ["newtab", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["new-tab", "configuration", "javascript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "CoS-_Cv-SvM",
      docsUrl: "https://extension.js.org/docs/integrations/eslint",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open a new tab to see the page this template ships",
        "Run npx eslint src to check the source with the bundled config",
      ],
      useCases: [
        "A new tab extension that lints its own source",
        "ESLint wired into an Extension.js project without ejecting",
        "Reference for adding a linter to an extension codebase",
      ],
    },
    {
      slug: "newtab-config-prettier",
      title: "New Tab Config Prettier",
      description: "Replaces your new tab page with a simple page.",
      surfaces: ["newtab", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["new-tab", "configuration", "javascript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "JnNNaUzefTg",
      docsUrl: "https://extension.js.org/docs/integrations/prettier",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open a new tab to see the page this template ships",
        "Run npx prettier --check src to see the rules this template ships",
      ],
      useCases: [
        "A new tab extension that formats its own source",
        "Prettier wired into an Extension.js project without ejecting",
        "Reference for adding a formatter to an extension codebase",
      ],
    },
    {
      slug: "newtab-config-stylelint",
      title: "New Tab Config Stylelint",
      description: "Replaces your new tab page with a simple page.",
      surfaces: ["newtab", "background"],
      framework: null,
      css: "sass",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["new-tab", "sass", "configuration"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "3DVh7oDKFxo",
      docsUrl: "https://extension.js.org/docs/integrations/stylelint",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open a new tab to see the styled page this template ships",
        "Run npx stylelint src to check the Sass with the bundled config",
      ],
      useCases: [
        "A new tab extension that lints its own stylesheets",
        "Stylelint and Sass wired into an Extension.js project",
        "Reference for adding a style linter to an extension codebase",
      ],
    },
    {
      slug: "newtab-crypto",
      title: "New Tab Crypto",
      description:
        "Replaces your new tab page with a page that hashes any text you type using SHA-256.",
      surfaces: ["newtab", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["new-tab", "web-crypto", "typescript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "dPdh5H_sTgw",
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/node",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open a new tab and type any text to see its SHA-256 hash",
        "Edit src/newtab/scripts.ts to hash with a different algorithm",
      ],
      useCases: [
        "Hashing text with the Web Crypto API inside an extension",
        "A new tab page that does real work with no network",
        "Reference for browser crypto primitives under MV3",
      ],
    },
    {
      slug: "newtab-env",
      title: "Environment Variables",
      description:
        "Replaces your new tab page with a page showing the extension's environment values.",
      surfaces: ["newtab", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "beginner",
      tags: ["env", "configuration", "new-tab", "javascript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "8XP2acacpK8",
      docsUrl: "https://extension.js.org/docs/features/environment-variables",
      firstSteps: [
        "Copy .env.example to .env and edit the values",
        "Run npm run dev to launch the extension",
        "Open a new tab and the page reads injected EXTENSION_PUBLIC_* values",
      ],
      useCases: [
        "Inject build-time configuration without leaking secrets",
        "Switch behavior per browser, mode, or deployment target",
        "Reference for safe env-var usage across JS, JSON, and HTML",
      ],
    },
    {
      slug: "newtab-less",
      title: "New Tab Less",
      description: "Replaces your new tab page with a simple styled page.",
      surfaces: ["newtab", "background"],
      framework: null,
      css: "less",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["new-tab", "less", "javascript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "T4Bgw8pCYY0",
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/less",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open a new tab to see the styled page this template ships",
        "Edit src/newtab/styles.less and save to watch the styles reload",
      ],
      useCases: [
        "A new tab page styled with Less",
        "Less compiled by Extension.js with no extra config",
        "Starting point for extensions that prefer Less to plain CSS",
      ],
    },
    {
      slug: "newtab-preact",
      title: "New Tab Preact",
      description: "Replaces your new tab page with a simple Preact page.",
      surfaces: ["newtab", "background"],
      framework: "preact",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["new-tab", "preact", "typescript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "ezN6818j744",
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/preact",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open a new tab to see the Preact page this template ships",
        "Edit src/newtab/NewTabApp.tsx and save to see fast refresh update it",
      ],
      useCases: [
        "A new tab page rendered by Preact",
        "Preact and JSX compiled with no extra config",
        "Starting point for Preact extensions with a new tab",
      ],
    },
    {
      slug: "newtab-preact-router",
      title: "Preact Router New Tab",
      description:
        "Replaces your new tab page with a small Preact app you can navigate across routes.",
      surfaces: ["newtab", "background"],
      framework: "preact",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["new-tab", "preact", "routing", "typescript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: null,
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/preact",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open a new tab and follow the links to move between routes",
        "Add a route in src/newtab/NewTabApp.tsx and it renders with no server",
      ],
      useCases: [
        "A multi-route new tab app with client-side routing",
        "Hash routing in Preact inside an extension page",
        "Reference for routing with no server under MV3",
      ],
    },
    {
      slug: "newtab-react",
      title: "New Tab React",
      description: "Replaces your new tab page with a simple React page.",
      surfaces: ["newtab", "background"],
      framework: "react",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["new-tab", "react", "typescript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "jt4HgQPdJX8",
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/react",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open a new tab to see the React page this template ships",
        "Edit src/newtab/NewTabApp.tsx and save to see fast refresh update it",
      ],
      useCases: [
        "A new tab page rendered by React",
        "React and JSX compiled with no extra config",
        "Starting point for React extensions with a new tab",
      ],
    },
    {
      slug: "newtab-react-router",
      title: "New Tab React Router",
      description:
        "Replaces your new tab page with a small React app you can navigate across routes.",
      surfaces: ["newtab", "background"],
      framework: "react",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["new-tab", "react", "routing", "typescript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "ysvv7Q10p3Q",
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/react",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open a new tab and follow the links to move between routes",
        "Add a route under src/newtab/ and it renders with no server",
      ],
      useCases: [
        "A multi-route new tab app with client-side routing",
        "React Router running inside an extension page",
        "Reference for routing with no server under MV3",
      ],
    },
    {
      slug: "newtab-sass",
      title: "New Tab Sass",
      description: "Replaces your new tab page with a simple styled page.",
      surfaces: ["newtab", "background"],
      framework: null,
      css: "sass",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["new-tab", "sass", "javascript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "bUWLBJeWzpc",
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/sass",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open a new tab to see the styled page this template ships",
        "Edit src/newtab/styles.scss and save to watch the styles reload",
      ],
      useCases: [
        "A new tab page styled with Sass",
        "Sass compiled by Extension.js with no extra config",
        "Starting point for extensions that prefer Sass to plain CSS",
      ],
    },
    {
      slug: "newtab-svelte",
      title: "New Tab Svelte",
      description: "Replaces your new tab page with a simple Svelte page.",
      surfaces: ["newtab", "background"],
      framework: "svelte",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["new-tab", "svelte", "typescript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "uq-HVZb51U8",
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/svelte",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open a new tab to see the Svelte page this template ships",
        "Edit src/newtab/NewTabApp.svelte and save to watch it update",
      ],
      useCases: [
        "A new tab page rendered by Svelte",
        "Svelte components compiled with no extra config",
        "Starting point for Svelte extensions with a new tab",
      ],
    },
    {
      slug: "newtab-svelte-router",
      title: "Svelte Router New Tab",
      description:
        "Replaces your new tab page with a small Svelte app you can navigate across routes.",
      surfaces: ["newtab", "background"],
      framework: "svelte",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["new-tab", "svelte", "routing", "typescript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: null,
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/svelte",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open a new tab and follow the links to move between routes",
        "Add a route under src/newtab/routes/ and it renders with no server",
      ],
      useCases: [
        "A multi-route new tab app with client-side routing",
        "Hash routing with svelte-spa-router inside an extension page",
        "Reference for routing with no server under MV3",
      ],
    },
    {
      slug: "newtab-typescript",
      title: "New Tab TypeScript",
      description: "Replaces your new tab page with a simple page.",
      surfaces: ["newtab", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["new-tab", "typescript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "0sRMGlx7MbA",
      docsUrl:
        "https://extension.js.org/docs/languages-and-frameworks/typescript",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open a new tab to see the page this template ships",
        "Edit src/newtab/scripts.ts and save to watch the tab update",
      ],
      useCases: [
        "A typed new tab page",
        "TypeScript compiled by Extension.js with no extra config",
        "Starting point for TypeScript extensions with a new tab",
      ],
    },
    {
      slug: "newtab-vue",
      title: "New Tab Vue",
      description: "Replaces your new tab page with a simple Vue page.",
      surfaces: ["newtab", "background"],
      framework: "vue",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["new-tab", "vue", "typescript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "g4rjynbMI5c",
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/vue",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open a new tab to see the Vue page this template ships",
        "Edit src/newtab/NewTabApp.vue and save to watch it update",
      ],
      useCases: [
        "A new tab page rendered by Vue",
        "Single-file components compiled with no extra config",
        "Starting point for Vue extensions with a new tab",
      ],
    },
    {
      slug: "newtab-vue-router",
      title: "Vue Router New Tab",
      description:
        "Replaces your new tab page with a small Vue app you can navigate across routes.",
      surfaces: ["newtab", "background"],
      framework: "vue",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["new-tab", "vue", "routing", "typescript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: null,
      docsUrl: "https://extension.js.org/docs/languages-and-frameworks/vue",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open a new tab and follow the links to move between routes",
        "Add a route in src/newtab/router.ts and it renders with no server",
      ],
      useCases: [
        "A multi-route new tab app with client-side routing",
        "Vue Router running inside an extension page",
        "Reference for hash history routing with no server",
      ],
    },
    {
      slug: "playwright",
      title: "Playwright E2E Sidebar",
      description:
        "Adds a sidebar panel to the browser, covered end to end by Playwright tests.",
      surfaces: ["content", "action", "sidebar", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "intermediate",
      tags: ["testing", "playwright", "e2e", "sidebar", "typescript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "k8PP2Gs1AsU",
      docsUrl: "https://extension.js.org/docs/workflows/playwright-e2e",
      firstSteps: [
        "Run npm install to set up Playwright deps",
        "Run npm run dev to launch the extension",
        "Run npm test to execute the Playwright spec against the loaded extension",
      ],
      useCases: [
        "End-to-end testing for browser-extension surfaces (popup, sidebar, content)",
        "CI-ready Playwright setup wired to Extension.js builds",
        "Reference for automating extension flows in headed and headless modes",
      ],
    },
    {
      slug: "preact",
      title: "Preact",
      description:
        "Adds a sidebar panel to the browser with a simple Preact page.",
      surfaces: ["content", "action", "sidebar", "background"],
      framework: "preact",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "beginner",
      tags: ["sidebar", "preact", "typescript"],
      icon: "public/logo.svg",
      screenshot: "screenshot.png",
      video: "VcAPgX8KHgI",
      docsUrl: "https://extension.js.org/docs/getting-started/templates/preact",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click the extension icon to open the Preact sidebar panel",
        "Edit the component in src/sidebar/ to see fast refresh update it",
      ],
      useCases: [
        "A sidebar panel rendered by Preact",
        "Preact and JSX compiled with no extra config",
        "Starting point for Preact extensions",
      ],
    },
    {
      slug: "react",
      title: "React",
      description:
        "Adds a sidebar panel to the browser with a simple React page.",
      surfaces: ["content", "action", "sidebar", "background"],
      framework: "react",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "beginner",
      tags: ["sidebar", "react", "typescript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "mRgWdPgv1hE",
      docsUrl: "https://extension.js.org/docs/getting-started/templates/react",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click the extension icon to open the React sidebar panel",
        "Edit the component in src/sidebar/ to see fast refresh update it",
      ],
      useCases: [
        "A sidebar panel rendered by React",
        "React and JSX compiled with no extra config",
        "Starting point for React extensions",
      ],
    },
    {
      slug: "sidebar",
      title: "Sidebar page",
      description: "Adds a sidebar panel to the browser with a simple page.",
      surfaces: ["content", "action", "sidebar", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "beginner",
      tags: ["sidebar", "javascript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "bgGUqLiaZFI",
      docsUrl: "https://extension.js.org/docs/implementation-guide/html",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click the extension icon to open the sidebar panel",
        "Edit src/sidebar/index.html and save to watch the panel update",
      ],
      useCases: [
        "A sidebar panel that stays open while you browse",
        "Reading and acting on the page beside it",
        "Starting point for sidebar-first extensions",
      ],
    },
    {
      slug: "sidebar-antd",
      title: "Sidebar Ant Design",
      description:
        "Adds a sidebar panel to the browser showing Ant Design components.",
      surfaces: ["content", "action", "sidebar", "background"],
      framework: "react",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["sidebar", "react", "antd"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "7YSGpO-RmVE",
      docsUrl: "https://ant.design/docs/react/introduce",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click the extension icon to open the sidebar panel",
        "Swap an Ant Design component in src/sidebar/ to see it update",
      ],
      useCases: [
        "A sidebar built from Ant Design components",
        "A component library bundled into an extension surface",
        "Starting point for extensions with a ready-made design system",
      ],
    },
    {
      slug: "sidebar-monorepo-nx",
      title: "Sidebar Nx",
      description:
        "Adds a sidebar panel and shows a small overlay UI on every web page you visit.",
      surfaces: ["content", "action", "sidebar", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "intermediate",
      tags: ["sidebar", "monorepo", "nx", "javascript"],
      icon: null,
      screenshot: "screenshot.png",
      video: "2zuBnmCVvqg",
      docsUrl: "https://nx.dev/docs",
      firstSteps: [
        "Run npm install at the workspace root to link the packages",
        "Run npm run dev to launch the extension from the workspace",
        "Edit the shared package and both the sidebar and the overlay follow",
      ],
      useCases: [
        "An extension that lives inside an Nx workspace",
        "Sharing code between the extension and other packages",
        "Reference for Extension.js in a monorepo with no plugin",
      ],
    },
    {
      slug: "sidebar-monorepo-turborepo",
      title: "Sidebar Turborepo",
      description:
        "Adds a sidebar panel and shows a small overlay UI on every web page you visit.",
      surfaces: ["content", "action", "sidebar", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "intermediate",
      tags: ["sidebar", "monorepo", "turborepo", "javascript"],
      icon: null,
      screenshot: "screenshot.png",
      video: "l3Z90k_4c3I",
      docsUrl: "https://turborepo.dev/docs",
      firstSteps: [
        "Run npm install at the workspace root to link the packages",
        "Run npm run dev to launch the extension from the workspace",
        "Edit the shared package and both the sidebar and the overlay follow",
      ],
      useCases: [
        "An extension that lives inside a Turborepo workspace",
        "Sharing code between the extension and other packages",
        "Reference for Extension.js in a monorepo with no plugin",
      ],
    },
    {
      slug: "sidebar-shadcn",
      title: "Sidebar shadcn",
      description:
        "Adds a sidebar panel to the browser built with shadcn/ui components.",
      surfaces: ["content", "action", "sidebar", "background"],
      framework: "react",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "beginner",
      tags: ["sidebar", "react", "shadcn", "tailwind"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "gTpQ7v7zSuY",
      docsUrl: "https://extension.js.org/docs/integrations/shadcnui",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click the extension icon to open the sidebar panel",
        "Add a shadcn/ui component and save to see it in the panel",
      ],
      useCases: [
        "A sidebar built from shadcn/ui components",
        "Tailwind and Radix primitives inside an extension surface",
        "Starting point for extensions with a modern component kit",
      ],
    },
    {
      slug: "special-folders-pages",
      title: "Special Folders: pages/",
      description:
        "Opens a welcome page in a new tab when the extension loads.",
      surfaces: ["background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "beginner",
      tags: ["special-folders", "pages", "welcome-page", "javascript"],
      icon: "src/images/icon-128.png",
      screenshot: "screenshot.png",
      video: null,
      docsUrl: "https://extension.js.org/docs/features/special-folders",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "A welcome page from src/pages/ opens automatically on install",
        "Add another HTML file under src/pages/ and it ships as a separate page",
      ],
      useCases: [
        "Onboarding, help, and welcome pages that ship with the extension",
        "Standalone HTML routes without manifest plumbing",
        "Reference for Extension.js's pages/ special folder convention",
      ],
    },
    {
      slug: "special-folders-scripts",
      title: "Special Folders Scripts",
      description:
        "Shows a small overlay on web pages and a toolbar popup that runs the extension's bundled scripts.",
      surfaces: ["content", "action", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: false,
      difficulty: "beginner",
      tags: ["special-folders", "scripts", "javascript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "P8Q8TDQqbQE",
      docsUrl: "https://extension.js.org/docs/features/special-folders",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Open any page for the overlay, then click the toolbar icon for the popup",
        "Add a file under scripts/ and it ships as its own bundle",
      ],
      useCases: [
        "Scripts shared between a popup and a content script",
        "Standalone script bundles without manifest plumbing",
        "Reference for the scripts/ special folder convention",
      ],
    },
    {
      slug: "svelte",
      title: "Svelte",
      description:
        "Adds a sidebar panel to the browser with a simple Svelte page.",
      surfaces: ["content", "action", "sidebar", "background"],
      framework: "svelte",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "beginner",
      tags: ["sidebar", "svelte", "typescript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "RgMo9t-oLL4",
      docsUrl: "https://extension.js.org/docs/getting-started/templates/svelte",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click the extension icon to open the Svelte sidebar panel",
        "Edit the component in src/sidebar/ and save to watch it update",
      ],
      useCases: [
        "A sidebar panel rendered by Svelte",
        "Svelte components compiled with no extra config",
        "Starting point for Svelte extensions",
      ],
    },
    {
      slug: "transformers-js",
      title: "Transformers.js",
      description:
        "Adds a sidebar panel that classifies the active page or your selected text with on-device AI models.",
      surfaces: ["content", "action", "sidebar", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "intermediate",
      tags: ["sidebar", "ai", "transformers", "javascript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "cTxqV5HXXWE",
      docsUrl:
        "https://extension.js.org/docs/languages-and-frameworks/webassembly",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click the extension icon to open the side panel",
        "Type in the text box, or use the page text or your selection, and the model classifies it on your machine",
      ],
      useCases: [
        "Running Transformers.js models inside an extension",
        "Classifying page text with no server and no API key",
        "Reference for shipping on-device AI under MV3",
      ],
    },
    {
      slug: "typescript",
      title: "TypeScript",
      description: "Adds a sidebar panel to the browser with a simple page.",
      surfaces: ["content", "action", "sidebar", "background"],
      framework: null,
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "beginner",
      tags: ["sidebar", "typescript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "UX91cqUH2DU",
      docsUrl:
        "https://extension.js.org/docs/getting-started/templates/typescript",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click the extension icon to open the sidebar panel",
        "Edit the typed sources in src/sidebar/ to watch the panel update",
      ],
      useCases: [
        "A typed sidebar extension with no compiler config",
        "TypeScript compiled by Extension.js out of the box",
        "Starting point for TypeScript extensions",
      ],
    },
    {
      slug: "vue",
      title: "Vue",
      description:
        "Adds a sidebar panel to the browser with a simple Vue page.",
      surfaces: ["content", "action", "sidebar", "background"],
      framework: "vue",
      css: "css",
      browsers: ["chrome", "edge", "firefox", "safari"],
      featured: true,
      difficulty: "beginner",
      tags: ["sidebar", "vue", "typescript"],
      icon: "src/images/icon.png",
      screenshot: "screenshot.png",
      video: "x55b3Md2zIY",
      docsUrl: "https://extension.js.org/docs/getting-started/templates/vue",
      firstSteps: [
        "Run npm run dev to launch the extension",
        "Click the extension icon to open the Vue sidebar panel",
        "Edit the component in src/sidebar/ and save to watch it update",
      ],
      useCases: [
        "A sidebar panel rendered by Vue",
        "Single-file components compiled with no extra config",
        "Starting point for Vue extensions",
      ],
    },
  ];
  // @generated:end

  const RAW =
    "https://raw.githubusercontent.com/extension-js/templates/main/examples/";
  const REPO = "https://github.com/extension-js/templates/tree/main/examples/";
  const browserNames = {
    chrome: "Chrome",
    edge: "Edge",
    firefox: "Firefox",
    safari: "Safari",
  };
  const surfaceNames = {
    action: "Action",
    background: "Background",
    content: "Content",
    sidebar: "Sidebar",
    options: "Options",
    devtools: "DevTools",
    newtab: "New Tab",
  };
  const frameworkNames = {
    react: "React",
    preact: "Preact",
    vue: "Vue",
    svelte: "Svelte",
  };

  const labels = {
    en: {
      optimizedFor: "Optimized for",
      close: "Close",
      createProject: "Create project",
      useTemplate: (title) =>
        `Use the ${title} template to scaffold a new extension project.`,
      command: "Command",
      instructions: "Instructions",
      whatToExpect: "What to expect",
      jump: "Click to run",
      expectation: "Scaffolds this template and opens it in a real browser.",
      walkthrough: "walkthrough",
      screenshot: "screenshot",
      copyAndRun: "Copy & run",
      copy: "Copy",
      copied: "Copied",
      firstSteps: "First steps",
      useItFor: "Use it for",
      sourceCode: "Source code",
      referenceDocs: "Reference docs",
      searchPlaceholder: "Search templates by name, tag, or description",
      searchLabel: "Search templates",
      featuredOnly: "Featured only",
      count: (shown, total) => `${shown} of ${total} templates`,
      more: (first, second, rest) => `${first}, ${second} and ${rest} more`,
      empty: "No template matches that search.",
      emptyFeatured: " Turn off Featured only to search all of them.",
    },
    "zh-Hans": {
      optimizedFor: "适配浏览器",
      close: "关闭",
      createProject: "创建项目",
      useTemplate: (title) => `使用 ${title} 模板搭建一个新的扩展项目。`,
      command: "命令",
      instructions: "说明",
      whatToExpect: "效果预览",
      jump: "点击运行",
      expectation: "搭建这个模板，并在真实浏览器中打开它。",
      walkthrough: "演示",
      screenshot: "截图",
      copyAndRun: "复制并运行",
      copy: "复制",
      copied: "已复制",
      firstSteps: "第一步",
      useItFor: "适用场景",
      sourceCode: "源码",
      referenceDocs: "参考文档",
      searchPlaceholder: "按名称、标签或描述搜索模板",
      searchLabel: "搜索模板",
      featuredOnly: "仅显示精选",
      count: (shown, total) => `共 ${total} 个模板，显示 ${shown} 个`,
      more: (first, second, rest) => `${first}、${second} 等 ${rest + 2} 项`,
      empty: "没有匹配的模板。",
      emptyFeatured: "关闭“仅显示精选”即可搜索全部模板。",
    },
    "zh-Hant": {
      optimizedFor: "適用瀏覽器",
      close: "關閉",
      createProject: "建立專案",
      useTemplate: (title) => `使用 ${title} 範本建立一個新的擴充功能專案。`,
      command: "指令",
      instructions: "說明",
      whatToExpect: "效果預覽",
      jump: "點擊執行",
      expectation: "建立這個範本，並在真實瀏覽器中開啟它。",
      walkthrough: "示範",
      screenshot: "截圖",
      copyAndRun: "複製並執行",
      copy: "複製",
      copied: "已複製",
      firstSteps: "第一步",
      useItFor: "適用情境",
      sourceCode: "原始碼",
      referenceDocs: "參考文件",
      searchPlaceholder: "依名稱、標籤或描述搜尋範本",
      searchLabel: "搜尋範本",
      featuredOnly: "僅顯示精選",
      count: (shown, total) => `共 ${total} 個範本，顯示 ${shown} 個`,
      more: (first, second, rest) => `${first}、${second} 等 ${rest + 2} 項`,
      empty: "沒有符合的範本。",
      emptyFeatured: "關閉「僅顯示精選」即可搜尋全部範本。",
    },
  };
  const t = labels[locale] || labels.en;
  // The catalog is written in English. A description missing here falls back
  // to it, as a template added upstream does until it is translated.
  const descriptions = {
    "zh-Hans": {
      action: "为浏览器添加一个工具栏弹出窗口，内含一个简单的页面。",
      "action-locales": "添加一个工具栏弹出窗口，其文字会跟随浏览器的语言。",
      "action-preact":
        "为浏览器添加一个工具栏弹出窗口，内含一个简单的 Preact 页面。",
      "action-svelte":
        "为浏览器添加一个工具栏弹出窗口，内含一个简单的 Svelte 页面。",
      "action-vue": "为浏览器添加一个工具栏弹出窗口，内含一个简单的 Vue 页面。",
      "ai-chatgpt": "添加一个侧边栏面板，让你就正在浏览的页面与 ChatGPT 对话。",
      "ai-claude": "添加一个侧边栏面板，让你就正在浏览的页面与 Claude 对话。",
      "ai-gemini": "添加一个侧边栏面板，让你就正在浏览的页面与 Gemini 对话。",
      "ai-perplexity":
        "添加一个侧边栏面板，让你就正在浏览的页面与 Perplexity 对话。",
      content:
        "在你访问的每个网页中注入一个小徽标，并附带一个选项页，可把它移到左侧或右侧边缘。",
      "content-css-modules": "在你访问的每个网页中注入一个带样式的小徽标。",
      "content-custom-font":
        "在你访问的每个网页中注入一个以自定义字体渲染的徽标，并附带一个选项页，可开启或关闭该字体。",
      "content-env":
        "在你访问的每个网页中注入一个小面板，显示扩展的环境变量值。",
      "content-less":
        "在你访问的每个网页中注入一个带样式的小徽标，并附带一个 Less 选项页，可把它移到左侧或右侧边缘。",
      "content-less-modules":
        "在每个网页中注入一个带样式的小徽标，并附带一个 Less modules 选项页，可把它移到左侧或右侧边缘。",
      "content-main-world":
        "从扩展和页面两个执行环境向每个页面注入一个小界面，并附带一个选项页，可把它移到左侧或右侧。",
      "content-multi-one-entry": "在你访问的每个网页中注入四个小元素。",
      "content-multi-three-entries": "在你访问的每个网页中注入四个小元素。",
      "content-preact":
        "在网页上显示一个浮层界面，并附带一个选项页，可把它从右侧移到左侧。",
      "content-react":
        "在每个网页上显示一个小浮层界面，并附带一个 React 选项页，可把它从右侧移到左侧。",
      "content-sass":
        "在你访问的每个网页中注入一个带样式的小徽标，并附带一个 Sass 选项页，可把它移到左侧或右侧边缘。",
      "content-sass-modules":
        "在每个网页中注入一个带样式的小徽标，并附带一个 Sass modules 选项页，可把它移到左侧或右侧边缘。",
      "content-svelte":
        "在你访问的每个网页上显示一个 Svelte 浮层，并附带一个选项页，可把它从右侧移到左侧。",
      "content-typescript":
        "在每个网页上显示一个小浮层界面，并附带一个选项页，可把它从右侧移到左侧。",
      "content-vue":
        "在每个网页上显示一个小浮层界面，并附带一个 Vue 选项页，可把它从右侧移到左侧。",
      devtools: "为浏览器添加一个开发者工具面板，可读取被检查的页面。",
      "devtools-preact":
        "为浏览器添加一个用 Preact 编写的开发者工具面板，可读取被检查的页面。",
      "devtools-react":
        "为浏览器添加一个用 React 编写的开发者工具面板，可读取被检查的页面。",
      "devtools-svelte":
        "为浏览器添加一个用 Svelte 编写的开发者工具面板，可读取被检查的页面。",
      "devtools-typescript":
        "为浏览器添加一个开发者工具面板，可读取被检查的页面。",
      "devtools-typescript-sqlite":
        "把被检查页面的网络请求记录到 SQLite，并让你对其进行查询。",
      "devtools-vue":
        "为浏览器添加一个用 Vue 编写的开发者工具面板，可读取被检查的页面。",
      init: "一个能在浏览器中加载的最小扩展，可直接在其上继续构建。",
      javascript: "为浏览器添加一个侧边栏面板，内含一个简单的页面。",
      newtab: "用一个可自定义的简单页面替换你的新标签页。",
      "newtab-browser-flags":
        "用一个启动页替换你的新标签页，它会打开扩展的侧边栏面板。",
      "newtab-config-eslint": "用一个简单的页面替换你的新标签页。",
      "newtab-config-prettier": "用一个简单的页面替换你的新标签页。",
      "newtab-config-stylelint": "用一个简单的页面替换你的新标签页。",
      "newtab-crypto":
        "用一个页面替换你的新标签页，它会用 SHA-256 对你输入的任意文本进行哈希。",
      "newtab-env": "用一个显示扩展环境变量值的页面替换你的新标签页。",
      "newtab-less": "用一个带样式的简单页面替换你的新标签页。",
      "newtab-preact": "用一个简单的 Preact 页面替换你的新标签页。",
      "newtab-preact-router":
        "用一个可在多个路由间导航的小型 Preact 应用替换你的新标签页。",
      "newtab-react": "用一个简单的 React 页面替换你的新标签页。",
      "newtab-react-router":
        "用一个可在多个路由间导航的小型 React 应用替换你的新标签页。",
      "newtab-sass": "用一个带样式的简单页面替换你的新标签页。",
      "newtab-svelte": "用一个简单的 Svelte 页面替换你的新标签页。",
      "newtab-svelte-router":
        "用一个可在多个路由间导航的小型 Svelte 应用替换你的新标签页。",
      "newtab-typescript": "用一个简单的页面替换你的新标签页。",
      "newtab-vue": "用一个简单的 Vue 页面替换你的新标签页。",
      "newtab-vue-router":
        "用一个可在多个路由间导航的小型 Vue 应用替换你的新标签页。",
      playwright:
        "为浏览器添加一个侧边栏面板，并由 Playwright 测试进行端到端覆盖。",
      preact: "为浏览器添加一个侧边栏面板，内含一个简单的 Preact 页面。",
      react: "为浏览器添加一个侧边栏面板，内含一个简单的 React 页面。",
      sidebar: "为浏览器添加一个侧边栏面板，内含一个简单的页面。",
      "sidebar-antd": "为浏览器添加一个展示 Ant Design 组件的侧边栏面板。",
      "sidebar-monorepo-nx":
        "添加一个侧边栏面板，并在你访问的每个网页上显示一个小浮层界面。",
      "sidebar-monorepo-turborepo":
        "添加一个侧边栏面板，并在你访问的每个网页上显示一个小浮层界面。",
      "sidebar-shadcn": "为浏览器添加一个用 shadcn/ui 组件构建的侧边栏面板。",
      "special-folders-pages": "扩展加载时在新标签页中打开一个欢迎页面。",
      "special-folders-scripts":
        "在网页上显示一个小浮层，并添加一个工具栏弹出窗口来运行扩展打包的脚本。",
      svelte: "为浏览器添加一个侧边栏面板，内含一个简单的 Svelte 页面。",
      "transformers-js":
        "添加一个侧边栏面板，用设备端 AI 模型对当前页面或你选中的文本进行分类。",
      typescript: "为浏览器添加一个侧边栏面板，内含一个简单的页面。",
      vue: "为浏览器添加一个侧边栏面板，内含一个简单的 Vue 页面。",
    },
    "zh-Hant": {
      action: "為瀏覽器新增一個工具列彈出視窗，內含一個簡單的頁面。",
      "action-locales": "新增一個工具列彈出視窗，其文字會跟隨瀏覽器的語言。",
      "action-preact":
        "為瀏覽器新增一個工具列彈出視窗，內含一個簡單的 Preact 頁面。",
      "action-svelte":
        "為瀏覽器新增一個工具列彈出視窗，內含一個簡單的 Svelte 頁面。",
      "action-vue": "為瀏覽器新增一個工具列彈出視窗，內含一個簡單的 Vue 頁面。",
      "ai-chatgpt": "新增一個側邊欄面板，讓你就正在瀏覽的頁面與 ChatGPT 對話。",
      "ai-claude": "新增一個側邊欄面板，讓你就正在瀏覽的頁面與 Claude 對話。",
      "ai-gemini": "新增一個側邊欄面板，讓你就正在瀏覽的頁面與 Gemini 對話。",
      "ai-perplexity":
        "新增一個側邊欄面板，讓你就正在瀏覽的頁面與 Perplexity 對話。",
      content:
        "在你造訪的每個網頁中注入一個小徽章，並附帶一個選項頁，可把它移到左側或右側邊緣。",
      "content-css-modules": "在你造訪的每個網頁中注入一個帶樣式的小徽章。",
      "content-custom-font":
        "在你造訪的每個網頁中注入一個以自訂字型呈現的徽章，並附帶一個選項頁，可開啟或關閉該字型。",
      "content-env":
        "在你造訪的每個網頁中注入一個小面板，顯示擴充功能的環境變數值。",
      "content-less":
        "在你造訪的每個網頁中注入一個帶樣式的小徽章，並附帶一個 Less 選項頁，可把它移到左側或右側邊緣。",
      "content-less-modules":
        "在每個網頁中注入一個帶樣式的小徽章，並附帶一個 Less modules 選項頁，可把它移到左側或右側邊緣。",
      "content-main-world":
        "從擴充功能和頁面兩個執行環境向每個頁面注入一個小介面，並附帶一個選項頁，可把它移到左側或右側。",
      "content-multi-one-entry": "在你造訪的每個網頁中注入四個小元素。",
      "content-multi-three-entries": "在你造訪的每個網頁中注入四個小元素。",
      "content-preact":
        "在網頁上顯示一個浮層介面，並附帶一個選項頁，可把它從右側移到左側。",
      "content-react":
        "在每個網頁上顯示一個小浮層介面，並附帶一個 React 選項頁，可把它從右側移到左側。",
      "content-sass":
        "在你造訪的每個網頁中注入一個帶樣式的小徽章，並附帶一個 Sass 選項頁，可把它移到左側或右側邊緣。",
      "content-sass-modules":
        "在每個網頁中注入一個帶樣式的小徽章，並附帶一個 Sass modules 選項頁，可把它移到左側或右側邊緣。",
      "content-svelte":
        "在你造訪的每個網頁上顯示一個 Svelte 浮層，並附帶一個選項頁，可把它從右側移到左側。",
      "content-typescript":
        "在每個網頁上顯示一個小浮層介面，並附帶一個選項頁，可把它從右側移到左側。",
      "content-vue":
        "在每個網頁上顯示一個小浮層介面，並附帶一個 Vue 選項頁，可把它從右側移到左側。",
      devtools: "為瀏覽器新增一個開發者工具面板，可讀取受檢查的頁面。",
      "devtools-preact":
        "為瀏覽器新增一個以 Preact 撰寫的開發者工具面板，可讀取受檢查的頁面。",
      "devtools-react":
        "為瀏覽器新增一個以 React 撰寫的開發者工具面板，可讀取受檢查的頁面。",
      "devtools-svelte":
        "為瀏覽器新增一個以 Svelte 撰寫的開發者工具面板，可讀取受檢查的頁面。",
      "devtools-typescript":
        "為瀏覽器新增一個開發者工具面板，可讀取受檢查的頁面。",
      "devtools-typescript-sqlite":
        "把受檢查頁面的網路請求記錄到 SQLite，並讓你對其進行查詢。",
      "devtools-vue":
        "為瀏覽器新增一個以 Vue 撰寫的開發者工具面板，可讀取受檢查的頁面。",
      init: "一個能在瀏覽器中載入的最小擴充功能，可直接在其上繼續打造。",
      javascript: "為瀏覽器新增一個側邊欄面板，內含一個簡單的頁面。",
      newtab: "以一個可自訂的簡單頁面取代你的新分頁。",
      "newtab-browser-flags":
        "以一個啟動頁取代你的新分頁，它會開啟擴充功能的側邊欄面板。",
      "newtab-config-eslint": "以一個簡單的頁面取代你的新分頁。",
      "newtab-config-prettier": "以一個簡單的頁面取代你的新分頁。",
      "newtab-config-stylelint": "以一個簡單的頁面取代你的新分頁。",
      "newtab-crypto":
        "以一個頁面取代你的新分頁，它會用 SHA-256 對你輸入的任意文字進行雜湊。",
      "newtab-env": "以一個顯示擴充功能環境變數值的頁面取代你的新分頁。",
      "newtab-less": "以一個帶樣式的簡單頁面取代你的新分頁。",
      "newtab-preact": "以一個簡單的 Preact 頁面取代你的新分頁。",
      "newtab-preact-router":
        "以一個可在多個路由間瀏覽的小型 Preact 應用程式取代你的新分頁。",
      "newtab-react": "以一個簡單的 React 頁面取代你的新分頁。",
      "newtab-react-router":
        "以一個可在多個路由間瀏覽的小型 React 應用程式取代你的新分頁。",
      "newtab-sass": "以一個帶樣式的簡單頁面取代你的新分頁。",
      "newtab-svelte": "以一個簡單的 Svelte 頁面取代你的新分頁。",
      "newtab-svelte-router":
        "以一個可在多個路由間瀏覽的小型 Svelte 應用程式取代你的新分頁。",
      "newtab-typescript": "以一個簡單的頁面取代你的新分頁。",
      "newtab-vue": "以一個簡單的 Vue 頁面取代你的新分頁。",
      "newtab-vue-router":
        "以一個可在多個路由間瀏覽的小型 Vue 應用程式取代你的新分頁。",
      playwright:
        "為瀏覽器新增一個側邊欄面板，並由 Playwright 測試進行端對端涵蓋。",
      preact: "為瀏覽器新增一個側邊欄面板，內含一個簡單的 Preact 頁面。",
      react: "為瀏覽器新增一個側邊欄面板，內含一個簡單的 React 頁面。",
      sidebar: "為瀏覽器新增一個側邊欄面板，內含一個簡單的頁面。",
      "sidebar-antd": "為瀏覽器新增一個展示 Ant Design 元件的側邊欄面板。",
      "sidebar-monorepo-nx":
        "新增一個側邊欄面板，並在你造訪的每個網頁上顯示一個小浮層介面。",
      "sidebar-monorepo-turborepo":
        "新增一個側邊欄面板，並在你造訪的每個網頁上顯示一個小浮層介面。",
      "sidebar-shadcn": "為瀏覽器新增一個以 shadcn/ui 元件打造的側邊欄面板。",
      "special-folders-pages": "擴充功能載入時在新分頁中開啟一個歡迎頁面。",
      "special-folders-scripts":
        "在網頁上顯示一個小浮層，並新增一個工具列彈出視窗來執行擴充功能打包的腳本。",
      svelte: "為瀏覽器新增一個側邊欄面板，內含一個簡單的 Svelte 頁面。",
      "transformers-js":
        "新增一個側邊欄面板，用裝置端 AI 模型對目前頁面或你選取的文字進行分類。",
      typescript: "為瀏覽器新增一個側邊欄面板，內含一個簡單的頁面。",
      vue: "為瀏覽器新增一個側邊欄面板，內含一個簡單的 Vue 頁面。",
    },
  };
  const describe = (item) =>
    (descriptions[locale] && descriptions[locale][item.slug]) ||
    item.description;
  const [query, setQuery] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(true);
  const [openSlug, setOpenSlug] = useState(null);
  const [tab, setTab] = useState("command");
  const [copied, setCopied] = useState(false);
  const [flash, setFlash] = useState(false);
  const closeRef = useRef(null);
  const commandRef = useRef(null);
  const active = templates.find((item) => item.slug === openSlug) || null;

  const open = (slug) => {
    setTab("command");
    setCopied(false);
    setFlash(false);
    setOpenSlug(slug);
    window.history.replaceState(null, "", `#${slug}`);
  };

  const close = () => {
    setOpenSlug(null);
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  };

  // A shared link such as /templates#ai-chatgpt opens that template's dialog.
  useEffect(() => {
    const slug = window.location.hash.slice(1);

    if (templates.some((item) => item.slug === slug)) setOpenSlug(slug);
  }, []);

  useEffect(() => {
    if (!openSlug) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") close();
    };

    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    if (closeRef.current) closeRef.current.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [openSlug]);

  const iconOf = (item) =>
    item.icon ? `${RAW}${item.slug}/${item.icon}` : "/favicon.png";
  const shotOf = (item) =>
    item.screenshot ? `${RAW}${item.slug}/${item.screenshot}` : null;

  const surfacesOf = (item) => {
    const names = item.surfaces.map((key) => surfaceNames[key] || key);

    if (names.length <= 2) return names.join(", ");

    return t.more(names[0], names[1], names.length - 2);
  };

  const commandOf = (item) =>
    [
      `npx extension@latest create my-${item.slug} --template=${item.slug}`,
      `cd my-${item.slug}`,
      "npm install",
      "npm run dev",
    ].join("\n");

  const copy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  const needle = query.trim().toLowerCase();
  const visible = templates.filter((item) => {
    if (featuredOnly && !item.featured) return false;

    if (!needle) return true;

    return [
      item.slug,
      item.title,
      item.description,
      describe(item),
      ...item.tags,
    ]
      .join(" ")
      .toLowerCase()
      .includes(needle);
  });

  // PostHog autocapture copies each data-ph-capture-attribute-* on a clicked
  // element and its ancestors into the click event, so no capture call is needed.
  const browserRow = (item) => (
    <div className="ext-tpl-browsers">
      <span className="ext-tpl-browsers-label">{t.optimizedFor}</span>
      <ul className="ext-tpl-browsers-row">
        {item.browsers.map((key) => (
          <li key={key} title={browserNames[key] || key}>
            <img
              src={`/images/vendor/${key}.svg`}
              alt={browserNames[key] || key}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </div>
  );

  const sectionTitle = (text, action) => (
    <div className="ext-tpl-section-title">
      <h3>{text}</h3>
      <span aria-hidden="true" />
      {action || null}
    </div>
  );

  const jumpToCommand = () => {
    if (commandRef.current) {
      commandRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }

    setFlash(true);
    setTimeout(() => setFlash(false), 1600);
  };

  const dialog = (item) => (
    <div className="ext-tpl-overlay" onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ext-tpl-dialog-title"
        className="ext-tpl-dialog"
        data-ph-capture-attribute-template_slug={item.slug}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="ext-tpl-close"
          aria-label={t.close}
          onClick={close}
        >
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path
              d="M3 3l10 10M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <header className="ext-tpl-dialog-head">
          <img
            className="ext-tpl-icon ext-tpl-icon-sm"
            src={iconOf(item)}
            alt=""
          />
          <div>
            <h2 id="ext-tpl-dialog-title">{t.createProject}</h2>
            <p>{t.useTemplate(item.title)}</p>
          </div>
        </header>

        <div className="ext-tpl-tabs" role="tablist">
          {[
            ["command", t.command],
            ["instructions", t.instructions],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              className={tab === key ? "is-active" : ""}
              data-ph-capture-attribute-template_action="tab"
              data-ph-capture-attribute-template_tab={key}
              onClick={() => setTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "command" ? (
          <div className="ext-tpl-panel" role="tabpanel">
            {sectionTitle(
              t.whatToExpect,
              <button
                type="button"
                className="ext-tpl-jump"
                data-ph-capture-attribute-template_action="jump"
                onClick={jumpToCommand}
              >
                {t.jump} {"\u2193"}
              </button>,
            )}
            <p className="ext-tpl-muted ext-tpl-oneline">{t.expectation}</p>
            <div className="ext-tpl-media">
              {item.video ? (
                <iframe
                  title={`${item.title} ${t.walkthrough}`}
                  src={`https://www.youtube-nocookie.com/embed/${item.video}?rel=0&playsinline=1`}
                  loading="lazy"
                  allow="encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : (
                <img src={shotOf(item)} alt={`${item.title} ${t.screenshot}`} />
              )}
            </div>

            {sectionTitle(t.copyAndRun)}
            <div
              ref={commandRef}
              className={flash ? "ext-tpl-command is-flash" : "ext-tpl-command"}
            >
              <pre>
                <code>{commandOf(item)}</code>
              </pre>
              <button
                type="button"
                className="ext-tpl-copy"
                data-ph-capture-attribute-template_action="copy"
                onClick={() => copy(commandOf(item))}
              >
                {copied ? t.copied : t.copy}
              </button>
            </div>
          </div>
        ) : (
          <div className="ext-tpl-panel" role="tabpanel">
            {sectionTitle(item.title)}
            <p className="ext-tpl-muted">{describe(item)}</p>

            {item.firstSteps.length > 0 ? sectionTitle(t.firstSteps) : null}
            <ol className="ext-tpl-list">
              {item.firstSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>

            {item.useCases.length > 0 ? sectionTitle(t.useItFor) : null}
            <ul className="ext-tpl-list">
              {item.useCases.map((useCase) => (
                <li key={useCase}>{useCase}</li>
              ))}
            </ul>

            <div className="ext-tpl-links">
              <a
                href={`${REPO}${item.slug}`}
                data-ph-capture-attribute-template_action="source"
                target="_blank"
                rel="noreferrer"
              >
                {t.sourceCode}
              </a>
              {item.docsUrl ? (
                <a
                  href={item.docsUrl}
                  data-ph-capture-attribute-template_action="reference"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.referenceDocs}
                </a>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="ext-tpl">
      <div className="ext-tpl-toolbar">
        <input
          type="search"
          className="ext-tpl-search"
          placeholder={t.searchPlaceholder}
          aria-label={t.searchLabel}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <label className="ext-tpl-featured">
          <input
            type="checkbox"
            data-ph-capture-attribute-template_action="featured"
            checked={featuredOnly}
            onChange={(event) => setFeaturedOnly(event.target.checked)}
          />
          {t.featuredOnly}
        </label>
      </div>

      <p className="ext-tpl-count" aria-live="polite">
        {t.count(visible.length, templates.length)}
      </p>

      <div className="ext-tpl-grid">
        {visible.map((item) => (
          <article key={item.slug} className="ext-tpl-card">
            {shotOf(item) ? (
              <div aria-hidden="true" className="ext-tpl-shot">
                <img
                  src={shotOf(item)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ) : null}
            <div className="ext-tpl-body">
              <div className="ext-tpl-head">
                <img
                  className="ext-tpl-icon"
                  src={iconOf(item)}
                  alt=""
                  loading="lazy"
                />
                <div className="ext-tpl-titles">
                  <h3 className="ext-tpl-name">
                    <button
                      type="button"
                      className="ext-tpl-hit"
                      data-ph-capture-attribute-template_action="open"
                      data-ph-capture-attribute-template_slug={item.slug}
                      aria-haspopup="dialog"
                      onClick={() => open(item.slug)}
                    >
                      {item.title}
                    </button>
                  </h3>
                  <p className="ext-tpl-meta">{surfacesOf(item)}</p>
                </div>
                {item.framework ? (
                  <span className="ext-tpl-pill">
                    {frameworkNames[item.framework] || item.framework}
                  </span>
                ) : null}
              </div>
              <p className="ext-tpl-desc">{describe(item)}</p>
              {browserRow(item)}
            </div>
          </article>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="ext-tpl-empty">
          {t.empty}
          {featuredOnly ? t.emptyFeatured : ""}
        </p>
      ) : null}

      {active ? dialog(active) : null}
    </div>
  );
};
