# Haney Docs

Documentation website for [Haney Coding Agent](https://github.com/sakthi-t/haneycli) — a terminal-native AI coding assistant.

## Tech Stack

React · Vite · React Router · React Markdown

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`. Deploy that folder to any static host (Netlify, Vercel, etc).

## Structure

```
src/
├── App.jsx              # Routes
├── pages/               # Page components
│   ├── Home.jsx         # Landing page
│   ├── ContactFAQ.jsx   # FAQ with accordion
│   └── *.jsx            # Doc pages (wrap .md files)
├── components/          # Layout, Navbar, Footer, Search
└── *.md                 # Markdown content (imported as raw)
```

## Related

- [Haney CLI](https://github.com/sakthi-t/haneycli) — the actual tool
- First release: June 1, 2026
