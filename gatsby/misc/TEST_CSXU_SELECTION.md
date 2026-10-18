# Test Stub for CSXU Selection Communication

## Quick Test - From Browser Console

When the page is loaded and the iframe is visible, you can test the communication:

### Step 1: Open Browser DevTools
Press `F12` or `Ctrl+Shift+I`

### Step 2: Click on iframe to focus it
Click inside the iframe area (the Web CLI GUI iframe on port 9002)

### Step 3: Paste in Console
```javascript
window.parent.postMessage({
  type: 'csPlayer:filterChanged',
  data: {
    csxuName: 'facter.cs'
  }
}, 'http://localhost:8000')
```

### Step 4: Press Enter
The Header should update to show "CSXU: facter.cs"

---

## Test with Different CSXU Names

```javascript
// Test 1: facter
window.parent.postMessage({
  type: 'csPlayer:filterChanged',
  data: { csxuName: 'facter' }
}, 'http://localhost:8000')

// Test 2: admin
window.parent.postMessage({
  type: 'csPlayer:filterChanged',
  data: { csxuName: 'admin.cs' }
}, 'http://localhost:8000')

// Test 3: Clear selection
window.parent.postMessage({
  type: 'csPlayer:filterChanged',
  data: { csxuName: null }
}, 'http://localhost:8000')
```

---

## React Component Test Code

If you're working on cliRun-FrontEnd and want to add a test button:

```typescript
// In your React component
import React, { useState } from 'react'

export function TestCSXUSelection() {
  const [csxuName, setCSXUName] = useState('')

  const sendCSXUToParent = () => {
    // Send message to parent
    window.parent.postMessage({
      type: 'csPlayer:filterChanged',
      data: {
        csxuName: csxuName || 'test.csxu'
      }
    }, 'http://localhost:8000')
    
    console.log('Sent CSXU:', csxuName)
  }

  return (
    <div style={{ padding: '20px', border: '1px solid blue' }}>
      <h3>Test CSXU Selection</h3>
      <input
        type="text"
        placeholder="Enter CSXU name"
        value={csxuName}
        onChange={(e) => setCSXUName(e.target.value)}
      />
      <button onClick={sendCSXUToParent}>
        Send to Parent
      </button>
      <p>Will send: {csxuName || 'test.csxu'}</p>
    </div>
  )
}
```

---

## What You Should See

### Before Sending Message
```
Header shows: "CSXU: none"
```

### After Sending `{ csxuName: 'facter.cs' }`
```
Header shows: "CSXU: facter.cs"
```

### In Console Logs
```
CSXU selected: facter.cs
```

---

## Verification Checklist

- [ ] Header CSXU field exists in parent page
- [ ] Console shows "CSXU selected: xxx" when test runs
- [ ] Header updates with the new CSXU name
- [ ] Multiple messages update the header each time
- [ ] `null` value shows "CSXU: none"

---

## Architecture Reminder

The communication flow:

```
FrontEnd (iframe) 
  → PostMessage 
  → iframeAdapter 
  → messageBus 
  → csPlayer.js subscriber 
  → setSelectedCSXU 
  → Header prop 
  → Header display
```

---

## Troubleshooting

### Header doesn't update
1. Check Console tab for errors
2. Look for "CSXU selected:" log message
3. Verify iframe is focused (click on it first)
4. Check message format matches exactly

### Browser Security Error
If you see: "Failed to execute 'postMessage' on 'Window': The target origin does not match"
- Make sure second parameter matches the parent origin
- Use: `'http://localhost:8000'` for local dev
- Use: actual domain for production

### Message not arriving
- Open Network tab, look for messages (should appear as PostMessage events)
- Check browser console for any errors
- Ensure messageBus is working (it was tested during build)

---

## Next: Real Integration

Once this stub works, integrate into your actual selection handler:

```typescript
// When user selects a CSXU
function handleCSXUSelect(csxu) {
  // 1. Update local state
  setSelectedCSXU(csxu)
  
  // 2. Notify parent
  window.parent.postMessage({
    type: 'csPlayer:filterChanged',
    data: { csxuName: csxu.name }
  }, 'http://localhost:8000')
  
  // 3. Possibly fetch tasks for this CSXU
  fetchTasksForCSXU(csxu)
}
```

---

## Code in FrontEnd to Remove Later

Once integrated, remove test stub and use this pattern:

```typescript
// In your app initialization or component mount
useEffect(() => {
  // Notify parent that we're ready and what CSXU is selected
  if (currentCSXU) {
    window.parent.postMessage({
      type: 'csPlayer:filterChanged',
      data: { csxuName: currentCSXU.name }
    }, 'http://localhost:8000')
  }
}, [currentCSXU])
```
