const { banWords } = require("cspell-ban-words");

module.exports = {
  $schema:
    "https://raw.githubusercontent.com/streetsidesoftware/cspell/main/cspell.schema.json",
  version: "0.2",
  files: ["**/*.{md,mdx}"],
  dictionaryDefinitions: [
    {
      name: "project-words",
      path: "./project-words.txt",
      addWords: true,
    },
  ],
  dictionaries: ["project-words"],
  ignorePaths: [
    "node_modules",
    "pnpm-lock.yaml",
    "package.json",
    "doc_build",
    "/project-words.txt",
  ],
  flagWords: banWords,
  caseSensitive: true,
  allowCompoundWords: true,
  enableFiletypes: ["mdx"],
  words: ["srcăindexāmoduleācss"],
};
