import { useEffect, useState, useRef } from "react";

interface Highlight {
  icon: string;
  value: string;
  numericValue?: number;
  suffix?: string;
  label: string;
  description: string;
}

const highlights: Highlight[] = [
  {
    icon: "🏢",
    value: "Strapi",
    label: "Current Company",
    description: "Open-source headless CMS with 60k+ GitHub stars",
  },
  {
    icon: "👑",
    value: "Feature Owner",
    label: "Technical Ownership",
    description: "End-to-end ownership from RFC to production deployment",
  },
  {
    icon: "🏗️",
    value: "Clean Architecture",
    label: "System Design",
    description: "Led migration to layered Application/Infrastructure/Service architecture",
  },
  {
    icon: "📋",
    value: "SDLC",
    label: "Development Process",
    description: "RFCs, POCs, backlog refinement, tech stack definition, code reviews",
  },
  {
    icon: "⚡",
    value: "99%",
    numericValue: 99,
    suffix: "%",
    label: "Service Uptime",
    description: "Achieved through automated testing, CI/CD & on-call rotations",
  },
  {
    icon: "🚀",
    value: "4+",
    numericValue: 4,
    suffix: "+",
    label: "Years as Co-founder",
    description: "Built Datagatherers from 0 to profitable business",
  },
];

const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setDisplayValue(value);
              clearInterval(timer);
            } else {
              setDisplayValue(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
};

export const Highlights = () => {
  return (
    <section id="highlights" className="section highlights">
      <div className="container">
        <h2 className="section-title fancy-title">
          <span className="title-icon">🏆</span>
          <span className="title-text">
            <span className="title-main">Highlight Reel</span>
            <span className="title-sub">Numbers that speak for themselves</span>
          </span>
        </h2>

        <div className="highlights-grid">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="highlight-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="highlight-icon">{highlight.icon}</span>
              <div className="highlight-content">
                <span className="highlight-value">
                  {highlight.numericValue !== undefined ? (
                    <AnimatedNumber
                      value={highlight.numericValue}
                      suffix={highlight.suffix}
                    />
                  ) : (
                    highlight.value
                  )}
                </span>
                <span className="highlight-label">{highlight.label}</span>
                <span className="highlight-description">{highlight.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
