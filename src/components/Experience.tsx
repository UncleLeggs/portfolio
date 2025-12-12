import { useState } from "react";
import { experiences } from "../data/portfolio";

export const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <h2 className="section-title">
          <span className="title-decorator">{"{"}</span>
          Experience
          <span className="title-decorator">{"}"}</span>
        </h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`timeline-item ${expandedIndex === index ? "expanded" : ""}`}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="timeline-marker">
                <div className="timeline-dot" />
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
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
                    </h3>
                    <h4 className="role-title">{exp.role}</h4>
                  </div>
                  <div className="timeline-meta">
                    <span className="period">{exp.period}</span>
                    <span className="location">{exp.location}</span>
                  </div>
                </div>
                {expandedIndex === index && (
                  <ul className="highlights">
                    {exp.highlights.map((highlight, hIndex) => (
                      <li key={hIndex}>{highlight}</li>
                    ))}
                  </ul>
                )}
                <div className="expand-hint">
                  {expandedIndex === index ? "Click to collapse" : "Click to expand"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
