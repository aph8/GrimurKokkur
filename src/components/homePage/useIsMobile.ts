// src/components/homePage/useIsMobile.ts
'use client';

import { useState, useEffect } from 'react';

/**
 * Returns `true` if the viewport is ≤ 768px, `false` if > 768px,
 * and `undefined` on the very first render (before hydration).
 */
export default function useIsMobile(): boolean | undefined {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsMobile(false);
      return;
    }
    const mql = window.matchMedia('(max-width: 768px)');
    // On initial mount, sync state
    setIsMobile(mql.matches);

    // Listen for changes after that
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    mql.addEventListener('change', handler);
    return () => {
      mql.removeEventListener('change', handler);
    };
  }, []);

  return isMobile;
}
