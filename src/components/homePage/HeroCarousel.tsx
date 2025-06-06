// src/components/HeroCarousel.tsx
'use client';

import { useState, useEffect } from 'react';
import Image, { type StaticImageData } from 'next/image';
import styles from '@/styles/HeroCarousel.module.scss';

interface HeroCarouselProps {
  images: { src: StaticImageData; alt?: string }[];
  intervalMs?: number;
  /**
   * If true, begin sliding immediately on mount rather than waiting
   * for the first interval tick.
   */
  startImmediately?: boolean;
}


export default function HeroCarousel({ images, intervalMs = 3000 }: HeroCarouselProps) {
  // Duplicate first and last images so we can seamlessly loop in one direction
  const slides = [images[images.length - 1], ...images, images[0]];

  // Start on the first real slide (index 1 within the duplicated list)
  const [index, setIndex] = useState(1);
  
  const [enableTransition, setEnableTransition] = useState(true);

  useEffect(() => {
    if (startImmediately) {
      const t = setTimeout(() => setIndex(1), 0);
      return () => clearTimeout(t);
    }
  }, [startImmediately]);

  // Auto‐advance
  useEffect(() => {
    const tid = setInterval(() => {
      setIndex((i) => i + 1);
    }, intervalMs);
    return () => clearInterval(tid);
  }, [intervalMs]);

  useEffect(() => {
    // When we slide onto the duplicate at the end, jump back to the
    // first real slide without animation once the transition is done.
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
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: enableTransition ? 'transform 1s ease-in-out' : 'none',
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        {slides.map((img, i) => (
          <div key={i} className={styles.slide}>
            <Image
              src={img.src}
              alt={img.alt || ''}
              fill
              priority={i === 1}
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
