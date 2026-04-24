import { useEffect, useState } from 'react';

/**
 * Hook to detect if page is scrolled down
 * @param {number} threshold - Scroll distance threshold (default: 50)
 * @returns {boolean} - True if scrolled past threshold
 */
export const useScrollEffect = (threshold = 50) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
};
