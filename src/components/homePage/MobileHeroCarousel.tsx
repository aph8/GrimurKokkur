// src/components/homePage/MobileHeroCarousel.tsx
'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import styles from '@/styles/HeroCarousel.module.scss';

type Panel = { url: string; alt?: string };

interface MobileHeroCarouselProps {
  panels: Panel[];
}

export default function MobileHeroCarousel({ panels }: MobileHeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (!emblaApi) return;
    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [emblaApi]);

  return (
    <div className={styles.carouselWrapper} ref={emblaRef}>
      <div className={styles.slides} aria-live="polite" aria-atomic="true">
        {panels.map((p, i) => (
          <div key={i} className={styles.slide}>
            <Image
              src={p.url}
              alt={p.alt || `Slide ${i + 1}`}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
      <div className={styles.overlayContent}>
        <h1 id="hero-title">Grímur Kokkur</h1>
      </div>
    </div>
  );
}
