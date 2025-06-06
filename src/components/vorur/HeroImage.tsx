// src/components/vorur/HeroImage.tsx
import React from 'react';
import Image from 'next/image';
import styles from '@/styles/vorur/HeroImage.module.scss';

interface HeroImageProps {
  src: string;
  alt?: string;
  ratio?: string;      // e.g. "16:9" or "3:2"
  blurDataURL?: string; // base64 LQIP string
  className?: string;   // any extra class (e.g. "asymmetric")
}

const HeroImage: React.FC<HeroImageProps> = ({
  src,
  alt = '',
  ratio = '16:9',
  blurDataURL,
  className = '',
}) => {
  // Calculate padding-bottom % to reserve vertical space
  const [w, h] = ratio.split(':').map(Number);
  const paddingBottom = `${(h / w) * 100}%`; // "56.25%" for 16:9, etc.

  return (
    <div
      className={`${styles.heroWrapper} ${className}`}
      style={{ paddingBottom }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 800px, 1200px"
        // Remove quality={100}; Next.js defaults to 75.
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        // Mark the hero as priority so it isn’t lazy-loaded (improves LCP)
        priority
        unoptimized={false}
        className={styles.heroImage}
      />
    </div>
  );
};

export default HeroImage;
