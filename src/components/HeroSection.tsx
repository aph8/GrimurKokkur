// src/components/HeroSection.tsx
'use client';

import styles from '@/styles/HeroSection.module.scss';

export default function HeroSection() {
  return (
    <header className={styles.hero} role="banner" aria-labelledby="hero-title">
      {/* Bakgrunnspanelar – aðeins skraut, sleppt úr accessibility tree */}
      <div aria-hidden="true" className={`${styles.panel} ${styles.panel1}`} />
      <div aria-hidden="true" className={`${styles.panel} ${styles.panel2}`} />
      <div aria-hidden="true" className={`${styles.panel} ${styles.panel3}`} />
      <div aria-hidden="true" className={`${styles.panel} ${styles.panel4}`} />
      <div aria-hidden="true" className={`${styles.panel} ${styles.panel5}`} />

      <div className={styles.overlayContent}>
        {/* Aðalfyrirsögn */}
        <h1 id="hero-title">Grímur Kokkur</h1>
      </div>
    </header>
  );
}
