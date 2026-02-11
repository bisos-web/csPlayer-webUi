# Zustand Migration Guide - Updating Other Pages

Once the csPlayer.js and testStubs.js pages are working correctly with Zustand, you can optionally migrate other pages to use it as well.

## Migration Pattern

### Before (Using local useState)

```javascript
import { getOrchestrationState } from "../utils/orchestrationState"

const MyPage = () => {
  const [selectedCSXU, setSelectedCSXU] = React.useState(null)
  const [selectedPackage, setSelectedPackage] = React.useState(null)

  React.useEffect(() => {
    const persistedState = getOrchestrationState()
    setSelectedCSXU(persistedState.selectedCSXU)
    setSelectedPackage(persistedState.selectedPackage)

    messageBus.subscribe(
      ORCHESTRATION_EVENTS.CSPAYER_FILTER_CHANGED,
      (data) => setSelectedCSXU(data.csxuName),
      'myPage'
    )
  }, [])

  return (
    <Layout selectedCSXU={selectedCSXU} selectedPackage={selectedPackage}>
      {/* ... */}
    </Layout>
  )
}
```

### After (Using Zustand)

```javascript
import { useOrchestration } from "../stores/orchestrationStore"

const MyPage = () => {
  const { selectedCSXU, selectedPackage, setSelectedCSXU, setSelectedPackage } = useOrchestration()

  React.useEffect(() => {
    messageBus.subscribe(
      ORCHESTRATION_EVENTS.CSPAYER_FILTER_CHANGED,
      (data) => setSelectedCSXU(data.csxuName),
      'myPage'
    )
  }, [setSelectedCSXU])

  return (
    <Layout selectedCSXU={selectedCSXU} selectedPackage={selectedPackage}>
      {/* ... */}
    </Layout>
  )
}
```

### What Changed:

1. **Remove import:**
   ```javascript
   - import { getOrchestrationState } from "../utils/orchestrationState"
   ```

2. **Add import:**
   ```javascript
   + import { useOrchestration } from "../stores/orchestrationStore"
   ```

3. **Remove useState lines:**
   ```javascript
   - const [selectedCSXU, setSelectedCSXU] = React.useState(null)
   - const [selectedPackage, setSelectedPackage] = React.useState(null)
   ```

4. **Add Zustand hook:**
   ```javascript
   + const { selectedCSXU, selectedPackage, setSelectedCSXU, setSelectedPackage } = useOrchestration()
   ```

5. **Remove persisted state loading:**
   ```javascript
   - const persistedState = getOrchestrationState()
   - setSelectedCSXU(persistedState.selectedCSXU)
   - setSelectedPackage(persistedState.selectedPackage)
   ```

6. **Update dependency array:**
   ```javascript
   - }, [])
   + }, [setSelectedCSXU, setSelectedPackage])
   ```

That's it! The rest remains the same.

## Pages to Consider Migrating (Optional)

These pages might benefit from having Zustand state:

- `csPlayerBackEnd.js` - If it displays orchestration state
- `airflow.js` - If it responds to CSXU/Package changes
- `grafana.js` - If it responds to CSXU/Package changes
- `facterCsApp.js` - If it responds to CSXU/Package changes
- Any custom pages that use orchestration state

## Migration Checklist

For each page you migrate:

- [ ] Find imports of `getOrchestrationState`
- [ ] Replace with `useOrchestration` import
- [ ] Find `useState` calls for selectedCSXU/selectedPackage
- [ ] Remove those useState calls
- [ ] Add the useOrchestration hook
- [ ] Remove the effect code that loads from orchestrationState
- [ ] Update dependency array to include the setters
- [ ] Test the page:
  - [ ] State appears on first load
  - [ ] Navigation preserves state
  - [ ] Browser refresh preserves state
  - [ ] messageBus subscriptions still work

## When to Migrate Everything

You can safely migrate all pages because:

1. **Zustand is backward compatible** - Old code still works alongside it
2. **No breaking changes** - Same props passed to Layout component
3. **Automatic benefits** - No code changes needed to see localStorage persistence
4. **Gradual migration** - Update one page at a time

## How to Know When You Can Remove Old Code

Once ALL pages have been migrated away from `getOrchestrationState()`:

```bash
# Search for any remaining usage
grep -r "getOrchestrationState" src/pages src/components

# If nothing found, it's safe to delete:
rm src/utils/orchestrationState.js
```

Then you can remove the old state management file completely.

## Performance Note

Zustand provides automatic **selective re-rendering**:

```javascript
// This component only re-renders when selectedCSXU changes
const Header = () => {
  const csxu = useOrchestrationStore((state) => state.selectedCSXU)
  return <div>{csxu}</div>
}

// This component only re-renders when selectedPackage changes
const Package = () => {
  const pkg = useOrchestrationStore((state) => state.selectedPackage)
  return <div>{pkg}</div>
}

// If selectedPackage changes, Header doesn't re-render!
// This improves performance automatically
```

This is why Zustand is better than Context - it's more efficient.

## Troubleshooting During Migration

### Issue: Page still shows "none" after migration

**Check:**
1. Did you remove the old `useState` calls?
2. Did you update the dependency array?
3. Try the debug commands:

```javascript
window.__orchestrationStore.getState()  // Should show values
```

### Issue: State not persisting to localStorage

**Check:**
1. Browser console for errors
2. localStorage directly:
   ```javascript
   localStorage.getItem('bisos-orchestration-storage')
   ```
3. Try clearing and setting manually:
   ```javascript
   localStorage.removeItem('bisos-orchestration-storage')
   window.__orchestrationStore.getState().setSelectedCSXU('test.cs')
   localStorage.getItem('bisos-orchestration-storage')
   ```

### Issue: messageBus subscriptions not firing

**Check:**
1. Are you still calling `messageBus.subscribe()`?
2. Are the setters in the dependency array?
3. Are the event names correct?

## Testing Commands

After migrating a page, use these to verify:

```javascript
// 1. Check store has values
window.__orchestrationStore.getState()

// 2. Manually set and verify persistence
window.__orchestrationStore.getState().setSelectedCSXU('test.cs')
localStorage.getItem('bisos-orchestration-storage')

// 3. Navigate and come back - state should be there
// Then in console:
window.__orchestrationStore.getState().selectedCSXU
// Should show: "test.cs"

// 4. Refresh page - state should persist
// F5, then:
window.__orchestrationStore.getState().selectedCSXU
// Should still show: "test.cs"
```

## Done! 

Once all pages are migrated, you've successfully modernized your state management and fixed the navigation persistence issue.
