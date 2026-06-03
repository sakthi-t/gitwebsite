import MarkdownPage from '../components/MarkdownPage'
import content from '../../history.md?raw'

export default function History() {
  return <MarkdownPage content={content} />
}
