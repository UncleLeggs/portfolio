import { useEffect } from 'react';

const COUNTER_NAMESPACE = 'olegmaksimov-portfolio';
const COUNTER_KEY = 'visits';

interface AnalyticsProps {
  enabled?: boolean;
}

export const Analytics = ({ enabled = true }: AnalyticsProps) => {
  useEffect(() => {
    if (!enabled) return;

    const trackVisit = async () => {
      try {
        const response = await fetch(
          `https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/${COUNTER_KEY}`
        );
        const data = await response.json();
        
        if (import.meta.env.DEV) {
          console.log(`📊 Total visits: ${data.value}`);
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn('Analytics tracking failed:', error);
        }
      }
    };

    trackVisit();
  }, [enabled]);

  return null;
};

export const useVisitCount = () => {
  useEffect(() => {
    const getCount = async () => {
      try {
        const response = await fetch(
          `https://api.countapi.xyz/get/${COUNTER_NAMESPACE}/${COUNTER_KEY}`
        );
        const data = await response.json();
        return data.value;
      } catch {
        return null;
      }
    };
    
    getCount();
  }, []);
};
