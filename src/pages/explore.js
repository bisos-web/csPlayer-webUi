import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import { getOrchestrationState } from "../utils/orchestrationState"

const ExplorePage = () => {
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-bystar-navy mb-4">Explore</h1>
      <p className="text-xl text-gray-700 mb-8">
        Discover additional resources and tools to help you make the most of the BISOS Command Service CLI Web UI.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Help & FAQ */}
        <Link to="/explore/help" className="no-underline">
          <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-300 hover:shadow-lg transition-shadow cursor-pointer">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">❓ Help & FAQ</h2>
            <p className="text-blue-700">
              Find answers to frequently asked questions and get help with common tasks.
            </p>
          </div>
        </Link>

        {/* Search */}
        <Link to="/explore/search" className="no-underline">
          <div className="p-6 bg-green-50 rounded-lg border-2 border-green-300 hover:shadow-lg transition-shadow cursor-pointer">
            <h2 className="text-2xl font-bold text-green-900 mb-2">🔍 Search</h2>
            <p className="text-green-700">
              Search across all documentation and resources to find what you need.
            </p>
          </div>
        </Link>

        {/* Accessibility */}
        <Link to="/explore/accessibility" className="no-underline">
          <div className="p-6 bg-purple-50 rounded-lg border-2 border-purple-300 hover:shadow-lg transition-shadow cursor-pointer">
            <h2 className="text-2xl font-bold text-purple-900 mb-2">♿ Accessibility</h2>
            <p className="text-purple-700">
              Learn about accessibility features and how to use them for a better experience.
            </p>
          </div>
        </Link>

        {/* Sitemap */}
        <Link to="/sitemap" className="no-underline">
          <div className="p-6 bg-orange-50 rounded-lg border-2 border-orange-300 hover:shadow-lg transition-shadow cursor-pointer">
            <h2 className="text-2xl font-bold text-orange-900 mb-2">🗺️ Sitemap</h2>
            <p className="text-orange-700">
              View a complete map of all pages and resources available on this site.
            </p>
          </div>
        </Link>
      </div>
    </div>
  </Layout>
  )
}

export const Head = () => <Seo title="Explore" />

export default ExplorePage
