# csPlayer-webUi Cleanup Summary

## Changes Made (Jan 24, 2026)

### Deleted Files
- ✅ `src/pages/page-2.js` - Demo page
- ✅ `src/pages/using-ssr.js` - Demo page
- ✅ `src/pages/using-typescript.tsx` - Demo page
- ✅ `src/pages/embedded-full-width.js` - Demo layout
- ✅ `src/pages/no-header-footer.js` - Demo layout
- ✅ `src/pages/no-sidebar.js` - Demo layout
- ✅ `src/pages/content-only.js` - Demo layout
- ✅ `src/pages/about.js` - ByStar content
- ✅ `src/pages/contact.js` - ByStar content
- ✅ `src/pages/explore.js` - Landing page

### Deleted Directories
- ✅ `src/pages/about/` - All ByStar documentation
- ✅ `src/pages/developers/` - All developer guides
- ✅ `src/pages/explore/layout-examples/` - Example layouts

### Deleted Components
- ✅ `src/components/EmbeddedContent.js`

### Modified Files
- ✅ `src/pages/index.js` - Rewritten as Command Services Dashboard homepage
  - Removed: ByStar branding, hero image, features list
  - Added: Services overview (WebCliGui, Airflow, Grafana, Custom)
  - Added: Simple resource links (Help, Search, Accessibility, Sitemap)

## Remaining Structure

### Pages
```
src/pages/
├── index.js                    (NEW: Dashboard homepage)
├── 404.js                      (Kept: Error page)
├── sitemap.js                  (Kept: Sitemap)
└── explore/
    ├── accessibility.js        (Kept: Accessibility info)
    ├── help.js                 (Kept: Help & FAQ)
    ├── search.js               (Kept: Search page)
    └── sitemap.js              (Kept: Sitemap in explore)
```

### Components (Unchanged)
```
src/components/
├── Header.js
├── Footer.js
├── Layout.js
├── Sidebar.js
├── HamburgerMenu.js
├── MobileOverlay.js
├── MenuItem.js
├── SiblingTabs.js
├── SearchBox.js
├── SitemapComponent.js
├── seo.js
└── index.module.css
```

## Result
✅ All ByStar template content removed
✅ All demo/example pages removed
✅ Core layout components preserved
✅ Ready for iframe dashboard integration
✅ Homepage repositioned as service registry

## Next Steps
1. Create `DashboardHost` component for iframe orchestration
2. Create `dashboard.js` page (or use explore/ structure)
3. Implement iframe message bus for service communication
4. Integrate webCliGui, Airflow, Grafana iframes
