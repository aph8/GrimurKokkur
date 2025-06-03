// src/components/homePage/DesktopHero.tsx
import Image from 'next/image';
import styles from '@/styles/HeroSection.module.scss';

type Panel = { url: string; alt?: string };

interface DesktopHeroProps {
  panels: Panel[];
}

export default function DesktopHero({ panels }: DesktopHeroProps) {
  return (
    <header className={styles.hero} role="banner" aria-labelledby="hero-title">
      {panels.map((p, i) => (
        <div key={i} className={`${styles.panel} ${styles[`panel${i + 1}`]}`}>
          <Image
            src={p.url}
            alt={p.alt || ''}           // ← always pass a string
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      ))}

      <div className={styles.overlayContent}>
        <h1 id="hero-title">Grímur Kokkur</h1>
      </div>
    </header>
  );
}
