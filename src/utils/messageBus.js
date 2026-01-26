/**
 * Message Bus - Central Pub/Sub System
 * 
 * Manages all inter-iframe communication through a publish-subscribe pattern.
 * This is the orchestration nervous system.
 * 
 * Usage:
 *   messageBus.subscribe('eventName', (data) => { console.log(data) })
 *   messageBus.publish('eventName', { foo: 'bar' })
 */

import { isValidEvent, getServiceFromEvent } from './orchestrationEvents'

class MessageBus {
  constructor() {
    this.subscribers = {} // { eventName: [{ callback, service }] }
    this.eventLog = []    // For debugging: log all events
    this.maxLogSize = 100
  }

  /**
   * Subscribe to an event
   * 
   * @param {string} eventName - Event to subscribe to (from orchestrationEvents.js)
   * @param {Function} callback - Called when event is published: callback(data, metadata)
   * @param {string} service - Optional: service name (for logging)
   * @returns {Function} Unsubscribe function
   */
  subscribe(eventName, callback, service = 'unknown') {
    if (!isValidEvent(eventName)) {
      console.warn(`MessageBus: Unknown event "${eventName}". Check orchestrationEvents.js`)
    }

    if (!this.subscribers[eventName]) {
      this.subscribers[eventName] = []
    }

    const subscriber = { callback, service }
    this.subscribers[eventName].push(subscriber)

    // Log subscription
    this._log('subscribe', eventName, service)

    // Return unsubscribe function
    return () => {
      this.subscribers[eventName] = this.subscribers[eventName].filter(
        (sub) => sub.callback !== callback
      )
    }
  }

  /**
   * Publish an event - notify all subscribers
   * 
   * @param {string} eventName - Event to publish
   * @param {any} data - Event payload
   * @param {string} sender - Who is sending this (e.g., 'csPlayer', 'dashboard')
   */
  publish(eventName, data, sender = 'dashboard') {
    if (!isValidEvent(eventName)) {
      console.warn(`MessageBus: Unknown event "${eventName}". Check orchestrationEvents.js`)
    }

    const metadata = {
      eventName,
      sender,
      timestamp: Date.now(),
    }

    // Notify subscribers
    if (this.subscribers[eventName]) {
      this.subscribers[eventName].forEach(({ callback }) => {
        try {
          callback(data, metadata)
        } catch (error) {
          console.error(
            `MessageBus: Error in subscriber for "${eventName}":`,
            error
          )
        }
      })
    }

    // Log event
    this._log('publish', eventName, sender, data)
  }

  /**
   * Get list of all subscribers for debugging
   */
  getSubscribers(eventName = null) {
    if (eventName) {
      return this.subscribers[eventName] || []
    }
    return this.subscribers
  }

  /**
   * Get event log for debugging (last N events)
   */
  getEventLog() {
    return this.eventLog
  }

  /**
   * Clear event log
   */
  clearEventLog() {
    this.eventLog = []
  }

  /**
   * Internal: Log events for debugging
   */
  _log(type, eventName, service, data = null) {
    const entry = {
      type,
      eventName,
      service,
      timestamp: new Date().toISOString(),
      data: data ? JSON.stringify(data).substring(0, 100) : null,
    }

    this.eventLog.push(entry)

    // Keep log size bounded
    if (this.eventLog.length > this.maxLogSize) {
      this.eventLog.shift()
    }
  }

  /**
   * Debug: Print all events in console
   */
  printEventLog() {
    console.table(this.eventLog)
  }
}

// Singleton instance
export const messageBus = new MessageBus()

// For development: expose to window for debugging
if (typeof window !== 'undefined') {
  window.__messageBus = messageBus
  window.__messageBusDebug = {
    subscribers: () => messageBus.getSubscribers(),
    log: () => messageBus.getEventLog(),
    print: () => messageBus.printEventLog(),
  }
}
