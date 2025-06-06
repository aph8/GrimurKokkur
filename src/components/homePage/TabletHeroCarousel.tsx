// src/components/homePage/TabletHeroCarousel.tsx
'use client';

import { useEffect, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import styles from '@/styles/HeroCarousel.module.scss';

interface TabletHeroCarouselProps {
  panels: { src: StaticImageData; alt?: string }[];
  startImmediately?: boolean;
}

/**
 * Tablet version of the hero section cycling through images like the mobile carousel.
 */
export default function TabletHeroCarousel({ panels, startImmediately }: TabletHeroCarouselProps) {
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
    </div>
  );
}
