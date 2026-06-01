import MarkdownPage from '../components/MarkdownPage'
import content from '../../roadmap.md?raw'

export default function Roadmap() {
  return <MarkdownPage content={content} />
}
