'use client';

import styles from '@/styles/HeroSection.module.scss';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className={styles.hero}>
      <div className={`${styles.panel} ${styles.panel1}`} />
      <div className={`${styles.panel} ${styles.panel2}`} />
      <div className={`${styles.panel} ${styles.panel3}`} />
      <div className={`${styles.panel} ${styles.panel4}`} />
      <div className={`${styles.panel} ${styles.panel5}`} />

      <div className={styles.overlayContent}>
        <h1>Grímur Kokkur</h1>

        <div className={styles.buttons}>
          <Link href="/vorur">
            <button className={styles.active}>Vörur</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
