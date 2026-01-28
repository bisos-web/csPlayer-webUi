import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import { getOrchestrationState } from "../utils/orchestrationState"

const AirflowPage = () => {
  const iframeRef = React.useRef(null)
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
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white">
          <h1 className="text-3xl font-bold text-green-900">⚙️ Airflow</h1>
          <p className="text-gray-600 text-sm mt-1">Orchestrate and schedule complex workflows and data pipelines</p>
        </div>

        {/* iframe Container */}
        <div className="flex-1 overflow-hidden">
          <iframe
            ref={iframeRef}
            src="http://localhost:8080"
            title="Airflow"
            className="w-full h-full border-0"
            style={{ minHeight: "600px" }}
          />
        </div>

        {/* Loading Message */}
        <div className="hidden" id="loading-message">
          <div className="p-4 bg-green-50 text-green-800">
            Loading Airflow... Make sure the service is running on http://localhost:8080
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Airflow" />

export default AirflowPage
