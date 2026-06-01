import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">Haney Coding Agent</div>
        <div className="footer-text">Built by Sakthivel T</div>
        <div className="footer-links">
          <a href="https://github.com/sakthi-t/haneycli" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <span aria-hidden="true">·</span>
          <a href="https://www.linkedin.com/in/sakthi-t/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <span aria-hidden="true">·</span>
          <a href="mailto:t.shakthi@gmail.com">t.shakthi@gmail.com</a>
        </div>
        <div className="footer-text footer-release">First Release: June 1, 2026</div>
      </div>
    </footer>
  )
}
