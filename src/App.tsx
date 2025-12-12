import { useState, useCallback } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { KonamiOverlay } from "./components/KonamiOverlay";
import { Analytics } from "./components/Analytics";
import { useKonamiCode } from "./hooks/useKonamiCode";
import "./App.css";

function App() {
  const [konamiActive, setKonamiActive] = useState(false);

  const handleKonami = useCallback(() => {
    setKonamiActive(true);
  }, []);

  useKonamiCode(handleKonami);

  return (
    <div className="app">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <KonamiOverlay
        isActive={konamiActive}
        onClose={() => setKonamiActive(false)}
      />
      <Analytics />
    </div>
  );
}

export default App;
