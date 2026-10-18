# Phase A Implementation Plan
## Core Infrastructure (3 Components)

**Date:** January 25, 2026  
**Scope:** webUi-csPlayer (Gatsby), cliRun-FrontEnd (React), cliRun-BackEnd (Django)  
**Communication:** PostMessage API (iframe) + HTTP REST API

---

## 1. webUi-csPlayer (Gatsby on Port 8000)
### Repository: `/bisos/git/auth/bxRepos/bisos-web/csPlayer-webUi`

### ✅ ALREADY IMPLEMENTED

#### Infrastructure
- ✅ Gatsby 5.x site structure (src/, public/, gatsby-config.js)
- ✅ Layout component with Header, Sidebar, Footer
- ✅ Tailwind CSS 3.4.17 styling integration
- ✅ Multi-page structure with routing

#### Pages & Documentation
- ✅ Service page: `src/pages/csPlayer.js` (74 lines)
- ✅ About pages: bisos.js, csplayers.js, csxu.js, pycs.js, thiscsplayer.js
- ✅ Phase A/B/C documentation with component tables
- ✅ Service pages for airflow.js, grafana.js (for future phases)

#### Communication Infrastructure  
- ✅ `src/utils/messageBus.js` (151 lines) - Central Pub/Sub system
  - Manages inter-iframe communication
  - Subscribe/publish pattern implemented
  - Event logging for debugging
  
- ✅ `src/utils/iframeAdapter.js` (168 lines) - PostMessage Bridge
  - Registers iframes
  - Sends messages to iframes via PostMessage
  - Receives messages from iframes
  - Routes to message bus
  
- ✅ `src/utils/orchestrationEvents.js` (67 lines) - Event Registry
  - Central registry of orchestration events
  - Parent → csPlayer: FILTER_CHANGED, REFRESH_TASKS, EXECUTE_COMMAND
  - csPlayer → Parent: TASK_EXECUTED, TASK_FAILED, STATUS_UPDATED
  - Event validation

#### csPlayer.js Page
- ✅ Imports iframe utilities (iframeAdapter, messageBus, orchestrationEvents)
- ✅ iframe reference management
- ✅ Event subscription setup on mount
- ✅ Event unsubscription on unmount (cleanup)
- ✅ Layout with header and iframe container
- ✅ iframe src points to http://localhost:9002
- ✅ Loading message placeholder

### ❌ NOT YET IMPLEMENTED

#### csPlayer.js Page Features
- ❌ **CSXU Selection Handler:** Respond when user selects a CSXU in the frontend
  - Listen for `CSPAYER_FILTER_CHANGED` event
  - Update page state with selected CSXU
  - Show selected CSXU info box in header
  
- ❌ **Command Execution Trigger:** Send command to backend when cliRun-FrontEnd requests
  - Listen for `CSPAYER_EXECUTE_COMMAND` event from iframe
  - Extract command parameters
  - Pass to backend via HTTP API
  - Show execution progress
  
- ❌ **Status Updates:** Display real-time execution status
  - Listen for `CSPAYER_STATUS_UPDATED` event from iframe
  - Update progress indicator
  - Show execution logs/output
  
- ❌ **Error Handling:** Display errors from iframe
  - Listen for `CSPAYER_TASK_FAILED` event
  - Show error notifications
  - Log errors for debugging

#### Page Features & UI
- ❌ **Selected CSXU Info Box:** Display in header
  - Show: CSXU name, framework, port number
  - Show: Current status (idle, running, error)
  - Refresh button
  
- ❌ **Execution Status Panel:** Below iframe
  - Show real-time task progress
  - Display task start time, duration, status
  - Show output/logs preview
  
- ❌ **Error Notification:** Toast/banner for failures
  - Display error message from backend
  - Action to retry or dismiss

---

## 2. cliRun-FrontEnd (React on Port 9002)
### Repository: `/bisos/git/auth/bxRepos/cliGui/webCliGui`

### ✅ ALREADY IMPLEMENTED

#### Infrastructure
- ✅ React project structure
- ✅ package.json with dependencies
- ✅ Webpack configuration
- ✅ Dev server on port 9002
- ✅ Source files: src/main.tsx, src/dataStore.ts, src/index.css

#### Basic Setup
- ✅ Project initialized and built

### ❌ NOT YET IMPLEMENTED

#### Phase A Core Features

- ❌ **PostMessage Listener Setup**
  - Create utility function: `utils/parentCommunication.ts`
  - Listen for PostMessage events from parent (webUi-csPlayer)
  - Handle event: `csPlayer:executeCommand`
  - Validate messages (origin check for security)

