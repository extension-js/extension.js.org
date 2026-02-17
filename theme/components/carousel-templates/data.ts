import type {Template} from './types'

const DEFAULT_TEMPLATE: Template = {
  name: 'init',
  screenshot: 'https://placekitten.com/200/300',
  description: 'An Extension.js template',
  uiContext: undefined,
  uiFramework: undefined,
  css: 'css',
  hasBackground: false,
  hasEnv: false,
  configFiles: undefined
}

const JS_TEMPLATES: Template[] = [
  {
    name: 'action',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['action'],
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: undefined
  },
  {
    name: 'content',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['content'],
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: undefined
  },
  {
    name: 'content-esm',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['content'],
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: undefined
  },
  {
    name: 'content-css-modules',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['content'],
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: undefined
  },
  {
    name: 'content-less',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['content'],
    uiFramework: undefined,
    css: 'less',
    hasBackground: false,
    hasEnv: false,
    configFiles: undefined
  },
  {
    name: 'content-less-modules',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['content'],
    uiFramework: undefined,
    css: 'less',
    hasBackground: false,
    hasEnv: false,
    configFiles: undefined
  },
  {
    name: 'content-main-world',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['content'],
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: undefined
  },
  {
    name: 'content-sass',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['content'],
    uiFramework: undefined,
    css: 'sass',
    hasBackground: false,
    hasEnv: false,
    configFiles: undefined
  },
  {
    name: 'content-sass-modules',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['content'],
    uiFramework: undefined,
    css: 'sass',
    hasBackground: false,
    hasEnv: false,
    configFiles: undefined
  },
  {
    name: 'declarative_net_request',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: undefined,
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: undefined
  },
  {
    name: 'action-locales',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['action'],
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: undefined
  },
  {
    name: 'new',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['newTab'],
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: undefined
  },
  {
    name: 'new-esm',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['newTab'],
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: undefined
  },
  {
    name: 'new-less',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['newTab'],
    uiFramework: undefined,
    css: 'less',
    hasBackground: false,
    hasEnv: false,
    configFiles: undefined
  },
  {
    name: 'new-sass',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['newTab'],
    uiFramework: undefined,
    css: 'sass',
    hasBackground: false,
    hasEnv: false,
    configFiles: undefined
  },
  {
    name: 'sidebar',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['sidebar'],
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: undefined
  },
  {
    name: 'special-folders-pages',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: undefined,
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: undefined
  },
  {
    name: 'special-folders-scripts',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: undefined,
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: undefined
  },
  {
    name: 'storage',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: undefined,
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: undefined
  }
]

const WASM_TEMPLATES: Template[] = []

const TS_TEMPLATES: Template[] = [
  {
    name: 'content-typescript',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['content'],
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: ['tsconfig.json']
  },
  {
    name: 'content-env',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['content'],
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: ['tsconfig.json']
  },
  {
    name: 'new-typescript',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['newTab'],
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: ['tsconfig.json']
  },
  {
    name: 'new-env',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['newTab'],
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: ['tsconfig.json']
  }
]

const CUSTOM_TEMPLATES: Template[] = [
  {
    name: 'action-chatgpt',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['action'],
    uiFramework: 'react',
    css: 'css',
    hasBackground: false,
    hasEnv: true,
    configFiles: ['postcss.config.js', 'tailwind.config.js', 'tsconfig.json']
  },
  {
    name: 'new-crypto',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['newTab'],
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: ['tsconfig.json', 'extension.config.js']
  },
  {
    name: 'new-node-apis',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['newTab'],
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: ['tsconfig.json', 'extension.config.js']
  },
  {
    name: 'content-react-svgr',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['content'],
    uiFramework: 'react',
    css: 'css',
    hasBackground: true,
    hasEnv: false,
    configFiles: [
      'extension.config.js',
      'tsconfig.json',
      'postcss.config.js',
      'tailwind.config.js'
    ]
  },
  {
    name: 'new-react-router',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['newTab'],
    uiFramework: 'react',
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: ['tsconfig.json']
  }
]

