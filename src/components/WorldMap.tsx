import { countriesLived, languages } from "../data/portfolio";

export const WorldMap = () => {
  const totalYears = countriesLived.reduce((sum, c) => sum + c.years, 0);
  const currentCountry = countriesLived.find((c) => c.current);

  return (
    <section id="journey" className="section world-map">
      <div className="container">
        <h2 className="section-title fancy-title">
          <span className="title-icon">🌍</span>
          <span className="title-text">
            <span className="title-main">Global Journey</span>
            <span className="title-sub">Where life has taken me</span>
          </span>
        </h2>

        <p className="journey-intro">
          {totalYears} years across {countriesLived.length} countries
          {currentCountry && (
            <span className="current-location">
              {" "}• Currently in {currentCountry.flag} {currentCountry.country}
            </span>
          )}
        </p>

        <div className="journey-timeline">
          {countriesLived.map((country, index) => (
            <div
              key={country.country}
              className={`journey-item ${country.current ? "current" : ""}`}
            >
              <div className="journey-marker">
                <span className="journey-flag">{country.flag}</span>
                <span className="journey-country-name">{country.country}</span>
                {index < countriesLived.length - 1 && (
                  <div className="journey-line" />
                )}
              </div>
              <div className="journey-content">
                <div className="journey-details">
                  {country.current && <span className="current-badge">📍 Current</span>}
                  <p className="journey-years">{country.years} years</p>
                </div>
                <div className="journey-bar">
                  <div
                    className="journey-bar-fill"
                    style={{ width: `${(country.years / totalYears) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="languages-section">
          <h3 className="languages-title">Languages</h3>
          <div className="languages-grid">
            {languages.map((lang) => (
              <div key={lang.name} className="language-card">
                <span className="language-flag">{lang.flag}</span>
                <div className="language-info">
                  <span className="language-name">{lang.name}</span>
                  <span className={`language-level level-${lang.level.toLowerCase()}`}>
                    {lang.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
