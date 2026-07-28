import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { buildSnapshot, hasMonorepo } from "../scripts/generate-cli-flags.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const SNAPSHOT_PATH = resolve(__dirname, "fixtures", "cli-flags.json");

const LOCALE_ROOTS = ["docs", "zh-Hans", "zh-Hant"];

// The docs repo builds without the monorepo beside it, so the accepted flags
// ship as a generated snapshot. Regenerate with scripts/generate-cli-flags.mjs.
const snapshot: Record<string, string[]> = JSON.parse(
  readFileSync(SNAPSHOT_PATH, "utf-8"),
);

function walkMdx(dir: string, found: string[] = []): string[] {
  if (!existsSync(dir)) return found;
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    const full = resolve(dir, entry);
    if (statSync(full).isDirectory()) walkMdx(full, found);
    else if (entry.endsWith(".mdx") || entry.endsWith(".md")) found.push(full);
  }
  return found;
}

interface FencedCommand {
  file: string;
  line: number;
  verb: string;
  flags: string[];
  raw: string;
}

function collectFencedCommands(file: string): FencedCommand[] {
  const lines = readFileSync(file, "utf-8").split("\n");
  const commands: FencedCommand[] = [];
  let inFence = false;

  lines.forEach((rawLine, index) => {
    const trimmed = rawLine.trim();
    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      return;
    }
    if (!inFence) return;

    const match = trimmed.match(
      /^(?:[$>]\s*)?(?:npx|pnpm|npm run|yarn|bun|bunx)?\s*extension\s+([a-z-]+)(.*)$/,
    );
    if (!match) return;

    const verb = match[1];
    if (!(verb in snapshot)) return;

    const rest = match[2] || "";
    const flags = [...rest.matchAll(/(?<![\w-])(--[a-z][\w-]*)/g)].map(
      (m) => m[1],
    );

    commands.push({
      file: relative(REPO_ROOT, file),
      line: index + 1,
      verb,
      flags,
      raw: trimmed,
    });
  });

  return commands;
}

const files = LOCALE_ROOTS.flatMap((root) => walkMdx(resolve(REPO_ROOT, root)));
const fenced = files.flatMap(collectFencedCommands);

describe("fenced extension commands only use flags the verb accepts", () => {
  it("finds fenced commands to check", () => {
    expect(fenced.length).toBeGreaterThan(0);
  });

  it("every fenced command uses flags its verb accepts", () => {
    const offenders: string[] = [];

    for (const command of fenced) {
      const accepted = new Set(snapshot[command.verb] || []);
      for (const flag of command.flags) {
        if (!accepted.has(flag)) {
          offenders.push(
            `${command.file}:${command.line} - "extension ${command.verb}" does not accept ${flag}\n    ${command.raw}`,
          );
        }
      }
    }

    expect(offenders.join("\n"), offenders.join("\n")).toBe("");
  });

  it.skipIf(!hasMonorepo())("the flag snapshot matches the CLI source", () => {
    expect(buildSnapshot(), "Run: node scripts/generate-cli-flags.mjs").toEqual(
      snapshot,
    );
  });
});
