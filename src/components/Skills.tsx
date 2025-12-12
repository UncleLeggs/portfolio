import { useState } from "react";
import { skills, easterEggs } from "../data/portfolio";

const categoryColors: Record<string, string> = {
  language: "#61dafb",
  database: "#4db33d",
  cloud: "#ff9900",
  tools: "#e535ab",
  framework: "#68a063",
};

const categoryLabels: Record<string, string> = {
  language: "Languages",
  database: "Databases",
  cloud: "Cloud & DevOps",
  tools: "Tools",
  framework: "Frameworks",
};

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
        <h2 className="section-title">
          <span className="title-decorator">[</span>
          Skills
          <span className="title-decorator">]</span>
        </h2>

        {showMessage && <div className="skill-easter-egg">{showMessage}</div>}

        <div className="skills-grid">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="skill-category">
              <h3
                className="category-title"
                style={{ color: categoryColors[category] }}
              >
                {categoryLabels[category]}
              </h3>
              <div className="skill-tags">
                {categorySkills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`skill-tag ${hoveredSkill === skill.name ? "hovered" : ""} ${clickedSkills.has(skill.name) ? "clicked" : ""}`}
                    style={{
                      borderColor: categoryColors[skill.category],
                      backgroundColor:
                        hoveredSkill === skill.name
                          ? categoryColors[skill.category]
                          : "transparent",
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
          ))}
        </div>

        <p className="skills-hint">
          💡 Hint: Try clicking all the skills...
        </p>
      </div>
    </section>
  );
};
