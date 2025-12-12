import { aboutMe } from "../data/portfolio";

export const About = () => {
  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section-title">
          <span className="title-decorator">&lt;</span>
          About Me
          <span className="title-decorator">/&gt;</span>
        </h2>
        <div className="about-content">
          <div className="about-text">
            {aboutMe.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="about-stats">
            <div className="stat-card">
              <span className="stat-number">2+</span>
              <span className="stat-label">Years at Strapi</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">99%</span>
              <span className="stat-label">Uptime Maintained</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">∞</span>
              <span className="stat-label">Coffee Consumed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
