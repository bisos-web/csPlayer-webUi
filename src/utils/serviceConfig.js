/**
 * Service Configuration
 *
 * Uses Invoker/Performer abstraction from RPC/Web Services perspective:
 *
 * CSPLAYER_PERF (Performer):
 *   - Single execution engine with broader scope
 *   - Executes commands for multiple invokers
 *   - Can be used by CSLINE_INV and other clients
 *   - Manages command execution, results, state
 *
 * CSLINE_INV (Invoker):
 *   - Command-line focused UI invoker
 *   - Builds and invokes commands
 *   - Submits to the Performer
 *   - One specific client of the Performer
 *
 * Gatsby requires GATSBY_ prefix for env variables to reach the browser.
 */

export const getServiceUrls = () => ({
  cslineInvoker: process.env.GATSBY_CSLINE_INV_URL || 'http://csLineInvoker.here',
  csplayerPerformer: process.env.GATSBY_CSPLAYER_PERF_URL || 'http://csPlayerPerf.here',
  airflow: process.env.GATSBY_AIRFLOW_URL || 'http://localhost:8080',
  grafana: process.env.GATSBY_GRAFANA_URL || 'http://localhost:3000',
})

export const getServiceUrl = (serviceName) => {
  const urls = getServiceUrls()
  if (!urls[serviceName]) {
    console.warn(`Unknown service: ${serviceName}`)
    return null
  }
  return urls[serviceName]
}

// Debug helper - expose to console
if (typeof window !== 'undefined') {
  window.__serviceUrls = getServiceUrls
}
