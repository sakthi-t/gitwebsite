import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-brand">Haney Coding Agent</p>
        <p className="footer-text">Built by Sakthivel T</p>
        <ul className="footer-links">
          <li>
            <a href="https://github.com/sakthi-t/haneycli" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li aria-hidden="true">·</li>
          <li>
            <a href="https://www.linkedin.com/in/sakthi-t/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
        <p className="footer-text footer-release">First Release: June 1, 2026</p>
        <p className="footer-text footer-attribution">
          Cat icon by <a href="https://www.flaticon.com/free-icons/cat-animal" title="cat animal icons" target="_blank" rel="noopener noreferrer">MD Arafat Hossain — Flaticon</a>
        </p>
      </div>
    </footer>
  )
}
