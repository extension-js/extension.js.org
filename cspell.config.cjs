// eslint-disable-next-line @typescript-eslint/no-require-imports -- CommonJS (.cjs) config consumed by cspell; require is the correct module form here
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
    "/project-words.txt",
    // Shoot plans and takes for the video rig. These are working notes full of
    // scene ids and file stems, so a dictionary of them would teach cspell
    // nothing about the prose readers actually see.
    "video/",
  ],
  flagWords: banWords,
  caseSensitive: true,
  allowCompoundWords: true,
  enableFiletypes: ["mdx"],
  words: ["srcăindexāmoduleācss"],
};
