// src/components/MapPlaceholder.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function MapPlaceholder() {
  const ref = useRef<HTMLDivElement>(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowMap(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' } // trigger 200px before it enters viewport
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '400px',
        background: '#eee',
        borderRadius: '0.5rem',
      }}
    >
      {showMap && (
        <iframe
          title="Grímur Kokkur staðsetning"
          src="https://maps.google.com/maps?q=Hl%C3%AD%C3%B0avegur%205%2C%20900%20Vestmannaeyjar&z=17&output=embed"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ width: '100%', height: '100%', border: 0 }}
        />
      )}
    </div>
  );
}
