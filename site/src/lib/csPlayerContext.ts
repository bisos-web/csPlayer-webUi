// csPlayer's shared context: the current user, the selected package and the selected module (CSXU).
//
// One small store for the whole site, replacing the Gatsby site's message bus, iframe adapter and
// orchestration store. It is read by the header (every page) and by the islands (React, through
// useCsPlayerContext), and written by:
//   - webCliGui, unchanged: it posts {type: "csPlayer:packageChanged" | "csPlayer:filterChanged", data}
//     to window.parent, which for an island is this very window; installBridge() listens for them
//     (and for "csPlayer:userChanged", for when webCliGui reports its user);
//   - the URL: ?package=bisos.facter&csxu=facter.cs (deep links; testing without a backend).
// It persists in localStorage under the Gatsby site's key, so it carries across pages and tabs.

export interface CsPlayerContext {
  user: string | null
  selectedPackage: string | null
  selectedCSXU: string | null
}

const STORAGE_KEY = "bisos-orchestration-storage"
const CHANGED = "csPlayer:contextChanged"
const EMPTY: CsPlayerContext = { user: null, selectedPackage: null, selectedCSXU: null }

let cachedJson = ""
let cached: CsPlayerContext = EMPTY

// The current context; the same object until it changes (as React's useSyncExternalStore needs).
export function getContext(): CsPlayerContext {
  if (typeof window === "undefined") return EMPTY
  let json = ""
  try {
    json = localStorage.getItem(STORAGE_KEY) || ""
  } catch {
    json = ""
  }
  if (json !== cachedJson) {
    cachedJson = json
    try {
      cached = { ...EMPTY, ...(json ? JSON.parse(json) : {}) }
    } catch {
      cached = EMPTY
    }
  }
  return cached
}

export function setContext(update: Partial<CsPlayerContext>): void {
  const next = { ...getContext(), ...update }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // storage unavailable (private mode): the page still updates, the value is not kept
    cachedJson = JSON.stringify(next)
    cached = next
  }
  window.dispatchEvent(new CustomEvent(CHANGED))
}

export function subscribe(listener: () => void): () => void {
  const onStorage = (e: StorageEvent) => e.key === STORAGE_KEY && listener()
  window.addEventListener(CHANGED, listener)
  window.addEventListener("storage", onStorage) // other browser tabs
  return () => {
    window.removeEventListener(CHANGED, listener)
    window.removeEventListener("storage", onStorage)
  }
}

// webCliGui's messages, and the URL parameters, into the context. Once per page.
export function installBridge(): void {
  const w = window as unknown as { __csPlayerBridge?: boolean }
  if (w.__csPlayerBridge) return
  w.__csPlayerBridge = true

  window.addEventListener("message", (e: MessageEvent) => {
    if (e.origin !== window.location.origin) return
    const { type, data } = (e.data || {}) as { type?: string; data?: Record<string, string> }
    if (type === "csPlayer:packageChanged") setContext({ selectedPackage: data?.packageName || null })
    else if (type === "csPlayer:filterChanged") setContext({ selectedCSXU: data?.csxuName || null })
    else if (type === "csPlayer:userChanged") setContext({ user: data?.user || null })
  })

  const params = new URLSearchParams(window.location.search)
  const fromUrl: Partial<CsPlayerContext> = {}
  if (params.has("package")) fromUrl.selectedPackage = params.get("package") || null
  if (params.has("csxu")) fromUrl.selectedCSXU = params.get("csxu") || null
  if (params.has("user")) fromUrl.user = params.get("user") || null
  if (Object.keys(fromUrl).length) setContext(fromUrl)
}
