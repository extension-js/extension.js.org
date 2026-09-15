#!/usr/bin/env node
// Refreshes the used-by showcase.
//
// 1. Stats: for every project in snippets/used-by.jsx, reads users, rating and
//    version from the stores it lists, and GitHub stars. Writes them back in
//    place and never touches the hand-written fields.
// 2. Discovery: walks GitHub's dependents list for the `extension` package and
//    verifies each repository really builds with Extension.js. Verified
//    projects are only listed in the report. A person adds them to the page.
//
// Usage:
//   node scripts/used-by/refresh.mjs [--dry-run] [--no-discover]
//     [--body <path>] [--candidates <path>] [--max-pages 25]
//     [--verify-limit 150] [--min-stars 5]
// GITHUB_TOKEN raises the GitHub API limit from 60 to 5,000 requests an hour.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { format } from "prettier";
import {
  SHOWCASE_MIN_USERS,
  STORE_KEYS,
  bucketCount,
  checkPackageJson,
  githubRepoOf,
  isRepositoryRoot,
  mapAmoAddon,
  mapEdgeProduct,
  meetsShowcaseBar,
  mergeStats,
  parseChromeDetail,
  parseCodeSearchRepos,
  parseDependentsPage,
  pickStoreIds,
  readProjects,
  storeUrl,
  writeProjects,
} from "./lib.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SNIPPET = resolve(ROOT, "snippets/used-by.jsx");
// The dependency graph id of the npm package `extension` on GitHub.
const DEPENDENTS_URL =
  "https://github.com/extension-js/extension.js/network/dependents?package_id=UGFja2FnZS01MDk3NDAwNzE%3D";
const BROWSER_UA =
  "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0";
const FIRST_PARTY_OWNERS = new Set([
  "extension-js",
  "cezaraugusto",
  "extensiondev",
]);
const MANIFEST_PATHS = [
  "manifest.json",
  "src/manifest.json",
  "public/manifest.json",
];

