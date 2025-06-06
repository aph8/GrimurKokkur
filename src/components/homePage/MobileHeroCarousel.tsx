// src/components/homePage/MobileHeroCarousel.tsx
'use client';

import { useEffect } from 'react';
import Image, { type StaticImageData } from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import styles from '@/styles/HeroCarousel.module.scss';

type Panel = { src: StaticImageData; alt?: string };

interface MobileHeroCarouselProps {
  panels: Panel[];
}

export default function MobileHeroCarousel({ panels }: MobileHeroCarouselProps) {
  // 1) get Embla reference & API to control the carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // 2) Auto‐advance every 3s
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className={styles.carouselWrapper} ref={emblaRef}>
      <div className={styles.slides} aria-live="polite" aria-atomic="true">
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
      </div>

      {/* Overlay title on top of the carousel */}
      <div className={styles.overlayContent}>
        <h1 id="hero-title">Grímur Kokkur</h1>
      </div>
    </div>
  );
}
