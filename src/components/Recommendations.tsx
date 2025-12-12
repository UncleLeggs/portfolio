import { useState, useEffect, useCallback } from "react";
import { recommendations, LINKEDIN_RECOMMENDATIONS_URL } from "../data/portfolio";

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" opacity="0.15">
    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
  </svg>
);

export const Recommendations = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const hasRecommendations = recommendations.length > 0;

  const goToNext = useCallback(() => {
    setDirection('next');
    setActiveIndex((prev) => (prev + 1) % recommendations.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection('prev');
    setActiveIndex((prev) => (prev - 1 + recommendations.length) % recommendations.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 'next' : 'prev');
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || !hasRecommendations) return;
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, hasRecommendations, goToNext]);

  // Pause on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (!hasRecommendations) {
    return (
      <section id="recommendations" className="section recommendations">
        <div className="container">
          <h2 className="section-title fancy-title">
            <span className="title-icon">💬</span>
            <span className="title-text">
              <span className="title-main">Recommendations</span>
              <span className="title-sub">What colleagues say about me</span>
            </span>
          </h2>
          <div className="recommendations-empty">
            <div className="empty-icon">
              <LinkedInIcon />
            </div>
            <h3>View My Recommendations on LinkedIn</h3>
            <p>Click below to read what colleagues have to say about working with me.</p>
          </div>
          <div className="linkedin-actions">
            <a href={LINKEDIN_RECOMMENDATIONS_URL} target="_blank" rel="noopener noreferrer" className="linkedin-btn primary">
              <LinkedInIcon /> <span>View on LinkedIn</span>
            </a>
          </div>
        </div>
      </section>
    );
  }

  const currentRec = recommendations[activeIndex];

  return (
    <section id="recommendations" className="section recommendations">
      <div className="container">
        <h2 className="section-title fancy-title">
          <span className="title-icon">💬</span>
          <span className="title-text">
            <span className="title-main">Recommendations</span>
            <span className="title-sub">What colleagues say about me</span>
          </span>
        </h2>

        <div 
          className="rec-carousel"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation Arrows */}
          <button 
            className="rec-nav rec-nav-prev" 
            onClick={goToPrev}
            aria-label="Previous recommendation"
          >
            ‹
          </button>
          <button 
            className="rec-nav rec-nav-next" 
            onClick={goToNext}
            aria-label="Next recommendation"
          >
            ›
          </button>

          {/* Main Card */}
          <div className={`rec-card-wrapper ${direction}`} key={activeIndex}>
            <div className="rec-card">
              <div className="rec-card-quote">
                <QuoteIcon />
              </div>
              
              <blockquote className="rec-card-text">
                {currentRec.text}
              </blockquote>

              <div className="rec-card-author">
                <div className="rec-author-avatar">
                  {currentRec.avatarUrl ? (
                    <img src={currentRec.avatarUrl} alt={currentRec.name} />
                  ) : (
                    <span>{currentRec.name.split(" ").map(n => n[0]).join("")}</span>
                  )}
                </div>
                <div className="rec-author-info">
                  <a 
                    href={currentRec.linkedinUrl || LINKEDIN_RECOMMENDATIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rec-author-name"
                  >
                    {currentRec.name}
                    <LinkedInIcon />
                  </a>
                  <span className="rec-author-role">
                    {currentRec.role} @ {currentRec.company}
                  </span>
                  <span className="rec-author-meta">
                    {currentRec.relationship} • {currentRec.date}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="rec-dots">
            {recommendations.map((_, index) => (
              <button
                key={index}
                className={`rec-dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to recommendation ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="rec-progress">
            <div 
              className="rec-progress-bar" 
              style={{ 
                animationDuration: isAutoPlaying ? '6s' : '0s',
                animationPlayState: isAutoPlaying ? 'running' : 'paused'
              }}
              key={`progress-${activeIndex}-${isAutoPlaying}`}
            />
          </div>
        </div>

        {/* Thumbnails */}
        <div className="rec-thumbnails">
          {recommendations.map((rec, index) => (
            <button
              key={index}
              className={`rec-thumb ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            >
              <div className="rec-thumb-avatar">
                {rec.name.split(" ").map(n => n[0]).join("")}
              </div>
              <span className="rec-thumb-name">{rec.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        <div className="linkedin-actions">
          <a
            href={LINKEDIN_RECOMMENDATIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-btn primary"
          >
            <LinkedInIcon />
            <span>View All on LinkedIn</span>
          </a>
          <a
            href={`${LINKEDIN_RECOMMENDATIONS_URL}?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_recommendations_details`}
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-btn secondary"
          >
            ✍️ Write a Recommendation
          </a>
        </div>

        <p className="linkedin-note">
          <span className="verified-badge">✓ Verified</span> All recommendations are verified on LinkedIn
        </p>
      </div>
    </section>
  );
};
