// src/components/HeroCarousel.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/styles/HeroCarousel.module.scss';

interface HeroCarouselProps {
  images: { url: string; alt?: string }[];
  intervalMs?: number;
}

export default function HeroCarousel({ images, intervalMs = 3000 }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);

  // Auto‐advance
  useEffect(() => {
    const tid = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(tid);
  }, [images.length, intervalMs]);

  return (
    <div className={styles.carouselWrapper}>
      <div
        className={styles.slides}
        style={{ transform: `translateX(-${index * 100}%)` }}
        aria-live="polite"
        aria-atomic="true"
      >
        {images.map((img, i) => (
          <div key={i} className={styles.slide}>
            <Image
              src={img.url}
              alt={img.alt || `Slide ${i + 1}`}
              fill
              priority={true}
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
