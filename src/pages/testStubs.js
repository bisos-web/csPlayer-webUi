import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import { registerIframe } from "../utils/iframeAdapter"
import { messageBus } from "../utils/messageBus"
import { ORCHESTRATION_EVENTS } from "../utils/orchestrationEvents"

const TestStubsPage = () => {
  const iframeRef = React.useRef(null)
  const [selectedCSXU, setSelectedCSXU] = React.useState(null)
  const [selectedPackage, setSelectedPackage] = React.useState(null)

  // Register the test stubs iframe with the adapter and subscribe to events
  React.useEffect(() => {
    if (iframeRef.current) {
      registerIframe('testStubs', iframeRef.current)
      console.log('✅ Test Stubs iframe registered')
    }

    // Subscribe to CSXU filter change event
    const unsubscribeFilterChanged = messageBus.subscribe(
      ORCHESTRATION_EVENTS.CSPAYER_FILTER_CHANGED,
      (data) => {
        console.log('testStubs received CSXU:', data.csxuName)
        setSelectedCSXU(data.csxuName)
      },
      'testStubs'
    )

    // Subscribe to package change event
    const unsubscribePackageChanged = messageBus.subscribe(
      'CSPAYER_PACKAGE_CHANGED',
      (data) => {
        console.log('testStubs received Package:', data.packageName)
        setSelectedPackage(data.packageName)
      },
      'testStubs'
    )

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeFilterChanged()
      unsubscribePackageChanged()
    }
  }, [])

  return (
    <Layout selectedCSXU={selectedCSXU} selectedPackage={selectedPackage}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🧪 Test Stubs</h1>
          <p className="text-gray-600">
            Test the PostMessage communication pattern that cliRun-FrontEnd will use.
          </p>
        </div>

        {/* Iframe Container */}
        <div className="bg-white rounded-lg shadow-md border border-gray-300 p-6 mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">📨 Test Iframe</h2>
            <p className="text-sm text-gray-600">
              The iframe below simulates cliRun-FrontEnd. Enter CSXU and package names,
              then send them. They will be transmitted via PostMessage to the parent.
            </p>
          </div>
          
          <iframe
            ref={iframeRef}
            src="/testStubsIframe"
            title="Test Stubs iframe"
            className="w-full border-2 border-gray-200 rounded-lg"
            style={{ height: "600px", minHeight: "600px" }}
            sandbox="allow-same-origin allow-scripts allow-forms"
          />
        </div>

        {/* Documentation */}
        <div className="bg-gray-50 rounded-lg border border-gray-300 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 How It Works</h2>

          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">1️⃣ Communication Pattern</h3>
              <p>
                The iframe above uses <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">window.parent.postMessage()</code> to send messages to the parent page.
                This is exactly what cliRun-FrontEnd will do.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">2️⃣ Message Flow</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 font-mono text-xs">
                <div>iframe sends PostMessage</div>
                <div>  ↓</div>
                <div>iframeAdapter receives</div>
                <div>  ↓</div>
                <div>messageBus publishes event</div>
                <div>  ↓</div>
                <div>csPlayer.js receives</div>
                <div>  ↓</div>
                <div>Header updates ✅</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">3️⃣ Test Steps</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>In the iframe above, enter a CSXU name (e.g., "facter.cs")</li>
                <li>Click "Send CSXU" button</li>
                <li>Look at the Header at top of this page</li>
                <li>You should see "CSXU: facter.cs" update</li>
                <li>Repeat for package name</li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">4️⃣ Code for cliRun-FrontEnd</h3>
              <p className="mb-2">Your colleague needs this code pattern in cliRun-FrontEnd:</p>
              <div className="bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto font-mono text-xs">
                <div>
                  <span className="text-orange-400">// When user selects CSXU</span>
                </div>
                <div>
                  <span className="text-blue-400">function</span> sendCSXUSelection(csxuName) {"{"}
                </div>
                <div className="ml-4">
                  <span className="text-blue-400">window</span>.parent.postMessage({"{"}
                </div>
                <div className="ml-8">
                  <span className="text-purple-400">type</span>: <span className="text-green-400">'csPlayer:filterChanged'</span>,
                </div>
                <div className="ml-8">
                  <span className="text-purple-400">data</span>: {"{"} csxuName {"}"} 
                </div>
                <div className="ml-4">{"},"} <span className="text-green-400">'http://localhost:8000'</span>)
                </div>
                <div>{"}"}</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">5️⃣ Message Formats</h3>
              <div className="bg-gray-100 rounded-md p-4 font-mono text-xs space-y-3">
                <div>
                  <div className="font-semibold text-gray-800 mb-1">CSXU Selection:</div>
                  <div className="text-gray-700">
                    {`{`}
                    <br/>
                    <span className="ml-4">type: 'csPlayer:filterChanged',</span>
                    <br/>
                    <span className="ml-4">data: {`{ csxuName: 'value' }`}</span>
                    <br/>
                    {`}`}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 mb-1">Package Selection:</div>
                  <div className="text-gray-700">
                    {`{`}
                    <br/>
                    <span className="ml-4">type: 'csPlayer:packageChanged',</span>
                    <br/>
                    <span className="ml-4">data: {`{ packageName: 'value' }`}</span>
                    <br/>
                    {`}`}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">6️⃣ Browser Console</h3>
              <p>
                Open DevTools (F12) and check the console. You'll see:
              </p>
              <div className="bg-gray-800 text-gray-100 rounded-md p-3 mt-2 font-mono text-xs">
                <div className="text-green-400">✅ Sent CSXU via PostMessage: facter.cs</div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>💡 Tip:</strong> This test iframe demonstrates the exact communication pattern.
              Your colleague can copy this approach into cliRun-FrontEnd and it will work seamlessly!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Test Stubs" />

export default TestStubsPage
