// Mintlify evaluates every export of a snippet in isolation, so this file
// has one export and everything it needs lives inside it.
//
// The `projects` array sits between the @generated markers. The weekly used-by
// workflow (scripts/used-by/refresh.mjs) refreshes users, rating, version,
// stars and statsCheckedAt in place and never changes the other fields.
// To add a project by hand, append one object, give it storeIds when it is
// published, and put its images under /images/used-by/<slug>/.
export const UsedByGrid = ({ locale = "en" }) => {
  // @generated:start
  const projects = [
    {
      slug: "better-lyrics",
      name: "Better Lyrics",
      owner: "better-lyrics",
      repo: "https://github.com/better-lyrics/better-lyrics",
      website: "https://betterlyrics.org/",
      icon: "/images/used-by/better-lyrics/icon.png",
      screenshot: "/images/used-by/better-lyrics/screenshot.jpg",
      version: "2.3.3",
      browsers: ["Chrome", "Firefox", "Edge"],
      storeIds: {
        chrome: "effdbpeggelllpfkjppbokhmmiinhlmg",
        firefox: "better-lyrics",
        edge: "mjfeaklppoegooljmjicjdbiccgjdlhd",
      },
      source: "manual",
      description: {
        en: "Time-synced lyrics for YouTube Music, with translations and support for many languages.",
        "zh-Hans": "为 YouTube Music 提供时间同步歌词，支持翻译和多种语言。",
        "zh-Hant": "為 YouTube Music 提供時間同步歌詞，支援翻譯和多種語言。",
      },
      users: 100000,
      rating: 4.9,
      stars: 860,
      statsCheckedAt: "2026-09-15",
    },
    {
      slug: "opal-connect",
      name: "Opal Connect",
      owner: "debpalash",
      repo: "https://github.com/debpalash/Opal/tree/main/extension",
      website: "https://opal.palash.dev",
      icon: "/images/used-by/opal-connect/icon.png",
      screenshot: "/images/used-by/opal-connect/screenshot.jpg",
      version: "0.4.0",
      browsers: ["Chrome", "Firefox", "Edge"],
      source: "manual",
      description: {
        en: "Sends media, articles and downloads from any site to the Opal desktop player, and remote-controls it from a side panel.",
        "zh-Hans":
          "把任意网站的媒体、文章和下载发送到 Opal 桌面播放器，并通过侧边栏远程控制它。",
        "zh-Hant":
          "把任意網站的媒體、文章和下載傳送到 Opal 桌面播放器，並透過側邊欄遠端控制它。",
      },
    },
    {
      slug: "apollo-dreamview",
      name: "Dreamview debug extension",
      owner: "ApolloAuto",
      repo: "https://github.com/ApolloAuto/apollo/tree/master/modules/dreamview_plus/frontend/packages/dreamview-debug-extension",
      icon: "/images/used-by/apollo-dreamview/icon.png",
      tile: "light",
      version: "1.0",
      browsers: ["Chrome"],
      source: "manual",
      description: {
        en: "The debug tool for Dreamview, the visualizer of Baidu's Apollo autonomous driving platform.",
        "zh-Hans":
          "Dreamview 的调试工具。Dreamview 是百度 Apollo 自动驾驶平台的可视化工具。",
        "zh-Hant":
          "Dreamview 的除錯工具。Dreamview 是百度 Apollo 自動駕駛平台的視覺化工具。",
      },
    },
    {
      slug: "dmminiplayer-element-picker",
      name: "dmMiniPlayer element picker",
      owner: "apades",
      repo: "https://github.com/apades/dmMiniPlayer/tree/main/packages/element-picker-ext",
      version: "1.0.0",
      browsers: ["Chrome"],
      source: "manual",
      description: {
        en: "A test harness for the element picker library of dmMiniPlayer, a picture-in-picture player.",
        "zh-Hans":
          "dmMiniPlayer 元素选择器库的测试扩展。dmMiniPlayer 是一款画中画播放器。",
        "zh-Hant":
          "dmMiniPlayer 元素選擇器函式庫的測試擴充功能。dmMiniPlayer 是一款子母畫面播放器。",
      },
    },
    {
      slug: "tidytabs",
      name: "TidyTabs",
      owner: "SpreadSheets600",
      repo: "https://github.com/SpreadSheets600/TidyTabs",
      icon: "/images/used-by/tidytabs/icon.png",
      screenshot: "/images/used-by/tidytabs/screenshot.jpg",
      version: "1.2.0",
      browsers: ["Chrome", "Firefox"],
      storeIds: {
        chrome: "cpmlaapifmhgklniidiijogjgnnhcbmn",
        firefox: "tidytabs-openrouter",
      },
      source: "manual",
      description: {
        en: "Groups open tabs by topic, domain and context with AI models on OpenRouter.",
        "zh-Hans":
          "借助 OpenRouter 上的 AI 模型，按主题、域名和上下文对打开的标签页分组。",
        "zh-Hant":
          "借助 OpenRouter 上的 AI 模型，依主題、網域和情境將開啟的分頁分組。",
      },
      users: 4,
      stars: 38,
      statsCheckedAt: "2026-09-15",
    },
    {
      slug: "bookmrk",
      name: "Bookmrk",
      owner: "sarvan-2187",
      repo: "https://github.com/sarvan-2187/Bookmrk",
      website: "https://bookmrk.dpdns.org",
      icon: "/images/used-by/bookmrk/icon.png",
      screenshot: "/images/used-by/bookmrk/screenshot.jpg",
      version: "1.6.0",
      browsers: ["Chrome", "Firefox", "Edge"],
      storeIds: {
        firefox: "bookmrk",
      },
      source: "manual",
      description: {
        en: "A local-first visual bookmark board that replaces the new tab page.",
        "zh-Hans": "本地优先的可视化书签看板，替换新标签页。",
        "zh-Hant": "本機優先的視覺化書籤看板，取代新分頁。",
      },
      users: 1,
      rating: 5,
      stars: 30,
      statsCheckedAt: "2026-09-15",
    },
    {
      slug: "send-to-pocketbook",
      name: "Send to PocketBook",
      owner: "joaomagfreitas",
      repo: "https://github.com/joaomagfreitas/send-to-pocket-book/tree/master/extension",
      icon: "/images/used-by/send-to-pocketbook/icon.png",
      screenshot: "/images/used-by/send-to-pocketbook/screenshot.jpg",
      version: "1.0",
      browsers: ["Chrome", "Firefox", "Edge"],
      storeIds: {
        chrome: "mockojkggpmpjlajehofiljbbbaoppdj",
        firefox: "send-to-pocketbook",
      },
      source: "manual",
      description: {
        en: "Sends the document in the active tab to a PocketBook e-reader through its email sync.",
        "zh-Hans":
          "通过邮件同步，把当前标签页中的文档发送到 PocketBook 电子阅读器。",
        "zh-Hant":
          "透過電子郵件同步，把目前分頁中的文件傳送到 PocketBook 電子閱讀器。",
      },
      users: 290,
      rating: 4,
      statsCheckedAt: "2026-09-15",
    },
    {
      slug: "better-trello",
      name: "Better Trello",
      owner: "migteam",
      repo: "https://github.com/migteam/better-trello-browser-extension",
      icon: "/images/used-by/better-trello/icon.png",
      screenshot: "/images/used-by/better-trello/screenshot.jpg",
      version: "1.9",
      browsers: ["Chrome", "Firefox"],
      storeIds: {
        chrome: "dnhdnenpngcecekbhklemaidbdpibiae",
        firefox: "better-trello",
      },
      source: "manual",
      description: {
        en: "Improves the Trello interface with larger cards and lists, card IDs and a Markdown editor.",
        "zh-Hans":
          "改进 Trello 界面：更大的卡片和列表、显示卡片 ID，并提供 Markdown 编辑器。",
        "zh-Hant":
          "改進 Trello 介面：更大的卡片和清單、顯示卡片 ID，並提供 Markdown 編輯器。",
      },
      users: 1100,
      rating: 4.5,
      stars: 17,
      statsCheckedAt: "2026-09-15",
    },
    {
      slug: "claimeai-chatgpt",
      name: "ClaimeAI for ChatGPT",
      owner: "BharathxD",
      repo: "https://github.com/BharathxD/ClaimeAI/tree/main/apps/extension",
      website: "https://www.claime.tech",
      icon: "/images/used-by/claimeai/icon.png",
      version: "0.0.1",
      browsers: ["Chrome"],
      source: "manual",
      description: {
        en: "The helper extension of ClaimeAI. It adds a button to ChatGPT that sends text to the fact-checking platform.",
        "zh-Hans":
          "ClaimeAI 的辅助扩展。它在 ChatGPT 中添加一个按钮，把文本发送到事实核查平台。",
        "zh-Hant":
          "ClaimeAI 的輔助擴充功能。它在 ChatGPT 中新增一個按鈕，把文字傳送到事實查核平台。",
      },
    },
    {
      slug: "save-to-adhx",
      name: "Save to ADHX",
      owner: "itsmemeworks",
      repo: "https://github.com/itsmemeworks/adhx/tree/main/extension",
      website: "https://adhx.com",
      icon: "/images/used-by/save-to-adhx/icon.png",
      version: "0.1.0",
      browsers: ["Chrome", "Firefox"],
      source: "manual",
      description: {
        en: "Saves posts from X, Instagram, TikTok and YouTube Shorts to the open-source ADHX bookmark app.",
        "zh-Hans":
          "把 X、Instagram、TikTok 和 YouTube Shorts 上的帖子保存到开源书签应用 ADHX。",
        "zh-Hant":
          "把 X、Instagram、TikTok 和 YouTube Shorts 上的貼文儲存到開源書籤應用程式 ADHX。",
      },
    },
  ];
  // @generated:end

  const labels = {
    en: {
      builtBy: "Built by",
      source: "Source",
      website: "Website",
      users: "users",
      stars: "stars",
      iconAlt: "icon",
    },
    "zh-Hans": {
      builtBy: "作者",
      source: "源码",
      website: "网站",
      users: "用户",
      stars: "星标",
      iconAlt: "图标",
    },
    "zh-Hant": {
      builtBy: "作者",
      source: "原始碼",
      website: "網站",
      users: "使用者",
      stars: "星號",
      iconAlt: "圖示",
    },
  };
  const t = labels[locale] || labels.en;
  const storeNames = { chrome: "Chrome", firefox: "Firefox", edge: "Edge" };
  const storeHref = (key, id) =>
    key === "chrome"
      ? `https://chromewebstore.google.com/detail/${id}`
      : key === "firefox"
        ? `https://addons.mozilla.org/firefox/addon/${id}/`
        : `https://microsoftedge.microsoft.com/addons/detail/${id}`;
  // Counts are stored floored to two significant digits, so "+" stays true.
  const formatCount = (value) => {
    if (!value) return null;
    const trim = (number) => String(Math.floor(number * 10) / 10);
    if (value >= 1e6) return `${trim(value / 1e6)}M+`;
    if (value >= 1e3) return `${trim(value / 1e3)}K+`;
    return value >= 100 ? `${value}+` : String(value);
  };
  const ordered = projects
    .map((project, index) => ({ project, index }))
    .sort(
      (a, b) =>
        (b.project.users || 0) - (a.project.users || 0) ||
        (b.project.stars || 0) - (a.project.stars || 0) ||
        a.index - b.index,
    )
    .map((entry) => entry.project);

  return (
    <div className="ext-usedby-grid">
      {ordered.map((project) => {
        const avatar = `https://github.com/${project.owner}.png?size=96`;
        const stores = ["chrome", "firefox", "edge"].filter(
          (key) => project.storeIds && project.storeIds[key],
        );
        const description =
          (project.description &&
            (project.description[locale] || project.description.en)) ||
          "";
        // Small installs read as a weakness on a showcase, so counts start at 100.
        const users = project.users >= 100 ? formatCount(project.users) : null;
        const stars = formatCount(project.stars);
        const meta = [
          project.browsers ? project.browsers.join(", ") : null,
          users ? `${users} ${t.users}` : null,
        ]
          .filter(Boolean)
          .join(" · ");
        return (
          <article
            key={project.slug}
            className={
              "ext-usedby-card" +
              (project.screenshot ? " ext-usedby-card-shot" : "")
            }
          >
            {project.screenshot ? (
              <div aria-hidden="true" className="ext-usedby-shot">
                <img
                  src={project.screenshot}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ) : null}
            <div className="ext-usedby-body">
              <div className="ext-usedby-head">
                <div
                  className={
                    "ext-usedby-tile" +
                    (project.tile === "light" ? " ext-usedby-tile-light" : "")
                  }
                >
                  {project.icon ? (
                    <img
                      src={project.icon}
                      alt={`${project.name} ${t.iconAlt}`}
                    />
                  ) : (
                    <img
                      className="ext-usedby-tile-avatar"
                      src={avatar}
                      alt=""
                    />
                  )}
                </div>
                <div className="ext-usedby-titles">
                  <h3 className="ext-usedby-name">{project.name}</h3>
                  {meta ? <p className="ext-usedby-meta">{meta}</p> : null}
                </div>
                {project.version ? (
                  <span className="ext-usedby-pill">
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
                    </svg>
                    v{project.version}
                  </span>
                ) : null}
              </div>

              <a
                className="ext-usedby-dev"
                href={project.repo}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="ext-usedby-avatar"
                  src={avatar}
                  alt=""
                  loading="lazy"
                />
                <span className="ext-usedby-dev-text">
                  <span className="ext-usedby-dev-label">
                    {t.builtBy} {project.owner}
                    {stars ? ` · ★ ${stars}` : ""}
                  </span>
                  <span className="ext-usedby-dev-url">
                    <span>{project.repo.replace(/^https:\/\//, "")}</span>
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M15 3h6v6" />
                      <path d="M10 14 21 3" />
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                  </span>
                </span>
              </a>

              <p className="ext-usedby-desc">{description}</p>

              <div className="ext-usedby-actions">
                {stores.length > 0 ? (
                  <div className="ext-usedby-stores">
                    {stores.map((key) => (
                      <a
                        key={key}
                        className="ext-usedby-btn ext-usedby-btn-primary"
                        href={storeHref(key, project.storeIds[key])}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {storeNames[key]}
                      </a>
                    ))}
                  </div>
                ) : null}
                <div className="ext-usedby-stores">
                  {project.website ? (
                    <a
                      className="ext-usedby-btn"
                      href={project.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t.website}
                    </a>
                  ) : null}
                  <a
                    className="ext-usedby-btn"
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.source}
                  </a>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};
