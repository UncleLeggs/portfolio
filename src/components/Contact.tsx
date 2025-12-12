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
        <h2 className="section-title">
          <span className="title-decorator">{"<"}</span>
          Get In Touch
          <span className="title-decorator">{"/>"}</span>
        </h2>
        <div className="contact-content">
          <p className="contact-intro">
            I'm always open to discussing new opportunities, interesting projects,
            or just having a chat about technology. Feel free to reach out!
          </p>
          <div className="contact-methods">
            <button className="contact-card" onClick={handleCopyEmail}>
              <span className="contact-icon">📧</span>
              <span className="contact-label">Email</span>
              <span className="contact-value">
                {copied ? "Copied! ✓" : "Click to copy"}
              </span>
            </button>
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
