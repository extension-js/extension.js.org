import type { Template } from "./types";

const JS_TEMPLATES: Template[] = [
  {
    name: "new",
    screenshot:
      "https://raw.githubusercontent.com/extension-js/examples/main/public/new/screenshot.png",
    description:
      "Fastest path from idea to extension prototype with a plain JavaScript baseline.",
    uiContext: ["newTab"],
    uiFramework: undefined,
    css: "css",
    hasBackground: false,
    hasEnv: false,
    configFiles: undefined,
  },
];

const TS_TEMPLATES: Template[] = [
  {
    name: "new-typescript",
    screenshot:
      "https://raw.githubusercontent.com/extension-js/examples/main/public/new-typescript/screenshot.png",
    description:
      "Type-safe baseline for scalable extension codebases and safer refactors.",
    uiContext: ["newTab"],
    uiFramework: undefined,
    css: "css",
    hasBackground: false,
    hasEnv: false,
    configFiles: ["tsconfig.json"],
  },
];

const FRAMEWORK_TEMPLATES: Template[] = [
  {
    name: "new-react",
    screenshot:
      "https://raw.githubusercontent.com/extension-js/examples/main/public/new-react/screenshot.png",
    description:
      "Mature React ecosystem and predictable component architecture for extension UIs.",
    uiContext: ["newTab"],
    uiFramework: "react",
    css: "css",
    hasBackground: false,
    hasEnv: false,
    configFiles: ["tsconfig.json"],
  },
  {
    name: "new-preact",
    screenshot:
      "https://raw.githubusercontent.com/extension-js/examples/main/public/new-preact/screenshot.png",
    description:
      "React-like DX with a lighter runtime and smaller extension bundles.",
    uiContext: ["newTab"],
    uiFramework: "preact",
    css: "css",
    hasBackground: false,
    hasEnv: false,
    configFiles: ["tsconfig.json"],
  },
  {
    name: "new-vue",
    screenshot:
      "https://raw.githubusercontent.com/extension-js/examples/main/public/new-vue/screenshot.png",
    description:
      "Vue single-file component workflow for teams already shipping Vue apps.",
    uiContext: ["newTab"],
    uiFramework: "vue",
    css: "css",
    hasBackground: false,
    hasEnv: false,
    configFiles: ["tsconfig.json"],
  },
  {
    name: "new-svelte",
    screenshot:
      "https://raw.githubusercontent.com/extension-js/examples/main/public/new-svelte/screenshot.png",
    description:
      "Compiler-first performance with concise components and minimal boilerplate.",
    uiContext: ["newTab"],
    uiFramework: "svelte",
    css: "css",
    hasBackground: false,
    hasEnv: false,
    configFiles: ["tsconfig.json"],
  },
];

const DEFAULT_TEMPLATE = TS_TEMPLATES[0];
const WASM_TEMPLATES: Template[] = [];
const CUSTOM_TEMPLATES: Template[] = [];
const CONFIG_TEMPLATES: Template[] = [];

const ALL_TEMPLATES: Template[] = [
  ...FRAMEWORK_TEMPLATES,
  ...TS_TEMPLATES,
  ...JS_TEMPLATES,
];

const ALL_TEMPLATES_BUT_DEFAULT = ALL_TEMPLATES;

const SUPPORTED_BROWSERS: string[] = ["chrome", "edge", "firefox"];

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
  ALL_TEMPLATES_BUT_DEFAULT,
};
