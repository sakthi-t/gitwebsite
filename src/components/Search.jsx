import { useState, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import './Search.css'

// Static search index built from documentation content
const searchIndex = [
  {
    title: 'Home',
    route: '/',
    terms: ['haney', 'coding', 'agent', 'pip', 'install', 'terminal', 'cat', 'ascii', 'philosophy', 'open source'],
  },
  {
    title: 'Architecture',
    route: '/architecture',
    terms: ['architecture', 'overview', 'high-level', 'directory', 'structure', 'subsystems', 'chat', 'loop', 'chatsession', 'context', 'injection', 'pipeline', 'tool', 'execution', 'configuration', 'system', 'mode', 'provider', 'abstraction', 'data', 'flow', 'design', 'decisions', 'langchain', 'config.json', 'env', 'vars', 'trash', 'plan', 'default', 'memory.md', 'summary.md'],
  },
  {
    title: 'Configuration',
    route: '/configuration',
    terms: ['configuration', 'config.json', 'haney', 'directory', 'setup', 'wizard', 'schema', 'bootstrap', 'auto-populate', 'providers', 'models', 'api', 'key', 'openai', 'anthropic', 'deepseek', 'gemini', 'thinking', 'mode', 'plan', 'edit', 'permission', 'ask', 'save', 'auto', 'search', 'exa', 'system.md', 'env', 'environment', 'variables'],
  },
  {
    title: 'Commands',
    route: '/commands',
    terms: ['commands', 'slash', 'edit', 'plan', 'remember', 'compact', 'history', 'sessions', 'models', 'thinking', 'search', 'file', 'read', 'write', 'help', 'clear', 'exit', 'config', 'providers', 'restore', 'trash', 'cost', 'tokens', 'mode', 'permission'],
  },
  {
    title: 'Memory System',
    route: '/memory-system',
    terms: ['memory', 'system', 'memory.md', 'summary.md', 'remember', 'compact', 'long-term', 'conversation', 'compression', 'token', 'context', 'window', 'session', 'persistence'],
  },
  {
    title: 'Project Awareness',
    route: '/project-awareness',
    terms: ['project', 'awareness', 'context', 'plan.md', 'memory.md', 'summary.md', 'readme.md', 'auto-discovery', 'file', 'discovery', 'directory', 'preamble', 'injection'],
  },
  {
    title: 'Tool System',
    route: '/tool-system',
    terms: ['tool', 'system', 'file', 'tools', 'shell', 'read', 'write', 'edit', 'rename', 'trash', 'restore', 'execute', 'whitelist', 'blacklist', 'permission', 'approval', 'sandboxing', 'safety'],
  },
  {
    title: 'MCP',
    route: '/mcp',
    terms: ['mcp', 'model', 'context', 'protocol', 'servers', 'github', 'duckduckgo', 'stack', 'overflow', 'mdn', 'filesystem', 'sequential', 'thinking', 'langchain', 'playwright', 'tavily', 'notion', 'json-rpc', 'stdio', 'transport', 'tools', 'namespaces', 'security', 'oauth', 'api', 'key', 'token', 'integration', 'commands', 'connect', 'disconnect', 'status', 'architecture'],
  },
  {
    title: 'History',
    route: '/history',
    terms: ['history', 'release', 'changelog', 'version', 'v0.1.0', 'v0.1.1', 'v0.1.2', 'v0.1.3', 'initial', 'mcp', 'servers', 'github', 'stackoverflow', 'duckduckgo', 'playwright', 'expansion', 'git', 'commands'],
  },
  {
    title: 'Roadmap',
    route: '/roadmap',
    terms: ['roadmap', 'completed', 'short-term', 'medium-term', 'long-term', 'mcp', 'autonomous', 'agent', 'search', 'providers', 'session', 'restoration', 'git', 'voice', 'plugin', 'multi-modal', 'collaborative', 'ide', 'local-first', 'debugging', 'contributing'],
  },
  {
    title: 'Contact & FAQ',
    route: '/contact',
    terms: ['contact', 'faq', 'about', 'sakthivel', 'email', 'linkedin', 'who', 'haney', 'open', 'source', 'data', 'collect', 'privacy', 'providers', 'supported', 'subscription', 'tested', 'gpt', 'deepseek', 'issues', 'help', 'contribute'],
  },
]

export default function Search() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef(null)
  const containerRef = useRef(null)
  const navigate = useNavigate()

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return searchIndex
      .filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(q)
        const termMatch = item.terms.some((t) => t.includes(q))
        return titleMatch || termMatch
      })
      .slice(0, 8)
  }, [query])

  useEffect(() => {
    setSelectedIndex(-1)
    setOpen(query.trim().length > 0)
  }, [query])

  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSelect(route) {
    setOpen(false)
    setQuery('')
    navigate(route)
  }

  function handleKeyDown(e) {
    if (!open || results.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      handleSelect(results[selectedIndex].route)
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  return (
    <div className="search-container" ref={containerRef}>
      <div className="search-input-wrapper">
        <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search docs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setOpen(true)}
        />
        {query && (
          <button
            className="search-clear"
            onClick={() => { setQuery(''); inputRef.current?.focus() }}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="search-results">
          {results.map((item, i) => (
            <button
              key={item.route}
              className={`search-result-item ${i === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleSelect(item.route)}
              onMouseEnter={() => setSelectedIndex(i)}
            >
              <span className="search-result-title">{item.title}</span>
              <span className="search-result-route">{item.route === '/' ? 'Home' : item.route}</span>
            </button>
          ))}
        </div>
      )}

      {open && query.trim() && results.length === 0 && (
        <div className="search-results">
          <div className="search-no-results">No results found</div>
        </div>
      )}
    </div>
  )
}
