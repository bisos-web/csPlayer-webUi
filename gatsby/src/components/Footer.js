import * as React from "react"

export default function Footer() {
  return (
    <footer className="bg-bystar-navy text-white px-4 md:px-8 py-4 border-t-4 border-bystar-light-mint mt-auto text-center text-sm">
      <div className="max-w-7xl mx-auto">
        <p className="m-0 opacity-90">
          <a href="http://www.by-star.net" target="_blank" rel="noopener noreferrer" className="text-bystar-light-mint hover:text-white no-underline font-semibold">
            Libre-Halaal
          </a>
          <span className="opacity-75"> & Open-Source. Subject to </span>
          <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noopener noreferrer" className="text-bystar-light-mint hover:text-white no-underline font-semibold">
            Affero License
          </a>
          <span className="opacity-75">. Reproducible by All.</span>
        </p>
      </div>
    </footer>
  )
}
