import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const CLI_DIR = resolve(REPO_ROOT, "..", "..", "programs", "extension");
const COMMANDS_DIR = resolve(CLI_DIR, "commands");
const OUT = resolve(REPO_ROOT, "__tests__", "fixtures", "cli-flags.json");

export const COMMAND_SOURCES = {
  create: ["create.ts"],
  dev: ["dev.ts"],
  build: ["build.ts"],
  start: ["start.ts"],
  preview: ["preview.ts"],
  install: ["install.ts"],
  uninstall: ["install.ts"],
  logs: ["logs.ts"],
  eval: ["act.ts"],
  inspect: ["act.ts"],
  storage: ["act.ts"],
  reload: ["act.ts"],
  open: ["act.ts"],
  doctor: ["doctor.ts"],
  capabilities: ["capabilities.ts"],
  telemetry: ["telemetry.ts"],
  publish: ["publish.ts"],
};

const BUILT_IN_FLAGS = ["--help", "--version"];

export function rootProgramFlags() {
  const flags = new Set(BUILT_IN_FLAGS);
  const indexPath = resolve(CLI_DIR, "index.ts");
  if (!existsSync(indexPath)) return flags;
  const content = readFileSync(indexPath, "utf-8");
  const rootBlock = content.split(/register[A-Za-z]+Command\(/)[0];
  for (const m of rootBlock.matchAll(/(--[a-z][\w-]*)/g)) flags.add(m[1]);
  return flags;
}

export function declaredFlags(verb) {
  const flags = new Set(rootProgramFlags());
  for (const source of COMMAND_SOURCES[verb] || []) {
    const path = resolve(COMMANDS_DIR, source);
    if (!existsSync(path)) continue;
    const content = readFileSync(path, "utf-8");
    for (const m of content.matchAll(/(--[a-z][\w-]*)/g)) flags.add(m[1]);
  }
  const indexPath = resolve(CLI_DIR, "index.ts");
  if (existsSync(indexPath)) {
    const content = readFileSync(indexPath, "utf-8");
    const section = content.split(`command('${verb}')`)[1];
    if (section) {
      const bounded = section.split(/\.command\(/)[0];
      for (const m of bounded.matchAll(/(--[a-z][\w-]*)/g)) flags.add(m[1]);
    }
  }
  return flags;
}

export function buildSnapshot() {
  const snapshot = {};
  for (const verb of Object.keys(COMMAND_SOURCES).sort()) {
    snapshot[verb] = [...declaredFlags(verb)].sort();
  }
  return snapshot;
}

export function hasMonorepo() {
  return existsSync(COMMANDS_DIR);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (!hasMonorepo()) {
    console.error(
      `Cannot generate: the CLI source is not at ${COMMANDS_DIR}.\n` +
        `Run this from a checkout that sits inside the Extension.js monorepo.`,
    );
    process.exit(1);
  }
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, `${JSON.stringify(buildSnapshot(), null, 2)}\n`);
  console.log(`Wrote ${OUT}`);
}
