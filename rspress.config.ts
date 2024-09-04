import path from "node:path";

import { pluginGoogleAnalytics } from "rsbuild-plugin-google-analytics";
import { pluginOpenGraph } from "rsbuild-plugin-open-graph";
import pluginSitemap from "rspress-plugin-sitemap";
import { defineConfig } from "rspress/config";

export default defineConfig({
  root: path.join(__dirname, "docs"),
  title: "Extension • Make it very easy to develop cross-browser extensions",
  description: "Make it very easy to develop cross-browser extensions",
  lang: "en",
  logo: {
    light:
      "https://github.com/user-attachments/assets/c35a8c33-77da-44f3-9ad0-1b44a9b7a151",
    dark: "https://github.com/user-attachments/assets/91d4de96-07cd-44fc-a2ce-3da862fffdc1",
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
          "Create cross-browser extensions with no build configuration.",
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
        title: "Extension",
        description:
          "Create cross-browser extensions with no build configuration",
        label: "English",
        editLink: {
          docRepoBaseUrl:
            "https://github.com/extension-js/extension.js/tree/main/website/docs",
          text: "📝 Edit this page on GitHub",
        },
        searchPlaceholderText: "Search Documentation",
      }
    ],
  },
  plugins: [
    pluginSitemap({
      domain: "https://extension.js.org",
    }),
  ],
});
