import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import { registerIframe } from "../utils/iframeAdapter"
import { messageBus } from "../utils/messageBus"
import { ORCHESTRATION_EVENTS } from "../utils/orchestrationEvents"
import { getOrchestrationState } from "../utils/orchestrationState"

const TestStubsPage = () => {
  const iframeRef = React.useRef(null)
  const pendingMessagesRef = React.useRef([])
  const [iframeReady, setIframeReady] = React.useState(false)
  const [selectedCSXU, setSelectedCSXU] = React.useState(null)
  const [selectedPackage, setSelectedPackage] = React.useState(null)
  const [receivedMessages, setReceivedMessages] = React.useState([])

  // Register the test stubs iframe with the adapter and subscribe to events
  React.useEffect(() => {
    // Load persisted state
    const persistedState = getOrchestrationState()
    setSelectedCSXU(persistedState.selectedCSXU)
    setSelectedPackage(persistedState.selectedPackage)

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

    // Subscribe to app command events
    const unsubscribeAppCommand = messageBus.subscribe(
      ORCHESTRATION_EVENTS.APP_COMMAND_SENT,
      (data) => {
        // Forward to iframe if it exists and is loaded
        if (iframeRef.current && iframeRef.current.contentWindow && iframeReady) {
          try {
            const targetOrigin = window.location.origin
            iframeRef.current.contentWindow.postMessage(
              {
                type: 'app:commandReceived',
                data: {
                  senderName: data.senderName,
                  command: data.command,
                },
              },
              targetOrigin
            )
          } catch (error) {
            console.error('❌ Error sending PostMessage to iframe:', error)
          }
        } else {
          // Queue message if iframe not ready yet
          pendingMessagesRef.current.push(data)
        }
        
        // Also display on parent page
        const message = `Received From App: [${data.senderName}] ${data.command}`
        setReceivedMessages((prev) => [...prev, message])
      },
      'testStubs'
    )

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeFilterChanged()
      unsubscribePackageChanged()
      unsubscribeAppCommand()
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
            sandbox="allow-scripts allow-same-origin"
            onLoad={() => {
              setIframeReady(true)
              
              // Flush any pending messages after a brief delay to ensure iframe listener is attached
              setTimeout(() => {
                if (pendingMessagesRef.current.length > 0) {
                  pendingMessagesRef.current.forEach((data) => {
                    if (iframeRef.current && iframeRef.current.contentWindow) {
                      const targetOrigin = window.location.origin
                      iframeRef.current.contentWindow.postMessage(
                        {
                          type: 'app:commandReceived',
                          data: {
                            senderName: data.senderName,
                            command: data.command,
                          },
                        },
                        targetOrigin
                      )
                    }
                  })
                  pendingMessagesRef.current = []
                }
              }, 250)
            }}
          />
        </div>

        {/* Received Messages Container */}
        <div className="bg-green-50 rounded-lg shadow-md border border-green-300 p-6 mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">📬 Received Messages from Apps (Not in iframe)</h2>
            <p className="text-sm text-gray-600">
              Messages sent from other pages appear here in the parent page context:
            </p>
          </div>

          {receivedMessages.length === 0 ? (
            <div className="text-gray-500 italic text-center py-8">
              No messages received yet. Send one from Facter csApp!
            </div>
          ) : (
            <div className="space-y-2">
              {receivedMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-green-200 rounded-md p-3 font-mono text-sm text-gray-800"
                >
                  {msg}
                </div>
              ))}
            </div>
          )}
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
              <h3 className="font-semibold text-gray-800 mb-2">5️⃣ Receiving Messages from Parent</h3>
              <p className="mb-3">
                While your iframe sends messages to the parent, the parent application may also send messages back to you.
                This is useful when the parent needs to command your application to perform actions, display results, or update state.
              </p>
              
              <p className="mb-3 font-semibold text-gray-800">Setting Up a Message Listener:</p>
              <p className="mb-3">
                Add a React useEffect hook in your component (or component initialization) to listen for messages from the parent.
                The parent will use <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">window.postMessage()</code> to send messages
                to your iframe's contentWindow. You need to listen for these messages using the browser's <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">message</code> event.
              </p>
              
              <div className="bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto font-mono text-xs mb-3">
                <div>
                  <span className="text-orange-400">// Add this to your component</span>
                </div>
                <div>
                  <span className="text-blue-400">React</span>.useEffect(() =&gt; {"{"}
                </div>
                <div className="ml-4">
                  <span className="text-orange-400">// Define the message handler function</span>
                </div>
                <div className="ml-4">
                  <span className="text-blue-400">const</span> handleMessage = (event) =&gt; {"{"}
                </div>
                <div className="ml-8">
                  <span className="text-orange-400">// IMPORTANT: Validate the origin for security</span>
                </div>
                <div className="ml-8">
                  <span className="text-blue-400">if</span> (event.origin !== <span className="text-blue-400">window</span>.location.origin) {"{"}
                </div>
                <div className="ml-12">
                  <span className="text-blue-400">return</span> <span className="text-orange-400">// Ignore messages from other origins</span>
                </div>
                <div className="ml-8">{"}"}</div>
                <div className="ml-8"></div>
                <div className="ml-8">
                  <span className="text-orange-400">// Check the message type and handle accordingly</span>
                </div>
                <div className="ml-8">
                  <span className="text-blue-400">if</span> (event.data.type === <span className="text-green-400">'app:commandReceived'</span>) {"{"}
                </div>
                <div className="ml-12">
                  <span className="text-orange-400">// Extract data from the message</span>
                </div>
                <div className="ml-12">
                  <span className="text-blue-400">const</span> {"{"}senderName, command{"}"} = event.data.data
                </div>
                <div className="ml-12"></div>
                <div className="ml-12">
                  <span className="text-orange-400">// Process the command (update state, make API calls, etc.)</span>
                </div>
                <div className="ml-12">
                  console.log(<span className="text-green-400">{"`Received command from ${senderName}: ${command}`"}</span>)
                </div>
                <div className="ml-12">
                  <span className="text-orange-400">// You can now execute the command or update your app state</span>
                </div>
                <div className="ml-8">{"}"}</div>
                <div className="ml-4">{"}"}</div>
                <div className="ml-4"></div>
                <div className="ml-4">
                  <span className="text-orange-400">// Attach the message listener to the window</span>
                </div>
                <div className="ml-4">
                  <span className="text-blue-400">window</span>.addEventListener(<span className="text-green-400">'message'</span>, handleMessage)
                </div>
                <div className="ml-4"></div>
                <div className="ml-4">
                  <span className="text-orange-400">// Cleanup: Remove the listener when component unmounts</span>
                </div>
                <div className="ml-4">
                  <span className="text-blue-400">return</span> () =&gt; {"{"}
                </div>
                <div className="ml-8">
                  <span className="text-blue-400">window</span>.removeEventListener(<span className="text-green-400">'message'</span>, handleMessage)
                </div>
                <div className="ml-4">{"}"}</div>
                <div>{"}, [])"}</div>
              </div>

              <p className="mb-3 font-semibold text-gray-800">Message Format from Parent:</p>
              <p className="mb-3">
                When the parent sends a message to your iframe, it will use this format:
              </p>
              <div className="bg-gray-100 rounded-md p-4 font-mono text-xs space-y-3 mb-3">
                <div>
                  <div className="font-semibold text-gray-800 mb-1">App Command Message:</div>
                  <div className="text-gray-700">
                    {`{`}
                    <br/>
                    <span className="ml-4">type: 'app:commandReceived',</span>
                    <br/>
                    <span className="ml-4">data: {`{`}</span>
                    <br/>
                    <span className="ml-8">senderName: 'facterCsApp',</span>
                    <br/>
                    <span className="ml-8">command: 'facter.cs -i factName networking'</span>
                    <br/>
                    <span className="ml-4">{`}`}</span>
                    <br/>
                    {`}`}
                  </div>
                </div>
              </div>

              <p className="mb-3 font-semibold text-gray-800">Important Notes:</p>
              <ul className="list-disc list-inside space-y-2 mb-3">
                <li><strong>Origin Check:</strong> Always validate <code className="bg-gray-100 px-1 rounded text-xs font-mono">event.origin</code> to ensure messages come from your trusted parent domain.</li>
                <li><strong>Message Type:</strong> Check the <code className="bg-gray-100 px-1 rounded text-xs font-mono">event.data.type</code> to determine how to handle different message types.</li>
                <li><strong>Cleanup:</strong> Always remove the event listener when your component unmounts to prevent memory leaks.</li>
                <li><strong>Async Operations:</strong> You can perform async operations (API calls, state updates) when handling messages.</li>
                <li><strong>Error Handling:</strong> Add try-catch blocks if you're doing complex operations based on incoming messages.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">6️⃣ Message Formats</h3>
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
              <h3 className="font-semibold text-gray-800 mb-2">7️⃣ Browser Console</h3>
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
