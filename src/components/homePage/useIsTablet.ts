// src/components/homePage/useIsTablet.ts
'use client';

import { useEffect, useState } from 'react';

/**
 * Determines if the screen width is between 769px and 1024px.
 */
export default function useIsTablet(): boolean | undefined {
  const [isTablet, setIsTablet] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsTablet(false);
      return;
    }
    const mql = window.matchMedia('(min-width: 769px) and (max-width: 1024px)');
    setIsTablet(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsTablet(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isTablet;
}
