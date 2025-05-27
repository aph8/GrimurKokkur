// src/components/AboutSections.tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import HeroImage from '@/components/vorur/HeroImage';
import TextSection from '@/components/vorur/TextSection';
import type { AboutSection } from '@/lib/datocms';
import styles from '@/styles/AboutPage.module.scss';

const PhotoGallery = dynamic(() => import('@/components/vorur/PhotoGallery'), {
  ssr: false,
  loading: () => <p className={styles.loading}>Hleður myndum…</p>,
});

interface AboutSectionsProps {
  sections: AboutSection[];
}

export default function AboutSections({ sections }: AboutSectionsProps) {
  return (
    <>
      {sections.map((sec) => (
        <section key={sec.slug} aria-labelledby={`about-${sec.slug}`} className={styles.section}>
          {sec.image && (
            <HeroImage src={sec.image.url} alt={sec.image.alt || sec.title} ratio="16:9" />
          )}

          <TextSection title={sec.title} text={sec.discription ?? ''} isMarkdown />

          {sec.imagegallery && sec.imagegallery.length > 0 && (
            <div className={styles.galleryWrapper}>
              <h2 className={styles.galleryTitle}>Myndagallerí</h2>
              <PhotoGallery images={sec.imagegallery} />
            </div>
          )}
        </section>
      ))}
    </>
  );
}
