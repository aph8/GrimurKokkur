// src/components/BackToTop.tsx
'use client';

import { useState, useEffect } from 'react';
/**
 * Button that smoothly scrolls the page back to the top when clicked.
 *
 * The button only appears after the user has scrolled down a bit.
 */

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Aftur upp"
      className={`back-to-top${visible ? ' visible' : ''}`}
    >
      ↑
    </button>
  );
}
