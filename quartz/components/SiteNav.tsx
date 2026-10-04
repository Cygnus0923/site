import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"

// The site's top-level sections. `match` decides which link is highlighted
// for the page being rendered.
const sections: { label: string; slug: FullSlug; match: (slug: string) => boolean }[] = [
  { label: "Home", slug: "index" as FullSlug, match: (s) => s === "index" },
  { label: "Projects", slug: "projects/index" as FullSlug, match: (s) => s.startsWith("projects/") },
  {
    label: "Notes",
    slug: "notes" as FullSlug,
    match: (s) => s === "notes" || s.startsWith("topics/") || s.startsWith("cheatsheets/"),
  },
]

const SiteNav: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const current = fileData.slug!
  return (
    <nav class="site-nav" aria-label="Main">
      {sections.map((section) => (
        <a
          href={resolveRelative(current, section.slug)}
          class={section.match(current) ? "internal active" : "internal"}
        >
          {section.label}
        </a>
      ))}
    </nav>
  )
}

SiteNav.css = `
.site-nav {
  display: flex;
  gap: 0.25rem;
  margin-left: auto;
}

.site-nav a {
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  color: var(--darkgray);
  font-weight: 600;
  text-decoration: none;
  background: none;
}

.site-nav a:hover,
.site-nav a.active {
  color: var(--secondary);
  background: color-mix(in srgb, var(--secondary) 12%, transparent);
}
`

export default (() => SiteNav) satisfies QuartzComponentConstructor
