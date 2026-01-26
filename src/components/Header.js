import * as React from "react"
import { Link } from "gatsby"

export default function Header() {
  return (
    <header className="bg-bystar-navy text-white px-4 md:px-8 py-6 border-b-4 border-bystar-light-mint">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4">
          <Link to="/" className="no-underline">
            <h1 className="text-2xl md:text-3xl m-0 font-bold text-white hover:opacity-90 transition-opacity">
              BISOS PyCS Web UI Player
            </h1>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-3 py-2 border border-bystar-light-mint border-opacity-30 w-fit">
              <span className="text-xs text-bystar-light-mint font-semibold uppercase tracking-wide">CSXU:</span>
              <span className="text-sm font-mono font-bold text-white">facter.cs</span>
            </div>

            <div className="flex items-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-3 py-2 border border-bystar-light-mint border-opacity-30 w-fit">
              <span className="text-xs text-bystar-light-mint font-semibold uppercase tracking-wide">PKG:</span>
              <span className="text-sm font-mono font-bold text-white">bisos.facter</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}