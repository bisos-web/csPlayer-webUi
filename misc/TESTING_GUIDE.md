# PostMessage Orchestration - Testing Guide

## Phase 1: Parent-Side Testing (Dashboard Only)

**Objective**: Verify message bus and iframe adapter work without external services

### Step 1: Launch Gatsby Dashboard

```bash
cd /bisos/git/auth/bxRepos/bisos-web/csPlayer-webUi
npm run develop
```

Open browser to `http://localhost:8000/csPlayer`

### Step 2: Check Iframe Registration

In browser console:

```javascript
// Should show csPlayer iframe status
window.__iframeAdapter.status()

// Output should look like:
// [
//   {
//     service: "csPlayer",
//     ready: false,        // ← Will be false until csPlayer integrates
//     messagesSent: 0,
//     errors: 0
//   }
// ]
```

### Step 3: Check Message Bus

In browser console:

```javascript
// See all current subscribers
window.__messageBusDebug.subscribers()

// Should show csPlayer subscriptions:
// {
//   'csPlayer:taskExecuted': [{ callback: ƒ, service: 'csPlayer' }],
//   'csPlayer:taskFailed': [{ callback: ƒ, service: 'csPlayer' }]
// }

// View event log
window.__messageBusDebug.log()
// Should be empty initially: []

// Pretty-print the log
window.__messageBusDebug.print()
```

### Step 4: Test Message Publishing (Without Iframe)

```javascript
import { messageBus } from './utils/messageBus'
import { ORCHESTRATION_EVENTS } from './utils/orchestrationEvents'

// Publish a test event
messageBus.publish(
  ORCHESTRATION_EVENTS.CSPAYER_TASK_EXECUTED,
  { taskId: 'test-123', output: 'Task completed' },
  'test-source'
)

// Check the log
window.__messageBusDebug.log()
// Should show the publish event

// Pretty print it
window.__messageBusDebug.print()
```

## Phase 2: Iframe Ready Simulation

**Objective**: Simulate csPlayer iframe becoming ready

### Step 1: Add Test Function

In browser console:

```javascript
// Simulate csPlayer iframe sending "ready" message
// (This is what will happen once csPlayer integrates)

const testEvent = {
  type: 'ORCHESTRATION_MESSAGE',
  eventName: 'system:iframeReady',
  data: { service: 'csPlayer' },
  sender: 'csPlayer',
  timestamp: Date.now()
}

// Get the csPlayer iframe from page
const csPlayerIframe = document.querySelector('iframe[src*="localhost:9002"]') || 
                       document.querySelector('iframe[src*="9002"]')

if (csPlayerIframe) {
  console.log('Found csPlayer iframe, simulating ready...')
  // Manually trigger the message handler
  window.postMessage(testEvent, '*')
} else {
  console.warn('csPlayer iframe not found in DOM')
}
```

## Phase 3: Full Integration Testing (When csPlayer is Ready)

### Prerequisites
- csPlayer integrated with `initializeOrchestration()`
- csPlayer running on localhost:9002

### Test 1: Check Iframe Status Changes

1. Load `/csPlayer` page
2. Wait 2-3 seconds for iframe to load
3. In console:
   ```javascript
   window.__iframeAdapter.status()
   // Should show: ready: true (instead of false)
   ```

### Test 2: Send Command from Parent to csPlayer

```javascript
import { sendToIframe } from './utils/iframeAdapter'
import { ORCHESTRATION_EVENTS } from './utils/orchestrationEvents'

// Send filter change command to csPlayer
sendToIframe(
  'csPlayer',
  ORCHESTRATION_EVENTS.CSPAYER_FILTER_CHANGED,
  { environment: 'production', server: 'web-1' }
)

// Check iframe's browser console (F12 in iframe view)
// Should see: "[csPlayer] Received event from parent..."
```

### Test 3: Send Event from csPlayer to Parent

```javascript
// In csPlayer iframe console (F12 → select iframe):
window.parent.postMessage({
  type: 'ORCHESTRATION_MESSAGE',
  eventName: 'csPlayer:taskExecuted',
  data: { taskId: '12345', output: 'Command output here', status: 'success' },
  sender: 'csPlayer',
  timestamp: Date.now()
}, '*')

// Back in parent console:
window.__messageBusDebug.log()
// Should show the taskExecuted event
```

## Phase 4: End-to-End Flow Test

