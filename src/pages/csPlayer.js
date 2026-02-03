import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import { registerIframe } from "../utils/iframeAdapter"
import { messageBus } from "../utils/messageBus"
import { ORCHESTRATION_EVENTS } from "../utils/orchestrationEvents"
import { getOrchestrationState } from "../utils/orchestrationState"

const CsPlayerPage = () => {
  const iframeRef = React.useRef(null)
  const [selectedCSXU, setSelectedCSXU] = React.useState(null)
  const [selectedPackage, setSelectedPackage] = React.useState(null)

  // Initialize state from persistent storage and register iframe
  React.useEffect(() => {
    // Load persisted state
    const persistedState = getOrchestrationState()
    setSelectedCSXU(persistedState.selectedCSXU)
    setSelectedPackage(persistedState.selectedPackage)

    if (iframeRef.current) {
      registerIframe('csPlayer', iframeRef.current)

      // Example: Subscribe to csPlayer events
      const unsubscribeTaskExecuted = messageBus.subscribe(
        ORCHESTRATION_EVENTS.CSPAYER_TASK_EXECUTED,
        (data) => {
          console.log('csPlayer executed task:', data)
        },
        'csPlayer'
      )

      const unsubscribeTaskFailed = messageBus.subscribe(
        ORCHESTRATION_EVENTS.CSPAYER_TASK_FAILED,
        (data) => {
          console.log('csPlayer task failed:', data)
        },
        'csPlayer'
      )

      // Subscribe to CSXU filter change event
      const unsubscribeFilterChanged = messageBus.subscribe(
        ORCHESTRATION_EVENTS.CSPAYER_FILTER_CHANGED,
        (data) => {
          console.log('CSXU selected:', data.csxuName)
          setSelectedCSXU(data.csxuName)
        },
        'csPlayer'
      )

      // Subscribe to package change event (handle custom event)
      const unsubscribePackageChanged = messageBus.subscribe(
        'CSPAYER_PACKAGE_CHANGED',
        (data) => {
          console.log('Package selected:', data.packageName)
          setSelectedPackage(data.packageName)
        },
        'csPlayer'
      )

      // Cleanup subscriptions on unmount
      return () => {
        unsubscribeTaskExecuted()
        unsubscribeTaskFailed()
        unsubscribeFilterChanged()
        unsubscribePackageChanged()
      }
    }
  }, [])

  return (
    <Layout selectedCSXU={selectedCSXU} selectedPackage={selectedPackage}>
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white">
          <h1 className="text-3xl font-bold text-blue-900">🖥️ Web CLI GUI</h1>
          <p className="text-gray-600 text-sm mt-1">Execute and monitor command line tasks across multiple servers</p>
        </div>

        {/* iframe Container */}
        <div className="flex-1 overflow-hidden">
          <iframe
            ref={iframeRef}
            src="http://csLineInvoker.here"
            title="Web CLI GUI"
            className="w-full h-full border-0"
            style={{ minHeight: "600px" }}
          />
        </div>

        {/* Loading Message */}
        <div className="hidden" id="loading-message">
          <div className="p-4 bg-blue-50 text-blue-800">
            Loading Web CLI GUI... Make sure the service is running on http://csLineInvoker.here
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Web CLI GUI" />

export default CsPlayerPage
