import { useState, useRef, useEffect } from 'react'
import './ContactPage.css'

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
    answer: 'Please use the contact form on this page and describe the issue as precisely as possible. Helpful information includes what happened, steps to reproduce, error messages, and screenshots (if available).',
  },
  {
    question: 'How can I help?',
    answer: 'The easiest way to help is: (1) Use Haney, (2) Build something with it, (3) Share feedback, (4) Tell others if you find it useful. If you would like to contribute code, documentation, ideas, testing, or other forms of support, feel free to get in touch via the contact form.',
  },
]

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default function ContactPage() {
  const [openIndex, setOpenIndex] = useState(null)
  const [form, setForm] = useState({ 'first-name': '', 'last-name': '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const statusRef = useRef(null)

  /* ── Move focus to status banner after submit ── */
  useEffect(() => {
    if ((status === 'success' || status === 'error') && statusRef.current) {
      statusRef.current.focus()
    }
  }, [status])

  /* ── Validation ── */
  function validateField(name, value) {
    const trimmed = value.trim()
    switch (name) {
      case 'first-name':
      case 'last-name': {
        if (!trimmed) return 'Required.'
        if (trimmed.length < 2) return 'At least 2 characters.'
        return ''
      }
      case 'email': {
        if (!trimmed) return 'Required.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) return 'Enter a valid email address.'
        return ''
      }
      case 'message': {
        if (!trimmed) return 'Required.'
        if (trimmed.length < 10) return 'At least 10 characters.'
        return ''
      }
      default:
        return ''
    }
  }

  function validateAll(data) {
    const errs = {}
    for (const [key, value] of Object.entries(data)) {
      const msg = validateField(key, value)
      if (msg) errs[key] = msg
    }
    return errs
  }

  function toggle(index) {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // clear error once field becomes valid
    if (errors[name]) {
      const msg = validateField(name, value)
      if (!msg) {
        setErrors((prev) => {
          const next = { ...prev }
          delete next[name]
          return next
        })
      }
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const msg = validateField(name, value)
    setErrors((prev) => {
      if (msg) return { ...prev, [name]: msg }
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    // mark every field as touched
    setTouched({ 'first-name': true, 'last-name': true, email: true, message: true })

    const errs = validateAll(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus('sending')

    // trim values before sending
    const trimmed = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, v.trim()])
    )

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...trimmed }),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ 'first-name': '', 'last-name': '', email: '', message: '' })
        setErrors({})
        setTouched({})
        setTimeout(() => setStatus(null), 6000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="contact-page">
      {/* Page Header */}
      <header className="contact-header">
        <h1>Contact</h1>
        <p className="contact-subtitle">
          Questions, bug reports, feedback, feature requests, or contributor inquiries are welcome.
        </p>
        <p className="contact-note">
          For Haney-related issues, please describe the problem clearly and include screenshots if possible.
        </p>
      </header>

      {/* About Section */}
      <section className="contact-section">
        <h2>About the Author</h2>
        <div className="about-card">
          <div className="about-card-header">
            <span className="about-name">Sakthivel T</span>
            <span className="about-badge">Creator &amp; Maintainer</span>
          </div>
          <p className="about-bio">
            Former Civil Engineer turned software and AI enthusiast. Passionate about building
            practical, transparent AI tools that developers can understand, modify, and control.
          </p>
          <p className="about-interests-label">Current focus areas:</p>
          <ul className="about-interests">
            <li>Retrieval-Augmented Generation (RAG)</li>
            <li>E-commerce systems</li>
            <li>Voice agents</li>
            <li>AI automation &amp; coding agents</li>
            <li>Developer productivity tooling</li>
          </ul>
          <p className="about-philosophy">
            <strong>Philosophy:</strong> Build useful tools. Learn continuously.
            Share them with the community.
          </p>
          <div className="about-links">
            <a
              href="https://github.com/sakthi-t/haneycli"
              target="_blank"
              rel="noopener noreferrer"
              className="about-link"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sakthi-t/"
              target="_blank"
              rel="noopener noreferrer"
              className="about-link"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <hr />

      {/* Contact Form Section */}
      <section className="contact-section">
        <h2>Send a Message</h2>
        <p className="section-description">
          Use the form below or connect on{' '}
          <a href="https://www.linkedin.com/in/sakthi-t/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>{' '}
          for professional inquiries.
        </p>

        <div className="form-card">
          <form
            name="contact"
            method="POST"
            onSubmit={handleSubmit}
            className="contact-form"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden-field" aria-hidden="true">
              <label htmlFor="cf-bot-field">
                Don&apos;t fill this out:{' '}
                <input id="cf-bot-field" name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            <div className="form-row">
              <div className={`form-group${errors['first-name'] && touched['first-name'] ? ' error' : ''}`}>
                <label htmlFor="cf-name">First Name</label>
                <input
                  id="cf-name"
                  type="text"
                  name="first-name"
                  value={form['first-name']}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-required="true"
                  placeholder="Your first name"
                  aria-invalid={!!(errors['first-name'] && touched['first-name'])}
                  aria-describedby={errors['first-name'] && touched['first-name'] ? 'cf-name-err' : undefined}
                />
                {errors['first-name'] && touched['first-name'] && (
                  <span id="cf-name-err" className="field-error" role="alert">{errors['first-name']}</span>
                )}
              </div>

              <div className={`form-group${errors['last-name'] && touched['last-name'] ? ' error' : ''}`}>
                <label htmlFor="cf-last">Last Name</label>
                <input
                  id="cf-last"
                  type="text"
                  name="last-name"
                  value={form['last-name']}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-required="true"
                  placeholder="Your last name"
                  aria-invalid={!!(errors['last-name'] && touched['last-name'])}
                  aria-describedby={errors['last-name'] && touched['last-name'] ? 'cf-last-err' : undefined}
                />
                {errors['last-name'] && touched['last-name'] && (
                  <span id="cf-last-err" className="field-error" role="alert">{errors['last-name']}</span>
                )}
              </div>

              <div className={`form-group${errors.email && touched.email ? ' error' : ''}`}>
                <label htmlFor="cf-email">Email</label>
                <input
                  id="cf-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-required="true"
                  placeholder="you@example.com"
                  aria-invalid={!!(errors.email && touched.email)}
                  aria-describedby={errors.email && touched.email ? 'cf-email-err' : undefined}
                />
                {errors.email && touched.email && (
                  <span id="cf-email-err" className="field-error" role="alert">{errors.email}</span>
                )}
              </div>
            </div>

            <div className={`form-group${errors.message && touched.message ? ' error' : ''}`}>
              <label htmlFor="cf-message">Message</label>
              <textarea
                id="cf-message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-required="true"
                placeholder="Tell me what's on your mind…"
                aria-invalid={!!(errors.message && touched.message)}
                aria-describedby={errors.message && touched.message ? 'cf-message-err' : undefined}
              />
              {errors.message && touched.message && (
                <span id="cf-message-err" className="field-error" role="alert">{errors.message}</span>
              )}
            </div>

            <button type="submit" className="btn-submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>

            {status === 'success' && (
              <div className="form-status form-success" role="status" tabIndex={-1} ref={statusRef}>
                <span className="form-status-icon">✓</span>
                Thank you. Your message has been received.
              </div>
            )}
            {status === 'error' && (
              <div className="form-status form-error" role="alert" tabIndex={-1} ref={statusRef}>
                <span className="form-status-icon">⚠</span>
                Something went wrong. Please try again, or reach out via{' '}
                <a href="https://www.linkedin.com/in/sakthi-t/" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>.
              </div>
            )}
          </form>
        </div>
      </section>

      <hr />

      {/* FAQ Section */}
      <section className="contact-section">
        <h2>Frequently Asked Questions</h2>
        <p className="section-description">
          Quick answers to common questions about Haney.
        </p>
        <ul className="faq-list">
          {faqItems.map((item, i) => (
            <li key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="faq-chevron" aria-hidden="true">
                  {openIndex === i ? '▼' : '▶'}
                </span>
                <span>{item.question}</span>
              </button>
              <div
                id={`faq-answer-${i}`}
                className="faq-answer"
                role="region"
                hidden={openIndex !== i}
              >
                <p>{item.answer}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <hr />

      {/* Final Note */}
      <section className="contact-section contact-final">
        <h2>A Note from the Author</h2>
        <p>
          Haney is still young. The project will improve gradually through usage, feedback,
          bug reports, and contributions.
        </p>
        <p>Thank you for trying it.</p>
        <p className="contact-cat-note">
          And thank you on behalf of Haney the cat, who remains completely unaware of all of this.
        </p>
      </section>
    </div>
  )
}
