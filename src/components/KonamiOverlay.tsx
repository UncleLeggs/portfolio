import { easterEggs } from "../data/portfolio";

interface KonamiOverlayProps {
  isActive: boolean;
  onClose: () => void;
}

export const KonamiOverlay = ({ isActive, onClose }: KonamiOverlayProps) => {
  if (!isActive) return null;

  const randomMessage =
    easterEggs.secretMessages[
      Math.floor(Math.random() * easterEggs.secretMessages.length)
    ];

  return (
    <div className="konami-overlay" onClick={onClose}>
      <div className="konami-content">
        <div className="konami-title">🎮 KONAMI CODE ACTIVATED! 🎮</div>
        <div className="konami-message">{randomMessage}</div>
        <div className="konami-ascii">
          <pre>{`
   _____ _                   _   
  / ____| |                 | |  
 | (___ | |_ _ __ __ _ _ __ (_) 
  \\___ \\| __| '__/ _\` | '_ \\| | 
  ____) | |_| | | (_| | |_) | | 
 |_____/ \\__|_|  \\__,_| .__/|_| 
                      | |       
                      |_|       
          `}</pre>
        </div>
        <p className="konami-dismiss">Click anywhere to close</p>
      </div>
    </div>
  );
};
