import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <header className="home-hero">
        <pre className="ascii-cat">
{`  /\\_/\\
 ( o.o )
  > ^ <`}
        </pre>

        <h1 className="home-title">Haney Coding Agent</h1>
        <p className="home-tagline">
          Keep it simple. Own your coding environment — not the other way around.
        </p>

        <div className="home-install">
          <code>pip install haney</code>
        </div>

        <p className="home-description">
          Haney is a terminal-native AI coding agent built with Python, Typer, Rich, and LiteLLM.
          No subscriptions. No lock-in. No hidden cloud services. No mystery prompts.
          Bring your own API key and work the way you want.
        </p>

        <div className="home-links">
          <Link to="/architecture" className="home-link">Documentation</Link>
          <a href="https://github.com/sakthi-t/haneycli" className="home-link" target="_blank" rel="noopener noreferrer">GitHub →</a>
        </div>

        <p className="home-release">First Release: <strong>June 1, 2026</strong></p>
      </header>

      <hr />

      <section className="home-philosophy">
        <h2>Philosophy</h2>
        <blockquote>
          Your coding assistant should adapt to your workflow. You should not have to adapt to your coding assistant.
        </blockquote>
        <p>
          Haney is designed around transparency, control, simplicity, and developer ownership.
          It is open source and evolves one feature at a time.
        </p>
        <p>
          No hype. No promises of replacing developers. Just a practical coding assistant that helps you build software.
        </p>
      </section>

      <hr />

      <section className="home-cat">
        <h2>Meet Haney</h2>
        <p>
          Haney is an apartment cat who serves as the project&apos;s unofficial Chief Executive Cat.
          She is a female calico cat.
        </p>
        <p>Her responsibilities currently include:</p>
        <ul>
          <li>Sleeping</li>
          <li>Demanding food</li>
          <li>Ignoring feature requests</li>
          <li>Quality assurance through random keyboard inspections</li>
        </ul>
        <p>Her performance reviews remain consistently positive.</p>
      </section>
    </div>
  )
}
