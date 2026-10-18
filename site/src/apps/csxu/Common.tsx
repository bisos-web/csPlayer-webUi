// Shared pieces of the CSXU information islands.
import React from "react"

export function NoSelection({ what }: { what: string }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h2 className="text-xl font-bold text-blue-900 mb-2">No {what} selected</h2>
      <p className="text-blue-800">
        Select an operation on the <a className="underline" href="/csPlayer/">csPlayer CSXU</a> tab: its package
        and module are shown in the header and here. Or name them in the address, e.g.{" "}
        <code className="bg-blue-100 px-1 rounded">?package=bisos.facter&amp;csxu=facter.cs</code>.
      </p>
    </div>
  )
}

export function Loading({ what }: { what: string }) {
  return (
    <div className="flex items-center gap-3 py-8 text-gray-600">
      <span className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
      Loading {what}...
    </div>
  )
}

export function Failed({ error, source }: { error: string; source?: string }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <h2 className="text-lg font-bold text-red-800 mb-2">Could not load it</h2>
      <p className="text-red-700">{error}</p>
      {source && <p className="text-sm text-red-600 mt-3">Source: <a className="underline" href={source}>{source}</a></p>}
    </div>
  )
}

// A fetch that follows its key (package, module): idle without one, loading, done, or failed.
export function useFetched<T>(key: string | null, load: (key: string) => Promise<T>) {
  const [state, setState] = React.useState<{ data?: T; error?: string; loading: boolean }>({ loading: false })
  React.useEffect(() => {
    if (!key) { setState({ loading: false }); return }
    let live = true
    setState({ loading: true })
    load(key).then((data) => live && setState({ data, loading: false }))
      .catch((e) => live && setState({ error: String(e.message || e), loading: false }))
    return () => { live = false }
  }, [key])
  return state
}
