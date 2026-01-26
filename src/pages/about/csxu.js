import * as React from "react"
import Layout from "../../components/Layout"

export default function CSXU() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            CSXU - Command-Service eXecution Unit
          </h1>

          {/* ============================================================ */}
          {/* REFERENCES */}
          {/* ============================================================ */}
          <section className="mb-12 pb-8 border-b border-gray-300">
            <div className="bg-gray-100 rounded-lg p-6 border border-gray-300">
              <p className="text-black mb-4">
                For CSXU framework reference, implementations, and examples:
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

          <section className="mb-12">
            <p className="text-xl text-black mb-6">
              A CSXU is a self-contained, self-describing Python executable unit that can be invoked either 
              from the command line or through remote services and web UIs. It is the fundamental building block 
              of the PyCS framework.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">What is a CSXU?</h2>
            <p className="text-black mb-6">
              CSXU stands for Command-Service eXecution Unit. It represents a single, self-contained unit of 
              executable functionality that can be accessed through multiple interfaces:
            </p>
            <ul className="text-black space-y-2 pl-8 mb-6 list-disc">
              <li><strong>From the CLI:</strong> As a command-line executable</li>
              <li><strong>From web services:</strong> Via remote APIs and service calls</li>
              <li><strong>From web UIs:</strong> Through meta-UIs like csPlayer</li>
              <li><strong>From other CSXUs:</strong> By composition and chaining</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">CSXU Command Line Structure</h2>
            <p className="text-black mb-6">
              CSXUs follow a consistent command-line interface pattern:
            </p>
            <div className="bg-gray-100 rounded-lg p-6 border border-gray-300 font-mono text-sm text-black overflow-x-auto mb-6">
              <p>csxu.cs -i <span className="font-bold">commandName</span> --param=<span className="font-bold">value</span> <span className="font-bold">arg1</span> <span className="font-bold">argN</span></p>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-black mb-2">Parameters Explained:</h4>
                <ul className="text-black space-y-2 pl-8 list-disc">
                  <li><strong>csxu.cs</strong> - The CSXU executable file (ends in .cs)</li>
                  <li><strong>-i commandName</strong> - The command to execute within the CSXU</li>
                  <li><strong>--param=value</strong> - Named parameters using --key=value syntax</li>
                  <li><strong>arg1 argN</strong> - Positional arguments</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-black mb-2">Example:</h4>
                <div className="bg-gray-100 rounded-lg p-4 border border-gray-300 font-mono text-sm text-black overflow-x-auto">
                  <p>$ facter.cs -i list-facts --format=json --filter=kernel</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Key Characteristics</h2>

            <h3 className="text-2xl font-semibold text-black mb-4">Self-Describing</h3>
            <p className="text-black mb-6">
              Each CSXU emits metadata describing itself without requiring external configuration:
            </p>
            <ul className="text-black space-y-2 pl-8 mb-6 list-disc">
              <li>Available commands and operations</li>
              <li>Parameter definitions (types, constraints, descriptions)</li>
              <li>Expected output formats</li>
              <li>Help text and usage examples</li>
            </ul>

            <h3 className="text-2xl font-semibold text-black mb-4">Single Responsibility</h3>
            <p className="text-black mb-6">
              Each CSXU focuses on one cohesive area of functionality, following Unix philosophy. 
              Complex operations are built by composing multiple CSXUs.
            </p>

            <h3 className="text-2xl font-semibold text-black mb-4">Portable</h3>
            <p className="text-black mb-6">
              CSXUs are packaged as standard Python packages via PyPI, making them easy to install, 
              update, and deploy across different environments.
            </p>

            <h3 className="text-2xl font-semibold text-black mb-4">Auditable</h3>
            <p className="text-black mb-6">
              All CSXU executions are wrapped in Execution Context Objects (ECO) that track user identity, 
              parameters, execution time, and results for compliance and debugging.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Naming Convention</h2>
            <p className="text-black mb-6">
              CSXU filenames end with <span className="font-mono text-black">.cs</span> to distinguish them from regular Python scripts:
            </p>
            <ul className="text-black space-y-2 pl-8 mb-6 list-disc">
              <li><span className="font-mono">facter.cs</span> - System facts gathering</li>
              <li><span className="font-mono">mail.cs</span> - Email service management</li>
              <li><span className="font-mono">provision.cs</span> - Infrastructure provisioning</li>
              <li><span className="font-mono">cmdb.cs</span> - Configuration management database</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">CSXU Lifecycle</h2>
            <div className="bg-gray-100 rounded-lg p-6 border border-gray-300 font-mono text-sm text-black overflow-x-auto">
              <pre>{`
1. DISCOVERY
   ├─ CSXU queried for available commands
   ├─ Metadata emitted
   └─ Caller/UI adapts to CSXU capabilities

2. INVOCATION
   ├─ Parameters validated against metadata
   ├─ Execution Context Object created
   └─ CSXU handler invoked

3. EXECUTION
   ├─ Business logic runs
   ├─ Progress tracked in ECO
   └─ Results collected

4. COMPLETION
   ├─ Exit status determined
   ├─ Results formatted
   ├─ ECO finalized
   └─ Results returned to caller

5. AUDIT
   ├─ ECO persisted
   ├─ Audit logs recorded
   └─ Results archived
              `}</pre>
            </div>
          </section>
        </article>
      </div>
    </Layout>
  )
}
