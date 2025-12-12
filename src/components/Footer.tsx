import { useState } from "react";

export const Footer = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showMatrix, setShowMatrix] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleHeartClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 5) {
      setShowMatrix(true);
      setTimeout(() => setShowMatrix(false), 3000);
      setClickCount(0);
    }
  };

  return (
    <footer className="footer">
      {showMatrix && (
        <div className="matrix-rain">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="matrix-char"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {String.fromCharCode(0x30a0 + Math.random() * 96)}
            </span>
          ))}
        </div>
      )}
      <div className="container">
        <p>
          Built with{" "}
          <span
            className="heart"
            onClick={handleHeartClick}
            title="Click me!"
          >
            ❤️
          </span>{" "}
          using React + TypeScript
        </p>
        <p className="copyright">© {currentYear} Oleg Maksimov</p>
        <p className="easter-egg-hint">
          🎮 Psst... try the Konami code: ↑↑↓↓←→←→BA
        </p>
      </div>
    </footer>
  );
};