- ❌ **CSXU Command UI**
  - **Command Input Component:** src/components/CommandInput.tsx
    - Text input for command entry
    - Command history dropdown
    - Clear/reset button
    - Execute button
  
  - **Command Output Component:** src/components/CommandOutput.tsx
    - Read-only terminal output display
    - Scrollable output area
    - Copy output button
    - Clear output button
  
  - **Status Display Component:** src/components/StatusDisplay.tsx
    - Status badge (idle, running, completed, error)
    - Spinner animation during execution
    - Execution time display

- ❌ **Backend API Communication**
  - Create service: `services/apiClient.ts`
  - Base URL: http://localhost:5000/api
  - Methods:
    - `executeCommand(command: string): Promise<Response>`
    - `getCommandStatus(taskId: string): Promise<Status>`
    - `cancelCommand(taskId: string): Promise<void>`

- ❌ **State Management**
  - Enhance `src/dataStore.ts`:
    - Current command input
    - Command history (last 50)
    - Execution status (idle, running, completed)
    - Command output/logs
    - Current task ID
    - Error state

- ❌ **Event Publishing to Parent**
  - Emit `csPlayer:taskExecuted` when command succeeds
    - Include: task ID, command, output, duration
  
  - Emit `csPlayer:taskFailed` when command fails
    - Include: task ID, command, error message
  
  - Emit `csPlayer:statusUpdated` periodically during execution
    - Include: task ID, status, progress percentage, elapsed time

- ❌ **UI Layout**
  - `src/App.tsx` main component
  - Layout:
    - Header: "Web CLI GUI"
    - Input section: CommandInput component
    - Output section: CommandOutput component
    - Status section: StatusDisplay component
    - Footer with connection status to backend

- ❌ **Error Handling**
  - Network error handling (backend unreachable)
  - Invalid command handling
  - Timeout handling (>30 seconds)
  - Display user-friendly error messages

- ❌ **Webpack Dev Server Proxy**
  - Configure proxy to backend: http://localhost:5000
  - Proxy path: /api → backend API

---

## 3. cliRun-BackEnd (Django on Port 5000)
### Repository: `/bisos/git/auth/bxRepos/cliGui/webCliGui/server`

### ✅ ALREADY IMPLEMENTED

#### Infrastructure
- ✅ Django project structure (manage.py, settings.py, urls.py, wsgi.py)
- ✅ Project name: webCliGui
- ✅ Basic Django configuration

### ❌ NOT YET IMPLEMENTED

#### Phase A Core Features

- ❌ **CORS Configuration**
  - Install: django-cors-headers
  - Configure allowed origins: http://localhost:8000, http://localhost:9002
  - Allow credentials for cookies

- ❌ **REST API Endpoints**
  
  **1. Execute Command Endpoint**
  - Path: `POST /api/commands/execute`
  - Request body:
    ```json
    {
      "command": "ls -la /tmp",
      "timeout": 30,
      "cwd": "/home/user"
    }
    ```
  - Response:
    ```json
    {
      "taskId": "uuid",
      "status": "started",
      "startTime": "2026-01-25T10:30:00Z"
    }
    ```
  
  **2. Get Status Endpoint**
  - Path: `GET /api/commands/{taskId}/status`
  - Response:
    ```json
    {
      "taskId": "uuid",
      "status": "running",
      "progress": 50,
      "elapsedTime": 2.5,
      "output": "partial output..."
    }
    ```
  
  **3. Get Command Result Endpoint**
  - Path: `GET /api/commands/{taskId}/result`
  - Response:
    ```json
    {
      "taskId": "uuid",
      "status": "completed",
      "returnCode": 0,
      "output": "full command output",
      "stderr": "",
      "duration": 5.2,
      "completedTime": "2026-01-25T10:30:05Z"
    }
    ```
  
  **4. Cancel Command Endpoint**
  - Path: `POST /api/commands/{taskId}/cancel`
  - Response:
    ```json
    {
      "taskId": "uuid",
      "status": "cancelled"
    }
    ```

- ❌ **Command Execution Engine**
  - `services/commandExecutor.py`
  - Execute system commands using subprocess
  - Capture stdout, stderr, return code
  - Handle timeouts (default 30s, configurable)
  - Manage process lifecycle (start, monitor, kill)

- ❌ **Task Management**
  - `models/Task.py` model:
    - Fields: id, command, status, output, stderr, returnCode, startTime, endTime, userId
    - Methods: execute(), cancel(), get_duration(), get_status()
  
  - `services/taskStore.py`
    - In-memory or database storage of tasks
    - Retrieve task by ID
    - List recent tasks
    - Cleanup old tasks

- ❌ **Django Views**
  - `views/commandViews.py`
    - Class-based views or function-based views
    - Handle POST /api/commands/execute
    - Handle GET /api/commands/{taskId}/status
    - Handle GET /api/commands/{taskId}/result
    - Handle POST /api/commands/{taskId}/cancel

