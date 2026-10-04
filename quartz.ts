import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { PageTypeDispatcher } from "./quartz/plugins/pageTypes"
import SiteNav from "./quartz/components/SiteNav"

const config = await loadQuartzConfig()

// Add the Home / Projects / Notes links to the top bar on every page type.
// Insert into the header the YAML config already built (site title first,
// then the links, then search and dark mode) rather than replacing it.
const siteNav = SiteNav()
const layout = await loadQuartzLayout()
for (const pageLayout of [layout.defaults, ...Object.values(layout.byPageType)]) {
  const header = pageLayout.header ?? []
  pageLayout.header = [...header.slice(0, 1), siteNav, ...header.slice(1)]
}

// The page renderer is created inside loadQuartzConfig() from its own copy of
// the layout, and an exported `layout` is not read. So swap that renderer for
// one built from the layout above.
config.plugins.emitters = config.plugins.emitters.map((emitter) =>
  emitter.name === "PageTypeDispatcher"
    ? PageTypeDispatcher({ defaults: layout.defaults, byPageType: layout.byPageType })
    : emitter,
)

export default config
export { layout }
