// The csPlayer context in a React island: re-renders when the user, package or module changes.
import { useSyncExternalStore } from "react"
import { getContext, subscribe, type CsPlayerContext } from "./csPlayerContext"

const serverSnapshot: CsPlayerContext = { user: null, selectedPackage: null, selectedCSXU: null }

export function useCsPlayerContext(): CsPlayerContext {
  return useSyncExternalStore(subscribe, getContext, () => serverSnapshot)
}
