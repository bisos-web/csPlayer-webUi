import * as React from 'react'
import { create } from 'zustand'

console.log('📦 orchestrationStore.js: Module loading...')

/**
 * Create or get the Zustand store (CLIENT ONLY)
 * 
 * CRITICAL: Store instance is cached on window object to persist across
 * page navigations and module reloads in development mode.
 */
function getOrCreateStore() {
  // If we're on the server, never try to create the actual store
  if (typeof window === 'undefined') {
    console.log('📦 orchestrationStore.js: On server, returning null store')
    return null
  }

  // Check if store already exists on window (persists across reloads)
  if (window.__orchestrationStoreInstance) {
    console.log('📦 orchestrationStore.js: Using existing store from window')
    return window.__orchestrationStoreInstance
  }

  // Create store for the first time
  console.log('📦 orchestrationStore.js: Creating store on client...')
  
  // Try to load initial state from localStorage
  let initialState = {
    selectedCSXU: null,
    selectedPackage: null,
  }
  
  try {
    const stored = localStorage.getItem('bisos-orchestration-storage')
    if (stored) {
      const parsed = JSON.parse(stored)
      console.log('📦 orchestrationStore.js: Loaded initial state from localStorage', parsed)
      initialState = {
        selectedCSXU: parsed.selectedCSXU || null,
        selectedPackage: parsed.selectedPackage || null,
      }
    }
  } catch (error) {
    console.error('❌ orchestrationStore.js: Error loading from localStorage:', error)
  }
  
  const storeInstance = create((set) => {
    console.log('📦 orchestrationStore.js: Store initialized with create()')
    return {
      selectedCSXU: initialState.selectedCSXU,
      selectedPackage: initialState.selectedPackage,

      setSelectedCSXU: (csxuName) => {
        console.log(`🎯 OrchestrationStore: Setting CSXU to "${csxuName}"`)
        set({ selectedCSXU: csxuName })
      },

      setSelectedPackage: (packageName) => {
        console.log(`🎯 OrchestrationStore: Setting Package to "${packageName}"`)
        set({ selectedPackage: packageName })
      },

      updateOrchestration: (updates) => {
        console.log(`🎯 OrchestrationStore: Updating orchestration`)
        set(updates)
      },

      clear: () => {
        console.log(`🎯 OrchestrationStore: Clearing all state`)
        set({ selectedCSXU: null, selectedPackage: null })
      },
    }
  })
  
  console.log('📦 orchestrationStore.js: Store created successfully')
  
  // Cache on window to persist across reloads
  window.__orchestrationStoreInstance = storeInstance
  console.log('📦 orchestrationStore.js: Cached store on window.__orchestrationStoreInstance')
  
  return storeInstance
}
/**
 * Hook that manages persistence to/from localStorage
 * 
 * CRITICAL: Must always call useEffect (can't have early returns before hooks)
 * Logic for SSR/Client handling is INSIDE the effects, not before them
 */
export function useOrchestrationPersistence() {
  console.log('🔌 useOrchestrationPersistence: Hook called')
  
  // First effect: Load from localStorage
  React.useEffect(() => {
    // NOW check for server - inside the effect, not before
    if (typeof window === 'undefined') {
      console.log('🔌 useOrchestrationPersistence: Skipping load effect on server')
      return
    }

    console.log('🔌 useOrchestrationPersistence: Load effect running on client')

    const store = getOrCreateStore()
    if (!store) {
      console.log('🔌 useOrchestrationPersistence: No store available')
      return
    }

    // Load from localStorage on mount
    try {
      const stored = localStorage.getItem('bisos-orchestration-storage')
      if (stored) {
        const data = JSON.parse(stored)
        console.log('💾 OrchestrationStore: Loaded from localStorage', data)
        store.setState({
          selectedCSXU: data.selectedCSXU,
          selectedPackage: data.selectedPackage,
        })
      } else {
        console.log('💾 OrchestrationStore: No data in localStorage')
      }
    } catch (error) {
      console.error('❌ Error loading from localStorage:', error)
    }
  }, [])

  // Second effect: Subscribe to store changes and persist
  React.useEffect(() => {
    console.log('🔌 useOrchestrationPersistence: Subscribe effect setup')
    
    // Check for server - inside the effect
    if (typeof window === 'undefined') {
      console.log('🔌 useOrchestrationPersistence: Skipping subscribe effect on server')
      return
    }

    console.log('🔌 useOrchestrationPersistence: Subscribe effect running on client')

    const store = getOrCreateStore()
    if (!store) {
      console.log('🔌 useOrchestrationPersistence: No store for subscribe')
      return
    }

    const unsubscribe = store.subscribe((state) => {
      console.log('💾 OrchestrationStore: State changed, persisting')
      try {
        const dataToStore = {
          selectedCSXU: state.selectedCSXU,
          selectedPackage: state.selectedPackage,
        }
        localStorage.setItem('bisos-orchestration-storage', JSON.stringify(dataToStore))
      } catch (error) {
        console.error('❌ Error persisting to localStorage:', error)
      }
    })

    return unsubscribe
  }, [])
}

