import { useEffect, useState, useCallback } from "react";
import { easterEggs } from "../data/portfolio";

export const useKonamiCode = (callback: () => void) => {
  const [inputSequence, setInputSequence] = useState<string[]>([]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const newSequence = [...inputSequence, event.key].slice(-10);
      setInputSequence(newSequence);

      if (JSON.stringify(newSequence) === JSON.stringify(easterEggs.konamiCode)) {
        callback();
        setInputSequence([]);
      }
    },
    [inputSequence, callback]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return inputSequence;
};
