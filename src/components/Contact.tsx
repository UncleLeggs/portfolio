import { useState } from "react";
import { personalInfo } from "../data/portfolio";

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "oleg.v.maksimov@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2 className="section-title fancy-title">
          <span className="title-icon">📬</span>
          <span className="title-text">
            <span className="title-main">Get In Touch</span>
            <span className="title-sub">Let's build something together</span>
          </span>
        </h2>
        <div className="contact-content">
          <p className="contact-intro">
            I'm always open to discussing new opportunities, interesting projects,
            or just having a chat about technology. Feel free to reach out!
          </p>
          <div className="contact-methods">
            <div className="contact-card email-card">
              <span className="contact-icon">✉️</span>
              <span className="contact-label">Email</span>
              <span className="contact-value">{email}</span>
              <div className="email-actions">
                <a
                  href={`mailto:${email}`}
                  className="email-action-btn"
                  title="Send email"
                >
                  📤 Send
                </a>
                <button
                  className="email-action-btn"
                  onClick={handleCopyEmail}
                  title="Copy email"
                >
                  {copied ? "✓ Copied" : "📋 Copy"}
                </button>
              </div>
            </div>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <span className="contact-icon">💼</span>
              <span className="contact-label">LinkedIn</span>
              <span className="contact-value">Let's connect</span>
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <span className="contact-icon">🐙</span>
              <span className="contact-label">GitHub</span>
              <span className="contact-value">View my code</span>
            </a>
            <a
              href={personalInfo.cvPath}
              download
              className="contact-card"
            >
              <span className="contact-icon">📄</span>
              <span className="contact-label">Resume</span>
              <span className="contact-value">Download PDF</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
