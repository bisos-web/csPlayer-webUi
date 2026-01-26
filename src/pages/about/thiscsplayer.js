import * as React from "react"
import Layout from "../../components/Layout"

export default function ThisCSPlayer() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-8">
            This csPlayer: Gatsby Web UI
          </h1>

          {/* References Section */}
          <div className="bg-gray-100 rounded-lg p-6 mb-8 border border-gray-300">
            <p className="text-black font-semibold">
              📚 References:
              <a href="https://github.com/bisos-web/gatsby-starter-bystar-nestedSidebar" className="text-blue-600 hover:text-blue-800 underline ml-2">
                github.com/bisos-web/gatsby-starter-bystar-nestedSidebar
              </a>
            </p>
          </div>

          {/* Quick Acronym Reference */}
          <section className="mb-12 bg-gray-100 rounded-lg p-6 border border-gray-300">
            <h2 className="text-2xl font-bold text-black mb-4">
              🔤 Quick Acronym Reference
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="text-black">
                <p><strong>BISOS</strong> - BISOS Is a System Operating System</p>
                <p><strong>PyCS</strong> - Python Command Services</p>
                <p><strong>CSXU</strong> - Command-Service eXecution Unit</p>
                <p><strong>CLI</strong> - Command Line Interface</p>
              </div>
              <div className="text-black">
                <p><strong>RPyC</strong> - Remote Python Call</p>
                <p><strong>Gatsby</strong> - React-based static site generator</p>
                <p><strong>PostMessage</strong> - Browser iframe communication API</p>
                <p><strong>ECO</strong> - Execution Context Object</p>
              </div>
            </div>
          </section>

          {/* 4. CSPLAYER - THE META-UI */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">
              csPlayer - The Generic Meta-UI
            </h2>

            <h3 className="text-2xl font-semibold text-black mb-4">Purpose</h3>
            <p className="text-black mb-6">
              csPlayer is a generic, self-adapting web UI that executes and audit-trails CSXU command execution.
              It is "meta" because it adapts to the self-describing metadata of each CSXU rather than being
              hard-coded for specific commands.
            </p>

            <h3 className="text-2xl font-semibold text-black mb-4">Two Critical Integration Moments</h3>
            <div className="space-y-6 mb-6">
              <div className="bg-gray-100 rounded-lg p-6 border-l-4 border-gray-400">
                <h4 className="text-xl font-semibold text-black mb-3">
                  ⏱️ Moment 1: CSXU Selection
                </h4>
                <p className="text-black mb-3">
                  When a user selects a CSXU in the csPlayer interface, this moment should trigger:
                </p>
                <ul className="text-black space-y-2 pl-4">
                  <li>• <strong>Signal:</strong> PostMessage event "CSXU_SELECTED"</li>
                  <li>• <strong>Result:</strong> Header "Selected CSXU" box updates</li>
                  <li>• <strong>Result:</strong> CSXU Info page re-fetches documentation</li>
                </ul>
              </div>

              <div className="bg-gray-100 rounded-lg p-6 border-l-4 border-gray-400">
                <h4 className="text-xl font-semibold text-black mb-3">
                  ⏱️ Moment 2: CSXU Execution
                </h4>
                <p className="text-black mb-3">
                  When a user executes or schedules a CSXU, this moment should trigger:
                </p>
                <ul className="text-black space-y-2 pl-4">
                  <li>• <strong>Signal:</strong> PostMessage event "CSXU_EXECUTED"</li>
                  <li>• <strong>Result:</strong> Navigate to Airflow DAG with execution context</li>
                  <li>• <strong>Result:</strong> Open Grafana dashboard for monitoring</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. CSPLAYER ORCHESTRATION */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">
              csPlayer Orchestration - Gatsby as Meta-Controller
            </h2>

            <h3 className="text-2xl font-semibold text-black mb-4">Orchestration Architecture</h3>
            <p className="text-black mb-6">
              This csPlayer (Gatsby-based) serves as a meta-orchestrator that coordinates multiple 
              services and components through a message-bus architecture.
            </p>

            <div className="bg-gray-100 rounded-lg p-6 mb-6 border border-gray-300 font-mono text-sm overflow-x-auto">
              <pre className="text-black">{`
Orchestration Flow
═══════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────┐
│     BISOS PyCS Web UI Player (Gatsby)                │
│     ───────────────────────────────────              │
│                                                      │
│  ┌──────────────────────────────────────┐            │
│  │  Message Bus (Pub/Sub System)         │            │
│  │  ├─ Event Registry                    │            │
│  │  ├─ Message Queue                     │            │
│  │  └─ Broadcast Controller              │            │
│  └────┬──────────────────────────────────┘            │
│       │                                              │
│   ┌───┴────┬──────────┬──────────┬──────────┐       │
│   │        │          │          │          │       │
│   ↓        ↓          ↓          ↓          ↓       │
│ ┌───┐  ┌────────┐ ┌────────┐ ┌─────────┐ ┌─────┐   │
│ │   │  │csPlayer│ │Header  │ │CSXU Info│ │Other│   │
│ │ H │  │iframe  │ │Component│ │Page    │ │Pages│   │
│ │ O │  │        │ │        │ │        │ │     │   │
│ │ M │  └────────┘ └────────┘ └─────────┘ └─────┘   │
│ │ E │                                               │
│ └───┘                                               │
│  Page                                               │
│                                                      │
│  Reactivity Model:                                  │
│  ─────────────────                                  │
│  Event "CSXU_SELECTED" fired from csPlayer iframe   │
│    → All subscribed components update reactively     │
│    → Header displays new CSXU name                   │
│    → Info page fetches new documentation            │
│    → Python Sources page shows new code             │
│                                                      │
│  Event "CSXU_EXECUTED" fired from csPlayer iframe   │
│    → Gatsby navigates to Airflow/Grafana pages      │
│    → Passes execution context via URL parameters    │
│    → Monitoring pages initialize with exec context  │
│                                                      │
└─────────────────────────────────────────────────────┘
                         ↓
            ┌────────────────────────────┐
            │  External Services         │
            ├────────────────────────────┤
            │ • PyCS (CSXU execution)    │
            │ • Airflow (scheduling)     │
            │ • Grafana (monitoring)     │
            │ • GitHub (documentation)   │
            │ • PyPI (package info)      │
            └────────────────────────────┘
              `}</pre>
            </div>

            <h3 className="text-2xl font-semibold text-black mb-4">Component Communication Pattern</h3>
            
            <div className="bg-gray-100 rounded-lg p-6 mb-6 border border-gray-300">
              <h4 className="text-lg font-semibold text-black mb-4">PostMessage Protocol</h4>
              <div className="space-y-4 font-mono text-sm text-black">
                <div className="bg-white p-3 rounded border border-gray-300">
                  <p className="text-black mb-2">From csPlayer iframe:</p>
                  <p>window.parent.postMessage(</p>
                  <p className="ml-4">&#123;</p>
                  <p className="ml-8">type: "CSXU_SELECTED",</p>
                  <p className="ml-8">csxuName: "facter.cs",</p>
                  <p className="ml-8">metadata: &#123;commands, parameters, ...&#125;</p>
                  <p className="ml-4">&#125;,</p>
                  <p>  "*"</p>
                  <p>)</p>
                </div>

                <div className="bg-white p-3 rounded border border-gray-300">
                  <p className="text-black mb-2">Gatsby orchestrator receives:</p>
                  <p>messageBus.publish("CSXU_SELECTED", payload)</p>
                  <p className="text-gray-600 mt-2">→ All subscribed components update</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-black mb-4">Page Routing with Execution Context</h3>
            <div className="bg-gray-100 rounded-lg p-4 mb-6 border border-gray-300 text-black">
              <p className="mb-3 font-mono text-sm">
                <span className="text-blue-600">/airflow</span>?executionId=abc123&csxuName=facter.cs&dagId=bisos-fact-gather
              </p>
              <p className="text-sm">
                The Airflow page component parses URL parameters and initializes with the execution context, 
                automatically displaying the relevant DAG run details.
              </p>
            </div>
          </section>

          {/* 7. DATA FLOW DIAGRAMS */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">
              Complete Data Flow - Selection to Execution to Monitoring
            </h2>

            <div className="bg-gray-100 rounded-lg p-6 border border-gray-300 font-mono text-xs overflow-x-auto">
              <pre className="text-black">{`
COMPLETE WORKFLOW: Selection → Configuration → Execution → Monitoring
════════════════════════════════════════════════════════════════════════════

PHASE 1: USER NAVIGATES TO CSPLAYER
────────────────────────────────────

User
  │
  └──> Gatsby Home Page
       │
       └──> Clicks csPlayer Service Box
            │
            └──> Navigates to /csplayer
                 │
                 └──> Gatsby renders csPlayer iframe
                      │
                      └──> Loads webCliGui with PyCS backend


PHASE 2: CSXU SELECTION (Moment 1)
───────────────────────────────────

User in csPlayer iframe
  │
  └──> Selects CSXU from dropdown (e.g., "facter.cs")
       │
       └──> csPlayer fetches CSXU metadata from PyCS
            │
            ├──> Available commands
            ├──> Parameter definitions
            ├──> Expected outputs
            └──> Documentation location
                 │
                 └──> csPlayer renders UI form based on metadata
                      │
                      └──> PostMessage to parent (Gatsby)
                           type: "CSXU_SELECTED"
                           csxuName: "facter.cs"
                           metadata: {...}


PHASE 3: GATSBY ORCHESTRATOR RECEIVES SELECTION
─────────────────────────────────────────────────

Message Bus in Gatsby
  │
  └──> Publishes "CSXU_SELECTED" event
       │
       ├──> Header.js subscriber
       │    │
       │    └──> Updates "Selected CSXU: facter.cs"
       │
       ├──> csxuInfo.js subscriber
       │    │
       │    └──> Fetches facter.cs README from GitHub
       │         │
       │         └──> Displays documentation
       │
       └──> csxuPythonSources.js subscriber
            │
            └──> Fetches facter.cs source from GitHub
                 │
                 └──> Displays code viewer


PHASE 4: USER CONFIGURES & EXECUTES CSXU (Moment 2)
─────────────────────────────────────────────────────

User in csPlayer iframe
  │
  └──> Fills in parameter values in rendered form
       │
       └──> Clicks "Execute" or "Schedule"
            │
            └──> csPlayer submits to PyCS with:
                 ├─ CSXU name: "facter.cs"
                 ├─ Parameters: {...}
                 ├─ Execution mode: execute | schedule
                 └─ Execution Context Object (ECO)
                      │
                      └──> PyCS submits to Airflow/Scheduler
                           │
                           ├─> Returns executionId
                           └─> Starts execution
                                │
                                └──> PostMessage to parent (Gatsby)
                                     type: "CSXU_EXECUTED"
                                     executionId: "exec-12345"
                                     csxuName: "facter.cs"
                                     dagId: "bisos-facter-gather"


PHASE 5: GATSBY NAVIGATES TO MONITORING
─────────────────────────────────────────

Message Bus in Gatsby
  │
  └──> Publishes "CSXU_EXECUTED" event
       │
       └──> Navigation handler receives event
            │
            └──> Navigates to Airflow page with context:
                 /airflow?executionId=exec-12345
                          &csxuName=facter.cs
                          &dagId=bisos-facter-gather
                 │
                 └──> Airflow page component
                      │
                      ├─> Parses URL parameters
                      │
                      ├─> Fetches DAG run status
                      │
                      └──> Displays:
                          ├─ Task graph
                          ├─ Real-time status
                          ├─ Log viewer
                          └─ Results export


PHASE 6: MONITORING & OBSERVABILITY
────────────────────────────────────

Airflow Page
  │
  ├──> Shows execution progress
  │
  └──> User clicks "View Metrics" or "Open Grafana"
       │
       └──> Navigates to Grafana page with context:
            /grafana?executionId=exec-12345
                     &csxuName=facter.cs
            │
            └──> Grafana Dashboard
                 │
                 ├─ Execution metrics
                 ├─ System metrics during execution
                 ├─ Performance data
                 └─ Resource utilization


PHASE 7: AUDIT & HISTORICAL TRACKING
──────────────────────────────────────

ECO (Execution Context Object) throughout workflow
  │
  ├─ Inputs:
  │  ├─ User identity
  │  ├─ CSXU name & version
  │  ├─ Parameters submitted
  │  └─ Timestamp
  │
  ├─ Execution:
  │  ├─ Start time
  │  ├─ Execution node/ring/rim
  │  ├─ Resource allocation
  │  └─ Progress events
  │
  └─ Outputs:
     ├─ Exit status
     ├─ Results data
     ├─ End time
     ├─ Audit log entry
     └─ For future compliance/forensics
              `}</pre>
            </div>
          </section>

          {/* 8. PAGES & FEATURES */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">
              csPlayer Pages & Features
            </h2>

            <h3 className="text-2xl font-semibold text-black mb-4">Home Page</h3>
            <p className="text-black mb-4">Landing page with service overview and navigation to all major components</p>

            <h3 className="text-2xl font-semibold text-black mb-4">csPlayer Service</h3>
            <p className="text-black mb-4">Embedded iframe running webCliGui for CSXU discovery, configuration, and execution</p>

            <h3 className="text-2xl font-semibold text-black mb-4">CSXU Info Page</h3>
            <p className="text-black mb-4">Displays documentation fetched from GitHub repositories, updates reactively on CSXU selection</p>

            <h3 className="text-2xl font-semibold text-black mb-4">Airflow & Grafana Pages</h3>
            <p className="text-black mb-6">Monitor CSXU execution progress, view task logs, and analyze system metrics during execution</p>
          </section>

          {/* 9. IMPLEMENTATION ROADMAP */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">
              Implementation Roadmap
            </h2>

            <h3 className="text-2xl font-semibold text-black mb-4">Phase 1: Foundation (Current)</h3>
            <ul className="text-black space-y-2 mb-6 pl-4">
              <li>✅ Orchestration layer with message bus</li>
              <li>✅ Menu structure and navigation</li>
              <li>✅ Home page with service overview</li>
              <li>✅ Dynamic content pages</li>
              <li>✅ Header with CSXU display</li>
              <li>✅ About section documentation</li>
            </ul>

            <h3 className="text-2xl font-semibold text-black mb-4">Phase 2: CSXU Integration (In Progress)</h3>
            <ul className="text-black space-y-2 mb-6 pl-4">
              <li>⏳ PostMessage listeners for selection and execution events</li>
              <li>⏳ Reactive page updates on CSXU selection</li>
              <li>⏳ Navigation to Airflow/Grafana on execution</li>
            </ul>

            <h3 className="text-2xl font-semibold text-black mb-4">Phase 3: Advanced Features</h3>
            <ul className="text-black space-y-2 pl-4">
              <li>⏳ Execution history tracking</li>
              <li>⏳ Execution template saving and reuse</li>
              <li>⏳ Advanced scheduling options</li>
              <li>⏳ Custom dashboards per CSXU</li>
            </ul>
          </section>

          {/* 10. KEY PRINCIPLES */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">
              Key Design Principles
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-400">
                <h4 className="text-lg font-semibold text-black mb-2">Meta-UI Paradigm</h4>
                <p className="text-black">
                  csPlayer adapts dynamically to CSXU self-describing metadata, making it universal for any compatible CSXU.
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-400">
                <h4 className="text-lg font-semibold text-black mb-2">Event-Driven Architecture</h4>
                <p className="text-black">
                  Components react to message bus events rather than direct coupling, enabling loose coupling and easy extension.
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-400">
                <h4 className="text-lg font-semibold text-black mb-2">Audit Trail First</h4>
                <p className="text-black">
                  All CSXU executions wrapped in Execution Context Objects for complete tracking from submission through completion.
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-400">
                <h4 className="text-lg font-semibold text-black mb-2">Privacy by Design</h4>
                <p className="text-black">
                  BISOS architecture prioritizes user control and ownership, enabling self-hosted deployments and portable service transfer.
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-400">
                <h4 className="text-lg font-semibold text-black mb-2">Service Composition</h4>
                <p className="text-black">
                  Complex operations composed from simple, reusable CSXUs rather than monolithic applications.
                </p>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <section className="mt-16 pt-8 border-t border-gray-300">
            <p className="text-gray-600 text-sm">
              This document serves as both a technical specification and educational resource for understanding
              the BISOS PyCS Web UI Player ecosystem.
            </p>
          </section>
        </article>
      </div>
    </Layout>
  )
}
