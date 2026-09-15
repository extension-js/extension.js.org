// Mintlify evaluates every export of a snippet in isolation, so this file
// has one export and everything it needs lives inside it.
//
// The `projects` array sits between the @generated markers. The weekly used-by
// workflow (scripts/used-by/refresh.mjs) refreshes `users` and statsCheckedAt in
// place, which order the grid and prove each project meets the store bar.
// Cards show no counts, so nothing on the page goes stale.
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
      statsCheckedAt: "2026-09-15",
    },
    {
      slug: "send-to-pocketbook",
      name: "Send to PocketBook",
      owner: "joaomagfreitas",
      repo: "https://github.com/joaomagfreitas/send-to-pocket-book/tree/master/extension",
      icon: "/images/used-by/send-to-pocketbook/icon.png",
      screenshot: "/images/used-by/send-to-pocketbook/screenshot.jpg",
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
      statsCheckedAt: "2026-09-15",
    },
    {
      slug: "better-trello",
      name: "Better Trello",
      owner: "migteam",
      repo: "https://github.com/migteam/better-trello-browser-extension",
      icon: "/images/used-by/better-trello/icon.png",
      screenshot: "/images/used-by/better-trello/screenshot.jpg",
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
      statsCheckedAt: "2026-09-15",
    },
    {
      slug: "star-citizen-box",
      name: "Star Citizen Box",
      owner: "StarCitizenToolBox",
      repo: "https://github.com/StarCitizenToolBox/StarCitizenBoxBrowserEx",
      icon: "/images/used-by/starcitizenbox/icon.png",
      screenshot: "/images/used-by/starcitizenbox/screenshot.jpg",
      browsers: ["Chrome", "Firefox", "Edge"],
      storeIds: {
        chrome: "gocnjckojmledijgmadmacoikibcggja",
        firefox: "星际公民盒子浏览器拓展",
        edge: "lipbbcckldklpdcpfagicipecaacikgi",
      },
      users: 4800,
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
      browsers: ["Chrome"],
      storeIds: {
        chrome: "cjabmkimbcmhhepelfhjhbhonnapiipj",
      },
      users: 4000,
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
      source: "Source",
      website: "Website",
      availableOn: "Available on",
      stores: {
        chrome: "Chrome Web Store",
        firefox: "Firefox Add-ons",
        edge: "Edge Add-ons",
      },
      iconAlt: "icon",
      slotTitle: "Your extension here",
      slotText: "Shipped it to a store? Take your spot with one pull request.",
    },
    "zh-Hans": {
      builtBy: "作者",
      source: "源码",
      website: "网站",
      availableOn: "上架于",
      stores: {
        chrome: "Chrome 应用商店",
        firefox: "Firefox 附加组件",
        edge: "Edge 加载项",
      },
      iconAlt: "图标",
      slotTitle: "你的扩展",
      slotText: "已经上架？一个 pull request 就能占据一席之地。",
    },
    "zh-Hant": {
      builtBy: "作者",
      source: "原始碼",
      website: "網站",
      availableOn: "上架於",
      stores: {
        chrome: "Chrome 線上應用程式商店",
        firefox: "Firefox 附加元件",
        edge: "Edge 附加元件",
      },
      iconAlt: "圖示",
      slotTitle: "你的擴充功能",
      slotText: "已經上架？一個 pull request 就能占有一席之地。",
    },
  };
  const t = labels[locale] || labels.en;
  const storeHref = (key, id) =>
    key === "chrome"
      ? `https://chromewebstore.google.com/detail/${id}`
      : key === "firefox"
        ? `https://addons.mozilla.org/firefox/addon/${id}/`
        : `https://microsoftedge.microsoft.com/addons/detail/${id}`;
  // Cards show no counts, the way the Next.js and Expo showcases do, so nothing
  // on the page goes stale. Users still order the grid.
  const ordered = projects
    .map((project, index) => ({ project, index }))
    .sort(
      (a, b) =>
        (b.project.users || 0) - (a.project.users || 0) || a.index - b.index,
    )
    .map((entry) => entry.project);
  // Items carry their own leading bullet. The row sits one bullet to the left
  // inside a clipping wrapper, so a bullet that starts a wrapped line is hidden.
  const separated = (items) => (
    <span className="ext-usedby-sepline">
      <span className="ext-usedby-sepline-row">
        {items.map((item) => (
          <span key={item.key} className="ext-usedby-sepline-item">
            <a href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          </span>
        ))}
      </span>
    </span>
  );

  return (
    <div className="ext-usedby-grid">
      {ordered.map((project) => {
        const avatar = `https://github.com/${project.owner}.png?size=96`;
        const description =
          (project.description &&
            (project.description[locale] || project.description.en)) ||
          "";
        const meta = [
          { key: "source", label: t.source, href: project.repo },
          project.website
            ? { key: "website", label: t.website, href: project.website }
            : null,
        ].filter(Boolean);
        const stores = ["chrome", "firefox", "edge"]
          .filter((key) => project.storeIds && project.storeIds[key])
          .map((key) => ({
            key,
            label: t.stores[key],
            href: storeHref(key, project.storeIds[key]),
          }));
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
                  <p className="ext-usedby-meta">{separated(meta)}</p>
                </div>
              </div>

              <a
                className="ext-usedby-dev"
                href={`https://github.com/${project.owner}`}
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
                <span className="ext-usedby-dev-label">
                  {t.builtBy} {project.owner}
                </span>
              </a>

              <p className="ext-usedby-desc">{description}</p>

              {stores.length > 0 ? (
                <div className="ext-usedby-links">
                  <span className="ext-usedby-links-label">
                    {t.availableOn}
                  </span>
                  <ul className="ext-usedby-store-list">
                    {stores.map((store) => (
                      <li key={store.key}>
                        <a
                          className="ext-usedby-store"
                          href={store.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {store.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
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
