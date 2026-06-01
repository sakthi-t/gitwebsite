import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Search from './Search'
import './Navbar.css'

const docsLinks = [
  { to: '/architecture', label: 'Architecture' },
  { to: '/configuration', label: 'Configuration' },
  { to: '/commands', label: 'Commands' },
  { to: '/memory-system', label: 'Memory System' },
  { to: '/project-awareness', label: 'Project Awareness' },
  { to: '/tool-system', label: 'Tool System' },
]

export default function Navbar() {
  const [docsOpen, setDocsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()

  const isDocsActive = docsLinks.some(link => link.to === location.pathname)

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDocsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          Haney
        </Link>

        <button
          className="navbar-toggle"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileOpen ? 'open' : ''}`} />
        </button>

        <div className={`navbar-links ${mobileOpen ? 'mobile-open' : ''}`}>
          <NavLink to="/" end className="nav-link">Home</NavLink>

          <div className="nav-dropdown" ref={dropdownRef}>
            <button
              className={`nav-link nav-dropdown-trigger ${isDocsActive ? 'active' : ''}`}
              onClick={() => setDocsOpen(o => !o)}
            >
              Docs
              <span className={`chevron ${docsOpen ? 'open' : ''}`}>▾</span>
            </button>
            {docsOpen && (
              <div className="nav-dropdown-menu">
                {docsLinks.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="nav-dropdown-item"
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/roadmap" className="nav-link">Roadmap</NavLink>
          <NavLink to="/contact" className="nav-link">Contact</NavLink>

          <div className="nav-search-mobile">
            <Search />
          </div>
        </div>

        <div className="nav-search-desktop">
          <Search />
        </div>
      </div>
    </nav>
  )
}
