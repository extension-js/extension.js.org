import { useEffect } from "react";
import { NoSSR } from "rspress/runtime";
import Theme from "rspress/theme";
import { Announcement } from "./components-home/announcement";
import { HomeLayout } from "./pages";

const DEFAULT_DOC_ICON = "https://avatars.githubusercontent.com/u/172809806";

const DocsAvatarFallback = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.location.pathname.startsWith("/docs")) return;

    const applyFallback = () => {
      const docsRoot =
        document.querySelector<HTMLElement>(".rspress-doc") ||
        document.querySelector<HTMLElement>("main");
      if (!docsRoot) return;

      if (docsRoot.querySelector('[data-doc-avatar="true"]')) return;

      const heading = docsRoot.querySelector("h1");
      if (!heading?.parentElement) return;

      const fallbackIcon = document.createElement("img");
      fallbackIcon.src = DEFAULT_DOC_ICON;
      fallbackIcon.alt = "The extension logo";
      fallbackIcon.width = 120;
      fallbackIcon.className = "logo";
      fallbackIcon.setAttribute("data-doc-avatar", "true");
      fallbackIcon.style.marginBottom = "2.4rem";

      heading.parentElement.insertBefore(fallbackIcon, heading);
    };

    const frame = window.requestAnimationFrame(applyFallback);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return null;
};

const Layout = () => (
  <Theme.Layout
    beforeNav={
      <NoSSR>
        <Announcement />
        <DocsAvatarFallback />
      </NoSSR>
    }
  />
);

const ExtensionTheme = {
  ...Theme,
  Layout,
  HomeLayout,
};

export * from "rspress/theme";

export default ExtensionTheme;
