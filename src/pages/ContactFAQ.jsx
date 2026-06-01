import { useState } from 'react'
import './ContactFAQ.css'

const faqItems = [
  {
    question: 'Who is Haney?',
    answer: 'Haney is an apartment cat fed by Sakthivel T. She is a female calico cat and the inspiration behind the project\'s name. While she has never written Python code, she has supervised numerous coding sessions.',
  },
  {
    question: 'Is Haney open source?',
    answer: 'Yes. Haney is open source and can be modified, extended, and tailored for individual or organizational use cases.',
  },
  {
    question: 'Do you collect data?',
    answer: 'No. Haney does not collect user data. Project data remains in your local .haney directory. No analytics. No telemetry. No data harvesting. No selling data.',
  },
  {
    question: 'Why should I use Haney?',
    answer: 'Use Haney if you value transparency, local project awareness, control over providers and models, simple configuration, and open-source tooling. If those things are important to you, Haney may be a good fit.',
  },
  {
    question: 'Why are only a few providers supported?',
    answer: 'The project is still evolving. Additional providers and integrations may be added in future releases.',
  },
  {
    question: 'Why can\'t I log in using my AI subscription account?',
    answer: 'Direct subscription-based authentication is not currently supported. This functionality may be implemented in a future release.',
  },
  {
    question: 'How was Haney tested?',
    answer: 'Haney has primarily been tested using GPT-5.4 and DeepSeek. Testing coverage will continue to improve as the project evolves.',
  },
  {
    question: 'What if I encounter issues?',
    answer: 'Please send an email describing the issue as precisely as possible. Helpful information includes what happened, steps to reproduce, error messages, and screenshots (if available). Email: t.shakthi@gmail.com',
  },
  {
    question: 'How can I help?',
    answer: 'The easiest way to help is: (1) Use Haney, (2) Build something with it, (3) Share feedback, (4) Tell others if you find it useful. If you would like to contribute code, documentation, ideas, testing, or other forms of support, feel free to get in touch.',
  },
]

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  function toggle(index) {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className="contact-faq">
      {/* About Section */}
      <section className="cf-section">
        <h1>About, Contact &amp; FAQ</h1>
        <h2>About</h2>
        <h3>Sakthivel T</h3>
        <p>Former Civil Engineer turned software and AI enthusiast.</p>
        <p>Interested in building practical AI systems including:</p>
        <ul>
          <li>Retrieval-Augmented Generation (RAG) applications</li>
          <li>E-commerce solutions</li>
          <li>Voice agents</li>
          <li>AI automation tools</li>
          <li>Coding agents</li>
          <li>Developer productivity software</li>
        </ul>
        <p>
          Haney started as a personal effort to create a transparent, terminal-native coding
          assistant that developers can understand, modify, and control.
        </p>
        <p>
          The goal is simple: <strong>Build useful tools. Learn continuously. Share them with the community.</strong>
        </p>
      </section>

      <hr />

      {/* Contact Section */}
      <section className="cf-section">
        <h2>Contact</h2>
        <h3>Email</h3>
        <p>
          <a href="mailto:t.shakthi@gmail.com">t.shakthi@gmail.com</a>
        </p>
        <h3>LinkedIn</h3>
        <p>
          <a href="https://www.linkedin.com/in/sakthi-t/" target="_blank" rel="noopener noreferrer">
            linkedin.com/in/sakthi-t
          </a>
        </p>
      </section>

      <hr />

      {/* FAQ Section */}
      <section className="cf-section">
        <h2>FAQ</h2>
        <div className="faq-list">
          {faqItems.map((item, i) => (
            <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span className="faq-chevron">{openIndex === i ? '▼' : '▶'}</span>
                <span>{item.question}</span>
              </button>
              {openIndex === i && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <hr />

      {/* Final Note */}
      <section className="cf-section cf-final">
        <h2>Final Note</h2>
        <p>Haney is still young.</p>
        <p>
          The project will improve gradually through usage, feedback, bug reports, and contributions.
        </p>
        <p>Thank you for trying it.</p>
        <p>
          And thank you on behalf of Haney the cat, who remains completely unaware of all of this.
        </p>
      </section>
    </div>
  )
}
