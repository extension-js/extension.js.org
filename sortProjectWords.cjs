// eslint-disable-next-line @typescript-eslint/no-require-imports -- CommonJS (.cjs) script run via `node`; require is the correct module form here
const fs = require("node:fs");
const words = fs
  .readFileSync("./project-words.txt", { encoding: "utf-8" })
  .split("\n")
  .filter(Boolean);

const sortedWords = words.sort((a, b) => a.localeCompare(b));

fs.writeFileSync("./project-words.txt", `${sortedWords.join("\n")}\n`);
