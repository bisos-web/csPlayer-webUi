import * as React from "react"
import Layout from "../../components/Layout"

export default function CSPlayers() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-8">
            csPlayers: Meta-UI Architecture
          </h1>

          {/* References Section */}
          <div className="bg-gray-100 rounded-lg p-6 mb-8 border border-gray-300">
            <p className="text-black font-semibold">
              📚 Reference: <a href="https://github.com/bisos-pip/csPlayer" className="text-blue-600 hover:text-blue-800 underline">github.com/bisos-pip/csPlayer</a>
            </p>
          </div>

          {/* What is csPlayer */}
          <h2 className="text-3xl font-bold text-black mb-4 mt-8">What is csPlayer?</h2>
          <p className="text-black mb-6">
            A <strong>meta-UI platform</strong> is a user interface that adapts dynamically to any CSXU (Command-Service Executable Unit) without requiring hard-coded integrations. Rather than building a new UI for each new command service, csPlayer uses self-describing metadata embedded in CSXU to render appropriate controls, validate inputs, execute commands, and present results.
          </p>

          {/* Architecture Stack Diagram */}
          <h2 className="text-3xl font-bold text-black mb-6 mt-8">PyCS Architecture Stack</h2>
          <div className="bg-gray-100 rounded-lg p-6 mb-8 border border-gray-300 font-mono text-sm overflow-x-auto">
            <pre className="text-black">{`PyCS Architecture Stack
═══════════════════════════════════════════════════════════

           Terminal User              Blee csPlayer         WebUI csPlayer
         (compgen completion)        (Emacs-based)        (this project)
                 ↑                         ↑                      ↑
                 └─────────────────┬───────┴──────────────────────┘
                                   │
                           ┌────────────────┐
                           │   csPlayer     │
                           │                │
                           │ (Meta-UI for   │
                           │  any CSXU)     │
                           │                │
                           │ github.com/    │
                           │ bisos-pip/     │
                           │ csPlayer       │
                           └────────────────┘
                                   ↑
                           ┌────────────────┐
                           │      CLI       │
                           │                │
                           │   (Execution   │
                           │    Layer)      │
                           └────────────────┘
                                   ↑
                    ┌───────────────────────────┐
                    │  CSXU (Python)            │
                    │  .cs executable           │
                    │                           │
                    │  Self-describing:         │
                    │  - Commands               │
                    │  - Parameters             │
                    │  - Descriptions           │
                    │  - Metadata               │
                    └───────────────────────────┘
                           ↙               ↘
                          ╱                 ╲
              ┌─────────────────┐  ┌────────────────┐
              │                 │  │                │
              │  Direct Mode    │  │  Service Mode  │
              │  (Local)        │  │  (Remote)      │
              │                 │  │                │
              └─────────────────┘  └────────────────┘`}</pre>
          </div>

          {/* Foundation */}
          <h2 className="text-3xl font-bold text-black mb-4 mt-8">The Foundation: Why Meta-UIs Are Possible</h2>
          <p className="text-black mb-4">
            Meta-UIs work because of two critical architectural patterns in PyCS:
          </p>
          <div className="space-y-4 mb-6">
            <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-400">
              <h3 className="font-bold text-black mb-2">ECO (Expectation Complete Operations)</h3>
              <p className="text-black">
                Every CSXU declares what it expects (input parameters, their types, valid values) and what it will complete (output structure, exit codes, results). This self-describing contract enables UIs to understand and adapt to any command without prior knowledge.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-400">
              <h3 className="font-bold text-black mb-2">Python b.Cmnd Framework</h3>
              <p className="text-black">
                The <code className="bg-gray-200 px-2 py-1 rounded">b.Cmnd</code> class automatically emits complete metadata about commands—parameter definitions, help text, validation rules, examples. This metadata flows from the command definition directly to any csPlayer without manual synchronization.
              </p>
            </div>
          </div>

          {/* Meta-UI Architecture */}
          <h2 className="text-3xl font-bold text-black mb-4 mt-8">Meta-UI Architecture Pattern</h2>
          <p className="text-black mb-4">
            Every csPlayer follows the same 5-step pattern:
          </p>
          <ol className="list-decimal pl-8 space-y-3 text-black mb-6">
            <li><strong>Discover:</strong> Locate available CSXU and retrieve their metadata</li>
            <li><strong>Parse Metadata:</strong> Extract commands, parameters, types, validation rules, and descriptions</li>
            <li><strong>Render Dynamically:</strong> Build appropriate UI controls (text fields, dropdowns, file pickers) based on parameter definitions</li>
            <li><strong>Validate & Execute:</strong> Confirm inputs match metadata rules, then invoke the CSXU</li>
            <li><strong>Present Results:</strong> Display output in a format appropriate for the UI modality (terminal, Emacs buffer, web page)</li>
          </ol>

          {/* csPlayer Implementations */}
          <h2 className="text-3xl font-bold text-black mb-4 mt-8">csPlayer Implementations</h2>
          <p className="text-black mb-6">
            Rather than hard-coded integrations with workflow tools like Airflow or Grafana, csPlayer works by implementing the meta-UI pattern in different modalities:
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-gray-100 rounded-lg p-6 border border-gray-300">
              <h3 className="text-2xl font-bold text-black mb-3">1. Bash Command-Line Completion csPlayer</h3>
              <p className="text-black mb-3">
                <strong>User Interaction:</strong> Terminal user types a command and presses TAB for completion suggestions.
              </p>
              <p className="text-black mb-3">
                <strong>How It Works:</strong> The <code className="bg-gray-200 px-2 py-1 rounded">compgen</code> framework discovers available CSXU, parses their parameter metadata, and generates bash completion functions dynamically. As the user types, bash completion suggests valid options, parameters, and arguments.
              </p>
              <p className="text-black">
                <strong>Implementation Reference:</strong> See <code className="bg-gray-200 px-2 py-1 rounded">csxuFps_csu.py</code> for how Python commands expose metadata to bash completion systems.
              </p>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 border border-gray-300">
              <h3 className="text-2xl font-bold text-black mb-3">2. Blee csPlayer (Emacs-based)</h3>
              <p className="text-black mb-3">
                <strong>User Interaction:</strong> Emacs developer uses an interactive menu to browse available CSXU, fill in parameters, and execute commands directly from the editor.
              </p>
              <p className="text-black mb-3">
                <strong>How It Works:</strong> The Blee environment queries CSXU metadata and renders interactive Emacs buffers with forms for parameter entry. Parameters have validation, help text, and defaults—all derived from the CSXU metadata. Results appear in an Emacs buffer for further processing.
              </p>
              <p className="text-black">
                <strong>User Benefit:</strong> Developers never leave Emacs; every available CSXU is accessible through a consistent meta-UI interface.
              </p>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 border border-gray-300">
              <h3 className="text-2xl font-bold text-black mb-3">3. WebUI csPlayer (This Project)</h3>
              <p className="text-black mb-3">
                <strong>User Interaction:</strong> Web browser user navigates a rich web interface to discover, configure, and execute any CSXU.
              </p>
              <p className="text-black mb-3">
                <strong>How It Works:</strong> This Gatsby-based web UI queries the PyCS Service Mode API to fetch CSXU metadata. For each CSXU, it dynamically renders React components appropriate for each parameter type (input fields for strings, sliders for ranges, dropdown selects for enums, file pickers for paths). Form validation happens in real-time using rules from metadata. Upon submission, the UI invokes the CSXU via PyCS API and displays results in formatted web components.
              </p>
              <p className="text-black">
                <strong>User Benefit:</strong> Non-developers access complex command services through an intuitive web interface without needing terminal skills or documentation memorization.
              </p>
            </div>
          </div>

          {/* Metadata-Driven Rendering Example */}
          <h2 className="text-3xl font-bold text-black mb-4 mt-8">Metadata-Driven Rendering</h2>
          <p className="text-black mb-4">
            The same CSXU metadata renders completely differently across csPlayer implementations:
          </p>
          <div className="bg-gray-100 rounded-lg p-6 mb-6 border border-gray-300">
            <p className="text-black font-mono mb-4">
              Example CSXU metadata: facter.cs with a parameter <code className="bg-gray-200 px-2 py-1 rounded">--format</code> that accepts [json, yaml, xml]
            </p>
            <ul className="space-y-3 text-black">
              <li>
                <strong>Terminal (compgen):</strong> Tab-completion suggests "json", "yaml", "xml" as completion options
              </li>
              <li>
                <strong>Emacs (Blee):</strong> Interactive prompt with a radio button group or dropdown menu
              </li>
              <li>
                <strong>Web (This Project):</strong> HTML select dropdown with visual styling and label
              </li>
            </ul>
          </div>

          {/* Extensibility */}
          <h2 className="text-3xl font-bold text-black mb-4 mt-8">Extensibility: Future csPlayer Possibilities</h2>
          <p className="text-black mb-6">
            The meta-UI pattern can extend to any platform that can:
          </p>
          <ul className="list-disc pl-8 space-y-2 text-black mb-6">
            <li>Query CSXU metadata (via API, filesystem, or RPC)</li>
            <li>Render UI controls based on parameter definitions</li>
            <li>Execute commands and capture output</li>
          </ul>
          <p className="text-black mb-6">
            Future csPlayer implementations could include: mobile apps, voice interfaces, workflow orchestration dashboards, IDE plugins, chat bots, and more.
          </p>

          {/* Key Principles */}
          <h2 className="text-3xl font-bold text-black mb-4 mt-8">Key Principles</h2>
          <div className="space-y-3 mb-8">
            <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-400">
              <p className="text-black"><strong>Write Once/Deploy Everywhere:</strong> Define a CSXU once; it immediately works in terminal, Emacs, web, and any future csPlayer implementation.</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-400">
              <p className="text-black"><strong>Metadata Over Hard-Coding:</strong> UIs don't encode knowledge about specific commands. They generically render based on metadata.</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-400">
              <p className="text-black"><strong>ECO-Driven Design:</strong> Every command declares expectations and completions; every UI reads those contracts.</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-400">
              <p className="text-black"><strong>Modality Agnostic:</strong> CSXU are pure command services—they don't know (or care) which UI is invoking them.</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-400">
              <p className="text-black"><strong>Zero Integration Cost:</strong> Adding a new CSXU to any csPlayer requires zero code changes in the UI—it automatically appears with appropriate controls.</p>
            </div>
          </div>

          {/* Big Picture */}
          <h2 className="text-3xl font-bold text-black mb-4 mt-8">The Big Picture</h2>
          <div className="bg-gray-100 rounded-lg p-6 border border-gray-300 mb-8">
            <p className="text-black mb-4">
              <strong>Traditional Approach:</strong> Each new service requires building a UI from scratch (web form, dashboard panel, API client, etc.). Every UI hard-codes knowledge about specific services. Adding a service means modifying every UI.
            </p>
            <p className="text-black">
              <strong>csPlayer Approach:</strong> Define services once using the PyCS/CSXU pattern. Every csPlayer (terminal, Emacs, web, future modalities) automatically gains access to every service through their universal metadata contracts. Add a new service = it immediately appears everywhere.
            </p>
          </div>

        </article>
      </div>
    </Layout>
  )
}
