import { education } from "../data/portfolio";

export const Education = () => {
  return (
    <section id="education" className="section education">
      <div className="container">
        <h2 className="section-title">
          <span className="title-decorator">📚</span>
          Education
        </h2>
        <div className="education-card">
          <div className="education-icon">🎓</div>
          <div className="education-details">
            <h3>
              <a
                href={education.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {education.institution}
              </a>
            </h3>
            <p className="degree">{education.degree}</p>
            <p className="period">{education.period}</p>
            <p className="location">{education.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
