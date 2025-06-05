// src/components/homePage/useIsMobile.ts
'use client';

import { useState, useEffect } from 'react';

/**
 * Returns `true` if viewport ≤ 768px, `false` if > 768px,
 * and `undefined` on the very first render (so SSR/client match).
 */
export default function useIsMobile(): boolean | undefined {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsMobile(false);
      return;
    }
    const mql = window.matchMedia('(max-width: 768px)');
    // Sync initial
    setIsMobile(mql.matches);
    // Listen for changes
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', listener);
    return () => {
      mql.removeEventListener('change', listener);
    };
  }, []);

  return isMobile;
}
