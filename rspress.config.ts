import path from "node:path";

import { pluginGoogleAnalytics } from "rsbuild-plugin-google-analytics";
import { pluginOpenGraph } from "rsbuild-plugin-open-graph";
import pluginSitemap from "rspress-plugin-sitemap";
import { defineConfig } from "rspress/config";

export default defineConfig({
  root: path.join(__dirname, "docs"),
  head: ['<meta name="author" content="Cezar Augusto">'],
  title: "The Cross-Browser Extension Framework • Extension.js",
  // description:
  //   "Extension.js makes it very easy to create, develop, and distribute cross-browser extensions with no build configuration.",
  lang: "en",
  logo: {
    light:
      "https://github.com/user-attachments/assets/c51916f5-454b-4502-b171-ab1f26fc2dd2",
    dark: "https://github.com/user-attachments/assets/5690527e-1981-43dd-b267-4a7fc3752bc3",
  },
  icon: "https://github.com/user-attachments/assets/58c169c3-03a5-4088-9bdb-61775917428f",
  markdown: {
    checkDeadLinks: true,
  },
  ssg: {
    strict: true,
  },
  globalStyles: path.join(__dirname, "theme", "index.css"),
  builderConfig: {
    dev: {
      lazyCompilation: true,
    },
    plugins: [
      pluginGoogleAnalytics({ id: "G-0TTJ0PEKL2" }),
      pluginOpenGraph({
        title: "Extension.js",
        type: "website",
        url: "https://extension.js.org",
        image:
          "https://github.com/user-attachments/assets/410bc1bc-a2dd-4c89-97e7-dffc18a0d035",
        description:
          "Extension.js makes it very easy to create, develop, and distribute cross-browser extensions with no build configuration.",
        twitter: {
          site: "@extensionjs",
          card: "summary_large_image",
        },
      }),
    ],
    source: {
      preEntry: ["./theme/tailwind.css"],
      alias: {
        "@builtIns": path.join(__dirname, "components", "builtIns"),
        "@components": path.join(__dirname, "components"),
        "@hooks": path.join(__dirname, "hooks"),
      },
    },
    server: {
      open: true,
    },
  },
  route: {
    cleanUrls: true,
  },
  themeConfig: {
    hideNavbar: "never",
    footer: {
      message: "MIT (c) 2024 Cezar Augusto and the Extension.js Authors.",
    },
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/extension-js/extension.js",
      },
      {
        icon: "discord",
        mode: "link",
        content: "https://discord.gg/v9h2RgeTSN",
      },
      {
        icon: "x",
        mode: "link",
        content: "https://twitter.com/extensionjs",
      },
    ],
    locales: [
      {
        lang: "en",
        title: "The Cross-Browser Extension Framework • Extension.js",
        description:
          "Extension.js makes it very easy to create, develop, and distribute cross-browser extensions with no build configuration.",
        label: "English",
        editLink: {
          docRepoBaseUrl: "https://github.com/extension-js/docs/tree/main/docs",
          text: "📝 Edit this page on GitHub",
        },
        searchPlaceholderText: "Search Documentation",
      },
    ],
  },
  plugins: [
    pluginSitemap({
      domain: "https://extension.js.org",
    }),
  ],
});
