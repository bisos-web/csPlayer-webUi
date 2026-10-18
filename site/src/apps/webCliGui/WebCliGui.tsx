// webCliGui (cliGui/webCliGui) as an island: its root component and its own CSS, as its main.tsx
// renders them, but into this page instead of a page of its own. Unchanged webCliGui source.
import React from "react"
import App from "@components/App"
import "./webCliGui.css"

export default function WebCliGui() {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
