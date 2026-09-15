// Pure helpers for the used-by showcase refresh. No network and no file
// access here, so every rule that decides what reaches the page is tested.
import vm from "node:vm";

export const GENERATED_START = "// @generated:start";
export const GENERATED_END = "// @generated:end";
export const STORE_KEYS = ["chrome", "firefox", "edge"];

// Extension.js starts at 1.1.1 (2024-03-18). The npm name `extension` also
// belonged to an unrelated package (0.0.1 to 0.2.x), so older ranges are out.
const MIN_EXTENSION_JS = [1, 1, 1];
const DIST_TAGS = new Set(["latest", "next", "canary"]);

function parseVersion(text) {
  const m = /^v?(\d+)(?:\.(\d+|x|\*))?(?:\.(\d+|x|\*))?/.exec(
    String(text).trim(),
  );
  if (!m) return null;
  const part = (v) =>
    v === undefined || v === "x" || v === "*" ? 0 : Number(v);
  return [Number(m[1]), part(m[2]), part(m[3])];
}

function compareVersions(a, b) {
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] - b[i];
  }
  return 0;
}

// Lowest version a semver range admits, or null when the range has no lower
// bound (`*`, `x`, `<2`) or cannot be read.
export function lowestVersion(range) {
  const alternatives = String(range)
    .split("||")
    .map((alt) => alt.trim())
    .filter(Boolean);
  if (alternatives.length === 0) return null;
  let lowest = null;
  for (const alt of alternatives) {
    const tokens = alt.split(/\s+/).filter(Boolean);
    let altLow = null;
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token === "-" || token.startsWith("<")) continue;
      const op = /^(>=|>|=|\^|~)?/.exec(token)[1] || "";
      let rest = token.slice(op.length);
      if (!rest && tokens[i + 1]) rest = tokens[++i];
      const version = parseVersion(rest);
      if (!version) return null;
      if (op === ">") version[2] += 1;
      // Inside one alternative every lower bound must hold, so the highest wins.
      if (!altLow || compareVersions(version, altLow) > 0) altLow = version;
    }
    if (!altLow) return null;
    if (!lowest || compareVersions(altLow, lowest) < 0) lowest = altLow;
  }
  return lowest;
}

export function isExtensionJsSpec(spec) {
  if (typeof spec !== "string") return false;
  let value = spec.trim();
  if (value.startsWith("npm:")) {
    const alias = /^npm:extension@(.+)$/.exec(value);
    if (!alias) return false;
    value = alias[1].trim();
  }
  if (DIST_TAGS.has(value)) return true;
  if (/^0\.0\.0-next-\d+/.test(value)) return true;
  if (/^[a-z]+:/i.test(value) || value.includes("/")) return false;
  const low = lowestVersion(value);
  return low !== null && compareVersions(low, MIN_EXTENSION_JS) >= 0;
}

