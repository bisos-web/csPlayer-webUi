import * as React from "react"
import Layout from "../../components/Layout"

export default function BISOS() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            BISOS-CSXUs
          </h1>

          {/* ============================================================ */}
          {/* REFERENCES */}
          {/* ============================================================ */}
          <section className="mb-12 pb-8 border-b border-gray-300">
            <div className="bg-gray-100 rounded-lg p-6 border border-gray-300">
              <p className="text-black mb-4">
                For BISOS framework reference, implementations, and getting started:
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://github.com/bisos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-black bg-opacity-10 border border-black rounded hover:bg-opacity-20 transition-all text-black font-semibold w-fit"
                >
                  🔗 github.com/bisos
                </a>
                <a
                  href="https://github.com/bxgenesis/start"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-black bg-opacity-10 border border-black rounded hover:bg-opacity-20 transition-all text-black font-semibold w-fit"
                >
                  🔗 github.com/bxgenesis/start
                </a>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* SCOPE NOTE */}
          {/* ============================================================ */}
          <section className="mb-12 p-4 bg-gray-100 rounded-lg border-l-4 border-gray-300">
            <p className="text-black font-semibold mb-2">📌 Scope Note:</p>
            <p className="text-black">
              This page focuses on the aspects of BISOS that relate to PyCS and CSXU, and their role in 
              enabling csPlayer implementations. It does not cover BPO (Portable Objects), PALS (Possession 
              Assertable Services), Rims, or Rings—those are separate architectural components outside the 
              scope of this introduction.
            </p>
          </section>

          {/* ============================================================ */}
          {/* INTRODUCTION */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">What is BISOS?</h2>
            <div className="bg-gray-100 rounded-lg p-6 border border-gray-300 mb-6">
              <p className="text-black font-semibold mb-3">
                BISOS: (By* Internet Services Operating System) is a unified and universal framework for 
                developing both internet services and software-service continuums that use internet services.
              </p>
            </div>
            <p className="text-black mb-6">
              BISOS provides a comprehensive foundation for building services that operate across internet 
              boundaries. Within this framework, CSXU (Command-Service eXecution Unit) serves as the fundamental 
              executable unit that embodies the principles of BISOS—enabling code to run both as CLI tools and 
              as remotely-invoked services.
            </p>
          </section>

          {/* ============================================================ */}
          {/* BISOS & CSXU RELATIONSHIP */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">BISOS & CSXU Relationship</h2>
            
            <h3 className="text-2xl font-semibold text-black mb-4">The Foundation</h3>
            <p className="text-black mb-6">
              BISOS is the architectural framework; CSXU is the practical implementation pattern. Every CSXU 
              embodies BISOS principles by being:
            </p>
            <ul className="text-black space-y-3 pl-8 mb-6 list-disc">
              <li>
                <strong>Self-Describing:</strong> CSXUs emit their own metadata, enabling dynamic discovery 
                and adaptation—a core BISOS principle
              </li>
              <li>
                <strong>Dual-Mode:</strong> CSXUs execute both locally (CLI) and remotely (services), aligning 
                with BISOS's unified service architecture
              </li>
              <li>
                <strong>Composable:</strong> CSXUs can invoke other CSXUs, building service continuums as BISOS 
                intended
              </li>
              <li>
                <strong>Auditable:</strong> Every CSXU execution is wrapped in an Execution Context Object with 
                audit trails, supporting BISOS's security and accountability requirements
              </li>
            </ul>
          </section>

          {/* ============================================================ */}
          {/* BISOS OPERATING ENVIRONMENT */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">BISOS Operating Environment</h2>
            
            <h3 className="text-2xl font-semibold text-black mb-4">Debian-Based Foundation</h3>
            <p className="text-black mb-6">
              BISOS operates on Debian-based Linux systems, leveraging the stability and standardization 
              of the Debian ecosystem. This provides:
            </p>
            <ul className="text-black space-y-2 pl-8 mb-6 list-disc">
              <li>Standardized package management via apt</li>
              <li>Consistent system utilities and tools</li>
              <li>Wide deployment compatibility</li>
              <li>Strong community and security updates</li>
            </ul>

            <h3 className="text-2xl font-semibold text-black mb-4">Python as the Primary Language</h3>
            <p className="text-black mb-6">
              While BISOS services can use multiple languages, Python is the primary implementation language 
              for CSXUs because it:
            </p>
            <ul className="text-black space-y-2 pl-8 mb-6 list-disc">
              <li>Provides excellent cross-platform portability</li>
              <li>Supports both CLI and service modes naturally</li>
              <li>Enables rapid prototyping and development</li>
              <li>Integrates seamlessly with system tools and utilities</li>
              <li>Supports PyPI-based distribution (see PyCS)</li>
            </ul>
          </section>

          {/* ============================================================ */}
          {/* BISOS-SITE CONCEPT */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">BISOS-Site Concept</h2>
            
            <p className="text-black mb-6">
              A BISOS-Site represents a configured BISOS environment—essentially a Debian system running 
              specific BISOS services and CSXUs. Within a BISOS-Site:
            </p>
            <ul className="text-black space-y-3 pl-8 mb-6 list-disc">
              <li>
                <strong>Services are installed:</strong> CSXUs are installed as Python packages (via pip/PyPI)
              </li>
              <li>
                <strong>Services are discoverable:</strong> The BISOS infrastructure can discover and catalog 
                available CSXUs
              </li>
              <li>
                <strong>Services interact:</strong> CSXUs can invoke other CSXUs, building service chains and 
                workflows
              </li>
              <li>
                <strong>Services are auditable:</strong> Execution Context Objects track who did what, when, and 
                with what permissions
              </li>
            </ul>
          </section>

          {/* ============================================================ */}
          {/* CSXU DEPLOYMENT */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">CSXU Deployment in BISOS</h2>
            
            <p className="text-black mb-6">
              CSXUs are deployed within BISOS using standard Python package distribution:
            </p>

            <h3 className="text-xl font-semibold text-black mb-4">Installation</h3>
            <div className="bg-gray-100 rounded-lg p-4 mb-6 border border-gray-300 font-mono text-sm text-black overflow-x-auto">
              <p>$ pip install bisos.facter</p>
              <p>$ pip install bisos.mail</p>
              <p>$ pip install bisos.provision</p>
            </div>

            <h3 className="text-xl font-semibold text-black mb-4">Discovery</h3>
            <p className="text-black mb-6">
              Once installed, BISOS tools can discover the CSXU by:
            </p>
            <ul className="text-black space-y-2 pl-8 mb-6 list-disc">
              <li>Querying the Python package for its entry points</li>
              <li>Requesting the CSXU's self-describing metadata</li>
              <li>Registering it in the local BISOS service catalog</li>
            </ul>

            <h3 className="text-xl font-semibold text-black mb-4">Invocation</h3>
            <p className="text-black mb-6">
              CSXUs can be invoked through multiple pathways:
            </p>
            <ul className="text-black space-y-2 pl-8 mb-6 list-disc">
              <li><strong>Direct CLI:</strong> Running the CSXU as a command-line tool</li>
              <li><strong>BISOS daemon:</strong> Invoking through BISOS service infrastructure</li>
              <li><strong>Web UI (csPlayer):</strong> Interactive invocation via csPlayer</li>
              <li><strong>From other CSXUs:</strong> Composition and chaining of services</li>
            </ul>
          </section>

          {/* ============================================================ */}
          {/* CSXU METADATA IN BISOS */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">CSXU Metadata in BISOS</h2>
            
            <p className="text-black mb-6">
              BISOS relies on CSXU self-describing metadata to:
            </p>
            <ul className="text-black space-y-3 pl-8 mb-6 list-disc">
              <li>
                <strong>Enable service discovery:</strong> BISOS can query installed CSXUs to know what 
                services are available
              </li>
              <li>
                <strong>Support dynamic UIs:</strong> csPlayer uses this metadata to automatically generate 
                appropriate forms and interfaces
              </li>
              <li>
                <strong>Validate inputs:</strong> BISOS validates user inputs against CSXU parameter 
                definitions before execution
              </li>
              <li>
                <strong>Generate documentation:</strong> CSXU metadata provides the basis for automatic 
                documentation generation
              </li>
              <li>
                <strong>Enforce permissions:</strong> Metadata can specify required permissions and access 
                controls
              </li>
            </ul>
          </section>

          {/* ============================================================ */}
          {/* EXECUTION CONTEXT IN BISOS */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Execution Context in BISOS</h2>
            
            <p className="text-black mb-6">
              Every CSXU execution within BISOS is wrapped in an Execution Context Object (ECO) that captures:
            </p>
            <ul className="text-black space-y-3 pl-8 mb-6 list-disc">
              <li><strong>Identity:</strong> Who initiated the execution (user, service, or automated process)</li>
              <li><strong>Permissions:</strong> What operations the executor is authorized to perform</li>
              <li><strong>Environment:</strong> Configuration and context variables for execution</li>
              <li><strong>Audit Trail:</strong> Complete logging of execution, inputs, outputs, and any errors</li>
              <li><strong>Persistence:</strong> Long-term storage of execution history for accountability</li>
            </ul>
            <p className="text-black mb-6">
              This provides BISOS with enterprise-grade auditability and security, supporting its role as 
              an operating system for internet services.
            </p>
          </section>

          {/* ============================================================ */}
          {/* CSXU EXAMPLES IN BISOS */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">CSXU Examples in BISOS</h2>
            
            <p className="text-black mb-6">
              Several CSXUs have been implemented to demonstrate BISOS principles:
            </p>

            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
                <h4 className="text-lg font-semibold text-black mb-2">facter.cs</h4>
                <p className="text-black">
                  Gathers system facts (OS, hardware, network) both locally and remotely, providing infrastructure 
                  insight for BISOS systems.
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
                <h4 className="text-lg font-semibold text-black mb-2">mail.cs</h4>
                <p className="text-black">
                  Manages mail-related operations across BISOS services, supporting both CLI and service-based 
                  invocation.
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
                <h4 className="text-lg font-semibold text-black mb-2">provision.cs</h4>
                <p className="text-black">
                  Handles provisioning of BISOS services, allowing automated setup and configuration of new 
                  service instances.
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
                <h4 className="text-lg font-semibold text-black mb-2">cmdb.cs</h4>
                <p className="text-black">
                  Configuration Management Database service, maintaining the inventory and configuration of 
                  BISOS services and infrastructure.
                </p>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* CSPLAYER'S ROLE IN BISOS */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">csPlayer's Role in BISOS</h2>
            
            <p className="text-black mb-6">
              csPlayer is a meta-UI implementation within the BISOS ecosystem. It:
            </p>
            <ul className="text-black space-y-3 pl-8 mb-6 list-disc">
              <li>
                <strong>Discovers installed CSXUs:</strong> Queries the BISOS environment for available services
              </li>
              <li>
                <strong>Adapts dynamically:</strong> Uses CSXU metadata to generate appropriate UI elements 
                without hard-coding
              </li>
              <li>
                <strong>Executes securely:</strong> Manages user identity and permissions through Execution 
                Context
              </li>
              <li>
                <strong>Provides auditability:</strong> Logs all executions and maintains an audit trail for 
                compliance
              </li>
              <li>
                <strong>Bridges modalities:</strong> Allows users to execute the same CSXUs that work from the 
                command line
              </li>
            </ul>
          </section>

          {/* ============================================================ */}
          {/* KEY TAKEAWAYS */}
          {/* ============================================================ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Key Takeaways</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-300">
                <p className="text-black">
                  <strong>BISOS is the framework;</strong> CSXU is the implementation pattern that brings 
                  BISOS principles to life.
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-300">
                <p className="text-black">
                  <strong>Debian + Python:</strong> BISOS operates on Debian systems using Python as the 
                  primary language for CSXU development.
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-300">
                <p className="text-black">
                  <strong>Self-describing services:</strong> CSXUs emit metadata that enables dynamic 
                  discovery, validation, and UI adaptation.
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-300">
                <p className="text-black">
                  <strong>Enterprise auditability:</strong> Execution Context Objects provide the security 
                  and accountability that BISOS requires.
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-300">
                <p className="text-black">
                  <strong>csPlayer bridges modalities:</strong> It provides a web UI for executing CSXUs 
                  that also work from the command line.
                </p>
              </div>
            </div>
          </section>

        </article>
      </div>
    </Layout>
  )
}
