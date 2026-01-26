/**
 * Orchestration Events
 * 
 * Central registry of all events that can be published through the message bus.
 * This defines the contract between parent (Gatsby dashboard) and child iframes.
 */

export const ORCHESTRATION_EVENTS = {
  // ============================================
  // csPlayer (webCliGui) Events
  // ============================================
  
  // Parent → csPlayer commands
  CSPAYER_FILTER_CHANGED: 'csPlayer:filterChanged',
  CSPAYER_REFRESH_TASKS: 'csPlayer:refreshTasks',
  CSPAYER_EXECUTE_COMMAND: 'csPlayer:executeCommand',
  
  // csPlayer → Parent events
  CSPAYER_TASK_EXECUTED: 'csPlayer:taskExecuted',
  CSPAYER_TASK_FAILED: 'csPlayer:taskFailed',
  CSPAYER_STATUS_UPDATED: 'csPlayer:statusUpdated',
  
  // ============================================
  // Airflow Events
  // ============================================
  
  // Parent → Airflow commands
  AIRFLOW_TRIGGER_DAG: 'airflow:triggerDag',
  AIRFLOW_PAUSE_DAG: 'airflow:pauseDag',
  
  // Airflow → Parent events
  AIRFLOW_DAG_TRIGGERED: 'airflow:dagTriggered',
  AIRFLOW_DAG_STATUS_CHANGED: 'airflow:dagStatusChanged',
  
  // ============================================
  // Grafana Events
  // ============================================
  
  // Parent → Grafana commands
  GRAFANA_UPDATE_DASHBOARD: 'grafana:updateDashboard',
  GRAFANA_UPDATE_TIME_RANGE: 'grafana:updateTimeRange',
  
  // Grafana → Parent events
  GRAFANA_PANEL_DATA_LOADED: 'grafana:panelDataLoaded',
  
  // ============================================
  // System Events
  // ============================================
  
  IFRAME_READY: 'system:iframeReady',
  IFRAME_ERROR: 'system:iframeError',
}

/**
 * Get human-readable service name from event
 */
export function getServiceFromEvent(eventName) {
  const [service] = eventName.split(':')
  return service
}

/**
 * Validate event is in registry
 */
export function isValidEvent(eventName) {
  return Object.values(ORCHESTRATION_EVENTS).includes(eventName)
}
