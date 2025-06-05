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
      {panels.map((p, i) => {
        // The first panel is Humarsúpa; mark it as priority so it isn't lazy-loaded
        const isHumarsupa = p.url.endsWith('humarsupa_portrait.jpg');

        return (
          <div key={i} className={`${styles.panel} ${styles[`panel${i + 1}`]}`}>
            <Image
              src={p.url}
              alt={p.alt || ''}
              priority={isHumarsupa}
              fill
              // 100vw on mobile, ~25vw on desktop (4 panels side-by-side)
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
