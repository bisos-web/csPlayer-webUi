# Zustand Quick Reference Card

## Installation ✅
```bash
npm install zustand
# Already done! Version 5.0.11 installed
```

## Using the Store

### Basic Usage
```javascript
import { useOrchestration } from "../stores/orchestrationStore"

const MyComponent = () => {
  const { selectedCSXU, selectedPackage, setSelectedCSXU, setSelectedPackage } = useOrchestration()
  
  return (
    <div>
      <p>Current: {selectedCSXU || 'none'}</p>
      <button onClick={() => setSelectedCSXU('facter.cs')}>Select</button>
    </div>
  )
}
```

### Optimized Usage (Single Value)
```javascript
import { useOrchestrationStore } from "../stores/orchestrationStore"

const Header = () => {
  // Only re-renders when selectedCSXU changes
  const csxu = useOrchestrationStore((state) => state.selectedCSXU)
  return <h1>{csxu || 'none'}</h1>
}
```

### Only Getters
```javascript
const { selectedCSXU, selectedPackage } = useOrchestrationValues()
```

### Only Setters
```javascript
const { setSelectedCSXU, setSelectedPackage } = useOrchestrationSetters()
```

## Direct Access (Outside Components)
```javascript
import { useOrchestrationStore } from "../stores/orchestrationStore"

// Get state
const state = useOrchestrationStore.getState()
console.log(state.selectedCSXU)

// Set state
useOrchestrationStore.getState().setSelectedCSXU('test.cs')

// Subscribe to changes
const unsubscribe = useOrchestrationStore.subscribe(
  (state) => console.log('State:', state)
)
```

## Browser Console

### View State
```javascript
window.__orchestrationStore.getState()
// Output: { selectedCSXU: "...", selectedPackage: "...", ... }
```

### Update State
```javascript
window.__orchestrationStore.getState().setSelectedCSXU('new.csxu')
```

### View localStorage
```javascript
localStorage.getItem('bisos-orchestration-storage')
// Output: {"state":{"selectedCSXU":"...","selectedPackage":"..."},"version":1}
```

### Clear Storage
```javascript
localStorage.removeItem('bisos-orchestration-storage')
window.location.reload()
```

## What Happens Automatically

1. **On State Change**: Automatically saves to localStorage
2. **On Page Load**: Automatically loads from localStorage
3. **On Navigation**: State persists (no need to reload)
4. **On Browser Refresh**: State restored from localStorage
5. **On New Browser Session**: State restored from localStorage

## Common Patterns

### Subscribe in useEffect
```javascript
React.useEffect(() => {
  messageBus.subscribe(
    ORCHESTRATION_EVENTS.CSPAYER_FILTER_CHANGED,
    (data) => {
      setSelectedCSXU(data.csxuName)
    }
  )
}, [setSelectedCSXU])
```

### Watch for Changes
```javascript
const selectedCSXU = useOrchestrationStore((state) => state.selectedCSXU)
const selectedPackage = useOrchestrationStore((state) => state.selectedPackage)

React.useEffect(() => {
  console.log('CSXU changed:', selectedCSXU)
}, [selectedCSXU])
```

### Multiple Values Efficiently
```javascript
const { csxu, pkg } = useOrchestrationStore((state) => ({
  csxu: state.selectedCSXU,
  pkg: state.selectedPackage,
}))
```

## Files

| File | Purpose |
|------|---------|
| `src/stores/orchestrationStore.js` | The Zustand store |
| `README_ZUSTAND.md` | Overview |
| `ZUSTAND_IMPLEMENTATION.md` | Technical details |
| `TESTING_ZUSTAND_FIX.md` | How to test |
| `ZUSTAND_MIGRATION_GUIDE.md` | Update other pages |
| `IMPLEMENTATION_DETAILS.md` | Complete changelog |

## State Shape

```javascript
{
  selectedCSXU: string | null,      // The selected CSXU name
  selectedPackage: string | null,   // The selected package name
  setSelectedCSXU: (name) => void,  // Update CSXU
  setSelectedPackage: (name) => void, // Update package
  updateOrchestration: (obj) => void, // Update both at once
  clear: () => void                 // Clear all state
}
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| State not persisting | Check localStorage is enabled in browser |
| Old value appearing | Hard refresh (Ctrl+Shift+R) |
| State is null/none | Check localStorage key: `bisos-orchestration-storage` |
| Module not found | `npm install zustand` |
| Build fails | `npm run build` to check errors |

## Performance Notes

✅ **Optimal:** Using selector to get single value
```javascript
const csxu = useOrchestrationStore((state) => state.selectedCSXU)
```

❌ **Less Optimal:** Getting all values when you only need one
```javascript
const { selectedCSXU } = useOrchestration()  // Still OK, but gets all
```

## localStorage Key

**Key:** `bisos-orchestration-storage`

**Value Format:**
```json
{
  "state": {
    "selectedCSXU": "value",
    "selectedPackage": "value"
  },
  "version": 1
}
```

## Version Control

Current version: **1**

If you need to migrate localStorage format in the future, increment the version in `src/stores/orchestrationStore.js` and add migration logic.

## Zustand Docs

- GitHub: https://github.com/pmndrs/zustand
- Docs: https://docs.pmnd.rs/zustand/
- Persist Middleware: https://docs.pmnd.rs/zustand/integrations/persisting-store-data

---

**Ready to use? See TESTING_ZUSTAND_FIX.md for test steps!**
