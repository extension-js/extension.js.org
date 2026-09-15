// Mintlify evaluates every export of a snippet in isolation, so this file
// has one export and everything it needs lives inside it.
// To add a project: append one object to `projects` and put its images under
// /images/used-by/<slug>/. Leave a field out to hide it on the card.
export const UsedByGrid = ({ locale = "en" }) => {
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
      stores: {
        chrome:
          "https://chromewebstore.google.com/detail/better-lyrics/effdbpeggelllpfkjppbokhmmiinhlmg",
        firefox:
          "https://addons.mozilla.org/en-US/firefox/addon/better-lyrics/",
        edge: "https://microsoftedge.microsoft.com/addons/detail/mjfeaklppoegooljmjicjdbiccgjdlhd",
      },
      description: {
        en: "Time-synced lyrics for YouTube Music, with translations and support for many languages.",
        "zh-Hans": "为 YouTube Music 提供时间同步歌词，支持翻译和多种语言。",
        "zh-Hant": "為 YouTube Music 提供時間同步歌詞，支援翻譯和多種語言。",
      },
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
      description: {
        en: "The element picker package inside dmMiniPlayer, a picture-in-picture player with subtitles and danmaku.",
        "zh-Hans":
          "dmMiniPlayer 中的元素选择器包。dmMiniPlayer 是一款支持字幕和弹幕的画中画播放器。",
        "zh-Hant":
          "dmMiniPlayer 中的元素選擇器套件。dmMiniPlayer 是一款支援字幕和彈幕的子母畫面播放器。",
      },
    },
  ];

  const labels = {
    en: {
      builtBy: "Built by",
      source: "Source",
      website: "Website",
      chrome: "Chrome",
      firefox: "Firefox",
      edge: "Edge",
      iconAlt: "icon",
    },
    "zh-Hans": {
      builtBy: "作者",
      source: "源码",
      website: "网站",
      chrome: "Chrome",
      firefox: "Firefox",
      edge: "Edge",
      iconAlt: "图标",
    },
    "zh-Hant": {
      builtBy: "作者",
      source: "原始碼",
      website: "網站",
      chrome: "Chrome",
      firefox: "Firefox",
      edge: "Edge",
      iconAlt: "圖示",
    },
  };
  const t = labels[locale] || labels.en;

  return (
    <div className="ext-usedby-grid">
      {projects.map((project) => {
        const avatar = `https://github.com/${project.owner}.png?size=96`;
        const stores = ["chrome", "firefox", "edge"].filter(
          (key) => project.stores && project.stores[key],
        );
        const description =
          (project.description &&
            (project.description[locale] || project.description.en)) ||
          "";
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
                  {project.browsers ? (
                    <p className="ext-usedby-meta">
                      {project.browsers.join(", ")}
                    </p>
                  ) : null}
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
                        href={project.stores[key]}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t[key]}
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
