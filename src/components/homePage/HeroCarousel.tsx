// src/components/HeroCarousel.tsx
'use client';

import { useState, useEffect } from 'react';
import Image, { type StaticImageData } from 'next/image';
import styles from '@/styles/HeroCarousel.module.scss';

interface HeroCarouselProps {
  images: { src: StaticImageData; alt?: string }[];
  intervalMs?: number;
  startImmediately?: boolean;
}
/**
 * Simple image carousel used for the mobile hero.
 * Images cycle at a fixed interval.
 */

export default function HeroCarousel({
  images,
  intervalMs = 3000,
  startImmediately = false,
}: HeroCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (startImmediately) {
      const t = setTimeout(() => setIndex(1), 0);
      return () => clearTimeout(t);
    }
  }, [startImmediately]);

  useEffect(() => {
    const tid = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(tid);
  }, [intervalMs, images.length]);

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.slides} aria-live="polite" aria-atomic="true">
        {images.map((img, i) => (
          <div key={i} className={styles.slide} style={{ opacity: i === index ? 1 : 0 }}>
            <Image
              src={img.src}
              alt={img.alt || ''}
              fill
              priority={i === 0}
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
