import * as React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('❌ ERROR BOUNDARY CAUGHT:', error, errorInfo)
    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', backgroundColor: '#fee', border: '2px solid red', margin: '1rem' }}>
          <h2 style={{ color: 'red' }}>Something went wrong</h2>
          <pre style={{ 
            whiteSpace: 'pre-wrap', 
            wordBreak: 'break-word',
            backgroundColor: '#f5f5f5',
            padding: '1rem',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            {this.state.error && this.state.error.toString()}
            {'\n\n'}
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
          <details style={{ marginTop: '1rem', cursor: 'pointer' }}>
            <summary>Full Error Info</summary>
            <pre style={{ fontSize: '11px', marginTop: '1rem' }}>
              {JSON.stringify({ error: this.state.error?.toString(), errorInfo: this.state.errorInfo }, null, 2)}
            </pre>
          </details>
        </div>
      )
    }

    return this.props.children
  }
}
