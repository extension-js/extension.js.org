import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  bucketCount,
  callsExtensionCli,
  checkPackageJson,
  findStoreIds,
  githubRepoOf,
  isExtensionJsSpec,
  isRepositoryRoot,
  lowestVersion,
  mapAmoAddon,
  mapEdgeProduct,
  meetsShowcaseBar,
  mergeStats,
  parseChromeDetail,
  parseCodeSearchRepos,
  parseCount,
  parseDependentsPage,
  readProjects,
  storeUrl,
  writeProjects,
} from "../scripts/used-by/lib.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const fixture = (name: string) =>
  readFileSync(resolve(HERE, "fixtures/used-by", name), "utf8");
const SNIPPET = readFileSync(
  resolve(HERE, "..", "snippets/used-by.jsx"),
  "utf8",
);

describe("the Extension.js dependency rule", () => {
  it.each([
    "^4.1.5",
    "4.1.17",
    "~3.0.0",
    "4.x",
    ">=1.1.1",
    "^2.0.0-beta.1",
    "latest",
    "next",
    "npm:extension@^4.0.0",
    "0.0.0-next-20250825144602",
  ])("accepts %s", (spec) => {
    expect(isExtensionJsSpec(spec)).toBe(true);
  });

  it.each([
    "^0.2.0",
    "~0.1.0",
    "0.2.2",
    ">=1.0.0 <2",
    "*",
    "",
    "<2.0.0",
    "workspace:*",
    "file:../extension",
    "github:extension-js/extension.js",
    "npm:other@^4.0.0",
  ])("rejects %s, which may be the unrelated 2012 package", (spec) => {
    expect(isExtensionJsSpec(spec)).toBe(false);
  });

  it("rejects a missing dependency", () => {
    expect(isExtensionJsSpec(undefined)).toBe(false);
  });

  it("reads the lowest version across alternatives", () => {
    expect(lowestVersion("^1.2.3 || ^0.1.0")).toEqual([0, 1, 0]);
  });
});

describe("the CLI script rule", () => {
  it.each([
    "extension dev",
    "npx extension@latest dev --browser chrome",
    "npm run generate && extension build --browser all --zip",
    "cross-env NODE_ENV=production extension preview",
  ])("accepts %s", (script) => {
    expect(callsExtensionCli({ dev: script })).toBe(true);
  });

  it.each([
    "pnpm --filter extension dev",
    "yarn workspace extension build",
    "vite dev",
    "eslint extension",
  ])("rejects %s", (script) => {
    expect(callsExtensionCli({ dev: script })).toBe(false);
  });

  it("checks the dependency and the script together", () => {
    expect(
      checkPackageJson({
        devDependencies: { extension: "^4.1.5" },
        scripts: { dev: "extension dev --browser chrome" },
      }),
    ).toEqual({ spec: "^4.1.5", dependency: true, cli: true });
  });
});

describe("store ids", () => {
  it("finds Chrome, Firefox and Edge ids in README text", () => {
    const readme = [
      "[Chrome](https://chromewebstore.google.com/detail/better-lyrics/effdbpeggelllpfkjppbokhmmiinhlmg)",
      "[Firefox](https://addons.mozilla.org/en-US/firefox/addon/better-lyrics/)",
      "https://microsoftedge.microsoft.com/addons/detail/mjfeaklppoegooljmjicjdbiccgjdlhd",
    ].join("\n");
    expect(findStoreIds(readme)).toEqual({
      chrome: "effdbpeggelllpfkjppbokhmmiinhlmg",
      firefox: "better-lyrics",
      edge: "mjfeaklppoegooljmjicjdbiccgjdlhd",
    });
  });

  it("reads the legacy Chrome Web Store host", () => {
    expect(
      findStoreIds(
        "https://chrome.google.com/webstore/detail/name/effdbpeggelllpfkjppbokhmmiinhlmg",
      ),
    ).toEqual({ chrome: "effdbpeggelllpfkjppbokhmmiinhlmg" });
  });

  it("builds store URLs from ids", () => {
    expect(storeUrl("firefox", "better-lyrics")).toBe(
      "https://addons.mozilla.org/firefox/addon/better-lyrics/",
    );
  });
});

