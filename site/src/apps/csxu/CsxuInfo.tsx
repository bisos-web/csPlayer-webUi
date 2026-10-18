// CSXU Info: the selected package's README.org, from its bisos-pip repository on GitHub.
import React from "react"
import "./csxu.css"
import { useCsPlayerContext } from "../../lib/useCsPlayerContext"
import { fetchGithubContent, githubUrl, parseOrg, repoOfPackage, type OrgSection } from "./fetchers"
import { Failed, Loading, NoSelection, useFetched } from "./Common"

const headingClass: Record<number, string> = {
  1: "text-2xl font-bold mt-6 mb-3", 2: "text-xl font-bold mt-5 mb-2", 3: "text-lg font-bold mt-4 mb-2",
}

export default function CsxuInfo() {
  const { selectedPackage } = useCsPlayerContext()
  const source = selectedPackage ? githubUrl(repoOfPackage(selectedPackage), "README.org") : undefined
  const { data, error, loading } = useFetched<OrgSection[]>(selectedPackage, async (pkg) =>
    parseOrg(await fetchGithubContent(githubUrl(repoOfPackage(pkg), "README.org"))))

  if (!selectedPackage) return <NoSelection what="package" />
  return (
    <div>
      <p className="text-gray-600 mb-4">The README of <strong>{selectedPackage}</strong>, from GitHub.</p>
      {loading && <Loading what={`the README of ${selectedPackage}`} />}
      {error && <Failed error={error} source={source} />}
      {data && (
        <div className="border border-gray-200 rounded-lg p-6">
          {data.filter((s) => !/Table of Contents/.test(s.title)).map((s, i) => (
            <section key={i}>
              <h2 className={headingClass[s.level] || "font-bold mt-3 mb-1"}>{s.title}</h2>
              {s.content.filter((l) => !/^\s*(#\+|\| ~|:)/.test(l)).slice(0, 40).map((l, j) => (
                <p key={j} className="text-sm leading-relaxed text-gray-700">{l}</p>
              ))}
            </section>
          ))}
          <p className="text-xs text-gray-500 mt-6 pt-4 border-t border-gray-200">
            Source: <a className="text-blue-600 underline" href={source}>{source}</a>, fetched by your browser.
          </p>
        </div>
      )}
    </div>
  )
}
