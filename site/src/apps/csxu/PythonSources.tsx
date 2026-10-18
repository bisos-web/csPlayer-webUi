// Python Sources: the selected module's file (py3/bin/<module>) in its package's bisos-pip repository.
import React from "react"
import "./csxu.css"
import { useCsPlayerContext } from "../../lib/useCsPlayerContext"
import { fetchGithubContent, githubUrl, repoOfPackage } from "./fetchers"
import { Failed, Loading, NoSelection, useFetched } from "./Common"

export default function PythonSources() {
  const { selectedPackage, selectedCSXU } = useCsPlayerContext()
  const path = selectedCSXU ? `py3/bin/${selectedCSXU}` : ""
  const source = selectedPackage && selectedCSXU ? githubUrl(repoOfPackage(selectedPackage), path) : null
  const { data, error, loading } = useFetched<string>(source, fetchGithubContent)
  const [copied, setCopied] = React.useState(false)

  if (!selectedPackage || !selectedCSXU) return <NoSelection what="package and module" />
  return (
    <div>
      <p className="text-gray-600 mb-4"><strong>{path}</strong> of <strong>{selectedPackage}</strong>, from GitHub.</p>
      {loading && <Loading what={path} />}
      {error && <Failed error={error} source={source || undefined} />}
      {data && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between text-sm">
            <span className="text-gray-600">{selectedCSXU} --- {data.split("\n").length} lines</span>
            <button className="px-3 py-1 rounded bg-blue-600 text-white"
                    onClick={() => navigator.clipboard.writeText(data).then(() => setCopied(true))}>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="bg-gray-900 text-gray-100 p-4 text-xs leading-relaxed overflow-auto max-h-[32rem] m-0">
            <code>{data}</code>
          </pre>
          <p className="text-xs text-gray-500 px-4 py-2">Source: <a className="text-blue-600 underline" href={source || ""}>{source}</a></p>
        </div>
      )}
    </div>
  )
}