function parseArgs(argv) {
  const options = {
    dryRun: false,
    discover: true,
    body: null,
    candidates: resolve(ROOT, "docs-review/used-by/candidates.md"),
    maxPages: 25,
    verifyLimit: 150,
    minStars: 5,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--no-discover") options.discover = false;
    else if (arg === "--body") options.body = resolve(argv[++i]);
    else if (arg === "--candidates") options.candidates = resolve(argv[++i]);
    else if (arg === "--max-pages") options.maxPages = Number(argv[++i]);
    else if (arg === "--verify-limit") options.verifyLimit = Number(argv[++i]);
    else if (arg === "--min-stars") options.minStars = Number(argv[++i]);
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

// eslint-disable-next-line turbo/no-undeclared-env-vars -- set by the GitHub Action, not a turbo task input
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

async function request(url, headers = {}) {
  const response = await fetch(url, {
    headers,
    redirect: "follow",
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return response;
}

const getText = async (url, headers) => (await request(url, headers)).text();
const getJson = async (url, headers) =>
  (await request(url, { accept: "application/json", ...headers })).json();

function github(path) {
  return getJson(`https://api.github.com${path}`, {
    "user-agent": "extension-js-used-by-refresh",
    "x-github-api-version": "2022-11-28",
    ...(TOKEN ? { authorization: `Bearer ${TOKEN}` } : {}),
  });
}

async function fetchStats(project) {
  const ids =
    project.storeIds && Object.keys(project.storeIds).length > 0
      ? project.storeIds
      : {};
  const stats = {};
  const errors = [];
  if (ids.chrome) {
    try {
      const html = await getText(
        `https://chromewebstore.google.com/detail/${ids.chrome}?hl=en`,
        { "user-agent": BROWSER_UA },
      );
      stats.chrome = parseChromeDetail(html);
      if (!stats.chrome) errors.push("Chrome Web Store page had no og:title");
      else if (stats.chrome.users === null)
        errors.push("Chrome Web Store user count not found");
    } catch (error) {
      errors.push(`Chrome Web Store: ${error.message}`);
    }
  }
  if (ids.firefox) {
    try {
      stats.firefox = mapAmoAddon(
        await getJson(
          `https://addons.mozilla.org/api/v5/addons/addon/${encodeURIComponent(ids.firefox)}/`,
        ),
      );
      if (!stats.firefox) errors.push("Firefox Add-ons returned no add-on");
    } catch (error) {
      errors.push(`Firefox Add-ons: ${error.message}`);
    }
  }
  if (ids.edge) {
    try {
      stats.edge = mapEdgeProduct(
        await getJson(
          `https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/${ids.edge}`,
        ),
      );
      if (!stats.edge) errors.push("Edge Add-ons returned no product");
    } catch (error) {
      errors.push(`Edge Add-ons: ${error.message}`);
    }
  }
  const repo = isRepositoryRoot(project.repo)
    ? githubRepoOf(project.repo)
    : null;
  if (repo) {
    try {
      const meta = await github(`/repos/${repo}`);
      stats.github = { stars: meta.stargazers_count };
    } catch (error) {
      errors.push(`GitHub: ${error.message}`);
    }
  }
  return { stats, errors };
}

async function discoverDependents(maxPages) {
  const found = new Map();
  let cursor = null;
  for (let page = 0; page < maxPages; page++) {
    const url = cursor
      ? `${DEPENDENTS_URL}&dependents_after=${cursor}`
      : DEPENDENTS_URL;
    let html;
    try {
      html = await getText(url, { "user-agent": BROWSER_UA });
    } catch (error) {
      return {
        repos: [...found.values()],
        error: `dependents page ${page + 1}: ${error.message}`,
      };
    }
    const { rows, next } = parseDependentsPage(html);
    for (const row of rows) found.set(row.fullName.toLowerCase(), row);
    if (!next || rows.length === 0) break;
    cursor = next;
    await sleep(1500);
  }
  return { repos: [...found.values()], error: null };
}

const CODE_SEARCH_QUERIES = [
  '"extension build" filename:package.json',
  '"extension dev" filename:package.json',
];

// Best effort: code search needs a token, and some tokens are not allowed to
// use it. A refusal is reported and discovery continues with the dependents list.
async function discoverByCodeSearch(limit) {
  if (!TOKEN)
    return { repos: [], error: "code search skipped: no GITHUB_TOKEN" };
  const found = new Map();
  for (const query of CODE_SEARCH_QUERIES) {
    for (let page = 1; page <= 2; page++) {
      try {
        const json = await github(
          `/search/code?q=${encodeURIComponent(query)}&per_page=100&page=${page}`,
        );
        for (const name of parseCodeSearchRepos(json))
          found.set(name.toLowerCase(), name);
        if (!json.items || json.items.length < 100) break;
      } catch (error) {
        return {
          repos: [...found.values()].slice(0, limit),
          error: `code search: ${error.message}`,
        };
      }
      await sleep(7000);
    }
  }
  return { repos: [...found.values()].slice(0, limit), error: null };
}

async function readRaw(fullName, branch, path) {
  return getText(
    `https://raw.githubusercontent.com/${fullName}/${branch}/${path}`,
  );
}

async function verifyRepository(fullName) {
  const repo = await github(`/repos/${fullName}`);
  if (repo.fork) return { ok: false, fullName, reason: "fork" };
  if (repo.archived) return { ok: false, fullName, reason: "archived" };
  if (FIRST_PARTY_OWNERS.has(repo.owner.login.toLowerCase())) {
    return { ok: false, fullName, reason: "first-party repository" };
  }
  const branch = repo.default_branch;
  const tree = await github(
    `/repos/${fullName}/git/trees/${encodeURIComponent(branch)}?recursive=1`,
  );
  const files = new Set(
    (tree.tree || [])
      .filter((entry) => entry.type === "blob")
      .map((entry) => entry.path),
  );
  const packageFiles = [...files]
    .filter(
      (path) =>
        /(^|\/)package\.json$/.test(path) && !path.includes("node_modules/"),
    )
    .slice(0, 40);
  for (const packagePath of packageFiles) {
    let pkg;
    try {
      pkg = JSON.parse(await readRaw(fullName, branch, packagePath));
    } catch {
      continue;
    }
    const check = checkPackageJson(pkg);
    if (!check.dependency || !check.cli) continue;
    const dir = packagePath.includes("/")
      ? packagePath.slice(0, packagePath.lastIndexOf("/") + 1)
      : "";
    if (!MANIFEST_PATHS.some((relative) => files.has(`${dir}${relative}`)))
      continue;
    const readRepoFile = async (path) => {
      if (!files.has(path)) return "";
      try {
        return await readRaw(fullName, branch, path);
      } catch {
        return "";
      }
    };
    const picked = pickStoreIds({
      inSubfolder: dir !== "",
      packageReadme: dir ? await readRepoFile(`${dir}README.md`) : "",
      rootReadme: await readRepoFile("README.md"),
      homepage: repo.homepage || "",
      description: repo.description || "",
    });
    return {
      ok: true,
      fullName,
      stars: repo.stargazers_count,
      description: repo.description || "",
      packagePath,
      spec: check.spec,
      repoUrl: dir
        ? `https://github.com/${fullName}/tree/${branch}/${dir.replace(/\/$/, "")}`
        : `https://github.com/${fullName}`,
      storeIds: picked.storeIds,
      ignoredRootStoreIds: picked.ignoredRoot,
    };
  }
  return {
    ok: false,
    fullName,
    reason:
      "no package.json with an Extension.js dependency, a CLI script and a manifest.json",
  };
}

// Root README links of a subfolder extension are shown, never counted.
function storeCell(candidate) {
  const ignored = Object.keys(candidate.ignoredRootStoreIds || {});
  const note =
    ignored.length > 0
      ? ` (root README links ${ignored.join(", ")}, not counted)`
      : "";
  return `${storeLinks(candidate.storeIds)}${note}`;
}

function storeLinks(storeIds) {
  const links = STORE_KEYS.filter((key) => storeIds[key]).map(
    (key) => `[${key}](${storeUrl(key, storeIds[key])})`,
  );
  return links.length > 0 ? links.join(", ") : "none";
}

function renderCandidates(candidates) {
  const lines = [
    "# Used-by candidates",
    "",
    "Generated by scripts/used-by/refresh.mjs. Each repository below depends on",
    "Extension.js 1.1.1 or later, calls the CLI from a script, and ships a",
    "manifest.json. None of them is on the page yet. The page lists projects",
    `that are in a store with at least ${SHOWCASE_MIN_USERS} users. To add one, copy it`,
    "into snippets/used-by.jsx with a description and an icon.",
    "",
  ];
  const listed = (c) => Object.keys(c.storeIds).length > 0;
  const table = (rows) => [
    "| Repository | Package | Extension.js | Users | Stores |",
    "| --- | --- | --- | --- | --- |",
    ...rows
      .slice()
      .sort((a, b) => a.fullName.localeCompare(b.fullName))
      .map(
        (c) =>
          `| [${c.fullName}](${c.repoUrl}) | \`${c.packagePath}\` | \`${c.spec}\` | ${c.users ?? ""} | ${storeCell(c)} |`,
      ),
  ];
  const sections = [
    ["## Meets the showcase bar", candidates.filter((c) => c.meetsBar)],
    [
      `## In a store, under ${SHOWCASE_MIN_USERS} users`,
      candidates.filter((c) => !c.meetsBar && listed(c)),
    ],
    ["## No store listing found", candidates.filter((c) => !listed(c))],
  ];
  for (const [heading, rows] of sections) {
    lines.push(
      heading,
      "",
      ...(rows.length > 0 ? table(rows) : ["None found."]),
      "",
    );
  }
  return lines.join("\n");
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const checkedAt = new Date().toISOString().slice(0, 10);
  const source = await readFile(SNIPPET, "utf8");
  const projects = readProjects(source);

  const statRows = [];
  const refreshed = [];
  let changedCount = 0;
  for (const project of projects) {
    const { stats, errors } = await fetchStats(project);
    const { project: next, changed } = mergeStats(project, stats, checkedAt);
    if (changed) changedCount++;
    refreshed.push(next);
    statRows.push({ project: next, changed, errors });
  }

  let candidates = [];
  const rejected = [];
  const notes = [];
  if (options.discover) {
    const listed = new Set(
      projects.map((project) =>
        (githubRepoOf(project.repo) || "").toLowerCase(),
      ),
    );
    const { repos: dependents, error } = await discoverDependents(
      options.maxPages,
    );
    if (error) notes.push(error);
    const searched = await discoverByCodeSearch(150);
    if (searched.error) notes.push(searched.error);
    const byName = new Map(
      dependents.map((row) => [row.fullName.toLowerCase(), row]),
    );
    for (const name of searched.repos) {
      if (byName.has(name.toLowerCase()) || listed.has(name.toLowerCase()))
        continue;
      try {
        const meta = await github(`/repos/${name}`);
        byName.set(name.toLowerCase(), {
          fullName: meta.full_name,
          stars: meta.stargazers_count,
        });
      } catch {
        // Ignore
      }
    }
    const repos = [...byName.values()];
    notes.push(
      `Dependents page: ${dependents.length} repositories. Code search: ${searched.repos.length} repositories.`,
    );
    const queue = repos
      .filter((row) => !listed.has(row.fullName.toLowerCase()))
      .filter((row) => row.stars >= options.minStars)
      .sort((a, b) => b.stars - a.stars)
      .slice(0, options.verifyLimit);
    notes.push(
      `Dependents seen: ${repos.length}. Checked: ${queue.length} (at least ${options.minStars} stars, not already listed).`,
    );
    for (const row of queue) {
      try {
        const result = await verifyRepository(row.fullName);
        if (!result.ok) {
          rejected.push(result);
          continue;
        }
        if (Object.keys(result.storeIds).length > 0) {
          const { stats } = await fetchStats({
            storeIds: result.storeIds,
            repo: result.repoUrl,
          });
          const total = STORE_KEYS.reduce(
            (sum, key) =>
              sum +
              (stats[key] && Number.isFinite(stats[key].users)
                ? stats[key].users
                : 0),
            0,
          );
          result.users = bucketCount(total);
        }
        result.meetsBar = meetsShowcaseBar(result);
        candidates.push(result);
      } catch (error) {
        rejected.push({
          ok: false,
          fullName: row.fullName,
          reason: error.message,
        });
      }
    }
  }

  if (!options.dryRun) {
    if (changedCount > 0) {
      const next = await format(writeProjects(source, refreshed), {
        parser: "babel",
        filepath: SNIPPET,
      });
      await writeFile(SNIPPET, next);
    }
    if (options.discover) {
      await mkdir(dirname(options.candidates), { recursive: true });
      const markdown = await format(renderCandidates(candidates), {
        parser: "markdown",
        filepath: options.candidates,
      });
      await writeFile(options.candidates, markdown);
    }
  }

  const body = [
    "Weekly refresh of the used-by showcase (extension.js.org/showcase).",
    "",
    "## Store stats",
    "",
    "| Project | Users | Rating | Version | Stars | Meets bar | Changed | Problems |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...statRows.map(
      ({ project, changed, errors }) =>
        `| ${project.name} | ${project.users ?? ""} | ${project.rating ?? ""} | ${project.version ?? ""} | ${project.stars ?? ""} | ${meetsShowcaseBar(project) ? "yes" : "no"} | ${changed ? "yes" : "no"} | ${errors.join("; ")} |`,
    ),
    "",
    "## New verified projects",
    "",
    candidates.length > 0
      ? [
          "| Repository | Stars | Users | Meets bar | Package | Extension.js | Stores |",
          "| --- | --- | --- | --- | --- | --- | --- |",
          ...candidates
            .sort(
              (a, b) =>
                Number(b.meetsBar) - Number(a.meetsBar) || b.stars - a.stars,
            )
            .map(
              (c) =>
                `| [${c.fullName}](${c.repoUrl}) | ${c.stars} | ${c.users ?? ""} | ${c.meetsBar ? "yes" : "no"} | \`${c.packagePath}\` | \`${c.spec}\` | ${storeCell(c)} |`,
            ),
        ].join("\n")
      : "None this week.",
    "",
    "These are not on the page. Review each one, then add it to `snippets/used-by.jsx` with a description, an icon and store ids.",
    "",
    "<details><summary>Rejected repositories</summary>",
    "",
    ...(rejected.length > 0
      ? rejected.map((r) => `- ${r.fullName}: ${r.reason}`)
      : ["- none"]),
    "",
    "</details>",
    "",
    ...notes.map((note) => `_${note}_`),
    "",
  ].join("\n");

  if (options.body) {
    await mkdir(dirname(options.body), { recursive: true });
    await writeFile(options.body, body);
  } else {
    process.stdout.write(`${body}\n`);
  }
  process.stdout.write(
    `used-by: ${changedCount} project(s) with new stats, ${candidates.length} candidate(s), ${rejected.length} rejected.\n`,
  );
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exit(1);
});
