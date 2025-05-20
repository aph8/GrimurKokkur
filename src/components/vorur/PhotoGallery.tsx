'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/vorur/PhotoGallery.module.scss';

interface PhotoGalleryProps {
  images: { url: string; alt?: string }[];
  imageSizes?: string;
  imageQuality?: number;
}

export default function PhotoGallery({
  images,
  imageSizes = '(max-width: 640px) 100vw, 600px',
  imageQuality = 75,
}: PhotoGalleryProps) {
  const [index, setIndex] = useState(0);
  const total = images.length;
  const { url, alt } = images[index];

  const prev = () => setIndex(i => (i - 1 + total) % total);
  const next = () => setIndex(i => (i + 1) % total);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    if (e.clientX - left < width / 2) prev();
    else next();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} onClick={onClick}>
        <Image
          src={url}
          alt={alt || `Image ${index + 1}`}
          fill
          sizes={imageSizes}
          quality={imageQuality}
          className="object-cover"
        />

        <div className={styles.arrowOverlay}>
          <span>‹</span>
          <span>›</span>
        </div>

        <div className={styles.counter}>
          {index + 1} / {total}
        </div>
      </div>
    </div>
  );
}
