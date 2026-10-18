import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import { getServiceUrl } from "../utils/serviceConfig"

const GrafanaPage = () => {
  const iframeRef = React.useRef(null)
  const grafanaUrl = getServiceUrl('grafana')

  return (
    <Layout>
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white">
          <div>
            <h1 className="text-3xl font-bold text-orange-900">📈 Grafana</h1>
            <div className="flex items-end justify-between mt-1">
              <p className="text-gray-600 text-sm">Real-time monitoring and visualization of system metrics and performance</p>
              {/* URL Badge - Right bottom */}
              <a
                href={grafanaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded font-mono transition whitespace-nowrap ml-4"
                title="Click to open in new tab"
              >
                {grafanaUrl} ↗
              </a>
            </div>
          </div>
        </div>

        {/* iframe Container */}
        <div className="flex-1 overflow-hidden">
          <iframe
            ref={iframeRef}
            src={grafanaUrl}
            title="Grafana"
            className="w-full h-full border-0"
            style={{ minHeight: "600px" }}
          />
        </div>

        {/* Loading Message */}
        <div className="hidden" id="loading-message">
          <div className="p-4 bg-orange-50 text-orange-800">
            Loading Grafana... Make sure the service is running on {grafanaUrl}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Grafana" />

export default GrafanaPage
