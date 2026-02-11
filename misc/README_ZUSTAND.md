# Zustand State Management Implementation

## Summary

The iframe-to-parent communication state is now managed by **Zustand** instead of the old `orchestrationState.js` system. This fixes the issue where state was lost when navigating between pages.

## The Problem (Fixed)

**Before:** When you navigated from testStubs → csPlayer, the Header would show "CSXU: none" even though you had selected a value in testStubs. The state was lost because each page had its own local React state that was initialized when the component mounted.

**After:** State is now stored in Zustand with automatic localStorage persistence. Navigation doesn't lose state because it's restored from browser storage.

## Files

### New Files

1. **`src/stores/orchestrationStore.js`** - The Zustand store
   - Manages selectedCSXU and selectedPackage
   - Auto-persists to localStorage
   - Exports: `useOrchestration()`, `useOrchestrationStore()`, etc.
   - Includes window debugging API: `window.__orchestrationStore`

2. **`ZUSTAND_IMPLEMENTATION.md`** - Technical documentation
   - How it works
   - Why it's better than Context
   - Usage examples
   - Benefits and performance characteristics

3. **`TESTING_ZUSTAND_FIX.md`** - Testing guide
   - Step-by-step test procedure
   - Debug commands
   - Troubleshooting

4. **`ZUSTAND_MIGRATION_GUIDE.md`** - Updating other pages
   - Migration pattern before/after code
   - Pages that could benefit
   - Checklist for safe migration

### Updated Files

1. **`src/pages/csPlayer.js`**
   - Uses `useOrchestration()` hook
   - Removed local useState for selectedCSXU/selectedPackage
   - State now persists across navigation

2. **`src/pages/testStubs.js`**
   - Uses `useOrchestration()` hook
   - Removed local useState for selectedCSXU/selectedPackage
   - State now persists across navigation

3. **`src/utils/iframeAdapter.js`**
   - Uses Zustand store via `useOrchestrationStore.getState()`
   - Automatic localStorage persistence on state changes

## Quick Start

### Using the store in a component

```javascript
import { useOrchestration } from "../stores/orchestrationStore"

export function MyComponent() {
  const { selectedCSXU, selectedPackage, setSelectedCSXU, setSelectedPackage } = useOrchestration()
  
  return (
    <div>
      <p>CSXU: {selectedCSXU || 'none'}</p>
      <p>Package: {selectedPackage || 'none'}</p>
      <button onClick={() => setSelectedCSXU('facter.cs')}>Select facter</button>
    </div>
  )
}
```

### Using only what you need (optimized)

```javascript
import { useOrchestrationStore } from "../stores/orchestrationStore"

// Only re-renders when selectedCSXU changes
const Header = () => {
  const csxu = useOrchestrationStore((state) => state.selectedCSXU)
  return <h1>CSXU: {csxu || 'none'}</h1>
}
```

## Testing

Quick test that it works:

1. Go to testStubs page
2. Send "facter.cs" from the iframe
3. Verify Header shows "CSXU: facter.cs"
4. Navigate to csPlayer page
5. Header should STILL show "CSXU: facter.cs" ✅
6. Refresh page (F5)
7. Header should STILL show "CSXU: facter.cs" ✅

See `TESTING_ZUSTAND_FIX.md` for detailed test steps.

## Debugging

In browser console:

```javascript
// View current state
window.__orchestrationStore.getState()

// Manually set state
window.__orchestrationStore.getState().setSelectedCSXU('test.cs')

// View localStorage
localStorage.getItem('bisos-orchestration-storage')

// Clear state (for testing)
localStorage.removeItem('bisos-orchestration-storage')
```

## What's Better About This

| Aspect | Old System | Zustand |
|--------|-----------|---------|
| **Persistence** | Manual orchestrationState.js | Built-in localStorage |
| **Navigation** | Lost on unmount ❌ | Persists automatically ✅ |
| **Boilerplate** | useState + useEffect + load state | Just useOrchestration() hook |
| **Re-renders** | All consumers when context updates | Only relevant subscribers |
| **Debugging** | React DevTools only | Window API + Redux DevTools ready |
| **Single source of truth** | No (orchestrationState.js + useState) | Yes (Zustand store) |
| **Page refresh** | Lost ❌ | Survives ✅ |
| **Browser close** | Lost ❌ | Survives ✅ |

## Next Steps (Optional)

1. Migrate other pages that use orchestration state (csPlayerBackEnd, airflow, grafana, etc.)
2. Use the pattern in `ZUSTAND_MIGRATION_GUIDE.md`
3. Once all pages migrated, delete `src/utils/orchestrationState.js`

## Documentation Files

- **`ZUSTAND_IMPLEMENTATION.md`** - Complete technical explanation
- **`TESTING_ZUSTAND_FIX.md`** - How to verify it works
- **`ZUSTAND_MIGRATION_GUIDE.md`** - How to update other pages
- **`src/stores/orchestrationStore.js`** - Fully documented source code

## Build Status

✅ Build succeeds with no errors
✅ Ready to use
✅ No breaking changes

## Questions?

Refer to the detailed documentation files above, or check the inline comments in `src/stores/orchestrationStore.js`.
