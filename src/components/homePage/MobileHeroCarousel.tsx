// src/components/homePage/MobileHeroCarousel.tsx
'use client';

import { useEffect, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import styles from '@/styles/HeroCarousel.module.scss';

type Panel = { src: StaticImageData; alt?: string };

interface MobileHeroCarouselProps {
  panels: Panel[];
  startImmediately?: boolean;
}

export default function MobileHeroCarousel({ panels, startImmediately }: MobileHeroCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (startImmediately) {
      const t = setTimeout(() => setIndex(1), 0);
      return () => clearTimeout(t);
    }
  }, [startImmediately]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % panels.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [panels.length]);

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.slides} aria-live="polite" aria-atomic="true">
        {panels.map((p, i) => (
          <div key={i} className={styles.slide} style={{ opacity: i === index ? 1 : 0 }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={p.src}
                alt={p.alt || ''}
                fill
                sizes="100vw"
                priority={i === 0}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.overlayContent}>
        <h1 id="hero-title">Grímur Kokkur</h1>
      </div>
    </div>
  );
}