/**
 * Main hook to get all store state and methods
 * 
 * CRITICAL: This hook must handle SSR/hydration properly.
 * The solution: Wrap the Zustand hook call in useEffect to ensure it only
 * runs on client and only after hydration.
 */
export function useOrchestration() {
  console.log('🎣 useOrchestration: Hook called')
  
  // State to hold the store values
  const [storeState, setStoreState] = React.useState({
    selectedCSXU: null,
    selectedPackage: null,
    setSelectedCSXU: () => {},
    setSelectedPackage: () => {},
    updateOrchestration: () => {},
    clear: () => {},
  })

  // On first render, set up the store subscription
  React.useEffect(() => {
    console.log('🎣 useOrchestration: Effect running')
    
    // Only on client
    if (typeof window === 'undefined') {
      console.log('🎣 useOrchestration: Skipping effect on server')
      return
    }

    // Get or create store
    const store = getOrCreateStore()
    if (!store) {
      console.log('🎣 useOrchestration: No store available')
      return
    }

    console.log('🎣 useOrchestration: Subscribing to store changes')

    // Subscribe to store changes
    const unsubscribe = store.subscribe(
      (state) => {
        console.log('🎣 useOrchestration: Store changed, updating local state', {
          selectedCSXU: state.selectedCSXU,
          selectedPackage: state.selectedPackage,
        })
        setStoreState({
          selectedCSXU: state.selectedCSXU,
          selectedPackage: state.selectedPackage,
          setSelectedCSXU: state.setSelectedCSXU,
          setSelectedPackage: state.setSelectedPackage,
          updateOrchestration: state.updateOrchestration,
          clear: state.clear,
        })
      }
    )

    // Set initial state from store
    const initialState = store.getState()
    console.log('🎣 useOrchestration: Initial state from store:', {
      selectedCSXU: initialState.selectedCSXU,
      selectedPackage: initialState.selectedPackage,
    })
    setStoreState({
      selectedCSXU: initialState.selectedCSXU,
      selectedPackage: initialState.selectedPackage,
      setSelectedCSXU: initialState.setSelectedCSXU,
      setSelectedPackage: initialState.setSelectedPackage,
      updateOrchestration: initialState.updateOrchestration,
      clear: initialState.clear,
    })

    return unsubscribe
  }, [])

  return storeState
}

/**
 * Export the store getter for non-React code (like iframeAdapter)
 */
export function getOrchestrationStore() {
  console.log('📦 getOrchestrationStore: Called')
  const store = getOrCreateStore()
  
  if (!store) {
    console.log('📦 getOrchestrationStore: No store available, returning mock')
    return {
      getState: () => ({
        selectedCSXU: null,
        selectedPackage: null,
        setSelectedCSXU: () => {},
        setSelectedPackage: () => {},
        updateOrchestration: () => {},
        clear: () => {},
      }),
      setState: () => {},
      subscribe: () => () => {},
    }
  }

  return store
}

// Expose for debugging
if (typeof window !== 'undefined') {
  window.__getOrchestrationStore = getOrchestrationStore
  console.log('📦 orchestrationStore.js: Exposed to window.__getOrchestrationStore')
}

console.log('📦 orchestrationStore.js: Module loaded successfully')
