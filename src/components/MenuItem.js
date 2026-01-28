import * as React from "react"
import { Link } from "gatsby"

// Normalize path for comparison (remove trailing slash)
function normalizePath(path) {
  return path === "/" ? "/" : path.replace(/\/$/, "")
}

export default function MenuItem({ item, level = 0, currentPath, expandedPaths = new Set() }) {
  const normalizedCurrentPath = normalizePath(currentPath)
  const normalizedItemPath = normalizePath(item.path)
  
  // Initialize hook first (before any conditional returns)
  const [toggledExpanded, setToggledExpanded] = React.useState(false)
  
  // Handle divider items (after hooks)
  if (item.divider) {
    return (
      <div style={{ paddingLeft: `${level * 1.5}rem`, margin: '0.5rem 0' }}>
        <hr style={{ borderTop: '1px solid #e5e7eb', borderBottom: 'none', margin: 0 }} />
      </div>
    )
  }
  
  const hasChildren = item.children && item.children.length > 0
  const isCurrentPage = normalizedCurrentPath === normalizedItemPath
  const isExpanded = expandedPaths.has(normalizedItemPath)
  
  const displayExpanded = isExpanded || toggledExpanded
  const paddingLeft = `${level * 1.5}rem`
  
  // Add top border to About item
  const shouldHaveBorder = item.path === "/about" && level === 0
  const wrapperStyle = shouldHaveBorder ? {
    borderTop: '2px solid #d1d5db',
    paddingTop: '0.75rem',
    marginTop: '0.75rem',
  } : {}
  
  // Add bottom border to Explore item
  const shouldHaveBottomBorder = item.path === "/explore" && level === 0
  const bottomBorderStyle = shouldHaveBottomBorder ? {
    borderBottom: '2px solid #d1d5db',
    paddingBottom: '0.75rem',
    marginBottom: '0.75rem',
  } : {}
  
  const combinedStyle = { ...wrapperStyle, ...bottomBorderStyle }
  
  return (
    <div key={item.path} style={combinedStyle}>
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft }}>
        {hasChildren && (
          <button
            onClick={() => setToggledExpanded(!toggledExpanded)}
            style={styles.expandButton}
            aria-label={displayExpanded ? "Collapse" : "Expand"}
          >
            {displayExpanded ? "▼" : "▶"}
          </button>
        )}
        {!hasChildren && <span style={styles.noChildrenSpacer}></span>}
        
        <Link
          to={item.path}
          style={{
            ...styles.navLink,
            ...(isCurrentPage ? styles.activeLink : {}),
          }}
        >
          {item.label}
        </Link>
      </div>
      
      {hasChildren && displayExpanded && (
        <div>
          {item.children.map((child, index) => (
            <MenuItem
              key={child.divider ? `divider-${index}` : child.path}
              item={child}
              level={level + 1}
              currentPath={currentPath}
              expandedPaths={expandedPaths}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  expandButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.25rem 0.5rem',
    color: '#0066cc',
    fontSize: '0.9rem',
    marginRight: '0.25rem',
  },
  noChildrenSpacer: {
    display: 'inline-block',
    width: '1.75rem',
  },
  navLink: {
    display: 'block',
    padding: '0.5rem',
    color: '#0066cc',
    textDecoration: 'none',
    borderRadius: '4px',
    flex: 1,
  },
  activeLink: {
    backgroundColor: '#e0e0ff',
    color: '#0033aa',
    fontWeight: 'bold',
  },
}
