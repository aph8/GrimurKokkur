// src/components/homePage/DesktopHero.tsx
import Image, { type StaticImageData } from 'next/image';
import styles from '@/styles/HeroSection.module.scss';

type Panel = { src: StaticImageData; alt?: string };

interface DesktopHeroProps {
  panels: Panel[];
}

export default function DesktopHero({ panels }: DesktopHeroProps) {
  return (
    <header className={styles.hero} role="banner" aria-labelledby="hero-title">
      {panels.map((p, i) => {
        const isHumarsupa = /humarsupa_portrait/.test(p.src.src);

        return (
          <div key={i} className={`${styles.panel} ${styles[`panel${i + 1}`]}`}>
            <Image
              src={p.src}
              alt={p.alt || ''}
              priority={isHumarsupa}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        );
      })}
      <div className={styles.overlayContent}>
        <h1 id="hero-title">Grímur Kokkur</h1>
      </div>
    </header>
  );
}
