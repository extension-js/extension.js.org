import path from 'node:path'

import {pluginGoogleAnalytics} from 'rsbuild-plugin-google-analytics'
import {pluginOpenGraph} from 'rsbuild-plugin-open-graph'
import pluginSitemap from 'rspress-plugin-sitemap'
import {defineConfig} from 'rspress/config'

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  head: [
    '<meta name="author" content="Cezar Augusto">',
    '<meta name="description" content="Extension.js documentation for building, testing, and shipping cross-browser extensions with modern web tooling.">',
    `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M82MQDWX');</script>
<!-- End Google Tag Manager -->`
  ],
  title: 'Extension.js',
  lang: 'en',
  logo: {
    light: 'logo-light.png',
    dark: 'logo-dark.png'
  },
  icon: 'https://avatars.githubusercontent.com/u/172809806',
  markdown: {
    checkDeadLinks: true
  },
  ssg: {
    strict: true
  },
  globalStyles: path.join(__dirname, 'theme', 'index.css'),
  builderConfig: {
    dev: {
      lazyCompilation: true
    },
    plugins: [
      // pluginGoogleAnalytics({ id: "G-0TTJ0PEKL2" }),
      pluginOpenGraph({
        title: 'Extension.js',
        type: 'website',
        url: 'https://extension.js.org',
        image:
          'https://github.com/user-attachments/assets/410bc1bc-a2dd-4c89-97e7-dffc18a0d035',
        description:
          'Extension.js is a modern framework and CLI for creating, developing, and shipping cross-browser extensions with TypeScript, React, and Vue support.',
        twitter: {
          site: '@extensionjs',
          card: 'summary_large_image'
        }
      })
    ],
    source: {
      preEntry: ['./theme/tailwind.css'],
      alias: {
        '@builtIns': path.join(__dirname, 'components', 'builtIns'),
        '@components': path.join(__dirname, 'components'),
        '@hooks': path.join(__dirname, 'hooks')
      }
    },
    server: {
      open: true
    }
  },
  route: {
    cleanUrls: true
  },
  themeConfig: {
    hideNavbar: 'never',
    footer: {
      message: 'MIT (c) Cezar Augusto and the Extension.js Authors.'
    },
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/extension-js/extension.js'
      },
      {
        icon: 'discord',
        mode: 'link',
        content: 'https://discord.gg/v9h2RgeTSN'
      },
      {
        icon: 'x',
        mode: 'link',
        content: 'https://twitter.com/extensionjs'
      }
    ],
    locales: [
      {
        lang: 'en',
        title: 'Extension.js',
        label: 'English',
        editLink: {
          docRepoBaseUrl: 'https://github.com/extension-js/docs/tree/main/docs',
          text: '📝 Edit this page on GitHub'
        },
        searchPlaceholderText: 'Search Documentation'
      }
    ]
  },
  plugins: [
    pluginSitemap({
      domain: 'https://extension.js.org'
    })
  ]
})
