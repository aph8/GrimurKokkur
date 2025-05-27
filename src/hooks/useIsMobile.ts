// src/hooks/useIsMobile.ts
'use client';

import { useState, useEffect } from 'react';

/**
 * Returns true whenever `window.innerWidth <= breakpoint`.
 * Only runs on the client.
 */
export default function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= breakpoint);
    }
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);

  return isMobile;
}
