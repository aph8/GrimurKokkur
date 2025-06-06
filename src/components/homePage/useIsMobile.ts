// src/components/homePage/useIsMobile.ts
'use client';

import { useState, useEffect } from 'react';
/**
 * Determines if the screen width is 768px or less using matchMedia.
 */

export default function useIsMobile(): boolean | undefined {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsMobile(false);
      return;
    }
    const mql = window.matchMedia('(max-width: 768px)');
    setIsMobile(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => {
      mql.removeEventListener('change', handler);
    };
  }, []);

  return isMobile;
}
