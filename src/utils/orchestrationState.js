/**
 * Orchestration State Manager (DEPRECATED - kept for backward compatibility)
 * 
 * This module is now a bridge to the Zustand store in orchestrationStore.js
 * All state is managed in Zustand, and this just reads from it.
 * 
 * This allows old pages to keep working without changes, while new pages use Zustand directly.
 */

/**
 * Get current state from Zustand store via window object
 */
export function getOrchestrationState() {
  // On server, return defaults
  if (typeof window === 'undefined') {
    return {
      selectedCSXU: null,
      selectedPackage: null,
    };
  }

  // Get store via the window object (exposed by orchestrationStore)
  if (window.__getOrchestrationStore) {
    try {
      const store = window.__getOrchestrationStore();
      if (store) {
        const state = store.getState();
        return {
          selectedCSXU: state.selectedCSXU,
          selectedPackage: state.selectedPackage,
        };
      }
    } catch (error) {
      console.error('Error getting orchestration state:', error);
    }
  }

  // Fallback if store not available yet
  return {
    selectedCSXU: null,
    selectedPackage: null,
  };
}

/**
 * Get specific value from store
 */
export function getStateValue(key) {
  const state = getOrchestrationState();
  return state[key];
}

/**
 * Update state in Zustand store
 */
export function updateOrchestrationState(updates) {
  if (typeof window === 'undefined') {
    console.log('orchestrationState: Skipping update on server');
    return;
  }

  // Get store via the window object (exposed by orchestrationStore)
  if (window.__getOrchestrationStore) {
    try {
      const store = window.__getOrchestrationStore();
      if (store) {
        const state = store.getState();
        if (updates.selectedCSXU !== undefined) {
          state.setSelectedCSXU(updates.selectedCSXU);
        }
        if (updates.selectedPackage !== undefined) {
          state.setSelectedPackage(updates.selectedPackage);
        }
        console.log('orchestrationState: Updated via Zustand:', updates);
      }
    } catch (error) {
      console.error('Error updating orchestration state:', error);
    }
  }
}

/**
 * Set CSXU
 */
export function setSelectedCSXU(csxuName) {
  updateOrchestrationState({ selectedCSXU: csxuName });
}

/**
 * Set Package
 */
export function setSelectedPackage(packageName) {
  updateOrchestrationState({ selectedPackage: packageName });
}


/**
 * Clear state (for testing)
 */
export function clearOrchestrationState() {
  if (typeof window === 'undefined') {
    console.log('orchestrationState: Skipping clear on server');
    return;
  }

  if (window.__getOrchestrationStore) {
    try {
      const store = window.__getOrchestrationStore();
      if (store) {
        store.setState({
          selectedCSXU: null,
          selectedPackage: null,
        });
        console.log('OrchestrationState cleared');
      }
    } catch (error) {
      console.error('Error clearing orchestration state:', error);
    }
  }
}

// For debugging
if (typeof window !== 'undefined') {
  window.__orchestrationState = {
    get: getOrchestrationState,
    set: updateOrchestrationState,
    setCSXU: setSelectedCSXU,
    setPackage: setSelectedPackage,
    clear: clearOrchestrationState,
  };
}
