# Release History

All notable changes to Haney CLI.

<div class="history-list">

<div class="release-card release-latest">
  <div class="release-header">
    <span class="release-badge">Latest</span>
    <span class="release-tag">v0.1.3</span>
    <span class="release-date">June 3, 2026</span>
  </div>
  <h3 class="release-title">MCP Expansion &amp; 8-Server Architecture</h3>
  <div class="release-body">

### New MCP Servers (7 added — 8 total)

<div class="server-grid">
  <div class="server-card">
    <span class="server-num">1</span>
    <span class="server-name">GitHub</span>
    <span class="server-auth auth-oauth">OAuth PAT</span>
    <span class="server-desc">Issues, PRs, commits, search</span>
  </div>
  <div class="server-card server-new">
    <span class="server-num">2</span>
    <span class="server-name">DuckDuckGo</span>
    <span class="server-auth auth-none">No auth</span>
    <span class="server-desc">Web search &amp; content fetch</span>
  </div>
  <div class="server-card server-new">
    <span class="server-num">3</span>
    <span class="server-name">Stack Overflow</span>
    <span class="server-auth auth-none">No auth</span>
    <span class="server-desc">Q&amp;A lexical search via mcp-remote</span>
  </div>
  <div class="server-card server-new">
    <span class="server-num">4</span>
    <span class="server-name">MDN Web Docs</span>
    <span class="server-auth auth-none">No auth</span>
    <span class="server-desc">Docs, CSS, browser compat</span>
  </div>
  <div class="server-card server-new">
    <span class="server-num">5</span>
    <span class="server-name">Filesystem</span>
    <span class="server-auth auth-none">No auth</span>
    <span class="server-desc">Secure file ops within allowed paths</span>
  </div>
  <div class="server-card server-new">
    <span class="server-num">6</span>
    <span class="server-name">Sequential Thinking</span>
    <span class="server-auth auth-none">No auth</span>
    <span class="server-desc">Structured reasoning with revisions</span>
  </div>
  <div class="server-card server-new">
    <span class="server-num">7</span>
    <span class="server-name">Playwright</span>
    <span class="server-auth auth-none">No auth</span>
    <span class="server-desc">Browser automation &amp; screenshots</span>
  </div>
  <div class="server-card">
    <span class="server-num">8</span>
    <span class="server-name">LangChain</span>
    <span class="server-auth auth-none">No auth</span>
    <span class="server-desc">LangChain/LangGraph docs search</span>
  </div>
</div>

### Key Improvements

<div class="improvements-grid">
  <div class="improvement-item">
    <span class="improvement-icon">⚙️</span>
    <div><strong>extra_env</strong> on <code>MCPServerConfig</code> — pass env vars to MCP subprocesses</div>
  </div>
  <div class="improvement-item">
    <span class="improvement-icon">🔒</span>
    <div><strong>MDN privacy</strong> — <code>MOZ_OPT_OUT=1</code> set by default for analytics opt‑out</div>
  </div>
  <div class="improvement-item">
    <span class="improvement-icon">📁</span>
    <div><strong>Commands refactor</strong> — 1300+ line <code>commands.py</code> split into 12 modular files under <code>commands/</code></div>
  </div>
  <div class="improvement-item">
    <span class="improvement-icon">📋</span>
    <div><strong>Bracketed paste</strong> support for clean multi‑line input</div>
  </div>
  <div class="improvement-item">
    <span class="improvement-icon">🐛</span>
    <div><strong>Bug fixes</strong> — <code>Conversation.__iter__</code>, base64 tool input regression, DuckDuckGo errors</div>
  </div>
  <div class="improvement-item">
    <span class="improvement-icon">✨</span>
    <div><strong>UX polish</strong> — Composer backspace fix, consistent exit behavior</div>
  </div>
  <div class="improvement-item">
    <span class="improvement-icon">🧹</span>
    <div><strong>Cleanup</strong> — removed <code>requirements.txt</code>; <code>pyproject.toml</code> is now single source of truth</div>
  </div>
</div>

<div class="release-stats">30 files changed · 3,380 insertions · 2,012 deletions · <code>d889569</code></div>

  </div>
</div>

<div class="release-card">
  <div class="release-header">
    <span class="release-tag">v0.1.2</span>
    <span class="release-date">June 2, 2026</span>
  </div>
  <h3 class="release-title">StackOverflow MCP &amp; Git/GH Commands</h3>
  <div class="release-body">

- ✅ StackOverflow MCP server integrated
- ✅ Git commands and programming language commands now allowed
- ✅ Shell tool improvements and redundancy fixes
- ✅ Config updates for new MCP and command support

  </div>
</div>

<div class="release-card">
  <div class="release-header">
    <span class="release-tag">v0.1.1</span>
    <span class="release-date">June 2, 2026</span>
  </div>
  <h3 class="release-title">GitHub MCP Implemented</h3>
  <div class="release-body">

GitHub MCP implemented and shell redundancies fixed.

  </div>
</div>

<div class="release-card">
  <div class="release-header">
    <span class="release-tag">v0.1.0</span>
    <span class="release-date">May 31, 2026</span>
  </div>
  <h3 class="release-title">Initial Release</h3>
  <div class="release-body">

Initial release of Haney CLI — a terminal-based AI coding assistant built with Python, Typer, Rich, and LiteLLM.

  </div>
</div>

</div>
