import React from 'react';
import NextImage from 'next/image';
import styles from '@/styles/vorur/HeroImage.module.scss';

interface HeroImageProps {
  src: string;
  alt?: string;
  ratio?: string;
  className?: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ src, alt = '', ratio = '16:9', className = '' }) => {
  const [w, h] = ratio.split(':').map(Number);
  const paddingBottom = `${(h / w) * 100}%`;

  return (
    <div className={[styles.heroWrapper, className].join(' ')} style={{ paddingBottom }}>
      <NextImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 800px, 1200px"
        quality={100}
        placeholder="blur"
        blurDataURL="/placeholder.png"
        unoptimized={false}
        className={styles.heroImage}
      />
    </div>
  );
};

export default HeroImage;
