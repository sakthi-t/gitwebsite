import { useState, useRef, useEffect, useCallback } from 'react'
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
  { to: '/mcp', label: 'MCP' },
]

export default function Navbar() {
  const [docsOpen, setDocsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownFocusIndex, setDropdownFocusIndex] = useState(-1)
  const dropdownRef = useRef(null)
  const triggerRef = useRef(null)
  const mobileListRef = useRef(null)
  const toggleRef = useRef(null)
  const itemRefs = useRef([])
  const location = useLocation()

  const isDocsActive = docsLinks.some(link => link.to === location.pathname)

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDocsOpen(false)
        setDropdownFocusIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  /* ── Close mobile menu on route change ── */
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  /* ── Focus first dropdown item when opened ── */
  useEffect(() => {
    if (docsOpen && itemRefs.current[0]) {
      setDropdownFocusIndex(0)
      itemRefs.current[0].focus()
    }
  }, [docsOpen])

  /* ── Dropdown keyboard nav ── */
  const handleDropdownKeyDown = useCallback((e) => {
    const items = itemRefs.current.filter(Boolean)

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!docsOpen) {
        setDocsOpen(true)
        return // useEffect will focus first item
      }
      const next = dropdownFocusIndex < items.length - 1 ? dropdownFocusIndex + 1 : 0
      setDropdownFocusIndex(next)
      items[next]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!docsOpen) {
        setDocsOpen(true)
        return
      }
      const prev = dropdownFocusIndex > 0 ? dropdownFocusIndex - 1 : items.length - 1
      setDropdownFocusIndex(prev)
      items[prev]?.focus()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setDocsOpen(false)
      setDropdownFocusIndex(-1)
      triggerRef.current?.focus()
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (!docsOpen) {
        e.preventDefault()
        setDocsOpen(true)
      }
    }
  }, [docsOpen, dropdownFocusIndex])

  /* ── Dropdown item key persistence ── */
  const handleDropdownItemKeyDown = (e, index) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      // Let parent handler manage — but update index for tracking
    }
    setDropdownFocusIndex(index)
  }

  /* ── Mobile menu keyboard nav ── */
  const handleMobileKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      setMobileOpen(false)
      toggleRef.current?.focus()
    }
  }, [])

  const closeMobile = () => {
    setMobileOpen(false)
    toggleRef.current?.focus()
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          Haney
        </Link>

        <button
          ref={toggleRef}
          className="navbar-toggle"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className={`hamburger ${mobileOpen ? 'open' : ''}`} />
        </button>

        <ul
          ref={mobileListRef}
          className={`navbar-links ${mobileOpen ? 'mobile-open' : ''}`}
          onKeyDown={(e) => {
            if (mobileOpen) handleMobileKeyDown(e)
          }}
        >
          <li><NavLink to="/" end className="nav-link" onClick={closeMobile}>Home</NavLink></li>

          <li className="nav-dropdown" ref={dropdownRef}>
            <button
              ref={triggerRef}
              className={`nav-link nav-dropdown-trigger ${isDocsActive ? 'active' : ''}`}
              onClick={() => setDocsOpen(o => !o)}
              onKeyDown={handleDropdownKeyDown}
              aria-expanded={docsOpen}
              aria-haspopup="true"
            >
              Docs
              <span className={`chevron ${docsOpen ? 'open' : ''}`} aria-hidden="true">▾</span>
            </button>
            {docsOpen && (
              <ul className="nav-dropdown-menu" role="menu" aria-label="Documentation pages">
                {docsLinks.map((link, i) => (
                  <li key={link.to} role="none">
                    <NavLink
                      to={link.to}
                      className="nav-dropdown-item"
                      role="menuitem"
                      ref={(el) => { itemRefs.current[i] = el }}
                      onKeyDown={(e) => handleDropdownItemKeyDown(e, i)}
                      onClick={() => { setDocsOpen(false); setDropdownFocusIndex(-1) }}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li><NavLink to="/roadmap" className="nav-link" onClick={closeMobile}>Roadmap</NavLink></li>
          <li><NavLink to="/history" className="nav-link" onClick={closeMobile}>History</NavLink></li>
          <li><NavLink to="/contact" className="nav-link" onClick={closeMobile}>Contact</NavLink></li>

          <li className="nav-search-mobile">
            <Search />
          </li>
        </ul>

        <div className="nav-search-desktop">
          <Search />
        </div>
      </div>
    </nav>
  )
}
