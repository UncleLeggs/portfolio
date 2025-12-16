import { useState } from "react";
import { personalInfo, easterEggs } from "../data/portfolio";
import { useTypewriter } from "../hooks/useTypewriter";

const AVAILABILITY_STATUS = {
  isOpen: true,
  message: "Open to opportunities",
};

const QUICK_STATS = [
  { value: "8+", label: "Years Experience" },
  { value: "99%", label: "Uptime Record" },
  { value: "5", label: "Languages" },
  { value: "4", label: "Countries" },
  {
    value: "24/7",
    label: "Availability"
  }
];

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
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            🐙 GitHub
          </a>
          <a href="#contact" className="btn btn-outline">
            ✉️ Contact
          </a>
        </div>
        
        {AVAILABILITY_STATUS.isOpen && (
          <div className="availability-badge fade-in-delayed">
            <span className="availability-dot" />
            <span>{AVAILABILITY_STATUS.message}</span>
          </div>
        )}

        <div className="hero-quick-stats fade-in-delayed">
          {QUICK_STATS.map((stat, index) => (
            <div key={index} className="hero-stat">
              <span className="hero-stat-value">{stat.value}</span>
              <span className="hero-stat-label">{stat.label}</span>
            </div>
          ))}
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
