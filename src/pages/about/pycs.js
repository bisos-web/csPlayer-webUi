import * as React from "react"
import Layout from "../../components/Layout"

export default function PyCS() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
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
            <p className="text-xl text-black mb-6">
              PyCS is a unified framework that bridges command-line interfaces (CLI) and remote services,
              enabling Python-based executable units to be invoked either locally via the terminal or
              remotely through web services and APIs.
            </p>
          </section>

          {/* ============================================================ */}
          {/* CORE PURPOSE */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Core Purpose</h2>
            <p className="text-black mb-6">
              PyCS solves a fundamental problem: how do you execute the same business logic both from
              the command line (for scripting and automation) and from remote services (for web UIs and
              distributed systems) without duplicating code?
            </p>
            <p className="text-black mb-6">
              The answer is PyCS—a framework that lets you write executable units once and access them
              through multiple interfaces:
            </p>
            <div className="bg-gray-100 rounded-lg p-6 border border-gray-300 border-opacity-20 space-y-3">
              <div className="flex gap-4">
                <span className="text-black font-bold min-w-fit">CLI Mode:</span>
                <span className="text-black">Invoke directly from terminal or scripts</span>
              </div>
              <div className="flex gap-4">
                <span className="text-black font-bold min-w-fit">Service Mode:</span>
                <span className="text-black">Invoke remotely via APIs and web services</span>
              </div>
              <div className="flex gap-4">
                <span className="text-black font-bold min-w-fit">Single Codebase:</span>
                <span className="text-black">No code duplication between modes</span>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* KEY CONCEPTS */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Key Concepts</h2>

            <h3 className="text-2xl font-semibold text-black mb-4">CSXU - Command-Service eXecution Unit</h3>
            <p className="text-black mb-6">
              A CSXU is a Python executable file ending in <span className="font-mono text-black">.cs</span> that
              implements the PyCS contract. It is the basic building block of PyCS.
            </p>

            <h3 className="text-2xl font-semibold text-black mb-4">Self-Describing Metadata</h3>
            <p className="text-black mb-6">
              Each CSXU emits metadata describing itself:
            </p>
            <ul className="text-black space-y-2 pl-8 mb-6 list-disc">
              <li><strong>Commands:</strong> Available operations the CSXU can perform</li>
              <li><strong>Parameters:</strong> Input arguments with types and descriptions</li>
              <li><strong>Parameter Definitions:</strong> Constraints, defaults, valid values</li>
              <li><strong>Output Formats:</strong> Expected result structures</li>
              <li><strong>Documentation:</strong> Help text and usage examples</li>
            </ul>

            <h3 className="text-2xl font-semibold text-black mb-4">ECO - Execution Context Object</h3>
            <p className="text-black mb-6">
              All CSXU executions are wrapped in an Execution Context Object that contains:
            </p>
            <ul className="text-black space-y-2 pl-8 mb-6 list-disc">
              <li><strong>User Identity:</strong> Who is executing the CSXU</li>
              <li><strong>Permissions:</strong> What operations the user is allowed to perform</li>
              <li><strong>Execution Environment:</strong> Runtime variables and configuration</li>
              <li><strong>Audit Trail:</strong> Logging and traceability of execution</li>
            </ul>
          </section>

          {/* ============================================================ */}
          {/* DUAL ACCESS MODEL */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Dual Access Model</h2>

            <h3 className="text-xl font-semibold text-black mb-4">1. CLI Access</h3>
            <p className="text-black mb-4">
              CSXUs can be executed directly from the command line:
            </p>
            <div className="bg-gray-100 rounded-lg p-4 mb-6 border border-gray-300 font-mono text-sm text-black overflow-x-auto">
              <p>$ facter.cs -i list-facts --format=json</p>
            </div>

            <h3 className="text-xl font-semibold text-black mb-4">2. Service Access</h3>
            <p className="text-black mb-4">
              The same CSXU can be accessed through web services and remote APIs:
            </p>
            <div className="bg-gray-100 rounded-lg p-4 border border-gray-300 font-mono text-sm text-black overflow-x-auto">
              <p>POST /api/csxu/facter.cs/list-facts</p>
              <pre>{`{"format": "json"}`}</pre>
            </div>
          </section>

          {/* ============================================================ */}
          {/* INSTALLATION & DEPLOYMENT */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Installation & Deployment</h2>
            <p className="text-black mb-6">
              PyCS CSXUs are distributed as standard Python packages via PyPI:
            </p>
            <div className="bg-gray-100 rounded-lg p-4 border border-gray-300 font-mono text-sm text-black overflow-x-auto mb-6">
              <p>$ pip install bisos.facter</p>
            </div>
            <p className="text-black">
              Once installed, the CSXU is immediately available for both CLI and service invocation.
            </p>
          </section>

          {/* ============================================================ */}
          {/* EXECUTION LIFECYCLE */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">PyCS Execution Lifecycle</h2>
            <pre className="bg-gray-100 rounded-lg p-4 border border-gray-300 font-mono text-sm text-black overflow-x-auto">{`
Phase 1: Discovery
├─ Client requests CSXU metadata
├─ PyCS queries .cs file for capabilities
└─ Metadata returned (commands, parameters, formats)

Phase 2: Preparation
├─ User selects command and provides parameters
├─ PyCS validates input against metadata
└─ Execution Context Object created

Phase 3: Execution
├─ PyCS instantiates and invokes CSXU
├─ Command executes with provided parameters
└─ Results generated

Phase 4: Delivery
├─ Results formatted per specification
├─ Audit trail updated
└─ Response returned to client

Phase 5: Persistence
├─ ECO persisted
├─ Audit logs recorded
└─ Results archived
            `}</pre>
          </section>

          {/* ============================================================ */}
          {/* ARCHITECTURE BENEFITS */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Architecture Benefits</h2>
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-300">
                <h4 className="text-lg font-semibold text-black mb-2">🎯 Single Source of Truth</h4>
                <p className="text-black">
                  One codebase serves both CLI and service interfaces—no duplication, easier maintenance.
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-300">
                <h4 className="text-lg font-semibold text-black mb-2">🔍 Self-Describing</h4>
                <p className="text-black">
                  CSXUs emit their own metadata, enabling runtime discovery and dynamic UI adaptation.
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-300">
                <h4 className="text-lg font-semibold text-black mb-2">🎨 Meta-UI Adaptation</h4>
                <p className="text-black">
                  Self-describing metadata enables generic UIs to automatically adapt to any CSXU without hard-coding.
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-300">
                <h4 className="text-lg font-semibold text-black mb-2">📦 Package Distribution</h4>
                <p className="text-black">
                  Distribute CSXUs as standard Python packages via PyPI for easy installation and updates.
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-300">
                <h4 className="text-lg font-semibold text-black mb-2">🔐 Security</h4>
                <p className="text-black">
                  Execution Context includes user identity and permissions, enabling fine-grained access control.
                </p>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* REAL-WORLD EXAMPLE */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Real-World Example: facter.cs</h2>

            <p className="text-black mb-6">
              The <span className="font-mono text-black">facter.cs</span> CSXU from bisos.facter
              demonstrates PyCS in action:
            </p>

            <h3 className="text-xl font-semibold text-black mb-4">CLI Usage</h3>
            <div className="bg-gray-100 rounded-lg p-4 mb-6 border border-gray-300 font-mono text-sm text-black overflow-x-auto">
              <p>$ facter.cs --list-facts</p>
              <p>kernel.name: Linux</p>
              <p>os.name: Ubuntu</p>
              <p>processor.count: 8</p>
            </div>

            <h3 className="text-xl font-semibold text-black mb-4">Service Usage (via csPlayer Web UI)</h3>
            <p className="text-black mb-4">
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
