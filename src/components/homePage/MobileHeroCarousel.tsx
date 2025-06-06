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

export default function MobileHeroCarousel({ panels, startImmediately = false }: MobileHeroCarouselProps) {
  const [index, setIndex] = useState(0);
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

  // When we slide past the last real panel, jump back to the first without
  // animation once the transition completes. This creates an infinite loop that
  // only moves forward.
  useEffect(() => {
    if (index === panels.length) {
      const timeout = setTimeout(() => {
        setEnableTransition(false);
        setIndex(0);
      }, 1000); // match CSS transition duration
      return () => clearTimeout(timeout);
    }

    setEnableTransition(true);
  }, [index, panels.length]);

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
        {panels.map((p, i) => (
          <div key={i} className={styles.slide}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={p.src}
                alt={p.alt || `Slide ${i + 1}`}
                fill
                sizes="100vw"
                priority={i === 0}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        ))}
        {/* Duplicate first panel to create seamless looping */}
        <div className={styles.slide} aria-hidden="true">
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src={panels[0].src}
              alt={panels[0].alt || 'Slide 1'}
              fill
              sizes="100vw"
              priority={false}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      {/* Overlay title on top of the carousel */}
      <div className={styles.overlayContent}>
        <h1 id="hero-title">Grímur Kokkur</h1>
      </div>
    </div>
  );
}
