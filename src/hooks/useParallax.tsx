import { useEffect, useState, useCallback } from 'react';

interface UseParallaxOptions {
  speed?: number; // 0 to 1, where 0 = no movement, 1 = moves with scroll
  direction?: 'up' | 'down';
}

export const useParallax = (options: UseParallaxOptions = {}) => {
  const { speed = 0.3, direction = 'up' } = options;
  const [offset, setOffset] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const multiplier = direction === 'up' ? -1 : 1;
    setOffset(scrollY * speed * multiplier);
  }, [speed, direction]);

  useEffect(() => {
    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return offset;
};
