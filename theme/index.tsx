import { NoSSR } from "rspress/runtime";
import Theme from "rspress/theme";
import { Announcement } from "./components/Announcement";
import { HomeLayout } from "./pages";

const Layout = () => (
  <Theme.Layout
    beforeNav={
      <NoSSR>
        <Announcement />
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
