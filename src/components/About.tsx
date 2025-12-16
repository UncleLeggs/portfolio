import { aboutMe } from "../data/portfolio";

const KEY_ACHIEVEMENTS = [
  { icon: "🏗️", text: "Key contributor to major refactoring initiative — clean Application/Infrastructure/Service architecture" },
  { icon: "👑", text: "Owner of multiple implementations and features at Strapi" },
  { icon: "📈", text: "Co-founded and scaled startup from 0 to profitable business over 4 years" },
  { icon: "⚡", text: "Maintaining ~99% service uptime through automated testing & on-call participation" },
];

export const About = () => {
  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section-title fancy-title">
          <span className="title-icon">👨‍💻</span>
          <span className="title-text">
            <span className="title-main">About Me</span>
            <span className="title-sub">The person behind the code</span>
          </span>
        </h2>
        <div className="about-content">
          <div className="about-text">
            {aboutMe.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            
            <div className="key-achievements">
              <h3 className="achievements-title">🎯 Key Achievements</h3>
              <ul className="achievements-list">
                {KEY_ACHIEVEMENTS.map((achievement, index) => (
                  <li key={index} className="achievement-item">
                    <span className="achievement-icon">{achievement.icon}</span>
                    <span>{achievement.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="about-stats">
            <div className="stat-card">
              <span className="stat-number">8+</span>
              <span className="stat-label">Years in Tech</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">99%</span>
              <span className="stat-label">Uptime Maintained</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">5</span>
              <span className="stat-label">Languages Spoken</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
