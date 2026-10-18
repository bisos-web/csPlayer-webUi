import * as React from "react"
import { Link } from "gatsby"
import { getOrchestrationState } from "../utils/orchestrationState"
import Layout from "../components/Layout"
import { messageBus } from "../utils/messageBus"
import { ORCHESTRATION_EVENTS } from "../utils/orchestrationEvents"

export default function FacterCsAppPage() {
  const [selectedCSXU, setSelectedCSXU] = React.useState("none")
  const [selectedPackage, setSelectedPackage] = React.useState("none")
  const [commandInput, setCommandInput] = React.useState("")

  React.useEffect(() => {
    // Load persisted state
    const state = getOrchestrationState()
    if (state.selectedCSXU) {
      setSelectedCSXU(state.selectedCSXU)
    }
    if (state.selectedPackage) {
      setSelectedPackage(state.selectedPackage)
    }

    // Subscribe to messageBus for real-time updates
    const unsubscribeCSXU = messageBus.subscribe(
      "csxu:selected",
      (data) => {
        setSelectedCSXU(data.csxuName)
      },
      "facterCsApp"
    )

    const unsubscribePackage = messageBus.subscribe(
      "package:selected",
      (data) => {
        setSelectedPackage(data.packageName)
      },
      "facterCsApp"
    )

    return () => {
      unsubscribeCSXU()
      unsubscribePackage()
    }
  }, [])

  const handleSendCommand = () => {
    if (commandInput.trim()) {
      // Publish command to messageBus
      const eventName = ORCHESTRATION_EVENTS.APP_COMMAND_SENT
      console.log('🚀 facterCsApp sending command:', commandInput)
      console.log(`🚀 Event name: "${eventName}"`)
      messageBus.publish(
        eventName,
        {
          senderName: "facterCsApp",
          command: commandInput,
        },
        "facterCsApp"
      )
      
      // Clear input after sending
      setCommandInput("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendCommand()
    }
  }

  const sendPredefinedCommand = (command) => {
    // Publish command to messageBus
    const eventName = ORCHESTRATION_EVENTS.APP_COMMAND_SENT
    console.log('🚀 facterCsApp sending predefined command:', command)
    messageBus.publish(
      eventName,
      {
        senderName: "facterCsApp",
        command: command,
      },
      "facterCsApp"
    )
  }

  return (
    <Layout selectedCSXU={selectedCSXU} selectedPackage={selectedPackage}>
      <div style={{ padding: "2rem" }}>
        <h1>🔧 Facter csApp</h1>
        <p>Enter a command to send to Test Stubs:</p>
        
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter command line..."
            style={{
              flex: 1,
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
          <button
            onClick={handleSendCommand}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#0066cc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Send
          </button>
        </div>
        
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
          Messages sent will appear in the Test Stubs page.
        </p>

        {/* Predefined Command Boxes */}
        <div style={{ marginTop: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Quick Commands</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {/* Facter Networking Box */}
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "1.5rem",
                backgroundColor: "#f9fafb",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", color: "#1f2937" }}>
                🌐 Facter Networking
              </h3>
              <p style={{ margin: "0 0 1rem 0", fontSize: "0.9rem", color: "#6b7280" }}>
                Sending to csPlayer: facter.cs -i factName networking
              </p>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  onClick={() => sendPredefinedCommand("facter.cs -i factName networking")}
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
                >
                  Run
                </button>
                <Link
                  to="/testStubs"
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    backgroundColor: "#8b5cf6",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#7c3aed")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#8b5cf6")}
                >
                  See Results
                </Link>
              </div>
            </div>

            {/* Facter Disks Box */}
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "1.5rem",
                backgroundColor: "#f9fafb",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", color: "#1f2937" }}>
                💾 Facter Disks
              </h3>
              <p style={{ margin: "0 0 1rem 0", fontSize: "0.9rem", color: "#6b7280" }}>
                Sending to csPlayer: facter.cs -i factName disks
              </p>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  onClick={() => sendPredefinedCommand("facter.cs -i factName disks")}
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    backgroundColor: "#10b981",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#059669")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#10b981")}
                >
                  Run
                </button>
                <Link
                  to="/testStubs"
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    backgroundColor: "#8b5cf6",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#7c3aed")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#8b5cf6")}
                >
                  See Results
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
