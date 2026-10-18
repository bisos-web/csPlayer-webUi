# Testing the Zustand State Persistence Fix

## Quick Test: Does State Persist on Navigation?

### Test Steps:

1. **Go to Test Stubs page**
   - Navigate to `/testStubs` in your app
   - You should see the Test Iframe section

2. **Send CSXU from iframe**
   - In the Test Stubs page, there should be an iframe
   - Enter `facter.cs` as the CSXU name
   - Click the "Send CSXU" button
   - Look at the Header at the top of the page
   - You should see: `CSXU: facter.cs` ✅

3. **Check Header shows the value**
   - The Header component at the top should display your selection
   - It should show: `CSXU: facter.cs` and maybe a Package value

4. **Navigate to csPlayer page**
   - Click on "Build and Execute CSXU" in the sidebar or header
   - Navigate to the csPlayer page
   - **IMPORTANT:** Watch the Header as the page loads

5. **Verify state persists**
   - The Header should STILL show `CSXU: facter.cs`
   - It should NOT show `CSXU: none`
   - State should be there from the very first render ✅

6. **Navigate back to testStubs**
   - Go back to Test Stubs
   - The Header should STILL show `CSXU: facter.cs`
   - State should persist ✅

7. **Refresh the page**
   - Press F5 or Cmd+R to refresh the entire page
   - After refresh, Header should STILL show `CSXU: facter.cs`
   - State should survive browser refresh ✅

### Expected Behavior:

```
Before fix:
  testStubs -> send "facter.cs" -> Header shows "facter.cs" ✅
  Click csPlayer -> Header briefly shows "none" then updates ❌
  
After fix:
  testStubs -> send "facter.cs" -> Header shows "facter.cs" ✅
  Click csPlayer -> Header shows "facter.cs" immediately ✅
  Refresh page -> Header still shows "facter.cs" ✅
```

## Debugging in Browser Console

If something doesn't work as expected, use these commands:

```javascript
// View current state
window.__orchestrationStore.getState()

// Output should show:
// {
//   selectedCSXU: "facter.cs",
//   selectedPackage: null,
//   setSelectedCSXU: [Function],
//   setSelectedPackage: [Function],
//   ...
// }

// View localStorage
localStorage.getItem('bisos-orchestration-storage')

// Output should show JSON like:
// {"state":{"selectedCSXU":"facter.cs","selectedPackage":null},"version":1}

// Manually trigger a state change
window.__orchestrationStore.getState().setSelectedCSXU('test.csxu')

// Check if state updated
window.__orchestrationStore.getState().selectedCSXU
// Should show: "test.csxu"
```

## If Something Goes Wrong

### Issue: Header still shows "none" after navigation

**Possible causes:**
1. localStorage is disabled in your browser
2. Build wasn't reloaded (try hard refresh: Ctrl+Shift+R)
3. The messageBus event isn't firing correctly

**Debug:**
```javascript
// Open browser console and run:
window.__orchestrationStore.getState()

// If selectedCSXU is null, then:
// 1. localStorage might be disabled
// 2. Or the state was never set

// Try manually:
window.__orchestrationStore.getState().setSelectedCSXU('facter.cs')

// Now navigate - does it persist?
```

### Issue: State persists but resets after closing browser

**This is actually correct behavior!** Because:
- If you closed without saving, localStorage should be cleared
- Check if you're in private/incognito mode (localStorage disabled)
- In regular mode, state should survive

### Issue: Zustand error "useOrchestrationStore is not a function"

**Causes:**
1. Module not installed: `npm install zustand`
2. Build failed: `npm run build` and check for errors
3. Wrong import path: check `/src/stores/orchestrationStore.js` exists

**Fix:**
```bash
npm install zustand
npm run build
# Then reload browser with Ctrl+Shift+R
```

## Success Indicators ✅

You'll know the implementation is working when:

1. ✅ testStubs sends value
2. ✅ Header shows it immediately
3. ✅ Navigation doesn't reset state
4. ✅ Browser refresh preserves state
5. ✅ Console shows no errors
6. ✅ `window.__orchestrationStore.getState()` shows correct values
7. ✅ localStorage has 'bisos-orchestration-storage' key

## What Changed Under the Hood

Old system (broken):
```
iframe sends → iframeAdapter updates orchestrationState.js 
→ messageBus publishes → page subscribes → useState updates
→ navigation unmounts component → state lost ❌
```

New system (fixed):
```
iframe sends → iframeAdapter updates Zustand store 
→ Zustand auto-saves to localStorage 
→ messageBus publishes → hook subscribers update
→ navigation → new page loads from localStorage immediately ✅
```

The key difference: **Zustand persists to localStorage automatically**, so state survives navigation.
