// src/components/vorur/HeroImage.tsx
import React from 'react';
import Image from 'next/image';
import styles from '@/styles/vorur/HeroImage.module.scss';

interface HeroImageProps {
  src: string;
  alt?: string;
  ratio?: string;      // e.g. "16:9" by default
  blurDataURL?: string; // base64 LQIP string, if available
  className?: string;   // e.g. "asymmetric" to trigger slanted-edge styling
}

const HeroImage: React.FC<HeroImageProps> = ({
  src,
  alt = '',
  ratio = '16:9',
  blurDataURL,
  className = '',
}) => {
  // Reserve vertical space with inline padding-bottom to avoid CLS
  const [w, h] = ratio.split(':').map(Number);
  const paddingBottom = `${(h / w) * 100}%`; // e.g. "56.25%" for 16:9

  return (
    <div
      className={`${styles.heroWrapper} ${className}`}
      style={{ paddingBottom }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        /**
         * 1) On very narrow phones (<=480px), main container has 1rem padding each side,
         *    so image width ≈100vw - 2rem.
         * 2) On small tablets (481px–768px), the hero column still isn’t super wide: cap at 480px.
         * 3) On anything larger (>768px), the hero column maxes at ~560px (≈40% of a 1440px layout).
         */
        sizes="
          (max-width: 480px) calc(100vw - 2rem),
          (max-width: 768px) 480px,
          560px
        "
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        priority
        unoptimized={false}
        className={styles.heroImage}
      />
    </div>
  );
};

export default HeroImage;