const FRAMEWORK_TEMPLATES: Template[] = [
  {
    name: 'new-react',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['newTab'],
    uiFramework: 'react',
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: ['tsconfig.json']
  },
  {
    name: 'content-react',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['content'],
    uiFramework: 'react',
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: ['postcss.config.js', 'tailwind.config.js', 'tsconfig.json']
  },
  {
    name: 'new-preact',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['newTab'],
    uiFramework: 'preact',
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: ['tsconfig.json']
  },
  {
    name: 'content-preact',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['content'],
    uiFramework: 'preact',
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: ['postcss.config.js', 'tailwind.config.js', 'tsconfig.json']
  },
  {
    name: 'content-extension-config',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['content'],
    uiFramework: 'react',
    css: 'css',
    hasBackground: true,
    hasEnv: false,
    configFiles: [
      'extension.config.js',
      'tsconfig.json',
      'postcss.config.js',
      'tailwind.config.js'
    ]
  },
  {
    name: 'new-vue',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['newTab'],
    uiFramework: 'vue',
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: ['tsconfig.json']
  },
  {
    name: 'content-vue',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['content'],
    uiFramework: 'vue',
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: ['postcss.config.js', 'tailwind.config.js', 'tsconfig.json']
  },
  {
    name: 'new-svelte',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['newTab'],
    uiFramework: 'svelte',
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: ['tsconfig.json']
  }
]

const CONFIG_TEMPLATES: Template[] = [
  // {
  //  name: 'config-babel',
  //  screenshot: 'https://placekitten.com/200/300',
  //  description: 'An Extension.js template', //   uiContext: ['newTab'],
  //   uiFramework: undefined,
  //   css: 'css',
  //   hasBackground: false,
  //   hasEnv: false,
  //   configFiles: ['babel.config.json']
  // },
  {
    name: 'new-config-eslint',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['newTab'],
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: ['tsconfig.json', 'eslint.config.mjs']
  },
  {
    name: 'new-config-lint',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['newTab'],
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: [
      'tsconfig.json',
      '.stylelintrc.json',
      'eslint.config.mjs',
      '.prettierrc',
      '.stylelintrc.json'
    ]
  },
  {
    name: 'new-config-prettier',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['newTab'],
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: ['tsconfig.json', '.prettierrc']
  },
  {
    name: 'new-config-stylelint',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['newTab'],
    uiFramework: undefined,
    css: 'sass',
    hasBackground: false,
    hasEnv: false,
    configFiles: ['.stylelintrc.json']
  },
  {
    name: 'content-tailwind',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['content'],
    uiFramework: undefined,
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: ['tailwind.config.js', 'postcss.config.js']
  },
  {
    name: 'new-tailwind',
    screenshot: 'https://placekitten.com/200/300',
    description: 'An Extension.js template',
    uiContext: ['newTab'],
    uiFramework: 'react',
    css: 'css',
    hasBackground: false,
    hasEnv: false,
    configFiles: ['postcss.config.js', 'tailwind.config.js', 'tsconfig.json']
  }
]

const ALL_TEMPLATES: Template[] = [
  DEFAULT_TEMPLATE,
  ...JS_TEMPLATES,
  ...WASM_TEMPLATES,
  ...TS_TEMPLATES,
  ...CUSTOM_TEMPLATES,
  ...FRAMEWORK_TEMPLATES,
  ...CONFIG_TEMPLATES
]

const ALL_TEMPLATES_BUT_DEFAULT = ALL_TEMPLATES.filter(
  (template) => template.name !== 'init'
)

const SUPPORTED_BROWSERS: string[] = ['chrome', 'edge', 'firefox']

export {
  SUPPORTED_BROWSERS,
  DEFAULT_TEMPLATE,
  JS_TEMPLATES,
  WASM_TEMPLATES,
  TS_TEMPLATES,
  CUSTOM_TEMPLATES,
  FRAMEWORK_TEMPLATES,
  CONFIG_TEMPLATES,
  ALL_TEMPLATES,
  ALL_TEMPLATES_BUT_DEFAULT
}
