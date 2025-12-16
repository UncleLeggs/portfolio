import { useState } from "react";
import { skills, easterEggs } from "../data/portfolio";

const categoryConfig: Record<string, { color: string; label: string; icon: string }> = {
  language: { color: "#61dafb", label: "Languages", icon: "💻" },
  framework: { color: "#68a063", label: "Frameworks", icon: "⚛️" },
  database: { color: "#4db33d", label: "Databases", icon: "🗄️" },
  cloud: { color: "#ff9900", label: "Cloud & Platforms", icon: "☁️" },
  tools: { color: "#e535ab", label: "Tools & Testing", icon: "🔧" },
};

const categoryOrder = ["language", "framework", "database", "cloud", "tools"];

export const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [clickedSkills, setClickedSkills] = useState<Set<string>>(new Set());
  const [showMessage, setShowMessage] = useState<string | null>(null);

  const handleSkillClick = (skillName: string) => {
    const newClicked = new Set(clickedSkills);
    newClicked.add(skillName);
    setClickedSkills(newClicked);

    if (newClicked.size === skills.length) {
      const randomMessage =
        easterEggs.secretMessages[
          Math.floor(Math.random() * easterEggs.secretMessages.length)
        ];
      setShowMessage(randomMessage);
      setTimeout(() => setShowMessage(null), 4000);
      setClickedSkills(new Set());
    }
  };

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>
  );

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <h2 className="section-title fancy-title">
          <span className="title-icon">🛠️</span>
          <span className="title-text">
            <span className="title-main">Tech Stack</span>
            <span className="title-sub">Tools I use to build great things</span>
          </span>
        </h2>

        {showMessage && <div className="skill-easter-egg">{showMessage}</div>}

        <div className="skills-grid">
          {categoryOrder
            .filter((cat) => groupedSkills[cat])
            .map((category) => {
              const config = categoryConfig[category];
              const categorySkills = groupedSkills[category];
              return (
                <div
                  key={category}
                  className="skill-category"
                  style={{ "--category-color": config.color } as React.CSSProperties}
                >
                  <div className="category-header">
                    <span className="category-icon">{config.icon}</span>
                    <h3 className="category-title" style={{ color: config.color }}>
                      {config.label}
                    </h3>
                  </div>
                  <div className="skill-tags">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.name}
                        className={`skill-tag ${hoveredSkill === skill.name ? "hovered" : ""} ${clickedSkills.has(skill.name) ? "clicked" : ""}`}
                        style={{
                          borderColor: config.color,
                          color: hoveredSkill === skill.name ? "white" : config.color,
                          backgroundColor:
                            hoveredSkill === skill.name ? config.color : "transparent",
                        }}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        onClick={() => handleSkillClick(skill.name)}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>

        <div className="skills-footer">
          <p className="skills-mindset">
            🚀 <strong>Growth Mindset:</strong> These are my current tools, but I can learn anything. 
            New framework? New language? Bring it on.
          </p>
          <p className="skills-hint">
            💡 Hint: Try clicking all the skills...
          </p>
        </div>
      </div>
    </section>
  );
};
