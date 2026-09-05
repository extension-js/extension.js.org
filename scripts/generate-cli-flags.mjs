import { execFileSync } from "node:child_process";
import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const CLI_DIR = resolve(REPO_ROOT, "..", "..", "programs", "extension");
const COMMANDS_DIR = resolve(CLI_DIR, "commands");
const CLI_BIN = resolve(CLI_DIR, "bin", "extension.cjs");
const OUT = resolve(REPO_ROOT, "__tests__", "fixtures", "cli-flags.json");

// Only used to find options the CLI hides from `--help`. The visible set comes
// from the CLI itself, so a verb sharing a source file no longer inherits its
// siblings' flags.
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

// Stripped from argv before commander parses, so they never reach a `--help`
// listing. index.ts rejects them anywhere else, and --no-runner is removed
// outright, so it must not appear in any accepted set.
const ARGV_SHIM_FLAGS = {
  "--no-browser": ["dev", "start", "preview"],
  "--no-reload": ["dev"],
};

function runHelp(args) {
  try {
    return execFileSync("node", [CLI_BIN, ...args, "--help"], {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (error) {
    return `${error.stdout || ""}${error.stderr || ""}`;
  }
}

// Long and short names out of one commander flag string, e.g.
// "-b, --browser <x>" or "--gecko-binary, --firefox-binary <path>".
function namesFromFlagString(flagString) {
  const names = [];
  for (const token of flagString.split(/,\s*/)) {
    const match = token.trim().match(/^(--?[\w-]+)/);
    if (match) names.push(match[1]);
  }
  return names;
}

function visibleFlags(helpText) {
  const flags = new Set();
  const section = helpText.split(/\nOptions:\n/)[1];
  if (!section) return flags;
  for (const line of section.split("\n")) {
    if (line.trim() && /^\S/.test(line)) break; // reached the next help section
    const match = line.match(/^\s{2}(-.*?)(?:\s{2,}|$)/);
    if (!match) continue;
    for (const name of namesFromFlagString(match[1])) flags.add(name);
  }
  return flags;
}

function resolveTsModule(base) {
  for (const candidate of [base, `${base}.ts`, resolve(base, "index.ts")]) {
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

// Local name -> { path, exported } for every relative named import, so an
// `addOption(helper())` call can be traced back to the file that defines it.
function importedHelpers(content, fromDir) {
  const helpers = new Map();
  const importRe =
    /import\s*(?:type\s+)?\{([^}]*)\}\s*from\s*['"](\.[^'"]+)['"]/g;
  for (const m of content.matchAll(importRe)) {
    const path = resolveTsModule(resolve(fromDir, m[2]));
    if (!path) continue;
    for (const spec of m[1].split(",")) {
      const [exported, local] = spec.trim().split(/\s+as\s+/);
      if (exported) helpers.set(local || exported, { path, exported });
    }
  }
  return helpers;
}

// The text of one exported function in a helper module, up to the next
// top-level export, so only the Option that function builds is read.
function exportedFunctionText(path, name) {
  const content = readFileSync(path, "utf-8");
  const start = content.search(
    new RegExp(`export\\s+(?:async\\s+)?(?:function|const)\\s+${name}\\b`),
  );
  if (start === -1) return "";
  const rest = content.slice(start + 1);
  const next = rest.search(/\nexport\s/);
  return next === -1
    ? content.slice(start)
    : content.slice(start, start + 1 + next);
}

// Commands share options through helper factories (helpers/cli-options.ts),
// registered as `.addOption(helper())`. Returns the commander flag strings of
// every Option those helpers build for `section` (default: the whole file),
// hidden aliases included, so a shared option counts for the verb using it.
export function sharedOptionStrings(sourcePath, section) {
  if (!existsSync(sourcePath)) return [];
  const content = readFileSync(sourcePath, "utf-8");
  const helpers = importedHelpers(content, dirname(sourcePath));
  const strings = [];
  const callRe = /\.addOption\(\s*([A-Za-z_$][\w$]*)\(\s*\)\s*\)/g;
  for (const m of (section ?? content).matchAll(callRe)) {
    const helper = helpers.get(m[1]);
    if (!helper) continue;
    const body = exportedFunctionText(helper.path, helper.exported);
    for (const o of body.matchAll(/new Option\(\s*'([^']+)'/g))
      strings.push(o[1]);
  }
  return strings;
}

// Hidden options are always addOption(new Option(...)) because a plain
// .option() cannot be hidden, so scanning `new Option` in the command file and
// in the shared helpers it registers recovers exactly what --help omits.
function hiddenFlags(sourceFiles) {
  const flags = new Set();
  for (const file of sourceFiles) {
    const path = resolve(COMMANDS_DIR, file);
    if (!existsSync(path)) continue;
    const content = readFileSync(path, "utf-8");
    const strings = [
      ...[...content.matchAll(/new Option\(\s*'([^']+)'/g)].map((m) => m[1]),
      ...sharedOptionStrings(path),
    ];
    for (const flagString of strings) {
      for (const name of namesFromFlagString(flagString)) flags.add(name);
    }
  }
  return flags;
}

function rootHiddenFlags() {
  const path = resolve(CLI_DIR, "index.ts");
  if (!existsSync(path)) return new Set();
  const content = readFileSync(path, "utf-8");
  const rootBlock = content.split(/register[A-Za-z]+Command\(/)[0];
  const flags = new Set();
  for (const m of rootBlock.matchAll(/new Option\(\s*'([^']+)'/g)) {
    for (const name of namesFromFlagString(m[1])) flags.add(name);
  }
  return flags;
}

export function commandNames(rootHelp = runHelp([])) {
  const section = rootHelp.split("Commands:")[1] || "";
  const names = new Set();
  for (const line of section.split("\n")) {
    const match = line.match(/^\s{2}([a-z][a-z-]*)(?:\|([a-z|-]+))?\s/);
    if (!match) continue;
    names.add(match[1]);
    if (match[2]) for (const alias of match[2].split("|")) names.add(alias);
  }
  names.delete("help");
  return [...names];
}

export function buildSnapshot() {
  const rootHelp = runHelp([]);
  const inherited = new Set([
    ...visibleFlags(rootHelp),
    ...rootHiddenFlags(),
    "-h",
    "--help",
  ]);

  const snapshot = {};
  for (const verb of commandNames(rootHelp).sort()) {
    const flags = new Set([
      ...visibleFlags(runHelp([verb])),
      ...hiddenFlags(COMMAND_SOURCES[verb] || []),
      ...inherited,
    ]);
    for (const [flag, verbs] of Object.entries(ARGV_SHIM_FLAGS)) {
      if (verbs.includes(verb)) flags.add(flag);
    }
    snapshot[verb] = [...flags].sort();
  }
  return snapshot;
}

export function hasMonorepo() {
  return existsSync(COMMANDS_DIR) && existsSync(CLI_BIN);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (!hasMonorepo()) {
    console.error(
      `Cannot generate: the CLI is not at ${CLI_DIR}.\n` +
        `Run this from a checkout that sits inside the Extension.js monorepo.`,
    );
    process.exit(1);
  }
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, `${JSON.stringify(buildSnapshot(), null, 2)}\n`);
  console.log(`Wrote ${OUT}`);
}
