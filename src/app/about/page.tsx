import React from 'react';
import { notFound } from 'next/navigation';
import { getAllAboutSections, AboutSection } from '@/lib/datocms';
import HeroImage from '@/components/vorur/HeroImage';
import TextSection from '@/components/vorur/TextSection';
import PhotoGallery from '@/components/vorur/PhotoGallery';
import styles from '@/styles/AboutPage.module.scss';

export default async function AboutPage() {
  const sections: AboutSection[] | null = await getAllAboutSections();
  if (!sections) return notFound();

  return (
    <main className={styles.main}>
      <h1 className={styles.pageTitle}>Um okkur</h1>
      {sections.map((sec) => (
        <section key={sec.slug} className={styles.section}>
          <div className={styles.media}>
            {sec.image?.url && (
              <HeroImage
                src={sec.image.url}
                alt={sec.image.alt || sec.title}
                ratio="1:1"
              />
            )}
            {sec.video?.url && (
              <div className={styles.videoWrapper}>
                <iframe
                  src={sec.video.url}
                  title={sec.title}
                  className={styles.video}
                  allowFullScreen
                />
              </div>
            )}
            {(sec.imagegallery?.length ?? 0) > 0 && (
              <PhotoGallery
                images={sec.imagegallery ?? []}
                imageSizes="(max-width: 640px) 100vw, 600px"
                imageQuality={100}
              />
            )}
          </div>
          <div className={styles.content}>
            <TextSection title={sec.title} text={sec.discription || ''} isMarkdown />
          </div>
        </section>
      ))}
    </main>
  );
}
