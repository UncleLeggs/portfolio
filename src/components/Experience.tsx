import { useState } from "react";
import { experiences } from "../data/portfolio";

const jobIllustrations: Record<string, { image: string; scene: string; tagline: string }> = {
  "Teleperformance / Cognizant": {
    image: `${import.meta.env.BASE_URL}assets/github-junior-dev.png`,
    scene: "Where it all began — one laptop, infinite curiosity, and a hunger to learn.",
    tagline: "The Foundation",
  },
  "Datagatherers": {
    image: `${import.meta.env.BASE_URL}assets/github-mid-dev.png`,
    scene: "From zero to startup — building something from nothing, fueled by passion and late nights.",
    tagline: "The Leap",
  },
  "Strapi Solutions": {
    image: `${import.meta.env.BASE_URL}assets/github-senior-dev.png`,
    scene: "In the zone — triple screens, endless coffee, shipping code that scales to millions.",
    tagline: "The Mastery",
  },
};

export const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <h2 className="section-title fancy-title">
          <span className="title-icon">💼</span>
          <span className="title-text">
            <span className="title-main">Career Journey</span>
            <span className="title-sub">From QA to Senior Engineer</span>
          </span>
        </h2>
        
        <div className="experience-roadmap">
          {[...experiences].reverse().map((exp, index) => {
            const realIndex = experiences.length - 1 - index;
            const illustration = jobIllustrations[exp.company] || { image: "", scene: "", tagline: "" };
            const isExpanded = expandedIndex === realIndex;
            
            return (
              <div
                key={realIndex}
                className={`roadmap-item ${isExpanded ? "expanded" : ""} ${realIndex === 0 ? "current" : ""}`}
                onClick={() => setExpandedIndex(isExpanded ? null : realIndex)}
              >
                <div className="roadmap-illustration">
                  <img 
                    src={illustration.image} 
                    alt={`${exp.company} illustration`}
                    className="illustration-image"
                  />
                  <div className="illustration-tagline">{illustration.tagline}</div>
                </div>
                
                <div className="roadmap-connector">
                  <div className="connector-line" />
                  <div className="connector-dot" />
                </div>
                
                <div className="roadmap-content">
                  <div className="roadmap-header">
                    <div className="company-logo">
                      {exp.company === "Strapi Solutions" && "🚀"}
                      {exp.company === "Datagatherers" && "📊"}
                      {exp.company === "Teleperformance / Cognizant" && "📞"}
                    </div>
                    <div className="company-info">
                      <h3 className="company-name">
                        {exp.website ? (
                          <a
                            href={exp.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {exp.company}
                          </a>
                        ) : (
                          exp.company
                        )}
                        {realIndex === 0 && <span className="current-badge">Current</span>}
                      </h3>
                      <h4 className="role-title">{exp.role}</h4>
                    </div>
                  </div>
                  
                  <div className="roadmap-meta">
                    <span className="period">📅 {exp.period}</span>
                    <span className="location">📍 {exp.location}</span>
                  </div>
                  
                  <p className="illustration-scene">{illustration.scene}</p>
                  
                  {isExpanded && (
                    <ul className="highlights">
                      {exp.highlights.map((highlight, hIndex) => (
                        <li key={hIndex}>
                          <span className="highlight-bullet">▸</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="expand-hint">
                    {isExpanded ? "▲ Less details" : "▼ More details"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
