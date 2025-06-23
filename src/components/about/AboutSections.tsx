// src/components/AboutSections.tsx
import React from 'react';
import dynamic from 'next/dynamic';
import HeroImage from '@/components/vorur/HeroImage';
import TextSection from '@/components/vorur/TextSection';
import type { AboutSection } from '@/lib/datocms';
import styles from '@/styles/AboutPage.module.scss';

const PhotoGallery = dynamic(() => import('@/components/vorur/PhotoGallery'), {
  loading: () => <div className={styles.loadingContainer} />,
});

interface AboutSectionsProps {
  sections: AboutSection[];
}

/**
 * Displays all sections from the about page, including hero images,
 * markdown text and optional photo galleries.
 */
export default function AboutSections({ sections }: AboutSectionsProps) {
  return (
    <>
      {sections.map((sec) => (
        <section key={sec.slug} aria-labelledby={`about-${sec.slug}`} className={styles.section}>
          {sec.image && (
            <div className={styles.section__image}>
              <HeroImage
                src={sec.image.url}
                alt={sec.image.alt || sec.title}
                blurDataURL={sec.image.blurUpThumb}
                ratio="4:3"
              />
            </div>
          )}

          <div className={styles.section__content}>
            <TextSection title={sec.title} text={sec.discription ?? ''} isMarkdown />

            {sec.imagegallery && sec.imagegallery.length > 0 && (
              <div className={styles.galleryWrapper}>
                <h2 className={styles.galleryTitle}>Myndagallerí</h2>
                <PhotoGallery
                  images={sec.imagegallery.map((img) => ({
                    url: img.url,
                    alt: img.alt,
                    blurDataURL: img.blurUpThumb,
                  }))}
                  imageSizes="(max-width: 640px) 100vw, 600px"
                  imageQuality={85}
                />
              </div>
            )}
          </div>
        </section>
      ))}
    </>
  );
}