describe("store data", () => {
  it("parses a Chrome Web Store detail page", () => {
    const detail = parseChromeDetail(fixture("cws-detail.html"));
    expect(detail).toMatchObject({
      name: "Better Lyrics (Lyrics for YouTube Music)",
      users: 100000,
      rating: 4.9,
      version: "2.3.3",
    });
    expect(detail?.iconUrl).toMatch(/^https:\/\/lh3\.googleusercontent\.com\//);
  });

  it("returns null for a page without og tags", () => {
    expect(parseChromeDetail("<html></html>")).toBeNull();
  });

  it("parses counts with separators and units", () => {
    expect(parseCount("1,234")).toBe(1234);
    expect(parseCount("1.2K")).toBe(1200);
    expect(parseCount("3M")).toBe(3000000);
    expect(parseCount("many")).toBeNull();
  });

  it("maps a Firefox Add-ons response", () => {
    expect(
      mapAmoAddon({
        slug: "better-lyrics",
        name: { "en-US": "Better Lyrics" },
        icons: { "128": "https://addons.mozilla.org/icon-128.png" },
        url: "https://addons.mozilla.org/en-US/firefox/addon/better-lyrics/",
        average_daily_users: 4549,
        ratings: { average: 4.91 },
        current_version: { version: "2.3.3" },
      }),
    ).toMatchObject({
      name: "Better Lyrics",
      users: 4549,
      rating: 4.91,
      version: "2.3.3",
    });
    expect(mapAmoAddon({})).toBeNull();
  });

  it("maps an Edge Add-ons response and fixes its protocol-relative logo", () => {
    expect(
      mapEdgeProduct({
        crxId: "mjfeaklppoegooljmjicjdbiccgjdlhd",
        name: "Better Lyrics",
        logoUrl: "//store-images.s-microsoft.com/image/logo",
        activeInstallCount: 5326,
        averageRating: 4.9,
        version: "2.3.3",
      }),
    ).toMatchObject({
      iconUrl: "https://store-images.s-microsoft.com/image/logo",
      users: 5326,
    });
    expect(mapEdgeProduct(null)).toBeNull();
  });
});

describe("merging stats", () => {
  const base = {
    slug: "better-lyrics",
    name: "Better Lyrics",
    repo: "https://github.com/better-lyrics/better-lyrics",
    storeIds: { chrome: "a", firefox: "b", edge: "c" },
    users: 90000,
    version: "2.3.2",
    description: { en: "Hand-written." },
  };
  const full = {
    chrome: { users: 100000, rating: 4.9, version: "2.3.3" },
    firefox: { users: 4549, rating: 4.91, version: "2.3.3" },
    edge: { users: 5326, rating: 4.9, version: "2.3.3" },
    github: { stars: 865 },
  };

  it("floors counts to two significant digits", () => {
    expect(bucketCount(4549)).toBe(4500);
    expect(bucketCount(109875)).toBe(100000);
    expect(bucketCount(865)).toBe(860);
    expect(bucketCount(42)).toBe(42);
    expect(bucketCount(0)).toBeNull();
  });

  it("sums users across stores and keeps hand-written fields", () => {
    const { project, changed } = mergeStats(base, full, "2026-09-15");
    expect(changed).toBe(true);
    expect(project).toMatchObject({
      users: 100000,
      rating: 4.9,
      version: "2.3.3",
      stars: 860,
      statsCheckedAt: "2026-09-15",
      description: { en: "Hand-written." },
    });
  });

  it("keeps the previous users when a listed store did not answer", () => {
    const { project } = mergeStats(
      base,
      { firefox: full.firefox, edge: full.edge },
      "2026-09-15",
    );
    expect(project.users).toBe(90000);
    expect(project.version).toBe("2.3.3");
  });

  it("reports no change and keeps the date when nothing moved", () => {
    const current = {
      ...base,
      users: 100000,
      rating: 4.9,
      version: "2.3.3",
      stars: 860,
      statsCheckedAt: "2026-09-01",
    };
    const { project, changed } = mergeStats(current, full, "2026-09-15");
    expect(changed).toBe(false);
    expect(project.statsCheckedAt).toBe("2026-09-01");
  });

  it("shows stars only for a project at the root of its repository", () => {
    expect(
      isRepositoryRoot("https://github.com/better-lyrics/better-lyrics"),
    ).toBe(true);
    expect(
      isRepositoryRoot(
        "https://github.com/ApolloAuto/apollo/tree/master/modules/dreamview_plus",
      ),
    ).toBe(false);
    const subfolder = {
      ...base,
      repo: "https://github.com/ApolloAuto/apollo/tree/master/modules/dreamview_plus",
    };
    const { project } = mergeStats(
      subfolder,
      { github: { stars: 26827 } },
      "2026-09-15",
    );
    expect(project.stars).toBeUndefined();
  });

  it("reads a GitHub repository from a tree URL", () => {
    expect(
      githubRepoOf("https://github.com/debpalash/Opal/tree/main/extension"),
    ).toBe("debpalash/Opal");
  });
});

describe("the snippet data block", () => {
  it("reads the projects between the generated markers", () => {
    const projects = readProjects(SNIPPET);
    expect(projects.length).toBeGreaterThan(0);
    for (const project of projects) {
      expect(project.slug, "every project needs a slug").toBeTruthy();
      expect(project.repo, `${project.slug} needs a repo`).toMatch(
        /^https:\/\/github\.com\//,
      );
      expect(
        project.description?.en,
        `${project.slug} needs an English description`,
      ).toBeTruthy();
    }
  });

  it("writes the projects back so they read the same", () => {
    const projects = readProjects(SNIPPET);
    expect(readProjects(writeProjects(SNIPPET, projects))).toEqual(projects);
  });

  it("refuses a snippet without markers", () => {
    expect(() => readProjects("export const UsedByGrid = () => null;")).toThrow(
      /markers/,
    );
  });
});

describe("the GitHub dependents page", () => {
  it("reads repository rows, star counts and the next cursor", () => {
    const { rows, next } = parseDependentsPage(fixture("dependents.html"));
    expect(rows).toHaveLength(30);
    expect(rows[0].fullName).toBe("beeyev/tonic-for-gitlab");
    expect(rows.every((row) => Number.isInteger(row.stars))).toBe(true);
    expect(next).toBe("NTA4MDkyMDM3NDY");
  });
});

describe("code search results", () => {
  it("collects unique repositories and drops forks", () => {
    expect(
      parseCodeSearchRepos({
        items: [
          { repository: { full_name: "mantou132/browser4agent", fork: false } },
          { repository: { full_name: "mantou132/browser4agent", fork: false } },
          { repository: { full_name: "someone/fork-of-it", fork: true } },
          { repository: null },
        ],
      }),
    ).toEqual(["mantou132/browser4agent"]);
    expect(parseCodeSearchRepos(undefined)).toEqual([]);
  });
});

describe("the showcase bar", () => {
  it("needs a store listing and at least 100 users", () => {
    expect(meetsShowcaseBar({ storeIds: { chrome: "a" }, users: 290 })).toBe(
      true,
    );
    expect(meetsShowcaseBar({ storeIds: { firefox: "b" }, users: 97 })).toBe(
      false,
    );
    expect(meetsShowcaseBar({ storeIds: {}, users: 5000 })).toBe(false);
    expect(meetsShowcaseBar({ users: 5000 })).toBe(false);
  });

  it("holds for every project on the page", () => {
    for (const project of readProjects(SNIPPET)) {
      expect(
        meetsShowcaseBar(project),
        `${project.slug} is below the bar`,
      ).toBe(true);
    }
  });
});
