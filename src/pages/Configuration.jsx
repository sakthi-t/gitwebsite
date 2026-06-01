import MarkdownPage from '../components/MarkdownPage'
import content from '../../configuration.md?raw'

export default function Configuration() {
  return <MarkdownPage content={content} />
}
