import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import { registerIframe } from "../utils/iframeAdapter"
import { messageBus } from "../utils/messageBus"
import { ORCHESTRATION_EVENTS } from "../utils/orchestrationEvents"
import { getOrchestrationState } from "../utils/orchestrationState"

const CsPlayerBackEndPage = () => {
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
      <div className="w-full flex flex-col" style={{ height: 'calc(100vh - 200px)' }}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white">
          <h1 className="text-3xl font-bold text-blue-900">�️ Django Back-End Performer Api Admin</h1>
          <p className="text-gray-600 text-sm mt-1">Access the Django administration interface</p>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto flex flex-col items-center justify-center p-8 bg-gray-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Django Admin Portal</h2>
              <p className="text-gray-600 mb-4">
                The Django admin interface is served at a different domain (csPlayerPerf.here) for security reasons. 
                Browser restrictions prevent direct embedding, so please use the button below to access it.
              </p>
            </div>

            <div className="space-y-4">
              <a 
                href="http://csPlayerPerf.here/admin/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                ✨ Open Django Admin in New Window
              </a>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
                <h3 className="font-semibold text-blue-900 mb-2">How to use:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                  <li>Click the button above to open the admin interface</li>
                  <li>Log in with your Django admin credentials</li>
                  <li>Manage models and configure the backend</li>
                  <li>Your session will persist for subsequent accesses</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Django Back-End Performer Api Admin" />

export default CsPlayerBackEndPage
