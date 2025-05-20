import React from 'react';
import NextImage from 'next/image';
import styles from '@/styles/vorur/HeroImage.module.scss';

interface HeroImageProps {
  src: string;
  alt?: string;
  ratio?: string;
  className?: string;
}

const HeroImage: React.FC<HeroImageProps> = ({
  src,
  alt = '',
  ratio = '16:9',
  className = '',
}) => {
  const [w, h] = ratio.split(':').map(Number);
  const paddingBottom = `${(h / w) * 100}%`;

  const wrapperClasses = [styles.heroWrapper];
  if (className.split(' ').includes('asymmetric')) {
    wrapperClasses.push(styles.asymmetric);
  }
 
  wrapperClasses.push(
    ...className
      .split(' ')
      .filter((c) => c && c !== 'asymmetric')
      .map((c) => c)
  );

  return (
    <div
      className={wrapperClasses.join(' ')}
      style={{ paddingBottom }}
    >
      <NextImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 800px, 1200px"
        quality={100}
        className={styles.heroImage}
      />
    </div>
  );
};

export default HeroImage;
