import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {defineConfig} from '@rspress/core'
import {pluginSitemap} from '@rspress/plugin-sitemap'
import {pluginOpenGraph} from 'rsbuild-plugin-open-graph'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  head: [
    '<meta name="author" content="Cezar Augusto">',
    '<meta name="description" content="Build browser extensions for Chrome, Edge, and Firefox with one modern workflow. Extension.js handles manifest compilation, browser-specific output, reload behavior, and packaging so you can focus on product features.">',
    `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NJD6VVD4');</script>
<!-- End Google Tag Manager -->`
  ],
  title: 'The cross-browser extension framework',
  lang: 'en',
  logo: 'https://extension.js.org/logo-dark.png',
  icon: 'https://avatars.githubusercontent.com/u/172809806',
  markdown: {
    checkDeadLinks: true
  },
  llms: true,
  globalStyles: path.join(__dirname, 'theme', 'index.css'),
  builderConfig: {
    html: {
      tags: [
        {
          tag: 'script',
          children: `(function() {
  window.RSPRESS_THEME = 'dark';
  var root = document.documentElement;
  root.classList.add('dark', 'rp-dark');
  root.style.colorScheme = 'dark';
})();`
        },
        {
          tag: 'noscript',
          head: false,
          children:
            '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NJD6VVD4" height="0" width="0" style="display:none;visibility:hidden"></iframe>'
        }
      ]
    },
    dev: {
      lazyCompilation: false
    },
    plugins: [
      // pluginGoogleAnalytics({ id: "G-0TTJ0PEKL2" }),
      pluginOpenGraph({
        title: 'The cross-browser extension framework',
        type: 'website',
        url: 'https://extension.js.org',
        image:
          'https://github.com/user-attachments/assets/410bc1bc-a2dd-4c89-97e7-dffc18a0d035',
        description:
          'Build browser extensions for Chrome, Edge, and Firefox with one modern workflow. Extension.js handles manifest compilation, browser-specific output, reload behavior, and packaging so you can focus on product features.',
        twitter: {
          site: '@extensionjs',
          card: 'summary_large_image'
        }
      })
    ],
    source: {
      preEntry: ['./theme/tailwind.css']
    },
    resolve: {
      alias: {
        '@builtIns': path.join(__dirname, 'components', 'builtIns'),
        '@components': path.join(__dirname, 'components'),
        '@hooks': path.join(__dirname, 'hooks')
      }
    },
    server: {
      open: 'http://localhost:3005',
      port: 3005,
      strictPort: true
    }
  },
  route: {
    cleanUrls: true
  },
  search: {
    searchHooks: path.join(__dirname, 'theme', 'search-hooks.ts')
  },
  locales: [
    {
      lang: 'en',
      title: 'Extension.js',
      label: 'English'
    }
  ],
  themeConfig: {
    darkMode: true,
    hideNavbar: 'never',
    lastUpdated: true,
    llmsUI: {
      placement: 'outline'
    },
    footer: {
      message: 'MIT (c) Cezar Augusto and the Extension.js authors.'
    },
    editLink: {
      docRepoBaseUrl: 'https://github.com/extension-js/docs/tree/main/docs',
      text: '📝 Edit this page on GitHub'
    },
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/extension-js/extension.js'
      },
      {
        icon: 'npm',
        mode: 'link',
        content: 'https://www.npmjs.com/package/extension'
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
    ]
  },
  plugins: [
    pluginSitemap({
      siteUrl: 'https://extension.js.org'
    })
  ]
})
