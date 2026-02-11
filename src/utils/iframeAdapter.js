/**
 * Iframe Adapter - PostMessage Bridge
 * 
 * Manages PostMessage communication with iframes.
 * - Registers iframes
 * - Sends messages to iframes via PostMessage
 * - Receives messages from iframes and routes to message bus
 * 
 * Usage:
 *   const iframeElement = document.querySelector('iframe[src*="csLineInvoker.here"]')
 *   registerIframe('csPlayer', iframeElement)
 */

import { messageBus } from './messageBus'
import { ORCHESTRATION_EVENTS, getServiceFromEvent } from './orchestrationEvents'
import { getOrchestrationStore } from '../stores/orchestrationStore'

// Registry of all iframes
const iframeRegistry = {}

/**
 * Register an iframe with the orchestration system
 * 
 * @param {string} serviceName - Service name (e.g., 'csPlayer', 'airflow', 'grafana')
 * @param {HTMLIFrameElement} iframeElement - The actual iframe DOM element
 */
export function registerIframe(serviceName, iframeElement) {
  console.log(`🌉 iframeAdapter.registerIframe: Registering "${serviceName}"`)
  if (!iframeElement) {
    console.error(`🌉 iframeAdapter: Could not find iframe for ${serviceName}`)
    return
  }

  iframeRegistry[serviceName] = {
    element: iframeElement,
    ready: false,
    messageCount: 0,
    errorCount: 0,
  }

  console.log(`🌉 iframeAdapter: Registered iframe for service "${serviceName}"`)

  // Start listening for messages from this iframe
  setupMessageListener()
}

/**
 * Send a message to an iframe
 * 
 * @param {string} serviceName - Service to send to
 * @param {string} eventName - Event name (from orchestrationEvents.js)
 * @param {any} data - Event payload
 */
export function sendToIframe(serviceName, eventName, data = {}) {
  const iframe = iframeRegistry[serviceName]

  if (!iframe) {
    console.error(
      `IframeAdapter: Service "${serviceName}" not registered. Available: ${Object.keys(iframeRegistry).join(', ')}`
    )
    return
  }

  if (!iframe.element.contentWindow) {
    console.error(
      `IframeAdapter: Cannot access contentWindow for "${serviceName}". Is the iframe loaded?`
    )
    return
  }

  const message = {
    type: 'ORCHESTRATION_MESSAGE',
    eventName,
    data,
    sender: 'dashboard',
    timestamp: Date.now(),
  }

  try {
    iframe.element.contentWindow.postMessage(message, '*')
    iframe.messageCount++
    console.log(
      `IframeAdapter: Sent "${eventName}" to ${serviceName}`,
      data
    )
  } catch (error) {
    console.error(
      `IframeAdapter: Failed to send message to ${serviceName}:`,
      error
    )
    iframe.errorCount++
  }
}

/**
 * Setup listener for messages from all registered iframes
 * (This is called once per adapter initialization)
 */
let messageListenerSetup = false

function setupMessageListener() {
  console.log('🌉 iframeAdapter.setupMessageListener: Setting up...')
  if (messageListenerSetup) {
    console.log('🌉 iframeAdapter.setupMessageListener: Already setup, skipping')
    return
  }

  messageListenerSetup = true
  console.log('🌉 iframeAdapter.setupMessageListener: Adding message listener')

  window.addEventListener('message', (event) => {
    console.log('🌉 iframeAdapter: Received message', event.data)
    // Handle ORCHESTRATION_MESSAGE type (standard format)
    if (event.data.type === 'ORCHESTRATION_MESSAGE') {
      const { eventName, data, sender } = event.data

      // Find which service sent this
      const service = Object.entries(iframeRegistry).find(
        ([name, iframe]) => iframe.element.contentWindow === event.source
      )?.[0]

      if (!service) {
        console.warn(
          '🌉 iframeAdapter: Received message from unknown iframe:',
          event.data
        )
        return
      }

      // Mark iframe as ready on first message
      if (!iframeRegistry[service].ready) {
        iframeRegistry[service].ready = true
        console.log(`IframeAdapter: Service "${service}" is now ready`)
        messageBus.publish(ORCHESTRATION_EVENTS.IFRAME_READY, { service })
      }

      // Publish to message bus so parent can handle it
      console.log(
        `IframeAdapter: Received "${eventName}" from ${service}`,
        data
      )
      
      // Also persist state to Zustand store for navigation persistence
      if (eventName === ORCHESTRATION_EVENTS.CSPAYER_FILTER_CHANGED && data.csxuName) {
        getOrchestrationStore().getState().setSelectedCSXU(data.csxuName)
      } else if (eventName === 'CSPAYER_PACKAGE_CHANGED' && data.packageName) {
        getOrchestrationStore().getState().setSelectedPackage(data.packageName)
      }
      
      messageBus.publish(eventName, data, service)
      return
    }

    // Handle direct PostMessage format (for testing)
    // Expected: { type: 'csPlayer:filterChanged', data: { csxuName: '...' } }
    //        or { type: 'csPlayer:packageChanged', data: { packageName: '...' } }
    if (event.data.type === 'csPlayer:filterChanged' || event.data.type === 'csPlayer:packageChanged') {
      const { type, data } = event.data

      console.log(`IframeAdapter: Received direct message "${type}"`, data)

      // Convert to internal event format and persist state to Zustand
      if (type === 'csPlayer:filterChanged') {
        getOrchestrationStore().getState().setSelectedCSXU(data.csxuName)
        messageBus.publish(ORCHESTRATION_EVENTS.CSPAYER_FILTER_CHANGED, data, 'test-stub')
      } else if (type === 'csPlayer:packageChanged') {
        getOrchestrationStore().getState().setSelectedPackage(data.packageName)
        messageBus.publish('CSPAYER_PACKAGE_CHANGED', data, 'test-stub')
      }
      return
    }

    // Ignore other messages
  })
}

/**
 * Get status of all registered iframes (for debugging)
 */
export function getIframeStatus() {
  return Object.entries(iframeRegistry).map(([name, info]) => ({
    service: name,
    ready: info.ready,
    messagesSent: info.messageCount,
    errors: info.errorCount,
  }))
}

/**
 * Get registry of iframes (for debugging)
 */
export function getIframeRegistry() {
  return iframeRegistry
}

// For development: expose to window for debugging
if (typeof window !== 'undefined') {
  window.__iframeAdapter = {
    register: registerIframe,
    send: sendToIframe,
    status: getIframeStatus,
    registry: getIframeRegistry,
  }
}
