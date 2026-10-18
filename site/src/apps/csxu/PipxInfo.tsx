// pipx Info: the selected package on PyPI (pipx installs it from there).
import React from "react"
import "./csxu.css"
import { useCsPlayerContext } from "../../lib/useCsPlayerContext"
import { fetchPyPIInfo, type PyPIInfo } from "./fetchers"
import { Failed, Loading, NoSelection, useFetched } from "./Common"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-semibold text-gray-500 uppercase">{label}</div>
      <div className="text-gray-900">{children}</div>
    </div>
  )
}

export default function PipxInfo() {
  const { selectedPackage } = useCsPlayerContext()
  const { data, error, loading } = useFetched<PyPIInfo>(selectedPackage, fetchPyPIInfo)
  const pypiUrl = selectedPackage ? `https://pypi.org/project/${selectedPackage}/` : undefined

  if (!selectedPackage) return <NoSelection what="package" />
  return (
    <div>
      {loading && <Loading what={`${selectedPackage} from PyPI`} />}
      {error && <Failed error={error} source={pypiUrl} />}
      {data && (
        <div className="border border-gray-200 rounded-lg p-6 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">{data.name}</h2>
              <p className="text-gray-600">{data.summary}</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-center">
              <div className="text-xs text-gray-600">Latest</div>
              <div className="text-xl font-bold text-blue-700">{data.version}</div>
            </div>
          </div>
          <pre className="bg-gray-900 text-gray-100 rounded p-3 text-sm m-0">pipx install {data.name}</pre>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.author && <Field label="Author">{data.author}</Field>}
            {data.license && <Field label="License">{data.license}</Field>}
            {data.requires_python && <Field label="Python">{data.requires_python}</Field>}
            {data.home_page && <Field label="Home"><a className="text-blue-600 underline" href={data.home_page}>{data.home_page}</a></Field>}
          </div>
          {data.versions.length > 0 && (
            <Field label="Recent versions">
              {data.versions.slice(0, 12).map((v) => (
                <span key={v} className="inline-block bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs mr-2 mb-1">{v}</span>
              ))}
            </Field>
          )}
          <p className="text-xs text-gray-500 pt-4 border-t border-gray-200">
            From <a className="text-blue-600 underline" href={pypiUrl}>{pypiUrl}</a>, fetched by your browser.
          </p>
        </div>
      )}
    </div>
  )
}
