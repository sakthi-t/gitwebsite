import ReactMarkdown from 'react-markdown'

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

function HeadingRenderer({ level, children, ...props }) {
  const text = Array.isArray(children)
    ? children.map((c) => (typeof c === 'string' ? c : c?.props?.children ?? '')).join('')
    : String(children ?? '')

  const id = slugify(text)
  const Tag = `h${level}`

  return (
    <Tag id={id} className="markdown-heading" {...props}>
      <a href={`#${id}`} className="heading-anchor" aria-label={text}>
        #
      </a>
      {children}
    </Tag>
  )
}

export default function MarkdownPage({ content }) {
  return (
    <div className="markdown-page">
      <ReactMarkdown
        components={{
          h1: (props) => <HeadingRenderer level={1} {...props} />,
          h2: (props) => <HeadingRenderer level={2} {...props} />,
          h3: (props) => <HeadingRenderer level={3} {...props} />,
          h4: (props) => <HeadingRenderer level={4} {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
