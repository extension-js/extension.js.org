// Mintlify evaluates every export of a snippet in isolation, so this file
// has one export and everything it needs lives inside it.
//
// The `projects` array sits between the @generated markers. The weekly used-by
// workflow (scripts/used-by/refresh.mjs) refreshes users, rating, version,
// stars and statsCheckedAt in place and never changes the other fields.
// To add a project by hand, append one object, give it storeIds when it is
// published, and put its images under /images/used-by/<slug>/. Set
// darkGlyph: true for a dark icon on a transparent background, which the dark
// theme inverts so it stays visible.
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
      slug: "star-citizen-box",
      name: "Star Citizen Box",
      owner: "StarCitizenToolBox",
      repo: "https://github.com/StarCitizenToolBox/StarCitizenBoxBrowserEx",
      icon: "/images/used-by/starcitizenbox/icon.png",
      screenshot: "/images/used-by/starcitizenbox/screenshot.jpg",
      version: "0.1.2",
      browsers: ["Chrome", "Firefox", "Edge"],
      storeIds: {
        chrome: "gocnjckojmledijgmadmacoikibcggja",
        firefox: "星际公民盒子浏览器拓展",
        edge: "lipbbcckldklpdcpfagicipecaacikgi",
      },
      users: 4800,
      rating: 5,
      stars: 16,
      statsCheckedAt: "2026-09-15",
      source: "manual",
      description: {
        en: "Adds Chinese translations to Star Citizen community websites and tools.",
        "zh-Hans": "为星际公民网站及工具站提供汉化。",
        "zh-Hant": "為星際公民網站及工具站提供中文翻譯。",
      },
    },
    {
      slug: "simple-virtual-keyboard",
      name: "Simple Virtual Keyboard",
      owner: "alex9849",
      repo: "https://github.com/alex9849/chrome-simple-keyboard",
      icon: "/images/used-by/simple-virtual-keyboard/icon.png",
      version: "0.5.6",
      browsers: ["Chrome"],
      storeIds: {
        chrome: "cjabmkimbcmhhepelfhjhbhonnapiipj",
      },
      users: 4000,
      rating: 3.3,
      stars: 15,
      statsCheckedAt: "2026-09-15",
      source: "manual",
      description: {
        en: "Adds an on-screen virtual keyboard to the browser, for touch screens and kiosks.",
        "zh-Hans": "为浏览器添加屏幕虚拟键盘，适用于触摸屏和自助终端。",
        "zh-Hant": "為瀏覽器新增螢幕虛擬鍵盤，適用於觸控螢幕和自助服務機。",
      },
    },
  ];
  // @generated:end

  const labels = {
    en: {
      builtBy: "Built by",
      website: "Website",
      users: "users",
      iconAlt: "icon",
      slotTitle: "Your extension here",
      slotText: "Shipped it to a store? Take your spot with one pull request.",
    },
    "zh-Hans": {
      builtBy: "作者",
      website: "网站",
      users: "用户",
      iconAlt: "图标",
      slotTitle: "你的扩展",
      slotText: "已经上架？一个 pull request 就能占据一席之地。",
    },
    "zh-Hant": {
      builtBy: "作者",
      website: "網站",
      users: "使用者",
      iconAlt: "圖示",
      slotTitle: "你的擴充功能",
      slotText: "已經上架？一個 pull request 就能占有一席之地。",
    },
  };
  const t = labels[locale] || labels.en;
  const storeKeys = { Chrome: "chrome", Firefox: "firefox", Edge: "edge" };
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
        const description =
          (project.description &&
            (project.description[locale] || project.description.en)) ||
          "";
        // Small installs read as a weakness on a showcase, so counts start at 100.
        const users = project.users >= 100 ? formatCount(project.users) : null;
        const stars = formatCount(project.stars);
        const stats = [
          users ? `${users} ${t.users}` : null,
          stars ? `★ ${stars}` : null,
        ].filter(Boolean);
        // One line carries the browsers and the store listings: a browser with a
        // listing is a link, a browser without one is plain text.
        const links = (project.browsers || []).map((browser) => {
          const key = storeKeys[browser];
          const id = key && project.storeIds && project.storeIds[key];
          return id
            ? { label: browser, href: storeHref(key, id) }
            : { label: browser, href: null };
        });
        if (project.website) {
          links.push({ label: t.website, href: project.website });
        }
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
                {project.icon ? (
                  <img
                    className={
                      "ext-usedby-icon" +
                      (project.darkGlyph ? " ext-usedby-icon-invert" : "")
                    }
                    src={project.icon}
                    alt={`${project.name} ${t.iconAlt}`}
                  />
                ) : (
                  <img
                    className="ext-usedby-icon ext-usedby-icon-avatar"
                    src={avatar}
                    alt=""
                  />
                )}
                <div className="ext-usedby-titles">
                  <h3 className="ext-usedby-name">{project.name}</h3>
                  {stats.length > 0 ? (
                    <p className="ext-usedby-meta">{stats.join(" • ")}</p>
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
                {project.icon ? (
                  <img
                    className="ext-usedby-avatar"
                    src={avatar}
                    alt=""
                    loading="lazy"
                  />
                ) : null}
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

              {links.length > 0 ? (
                <p className="ext-usedby-links">
                  {links.map((link, index) => (
                    <span key={link.label}>
                      {index > 0 ? (
                        <span className="ext-usedby-sep" aria-hidden="true">
                          •
                        </span>
                      ) : null}
                      {link.href ? (
                        <a href={link.href} target="_blank" rel="noreferrer">
                          {link.label}
                        </a>
                      ) : (
                        <span className="ext-usedby-plain">{link.label}</span>
                      )}
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
          </article>
        );
      })}
      {ordered.length % 2 === 1 ? (
        <a className="ext-usedby-slot" href="#add-your-project">
          <span className="ext-usedby-slot-title">{t.slotTitle}</span>
          <span className="ext-usedby-slot-text">{t.slotText}</span>
        </a>
      ) : null}
    </div>
  );
};
