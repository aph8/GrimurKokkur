// src/components/vorur/HeroImage.tsx
import React from 'react';
import Image from 'next/image';
import styles from '@/styles/vorur/HeroImage.module.scss';

interface HeroImageProps {
  src: string;
  alt?: string;
  ratio?: string;    
  blurDataURL?: string; 
  className?: string;   
}

const HeroImage: React.FC<HeroImageProps> = ({
  src,
  alt = '',
  ratio = '16:9',
  blurDataURL,
  className = '',
}) => {
  const [w, h] = ratio.split(':').map(Number);
  const paddingBottom = `${(h / w) * 100}%`; 

  return (
    <div
      className={`${styles.heroWrapper} ${className}`}
      style={{ paddingBottom }}
    >
      <Image
        src={src}
        alt={alt}
        fill
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
