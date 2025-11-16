import './Navigation.module.css'

interface NavigationProps {
  onBackClick?: () => void
  onAddClick?: () => void
  showAdd?: boolean
}

export default function Navigation({ onBackClick, onAddClick, showAdd = true }: NavigationProps) {
  return (
    <nav className="navigation">
      <button className="nav-button" onClick={onBackClick}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>Back</span>
      </button>
      
      {showAdd && (
        <button className="nav-button" onClick={onAddClick}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>Add</span>
        </button>
      )}
    </nav>
  )
}
