# CSXU Selection Implementation - Complete

## Summary

Implemented narrow-scope feature for CSXU selection communication between cliRun-FrontEnd (iframe) and webUi-csPlayer (parent).

**What works now:**
- FrontEnd sends CSXU name via PostMessage → Parent receives it → Header displays it

---

## Changes Made

### 1. **csPlayer.js** (src/pages/csPlayer.js)
- **Added:** `selectedCSXU` state using `React.useState(null)`
- **Added:** Subscriber to `ORCHESTRATION_EVENTS.CSPAYER_FILTER_CHANGED` event
- **Added:** Event cleanup for the new subscriber
- **Updated:** Pass `selectedCSXU` prop to Layout component

```javascript
// NEW: State management for selected CSXU
const [selectedCSXU, setSelectedCSXU] = React.useState(null)

// NEW: Event subscription for CSXU filter changes
const unsubscribeFilterChanged = messageBus.subscribe(
  ORCHESTRATION_EVENTS.CSPAYER_FILTER_CHANGED,
  (data) => {
    console.log('CSXU selected:', data.csxuName)
    setSelectedCSXU(data.csxuName)
  },
  'csPlayer'
)

// UPDATED: Pass prop to Layout
<Layout selectedCSXU={selectedCSXU}>
```

### 2. **Layout.js** (src/components/Layout.js)
- **Updated:** Accept `selectedCSXU` prop from parent (csPlayer.js)
- **Updated:** Pass `selectedCSXU` to Header component

```javascript
// UPDATED: Accept prop
export default function Layout({ 
  children, 
  showHeader = true, 
  showSidebar = true, 
  showFooter = true,
  selectedCSXU = null  // NEW
}) {

// UPDATED: Pass to Header
{showHeader && !sidebarOpen && <Header selectedCSXU={selectedCSXU} />}
```

### 3. **Header.js** (src/components/Header.js)
- **Updated:** Accept `selectedCSXU` prop
- **Updated:** Display dynamic CSXU value (or 'none' if not set)

```javascript
// UPDATED: Accept prop
export default function Header({ selectedCSXU = null }) {

// UPDATED: Dynamic display in header
<span className="text-sm font-mono font-bold text-white">{selectedCSXU || 'none'}</span>
```

---

## Data Flow

```
cliRun-FrontEnd (iframe)
    │
    │ window.parent.postMessage({
    │   type: 'csPlayer:filterChanged',
    │   data: { csxuName: 'mycsxu' }
    │ })
    │
    ↓
iframeAdapter.js (receives PostMessage)
    │
    │ Routes to messageBus
    │
    ↓
messageBus.publish(
  ORCHESTRATION_EVENTS.CSPAYER_FILTER_CHANGED,
  { csxuName: 'mycsxu' }
)
    │
    ↓
csPlayer.js (subscribed handler)
    │
    │ setSelectedCSXU('mycsxu')
    │
    ↓
Layout → Header (receives prop)
    │
    ↓
Header displays: "CSXU: mycsxu"
```

---

## Testing

### Test from Browser Console

When cliRun-FrontEnd is loaded in iframe (http://localhost:9002), it can send:

```javascript
// In browser console (while iframe is focused):
window.parent.postMessage({
  type: 'csPlayer:filterChanged',
  data: {
    csxuName: 'facter.cs'
  }
}, 'http://localhost:8000')
```

**Result:** Header should update to display "CSXU: facter.cs"

---

## Test from FrontEnd Code

If cliRun-FrontEnd has a button/selection handler:

```typescript
// In cliRun-FrontEnd React component
import { ORCHESTRATION_EVENTS } from '../../utils/orchestrationEvents'

function handleCSXUSelect(csxuName: string) {
  // Send to parent
  window.parent.postMessage({
    type: 'csPlayer:filterChanged',
    data: { csxuName }
  }, 'http://localhost:8000')
}
```

Or using an adapter if one exists:

```typescript
// If cliRun-FrontEnd has iframeAdapter
import { messageBus } from '../../utils/messageBus'

messageBus.publish(
  ORCHESTRATION_EVENTS.CSPAYER_FILTER_CHANGED,
  { csxuName: 'selected.csxu' }
)
```

---

## Infrastructure Already in Place (Not Modified)

✅ **messageBus.js** - Event pub/sub system (working)
✅ **iframeAdapter.js** - PostMessage bridge (working)
✅ **orchestrationEvents.js** - Event registry with `CSPAYER_FILTER_CHANGED` (working)

---

## Scope

### What This Implements
- ✅ CSXU name sent from FrontEnd → Parent receives it
- ✅ Parent state updates with selected CSXU
- ✅ Header displays the selected CSXU name
- ✅ Works via PostMessage API and messageBus

### What This Does NOT Implement
- ❌ Command execution
- ❌ Task status updates
- ❌ Error handling
- ❌ Package selection (PKG field remains static)
- ❌ Backend communication

---

## Build Status

✅ **Build Successful**
- csPlayer.js: 87 lines (added 13 lines)
- Layout.js: Updated with prop forwarding
- Header.js: Updated with dynamic display
- All imports correct
- No errors or warnings

---

## Next Steps (When Ready)

1. **Integrate stub in cliRun-FrontEnd:**
   - Add test button to send CSXU name
   - Verify Header updates in parent

2. **Integrate real selection logic:**
   - Replace stub with actual CSXU picker
   - Send real CSXU names from FrontEnd

3. **Consider pkg selection:**
   - Similar communication for package name
   - Update PKG field in Header

---

## Files Modified

1. `/bisos/git/auth/bxRepos/bisos-web/csPlayer-webUi/src/pages/csPlayer.js`
2. `/bisos/git/auth/bxRepos/bisos-web/csPlayer-webUi/src/components/Layout.js`
3. `/bisos/git/auth/bxRepos/bisos-web/csPlayer-webUi/src/components/Header.js`

---

## Architecture Notes

The implementation leverages the existing infrastructure:
- **PostMessage API:** Browser's secure iframe communication
- **messageBus:** Central event router (pub/sub pattern)
- **iframeAdapter:** Bridges PostMessage events to messageBus
- **React State:** Parent tracks selected CSXU
- **Component Props:** Data flows through component tree

This design allows clean separation of concerns and makes future additions (like package selection) straightforward.
