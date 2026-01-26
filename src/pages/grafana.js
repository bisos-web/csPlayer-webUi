import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"

const GrafanaPage = () => {
  const iframeRef = React.useRef(null)

  return (
    <Layout>
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white">
          <h1 className="text-3xl font-bold text-orange-900">📈 Grafana</h1>
          <p className="text-gray-600 text-sm mt-1">Real-time monitoring and visualization of system metrics and performance</p>
        </div>

        {/* iframe Container */}
        <div className="flex-1 overflow-hidden">
          <iframe
            ref={iframeRef}
            src="http://localhost:3000"
            title="Grafana"
            className="w-full h-full border-0"
            style={{ minHeight: "600px" }}
          />
        </div>

        {/* Loading Message */}
        <div className="hidden" id="loading-message">
          <div className="p-4 bg-orange-50 text-orange-800">
            Loading Grafana... Make sure the service is running on http://localhost:3000
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Grafana" />

export default GrafanaPage
