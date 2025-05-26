// src/components/HeroSection.tsx
'use client';

import Image from 'next/image';
import styles from '@/styles/HeroSection.module.scss';

const panels = [
  { src: '/fiskibollur_portrait.svg', alt: '' },
  { src: '/humarsúpa_portrait.svg',   alt: '' },
  { src: '/fiskistangir_portrait.svg', alt: '' },
  { src: '/plokkfiskur_portrait.svg',  alt: '' },
];


export default function HeroSection() {
  return (
    <header className={styles.hero} role="banner" aria-labelledby="hero-title">
      {panels.map((p, i) => (
        <div key={i} className={`${styles.panel} ${styles[`panel${i+1}`]}`}>
          <Image
            src={p.src}
            alt={p.alt}
            fill
            priority={i === 0}         
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </div>
      ))}

      <div className={styles.overlayContent}>
        <h1 id="hero-title">Grímur Kokkur</h1>
      </div>
    </header>
  );
}
