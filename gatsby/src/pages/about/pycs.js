import * as React from "react"
import Layout from "../../components/Layout"

export default function PyCS() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold text-bystar-light-mint mb-4">
            PyCS - Python Command Services
          </h1>

          {/* ============================================================ */}
          {/* REFERENCES */}
          {/* ============================================================ */}
          <section className="mb-12 pb-8 border-b border-gray-300">
            <div className="bg-gray-100 rounded-lg p-6 border border-gray-300">
              <p className="text-black mb-4">
                For the PyCS framework source code, implementations, and additional modules:
              </p>
              <a
                href="https://github.com/bisos-pip/b"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-black bg-opacity-10 border border-black rounded hover:bg-opacity-20 transition-all text-black font-semibold"
              >
                🔗 github.com/bisos-pip/b
              </a>
            </div>
          </section>

          {/* ============================================================ */}
          {/* INTRODUCTION */}
          {/* ============================================================ */}
          <section className="mb-12">
            <p className="text-xl text-gray-300 mb-6">
              PyCS is a unified framework that bridges command-line interfaces (CLI) and remote services,
              enabling Python-based executable units to be invoked either locally via the terminal or
              remotely through web services and APIs.
            </p>
          </section>

          {/* ============================================================ */}
          {/* CORE PURPOSE */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-bystar-light-mint mb-6">Core Purpose</h2>
            <p className="text-gray-300 mb-6">
              PyCS solves a fundamental problem: how do you execute the same business logic both from
              the command line (for scripting and automation) and from remote services (for web UIs and
              distributed systems) without duplicating code?
            </p>
            <p className="text-gray-300 mb-6">
              The answer is PyCS—a framework that lets you write executable units once and access them
              through multiple interfaces:
            </p>
            <div className="bg-gray-900 rounded-lg p-6 border border-bystar-light-mint border-opacity-20 space-y-3">
              <div className="flex gap-4">
                <span className="text-bystar-light-mint font-bold min-w-fit">CLI Mode:</span>
                <span className="text-gray-300">Invoke directly from terminal or scripts</span>
              </div>
              <div className="flex gap-4">
                <span className="text-bystar-light-mint font-bold min-w-fit">Service Mode:</span>
                <span className="text-gray-300">Invoke remotely via APIs and web services</span>
              </div>
              <div className="flex gap-4">
                <span className="text-bystar-light-mint font-bold min-w-fit">Single Codebase:</span>
                <span className="text-gray-300">No code duplication between modes</span>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* KEY CONCEPTS */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-bystar-light-mint mb-6">Key Concepts</h2>

            <h3 className="text-2xl font-semibold text-white mb-4">CSXU - Command-Service eXecution Unit</h3>
            <p className="text-gray-300 mb-6">
              A CSXU is a Python executable file ending in <span className="font-mono text-bystar-light-mint">.cs</span> that
              implements the PyCS contract. It is the basic building block of PyCS.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-4">Self-Describing Metadata</h3>
            <p className="text-gray-300 mb-6">
              Each CSXU emits metadata describing itself:
            </p>
            <ul className="text-gray-300 space-y-2 pl-8 mb-6 list-disc">
              <li><strong>Commands:</strong> Available operations the CSXU can perform</li>
              <li><strong>Parameters:</strong> Input arguments with types and descriptions</li>
              <li><strong>Parameter Definitions:</strong> Constraints, defaults, valid values</li>
              <li><strong>Output Formats:</strong> Expected result structures</li>
              <li><strong>Documentation:</strong> Help text and usage examples</li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mb-4">ECO - Execution Context Object</h3>
            <p className="text-gray-300 mb-6">
              All CSXU executions are wrapped in an Execution Context Object that contains:
            </p>
            <ul className="text-gray-300 space-y-2 pl-8 mb-6 list-disc">
              <li><strong>Input Context:</strong> User identity, parameters, environment</li>
              <li><strong>Execution Metadata:</strong> Start time, execution node, resource allocation</li>
              <li><strong>Output Context:</strong> Results, exit status, end time</li>
              <li><strong>Audit Trail:</strong> Complete record for compliance and debugging</li>
            </ul>
          </section>

          {/* ============================================================ */}
          {/* DUAL ACCESS MODEL */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-bystar-light-mint mb-6">Dual Access Model</h2>

            <h3 className="text-2xl font-semibold text-white mb-4">1. CLI Mode (Local Execution)</h3>
            <div className="bg-gray-900 rounded-lg p-4 mb-6 border border-bystar-light-mint border-opacity-20 font-mono text-sm text-gray-300 overflow-x-auto">
              <p>$ facter.cs --list-facts</p>
              <p>$ facter.cs --fact kernel.name</p>
            </div>
            <p className="text-gray-300 mb-6">
              Users invoke CSXU directly as command-line tools, passing parameters as arguments.
              Output is displayed directly to the terminal.
            </p>

            <h3 className="text-2xl font-semibold text-black mb-4">2. Service Mode (Remote Execution)</h3>
            <div className="bg-gray-100 rounded-lg p-4 mb-6 border border-gray-300 font-mono text-sm text-black overflow-x-auto">
              <p className="text-black">POST /execute</p>
              <p>Body:</p>
              <pre>{`{
  "csxu": "facter.cs",
  "command": "list-facts",
  "parameters": { ... },
  "executionContext": { ... }
}`}</pre>
            </div>
            <p className="text-gray-300 mb-6">
              Remote clients (like web UIs, APIs, other services) submit execution requests via
              network protocols. Results are returned in structured formats (JSON, etc).
            </p>
          </section>

          {/* ============================================================ */}
          {/* INSTALLATION & DEPLOYMENT */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-bystar-light-mint mb-6">Installation & Deployment</h2>

            <h3 className="text-2xl font-semibold text-white mb-4">PyPI Distribution</h3>
            <p className="text-gray-300 mb-6">
              PyCS modules are packaged as Python packages on PyPI for easy distribution:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 mb-6 border-l-4 border-bystar-light-mint font-mono text-sm text-gray-300">
              <p>$ pipx install bisos.facter</p>
              <p className="text-gray-400 mt-3">
                ↓ Installs the bisos.facter module from PyPI, which includes all contained CSXUs and their metadata
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-4">Module Structure</h3>
            <p className="text-gray-300 mb-6">
              Each PyCS module (e.g., bisos.facter) contains:
            </p>
            <ul className="text-gray-300 space-y-2 pl-8 mb-6 list-disc">
              <li>One or more CSXU executables (.cs files)</li>
              <li>CSXU metadata definitions</li>
              <li>Python library code supporting the CSXUs</li>
              <li>Documentation and examples</li>
            </ul>
          </section>

          {/* ============================================================ */}
          {/* EXECUTION FLOW */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-bystar-light-mint mb-6">Execution Flow</h2>

            <div className="bg-gray-900 rounded-lg p-6 border border-bystar-light-mint border-opacity-20 font-mono text-sm overflow-x-auto mb-6">
              <pre className="text-bystar-light-mint">{`
PyCS Execution Lifecycle
════════════════════════════════════════════════════════

1. DISCOVERY
   ├─ CSXU reports available commands
   ├─ Metadata emitted (parameters, types, descriptions)
   └─ Client/UI adapts to CSXU capabilities

2. INVOCATION
   ├─ Input parameters validated against metadata
   ├─ Execution Context Object created
   └─ CSXU handler invoked with validated parameters

3. EXECUTION
   ├─ Business logic runs
   ├─ Progress tracked in ECO
   ├─ Resources allocated as needed
   └─ Results collected

4. COMPLETION
   ├─ Exit status determined
   ├─ Results packaged in output format
   ├─ ECO finalized with audit info
   └─ Results returned to caller

5. AUDIT & MONITORING
   ├─ ECO persisted for compliance
   ├─ Metrics recorded
   ├─ Logs accessible
   └─ Results exportable
              `}</pre>
            </div>
          </section>

          {/* ============================================================ */}
          {/* ARCHITECTURE BENEFITS */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-bystar-light-mint mb-6">Architecture Benefits</h2>

            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-bystar-light-mint">
                <h4 className="text-lg font-semibold text-bystar-light-mint mb-2">🎯 Single Implementation</h4>
                <p className="text-gray-300">
                  Write business logic once; access it from CLI, web UI, APIs, and other services without duplication.
                </p>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-bystar-light-mint">
                <h4 className="text-lg font-semibold text-bystar-light-mint mb-2">🔄 Composability</h4>
                <p className="text-gray-300">
                  Chain CSXUs together to create complex workflows. Simple units combine into powerful operations.
                </p>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-bystar-light-mint">
                <h4 className="text-lg font-semibold text-bystar-light-mint mb-2">📊 Audit & Compliance</h4>
                <p className="text-gray-300">
                  Execution Context Objects provide complete audit trails for regulatory compliance and debugging.
                </p>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-bystar-light-mint">
                <h4 className="text-lg font-semibold text-bystar-light-mint mb-2">🎨 Meta-UI Adaptation</h4>
                <p className="text-gray-300">
                  Self-describing metadata enables generic UIs to automatically adapt to any CSXU without hard-coding.
                </p>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-bystar-light-mint">
                <h4 className="text-lg font-semibold text-bystar-light-mint mb-2">📦 Package Distribution</h4>
                <p className="text-gray-300">
                  Distribute CSXUs as standard Python packages via PyPI for easy installation and updates.
                </p>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-bystar-light-mint">
                <h4 className="text-lg font-semibold text-bystar-light-mint mb-2">🔐 Security</h4>
                <p className="text-gray-300">
                  Execution Context includes user identity and permissions, enabling fine-grained access control.
                </p>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* REAL-WORLD EXAMPLE */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-bystar-light-mint mb-6">Real-World Example: facter.cs</h2>

            <p className="text-gray-300 mb-6">
              The <span className="font-mono text-bystar-light-mint">facter.cs</span> CSXU from bisos.facter
              demonstrates PyCS in action:
            </p>

            <h3 className="text-xl font-semibold text-white mb-4">CLI Usage</h3>
            <div className="bg-gray-900 rounded-lg p-4 mb-6 border border-bystar-light-mint border-opacity-20 font-mono text-sm text-gray-300 overflow-x-auto">
              <p>$ facter.cs --list-facts</p>
              <p>kernel.name: Linux</p>
              <p>os.name: Ubuntu</p>
              <p>processor.count: 8</p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">Service Usage (via csPlayer Web UI)</h3>
            <p className="text-gray-300 mb-4">
              User selects facter.cs in the web UI → PyCS reports available commands and parameters →
              UI renders appropriate form fields → User submits request → csPlayer sends to PyCS backend →
              facter.cs executes → Results displayed with audit trail.
            </p>
          </section>

        </article>
      </div>
    </Layout>
  )
}