const CLI_CALL =
  /(^|[\s;&|(])extension(?:@[\w.^~-]+)?\s+(dev|build|start|preview)\b/g;
// `pnpm --filter extension dev` runs a workspace named extension, not the CLI.
const WORKSPACE_SELECTOR =
  /(--filter|-F|--scope|--workspace|workspace|-w)\s*=?$/;

export function callsExtensionCli(scripts) {
  if (!scripts || typeof scripts !== "object") return false;
  for (const value of Object.values(scripts)) {
    if (typeof value !== "string") continue;
    for (const match of value.matchAll(CLI_CALL)) {
      const before = value.slice(0, match.index + match[1].length).trimEnd();
      if (!WORKSPACE_SELECTOR.test(before)) return true;
    }
  }
  return false;
}

export function checkPackageJson(pkg) {
  const spec =
    (pkg && pkg.devDependencies && pkg.devDependencies.extension) ??
    (pkg && pkg.dependencies && pkg.dependencies.extension) ??
    null;
  return {
    spec,
    dependency: isExtensionJsSpec(spec),
    cli: callsExtensionCli(pkg && pkg.scripts),
  };
}

export function findStoreIds(text) {
  const source = String(text || "");
  const ids = {};
  const chrome =
    /(?:chromewebstore\.google\.com|chrome\.google\.com\/webstore)\/detail\/(?:[^/\s)"'?#]+\/)?([a-p]{32})/.exec(
      source,
    );
  if (chrome) ids.chrome = chrome[1];
  const firefox =
    /addons\.mozilla\.org\/(?:[a-z]{2}(?:-[A-Za-z]{2})?\/)?firefox\/addon\/([^/\s)"'?#]+)/.exec(
      source,
    );
  if (firefox) ids.firefox = decodeURIComponent(firefox[1]);
  const edge =
    /microsoftedge\.microsoft\.com\/addons\/detail\/(?:[^/\s)"'?#]+\/)?([a-z]{32})/.exec(
      source,
    );
  if (edge) ids.edge = edge[1];
  return ids;
}

export function storeUrl(store, id) {
  if (store === "chrome")
    return `https://chromewebstore.google.com/detail/${id}`;
  if (store === "firefox")
    return `https://addons.mozilla.org/firefox/addon/${id}/`;
  if (store === "edge")
    return `https://microsoftedge.microsoft.com/addons/detail/${id}`;
  return null;
}

function decodeEntities(text) {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

export function parseCount(text) {
  const match = /^([\d,.]+)\s*([KM])?/i.exec(String(text).trim());
  if (!match) return null;
  const base = Number(match[1].replace(/,/g, ""));
  if (!Number.isFinite(base)) return null;
  const unit = (match[2] || "").toUpperCase();
  return Math.round(base * (unit === "M" ? 1e6 : unit === "K" ? 1e3 : 1));
}

// Chrome Web Store has no public read API. The og: tags are the stable part
// of the page; users, rating and version come from text that has moved before,
// so each one is optional and a miss never fails the refresh.
export function parseChromeDetail(html) {
  const meta = (property) => {
    const match = new RegExp(
      `<meta property="og:${property}" content="([^"]*)"`,
    ).exec(html);
    return match ? decodeEntities(match[1]) : null;
  };
  const title = meta("title");
  if (!title) return null;
  const users = /(\d[\d,.]*\s*[KM]?)\+?\s+users\b/.exec(html);
  const rating = /(\d(?:\.\d)?) out of 5/.exec(html);
  const version = />Version<\/div>\s*<div[^>]*>\s*([^<\s]+)/.exec(html);
  return {
    name: title.replace(/\s+-\s+Chrome Web Store$/, ""),
    iconUrl: meta("image"),
    storeUrl: meta("url"),
    description: meta("description"),
    users: users ? parseCount(users[1]) : null,
    rating: rating ? Number(rating[1]) : null,
    version: version ? version[1] : null,
  };
}

export function mapAmoAddon(json) {
  if (!json || typeof json !== "object" || !json.slug) return null;
  const names = json.name && typeof json.name === "object" ? json.name : {};
  return {
    name: names["en-US"] || Object.values(names)[0] || json.slug,
    iconUrl: (json.icons && json.icons["128"]) || json.icon_url || null,
    storeUrl: json.url || null,
    users: Number.isFinite(json.average_daily_users)
      ? json.average_daily_users
      : null,
    rating:
      json.ratings && Number.isFinite(json.ratings.average)
        ? json.ratings.average
        : null,
    version: (json.current_version && json.current_version.version) || null,
  };
}

export function mapEdgeProduct(json) {
  if (!json || typeof json !== "object" || !json.crxId) return null;
  const logo = json.logoUrl || null;
  return {
    name: json.name || null,
    iconUrl: logo && logo.startsWith("//") ? `https:${logo}` : logo,
    storeUrl: `https://microsoftedge.microsoft.com/addons/detail/${json.crxId}`,
    users: Number.isFinite(json.activeInstallCount)
      ? json.activeInstallCount
      : null,
    rating: Number.isFinite(json.averageRating) ? json.averageRating : null,
    version: json.version || null,
  };
}

// Floor to two significant digits. Daily-user counts move every day, and a
// card that says "4.5K+" stays true without a pull request every week.
export function bucketCount(value) {
  if (!Number.isFinite(value) || value <= 0) return null;
  if (value < 100) return Math.floor(value);
  const step = 10 ** (Math.floor(Math.log10(value)) - 1);
  return Math.floor(value / step) * step;
}

export function mergeStats(project, stats, checkedAt) {
  const next = { ...project };
  const expected = STORE_KEYS.filter(
    (key) => project.storeIds && project.storeIds[key],
  );
  const received = expected.filter((key) => stats[key]);
  // Summing a partial set would show a drop that did not happen, so users only
  // move when every listed store answered.
  if (expected.length > 0 && received.length === expected.length) {
    const total = received.reduce(
      (sum, key) =>
        sum + (Number.isFinite(stats[key].users) ? stats[key].users : 0),
      0,
    );
    const users = bucketCount(total);
    if (users !== null) next.users = users;
  }
  const rating = STORE_KEYS.map((key) => stats[key] && stats[key].rating).find(
    (value) => Number.isFinite(value) && value > 0,
  );
  if (rating !== undefined) next.rating = Math.round(rating * 10) / 10;
  const version = ["firefox", "edge", "chrome"]
    .map((key) => stats[key] && stats[key].version)
    .find(Boolean);
  if (version) next.version = version;
  if (
    isRepositoryRoot(project.repo) &&
    stats.github &&
    Number.isFinite(stats.github.stars)
  ) {
    const stars = bucketCount(stats.github.stars);
    if (stars !== null) next.stars = stars;
  }
  const changed = ["users", "rating", "version", "stars"].some(
    (key) => next[key] !== project[key],
  );
  if (changed) next.statsCheckedAt = checkedAt;
  return { project: next, changed };
}

// Stars belong to a whole repository. A project that lives in a subfolder of a
// larger repository (a /tree/ link) would borrow stars that are not its own.
export function isRepositoryRoot(url) {
  return /^https:\/\/github\.com\/[^/\s]+\/[^/\s#?]+\/?$/.test(
    String(url || ""),
  );
}

export function githubRepoOf(url) {
  const match = /github\.com\/([^/\s]+)\/([^/\s#?]+)/.exec(String(url || ""));
  return match ? `${match[1]}/${match[2].replace(/\.git$/, "")}` : null;
}

export function readProjects(source) {
  const start = source.indexOf(GENERATED_START);
  const end = source.indexOf(GENERATED_END);
  if (start < 0 || end < 0 || end < start) {
    throw new Error("used-by snippet: the @generated markers are missing");
  }
  const block = source.slice(start + GENERATED_START.length, end).trim();
  const match = /^const\s+projects\s*=\s*([\s\S]*?);?$/.exec(block);
  if (!match) {
    throw new Error(
      "used-by snippet: no `const projects = [...]` between the markers",
    );
  }
  const projects = vm.runInNewContext(`(${match[1]})`, Object.create(null), {
    timeout: 1000,
  });
  if (!Array.isArray(projects)) {
    throw new Error("used-by snippet: `projects` is not an array");
  }
  return projects;
}

export function writeProjects(source, projects) {
  const start = source.indexOf(GENERATED_START);
  const end = source.indexOf(GENERATED_END);
  if (start < 0 || end < 0 || end < start) {
    throw new Error("used-by snippet: the @generated markers are missing");
  }
  const indent = (/([ \t]*)\/\/ @generated:end/.exec(source) || ["", ""])[1];
  return (
    source.slice(0, start + GENERATED_START.length) +
    `\n${indent}const projects = ${JSON.stringify(projects, null, 2)};\n${indent}` +
    source.slice(end)
  );
}

// GitHub's dependents page is HTML only. Rows carry a repository link and a
// star count, and the next page is a `dependents_after` cursor.
export function parseDependentsPage(html) {
  const rows = [];
  const chunks = String(html)
    .split('data-test-id="dg-repo-pkg-dependent"')
    .slice(1);
  for (const chunk of chunks) {
    const repo =
      /data-hovercard-type="repository"[^>]*href="\/([^"/]+\/[^"/]+)"/.exec(
        chunk,
      );
    if (!repo) continue;
    const afterStar = chunk.split("octicon-star")[1] || "";
    const stars = /<\/svg>\s*([\d,]+)/.exec(afterStar);
    rows.push({
      fullName: repo[1],
      stars: stars ? Number(stars[1].replace(/,/g, "")) : 0,
    });
  }
  const next = /href="[^"]*dependents_after=([^"&]+)[^"]*"[^>]*>\s*Next/.exec(
    html,
  );
  return { rows, next: next ? next[1] : null };
}

// GitHub renders only part of a large dependents list, so code search is the
// second source. Results carry the repository, and forks are dropped here.
export function parseCodeSearchRepos(json) {
  const names = new Map();
  for (const item of (json && json.items) || []) {
    const repo = item && item.repository;
    if (!repo || repo.fork || !repo.full_name) continue;
    names.set(repo.full_name.toLowerCase(), repo.full_name);
  }
  return [...names.values()];
}
