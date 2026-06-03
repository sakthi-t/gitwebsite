import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Architecture from './pages/Architecture'
import Configuration from './pages/Configuration'
import Commands from './pages/Commands'
import MemorySystem from './pages/MemorySystem'
import ProjectAwareness from './pages/ProjectAwareness'
import ToolSystem from './pages/ToolSystem'
import MCP from './pages/MCP'
import History from './pages/History'
import Roadmap from './pages/Roadmap'
import ContactPage from './pages/ContactPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/configuration" element={<Configuration />} />
        <Route path="/commands" element={<Commands />} />
        <Route path="/memory-system" element={<MemorySystem />} />
        <Route path="/project-awareness" element={<ProjectAwareness />} />
        <Route path="/tool-system" element={<ToolSystem />} />
        <Route path="/mcp" element={<MCP />} />
        <Route path="/history" element={<History />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}

export default App
