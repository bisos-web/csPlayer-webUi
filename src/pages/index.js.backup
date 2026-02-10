import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import { getOrchestrationState } from "../utils/orchestrationState"

const IndexPage = () => {
  const [selectedCSXU, setSelectedCSXU] = React.useState(null)
  const [selectedPackage, setSelectedPackage] = React.useState(null)

  React.useEffect(() => {
    // Load persisted state on mount
    const persistedState = getOrchestrationState()
    setSelectedCSXU(persistedState.selectedCSXU)
    setSelectedPackage(persistedState.selectedPackage)
  }, [])

  return (
  <Layout 
    selectedCSXU={selectedCSXU}
    selectedPackage={selectedPackage}
  >
    <div className="max-w-6xl mx-auto px-4 w-full overflow-hidden">
      {/* Hero Section */}
      <section className="pt-10 pb-6 border-b border-gray-200 mb-12">
        <div className="text-center mb-4">
          <p className="text-2xl md:text-3xl font-bold leading-relaxed">
            <span className="text-bystar-navy">Unified Platform To</span>
            <br />
            <span className="text-blue-700">Specify, Manage, Schedule, Monitor and Observe</span>
            <br />
            <span className="text-bystar-navy">CSXU Command Line Executions</span>
          </p>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-bystar-navy mb-6">📊 Services Overview</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* csPlayer */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-300 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-blue-900 mb-2">🖥️ csPlayer</h3>
            <p className="text-blue-700 mb-4">
              Execute and monitor CSXU command line tasks with audit trailing
            </p>
            <Link to="/csPlayer" className="inline-block px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 no-underline">
              View Service
            </Link>
          </div>

          {/* csPlayer BackEnd */}
          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border-2 border-purple-300 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-purple-900 mb-2">�️ csPlayer BackEnd</h3>
            <p className="text-purple-700 mb-4">
              Access the Django administration interface for backend configuration
            </p>
            <Link to="/csPlayerBackEnd" className="inline-block px-4 py-2 bg-purple-600 text-white rounded font-semibold hover:bg-purple-700 no-underline">
              View Service
            </Link>
          </div>

          {/* Airflow */}
          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-300 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-green-900 mb-2">⚙️ Airflow</h3>
            <p className="text-green-700 mb-4">
              Orchestrate and schedule CSXU workflows and data pipelines
            </p>
            <Link to="/airflow" className="inline-block px-4 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 no-underline">
              View Service
            </Link>
          </div>

          {/* Grafana */}
          <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border-2 border-orange-300 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-orange-900 mb-2">� Grafana</h3>
            <p className="text-orange-700 mb-4">
              Real-time monitoring and visualization of CSXU execution metrics
            </p>
            <Link to="/grafana" className="inline-block px-4 py-2 bg-orange-600 text-white rounded font-semibold hover:bg-orange-700 no-underline">
              View Service
            </Link>
          </div>

          {/* CSXU Info */}
          <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg border-2 border-indigo-300 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-indigo-900 mb-2">� CSXU Info</h3>
            <p className="text-indigo-700 mb-4">
              View documentation and metadata for the selected CSXU
            </p>
            <Link to="/csxuInfo" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700 no-underline">
              View Service
            </Link>
          </div>

          {/* pipx Info */}
          <div className="p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg border-2 border-cyan-300 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-cyan-900 mb-2">📦 pipx Info</h3>
            <p className="text-cyan-700 mb-4">
              Explore PyPI package information and available modules
            </p>
            <Link to="/pipxInfo" className="inline-block px-4 py-2 bg-cyan-600 text-white rounded font-semibold hover:bg-cyan-700 no-underline">
              View Service
            </Link>
          </div>

          {/* Python of CSXU */}
          <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border-2 border-yellow-300 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-yellow-900 mb-2">� Python of CSXU</h3>
            <p className="text-yellow-700 mb-4">
              View and analyze the Python source code of the selected CSXU
            </p>
            <Link to="/csxuPythonSources" className="inline-block px-4 py-2 bg-yellow-600 text-white rounded font-semibold hover:bg-yellow-700 no-underline">
              View Service
            </Link>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-bystar-navy p-6 rounded">
          <h3 className="text-lg font-bold text-bystar-navy mb-2">🚀 Get Started</h3>
          <p className="text-gray-700 mb-4">
            Select a CSXU from the csPlayer, then explore its documentation, PyPI information, and source code using the info pages above. Monitor executions in Airflow and Grafana.
          </p>
          <Link to="/csPlayer" className="inline-block px-6 py-3 bg-bystar-navy text-white rounded-lg font-semibold hover:bg-opacity-90 no-underline">
            Open csPlayer
          </Link>
        </div>
      </section>

      {/* Quick Links */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-bystar-navy mb-6">📚 Resources</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/explore/help" className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-bystar-navy hover:bg-gray-100 transition-colors no-underline">
            <div className="text-2xl mb-2">❓</div>
            <div className="font-semibold text-bystar-navy">Help & FAQ</div>
          </Link>
          
          <Link to="/explore/search" className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-bystar-navy hover:bg-gray-100 transition-colors no-underline">
            <div className="text-2xl mb-2">🔍</div>
            <div className="font-semibold text-bystar-navy">Search</div>
          </Link>
          
          <Link to="/explore/accessibility" className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-bystar-navy hover:bg-gray-100 transition-colors no-underline">
            <div className="text-2xl mb-2">♿</div>
            <div className="font-semibold text-bystar-navy">Accessibility</div>
          </Link>
          
          <Link to="/explore/sitemap" className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-bystar-navy hover:bg-gray-100 transition-colors no-underline">
            <div className="text-2xl mb-2">🗺️</div>
            <div className="font-semibold text-bystar-navy">Sitemap</div>
          </Link>
        </div>
      </section>
    </div>
  </Layout>
  )
}

export const Head = () => <Seo title="Home" />

export default IndexPage
