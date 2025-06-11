// src/components/homePage/DesktopHero.tsx
import Image, { type StaticImageData } from 'next/image';
import styles from '@/styles/HeroSection.module.scss';

type Panel = { src: StaticImageData; alt?: string };

interface DesktopHeroProps {
  panels: Panel[];
}
/**
 * Displays the hero section for desktop layouts with slanted panels.
 */

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
              quality={100}
              sizes="(max-width: 768px) 100vw, 25vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        );
      })}
    </header>
  );
}
