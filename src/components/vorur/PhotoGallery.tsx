// src/components/vorur/PhotoGallery.tsx
'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '@/styles/vorur/PhotoGallery.module.scss';

interface Photo {
  url: string;
  alt?: string;
  blurUpThumb?: string; // Base64 LQIP from DatoCMS
}

interface PhotoGalleryProps {
  images: Photo[];
  imageSizes?: string;
  imageQuality?: number;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  images,
  imageSizes = '(max-width: 640px) 100vw, 600px',
  imageQuality = 75,
}) => {
  const [index, setIndex] = useState(0);
  const total = images.length;
  const containerRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  // Keyboard navigation (← / →)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    const node = containerRef.current;
    node?.addEventListener('keydown', onKey);
    return () => node?.removeEventListener('keydown', onKey);
  }, [prev, next]);

  return (
    <div
      className={styles.wrapper}
      role="region"
      aria-roledescription="carousel"
      aria-label={`Myndasafn: mynd ${index + 1} af ${total}`}
      tabIndex={0}
      ref={containerRef}
    >
      {/* 
        .container is defined in your SCSS to be a fixed-height box,
        so we let your CSS handle reserving space (no inline paddingBottom needed).
      */}
      <div className={styles.container}>
        <Image
          src={images[index].url}
          alt={images[index].alt ?? `Image ${index + 1}`}
          fill
          sizes={imageSizes}
          quality={imageQuality}
          // Only the very first slide is preloaded
          priority={index === 0}
          placeholder={images[index].blurUpThumb ? 'blur' : 'empty'}
          blurDataURL={images[index].blurUpThumb}
          unoptimized={false}
          // Use object-cover utility so the image always covers the container
          className="object-cover"
        />
      </div>

      {/* Prev/Next buttons (positioned by your SCSS) */}
      <button
        type="button"
        className={styles.prevButton}
        onClick={prev}
        aria-label="Fara á fyrri mynd"
      >
        ‹
      </button>
      <button
        type="button"
        className={styles.nextButton}
        onClick={next}
        aria-label="Fara á næstu mynd"
      >
        ›
      </button>

      {/* Counter in the bottom-right (styled by your SCSS) */}
      <div className={styles.counter} aria-live="polite">
        {index + 1} / {total}
      </div>
    </div>
  );
};

export default React.memo(PhotoGallery);
