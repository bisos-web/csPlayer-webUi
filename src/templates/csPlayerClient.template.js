/**
 * csPlayer Orchestration Client
 * 
 * This file should be integrated into the webCliGui (csPlayer) project.
 * It provides the iframe-side bridge for PostMessage communication.
 * 
 * INTEGRATION INSTRUCTIONS:
 * 1. Copy this file to your webCliGui project (e.g., src/orchestration/csPlayerClient.js)
 * 2. Import it in your main app file
 * 3. Call initializeOrchestration() on app startup
 * 4. Use the exported functions to send events to parent
 * 
 * Location: csPlayer-webUi/src/templates/csPlayerClient.template.js
 * Destination: webCliGui/src/orchestration/csPlayerClient.js
 */

/**
 * Send a message to the parent dashboard
 * 
 * @param {string} eventName - Event name (must match parent's orchestrationEvents.js)
 * @param {any} data - Event payload
 */
function sendToParent(eventName, data = {}) {
  const message = {
    type: 'ORCHESTRATION_MESSAGE',
    eventName,
    data,
    sender: 'csPlayer',
    timestamp: Date.now(),
  }

  try {
    window.parent.postMessage(message, '*')
    console.log(`[csPlayer] Sent event to parent: "${eventName}"`, data)
  } catch (error) {
    console.error(`[csPlayer] Failed to send message to parent:`, error)
  }
}

/**
 * Listen for messages from parent dashboard
 * 
 * @param {string} eventName - Event to listen for
 * @param {Function} callback - Called when event received: callback(data, metadata)
 * @returns {Function} Unlistener function
 */
function onMessageFromParent(eventName, callback) {
  const messageHandler = (event) => {
    // Ignore messages that aren't from our orchestration system
    if (event.data.type !== 'ORCHESTRATION_MESSAGE') {
      return
    }

    if (event.data.eventName !== eventName) {
      return
    }

    try {
      callback(event.data.data, {
        eventName: event.data.eventName,
        sender: event.data.sender,
        timestamp: event.data.timestamp,
      })
    } catch (error) {
      console.error(
        `[csPlayer] Error in listener for "${eventName}":`,
        error
      )
    }
  }

  window.addEventListener('message', messageHandler)

  // Return unlisten function
  return () => {
    window.removeEventListener('message', messageHandler)
  }
}

/**
 * Initialize orchestration on app startup
 * 
 * This sets up all event listeners and notifies parent that csPlayer is ready.
 * 
 * INTEGRATION: Call this in your app's main component useEffect or initialization code
 */
function initializeOrchestration() {
  console.log('[csPlayer] Initializing orchestration...')

  // Notify parent that we're ready
  sendToParent('system:iframeReady', {
    service: 'csPlayer',
    timestamp: Date.now(),
  })

  // Example: Listen for filter changes from parent
  const unsubscribeFilterChanged = onMessageFromParent(
    'csPlayer:filterChanged',
    (data, metadata) => {
      console.log('[csPlayer] Parent requested filter change:', data)
      // TODO: Implement your filter logic
      // updateFilters(data)
    }
  )

  // Example: Listen for refresh commands from parent
  const unsubscribeRefreshTasks = onMessageFromParent(
    'csPlayer:refreshTasks',
    (data, metadata) => {
      console.log('[csPlayer] Parent requested task refresh:', data)
      // TODO: Implement your refresh logic
      // refreshAllTasks()
    }
  )

  // Return cleanup function
  return () => {
    unsubscribeFilterChanged()
    unsubscribeRefreshTasks()
  }
}

/**
 * Export csPlayer orchestration events
 * (These should match parent's orchestrationEvents.js)
 */
export const CSPAYER_EVENTS = {
  // Commands from parent
  FILTER_CHANGED: 'csPlayer:filterChanged',
  REFRESH_TASKS: 'csPlayer:refreshTasks',
  EXECUTE_COMMAND: 'csPlayer:executeCommand',

  // Events to parent
  TASK_EXECUTED: 'csPlayer:taskExecuted',
  TASK_FAILED: 'csPlayer:taskFailed',
  STATUS_UPDATED: 'csPlayer:statusUpdated',
}

// Export functions
export { sendToParent, onMessageFromParent, initializeOrchestration }

// Example usage (comment out in actual implementation):
/*
// In your React component or app initialization:

React.useEffect(() => {
  const cleanup = initializeOrchestration()
  
  // Subscribe to specific events
  const unsubscribe = onMessageFromParent(CSPAYER_EVENTS.FILTER_CHANGED, (data) => {
    setCurrentFilter(data.filterValue)
  })
  
  return () => {
    cleanup()
    unsubscribe()
  }
}, [])

// When user executes a command:
const handleCommandExecute = (commandResult) => {
  sendToParent(CSPAYER_EVENTS.TASK_EXECUTED, {
    commandId: commandResult.id,
    output: commandResult.output,
    status: 'success',
  })
}

// When an error occurs:
const handleCommandError = (error) => {
  sendToParent(CSPAYER_EVENTS.TASK_FAILED, {
    errorMessage: error.message,
    errorCode: error.code,
  })
}
*/
