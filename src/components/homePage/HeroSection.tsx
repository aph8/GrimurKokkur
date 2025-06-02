// src/components/HeroSection.tsx
import Image from 'next/image';
import styles from '@/styles/HeroSection.module.scss';
import HeroCarousel from './HeroCarousel'; // direct import of the client component

const panels = [
  { url: '/fiskibollur_portrait.svg', alt: 'Fiskibollur' },
  { url: '/humarsupa_portrait.svg', alt: 'Humarsúpa' },
  { url: '/fiskistangir_portrait.svg', alt: 'Fiskistangir' },
  { url: '/plokkfiskur_portrait.svg', alt: 'Plokkfiskur' },
];

export default function HeroSection() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────
          MOBILE: client‐only carousel (hidden on desktop via CSS)
          (HeroCarousel is a client component by virtue of 'use client' at top of its file)
      ───────────────────────────────────────────────────────────────── */}
      <div className={styles.mobileHero}>
        <HeroCarousel images={panels} intervalMs={3000} />
        <div className={styles.overlayContent}>
          <h1 id="hero-title">Grímur Kokkur</h1>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          DESKTOP: server‐rendered hero with four overlapping panels
      ───────────────────────────────────────────────────────────────── */}
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
              // Only “Humarsúpa” (index 1) is truly above‐the‐fold on desktop, so mark it as priority
              priority={i === 1}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        ))}

        <div className={styles.overlayContent}>
          <h1 id="hero-title">Grímur Kokkur</h1>
        </div>
      </header>
    </>
  );
}