**Complete flow**: Dashboard filter → csPlayer receives → csPlayer responds

### Setup
1. Both parent and csPlayer running
2. Both browser DevTools open (parent and iframe)

### Steps

1. **Parent Console**: Check initial status
   ```javascript
   window.__iframeAdapter.status()
   // ready: true ✓
   ```

2. **Parent Console**: Send filter command
   ```javascript
   window.__iframeAdapter.send(
     'csPlayer',
     'csPlayer:filterChanged',
     { env: 'staging' }
   )
   ```

3. **csPlayer Console**: Verify received
   - Check for log message: "[csPlayer] Received event from parent"
   - Data should show: `{ env: 'staging' }`

4. **csPlayer Console**: Simulate task completion
   ```javascript
   window.parent.postMessage({
     type: 'ORCHESTRATION_MESSAGE',
     eventName: 'csPlayer:taskExecuted',
     data: { taskId: 'task-456', status: 'success' },
     sender: 'csPlayer',
     timestamp: Date.now()
   }, '*')
   ```

5. **Parent Console**: Verify received
   ```javascript
   window.__messageBusDebug.log()
   // Should show taskExecuted event at end
   ```

## Debugging Commands Reference

### Message Bus
```javascript
// View subscribers
window.__messageBusDebug.subscribers()

// View event log
window.__messageBusDebug.log()

// Pretty print log as table
window.__messageBusDebug.print()

// Clear log (useful for focusing on new events)
window.__messageBus.clearEventLog()
```

### Iframe Adapter
```javascript
// Check iframe status
window.__iframeAdapter.status()

// View all registered iframes
window.__iframeAdapter.registry()

// Send message to iframe
window.__iframeAdapter.send('csPlayer', 'eventName', { data: 'value' })

// Register new iframe manually (if needed)
// window.__iframeAdapter.register('serviceName', iframeElement)
```

## Common Issues & Solutions

### Issue: Iframe shows `ready: false`

**Possible Causes**:
1. csPlayer not yet integrated
2. csPlayer not running
3. Iframe failed to load (CORS error, connection refused)

**Solutions**:
1. Check csPlayer is running: `http://localhost:9002`
2. Check browser console for CORS/loading errors
3. Check csPlayer integration: Does it call `initializeOrchestration()`?

### Issue: Messages show in log but not received

**Possible Causes**:
1. Event name doesn't match `ORCHESTRATION_EVENTS`
2. Subscriber not set up on receiver side
3. PostMessage blocked by browser policy

**Solutions**:
1. Double-check event name spelling
2. Verify receiver has message listener set up
3. Check browser console for security errors

### Issue: Cannot access iframe from parent

**Possible Causes**:
1. CORS policy blocking access
2. Iframe still loading
3. Wrong iframe selector

**Solutions**:
1. Use `iframe.contentWindow.postMessage()` which works cross-origin
2. Wait for iframe load: `iframe.onload` or `useEffect`
3. Check iframe DOM selector: `document.querySelector('iframe')`

## Performance Testing

### Measure Message Latency

```javascript
// In parent:
const start = Date.now()
window.__iframeAdapter.send('csPlayer', 'csPlayer:refreshTasks', {})

// In csPlayer console (when message received):
// Check parent's event log for timestamp
window.__messageBusDebug.log()
// Calculate: log[n].timestamp - start = latency (should be <5ms)
```

### Monitor Event Frequency

```javascript
// Setup
window.__messageBus.clearEventLog()

// Run test (e.g., simulate 100 filter changes)
for (let i = 0; i < 100; i++) {
  setTimeout(() => {
    window.__iframeAdapter.send('csPlayer', 'csPlayer:filterChanged', { index: i })
  }, i * 10) // 10ms between sends
}

// After test completes (wait ~1 second):
const log = window.__messageBusDebug.log()
console.log(`Received ${log.length} events in X ms`)
```

## Next Steps

1. ✅ **Verify parent setup works** (Phase 1)
2. ⏳ **Integrate csPlayer** (with csPlayerClient.js)
3. ⏳ **Test full flow** (Phase 4)
4. ⏳ **Add Airflow integration**
5. ⏳ **Add Grafana integration**

## Support

If something isn't working:
1. Check browser console for errors
2. Run debug commands above
3. Check `ORCHESTRATION.md` for API reference
4. Review `csPlayerClient.template.js` for implementation example
