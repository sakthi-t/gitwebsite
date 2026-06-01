import MarkdownPage from '../components/MarkdownPage'
import content from '../../commands.md?raw'

export default function Commands() {
  return <MarkdownPage content={content} />
}
