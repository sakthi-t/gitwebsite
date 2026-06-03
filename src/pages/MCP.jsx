import MarkdownPage from '../components/MarkdownPage'
import content from '../../mcp.md?raw'

export default function MCP() {
  return <MarkdownPage content={content} />
}
