import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import { ErrorBoundary } from "../components/ErrorBoundary"
import { registerIframe } from "../utils/iframeAdapter"
import { messageBus } from "../utils/messageBus"
import { ORCHESTRATION_EVENTS } from "../utils/orchestrationEvents"
import { useOrchestration, useOrchestrationPersistence } from "../stores/orchestrationStore"
import { getServiceUrl } from "../utils/serviceConfig"

const CsPlayerPage = () => {
  console.log('🖥️ csPlayer.js: Component rendering...')
  const iframeRef = React.useRef(null)
  const cslineInvokerUrl = getServiceUrl('cslineInvoker')
  
  // Enable localStorage persistence for the orchestration store
  console.log('🖥️ csPlayer.js: Calling useOrchestrationPersistence')
  useOrchestrationPersistence()
  
  // Use Zustand store for orchestration state
  console.log('🖥️ csPlayer.js: Calling useOrchestration')
  const { selectedCSXU, selectedPackage, setSelectedCSXU, setSelectedPackage } = useOrchestration()
  console.log('🖥️ csPlayer.js: Got store state', { selectedCSXU, selectedPackage })

  // Initialize state from persistent storage and register iframe
  React.useEffect(() => {
    console.log('🖥️ csPlayer.js: Effect running...')
    // CRITICAL: Only run on client, not during SSR
    if (typeof window === 'undefined') {
      console.log('🖥️ csPlayer.js: Skipping effect on server')
      return
    }

    console.log('🖥️ csPlayer.js: Running on client...')

    try {
      if (iframeRef.current) {
        console.log('🖥️ csPlayer.js: iframe ref exists, registering...')
        registerIframe('csPlayer', iframeRef.current)
        console.log('✅ csPlayer.js: iframe registered')

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
          console.log('🖥️ csPlayer.js: Cleanup running...')
          unsubscribeTaskExecuted()
          unsubscribeTaskFailed()
          unsubscribeFilterChanged()
          unsubscribePackageChanged()
        }
      } else {
        console.log('🖥️ csPlayer.js: No iframe ref found!')
      }
    } catch (error) {
      console.error('❌ Error in csPlayer effect:', error)
    }
    console.log('🖥️ csPlayer.js: Effect complete')
  }, [setSelectedCSXU, setSelectedPackage])

  return (
    <ErrorBoundary>
      <Layout>
        <div className="w-full h-full flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-white">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">🖥️ Build and Execute CSXU Command Lines</h1>
              <div className="flex justify-between items-end mt-1">
                <p className="text-gray-600 text-sm">Build, execute and monitor Command Services eXecution Unit command lines across destinations</p>
                {/* URL Badge - Right bottom */}
                <a
                  href={cslineInvokerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded font-mono transition whitespace-nowrap ml-4"
                  title="Click to open in new tab"
                >
                  {cslineInvokerUrl} ↗
                </a>
              </div>
            </div>
          </div>

          {/* iframe Container */}
          <div className="flex-1 overflow-hidden">
            <iframe
              ref={iframeRef}
              src={cslineInvokerUrl}
              title="Web CLI GUI"
              className="w-full h-full border-0"
              style={{ minHeight: "600px" }}
            />
          </div>

          {/* Loading Message */}
          <div className="hidden" id="loading-message">
            <div className="p-4 bg-blue-50 text-blue-800">
              Loading Web CLI GUI... Make sure the service is running on {cslineInvokerUrl}
            </div>
          </div>
        </div>
      </Layout>
    </ErrorBoundary>
  )
}

export const Head = () => <Seo title="Web CLI GUI" />

export default CsPlayerPage
