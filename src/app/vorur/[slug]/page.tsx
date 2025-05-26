'use client';

export const runtime    = 'edge';
export const revalidate = 60;


import React from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug, Product } from '@/lib/datocms';
import TextSection from '@/components/vorur/TextSection';
import NutritionTable, { NutritionRow } from '@/components/vorur/NutritionTable';
import PhotoGallery from '@/components/vorur/PhotoGallery';
import HeroImage from '@/components/vorur/HeroImage';
import styles from '../../../styles/vorur/ProductLayout.module.scss';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product: Product | null = await getProductBySlug(slug);
  if (!product) return notFound();

  const {
    title,
    discription = '',
    ingredient = '',
    nutritionfacts = [],
    image,
    imagegallery = [],
    video,
  } = product;

  return (
    <main className="w-full px-4 py-12">
      {/* Titill sem notar .pageTitle fyrir underline-animation */}
      <h1 className={styles.pageTitle}>{title}</h1>

      <div className={styles.wrapper}>
        {/* ─── HERO COLUMN ─────────────────────────────────────────── */}
        {image?.url && (
          <div className={styles.heroContainer}>
            <HeroImage
              src={image.url}
              alt={image.alt || title}
              ratio="16:9"
              className="asymmetric"
            />

            {/* Nutrition á desktop */}
            {nutritionfacts.length > 0 && (
              <div className={styles.desktopOnly}>
                <NutritionTable data={nutritionfacts as NutritionRow[]} />
              </div>
            )}

            {/* Myndband */}
            {video?.url && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">Myndband</h2>
                <iframe
                  src={video.url}
                  title="Myndband"
                  className="w-full h-64 rounded"
                  allowFullScreen
                />
              </div>
            )}

            {/* Myndagallerí */}
            {imagegallery.length > 0 && (
              <div className="mt-8">
                <TextSection title="Myndagallerí">
                  <PhotoGallery
                    images={imagegallery}
                    imageSizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                    imageQuality={85}
                  />
                </TextSection>
              </div>
            )}
          </div>
        )}

        {/* ─── CONTENT COLUMN ─────────────────────────────────────── */}
        <div className={styles.contentContainer}>
          {discription && <TextSection title="Lýsing" text={discription} isMarkdown />}
          {ingredient && <TextSection title="Innihaldsefni" text={ingredient} isMarkdown />}

          {/* Nutrition á mobile */}
          {nutritionfacts.length > 0 && (
            <div className={styles.mobileOnly}>
              <TextSection title="Næringargögn">
                <NutritionTable data={nutritionfacts as NutritionRow[]} />
              </TextSection>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
