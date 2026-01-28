import * as React from "react"
import { getOrchestrationState } from "../utils/orchestrationState"
import Layout from "../components/Layout"
import { messageBus } from "../utils/messageBus"

export default function FacterCsAppPage() {
  const [selectedCSXU, setSelectedCSXU] = React.useState("none")
  const [selectedPackage, setSelectedPackage] = React.useState("none")

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

  return (
    <Layout selectedCSXU={selectedCSXU} selectedPackage={selectedPackage}>
      <div style={{ padding: "2rem" }}>
        <h1>🔧 Facter csApp</h1>
        <p>This is a placeholder page for the Facter csApp.</p>
        <p>Content coming soon...</p>
      </div>
    </Layout>
  )
}
