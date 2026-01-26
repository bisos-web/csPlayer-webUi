# PostMessage Orchestration Guide

## Overview

The csPlayer-webUi (Gatsby dashboard) uses PostMessage to orchestrate communication between:
- **Parent**: Gatsby dashboard (localhost:8000)
- **Child Iframes**: csPlayer (9002), Airflow (8080), Grafana (3000)

## Architecture Files

### 1. `src/utils/orchestrationEvents.js`
**Purpose**: Central registry of all possible events

**Key Exports**:
- `ORCHESTRATION_EVENTS` - Object containing all event names
- `getServiceFromEvent()` - Extract service name from event
- `isValidEvent()` - Validate if event is registered

**Example**:
```javascript
import { ORCHESTRATION_EVENTS } from './utils/orchestrationEvents'

const eventName = ORCHESTRATION_EVENTS.CSPAYER_FILTER_CHANGED
// → 'csPlayer:filterChanged'
```

### 2. `src/utils/messageBus.js`
**Purpose**: Pub/Sub system that routes messages

**Key Exports**:
- `messageBus.subscribe(eventName, callback)` - Listen for events
- `messageBus.publish(eventName, data, sender)` - Send events
- `messageBus.getSubscribers()` - Debug: list all subscribers
- `messageBus.getEventLog()` - Debug: view event history

**Example**:
```javascript
import { messageBus } from './utils/messageBus'
import { ORCHESTRATION_EVENTS } from './utils/orchestrationEvents'

// Subscribe to csPlayer task completion
messageBus.subscribe(
  ORCHESTRATION_EVENTS.CSPAYER_TASK_EXECUTED,
  (data, metadata) => {
    console.log('Task completed:', data)
    console.log('From:', metadata.sender)
    console.log('At:', metadata.timestamp)
  }
)

// Publish a command to csPlayer
messageBus.publish(
  ORCHESTRATION_EVENTS.CSPAYER_FILTER_CHANGED,
  { environment: 'production' },
  'dashboard'
)
```

### 3. `src/utils/iframeAdapter.js`
**Purpose**: Bridges PostMessage API with message bus

**Key Exports**:
- `registerIframe(serviceName, iframeElement)` - Register an iframe
- `sendToIframe(serviceName, eventName, data)` - Send message to iframe
- `getIframeStatus()` - Debug: check iframe connection status

**Example**:
```javascript
import { registerIframe, sendToIframe } from './utils/iframeAdapter'

// Register iframe on component mount
const iframeRef = useRef()
useEffect(() => {
  if (iframeRef.current) {
    registerIframe('csPlayer', iframeRef.current)
  }
}, [])

// Send message to iframe
sendToIframe(
  'csPlayer',
  ORCHESTRATION_EVENTS.CSPAYER_REFRESH_TASKS,
  { includeArchived: false }
)
```

## Communication Flow

### Parent → Child (Dashboard → iframe)

```
Dashboard Component
        ↓
messageBus.publish(eventName, data)
        ↓
iframeAdapter listens to message bus
        ↓
sendToIframe('csPlayer', eventName, data)
        ↓
iframe.contentWindow.postMessage() [PostMessage API]
        ↓
csPlayer iframe receives message
        ↓
csPlayer updates UI
```

### Child → Parent (iframe → Dashboard)

```
csPlayer iframe detects action
        ↓
window.parent.postMessage() [PostMessage API]
        ↓
iframeAdapter listens to window.message event
        ↓
messageBus.publish(eventName, data, 'csPlayer')
        ↓
Dashboard subscribers notified
        ↓
Dashboard component updates
```

## Debugging

### In Browser Console

```javascript
// View all registered subscribers
window.__messageBusDebug.subscribers()

// View event log
window.__messageBusDebug.log()

// Pretty-print event log
window.__messageBusDebug.print()

// Check iframe status
window.__iframeAdapter.status()

// View iframe registry
window.__iframeAdapter.registry()
```

### Common Issues

**Issue**: Iframe not receiving messages
- **Check**: `window.__iframeAdapter.status()` - is iframe `ready: true`?
- **Check**: `window.__messageBusDebug.log()` - are events being published?
- **Check**: Browser console for PostMessage errors

**Issue**: Messages sent but not received
- **Check**: Does iframe register with parent on load?
- **Check**: Is event name in `ORCHESTRATION_EVENTS`?
- **Check**: Check CORS/cross-origin issues

## Integration Checklist

### For csPlayer (webCliGui) developers:

- [ ] Copy `src/templates/csPlayerClient.template.js` to your project
- [ ] Import `initializeOrchestration()` in your main app component
- [ ] Call `initializeOrchestration()` on app startup
- [ ] Use `sendToParent()` to send events
- [ ] Use `onMessageFromParent()` to listen for commands
- [ ] Test with parent dashboard using debug console

### For Parent (Gatsby) developers:

- [ ] Register each iframe in its page component
- [ ] Subscribe to iframe events in `useEffect()`
- [ ] Publish commands when needed (e.g., filter change)
- [ ] Test using debug console

## Event Types (csPlayer)

### Parent → csPlayer Commands

| Event | Data | Purpose |
|-------|------|---------|
| `csPlayer:filterChanged` | `{ environment, server, user }` | User changed filters in dashboard |
| `csPlayer:refreshTasks` | `{ includeArchived: bool }` | Dashboard requested task list refresh |
| `csPlayer:executeCommand` | `{ command, serverId }` | Dashboard requested command execution |

### csPlayer → Parent Events

| Event | Data | Purpose |
|-------|------|---------|
| `csPlayer:taskExecuted` | `{ taskId, output, duration }` | Task completed successfully |
| `csPlayer:taskFailed` | `{ taskId, errorMessage }` | Task failed with error |
| `csPlayer:statusUpdated` | `{ status, currentTasks }` | Status changed (e.g., idle → executing) |

## Next Steps

1. **Test Parent-Side**: Launch Gatsby dev server and verify message bus works
2. **Integrate csPlayer**: Add orchestration code to webCliGui
3. **Test Full Flow**: Send message from parent → csPlayer receives it
4. **Add Airflow/Grafana**: Repeat for other services

## Files Modified

- ✅ `src/utils/orchestrationEvents.js` - Event registry
- ✅ `src/utils/messageBus.js` - Pub/sub system
- ✅ `src/utils/iframeAdapter.js` - PostMessage bridge
- ✅ `src/pages/csPlayer.js` - Register iframe + subscribe to events
- ✅ `src/templates/csPlayerClient.template.js` - Template for csPlayer integration

## Questions?

Refer to the inline code comments in each file for detailed explanations.
