// src/components/about/AboutSections.tsx
import React from 'react';
import dynamic from 'next/dynamic';
import HeroImage from '@/components/vorur/HeroImage';
import TextSection from '@/components/vorur/TextSection'; // now a server component
import type { AboutSection } from '@/lib/datocms';
import styles from '@/styles/AboutPage.module.scss';

/**
 * PhotoGallery is now server-rendered (no ssr:false).
 * We keep a <div className={styles.loadingContainer}/> placeholder only
 * if the client JS hasn’t hydrated yet, but it has exactly the same height
 * as the gallery, so the footer never moves.
 */
const PhotoGallery = dynamic(
  () => import('@/components/vorur/PhotoGallery'),
  {
    loading: () => <div className={styles.loadingContainer} />,
  }
);

interface AboutSectionsProps {
  sections: AboutSection[];
}

export default function AboutSections({ sections }: AboutSectionsProps) {
  return (
    <>
      {sections.map((sec) => (
        <section
          key={sec.slug}
          aria-labelledby={`about-${sec.slug}`}
          className={styles.section}
        >
          {sec.image && (
            <HeroImage
              src={sec.image.url}
              alt={sec.image.alt || sec.title}
              blurDataURL={sec.image.blurUpThumb}
              ratio="16:9"
            />
          )}

          {/**
            * TextSection must be a server component so that the <h2> “UM OKKUR”
            * is in the initial HTML. If TextSection is currently a client component,
            * move its logic (markdown parse + rendering) into a server component.
            */}
          <TextSection
            title={sec.title}
            text={sec.discription ?? ''}
            isMarkdown
          />

          {sec.imagegallery && sec.imagegallery.length > 0 && (
            <div className={styles.galleryWrapper}>
              <h2 className={styles.galleryTitle}>Myndagallerí</h2>
              <PhotoGallery
                images={sec.imagegallery.map((img) => ({
                  url: img.url,
                  alt: img.alt,
                  blurUpThumb: img.blurUpThumb,
                }))}
                imageSizes="(max-width: 640px) 100vw, 600px"
                imageQuality={75}
              />
            </div>
          )}
        </section>
      ))}
    </>
  );
}
