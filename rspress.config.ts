import path from "node:path";

import { pluginGoogleAnalytics } from "rsbuild-plugin-google-analytics";
import { pluginOpenGraph } from "rsbuild-plugin-open-graph";
import pluginSitemap from "rspress-plugin-sitemap";
import { defineConfig } from "rspress/config";

export default defineConfig({
  root: path.join(__dirname, "docs"),
  head: ['<meta name="author" content="Cezar Augusto">'],
  title: "Extension.js",
  lang: "en",
  logo: {
    light: "logo-light.png",
    dark: "logo-dark.png",
  },
  icon: "https://avatars.githubusercontent.com/u/172809806",
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
      message: "MIT (c) Cezar Augusto and the Extension.js Authors.",
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
        title: "Extension.js",
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
