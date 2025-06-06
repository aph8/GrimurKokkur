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

export default function HeroCarousel({ images, intervalMs = 3000, startImmediately = false }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
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
  }, [images.length, intervalMs]);

  useEffect(() => {
    if (index === images.length) {
      const timeout = setTimeout(() => {
        setEnableTransition(false);
        setIndex(0);
      }, 1000); // match CSS transition duration
      return () => clearTimeout(timeout);
    }
    setEnableTransition(true);
  }, [index, images.length]);

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
        {images.map((img, i) => (
          <div key={i} className={styles.slide}>
            <Image
              src={img.src}
              alt={img.alt || `Slide ${i + 1}`}
              fill
              priority={true}
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
        {/* duplicate first slide for seamless looping */}
        <div className={styles.slide} aria-hidden="true">
          <Image
            src={images[0].src}
            alt={images[0].alt || 'Slide 1'}
            fill
            priority={false}
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
}
