// src/components/homePage/MobileHeroCarousel.tsx
'use client';

import { useEffect, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import styles from '@/styles/HeroCarousel.module.scss';

type Panel = { src: StaticImageData; alt?: string };

interface MobileHeroCarouselProps {
  panels: Panel[];
  /**
   * If true, advance to the second slide immediately after mount
   * instead of waiting for the first interval tick.
   */
  startImmediately?: boolean;
}


export default function MobileHeroCarousel({ panels }: MobileHeroCarouselProps) {
  const slides = [panels[panels.length - 1], ...panels, panels[0]];

  const [index, setIndex] = useState(1);

  const [enableTransition, setEnableTransition] = useState(true);

  // Optionally jump to the second slide on mount so the carousel
  // begins animating right away.
  useEffect(() => {
    if (startImmediately) {
      const t = setTimeout(() => setIndex(1), 0);
      return () => clearTimeout(t);
    }
  }, [startImmediately]);

  // Auto‐advance every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => i + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // When we slide onto the duplicate at the end, jump back to the
  // first real panel without animation once the transition completes.
  useEffect(() => {
    if (index === slides.length - 1) {
      const timeout = setTimeout(() => {
        setEnableTransition(false);
        setIndex(1);
      }, 1000); // match CSS transition duration
      return () => clearTimeout(timeout);
    }

    setEnableTransition(true);
  }, [index, slides.length]);

  return (
    <div className={styles.carouselWrapper}>
      <div
        className={styles.slides}
        aria-live="polite"
        aria-atomic="true"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: enableTransition ? 'transform 1s ease-in-out' : 'none',
        }}
      >
        {slides.map((p, i) => (
          <div key={i} className={styles.slide}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={p.src}
                alt={p.alt || ''}
                fill
                sizes="100vw"
                priority={i === 1}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Overlay title on top of the carousel */}
      <div className={styles.overlayContent}>
        <h1 id="hero-title">Grímur Kokkur</h1>
      </div>
    </div>
  );
}
