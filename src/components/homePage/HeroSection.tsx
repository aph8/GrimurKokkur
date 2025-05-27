// src/components/HeroSection.tsx
'use client';

import Image from 'next/image';
import HeroCarousel from './HeroCarousel';
import useIsMobile from '@/hooks/useIsMobile';
import styles from '@/styles/HeroSection.module.scss';

const panels = [
  { url: '/fiskibollur_portrait.svg', alt: 'Fiskibollur' },
  { url: '/humarsupa_portrait.svg', alt: 'Humarsúpa' },
  { url: '/fiskistangir_portrait.svg', alt: 'Fiskistangir' },
  { url: '/plokkfiskur_portrait.svg', alt: 'Plokkfiskur' },
];

export default function HeroSection() {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <div className={styles.mobileHero}>
          <HeroCarousel images={panels} intervalMs={3000} />
          <div className={styles.overlayContent}>
            <h1 id="hero-title">Grímur Kokkur</h1>
          </div>
        </div>
      ) : (
        <header
          className={`${styles.hero} ${styles.desktopOnly}`}
          role="banner"
          aria-labelledby="hero-title"
        >
          {panels.map((p, i) => (
            <div key={i} className={`${styles.panel} ${styles[`panel${i + 1}`]}`}>
              <Image
                src={p.url}
                alt={p.alt}
                fill
                priority
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
          ))}

          <div className={styles.overlayContent}>
            <h1 id="hero-title">Grímur Kokkur</h1>
          </div>
        </header>
      )}
    </>
  );
}
