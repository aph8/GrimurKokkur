// src/components/homePage/useIsMobile.ts
'use client';

import { useState, useEffect } from 'react';

/**
 * Returns true if the viewport is ≤ 768px, false if > 768px,
 * and undefined on the very first render (before we check).
 */
export default function useIsMobile(): boolean | undefined {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') {
      // Should not happen in a client component, but guard just in case:
      setIsMobile(false);
      return;
    }
    const mql = window.matchMedia('(max-width: 768px)');

    // On first effect, sync state:
    setIsMobile(mql.matches);

    // Listen for changes going forward:
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