- ❌ **URL Routing**
  - Update `webCliGui/urls.py`
    - Route: api/commands/execute → execute_command view
    - Route: api/commands/<taskId>/status → get_status view
    - Route: api/commands/<taskId>/result → get_result view
    - Route: api/commands/<taskId>/cancel → cancel_command view

- ❌ **Error Handling**
  - Handle: Invalid commands (return 400)
  - Handle: Task not found (return 404)
  - Handle: Command execution failure (return 500 with error)
  - Handle: Timeout (return 408 with partial output)

- ❌ **Security**
  - Validate command input (no shell injection)
  - Restrict command execution to safe commands
  - Add request authentication (JWT tokens or session)
  - Log all command executions

- ❌ **Logging**
  - Log all API requests
  - Log command execution start/end
  - Log errors and exceptions
  - Store logs in: /logs/backend.log

- ❌ **requirements.txt**
  - Add dependencies:
    - django-cors-headers
    - python-dotenv (for config)
    - requests (for external APIs)
    - Any other needed packages

---

## Communication Flow (Phase A)

### Sequence Diagram

```
User (Browser)
    |
    v
webUi-csPlayer (Gatsby, :8000)
    |
    | 1. User enters command in iframe
    |
    v
cliRun-FrontEnd (React, :9002) [in iframe]
    |
    | 2. PostMessage: "csPlayer:executeCommand"
    |    {"command": "ls -la"}
    |
    v
webUi-csPlayer messageBus
    |
    | 3. Route to backend
    |
    v
Backend HTTP API (Django, :5000)
    |
    | 4. POST /api/commands/execute
    |
    v
cliRun-BackEnd (Django)
    |
    | 5. Execute subprocess
    | 6. Return taskId
    |
    v
Backend HTTP Response
    |
    | 7. {"taskId": "uuid", "status": "started"}
    |
    v
webUi-csPlayer
    |
    | 8. Poll /api/commands/{taskId}/status
    |
    v
Backend
    |
    | 9. Return status: "running", "completed", or "failed"
    |
    v
webUi-csPlayer
    |
    | 10. PostMessage: "csPlayer:statusUpdated" or "csPlayer:taskExecuted"
    |
    v
cliRun-FrontEnd [in iframe]
    |
    | 11. Display output/status to user
    |
    v
User sees result
```

---

## Implementation Order (Recommended)

### Priority 1: Backend (Foundation)
1. **Django CORS + API Structure**
   - Add CORS configuration
   - Create URL routing structure
   - Create views skeleton

2. **Command Execution Engine**
   - Build commandExecutor.py
   - Implement subprocess execution
   - Add timeout handling

3. **Task Management**
   - Create Task model/storage
   - Implement task lifecycle

4. **API Endpoints**
   - Implement all 4 endpoints
   - Add error handling

### Priority 2: Frontend (UI)
1. **Base React Setup**
   - Create main App.tsx layout
   - Set up state management in dataStore.ts

2. **UI Components**
   - CommandInput component
   - CommandOutput component
   - StatusDisplay component

3. **Backend Communication**
   - Create apiClient.ts service
   - Implement HTTP calls to backend
   - Add error handling

### Priority 3: Integration (Bridge)
1. **PostMessage Setup**
   - Implement parentCommunication.ts in React
   - Event listeners in React
   - Event publishing from React

2. **csPlayer.js Integration**
   - Connect messageBus to iframe events
   - Display status in parent page
   - Handle error display

---

## Testing Strategy

### Backend Testing
- [ ] Test execute endpoint with simple command: `echo "hello"`
- [ ] Test timeout on long-running command
- [ ] Test error on invalid command
- [ ] Test concurrent command execution

### Frontend Testing
- [ ] Test command input/output display
- [ ] Test PostMessage bridge
- [ ] Test API communication

### Integration Testing
- [ ] End-to-end command execution: User → React → Backend → Result
- [ ] Error propagation: Backend error → React display → Parent notification
- [ ] Timeout handling: Long command → Partial output → Cancel

---

## Success Criteria for Phase A

✅ When all of the following are working:

1. **Backend Ready**
   - [ ] Django app starts on port 5000
   - [ ] `/api/commands/execute` returns taskId
   - [ ] Status endpoint returns current execution status
   - [ ] Result endpoint returns command output

2. **Frontend Ready**
   - [ ] React app starts on port 9002
   - [ ] Can enter commands in input field
   - [ ] Command executes via backend API
   - [ ] Output displays in terminal
   - [ ] Status shows during execution

3. **Integration Ready**
   - [ ] csPlayer.js page embeds React iframe
   - [ ] PostMessage communication works
   - [ ] Parent page shows execution status
   - [ ] Errors display properly

4. **Communication Ready**
   - [ ] All 4 API endpoints operational
   - [ ] PostMessage events flowing correctly
   - [ ] CORS allowing cross-origin requests
   - [ ] No console errors or warnings
