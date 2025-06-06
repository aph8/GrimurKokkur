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

  const pairs: { src: StaticImageData; alt?: string }[][] = [];
  for (let i = 0; i < panels.length; i += 2) {
    pairs.push(panels.slice(i, i + 2));
  }

  useEffect(() => {
    if (startImmediately) {
      const t = setTimeout(() => setIndex(1), 0);
      return () => clearTimeout(t);
    }
  }, [startImmediately]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % pairs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [pairs.length]);

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.slides} aria-live="polite" aria-atomic="true">
        {pairs.map((pair, i) => (
          <div key={i} className={styles.slide} style={{ opacity: i === index ? 1 : 0 }}>
            <div className={styles.pair}>
              {pair.map((p, j) => (
                <div key={j} className={styles.pairImage}>
                  <Image
                    src={p.src}
                    alt={p.alt || ''}
                    fill
                    sizes="50vw"
                    priority={i === 0 && j === 0}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
