/**
 * Orchestration State Manager
 * 
 * Maintains persistent state across page navigation.
 * This is a simple in-memory store that survives component unmounting.
 */

let orchestrationState = {
  selectedCSXU: null,
  selectedPackage: null,
};

/**
 * Get current state
 */
export function getOrchestrationState() {
  return { ...orchestrationState };
}

/**
 * Get specific value
 */
export function getStateValue(key) {
  return orchestrationState[key];
}

/**
 * Update state
 */
export function updateOrchestrationState(updates) {
  orchestrationState = {
    ...orchestrationState,
    ...updates,
  };
  console.log('OrchestrationState updated:', orchestrationState);
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
  orchestrationState = {
    selectedCSXU: null,
    selectedPackage: null,
  };
  console.log('OrchestrationState cleared');
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
