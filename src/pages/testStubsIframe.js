import * as React from "react"

const TestStubsIframePage = () => {
  const [csxuValue, setCSXUValue] = React.useState("")
  const [packageValue, setPackageValue] = React.useState("")
  const [lastSentCSXU, setLastSentCSXU] = React.useState(null)
  const [lastSentPackage, setLastSentPackage] = React.useState(null)
  const [receivedMessages, setReceivedMessages] = React.useState([])

  // Listen for messages from parent
  React.useEffect(() => {
    const handleMessage = (event) => {
      // Accept messages from same origin
      if (event.origin !== window.location.origin) {
        return
      }
      
      if (event.data.type === 'app:commandReceived') {
        const { senderName, command } = event.data.data
        const message = `Received From App: [${senderName}] ${command}`
        setReceivedMessages((prev) => [...prev, message])
      }
    }

    window.addEventListener('message', handleMessage)
    
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  const sendCSXU = () => {
    if (!csxuValue.trim()) {
      alert("Please enter a CSXU name")
      return
    }

    const message = {
      type: 'csPlayer:filterChanged',
      data: { csxuName: csxuValue }
    }

    window.parent.postMessage(message, '*')
    setLastSentCSXU(csxuValue)
    console.log('✅ Sent CSXU via PostMessage:', csxuValue)
  }

  const sendPackage = () => {
    if (!packageValue.trim()) {
      alert("Please enter a package name")
      return
    }

    const message = {
      type: 'csPlayer:packageChanged',
      data: { packageName: packageValue }
    }

    window.parent.postMessage(message, '*')
    setLastSentPackage(packageValue)
    console.log('✅ Sent Package via PostMessage:', packageValue)
  }

  const sendBoth = () => {
    if (!csxuValue.trim() || !packageValue.trim()) {
      alert("Please enter both CSXU name and package name")
      return
    }

    // Send CSXU
    window.parent.postMessage(
      {
        type: 'csPlayer:filterChanged',
        data: { csxuName: csxuValue }
      },
      '*'
    )

    // Send Package
    window.parent.postMessage(
      {
        type: 'csPlayer:packageChanged',
        data: { packageName: packageValue }
      },
      '*'
    )

    setLastSentCSXU(csxuValue)
    setLastSentPackage(packageValue)
    console.log('✅ Sent both CSXU and Package via PostMessage:', csxuValue, packageValue)
  }

  const clear = () => {
    setCSXUValue("")
    setPackageValue("")
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🧪 Test Iframe</h1>
        <p style={styles.subtitle}>
          cliRun-FrontEnd Simulation
        </p>

        {/* CSXU Input */}
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="csxu">CSXU Name</label>
          <input
            id="csxu"
            type="text"
            placeholder="e.g., facter.cs, admin.cs"
            value={csxuValue}
            onChange={(e) => setCSXUValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendCSXU()}
            style={styles.input}
          />
        </div>

        {/* Package Input */}
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="package">Package Name</label>
          <input
            id="package"
            type="text"
            placeholder="e.g., bisos.facter, mypackage"
            value={packageValue}
            onChange={(e) => setPackageValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendPackage()}
            style={styles.input}
          />
        </div>

        {/* Buttons */}
        <div style={styles.buttonGroup}>
          <button
            onClick={sendCSXU}
            style={{ ...styles.button, backgroundColor: '#3b82f6' }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            📤 Send CSXU
          </button>

          <button
            onClick={sendPackage}
            style={{ ...styles.button, backgroundColor: '#10b981' }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
          >
            📤 Send Package
          </button>

          <button
            onClick={sendBoth}
            style={{ ...styles.button, backgroundColor: '#8b5cf6' }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#7c3aed'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#8b5cf6'}
          >
            📤 Send Both
          </button>

          <button
            onClick={clear}
            style={{ ...styles.button, backgroundColor: '#9ca3af' }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#6b7280'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#9ca3af'}
          >
            🗑️ Clear
          </button>
        </div>

        {/* Info Section */}
        <div style={styles.info}>
          <p style={styles.infoText}>
            <strong>💡 Tip:</strong> Check browser console (F12) to see PostMessage logs.
            Messages are sent to parent via <code style={styles.code}>window.parent.postMessage()</code>
          </p>
        </div>

        {/* Received Messages */}
        <div style={styles.receivedMessagesContainer}>
          <h3 style={styles.receivedMessagesTitle}>📬 Received Messages from Parent (Received in iframe)</h3>
          {receivedMessages.length === 0 ? (
            <div style={styles.noMessages}>Waiting for messages...</div>
          ) : (
            <div>
              {receivedMessages.map((msg, idx) => (
                <div key={idx} style={styles.messageBox}>
                  {msg}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status */}
        <div style={styles.statusContainer}>
          <div style={styles.statusBox}>
            <h3 style={styles.statusTitle}>CSXU Status</h3>
            <div style={styles.statusValue}>
              {lastSentCSXU ? (
                <span style={{ color: '#2563eb' }}>{lastSentCSXU}</span>
              ) : (
                <span style={{ color: '#9ca3af' }}>Not sent yet</span>
              )}
            </div>
          </div>

          <div style={styles.statusBox}>
            <h3 style={styles.statusTitle}>Package Status</h3>
            <div style={styles.statusValue}>
              {lastSentPackage ? (
                <span style={{ color: '#10b981' }}>{lastSentPackage}</span>
              ) : (
                <span style={{ color: '#9ca3af' }}>Not sent yet</span>
              )}
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div style={styles.codeSection}>
          <h4 style={styles.codeTitle}>Code Pattern Used:</h4>
          <pre style={styles.codeBlock}>
{`// Send CSXU Selection
window.parent.postMessage(
  {
    type: 'csPlayer:filterChanged',
    data: { csxuName: 'facter.cs' }
  },
  '*'
)`}
          </pre>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    padding: '40px',
    maxWidth: '500px',
    width: '100%'
  },
  title: {
    color: '#1f2937',
    margin: '0 0 10px 0',
    fontSize: '24px',
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '14px',
    margin: '0 0 30px 0'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  buttonGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    marginBottom: '20px'
  },
  button: {
    padding: '10px 14px',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'background-color 0.2s'
  },
  info: {
    background: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '6px',
    padding: '12px',
    marginBottom: '20px'
  },
  infoText: {
    fontSize: '13px',
    color: '#1e40af',
    margin: '0'
  },
  code: {
    background: '#e0e7ff',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'monospace'
  },
  statusContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '20px'
  },
  statusBox: {
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '12px'
  },
  statusTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#6b7280',
    margin: '0 0 8px 0'
  },
  statusValue: {
    fontSize: '16px',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    padding: '8px',
    background: '#ffffff',
    borderRadius: '4px',
    minHeight: '32px',
    display: 'flex',
    alignItems: 'center'
  },
  codeSection: {
    background: '#f3f4f6',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    padding: '12px',
    marginTop: '20px'
  },
  codeTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
    margin: '0 0 8px 0'
  },
  codeBlock: {
    background: '#1f2937',
    color: '#f3f4f6',
    padding: '10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'monospace',
    margin: '0',
    overflow: 'auto'
  },
  receivedMessagesContainer: {
    background: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '6px',
    padding: '12px',
    marginBottom: '20px'
  },
  receivedMessagesTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#166534',
    margin: '0 0 8px 0'
  },
  noMessages: {
    fontSize: '13px',
    color: '#9ca3af',
    fontStyle: 'italic',
    padding: '8px',
    textAlign: 'center'
  },
  messageBox: {
    background: '#ffffff',
    border: '1px solid #86efac',
    borderRadius: '4px',
    padding: '8px',
    marginBottom: '6px',
    fontSize: '12px',
    color: '#1f2937',
    fontFamily: 'monospace'
  }
}

export default TestStubsIframePage
