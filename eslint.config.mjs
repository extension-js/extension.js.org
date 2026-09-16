import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import onlyWarn from "eslint-plugin-only-warn";
import prettierPlugin from "eslint-plugin-prettier";
import turboPlugin from "eslint-plugin-turbo";
import globals from "globals";
import tseslint from "typescript-eslint";
import local from "./scripts/lib/eslint-style-rules.mjs";

const ignoreFiles = [".gitignore", ".git/info/exclude"]
  .map((file) => fileURLToPath(new URL(file, import.meta.url)))
  .filter((file) => existsSync(file))
  .map((file) => includeIgnoreFile(file));

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...ignoreFiles,
  {
    ignores: ["dist/**", "node_modules/**", ".pnpm-store/**", "coverage/**"],
  },
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"],
    plugins: { local },
    rules: {
      curly: ["error", "multi-line"],
      "local/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: ["return", "throw"] },
        { blankLine: "always", prev: "if", next: "*" },
        { blankLine: "any", prev: "if", next: "if" },
        { blankLine: "always", prev: "*", next: "block-like" },
        { blankLine: "always", prev: "block-like", next: "*" },
        { blankLine: "always", prev: "multiline-expression", next: "*" },
        { blankLine: "any", prev: "*", next: "empty" },
        { blankLine: "any", prev: "empty", next: "*" },
      ],
      "local/blank-line-after-shebang": "error",
      "local/no-file-header-comment": "error",
      "local/no-divider-comment": "error",
      "local/no-jsdoc-description": "error",
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
