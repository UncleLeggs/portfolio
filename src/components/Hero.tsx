import { useState } from "react";
import { personalInfo, easterEggs } from "../data/portfolio";
import { useTypewriter } from "../hooks/useTypewriter";

export const Hero = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const { displayedText: name } = useTypewriter(personalInfo.name, 80, 300);
  const { displayedText: title, isComplete } = useTypewriter(
    personalInfo.title,
    40,
    1200
  );

  const handleNameClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= easterEggs.clickThreshold) {
      setShowSecret(true);
      setTimeout(() => setShowSecret(false), 3000);
      setClickCount(0);
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-greeting">Hello, I'm</div>
        <h1 className="hero-name" onClick={handleNameClick}>
          {name}
          <span className="cursor">|</span>
        </h1>
        <h2 className="hero-title">{title}</h2>
        {isComplete && (
          <p className="hero-tagline fade-in">{personalInfo.tagline}</p>
        )}
        <div className="hero-cta fade-in-delayed">
          <a
            href={personalInfo.cvPath}
            download
            className="btn btn-primary"
          >
            📄 Download CV
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            💼 LinkedIn
          </a>
          <a href="#contact" className="btn btn-outline">
            ✉️ Contact
          </a>
        </div>
      </div>

      {showSecret && (
        <div className="secret-message">
          🎉 You found an easter egg! Keep exploring...
        </div>
      )}

      <div className="scroll-indicator">
        <span>Scroll to explore</span>
        <div className="scroll-arrow">↓</div>
      </div>
    </section>
  );
};
