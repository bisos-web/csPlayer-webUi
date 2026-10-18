// csPlayer: static output, one directory per page, served by nginx from site/dist/. React islands
// (@astrojs/react); Tailwind v4 for the islands' own CSS. webCliGui (cliGui/webCliGui) is linked into
// node_modules/webcligui: its path aliases are declared here, and symlinks are preserved so its imports
// (react, react-bootstrap, zustand, ...) resolve from this site's node_modules --- one React.
import path from "node:path"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"

const webCliGuiSrc = path.resolve("node_modules/webcligui/src")

export default defineConfig({
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
  // Keep the whitespace between text and inline elements across line breaks (compression drops it).
  compressHTML: false,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      preserveSymlinks: true,
      dedupe: ["react", "react-dom"],
      alias: [
        // webpack's file-loader made an image import a URL string; Astro makes it an image object.
        // ?url gives webCliGui the string it expects, without changing webCliGui.
        { find: /^@icons\/(.*\.(svg|png|jpe?g|gif))$/, replacement: path.join(webCliGuiSrc, "icons") + "/$1?url" },
        { find: "@components", replacement: path.join(webCliGuiSrc, "components") },
        { find: "@store", replacement: path.join(webCliGuiSrc, "store") },
        { find: "@utils", replacement: path.join(webCliGuiSrc, "utils") },
        { find: "@icons", replacement: path.join(webCliGuiSrc, "icons") },
      ],
    },
  },
})
